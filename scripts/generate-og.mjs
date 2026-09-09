/**
 * generate-og.mjs — Open Graph images (1200×630) in the luxury design
 * language: ink ground, layered teal + one-pink light fields, hairline
 * rules, Space Grotesk medium display type with the eyebrow dash, mono
 * kicker, and — where a REAL render exists — the page's own seamless demo
 * poster (public/models/*-poster.webp) art-directed on a plinth glow.
 *
 * No-Faking: the only imagery composited is the poster of the model the
 * page itself shows (CC0 stand-ins tracked in docs/ASSET-DEBT.md #19). Pages
 * without a real render get the abstract brand artwork only.
 *
 * Rendering: satori (HTML/CSS → SVG) + resvg (SVG → PNG), fonts fetched
 * from Google Fonts on first run and cached in node_modules/.cache/og-fonts.
 * Output is palette-quantised PNG (~60–120 KB each).
 *
 * Run:  node scripts/generate-og.mjs [filter]   (writes public/og/*.png, commit)
 *   e.g. node scripts/generate-og.mjs industry-   → only the industry set
 *
 * NOTE: /og/* is served immutable (public/_headers) — a changed design at
 * an unchanged filename is NOT picked up by returning clients' caches, but
 * OG consumers (social scrapers) fetch fresh, which is what matters here.
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';

const OUT = new URL('../public/og/', import.meta.url).pathname;
const MODELS = new URL('../public/models/', import.meta.url).pathname;
const FONT_CACHE = new URL('../node_modules/.cache/og-fonts/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });
mkdirSync(FONT_CACHE, { recursive: true });

// ── Canonical palette (DESIGN-SPEC §1) ──────────────────────────────────
const INK = '#021F17';
const TEAL = '#007050';
const TEAL_DEEP = '#004D37';
const TEAL_SOFT = '#6FCFAB';
const PINK = '#FEBFCC';
const PAPER = '#FFFFFF';
const MUTED = '#A3BFB5';

// ── Fonts (Google Fonts → WOFF, cached) ─────────────────────────────────
async function font(family, weight) {
  const key = `${family.replaceAll(' ', '-')}-${weight}.woff`;
  const path = `${FONT_CACHE}${key}`;
  if (existsSync(path)) return readFileSync(path);
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
    // An older UA makes the API serve plain WOFF (satori reads TTF/OTF/WOFF).
    { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:20.0) Gecko/20100101 Firefox/20.0' } }
  ).then((r) => r.text());
  const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`No font URL for ${family} ${weight}`);
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  writeFileSync(path, buf);
  return buf;
}

const FONTS = [
  { name: 'Space Grotesk', data: await font('Space Grotesk', 500), weight: 500, style: 'normal' },
  { name: 'Inter', data: await font('Inter', 400), weight: 400, style: 'normal' },
  { name: 'IBM Plex Mono', data: await font('IBM Plex Mono', 500), weight: 500, style: 'normal' },
];

// ── Pages ───────────────────────────────────────────────────────────────
// `poster` = a REAL render that exists in public/models (the page's own
// demo poster). Kept in sync with src/lib/industries.ts demoPoster.
const PAGES = [
  { file: 'default.png', kicker: '3D & AR commerce', title: 'Reimagine how the world experiences your products.', poster: 'sheen-chair' },
  { file: 'home.png', kicker: '3D & AR commerce', title: 'Reimagine how the world experiences your products.', poster: 'sheen-chair' },
  { file: 'platform.png', kicker: 'The platform', title: 'Five pillars. One immersive commerce stack.', poster: 'sheen-chair' },
  { file: 'features.png', kicker: 'Capability reference', title: 'Everything Thridify does for your product pages.' },
  { file: 'what-is-thridify.png', kicker: 'Fact sheet', title: 'What is Thridify?', sub: 'No-code 3D & AR commerce for configurable products.' },
  { file: 'about.png', kicker: 'About Thridify', title: 'Founded in Delhi. Scaling from Toronto.' },
  { file: 'contact.png', kicker: 'Talk to Thridify', title: 'Three regions. One conversation away.' },
  { file: 'services-3d-modelling.png', kicker: '3D modelling service', title: 'Photoreal 3D product models, built for you.', poster: 'sheen-chair' },
  { file: 'industries.png', kicker: 'Industries', title: 'Built for products that vary by size, finish and material.' },
  { file: 'integrations.png', kicker: 'Integrations', title: '3D & AR for every store. One-click or embed anywhere.' },
  // Per-industry (DESIGN-SPEC §8) — real per-industry demo renders where
  // they exist (ASSET-DEBT #19; prefab has none → artwork only).
  { file: 'industry-furniture.png', kicker: 'Furniture & home decor', title: '3D furniture configurator & AR viewer.', poster: 'furniture-vase' },
  { file: 'industry-modular-kitchens.png', kicker: 'Modular kitchens', title: 'Modular kitchen 3D design tool.', poster: 'kitchen-teacup' },
  { file: 'industry-doors-and-windows.png', kicker: 'Doors & windows', title: 'Door & window configurator in 3D.', poster: 'doors-lantern' },
  { file: 'industry-prefab-structures.png', kicker: 'Prefab & modular', title: 'Prefab 3D configurator & building visualizer.' },
  { file: 'industry-industrial-machinery.png', kicker: 'Industrial machinery', title: '3D product viewer for machinery.', poster: 'machinery-camera' },
  { file: 'industry-laminates-surfaces.png', kicker: 'Laminates & surfaces', title: 'Laminate visualizer & surface configurator.', poster: 'surfaces-material' },
  // Per-integration — typographic (no third-party logos are embedded).
  ...[
    ['shopify', 'Shopify', 'Native app'],
    ['woocommerce', 'WooCommerce', 'Native plugin'],
    ['wordpress', 'WordPress', 'Native plugin'],
    ['wix', 'Wix', 'Embed'],
    ['bigcommerce', 'BigCommerce', 'Embed'],
    ['magento', 'Adobe Commerce (Magento)', 'Embed'],
    ['commercetools', 'commercetools', 'Embed'],
    ['canva', 'Canva', 'Embed'],
    ['drupal', 'Drupal', 'Embed'],
    ['squarespace', 'Squarespace', 'Embed'],
    ['prestashop', 'PrestaShop', 'Embed'],
    ['custom-integration', 'any custom storefront', 'SDK & API'],
  ].map(([slug, name, mode]) => ({
    file: `integration-${slug}.png`,
    kicker: `Integration · ${mode}`,
    title: `3D, AR & configuration for ${name}.`,
  })),
];

// ── Assets ──────────────────────────────────────────────────────────────
const posterCache = new Map();
async function posterDataUri(name) {
  if (posterCache.has(name)) return posterCache.get(name);
  const png = await sharp(`${MODELS}${name}-poster.webp`).resize({ height: 520, fit: 'inside' }).png().toBuffer();
  const uri = `data:image/png;base64,${png.toString('base64')}`;
  posterCache.set(name, uri);
  return uri;
}

// Brand mark — pink back layer -8°, teal front +4° (knowledge-bank spec).
const mark = (size = 44) => ({
  type: 'div',
  props: {
    style: { display: 'flex', position: 'relative', width: size * 1.35, height: size * 1.2 },
    children: [
      {
        type: 'div',
        props: {
          style: { position: 'absolute', left: 0, top: size * 0.16, width: size, height: size, borderRadius: size * 0.24, background: PINK, transform: 'rotate(-8deg)', opacity: 0.92 },
        },
      },
      {
        type: 'div',
        props: {
          style: { position: 'absolute', left: size * 0.22, top: 0, width: size, height: size, borderRadius: size * 0.24, background: TEAL, transform: 'rotate(4deg)' },
        },
      },
    ],
  },
});

// ── Layout ──────────────────────────────────────────────────────────────
function layout({ kicker, title, sub, poster }, posterUri) {
  const hasPoster = Boolean(posterUri);
  const titleSize = title.length > 44 ? 58 : title.length > 30 ? 66 : 80;
  return {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        position: 'relative',
        background: INK,
        fontFamily: 'Inter',
        color: PAPER,
        overflow: 'hidden',
      },
      children: [
        // Light fields — teal from the upper right, one pink from the lower
        // right, deep teal pooling at the lower left.
        field('62%', '-18%', 720, `${TEAL}55`),
        field('72%', '48%', 560, `${PINK}33`),
        field('-16%', '58%', 640, `${TEAL_DEEP}99`),
        // Fine dot grid, masked to the right half (behind the object).
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 640,
              top: 60,
              width: 500,
              height: 510,
              backgroundImage: `radial-gradient(circle, ${PAPER}26 1.2px, transparent 1.6px)`,
              backgroundSize: '22px 22px',
              opacity: hasPoster ? 0.7 : 0.35,
            },
          },
        },
        // Hairline orbit set.
        orbit(hasPoster ? 890 : 980, 330, 430, 190, 0.28),
        orbit(hasPoster ? 890 : 980, 330, 520, 232, 0.16),
        orbit(hasPoster ? 890 : 980, 330, 330, 146, 0.22),
        // The object — a REAL render on a plinth glow.
        hasPoster && {
          type: 'div',
          props: {
            style: { position: 'absolute', left: 700, top: 70, width: 400, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' },
            children: [
              { type: 'div', props: { style: { position: 'absolute', left: 60, bottom: 30, width: 280, height: 70, borderRadius: 200, background: `${INK}`, opacity: 0.55, filter: 'blur(18px)' } } },
              { type: 'img', props: { src: posterUri, style: { height: 460, objectFit: 'contain' } } },
            ],
          },
        },
        // Top hairline + mark + wordmark.
        {
          type: 'div',
          props: {
            style: { position: 'absolute', left: 72, top: 64, display: 'flex', alignItems: 'center', gap: 20 },
            children: [
              mark(40),
              { type: 'div', props: { style: { fontFamily: 'Space Grotesk', fontSize: 34, fontWeight: 500, letterSpacing: -1, color: PAPER }, children: 'Thridify' } },
            ],
          },
        },
        // Copy block.
        {
          type: 'div',
          props: {
            style: { position: 'absolute', left: 72, top: 214, width: hasPoster ? 600 : 860, display: 'flex', flexDirection: 'column' },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'Space Grotesk', fontSize: 20, fontWeight: 500, letterSpacing: 5, textTransform: 'uppercase', color: TEAL_SOFT },
                  children: [
                    { type: 'div', props: { style: { width: 34, height: 1, background: TEAL_SOFT, opacity: 0.8 } } },
                    kicker,
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { marginTop: 26, fontFamily: 'Space Grotesk', fontSize: titleSize, fontWeight: 500, lineHeight: 1.06, letterSpacing: -2.2, color: PAPER },
                  children: title,
                },
              },
              sub && {
                type: 'div',
                props: { style: { marginTop: 22, fontSize: 26, lineHeight: 1.4, color: MUTED }, children: sub },
              },
            ].filter(Boolean),
          },
        },
        // Bottom rule + tagline.
        {
          type: 'div',
          props: {
            style: { position: 'absolute', left: 72, right: 72, bottom: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${PAPER}22`, paddingTop: 22 },
            children: [
              { type: 'div', props: { style: { fontFamily: 'IBM Plex Mono', fontSize: 19, letterSpacing: 1, color: MUTED }, children: 'No code · No app · No friction' } },
              { type: 'div', props: { style: { fontFamily: 'IBM Plex Mono', fontSize: 19, letterSpacing: 1, color: MUTED }, children: 'thridify.com' } },
            ],
          },
        },
      ].filter(Boolean),
    },
  };
}

function field(left, top, size, color) {
  return {
    type: 'div',
    props: {
      style: { position: 'absolute', left, top, width: size, height: size, borderRadius: size, background: `radial-gradient(circle, ${color} 0%, ${INK}00 68%)` },
    },
  };
}
function orbit(cx, cy, rx, ry, opacity) {
  return {
    type: 'div',
    props: {
      style: { position: 'absolute', left: cx - rx, top: cy - ry, width: rx * 2, height: ry * 2, borderRadius: '50%', border: `1px solid ${TEAL_SOFT}`, opacity },
    },
  };
}

// ── Render ──────────────────────────────────────────────────────────────
const filter = process.argv[2] ?? '';
for (const page of PAGES.filter((p) => p.file.includes(filter))) {
  const posterUri = page.poster ? await posterDataUri(page.poster) : null;
  const svg = await satori(layout(page, posterUri), { width: 1200, height: 630, fonts: FONTS });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  const out = await sharp(png).png({ palette: true, quality: 90, compressionLevel: 9 }).toBuffer();
  writeFileSync(`${OUT}${page.file}`, out);
  console.log('wrote', page.file, `${Math.round(out.length / 1024)} KB`);
}
