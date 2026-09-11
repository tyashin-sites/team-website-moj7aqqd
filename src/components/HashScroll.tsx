'use client';

/**
 * HashScroll — makes `#anchor` navigation reliable.
 *
 * Deep links like /platform#analytics were landing at the top of the page
 * for two reasons: (1) the page segment streams in behind loading.tsx, so
 * when this layout-level effect first runs the target section may not exist
 * yet; (2) native smooth scrolls were being cancelled by ScrollTrigger's
 * refresh. This watches the DOM for the target, scrolls via the per-frame
 * tween once it appears, re-applies after late layout settles (yielding to
 * any user scroll), and handles in-page hash changes too.
 *
 * All scrolling goes through motion/scroll.ts (a per-frame tween that a
 * ScrollTrigger refresh cannot cancel); the header offset comes from each
 * section's own `scroll-mt-*`.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToLocationHash, smoothScrollToElement } from '@/components/motion/scroll';

const scrollToHash = () => { scrollToLocationHash(); };

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) return;
    // The page segment streams in behind loading.tsx, so the target may not
    // exist when this layout-level effect runs: watch the DOM until it does,
    // then re-apply once after late layout (posters, fonts) settles — unless
    // the visitor has started scrolling themselves.
    let found = false;
    let userScrolled = false;
    const markUser = () => { userScrolled = true; };
    const userEvents: (keyof WindowEventMap)[] = ['wheel', 'touchstart', 'keydown'];
    userEvents.forEach((ev) => window.addEventListener(ev, markUser, { passive: true }));
    const timers: number[] = [];
    const attempt = () => {
      if (found || userScrolled) return;
      if (scrollToLocationHash()) {
        found = true;
        observer.disconnect();
        timers.push(window.setTimeout(() => { if (!userScrolled) scrollToLocationHash(); }, 700));
        const onLoad = () => timers.push(window.setTimeout(() => { if (!userScrolled) scrollToLocationHash(); }, 100));
        if (document.readyState === 'complete') onLoad();
        else window.addEventListener('load', onLoad, { once: true });
      }
    };
    const observer = new MutationObserver(attempt);
    observer.observe(document.body, { childList: true, subtree: true });
    attempt();
    const giveUp = window.setTimeout(() => observer.disconnect(), 15000);
    return () => {
      observer.disconnect();
      window.clearTimeout(giveUp);
      timers.forEach((t) => window.clearTimeout(t));
      userEvents.forEach((ev) => window.removeEventListener(ev, markUser));
    };
  }, [pathname]);

  // In-page anchors (`<a href="#studio">`): take over from the native jump so
  // the scroll can't be cancelled, then record the hash.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = decodeURIComponent(a.getAttribute('href')!.slice(1));
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      smoothScrollToElement(el);
      history.pushState(null, '', `#${id}`);
    };
    const onHash = () => scrollToHash();
    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', onHash);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  return null;
}
