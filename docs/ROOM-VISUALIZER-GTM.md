# Room Visualizer + Shop the Look — Go-to-market strategy

Written 2026-10-11 from the thridify-fe `src/modules/roomVisualizer` history (v11.6 → v11.12.2, Sept 28 – Oct 10 2026) and the live dev surfaces. Governs the website pages and blog posts added in the same commit. Golden rules applied throughout: No-Faking (only shipped capabilities are described as shipped; only canonical metrics are quoted), Rule 19 (no pricing), Rule 23 (the only free things are the 15-day trial and the 30-minute demo), Rule 26 (links in first comment on social), Rule 27 (no geography pitch).

## 1. What we actually built (the facts the marketing must not outrun)

Two surfaces, one engine:

| Surface | Who uses it | Where | Status |
|---|---|---|---|
| **Room Visualizer** (admin) | The brand's merchandising / sales team | `admin → Room Visualizer`, deep links `/room-visualizer/:roomId` | Shipped. Save rooms, name them, **publish** them as curated looks (v11.12.0). |
| **Shop the Look** (public) | The brand's shoppers, designers, showroom staff | `/shop-the-look/:accountId`, brand-themed (logo, accent, currency, hide-pricing from theme.json) | Shipped behind a superadmin per-account flag (`isShopTheLookEnabled`). Noindex. |

Shipped capabilities a shopper gets on Shop the Look (verified in code and on devadmin on 2026-10-11):

- Browse the brand's **published catalogue**, search by name / PID / SKU, grouped by category.
- **Customize & add**: the real `<thridify-view>` configurator opens, the shopper picks finish / size / modules, and the *configured* product is baked and placed in the room at **true scale** (native metres, v11.12.1). The customization recipe is stored on the placed item and can be edited in place (v11.10.0).
- Six room templates (Empty Studio, Modern Dining, Scandi Living, Luxe Boutique, Bright Showroom, Cozy Bedroom), six lighting presets; switching style keeps the placed products.
- Room dimensions, see-through walls that fade as you orbit, wall art that hangs on the wall and fades with it, windows, pendant and floor lights that actually light the room, interior plants, clearance warnings.
- **Floor and wall finishes** (16 PBR textures: marbles, onyx, travertine, terrazzo, oaks, walnut, parquet, stone) with tiling scale + rotation; a **rug library** (12 CC0 fabrics × 25 drawn styles, real pile thickness, fringe).
- **Orbit / Plan / Walk** camera modes (top-down floor plan, eye-height walk-through with a virtual joystick on touch) + a saved viewpoint.
- **Whole-room AR**: the placed products export as one GLB and open in WebXR / Scene Viewer / Quick Look on the phone, with a QR hand-off on desktop. Products only by default; room elements optional.
- **Curated looks**: rooms the brand published appear in the shopper's Rooms tab and open as a fresh draft ("make it yours").

Not shipped (do NOT market as available; say "on the roadmap" only in a sales conversation): the Shop the Look Studio settings panel, the embeddable web component (hosted page only today), BOQ / bill of materials from the placed products, lead-gated save-and-share links, the in-scene brand mark. See `Claude-Workspace/THRIDIFY-SHOP-THE-LOOK-ADMIN-PLAN.md`.

## 2. Positioning

**One line:** *Thridify Room Visualizer lets a brand's shoppers compose a whole room from its real, configurable catalogue, at true scale, then stand in it in AR — from one link, with no app and no code.*

**Category we claim:** the *whole-room* layer of 3D commerce. Everyone in the market has a product-level "view in your room" button. The gap is that furniture, rugs, lighting and décor are bought *together*, and nobody sells them together online. A room page turns a single-SKU visit into a multi-SKU basket.

**Against the three things buyers will compare us to:**

| They will say | We say |
|---|---|
| "We already have AR on the PDP" | AR on a PDP answers "does this sofa fit?". A room answers "does this sofa go with that rug, under that light, against that wall?" — which is the question that decides the second and third item in the basket. Our AR exports the *whole composed room*. |
| "IKEA / Wayfair have room planners" | They have *their* planner for *their* catalogue, built by an in-house 3D team. This is the same capability as a hosted page on any brand's own published catalogue, themed to the brand, switched on per account — no engineering. |
| "Generic room planners (Planner 5D, Roomstyler, Homestyler)" | Those are consumer design apps with stock furniture. Ours is populated by the brand's *real, configurable* products — the placed sofa is the exact fabric and size the shopper picked, carrying its customization recipe, not a lookalike. |

**Proof we may quote:** only the six canonical metrics already on the site (`CANONICAL_METRICS` in `src/lib/industries.ts`) and the sourced ROI guide. No Room-Visualizer-specific numbers exist yet; the first customer with the flag on becomes the case study. Do not invent "basket size +X%".

## 3. Audiences, in priority order

