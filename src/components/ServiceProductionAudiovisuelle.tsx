import React, { useEffect } from 'react';
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
  Heart,
  TrendingUp,
  Eye,
  Award,
  PenSquare
} from 'lucide-react';
import { UnifiedFAQ } from './UnifiedFAQ';
import { updateMetaTags, pageSEO } from '../utils/seo';
import { ButtonGND } from './ButtonGND';

export function ServiceProductionAudiovisuelle() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.productionService,
      url: `${window.location.origin}/services/production-audiovisuelle`
    });
  }, []);

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
      icon: TrendingUp,
      stat: '1200%',
      title: 'de partages',
      description: 'Les vidéos génèrent jusqu\u2019à 12 fois plus de partages que du contenu image ou texte.'
    },
    {
      icon: Eye,
      stat: '95%',
      title: 'de mémorisation',
      description: 'Un message en vidéo est retenu beaucoup plus longtemps qu\u2019un message uniquement textuel.'
    },
    {
      icon: Heart,
      stat: '80%',
      title: 'des utilisateurs',
      description: 'Préfèrent découvrir un produit ou un service via une vidéo plutôt que du texte.'
    },
    {
      icon: Award,
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

  const themeColors = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
  };

  return (
    <main id="main-content" className="service-page service-production min-h-screen bg-white text-[#1A1A1A] font-sans">
      {/* HERO — vidéo plein écran + overlay + badge catégorie */}
      <section
        data-service-section="hero"
        className="relative overflow-hidden"
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
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative mx-auto flex min-h-[60vh] w-full max-w-[1400px] flex-col items-center justify-end gap-6 px-6 pb-16 pt-32 text-center lg:px-12 lg:min-h-[88vh] lg:pb-24">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-widest text-white uppercase backdrop-blur-sm">
            PRODUCTION AUDIOVISUELLE
          </span>
          <h1
            id="service-production-hero-title"
            className="font-display text-balance text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.9] tracking-tight text-white"
          >
            Production audiovisuelle sur-mesure
          </h1>
          <p className="max-w-2xl text-balance text-[clamp(1.125rem,3vw,1.75rem)] font-light leading-relaxed text-white/70">
            Captation live, montage, clips, corporate : nous sublimons vos histoires en images.
          </p>
          <a href="/#contact-form" className="inline-flex items-center gap-2 bg-white text-black rounded-full px-8 py-4 text-sm font-medium hover:bg-gray-100 transition-colors">
            Demander un devis personnalisé →
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section
        data-service-section="intro"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="text-balance text-[clamp(1rem,2.6vw,1.5rem)] leading-relaxed text-gray-700">
            Deux décennies de captation, montage et post-production nous ont appris une chose : une vidéo réussie est un
            savant mélange d&apos;émotion, de rythme et d&apos;exigence technique. Chez GND Consulting, nous concevons des contenus
            audiovisuels qui <strong className="font-semibold text-gray-900">attirent l&apos;attention, racontent votre histoire</strong> et
            génèrent le bon impact, quel que soit le support de diffusion.
          </p>
        </div>
      </section>

      {/* EXPERTISES — 6 cards, grille 3 colonnes */}
      <section
        data-service-section="services"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium tracking-widest text-gray-600 uppercase mb-6">
              Notre offre
            </span>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-gray-900">
              Nos expertises vidéo
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-gray-500">
              Une offre complète, de la captation live au montage final, pour couvrir tous vos besoins audiovisuels.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {expertises.map((item) => {
              const IconComponent = item.icon;
              return (
                <article
                  key={item.title}
                  className="group flex h-full flex-col bg-white border border-gray-200 rounded-2xl p-8 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <IconComponent className="mb-5 h-6 w-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
                  <h3 className="text-[clamp(1.125rem,2.6vw,1.35rem)] font-bold text-gray-900 transition-colors duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="mt-2 text-[clamp(0.9375rem,2.3vw,1rem)] leading-relaxed text-gray-500 transition-colors duration-300 group-hover:text-gray-300">
                    {item.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-5 inline-flex w-fit items-center rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 group-hover:border-gray-600 group-hover:text-gray-400 transition-colors duration-300">
                    {item.delay}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MÉTHODOLOGIE — 4 étapes horizontales numérotées */}
      <section
        data-service-section="methodology"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium tracking-widest text-gray-600 uppercase mb-6">
              Processus
            </span>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-gray-900">
              Un processus cadré et transparent
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-gray-500">
              Nous orchestrons chaque étape pour vous livrer une production fluide, sereine et fidèle à votre vision.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <article
                  key={step.title}
                  className="group relative flex h-full flex-col gap-4 bg-white border border-gray-200 rounded-2xl p-8 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <span className="text-6xl font-bold text-gray-100 group-hover:text-gray-800 select-none absolute top-4 right-6 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <IconComponent className="w-6 h-6 text-gray-900 group-hover:text-white mb-4 transition-colors duration-300" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">{step.title}</h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PILIERS — 4 colonnes */}
      <section
        data-service-section="advantages"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-gray-900">
              Nos 4 piliers pour une vidéo réussie
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="group flex h-full flex-col bg-white border border-gray-200 rounded-2xl p-8 text-center hover:bg-black hover:text-white transition-all duration-300"
                >
                  <span className="text-xs font-medium tracking-widest text-gray-400 group-hover:text-gray-500 uppercase mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <IconComponent className="mx-auto w-6 h-6 text-gray-900 group-hover:text-white mb-4 transition-colors duration-300" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">{pillar.title}</h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPACTS — Pourquoi la vidéo */}
      <section
        data-service-section="impact"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium tracking-widest text-gray-600 uppercase mb-6">
              Impact
            </span>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-gray-900">
              Pourquoi miser sur la vidéo ?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-gray-500">
              Des chiffres clés qui montrent la puissance de l&apos;audiovisuel pour votre communication.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {videoImpacts.map((impact) => {
              const IconComponent = impact.icon;
              return (
                <article
                  key={impact.stat}
                  className="group flex h-full flex-col bg-white border border-gray-200 rounded-2xl p-8 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <IconComponent className="w-6 h-6 text-gray-900 group-hover:text-white mb-4 transition-colors duration-300" />
                  <span className="text-4xl font-display font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">{impact.stat}</span>
                  <h3 className="font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">{impact.title}</h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                    {impact.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <UnifiedFAQ
        title="QUESTIONS FRÉQUENTES"
        subtitle="Toutes les réponses à vos interrogations sur nos productions vidéo."
        description="Processus, formats, budget : nous clarifions les points clés pour lancer votre projet sereinement."
        emoji="🎬"
        faqItems={faqItems}
        themeColor={themeColors}
        ctaText="Démarrer mon projet"
        ctaLink="#contact"
      />

      {/* CTA FINAL */}
      <section
        data-service-section="cta-final"
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-center text-center">
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
            Prêt à tourner votre prochaine vidéo ?
          </h2>
          <p className="mt-4 max-w-3xl text-balance text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-text-muted">
            Nous mettons notre énergie créative et notre expertise technique au service de vos ambitions. Briefons-nous et
            imaginons ensemble la production qui marquera votre audience.
          </p>
          <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            <ButtonGND
              variant="primary"
              onClick={scrollToContact}
              className="w-full max-w-sm sm:w-auto"
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              Demander un devis personnalisé
            </ButtonGND>
            <ButtonGND
              variant="secondary"
              as="a"
              href="/#realisations"
              className="w-full max-w-sm sm:w-auto"
            >
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
              Voir nos réalisations
            </ButtonGND>
          </div>
        </div>
      </section>
    </main>
  );
}
