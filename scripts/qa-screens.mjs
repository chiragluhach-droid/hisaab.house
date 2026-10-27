// QA screenshots + layout checks. Serve the build first (`npm run preview`), then:
//   node scripts/qa-screens.mjs screenshots 360 390 430 1440
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const out = process.argv[2];
const widths = process.argv.slice(3).map(Number);
mkdirSync(out, { recursive: true });
const URL = "http://localhost:4173/";
const IG_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.0 (iPhone15,3; iOS 18_0; en_US; en; scale=3.00; 1290x2796)";

const browser = await chromium.launch({ channel: "chrome" });
for (const w of widths) {
  const mobile = w < 768;
  // 844 tall phone minus ~100px of Instagram in-app browser chrome
  const h = mobile ? 744 : 900;
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: mobile ? 2 : 1,
    isMobile: mobile,
    hasTouch: mobile,
    userAgent: mobile ? IG_UA : undefined,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const report = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflow = doc.scrollWidth - doc.clientWidth;
    const wide = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width && r.right > doc.clientWidth + 1 && !el.closest("[aria-label=Episodes]") && !el.closest(".animate-ticker");
      })
      .slice(0, 5)
      .map((el) => el.tagName + "." + String(el.className).slice(0, 60));
    const small = [...document.querySelectorAll("a, button, summary")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && cs.visibility !== "hidden" && !el.closest("[inert]") && r.height < 44 && !el.classList.contains("sr-only");
      })
      .map((el) => `${el.textContent.trim().slice(0, 30)} (${Math.round(el.getBoundingClientRect().height)}px)`);
    const cta = document.querySelector("#hero-cta a")?.getBoundingClientRect();
    const v = document.getElementById("hero-video");
    return {
      overflow,
      wide,
      small,
      ctaBottom: cta && Math.round(cta.bottom),
      viewport: innerHeight,
      video: v && { paused: v.paused, muted: v.muted, loop: v.loop, playsInline: v.playsInline, time: v.currentTime.toFixed(2), h: Math.round(v.getBoundingClientRect().height) },
    };
  });
  console.log(w, JSON.stringify(report));
  await page.screenshot({ path: `${out}/${w}-full.png`, fullPage: true });
  if (mobile || process.env.SECTIONS) {
    // section by section
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    let i = 0;
    for (let y = 0; y < total; y += h - 80, i++) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(450);
      await page.screenshot({ path: `${out}/${w}-s${String(i).padStart(2, "0")}.png` });
    }
  }
  await ctx.close();
}
await browser.close();
