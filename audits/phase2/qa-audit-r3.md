# Phase 2 QA Audit — R3 (consolidated fix-round verification)

- **Lens:** qa (build integrity, routes, forms, links, demos, SEO plumbing, regression)
- **Audited commit:** `e0c4426` (`main` HEAD — "docs(asset-debt): log /blog platform-edge ownership override")
- **Previews:** `https://site-thridify.snowy-cherry-cd2c.workers.dev` (canonical) + `https://team-website-moj7aqqd.sites.tyashin.com`
- **Method:** local `npm run build` + `tsc --noEmit` on node v20.13.1; live `node -e 'fetch(...)'` probes (no curl|grep). F-1 reproduced twice on both hosts. Builder report NOT trusted — every result re-derived.
- **Date:** 2026-08-02
- **Scope:** verify the consolidated fix-round closed the R2 blocker (F-1 soft-404) with no regressions.

---

## Gate criteria — per-criterion result

| # | Criterion | Result |
|---|-----------|--------|
| 1 | F-1 CLOSED: 6 real slugs 200 (unique) / 3 unknown genuine 404, both hosts, 2× | **PASS** |
| 2 | Build integrity (npm run build + tsc clean; latest CI green; populateCache + open-next.config change safe) | **PASS** |
| 3 | No regression: all other routes 200; noindex host-conditional incl 404s; 0 empty CTAs; Calendly intact; demos poster-first | **PASS** |
| 4 | Canonical on home + /platform (m-1 partial) didn't break metadata | **PASS** |
| 5 | /blog diagnosis (edge intercept, not repo-fixable) plausible → documented Phase-7 item, not a Phase-2 blocker | **PASS (confirmed edge-intercept; not repo-fixable)** |

---

## 1. F-1 (the blocker) — CLOSED

The R2 blocker was: unknown `/industries/<slug>` returned HTTP 200 (soft-404) under ISR.
Fix (`bf08880`): `dynamicParams = false` + fully-static prerender (no `revalidate`) + `static-assets-incremental-cache` override in `open-next.config.ts` + a `populateCache local` step in `deploy.yml` that copies the 6 prerendered `.cache` payloads into `.open-next/assets/cdn-cgi/_next_cache/` before `wrangler deploy`.

### Status table — 9 slugs × 2 hosts (reproduced twice, identical both runs)

| Slug | Type | sites.tyashin.com | workers.dev |
|------|------|-------------------|-------------|
| furniture | real | **200** | **200** |
| modular-kitchens | real | **200** | **200** |
| doors-and-windows | real | **200** | **200** |
| prefab-structures | real | **200** | **200** |
| industrial-machinery | real | **200** | **200** |
| laminates-surfaces | real | **200** | **200** |
| education | fake | **404** | **404** |
| zzz-fake | fake | **404** | **404** |
| nonexistent-xyz | fake | **404** | **404** |

- The 6 real slugs render **unique content** — distinct `<title>` (e.g. "3D Furniture Configurator & AR Viewer | Thridify", "Modular Kitchen 3D Design Tool & Configurator | Thridify", "Door & Window Configurator | Custom 3D Visualizer | …") and distinct `<h1>`. Not soft-404s.
- The 3 unknown slugs (incl. the removed `education` vertical) return **genuine HTTP 404** with an `<h1>404</h1>` framework not-found page — a real status, not 200.
- Every response (200 and 404) carries `X-Robots-Tag: noindex, nofollow` on both hosts (host-conditional middleware intact).
- Note: a naive body regex for "could not be found" matches 200 pages too — that string is Next's inlined not-found-boundary template present on every page (same artifact the R2 audit flagged as `err=true`). The HTTP status line and the `<h1>` are the ground truth; both confirm the fix.

## 2. Build integrity — PASS
- `npm run build` (node v20.13.1) → **exit 0**. `● /industries/[slug]` prerendered as SSG (6 paths listed: furniture, modular-kitchens, doors-and-windows, +3), no `Revalidate` annotation (fully static, as intended).
- `npx tsc --noEmit` → **exit 0**.
- The `open-next.config.ts` change (`incrementalCache: staticAssetsIncrementalCache`) and the `deploy.yml` `populateCache local` step did **not** break the build. Latest CI run at HEAD `e0c4426` (**run 30779124438**, "Deploy to Cloudflare Workers", 1m59s) = **success**. `populateCache local` is a local file copy needing no Cloudflare creds — CI green confirms it runs clean.

