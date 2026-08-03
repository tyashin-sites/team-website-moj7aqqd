/**
 * generate-og.mjs — brand-colored static OG images (1200×630).
 *
 * Placeholder OGs per docs/ASSET-DEBT.md: real product-render OG images
 * replace these once real client 3D captures exist. Canonical palette only
 * (DESIGN-SPEC §1); the logo mark is drawn per the knowledge-bank spec
 * (two overlapping rounded squares: pink -8°, teal +4°) rather than
 * embedding the raster logo, so the output stays crisp at OG size.
 *
 * Run:  node scripts/generate-og.mjs   (writes public/og/*.png, commit them)
 */

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = new URL('../public/og/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const PAGES = [
  { file: 'default.png', kicker: '3D & AR COMMERCE', title: 'Reimagine how the world\nexperiences your products.' },
  { file: 'home.png', kicker: '3D & AR COMMERCE', title: 'Reimagine how the world\nexperiences your products.' },
  { file: 'platform.png', kicker: 'THE PLATFORM', title: 'Five modules. One\nimmersive commerce stack.' },
  { file: 'about.png', kicker: 'ABOUT THRIDIFY', title: 'Founded in Delhi.\nScaling from Toronto.' },
  { file: 'contact.png', kicker: 'TALK TO THRIDIFY', title: 'Three regions.\nOne conversation away.' },
  { file: 'services-3d-modelling.png', kicker: '3D MODELLING SERVICE', title: 'Photoreal 3D product\nmodels, built for you.' },
  // Per-industry OG (DESIGN-SPEC §8) — brand-colored placeholders; real
  // product-render OG images per industry are tracked in docs/ASSET-DEBT.md.
  { file: 'industry-furniture.png', kicker: 'FURNITURE & HOME DECOR', title: '3D furniture configurator\n& AR viewer.' },
  { file: 'industry-modular-kitchens.png', kicker: 'MODULAR KITCHENS', title: 'Modular kitchen 3D\ndesign tool.' },
  { file: 'industry-doors-and-windows.png', kicker: 'DOORS & WINDOWS', title: 'Door & window\nconfigurator in 3D.' },
  { file: 'industry-prefab-structures.png', kicker: 'PREFAB & MODULAR', title: 'Prefab 3D configurator\n& building visualizer.' },
  { file: 'industry-industrial-machinery.png', kicker: 'INDUSTRIAL MACHINERY', title: '3D product viewer\nfor machinery.' },
  { file: 'industry-laminates-surfaces.png', kicker: 'LAMINATES & SURFACES', title: 'Laminate visualizer &\nsurface configurator.' },
];

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');

function svgFor({ kicker, title }) {
  kicker = esc(kicker);
  const lines = title.split('\n');
  const titleSpans = lines
    .map(
      (l, i) =>
        `<tspan x="80" dy="${i === 0 ? 0 : 78}">${esc(l)}</tspan>`
    )
    .join('');
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#021F17"/>
  <!-- aurora blobs, canonical teal + one pink -->
  <circle cx="1060" cy="90" r="300" fill="#007050" opacity="0.28"/>
  <circle cx="1150" cy="520" r="260" fill="#FEBFCC" opacity="0.14"/>
  <circle cx="120" cy="600" r="240" fill="#004D37" opacity="0.35"/>
  <!-- logo mark: pink back layer -8deg, teal front +4deg -->
  <g transform="translate(80,88)">
    <rect x="6" y="10" width="76" height="76" rx="18" fill="#FEBFCC" transform="rotate(-8 44 48)"/>
    <rect x="14" y="2" width="76" height="76" rx="18" fill="#007050" transform="rotate(4 52 40)"/>
    <text x="112" y="64" font-family="Helvetica, Arial, sans-serif" font-size="52" font-weight="700" fill="#FFFFFF">thridify</text>
  </g>
  <text x="80" y="300" font-family="Helvetica, Arial, sans-serif" font-size="24" letter-spacing="6" fill="#6FCFAB">${kicker}</text>
  <text x="80" y="392" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="700" fill="#FFFFFF">${titleSpans}</text>
  <rect x="80" y="${392 + (lines.length - 1) * 78 + 44}" width="220" height="6" rx="3" fill="url(#g)"/>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#007050"/>
      <stop offset="1" stop-color="#FEBFCC"/>
    </linearGradient>
  </defs>
  <text x="80" y="580" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#A3BFB5">No code. No app. No friction.</text>
</svg>`;
}

for (const page of PAGES) {
  const svg = Buffer.from(svgFor(page));
  await sharp(svg).png().toFile(`${OUT}${page.file}`);
  console.log('wrote', page.file);
}
