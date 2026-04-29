import Link from 'next/link';

interface Plan {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  ctaUrl?: string;
  popular?: boolean;
}

interface PricingPlansProps {
  title?: string;
  subtitle?: string;
  plans?: Plan[];
  children?: React.ReactNode;
  className?: string;
}

export function PricingPlans({ title, subtitle, plans = [] }: PricingPlansProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`p-8 rounded-xl border-2 ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}>
              {plan.popular && <div className="text-center mb-4"><span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">Most Popular</span></div>}
              <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted">/{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-muted">
                    <span className="text-primary">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <Link href={plan.ctaUrl || '#'} className="block w-full text-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingPlans;
