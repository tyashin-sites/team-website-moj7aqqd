import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/Button';
import { getBrandKit } from '@/lib/brand-kit';
import { MobileNav } from './MobileNav';
import siteData from '../../content/site.json';

export async function Header() {
  const brandKit = await getBrandKit();
  const logoUrl = brandKit.logo?.light;
  const siteName = brandKit.siteName || 'Thridify';
  const { header } = siteData;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo — fetched at runtime from brand kit */}
          <Link href="/" className="flex items-center space-x-2">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={siteName}
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            ) : (
              <span className="text-xl font-heading font-bold text-primary">{siteName}</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {header.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button href={header.ctaButton.href}>{header.ctaButton.text}</Button>
          </div>

          {/* Mobile Menu — client component for interactivity */}
          <MobileNav
            navigation={header.navigation}
            ctaButton={header.ctaButton}
          />
        </div>
      </div>
    </header>
  );
}
