import React, { useState, useEffect } from 'react';
import { Menu, X, Users, Zap, Folder, Handshake, Phone, Heart, Camera, Star, ChevronDown } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
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
    const sectionIds = ['qui-sommes-nous', 'services', 'realisations', 'footer'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'footer') {
              setActiveSection('#contact');
            } else {
              setActiveSection(`#${id}`);
            }
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
    { href: '#qui-sommes-nous', label: 'Qui sommes-nous', icon: Users },
    {
      href: '#services',
      label: 'Services',
      icon: Zap,
      hasDropdown: true,
      dropdownItems: [
        { href: '/services/design-identite-visuelle', label: 'Design & Identité Visuelle', icon: '🎨' },
        { href: '/services/motion-design', label: 'Motion Design', icon: '🎬' },
        { href: '/services/production-audiovisuelle', label: 'Production Audiovisuelle', icon: '🎬' },
        { href: '/services/photographie', label: 'Photographie', icon: '📸' },
        { href: '/services/automatisation-ia', label: 'Automatisation & IA', icon: '⚡' }
      ]
    },
    { href: '#realisations', label: 'Portfolio', icon: Folder },
    // { href: '/partenaires', label: 'Partenaires', icon: Handshake }, // Temporairement masqué
    { href: '#contact', label: 'Contact', icon: Phone },
  ];

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

    if (item.href === '#realisations') {
      if (isHomePage) {
        e.preventDefault();
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
    } else if (isHomePage && item.href.startsWith('#')) {
      e.preventDefault();
      if (item.href === '#contact') {
        const footer = document.querySelector('footer');
        if (footer) {
          footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
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
        onMouseLeave={closeDropdown}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center relative z-10">
            {/* Logo — GND Consulting avec image Supabase */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-3 focus:outline-none focus:ring-4 focus:ring-accent/50 rounded-xl" aria-label="Retour à l'accueil">
                <img
                  src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/GND%20consulting%20Logo%20Blanc-Photoroom.png"
                  alt="Logo GND Consulting - Studio créatif spécialisé en production audiovisuelle et design graphique"
                  className="w-auto transition-all duration-200 hover:scale-105 filter drop-shadow-xl h-[clamp(48px,12vw,100px)] max-w-[180px]"
                />
              </a>
            </div>

            {/* Navigation Desktop — Stitch glass-nav pills */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="glass-nav p-1.5 inline-flex gap-1 shadow-sm">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;
                  const baseClasses = "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60";
                  const activeClasses = isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black hover:bg-gray-100/80";

                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                    >
                      {item.hasDropdown ? (
                        <button
                          className={`${baseClasses} ${activeClasses}`}
                          style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      ) : (
                        <a
                          href={item.href.startsWith('#') ? '/' + item.href : item.href}
                          onClick={(e) => handleNavClick(e, item)}
                          className={`${baseClasses} ${activeClasses}`}
                          style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
                        >
                          <span>{item.label}</span>
                        </a>
                      )}

                      {/* Dropdown Menu */}
                      {item.hasDropdown && activeDropdown === item.label && (
                        <div className="absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-xl py-2 z-50">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <a
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="flex items-center gap-3 px-5 py-3 text-gray-600 hover:text-black hover:bg-gray-50 transition-all duration-300 text-sm font-medium"
                              style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
                              onClick={closeDropdown}
                            >
                              <span className="text-lg">{dropdownItem.icon}</span>
                              <span>{dropdownItem.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* CTA Desktop — Stitch style */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
                  if (isHomePage) {
                    const footer = document.querySelector('footer');
                    if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className="inline-flex items-center gap-2 bg-black text-white rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105"
                style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
              >
                Démarrer un projet
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
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
                {isMobileMenuOpen ? <X size={20} strokeWidth={2} aria-hidden="true" /> : <Menu size={20} strokeWidth={2} aria-hidden="true" />}
              </span>
            </button>
          </div>

          {/* Mobile Menu — Stitch style */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-3 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl animate-slide-up relative z-10">
              <nav className="flex flex-col p-6 gap-3">
                {navItems.map((item) => {
                  if (item.hasDropdown) {
                    return (
                      <div key={item.href}>
                        <div className="flex items-center gap-3 text-gray-600 font-medium py-2 text-sm" style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}>
                          {item.label}
                        </div>
                        <div className="ml-4 space-y-1 border-l border-gray-200 pl-4">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <a
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors duration-300 font-medium py-1.5 text-sm"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              <span>{dropdownItem.icon}</span>
                              {dropdownItem.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.href}
                      href={item.href.startsWith('#') ? '/' + item.href : item.href}
                      onClick={(e) => {
                        const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

                        if (item.href === '#realisations') {
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
                            }, 500);
                          } else {
                            setIsMobileMenuOpen(false);
                            window.location.href = '/#realisations';
                          }
                        } else if (isHomePage && item.href.startsWith('#')) {
                          e.preventDefault();
                          setIsMobileMenuOpen(false);
                          setTimeout(() => {
                            if (item.href === '#contact') {
                              const footer = document.querySelector('#footer');
                              if (footer) {
                                footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            } else {
                              const element = document.querySelector(item.href);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }
                          }, 300);
                        } else {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors duration-300 font-medium py-2 text-sm"
                      style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
                    if (isHomePage) {
                      setTimeout(() => {
                        const footer = document.querySelector('footer');
                        if (footer) {
                          footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    } else {
                      const element = document.querySelector('footer');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                  className="mt-3 px-6 py-3 bg-black text-white font-medium rounded-full transition-all duration-300 hover:bg-gray-800 hover:scale-105 text-center text-sm"
                  style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
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
