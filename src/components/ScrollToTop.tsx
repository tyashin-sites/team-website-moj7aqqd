'use client';

/**
 * ScrollToTop — a quiet hairline ring (bottom-right) that surfaces once the
 * visitor is ~1.5 viewports down and hides again near the top. Sitewide, in
 * the root layout. Smooth scroll unless the visitor prefers reduced motion.
 * The visual lives in globals.css (.scroll-top); this only flips the class.
 */

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { smoothScrollTo } from '@/components/motion/scroll';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVisible(window.scrollY > window.innerHeight * 1.5));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => smoothScrollTo(0)}
      className={`scroll-top${visible ? ' is-visible' : ''}`}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ArrowUp className="w-4 h-4" strokeWidth={1.75} aria-hidden />
    </button>
  );
}
