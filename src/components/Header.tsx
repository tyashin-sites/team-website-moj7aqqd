'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from './ui/Button';
import { useCart } from './CartProvider';
import siteData from '../../content/site.json';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { count } = useCart();
  const { header } = siteData;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://website-api.tyashin.com/api/v1/generator/69f1354e7766b41fbc101ded/assets/generator%2Fuploads%2F69f1354e7766b41fbc101ded%2F1777420755668-Logo_with_company_name__1_.png.png"
              alt="Thridify"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {header.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <Button href={header.ctaButton.href}>{header.ctaButton.text}</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              {header.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Cart ({count})
                </Link>
                <Button href={header.ctaButton.href} onClick={() => setIsMenuOpen(false)}>
                  {header.ctaButton.text}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}