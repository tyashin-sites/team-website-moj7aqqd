'use client';

/**
 * MobileNav — the ink curtain (luxury pass).
 *
 * The panel is PORTALLED to <body>. The sticky header carries backdrop-blur,
 * and a `backdrop-filter` ancestor becomes the containing block for
 * position:fixed descendants — so a fixed panel rendered inside the header
 * only ever covered the 72px bar and its links spilled over the page with
 * no background (the production bug this replaces).
 *
 * Choreography (GSAP, 'brand' ease; nothing runs under reduced motion):
 *   open  — the ink curtain wipes down (clip-path), the links rise and
 *           settle into focus one after another, the CTA lands last.
 *   close — the reverse, faster, then the panel unmounts.
 * The links are display type with index numerals and hairlines — the same
 * editorial vocabulary as the 404 index and the section rail.
 *
 * A11y: aria-expanded/controls on the trigger, role=dialog + aria-modal on
 * the panel, Escape closes, focus moves to the first link on open and back
 * to the trigger on close, body scroll is locked while open.
 */

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP, reduced } from '@/components/motion/gsap';

interface NavItem { label: string; href: string }

export function MobileNav({ nav, ctaText, ctaHref }: { nav: NavItem[]; ctaText: string; ctaHref: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => setMounted(true), []);

  // Body scroll lock while the curtain is down.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = useCallback(() => {
    if (!open || closing) return;
    if (tl.current && !reduced()) {
      setClosing(true);
      tl.current.timeScale(2.4).reverse().eventCallback('onReverseComplete', () => {
        setOpen(false);
        setClosing(false);
        triggerRef.current?.focus();
      });
    } else {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }, [open, closing]);

  // Escape closes (keyboard accessibility).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Entrance choreography — runs when the panel mounts.
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!open || !panel) return;
      const links = panel.querySelectorAll<HTMLElement>('[data-nav-item]');
      const tail = panel.querySelectorAll<HTMLElement>('[data-nav-tail]');
      (links[0]?.querySelector('a') as HTMLElement | null)?.focus({ preventScroll: true });
      if (reduced()) return;
      const t = gsap.timeline({ defaults: { ease: 'brand' } });
      t.fromTo(panel, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7 }, 0);
      t.from(links, { y: 36, opacity: 0, filter: 'blur(8px)', duration: 0.8, stagger: 0.07, clearProps: 'filter' }, 0.18);
      t.from(tail, { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.55);
      tl.current = t;
      return () => { tl.current = null; };
    },
    { dependencies: [open], scope: panelRef as React.RefObject<HTMLElement> }
  );

  const panel = open ? (
    <div
      ref={panelRef}
      id="mobile-nav-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="on-dark fixed inset-0 z-[70] md:hidden bg-ink text-paper overflow-y-auto grain"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div className="absolute inset-0 opacity-40 aurora pointer-events-none" aria-hidden />
      <div className="relative min-h-full flex flex-col px-6 pt-4 pb-8" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
        {/* Top bar mirrors the header: wordmark + close. */}
        <div className="h-[72px] flex items-center justify-between">
          <span className="font-heading text-lg font-medium tracking-tight text-paper">Menu</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-paper/25 text-paper"
          >
            <span className="relative block w-5 h-3" aria-hidden>
              <span className="absolute left-0 top-1/2 w-full h-px bg-paper rotate-45" />
              <span className="absolute left-0 top-1/2 w-full h-px bg-paper -rotate-45" />
            </span>
          </button>
        </div>

        <nav aria-label="Primary" className="mt-6">
          <ol className="divide-y divide-paper/10 border-t border-paper/10">
            {nav.map((item, i) => (
              <li key={item.href} data-nav-item>
                <Link
                  href={item.href}
                  onClick={close}
                  className="group flex items-baseline gap-5 py-4 transition-micro hover:pl-1"
                >
                  <span className="tt-mono text-primary-soft w-7 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 font-heading text-[2rem] leading-none font-medium tracking-tight text-paper">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="w-5 h-5 shrink-0 self-center text-primary-soft transition-micro group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-auto pt-10">
          <div data-nav-tail className="hairline mb-6" aria-hidden />
          <a
            data-nav-tail
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="btn btn-primary w-full justify-center py-4 text-base"
          >
            {ctaText}
          </a>
          <p data-nav-tail className="mt-4 text-center text-xs text-muted-dark">
            No code. No app. No friction.
          </p>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => (open ? close() : setOpen(true))}
        className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-border"
      >
        <span className="relative block w-5 h-3" aria-hidden>
          <span className={`absolute left-0 top-0 w-full h-px bg-foreground transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
          <span className={`absolute left-0 bottom-0 w-full h-px bg-foreground transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
        </span>
      </button>
      {mounted && panel ? createPortal(panel, document.body) : null}
    </>
  );
}
