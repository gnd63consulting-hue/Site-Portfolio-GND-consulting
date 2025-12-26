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
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30',
  secondary: 'bg-white hover:bg-slate-50 text-blue-600 border-2 border-blue-600/20 hover:border-blue-600/40',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
  pill: 'bg-blue-50 hover:bg-blue-100 text-blue-600 !rounded-full'
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
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2';
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
  const baseClasses = 'font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2';
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
