# Phase 2 Exit Gate — Design-Lens Audit

- **Lens:** design (DESIGN-SPEC §§1–9; §§3/8/9 primary this phase, §§1–2/4–7 regression)
- **Scope:** Home, Platform, About, Contact rebuilt to §8 blueprints
- **Audited commit:** 1b58f99 (`feat(proof): canonical thridify.com impact metrics + real production testimonials`)
- **Surfaces:** repo source + live preview `https://site-thridify.snowy-cherry-cd2c.workers.dev` (node fetch)
- **Verdict:** **NO-GO** — 1 major blocker (D-1). Zero critical.

---

## Per-criterion result

| # | Gate criterion | Result |
|---|---|---|
| 1 | §8 blueprint conformance per page | **PASS (w/ 2 minor deviations)** |
| 2 | §3 text budgets (word-counted) | **PASS (w/ 1 minor)** |
| 3 | §9 UX laws | **FAIL — secondary-CTA rule (D-1, major)** |
| 4 | Regression vs Phase 1 (palette/type/one-pink/ProofCard) | **PASS** |
| 5 | Distinctiveness (showroom vs template) | **PASS** |

---

## Criterion 1 — §8 blueprint conformance

**Home** (`src/app/page.tsx`): HeroObject → MetricBar → LogoMarquee → BeforeAfter →
PipelineStrip (dark) → 6 VerticalCards → Product trio → Proof (6 metrics + 3 real
quotes + logos) → CTABand. **Exact match.** ✓

**About** (`src/app/about/page.tsx`): hero → founder story → mission (dark) →
global presence (India/Americas/Europe) → values → CTABand. **Match.** ✓ No fake
team photos (brand-geometry only). ✓

**Contact** (`src/app/contact/page.tsx`): hero → 2-field concierge form + regional
contacts → CTABand. **Match.** ✓ Form posts to `/api/contact` (Phase 0 pipeline),
autofill wired via `ConciergeForm`/`FormField`.

**Platform** (`src/app/platform/page.tsx`): hero → 5 product deep-dives (alternating
light/dark) → integrations row → CTABand. Two deviations from §8's prescribed
"hero (capability montage) → deep-dives → integrations row → **analytics section** →
CTABand" — see D-2, D-3 (both minor; content is present, only slot/order differ).

## Criterion 2 — §3 text budgets (measured word counts)

| Slot | Budget | Measured | OK |
|---|---|---|---|
| Home hero headline | ≤12 | 7 | ✓ |
| Home hero subline | ≤24 | 19 | ✓ |
| Platform hero headline / subline | ≤12 / ≤24 | 6 / 14 | ✓ |
| About hero headline / subline | ≤12 / ≤24 | 6 / 22 | ✓ |
| Contact hero headline / subline | ≤12 / ≤24 | 5 / 16 | ✓ |
| BeforeAfter lead | ≤40 | 19 | ✓ |
| Vertical card bodies (×6) | ≤28 | 12–14 | ✓ |
| Product-trio card bodies (×3) | ≤28 | 11–13 | ✓ |
| Platform deep-dive bodies (×5) | ≤40 | 17–25 | ✓ |
| About mission body | ≤80 | 45 (3 sentences) | ✓ |
| CTABand headlines (×4) | ≤10 | 5–8 | ✓ |

All copy within budget; no paragraph > 3 sentences. One §3 sub-rule is stressed on
About — see D-4 (minor).

## Criterion 3 — §9 UX laws

- One primary CTA "Book a Demo" → Calendly, `target="_blank" rel="noopener"`,
  sitewide (8 Calendly links/page; CTABand + MobileCtaBar + hero all point to
  `calendly.com/hello-thridify/30min`). ✓
- Mobile sticky CTA bar after 50% scroll: `MobileCtaBar` mounted in `layout.tsx`,
  `md:hidden`, shows at `scrollY/scrollable ≥ 0.5`, reduced-motion-safe. ✓
- 5-second test (Home): server HTML ships hero poster + finish swatches (Forest/
  Blush/Natural) + "3D & AR Commerce" eyebrow + "Reimagine how the world
  experiences your products" + impact stats — a cold viewer knows what Thridify
  does from the first viewport, even pre-JS. ✓
- Forwarded-link test: each page self-explanatory (unique h1 + descriptive intro). ✓
- OG image per page: `/og/{home,platform,about,contact}.png` present and resolve
  200 (`og/home.png` → `image/png`), `metadataBase` set. ✓
- **Secondary CTA rule — FAIL (D-1).**

## Criterion 4 — Regression

- **Palette:** canonical §1 tokens inlined in `layout.tsx`; grep for forbidden
  hexes (`#046bd2`, `#1e293b`, and common blue/slate) across `src` + `content` →
  **NONE**. ✓
- **Type scale:** all `tt-*` line-heights ≥ 1.05 (tt-display 1.05 / tt-1 1.1 /
  tt-2 1.2), margins in `rem`, `padding-bottom` descender guard present. No custom
  class collides with a Tailwind utility (`.h-1{}` etc. → NONE). ✓
