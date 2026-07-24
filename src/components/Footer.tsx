import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Facebook, Instagram, MessageCircle, Globe } from 'lucide-react';
import { getBrandKit } from '@/lib/brand-kit';
import siteData from '../../content/site.json';

const FALLBACK_FOOTER = {
  tagline: 'Building the immersive commerce layer for the next decade of online retail.',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'WhatsApp', href: 'https://wa.me/919667747082' },
  ],
  columns: [],
  copyright: '© 2026 Aapastech Private Limited. All rights reserved.',
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

// Map a social label to its official lucide icon. Returns a `Globe` for
// anything we don't recognise so the icon row never has an empty slot.
function socialIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('linkedin')) return Linkedin;
  if (l.includes('facebook')) return Facebook;
  if (l.includes('instagram')) return Instagram;
  if (l.includes('whatsapp')) return MessageCircle;
  return Globe;
}

export async function Footer() {
  const brandKit = await getBrandKit();
  const logoUrl = brandKit.logo?.dark || brandKit.logo?.light;
  const siteName = brandKit.siteName || (siteData as any)?.header?.siteName || 'Thridify';
  const f = (siteData as any)?.footer ?? FALLBACK_FOOTER;

  return (
    // Dark ink footer — canonical #021F17 with muted #A3BFB5 text (DESIGN-SPEC §1)
    <footer className="relative bg-ink text-paper overflow-hidden">
      <div className="absolute inset-0 opacity-30 aurora pointer-events-none" aria-hidden />
      <div className="container-x relative py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Brand + tagline + socials */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 mb-7" aria-label={siteName}>
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={320}
                  height={84}
                  className="h-20 md:h-24 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <span className="text-4xl font-heading font-bold tracking-tight">{siteName}</span>
              )}
            </Link>
            <p className="text-base md:text-lg max-w-md text-muted-dark leading-relaxed">
              {f.tagline ?? FALLBACK_FOOTER.tagline}
            </p>
            <div className="mt-8 flex gap-3">
              {(f.socials ?? []).map((s: any) => {
                const Icon = socialIcon(s.label);
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-full border border-paper/20 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns — explicit grid widths so the Connect column has
              breathing room for "+91-966-774-7082" without wrapping. */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {(f.columns ?? []).map((col: any) => {
              const isConnect = (col.title || '').toLowerCase() === 'connect';
              return (
                <div key={col.title} className={isConnect ? 'sm:col-span-2 md:col-span-1' : ''}>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-dark/80 mb-5">
                    {col.title}
                  </h4>
                  <ul className="space-y-3">
                    {(col.links ?? []).map((link: any) => {
                      const isPhone = String(link.href || '').startsWith('tel:');
                      const isMail = String(link.href || '').startsWith('mailto:');
                      const external = isPhone || isMail || /^https?:/i.test(String(link.href || ''));
                      return (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            {...(external ? {} : {})}
                            className={
                              'text-muted-dark hover:text-paper transition-colors ' +
                              // Numbers (and the email) must never wrap mid-token —
                              // even on narrow phones. The `break-words` makes the
                              // whole token break to its own line gracefully if the
                              // container is genuinely too narrow.
                              (isPhone || isMail
                                ? 'whitespace-nowrap inline-block'
                                : '')
                            }
                          >
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-paper/15 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-sm text-muted-dark">
          <p>{f.copyright ?? FALLBACK_FOOTER.copyright}</p>
          <div className="flex gap-6">
            {(f.legal ?? []).map((l: any) => (
              <Link key={l.href} href={l.href} className="hover:text-paper transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
