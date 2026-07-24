import type { Metadata } from 'next';
import siteData from '@/../content/site.json';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Thridify. Global offices in India, Canada and Europe.',
};

type Office = {
  region: string;
  city?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
};

const FALLBACK_OFFICES: Office[] = [
  {
    region: 'India',
    city: 'Delhi',
    address: 'Aapastech Private Limited, Delhi, India',
    phone: '+91-966-774-7082',
    whatsapp: '919667747082',
    email: 'hello@thridify.com',
  },
  {
    region: 'Canada',
    city: 'Toronto, Ontario',
    address: 'Toronto, Ontario, Canada',
    phone: '+1-437-800-0190',
    whatsapp: '14378000190',
    email: 'hello@thridify.com',
  },
  {
    region: 'Europe',
    city: 'Estonia',
    address: 'Estonia',
    email: 'hello@thridify.com',
  },
];

function telHref(p?: string) {
  return p ? `tel:${p.replace(/[^+\d]/g, '')}` : undefined;
}
function waHref(p?: string) {
  return p ? `https://wa.me/${p.replace(/[^\d]/g, '')}` : undefined;
}

export default function ContactPage() {
  const page = (siteData as any).pages?.contact ?? {};
  const heroTitle: string = page.hero?.title ?? "Let's build the future of commerce together.";
  const heroSubtitle: string =
    page.hero?.subtitle ??
    'Talk to our team about bringing immersive 3D and AR experiences to your products. We respond within one business day.';
  const offices: Office[] = page.offices ?? FALLBACK_OFFICES;
  const generalEmail: string = page.email ?? 'hello@thridify.com';

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden aurora">
        <div className="container-x section text-center">
          <p className="eyebrow reveal">Contact</p>
          <h1 className="tt-display mt-5 reveal" style={{ animationDelay: '80ms' }}>
            {heroTitle}
          </h1>
          <p
            className="mt-7 text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed reveal"
            style={{ animationDelay: '160ms' }}
          >
            {heroSubtitle}
          </p>
          <div
            className="mt-10 flex flex-wrap justify-center gap-4 reveal"
            style={{ animationDelay: '240ms' }}
          >
            <a href={`mailto:${generalEmail}`} className="btn btn-primary">
              {generalEmail}
            </a>
            <a href="#offices" className="btn btn-ghost">
              View global offices
            </a>
          </div>
        </div>
      </section>

      {/* Contact form + sidebar */}
      <section id="contact-form" className="section">
        <div className="container-x grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow">Book a demo</p>
            <h2 className="tt-1 mt-4">Tell us about your products.</h2>
            <p className="mt-5 text-foreground/70 text-lg leading-relaxed max-w-xl">
              Share a few details and we&rsquo;ll show you how Thridify turns your catalog
              into immersive 3D and AR experiences &mdash; with zero engineering effort.
            </p>

            <ContactForm fallbackEmail={generalEmail} />
            {/* Old mailto: form removed — leads now flow through /api/contact
                (BUILD-PLAN Phase 0 pipeline). */}
          </div>

          <aside className="lg:col-span-5">
            <div className="card p-8 md:p-10 sticky top-28">
              <p className="eyebrow">Direct lines</p>
              <h3 className="tt-2 mt-4">Talk to a human.</h3>
              <p className="mt-4 text-foreground/70 leading-relaxed">
                Prefer a quick chat? Reach our regional teams on phone or WhatsApp.
              </p>
              <div className="mt-8 space-y-6">
                {offices.map(o => (
                  <div key={o.region} className="pb-6 border-b border-foreground/10 last:border-0 last:pb-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-heading font-semibold text-lg">{o.region}</p>
                      {o.city && <span className="text-sm text-foreground/60">{o.city}</span>}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {o.phone && (
                        <a
                          href={telHref(o.phone)}
                          className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full bg-foreground text-background hover:bg-primary transition"
                        >
                          <span aria-hidden>📞</span> {o.phone}
                        </a>
                      )}
                      {o.whatsapp && (
                        <a
                          href={waHref(o.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border border-foreground/20 hover:bg-foreground/5 transition"
                        >
                          <span aria-hidden>💬</span> WhatsApp
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

      {/* Offices grid */}
      <section id="offices" className="section bg-surface/40">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow">Global presence</p>
            <h2 className="tt-1 mt-4">Three regions. One platform.</h2>
            <p className="mt-5 text-foreground/70 text-lg leading-relaxed">
              Wherever your customers are, our team is close by &mdash; ready to help you ship
              immersive product experiences fast.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((o, i) => (
              <article key={o.region} className="card p-8 group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                    0{i + 1}
                  </span>
                  <span className="text-xs text-foreground/50">{o.city}</span>
                </div>
                <h3 className="tt-2 mt-4">{o.region}</h3>
                {o.address && (
                  <p className="mt-3 text-foreground/70 leading-relaxed">{o.address}</p>
                )}
                <div className="mt-6 space-y-2">
                  {o.phone && (
                    <a
                      href={telHref(o.phone)}
                      className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition"
                    >
                      <span aria-hidden>📞</span> {o.phone}
                    </a>
                  )}
                  {o.whatsapp && (
                    <a
                      href={waHref(o.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition"
                    >
                      <span aria-hidden>💬</span> Chat on WhatsApp
                    </a>
                  )}
                  {o.email && (
                    <a
                      href={`mailto:${o.email}`}
                      className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition"
                    >
                      <span aria-hidden>✉️</span> {o.email}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Map / closing band */}
      <section className="relative overflow-hidden">
        <div className="container-x section">
          <div className="relative rounded-lg overflow-hidden aurora p-12 md:p-20 text-center">
            <div className="relative">
              <p className="eyebrow">Ready when you are</p>
              <h2 className="tt-1 mt-4 max-w-3xl mx-auto">
                Reimagine how the world experiences your products.
              </h2>
              <p className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto">
                Book a 20-minute demo and see your own product in 3D and AR &mdash; live.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <a
                  href="https://calendly.com/hello-thridify/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Book a Demo
                </a>
                <a href={`mailto:${generalEmail}`} className="btn btn-ghost">
                  Email the team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
