import React, { useState, useCallback } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonGNDProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  as?: 'button' | 'a';
  href?: string;
  children: React.ReactNode;
  feedbackLabel?: string;
}

export function ButtonGND({ variant = 'primary', as = 'button', href, children, className = '', feedbackLabel, onClick, ...rest }: ButtonGNDProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<any>) => {
    if (onClick) onClick(e);
    // Déclenche un feedback visuel court sans bloquer la navigation ancre
    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 1200);
  }, [onClick]);
  const base = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-4 gap-2 no-underline hover:no-underline visited:no-underline';
  const variants: Record<Variant, string> = {
    primary: 'text-white hover:text-white visited:text-white focus-visible:text-white bg-black hover:bg-gray-800 hover:shadow-lg hover:scale-105 focus-visible:ring-gray-300 px-8 py-4',
    secondary: 'text-black hover:text-white visited:text-black focus-visible:text-black bg-white border border-gray-300 hover:bg-black hover:text-white hover:border-black focus-visible:ring-gray-300 px-8 py-4',
    outline: 'text-black hover:text-black visited:text-black border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-300 px-8 py-4',
    danger: 'text-white hover:text-white visited:text-white bg-red-600 hover:bg-red-700 focus-visible:ring-red-300 px-8 py-4',
  };

  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if (as === 'a' && href) {
    return (
      <a href={href} className={cls} onClick={handleClick} aria-busy={isLoading || undefined} {...(rest as any)}>
        <span className="inline-flex items-center gap-2">
          {children}
          {isLoading && (
            <span className="ml-2 inline-flex items-center gap-1 text-white/90 text-[12px]">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="sr-only">Chargement…</span>
              <span aria-hidden="true">{feedbackLabel || '…'}</span>
            </span>
          )}
        </span>
      </a>
    );
  }

  return (
    <button className={cls} onClick={handleClick} aria-busy={isLoading || undefined} {...rest}>
      <span className="inline-flex items-center gap-2">
        {children}
        {isLoading && (
          <span className="ml-2 inline-flex items-center gap-1 text-white/90 text-[12px]">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span className="sr-only">Chargement…</span>
            <span aria-hidden="true">{feedbackLabel || '…'}</span>
          </span>
        )}
      </span>
    </button>
  );
}
