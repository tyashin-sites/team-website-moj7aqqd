import { SITE_URL } from '@/lib/schema';
import { CapabilityDemo } from '@/components/signature/CapabilityDemo';
import { EXP } from '@/lib/thridify';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

// Device-compatibility reference — the public answer to "will this work on my
// shoppers' devices?". Tiers and requirements mirror the platform's actual
// behaviour (viewer WebGL2 floor, Quick Look / Scene Viewer AR paths, automatic
// Lite mode) — keep in sync with thridify-fe when device handling changes.
// Linked from the footer Platform column and listed in site-routes.ts.

const CANONICAL = '/device-compatibility';

export const metadata = pageMetadata({
  title: 'Device Compatibility — 3D & AR on every shopper device',
  description:
    'Which phones, tablets and computers run Thridify 3D and AR experiences: iPhone and iPad tiers, Android ARCore support, desktop behaviour, connection guidance and troubleshooting.',
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'Thridify Device Compatibility',
  ogDescription:
    'Full 3D everywhere, instant AR on LiDAR devices, guided AR on the rest — and an automatic Lite mode for older hardware. The complete device matrix.',
});

const ARCORE_LIST = 'https://developers.google.com/ar/devices';
const PLAY_AR = 'https://play.google.com/store/apps/details?id=com.google.ar.core';

const TIERS = [
  {
    badge: 'Full',
    title: 'Full 3D + instant AR',
    body: 'Complete 3D viewer with the customizer, full-resolution textures, and AR that places the product almost instantly using the device’s LiDAR scanner.',
  },
  {
    badge: 'Guided AR',
    title: 'Full 3D + guided AR',
    body: 'The same full 3D experience. AR placement takes a guided moment: the camera needs a little movement and good light to find the floor — that’s how camera-only AR works on every platform.',
  },
  {
    badge: 'Lite',
    title: 'Lite 3D',
    body: 'On devices with limited graphics memory, Thridify serves reduced-resolution textures and trims extras so the experience stays smooth instead of straining the device.',
  },
  {
    badge: '3D only',
    title: '3D viewer, AR by phone',
    body: 'Desktops and laptops get the full 3D viewer and customizer. Choosing “View in your space” shows a QR code that hands the AR session to the shopper’s phone.',
  },
];

const IOS_ROWS = [
  {
    device: 'iPhone 12 Pro & later Pro models',
    note: 'iPhone 12 Pro through 16 Pro and Pro Max — all carry LiDAR',
    viewer: 'Full quality',
    ar: 'Instant placement (LiDAR)',
    tier: 'Full',
  },
  {
    device: 'iPad Pro (2020) & later',
    note: 'All iPad Pro models with LiDAR',
    viewer: 'Full quality',
    ar: 'Instant placement (LiDAR)',
    tier: 'Full',
  },
  {
    device: 'iPhone 13 & later (non‑Pro)',
    note: 'iPhone 13/14/15/16 and SE (2022), plus iPad (2022+), iPad Air (2022+) and iPad mini (2021+) — the recommended floor for full-quality scenes',
    viewer: 'Full quality',
    ar: 'Guided placement',
    tier: 'Guided AR',
  },
  {
    device: 'iPhone 11 / 12 / SE (2020) & 2019–2021 iPads',
    note: 'Fully supported; the heaviest scenes may automatically step down to Lite quality',
    viewer: 'Full quality, auto-Lite on heavy scenes',
    ar: 'Guided placement',
    tier: 'Guided AR',
  },
  {
    device: 'Older iPads & iPhones',
    note: 'Devices with 2 GB memory or less — e.g. iPad Air 2, iPad 5th/6th gen, iPad mini 4, iPhone 7/8/X',
    viewer: 'Lite mode — lighter textures, smooth browsing',
    ar: 'Guided placement; larger scenes may fall back to 3D',
    tier: 'Lite',
  },
];

