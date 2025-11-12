import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      className="back-to-top"
      aria-label="Retour en haut de la page"
      title="Retour en haut"
      type="button"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
      <span className="sr-only">Retour en haut de la page</span>
    </button>
  );
}
