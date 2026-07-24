/**
 * SectionHeading — eyebrow + title + lead per DESIGN-SPEC §7.
 * Left-aligned by default; centered ONLY on CTA bands (`center` prop).
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
  dark = false,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        'max-w-3xl',
        center ? 'mx-auto text-center' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`tt-1 ${dark ? 'text-paper' : 'text-foreground'}`}>{title}</h2>
      {lead && (
        <p className={`lead ${dark ? 'text-muted-dark' : ''}`} style={dark ? { color: 'var(--brand-muted-dark)' } : undefined}>
          {lead}
        </p>
      )}
    </div>
  );
}
