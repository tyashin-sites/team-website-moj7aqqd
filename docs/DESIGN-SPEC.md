# Thridify Website — Canonical Design Specification (v1)

This document is the single source of truth for every visual and interaction
decision on the Thridify website. Any agent or human touching the site MUST
read this before writing code. Deviations require an explicit spec change
committed here first.

**Design thesis: "The product demos itself."** Thridify's pitch is that flat
images are dead — so the site cannot be made of flat images. Wherever a
competitor would put a screenshot, Thridify puts something you can touch.
Where interactivity isn't possible, we create dimensionality. The site must
communicate WHAT THRIDIFY DOES within 5 seconds of landing, without reading
a paragraph.

**Anti-goals:** must NOT look like a generic SaaS template (Linear/Stripe
clone), must NOT be text-heavy, must NOT use stock photography, must NOT be
flashier than the product itself.

---

## 1. Color system (CANONICAL — from Thridify brand kit, non-negotiable)

| Token | Hex | Usage |
|---|---|---|
| `--brand-primary` | `#007050` | Teal green. Headlines accents, CTAs, stat numbers, icon chips, links |
| `--brand-primary-deep` | `#004D37` | CTA hover/gradient end, dark accents |
| `--brand-accent` | `#FEBFCC` | Pink. THE "moment" color — max ONE pink element per viewport (active swatch, key stat, hotspot) |
| `--brand-ink` | `#021F17` | Dark section backgrounds (teal-tinted — NEVER generic slate `#1e293b`) |
| `--brand-paper` | `#FFFFFF` | Light section base |
| `--brand-paper-tint` | `#F0F5FA` | Alternate light sections, cards on white |
| `--brand-muted-dark` | `#A3BFB5` | Muted text on dark backgrounds |
| `--brand-muted-light` | `#5B7A6E` | Muted text / captions on light backgrounds |

**Ratios:** ~70% neutral (paper/ink), ~20% teal, ~10% pink. Pink is scarce by
design — scarcity is what makes it land.

**FORBIDDEN:** `#046bd2` (blue), `#1e293b` (slate), any random green/orange.
The Tyashin brand kit for this project must be updated to these values
(`PATCH /projects/:id/brand-kit`) so `/brand-kit.css` serves the same palette.

**Section rhythm:** alternate light (read) and dark (experience) sections.
Dark `#021F17` sections are "showroom mode" — product renders glow against
them with a soft pink rim-light. Light sections carry reading content.

## 2. Typography

| Role | Font | Weights | Loading |
|---|---|---|---|
| Display / headings | **Space Grotesk** | 500, 700 | `next/font/google`, `display: swap` |
| Body / UI | **Inter** | 400, 500, 600 | `next/font/google` |
| Data / price / code | **IBM Plex Mono** | 400, 500 | `next/font/google` — used for the live price ticker, metrics, BOM strings |

Type scale (all clamp-based, line-height ≥ 1.05 ALWAYS — the sub-1.0 overlap
bug must never return; margins in `rem` never `em`):

| Class | Size | LH | Tracking | Margin-bottom |
|---|---|---|---|---|
| `tt-display` | `clamp(2.75rem, 6.5vw, 5.5rem)` | 1.05 | -0.03em | 2rem |
| `tt-1` | `clamp(2rem, 4.5vw, 3.5rem)` | 1.1 | -0.02em | 1.5rem |
| `tt-2` | `clamp(1.5rem, 3vw, 2.25rem)` | 1.2 | -0.01em | 1.25rem |
| `lead` | `clamp(1.125rem, 1.5vw, 1.375rem)` | 1.55 | 0 | — |
| body | `1rem` | 1.65 | 0 | — |
| `eyebrow` | `0.75rem` | 1 | 0.18em uppercase | 1.25rem, teal |
| caption/mono-data | `0.8125rem` | 1.5 | 0 | — |

Never name custom classes with Tailwind-utility-colliding names (`h-1`,
`h-2`, etc.). The `tt-` namespace is reserved for typography tokens.

## 3. Text budget (HARD limits — enforced by auditors)

