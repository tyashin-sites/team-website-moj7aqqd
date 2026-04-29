interface HeroMinimalProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export function HeroMinimal({ title, subtitle }: HeroMinimalProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 text-center">
        {title && (
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export default HeroMinimal;
