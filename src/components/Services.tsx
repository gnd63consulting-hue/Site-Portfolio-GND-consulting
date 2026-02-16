import React from 'react';
import { Link } from 'react-router-dom';

export function Services() {
  // Images de fond pour les cards au hover (images existantes Supabase)
  const categoryImages: Record<string, string> = {
    design: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20251006_2055_Espace%20Travail%20Futuriste_simple_compose_01k6xdztmrewrv8rq637vqqpnp.png",
    motion: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png",
    production: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4251.jpg",
    photo: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4135.jpg",
    ia: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png",
  };

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
            className="group relative bg-gray-50 rounded-2xl p-8 h-[420px] flex flex-col justify-between text-left transition-all duration-500 overflow-hidden hover:bg-black hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
          >
            {/* Background image — grayscale, visible on hover */}
            {categoryImages[service.id] && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 grayscale"
                style={{
                  backgroundImage: `url(${categoryImages[service.id]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-hidden="true"
              />
            )}

            {/* Icon */}
            <div className="relative z-10">
              <span className="material-symbols-outlined text-3xl text-text-main group-hover:text-white transition-colors duration-500">
                {service.icon}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-3">
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
            <div className="relative z-10 flex items-center justify-between border-t pt-4 border-gray-200 group-hover:border-white/20 transition-colors duration-500">
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
