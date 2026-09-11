"use client";

/**
 * FaqExplorer — the interactive body of /faq.
 *
 * UX contract (why it's built this way):
 *  - Instant search ("/" focuses it) across question + answer text; while a
 *    query is active, results flatten into one ranked list with the category
 *    shown as a kicker on each hit, and matched questions render open so the
 *    answer is immediately visible.
 *  - Category pills filter without scrolling the page away; counts stay
 *    honest per filter state.
 *  - Every question is deep-linkable (#<slug>). Landing on a hash opens that
 *    question, and each open answer offers a copy-link action so people can
 *    share the exact answer.
 *  - No-JS / pre-hydration: the server renders every category and question as
 *    plain <details> — content is never hidden behind hydration.
 *
 * SEO note: the FAQPage JSON-LD lives in the server page (page.tsx), not
 * here — this component is presentation only.
 */

import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { ArrowRight, Check, Link2, MessageCircle, Search, X } from "lucide-react";
import { FAQ_CATEGORIES, type Faq } from "@/lib/faq";

/* ── helpers ──────────────────────────────────────────────────────────── */

const norm = (s: string) => s.toLowerCase().normalize("NFKD");

/** Rank a FAQ against a query: 0 = no match; higher = better. */
function score(f: Faq, q: string): number {
  if (!q) return 1;
  const nq = norm(q);
  const inQ = norm(f.q).indexOf(nq);
  if (inQ === 0) return 100;
  if (inQ > 0) return 60;
  if (norm(f.a).includes(nq)) return 30;
  // All words present across q+a (order-free) still counts.
  const hay = `${norm(f.q)} ${norm(f.a)}`;
  const words = nq.split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.every((w) => hay.includes(w))) return 15;
  return 0;
}

function useHashTarget(): string {
  const [target, setTarget] = useState("");
  useEffect(() => {
    const read = () => setTarget(decodeURIComponent(window.location.hash.slice(1)));
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  return target;
}

/* ── single Q&A row ───────────────────────────────────────────────────── */

function FaqItem({
  faq,
  kicker,
  forceOpen,
}: {
  faq: Faq;
  kicker?: string;
  forceOpen?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);

  // A hash landing (or a search hit) opens the row without stealing the
  // user's own toggle afterwards — `open` is only forced while the flag holds.
  useEffect(() => {
    if (forceOpen && ref.current) ref.current.open = true;
  }, [forceOpen]);

  const copy = async () => {
    try {
      const url = `${window.location.origin}/faq#${faq.id}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the anchor link below still works */
    }
  };

  return (
    <details ref={ref} id={faq.id} className="group py-5 scroll-mt-32">
      <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
        <span>
          {kicker && (
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80 mb-1">
              {kicker}
            </span>
          )}
          <span className="font-heading text-lg font-semibold tracking-tight">
            {faq.q}
          </span>
        </span>
        <ArrowRight
          className="mt-1.5 w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-open:rotate-90"
          aria-hidden
        />
      </summary>
      <div className="mt-3 max-w-2xl">
        <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {faq.links?.map((l) =>
            l.href.startsWith("http") ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
              >
                {l.label}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden />
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
              >
                {l.label}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden />
              </Link>
            )
          )}
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm text-foreground/50 hover:text-primary transition-colors"
            aria-label={`Copy a direct link to “${faq.q}”`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden /> Link copied
              </>
            ) : (
              <>
                <Link2 className="w-3.5 h-3.5" aria-hidden /> Copy link
              </>
            )}
          </button>
        </div>
      </div>
    </details>
  );
}

/* ── the explorer ─────────────────────────────────────────────────────── */

export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [category, setCategory] = useState<string>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const hashTarget = useHashTarget();

  // "/" focuses search from anywhere on the page (unless already typing).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // A hash pointing at a question inside a filtered-out category must win —
  // reset the filter so the target is in the DOM for HashScroll to reach.
  useEffect(() => {
    if (!hashTarget) return;
    const owner = FAQ_CATEGORIES.find((c) => c.faqs.some((f) => f.id === hashTarget));
    if (owner && category !== "all" && category !== owner.id) setCategory("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashTarget]);

  const searching = deferredQuery.trim().length > 0;

  const results = useMemo(() => {
    if (!searching) return [];
    return FAQ_CATEGORIES.flatMap((c) =>
      c.faqs.map((f) => ({ faq: f, cat: c, s: score(f, deferredQuery.trim()) }))
    )
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s);
  }, [deferredQuery, searching]);

  const visibleCategories =
    category === "all"
      ? FAQ_CATEGORIES
      : FAQ_CATEGORIES.filter((c) => c.id === category);

  const total = FAQ_CATEGORIES.reduce((n, c) => n + c.faqs.length, 0);

  return (
    <div>
      {/* Controls — sticky so the filter travels with the reader. */}
      <div className="sticky top-16 md:top-20 z-30 -mx-4 px-4 py-3 bg-background/85 backdrop-blur-md border-b border-foreground/10">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <label className="relative flex-1 max-w-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40"
              aria-hidden
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${total} answers…  ( / )`}
              aria-label="Search frequently asked questions"
              className="w-full rounded-full border border-foreground/15 bg-background pl-11 pr-10 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" aria-hidden />
              </button>
            )}
          </label>

          <div
            className="flex gap-2 overflow-x-auto md:overflow-visible md:flex-wrap pb-1 md:pb-0"
            role="tablist"
            aria-label="FAQ categories"
          >
            {[{ id: "all", label: "All" }, ...FAQ_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))].map(
              (c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={category === c.id && !searching}
                  onClick={() => {
                    setCategory(c.id);
                    setQuery("");
                  }}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors border ${
                    category === c.id && !searching
                      ? "bg-primary text-paper border-primary"
                      : "border-foreground/15 text-foreground/70 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {c.label}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      {searching ? (
        <div className="mt-6">
          <p className="text-sm text-foreground/50" aria-live="polite">
            {results.length === 0
              ? "No matching answers"
              : `${results.length} answer${results.length === 1 ? "" : "s"} for “${deferredQuery.trim()}”`}
          </p>
          {results.length === 0 ? (
            <div className="card mt-6 p-8 md:p-10 max-w-2xl">
              <p className="font-heading text-xl font-semibold tracking-tight">
                We haven't written that one down yet.
              </p>
              <p className="mt-3 text-foreground/70 leading-relaxed">
                The assistant in the corner of this page is trained on
                everything here and more — ask it directly, or send the
                question to a human.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  <MessageCircle className="w-4 h-4" aria-hidden />
                  Ask a human
                </Link>
                <button type="button" onClick={() => setQuery("")} className="btn-ghost">
                  Browse all questions
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-2 divide-y divide-foreground/10 border-t border-foreground/10">
              {results.map((r) => (
                <FaqItem
                  key={r.faq.id}
                  faq={r.faq}
                  kicker={r.cat.label}
                  forceOpen={results.length <= 4}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 space-y-14">
          {visibleCategories.map((c) => (
            <section key={c.id} id={`c-${c.id}`} className="scroll-mt-32">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-4 lg:sticky lg:top-40">
                  <p className="eyebrow">{c.label}</p>
                  <p className="mt-3 text-foreground/60 leading-relaxed max-w-xs">
                    {c.blurb}
                  </p>
                  <p className="mt-2 tt-mono text-sm text-foreground/40">
                    {c.faqs.length} questions
                  </p>
                </div>
                <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
                  {c.faqs.map((f) => (
                    <FaqItem key={f.id} faq={f} forceOpen={hashTarget === f.id} />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
