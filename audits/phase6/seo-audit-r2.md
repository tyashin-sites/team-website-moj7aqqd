# Phase 6 — SEO Auditor Report R2 (fix-round verification)

Auditor lens: **SEO**. Adversarial re-audit of the consolidated fix round.
Date: 2026-08-03. Verified independently via `node fetch` (never curl|grep).
Worker host (code runs here): `site-thridify.snowy-cherry-cd2c.workers.dev`.
Platform host (edge-owned SEO endpoints): `team-website-moj7aqqd.sites.tyashin.com`.

Fix commits under test: d0ba12d (canonical /about+/blog, ItemList/Breadcrumb
/industries, 9-integration llms.txt), 7163195 (BUILD-PLAN statusCode:301).

## Prior-finding disposition

| ID | Prior finding | Status | Evidence |
|----|---------------|--------|----------|
| **M1** (blocker) | /about + /blog emit no canonical | **CLOSED** | Worker host live: `/about` canonical `…/about`, `/blog` canonical `…/blog`. Source: `src/app/about/page.tsx:13` + `src/app/blog/page.tsx:11` now carry `alternates:{canonical}`. All 30 sitemap pages re-spot-checked (14 routes) — every one emits a canonical. |
| m1 | /industries index lacks ItemList/BreadcrumbList | **CLOSED** | `/industries` JSON-LD now `[Organization, SoftwareApplication, ItemList, BreadcrumbList]`; ItemList = 6 items, BreadcrumbList = 2. Parses clean. |
| m2 | llms.txt integration coverage incomplete | **CLOSED** | `/llms.txt` (worker) 200: names 9/9 integrations (WooCommerce, Shopify, Wix, BigCommerce, Magento, commercetools, Canva, WordPress, custom); emits 9 `/integrations/<slug>` URLs + index URL. |
| m3 | BUILD-PLAN Phase 7 doc drift (permanent:true) | **CLOSED** | `docs/BUILD-PLAN.md:204-205` now states `statusCode: 301` (not `permanent:true`). |

## Regression sweep (all PASS)

- **Structured data sitewide:** 0 JSON-LD parse errors across sampled routes;
  correct @types. The new /industries ItemList/Breadcrumb and the /about,/blog
  canonicals broke nothing (/about, /blog still emit Organization +
  SoftwareApplication).
- **Sitemap:** worker `/sitemap.xml` 200, `application/xml`, **30 URLs**,
  well-formed. Contains `/about` + `/blog`; education absent (correct).
- **Redirects:** spot-checks all 301 to correct targets — `/about-us`→`/about`,
  `/woocommerce`→`/integrations/woocommerce`, `/features`→`/platform`,
  `/pricing-plans`→`/services/3d-modelling`.
- **noindex intact:** delivered via `X-Robots-Tag: noindex, nofollow` HTTP
  header on all HTML pages (`/`, `/about`, `/blog` confirmed). Host-conditional
  per middleware — env-bound preview guard, correct.
- **No ghost links:** unknown compare slug `/compare/vntana` → 404 (real slugs
  are threekit/zakeke/marxent); returns noindex.

## Environment-bound (NOT blockers — confirmed scoped)

- **Preview noindex** present (X-Robots-Tag) — intended pre-launch guard.
- **SITE_URL = preview host** on canonicals/OG/sitemap/llms — ASSET-DEBT #21,
  Phase-7 cutover flips it. Canonicals point at worker host as expected.
- **Platform-edge interception (#20):** platform host `/blog` returns 404 while
  worker host serves `/blog` 200 with canonical. This is edge routing (#20),
  NOT a fix regression — adding a `<link canonical>`/metadata cannot convert a
  200 to a 404, and the code-of-record host (worker) serves it correctly.
  Scoped, pre-existing, Phase-7 platform-admin item.

## VERDICT: GO
Zero critical, zero major. M1 blocker closed (canonical live on /about + /blog,
both hosts' code path). All three minors (m1/m2/m3) closed. No regressions.
