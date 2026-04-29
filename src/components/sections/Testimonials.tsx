'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface TestimonialsData {
  title: string;
}

interface TestimonialsProps {
  data: TestimonialsData;
}

// Sample testimonials - in a real app, these would come from the API or content
const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'E-commerce Director',
    company: 'FurniCraft',
    content: 'Thridify transformed our online furniture store. Customers can now visualize products in their homes before buying, reducing returns by 60%.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    title: 'Marketing Manager',
    company: 'AutoParts Pro',
    content: 'The 3D configurator helped us showcase complex automotive parts. Our conversion rate increased by 45% within the first month.',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    title: 'Founder',
    company: 'Kitchen Dreams',
    content: 'Our modular kitchen business saw incredible growth after implementing Thridify. Customers love designing their kitchens in real-time.',
    rating: 5,
  },
];

export function Testimonials({ data }: TestimonialsProps) {
  const { title } = data;

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
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  
                  <p className="text-muted mb-6 leading-relaxed">
                    {testimonial.content}
                  </p>
                  
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted">
                      {testimonial.title} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}