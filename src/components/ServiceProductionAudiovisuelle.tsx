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
  PenSquare,
  ArrowRight
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
    <main id="main-content" className="min-h-screen bg-white text-gray-900 font-sans">
      {/* SECTION 1 — HERO */}
      <section
        data-service-section="hero"
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        aria-labelledby="service-production-hero-title"
      >
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative max-w-[1400px] mx-auto w-full px-6 lg:px-12 pb-20">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-widest text-white uppercase backdrop-blur-sm mb-8">
            PRODUCTION AUDIOVISUELLE
          </span>
          <p className="text-white/70 max-w-xl text-lg mb-12">
            Captation live, montage, clips, corporate : nous sublimons vos histoires en images.
          </p>
          <a
            href="/#contact-form"
            className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-4 text-sm font-medium hover:bg-gray-100 transition-colors mb-12"
          >
            Demander un devis personnalisé
            <ArrowRight className="w-4 h-4" />
          </a>
          <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <h1
              id="service-production-hero-title"
              className="font-display text-6xl md:text-8xl text-white leading-[0.95]"
            >
              Production audiovisuelle<br />
              <span className="italic text-white/70 font-light">sur-mesure</span>
            </h1>
            <div className="flex gap-8 text-xs uppercase tracking-widest text-white/50">
              <span>Paris, FR</span>
              <span>4K / 8K</span>
              <span>On & Off site</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — INTRO TEXTE */}
      <section
        data-service-section="intro"
        className="bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed">
            Deux décennies de captation, montage et post-production nous ont appris une chose : une vidéo réussie est un
            savant mélange d&apos;émotion, de rythme et d&apos;exigence technique. Chez GND Consulting, nous concevons des contenus
            audiovisuels qui{' '}
            <strong className="font-semibold text-gray-900">attirent l&apos;attention, racontent votre histoire</strong>{' '}
            et génèrent le bon impact, quel que soit le support de diffusion.
          </p>
        </div>
      </section>

      {/* SECTION 3 — NOS EXPERTISES VIDÉO */}
      <section
        data-service-section="services"
        className="bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium tracking-widest text-gray-600 uppercase mb-8">
              NOTRE OFFRE
            </span>
            <h2 className="font-display text-5xl font-semibold text-gray-900">
              Nos expertises vidéo
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-500">
              Une offre complète, de la captation live au montage final, pour couvrir tous vos besoins audiovisuels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertises.map((item) => {
              const IconComponent = item.icon;
              return (
                <article
                  key={item.title}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:bg-black hover:text-white transition-all duration-300 group flex flex-col gap-4"
                >
                  <IconComponent className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-400 group-hover:text-gray-400 transition-colors duration-300">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 group-hover:border-gray-600 group-hover:text-gray-400 mt-auto self-start transition-colors duration-300">
                    {item.delay}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PROCESSUS */}
      <section
        data-service-section="methodology"
        className="bg-gray-50 py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium tracking-widest text-gray-600 uppercase mb-8">
              PROCESSUS
            </span>
            <h2 className="font-display text-5xl font-semibold text-gray-900">
              Un processus cadré, de bout en bout
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <article
                  key={step.title}
                  className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:bg-black hover:text-white transition-all duration-300 group overflow-hidden"
                >
                  <span className="absolute top-4 right-6 text-7xl font-bold text-gray-100 group-hover:text-gray-800 select-none leading-none transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <IconComponent className="w-6 h-6 mb-4 text-gray-900 group-hover:text-white transition-colors duration-300" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — NOS 4 PILIERS */}
      <section
        data-service-section="advantages"
        className="bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl font-semibold text-gray-900">
              Nos 4 piliers pour une vidéo réussie
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:bg-black hover:text-white transition-all duration-300 group flex flex-col gap-4"
                >
                  <span className="text-xs font-medium tracking-widest text-gray-400 group-hover:text-gray-500 uppercase mb-4 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <IconComponent className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6 — STATS / IMPACT */}
      <section
        data-service-section="impact"
        className="bg-black py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-widest text-white uppercase border border-white/20 mb-8">
              IMPACT
            </span>
            <h2 className="font-display text-5xl font-semibold text-white">
              Pourquoi miser sur la vidéo ?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Des chiffres clés qui montrent la puissance de l&apos;audiovisuel pour votre communication.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {videoImpacts.map((impact, index) => (
              <div
                key={impact.stat}
                className={index > 0 ? 'border-l border-white/10 pl-8' : ''}
              >
                <span className="text-5xl font-display font-bold text-white mb-2 block">
                  {impact.stat}
                </span>
                <span className="text-sm font-semibold text-gray-300 mb-3 block">
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

      {/* SECTION 7 — FAQ */}
      <section className="bg-white py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium tracking-widest text-gray-600 uppercase mb-8">
              FAQ
            </span>
            <h2 className="font-display text-5xl font-semibold text-gray-900">
              Questions fréquentes
            </h2>
            <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto">
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
                    className="w-full flex items-center justify-between text-left font-semibold text-gray-900 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-500 text-sm leading-relaxed mt-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-gray-500 mt-12">
            Une autre question ?{' '}
            <a
              href="/#contact-form"
              className="text-gray-900 font-medium underline underline-offset-4 hover:no-underline"
            >
              Contactez-nous
            </a>
          </p>
        </div>
      </section>

      {/* SECTION 8 — CTA FINAL */}
      <section
        data-service-section="cta-final"
        className="bg-black py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px] text-center flex flex-col items-center">
          <h2 className="font-display text-5xl font-semibold text-white">
            Prêt à tourner votre prochaine vidéo ?
          </h2>
          <p className="mt-6 text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Nous mettons notre énergie créative et notre expertise technique au service de vos ambitions. Briefons-nous et
            imaginons ensemble la production qui marquera votre audience.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/#contact-form"
              className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-4 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Demander un devis personnalisé
            </a>
            <a
              href="/#realisations"
              className="inline-flex items-center gap-2 border border-gray-600 text-white rounded-full px-8 py-4 text-sm font-medium hover:border-white transition-colors"
            >
              Voir nos réalisations
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
