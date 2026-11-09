import { NextResponse } from 'next/server';
import { tyashinApi } from '@/lib/tyashin-api';

/**
 * Newsletter sign-up (POST /api/newsletter), from the Dispatch form on /blog.
 *
 * The form used to carry an attribute nothing bound, so the browser fell back
 * to a native GET and put the visitor's email in the URL (and from there in
 * analytics and logs). This route is the only way in now:
 *   - JS path: NewsletterForm posts JSON and gets JSON back.
 *   - No-JS path: the form itself is method="post" action="/api/newsletter";
 *     we answer with a 303 to /blog?subscribed=1|0. The email never appears
 *     in a URL either way.
 * Forwards to the Tyashin newsletter plugin (double opt-in: the platform
 * emails a confirmation link). Logs never contain the address.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Result = { ok: boolean; message?: string; error?: string; status: number };

async function subscribe(email: string, pageUrl: string | undefined): Promise<Result> {
  const { apiKey, apiUrl } = tyashinApi();
  if (!apiKey) {
    console.log('NEWSLETTER: no TYASHIN_API_KEY binding — not forwarded');
    return { ok: false, error: 'Sign-up is unavailable right now. Please try again later.', status: 503 };
  }
  try {
    const res = await fetch(`${apiUrl}/api/v1/newsletter/public/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': apiKey },
      body: JSON.stringify({ email, source: 'thridify-blog-dispatch', metadata: pageUrl ? { pageUrl } : undefined }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; data?: { message?: string } };
    if (!res.ok || !data.success) {
      console.log(`NEWSLETTER: platform returned ${res.status}`);
      return { ok: false, error: 'We could not sign you up just now. Please try again.', status: 502 };
    }
    return { ok: true, message: data.data?.message || 'Please check your email to confirm your subscription.', status: 200 };
  } catch (err) {
    console.log(`NEWSLETTER: platform errored (${String(err)})`);
    return { ok: false, error: 'We could not sign you up just now. Please try again.', status: 502 };
  }
}

export async function POST(request: Request) {
  const isJson = (request.headers.get('content-type') || '').includes('application/json');
  let email = '';
  let pageUrl: string | undefined;
  try {
    if (isJson) {
      const body = (await request.json()) as { email?: unknown };
      email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
    } else {
      const fd = await request.formData();
      const v = fd.get('email');
      email = typeof v === 'string' ? v.trim().slice(0, 200) : '';
    }
  } catch {
    // fall through to validation
  }
  const ref = request.headers.get('referer');
  if (ref) {
    try {
      const u = new URL(ref);
      pageUrl = `${u.origin}${u.pathname}`;
    } catch {
      // ignore
    }
  }

  const result = EMAIL_RE.test(email)
    ? await subscribe(email.toLowerCase(), pageUrl)
    : ({ ok: false, error: 'Please enter a valid email address.', status: 400 } as Result);

  if (isJson) {
    return NextResponse.json(
      result.ok ? { ok: true, message: result.message } : { ok: false, error: result.error },
      { status: result.status }
    );
  }
  return NextResponse.redirect(new URL(`/blog?subscribed=${result.ok ? 1 : 0}`, request.url), 303);
}
