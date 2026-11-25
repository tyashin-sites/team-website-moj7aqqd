// Run: npm test   (node --test; Node 22.18+ strips the TypeScript types)
// Live check against models.thridify.com: THRIDIFY_LIVE_CHECK=1 npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { EXP, PID_BY_PREVIEW, POSTER_BY_PREVIEW, accountFor } from '../src/lib/thridify.ts';

const MODELS = 'https://models.thridify.com';
const embedded = Object.values(EXP);

test('every curated experience has a product id (the viewer needs one)', () => {
  for (const id of embedded) assert.ok(PID_BY_PREVIEW[id], `no pid for preview ${id}`);
});

test('the deleted hello@ Lounge chair (_z8ksj) is not embedded anywhere', () => {
  assert.ok(!embedded.includes('_z8ksj'));
  assert.equal(PID_BY_PREVIEW['_z8ksj'], undefined);
  assert.equal(POSTER_BY_PREVIEW['_z8ksj'], undefined);
});

test('the before/after placement uses a showcase experience', () => {
  assert.equal(accountFor(EXP.deringLounger), 'ba821df5e38769800893b524e86f01be');
  assert.equal(POSTER_BY_PREVIEW[EXP.deringLounger], '/posters/dering-lounger.jpg');
});

test('every curated experience is published', { skip: !process.env.THRIDIFY_LIVE_CHECK }, async () => {
  const missing = [];
  for (const id of embedded) {
    const url = `${MODELS}/${accountFor(id)}/products/${encodeURIComponent(PID_BY_PREVIEW[id])}.config.json`;
    const res = await fetch(url);
    if (res.status !== 200) missing.push(`${id} -> ${res.status} ${url}`);
  }
  for (const [id, src] of Object.entries(POSTER_BY_PREVIEW)) {
    if (!src.startsWith('http')) continue;
    const res = await fetch(src, { method: 'HEAD' });
    if (res.status !== 200) missing.push(`poster ${id} -> ${res.status} ${src}`);
  }
  assert.deepEqual(missing, []);
});
