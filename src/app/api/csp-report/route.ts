/**
 * CSP violation sink for the WCR-011 Report-Only soak (see src/middleware.ts).
 *
 * Browsers POST either `application/csp-report` ({"csp-report": {...}}) or a
 * Reporting-API array. We log one compact line per violation: the directive,
 * the blocked origin (never a full URL with query, which could carry tokens)
 * and the page path. Nothing is stored. Always 204, so a bad body costs the
 * browser nothing.
 */
export const dynamic = 'force-dynamic';

type Raw = Record<string, unknown>;

function originOf(v: unknown): string {
  const s = String(v ?? '');
  if (!s || /^(inline|eval|data|blob|self|wasm-eval)$/i.test(s)) return s;
  try {
    return new URL(s).origin;
  } catch {
    return s.slice(0, 40);
  }
}

function pathOf(v: unknown): string {
  try {
    return new URL(String(v ?? '')).pathname;
  } catch {
    return '';
  }
}

export async function POST(request: Request) {
  try {
    const text = (await request.text()).slice(0, 20_000);
    const body = JSON.parse(text) as unknown;
    const reports: Raw[] = Array.isArray(body)
      ? body.map((r) => ((r as Raw)?.body ?? {}) as Raw)
      : [(((body as Raw)?.['csp-report'] ?? {}) as Raw)];
    for (const r of reports.slice(0, 20)) {
      const directive = r['effective-directive'] ?? r.effectiveDirective ?? r['violated-directive'] ?? '';
      const blocked = originOf(r['blocked-uri'] ?? r.blockedURL);
      const page = pathOf(r['document-uri'] ?? r.documentURL);
      console.log(JSON.stringify({ evt: 'csp_violation', directive, blocked, page }));
    }
  } catch {
    /* malformed report: ignore */
  }
  return new Response(null, { status: 204 });
}
