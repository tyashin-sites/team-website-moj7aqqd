import { forwardRef, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary/50',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary/50',
      ghost: 'text-foreground hover:bg-gray-100 focus:ring-gray-300',
    };
    
    const sizes = {
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-lg',
    };
    
    const classes = cn(baseClasses, variants[variant], sizes[size], className);
    
    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }
    
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';