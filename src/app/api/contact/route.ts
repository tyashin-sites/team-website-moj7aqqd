import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

/**
 * Contact-form lead pipeline (BUILD-PLAN Phase 0).
 *
 * POST /api/contact
 *   1. Validates the payload (name, email required; company/category/message
 *      optional — `industry` is accepted as a legacy alias for `category`).
 *   2. ALWAYS logs the lead to the worker console with a `LEAD:` prefix so no
 *      lead is ever lost (visible in `wrangler tail` / Cloudflare logs).
 *   3. If a TYASHIN_API_KEY binding exists, forwards the lead in the
 *      background (waitUntil) to the Tyashin platform's public contact
 *      endpoint (`/api/v1/contact/public/submit`, X-API-Key auth) which
 *      stores it and notifies the project admins.
 *   4. Always responds fast — forwarding never blocks the response.
 *
 * Slack-webhook / CRM wiring is intentionally NOT invented here — it needs
 * user-provided destinations. Tracked in docs/ASSET-DEBT.md.
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
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const name = str(body.name, 100);
  const email = str(body.email, 200);
  const company = str(body.company, 200);
  // The concierge form sends `category`; older callers sent `industry`.
  const category = str(body.category, 100) || str(body.industry, 100);
  const message = str(body.message, 5000);

  if (!name) {
    return NextResponse.json(
      { ok: false, error: 'Name is required' },
      { status: 400 }
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'A valid email is required' },
      { status: 400 }
    );
  }

  const lead = {
    name,
    email,
    company: company || undefined,
    category: category || undefined,
    message: message || undefined,
    submittedAt: new Date().toISOString(),
  };

  // Insurance: the lead is ALWAYS visible in worker logs, even if platform
  // forwarding is unavailable or fails.
  console.log('LEAD:', JSON.stringify(lead));

  // Best-effort background forward to the Tyashin platform CRM inbox.
  try {
    const { env, ctx } = getCloudflareContext();
    const apiKey =
      (env as Record<string, unknown>).TYASHIN_API_KEY ??
      process.env.TYASHIN_API_KEY;
    const apiUrl =
      (env as Record<string, unknown>).TYASHIN_API_URL ??
      process.env.TYASHIN_API_URL ??
      'https://website-api.tyashin.com';

    if (typeof apiKey === 'string' && apiKey.length > 0) {
      const forward = fetch(`${apiUrl}/api/v1/contact/public/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          name,
          email,
          subject: category
            ? `Website demo request — ${category}`
            : 'Website demo request',
          message:
            [
              company ? `Company: ${company}` : null,
              category ? `Product category: ${category}` : null,
              '',
              message || '(no message provided)',
            ]
              .filter((l) => l !== null)
              .join('\n') || '(no message provided)',
          source: 'thridify-website-contact',
          metadata: { company, category },
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
      ctx.waitUntil(forward);
    } else {
      console.log('LEAD: no TYASHIN_API_KEY binding — log-only fallback used');
    }
  } catch {
    // getCloudflareContext unavailable (e.g. local next dev) — log-only.
    console.log('LEAD: no Cloudflare context — log-only fallback used');
  }

  return NextResponse.json({ ok: true });
}
