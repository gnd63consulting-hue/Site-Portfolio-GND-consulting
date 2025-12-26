import React, { useState, useEffect } from 'react';
import { Menu, X, Users, Zap, Folder, Handshake, Phone, Heart, Camera, Star, ChevronDown } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Aller au contenu principal
      </a>

      <header className="absolute top-0 left-0 right-0 z-[150] transition-all duration-300" onMouseLeave={closeDropdown}>
      
      <div className="container-modern">
        <div className="flex justify-between items-center py-3 sm:py-4 relative z-10">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="block focus:outline-none focus:ring-4 focus:ring-primary/50 rounded-xl" aria-label="Retour à l'accueil">
              <img
                src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/GND%20consulting%20Logo%20Blanc-Photoroom.png"
                alt="Logo GND Consulting - Studio créatif spécialisé en production audiovisuelle et design graphique"
                className="w-auto transition-all duration-200 hover:scale-105 filter drop-shadow-xl h-[clamp(64px,17vw,140px)] max-w-[220px]"
              />
            </a>
          </div>

          {/* Navigation Desktop - Style exact de l'image */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="bg-[#bbcde8] backdrop-blur-sm rounded-2xl p-1 inline-flex gap-1 border border-slate-200/50">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  >
                    {item.hasDropdown ? (
                      <button
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400/60 ${
                          index === 0 
                            ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white shadow-lg shadow-blue-600/25' 
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 uppercase tracking-wide'
                        }`}
                        style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700' }}
                      >
                        <IconComponent className="w-4 h-4" strokeWidth={1.5} />
                        <span>{item.label}</span>
                        <ChevronDown className="w-3 h-3 ml-1" strokeWidth={1.5} />
                      </button>
                    ) : (
                      <a
                        href={item.href.startsWith('#') ? '/' + item.href : item.href}
                        onClick={(e) => {
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
                                  window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                  });
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
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400/60 ${
                          index === 0
                            ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white shadow-lg shadow-blue-600/25'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 uppercase tracking-wide'
                        }`}
                        style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700' }}
                      >
                        <IconComponent className="w-4 h-4" strokeWidth={1.5} />
                        <span>{item.label}</span>
                      </a>
                    )}
                    
                    {/* Dropdown Menu */}
                    {item.hasDropdown && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-xl py-2 z-50">
                        {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                          <a
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-300 text-sm font-medium"
                            style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700' }}
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

          {/* CTA Button */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-primary/50 rounded-lg relative z-[200] text-white drop-shadow-[0_0_2px_#000,0_2px_4px_rgba(0,0,0,0.6)]"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="flex items-center justify-center">
              {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} stroke="white" aria-hidden="true" /> : <Menu size={24} strokeWidth={2.5} stroke="white" aria-hidden="true" />}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 border-t border-slate-200/50 animate-slide-up shadow-lg relative z-10">
            <nav className="flex flex-col p-6 gap-4">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                
                if (item.hasDropdown) {
                  return (
                    <div key={item.href}>
                      <div className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors duration-300 font-medium py-2">
                        <IconComponent className="w-4 h-4" strokeWidth={1.5} />
                        {item.label}
                      </div>
                      <div className="ml-7 space-y-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors duration-300 font-medium py-1 text-sm"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
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
                                window.scrollTo({
                                  top: offsetPosition,
                                  behavior: 'smooth'
                                });
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
                                footer.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start'
                                });
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
                    className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors duration-300 font-medium py-2"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700' }}
                  >
                    <IconComponent className="w-4 h-4" strokeWidth={1.5} />
                    {item.label}
                  </a>
                );
              })}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  // Logique spécifique pour la page d'accueil
                  const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
                  
                  if (isHomePage) {
                    // Sur la page d'accueil, forcer le scroll vers le footer
                    setTimeout(() => {
                      const footer = document.querySelector('footer');
                      if (footer) {
                        footer.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start' 
                        });
                      }
                    }, 100);
                  } else {
                    // Sur les autres pages, comportement normal
                    const element = document.querySelector('footer');
                  if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                      });
                  }
                  }
                }}
                className="px-6 py-3 bg-slate-900 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg mt-4 text-center text-sm"
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: '700' }}
              >
                Lancer mon projet
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
}
