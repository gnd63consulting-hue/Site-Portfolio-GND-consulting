import React, { useState } from 'react';
import { Instagram, Linkedin, Music, MapPin, Phone, Mail, Sparkles, Palette, Video, Camera, Cpu } from 'lucide-react';
import CookiePreferencesModal from './CookiePreferences';

export function Footer() {
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);
  return (
    <footer id="footer" className="footer relative overflow-hidden">
      {/* Séparation fluide ondulée */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12 sm:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill="currentColor"
                className="text-white"
                style={{ opacity: 0.8 }}
          />
        </svg>
      </div>

      {/* Fond avec dégradé et effet glassmorphism */}
      <div className="relative" style={{
        background: 'linear-gradient(180deg, rgba(240, 249, 255, 0.4) 0%, rgba(224, 242, 254, 0.6) 50%, rgba(186, 230, 253, 0.3) 100%)',
        backdropFilter: 'blur(20px)'
      }}>
        {/* Éléments de fond flottants */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-sky-200/20 to-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-100/10 to-blue-100/10 rounded-full blur-2xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16 sm:pb-20 relative z-10">

          {/* Logo GND - Identique au header avec opacité réduite */}
          <div className="flex justify-center mb-12 sm:mb-16 mt-0 sm:mt-6 py-0 sm:py-12">
            <a
              href="#hero"
              className="relative group cursor-pointer"
              aria-label="Retour en haut de page"
            >

              {/* Logo avec fond subtil pour améliorer le contraste */}
              <div className="footer-logo-wrapper">
                <img
                  src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/GND%20consulting%20Logo%20Blanc-Photoroom.png"
                  alt="Logo GND Consulting - Identité visuelle du studio"
                  className="footer-logo"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </a>
          </div>

          {/* Grille principale 3 colonnes */}
          <div className="footer-columns grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-10 md:mb-16">

            {/* Colonne 1 - Plan du site */}
            <div className="footer-column text-center md:text-left">
              <h3 className="footer-column-title">
                Plan du site
              </h3>
              <nav className="flex flex-col items-center md:items-start space-y-1 md:space-y-2.5 leading-relaxed">
                {[
                  { name: 'Accueil', href: '#home' },
                  { name: 'À propos', href: '#about' },
                  { name: 'Nos services', href: '#services' },
                  { name: 'Portfolio', href: '#portfolio' },
                  { name: 'FAQ', href: '#faq' },
                  { name: 'Contact', href: '#contact' },
                  { name: 'Mentions légales', href: '/mentions-legales' },
                  { name: 'Préférences cookies', href: '#cookies', special: true }
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      if (link.special) {
                        e.preventDefault();
                        setShowCookiePreferences(true);
                      }
                    }}
                    className="footer-link group text-gray-700 hover:text-primary transition-all duration-300 font-medium text-[15px] md:text-[15px] relative cursor-pointer py-[6px] md:py-0"
                  >
                    <span className="relative inline-block">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Colonne 2 - Nos prestations */}
            <div className="footer-column text-center md:text-left">
              <h3 className="footer-column-title">
                Nos prestations
              </h3>
              <ul className="flex flex-col items-center md:items-start space-y-1.5 md:space-y-3 leading-relaxed">
                {[
                  { name: 'Identité visuelle', href: '#services', icon: <Palette className="w-4 h-4 text-primary" /> },
                  { name: 'Motion design', href: '#services', icon: <Sparkles className="w-4 h-4 text-primary" /> },
                  { name: 'Production audiovisuelle', href: '#services', icon: <Video className="w-4 h-4 text-primary" /> },
                  { name: 'Photographie', href: '#services', icon: <Camera className="w-4 h-4 text-primary" /> },
                  { name: 'Automatisation & IA', href: '#services', icon: <Cpu className="w-4 h-4 text-primary" /> }
                ].map((service) => (
                  <li key={service.name} className="footer-service">
                    <a
                      href={service.href}
                      className="group flex items-center gap-3 py-[6px] text-gray-700 hover:text-primary transition-all duration-300 font-medium text-[15px]"
                    >
                      <span className="service-icon-wrapper">
                        {service.icon}
                      </span>
                      <span className="relative inline-flex items-center">
                        {service.name}
                        <span className="inline-block ml-2 text-xs uppercase tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 3 - Contact & réseaux */}
            <div className="footer-column text-center md:text-left">
              <h3 className="footer-column-title">
                Contact
              </h3>
              <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-4 leading-relaxed">
                <a
                  href="mailto:contact@gndconsulting.fr"
                  className="contact-item group text-gray-700 hover:text-primary transition-all duration-300"
                >
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/60">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                  </div>
                  <span className="font-medium text-[15px] md:text-[15px]">contact@gndconsulting.fr</span>
                </a>
                <a
                  href="tel:0759506322"
                  className="contact-item group text-gray-700 hover:text-primary transition-all duration-300"
                >
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg border border-white/60">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                  </div>
                  <span className="font-medium text-[15px] md:text-[15px]">07 59 50 63 22</span>
                </a>
              </div>

              {/* Réseaux sociaux avec effet glassmorphism */}
              <div className="social-icons flex gap-3 md:gap-4 justify-center md:justify-start mt-3 md:mt-4">
                <a
                  href="https://www.instagram.com/gndconsulting/"
                  className="group relative"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-pink-500/30 to-rose-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="social-icon instagram relative w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-pink-600 to-rose-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                </a>
                <a
                  href="https://linkedin.com/in/roodny-pierre"
                  className="group relative"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-600/30 to-blue-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="social-icon linkedin relative w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-blue-700 to-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                </a>
                <a
                  href="https://tiktok.com/@gndconsulting"
                  className="group relative"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <div className="absolute -inset-2 bg-gradient-to-br from-gray-800/30 to-black/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="social-icon tiktok relative w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg">
                    <Music className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Séparateur élégant avec point animé */}
          <div className="relative mb-6 md:mb-10 mt-8 md:mt-0">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/50"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-r from-transparent via-white/80 to-transparent px-6 backdrop-blur-sm">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-primary to-secondary rounded-full animate-pulse shadow-lg shadow-primary/50"></div>
              </div>
            </div>
          </div>

          {/* Bas de page - Localisation & mentions */}
          <div className="space-y-2.5 md:space-y-3.5 text-center">
            {/* Localisation avec effet glow */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 md:gap-2 text-gray-500">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse" style={{ animationDuration: '3s' }} />
              <span className="font-medium text-[13px] md:text-[15px] leading-relaxed">GND Consulting — Paris, France</span>
            </div>

            {/* Copyright & mentions */}
            <div className="footer-bottom space-y-1.5 md:space-y-2 border-t border-gray-300/30 pt-2.5 md:pt-3.5 mt-2.5 md:mt-3.5">
              <p className="text-gray-600 font-semibold text-[12px] md:text-[14px] leading-relaxed">
                © 2025 gndconsulting.fr — Tous droits réservés
              </p>
            </div>
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
