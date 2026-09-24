# Kibandaski

Website for Kibandaski, a Kenyan restaurant. Customers browse the menu, build an order, and send it on WhatsApp (**0769 622 996**). They don't need an account.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4. Every page is statically generated.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional, defaults work
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` / `npm start` | Production build and server, with the full security headers |
| `npm run preview:local` | Production build that works over plain `http://localhost` and inside embedded preview panes |
| `npm run typecheck` | TypeScript check |
| `npm run images` | Re-downloads the placeholder photos into `public/images` as WebP |
| `npm run brand-assets` | Regenerates `apple-icon.png` and the social share image `public/og.jpg` |

## Everyday edits (no code knowledge needed)

| I want to change… | Edit this file |
| --- | --- |
| A dish, its price, photo or description | `src/data/menu.ts` |
| Mark a dish sold out | `src/data/menu.ts` → `available: false` |
| Which dishes show under **Popular** and in the "Flavor" collage | `src/data/menu.ts` → `featured: true` (4 works best) |
| Category names, order or tile photos | `src/data/categories.ts` |
| Weekly deals (Lunch Combo, Weekend Choma…) | `src/data/promotions.ts` |
| Customer reviews | `src/data/testimonials.ts` |
| Phone, WhatsApp number, opening hours, address, map | `src/config/site.ts` (or env vars) |
| Social media links | `src/config/site.ts` → `social` |

Prices are whole Kenyan shillings (`450` means KES 450). The cards, the cart, the WhatsApp message and the Google structured data all read from these files, so each change only needs making once.

### Photos
The dish photos are **placeholders** from Unsplash (free licence), listed with photographer credits in `src/data/image-sources.json`. Before launch, replace them with real photos of Kibandaski's food: drop your photo into `public/images/` with the same file name (e.g. `pilau-beef.webp`). Any size works because Next.js resizes it and serves AVIF/WebP automatically.

