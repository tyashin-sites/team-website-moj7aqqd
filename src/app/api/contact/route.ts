import { NextResponse } from 'next/server';
import { tyashinApi, visitorContext } from '@/lib/tyashin-api';

/**
 * Contact-form lead pipeline (BUILD-PLAN Phase 0).
 *
 * POST /api/contact
 *   1. Validates the payload (name, email required; company/category/message
 *      optional — `industry` is accepted as a legacy alias for `category`).
 *   2. ALWAYS logs the lead to the worker console with a `LEAD:` prefix so no
 *      lead is ever lost (visible in `wrangler tail` / Cloudflare logs).
 *   3. If a TYASHIN_API_KEY binding exists, forwards the lead in the
 *      background (waitUntil) to the Tyashin platform's Contact Form & Lead
 *      Capture plugin (`/api/v1/contact/public/submit`, X-API-Key auth). The
 *      plugin stores the lead in the admin inbox, syncs it to the CRM, meters
 *      it, emails the team, and (when the admin configures a Slack webhook in
 *      the plugin settings) posts it to Slack. `company` and `category` are
 *      sent as FIRST-CLASS fields so the plugin can qualify/segment/route by
 *      them — not just buried in the message body.
 *   4. Always responds fast — forwarding never blocks the response.
 *   5. Attribution (policy §3/§9): the optional `howHeard` answer (verbatim)
 *      and the first/last-touch `attribution` captured client-side go into
 *      the submission's `metadata`, with the visitor's real IP and country in
 *      `metadata.visitor` (the platform's own columns see this Worker, not the
 *      visitor). The visitor's User-Agent and page are forwarded as headers.
 *
 * Slack / CRM / auto-reply destinations now live in the plugin's Settings
 * (admin.tyashin.com → project → Contact Form & Lead Capture), so this route
 * intentionally invents no endpoints of its own. Tracked in docs/ASSET-DEBT.md.
 */

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  /** Product category from the concierge form (Phase 2). */
  category?: unknown;
  /** Legacy alias for `category` — kept for back-compat. */
  industry?: unknown;
  message?: unknown;
  /** "How did you first hear about Thridify?" — policy §9 option, verbatim. */
  howHeard?: unknown;
  /** Free text when howHeard is "Other". */
  howHeardOther?: unknown;
  /** First/last touch from src/lib/attribution.ts. Re-validated here. */
  attribution?: unknown;
};

type CleanTouch = {
  utm: Record<string, string>;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landingPath?: string;
  at?: string;
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

// The client value is untrusted: keep only known keys, as short strings.
function cleanTouch(v: unknown): CleanTouch | undefined {
  if (!v || typeof v !== 'object') return undefined;
  const o = v as Record<string, unknown>;
  const utmIn = (o.utm && typeof o.utm === 'object' ? o.utm : {}) as Record<string, unknown>;
  const utm: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const s = str(utmIn[k], 200);
    if (s) utm[k] = s;
  }
  const t: CleanTouch = {
    utm,
    gclid: str(o.gclid, 200) || undefined,
    fbclid: str(o.fbclid, 200) || undefined,
    referrer: str(o.referrer, 300) || undefined,
    landingPath: str(o.landingPath, 200) || undefined,
    at: str(o.at, 40) || undefined,
  };
  return t.landingPath || Object.keys(utm).length || t.referrer ? t : undefined;
}

function cleanAttribution(v: unknown): { first?: CleanTouch; last?: CleanTouch } | undefined {
  if (!v || typeof v !== 'object') return undefined;
  const o = v as Record<string, unknown>;
  const first = cleanTouch(o.first);
  const last = cleanTouch(o.last);
  return first || last ? { first, last } : undefined;
}

// A form submitted before hydration arrives form-encoded (ConciergeForm is
// method="post" so it can never fall back to a GET that puts the email in
// the URL). Those callers get a 303 back to /contact with no personal data.
function reply(native: boolean, request: Request, body: { ok: boolean; error?: string }, status: number) {
  if (native) {
    return NextResponse.redirect(new URL(`/contact?sent=${body.ok ? 1 : 0}`, request.url), 303);
  }
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const native = !(request.headers.get('content-type') || '').includes('application/json');
  let body: LeadPayload;
  try {
    body = native
      ? (Object.fromEntries(await request.formData()) as LeadPayload)
      : ((await request.json()) as LeadPayload);
  } catch {
    return reply(native, request, { ok: false, error: 'Invalid request body' }, 400);
  }

  const name = str(body.name, 100);
  const email = str(body.email, 200);
  const company = str(body.company, 200);
  // The concierge form sends `category`; older callers sent `industry`.
  const category = str(body.category, 100) || str(body.industry, 100);
  const message = str(body.message, 5000);
  const howHeard = str(body.howHeard, 120);
  const howHeardOther = str(body.howHeardOther, 200);
  const attribution = cleanAttribution(body.attribution);
  const visitor = visitorContext(request);

  if (!name) {
    return reply(native, request, { ok: false, error: 'Name is required' }, 400);
  }
  if (!email || !EMAIL_RE.test(email)) {
    return reply(native, request, { ok: false, error: 'A valid email is required' }, 400);
  }

  const lead = {
    name,
    email,
    company: company || undefined,
    category: category || undefined,
    message: message || undefined,
    howHeard: howHeard || undefined,
    howHeardOther: howHeardOther || undefined,
    utm: attribution?.first?.utm,
    submittedAt: new Date().toISOString(),
  };

  // Insurance: the lead is ALWAYS visible in worker logs, even if platform
  // forwarding is unavailable or fails.
  console.log('LEAD:', JSON.stringify(lead));

  // Best-effort background forward to the Tyashin platform CRM inbox.
  const { apiKey, apiUrl, waitUntil } = tyashinApi();
  if (apiKey) {
    const referer = request.headers.get('referer') || undefined;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
    };
    // The platform records these two from its request headers.
    if (visitor.userAgent) headers['User-Agent'] = visitor.userAgent;
    if (referer) headers['Referer'] = referer;
    const forward = fetch(`${apiUrl}/api/v1/contact/public/submit`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name,
        email,
        // First-class qualification fields the plugin filters/routes on.
        company: company || undefined,
        category: category || undefined,
        subject: category
          ? `Website demo request — ${category}`
          : 'Website demo request',
        message: message || undefined,
        source: 'thridify-website-contact',
        pageUrl: referer,
        metadata: {
          company,
          category,
          howHeard: howHeard || undefined,
          howHeardOther: howHeardOther || undefined,
          attribution,
          visitor: { ip: visitor.ip, country: visitor.country },
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          console.log(
            `LEAD: platform forward failed with status ${res.status} — lead preserved in log above`
          );
        }
      })
      .catch((err) => {
        console.log(
          `LEAD: platform forward errored (${String(err)}) — lead preserved in log above`
        );
      });
    waitUntil(forward);
  } else {
    console.log('LEAD: no TYASHIN_API_KEY binding — log-only fallback used');
  }

  return reply(native, request, { ok: true }, 200);
}