1. **Furniture & home décor brands with 3D already on the PDP** (Rule 25: already-using-3D is the better signal). Trigger line: "your catalogue has sofas, rugs and lamps, and no page where a shopper can see them together."
2. **Rugs & carpets, lighting, wall art / décor brands** — their product is *contextual*; a rug alone on white is the weakest possible photo. The rug library and wall-art hanging are their demo.
3. **B2B furniture sellers to interior designers / architects** (secondary ICP). The planner + walk-through is a specification tool; curated looks are a designer's mood board that clients can buy from.
4. **Exhibition-heavy brands** (primary ICP participates in 2+ trade shows a year). Shop the Look on a booth tablet replaces the printed catalogue: build the visitor's room on the spot, hand them AR on their own phone via the QR.
5. **Modular kitchens / wardrobes** — later; the room is a living room today (no ceiling, no cabinets-on-wall tooling).

## 4. Messaging pillars (every asset picks one)

1. **Sell the room, not the SKU.** Basket logic. Headline family: "Shoppers don't buy a sofa. They buy a living room."
2. **Confidence at true scale.** Returns logic. Models are in real metres; the 203 cm sofa is 203 cm. Plan view is a floor plan with the real footprint.
3. **Curated by the brand, finished by the shopper.** Merchandising logic. Publish looks from the admin; shoppers open them and make them theirs.
4. **One link. No app. No code.** Deployment logic. Switched on per account, themed from Brand Settings, hosted page.

## 5. Channels and the first six weeks

| Week | Channel | Asset |
|---|---|---|
| 1 | Website | `/room-visualizer` (head term: "3D room visualizer", "room planner for furniture website") and `/shop-the-look` (term: "shop the look page", "shoppable room"). Footer + Features + Glossary + llms.txt + sitemap wired. Real screen captures + screen recording from the dev account. |
| 1 | Blog | Four posts (below), one live now, three scheduled 4 days apart so the blog feed shows a steady cadence. |
| 1–2 | LinkedIn (company + CEO) | Four posts, one per pillar, each with the 20-second screen recording as native video; Calendly in the first comment (Rule 26). Audience research per Rule 4 before writing. |
| 2 | Instagram / Facebook | Two reels from the recording (Orbit→Plan→Walk; Customize→Add→AR) with on-screen captions; Rule 8 WhatsApp notification. |
| 2 | Existing customers | Hands-on session offer to the furniture-adjacent accounts; flag switched on for them first. First case study candidate. |
| 2–6 | Outbound (lead hunters, their own territories, Rule 24) | New trigger added to the research step: "catalogue has 3D on single SKUs; no room / look page". Message anatomy per Rule 31. |
| 3 | Email | One announcement to the newsletter list: the `/room-visualizer` page + demo CTA. |
| 4 | Exhibitions | One-page "booth mode" PDF for sales: tablet + QR flow. |
| 6 | Review | KPIs below; decide whether to open the web-component embed track. |

**KPIs:** sessions on the two pages; demo bookings with the page as last touch; accounts with `isShopTheLookEnabled` on; curated looks published per account; AR opens from Shop the Look (room AR events). No vanity targets; report by segment (Rule 25).

## 6. Website pages added (this commit)

| URL | Role | Primary term |
|---|---|---|
| `https://thridify.com/room-visualizer` | Money page for the capability | 3D room visualizer, room planner for furniture ecommerce |
| `https://thridify.com/shop-the-look` | The hosted shopper page explained for brands | shop the look page, shoppable room |
| `https://thridify.com/glossary/room-visualizer` | Quotable definition | — |
| `https://thridify.com/glossary/shop-the-look` | Quotable definition | — |

Cross-links added from `/features`, `/3d-product-configurator`, `/ar-viewer`, `/industries/furniture`, the footer Platform column, `/llms.txt`, and the page sitemap.

## 7. Blog posts (content/blog, published via scripts/publish-blog.mjs)

| Slug | Pillar | Publish |
|---|---|---|
| `what-is-a-3d-room-visualizer` | Sell the room | now |
| `shop-the-look-pages-how-to-make-a-styled-room-shoppable` | Curated by the brand | +4 days |
| `room-planner-vs-ar-viewer-vs-3d-configurator` | Decision guide | +8 days |
| `7-things-a-3d-room-visualizer-has-to-get-right` | Confidence at true scale | +12 days |

## 8. Guard-rails for anyone extending this

- A shopper cannot *save or share* a look today. Do not write "save your room" on a public page.
- Shop the Look is a hosted page. Do not write "embed it on your product page" until the web component ships.
- The brand's AR exports products by default and room elements only when the switch is on. "View the whole room in AR" is accurate; "AR of your walls and floor by default" is not.
- Pricing on the page follows the account's `hidePricing` setting; never quote Thridify pricing.
