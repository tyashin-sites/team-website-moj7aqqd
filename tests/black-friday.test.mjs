// Run: npm test   (node --test; Node 22.18+ strips the TypeScript types)
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BLACK_FRIDAY_CALENDLY_URL,
  BLACK_FRIDAY_EXPIRES_AT,
  blackFridayState,
  isBlackFridayPath,
} from '../src/lib/black-friday.ts';

const before = Date.parse('2026-11-25T23:59:59-05:00');
const base = { now: before, isPreviewHost: false, hasCopy: true, live: true };

test('expiry is midnight Toronto on 26 Nov 2026 (05:00 UTC)', () => {
  assert.equal(new Date(BLACK_FRIDAY_EXPIRES_AT).toISOString(), '2026-11-26T05:00:00.000Z');
  const toronto = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false,
  }).format(BLACK_FRIDAY_EXPIRES_AT);
  assert.match(toronto, /^2026-11-26, (00|24):00$/);
});

test('live until the last second, expired from the first', () => {
  assert.equal(blackFridayState(base), 'live');
  assert.equal(blackFridayState({ ...base, now: BLACK_FRIDAY_EXPIRES_AT - 1 }), 'live');
  assert.equal(blackFridayState({ ...base, now: BLACK_FRIDAY_EXPIRES_AT }), 'expired');
  assert.equal(blackFridayState({ ...base, now: Date.parse('2027-01-25T12:00:00Z') }), 'expired');
});

test('expiry wins over every gate, so the link never 404s afterwards', () => {
  const after = BLACK_FRIDAY_EXPIRES_AT + 1;
  assert.equal(blackFridayState({ now: after, isPreviewHost: false, hasCopy: false, live: false }), 'expired');
  assert.equal(blackFridayState({ now: after, isPreviewHost: true, hasCopy: true, live: false }), 'expired');
});

test('not live: hidden on production, visible on preview hosts', () => {
  assert.equal(blackFridayState({ ...base, live: false }), 'hidden');
  assert.equal(blackFridayState({ ...base, live: false, isPreviewHost: true }), 'live');
});

test('no copy: hidden everywhere, even when switched live', () => {
  assert.equal(blackFridayState({ ...base, hasCopy: false }), 'hidden');
  assert.equal(blackFridayState({ ...base, hasCopy: false, isPreviewHost: true }), 'hidden');
});

test('path match is exact', () => {
  assert.ok(isBlackFridayPath('/black-friday'));
  assert.ok(isBlackFridayPath('/black-friday/'));
  assert.ok(!isBlackFridayPath('/black-friday-2027'));
  assert.ok(!isBlackFridayPath('/blog/black-friday'));
});

test('booking link carries the campaign tags', () => {
  const u = new URL(BLACK_FRIDAY_CALENDLY_URL);
  assert.equal(u.origin + u.pathname, 'https://calendly.com/hello-thridify/30min');
  assert.equal(u.searchParams.get('utm_source'), 'thridify');
  assert.equal(u.searchParams.get('utm_medium'), 'campaign-page');
  assert.equal(u.searchParams.get('utm_campaign'), 'black-friday-2026');
});

test('copy: present, no prices, no countdown or scarcity, no Shopify block', async () => {
  const { BLACK_FRIDAY_COPY } = await import('../src/content/black-friday.ts');
  assert.ok(BLACK_FRIDAY_COPY);
  const text = JSON.stringify(BLACK_FRIDAY_COPY);
  assert.doesNotMatch(text, /[$€£₹]|\b(USD|CAD|INR|EUR)\b/);
  assert.doesNotMatch(text, /\b(left|remaining|hurry|countdown|spots?)\b/i);
  assert.doesNotMatch(text, /shopify/i);
  assert.deepEqual(
    BLACK_FRIDAY_COPY.sections.map((s) => s.heading),
    ['What you get', 'The offer', 'How it works', 'The details'],
  );
});
