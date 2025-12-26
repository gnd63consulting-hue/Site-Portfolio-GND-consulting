import React, { useState } from 'react';
import {
  Camera,
  Clapperboard,
  Cpu,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Music,
  Palette,
  Phone,
  Video
} from 'lucide-react';
import CookiePreferencesModal from './CookiePreferences';

const sitemapLinks = [
  { name: 'Accueil', href: '#hero' },
  { name: 'À propos', href: '#qui-sommes-nous' },
  { name: 'Nos services', href: '#services' },
  { name: 'Portfolio', href: '#realisations' },
  { name: 'Mentions légales', href: '/mentions-legales' }
];

const services = [
  { name: 'Design & Identité Visuelle', Icon: Palette, href: '#services' },
  { name: 'Motion Design', Icon: Clapperboard, href: '#services' },
  { name: 'Production Audiovisuelle', Icon: Video, href: '#services' },
  { name: 'Photographie', Icon: Camera, href: '#services' },
  { name: 'Automatisation & IA', Icon: Cpu, href: '#services' }
];

const contactChannels = [
  { label: 'Contactez-nous', value: 'contact@gndconsulting.fr', href: 'mailto:contact@gndconsulting.fr', Icon: Mail },
  { label: 'Appelez-nous', value: '07 59 50 63 22', href: 'tel:0759506322', Icon: Phone }
];

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/gndconsulting/',
    Icon: Instagram,
    tone: 'from-pink-500 to-rose-500',
    className: 'instagram'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/roodny-pierre',
    Icon: Linkedin,
    tone: 'from-blue-600 to-blue-500',
    className: 'linkedin'
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@gndconsulting',
    Icon: Music,
    tone: 'from-slate-900 to-black',
    className: 'tiktok'
  }
];

export function Footer() {
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);

  return (
    <footer
      id="footer"
      className="footer relative bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col items-center text-center gap-6">
          <a
            href="#hero"
            className="footer-logo-wrapper transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Retour en haut de page"
          >
            <img
              src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/GND%20consulting%20Logo%20Blanc-Photoroom.png"
              alt="Logo GND Consulting - Identité visuelle du studio"
              className="footer-logo"
              loading="lazy"
              decoding="async"
            />
          </a>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Production audiovisuelle, photographie et activations créatives pour révéler vos projets avec
            une signature premium.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200/70 bg-white/80 shadow-xl backdrop-blur-sm">
          <div className="footer-columns grid grid-cols-1 gap-12 p-8 sm:p-10 md:grid-cols-3">
            <div className="footer-column text-center md:text-left">
              <p className="footer-column-title">Plan du site</p>
              <nav className="flex flex-col items-center gap-2 md:items-start">
                {sitemapLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="footer-link font-medium transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="footer-column text-center md:text-left">
              <p className="footer-column-title">Nos expertises</p>
              <ul className="space-y-2.5 md:space-y-3">
                {services.map(({ name, href, Icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      className="group flex items-center gap-3 text-[15px] font-medium text-slate-600 transition-all duration-200 hover:text-primary"
                    >
                      <span className="service-icon">
                        <Icon className="h-4 w-4 text-primary" />
                      </span>
                      <span className="relative">
                        {name}
                        <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column text-center md:text-left">
              <p className="footer-column-title">Contact</p>
              <div className="flex flex-col gap-3">
                {contactChannels.map(({ label, value, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="contact-item group transition-all duration-200"
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col text-left leading-tight">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                        {label}
                      </span>
                      <span className="text-sm font-semibold text-slate-700 transition-colors duration-200 group-hover:text-primary">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="social-icons mt-6 flex justify-center gap-3 md:justify-start">
                {socialLinks.map(({ name, href, Icon, tone, className }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                  >
                    <span
                      className={`social-icon ${className} bg-gradient-to-br ${tone} text-white transition-transform duration-200`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4 border-t border-slate-200/60 pt-6 text-center">
          <div className="flex flex-col items-center justify-center gap-2 text-sm text-slate-500 sm:flex-row sm:gap-3">
            <MapPin className="h-4 w-4 text-primary" />
            <span>GND Consulting — Paris, France</span>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">
            © 2025 gndconsulting.fr — Tous droits réservés
          </p>
        </div>
      </div>

      <CookiePreferencesModal
        isOpen={showCookiePreferences}
        onClose={() => setShowCookiePreferences(false)}
      />
    </footer>
  );
}
