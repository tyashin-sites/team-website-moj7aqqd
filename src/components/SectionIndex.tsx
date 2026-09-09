'use client';

/**
 * SectionIndex — slim sticky wayfinding for the long pages (luxury pass,
 * editorial restraint track).
 *
 * Renders the same list twice: a fixed left-edge rail of hairline ticks on
 * xl+ and a slim chip strip pinned under the header on smaller screens
 * (styles: .section-index / .section-index-bar in globals.css). Scrollspy is
 * ScrollTrigger-driven — one trigger per target section spanning the
 * viewport's middle band, plus one visibility window from the first target
 * to the last so the index is absent over the hero and the closing CTA.
 *
 * Purely state-based (class toggles), so it runs for reduced-motion visitors
 * too; only the scroll-to on click respects the preference (instant jump).
 * Targets are addressed by id — sections must carry `id` + `scroll-mt-*`.
 */

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, useGSAP, reduced } from '@/components/motion/gsap';

export type SectionIndexItem = { id: string; label: string };

export function SectionIndex({ items }: { items: SectionIndexItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const targets = items
        .map((it) => ({ ...it, el: document.getElementById(it.id) }))
        .filter((t): t is SectionIndexItem & { el: HTMLElement } => Boolean(t.el));
      if (targets.length === 0) return;

      targets.forEach((t) => {
        ScrollTrigger.create({
          trigger: t.el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActive(t.id);
          },
        });
      });

      ScrollTrigger.create({
        trigger: targets[0].el,
        start: 'top 70%',
        endTrigger: targets[targets.length - 1].el,
        end: 'bottom 35%',
        onToggle: (self) => setVisible(self.isActive),
      });
    },
    { dependencies: [items] }
  );

  // Keep the active chip in view on the mobile strip.
  useEffect(() => {
    if (!active || !barRef.current) return;
    const chip = barRef.current.querySelector<HTMLElement>(`a[href="#${active}"]`);
    chip?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced() ? 'auto' : 'smooth' });
  }, [active]);

  const onJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };

  const list = (
    <ol>
      {items.map((it) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            onClick={(e) => onJump(e, it.id)}
            aria-current={active === it.id ? 'location' : undefined}
          >
            <span className="label">{it.label}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <nav
        aria-label="On this page"
        className={`section-index${visible ? ' is-visible' : ''}`}
        aria-hidden={!visible}
      >
        {list}
      </nav>
      <nav
        ref={barRef}
        aria-label="On this page"
        className={`section-index-bar${visible ? ' is-visible' : ''}`}
        aria-hidden={!visible}
      >
        {list}
      </nav>
    </>
  );
}
