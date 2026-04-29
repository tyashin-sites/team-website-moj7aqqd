'use client';
import { motion } from 'framer-motion';

interface AboutData {
  title: string;
  content: string;
}

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  const { title, content } = data;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-xl text-muted leading-relaxed">
              {content}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}