import type { ReactNode } from 'react';

/**
 * FormField — shared form styling per DESIGN-SPEC §4/§7.
 * 12px input radius, ink text, pink focus ring via global :focus-visible.
 * Autofill attributes are the caller's responsibility (mandatory per spec).
 */

export const inputClass =
  'w-full rounded-md bg-paper border border-foreground/10 px-4 py-3.5 text-foreground ' +
  'placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors duration-150';

export function FormField({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold tracking-wider uppercase text-foreground/60 mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
