# QA Audit R2 — Phase 0 + Phase 1 Gate RE-AUDIT (post fix round)

- **Lens:** qa (adversarial re-audit of the fix round; verify every claimed fix independently)
- **Auditor:** thridify-website-auditor
- **Date:** 2026-07-24
- **Commits audited:** `820854a` (fix round), `19cede0` (brand-kit.css link removal + LH evidence), `c398fe1` (LH deployed-run evidence)
- **Preview:** https://site-thridify.snowy-cherry-cd2c.workers.dev (live at time of audit; CI run `30086259910` success for `c398fe1`)
- **Method:** live `node -e 'fetch(...)'` probes (never curl|grep), each reproduced twice; repo source inspection; Lighthouse JSON read directly (not the builder's summary); local build + typecheck on node v20.13.1.

---

## Re-verification of prior findings

### QA-1 (was CRITICAL — empty/labelless CTAs) → **FIXED, verified**

- **Source:** `src/lib/cta.ts` exists and is the single CTA-caption reader (`ctaLabel()` accepts `.label` and `.text`). All 10 page-level CTA caption reads go through it (`page.tsx:334,338`, `platform/page.tsx:142,147,277,282`, `about/page.tsx:317,322`, `industries/page.tsx:254,262`) plus `CTABand.tsx`. Remaining direct `.primaryCta/.secondaryCta` accesses are `.href` only — the href key never drifted and is not part of this finding.
- **Residual dead code (not a finding):** `src/components/HeroSlideshow.tsx:108,112` still reads `.label` directly, but the component is retired (zero call sites; only a comment at `page.tsx:37` references it) and its props type requires `label: string`, so tsc enforces the contract at any future call site.
- **Live (twice):** all 7 routes + 404 path probed; **0** empty `<a>`/`<button>` elements (after excluding elements with `aria-label`) on every route. "Book a Demo" renders 3–7× per page. The former arrow-only/empty anchors on `/` and `/platform` are gone.

### QA-2 (was MAJOR — raw `→`/`←` literals) → **FIXED, verified**

- **Live (twice):** rendered HTML of all 7 routes + 404 contains **zero** `→`, `←`, `→`, `←` occurrences (full response body, including the RSC flight payload — this is where the round-1 regression hid).
- **Source:** no arrow characters in any `.tsx` JSX text node; remaining occurrences are code comments only (`VerticalCard.tsx:5,54`, `PipelineStrip.tsx:6`, `globals.css` comments — never rendered). No `\u20xx` escape literals remain in `src/app` or `src/components`.

### QA-3 (was MAJOR — Lighthouse gallery gate unsatisfiable) → **FIXED, verified from the JSON**

- `/gallery` route exists, returns 200, and is a real component-gallery page (`src/app/gallery/page.tsx`, 199 lines, light+dark contexts).
- Evidence committed at `audits/phase1/lighthouse/` — scores read directly from the JSON, not the builder's report:

| File | URL | formFactor | perf | a11y | BP | LCP | CLS | fetchTime |
|---|---|---|---|---|---|---|---|---|
| gallery-mobile.json | …workers.dev/gallery | mobile | **0.85** | 0.92 | 0.96 | 4.4 s | 0 | 10:26:52Z |
| gallery-mobile-run2.json | …workers.dev/gallery | mobile | **0.96** | 0.92 | 0.96 | 2.9 s | 0 | 10:27:39Z |
| home-mobile.json | …workers.dev/ | mobile | **0.96** | 0.91 | 0.96 | 2.4 s | 0.008 | 10:27:04Z |

- Runs target the **deployed** preview host and post-date the `19cede0` deploy (CI completed 10:24:37Z + ~2 min). Gate "Lighthouse perf ≥ 85 mobile on a component gallery page": **PASS** — noting run1 sits exactly at the bar and the 4.4 s LCP variance will matter for the stricter Phase 5 gate (≥90 perf, LCP < 2.5 s), where the GLB/poster debt (#8/#9) should be retired first.
- Lighthouse a11y 0.91–0.92 is below the Phase 5 bar of 0.95 — not a Phase 1 criterion, logged as a heads-up.

### Prior minors

- **QA-4 (minor — no request-size cap on `/api/contact`)** — **STILL OPEN.** Re-verified live: a 2 MB JSON body still returns `200 {"ok":true}` (fields truncated server-side, nothing crashes, nothing oversized forwarded). No `content-length` guard in `src/app/api/contact/route.ts`. Remains minor; not gate-blocking.
- **QA-5 (minor — brand-kit.css gate item unverifiable pre-domain)** — **RESOLVED BY RESTRUCTURING, debt properly tracked.** The stale platform `brand-kit.css` `<link>` was removed from `src/app/layout.tsx` (19cede0) with a documented rationale; inline canonical tokens are the single brand-token source. The platform-side `PATCH /projects/:id/brand-kit` remains blocked on a fresh admin JWT — **ASSET-DEBT #13** ("NEEDS USER INPUT"), also blocking Phase 7. Correctly a debt entry, not a Phase 1 code finding.

---

## Regression sweep of the fix round

| Check | Result | Evidence |
|---|---|---|
| Noindex on all routes, host-conditional | **PASS** | `x-robots-tag: noindex, nofollow` on `/`, `/about`, `/platform`, `/contact`, `/industries`, `/blog`, `/gallery`, and 404 path (probed twice). `src/middleware.ts:24-26` still keys on `host.endsWith('.workers.dev')`; Phase 7 removal comment intact; matcher unchanged. |
| `POST /api/contact` behavior | **PASS** | valid → `200 {"ok":true}`; missing name → `400 Name is required`; bad email → `400 A valid email is required`; non-JSON → `400 Invalid JSON body`; GET → `405`. |
| GLB still deferred | **PASS** | `sheen-chair.glb` absent from initial HTML of every route (probed all 8 paths). |
| Local build green (node 20.13.1) | **PASS** | `npm run build` clean, 11/11 static pages (now includes `/gallery`). First Load JS 151 kB on `/` — unchanged. |
| `npx tsc --noEmit` | **PASS** | exit 0. (The `(siteData as any)` casts remain — 10 occurrences — so the type system still doesn't enforce the content shape; `ctaLabel()` is the compensating control for CTAs. Acceptable now; worth retiring the casts in Phase 2 when content is restructured.) |
| CI green | **PASS** | `gh run list`: runs `30085710305` (820854a), `30086064929` (19cede0), `30086259910` (c398fe1) all `success` on main. |
| Calendly hrefs intact | **PASS** | `calendly.com/hello-thridify` present 3–7× on every page. |
| No hydration/application-error markers | **PASS** | zero `Application error` / hydration / minified-React-error markers in served HTML on all routes. |
| brand-kit.css removal broke nothing | **PASS** | zero `brand-kit.css` references left in served HTML; remaining `src/` references are comments plus `src/lib/brand-kit.ts`, which fetches the **different** `brand-kit.json` endpoint (Header/Footer siteName) — untouched and unaffected. Inline token block in `layout.tsx` carries the canonical palette. |
| `.wrangler` hygiene | **PASS** | `git ls-files .wrangler/` → 0; `.gitignore:7` still lists it. |

### /gallery sanity check

- `200 OK`; `x-robots-tag: noindex, nofollow` header AND `<meta name="robots" content="noindex, nofollow"/>` in HTML (belt-and-braces; the meta variant will survive the Phase 7 header-guard removal — verify intent then).
- Not linked from nav or footer: no `href="/gallery"` in home HTML; zero `gallery` references in `Header.tsx`, `Footer.tsx`, or `content/site.json`. Internal QA route as designed.

---

## Open (non-blocking) items carried forward

1. QA-4 minor — `/api/contact` request-size cap (413 guard) still absent.
2. ASSET-DEBT #5 — analytics decision (Phase 0 deliverable, NEEDS USER INPUT).
3. ASSET-DEBT #13 — platform brand-kit PATCH pending admin JWT (blocks Phase 7 checklist, not Phase 1).
4. Heads-up for Phase 5: gallery LCP variance (4.4 s worst run) and Lighthouse a11y 0.91–0.92 vs the ≥0.95 Phase 5 bar; GLB #8 over budget.

---

## Verdict

Zero critical and zero major findings under the QA lens. All three prior blockers (QA-1, QA-2, QA-3) are independently verified fixed against source, the live preview, and the committed Lighthouse JSON. No regressions introduced by the fix round.

**VERDICT: GO**
