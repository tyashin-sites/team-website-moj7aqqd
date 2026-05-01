import Link from 'next/link';
import type { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'ghost';
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
}

export function Button({ href, variant = 'primary', children, className = '', type = 'button' }: ButtonProps) {
  const cls = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls}>
      {children}
    </button>
  );
}
