# Copilot prompt — standalone experience embeds for the Thridify SDK

> Hand the block below to Copilot (or any coding agent) working on the
> **Thridify product codebase**. It is self-contained: no context from the
> marketing-site repo or any chat session is required. Adjust file/module
> names to match the actual Thridify repo layout — the prompt describes
> behavior, not file paths.

---

```
You are working on the Thridify product codebase (the 3D/AR configurator
platform: JavaScript embed SDK + experience backend + publish pipeline).

GOAL
Add first-class support for STANDALONE EXPERIENCE EMBEDS: a published
experience that can be mounted on any allowlisted website by a stable
experience id alone — no product id, no variant id, no e-commerce product
page context. The first consumer is Thridify's own marketing website, which
must embed a live hero configurator (real SDK, real published experience)
on these origins:

  - https://site-thridify.snowy-cherry-cd2c.workers.dev  (staging)
  - https://thridify.com and https://www.thridify.com    (production)
  - http://localhost:* (dev mode only)

Today the SDK resolves experiences from the triple (accountId, productId,
variantId). That path must keep working UNCHANGED for existing customers.
You are adding a second, simpler addressing mode next to it, not replacing
it.

DELIVERABLES

1. RESOLUTION ENDPOINT (backend)
   - New public, unauthenticated, CDN-cacheable endpoint, e.g.
     GET /embed/v1/experiences/:accountId/:experienceId
   - Returns a manifest: experience metadata, poster image URL, asset
     bundle URLs, option groups (e.g. finishes) with per-option pricing,
     price as MINOR UNITS + ISO 4217 currency code, AR availability, and
     the analytics/beacon endpoints the runtime will call (declared, so
     embedding sites can document them in their privacy policy).
   - :experienceId is a STABLE slug chosen at publish time; republishing a
     new version of the experience must NOT change it. Internally it can
     map to whatever versioned artifact the publish pipeline produces.
   - Cache: long max-age + stale-while-revalidate; bust via versioned
     asset URLs inside the manifest, never via the manifest URL itself.

2. ORIGIN ALLOWLIST (backend + runtime)
   - Per-account list of allowed embed origins, editable in the account
     admin. The resolution endpoint checks Origin/Referer; the runtime
     also refuses to boot on a non-allowlisted origin.
   - A dev-mode flag on the account permits http://localhost:* .
   - Denial is graceful: HTTP 403 with a machine-readable code
     ORIGIN_DENIED; the SDK then stays on the poster frame and emits an
     'error' event — no broken UI, no console spam beyond one warning.

3. DEMO/MARKETING ACCOUNT TYPE
   - An account flag (e.g. kind: 'internal') for Thridify-owned accounts:
     never billed, excluded from customer usage metrics and quota/limit
     enforcement (or metered into a separate internal bucket).
   - Everything else behaves exactly like a customer account: same
     authoring tools, same publish pipeline, same SDK path. No special
     code paths keyed on this flag anywhere in the runtime.
   - Seed one account 'thridify-marketing' with the allowlist above.

4. SDK: STANDALONE MOUNT API (runtime)
   Declarative:
     <script async src="https://cdn.thridify.com/sdk/v1/thridify.js"></script>
     <div data-thridify-experience="demo-hero-chair"
          data-thridify-account="thridify-marketing"></div>
   Imperative:
     const exp = await Thridify.mount(el, {
       account: 'thridify-marketing',
       experience: 'demo-hero-chair',
       motion: 'auto' | 'reduced',   // default: follow prefers-reduced-motion
     });
   Also: Thridify.preload({account, experience}) — warms manifest + first
   asset chunk without creating a canvas or WebGL context.

   Loading thridify.js by itself must do NOTHING (no fetches, no WebGL, no
   workers) until mount()/preload() is called or a data-thridify element is
   found. Ship it as an idempotent, side-effect-scoped module exposing a
   single window.Thridify namespace; no global CSS outside the mounted
   container.

5. SDK: EVENTS + COMMANDS API (runtime)
   The handle returned by mount() must expose:
   Commands:
     exp.setOption(groupId, optionId)      // drive the experience from host UI
     exp.getState() -> { options, price: {amount, currency}, arAvailable }
     exp.enterAR() -> Promise             // mobile AR activation
     exp.getARLink() -> string            // URL the host can render as a QR
     exp.destroy()                        // see lifecycle below
   Events (exp.on / exp.off):
     'ready'          manifest resolved, canvas interactive
     'posterreplaced' canvas visually replaced the poster (host cross-fades)
     'optionchange'   {groupId, optionId, source: 'user'|'api'}
     'pricechange'    {amount, currency}   // minor units, always
     'arstart' / 'arend'
     'error'          {code, message} with codes at least:
                      ORIGIN_DENIED, NOT_FOUND, ASSET_FAILED,
                      WEBGL_UNAVAILABLE
   Host pages will build their own swatches/price ticker/AR button around
   the canvas — the API must be sufficient to both DRIVE and MIRROR the
   experience without touching SDK internals.

6. POSTER + LAZY-LOAD CONTRACT (publish pipeline + runtime)
   - Every published experience gets a static poster render (WebP/AVIF +
     JPEG fallback, <= 60 KB, same aspect ratio as the canvas) at a
     predictable CDN URL and referenced in the manifest, so host pages can
     server-render it as an <img> for LCP before the SDK loads.
   - On mount, the SDK shows/keeps the poster until the first interactive
     frame, then fires 'posterreplaced'.

7. ASSET BUDGET ENFORCEMENT (publish pipeline)
   For internal/marketing accounts (and ideally as a warning for all):
   - runtime JS executed before first frame: <= 150 KB gzipped
   - model + textures for first interactive frame: <= 2 MB
     (draco-compressed geometry, KTX2 textures)
   - poster: <= 60 KB
   Publish fails with a clear error when an internal-account experience
   exceeds budget. Extra variant textures may stream lazily after first
   interaction and are excluded from the first-frame budget.

8. LIFECYCLE + ACCESSIBILITY (runtime)
   - exp.destroy(): idempotent; releases the WebGL context, aborts
     in-flight fetches, removes listeners and DOM. mount() on the same
     element after destroy() must work (React strict-mode double-mount and
     SPA route transitions are the test cases).
   - Multiple concurrent mounts on one page must work.
   - prefers-reduced-motion: reduce -> no auto-rotate / idle camera drift;
     pointer interaction still works; overridable via the motion option.
   - No WebGL/WebGPU -> stay on poster, emit error WEBGL_UNAVAILABLE.
   - SDK versioning: /sdk/v1/thridify.js is a moving pointer that only
     receives backward-compatible changes; immutable pinned builds also
     published (/sdk/<exact-version>/thridify.js).

9. TESTS + DOCS
   - Unit tests for origin checking, manifest resolution, and the events
     API; an integration test page that mounts a demo experience, drives
     setOption, asserts pricechange/optionchange round-trips, and calls
     destroy()/mount() repeatedly asserting no WebGL context leak.
   - A docs page ("Embed an experience anywhere") with the declarative and
     imperative snippets above.

NON-GOALS
   - Do not change or deprecate the (accountId, productId, variantId)
     product-page lookup; it stays as-is.
   - No cart/checkout integration in standalone mode.
   - No visitor-level tracking for internal accounts by default —
     aggregate anonymous counts only.

ACCEPTANCE
   A plain HTML page on an allowlisted origin containing only the script
   tag and the data-thridify div renders the poster, becomes interactive
   lazily, responds to setOption from host JS, reports price changes in
   minor units via events, survives 5 mount/destroy cycles without leaking
   a WebGL context, and refuses (gracefully, poster + error event) to run
   on a non-allowlisted origin.
```
