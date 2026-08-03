/**
 * generate-ar-qr.mjs — real, scannable AR QR codes for the demo models.
 *
 * Emits an SVG QR (crisp, dependency-free at runtime) that deep-links to the
 * model's AR view via a Google scene-viewer intent for the self-hosted GLB.
 * Scanning it on a phone launches "view in your room" AR of the exact model.
 *
 * The encoded file URL is an ABSOLUTE, always-reachable host so the QR is
 * identical regardless of which host the desktop page is served from. When a
 * real client model replaces the placeholder chair (docs/ASSET-DEBT.md
 * #10/#16), regenerate the QR here pointing at the new GLB.
 *
 * Requires `qrcode` (dev-only, NOT a runtime/site dependency):
 *   npm i -D qrcode && node scripts/generate-ar-qr.mjs
 */

import QRCode from 'qrcode';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'models');

const MODELS = [
  {
    file: 'ar-qr-chair.svg',
    glb: 'https://site-thridify.snowy-cherry-cd2c.workers.dev/models/sheen-chair.glb',
    title: 'Thridify 3D chair',
  },
];

for (const m of MODELS) {
  const intent =
    'https://arvr.google.com/scene-viewer/1.0?file=' +
    encodeURIComponent(m.glb) +
    '&mode=ar_preferred&title=' +
    encodeURIComponent(m.title);
  const svg = await QRCode.toString(intent, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: { dark: '#021F17', light: '#FFFFFF' },
  });
  const { writeFileSync } = await import('node:fs');
  writeFileSync(join(OUT, m.file), svg);
  console.log('wrote', m.file, '(', intent.length, 'chars )');
}
