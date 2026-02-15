import React, { useEffect } from 'react';

const serviceCards = [
  {
    icon: 'movie',
    title: 'Production Audiovisuelle',
    description: 'Films de marque, clips vidéo, captation événementielle, contenus social media et post-production.',
    href: '/services/production-audiovisuelle',
    image: '',
  },
  {
    icon: 'brush',
    title: 'Design Graphique & Web',
    description: 'Logo, identité visuelle, charte graphique, supports print, packaging et UI/UX design.',
    href: '/services/design-identite-visuelle',
    image: '',
  },
  {
    icon: 'smart_toy',
    title: 'Automatisation & IA',
    description: 'Workflows N8N, chatbots IA, intégrations API, agents autonomes et automatisation marketing.',
    href: '/services/automatisation-ia',
    image: '',
  },
];

export function Services() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="py-32 bg-white"
      aria-labelledby="services-title"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Expertise
            </span>
            <h2
              id="services-title"
              className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black"
            >
              Nos services créatifs
            </h2>
          </div>
          <a
            href="#services"
            className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1 group"
          >
            Voir tous les services
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {serviceCards.map((service, index) => (
            <a
              key={service.title}
              href={service.href}
              className={`reveal delay-${index === 0 ? '75' : index === 1 ? '150' : '200'} group relative bg-gray-50 rounded-2xl p-8 h-[420px] flex flex-col justify-between overflow-hidden transition-all duration-500 hover:bg-black`}
            >
              {/* Background image on hover */}
              {service.image && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover grayscale"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="relative z-10">
                <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-white transition-colors duration-500 mb-6 block">
                  {service.icon}
                </span>
                <h3 className="font-display font-semibold text-xl text-black group-hover:text-white transition-colors duration-500 mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Link "En savoir plus" appears on hover */}
              <div className="relative z-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-sm text-white font-medium">En savoir plus</span>
                <span className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
