export function FAQ() {
  const faqs = [
    {
      question: 'What is Thridify?',
      answer: 'Thridify is a 3D and AR commerce platform that enables e-commerce businesses to showcase products with interactive 3D visualization and augmented reality experiences, helping reduce returns and increase conversions.',
    },
    {
      question: 'How does 3D product visualization work?',
      answer: 'Our 3D visualization technology allows customers to view products from every angle, zoom in on details, and interact with them in real-time. This immersive experience helps customers make more informed purchasing decisions.',
    },
    {
      question: 'What AR features does Thridify offer?',
      answer: 'Thridify provides AR try-on capabilities that let customers visualize products in their own environment before purchasing. This includes virtual fitting rooms, furniture placement, and product preview features.',
    },
    {
      question: 'Which platforms does Thridify support?',
      answer: 'Thridify integrates seamlessly with major e-commerce platforms including Shopify, WooCommerce, and custom implementations. We also support web and mobile applications.',
    },
    {
      question: 'How can I get started with Thridify?',
      answer: 'Getting started is easy. Contact our sales team to schedule a demo, and we\'ll help you integrate Thridify into your e-commerce platform. Our team provides full onboarding and support.',
    },
    {
      question: 'What kind of ROI can I expect?',
      answer: 'Customers typically see a 20-40% reduction in return rates and a 15-30% increase in conversion rates. The exact results depend on your product category and implementation strategy.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-8 last:border-b-0">
                <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
