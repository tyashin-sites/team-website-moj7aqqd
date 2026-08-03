# Phase 6 — SEO/LLM Auditor Report (full-site confidence gate + migration readiness)

Auditor lens: **SEO**. Adversarial. Date: 2026-08-03.
Worker host (code runs here): `site-thridify.snowy-cherry-cd2c.workers.dev`.
Platform host (edge-owned SEO endpoints): `team-website-moj7aqqd.sites.tyashin.com`.
All checks via `node fetch` (never curl|grep — gzip false-negative).

## Per-criterion scorecard

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Per-page unique title/description/OG; H1 keyword-relevant; all 9 integrations + 6 industries + 3 compare + services + what-is-thridify unique + valid schema | **PARTIAL** — titles/desc/H1 all unique & keyworded; but **/about and /blog emit NO canonical** (MAJOR) |
| 1b | Canonical on ALL pages (/contact fix confirmed) | **FAIL** — /contact fixed ✓, but /about + /blog missing canonical |
| 2 | Structured-data validity sitewide | **PASS** — 0 JSON-LD syntax errors on 14 sampled routes; correct @types. Gap: /industries index lacks ItemList/BreadcrumbList (MINOR) |
| 3 | Sitemap completeness (worker host) | **PASS** — 30 URLs, all pages present, education absent |
| 4 | llms.txt + robots.txt (worker host) | **PASS w/ MINOR** — robots: 8 AI bots + Sitemap ref ✓; llms: contact@thridify.com (not hello@) ✓, compare URLs ✓; but integration URLs/pages not listed (MINOR) |
| 5 | Internal linking / no ghost links; unknown slugs 404 | **PASS** — 35 internal links, 0 broken; /industries|/integrations|/compare/<x> + arbitrary path all 404 |
| 6 | Migration safety-net (301 map + next.config) | **PASS** — 16/16 spot-checks resolve to 200 targets; trailing-slash 308→301→200 non-lossy; GSC high-value URLs covered |
| 7 | Environment-bound (noindex, SITE_URL, #20) | **PASS (scoped)** — noindex present + host-conditional; SITE_URL preview = #21 Phase-7; platform-edge interception = #20, confirmed as documented |

## Sitemap URL count (worker host): **30**
12 core + 6 industries + 9 integrations + 3 compare. Education absent (correct).

## Redirect spot-checks (worker host, redirect:'manual')
| Source | Result |
|---|---|
| /about-us | 301 → /about (200) |
| /furniture/ | 308 → /furniture → 301 → /industries/furniture (200) |
| /woocommerce | 301 → /integrations/woocommerce (200) |
| /magento | 301 → /integrations/magento (200) |
| /privacy-policy/ | 308 → 301 → /privacy (200) |
| /3d-product-configurator | 301 → /platform (200) |
| /features | 301 → /platform (200) |
| /terms-of-service/ | 308 → 301 → /terms (200) |
| /pricing-plans | 301 → /services/3d-modelling (200) |
| /big-commerce | 301 → /integrations/bigcommerce (200) |

## Findings

### MAJOR
- **M1 — /about and /blog emit no canonical tag.** Live: `canon: null` on both.
  Source: `src/app/about/page.tsx:9-19` and `src/app/blog/page.tsx:7-11` have no
  `alternates: { canonical }` (contrast `src/app/contact/page.tsx:10`). Both are
  in the sitemap (priority 0.7) and indexable at Phase-7 launch; /about is the
  301 target of `/about-us` (25c, p3.9). Violates the Phase-3/6 gate criterion
  "every page has unique title/description/OG/**canonical**." One-line fix each.

### MINOR
- **m1 — /industries index lacks ItemList + BreadcrumbList JSON-LD.** The
  /integrations index carries both; /industries carries only Organization +
  SoftwareApplication. Task criterion #2 expects ItemList on index pages.
- **m2 — llms.txt integration coverage incomplete.** "## Integrations" names only
  Shopify/WooCommerce/WordPress/custom (5 of 9; omits Wix, BigCommerce, Magento,
  commercetools, Canva) and lists NO /integrations URLs, while it lists all
  industry + compare URLs. `src/app/llms.txt/route.ts:41-42`.
- **m3 — doc drift.** BUILD-PLAN Phase 7 prose says redirects use `permanent:
  true`; code correctly uses `statusCode: 301` (next.config.ts) and the migration
  map documents 301. Code is correct; BUILD-PLAN prose is stale.

### NOT findings (verified, in-scope explanations)
- OG: 15+ pages use `/og/default.png` — tracked ASSET-DEBT #14/#22, no No-Faking
  violation. Not a finding per contract.
- noindex on all HTML pages both hosts — CORRECT (host-conditional, middleware.ts).
- Platform-host /robots.txt (392b, no AI bots), /sitemap.xml (3 locs), /llms.txt
  (404) — edge-owned exactly as ASSET-DEBT #20 documents; Phase-7 platform-admin
  item, not a repo defect. HTML pages dispatch to our Worker correctly.
- SITE_URL = preview host on canonicals/OG/sitemap/llms — ASSET-DEBT #21, Phase-7.

### Phase-7 open items (need the user, not repo blockers)
- Education/WonderlyAR equity (interim → /); blog 37-post 1:1 migration (hard
  cutover blocker); /pricing page decision; ranking wp-content image URLs.

## VERDICT: NO-GO
Blocking: **M1** — add `alternates: { canonical }` to /about and /blog.
Zero critical. One major. Re-audit after the canonical fix.
