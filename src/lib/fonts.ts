import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';

// Canonical type stack per DESIGN-SPEC §2:
//   Display/headings — Space Grotesk (500, 700)
//   Body/UI          — Inter (400, 500, 600)
//   Data/price/code  — IBM Plex Mono (400, 500) — price ticker, metrics, BOM

export const headingFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-heading',
  display: 'swap',
});

export const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  // Not above-the-fold critical (price ticker / metrics only). Skip the
  // high-priority <link rel=preload as=font> so it never competes with the
  // hero LCP poster on the throttled connection (§10). Still self-hosted +
  // swap, so it loads without blocking and paints the moment it arrives.
  preload: false,
});
