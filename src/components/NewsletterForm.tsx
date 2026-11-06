'use client';

/**
 * NewsletterForm — the Dispatch sign-up on /blog. Always a POST to
 * /api/newsletter (JSON with JS, form-encoded without), never a GET, so the
 * email can't end up in a URL, analytics hit or server log.
 */

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'done' | 'error';

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get('email');
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('done');
      setMessage(data.message || 'Check your inbox to confirm.');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <form
      method="post"
      action="/api/newsletter"
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg"
    >
      <label htmlFor="dispatch-email" className="sr-only">
        Email address
      </label>
      <input
        id="dispatch-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@brand.com"
        className="flex-1 px-5 py-4 rounded-full bg-paper/10 border border-paper/20 text-paper placeholder:text-paper/50 focus:outline-none focus:border-paper/60"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn bg-paper text-ink hover:bg-paper/90"
      >
        {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
      </button>
      <p
        role={status === 'error' ? 'alert' : 'status'}
        aria-live="polite"
        className={message ? 'sm:basis-full text-sm text-paper/80' : 'sr-only'}
      >
        {message}
      </p>
    </form>
  );
}
