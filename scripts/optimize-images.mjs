// Converts every image in /public/art/** into phone-sized AVIF + WebP files
// in /public/art/_opt/, and writes a manifest the components read at build
// time. Images that aren't there yet fall back to designed placeholders.
//
//   public/art/covers/ep-1.jpg  →  key "covers/ep-1"
//
// Runs automatically before `npm run dev` and `npm run build`.
import { readdir, readFile, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public", "art");
const OUT = path.join(SRC, "_opt");
const MANIFEST = path.join(ROOT, "src", "generated", "art-manifest.json");
const WIDTHS = [96, 360, 540, 720, 1080];
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = [];
  for (const e of entries) {
    if (e.name.startsWith("_") || e.name.startsWith(".")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (EXT.has(path.extname(e.name).toLowerCase())) files.push(p);
  }
  return files;
}

async function fresh(src, out) {
  try {
    return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
}

const manifest = {};
for (const file of await walk(SRC)) {
  const rel = path.relative(SRC, file).split(path.sep).join("/");
  const key = rel.replace(/\.[^.]+$/, "");
  const img = sharp(file);
  const { width = 0, height = 0 } = await img.metadata();
  const widths = WIDTHS.filter((w) => w <= width).concat(width < 1080 && !WIDTHS.includes(width) ? [width] : []);
  const unique = [...new Set(widths)].sort((a, b) => a - b);
  const outDir = path.join(OUT, path.dirname(rel));
  await mkdir(outDir, { recursive: true });
  const base = path.basename(key);
  for (const w of unique) {
    for (const fmt of ["avif", "webp"]) {
      const out = path.join(outDir, `${base}-${w}.${fmt}`);
      if (await fresh(file, out)) continue;
      const pipeline = sharp(file).resize({ width: w, withoutEnlargement: true });
      await (fmt === "avif" ? pipeline.avif({ quality: 50 }) : pipeline.webp({ quality: 72 })).toFile(out);
    }
  }
  // Tiny blurred preview, inlined as the placeholder background.
  const blur = await sharp(file).resize(16).webp({ quality: 40 }).toBuffer();
  manifest[key] = {
    width,
    height,
    widths: unique,
    base: `/art/_opt/${path.dirname(rel) === "." ? "" : path.dirname(rel) + "/"}${base}`,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  console.log(`  art: ${key} (${unique.join(", ")}w)`);
}

// Hero poster: download the frame from Cloudinary once and serve it from this
// site, so phones don't open an extra connection before the first paint.
// The URL comes from `video.poster` in site.config.ts.
try {
  const cfg = await readFile(path.join(ROOT, "site.config.ts"), "utf8");
  const url = cfg.match(/\bposter:\s*"([^"]+)"/)?.[1];
  if (url) {
    const res = await fetch(url, { headers: { Accept: "image/jpeg" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(OUT, { recursive: true });
    const widths = [600, 900];
    for (const w of widths) {
      await sharp(buf).resize({ width: w }).avif({ quality: 52 }).toFile(path.join(OUT, `poster-${w}.avif`));
      await sharp(buf).resize({ width: w }).webp({ quality: 74 }).toFile(path.join(OUT, `poster-${w}.webp`));
    }
    const { width = 0, height = 0 } = await sharp(buf).metadata();
    manifest._poster = { width, height, widths, base: "/art/_opt/poster", blur: "", source: url };
    console.log("  poster: downloaded and optimised");
  }
} catch (e) {
  console.warn(`  poster: couldn't download (${e.message}) — the site will use the Cloudinary URL directly`);
}

await mkdir(path.dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Optimised ${Object.keys(manifest).length} image(s) → public/art/_opt`);
