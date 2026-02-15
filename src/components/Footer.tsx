import React, { useState } from 'react';
import CookiePreferencesModal from './CookiePreferences';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/gndconsulting/',
  },
  {
    name: 'Linkedin',
    href: 'https://linkedin.com/in/roodny-pierre',
  },
  {
    name: 'Behance',
    href: 'https://www.behance.net/gndconsulting',
  },
];

const menuLinks = [
  { name: 'Agence', href: '#qui-sommes-nous' },
  { name: 'Services', href: '#services' },
  { name: 'Projets', href: '#realisations' },
];

export function Footer() {
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';

    if (href === '#contact') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isHomePage && href.startsWith('#')) {
      if (href === '#realisations') {
        const element = document.getElementById('realisations');
        if (element) {
          const offset = 200;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      window.location.href = '/' + href;
    }
  };

  return (
    <footer
      id="footer"
      className="relative bg-black text-white rounded-t-3xl mx-2 lg:mx-4 overflow-hidden"
    >
      {/* Glow bleu */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12 py-20 sm:py-24">
        {/* Grand titre CTA */}
        <div className="reveal text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[0.9] tracking-tight text-white mb-8">
            Créons l'impact<br />ensemble.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.querySelector('#contact') || document.querySelector('.contact-section');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-4 text-sm font-medium font-display transition-all duration-300 hover:bg-gray-200 hover:scale-105 no-underline"
            >
              Lancer un projet
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </a>
            <a
              href="mailto:contact@gndconsulting.fr"
              className="inline-flex items-center gap-2 border border-white/30 text-white rounded-full px-8 py-4 text-sm font-medium font-display transition-all duration-300 hover:bg-white/10 hover:scale-105 no-underline"
            >
              contact@gndconsulting.fr
            </a>
          </div>
        </div>

        {/* Grille 2 colonnes — Social + Menu */}
        <div className="reveal delay-100 grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-white/10 pt-12 max-w-xl mx-auto">
          {/* Colonne Social */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-4">
              Social
            </p>
            <nav className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200 no-underline"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Colonne Menu */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-4">
              Menu
            </p>
            <nav className="flex flex-col gap-2">
              {menuLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200 no-underline"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright + lien */}
        <div className="reveal delay-150 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            &copy; 2024 GND Consulting. Parisian Creative Studio.
          </p>
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, '#services')}
            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors duration-200 uppercase tracking-widest no-underline"
          >
            Voir les services
            <span className="material-symbols-outlined text-xs">arrow_outward</span>
          </a>
        </div>
      </div>

      <CookiePreferencesModal
        isOpen={showCookiePreferences}
        onClose={() => setShowCookiePreferences(false)}
      />
    </footer>
  );
}
