import React, { useEffect } from 'react';
import { updateMetaTags, pageSEO } from '../utils/seo';

const prestations = [
  { icon: 'brush', title: 'Logo & identité visuelle' },
  { icon: 'palette', title: 'Charte graphique' },
  { icon: 'print', title: 'Supports print' },
  { icon: 'inventory_2', title: 'Packaging' },
  { icon: 'devices', title: 'UI/UX Design' },
  { icon: 'auto_fix_high', title: 'Refonte d\'identité existante' },
];

const processSteps = [
  { num: '01', title: 'Brief', description: 'Écoute approfondie de votre histoire, vos valeurs, votre audience et vos objectifs pour poser les fondations créatives.' },
  { num: '02', title: 'Recherche', description: 'Analyse concurrentielle, moodboards, exploration typographique et chromatic pour définir la direction artistique.' },
  { num: '03', title: 'Concepts', description: 'Création de plusieurs pistes créatives originales, chaque proposition racontant votre histoire de manière unique.' },
  { num: '04', title: 'Validation', description: 'Affinage collaboratif du concept retenu : 3 rounds de modifications inclus pour atteindre la perfection.' },
  { num: '05', title: 'Livraison', description: 'Export de tous les formats nécessaires (AI, EPS, SVG, PNG, JPG) accompagnés d\'un guide d\'utilisation complet.' },
];

export function ServiceDesign() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.designService,
      url: `${window.location.origin}/services/design-identite-visuelle`
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
            src="/20250923_1821_Vibrant Design Collaboration_simple_compose_01k5vnxw54fz9v244n3dr8mgjr copy.png"
            alt="Studio créatif moderne - Design graphique et identité visuelle sur mesure"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-end min-h-[60vh]">
          <div className="reveal">
            <span className="inline-block border border-white/30 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/70 mb-6">
              Design & Identité Visuelle
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-4">
              Faites parler<br />votre image
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
              Design graphique & identité visuelle sur mesure pour marques ambitieuses.
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="py-16 reveal">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200">
            <img
              src="/20250923_1821_Vibrant Design Collaboration_simple_compose_01k5vnxw55e4evcwhnpmf5f7eb.png"
              alt="Équipe créative au travail - Design et branding"
              className="w-full h-full object-cover"
              loading="lazy"
            />
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
                Chez GND Consulting, nous croyons que le design graphique n'est pas qu'une question
                d'esthétique. C'est un pilier stratégique qui raconte votre histoire, transmet vos valeurs
                et crée une connexion émotionnelle durable avec votre audience. Chaque trait, chaque couleur,
                chaque forme est pensée pour faire vibrer votre marque et la rendre inoubliable.
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
              Notre processus
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.num} className={`reveal delay-${index === 0 ? '75' : index === 1 ? '100' : index === 2 ? '150' : index === 3 ? '200' : '300'}`}>
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
              Projets design
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { title: 'IDENTITÉ VISUELLE – MARQUE LIFESTYLE', tag: 'Branding' },
              { title: 'CHARTE GRAPHIQUE – STARTUP TECH', tag: 'Identité visuelle' },
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
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            Créons ensemble une identité visuelle qui vous ressemble et qui marquera les esprits.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 font-medium text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          >
            Discutons-en
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </button>
        </div>
      </section>
    </main>
  );
}
