'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface Industry {
  name: string;
  description?: string;
  useCases?: string[];
}

interface IndustriesData {
  title: string;
  industries: Industry[] | string[];
  variant?: 'carousel' | 'grid';
}

interface IndustriesProps {
  data: IndustriesData;
}

export function Industries({ data }: IndustriesProps) {
  const { title, industries, variant = 'carousel' } = data;

  // Normalize industries data
  const normalizedIndustries = industries.map((industry) => 
    typeof industry === 'string' ? { name: industry } : industry
  );

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

  if (variant === 'grid') {
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
            {normalizedIndustries.map((industry, index) => (
              <motion.div key={industry.name} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      {industry.name}
                    </h3>
                    {industry.description && (
                      <p className="text-muted mb-4">
                        {industry.description}
                      </p>
                    )}
                    {industry.useCases && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Use Cases:</h4>
                        <ul className="space-y-1">
                          {industry.useCases.map((useCase, useCaseIndex) => (
                            <li key={useCaseIndex} className="flex items-center gap-2 text-sm text-muted">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {normalizedIndustries.map((industry, index) => (
            <motion.div key={industry.name} variants={itemVariants}>
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {industry.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {industry.name}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}