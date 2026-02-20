import React, { useEffect, useState } from 'react';
import {
  Camera,
  Sparkles,
  Film,
  Smartphone,
  Monitor,
  Target,
  CheckCircle,
  Users,
  Zap,
  Shield,
  Plus,
  Minus,
  PenSquare
} from 'lucide-react';
import { updateMetaTags, pageSEO } from '../utils/seo';

export function ServiceProductionAudiovisuelle() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.productionService,
      url: `${window.location.origin}/services/production-audiovisuelle`
    });
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToContact = () => {
    const contactSection = document.querySelector('footer');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const expertises = [
    {
      icon: Camera,
      title: 'Captation live & technique',
      description:
        'Conférences, cultes, concerts ou événements à grande échelle… nous gérons toute la partie technique : régie, multi-caméras, diffusion live, retours écrans.',
      features: ['Multi-caméras 4K/8K', 'Régie vidéo (ATEM, OBS…)', 'Projection & retours écrans', 'Streaming multiplateforme'],
      delay: '1 à 2 semaines (hors live)'
    },
    {
      icon: PenSquare,
      title: 'Montage vidéo',
      description: 'Un montage rythmé, clair et optimisé pour le format cible. Nous transformons vos rushs en histoires puissantes.',
      features: ['Montage professionnel', 'Étalonnage couleur', 'Sound design', 'Effets visuels'],
      delay: '5 à 10 jours'
    },
    {
      icon: Sparkles,
      title: 'Clips & contenus artistiques',
      description:
        'Pour artistes, performeurs ou associations : nous sublimons votre univers avec des visuels sur-mesure, riches en narration.',
      features: ['Clips musicaux', 'Vidéos créatives', 'Univers stylisés', 'Narration immersive'],
      delay: '2 à 4 semaines'
    },
    {
      icon: Film,
      title: 'Captation événementielle',
      description:
        'Interviews, reportages, conférences… nous capturons chaque instant avec finesse, émotion et discrétion.',
      features: ['Tournage terrain', 'Reportages dynamiques', 'Captation discrète', 'Interviews pro'],
      delay: '1 à 2 semaines'
    },
    {
      icon: Smartphone,
      title: 'Vidéos social media',
      description: 'Formats courts, immersifs et engageants pour TikTok, Instagram, YouTube Shorts ou LinkedIn.',
      features: ['Reels dynamiques', 'Stories animées', 'Formats verticaux', 'Contenus viraux'],
      delay: '3 à 7 jours'
    },
    {
      icon: Monitor,
      title: 'Corporate & e-learning',
      description:
        'Présentations d\u2019entreprise, vidéos de formation, contenus internes, témoignages clients ou onboarding.',
      features: ['Vidéos corporate', 'Formations e-learning', 'Présentation produit', 'Contenus pédagogiques'],
      delay: '1 à 3 semaines'
    }
  ];

  const methodology = [
    {
      icon: Target,
      title: 'Préparation & brief',
      description: 'Brief créatif, repérages, scénario, moodboard et rétroplanning détaillé.'
    },
    {
      icon: Camera,
      title: 'Captation',
      description: 'Tournage professionnel avec équipe dédiée et matériel adapté à votre projet.'
    },
    {
      icon: PenSquare,
      title: 'Montage & post-production',
      description: 'Montage, étalonnage, sound design, motion graphics, sous-titres et versions sociales.'
    },
    {
      icon: CheckCircle,
      title: 'Finalisation & livraison',
      description: 'Validation finale et export de tous les formats nécessaires + archivage des sources.'
    }
  ];

  const pillars = [
    {
      icon: Sparkles,
      title: 'Créativité sur-mesure',
      description: 'Chaque projet est pensé pour être unique, impactant et aligné sur votre stratégie de marque.'
    },
    {
      icon: Zap,
      title: 'Agilité & réactivité',
      description: 'Micro-structure flexible, épaulée par un réseau d\u2019experts activable selon les besoins.'
    },
    {
      icon: Users,
      title: 'Accompagnement personnalisé',
      description: 'Nous co-construisons avec vos équipes pour créer des contenus qui vous ressemblent.'
    },
    {
      icon: Shield,
      title: 'Outils modernes intégrés',
      description: 'Workflow optimisé avec IA, automatisations et process fluides pour livrer plus vite.'
    }
  ];

  const videoImpacts = [
    {
      stat: '1200%',
      title: 'de partages',
      description: 'Les vidéos génèrent jusqu\u2019à 12 fois plus de partages que du contenu image ou texte.'
    },
    {
      stat: '95%',
      title: 'de mémorisation',
      description: 'Un message en vidéo est retenu beaucoup plus longtemps qu\u2019un message uniquement textuel.'
    },
    {
      stat: '80%',
      title: 'des utilisateurs',
      description: 'Préfèrent découvrir un produit ou un service via une vidéo plutôt que du texte.'
    },
    {
      stat: '5x',
      title: 'plus d\u2019engagement',
      description: 'Les campagnes intégrant la vidéo déclenchent plus d\u2019interactions et de conversions.'
    }
  ];

  const faqItems = [
    {
      question: 'Combien de temps dure une production vidéo ?',
      answer:
        'Selon la complexité : montage simple (5-10 jours), production complète avec tournage (2-4 semaines), projets multicaméras (3-6 semaines). Nous vous transmettons un planning détaillé dès la validation du brief.'
    },
    {
      question: 'Peut-on filmer dans plusieurs lieux ?',
      answer:
        'Oui. Nous nous adaptons à vos contraintes géographiques : studio, locaux, extérieur ou multi-sites. Nous organisons logistique, autorisations et repérages.'
    },
    {
      question: 'Pouvez-vous gérer uniquement le montage ?',
      answer:
        'Bien sûr. Nous proposons des prestations \u201Cpost-production only\u201D si vous disposez déjà de rushs. Nous travaillons avec tous les formats (caméra, smartphone, DSLR…).'
    },
    {
      question: 'Quel budget prévoir ?',
      answer:
        'Nous avons des solutions pour toutes les enveloppes. Formats courts, équipe réduite ou tournage complet : nous ajustons la proposition pour maximiser votre impact.'
    },
    {
      question: 'Comment se déroule le premier brief ?',
      answer:
        'Un échange (visio ou téléphone) nous permet de cerner vos objectifs, votre audience et vos contraintes. Nous vous envoyons ensuite un devis détaillé avec planning et livrables.'
    }
  ];

  return (
    <main id="main-content" className="min-h-screen bg-white text-[#1A1A1A] font-sans">

      {/* ================================================================
          SECTION 1 — HERO
          Structure copiée de Hero.tsx homepage :
          min-h-screen, image background, overlay, titre LEFT, metadata dots
          ================================================================ */}
      <section
        data-service-section="hero"
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        aria-labelledby="service-production-hero-title"
      >
        {/* Background vidéo + overlay (même pattern que homepage) */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full pb-20 relative z-10">
          {/* H1 — mêmes classes que Hero.tsx homepage */}
          <h1
            id="service-production-hero-title"
            className="font-display font-semibold text-white leading-[0.9] tracking-tight text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] reveal"
          >
            <span className="block">Production audiovisuelle</span>
            <span className="block italic font-light text-white/60">sur-mesure</span>
          </h1>

          {/* Sous-titre — même pattern que homepage */}
          <p className="mt-8 text-lg text-white/70 leading-relaxed max-w-lg reveal delay-100">
            Captation live, montage, clips, corporate : nous sublimons vos histoires en images.
          </p>

          {/* CTA — bouton noir rounded-full, même que homepage */}
          <div className="mt-12 reveal delay-200">
            <a
              href="/#contact-form"
              className="inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 no-underline hover:no-underline visited:text-white hover:text-white"
            >
              Demander un devis
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </a>
          </div>

          {/* Barre bas — border-t + metadata dots (même style que homepage) */}
          <div className="border-t border-white/20 mt-16 pt-8 flex justify-between items-end reveal delay-300">
            <span className="inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-white/60">
              Production audiovisuelle
            </span>
            <div className="flex items-center gap-6 text-xs text-white/50 uppercase tracking-widest">
              <span>Paris, FR</span>
              <span className="w-1 h-1 bg-white/50 rounded-full"></span>
              <span>4K / 8K</span>
              <span className="w-1 h-1 bg-white/50 rounded-full"></span>
              <span>On & Off site</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — INTRO TEXTE
          ================================================================ */}
      <section
        data-service-section="intro"
        className="reveal py-32 px-6 lg:px-12 bg-white"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl md:text-3xl text-[#64748B] leading-relaxed">
            Deux décennies de captation, montage et post-production nous ont appris une chose : une vidéo réussie est un
            savant mélange d&apos;émotion, de rythme et d&apos;exigence technique. Chez GND Consulting, nous concevons des contenus
            audiovisuels qui{' '}
            <strong className="font-semibold text-[#1A1A1A]">attirent l&apos;attention, racontent votre histoire</strong>{' '}
            et génèrent le bon impact, quel que soit le support de diffusion.
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — NOS EXPERTISES VIDÉO (6 cartes)
          Badge + H2 + grid copiés de la structure homepage Services
          ================================================================ */}
      <section
        data-service-section="services"
        className="reveal py-32 px-6 lg:px-12 bg-white"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* Header — badge border-gray-300 + H2 clamp (homepage) */}
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-8">
              Notre offre
            </span>
            <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95] mb-6">
              Nos expertises vidéo
            </h2>
            <p className="max-w-3xl text-lg text-[#64748B]">
              Une offre complète, de la captation live au montage final, pour couvrir tous vos besoins audiovisuels.
            </p>
          </div>

          {/* Grid 3 colonnes — cards Stitch (même hover que homepage Services) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertises.map((item) => {
              const IconComponent = item.icon;
              return (
                <article
                  key={item.title}
                  className="group bg-white border border-gray-200 rounded-2xl p-8 flex flex-col transition-all duration-500 hover:bg-black hover:text-white hover:border-transparent"
                >
                  <IconComponent className="w-6 h-6 text-[#1A1A1A] group-hover:text-white transition-colors duration-500 mb-5" />
                  <h3 className="font-display text-lg font-semibold text-[#1A1A1A] group-hover:text-white transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#64748B] leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {item.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="text-sm text-[#64748B]/70 group-hover:text-gray-400 transition-colors duration-500">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-6 inline-flex w-fit items-center rounded-full border border-gray-200 px-3 py-1 text-xs text-[#64748B] group-hover:border-gray-600 group-hover:text-gray-400 transition-colors duration-500">
                    {item.delay}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — PROCESSUS (4 étapes)
          ================================================================ */}
      <section
        data-service-section="methodology"
        className="reveal py-32 px-6 lg:px-12 bg-[#F3F4F6]"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-8">
              Processus
            </span>
            <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95]">
              Un processus cadré, de bout en bout
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <article
                  key={step.title}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:bg-black hover:text-white hover:border-transparent"
                >
                  <span className="absolute top-4 right-6 text-7xl font-bold text-gray-100 group-hover:text-gray-800 select-none leading-none transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <IconComponent className="w-6 h-6 mb-4 text-[#1A1A1A] group-hover:text-white transition-colors duration-500" />
                  <h3 className="font-display font-semibold text-[#1A1A1A] group-hover:text-white mb-2 transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#64748B] group-hover:text-gray-300 leading-relaxed transition-colors duration-500">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — NOS 4 PILIERS
          ================================================================ */}
      <section
        data-service-section="advantages"
        className="reveal py-32 px-6 lg:px-12 bg-white"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16">
            <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95]">
              Nos 4 piliers pour une vidéo réussie
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="group bg-white border border-gray-200 rounded-2xl p-8 flex flex-col transition-all duration-500 hover:bg-black hover:text-white hover:border-transparent"
                >
                  <span className="text-xs font-medium tracking-widest text-[#64748B]/60 group-hover:text-gray-500 uppercase mb-4 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <IconComponent className="w-6 h-6 text-[#1A1A1A] group-hover:text-white mb-4 transition-colors duration-500" />
                  <h3 className="font-display font-semibold text-[#1A1A1A] group-hover:text-white mb-2 transition-colors duration-500">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#64748B] group-hover:text-gray-300 leading-relaxed transition-colors duration-500">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — STATS / IMPACT (fond noir)
          ================================================================ */}
      <section
        data-service-section="impact"
        className="reveal py-32 px-6 lg:px-12 bg-black"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-white/60 mb-8">
              Impact
            </span>
            <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-white leading-[0.95] mb-6">
              Pourquoi miser sur la vidéo ?
            </h2>
            <p className="max-w-3xl text-lg text-gray-400">
              Des chiffres clés qui montrent la puissance de l&apos;audiovisuel pour votre communication.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {videoImpacts.map((impact, index) => (
              <div
                key={impact.stat}
                className={index > 0 ? 'border-l border-white/10 pl-8' : ''}
              >
                <span className="block font-display text-5xl font-bold text-white mb-2">
                  {impact.stat}
                </span>
                <span className="block text-sm font-semibold text-gray-300 mb-3">
                  {impact.title}
                </span>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — FAQ
          ================================================================ */}
      <section
        data-service-section="faq"
        className="reveal py-32 px-6 lg:px-12 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-8">
              FAQ
            </span>
            <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95] mb-6">
              Questions fréquentes
            </h2>
            <p className="text-lg text-[#64748B] max-w-xl">
              Toutes les réponses à vos interrogations sur nos productions vidéo.
            </p>
          </div>

          <div className="border-t border-gray-200">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border-b border-gray-200 py-6">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left font-semibold text-[#1A1A1A] cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-[#64748B] flex-shrink-0 ml-4" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#64748B] flex-shrink-0 ml-4" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[#64748B] text-sm leading-relaxed mt-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[#64748B] mt-12">
            Une autre question ?{' '}
            <a
              href="/#contact-form"
              className="text-[#1A1A1A] font-medium underline underline-offset-4 hover:no-underline"
            >
              Contactez-nous
            </a>
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 8 — CTA FINAL (fond noir)
          ================================================================ */}
      <section
        data-service-section="cta-final"
        className="reveal py-32 px-6 lg:px-12 bg-black"
      >
        <div className="mx-auto max-w-[1400px] text-center flex flex-col items-center">
          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-white leading-[0.95]">
            Prêt à tourner votre prochaine vidéo ?
          </h2>
          <p className="mt-6 text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Nous mettons notre énergie créative et notre expertise technique au service de vos ambitions. Briefons-nous et
            imaginons ensemble la production qui marquera votre audience.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="/#contact-form"
              className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:scale-105"
            >
              Demander un devis personnalisé
            </a>
            <a
              href="/#realisations"
              className="inline-flex items-center gap-2 border border-gray-600 text-white rounded-full px-8 py-4 text-sm font-medium transition-all duration-300 hover:border-white hover:scale-105"
            >
              Voir nos réalisations
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
