import Link from 'next/link';
import Image from 'next/image';
import { getBrandKit } from '@/lib/brand-kit';
import siteData from '../../content/site.json';
import { MobileNav } from './MobileNav';

export async function Header() {
  const brandKit = await getBrandKit();
  const logoUrl = brandKit.logo?.light;
  const siteName = brandKit.siteName || (siteData as any)?.header?.siteName || 'Thridify';
  const nav = (siteData as any)?.header?.nav ?? [];
  const cta = (siteData as any)?.header?.cta ?? { label: 'Contact', href: '/contact' };

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-foreground/8">
      <div className="container-x flex items-center justify-between h-24">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={siteName}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={siteName}
              width={220}
              height={56}
              className="h-12 md:h-14 w-auto object-contain"
              priority
            />
          ) : (
            <span className="text-2xl font-heading font-bold tracking-tight">{siteName}</span>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-10 mx-auto">
          {(nav ?? []).map((item: any) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-foreground/75 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <Link href={cta.href} className="hidden md:inline-flex btn btn-primary">
            {cta.label}
          </Link>
          <MobileNav nav={nav ?? []} ctaText={cta.label} ctaHref={cta.href} />
        </div>
      </div>
    </header>
  );
}