- **One-pink rule:** disciplined. Home pink moments live in separate viewports
  (hero active-swatch dot; MetricBar's single pink stat; BeforeAfter "gains").
  Product trio forces `pinkAccent={false}` (three visuals share a viewport); Proof
  section uses teal (index-1 stat = `text-primary`, quote chips `bg-primary/10`),
  no pink. Platform deep-dives = one pink visual per viewport. ✓
- **ProofCard (new) vs §7.6:** REAL quotes only, verbatim from production
  thridify.com (Guntier / Sunbaby / Vortex Splash), company-level attribution
  ("— Guntier"), no invented person names. Matches ASSET-DEBT #2. ✓

## Criterion 5 — Distinctiveness

Reads as a **showroom, not a template.** HeroObject is a real `<model-viewer>` glTF
(poster-first lazy load, drag-to-spin, live finish swatches, IBM-Plex-Mono price
ticker, AR chip); BeforeAfter is an interactive flat→3D toggle; PipelineStrip is a
scroll-driven SVG line; ProductVisual ships bespoke brand-colored SVG art per
module. No stock photography, no Linear/Stripe clone geometry. ✓

---

## Findings

### D-1 — MAJOR — §9 secondary-CTA rule violated (BLOCKER)
**Spec:** §9 — "One primary CTA sitewide: 'Book a Demo'. **Secondary only: 'Try the
live demo' (no gate).**"
**Evidence:**
- `content/site.json` → `pages.home.hero.secondaryCta` = **"Explore the Platform"**
  (`/platform`); rendered live (home HTML contains "Explore the Platform").
- `pages.platform.hero.secondaryCta` = **"Talk to us"** (`/contact`); rendered live.
- The sanctioned secondary "Try the live demo" appears **nowhere** on the site
  (live grep on `/` and `/platform`: false).

The build ships navigational secondaries instead of the single spec-permitted
no-gate "Try the live demo" CTA. This is not a cosmetic label swap: the no-gate
try-it path is the affordance §9 mandates to serve the design thesis ("the product
demos itself" / low-friction interaction before booking). Its absence means a cold,
not-ready-to-book visitor is offered *more reading* ("Explore the Platform") rather
than an invitation to touch the live HeroObject.
**Fix (one of):** (a) replace the hero secondaries with a single "Try the live
demo" CTA anchored to the live HeroObject / a demo route (no gate); or (b) amend
§9 first if the product intentionally drops the try-it secondary.

### D-2 — MINOR — Platform blueprint: no standalone analytics section
**Spec:** §8 Platform — "... → integrations row → **analytics section** → CTABand."
**Evidence:** `src/app/platform/page.tsx` renders Analytics as product deep-dive #5
(`c.products.items[4]`), i.e. **before** the integrations row; there is no separate
analytics section after integrations. Content is present and well-placed; only the
prescribed section/order differs. Arguably redundant with the analytics module
deep-dive — flag for a spec-vs-build reconciliation, not a rebuild.

### D-3 — MINOR — Platform hero lacks the "capability montage" visual
**Spec:** §8 Platform — "hero (capability montage)".
**Evidence:** `src/app/platform/page.tsx` L27–50 — hero is text-only (eyebrow +
tt-display + lead + CTAs over an `aurora` gradient); no product visual/interactive
element in the first `/platform` viewport. Given the "no flat images / product
demos itself" thesis, the deepest product page opening with zero visual is a
distinctiveness miss. (A `ProductVisual` montage exists just below; note the real
captures for this slot are ASSET-DEBT #4.)

### D-4 — MINOR — About runs >2 consecutive text-only sections
**Spec:** §3 — "Max 2 consecutive sections without an interactive/visual element."
**Evidence:** `src/app/about/page.tsx` — after the hero's brand-geometry, About
runs **four** consecutive text-only sections (founder story → mission → presence
cards → values cards) before the CTABand; none carries an interactive/visual/media
element (layout variation and the dark mission interlude aside). This is in genuine
tension with §8's inherently narrative About blueprint and with §6/No-Faking (no
real team/office assets exist — ASSET-DEBT #15). Logged as a design tradeoff to
resolve when real About imagery lands; not a rebuild blocker.

---

## Notes (out of design lens, for cross-reference)
- No `robots noindex` on the preview host on any of the four pages — an SEO/QA
  concern (defer to SEO auditor), not a design finding.
- QA auditor's ghost-link finding (`/privacy`, `/terms` 404 from the global footer)
  is a QA/SEO regression, tracked in their report — noted here only for awareness.

---

**VERDICT: NO-GO**

Blocking: **D-1 (major)** — §9 secondary-CTA rule violated on Home and Platform
(navigational secondaries shipped; the mandated no-gate "Try the live demo" CTA is
absent sitewide). D-2/D-3/D-4 are minor and do not block, but D-3 (text-only
Platform hero) and D-4 (About text run) are worth addressing to keep the "showroom,
not template" bar. Everything else — §8 order (Home/About/Contact exact), §3 word
budgets, canonical palette, type scale, one-pink discipline, ProofCard §7.6,
distinctiveness — passes.
