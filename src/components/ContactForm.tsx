'use client';

import { useState } from 'react';
import { FormField, inputClass } from './FormField';

const CALENDLY_URL = 'https://calendly.com/hello-thridify/30min';

const INDUSTRIES = [
  'Furniture',
  'Modular Kitchens',
  'Automotive',
  'Doors & Windows',
  'Pre-schools',
  'Personalized Retail',
  'Industrial Machinery',
  'Other',
];

type Status = 'idle' | 'sending' | 'success' | 'error';

/**
 * Contact form — posts to /api/contact (BUILD-PLAN Phase 0 pipeline).
 * Replaces the old mailto: form. On success, offers an inline Calendly link.
 */
export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

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
          industry: fd.get('industry'),
          message: fd.get('message'),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  if (status === 'success') {
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
            onClick={() => setStatus('idle')}
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
      onSubmit={handleSubmit}
      autoComplete="on"
      className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <FormField label="Full name" htmlFor="contact-name" className="md:col-span-1">
        <input
          id="contact-name"
          required
          name="name"
          type="text"
          autoComplete="name"
          className={inputClass}
          placeholder="Jane Doe"
        />
      </FormField>
      <FormField label="Work email" htmlFor="contact-email" className="md:col-span-1">
        <input
          id="contact-email"
          required
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          placeholder="jane@brand.com"
        />
      </FormField>
      <FormField label="Company" htmlFor="contact-company" className="md:col-span-1">
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          className={inputClass}
          placeholder="Acme Furniture"
        />
      </FormField>
      <FormField label="Industry" htmlFor="contact-industry" className="md:col-span-1">
        <select id="contact-industry" name="industry" defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select an industry
          </option>
          {INDUSTRIES.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="How can we help?" htmlFor="contact-message" className="md:col-span-2">
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your products and what you'd like to achieve..."
        />
      </FormField>
      <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p className="text-sm text-foreground/60">
          Or email us directly at{' '}
          <a href={`mailto:${fallbackEmail}`} className="underline hover:text-primary">
            {fallbackEmail}
          </a>
        </p>
      </div>
      {status === 'error' && (
        <p className="md:col-span-2 text-sm text-red-700" role="alert">
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
