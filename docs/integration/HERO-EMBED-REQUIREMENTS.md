# Thridify SDK — Marketing-Site Hero Embed Requirements

**Consumer:** the Thridify marketing website (this repo — Next.js on Cloudflare
Workers via OpenNext; preview `site-thridify.snowy-cherry-cd2c.workers.dev`,
production `thridify.com` / `www.thridify.com`).
**Provider:** the Thridify product platform (SDK + experience backend).
**Goal:** replace the placeholder GLB chair in the home hero
(`src/components/signature/HeroObject.tsx`, DESIGN-SPEC §7.1) with a **real
Thridify experience** — the actual configurator product running on the actual
SDK — so the hero demonstrates the product, not a screenshot of it.

Everything below is a requirement on the **Thridify product/SDK side**. The
website will not fork or vendored-copy the runtime; it must consume the same
SDK a customer would, exercised in a "standalone" mode that does not yet exist.

---

## R1. Standalone experience embed (no product-page triple)

Today the SDK resolves an experience from `(accountId, productId, variantId)`
— it assumes it is sitting on an e-commerce product page. The marketing site
has no product page, no store, and no variant catalog.

Required: a published experience must be addressable by a **single stable
experience id** (slug or opaque id), with no product/variant context:

```html
<script async src="https://cdn.thridify.com/sdk/v1/thridify.js"></script>
<div data-thridify-experience="demo-hero-chair"
     data-thridify-account="thridify-marketing"></div>
```

and an imperative equivalent:

```js
const exp = await Thridify.mount(el, {
  account: 'thridify-marketing',
  experience: 'demo-hero-chair',
});
```

Constraints:

- The id is **stable across republish** — the site hardcodes it; re-publishing
  a new version of the experience must not change the id.
- Resolution is a single unauthenticated GET (public, cacheable, CDN-served).
  No login, no API key in page source beyond the public account id.
- The legacy triple lookup keeps working unchanged (existing customers).

## R2. Demo/marketing account concept

A first-class account type (or account flag) for Thridify's own properties:

- Owned by Thridify, not billed, not counted in customer metrics/quotas —
  or counted separately so marketing traffic never distorts customer
  analytics or triggers usage-limit machinery.
- Can publish experiences exactly like a customer account (same authoring
  tools, same publish pipeline) — the hero must be a *real* published
  experience, not a bespoke code path (mirrors the platform rule: fix the
  data shape, never special-case the consumer).
- Suggested id: `thridify-marketing`. At least two experiences to start:
  the hero configurator and a vertical-page demo.

## R3. Domain allowlist

Embeds must be restricted per account to an allowlist of origins (checked
via `Origin`/`Referer` on the resolution call and enforced in the runtime):

- `https://site-thridify.snowy-cherry-cd2c.workers.dev` (Tyashin preview)
- `https://thridify.com` and `https://www.thridify.com` (production — both
  hosts serve 200 by design, no redirect)
- `http://localhost:*` for development (dev-mode flag on the account)

Failure mode must be graceful: a disallowed origin renders the poster frame
with no console spam and emits an `error` event — never a broken box.

## R4. Lazy-load + poster-frame contract (LCP)

The current placeholder already does poster-first + viewport/idle-deferred
loading; the SDK must not regress this. Required contract:

- **Poster URL in the publish manifest.** Every published experience carries
  a static poster render (AVIF/WebP + fallback, ≤60 KB, correct aspect
  ratio) that the site can `<img>` server-side render for LCP. Exposed both
  in the resolution response and as a predictable CDN URL
  (`.../experiences/<id>/poster.webp`).
- **Zero work before `mount()`.** Loading `thridify.js` alone must schedule
  nothing: no network fetches, no WebGL context, no workers. All asset
  download starts only on explicit `mount()` (the site calls it on
  viewport-intersection + `requestIdleCallback`).
- **`preload()` hint** (optional but wanted): `Thridify.preload({account,
  experience})` warms the manifest + first asset chunk without instantiating
  a canvas, so the site can preload on hover/near-viewport.
- **Progressive readiness events** (see R6): `posterreplaced` fires the
  moment the interactive canvas visually replaces the poster, so the site
  can cross-fade instead of popping.

## R5. Asset size budget

For the marketing-account tier specifically (enforced at publish time, not
politely suggested):

