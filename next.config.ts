import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: '**' },
    ],
  },
  // Type errors FAIL the build on purpose — the typed content contract in
  // src/lib/content.ts only protects against site.json drift if drift can
  // break CI (Phase 2, QA carry-forward on the `(siteData as any)` casts).
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
