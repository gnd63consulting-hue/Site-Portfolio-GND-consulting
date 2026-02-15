import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '#qui-sommes-nous', label: 'Studio' },
  { href: '#services', label: 'Expertise' },
  { href: '#realisations', label: 'Projets' },
  { href: '#contact', label: 'Journal' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    }
    return () => {
      if (typeof document !== 'undefined') document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

    if (href === '#realisations') {
      if (isHomePage) {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        setTimeout(() => {
          const element = document.getElementById('realisations');
          if (element) {
            const offset = 200;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 300);
      } else {
        window.location.href = '/#realisations';
      }
    } else if (isHomePage && href.startsWith('#')) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      setTimeout(() => {
        if (href === '#contact') {
          const footer = document.querySelector('footer');
          if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const handleCTAClick = () => {
    setIsMobileMenuOpen(false);
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
    if (isHomePage) {
      setTimeout(() => {
        const footer = document.querySelector('footer');
        if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] bg-black text-white px-4 py-2 rounded-full font-semibold"
      >
        Aller au contenu principal
      </a>

      <header className="fixed top-0 left-0 right-0 z-[150] px-4 lg:px-6 pt-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 focus:outline-none" aria-label="Retour à l'accueil">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">G</span>
            </div>
            <span className="font-display font-semibold text-sm tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hidden sm:block">
              GND Consulting
            </span>
          </a>

          {/* Navigation Desktop — Glass Nav with Pills */}
          <nav className="hidden lg:block">
            <div className="glass-nav rounded-full px-2 py-2 flex items-center gap-1">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href.startsWith('#') ? '/' + item.href : item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    index === 0
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* CTA Desktop */}
          <button
            onClick={handleCTAClick}
            className="hidden lg:flex items-center gap-2 bg-black text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          >
            <span>Démarrer un projet</span>
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 glass-nav rounded-2xl p-6 animate-slide-up">
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href.startsWith('#') ? '/' + item.href : item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    index === 0
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={handleCTAClick}
                className="flex items-center justify-center gap-2 bg-black text-white rounded-full px-6 py-3 text-sm font-medium mt-2 hover:bg-gray-800 transition-all duration-300"
              >
                <span>Démarrer un projet</span>
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