- Hero headline ≤ 12 words. Hero subline ≤ 24 words.
- Section intro (lead) ≤ 40 words.
- Card body ≤ 28 words.
- Max 2 consecutive sections without an interactive/visual element.
- Every section scannable from heading + one bolded metric alone.
- No paragraph over 3 sentences anywhere outside the blog.
- **Exception (machine-extraction surface):** the canonical entity description
  (`CANONICAL_DESCRIPTION`) is rendered verbatim as the first body paragraph on
  `/what-is-thridify` and in `/llms.txt` for LLM/entity extraction, and is
  exempt from the lead/subline word caps. It is rendered as ordinary body prose
  (not an oversized `.lead`/hero subline) and, being 2 sentences, still honors
  the ≤3-sentences-per-paragraph rule.

## 4. Spacing, grid, surfaces

- 4px base unit. Section padding `clamp(5rem, 10vw, 8.5rem)` vertical.
- Container `max-width: 80rem`, padding-inline 1.5rem mobile / 2.5rem md+.
- 12-column mental grid; content column for prose `max-width: 65ch`.
- Radius: 16px cards, 12px inputs, 999px pills/CTAs.
- Borders: `1px solid rgb(foreground / 0.08)`.
- Shadows (teal-cast, never gray): rest `0 1px 2px rgba(2,31,23,.06)`;
  hover `0 12px 32px rgba(0,112,80,.14)`.
- Glass cards on dark: bg `rgba(0,112,80,0.08)`, border `rgba(0,112,80,0.25)`.
- Accent line gradient: `linear-gradient(90deg, #007050, #FEBFCC)` — used as
  4px underlines/dividers on signature sections only.

## 5. Motion & interaction spec

| Tier | Duration | Easing | Used for |
|---|---|---|---|
| Micro | 150ms | `cubic-bezier(.22,1,.36,1)` | hovers, swatch select, link color |
| UI | 300ms | same | card lift, menu, accordion |
| Reveal | 600ms | same | scroll-in: opacity 0→1 + translateY 24px→0, stagger 60–80ms per sibling, fires once |
| Hero | 900ms | same | initial hero entrance choreography |

- Counters: count-up over 1.4s ease-out when scrolled into view, once.
- Logo marquee: 40s linear infinite, pause on hover.
- Card hover: translateY(-4px) + shadow tier-2 + 1–2° max tilt. Never more.
- CTA hover: background sweep `#007050 → #004D37`, 150ms; focus ring
  2px `#FEBFCC` offset 2px (visible keyboard focus everywhere).
- Pipeline strip: SVG path draw (stroke-dashoffset) tied to scroll progress.
- `prefers-reduced-motion: reduce` → all transforms off, opacity-only, no
  marquee autoplay, no counters (show final values).
- NO parallax, NO scroll-jacking, NO cursor-following gimmicks.

## 6. Iconography & imagery

- Icons: lucide-react, 1.5px stroke, 24px, inside 48px rounded-xl chips of
  `primary/10` teal; chip fills solid teal + white icon on hover.
- Imagery rules: **NO generic stock photos.** Allowed: real product renders,
  configurator screen recordings, AR phone captures, real client logos/assets,
  abstract 3D-geometry graphics in brand colors. Every image must earn its
  place (show the product or prove a claim). Until real client 3D assets are
  provided, use clearly-neutral placeholder renders (CC0 furniture glTF) and
  track them in `docs/ASSET-DEBT.md` for replacement — never fake "customer"
  imagery.
- Client logos: real files only (Nasher Miles, Guntier, Sunbaby, Vortex
  Splash already sourced from thridify.com).

**SEAMLESS POSTER RULE (mandatory, applies to every `<model-viewer>` /
interactive embed on the site).** A poster MUST be a realistic RASTER still
(PNG/WebP) of the EXACT model at its component's initial camera pose — never
a wireframe, outline, line-drawing, silhouette, or abstract placeholder. The
poster is rendered from the same model with the same renderer/camera/lighting
that will run once interactive, so the load → interactive transition is
imperceptible (no outline→realistic "pop"). When the real client model or
Thridify experience replaces a placeholder, its poster is regenerated the
same way in the same commit. A hand-drawn/SVG "loading" poster is a spec
violation.

