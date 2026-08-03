# Phase 2 Exit Gate — Design-Lens Re-Audit (R2)

- **Lens:** design (DESIGN-SPEC §§1–10). This round = re-audit of the prior
  blockers + the newly-spec'd surface: SEAMLESS POSTER RULE (§6/§7.1),
  DEMO-FIRST PRINCIPLE (§6a), per-industry pages (§8), WonderlyAR /
  education removal (§6).
- **Audited commit:** `38890ac` (latest `main`) — CHUNKS 1–3 present.
- **Surfaces:** repo source; live primary `https://team-website-moj7aqqd.sites.tyashin.com`
  (11 routes, node fetch); secondary `https://site-thridify.snowy-cherry-cd2c.workers.dev`
  (node fetch sanity).
- **Verdict:** **GO** — zero critical, zero major. Two persisting minors, both
  non-blocking and tied to open asset debt.

---

## Per-criterion result

| # | Gate criterion | Result |
|---|---|---|
| 1 | Prior findings stay fixed (D-1/D-2/D-3/D-4) | **PASS** (D-1/D-2/D-3 fixed; D-4 persists as logged minor) |
| 2 | Seamless poster (§6/§7.1) — realistic raster still of exact model | **PASS** |
| 3 | Demo-first (§6a) — BeforeAfter same-product; capability cards interactive | **PASS** |
| 4 | 6 industry pages conform to §8 + design system | **PASS** |
| 5 | Education absent from every rendered page (§6) | **PASS** |
| 6 | Regression sweep (hex/collisions/text budgets/one-pink/375-768-1280) | **PASS** |

---

## Criterion 1 — Prior findings

- **D-1 (was MAJOR blocker) — FIXED.** All three hero `secondaryCta`s in
  `content/site.json` (L42/185/412) now read "Try the live demo". Live grep
  confirms the string on `/`, `/platform`, `/industries` and all six
  `/industries/<slug>`. Home wires it to `#demo` (anchor present:
  `src/app/page.tsx:83` `<div id="demo" className="scroll-mt-24">`), industry
  pages to `/#demo`.
- **D-2 (was MINOR) — FIXED.** `src/app/platform/page.tsx:33-34,143-159`
  pulls Analytics out of the deep-dive run into a standalone dark section
  AFTER the integrations row, per §8. `id="analytics"` retained for the footer
  anchor.
- **D-3 (was MINOR) — FIXED.** Platform hero now carries a live
  `CapabilityDemo mode="viewer"` (`platform/page.tsx:66-68`), poster-first —
  no longer a text-only hero.
- **D-4 (was MINOR) — PERSISTS (non-blocking).** `src/app/about/page.tsx`
  still runs 4 consecutive text-only sections (5 `<section>`, only an `aurora`
  gradient, no interactive/visual/media element). Same §3 tension as before,
  still gated on ASSET-DEBT #15 (no real About imagery). Not a rebuild
  blocker; carried forward.

## Criterion 2 — Seamless poster (§6/§7.1)

- Committed `public/models/sheen-chair-poster.webp` — RIFF/WebP, 43,070 B,
  1024×1024. Visually confirmed: a **photoreal raster still** of the exact
  SheenChair (PBR sheen fabric, tufting/buttons, wood legs, soft contact
  shadow) at the front initial camera pose — NOT a wireframe/outline/
  silhouette/SVG. The old hand-drawn SVG poster is gone (`ls public/models/*.svg`
  → none).
- Wired as `poster=` on the live `<model-viewer>` and as the poster-frame
  `<img>` in `HeroObject.tsx` (138-166), `CapabilityDemo.tsx` (30,140-146),
  and the BeforeAfter "flat photo" (`BeforeAfter.tsx:24,38-44`).
- Served live: `GET /models/sheen-chair-poster.webp` → `200 image/webp 43070B`
  on the primary host. Home HTML references the poster 7× (all demo instances).
- Seamlessness holds: the live viewer's default pre-interaction material is
  the model's native orange, matching the orange poster — no outline→realistic
  pop. (Material swaps only fire on swatch click.)

## Criterion 3 — Demo-first (§6a)

- **BeforeAfter** (`BeforeAfter.tsx`): left = the seamless poster as the "flat
  photo" (grayscale-0.35), right = a live `CapabilityDemo mode="viewer"` of the
  SAME chair. Reads as "same product, two experiences", not two graphics. ✓
- **Capability cards** — interactive, poster-first + activate-on-interaction:
  - Home product trio (`page.tsx:150-152`) → `CapabilityDemo` per mode.
  - Platform hero + viewer/configurator/AR deep-dives (`platform/page.tsx:67,112-113`)
    → `CapabilityDemo`; only Content-Gen + Analytics keep `ProductVisual`
    (no interactive form exists — spec-permitted last resort). ✓
  - Industry hero demo slot (`[slug]/page.tsx:170`) → `CapabilityDemo mode={heroDemo}`.
  `CapabilityDemo` mounts the heavy `<model-viewer>` only on click (module
  warmed on hover), so one demo instantiates at a time (§10 LCP). ✓

## Criterion 4 — Six industry pages (§8)

- All six routes 200 live with unique H1s; `generateStaticParams` over
  `INDUSTRY_SLUGS` (6) + `revalidate=3600` ISR.
