// Run: npm test   (node --test; Node 22.18+ strips the TypeScript types)
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BLACK_FRIDAY_CALENDLY_URL,
  BLACK_FRIDAY_CALL_PATH,
  BLACK_FRIDAY_EXPIRES_AT,
  blackFridayCallHref,
  blackFridayCta,
  isBlackFridayCallPath,
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

test('booking buttons go through the counted link, on the campaign page only', () => {
  assert.equal(BLACK_FRIDAY_CALL_PATH, '/go/black-friday-call');
  assert.equal(blackFridayCta('/black-friday')?.href, BLACK_FRIDAY_CALL_PATH);
  assert.equal(blackFridayCta('/contact'), null);
  assert.ok(isBlackFridayCallPath('/go/black-friday-call'));
  assert.ok(isBlackFridayCallPath('/go/black-friday-call/'));
  assert.ok(!isBlackFridayCallPath('/go/black-friday'));
  assert.ok(!isBlackFridayCallPath('/go/black-friday-call/x'));
});

test('counted link carries only a clean utm_source', () => {
  assert.equal(blackFridayCallHref(), '/go/black-friday-call');
  assert.equal(blackFridayCallHref(''), '/go/black-friday-call');
  assert.equal(blackFridayCallHref('LinkedIn'), '/go/black-friday-call?utm_source=linkedin');
  assert.equal(blackFridayCallHref('x&next=//evil.example'), '/go/black-friday-call?utm_source=xnextevil.example');
});

