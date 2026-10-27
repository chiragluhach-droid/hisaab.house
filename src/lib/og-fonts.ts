import { readFile } from "node:fs/promises";
import path from "node:path";

const dir = (pkg: string) => path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files");

export async function ogFonts() {
  const [inter8, inter7, mono] = await Promise.all([
    readFile(path.join(dir("inter"), "inter-latin-800-normal.woff")),
    readFile(path.join(dir("inter"), "inter-latin-700-normal.woff")),
    readFile(path.join(dir("jetbrains-mono"), "jetbrains-mono-latin-700-normal.woff")),
  ]);
  return [
    { name: "Inter", data: inter8, weight: 800 as const, style: "normal" as const },
    { name: "Inter", data: inter7, weight: 700 as const, style: "normal" as const },
    { name: "Mono", data: mono, weight: 700 as const, style: "normal" as const },
  ];
}
