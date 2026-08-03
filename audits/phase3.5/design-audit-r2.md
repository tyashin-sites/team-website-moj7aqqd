# Phase 3.5 — DESIGN lens audit R2 (adversarial re-verify)

Scope: verify the Phase 3.5 fix (`f08509d`) closed MAJOR-1 (one-pink rule) on
`/features` and `/platform`. Auditor: design lens, DESIGN-SPEC §§1–9.
Live: https://team-website-moj7aqqd.sites.tyashin.com — verified via node fetch.
Source: git main (fix commit `f08509d`). Verified independently, twice.

## text-accent counts — before / after

| Page | Before (R1, live) | After (R2, live) |
|------|-------------------|------------------|
| `/features` | **38** | **0** |
| `/platform` | **18** | **0** |
| `/integrations/shopify` (control) | 2 | **2** (untouched) |
| `/services/3d-modelling` (control) | 2 | **2** (untouched) |

## Per-criterion result

| # | Criterion | Result |
|---|-----------|--------|
| 1 | MAJOR-1 one-pink on dark pillars §1/§7.2 — icon chips/eyebrows/checks/links use on-dark soft-teal, not pink | **PASS (CLOSED)** |
| 2 | No regression from class swap — palette canonical, tt- scale, budgets, demo-first, Shopify untouched | PASS |
| 3 | Responsive / coherence / distinctiveness §8 | PASS |

## MAJOR-1 — CLOSED

- Source: `grep -rn text-accent src/app/features/page.tsx src/app/platform/page.tsx`
  → **zero** matches. On-dark icon chips, checkmarks and links now use
  `text-primary-soft` (features:281,312,331,399,406; platform:86,124,150,347).
- On-dark eyebrows drop the per-page `text-accent` override and inherit the
  `.on-dark .eyebrow { color: var(--brand-primary-soft) }` CSS convention
  (globals.css:316–317, 9.3:1 on ink). features:289 / platform:94 emit a bare
  `.eyebrow` inside `on-dark` sections (7 on-dark contexts on /features, 13 on
  /platform, live). Soft-teal convention confirmed.
- Live: `/features` and `/platform` both render **0** `text-accent`. The only
  `#FEBFCC` on those pages are (a) the `--brand-accent` token/gradient
  definitions in inlined `:root` CSS (not rendered elements), and (b) on
  `/platform`, the single `<circle r="5" fill="#FEBFCC">` accent dot inside each
  pillar's `ProductVisual` SVG — one pink dot per visual, each in a distinct
  scroll viewport (ProductVisual.tsx:8 "one pink accent max per visual", :44).
  That is the intended single pink "moment" per viewport, matching the
  disciplined `/integrations/shopify` + `/services/3d-modelling` convention.
- `/features` dark pillars carry **zero** pink (no ProductVisual pink dot in the
  dark list sections).

## No regression (criterion 2)

- **Palette canonical:** `--brand-primary-soft: #6FCFAB` is a documented
  canonical token (globals.css:20–22; DESIGN-SPEC palette), purpose-built "for
  small teal accents ON DARK ink (eyebrows), 9.3:1" — not a new color. No
  forbidden blue/slate/stray hex introduced by the swap.
- **Type scale:** `tt-*` namespace intact; class swap touched only color
  utilities.
- **Text budgets / scannability:** unchanged — swap was color-only; pillar
  grouping and taglines (all ≤14) from R1 still hold.
- **Demo-first §6a:** `/platform` still renders live `CapabilityDemo`
  (viewer/configurator/AR; platform:195,305) — CapabilityDemos preserved. Shopify
  `heroDemo` untouched.
- **Controls untouched:** `/integrations/shopify` still exactly **2** pink;
  `/services/3d-modelling` still **2**. Fix was surgical to the two pillar pages.

## Criterion 3 — responsive / coherence

- All four audited routes return 200 live. 2-col grids remain
  `grid-cols-1 md:grid-cols-2`; on-dark soft-teal is a coherent, spec-sanctioned
  substitution that unifies the pillar sections with the rest of the on-dark
  system. No new overlap/clipping surface introduced (color-only diff).

## Non-findings
- MINOR-1 from R1 (no embedded demo on /features) remains blueprint-compliant
  per §8; not gate-blocking, unchanged.

## VERDICT: GO
Zero critical, zero major. MAJOR-1 (one-pink on /features + /platform dark
pillars) is CLOSED: live text-accent 38→0 and 18→0, on-dark accents now use the
canonical `--brand-primary-soft` soft-teal, pink reserved to a single per-visual
moment. No regressions; controls untouched.
