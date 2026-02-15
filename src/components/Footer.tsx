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
      className="relative bg-black text-white rounded-t-3xl mx-2 lg:mx-4 overflow-hidden"
    >
      {/* Glow bleu Stitch */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12 py-20 sm:py-24">
        {/* Grand titre CTA — Stitch style */}
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
              className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-gray-200 hover:scale-105"
              style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
            >
              Lancer un projet
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </a>
            <a
              href="mailto:contact@gndconsulting.fr"
              className="inline-flex items-center gap-2 border border-white/30 text-white rounded-full px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:scale-105"
              style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
            >
              contact@gndconsulting.fr
            </a>
          </div>
        </div>

        {/* Grille 3 colonnes — Stitch style mais avec TOUT le contenu */}
        <div className="reveal delay-100 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
          {/* Colonne 1 — Plan du site + Logo */}
          <div>
            <a
              href="#hero"
              className="inline-block mb-6 transition-transform duration-300 hover:scale-[1.02]"
              aria-label="Retour en haut de page"
            >
              <img
                src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/GND%20consulting%20Logo%20Blanc-Photoroom.png"
                alt="Logo GND Consulting"
                className="h-16 w-auto filter brightness-0 invert"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Production audiovisuelle, photographie et activations créatives pour révéler vos projets avec une signature premium.
            </p>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">Plan du site</p>
            <nav className="flex flex-col gap-2">
              {sitemapLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Colonne 2 — Nos expertises */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-4">Nos expertises</p>
            <ul className="space-y-3">
              {services.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-all duration-200"
                  >
                    <Icon className="h-4 w-4 text-accent" />
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-3">Social</p>
              <div className="flex gap-3">
                {socialLinks.map(({ name, href, Icon, tone, className }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne 3 — Contact */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-4">Contact</p>
            <div className="flex flex-col gap-4">
              {contactChannels.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-3 transition-all duration-200"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 group-hover:border-accent group-hover:text-accent transition-all duration-200">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-gray-500">
                      {label}
                    </span>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 text-accent" />
              <span>Paris, France</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="reveal delay-150 mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            © 2025 GND Consulting. Parisian Creative Studio.
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
