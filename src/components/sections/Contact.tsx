'use client';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { ContactForm } from '../forms/ContactForm';

interface Office {
  location: string;
  phone?: string;
  whatsapp?: string;
  email: string;
}

interface ContactData {
  offices: Office[];
  form: {
    fields: string[];
    submitText: string;
  };
}

interface ContactProps {
  data: ContactData;
}

export function Contact({ data }: ContactProps) {
  const { offices, form } = data;

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
              Our Offices
            </h2>
            
            <div className="space-y-6">
              {offices.map((office, index) => (
                <motion.div key={office.location} variants={itemVariants}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-foreground">
                          {office.location}
                        </h3>
                      </div>
                      
                      <div className="space-y-3 ml-10">
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
                        
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted" />
                          <a
                            href={`mailto:${office.email}`}
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            {office.email}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                <ContactForm fields={form.fields} submitText={form.submitText} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}