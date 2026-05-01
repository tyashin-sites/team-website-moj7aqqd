import Link from 'next/link';
import Image from 'next/image';
import { getBrandKit } from '@/lib/brand-kit';
import siteData from '../../content/site.json';
import { MobileNav } from './MobileNav';

export async function Header() {
  const brandKit = await getBrandKit();
  const logoUrl = brandKit.logo?.light;
  const siteName = brandKit.siteName || siteData.header.siteName;
  const nav = siteData.header.nav;
  const cta = siteData.header.cta;

  return (
    <header className="sticky top-0 z-50 bg-background/75 backdrop-blur-xl border-b border-foreground/5">
      <div className="container-x flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2.5" aria-label={siteName}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={siteName}
              width={150}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          ) : (
            <span className="text-xl font-heading font-bold tracking-tight">{siteName}</span>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href={cta.href} className="hidden md:inline-flex btn btn-primary">
            {cta.label}
          </Link>
          <MobileNav nav={nav} ctaText={cta.label} ctaHref={cta.href} />
        </div>
      </div>
    </header>
  );
}
