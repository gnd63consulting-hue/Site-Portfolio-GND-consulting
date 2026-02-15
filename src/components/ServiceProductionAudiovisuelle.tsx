import React, { useEffect } from 'react';
import { updateMetaTags, pageSEO } from '../utils/seo';

const expertises = [
  {
    icon: 'videocam',
    title: 'Captation live & technique',
    description: 'Conférences, cultes, concerts ou événements à grande échelle. Régie, multi-caméras, diffusion live, retours écrans.',
    features: ['Multi-caméras 4K/8K', 'Régie vidéo (ATEM, OBS)', 'Projection & retours écrans', 'Streaming multiplateforme'],
  },
  {
    icon: 'edit_note',
    title: 'Montage vidéo',
    description: 'Un montage rythmé, clair et optimisé pour le format cible. Nous transformons vos rushs en histoires puissantes.',
    features: ['Montage professionnel', 'Étalonnage couleur', 'Sound design', 'Effets visuels'],
  },
  {
    icon: 'auto_awesome',
    title: 'Clips & contenus artistiques',
    description: 'Pour artistes, performeurs ou associations : des visuels sur-mesure, riches en narration.',
    features: ['Clips musicaux', 'Vidéos créatives', 'Univers stylisés', 'Narration immersive'],
  },
  {
    icon: 'movie',
    title: 'Captation événementielle',
    description: 'Interviews, reportages, conférences. Nous capturons chaque instant avec finesse et discrétion.',
    features: ['Tournage terrain', 'Reportages dynamiques', 'Captation discrète', 'Interviews pro'],
  },
  {
    icon: 'smartphone',
    title: 'Vidéos social media',
    description: 'Formats courts, immersifs et engageants pour TikTok, Instagram, YouTube Shorts ou LinkedIn.',
    features: ['Reels dynamiques', 'Stories animées', 'Formats verticaux', 'Contenus viraux'],
  },
  {
    icon: 'desktop_windows',
    title: 'Corporate & e-learning',
    description: 'Présentations d\'entreprise, vidéos de formation, contenus internes, témoignages clients.',
    features: ['Vidéos corporate', 'Formations e-learning', 'Présentation produit', 'Contenus pédagogiques'],
  },
];

const processSteps = [
  { num: '01', title: 'Préparation & brief', description: 'Brief créatif, repérages, scénario, moodboard et rétroplanning détaillé.' },
  { num: '02', title: 'Captation', description: 'Tournage professionnel avec équipe dédiée et matériel adapté à votre projet.' },
  { num: '03', title: 'Montage & post-production', description: 'Montage, étalonnage, sound design, motion graphics, sous-titres et versions sociales.' },
  { num: '04', title: 'Finalisation & livraison', description: 'Validation finale et export de tous les formats nécessaires + archivage des sources.' },
];

export function ServiceProductionAudiovisuelle() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.productionService,
      url: `${window.location.origin}/services/production-audiovisuelle`
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
          <video
            className="w-full h-full object-cover"
            autoPlay muted loop playsInline preload="auto"
          >
            <source src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-end min-h-[60vh]">
          <div className="reveal">
            <span className="inline-block border border-white/30 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/70 mb-6">
              Production Audiovisuelle
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-4">
              Production audiovisuelle<br />sur-mesure
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
              Captation live, montage, clips, corporate : nous sublimons vos histoires en images.
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
                Deux décennies de captation, montage et post-production nous ont appris une chose : une vidéo réussie est un
                savant mélange d'émotion, de rythme et d'exigence technique. Chez GND Consulting, nous concevons des contenus
                audiovisuels qui attirent l'attention, racontent votre histoire et
                génèrent le bon impact, quel que soit le support de diffusion.
              </p>
            </div>

            {/* Prestations list right */}
            <div className="reveal delay-100">
              <h3 className="font-display font-semibold text-xl text-black mb-6">Nos prestations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertises.map((item) => (
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
              Projets audiovisuels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Project placeholders */}
            {[
              { title: 'ESTHER SEEMS – BOBINE', tag: 'Clip musical' },
              { title: 'SABAY FESTIVAL 2023', tag: 'Événementiel' },
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
            Nous mettons notre énergie créative et notre expertise technique au service de vos ambitions.
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
