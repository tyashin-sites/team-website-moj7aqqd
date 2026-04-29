import Link from 'next/link';

interface HeroSplitProps {
  title: string;
  subtitle?: string;
  primaryCTA?: { text: string; url: string };
  secondaryCTA?: { text: string; url: string };
  children?: React.ReactNode;
  className?: string;
}

export function HeroSplit({ title, subtitle, primaryCTA, secondaryCTA }: HeroSplitProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-muted mb-8 leading-relaxed">{subtitle}</p>
          )}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-wrap gap-4">
              {primaryCTA && (
                <Link
                  href={primaryCTA.url}
                  className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {primaryCTA.text}
                </Link>
              )}
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.url}
                  className="inline-flex items-center px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  {secondaryCTA.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSplit;
