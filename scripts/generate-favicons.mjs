/**
 * generate-favicons.mjs — scheme-aware tab icons from the brand mark.
 *
 *   favicon-light.png   the mark as-is (pink + teal layers), 64px
 *   favicon-dark.png    same mark with the teal layer lifted to the on-dark
 *                       teal (--brand-primary-soft #6FCFAB) — the base teal
 *                       #007050 is only 2.8:1 against a dark tab strip, so
 *                       the mark lost its second layer on dark tabs
 *   apple-touch-icon.png  180px, opaque white plate (iOS composites its own
 *                       corner radius)
 *
 * Wired in src/app/layout.tsx via `icons.icon[].media`.
 * Run:  node scripts/generate-favicons.mjs   (writes public/brand/*, commit)
 */

import sharp from 'sharp';

const SRC = new URL('../public/brand/logo-favicon.png', import.meta.url).pathname;
const OUT = new URL('../public/brand/', import.meta.url).pathname;

const TEAL = [0x00, 0x70, 0x50];
const SOFT = [0x6f, 0xcf, 0xab];

// Recolour every pixel that reads as the teal layer (green-dominant, low red)
// to the on-dark teal, keeping its alpha. The pink layer is untouched.
async function liftTeal(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a === 0) continue;
    const tealness = g - Math.max(r, b);
    if (tealness > 20 && r < 120) {
      // Blend proportionally to how "teal" the pixel is (soft edges stay soft).
      const t = Math.min(1, tealness / (TEAL[1] - TEAL[0]));
      data[i] = Math.round(r + (SOFT[0] - TEAL[0]) * t);
      data[i + 1] = Math.round(g + (SOFT[1] - TEAL[1]) * t);
      data[i + 2] = Math.round(b + (SOFT[2] - TEAL[2]) * t);
    }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
}

// The source mark sits small in a 500px canvas — crop to its bounds first.
const trimmed = await sharp(SRC).trim().toBuffer();
const pad = async (img, size, background) =>
  img
    .resize(Math.round(size * 0.82), Math.round(size * 0.82), { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.round(size * 0.09),
      bottom: Math.round(size * 0.09),
      left: Math.round(size * 0.09),
      right: Math.round(size * 0.09),
      background,
    })
    .resize(size, size)
    .png();

await (await pad(sharp(trimmed), 64, { r: 0, g: 0, b: 0, alpha: 0 })).toFile(`${OUT}favicon-light.png`);
await (await pad(await liftTeal(trimmed), 64, { r: 0, g: 0, b: 0, alpha: 0 })).toFile(`${OUT}favicon-dark.png`);
await (await pad(sharp(trimmed), 180, { r: 255, g: 255, b: 255, alpha: 1 })).flatten({ background: '#FFFFFF' }).toFile(`${OUT}apple-touch-icon.png`);
console.log('wrote favicon-light.png, favicon-dark.png, apple-touch-icon.png');
