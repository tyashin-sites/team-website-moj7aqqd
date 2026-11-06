/**
 * Consent gate for first-party storage — the single place this site decides
 * whether it may persist anything about a visitor.
 *
 * It mirrors the platform's own gate in the edge-injected analytics.js
 * (`tyMayStore`) so the site and the platform never disagree about the same
 * visitor. Precedence, first answer wins:
 *   1. `aapas_consent` in localStorage (platform consent-manager choice)
 *   2. the last `yom:consent` event (YOM Consent SDK purposes)
 *   3. the last Google Consent Mode `update` in `dataLayer`
 *   4. Global Privacy Control on → no
 *   5. otherwise yes (the platform's default region rule for this project)
 *
 * Client-only. On the server every answer is `false`.
 */

export type ConsentPurpose = 'analytics' | 'preferences';

let yomPurposes: Record<string, string> | null = null;

function gcmUpdate(key: string): boolean | null {
  let result: boolean | null = null;
  try {
    const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
    for (const entry of dl) {
      const e = entry as unknown[] | null;
      if (e && e[0] === 'consent' && e[1] === 'update' && e[2] && typeof (e[2] as Record<string, unknown>)[key] === 'string') {
        result = (e[2] as Record<string, string>)[key] === 'granted';
      }
    }
  } catch {
    // dataLayer is page-owned; never let it break us.
  }
  return result;
}

export function mayStore(purpose: ConsentPurpose): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const c = JSON.parse(localStorage.getItem('aapas_consent') || 'null');
    if (c && typeof c === 'object') return !!c[purpose];
  } catch {
    // Storage blocked (private mode, site data cleared) — fall through.
  }
  if (yomPurposes) {
    const y = yomPurposes[purpose === 'preferences' ? 'personalisation' : 'analytics'];
    if (y === 'granted') return true;
    if (y === 'denied') return false;
  }
  const g = gcmUpdate(purpose === 'preferences' ? 'functionality_storage' : 'analytics_storage');
  if (g !== null) return g;
  try {
    if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true) return false;
  } catch {
    // ignore
  }
  return true;
}

/** Run `fn` whenever the visitor's consent choice changes. Returns an unsubscribe. */
export function onConsentChange(fn: () => void): () => void {
  const onAapas = () => fn();
  const onYom = (e: Event) => {
    const d = (e as CustomEvent<{ purposes?: Record<string, string> }>).detail;
    if (d?.purposes) yomPurposes = d.purposes;
    fn();
  };
  window.addEventListener('aapas:consent', onAapas);
  window.addEventListener('yom:consent', onYom);
  return () => {
    window.removeEventListener('aapas:consent', onAapas);
    window.removeEventListener('yom:consent', onYom);
  };
}
