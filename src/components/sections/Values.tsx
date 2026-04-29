'use client';
import { motion } from 'framer-motion';
import { Lightbulb, Users, TrendingUp, Globe } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface Value {
  title: string;
  description: string;
}

interface ValuesData {
  title: string;
  values: Value[];
}

interface ValuesProps {
  data: ValuesData;
}

const iconMap = {
  Innovation: Lightbulb,
  Accessibility: Users,
  Results: TrendingUp,
  'Global Impact': Globe,
};

export function Values({ data }: ValuesProps) {
  const { title, values } = data;

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => {
            const Icon = iconMap[value.title as keyof typeof iconMap] || Lightbulb;
            
            return (
              <motion.div key={value.title} variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {value.description}
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