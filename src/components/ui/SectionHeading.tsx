import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', children }: Props) {
  const isCenter = align === 'center';
  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <div className="eyebrow mb-5">{eyebrow}</div>}
      <h2 className="h-1 mb-6">{title}</h2>
      {subtitle && <p className="text-lg md:text-xl text-muted leading-relaxed">{subtitle}</p>}
      {children}
    </div>
  );
}
