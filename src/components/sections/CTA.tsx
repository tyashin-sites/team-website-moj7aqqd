'use client';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface CTALink {
  text: string;
  href?: string;
  url?: string;
}

interface CTAData {
  title: string;
  subtitle?: string;
  primaryCta?: CTALink;
  secondaryCta?: CTALink;
}

interface CTAProps {
  data?: CTAData;
  title?: string;
  subtitle?: string;
  primaryCta?: CTALink;
  secondaryCta?: CTALink;
  primaryCTA?: CTALink;
  secondaryCTA?: CTALink;
}

export function CTA(props: CTAProps) {
  // Support both { data: { title, ... } } and { title, ... } prop patterns
  const title = props.data?.title || props.title || '';
  const subtitle = props.data?.subtitle || props.subtitle;
  const primaryCta = props.data?.primaryCta || props.primaryCta || props.primaryCTA;
  const secondaryCta = props.data?.secondaryCta || props.secondaryCta || props.secondaryCTA;

  if (!title) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            {title}
          </h2>

          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              {subtitle}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {primaryCta && (
                <Button
                  href={primaryCta.href || primaryCta.url || '#'}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 min-w-[200px]"
                >
                  {primaryCta.text}
                </Button>
              )}

              {secondaryCta && (
                <Button
                  href={secondaryCta.href || secondaryCta.url || '#'}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary min-w-[200px]"
                >
                  {secondaryCta.text}
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
    </section>
  );
}
