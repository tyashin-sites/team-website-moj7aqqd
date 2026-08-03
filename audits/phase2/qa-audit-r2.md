# Phase 2 QA Audit — R2 (re-audit + demo-first & industries)

- **Lens:** qa (build integrity, routes, forms, links, demos, perf sanity, SEO plumbing)
- **Audited commit:** `38890ac` (`main` HEAD — "fix(industries): ISR instead of dynamicParams:false")
- **Previews:** `https://site-thridify.snowy-cherry-cd2c.workers.dev` (canonical, BUILD-PLAN) + `https://team-website-moj7aqqd.sites.tyashin.com`
- **Method:** local `npm run build` + `tsc --noEmit` on node v20.13.1; live `node -e 'fetch(...)'` probes (no curl|grep). Every finding reproduced twice (both hosts).
- **Date:** 2026-08-02

---

## Gate criteria — per-criterion result

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Build integrity (build + tsc + latest CI green) | **PASS** |
| 2 | All routes 200 incl. 6 industry pages; unknown slug 404; noindex both hosts; no error markers | **FAIL — 1 major (soft-404)** |
| 3 | Prior M-1 fixed (/privacy + /terms 200) | **PASS** |
| 4 | CTA integrity (no empty a/button; Calendly href+target/rel; #demo secondary) | **PASS** |
| 5 | Links (no ghost links; arrow literals) | **PASS (1 minor note)** |
| 6 | Demos poster-first (GLB absent from initial HTML; poster 200) | **PASS** |
| 7 | Perf sanity §10 (only posters in HTML; size/script) | **PASS** |
| 8 | SEO plumbing (industry title/canonical/JSON-LD; sitemap builds) | **PASS** |

---

## Evidence

### 1. Build integrity — PASS
- `npm run build` (node v20.13.1) → exit 0, `✓ Compiled successfully`, 20/20 static pages; 6 industry paths prerendered as SSG (`●`) with `Revalidate 1h`.
- `npx tsc --noEmit` → **exit 0**.
- Latest CI on `tyashin-sites/team-website-moj7aqqd` @ HEAD = **success** (run 30777816491, "Deploy to Cloudflare Workers", 1m53s).

### 2. Routes — FAIL (1 major)
All 15 content routes → **200** on the canonical workers.dev host, incl. the 6 `/industries/<slug>` pages. `/this-does-not-exist-404` → **404**. Every HTML response (incl. 404) carries `X-Robots-Tag: noindex, nofollow` on **both** preview hosts (host-conditional via `src/middleware.ts`). No genuine hydration/app-error markers (the `err=true` in raw probes is Next's inlined error-boundary template string, present on every 200 page — not a runtime error).
- **BLOCKER F-1:** `/industries/zzz-fake` (any unknown slug) → **HTTP 200** with the Next not-found body ("This page could not be found") — a **soft-404**, not a real 404. Reproduced on both hosts. See finding F-1.

### 3. Prior M-1 — PASS (fixed)
`/privacy` → **200**, `/terms` → **200** on both hosts; both in `sitemap.ts`; footer links resolve. Prior R1 blocker closed.

### 4. CTA integrity — PASS
Across all 15 content routes: **0** empty `<a>`, **0** empty `<button>` (excl. aria-labeled/icon-only). **51** Calendly links, **100%** = `https://calendly.com/hello-thridify/30min` with both `target="_blank"` and `rel="…noopener…"`; **0** bad. Every "Try the live demo" secondary → `/#demo`; the `id="demo"` anchor is present in home HTML.

### 5. Links — PASS (1 minor)
Every internal href (industry cards → 6 distinct slugs, related-industry links, nav, footer, `/privacy`, `/terms`) resolves **200**. No ghost links.
- **Minor:** home renders 3 `→` literals inside `<span aria-hidden="true">` on "Explore →" links. DESIGN-SPEC §7.5 explicitly specifies `"Explore →"`, and they are `aria-hidden` (no SR noise). Reconciled in favour of the spec; non-blocking. (Reconciles the task's "no arrow literals" wording vs §7.5.)

### 6. Demos poster-first — PASS
Initial HTML on home, `/platform`, and all 6 industry pages contains **0** `.glb` refs and **0** `model-viewer` elements — `CapabilityDemo`/`HeroObject` are poster-first, GLB imported only on interaction. `/models/sheen-chair-poster.webp` → **200 image/webp** (43 KB). (Only `/gallery`, the internal QA page, ships model-viewer inline — expected.)

### 7. Perf sanity §10 — PASS
No demo instantiates on load anywhere (posters only). Home HTML 117 KB / 31 `<script>` / 154 kB First Load JS; industry page ~84 KB / 33 `<script>` / 109 kB First Load. No catastrophic regression vs R1 (home 118 KB/30/152 kB). GLB 4.4 MB is over the §10 2 MB budget — documented ASSET-DEBT #8, poster+idle deferred (not a finding). Full Lighthouse = Phase 5.

### 8. SEO plumbing — PASS
Each industry page has a unique `<title>`, self-referential `<link rel=canonical>`, and **3 valid JSON-LD blocks** (Service + FAQPage + BreadcrumbList, all `JSON.parse`-clean). `sitemap.ts` builds; workers.dev `/sitemap.xml` = 14 `<loc>` incl. all 6 industries + privacy/terms. Per-industry OG PNGs (`/og/industry-<slug>.png`) all **200**. Depth review = SEO lens.

### Forms
`POST /api/contact`: happy (name/email/company/category/message) → `200 {"ok":true}`; missing/invalid email → `400`. No regression.

---

## Findings

### F-1 (MAJOR) — Unknown `/industries/<slug>` returns a soft-404 (HTTP 200), not 404
- **Evidence:** `GET /industries/zzz-fake` → **HTTP 200** with the Next not-found body ("This page could not be found"), default site `<title>`, on BOTH preview hosts (reproduced 4×). Real 404s (`/this-does-not-exist-404`) correctly return 404.
- **Cause:** commit `38890ac` switched the `[slug]` route from `dynamicParams:false` to ISR (`revalidate = 3600`). Under OpenNext-Cloudflare ISR, the `notFound()` path for an uncached dynamic slug is served/cached as **200**, defeating the 404 status. The commit message's claim "Unknown slugs still 404 via notFound() below" is false in production.
- **Spec/criteria violated:** task verify criterion 2 ("unknown-slug `/industries/zzz-fake` → correctly 404 (notFound)"); soft-404s are an SEO defect (Google penalizes them) that goes live once preview noindex is removed at Phase 7.
- **Fix direction (auditor does not fix):** keep the 6 canonical slugs statically generated while making unknown slugs emit a genuine 404 status under OpenNext (e.g. restore a hard 404 for non-canonical slugs, or verify the ISR notFound status on this adapter). Re-audit criterion 2 after.

### Minor (non-blocking)
- **m-1:** home "Explore →" aria-hidden arrow literals — spec-sanctioned (§7.5); see criterion 5.
- **m-2:** secondary host `team-website-moj7aqqd.sites.tyashin.com` diverges from the canonical workers.dev preview — `/blog` → 404 and `/sitemap.xml` serves a stale 3-URL platform-generated sitemap (not the app's 14-URL `sitemap.ts`). Both serve correctly on the BUILD-PLAN-designated workers.dev preview; this is a platform-dispatch artifact of a secondary host, not an app-code defect at HEAD. Flag for Phase 7 host verification.
- **m-3:** `/sitemap.xml` carries no `X-Robots-Tag` on the preview (middleware skips it); all HTML pages are noindexed. Harmless.

---

## Verdict

Zero critical. **One major (F-1 — unknown-industry-slug soft-404, HTTP 200 instead of 404).** Prior R1 blocker (privacy/terms) is fixed. Per the auditor rule (GO only with zero critical AND zero major):

**VERDICT: NO-GO**

Blocker:
- **F-1** — `/industries/<unknown>` returns HTTP 200 (soft-404). Make unknown slugs return a real 404 without regressing the 6 SSG pages, then re-audit criterion 2.
