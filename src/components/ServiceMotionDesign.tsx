import React, { useEffect } from 'react';
import { updateMetaTags, pageSEO } from '../utils/seo';

const prestations = [
  { icon: 'animation', title: 'Animation 2D/3D' },
  { icon: 'brand_awareness', title: 'Motion branding' },
  { icon: 'movie_edit', title: 'Habillage vidéo' },
  { icon: 'phone_iphone', title: 'Contenus animés réseaux sociaux' },
  { icon: 'ads_click', title: 'Motion pour campagnes publicitaires' },
  { icon: 'school', title: 'Vidéos explicatives / pédagogiques' },
];

const processSteps = [
  { num: '01', title: 'Brief', description: 'Analyse de vos enjeux, cibles et objectifs pour définir la bonne direction créative.' },
  { num: '02', title: 'Storyboard', description: 'Écriture du script et storyboard séquence par séquence pour valider le fil narratif.' },
  { num: '03', title: 'Animation', description: 'Mise en mouvement 2D/3D, transitions fluides, création graphique et habillages visuels.' },
  { num: '04', title: 'Son', description: 'Sound design, habillages sonores et voix-off optionnelle pour sublimer chaque séquence.' },
  { num: '05', title: 'Livraison', description: 'Export HD, formats réseaux sociaux, sous-titres et fichiers sources disponibles sur demande.' },
];

export function ServiceMotionDesign() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.motionDesignService,
      url: `${window.location.origin}/services/motion-design`
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
            src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250923_2241_Atelier%20Motion%20Design_simple_compose_01k5w4v1pkee2r37dkh7ppkb18.png"
            alt="Atelier Motion Design - Équipe créative en pleine production vidéo animée"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-end min-h-[60vh]">
          <div className="reveal">
            <span className="inline-block border border-white/30 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/70 mb-6">
              Motion Design
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-4">
              Motion design<br />sur mesure
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
              Animez vos idées. Dynamisez votre image. Attirez votre public.
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
                Chez GND Consulting, nous créons des vidéos en motion design qui informent, séduisent et déclenchent l'action.
                Simplifier un concept complexe, dynamiser vos réseaux sociaux ou présenter votre marque : chaque animation est
                pensée pour vous démarquer et engager votre audience. Nos créations sont optimisées pour le digital, prêtes à
                booster votre branding et vos conversions.
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
              Projets motion design
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { title: 'ANIMATION BRAND REVEAL', tag: 'Motion branding' },
              { title: 'CAPSULE SOCIAL MEDIA', tag: 'Contenus animés' },
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
            Donnez du mouvement à vos messages
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            Animation produit, storytelling, lancement de marque ou formation interne : nous composons le motion design
            qui fera vibrer votre audience.
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