**WonderlyAR decoupling (scope boundary).** AR-for-education — pre-schools,
AR-enabled books/flashcards, publishing — is being spun out into a SEPARATE
brand, **WonderlyAR**. It is NOT part of Thridify. Education, pre-schools,
AR-books, and publishing MUST NOT appear anywhere on the Thridify site
(industries grid, industries pages, copy, metadata, icons, schema).

## 6a. DEMO-FIRST PRINCIPLE (mandatory, sitewide)

The design thesis — "the product demos itself" — is a HARD rule, not a mood.
Wherever a feature or use-case CAN be shown as a live interactive demo, it
MUST be, not an infographic, abstract SVG, or screenshot.

- **Comparisons (flat vs 3D)** compare the EXPERIENCE, not abstract graphics:
  the SAME real product as a static image (left, the "flat photo") vs its
  interactive 3D (right). Same product, two experiences.
- **Product capability cards** (3D 360° Viewer, Configurator, AR) MUST embed
  an interactive mini-demo of the real model — not an abstract visual. To
  protect LCP (§10) they are **poster-first + activate-on-interaction**
  (tap/click to load the live demo), so only one heavy demo instantiates at
  a time. The poster obeys the SEAMLESS POSTER RULE (§6).
- This applies on Home AND Platform AND anywhere these cards/comparisons
  appear (industry pages included).
- Abstract brand-geometry visuals (`ProductVisual`) are a LAST resort only
  where no interactive demo is possible; a capability that can be demoed and
  is shown as an infographic instead is a spec violation.
- Real Thridify experience embeds (per `docs/integration/`) replace the
  placeholder-model demos when the SDK standalone-embed lands; the poster is
  regenerated at that point.

## 7. Signature components (the design budget concentrates here)

1. **HeroObject** — a photoreal furniture glTF in `<model-viewer>` (lazy,
   poster-frame first for LCP). The poster obeys the SEAMLESS POSTER RULE
   (§6): a realistic raster still of the exact model at the initial camera
   pose, so load→interactive is imperceptible. Auto-rotating slowly, drag-to-spin. Beside
   it: 3 finish swatches (teal ring on active, pink dot indicator) that swap
   the material; an IBM-Plex-Mono price that ticks when a swatch changes;
   an "AR" chip that reveals a QR code on desktop hover / becomes "View in
   your room" on mobile. This IS the pitch, delivered pre-copy.
2. **MetricBar** — directly under hero, the 4 strongest of the canonical
   set: 75% lower product returns · 3× higher conversion · 100% more
   engagement · 70% lower photography cost. Count-up numbers, mono font,
   one pink.

   **CANONICAL IMPACT METRICS (the ONLY permitted stat set sitewide —
   source: thridify.com production homepage, user-confirmed 2026-07-24):**
   - 75% Lower Product Returns
   - 3× Higher Conversion Rates
   - 100% More Engagement
   - 70% Lower Photography Cost
   - 100% Higher Click-through Rate
   - 40% Lower Inventory Cost

   MetricBar carries the first four; the home Proof section carries all
   six as metric cards. No other quantitative claim may render anywhere
   on the site. If this list changes, change it HERE and in the site in
   the same commit — spec and site must never disagree.
3. **BeforeAfter** — split panel comparing the SAME product as two
   experiences (DEMO-FIRST, §6a): left = a static raster still of the product
   (the "flat photo") annotated with pains (returns, quote delays,
   guesswork); right = the interactive 3D of that IDENTICAL product annotated
   with gains in pink. Uses the hero model's seamless poster as the flat
   still and the live `<model-viewer>` as the 3D — it must read as "same
   product, two experiences", not two different graphics.
4. **PipelineStrip** — dark section; one continuous animated SVG line:
   Configure → Live price → Instant quote → BOM to factory. Each node a
   glass card with icon + ≤10 words.
5. **VerticalCard** — icon chip, vertical name, 1-line pain in their
   vocabulary, one metric, "Explore →" slide-in on hover.
6. **ProofCard** — REAL quotes only (No-Faking rule), company-level
   attribution ("— Guntier") exactly as production thridify.com does; never
   invented person names. Current real set (verbatim from production,
   user-confirmed 2026-07-24): Guntier, Sunbaby, Vortex Splash. Metric
   proof cards (outcome number + logos) accompany the quotes.
