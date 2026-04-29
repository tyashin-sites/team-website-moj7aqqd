'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';

interface ContactFormProps {
  fields: string[];
  submitText: string;
}

export function ContactForm({ fields, submitText }: ContactFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({});
    } catch (error) {
      setMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const renderField = (field: string) => {
    const commonProps = {
      name: field,
      value: formData[field] || '',
      onChange: handleChange,
      className: 'w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors',
      required: true,
    };

    switch (field) {
      case 'name':
        return (
          <input
            type="text"
            placeholder="Your Name"
            {...commonProps}
          />
        );
      case 'email':
        return (
          <input
            type="email"
            placeholder="Your Email"
            {...commonProps}
          />
        );
      case 'company':
        return (
          <input
            type="text"
            placeholder="Company Name"
            {...commonProps}
            required={false}
          />
        );
      case 'phone':
        return (
          <input
            type="tel"
            placeholder="Phone Number"
            {...commonProps}
            required={false}
          />
        );
      case 'industry':
        return (
          <select {...commonProps} required={false}>
            <option value="">Select Industry</option>
            <option value="furniture">Furniture</option>
            <option value="automotive">Automotive</option>
            <option value="kitchens">Modular Kitchens</option>
            <option value="retail">Retail</option>
            <option value="machinery">Industrial Machinery</option>
            <option value="other">Other</option>
          </select>
        );
      case 'message':
        return (
          <textarea
            placeholder="Your Message"
            rows={4}
            {...commonProps}
          />
        );
      default:
        return (
          <input
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            {...commonProps}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field}>
          {renderField(field)}
        </div>
      ))}
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? 'Sending...' : submitText}
      </Button>
      
      {message && (
        <div className={`p-4 rounded-lg text-center ${
          message.includes('error') 
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {message}
        </div>
      )}
    </form>
  );
}