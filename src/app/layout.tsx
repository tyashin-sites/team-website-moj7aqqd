import type { Metadata } from 'next';
import { bodyFont, headingFont, monoFont } from '@/lib/fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Thridify — Reimagine how the world experiences your products',
    template: '%s | Thridify',
  },
  description:
    'Thridify is a no-code 3D and Augmented Reality commerce platform that helps e-commerce brands boost conversions, reduce returns, and cut photography costs.',
  keywords: ['3D commerce', 'AR commerce', 'product configurator', '3D viewer', 'augmented reality e-commerce', 'Thridify', 'Aapastech'],
  openGraph: {
    title: 'Thridify — 3D & AR Commerce Platform',
    description: 'No-code 3D and AR product experiences that boost e-commerce conversions.',
    type: 'website',
  },
  icons: {
    icon: '/brand/logo-favicon.png',
  },
};

/**
 * Canonical brand tokens per DESIGN-SPEC §1/§2 — non-negotiable.
 * The platform-served /brand-kit.css (linked above this style tag) currently
 * carries stale values; this inline block is rendered AFTER that link so the
 * canonical palette wins in the cascade regardless of what the platform
 * serves. Once the Tyashin brand kit is PATCHed to these exact values the two
 * sources agree and this stays as a belt-and-braces guard.
 */
const CANONICAL_BRAND_CSS = `
:root {
  --brand-primary: #007050;
  --brand-primary-deep: #004D37;
  --brand-primary-contrast: #FFFFFF;
  --brand-accent: #FEBFCC;
  --brand-ink: #021F17;
  --brand-bg: #FFFFFF;
  --brand-surface: #F0F5FA;
  --brand-text: #021F17;
  --brand-text-muted: #5B7A6E;
  --brand-muted-dark: #A3BFB5;
  --brand-border: rgba(2, 31, 23, 0.08);
  --brand-radius-sm: 0.5rem;
  --brand-radius-md: 0.75rem;
  --brand-radius-lg: 1rem;
  --brand-radius-full: 999px;
  --brand-heading-font: var(--font-heading), 'Space Grotesk', sans-serif;
  --brand-body-font: var(--font-body), 'Inter', sans-serif;
  --brand-mono-font: var(--font-mono), 'IBM Plex Mono', monospace;
}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable}`}>
      <head>
        <link rel="stylesheet" href="https://website-api.tyashin.com/api/v1/public/brand-kit.css?apiKey=ak_MHWfta1xNEEMAmI1UbSE99HEwTuAEWix" />
        {/* Canonical palette override — MUST stay after the brand-kit link. */}
        <style dangerouslySetInnerHTML={{ __html: CANONICAL_BRAND_CSS }} />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