7. **CTABand** — dark ink section, subtle teal→pink aurora at 20% opacity,
   headline ≤ 10 words, single Calendly CTA.

Standard components: Header (72px, backdrop-blur, logo 40px tall, teal pill
CTA), Footer (large logo ~80px, real lucide social icons, phone numbers
`whitespace-nowrap`), SectionHeading (eyebrow + title + lead, left-aligned
default, centered only on CTA bands), FormField (autofill attrs mandatory,
2-field starter forms).

## 8. Page blueprints

**Home:** HeroObject → MetricBar → LogoMarquee → BeforeAfter → PipelineStrip
(dark) → Verticals grid (6 cards, each linking to its own /industries/<slug>
page) → Product trio (viewer/configurator/AR, each an interactive mini-demo
per §6a) → Proof (metrics + logos) → CTABand.
**Platform product suite — the FIVE canonical modules (CANONICAL, user-confirmed
2026-08-02):** 3D 360° Viewer · 3D Configurator · AR Viewer · **3D Modelling
Service** · Analytics. **Positioning correction (2026-08-02):** Thridify does
NOT do automated "3D Content Generation" (unlimited AI photos/video from one
asset). Module #4 is a HUMAN-DELIVERED **3D Modelling Service** — we model a
customer's catalog into interactive, AR-ready assets (glTF/GLB/USDZ), no
in-house 3D team required. No automated-content-generation / "generate
unlimited photos" claim may render anywhere on the site (this is a No-Faking
correction). The wedge strategy (bake into copy): sell 3D modelling of a single
SKU/catalog into retail suppliers → prove ROI → upsell the configurator + AR
platform. Keywords: "3D product modelling service", "3D model creation for
ecommerce", "product 3D modelling company", "outsource 3D product modelling",
"glTF/GLB/USDZ model creation", "3D modelling for furniture/retail".
Module #4 has a dedicated SEO service page (below); on /platform it keeps an
abstract `ProductVisual variant="modelling"` (no interactive form to demo).

**Platform:** hero (capability montage) → product deep-dives alternating
light/dark, each with an interactive mini-demo (§6a) + ≤40 words →
integrations row → analytics section → CTABand.
**3D Modelling Service (`/services/3d-modelling`):** dedicated SEO page —
pain-led ≤12-word H1 with the primary keyword + live demo → what you get
(formats, photoreal, turnaround) → how it works (send catalog → we model →
delivered/embedded) → the wedge (modelling → configurator/AR) → outcomes
(canonical metrics only) → FAQ (FAQPage schema) → CTA. Full per-page SEO:
unique title/desc/canonical/OG, Service + FAQPage + BreadcrumbList JSON-LD,
keyword H2s, alt text. In sitemap + footer + linked from /platform and every
industry page.
**Industries index (`/industries`):** lists the 6 canonical verticals, each
card linking to its own per-industry page.
**Per-industry pages — the 6 canonical verticals, one URL each, statically
generated with UNIQUE content:**

| Vertical | URL |
|---|---|
| Furniture & Home Decor | `/industries/furniture` |
| Modular Kitchens & Wardrobes | `/industries/modular-kitchens` |
| Doors & Windows | `/industries/doors-and-windows` |
| Prefab & Modular Structures | `/industries/prefab-structures` |
| Industrial Machinery | `/industries/industrial-machinery` |
| Laminates & Surfaces | `/industries/laminates-surfaces` |

