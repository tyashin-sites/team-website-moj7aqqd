'use client';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface Office {
  location: string;
  phone?: string;
  whatsapp?: string;
  description?: string;
}

interface GlobalOfficesData {
  title: string;
  subtitle?: string;
  offices: Office[];
}

interface GlobalOfficesProps {
  data: GlobalOfficesData;
}

export function GlobalOffices({ data }: GlobalOfficesProps) {
  const { title, subtitle, offices } = data;

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
          {subtitle && (
            <p className="text-xl text-muted max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {offices.map((office, index) => (
            <motion.div key={office.location} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {office.location}
                      </h3>
                      {office.description && (
                        <p className="text-muted text-sm mt-1">
                          {office.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {office.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-muted" />
                        <a
                          href={`tel:${office.phone}`}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {office.phone}
                        </a>
                      </div>
                    )}
                    
                    {office.whatsapp && (
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-4 h-4 text-muted" />
                        <a
                          href={`https://wa.me/${office.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          WhatsApp
                        </a>
                      </div>
                    )}
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