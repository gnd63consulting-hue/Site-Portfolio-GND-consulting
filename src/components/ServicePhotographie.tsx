import React, { useEffect } from 'react';
import { updateMetaTags, pageSEO } from '../utils/seo';

const prestations = [
  {
    icon: 'person',
    title: 'Portrait corporate',
    description: 'Valorisez vos équipes avec des portraits professionnels et reportages en entreprise qui reflètent votre culture.',
    features: ['Portraits dirigeants & équipes', 'Reportages en situation', 'Photos LinkedIn & site web', 'Séances en entreprise'],
  },
  {
    icon: 'inventory_2',
    title: 'Packshot produit',
    description: 'Des visuels nets et stylisés pour mettre vos produits en valeur sur les marketplaces ou vos catalogues.',
    features: ['Packshots studio', 'Fond blanc ou créatif', 'Optimisation marketplaces', 'Post-production incluse'],
  },
  {
    icon: 'celebration',
    title: 'Événementiel',
    description: 'Capturez les moments forts de vos séminaires, conférences, lancements de produit ou soirées professionnelles.',
    features: ['Séminaires & conférences', 'Lancements & inaugurations', 'Photos naturelles', 'Rendu optimisé communication'],
  },
  {
    icon: 'apartment',
    title: 'Immobilier',
    description: 'Des visuels premium pour valoriser vos biens immobiliers, locaux professionnels et espaces architecturaux.',
    features: ['Photos intérieures & extérieures', 'Lumière naturelle maîtrisée', 'Retouche HDR', 'Formats print & web'],
  },
];

const processSteps = [
  { num: '01', title: 'Brief & moodboard', description: 'Définition du style, repérage des lieux, préparation des tenues et des accessoires.' },
  { num: '02', title: 'Séance photo', description: 'Session guidée, direction artistique, lumière maîtrisée et ambiance posée.' },
  { num: '03', title: 'Sélection & retouche', description: 'Tri des meilleures images, retouches professionnelles, harmonisation colorimétrique.' },
  { num: '04', title: 'Livraison rapide', description: 'Galerie sécurisée, formats optimisés pour vos canaux web & print, sauvegarde longue durée.' },
];

export function ServicePhotographie() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.photographyService,
      url: `${window.location.origin}/services/photographie`
    });
  }, []);

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

  const scrollToContact = () => {
    const footer = document.querySelector('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative min-h-[60vh] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250924_2210_Elegant%20Studio%20Photography_simple_compose_01k5ynf4s3ea582mksy2kf032p.png"
            alt="Studio photo contemporain avec éclairages professionnels"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-end min-h-[60vh]">
          <div className="reveal">
            <span className="inline-block border border-white/30 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/70 mb-6">
              Photographie
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-4">
              Photographie professionnelle<br />& direction artistique
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
              Portraits, reportages, packshots, campagnes : composez des images qui laissent une empreinte.
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="py-16 reveal">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200">
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Text left */}
            <div className="reveal">
              <p className="text-lg text-gray-500 leading-relaxed">
                Plus qu'un simple shooting, nous créons une expérience. Chaque séance est pensée pour refléter votre identité,
                votre équipe ou vos produits sous leur meilleur angle, avec une direction artistique sur-mesure et un workflow
                parfaitement orchestré. Chez GND Consulting, nous mettons en scène votre univers pour créer des visuels qui
                marquent durablement, avec un matériel haut de gamme, une lumière maîtrisée et des retouches soignées.
              </p>
            </div>

            {/* Prestations list right */}
            <div className="reveal delay-100">
              <h3 className="font-display font-semibold text-xl text-black mb-6">Nos prestations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prestations.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-xl text-gray-400 mt-0.5">{item.icon}</span>
                    <span className="text-sm text-gray-600">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="py-32 bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16">
            <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Processus
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black">
              Un workflow fluide et cadré
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.num} className={`reveal delay-${index === 0 ? '75' : index === 1 ? '100' : index === 2 ? '150' : '200'}`}>
                <div className="border-t-2 border-black pt-6">
                  <span className="font-display font-bold text-4xl text-gray-200 block mb-4">{step.num}</span>
                  <h3 className="font-display font-semibold text-lg text-black mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETS LIÉS */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16">
            <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Portfolio
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black">
              Projets photographie
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { title: 'PORTRAITS CORPORATE – STARTUP TECH', tag: 'Portrait corporate' },
              { title: 'SÉMINAIRE ANNUEL – GROUPE FINANCIER', tag: 'Événementiel' },
            ].map((project, index) => (
              <div key={project.title} className={`reveal ${index % 2 === 1 ? 'delay-150 md:mt-24' : 'delay-75'}`}>
                <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'} bg-gray-200 group`}>
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="mt-4">
                  <h3 className="font-display font-semibold text-lg text-black">{project.title}</h3>
                  <span className="border border-gray-300 rounded-full text-xs uppercase tracking-[0.15em] px-3 py-1 text-gray-500 mt-2 inline-block">
                    {project.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 reveal">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black mb-4">
            Prêt à créer des visuels inoubliables ?
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            Transformons vos idées en images qui inspirent confiance, désir et engagement.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 font-medium text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          >
            Réserver une séance
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </button>
        </div>
      </section>
    </main>
  );
}
