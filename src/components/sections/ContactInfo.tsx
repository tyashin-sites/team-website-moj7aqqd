import { Phone, Mail, MapPin } from 'lucide-react';

interface Office {
  location: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  description?: string;
}

interface ContactInfoProps {
  offices?: Office[];
  children?: React.ReactNode;
  className?: string;
}

export function ContactInfo({ offices = [] }: ContactInfoProps) {
  return (
    <div className="space-y-6">
      {offices.map((office, i) => (
        <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{office.location}</h3>
          </div>
          {office.phone && (
            <div className="flex items-center gap-4 mb-2">
              <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-muted hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                {office.phone}
              </a>
              {office.whatsapp && (
                <a href={`https://wa.me/${office.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 text-sm font-medium">
                  WhatsApp
                </a>
              )}
            </div>
          )}
          {office.email && (
            <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-muted hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              {office.email}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default ContactInfo;