### Before going live, replace:
- [ ] **Testimonials**: the current ones are made-up examples for development (`src/data/testimonials.ts`)
- [ ] **Social links**: confirm the `kibandaski` handles are really yours (`src/config/site.ts`)
- [ ] **Address**: add street/area/city (`src/config/site.ts`, used on the Contact page and in Google's data)
- [ ] **Map**: set `NEXT_PUBLIC_MAP_EMBED_URL` (Google Maps → Share → Embed a map → copy the `src` URL)
- [ ] **Photos**: real food photography (see above)
- [ ] **Domain**: set `NEXT_PUBLIC_SITE_URL` to the real domain (canonical URLs, sitemap, structured data)

## How ordering works

1. Customers tap **Add** on any dish. The cart is stored in their browser only, so it survives a refresh; only item ids and quantities are kept.
2. The cart drawer (header button, or the sticky "View order" bar on phones) lets them change quantities, remove items, choose delivery or pick-up, and enter name, phone, location and notes.
3. **Order via WhatsApp** validates the form and opens `https://wa.me/254769622996` with a pre-filled message:

```
Hello Kibandaski,
I would like to place an order:

2x Chicken & Chips - KES 900
1x Ugali & Beef - KES 400

Total: KES 1,300

Name: John
Phone: 0712345678
Location: Nairobi CBD

Order notes:
Please make the chicken spicy.
```

Prices in the message always come from the menu data, never from what's stored in the browser. Customer details are not stored anywhere by the website.

## Project structure

```
src/
  app/                    Routes: / /menu /about /contact, plus sitemap, robots, manifest, icons
    api/menu/route.ts     Public read-only menu API (rate limited)
  components/
    layout/               Navbar, Footer, MenuSearch (lazy-loaded)
    sections/             Hero, MenuSection, FeaturedSection, PromoSection, AboutSection,
                          Testimonials, LocationSection / CtaBanner
    menu/                 MenuExplorer, CategoryFilter, MenuGrid, MenuCard, AddToOrder
    cart/                 CartProvider, CartDrawer (lazy), WhatsAppCheckout, QuantityStepper,
                          CartButton, MobileCartBar
    ui/                   Icons, Logo, button styles, dialog hook
    seo/                  JSON-LD helper
  config/site.ts          Branches, contact details, hours, nav, SEO keywords
  data/                   Menu, categories, promotions, testimonials (the "CMS")
  lib/
    repositories/         Data access: swap for a database later, UI stays the same
    ordering/             Checkout validation/sanitisation + WhatsApp message builder
    seo/jsonld.ts         Restaurant / LocalBusiness / Menu / MenuItem structured data
    rate-limit.ts, format.ts
  types/domain.ts         MenuItem, Category, Promotion, Branch, ...
```

## Built to grow

- **Admin dashboard / CMS**: all content goes through `src/lib/repositories/*`. Replace those functions with database or CMS queries that return the same types (`src/types/domain.ts`) and no component changes. `MenuItem` already has `id, name, description, price, category, image, available, featured, createdAt, updatedAt`.
- **Multiple branches**: `branches` in `src/config/site.ts` is already a list, with per-branch hours, number and map.
- **Online payments / M-Pesa**: checkout is isolated in `src/lib/ordering/`. Validation is framework-free, so the same rules can guard a future `POST /api/orders`. Keep secrets (e.g. `MPESA_CONSUMER_SECRET`) in server-only env vars without the `NEXT_PUBLIC_` prefix.
- **Delivery zones, inventory, promotions**: `available` on menu items, `active` on promotions; add zones as another typed data file behind a repository.
- **Mobile app / partners**: `GET /api/menu?category=nyama` returns the live menu.

## Security

- Strict Content-Security-Policy, HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy, COOP (`next.config.ts`). HSTS and anti-framing are switched off only for `npm run dev` and `preview:local`.
- Checkout input is validated (Kenyan phone format, name characters, length limits) and sanitised (control and zero-width characters stripped) before it's put in the message. The message is URL-encoded, and React escapes everything it renders.
- JSON-LD is serialised with `<`, `>`, `&` escaped.
- The public API is GET-only, validates query parameters, and is rate limited (60 requests/min per IP; in-memory, so move it to Redis/Upstash if you run multiple instances).
- No secrets live in the code, no accounts are required, and no customer data is stored.

## Art & motion

The decorative art lives in `src/components/art/Art.tsx`: hand-drawn chilli, sukuma leaf, tomato, sparkle, squiggle and curly-arrow doodles, rising steam, a spinning circle-text sticker (`CircleText`), a kitenge-inspired pattern band, wave dividers and a rotating sunburst. The motion utilities (`.bob`, `.sway`, `.twinkle`, `.spin-slow`, `.steam`, `.draw-in`, and the hero entrance classes) and the pattern backgrounds (`.kitenge`, `.bg-doodles`) are defined in `src/app/globals.css`.

- The hero headline slides up line by line, the plate spins in, the price sticker pops, and the "kweli." underline draws itself.
- Hand-drawn underlines and arrows draw themselves as you scroll (pure CSS scroll timelines).
- Tapping **Add** flies a round photo of the dish into the cart button, which bumps (`src/lib/flyToCart.ts`).
- Cards lift, tilt or zoom their photo on hover, the category photos grow, the price sticker wiggles and the Add button's plus sign spins.

All looping motion animates only `transform`/`opacity`, all art is `aria-hidden`, and everything stops for visitors who set `prefers-reduced-motion`.

## Accessibility & performance

- Semantic landmarks, one `h1` per page, logical heading order, a skip link, visible focus rings, native `<dialog>` for the cart, menu and search (focus trap and Esc), labelled form fields with linked error messages, ≥44px touch targets, `prefers-reduced-motion` respected, and sold-out states shown in text, not colour alone.
- Images are served as AVIF/WebP at responsive sizes and lazy-loaded below the fold. Fonts are self-hosted with `next/font`. The cart and search code only load when first opened. Scroll reveals are pure CSS, with no JavaScript.

Lighthouse (mobile, production build), measured on the development machine:

| Page | Performance* | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 90 | 100 | 100 | 100 |
| Menu | 90 | 100 | 100 | 100 |
| About | 96 | 100 | 100 | 100 |
| Contact | 97 | 100 | 100 | 100 |

\*Performance was run with a 2× CPU slowdown instead of Lighthouse's default 4×, because the test machine is slower than Lighthouse assumes (its CPU benchmark scored about 900–1,100). With the default 4× setting, performance scored 78–92 (home 78, menu 79–89 across repeat runs). Run Lighthouse again on the deployed site for definitive numbers.

## Deploying

Works on Vercel, Netlify or any Node 20.9+ host (`npm run build && npm start`). Set `NEXT_PUBLIC_SITE_URL` (and optionally `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_MAP_EMBED_URL`) in the host's environment settings.
