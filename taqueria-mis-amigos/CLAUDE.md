# Build brief: Taqueria Mis Amigos demo site

Drop this file in an empty folder and open Claude Code there. Then paste the prompt at the bottom.

## Goal
Build a **demo website** for a local restaurant that doesn't have one. It's a pitch: Nolan (a local web designer) will show it to the owners and offer to launch it for real. It has to look finished and professional, load fast on a phone, and be easy to swap real photos into later.

## The business (verified September 2026 from public listings)
- **Name:** Taqueria Mis Amigos
- **Type:** Family-run Mexican taqueria (breakfast + lunch)
- **Address:** 20905 E Ocotillo Rd, Queen Creek, AZ 85142 (Town Center area)
- **Phone:** (480) 458-5571
- **Hours (per listings, CONFIRM WITH OWNER):** Mon–Sat 8:00 AM – 2:00 PM, Sun closed
- **Ratings:** about 4.5 stars across roughly 160 reviews on Yelp; ranked #1 for Mexican food and burritos in Queen Creek on one review aggregator
- **Current web presence:** directory listings only. No website of their own.
- **Note:** Some directories also list "El Compa Chuy" at this address. That may be an older name. Don't mention it on the site.

### Known menu items (no full menu with prices found, so use "Ask about today's prices" or leave prices blank)
- Street tacos: carne asada, al pastor, carnitas, chicken, fish, shrimp (a mid-2026 review mentions tacos at about $3.50)
- Burritos: carne asada, breakfast burritos (a standout in reviews)
- Breakfast plates: chorizo and egg
- Menudo
- Fajitas
- House red and green salsas

### What customers say (themes; paraphrase them, don't copy reviews word for word)
- Authentic, homemade flavor you can't get at the chains
- A real family-run spot. The family is warm and welcoming.
- Fast, friendly service, even when it's busy
- Great prices
- The salsas are a highlight
- Small space that fills up at peak times, so takeout is popular
- Locals were glad when it reopened

### Amenities
Dine-in, takeout, outdoor patio, kid-friendly, dogs allowed on the patio, wheelchair accessible, free parking, cards accepted.

## Site spec
- **Stack:** Plain HTML, CSS and a little vanilla JS. One `index.html`, one `styles.css`, one `script.js`, and an `images/` folder. No build step, no frameworks. It must be deployable by dragging the folder into Netlify Drop.
- **Mobile-first.** Most visitors will be on a phone looking for hours, the menu and directions.
- **Sections (one page, sticky nav):**
  1. **Hero:** name, a one-line tagline ("Family-made tacos & breakfast burritos in Queen Creek"), and two big buttons: **Call** (`tel:+14804585571`) and **Directions** (Google Maps link to the address). Show today's hours and an "Open now / Closed" badge computed in JS (America/Phoenix time, which has no daylight saving).
  2. **Menu:** cards grouped by Tacos / Burritos / Breakfast / Specials. Keep all menu data in one JS array or a `menu.json` so it's easy to edit. Use prices only where known and mark the rest "Ask in store".
  3. **About:** 2–3 short paragraphs about the family-run spot and authentic recipes. Keep it generic and warm, and mark it with `<!-- TODO: replace with owner's story -->`.
  4. **What people say:** 3–4 short *paraphrased* highlights from the themes above, each labeled "— Local reviewer". Add a "Read our reviews" button linking to Google Maps search results for the business. `<!-- TODO: swap in real quotes with owner permission -->`
  5. **Hours & location:** hours table, address, embedded map (`<iframe src="https://www.google.com/maps?q=Taqueria+Mis+Amigos+20905+E+Ocotillo+Rd+Queen+Creek+AZ&output=embed">`), and an amenities icon list.
  6. **Footer:** phone, address, hours, "© Taqueria Mis Amigos", and a small "Site by Nolan" credit.
- **Photos:** do NOT use photos from Google, Yelp or Facebook. Use placeholder blocks, or free stock food photos with the source noted in a comment, sized for web. Name them clearly (`images/hero.jpg`, `images/tacos.jpg`, and so on) so they're easy to replace with the owner's photos.
- **Bilingual:** add an English/Español toggle in the nav. Store strings in a JS object and remember the choice in `localStorage` (wrapped in try/catch).
- **Look:** warm and bold, not corporate. Palette: terracotta `#C4502B`, deep green `#1F4D3A`, cream `#FFF6E9`, marigold accent `#F2A541`, near-black text `#1E1B18`. Headings in a chunky display font (for example "Bricolage Grotesque" or "Rubik" from Google Fonts), body in "Inter". Optional: a subtle papel-picado style CSS border on the hero.
- **SEO:** title "Taqueria Mis Amigos | Mexican Food & Breakfast Burritos in Queen Creek, AZ"; a meta description; Open Graph tags; and `Restaurant` JSON-LD schema with the address, phone, hours, servesCuisine "Mexican" and priceRange "$".
- **Quality bar:** Lighthouse 90+ on mobile, accessible contrast, alt text on images, and no layout shift.
- **Demo banner:** a small dismissible top bar: "Preview site prepared for Taqueria Mis Amigos". Remove it when the site goes live.

## Before going live (checklist for Nolan, not for the build)
- [ ] Confirm hours. One listing hints at dinner service, but most say 8–2.
- [ ] Get the full menu and prices (a photo of the menu board works).
- [ ] Get real photos of the food, the storefront and the family (or shoot them yourself with permission).
- [ ] Get the owner's OK to quote specific reviews.
- [ ] Ask about catering, online ordering, and whether they want a Spanish-first version.
- [ ] Domain idea: `misamigosqc.com` or `taqueriamisamigosaz.com` (check availability).
- [ ] Claim and update their Google Business Profile to add the website link.

---

## Prompt to paste into Claude Code

> Read CLAUDE.md in this folder. Build the demo website it describes exactly: plain HTML/CSS/JS, mobile-first, every section listed, the bilingual toggle, the open-now badge in America/Phoenix time, menu data in one editable array, Restaurant JSON-LD, and placeholder images with clear filenames. Don't use any photos or verbatim reviews from Google, Yelp or Facebook. When you're done, run a quick check (open the page in a headless browser if available, check it at 375px width, and look for console errors). Then tell me how to preview it locally and how to deploy it free with Netlify Drop.
