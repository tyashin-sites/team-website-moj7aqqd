'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

interface MobileNavProps {
  navigation: { name: string; href: string }[];
  ctaButton: { text: string; href: string };
}

export function MobileNav({ navigation, ctaButton }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border py-4 px-4">
          <nav className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <Button href={ctaButton.href} onClick={() => setIsMenuOpen(false)}>
                {ctaButton.text}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
