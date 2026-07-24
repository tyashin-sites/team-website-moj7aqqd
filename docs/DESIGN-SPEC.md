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

## 7. Signature components (the design budget concentrates here)

1. **HeroObject** — a photoreal furniture glTF in `<model-viewer>` (lazy,
   poster-frame first for LCP), auto-rotating slowly, drag-to-spin. Beside
   it: 3 finish swatches (teal ring on active, pink dot indicator) that swap
   the material; an IBM-Plex-Mono price that ticks when a swatch changes;
   an "AR" chip that reveals a QR code on desktop hover / becomes "View in
   your room" on mobile. This IS the pitch, delivered pre-copy.
2. **MetricBar** — directly under hero: 30% fewer returns · 3× faster close ·
   65% less rework · +23% recovery. Count-up numbers, mono font, one pink.
3. **BeforeAfter** — split panel: left = flat product photo annotated with
   pains (returns, quote delays); scrolling/toggling transforms to the 3D
   version annotated with gains in pink. The positioning made physical.
4. **PipelineStrip** — dark section; one continuous animated SVG line:
   Configure → Live price → Instant quote → BOM to factory. Each node a
   glass card with icon + ≤10 words.
5. **VerticalCard** — icon chip, vertical name, 1-line pain in their
   vocabulary, one metric, "Explore →" slide-in on hover.
6. **ProofCard** — REAL quotes with real names/companies only (No-Faking
   rule). Until real quotes are collected, ship metric-based proof cards
   (client logo + outcome number) instead of invented testimonials.
7. **CTABand** — dark ink section, subtle teal→pink aurora at 20% opacity,
   headline ≤ 10 words, single Calendly CTA.

Standard components: Header (72px, backdrop-blur, logo 40px tall, teal pill
CTA), Footer (large logo ~80px, real lucide social icons, phone numbers
`whitespace-nowrap`), SectionHeading (eyebrow + title + lead, left-aligned
default, centered only on CTA bands), FormField (autofill attrs mandatory,
2-field starter forms).

## 8. Page blueprints

**Home:** HeroObject → MetricBar → LogoMarquee → BeforeAfter → PipelineStrip
(dark) → Verticals grid (6 cards) → Product trio (viewer/configurator/AR,
each with a real capture) → Proof (metrics + logos) → CTABand.
**Platform:** hero (capability montage) → product deep-dives alternating
light/dark, each with real capture + ≤40 words → integrations row →
analytics section → CTABand.
**Vertical pages (×5: furniture, modular kitchens, doors & windows, prefab
structures, industrial machinery):** pain-led hero in their vocabulary →
category-specific demo/render → 3 outcomes with numbers → relevant proof →
CTABand. One intent per URL.
**About:** founder story (Delhi→Toronto, Shikha-fronted per brand rules) →
mission ≤80 words → global presence (India / Americas / Europe) → values →
CTABand. No fake team photos.
**Contact:** 2-field concierge form (email + product category, autofill on,
instant Calendly offer on submit) → regional contacts → CTABand.
**Comparisons (×2 to start):** honest tables vs Threekit/Zakeke/Marxent-class
tools; concede real strengths; extraction-friendly.
**/what-is-thridify:** dense declarative fact page for LLM retrieval.
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
