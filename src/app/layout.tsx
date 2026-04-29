import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { bodyFont, headingFont } from '@/lib/fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Thridify - 3D & AR Commerce Platform',
    template: '%s | Thridify',
  },
  description: 'Transform e-commerce with immersive 3D viewers and AR technology. Boost conversions, reduce returns, and cut photography costs with our no-code platform.',
  keywords: ['3D commerce', 'AR viewer', 'e-commerce', '3D product viewer', 'augmented reality'],
  openGraph: {
    title: 'Thridify - 3D & AR Commerce Platform',
    description: 'Transform e-commerce with immersive 3D viewers and AR technology.',
    type: 'website',
    siteName: 'Thridify',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thridify - 3D & AR Commerce Platform',
    description: 'Transform e-commerce with immersive 3D viewers and AR technology.',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await headers();

  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body className="font-body bg-background text-foreground antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
