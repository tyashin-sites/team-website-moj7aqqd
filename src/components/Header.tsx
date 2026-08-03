import Link from 'next/link';
import Image from 'next/image';
import { getBrandKit } from '@/lib/brand-kit';
import { headerContent } from '@/lib/content';
import { MobileNav } from './MobileNav';

export async function Header() {
  const brandKit = await getBrandKit();
  // Self-hosted, pre-optimized brand mark (public/brand/logo-light.webp, 5KB).
  // The platform image optimizer (/_next/image) returns 400 for the remote
  // brand-kit PNG on OpenNext/Cloudflare — that surfaced as a console error on
  // every page (Phase-5 best-practices). The remote source is also a 4000×4000
  // 231KB PNG. Serving a local WebP kills the 400, the console error, the
  // 231KB weight and the cross-origin runtime dependency. Regenerate from the
  // brand kit if the logo changes (scratchpad sharp resize → /brand/*.webp).
  const logoUrl = '/brand/logo-light.webp';
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
              height={220}
              loading="eager"
              unoptimized
              className="h-10 w-auto object-contain"
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
