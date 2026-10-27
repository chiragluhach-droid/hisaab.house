# Hisaab House — website

A static sales site for [@hisaab.house](https://www.instagram.com/hisaab.house/), built mobile-first with Next.js, TypeScript and Tailwind CSS. It has no backend: every buy button opens an Instagram DM with @hisaab.house.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site → ./out
npm run preview    # serve ./out at http://localhost:4173
```

---

## 1. Edit prices, messages and numbers

**Everything lives in [`site.config.ts`](site.config.ts).** You never need to touch the components.

| What | Where in `site.config.ts` |
| --- | --- |
| Followers, 7-day views, top episode | `stats` |
| Hero headline, sub-headline, buttons | `hero` |
| Promo video + poster URLs | `video` |
| Episode titles, view counts, **reel links** | `series.episodes` |
| Prices, card text, what each pass includes | `products` (+ `features` for the comparison rows) |
| **DM messages** (copied to the buyer's clipboard on tap; Instagram can't pre-fill DMs) | each product's `message`, plus `messages.general` |
| Instagram DM link | `contact.instagramDm` (`https://ig.me/m/hisaab.house`) |
| FAQ | `faq` |
| Countdown to next launch | `closing.nextLaunch`, e.g. `"2026-11-15T19:00:00+05:30"`. `null` hides it |
| Name/contact on the legal pages | `legal` |

Search the file for **`TODO`** to find what still needs your input: reel URLs, Ep 1 views, the tools/language FAQ answers, the refund policy (in `src/app/terms/page.tsx`), and an optional email.

**Adding a payment gateway later:** set a product's `buyUrl` to the checkout link. Every button for that product will go there instead of the Instagram DM, and the design doesn't change.

## 2. Add or change images

Drop images into `public/art/` using these names (PNG, JPG or WebP; any size):

```
public/art/logo.png            header mark (and source of the favicon)
public/art/covers/ep-1.png … ep-5.png, finale.png   episode covers, 9:16
public/art/cast/main.png, bunty.png, seth.png         character sheets
```

`npm run dev` and `npm run build` automatically convert them into phone-sized AVIF + WebP files (`public/art/_opt/`). Missing images show a designed placeholder, so nothing breaks. To add a new episode, add a row to `series.episodes` with `cover: "covers/ep-8"` and drop in `ep-8.png`.

The hero **poster** is downloaded from the Cloudinary URL in `video.poster` at build time and served from the site itself, which keeps it fast on mobile data. If you change the video, update both URLs in `video`.

The favicon and Apple touch icon are `src/app/icon.png` and `src/app/apple-icon.png`. Replace them with any square PNG. The social preview image (`src/app/opengraph-image.tsx`) is generated at build time from the config and the logo.

## 3. Deploy to Netlify

### Option A: connect the Git repository (recommended)
1. Push this folder to a GitHub/GitLab repo.
2. Netlify → **Add new site → Import an existing project** → pick the repo.
3. Netlify reads `netlify.toml` automatically (build `npm run build`, publish `out`). Click **Deploy**.
4. Every push redeploys the site.

### Option B: drag and drop
1. Run `npm run build` locally.
2. Open [app.netlify.com/drop](https://app.netlify.com/drop) and drag the **`out`** folder onto the page.

With drag and drop, the security headers in `netlify.toml` are **not** applied (they only apply to Git deploys). To keep them, use Option A or the Netlify CLI (`npx netlify deploy --prod --dir=out`, run from this folder).

### Analytics (optional)
In Netlify → **Site configuration → Environment variables**, add any of these, then redeploy (see `.env.example`):

- `NEXT_PUBLIC_GA_ID`: Google Analytics 4 (`G-XXXXXXX`)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: your Plausible site domain
- `NEXT_PUBLIC_META_PIXEL_ID`: Meta Pixel

Each buy/chat button click sends an `instagram_dm_click` event with `product` (hisaab / ots / general) and `placement` (hero, card, floating, faq, closing, header, menu, footer). The UTM tags from your Instagram bio link are attached too. The Meta Pixel also receives a standard `Contact` event.

## 4. Connect a custom domain
1. Netlify → your site → **Domain management → Add a domain** → enter it (e.g. `hisaabhouse.in`).
2. At your domain registrar, either:
   - point the nameservers to the four Netlify nameservers shown (easiest), **or**
   - add a `CNAME` for `www` → `your-site.netlify.app`, and an `A` record for the root → `75.2.60.5`.
3. Netlify issues the HTTPS certificate automatically (this can take up to an hour).
4. Update `site.url` in `site.config.ts` to the new domain and redeploy, so the sitemap, canonical URL and social previews use it.

## QA scripts
With `npm run preview` running:

```bash
node scripts/qa-screens.mjs screenshots 360 390 430 1440   # screenshots + overflow/tap-target report
node scripts/qa-buttons.mjs                                 # checks every DM button: link, copied message, analytics event
```
# hisaab.house
