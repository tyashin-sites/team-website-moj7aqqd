'use client';
import { useState } from 'react';

interface ContactFormProps {
  fields?: string[];
  submitText?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ContactForm({ submitText = 'Send Message' }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="p-8 bg-green-50 rounded-xl text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank you!</h3>
        <p className="text-green-600">We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Your Name" required className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
        <input type="email" placeholder="Email Address" required className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Company" className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
        <input type="tel" placeholder="Phone Number" className="px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
      </div>
      <select className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-muted">
        <option value="">Select Industry</option>
        <option>Furniture</option>
        <option>Automotive</option>
        <option>Modular Kitchens</option>
        <option>Doors & Windows</option>
        <option>Education</option>
        <option>Retail</option>
        <option>Industrial Machinery</option>
        <option>Other</option>
      </select>
      <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none resize-none" />
      <button type="submit" className="w-full px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
        {submitText}
      </button>
    </form>
  );
}

export default ContactForm;
