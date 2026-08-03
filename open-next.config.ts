import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Prerendered (SSG) pages — notably the 6 fully-static `/industries/<slug>`
// pages — are stored by OpenNext in the incremental cache, NOT the plain
// static-assets bundle. With no incrementalCache configured, a cache MISS on
// those prerendered pages 404s under OpenNext-Cloudflare (the original
// dynamicParams:false regression). The read-only static-assets cache copies
// the prerendered `.cache` payloads into the Workers assets bundle
// (`cdn-cgi/_next_cache/...`) at build time and serves them from there — so
// the 6 known pages resolve 200 with no revalidation and no R2/KV binding,
// while `dynamicParams = false` keeps every unknown slug a true framework 404.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
