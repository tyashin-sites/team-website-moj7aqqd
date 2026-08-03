import Link from 'next/link';
import Image from 'next/image';
import { getBrandKit } from '@/lib/brand-kit';
import { headerContent } from '@/lib/content';
import { MobileNav } from './MobileNav';

export async function Header() {
  const brandKit = await getBrandKit();
  const logoUrl = brandKit.logo?.light;
  const siteName = brandKit.siteName || headerContent.siteName;
  const { nav, cta } = headerContent;

  return (
    // 72px bar + blur per DESIGN-SPEC §7; logo 40px tall
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-foreground/8">
      <div className="container-x flex items-center justify-between h-[72px]">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={siteName}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={siteName}
              width={220}
              height={56}
              className="h-10 w-auto object-contain"
              priority
            />
          ) : (
            <span className="text-2xl font-heading font-bold tracking-tight">{siteName}</span>
          )}
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-10 mx-auto">
          {nav.map((item) => (
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
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn btn-primary"
          >
            {cta.label}
          </a>
          <MobileNav nav={nav} ctaText={cta.label} ctaHref={cta.href} />
        </div>
      </div>
    </header>
  );
}
