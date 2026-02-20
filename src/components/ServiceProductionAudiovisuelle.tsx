import React, { useEffect, useState } from 'react';
import { updateMetaTags, pageSEO } from '../utils/seo';

/* ── Assets ── */
const IMAGE_HERO = 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png';
const VIDEO_MP4 = 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4';
const IMAGE_GND_COVER = 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png';

export function ServiceProductionAudiovisuelle() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.productionService,
      url: `${window.location.origin}/services/production-audiovisuelle`
    });
  }, []);

  /* ── Reveal on scroll (IntersectionObserver) ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── FAQ state ── */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ── Data ── */
  const expertises = [
    { icon: 'videocam', title: 'Captation live & technique', description: 'Multi-caméras 4K/8K, régie vidéo, projection & retours écrans, streaming multiplateforme.', tags: 'Multi-caméras 4K/8K • Régie vidéo • Streaming', delay: '1 à 2 semaines' },
    { icon: 'cut', title: 'Montage vidéo', description: 'Montage professionnel, étalonnage couleur, sound design et effets visuels.', tags: 'Étalonnage • Sound design • Effets visuels', delay: '5 à 10 jours' },
    { icon: 'music_note', title: 'Clips & contenus artistiques', description: 'Clips musicaux, vidéos créatives, univers stylisés et narration immersive.', tags: 'Clips musicaux • Univers stylisés', delay: '2 à 4 semaines' },
    { icon: 'photo_camera', title: 'Captation événementielle', description: 'Tournage terrain, reportages, captation discrète et interviews professionnelles.', tags: 'Reportages • Interviews pro', delay: '1 à 2 semaines' },
    { icon: 'smartphone', title: 'Vidéos social media', description: 'Reels, Stories, formats verticaux et contenus viraux pour TikTok, Instagram, YouTube.', tags: 'Reels • Stories • Formats verticaux', delay: '3 à 7 jours' },
    { icon: 'business_center', title: 'Corporate & e-learning', description: "Vidéos d'entreprise, formations, présentation produit et contenus pédagogiques.", tags: 'Corporate • Formations • E-learning', delay: '1 à 3 semaines' }
  ];

  const steps = [
    { num: '01', icon: 'target', title: 'Préparation & brief', desc: 'Brief créatif, repérages, scénario, moodboard et rétroplanning détaillé.' },
    { num: '02', icon: 'photo_camera', title: 'Captation', desc: 'Tournage professionnel avec équipe dédiée et matériel adapté à votre projet.' },
    { num: '03', icon: 'edit', title: 'Montage & post-production', desc: 'Montage, étalonnage, sound design, motion graphics, sous-titres et versions sociales.' },
    { num: '04', icon: 'check_circle', title: 'Finalisation & livraison', desc: 'Validation finale et export de tous les formats nécessaires + archivage des sources.' }
  ];

  const pillars = [
    { num: '01', icon: 'auto_awesome', title: 'Créativité sur-mesure', desc: 'Chaque projet est pensé pour être unique, impactant et aligné sur votre stratégie de marque.' },
    { num: '02', icon: 'bolt', title: 'Agilité & réactivité', desc: "Micro-structure flexible, épaulée par un réseau d'experts activable selon les besoins." },
    { num: '03', icon: 'groups', title: 'Accompagnement personnalisé', desc: 'Nous co-construisons avec vos équipes pour créer des contenus qui vous ressemblent.' },
    { num: '04', icon: 'smart_toy', title: 'Outils modernes intégrés', desc: 'Workflow optimisé avec IA, automatisations et process fluides pour livrer plus vite.' }
  ];

  const stats = [
    { value: '1200%', label: 'de partages', desc: "Les vidéos génèrent jusqu'à 12× plus de partages qu'une image ou un texte." },
    { value: '95%', label: 'de mémorisation', desc: "Un message en vidéo est retenu beaucoup plus longtemps qu'un message uniquement textuel." },
    { value: '80%', label: 'des utilisateurs', desc: 'Préfèrent découvrir un produit ou un service via une vidéo plutôt que du texte.' },
    { value: '5x', label: "plus d'engagement", desc: "Les campagnes intégrant la vidéo déclenchent plus d'interactions et de conversions." }
  ];

  const faqItems = [
    { question: 'Combien de temps dure une production vidéo ?', answer: 'Cela dépend du projet : une vidéo social media peut être livrée en 3 à 7 jours, un corporate en 1 à 3 semaines. Nous établissons toujours un rétroplanning précis dès le brief.' },
    { question: 'Peut-on filmer dans plusieurs lieux ?', answer: "Oui, absolument. Nous intervenons sur toute la France et à l'international. Les frais de déplacement sont intégrés au devis." },
    { question: 'Pouvez-vous gérer uniquement le montage ?', answer: "Tout à fait. Si vous avez déjà des rushes, nous prenons en charge le montage, l'étalonnage, le sound design et les livrables finaux." },
    { question: 'Quel budget prévoir ?', answer: "Nos projets démarrent à partir de 800€ pour une vidéo social media. Un corporate ou une captation événementielle commence autour de 2 000€. Chaque projet fait l'objet d'un devis sur-mesure." },
    { question: 'Comment se déroule le premier brief ?', answer: 'On commence par un appel de 30 minutes pour comprendre vos objectifs. Ensuite, nous envoyons une proposition créative et un devis détaillé sous 48h.' }
  ];

  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1A1A1A] font-sans">
      <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-end pt-32 pb-0 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={IMAGE_HERO} alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="max-w-[1400px] mx-auto w-full z-10 relative pb-20">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest text-white/70 mb-8 reveal">Production Audiovisuelle</span>
          <h1 className="font-display font-semibold text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight text-white mb-0 reveal">
            Production audiovisuelle<br />
            <span className="text-white/50 italic font-light">sur-mesure</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/20 pt-8 mt-12 reveal">
            <p className="text-lg text-white/70 max-w-md leading-relaxed">Captation live, montage, clips, corporate : nous sublimons vos histoires en images.</p>
            <div className="flex flex-col sm:flex-row items-end gap-8">
              <div className="flex gap-10 text-sm font-medium tracking-wide uppercase text-white/60">
                <span>Paris, FR</span><span>4K / 8K</span><span>ON & OFF SITE</span>
              </div>
              <a href="/#contact-form" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-all hover:scale-105 whitespace-nowrap">
                Demander un devis <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWREEL */}
      <section className="py-8 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer reveal">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105">
              <source src={VIDEO_MP4} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white transform scale-90 opacity-80 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                <span className="material-symbols-outlined text-3xl">play_arrow</span>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs font-mono uppercase tracking-widest mb-2 opacity-80">Showreel 2024</p>
              <p className="text-2xl font-display font-medium">Production & Captation</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="aspect-[4/5] rounded-t-full rounded-b-[2.5rem] overflow-hidden relative shadow-xl">
                <img src={IMAGE_GND_COVER} alt="GND Consulting Studio" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white p-4 rounded-full shadow-lg items-center justify-center z-10 hidden md:flex">
                <div className="text-center">
                  <span className="block text-4xl font-display font-bold text-black">50+</span>
                  <span className="text-xs uppercase tracking-widest text-gray-500">Projets<br />Livrés</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 reveal">
            <span className="inline-block py-1 px-3 border border-gray-300 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Notre approche</span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold mb-8 leading-tight">
              L&apos;image qui<br /><span className="text-gray-400 italic font-light">raconte votre histoire.</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-500 leading-relaxed max-w-2xl">
              <p>Deux décennies de captation, montage et post-production nous ont appris une chose : une vidéo réussie est un savant mélange d&apos;émotion, de rythme et d&apos;exigence technique.</p>
              <p>Chez GND Consulting, nous concevons des contenus audiovisuels qui attirent l&apos;attention, racontent votre histoire et génèrent le bon impact, quel que soit le support de diffusion.</p>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <div className="px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100"><h4 className="font-display font-bold text-2xl mb-1">Captation</h4><p className="text-sm text-gray-500">4K / 8K Pro</p></div>
              <div className="px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100"><h4 className="font-display font-bold text-2xl mb-1">Montage</h4><p className="text-sm text-gray-500">Post-production</p></div>
              <div className="px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100"><h4 className="font-display font-bold text-2xl mb-1">Livraison</h4><p className="text-sm text-gray-500">Tous formats</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISES */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal">
            <div>
              <span className="inline-block py-1 px-3 border border-gray-300 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Notre offre</span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">Nos expertises vidéo</h2>
              <p className="text-gray-500 text-lg">Une offre complète, de la captation live au montage final.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertises.map((item, i) => (
              <div key={item.title} className="group relative bg-gray-50 rounded-2xl p-8 flex flex-col overflow-hidden hover:bg-black hover:text-white transition-colors duration-500 reveal" style={{ transitionDelay: `${i * 75}ms` }}>
                <div className="relative z-10 flex-1">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-black group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3 text-[#1A1A1A] group-hover:text-white transition-colors duration-500">{item.title}</h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-400 leading-relaxed transition-colors duration-500">{item.description}</p>
                  <p className="mt-3 text-xs text-[#64748B]/60 group-hover:text-gray-400 transition-colors duration-500">{item.tags}</p>
                </div>
                <div className="relative z-10 flex flex-col gap-3 mt-8">
                  <span className="text-xs font-mono uppercase tracking-widest border-b border-white/30 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 inline-block">En savoir plus</span>
                  <span className="inline-block text-xs px-3 py-1 rounded-full border border-gray-300 group-hover:border-white/30 text-gray-400 group-hover:text-gray-300 w-fit transition-colors duration-500">{item.delay}</span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <img src={IMAGE_HERO} alt="" className="w-full h-full object-cover grayscale" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20 reveal">
            <span className="inline-block py-1 px-3 border border-gray-300 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Processus</span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold">Comment on travaille<br /><span className="text-gray-400 italic font-light">ensemble.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="bg-white border border-gray-100 rounded-2xl p-8 reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="text-7xl font-display font-bold text-gray-100 block mb-4 leading-none select-none">{step.num}</span>
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mb-6"><span className="material-symbols-outlined text-white text-sm">{step.icon}</span></div>
                <h3 className="font-display text-xl font-semibold mb-3 text-[#1A1A1A]">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILIERS */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20 reveal">
            <h2 className="font-display text-4xl md:text-6xl font-semibold">Nos 4 piliers<br /><span className="text-gray-400 italic font-light">pour une vidéo réussie.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => (
              <div key={pillar.num} className="group bg-gray-50 rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="text-xs font-medium tracking-widest text-[#64748B]/60 group-hover:text-gray-500 uppercase block mb-6 transition-colors duration-500">{pillar.num}</span>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-[#1A1A1A] group-hover:bg-white/10 group-hover:text-white transition-all duration-500"><span className="material-symbols-outlined">{pillar.icon}</span></div>
                <h3 className="font-display text-xl font-semibold mb-3 text-[#1A1A1A] group-hover:text-white transition-colors duration-500">{pillar.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed group-hover:text-gray-300 transition-colors duration-500">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-32 px-6 lg:px-12 bg-black text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20 reveal">
            <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white/50 mb-8">Impact</span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold">Pourquoi miser<br /><span className="text-white/40 italic font-light">sur la vidéo ?</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto mt-6">Des chiffres clés qui montrent la puissance de l&apos;audiovisuel pour votre communication.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-16">
            {stats.map((stat, i) => (
              <div key={stat.value} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="font-display text-6xl md:text-8xl font-bold mb-3">{stat.value}</p>
                <p className="text-sm font-medium uppercase tracking-widest text-white/50 mb-3">{stat.label}</p>
                <p className="text-sm text-white/40 leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 reveal">
            <span className="inline-block py-1 px-3 border border-gray-300 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">FAQ</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">Questions fréquentes</h2>
            <p className="text-gray-500 text-lg max-w-xl">Toutes les réponses à vos interrogations sur nos productions vidéo.</p>
          </div>
          <div className="reveal">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border-b border-gray-200">
                  <button onClick={() => setOpenFaq(isOpen ? null : index)} className="w-full flex justify-between items-center py-6 text-left">
                    <span className="font-display text-lg font-medium text-[#1A1A1A]">{item.question}</span>
                    <span className="material-symbols-outlined text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>add</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-500 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-500 mt-12 reveal">Une autre question ?{' '}<a href="/#contact-form" className="text-[#1A1A1A] font-medium underline underline-offset-4 hover:no-underline">Contactez-nous</a></p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-24 px-6 lg:px-12 mt-16 rounded-t-3xl md:rounded-t-[3rem] mx-2 lg:mx-4">
        <div className="max-w-[1400px] mx-auto text-center reveal">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">Prêt à tourner<br />votre prochaine vidéo ?</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-12">Nous mettons notre énergie créative et notre expertise technique au service de vos ambitions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact-form" className="inline-flex justify-center items-center px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">Demander un devis personnalisé</a>
            <a href="/#realisations" className="inline-flex justify-center items-center px-8 py-4 border border-white/30 rounded-full font-medium hover:bg-white/10 transition-colors">Voir nos réalisations</a>
          </div>
        </div>
      </section>
    </main>
  );
}
