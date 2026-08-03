# Phase 3 Exit Gate — QA Audit (Wave A + B integrity)

Auditor lens: **QA** (adversarial). Date: 2026-08-03.
Hosts: worker = `site-thridify.snowy-cherry-cd2c.workers.dev`,
platform = `team-website-moj7aqqd.sites.tyashin.com`.
Method: node fetch (no curl|grep); local build/tsc on node v20.13.1.

## 1. Build / typecheck / CI
- `npm run build` (node v20.13.1): **PASS** (exit 0), 19 routes emitted.
- `npx tsc --noEmit`: **PASS** (exit 0, clean).
- Latest CI (gh run list, tyashin-sites/team-website-moj7aqqd): **success**
  (30784905510, deploy 2m6s) — plus 4 preceding Wave-B runs all green.

## 2. New routes — 200 both hosts; genuine 404 on unknown
| Route | worker | platform |
|---|---|---|
| /what-is-thridify | 200 | 200 |
| /services/3d-modelling | 200 | 200 |
| /compare/threekit | 200 | 200 |
| /compare/zakeke | 200 | 200 |
| /compare/marxent | 200 | 200 |
| /compare/zzz-fake | 404 | 404 |
| /industries/{furniture,modular-kitchens,doors-and-windows,prefab-structures,industrial-machinery,laminates-surfaces} | 200 (all 6) | 200 (all 6) |
| /industries/zzz-fake | 404 | 404 |

## 3. Regression + guards
- home,/platform,/about,/contact,/industries,/privacy,/terms: **200 both hosts.**
- `X-Robots-Tag: noindex, nofollow` present on every HTML response incl. 404s,
  both preview hosts. Host-conditional confirmed in `src/middleware.ts:28-34`
  (suffix allowlist `.workers.dev` + `.sites.tyashin.com`; production
  thridify.com NOT matched → would serve index,follow). PASS.
- Empty CTAs: **zero** (`href=""`/`href="#"` count = 0 on all probed pages).
- Calendly links intact (8/page; 6 on /what-is-thridify). PASS.
- Demo-first: **no `<model-viewer>` and no eager GLB in initial SSR HTML** on
  any new page (poster-first). The `.glb` string on /industries/* pages is only
  the client-component prop inside the RSC flight payload — verified NO
  `<link rel=preload>`, NO `<model-viewer>`, NO `src="…glb"` attribute. PASS.

## 4. AR QR (Wave A chunk 2)
- `/models/ar-qr-chair.svg`: **200 image/svg+xml (4781 B) both hosts.** PASS.
  (The `<img>` is hover-rendered, absent from SSR — asset itself serves.)

## 5. Per-industry models (Wave A chunk 3)
Each industry page references a distinct GLB + WebP poster; all serve 200 both
hosts; every per-industry GLB ≤ 2MB:
| Model | bytes | ≤2MB |
|---|---|---|
| furniture-vase.glb | 202,624 | Y |
| kitchen-teacup.glb | 291,500 | Y |
| doors-lantern.glb | 272,512 | Y |
| machinery-camera.glb | 583,132 | Y |
| surfaces-material.glb | 1,260,732 | Y |
All matching `*-poster.webp` serve 200. prefab-structures uses the chair
fallback `sheen-chair.glb` (4.4MB) — **ASSET-DEBT #19/#8, known debt, poster-
first + interaction-deferred, NOT a Phase-3 defect.**

## 6. Entity schema
- Organization + SoftwareApplication JSON-LD present on home AND /platform
  (+ WebSite). Every injected JSON-LD block parses: **bad=0 across all probed
  routes** (home, platform, what-is, 3d-modelling, 3 compares, 2 industries).
  Types seen: Organization, SoftwareApplication, WebSite, FAQPage,
  BreadcrumbList, Service. Titles + canonicals unique per page. PASS.

## 7. /llms.txt + /robots.txt (worker host)
- worker /robots.txt: **200**, all 8 AI bots (OAI-SearchBot, ChatGPT-User,
  GPTBot, ClaudeBot, Claude-Web, Google-Extended, PerplexityBot,
  Applebot-Extended) + Sitemap ref; `X-Robots-Tag` present (our Worker ran).
- worker /llms.txt: **200**, canonical description + founder narrative
  (Shikha CEO / Aditya CTO). `X-Robots-Tag` present.
- platform host: robots generic (392B, no x-robots-tag), llms.txt **404**,
  sitemap 3-URL default (663B, no x-robots-tag) → confirms the platform edge
  intercepts /robots.txt, /llms.txt, /sitemap.xml before dispatch (absence of
  x-robots-tag proves our Worker never ran). This is **ASSET-DEBT #20**, a
  documented **Phase-7 platform-admin item, NOT a repo blocker** (raw worker
  serves all three correctly). Not repo-fixable.

## 8. Sitemap
- worker /sitemap.xml: **200 application/xml, 19 <loc> URLs**, well-formed,
  all preview-host absolute URLs (SITE_URL flip = ASSET-DEBT #21, Phase-7).
  /blog listed and serves 200 on worker. PASS.

## Findings
None (critical/major/minor). All observed edge/host caveats are pre-existing,
documented Phase-7 asset-debt items (#8, #17, #19, #20, #21), not Phase-3
regressions.

## VERDICT: GO
Zero critical, zero major, zero minor findings. Wave A + B integrity holds.
