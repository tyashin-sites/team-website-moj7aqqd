'use client';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface MissionData {
  title: string;
  mission: string;
  vision: string;
}

interface MissionProps {
  data: MissionData;
}

export function Mission({ data }: MissionProps) {
  const { title, mission, vision } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Our Mission
                </h3>
                <p className="text-muted leading-relaxed">
                  {mission}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Our Vision
                </h3>
                <p className="text-muted leading-relaxed">
                  {vision}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}