const PERF_ITEMS = [
  ['GPU-compressed textures', 'Materials and finishes are delivered in a GPU-native compressed format on supported devices, using a fraction of the graphics memory of standard images, with automatic fallback everywhere else.'],
  ['Progressive loading', 'A preview image appears first, then the interactive 3D scene; finishes apply at low resolution instantly and sharpen in place.'],
  ['Lite mode', 'Devices under memory pressure automatically get reduced-resolution textures and skip non-essential extras.'],
  ['Memory hygiene', 'Switching between finishes or scenes releases what’s no longer on screen, so long browsing sessions stay stable.'],
  ['AR-ready exports', 'AR models are prepared with capped texture sizes so the jump into AR starts in seconds, not minutes.'],
];

const TROUBLESHOOTING = [
  {
    q: 'The 3D view doesn’t appear at all',
    a: 'Check that the browser is up to date — the viewer needs a browser from roughly the last four years (Safari 15+, or current Chrome, Edge, or Firefox). Private-browsing content blockers and some corporate networks can also block the 3D assets; try a normal window or another network.',
  },
  {
    q: 'The AR button doesn’t show on my Android phone',
    a: 'Install or update Google Play Services for AR from the Play Store. If the Play Store says the app isn’t available for your device, the phone isn’t on Google’s ARCore-supported list — the 3D viewer still works fully.',
  },
  {
    q: 'AR takes a while to find the floor',
    a: 'On devices without LiDAR this is normal. Move the phone slowly in a small sweep, aim at a floor area with some visible texture (rugs, wood grain, tiles), and add light if the room is dim. Plain, glossy, or dark floors take the longest.',
  },
  {
    q: 'The page reloaded while browsing finishes on an older iPad',
    a: 'Older devices have limited graphics memory, and the operating system can interrupt heavy 3D pages. Thridify detects this and reopens the experience in Lite mode automatically — a tap on the preview resumes where you left off. Fewer open browser tabs also helps.',
  },
  {
    q: 'The screen looked blank after coming back from AR',
    a: 'Thridify detects this and restores the 3D view automatically within a moment. If it ever persists, pull down to refresh the page — the scene reloads from cache.',
  },
];

const INTEGRATOR_ROWS = [
  ['3D viewer', 'WebGL 2 — Safari 15+, Chrome 79+, Edge 79+, Firefox 90+ (in practice: any evergreen browser)'],
  ['AR on iOS', 'AR Quick Look (USDZ), iOS/iPadOS 15+ — LiDAR devices place instantly, others use guided plane detection'],
  ['AR on Android', 'Scene Viewer (glTF) via ARCore — Android 8+, ARCore-supported device, Google Play Services for AR'],
  ['Textures', 'KTX2/Basis GPU compression with automatic JPEG/PNG fallback; per-device texture caps in Lite mode'],
  ['Loading', 'Poster-first render, staged asset loading, optional preload mount strategy to warm assets before the shopper clicks'],
];

