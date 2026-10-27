// Checks every buy/chat button: it opens the Instagram DM, copies the right
// message, uses the right tab, and fires the analytics event.
//   SITE_URL=http://localhost:3000/ node scripts/qa-buttons.mjs   (default: the `npm run preview` server)
import { chromium } from "playwright";

const SITE = process.env.SITE_URL ?? "http://localhost:4173/";
const DM = "https://ig.me/m/hisaab.house";
const EXPECTED = {
  hisaab: "Hi Hisaab House, I'd like to purchase the Hisaab Pass (₹499).",
  ots: "Hi Hisaab House, I'd like to purchase the Over-the-Shoulder Pass (₹999).",
  general: "Hi Hisaab House, I have a question about your passes.",
};
const IG_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.0";

const browser = await chromium.launch({ channel: "chrome" });
let failures = 0;
for (const [name, opts] of [
  ["mobile 390 (Instagram in-app UA)", { viewport: { width: 390, height: 744 }, isMobile: true, hasTouch: true, userAgent: IG_UA }],
  ["desktop 1440", { viewport: { width: 1440, height: 900 } }],
]) {
  const ctx = await browser.newContext({ ...opts, permissions: ["clipboard-read", "clipboard-write"] });
  await ctx.addInitScript(() => {
    window.__events = [];
    window.gtag = (...a) => a[0] === "event" && window.__events.push({ event: a[1], ...a[2] });
    // Don't actually leave the page.
    document.addEventListener("click", (e) => e.target.closest?.("a[data-dm]") && e.preventDefault(), true);
  });
  const page = await ctx.newPage();
  await page.goto(SITE + "?utm_source=ig&utm_medium=social&utm_content=link_in_bio", { waitUntil: "networkidle" });
  console.log(`\n== ${name}`);

  const check = async (selector, label) => {
    const l = await page.$eval(selector, (a) => ({ topic: a.dataset.dm, placement: a.dataset.placement, href: a.href, target: a.target || "(same tab)" }));
    await page.evaluate(() => navigator.clipboard.writeText(""));
    await page.click(selector);
    await page.waitForTimeout(150);
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    const ev = await page.evaluate(() => window.__events.at(-1));
    const ok =
      l.href === DM &&
      l.target === (opts.isMobile ? "(same tab)" : "_blank") &&
      copied === EXPECTED[l.topic] &&
      ev?.event === "instagram_dm_click" && ev.product === l.topic && ev.placement === l.placement && ev.utm_source === "ig";
    if (!ok) failures++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${(label ?? l.placement).padEnd(10)} ${l.topic.padEnd(8)} ${l.target.padEnd(11)} copied="${copied}"`);
  };

  if (opts.isMobile) {
    await page.click("button[aria-label='Open menu']");
    await check("#mobile-menu a[data-dm]", "menu");
    if (await page.$("#mobile-menu")) await page.click("button[aria-label='Close menu']");
  }
  const visible = await page.$$eval("a[data-dm]", (els) =>
    els.map((a, i) => ({ i, show: a.getBoundingClientRect().width > 0 && getComputedStyle(a).display !== "none" })).filter((x) => x.show).map((x) => x.i),
  );
  for (const i of visible) {
    await page.evaluate((i) => document.querySelectorAll("a[data-dm]")[i].setAttribute("data-qa", "now"), i);
    await check("a[data-qa=now]");
    await page.evaluate(() => document.querySelector("a[data-qa=now]")?.removeAttribute("data-qa"));
  }
  await ctx.close();
}
await browser.close();
console.log(failures ? `\n${failures} failure(s)` : "\nAll buttons OK");
process.exit(failures ? 1 : 0);
