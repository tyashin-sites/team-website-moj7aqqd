import type { Metadata } from 'next';
import { bodyFont, headingFont } from '@/lib/fonts';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <head>
          <link rel="stylesheet" href="https://website-api.tyashin.com/api/v1/public/brand-kit.css?apiKey=ak_MHWfta1xNEEMAmI1UbSE99HEwTuAEWix" />
        </head>
        <body className="font-body bg-background text-foreground antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