function TierPill({ tier }: { tier: string }) {
  const styles: Record<string, string> = {
    Full: 'bg-primary/10 text-primary',
    'Guided AR': 'bg-accent/40 text-foreground/80',
    Lite: 'bg-amber-100 text-amber-800',
    '3D only': 'bg-surface text-foreground/70',
  };
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${styles[tier] ?? styles['3D only']}`}>
      {tier}
    </span>
  );
}

function Matrix({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: { device: string; note?: string; viewer: string; ar: React.ReactNode; tier: string }[];
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-foreground/10">
      <table className="w-full border-collapse text-left min-w-[680px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-surface">
            {head.map((h) => (
              <th key={h} className="p-4 font-heading text-sm font-semibold tracking-tight">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.device} className="border-t border-foreground/10 align-top">
              <th scope="row" className="p-4 text-sm font-medium text-foreground">
                {row.device}
                {row.note && <span className="mt-1 block max-w-md text-xs font-normal text-foreground/60">{row.note}</span>}
              </th>
              <td className="p-4 text-sm text-foreground/80">{row.viewer}</td>
              <td className="p-4 text-sm text-foreground/80">{row.ar}</td>
              <td className="p-4"><TierPill tier={row.tier} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DeviceCompatibilityPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Device Compatibility', item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-70" aria-hidden />
        <div className="container-x relative section">
          <div className="max-w-4xl">
            <p className="eyebrow">Support</p>
            <h1 className="tt-display text-foreground">Device compatibility for 3D &amp; AR</h1>
            <p className="lead max-w-2xl">
              Thridify experiences run in the browser — no app to install. What each shopper gets
              depends on their device, and Thridify adapts automatically: full quality where the
              hardware allows it, a lighter mode where it doesn&rsquo;t, and augmented reality
              wherever the operating system supports it.
            </p>
          </div>
        </div>
      </section>

      {/* LIVE AR DEMO — show, don't just tell (this page explains AR; here it IS AR) */}
      <section className="container-x section pt-0">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-center">
            <p className="eyebrow">Try it now</p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">See AR on this very page</h2>
            <p className="mt-2 text-foreground/70">
              On a phone, tap &ldquo;View in your space.&rdquo; On desktop, scan the code. This is a
              real, live Thridify experience &mdash; the same engine described below.
            </p>
          </div>
          <CapabilityDemo mode="ar" aspect="aspect-[16/10]" experiencePreviewId={EXP.modernSofa} />
        </div>
      </section>

      {/* TIERS */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">The four experience tiers</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">
          Every device lands in exactly one of these. Selection is automatic — shoppers never
          configure anything.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t) => (
            <div key={t.title} className="card p-6">
              <TierPill tier={t.badge} />
              <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{t.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IOS */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">iPhone &amp; iPad</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">
          Requires iOS/iPadOS&nbsp;15 or later with Safari (or any iOS browser — they all use
          Safari&rsquo;s engine). AR uses Apple&rsquo;s built-in AR&nbsp;Quick&nbsp;Look; nothing to
          install.
        </p>
        <Matrix caption="iPhone and iPad compatibility" head={['Device', '3D viewer', 'Augmented reality', 'Tier']} rows={IOS_ROWS} />
      </section>

      {/* ANDROID */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Android</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">
          Requires Android&nbsp;8 or later with Chrome (or another modern browser) and{' '}
          <a href={PLAY_AR} rel="noopener" className="text-primary underline underline-offset-4">
            Google&nbsp;Play&nbsp;Services&nbsp;for&nbsp;AR
          </a>
          , preinstalled on most phones from the last five years. Google maintains the authoritative{' '}
          <a href={ARCORE_LIST} rel="noopener" className="text-primary underline underline-offset-4">
            list of ARCore-supported devices
          </a>
          .
        </p>
        <Matrix
          caption="Android compatibility"
          head={['Device', '3D viewer', 'Augmented reality', 'Tier']}
          rows={[
            {
              device: 'Recent Android phones & tablets',
              note: 'Roughly 2019 and later, ARCore-certified — Samsung Galaxy S/A series, Pixel, OnePlus, Xiaomi and most other majors',
              viewer: 'Full quality',
              ar: 'Guided placement via Google Scene Viewer',
              tier: 'Guided AR',
            },
            {
              device: 'Budget or older Android devices',
              note: 'Not on the certified list, or 2 GB memory or less',
              viewer: 'Full or Lite depending on memory',
              ar: 'Not available — 3D viewer works normally',
              tier: 'Lite',
            },
          ]}
        />
      </section>

      {/* DESKTOP */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Desktop &amp; laptop</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">
          Any modern browser from the last few years: Chrome, Edge, Safari&nbsp;15+, or Firefox. The
          full 3D viewer and customizer run everywhere; &ldquo;View in your space&rdquo; shows a QR
          code that opens the AR session on the shopper&rsquo;s phone.
        </p>
      </section>

      {/* INSTANT VS GUIDED */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          What makes AR &ldquo;instant&rdquo; vs. &ldquo;guided&rdquo;?
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">Instant — LiDAR devices</h3>
            <p className="mt-2 text-sm text-foreground/70">
              iPhone Pro models and recent iPad Pros carry a LiDAR scanner that measures the room
              directly. The product appears on the floor almost the moment the camera opens.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground">Guided — everything else</h3>
            <p className="mt-2 text-sm text-foreground/70">
              Without LiDAR, the device finds the floor by watching how the image shifts as the
              camera moves. This is a property of camera-based AR on every platform — not something
              any vendor can engineer away. Thridify keeps the wait short with lightweight AR models
              and in-experience coaching.
            </p>
          </div>
        </div>
        <div className="card mt-5 p-6">
          <h3 className="font-heading text-lg font-semibold text-foreground">What to expect on non-Pro iPhones and iPads</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-foreground/70">
            <li>
              <strong className="text-foreground">A short &ldquo;preparing&rdquo; moment</strong> — a few seconds while the device
              converts the scene into Apple&rsquo;s AR format before the camera opens. Larger scenes
              take a little longer.
            </li>
            <li>
              <strong className="text-foreground">On-screen coaching</strong> — the system asks you to point at the floor and move
              the device slowly in a small sweep. This is normal, not an error.
            </li>
            <li>
              <strong className="text-foreground">5–15 seconds of scanning</strong> in typical conditions before the product
              appears. Dim rooms, plain or glossy floors, and standing still all stretch this; good
              light and a floor with visible texture shorten it.
            </li>
            <li>
              <strong className="text-foreground">Placement then behaves identically</strong> to LiDAR devices — walk around the
              product, scale it, and see it anchored in place.
            </li>
          </ol>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Performance, handled automatically</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">Thridify tunes what it delivers to each device, so integrators don&rsquo;t have to.</p>
        <ul className="mt-6 max-w-3xl space-y-3">
          {PERF_ITEMS.map(([title, body]) => (
            <li key={title} className="flex gap-3 text-sm text-foreground/70">
              <span aria-hidden className="mt-0.5 font-semibold text-primary">✓</span>
              <span>
                <strong className="text-foreground">{title}</strong> — {body}
              </span>
            </li>
          ))}
        </ul>
        <div className="card mt-8 max-w-3xl border-l-4 border-l-primary p-6">
          <p className="text-sm text-foreground/70">
            <strong className="text-foreground">Comfortable from 10–15&nbsp;Mbps.</strong> On a typical 15&nbsp;Mbps connection a
            preview appears in under a second and the scene becomes interactive within a few
            seconds. Slower connections still work — loading is staged, so shoppers always see
            progress rather than a blank screen. After the first visit, assets are cached and repeat
            views load much faster.
          </p>
        </div>
      </section>

      {/* TROUBLESHOOTING */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Troubleshooting</h2>
        <div className="mt-6 max-w-3xl space-y-3">
          {TROUBLESHOOTING.map((item) => (
            <details key={item.q} className="card group p-0">
              <summary className="cursor-pointer list-none p-5 font-heading text-sm font-semibold text-foreground marker:content-none">
                {item.q}
              </summary>
              <p className="px-5 pb-5 text-sm text-foreground/70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* INTEGRATORS */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">For integrators</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">The same story in technical terms.</p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="w-full border-collapse text-left min-w-[640px]">
            <thead>
              <tr className="bg-surface">
                <th className="p-4 font-heading text-sm font-semibold tracking-tight w-[26%]">Capability</th>
                <th className="p-4 font-heading text-sm font-semibold tracking-tight">Requirement</th>
              </tr>
            </thead>
            <tbody>
              {INTEGRATOR_ROWS.map(([cap, req]) => (
                <tr key={cap} className="border-t border-foreground/10 align-top">
                  <th scope="row" className="p-4 text-sm font-medium text-foreground">{cap}</th>
                  <td className="p-4 text-sm text-foreground/80">{req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-foreground/50">
          Android AR device coverage:{' '}
          <a href={ARCORE_LIST} rel="noopener" className="text-primary underline underline-offset-4">
            developers.google.com/ar/devices
          </a>
          . Coverage evolves with each release — this page reflects the current platform.
        </p>
      </section>
    </>
  );
}
