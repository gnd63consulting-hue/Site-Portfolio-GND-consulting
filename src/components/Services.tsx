import React from 'react';
import { Link } from 'react-router-dom';

export function Services() {
  const servicePages = [
    {
      id: 'design',
      icon: 'brush',
      title: 'Design & Identité Visuelle',
      subtitle: 'Logos, chartes graphiques et supports visuels sur mesure pour marques ambitieuses',
      href: '/services/design-identite-visuelle',
    },
    {
      id: 'motion',
      icon: 'animation',
      title: 'Motion Design',
      subtitle: 'Animations 2D/3D et vidéos motion graphics créatives et impactantes',
      href: '/services/motion-design',
    },
    {
      id: 'production',
      icon: 'movie',
      title: 'Production Audiovisuelle',
      subtitle: 'Captation live, montage et post-production vidéo professionnelle',
      href: '/services/production-audiovisuelle',
    },
    {
      id: 'photo',
      icon: 'photo_camera',
      title: 'Photographie',
      subtitle: 'Portraits, événements et photographie corporate haute qualité',
      href: '/services/photographie',
    },
    {
      id: 'ia',
      icon: 'smart_toy',
      title: 'Automatisation & IA',
      subtitle: "Agents IA, workflows automatisés et intégrations sur mesure pour votre business",
      href: '/services/automatisation-ia',
    },
  ];

  return (
    <section id="services" className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto relative bg-white" aria-labelledby="services-title">

      {/* Titre de section — Stitch style */}
      <div className="text-center space-y-4 mb-12 relative z-10 reveal">
        <span className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted">
          Expertise
        </span>
        <h2 id="services-title" className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-text-main leading-[0.95]">
          Nos Services Créatifs
        </h2>
        <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
          Production audiovisuelle, design graphique, automatisation IA — découvrez notre gamme complète de services sur mesure
        </p>
      </div>

      {/* Grille des 5 services — Stitch card style, liens vers pages service */}
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 reveal delay-100">
        {servicePages.map((service, index) => (
          <Link
            key={service.id}
            to={service.href}
            className="group bg-white border border-gray-200 rounded-2xl p-8 min-h-[380px] flex flex-col justify-between text-left transition-all duration-500 hover:bg-black hover:text-white hover:border-transparent focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
          >
            {/* Icon */}
            <div>
              <span className="material-symbols-outlined text-3xl text-text-main group-hover:text-white transition-colors duration-500">
                {service.icon}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-widest text-text-muted group-hover:text-gray-400 transition-colors duration-500">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h4 className="font-display text-xl font-semibold leading-tight text-text-main group-hover:text-white transition-colors duration-500">
                {service.title}
              </h4>
              <p className="text-sm text-text-muted group-hover:text-gray-300 transition-colors duration-500">
                {service.subtitle}
              </p>
            </div>

            {/* Footer — lien vers page service */}
            <div className="flex items-center justify-between border-t pt-4 border-gray-200 group-hover:border-white/20 transition-colors duration-500">
              <span className="text-xs font-medium uppercase tracking-widest text-text-muted group-hover:text-gray-400 transition-colors duration-500">
                En savoir plus
              </span>
              <span className="material-symbols-outlined text-sm text-text-muted group-hover:text-gray-400 transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
