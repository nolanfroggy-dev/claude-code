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
| Review quotes | Section marked `<!-- TODO: swap in real quotes with owner permission -->` (also `q1–q4` in `STRINGS`) |
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

