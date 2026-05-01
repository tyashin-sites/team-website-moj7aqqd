import Link from 'next/link';
import Image from 'next/image';
import { getBrandKit } from '@/lib/brand-kit';
import siteData from '../../content/site.json';

export async function Footer() {
  const brandKit = await getBrandKit();
  const logoUrl = brandKit.logo?.dark || brandKit.logo?.light;
  const siteName = brandKit.siteName || siteData.header.siteName;
  const f = siteData.footer;

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 opacity-30 aurora pointer-events-none" aria-hidden />
      <div className="container-x relative py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 mb-7">
              {logoUrl ? (
                <Image src={logoUrl} alt={siteName} width={160} height={42} className="h-10 w-auto object-contain brightness-0 invert" />
              ) : (
                <span className="text-2xl font-heading font-bold">{siteName}</span>
              )}
            </Link>
            <p className="text-lg max-w-md text-background/70 leading-relaxed">
              {f.tagline}
            </p>
            <div className="mt-8 flex gap-3">
              {f.socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full border border-background/20 flex items-center justify-center text-sm font-semibold hover:bg-background hover:text-foreground transition-colors"
                >
                  {s.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            {f.columns.map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-background/50 mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-background/80 hover:text-background transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-sm text-background/60">
          <p>{f.copyright}</p>
          <div className="flex gap-6">
            {f.legal.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-background transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