test('page and middleware: buttons use the counted link, which redirects to Calendly', async () => {
  const { readFile } = await import('node:fs/promises');
  const page = await readFile(new URL('../src/app/black-friday/page.tsx', import.meta.url), 'utf8');
  assert.match(page, /href=\{BLACK_FRIDAY_CALL_PATH\}/);
  assert.doesNotMatch(page, /BLACK_FRIDAY_CALENDLY_URL/);
  const mw = await readFile(new URL('../src/middleware.ts', import.meta.url), 'utf8');
  assert.match(mw, /isBlackFridayCallPath\(request\.nextUrl\.pathname\)[\s\S]{0,120}NextResponse\.redirect\(BLACK_FRIDAY_CALENDLY_URL, 302\)/);
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

// ── Redesign (issue 54): layout labels stay tied to the source copy ─────────

test('layout: hero splits the intro sentence without changing a word', async () => {
  const { BLACK_FRIDAY_COPY, BLACK_FRIDAY_LAYOUT: L } = await import('../src/content/black-friday.ts');
  assert.equal(`${L.hero.offerLine} ${L.hero.subLine}`, BLACK_FRIDAY_COPY.intro[0]);
  assert.equal(L.hero.label, BLACK_FRIDAY_COPY.headline);
});

test('layout: one card per offer bullet, same term and saving, 5 years first', async () => {
  const { BLACK_FRIDAY_COPY, BLACK_FRIDAY_LAYOUT: L } = await import('../src/content/black-friday.ts');
  const bullets = BLACK_FRIDAY_COPY.sections.find((s) => s.heading === 'The offer').bullets;
  assert.equal(L.offerCards.length, bullets.length);
  bullets.forEach((bullet, i) => {
    const [, years, saving] = bullet.match(/^(\d+) years: (\d+%) off modelling$/);
    assert.equal(L.offerCards[i].saving, saving);
    assert.equal(L.offerCards[i].term, `${years}-year plan, paid upfront`);
    assert.equal(L.offerCards[i].label, 'off 3D modelling');
  });
  assert.deepEqual(L.offerCards.map((c) => c.term[0]), ['5', '3', '2']);
  // Only the 5-year card is accented, and it is the only one at 100%.
  assert.deepEqual(L.offerCards.map((c) => Boolean(c.accent)), [true, false, false]);
  assert.equal(L.offerCards.filter((c) => c.saving === '100%').length, 1);
});

test('layout: a tag for every step, and the same rules as the copy', async () => {
  const { BLACK_FRIDAY_COPY, BLACK_FRIDAY_LAYOUT: L } = await import('../src/content/black-friday.ts');
  const steps = BLACK_FRIDAY_COPY.sections.find((s) => s.heading === 'How it works').steps;
  assert.equal(L.stepTags.length, steps.length);
  assert.equal(L.whatYouGet.length, 3);
  const text = JSON.stringify(L);
  assert.doesNotMatch(text, /[$€£₹]|\b(USD|CAD|INR|EUR)\b/);
  assert.doesNotMatch(text, /\b(left|remaining|hurry|countdown|spots?)\b/i);
  assert.doesNotMatch(text, /shopify/i);
});

test('page: three booking buttons share the campaign link; viewer is the Arlo sofa, deferred', async () => {
  const { readFile } = await import('node:fs/promises');
  const page = await readFile(new URL('../src/app/black-friday/page.tsx', import.meta.url), 'utf8');
  assert.equal(page.match(/<BookCallButton /g).length, 3);
  assert.equal(page.match(/BLACK_FRIDAY_CALL_PATH\}/g).length, 1);
  assert.match(page, /previewId=\{EXP\.arloSofa\}/);
  assert.match(page, /<DeferredExperience/);
  assert.match(page, /fitAuthoredView/);
  assert.doesNotMatch(page, /aspect-square/);
  assert.match(page, /export const dynamic = 'force-dynamic'/);
  assert.match(page, /index: false/);
  const lib = await readFile(new URL('../src/lib/thridify.ts', import.meta.url), 'utf8');
  assert.match(lib, /arloSofa: 'q2zws7'/);
  assert.match(lib, /'q2zws7': 'OPAA-ARLO'/);
  assert.match(lib, /'q2zws7': ACCOUNT_MOVABLE_FURNITURE/);
  assert.match(lib, /ACCOUNT_MOVABLE_FURNITURE = 'ba821df5e38769800893b524e86f01be'/);
});

// ── Follow-up (issue 54): whole sofa in frame; site-wide buttons on the page ─

test('viewer fit: restores only an authored field of view the limit narrowed', async () => {
  const { authoredFovToRestore } = await import('../src/lib/thridify-fit.ts');
  assert.equal(authoredFovToRestore('45deg', 30), 45);
  assert.equal(authoredFovToRestore('45deg', 29.999999999999996), 45);
  // Nothing to do: limit already allows it, or there is no authored number.
  assert.equal(authoredFovToRestore('45deg', 45), null);
  assert.equal(authoredFovToRestore('30deg', 30), null);
  assert.equal(authoredFovToRestore('auto', 30), null);
  assert.equal(authoredFovToRestore(null, 30), null);
  assert.equal(authoredFovToRestore('', 30), null);
  assert.equal(authoredFovToRestore('45deg', NaN), null);
  // Never a camera of our own making: junk and extreme values are ignored.
  assert.equal(authoredFovToRestore('170deg', 30), null);
  assert.equal(authoredFovToRestore('0.8rad', 30), null);
  assert.equal(authoredFovToRestore('-45deg', 30), null);
});

test('site-wide booking buttons carry the campaign link and label on the page only', async () => {
  const { blackFridayCta, BLACK_FRIDAY_CTA_LABEL } = await import('../src/lib/black-friday.ts');
  const { BLACK_FRIDAY_LAYOUT } = await import('../src/content/black-friday.ts');
  assert.equal(BLACK_FRIDAY_CTA_LABEL, BLACK_FRIDAY_LAYOUT.cta);
  assert.deepEqual(blackFridayCta('/black-friday'), {
    href: BLACK_FRIDAY_CALL_PATH,
    label: 'Book a 30-minute call',
  });
  assert.deepEqual(blackFridayCta('/black-friday/'), blackFridayCta('/black-friday'));
  for (const path of ['/', '/contact', '/blog/black-friday', '/black-friday-2027', '', null, undefined]) {
    assert.equal(blackFridayCta(path), null);
  }
  const { readFile } = await import('node:fs/promises');
  for (const file of ['MobileCtaBar.tsx', 'HeaderCta.tsx', 'MobileNav.tsx']) {
    const src = await readFile(new URL(`../src/components/${file}`, import.meta.url), 'utf8');
    assert.match(src, /blackFridayCta\(usePathname\(\)\)/, file);
  }
});