| Asset | Budget |
|---|---|
| SDK runtime JS (gzipped, everything executed before first frame) | ≤ 150 KB |
| Experience model + textures (draco/KTX2, first interactive frame) | ≤ 2 MB |
| Poster image | ≤ 60 KB |
| Total transferred before the user can drag-to-spin | ≤ 2.5 MB |

Publish should fail (or loudly warn) when a marketing-account experience
exceeds budget. Additional finish textures/variants may stream lazily after
first interaction — they don't count against the first-frame budget.

## R6. JS events API (bidirectional)

The site's own UI (finish swatches, IBM-Plex-Mono price ticker, AR chip —
all outside the canvas, styled to the site's design system) must be able to
**drive** the experience and **mirror** it. Required surface on the handle
returned by `mount()`:

**Commands in:**

- `exp.setOption(groupId, optionId)` — e.g. select the "Blush" finish.
- `exp.getState()` → `{ options, price: {amount, currency}, arAvailable }`.
- `exp.enterAR()` — programmatic AR activation (mobile); resolves/rejects.
- `exp.getARLink()` → URL suitable for QR rendering on desktop (see
  ASSET-DEBT #10 — the site renders its own QR from this).

**Events out** (`exp.on(event, cb)` / `exp.off`):

- `ready` — manifest resolved, canvas interactive.
- `posterreplaced` — canvas visually live (cross-fade point).
- `optionchange` — `{groupId, optionId, source: 'user'|'api'}` (user dragged
  or tapped inside the canvas → the site's swatches update too).
- `pricechange` — `{amount, currency}` → drives the price ticker.
- `arstart` / `arend`.
- `error` — `{code, message}`; codes at minimum `ORIGIN_DENIED`,
  `NOT_FOUND`, `ASSET_FAILED`, `WEBGL_UNAVAILABLE`.

Price semantics: **minor units + ISO currency code** in all payloads (the
platform-wide money convention); formatting is the consumer's job.

## R7. Reduced-motion + no-WebGL fallback

- `prefers-reduced-motion: reduce` → no auto-rotate, no idle camera drift;
  interaction still works. Overridable via mount option
  (`motion: 'auto'|'reduced'`), defaulting to the media query.
- WebGL/WebGPU unavailable → SDK stays on the poster, fires
  `error {code: 'WEBGL_UNAVAILABLE'}`, and the site keeps its static
  fallback. Never a black canvas.

## R8. Clean lifecycle (mount / unmount / re-init)

The site is an SPA-navigated Next.js app with React strict-mode double-mount
in dev and client-side route transitions in prod:

- `exp.destroy()` — releases the WebGL context, cancels in-flight fetches,
  removes all listeners and DOM. Idempotent. After `destroy()`, a fresh
  `mount()` on the same element must work.
- Multiple concurrent mounts on one page must work (home hero + a vertical
  demo lower on the page).
- No globals mutated beyond one `window.Thridify` namespace; no CSS injected
  outside a scoped container (the site owns all surrounding chrome).
- SDK is versioned: `.../sdk/v1/thridify.js` with immutable pinned builds
  (`.../sdk/1.4.2/...`) available; `v1` may only receive backward-compatible
  changes per this contract.

## R9. Privacy/analytics posture

Marketing-account embeds default to **no visitor tracking beyond anonymous
aggregate counts** (opt-in principle). Any analytics beacon must be
declared in the resolution response so the site can list it in its privacy
policy (ASSET-DEBT #6). No third-party cookies.

---

## Acceptance test (definition of done, runnable by the website team)

1. On a clean clone of this repo, replace `HeroObject`'s model-viewer with
   `Thridify.mount()` per R1 using the demo account + experience id.
2. Preview deploy on the workers.dev host: hero renders poster SSR-first,
   goes interactive on scroll+idle, total pre-interaction transfer ≤ 2.5 MB
   (verified in the network panel).
3. Site-owned swatches drive the model (R6 commands); dragging a canvas-side
   option updates the site's price ticker (R6 events).
4. `prefers-reduced-motion` emulation → no auto-rotate.
5. Client-navigate away and back 5× → no WebGL context leak (checked via
   `about:gpu` / performance memory), no duplicate listeners.
6. Load the same page from a non-allowlisted origin → poster + `error`
   event, nothing broken.
