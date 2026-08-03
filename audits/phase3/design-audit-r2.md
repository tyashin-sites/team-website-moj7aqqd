# Phase 3 — Design Lens Audit R2 (fix-round verification)

Auditor: adversarial design lens. Scope: verify the consolidated fix round
closed the four Phase-3 design blockers from `design-audit.md` (D-1..D-4) with
no regression. Live host: https://team-website-moj7aqqd.sites.tyashin.com
(HEAD 2742dd7). Method: DESIGN-SPEC §§1,3,7,8 + node-fetch of live pages
(RSC flight `<script>` blocks stripped — counts are rendered-DOM elements) +
repo source. Every finding reproduced twice.

## Prior-blocker verification

| # | Prior finding | Status | Evidence |
|---|---------------|--------|----------|
| D-1 | One-pink broken in compare tables (6 pink checks/viewport) | FIXED | `compare/[slug]/page.tsx:61` — Thridify-column checks now `text-primary` (teal). Live rendered-DOM `text-accent` per compare page = **2 total, 1 per viewport**: (a) `Thridify` table header, (b) `Where Thridify fits` heading in the separate dark section. No two pink elements share a viewport. threekit/zakeke/marxent identical. |
| D-2 | Compare hero intro over §3 ≤40-word lead budget (×3) | FIXED | `comparisons.ts` intros re-measured: **threekit 39, zakeke 38, marxent 39** words. All ≤40. Live `.lead` count on each compare page = 1 (the hero intro). Honesty/positioning preserved. |
| D-3 | Pink 01/02/03 step numbers on /services/3d-modelling | FIXED | `services/3d-modelling/page.tsx:268` step label now `tt-mono text-primary` (teal). Live rendered-DOM `text-accent` on the page = **1**, and it is the single `70%` outcome stat (legitimate one-pink moment), not the step numbers. |
| D-4 | /what-is-thridify canonical desc as oversized `.lead` (§3 tension) | FIXED | `what-is-thridify/page.tsx:176` renders `CANONICAL_DESCRIPTION` as body prose (`text-foreground/80 leading-relaxed max-w-[65ch]`, `hasLead:false` live). Text matches `schema.ts CANONICAL_DESCRIPTION` verbatim. DESIGN-SPEC §3 now carries the machine-extraction exception line (§3, lines 77–82). |

## Per-viewport pink counts (rendered DOM, RSC-flight dupes excluded)

| Page | raw string hits | rendered DOM | per-viewport max |
|---|---|---|---|
| /compare/threekit | 4 | 2 | 1 |
| /compare/zakeke | 4 | 2 | 1 |
| /compare/marxent | 4 | 2 | 1 |
| /services/3d-modelling | 2 | 1 | 1 |
| /what-is-thridify | 2 | 1 | 1 |

(Raw hits double-count because the RSC flight payload re-embeds the markup;
counting rendered DOM after stripping `<script>` blocks is the correct measure.)

## Regression sweep (no new defect from the fix)

| Check | Result |
|---|---|
| Palette canonical / forbidden hexes | PASS — no `#046bd2`/`#1e293b` in src or live HTML |
| Class collisions | PASS — checks use `text-primary`; step numbers `tt-mono text-primary`; no tt-/Tailwind collision |
| Comparison tables responsive | PASS — live `overflow-x-auto` + `min-w-[640px]` present; no body horizontal scroll at 375 |
| AR QR real & serves (§7.1) | PASS (untouched) — `/models/ar-qr-chair.svg` 200 image/svg+xml |
| Per-industry demos + DR-2 (§6/§6a/§7) | PASS (untouched) — fix diff `7d31def..HEAD` does not touch HeroObject, CapabilityDemo, or industry pages |
| CTA pattern intact (§9) | PASS — every audited page carries "Book a Demo" (Calendly) + "Try the live demo" |

Fix diff scope (`7d31def..HEAD`): `compare/[slug]/page.tsx`, `comparisons.ts`,
`services/3d-modelling/page.tsx`, `what-is-thridify/page.tsx`, `DESIGN-SPEC.md`,
plus `page.tsx`/`platform/page.tsx` og:url (SEO lens, not design).

## Out-of-lens observation (not a design finding)
- `/llms.txt` returns 404 on the live host. This is a crawler-plumbing / SEO-lens
  concern (spec §8 "Crawler plumbing"), outside the design lens; flagged for the
  SEO auditor, not counted here. Does not affect the /what-is-thridify D-4
  rendering, which is verbatim against `schema.ts`.

## Verdict
All four blockers (D-1, D-2, D-3, D-4) fixed and verified live; zero regression.
0 critical, 0 major, 0 minor design findings.

VERDICT: GO
