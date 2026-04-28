import type { Metadata } from 'next';
import { bodyFont, headingFont } from '@/lib/fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/components/CartProvider';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Thridify - 3D & AR Commerce Platform', template: '%s | Thridify' },
  description: 'Transform your e-commerce with 3D product visualization and AR technology that reduces returns and boosts conversions',
  keywords: ['3D commerce', 'AR shopping', 'product visualization', 'e-commerce platform'],
  openGraph: {
    title: 'Thridify - 3D & AR Commerce Platform',
    description: 'Transform your e-commerce with 3D product visualization and AR technology',
    type: 'website',
    siteName: 'Thridify',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <head>
        <link rel="stylesheet" href="/brand-kit.css" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <script src="/tyashin-runtime.js" defer></script>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}