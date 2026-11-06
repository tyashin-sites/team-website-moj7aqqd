'use client';

/**
 * ConciergeForm — DESIGN-SPEC §8 Contact blueprint: a 2-field concierge
 * starter (email + product category) that expands into the full form after
 * the first step. Nothing is sent until the full form submits — step one is
 * purely a low-friction on-ramp. Posts to /api/contact (Phase 0 pipeline),
 * which accepts the `category` field. Autofill attributes are mandatory
 * (DESIGN-SPEC §7 FormField note).
 */

import { useState } from 'react';
import { FormField, inputClass } from './FormField';
import { homeContent } from '@/lib/content';
import { getAttribution } from '@/lib/attribution';
import { calendlyHref } from '@/lib/calendly';

const CALENDLY_URL = calendlyHref('contact');

// Product categories come from the same content source as the home
// verticals grid — one list, no drift.
const CATEGORIES = [
  ...homeContent.verticals.items.map((v) => v.name),
  'Other',
];

// Attribution policy §9: the same question and options on Calendly, this
// form and admin onboarding. Optional — a required field costs leads. The
// answer is sent verbatim; the mapping to a source happens downstream.
const HOW_HEARD_OTHER = 'Other';
const HOW_HEARD = [
  'LinkedIn',
  'Instagram',
  'Facebook',
  'Quora',
  'Google or another search engine',
  'An AI assistant (ChatGPT, Perplexity, …)',
  'An email from us',
  'WhatsApp',
  'Shopify / BigCommerce / WordPress app store',
  'A partner or agency',
  'A friend or colleague',
  'A design school, event or competition',
  HOW_HEARD_OTHER,
];

type Status = 'idle' | 'sending' | 'error';

export function ConciergeForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [expanded, setExpanded] = useState(false);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [howHeard, setHowHeard] = useState('');

  function handleContinue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setExpanded(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          company: fd.get('company'),
          category: fd.get('category'),
          message: fd.get('message'),
          howHeard: fd.get('howHeard') || undefined,
          howHeardOther: howHeard === HOW_HEARD_OTHER ? fd.get('howHeardOther') || undefined : undefined,
          attribution: getAttribution() ?? undefined,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong');
      setDone(true);
      setStatus('idle');
      setHowHeard('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (done) {
    return (
      <div className="mt-10 card p-8 md:p-10" role="status" aria-live="polite">
        <p className="eyebrow">Message received</p>
        <h3 className="tt-2 mt-2">Thank you — we&rsquo;ll reply within one business day.</h3>
        <p className="text-foreground/70 leading-relaxed">
          Want to skip the wait? Grab a slot with the team right now:
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book a 30-minute demo
          </a>
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setExpanded(false);
            }}
            className="text-sm font-medium underline text-foreground/70 hover:text-primary transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      method="post"
      action="/api/contact"
      onSubmit={expanded ? handleSubmit : handleContinue}
      autoComplete="on"
      className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {/* Step 1 — the 2-field concierge starter. Stays visible (and
          editable) after expanding. */}
      <FormField label="Work email" htmlFor="contact-email" className="md:col-span-1">
        <input
          id="contact-email"
          required
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          placeholder=" "
        />
      </FormField>
      <FormField label="What do you sell?" htmlFor="contact-category" className="md:col-span-1" raised>
        <select
          id="contact-category"
          required
          name="category"
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Select a category
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FormField>

      {/* Step 2 — revealed after Continue. */}
      {expanded && (
        <>
          <FormField label="Full name" htmlFor="contact-name" className="md:col-span-1">
            <input
              id="contact-name"
              required
              name="name"
              type="text"
              autoComplete="name"
              className={inputClass}
              placeholder=" "
            />
          </FormField>
          <FormField label="Company" htmlFor="contact-company" className="md:col-span-1">
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              className={inputClass}
              placeholder=" "
            />
          </FormField>
          <FormField
            label="How did you first hear about Thridify? (optional)"
            htmlFor="contact-how-heard"
            className={howHeard === HOW_HEARD_OTHER ? 'md:col-span-1' : 'md:col-span-2'}
            raised
          >
            <select
              id="contact-how-heard"
              name="howHeard"
              value={howHeard}
              onChange={(e) => setHowHeard(e.target.value)}
              className={inputClass}
            >
              <option value="">Prefer not to say</option>
              {HOW_HEARD.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </FormField>
          {howHeard === HOW_HEARD_OTHER && (
            <FormField label="Where did you hear about us?" htmlFor="contact-how-heard-other" className="md:col-span-1">
              <input
                id="contact-how-heard-other"
                name="howHeardOther"
                type="text"
                maxLength={200}
                className={inputClass}
                placeholder=" "
              />
            </FormField>
          )}
          <FormField label="Anything we should know?" htmlFor="contact-message" className="md:col-span-2">
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              className={inputClass}
              placeholder=" "
            />
          </FormField>
        </>
      )}

      <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending'
            ? 'Sending…'
            : expanded
              ? 'Request a Demo'
              : 'Continue'}
        </button>
        <p className="text-sm text-foreground/60">
          {expanded ? (
            <>
              Or email us directly at{' '}
              <a href={`mailto:${fallbackEmail}`} className="underline hover:text-primary">
                {fallbackEmail}
              </a>
            </>
          ) : (
            'Two fields to start — details come next.'
          )}
        </p>
      </div>
      {status === 'error' && (
        <p className="md:col-span-2 text-sm text-danger" role="alert">
          {error} — please try again, or email us at{' '}
          <a href={`mailto:${fallbackEmail}`} className="underline">
            {fallbackEmail}
          </a>
          .
        </p>
      )}
    </form>
  );
}
