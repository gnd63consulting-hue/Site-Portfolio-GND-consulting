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
  Clock,
  PenSquare
} from 'lucide-react';
import { UnifiedFAQ } from './UnifiedFAQ';
import { updateMetaTags, pageSEO } from '../utils/seo';

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
        'Présentations d’entreprise, vidéos de formation, contenus internes, témoignages clients ou onboarding.',
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
      description: 'Micro-structure flexible, épaulée par un réseau d’experts activable selon les besoins.'
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
      title: '1200% de partages',
      description: 'Les vidéos génèrent jusqu’à 12 fois plus de partages que du contenu image ou texte.'
    },
    {
      icon: Eye,
      title: '95% de mémorisation',
      description: 'Un message en vidéo est retenu beaucoup plus longtemps qu’un message uniquement textuel.'
    },
    {
      icon: Heart,
      title: '80% des utilisateurs',
      description: 'Préfèrent découvrir un produit ou un service via une vidéo plutôt que du texte.'
    },
    {
      icon: Award,
      title: '5x plus d’engagement',
      description: 'Les campagnes intégrant la vidéo déclenchent plus d’interactions et de conversions.'
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
        'Bien sûr. Nous proposons des prestations “post-production only” si vous disposez déjà de rushs. Nous travaillons avec tous les formats (caméra, smartphone, DSLR…).'
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
    <div className="service-page service-production min-h-screen bg-white text-slate-900">
      {/* HERO */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/55 to-slate-900/70" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-end gap-6 px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-36 lg:min-h-[92vh] lg:pb-24">
          <h1
            id="service-production-hero-title"
            className="text-balance text-[clamp(2.1rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight text-white"
          >
            Production audiovisuelle sur-mesure
          </h1>
          <p className="text-balance text-[clamp(1.125rem,3vw,1.75rem)] font-light leading-relaxed text-white/90">
            Captation live, montage, clips, corporate : nous sublimons vos histoires en images.
          </p>
          <button
            onClick={scrollToContact}
            className="hero-cta inline-flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-[clamp(1rem,2.6vw,1.25rem)] font-bold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:max-w-lg sm:px-8 sm:py-5 lg:max-w-xl lg:px-12 lg:py-6"
          >
            <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
            Demander un devis personnalisé
          </button>
        </div>
      </section>

      {/* INTRO */}
      <section
        data-service-section="intro"
        className="bg-gradient-to-b from-white to-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-balance text-[clamp(1rem,2.6vw,1.5rem)] leading-relaxed text-slate-700">
            Deux décennies de captation, montage et post-production nous ont appris une chose : une vidéo réussie est un
            savant mélange d’émotion, de rythme et d’exigence technique. Chez GND Consulting, nous concevons des contenus
            audiovisuels qui <strong className="text-primary">attirent l’attention, racontent votre histoire</strong> et
            génèrent le bon impact, quel que soit le support de diffusion.
          </p>
        </div>
      </section>

      {/* EXPERTISES */}
      <section
        data-service-section="services"
        className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,3rem)] font-black text-slate-900">
              Nos expertises vidéo
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-slate-600">
              Une offre complète, de la captation live au montage final, pour couvrir tous vos besoins audiovisuels.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {expertises.map((item) => {
              const IconComponent = item.icon;
              return (
                <article
                  key={item.title}
                  className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-8"
                >
                  <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                    <IconComponent className="h-7 w-7" />
                  </span>
                  <h3 className="text-[clamp(1.125rem,2.6vw,1.35rem)] font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-[clamp(0.9375rem,2.3vw,1rem)] leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-[clamp(0.9rem,2.2vw,0.975rem)] text-slate-600">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[0.85rem] font-semibold text-primary">
                    <Clock className="h-4 w-4" />
                    {item.delay}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MÉTHODOLOGIE */}
      <section
        data-service-section="methodology"
        className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,3rem)] font-black text-slate-900">
              Un processus cadré et transparent
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-slate-600">
              Nous orchestrons chaque étape pour vous livrer une production fluide, sereine et fidèle à votre vision.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {methodology.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <article
                  key={step.title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                      <IconComponent className="h-5 w-5" />
                    </span>
                    <h3 className="text-[clamp(1.0625rem,2.3vw,1.2rem)] font-semibold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="pl-[3.6rem] text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PILIERS */}
      <section
        data-service-section="advantages"
        className="bg-gradient-to-br from-blue-50 via-blue-50 to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,2.75rem)] font-black text-slate-900">
              Nos 4 piliers pour une vidéo réussie
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-white/80 bg-white/95 p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                    <IconComponent className="h-7 w-7" />
                  </span>
                  <h3 className="text-[clamp(1.05rem,2.4vw,1.2rem)] font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-slate-600">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPACTS */}
      <section
        data-service-section="impact"
        className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,2.75rem)] font-black text-slate-900">
              Pourquoi miser sur la vidéo ?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-slate-600">
              Des chiffres clés qui montrent la puissance de l’audiovisuel pour votre communication.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {videoImpacts.map((impact) => {
              const IconComponent = impact.icon;
              return (
                <article
                  key={impact.title}
                  className="flex h-full flex-col gap-3 rounded-3xl border border-slate-100 bg-slate-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                    <IconComponent className="h-6 w-6" />
                  </span>
                  <h3 className="text-[clamp(1.0625rem,2.3vw,1.2rem)] font-semibold text-slate-900">{impact.title}</h3>
                  <p className="text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-slate-600">
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
        className="relative overflow-hidden bg-gradient-to-br from-[#F5E8FF] via-white to-blue-50 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="pointer-events-none absolute top-16 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-300/30 to-blue-400/30 blur-3xl sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute bottom-10 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-blue-300/30 to-blue-400/30 blur-3xl sm:h-96 sm:w-96" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="text-balance text-[clamp(1.875rem,5vw,3.5rem)] font-black text-slate-900">
            Prêt à tourner votre prochaine vidéo ?
          </h2>
          <p className="mt-4 max-w-3xl text-balance text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-slate-700">
            Nous mettons notre énergie créative et notre expertise technique au service de vos ambitions. Briefons-nous et
            imaginons ensemble la production qui marquera votre audience.
          </p>
          <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={scrollToContact}
              className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-[clamp(1rem,2.6vw,1.25rem)] font-bold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:w-auto sm:px-10 sm:py-5"
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              Demander un devis personnalisé
            </button>
            <button
              onClick={() => {
                window.location.href = '#realisations';
              }}
              className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl border-2 border-slate-300 px-6 py-4 text-[clamp(1rem,2.4vw,1.15rem)] font-bold text-slate-700 transition-all duration-300 hover:border-slate-500 hover:bg-white/60 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/60 sm:w-auto sm:px-10 sm:py-5"
            >
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
              Voir nos réalisations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
