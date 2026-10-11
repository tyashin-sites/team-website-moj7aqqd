import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { RoomCapture } from '@/components/RoomCapture';

/**
 * /shop-the-look — the brand-facing explanation of the hosted shopper page.
 *
 * `/room-visualizer` sells the capability (what the shopper can do). This
 * page sells the merchandising loop: the brand's team publishes curated looks
 * from the admin Room Visualizer; shoppers open them on the brand-themed
 * hosted page and make them their own. Term: "shop the look page",
 * "shoppable room".
 *
 * Content rules as /room-visualizer: shipped only (no save-and-share, no
 * embed, no BOQ — those are roadmap and are named as such in the FAQ),
 * no pricing, trial + demo are the only free offers, real captures only.
 */

const PATH = '/shop-the-look';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';
const UPDATED = '2026-10-11';

const LOOP = [
  {
    t: 'Style a room in the admin',
    b: 'Your merchandiser opens the Room Visualizer, picks a room style, places products from the published catalogue in the configurations you want to sell, dresses the floor and walls, hangs the art, places the lights.',
  },
  {
    t: 'Save it, name it, publish it',
    b: 'A saved room is private until the Published switch is on. Published rooms appear on your Shop the Look page as curated looks. Unpublish any time.',
  },
  {
    t: 'Shoppers open it as their own draft',
    b: 'Every product in the look is still live: swap the fabric, remove the chair, add a second one, change the rug, change the room style. Your look is the starting point.',
  },
  {
    t: 'They view the room in AR',
    b: 'The composed room opens in the phone’s native AR viewer. On desktop, a QR hands it to the phone. Products by default; room elements optional.',
  },
];

const WHERE = [
  {
    t: 'Homepage banner',
    b: 'Replace “shop the look” on the lifestyle photo with a link to the room the photo was styled from.',
  },
  {
    t: 'Showroom QR',
    b: 'A QR on the showroom wall opens the look on the visitor’s phone; they take the room home.',
  },
  {
    t: 'Exhibition tablet',
    b: 'Build the visitor’s room on the stand, swap the fabric to the one they liked, hand it to their phone through the AR QR before they leave.',
  },
  {
    t: 'Order confirmation',
    b: 'The customer who just bought the sofa gets the look it belongs in, with the rug and the lamp still in it.',
  },
];

const STYLING = [
  {
    t: 'Three to seven products',
    b: 'Enough to make a room, few enough that each is a decision the shopper can take or leave.',
  },
  {
    t: 'In the configuration you want to sell',
    b: 'The configuration is stored on every placed item. If the terracotta colourway has the margin, style the look in terracotta.',
  },
  {
    t: 'One rug, one light, one piece of art',
    b: 'The items shoppers forget to buy, and the ones with the highest attach rate when they are already in the room.',
  },
  {
    t: 'Rooms your customers actually have',
    b: 'Room dimensions are editable. Style for the median flat, not the twelve-seat dining hall.',
  },
  {
    t: 'A saved viewpoint',
    b: 'The camera position you save is the first thing the shopper sees. Set it like a hero shot.',
  },
  {
    t: 'At least two looks before you share the link',
    b: 'An empty studio with a catalogue beside it is a tool. Two styled rooms is a store.',
  },
];

const FAQS = [
  {
    q: 'What is a Shop the Look page?',
    a: 'A Shop the Look page is a brand-hosted 3D room page where shoppers open rooms the brand styled, change the products in them, and buy the pieces they keep. On Thridify it is populated from the brand’s published catalogue, themed from its Brand Settings, and switched on per account.',
  },
  {
    q: 'Who builds the looks?',
    a: 'Your merchandising team, in the admin Room Visualizer, in a browser. No 3D team and no engineering: the products are the ones already published on the account, and styling a look is placing them, dressing the room and saving.',
  },
  {
    q: 'Can shoppers change a curated look?',
    a: 'Yes. A curated look opens as the shopper’s own draft. Every product stays live and configurable, products can be removed or added, and the room style, floor, walls and rug can be changed.',
  },
  {
    q: 'Does the page carry my branding?',
    a: 'Yes. Logo, accent colour, currency and whether prices show are read from the account’s Brand Settings, so the page matches your product experiences without separate configuration.',
  },
  {
    q: 'Can a shopper save or share their version?',
    a: 'Not from the hosted page today. Shopper save-and-share, a bill of materials for the placed products, and an embeddable version of the page for product pages are on the roadmap.',
  },
  {
    q: 'Can I embed it on my product page?',
    a: 'Shop the Look is a hosted page on your account today, reached from a link. An embeddable web component is on the roadmap. The single-product 3D viewer, configurator and AR already embed on your product pages.',
  },
  {
    q: 'What does Thridify offer free?',
    a: 'Two things: a 15-day free trial of the platform, and a 30-minute demo call tailored to your industry, run on Thridify’s existing live looks.',
  },
];

export const metadata = pageMetadata({
  title: 'Shop the Look Pages — Shoppable 3D Rooms for Your Brand',
  description:
    'Publish rooms your team styled as curated looks on a brand-hosted 3D page. Shoppers open them, swap the fabric, add the rug, and view the whole room in AR. No app, no code, switched on per account.',
  keywords: [
    'shop the look page',
    'shoppable room',
    'shop the look ecommerce',
    'curated looks furniture',
    'shop the room 3D',
    'shoppable lifestyle image',
    'room visualizer',
  ],
  path: PATH,
  image: '/og/shop-the-look.png',
});

