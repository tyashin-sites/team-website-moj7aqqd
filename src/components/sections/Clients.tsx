'use client';
import { motion } from 'framer-motion';

interface ClientsData {
  title: string;
  subtitle?: string;
}

interface ClientsProps {
  data: ClientsData;
}

// Sample integration logos - in a real app, these would be actual logo URLs
const integrations = [
  { name: 'Shopify', logo: '/logos/shopify.svg' },
  { name: 'WooCommerce', logo: '/logos/woocommerce.svg' },
  { name: 'Magento', logo: '/logos/magento.svg' },
  { name: 'BigCommerce', logo: '/logos/bigcommerce.svg' },
  { name: 'Squarespace', logo: '/logos/squarespace.svg' },
  { name: 'Wix', logo: '/logos/wix.svg' },
  { name: 'PrestaShop', logo: '/logos/prestashop.svg' },
  { name: 'OpenCart', logo: '/logos/opencart.svg' },
];

export function Clients({ data }: ClientsProps) {
  const { title, subtitle } = data;

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
          {subtitle && (
            <p className="text-xl text-muted max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600 text-center">
                  {integration.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted">
            And many more platforms through our flexible API
          </p>
        </motion.div>
      </div>
    </section>
  );
}