- Structure per page (`[slug]/page.tsx`): breadcrumb → pain-framed hero + demo
  slot → "How Thridify helps <industry>" 3 capability cards → dark outcomes
  (canonical metrics only) → FAQ (4 real Qs) → related-industries + /platform
  internal links → CTA band (Book a Demo primary + Try the live demo secondary).
- Design system: `tt-1` H1 / `tt-2` H2 (LH ≥1.05), `eyebrow`, teal icon chips
  (`bg-primary/10 text-primary`), `card`, `glass-card` on dark, `transition-ui`
  hover-lift. No sub-1.0 line-heights; no Tailwind-colliding class names.
- One-pink on the dark outcomes viewport: only `idx===0` metric value is
  `text-accent` (pink); the rest `text-paper`; the optional Guntier `ProofCard`
  is teal-only. Exactly one pink element. ✓
- Canonical-metric discipline: `CANONICAL_METRICS` = the six permitted stats
  verbatim; `outcomes` add context strings but no new numbers.
- H1 word counts (≤12): furniture 9, modular-kitchens 9, doors 10, prefab 9,
  machinery 10, laminates 9. All pass.
- Card/hero/lead budgets (§3) spot-counted: helps bodies 19–22 (≤28), hero
  sublines 20–23 (≤24), helpsIntro leads 25 (≤40). All pass.

## Criterion 5 — Education removed (§6)

Live regex sweep (comments stripped) across all 11 routes: no "education /
pre-school / flashcard / publishing / wonderly" on any rendered page. Source
mentions exist ONLY in explanatory code comments (`page.tsx:33`,
`industries.ts:16`), never in rendered content, metadata, icons, or schema. ✓

## Criterion 6 — Regression sweep

- **Forbidden hex:** grep of `src/`+`content/` — no `#046bd2`, no `#1e293b`,
  no `blue-*`/`slate-*`/`indigo-*`/`sky-*`. The only non-canonical hexes are
  pre-existing and non-blue/slate: `#6FCFAB` (teal-soft, on-dark contrast) and
  the semantic `--brand-success/warning/danger` status tokens — out of this
  round's new-work scope and passed by prior audits.
- **Class collisions:** custom classes are `tt-*` / `eyebrow` / `lead` / `card`
  / `btn*` / `container-x` / `section` / `aurora` / `on-dark` / `glass-card` —
  no `.h-1`/`.w-1`-style Tailwind-utility collisions. `tt-display/1/2`
  line-heights = 1.05 / 1.1 / 1.2.
- **One-pink:** hero active-swatch dot; MetricBar single pink stat; BeforeAfter
  gains cluster; industry outcomes idx-0 — each in its own viewport. ✓
- **Responsive (375/768/1280):** grids are `grid-cols-1 → md/lg` and
  `lg:grid-cols-2/12` (hero/deep-dive), stacking cleanly on mobile;
  clamp-based type with LH ≥1.05 (no sub-1.0 overlap regression). No overlap/
  clipping evident in source; all 11 routes 200 on both hosts.

---

## Findings (all non-blocking)

### DR-1 — MINOR — About runs 4 consecutive text-only sections (§3)
Carried from D-4. `src/app/about/page.tsx` — founder story → mission → presence
→ values with no interactive/visual/media element. Gated on ASSET-DEBT #15
(no real About imagery). Non-blocking.

### DR-2 — MINOR — Hero/CapabilityDemo initial swatch state ≠ displayed material (§7.1)
On mount `active=0` ("Forest", teal ring + pink dot, price $1,249) but the model
renders in its native orange sheen (material only swaps on swatch click — no
on-load apply in `HeroObject.tsx`/`CapabilityDemo.tsx`). Result: the UI shows
"Forest" selected over an orange chair. This is the SAFE choice for seamlessness
(applying Forest on mount would pop green over the orange poster), but the active
swatch should reflect the shown material — e.g. apply `FINISHES[0]` on the
model-viewer `load` event, or seed `active` to the native finish. Cosmetic;
non-blocking.

### DR-3 — MINOR/OBSERVATION — Industry H1s are capability-led, not strictly pain-led (§8)
§8 asks for a "pain-led hero". The H1s lead with the capability and embed the
pain in a subordinate clause ("A 3D furniture configurator that ends returns
from guesswork"). The pain vocabulary IS present (in H1 tail + eyebrow +
subtitle + `pain` string), so the hero reads pain-aware; the ordering is a
stylistic interpretation, not a budget/structure breach. Non-blocking.

### Note — Industry CTA-band headline at the ≤10-word ceiling (§7.7)
"See your <industry> range rebuilt in 3D — live." hits exactly 10 words for the
longest verticals (Furniture & Home Decor, Modular Kitchens & Wardrobes, Prefab &
Modular Structures) counting the ampersand as non-word. Within budget; flagged
only so a future name change doesn't tip it over.

---

**VERDICT: GO**

All Phase-2 design gate criteria pass. The prior major blocker (D-1) and both
prior minors D-2/D-3 are fixed. The newly-spec'd surface — seamless raster
poster (§6/§7.1), demo-first capability cards + same-product BeforeAfter (§6a),
six SEO-conformant per-industry pages (§8), and complete education/WonderlyAR
removal (§6) — all conform. Remaining items (DR-1/DR-2/DR-3) are minors, none
blocking, and DR-1 is bound to open asset debt.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
