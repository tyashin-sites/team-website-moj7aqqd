# Phase 3 — Design Lens Audit (Wave A + Wave B)

Auditor: adversarial design lens. Scope: Wave A visible-UI (AR QR, per-industry
demo models) + Wave B new pages (/what-is-thridify, /services/3d-modelling,
/compare/*). Live host: https://team-website-moj7aqqd.sites.tyashin.com
(HEAD ed65e2b). Method: DESIGN-SPEC §§1,2,4,5,6,6a,7,8 + node-fetch of live
pages + repo source. Every finding reproduced twice.

## Per-criterion result

| # | Criterion | Result |
|---|-----------|--------|
| 1 | AR QR real & serves (§7.1) | PASS — `/models/ar-qr-chair.svg` 200 image/svg+xml; rendered in HeroObject + CapabilityDemo AR mode; no blank/dashed box |
| 2 | Per-industry distinct demo models + seamless raster posters (§6/§6a) | PASS — 5 distinct GLB+webp posters wired via `Industry.demoModel/demoPoster`; posters are raster webp (69–187 KB), not wireframes; prefab chair fallback is logged debt #19 |
| 3 | New pages conform (palette, tt- scale, one-pink, cards/motion, ≤12-word H1, text budgets, CTA pattern) | FAIL — one-pink rule broken on /compare/* and /services/3d-modelling; comparison hero intros over the §3 lead budget |
| 4 | Comparison tables responsive (overflow-x, no body scroll @375) | PASS — table `min-w-[640px]` inside `overflow-x-auto` wrapper; body does not scroll horizontally |
| 5 | Regression: no forbidden hexes / class collisions / infographic-only cards | PASS — no `#046bd2`/`#1e293b` in src or live HTML; no tt-/Tailwind class collisions; demo-first honored (CapabilityDemo live embeds, not infographics) |
| 6 | DR-2 swatch stays fixed | PASS — HeroObject applies active finish on model `load`; active swatch agrees with rendered material |

## Findings (severity-sorted)

### MAJOR

**D-1 — One-pink rule violated in every comparison table (§1, §7).**
`src/app/compare/[slug]/page.tsx:59` renders the Thridify column check chip with
`text-accent` (pink) for every row whose value starts with "Yes". All three
comparison datasets (`src/lib/comparisons.ts`) have 6 such rows, so the feature
table shows **6 simultaneous pink check-marks** in one desktop viewport on
/compare/threekit, /compare/zakeke and /compare/marxent. Spec §1: pink is
"THE moment color — max ONE pink element per viewport". Live `text-accent`
count = 14 per compare page. Fix: use teal (`text-primary`) for the Thridify
checks and reserve pink for a single hero/stat moment. Reproduced: source +
live fetch.

**D-2 — Comparison hero intro exceeds the §3 lead/subline text budget (×3 pages).**
`src/app/compare/[slug]/page.tsx:116` renders `c.intro` as the hero `.lead`
directly under the H1. Measured word counts: threekit ≈50, zakeke ≈56,
marxent ≈55 words. §3 caps a section-intro/lead at ≤40 words (hero subline
≤24). All three new comparison pages breach the hard limit. Fix: tighten each
intro to ≤40 words (lead) / move the extra sentences into body prose.

### MINOR

**D-3 — Pink step numbers dilute the moment color on /services/3d-modelling.**
`src/app/services/3d-modelling/page.tsx:268` sets the "01/02/03" step labels to
`text-accent`; the "How it works" section is a 3-col grid, so **3 pink numbers**
render in one viewport — over the §1 one-per-viewport rule (borderline: small
decorative labels). Fix: teal or muted mono for step numbers.

**D-4 — /what-is-thridify hero subline is 44 words (§3 subline ≤24 / lead ≤40).**
`src/app/what-is-thridify/page.tsx:172` renders `CANONICAL_DESCRIPTION`
(44 words) as the hero subline. Tension: §8 mandates the canonical entity
description **verbatim** as the first paragraph for LLM extraction, which
directly conflicts with §3. Logged as a spec tension, not a clean defect —
resolve by either shortening the canonical description or exempting this page
in §3.

## Non-findings (verified, not counted)
- Prefab-structures using the chair fallback — logged debt #19.
- Swatch demo prices ($1,189–$1,329) — illustrative, logged debt #10.
- Hero/CapabilityDemo placeholder CC0 chair — logged debt #16.
- `--brand-success/warning/danger` tokens exist in globals.css but do not
  render on any audited Wave A/B page.

## Verdict
2 MAJOR (D-1, D-2). **VERDICT: NO-GO.**
