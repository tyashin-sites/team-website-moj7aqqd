# Phase 3.5 — DESIGN lens audit (adversarial)

Scope: `/features` (new), `/platform` (restructured to 5 pillars),
`/integrations/shopify` (upgraded). Auditor: design lens, DESIGN-SPEC §§1–9.
Live: https://team-website-moj7aqqd.sites.tyashin.com — verified via node fetch
(HEAD eb95e50). Source: git main.

## Per-criterion result

| # | Criterion (spec) | Result |
|---|---|---|
| 1 | Scannability / text budgets §3 (grouped pillars, not a 37-wall; H1 ≤12, lead ≤40, tagline ≤14, no para >3 sentences) | PASS |
| 2 | Palette canonical / tt- type scale / ONE-PINK per viewport §1,§2,§7.2 | **FAIL (one-pink)** |
| 3 | Demo-first §6a (Experience live demos, Shopify live demo, no infographic regressions) | PASS |
| 4 | Distinctiveness / coherence / responsive §8 (design system, not a spec-sheet dump) | PASS |
| 5 | Regression (deep-dives, palette, nav link) | PARTIAL — one-pink broken on restructured /platform |

### Word counts (requested)
- `/features` H1 "Everything Thridify does for your product pages" = **7 words** (≤12 OK)
- `/features` hero lead = **38 words** (≤40 OK), 3 sentences (≤3 OK)
- Experience pillar tagline "Shoppers spin, configure and place your furniture in their own room before buying." = **13 words** (≤14 OK)
- All 5 pillar taglines counted: Studio 13, Experience 13, Distribute 14, Measure 11, Operate 10 — all ≤14 OK

## Findings (severity-sorted)

### MAJOR-1 — ONE-PINK rule broken on dark pillar sections of /features and /platform
Spec: §1 ("max ONE pink element per viewport"), §7.2 one-pink, §3 scarcity ratio (~10% pink).
The new pillar sections apply `text-accent` (pink `#FEBFCC`) to **every** on-dark
accent simultaneously: the icon chip, the eyebrow (overriding the site's own
`.on-dark .eyebrow` → `--brand-primary-soft` teal convention, globals.css:316),
AND every checkmark in the feature list, AND the internal links.

Evidence:
- `src/app/features/page.tsx:287` eyebrow `dark ? "text-accent"`, `:281` icon
  chip `text-accent`, `:310` `Check ... dark ? "text-accent"` (applied to ALL
  7–12 checks), `:329` links `text-accent`. Dark pillars = Experience (7 checks)
  and Operate (6 checks). Live /features carries **38** `text-accent`
  occurrences (node fetch).
- `src/app/platform/page.tsx:85,90` PillarHeader dark icon-chip + eyebrow pink;
  `:118` FeatureList dark checks pink; Measure/analytics dark section
  (`:402–430`) = pink icon chip + pink eyebrow + 3 pink checks + pink "See all"
  link ≈ 6 pink elements co-visible. Live /platform carries **18**
  `text-accent`.
- Contrast with the disciplined, in-repo convention: `/integrations/shopify`
  and `/services/3d-modelling` use pink on **exactly one** dark element (the
  first outcome metric, `integrations/[slug]/page.tsx:413` `idx === 0`,
  everything else `text-paper`); live Shopify = **2** `text-accent`. The correct
  on-dark accent token `--brand-primary-soft` (#6FCFAB, 9.3:1, purpose-built
  "for small teal accents ON DARK ink", globals.css:20–22) is bypassed.
At 1280/768 the full 2-col checklist + eyebrow + chip are one viewport → 8–10
pink elements at once; at 375 (grid-cols-1) still 4–5 co-visible. Verified twice
(source + live). Gate-blocking.

### MINOR-1 — /features has no embedded live demo (soft §6a tension)
The entire /features page is icon-chip + text-list sections; the only demo is an
off-page link to `/#demo` (page.tsx:234,389). §8's /features blueprint
explicitly sanctions "scannable 2-col feature list" sections, so this is
blueprint-compliant and NOT gate-blocking, but §6a ("the product demos itself")
would be better served by one embedded CapabilityDemo near the hero. Noted, not
blocking.

## Non-findings (checked, clean)
- Text budgets §3: pillars grouped/curated (3–6 on /platform via `topFeatures`),
  never a 37-item wall; all taglines ≤14; H1/lead within budget.
- Demo-first §6a: /platform hero + Experience keep live `CapabilityDemo`
  (viewer/configurator/AR); Shopify keeps `heroDemo` live demo (`priority`).
  Studio/Distribute/Operate correctly render as lists (no interactive form).
- Palette: no forbidden hex (`#046bd2`/`#1e293b`/stray green) in any scope file;
  tokens only.
- Type: `tt-*` namespace only, no sub-1.0 LH, no Tailwind-colliding custom class.
- Nav: "Features" link present in primary nav + footer, data-driven identical
  styling; no ghost links in scope pages.
- Responsive: 2-col grids are `grid-cols-1 md:grid-cols-2`, jump chips
  `flex-wrap` — no forced body h-scroll at 375.

## VERDICT: NO-GO
Blocking: MAJOR-1 (one-pink rule violated on dark pillar sections of /features
and /platform).
