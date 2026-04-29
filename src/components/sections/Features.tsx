'use client';
import { motion } from 'framer-motion';
import { Eye, Settings, Smartphone, Sparkles, Database, Code } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface Feature {
  title: string;
  description: string;
  benefits?: string[];
}

interface FeaturesData {
  title: string;
  features: Feature[];
  variant?: 'grid' | 'detailed';
}

interface FeaturesProps {
  data: FeaturesData;
}

const iconMap = {
  '3D 360° Product Viewer': Eye,
  'Real-Time 3D Product Configurator': Settings,
  'Real-Time 3D Configurator': Settings,
  'App-Free AR Viewer': Smartphone,
  'AI Visuals & Content Creation': Sparkles,
  'AI Visuals & Content': Sparkles,
  '3D Digital Asset Management': Database,
  'Digital Asset Management': Database,
  'No-Code Integration': Code,
};

export function Features({ data }: FeaturesProps) {
  const { title, features, variant = 'grid' } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (variant === 'detailed') {
    return (
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {title}
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {features.map((feature, index) => {
              const Icon = iconMap[feature.title as keyof typeof iconMap] || Sparkles;
              
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-muted text-lg mb-6">
                      {feature.description}
                    </p>
                    {feature.benefits && (
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center gap-2 text-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={`bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg aspect-video flex items-center justify-center ${
                    index % 2 === 1 ? 'lg:col-start-1' : ''
                  }`}>
                    <Icon className="w-16 h-16 text-primary/50" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {title}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.title as keyof typeof iconMap] || Sparkles;
            
            return (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}