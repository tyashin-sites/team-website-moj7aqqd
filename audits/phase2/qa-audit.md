# Phase 2 QA Audit — Thridify Website

- **Lens:** qa (build integrity, routes, forms, links, regressions)
- **Audited commit:** `1b58f99` (latest `main`)
- **Preview:** https://site-thridify.snowy-cherry-cd2c.workers.dev
- **Method:** local `npm run build` + `tsc --noEmit` on node v20.13.1; live `node -e 'fetch(...)'` probes (no curl|grep). Every finding reproduced twice.
- **Date:** 2026-07-24

---

## Gate criteria — per-criterion result

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Build integrity (build + tsc + CI green) | **PASS** |
| 2 | All routes 200 + host-conditional noindex + no error markers | **PASS** |
| 3 | Contact pipeline (concierge → full form, category/industry, happy/invalid) | **PASS** |
| 4 | CTA integrity (no empty a/button, Calendly href + target/rel) | **PASS** |
| 5 | Links (no ghost links, no arrow literals) | **FAIL — 1 major** |
| 6 | Metadata (unique title/desc/OG, OG PNG + favicon 200) | **PASS (2 minor notes)** |
| 7 | Perf sanity vs §10 (GLB deferred, size/script regressions) | **PASS** |
| 8 | Type-safety (content.ts exists, no `(siteData as any)`) | **PASS** |

---

## Evidence

### 1. Build integrity — PASS
- `npm run build` (node v20.13.1) → exit 0, `✓ Compiled successfully`, 11/11 static pages generated.
- `npx tsc --noEmit` → **exit 0**, zero errors.
- `next.config.ts:13` → `typescript: { ignoreBuildErrors: false }` confirmed — content/type drift now fails the build (Phase 2 QA carry-forward closed).
- CI: latest run on `tyashin-sites/team-website-moj7aqqd` @ `1b58f99` = **success** (run 30088764931, "Deploy to Cloudflare Workers").

### 2. Routes — PASS
All 8 probed. `/`, `/platform`, `/about`, `/contact`, `/industries`, `/blog`, `/gallery` → **200**; `/this-does-not-exist-404` → **404** (correct). Every response (incl. 404) carries `X-Robots-Tag: noindex, nofollow`. `src/middleware.ts:24` keys it on `host.endsWith('.workers.dev')` — host-conditional, thridify.com untouched by design. No `Application error` / `Hydration failed` markers in any HTML.

### 3. Contact pipeline — PASS
- `src/components/ConciergeForm.tsx`: 2-field concierge starter (email + product category) → `Continue` expands to full form (name/company/message) → submits to `/api/contact`. Success state (`done`) renders the Calendly link `https://calendly.com/hello-thridify/30min` (`target="_blank"`, `rel="noopener noreferrer"`).
- `src/app/api/contact/route.ts:54`: `category` accepted; `industry` accepted as legacy alias (`str(body.category,100) || str(body.industry,100)`).
- Live POSTs:
  - happy (`category`) → `200 {"ok":true}`
  - legacy (`industry`) → `200 {"ok":true}`
  - no email → `400 {"ok":false,"error":"A valid email is required"}`
  - bad email → `400`
  - no name → `400 {"ok":false,"error":"Name is required"}`

### 4. CTA integrity — PASS
Across all 7 content routes: **0** empty `<a>` and **0** empty `<button>` (excluding aria-labeled). Every `calendly.com` link = `https://calendly.com/hello-thridify/30min` with both `target="_blank"` and `rel="…noopener…"`; **0** missing target/rel, **0** wrong-URL Calendly links. Occurrences: home 4, platform 4, industries 4, about 3, contact 3, gallery 3, blog 2.

### 5. Links — FAIL (1 major)
- **Anchors resolve:** footer deep-links `/platform#viewer|#configurator|#ar|#content|#analytics` — all five `id="…"` targets **FOUND** on live `/platform`.
- **Nav / vertical / other internal links** resolve to real routes (`/platform`, `/industries`, `/about`, `/blog`, `/contact`, `/models/sheen-chair-poster.svg` all 200).
- **Arrow literals:** none (`grep` of src and rendered HTML for `→`/`←` = clean).
- **GHOST LINKS (M-1):** global footer renders `href="/privacy"` and `href="/terms"` on **every page**; both resolve **404** live. See finding M-1.

### 6. Metadata — PASS (2 minor notes)
- Per-page `<title>` and `<meta description>` are unique across all 7 pages.
- OG image `/og/home.png` → **200 `image/png`**; referenced favicon `/brand/logo-favicon.png` → **200 `image/png`**.
- Minor (m-1): `/blog` and `/gallery` `og:title` fall back to the site-default `"Thridify — 3D & AR Commerce Platform"` rather than a page-unique OG title (their `<title>`/description are unique). Gallery is internal QA; blog is a real page.
- Minor (m-2): bare `/favicon.ico` → 404. Harmless (the `<link rel=icon>` points at the 200 PNG), but browsers auto-request `/favicon.ico`, producing a soft-404 log line.

### 7. Perf sanity — PASS
- GLB **deferred**: 0 `.glb` refs and 0 `model-viewer` occurrences in initial home HTML (§10 hold).
- Home HTML 117,999 bytes; 30 `<script>` tags; First Load JS 152 kB (build report). No catastrophic regression vs Phase 1. Full Lighthouse is the Phase 5 gate.

### 8. Type-safety — PASS
- `src/lib/content.ts` exists (typed content contract).
- `grep "as any" src/` → single hit is a **comment** in `content.ts:5` describing the removed pattern. No live `(siteData as any)` casts remain.

---

## Findings

### M-1 (MAJOR) — Ghost links: `/privacy` and `/terms` 404 from the global footer
- **Evidence:** live home HTML renders `href="/privacy"` and `href="/terms"`; `GET /privacy` → **404**, `GET /terms` → **404**. Present in the footer on every route. No `src/app/privacy` or `src/app/terms` route exists.
- **Spec violated:** Phase 2 gate criterion 5 as scoped ("no ghost links — every internal href resolves to a real route"); SEO addendum §3d (no ghost links).
- **Context:** documented as ASSET-DEBT item 6 (real privacy/terms content deferred to Phase 4). The *content* is legitimately Phase 4, but the *links* ship 404s to real users now. Fix is trivial and Phase-2-appropriate: remove the two footer links (or point to stub pages) until Phase 4 delivers them. Flagged rather than waived because criterion 5 tests link integrity, not content, and this is a functional defect, not missing copy.

### m-1 / m-2 (MINOR) — see criterion 6 notes above (non-unique OG title on blog/gallery; bare `/favicon.ico` soft-404). Not blocking.

---

## Verdict

Zero critical. **One major** (M-1 ghost links to 404 from global footer). Per the auditor rule (GO only with zero critical AND zero major):

**VERDICT: NO-GO**

Blocker:
- **M-1** — `/privacy` and `/terms` are live footer links that 404 on every page. Remove or stub the two footer links until Phase 4, then re-audit criterion 5.
