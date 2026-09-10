import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE_URL } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

// FULLY STATIC — declarative, build-time content only.
export const dynamicParams = false;

const CANONICAL = '/get-a-website';
const TYASHIN_CONTACT = 'https://tyashin.com/contact';
const DEMO_STORE = 'https://demo.thridify.com';

export const metadata = pageMetadata({
  title: 'No website yet? Get a Thridify-powered storefront',
  description:
    "Thridify brings your products to life in 3D and AR — but it needs a storefront to live on. No website yet? Our platform partner Tyashin builds you a fast, SEO-ready store with Thridify's 3D & AR built in from day one.",
  keywords: [
    'get a website with 3D',
    'Thridify website',
    '3D AR storefront',
    'no website 3D commerce',
    'build a 3D product website',
    'Tyashin Thridify',
  ],
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'Get a Thridify-powered website',
  ogDescription:
    "No website yet? Get a fast, SEO-ready storefront with Thridify's 3D & AR experiences built in from day one — via our platform partner Tyashin.",
});

const WHY: { title: string; body: string }[] = [
  {
    title: '3D & AR from day one',
    body: 'Your storefront ships with Thridify configurators, 360° viewers and app-free AR already wired in — nothing to bolt on later.',
  },
  {
    title: 'No re-platforming, ever',
    body: 'Tyashin builds on a modern, fast, SEO-ready stack with Thridify natively integrated — so you never have to migrate just to add 3D and AR.',
  },
  {
    title: 'One team, deep integration',
    body: 'Thridify and the Tyashin platform are built and operated by the same company (Aapastech Private Limited), so the 3D/AR and the storefront work together seamlessly.',
  },
];

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: '1',
    title: 'Tell us about your products',
    body: 'Share your catalog, categories and goals with the Tyashin team.',
  },
  {
    n: '2',
    title: 'We build your storefront',
    body: 'A fast, mobile-first, SEO-ready website tailored to your brand — content, catalog and checkout-ready pages.',
  },
  {
    n: '3',
    title: 'Thridify brings it to life',
    body: 'Every product goes live in 3D and AR — customers spin it, configure it, and place it in their space, right in the browser.',
  },
];

export default function GetAWebsitePage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Get a website', item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">Get a website</li>
        </ol>
      </nav>

      {/* HERO */}
      <section className="container-x section pt-12">
        <p className="eyebrow">New to Thridify?</p>
        <h1 className="tt-1 max-w-4xl">No website yet? Get one with Thridify built in.</h1>
        <p className="mt-6 max-w-[65ch] text-foreground/80 leading-relaxed">
          Thridify makes your products come alive in 3D and AR — but it needs a storefront to live on. If you
          don&rsquo;t have a website yet, our platform partner <strong>Tyashin</strong> builds you a fast,
          SEO-ready store with Thridify&rsquo;s 3D &amp; AR experiences integrated from day one.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={TYASHIN_CONTACT} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Get your Thridify-powered website
          </a>
          <a href={DEMO_STORE} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            See a live example <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
          </a>
        </div>
        <p className="mt-4 text-sm text-foreground/60">
          Already have a website? <Link href="/integrations" className="text-primary hover:underline">Add Thridify to it instead →</Link>
        </p>
      </section>

      {/* WHY */}
      <section className="container-x section pt-0">
        <h2 className="tt-2">Why start with a Thridify-native store</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-2xl overflow-hidden">
          {WHY.map((c) => (
            <div key={c.title} className="bg-background p-6">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-foreground/80 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-x section pt-0">
        <p className="eyebrow">How it works</p>
        <h2 className="tt-2">From no website to a live 3D storefront</h2>
        <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl border border-foreground/10 bg-background p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-foreground/80 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA BAND */}
      <section className="container-x section pt-0">
        <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8 md:p-12 text-center">
          <h2 className="tt-2">Let&rsquo;s build your Thridify storefront</h2>
          <p className="mx-auto mt-3 max-w-[55ch] text-foreground/70">
            Tell Tyashin about your products and get a website with best-in-class 3D, AR and 360° experiences
            built in — no code, no re-platforming.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={TYASHIN_CONTACT} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Talk to Tyashin
            </a>
            <a href={DEMO_STORE} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Explore the demo store
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