## 3. Regression sweep — PASS
All content routes on **both** hosts:

| Route | sites | workers |
|-------|-------|---------|
| / | 200 | 200 |
| /platform | 200 | 200 |
| /about | 200 | 200 |
| /contact | 200 | 200 |
| /industries | 200 | 200 |
| /privacy | 200 | 200 |
| /terms | 200 | 200 |
| /gallery | 200 | 200 |
| /this-does-not-exist-404 | 404 | 404 |
| /blog | 404 (edge) | 200 (app) |

- **noindex host-conditional:** every HTML response on both hosts (incl. the 404 route and the 3 industry 404s) carries `X-Robots-Tag: noindex, nofollow`.
- **CTA integrity (home):** 0 empty `<a>`, 0 empty `href="#"`/`href=""`, 8 Calendly links, 0 malformed (all `calendly.com/hello-thridify/30min`), `id="demo"` anchor present.
- **Demos poster-first:** initial HTML on `/`, `/platform`, `/industries/furniture` and all others contains **0** `.glb` refs and **0** `model-viewer` elements. Poster `/models/sheen-chair-poster.webp` → 200 `image/webp`.
- **/privacy + /terms** still 200 (R1 blocker stays closed).

## 4. Canonical (m-1 partial) — PASS
`c9a1dd7` added self-canonical tags to home + /platform. Verified: home `<link rel=canonical href="https://site-thridify.snowy-cherry-cd2c.workers.dev">`, /platform `…/platform/`, /industries `…/`, all self-referential. Metadata not broken; all three pages still 200. (`/about`, `/contact`, `/privacy`, `/terms`, `/gallery` still have no canonical — that is the *unfinished* part of m-1, pre-existing, not a regression; owned by the SEO lens.)

## 5. /blog — confirmed edge-intercept, Phase-7 item (not a Phase-2 blocker)
Diagnosis verified independently and holds:
- `/blog` serves **200** on `workers.dev` **with** `X-Robots-Tag: noindex, nofollow` → the site's own Worker/middleware served it (app-owned).
- `/blog` returns **404** on `sites.tyashin.com` **with NO `X-Robots-Tag`** → the site's middleware never ran; the platform edge intercepted the request before dispatching to the per-project Worker.
- The blog route **exists in the repo** (`src/app/blog/page.tsx` + `loading.tsx`) and builds/serves fine — so this is not a missing/broken route.
- Root cause is platform-side (`aapastech-backend/src/index.ts` → `tryPlatformPageDispatch` → `blog-index` registry page returning 404 when the Blog/CMS plugin is not installed), **not fixable in this repo**. Documented as ASSET-DEBT #17 with the correct remediation (set `/blog` per-page ownership override to `storefront` in platform admin) and correctly tagged Phase 7. Treated as a documented Phase-7 cutover item, **not** a Phase-2 blocker.

---

## Findings

None at critical or major severity. F-1 is closed and reproduced 200/404 correctly twice on both hosts.

### Minor / carried (non-blocking)
- **m-1 (carried):** canonical still absent on /about, /contact, /privacy, /terms, /gallery (only home + /platform added). SEO-lens scope.
- **#17 (documented debt):** `/blog` 404 on platform-dispatched host — platform-edge ownership override, Phase-7 cutover item, not repo-fixable.

---

## Verdict

Zero critical. Zero major. The R2 blocker (F-1 soft-404) is **closed** — 6 canonical verticals resolve 200 with unique content and every unknown slug returns a genuine 404 on both hosts (reproduced twice). Build + tsc + CI green; the `populateCache`/`open-next.config.ts` fix did not regress the build. All other routes, noindex, CTAs, Calendly, and poster-first demos hold. `/blog` is a correctly-documented Phase-7 platform-edge item, not a Phase-2 blocker.

**VERDICT: GO**
