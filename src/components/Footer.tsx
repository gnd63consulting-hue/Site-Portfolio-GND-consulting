import React, { useState } from 'react';
import { Instagram, Linkedin, Music } from 'lucide-react';
import CookiePreferencesModal from './CookiePreferences';

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/gndconsulting/', Icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/roodny-pierre', Icon: Linkedin },
  { name: 'Behance', href: 'https://tiktok.com/@gndconsulting', Icon: Music },
];

const menuLinks = [
  { name: 'Agence', href: '#qui-sommes-nous' },
  { name: 'Services', href: '#services' },
  { name: 'Projets', href: '#realisations' },
  { name: 'Mentions légales', href: '/mentions-legales' },
];

export function Footer() {
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);

  return (
    <footer id="footer" className="relative mx-2 lg:mx-4 overflow-hidden">
      {/* Fond noir arrondi */}
      <div className="bg-black rounded-t-3xl relative">
        {/* Glow bleu en fond */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Section principale CTA */}
          <div className="pt-24 pb-16 lg:pt-32 lg:pb-20 text-center reveal">
            <h2 className="font-display font-semibold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-8">
              Créons l'impact<br />ensemble.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.querySelector('#footer');
                  if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-black rounded-full px-8 py-4 font-medium text-sm hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Lancer un projet
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </a>
              <a
                href="mailto:contact@gndconsulting.fr"
                className="border border-white/30 text-white rounded-full px-8 py-4 font-medium text-sm hover:bg-white/10 transition-all duration-300"
              >
                contact@gndconsulting.fr
              </a>
            </div>
          </div>

          {/* Ligne de séparation */}
          <div className="border-t border-white/10" />

          {/* Bottom section */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10 reveal">
            {/* Social */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 mb-4">Social</p>
              <div className="flex flex-col gap-2">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {name}
                  </a>
                ))}
              </div>
            </div>

            {/* Menu */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 mb-4">Menu</p>
              <div className="flex flex-col gap-2">
                {menuLinks.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/40 mb-4">Contact</p>
              <div className="flex flex-col gap-2 text-sm">
                <a href="mailto:contact@gndconsulting.fr" className="text-white/70 hover:text-white transition-colors">
                  contact@gndconsulting.fr
                </a>
                <a href="tel:0759506322" className="text-white/70 hover:text-white transition-colors">
                  07 59 50 63 22
                </a>
                <span className="text-white/40">Paris, France</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 py-6 text-center">
            <p className="text-xs text-white/30">
              © 2024 GND Consulting. Parisian Creative Studio.
            </p>
          </div>
        </div>
      </div>

      <CookiePreferencesModal
        isOpen={showCookiePreferences}
        onClose={() => setShowCookiePreferences(false)}
      />
    </footer>
  );
}
