import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      return;
    }
    const sectionIds = ['qui-sommes-nous', 'services', 'realisations', 'contact-form'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { href: '#qui-sommes-nous', label: 'Agence' },
    { href: '#services', label: 'Services' },
    { href: '#realisations', label: 'Réalisations' },
    { href: '#contact-form', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    const isHomePage = location.pathname === '/' || location.pathname === '';

    // Route-based navigation (e.g. /portfolio)
    if (href.startsWith('/') && !href.startsWith('/#')) {
      navigate(href);
      return;
    }

    if (href === '#contact') {
      if (isHomePage) {
        const footer = document.querySelector('footer');
        if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = '/#contact';
      }
      return;
    }

    if (isHomePage && href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (!isHomePage) {
      window.location.href = '/' + href;
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('#contact');
  };

  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] bg-black text-white px-4 py-2 rounded-full font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-accent"
      >
        Aller au contenu principal
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center relative z-10">
            {/* Logo — "G" cercle noir + "GND Consulting" */}
            <a
              href="/"
              className="flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-accent/50 rounded-xl no-underline"
              aria-label="Retour à l'accueil"
            >
              <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-display text-sm font-semibold leading-none">G</span>
              </div>
              <img
                src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/GND%20consulting%20Logo%20Blanc-Photoroom.png"
                alt="GND Consulting"
                className="h-14 w-auto"
              />
            </a>

            {/* Navigation Desktop — glass-nav pills */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="glass-nav p-1.5 inline-flex gap-1 shadow-sm">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href.startsWith('#') ? '/' + item.href : item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-display no-underline ${
                        isActive
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:text-black hover:bg-gray-100/80'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* CTA Desktop — texte + flèche */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                onClick={handleCTAClick}
                className="inline-flex items-center gap-2 text-sm font-medium font-display text-primary no-underline transition-all duration-300 hover:text-gray-600"
              >
                Démarrer un projet
                <span className="material-symbols-outlined text-base">arrow_outward</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-accent/50 rounded-full relative z-[200] bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-sm"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="flex items-center justify-center text-black">
                {isMobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-3 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl animate-slide-up relative z-10">
              <nav className="flex flex-col p-6 gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href.startsWith('#') ? '/' + item.href : item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      setTimeout(() => scrollToSection(item.href), 300);
                    }}
                    className="text-gray-600 hover:text-black transition-colors duration-300 font-display font-medium py-2 text-sm no-underline"
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => scrollToSection('#contact'), 300);
                  }}
                  className="mt-3 px-6 py-3 bg-black text-white font-display font-medium rounded-full transition-all duration-300 hover:bg-gray-800 hover:scale-105 text-center text-sm"
                >
                  Démarrer un projet
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
