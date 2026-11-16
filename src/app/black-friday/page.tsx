import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { SHOPIFY_APP_URL } from '@/lib/shopify-app';
import { BLACK_FRIDAY_COPY } from '@/content/black-friday';
import {
  BLACK_FRIDAY_CALENDLY_URL,
  BLACK_FRIDAY_PATH,
  BLACK_FRIDAY_SHOW_SHOPIFY_LINK,
} from '@/lib/black-friday';

/**
 * /black-friday — temporary campaign page (16–25 Nov 2026).
 *
 * Reachability and expiry are decided per request in src/middleware.ts via
 * src/lib/black-friday.ts; this file only renders the copy. Rendered per
 * request (never prerendered or cached) so nothing can serve the page past
 * its expiry.
 *
 * NOT indexable and NOT discoverable: `noindex, nofollow`, absent from
 * src/lib/site-routes.ts (so not in /sitemap-pages.xml), absent from
 * /llms.txt, and not linked from the nav or footer. Keep it that way.
 */
export const dynamic = 'force-dynamic';

const ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export function generateMetadata(): Metadata {
  const copy = BLACK_FRIDAY_COPY;
  if (!copy) return { robots: ROBOTS };
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: BLACK_FRIDAY_PATH,
    extra: { robots: ROBOTS },
  });
}

export default function BlackFridayPage() {
  const copy = BLACK_FRIDAY_COPY;
  if (!copy) notFound();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60" aria-hidden />
        <div className="container-x relative section pt-16 pb-10 md:pb-14">
          <div className="max-w-3xl">
            {copy.eyebrow && <p className="eyebrow">{copy.eyebrow}</p>}
            <h1 className="tt-1 text-foreground">{copy.headline}</h1>
            <div className="mt-6 max-w-[65ch] space-y-4 text-foreground/80 leading-relaxed">
              {copy.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={BLACK_FRIDAY_CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Book a 30-minute call
              </a>
              {BLACK_FRIDAY_SHOW_SHOPIFY_LINK && (
                <a
                  href={SHOPIFY_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary underline underline-offset-4"
                >
                  Thridify on the Shopify App Store
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-[65ch] text-foreground/75 leading-relaxed">
            {copy.sections.map((s) => (
              <section key={s.heading} className="mt-12 first:mt-0">
                <h2 className="tt-2 text-foreground">{s.heading}</h2>
                <div className="mt-4 space-y-4">
                  {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                  {s.bullets && (
                    <ul className="list-disc pl-5 space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {s.steps && (
                    <ol className="list-decimal pl-5 space-y-2">
                      {s.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </section>
            ))}
            {copy.footnote && <p className="mt-12 text-sm text-foreground/70">{copy.footnote}</p>}
            <div className="mt-12">
              <a
                href={BLACK_FRIDAY_CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Book a 30-minute call
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
