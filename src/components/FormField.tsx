import type { ReactNode } from 'react';

/**
 * FormField — shared form styling per DESIGN-SPEC §4/§7, floating-label
 * edition (luxury pass). The label rests inside the field and floats to a
 * small-caps eyebrow on focus or once a value exists; the pink
 * :focus-visible ring is untouched and the border warms to teal on focus.
 * Styles live in globals.css (.field, .field-control, .field-label).
 *
 * Controls MUST render with `placeholder=" "` (a single space) so the
 * :placeholder-shown float logic works; pass `raised` for selects, whose
 * label always sits raised. Autofill attributes are the caller's
 * responsibility (mandatory per spec).
 */

export const inputClass = 'field-control';

export function FormField({
  label,
  htmlFor,
  className,
  raised = false,
  children,
}: {
  label: string;
  htmlFor?: string;
  className?: string;
  /** Keep the label raised permanently (selects, pre-filled controls). */
  raised?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`field${raised ? ' is-raised' : ''}${className ? ` ${className}` : ''}`}>
      {children}
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
    </div>
  );
}
