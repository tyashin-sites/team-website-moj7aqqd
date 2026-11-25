// Run: npm test   (node --test; Node 22.18+ strips the TypeScript types)
import test from 'node:test';
import assert from 'node:assert/strict';
import { CSP_DIRECTIVES, CSP_MODE, CSP_POLICY, cspHeaderName } from '../src/lib/csp.ts';

const has = (directive, source) => assert.ok(
  CSP_DIRECTIVES[directive]?.includes(source),
  `${directive} must allow ${source}`,
);

test('3D viewer sources found in the 25 Nov soak stay allowed', () => {
  has('script-src', "'unsafe-eval'"); // KTX2/Basis + Draco embind in workers
  has('script-src', "'wasm-unsafe-eval'");
  has('script-src', 'data:'); // meshopt decoder
  has('script-src', 'blob:');
  has('script-src', 'https://*.thridify.com');
  has('connect-src', 'blob:'); // three.js loaders fetching blob: textures
  has('connect-src', 'https:');
  has('worker-src', 'blob:');
});

test('analytics tags stay allowed', () => {
  has('script-src', 'https://static.cloudflareinsights.com');
  has('script-src', 'https://www.googletagmanager.com');
});

test('protective directives are kept', () => {
  has('object-src', "'none'");
  has('base-uri', "'self'");
  has('frame-ancestors', "'self'");
  has('report-uri', '/api/csp-report');
});

test('policy string is well formed', () => {
  assert.doesNotMatch(CSP_POLICY, /;;|\s;/);
  assert.match(CSP_POLICY, /^default-src 'self'; script-src /);
});

test('header name follows the mode', () => {
  assert.equal(cspHeaderName('enforce'), 'Content-Security-Policy');
  assert.equal(cspHeaderName('report-only'), 'Content-Security-Policy-Report-Only');
  assert.equal(cspHeaderName(), CSP_MODE === 'enforce'
    ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only');
});
