import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: '**' },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;