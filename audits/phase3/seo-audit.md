# Phase 3 Exit Gate — SEO/LLM Audit (adversarial)

Lens: SEO. Scope: Wave A positioning + Wave B entity/LLM growth surface.
Hosts: worker `site-thridify.snowy-cherry-cd2c.workers.dev` (SEO endpoints +
HTML) and platform `team-website-moj7aqqd.sites.tyashin.com` (HTML). All checks
via `node fetch` (no curl|grep). Date 2026-08-03, commit `ed65e2b`.

## Per-criterion result

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Entity graph: Organization + SoftwareApplication (+ WebSite on home/platform), per-page Service/FAQPage/BreadcrumbList | PASS |
| 2 | /what-is-thridify: 200, canonical desc first paragraph, Q-H2s, FAQPage+BreadcrumbList, unique meta | PASS |
| 3 | /compare/{threekit,zakeke,marxent}: 200, unique vs/alternative titles, table, BC+FAQ, one-intent, no fabricated competitor facts | PASS |
| 4 | /llms.txt (worker): 200 text, canonical desc + factual bullets + key URLs | PASS |
| 5 | /robots.txt (worker): 8 AI crawlers + standard, Disallow /api /gallery, Sitemap ref; HTML noindex coexists | PASS |
| 6 | Sitemap (worker): 19 URLs incl. new pages + 6 industries; well-formed; education absent | PASS |
| 7 | Positioning: zero automated-content-generation claims; "3D Modelling Service" present; canonical metrics only | PASS |
| 8 | Internal links / no ghost links; /compare/zzz + /industries/zzz still 404 | PASS |
| 9 | Logged (not blocking): SITE_URL=preview (#21); edge intercept (#20) | LOGGED / #20 CONFIRMED |

## Evidence highlights
- Entity schema (`src/lib/schema.ts`): sameAs = the 4 canonical socials; both
  Organization + SoftwareApplication carry `CANONICAL_DESCRIPTION` verbatim; no
  offers/aggregateRating (No-Faking). Live `@type` sets confirmed: home/platform
  carry Organization, SoftwareApplication, WebSite; no conflicting @type.
- /what-is-thridify: first paragraph = canonical description verbatim; FAQPage
  (5 Q) + BreadcrumbList valid; title/desc/canonical/OG unique.
- Compare pages: `src/lib/comparisons.ts` uses only "Yes" / "Varies / contact
  vendor" / generic positioning cells — no invented competitor metric, price or
  quote. Unique "vs / alternative" titles; FAQPage + BreadcrumbList valid.
- /llms.txt (worker): canonical description verbatim + factual bullets +
  what-is-thridify, services/3d-modelling, all 6 industries/*, all 3 compare/*.
- /robots.txt (worker): `User-agent: *` Allow /, Disallow /api/ + /gallery, all
  8 AI crawlers (OAI-SearchBot, ChatGPT-User, GPTBot, ClaudeBot, Claude-Web,
  Google-Extended, PerplexityBot, Applebot-Extended), Sitemap ref. Response
  still carries `X-Robots-Tag: noindex, nofollow` (crawl-access + preview
  noindex coexist, per BUILD-PLAN Phase 3).
- Sitemap (worker): 19 `<loc>` (10 static incl. what-is-thridify +
  services/3d-modelling + blog + legal, 6 industries, 3 compare). No education.
- Industry pages: 6 unique titles, 6 unique canonicals, each Service + FAQPage +
  BreadcrumbList.
- 404s: /compare/zzz and /industries/zzz return 404 on both hosts.
- #20 CONFIRMED on platform host: /robots.txt = platform generic robots (no AI
  allowlist), /llms.txt = 404, /sitemap.xml = 3-URL default; NONE carry
  `x-robots-tag` → the site Worker never ran (edge-owned). Phase-7 platform-admin
  override item, not a repo blocker. Worker host serves all three correctly.

## Findings

### Minor
- **M-1** og:url absent on `/` and `/platform`. Their `openGraph` blocks
  (`src/app/page.tsx`, `src/app/platform/page.tsx`) omit `url`; live HTML has no
  `og:url` on these two (present on every other growth page). Canonical link is
  present, so not blocking; add `url` for OG completeness.
- **M-2** Compare `BreadcrumbList` position-2 "Compare" `item` equals the
  position-3 leaf URL (`/compare/<slug>`) and no `/compare` index page exists
  (`src/app/compare/[slug]/page.tsx:88-95`). Redundant crumb; valid, but the
  "Compare" label points at the leaf rather than an index.

### Logged (Phase-7, not blocking — per contract)
- SITE_URL still = workers.dev preview on all canonical/OG/sitemap/llms/schema
  URLs (ASSET-DEBT #21).
- Platform-edge interception of /robots.txt, /sitemap.xml, /llms.txt on
  *.sites.tyashin.com (ASSET-DEBT #20) — CONFIRMED, platform-admin ownership
  override at cutover.

## Verdict
Zero critical, zero major. VERDICT: GO
