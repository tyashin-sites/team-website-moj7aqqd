import type { Metadata } from 'next';
import { contactContent } from '@/lib/content';
import { ConciergeForm } from '@/components/ConciergeForm';
import { CTABand } from '@/components/signature/CTABand';

export const metadata: Metadata = {
  title: 'Contact — Talk to Thridify',
  description:
    'Start with two fields — your email and what you sell. Regional teams in India, the Americas and Europe reply within one business day.',
  openGraph: {
    title: 'Contact Thridify',
    description: 'Tell us about your catalog — see your own product rebuilt in 3D and AR, live.',
    images: ['/og/contact.png'],
  },
};

const c = contactContent;

function telHref(raw?: string, pretty?: string) {
  const v = raw ?? pretty?.replace(/[^+\d]/g, '');
  return v ? `tel:${v}` : undefined;
}

export default function ContactPage() {
  return (
    <>
      {/* HERO — headline 5 words (≤12); subline 17 words (≤24). */}
      <section className="relative overflow-hidden aurora">
        <div className="container-x section pb-16 md:pb-20 text-center">
          <p className="eyebrow reveal">{c.hero.eyebrow}</p>
          <h1 className="tt-display mt-5 reveal">{c.hero.title}</h1>
          <p className="mt-7 lead max-w-2xl mx-auto reveal">{c.hero.subtitle}</p>
        </div>
      </section>

      {/* CONCIERGE FORM — 2-field starter, expands to full form; posts to
          /api/contact (Phase 0 pipeline). */}
      <section id="contact-form" className="section pt-0">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow">{c.form.title}</p>
            <h2 className="tt-1">{c.form.subtitle}</h2>
            <ConciergeForm fallbackEmail={c.email} />
          </div>

          {/* REGIONAL CONTACTS */}
          <aside className="lg:col-span-5">
            <div className="card p-8 md:p-10 lg:sticky lg:top-28">
              <p className="eyebrow">Regional contacts</p>
              <h3 className="tt-2 mt-2">Talk to a human.</h3>
              <div className="mt-6 space-y-6">
                {c.offices.map((o) => (
                  <div key={o.region} className="pb-6 border-b border-foreground/10 last:border-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-heading font-semibold text-lg">{o.region}</p>
                      <span className="text-sm text-foreground/60">{o.city}</span>
                    </div>
                    {o.detail && <p className="mt-1 text-sm text-foreground/55">{o.detail}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {o.phone && (
                        <a
                          href={telHref(o.phoneRaw, o.phone)}
                          className="inline-flex items-center text-sm font-medium px-3 py-1.5 rounded-full bg-foreground text-background hover:bg-primary transition-colors whitespace-nowrap"
                        >
                          {o.phone}
                        </a>
                      )}
                      {o.whatsapp && (
                        <a
                          href={o.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium px-3 py-1.5 rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
                        >
                          WhatsApp
                        </a>
                      )}
                      {o.email && (
                        <a
                          href={`mailto:${o.email}`}
                          className="inline-flex items-center text-sm font-medium px-3 py-1.5 rounded-full border border-foreground/20 hover:bg-foreground/5 transition-colors"
                        >
                          {o.email}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA BAND — the one primary CTA, for visitors who skip the form. */}
      <CTABand headline="Prefer to talk it through live?" />
    </>
  );
}