Per-page structure (one intent per URL): pain-led hero in that industry's
vocabulary (≤12-word H1 + demo/visual slot) → "How Thridify helps
<industry>" mapping the capabilities (configurator/AR/viewer) to their sales
workflow → industry-framed outcomes using ONLY the canonical metric set
(§7.2) → real-client proof where it honestly maps (Guntier→kitchens & doors;
Airolam→laminates; else metric-only) → FAQ block (4–6 real questions that
industry Googles) → CTA band (Book a Demo → Calendly primary, Try the live
demo → /#demo secondary). SEO is MANDATORY per page: unique
title/description/canonical/OG, H1 with the primary keyword, keyword-targeted
H2s, FAQPage + BreadcrumbList + Service JSON-LD, descriptive alt text,
internal links to 2–3 related industries + /platform, all six in the
sitemap. Text budgets (§3) still hold — SEO-rich, never walls of text.
**Education is NOT a vertical** (spun out to WonderlyAR, §6).
**Per-industry demo model (2026-08-02, CHUNK 3):** each industry page's
hero demo shows a DISTINCT, industry-relevant model (not the generic chair)
via `Industry.demoModel/demoPoster` → `CapabilityDemo model/poster`.
Placeholders are CC0 (Khronos), draco+WebP-optimised ≤2MB, with seamless
posters (§6); provenance in `public/models/SOURCES.md`, gaps in ASSET-DEBT.
No CC0 structure model exists for prefab-structures → it keeps the chair
fallback until a real model lands. All six want real client models (#16).
**About:** founder story (Delhi→Toronto, Shikha-fronted per brand rules) →
mission ≤80 words → global presence (India / Americas / Europe) → values →
CTABand. No fake team photos.
**Contact:** 2-field concierge form (email + product category, autofill on,
instant Calendly offer on submit) → regional contacts → CTABand.
**Comparisons (×3, SHIPPED Phase 3 Wave B):** honest tables at
`/compare/threekit`, `/compare/zakeke`, `/compare/marxent` — concede real
competitor strengths, neutral "varies / contact vendor" where unsure (No-Faking
on competitor facts), extraction-friendly, FAQPage + BreadcrumbList JSON-LD,
unique title/desc/canonical/OG, cross-linked + in sitemap. Data:
`src/lib/comparisons.ts`.
**/what-is-thridify (SHIPPED Phase 3 Wave B):** dense declarative fact page for
LLM retrieval — first paragraph = the canonical entity description verbatim,
Q-style H2s with direct first-sentence answers, facts table, canonical metrics,
FAQPage + BreadcrumbList JSON-LD, in sitemap + footer.
**Sitewide entity graph (SHIPPED Phase 3 Wave B):** Organization +
SoftwareApplication JSON-LD on EVERY page (root layout via
`src/components/SiteSchema.tsx` + `src/lib/schema.ts`), WebSite entity added on
Home + /platform. `CANONICAL_DESCRIPTION`, `LEGAL_NAME` and the 4 canonical
socials live in `src/lib/schema.ts` and are reused verbatim in `/llms.txt` and
`/what-is-thridify` for entity consistency. No offers/aggregateRating
(No-Faking).
**Crawler plumbing (SHIPPED Phase 3 Wave B):** `/robots.txt` (AI-crawler
allowlist + Sitemap ref; crawl-access only, preview noindex header is a
separate mechanism kept until Phase 7) and `/llms.txt` (canonical description +
factual bullets) via route handlers. Platform-edge / Cloudflare robots
interception logged in ASSET-DEBT #20.
**Legal:** real privacy policy + terms (GDPR/PIPEDA aware).

## 9. UX laws

- One primary CTA sitewide: "Book a Demo" → https://calendly.com/hello-thridify/30min
  (new tab). Secondary only: "Try the live demo" (no gate).
- 5-second test: a stranger must answer "what do they do?" from the first
  viewport alone.
- Mobile-first for two flows: the AR demo and Book-a-Demo. Sticky bottom
  CTA bar on mobile after 50% scroll.
- Every page must make sense with zero prior context (forwarded-link test)
  and carry a real OG image (product render, not generic banner).
- Accessibility: WCAG 2.1 AA — contrast ≥ 4.5:1 body / 3:1 large text
  (verify pink-on-dark never carries body text), full keyboard nav, alt
  text everywhere, focus-visible rings, semantic landmarks.

## 10. Performance budget (design constraints, not afterthoughts)

- LCP < 2.5s on mid-tier mobile (hero poster frame, model-viewer deferred).
- CLS < 0.1 (fonts via next/font, dimensions on all media).
- 3D assets: glTF ≤ 2MB draco-compressed, loaded on interaction/idle.
- No new heavy dependencies without spec amendment. If a design idea breaks
  the budget, the idea loses.
