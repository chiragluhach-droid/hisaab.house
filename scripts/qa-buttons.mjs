// Checks every buy/chat button: WhatsApp number, decoded pre-filled message,
// tab behaviour and the analytics event fired on click.
//   SITE_URL=http://localhost:3000/ node scripts/qa-buttons.mjs   (default: the `npm run preview` server)
import { chromium } from "playwright";

const SITE = process.env.SITE_URL ?? "http://localhost:4173/";
const NUMBER = "918130809374";
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
  const ctx = await browser.newContext(opts);
  await ctx.addInitScript(() => {
    window.__events = [];
    window.gtag = (...a) => a[0] === "event" && window.__events.push({ event: a[1], ...a[2] });
    // Don't actually leave the page.
    document.addEventListener("click", (e) => e.target.closest?.("a[data-wa]") && e.preventDefault(), true);
  });
  const page = await ctx.newPage();
  await page.goto(SITE + "?utm_source=ig&utm_medium=social&utm_content=link_in_bio", { waitUntil: "networkidle" });
  console.log(`\n== ${name}`);

  const check = async (el, label) => {
    const l = await el.evaluate((a) => ({ topic: a.dataset.wa, placement: a.dataset.placement, href: a.href, target: a.target || "(same tab)" }));
    await el.evaluate((a) => a.click());
    const ev = await page.evaluate(() => window.__events.at(-1));
    const u = new URL(l.href);
    const text = u.searchParams.get("text");
    const ok =
      u.host === "wa.me" && u.pathname === `/${NUMBER}` && text === EXPECTED[l.topic] &&
      l.target === (opts.isMobile ? "(same tab)" : "_blank") &&
      ev?.event === "whatsapp_click" && ev.product === l.topic && ev.placement === l.placement && ev.utm_source === "ig";
    if (!ok) failures++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${(label ?? l.placement).padEnd(10)} ${l.topic.padEnd(8)} ${l.target.padEnd(11)} "${text}"`);
  };

  if (opts.isMobile) {
    // Menu buttons close the menu when tapped, so reopen it for each one.
    for (let i = 0; ; i++) {
      await page.evaluate(() => document.querySelector("button[aria-label='Open menu']").click());
      const links = await page.$$("#mobile-menu a[data-wa]");
      if (i >= links.length) break;
      await check(links[i], "menu");
    }
    await page.evaluate(() => document.querySelector("button[aria-label='Close menu']")?.click());
  }
  for (const el of await page.$$("a[data-wa]")) {
    const visible = await el.evaluate((a) => a.getBoundingClientRect().width > 0 && getComputedStyle(a).display !== "none");
    if (visible) await check(el);
  }
  await ctx.close();
}
await browser.close();
console.log(failures ? `\n${failures} failure(s)` : "\nAll buttons OK");
process.exit(failures ? 1 : 0);
