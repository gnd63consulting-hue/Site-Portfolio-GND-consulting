import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'pill';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  href: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-black hover:bg-gray-800 text-white shadow-sm hover:shadow-md hover:scale-105',
  secondary: 'bg-white hover:bg-gray-50 text-black border border-gray-300 hover:border-black',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  pill: 'bg-gray-50 hover:bg-gray-100 text-black !rounded-full'
};

const sizes: Record<ButtonSize, string> = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg'
};

export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2';
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  href,
  ...props
}: LinkButtonProps) {
  const baseClasses = 'font-medium rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2';
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export const buttonVariants = variants;
export const buttonSizes = sizes;
