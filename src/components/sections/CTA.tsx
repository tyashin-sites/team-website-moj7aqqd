'use client';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface CTAData {
  title: string;
  subtitle?: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

interface CTAProps {
  data: CTAData;
}

export function CTA({ data }: CTAProps) {
  const { title, subtitle, primaryCta, secondaryCta } = data;

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              href={primaryCta.href}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 min-w-[200px]"
            >
              {primaryCta.text}
            </Button>
            
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary min-w-[200px]"
              >
                {secondaryCta.text}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
    </section>
  );
}