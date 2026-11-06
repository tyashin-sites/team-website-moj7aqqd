'use client';

import { useState, type FormEvent } from 'react';
import { FormField, inputClass } from './FormField';
import {
  GRIEVANCE_CATEGORIES,
  GRIEVANCE_COPY,
  GRIEVANCE_EMAIL,
  findGrievanceCategory,
  type GrievanceLang,
} from '@/lib/grievance';

/** Complaint form for the Grievance Officer page (IT Rules 3(2)). Posts to /api/grievance. */
export function GrievanceForm({ lang = 'en' }: { lang?: GrievanceLang }) {
  const t = GRIEVANCE_COPY[lang];
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ reference: string | null; clock: string }>({ reference: null, clock: '' });
  // Time-trap for the Contact Form plugin: submissions < 2 s after render are treated as spam.
  // Set at first render (on the client during hydration), so a fast submit never sends 0.
  const [renderedAt] = useState(() => Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const categoryId = String(fd.get('category') ?? '');
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/grievance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(fd.entries()), lang, renderedAt }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string | null; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || '');
      setResult({ reference: data.reference ?? null, clock: findGrievanceCategory(categoryId)?.clock[lang] ?? '' });
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : '');
    }
  }

  if (status === 'done') {
    return (
      <div className="card mt-6 p-8" role="status" aria-live="polite" lang={lang}>
        <p className="eyebrow">{t.doneTitle}</p>
        {result.reference && (
          <p className="mt-3 text-foreground">
            {t.reference}: <strong>{result.reference}</strong>
          </p>
        )}
        {result.clock && <p className="mt-2 text-foreground/70">{t.doneClock(result.clock)}</p>}
        <p className="mt-2 text-sm text-foreground/60">
          {t.doneEmail} <a href={`mailto:${GRIEVANCE_EMAIL}`} className="underline hover:text-primary">{GRIEVANCE_EMAIL}</a>
        </p>
      </div>
    );
  }

  return (
    <form method="post" action="/api/grievance" onSubmit={onSubmit} lang={lang} className="relative mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
      <p className="text-sm text-foreground/70 md:col-span-2">{t.intro}</p>
      <FormField label={t.name} htmlFor="g-name">
        <input id="g-name" name="name" required maxLength={100} autoComplete="name" placeholder=" " className={inputClass} />
      </FormField>
      <FormField label={t.email} htmlFor="g-email">
        <input id="g-email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder=" " className={inputClass} />
      </FormField>
      <FormField label={t.category} htmlFor="g-category" className="md:col-span-2" raised>
        <select id="g-category" name="category" required defaultValue="" className={inputClass}>
          <option value="" disabled>…</option>
          {GRIEVANCE_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.label[lang]}</option>
          ))}
        </select>
      </FormField>
      <div className="md:col-span-2">
        <FormField label={`${t.contentUrl} (${t.optional})`} htmlFor="g-url">
          <input id="g-url" name="contentUrl" type="url" maxLength={500} placeholder=" " className={inputClass} />
        </FormField>
        <p className="mt-2 text-sm text-foreground/60">{t.contentUrlHint}</p>
      </div>
      <FormField label={t.message} htmlFor="g-message" className="md:col-span-2">
        <textarea id="g-message" name="message" required maxLength={5000} rows={5} placeholder=" " className={inputClass} />
      </FormField>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="md:col-span-2">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? t.sending : t.submit}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-sm text-danger md:col-span-2" role="alert">
          {error || t.error} {!error && <a href={`mailto:${GRIEVANCE_EMAIL}`} className="underline">{GRIEVANCE_EMAIL}</a>}
        </p>
      )}
    </form>
  );
}
