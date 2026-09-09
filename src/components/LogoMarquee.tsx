import Image from 'next/image';
import type { ClientLogo } from '@/lib/content';

/**
 * LogoMarquee — real client logos only (No-Faking rule; DESIGN-SPEC §6).
 * Pure-CSS marquee (`.animate-marquee`: 40s linear, pause on hover, killed
 * by the reduced-motion block). Server component — zero JS shipped.
 */
export function LogoMarquee({
  eyebrow,
  logos,
}: {
  eyebrow: string;
  logos: ClientLogo[];
}) {
  if (logos.length === 0) return null;
  return (
    <section className="py-14 md:py-16 border-b border-foreground/5" aria-label="Client logos">
      <div className="container-x">
        <p className="eyebrow eyebrow-center mb-8 w-full justify-center">{eyebrow}</p>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" aria-hidden />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" aria-hidden />
          <div className="flex animate-marquee w-max items-center">
            {/* Track duplicated so translateX(-50%) loops seamlessly. */}
            {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="logo-quiet flex-shrink-0 mx-8 md:mx-12 h-[4.5rem] flex items-center"
              >
                <Image
                  src={logo.logoUrl}
                  alt={logo.name}
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain max-w-[150px]"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
