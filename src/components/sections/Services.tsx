interface Service {
  title: string;
  description: string;
  icon?: string;
}

interface ServicesProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
  children?: React.ReactNode;
  className?: string;
}

export function Services({ title, subtitle, services = [] }: ServicesProps) {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="p-8 bg-white rounded-xl shadow-sm border border-border hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
