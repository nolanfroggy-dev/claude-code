# Taqueria Mis Amigos: demo site

A static, one-page demo site built from the brief in [`CLAUDE.md`](CLAUDE.md). Everything that gets deployed is in `site/`.

```
site/
├── index.html   # page markup, SEO meta, Open Graph, Restaurant JSON-LD
├── styles.css   # mobile-first styles, palette tokens at the top
├── script.js    # HOURS, MENU and EN/ES STRINGS live at the top of this file
└── images/      # placeholder JPGs: swap these for real photos, same filenames
```

## Preview locally

```sh
cd taqueria-mis-amigos/site
python3 -m http.server 8000
# open http://localhost:8000
```

You can also double-click `site/index.html`. Everything works that way except the embedded map, which may need a local server.

## Deploy free with Netlify Drop

1. Go to https://app.netlify.com/drop
2. Drag the **`site`** folder (not the parent folder) onto the page.
3. You get a live `*.netlify.app` URL within a few seconds. Make a free account to keep the site and rename it, e.g. `misamigos-qc.netlify.app`.
4. To update the site later: open the site in Netlify, go to **Deploys**, and drag the folder in again.

## Common edits

| What | Where |
| --- | --- |
| Menu items and prices | `MENU` array in `script.js` (`price: null` shows "Ask in store") |
| Hours | `HOURS` in `script.js` **and** `openingHoursSpecification` in the JSON-LD in `index.html`, plus the footer hours string in `STRINGS` |
| English/Spanish text | `STRINGS.en` / `STRINGS.es` in `script.js` |
| Photos | Replace files in `site/images/` and keep the same names and aspect ratios (hero 4:3, family 1:1, menu 16:9) |
| About story | Section marked `<!-- TODO: replace with owner's story -->` (also update `about1–3` in `STRINGS`) |
| Live Google reviews & photos | Paste your key into `GOOGLE.apiKey` at the top of `script.js` (setup steps below) |
| Fallback review highlights | The `#quotes` list in `index.html` (also `q1–q4` in `STRINGS`). Shown when there is no key or Google can't be reached |
| Order cart (demo) | Items get an "Add" button unless they have `noOrder: true` in `MENU`. Pickup slots come from `HOURS` (`LEAD_MIN`, `SLOT_MIN` in `script.js`) |
| Demo banner | Delete the `demo-bar` `<div>` and the one-line inline `<script>` in `<head>` when going live |

The visible text is translated by `script.js`, so if you edit copy in `index.html`, edit the matching `STRINGS` entry too.

Before launch, set `og:image` in `index.html` to a full absolute URL (e.g. `https://yourdomain.com/images/hero.jpg`) so link previews work.

## About the order cart

The cart is a **demo**. Visitors can add items, change quantities, pick a pickup time and add notes. "Place pickup order" then shows a preview confirmation that says plainly the order was **not** sent, with a Call button. Nothing leaves the browser, and it asks for no name, phone or payment details.

To make ordering real at launch, pick one of these:
- Replace `submitOrder()` in `script.js` so it sends the order to a real service (for example Square Online, Toast or Clover, whichever the restaurant's register uses) and takes payment there.
- Or remove the cart (the `ORDER CART` block in `index.html` and `script.js`) and link the "Order ahead" button to the restaurant's own ordering page.

If the restaurant doesn't want online ordering at all, delete the cart before going live so nobody thinks they placed an order.

## Turning on live Google reviews & photos

The reviews section can show the restaurant's real Google rating, up to 5 Google reviews (Google chooses which ones), and up to 6 customer photos, all credited as Google requires. Until a key is added, the site shows the paraphrased highlights.

1. Go to https://console.cloud.google.com and sign in. Create a project, e.g. "Mis Amigos website".
2. Turn on billing for the project. Google asks for a card, and there's a free monthly allowance. Check the current Maps Platform pricing when you sign up.
3. Go to **APIs & Services → Library** and enable **Maps JavaScript API** and **Places API (New)**.
4. Go to **APIs & Services → Credentials → Create credentials → API key**.
5. Restrict the key (important, because the key is visible in the page source):
   - **Application restrictions → Websites**. Add your site, e.g. `https://misamigos-qc.netlify.app/*`, and later the real domain. For testing on your computer, also add `http://localhost:8000/*`.
   - **API restrictions → Restrict key**, and tick only **Maps JavaScript API** and **Places API (New)**.
6. Optional but recommended: in **Places API (New) → Quotas**, set a daily request cap (e.g. 500) so a traffic spike can't run up a bill. You can also set a budget alert under **Billing → Budgets & alerts**.
7. Paste the key into `GOOGLE.apiKey` at the top of `site/script.js` and redeploy (drag the folder onto Netlify again).
8. Open the live site, scroll to the reviews, and open the browser console (or ask for help). The site prints the restaurant's **place ID** there. Paste it into `GOOGLE.placeId` and redeploy. This makes each visit one lookup instead of two.

The reviews load only when a visitor scrolls near that section, so the page stays fast and visitors who never scroll there cost nothing. Keep the reviewer names, photo credits and "Google Maps" link visible, because Google's terms require them.