export default function ShopTheLookPage() {
  const faqLd: LdNode = {
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const serviceLd: LdNode = {
    '@type': 'Service',
    '@id': `${siteUrl(PATH)}#service`,
    name: 'Shop the Look',
    serviceType: 'Shoppable 3D room page',
    description: metadata.description as string,
    provider: { '@type': 'Organization', name: 'Thridify', url: siteUrl('/') },
    areaServed: ['IN', 'CA', 'US', 'GB', 'AE', 'AU'],
    url: siteUrl(PATH),
  };

  return (
    <>
      <JsonLd
        nodes={[
          webPageLd({
            path: PATH,
            name: 'Shop the Look',
            description: metadata.description as string,
          }),
          serviceLd,
          faqLd,
          breadcrumbLd(PATH, [
            { name: 'Home', path: '/' },
            { name: '3D room visualizer', path: '/room-visualizer' },
            { name: 'Shop the Look', path: PATH },
          ]),
        ]}
      />

      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/room-visualizer" className="hover:text-primary">
              3D room visualizer
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">
            Shop the Look
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Shop the Look</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="tt-display mt-5">
                Your lifestyle photo is a room nobody can buy from. This one, they can.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 lead">
                Publish rooms your team styled as curated looks on a brand-hosted 3D page.
                Shoppers open them, swap the fabric, add the rug, and view the whole room in AR.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Book a 30-minute demo
                </a>
                <Link href="/room-visualizer" className="btn-ghost">
                  What shoppers can do
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <RoomCapture
                src="/room-visualizer/rooms.webp"
                alt="The Rooms tab of a Thridify Shop the Look page: a curated look published by the brand at the top, then the six room styles a shopper can switch between."
                caption="The Rooms tab on a live account: the brand’s curated look first, then the room styles."
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">The loop</p>
            <h2 className="tt-2">Curated by your team. Finished by the shopper.</h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {LOOP.map((d, i) => (
              <li key={d.t} className="card p-6 relative">
                <span className="absolute top-5 right-6 tt-mono text-foreground/30 text-sm">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-lg font-semibold tracking-tight pr-10">{d.t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{d.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <RoomCapture
              src="/room-visualizer/luxe.webp"
              alt="The shopper’s placed products shown in the Luxe Boutique room style: dark floor, warm spot lighting, the same five products."
              caption="Luxe Boutique: the shopper switched the room style and every placed product stayed where it was."
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow">What makes it shoppable</p>
            <h2 className="tt-2">The look is a starting point, not a locked image.</h2>
            <div className="mt-6 space-y-4 text-foreground/75 leading-relaxed">
              <p>
                Every product in a curated look is the real, published product in the configuration
                your team chose. The shopper can open it in the configurator, change the fabric,
                and the room updates. They can take the sofa out and keep the rug.
              </p>
              <p>
                The room around the products is theirs to change too: six room styles, real floor
                and wall finishes, a rug library, lights that light. Switching the style keeps the
                products in place, so a look styled in a bright showroom can be checked in a cosy
                bedroom in one click.
              </p>
              <p>
                Then the whole room goes to AR, on the phone, with no app. That is the part the
                lifestyle photograph could never do.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">Styling for 3D</p>
            <h2 className="tt-2">Six rules for a look that sells.</h2>
            <p className="mt-4 text-foreground/70">
              Styling for a camera the shopper controls is slightly different from styling for a
              photograph. These are the rules that hold up.
            </p>
          </div>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STYLING.map((d) => (
              <li key={d.t} className="card p-6">
                <h3 className="font-heading text-lg font-semibold tracking-tight">{d.t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{d.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Where the link goes</p>
            <h2 className="tt-2">A hosted page, reached from wherever your customers already are.</h2>
            <p className="mt-4 text-sm text-foreground/60">
              Shop the Look lives on your account, themed to your brand, and is switched on per
              account. It is one link.
            </p>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {WHERE.map((d) => (
              <div key={d.t} className="card p-6">
                <h3 className="font-heading text-lg font-semibold tracking-tight">{d.t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{d.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">Shop the Look, answered.</h2>
            <p className="mt-4 text-sm text-foreground/60">Last reviewed {UPDATED}.</p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-heading text-lg font-semibold tracking-tight">
                  {f.q}
                  <ArrowRight
                    className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-90"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-foreground/70 leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <p className="eyebrow">Keep reading</p>
          <h2 className="tt-2 mb-8">Related</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { href: '/room-visualizer', t: '3D room visualizer', b: 'Everything the shopper can do in the room.' },
              { href: '/blog/shop-the-look-pages-how-to-make-a-styled-room-shoppable', t: 'How to make a styled room shoppable', b: 'The merchandising guide.' },
              { href: '/industries/furniture', t: 'Furniture & home décor', b: 'The category the room was built for.' },
              { href: '/3d-product-configurator', t: '3D product configurator', b: 'The configurator that runs inside every look.' },
            ].map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="card p-6 block h-full hover:border-primary/40 transition-colors"
                >
                  <h3 className="font-heading text-base font-semibold tracking-tight">{r.t}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{r.b}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
        <div className="container-x section relative text-center">
          <p className="eyebrow eyebrow-center">See a curated look on your category</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto">
            Thirty minutes, on Thridify’s live looks. Then fifteen days on your own catalogue.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Demo
            </a>
            <Link href="/room-visualizer" className="btn-ghost">
              See the room visualizer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
