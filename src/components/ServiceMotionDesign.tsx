import React, { useEffect } from 'react';
import {
  Play,
  CheckCircle,
  Zap,
  Users,
  Target,
  Lightbulb,
  Settings,
  Video,
  Palette,
  Smartphone,
  Monitor,
  Heart,
  Sparkles,
  Clock
} from 'lucide-react';
import { UnifiedFAQ } from './UnifiedFAQ';
import { updateMetaTags, pageSEO } from '../utils/seo';
import { ButtonGND } from './ButtonGND';

export function ServiceMotionDesign() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.motionDesignService,
      url: `${window.location.origin}/services/motion-design`
    });
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector('footer');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const services = [
    {
      icon: Video,
      title: 'Vidéos explicatives / pédagogiques',
      description: 'Simplifiez vos concepts complexes avec des animations claires et engageantes.'
    },
    {
      icon: Zap,
      title: 'Animations 2D / 3D sur mesure',
      description: 'Créations originales adaptées à votre univers visuel et à vos objectifs marketing.'
    },
    {
      icon: Monitor,
      title: 'Habillages graphiques animés',
      description: 'Transitions, génériques, lower thirds pour professionnaliser vos contenus.'
    },
    {
      icon: Smartphone,
      title: 'Formats sociaux optimisés',
      description: 'Stories, reels et formats verticaux taillés pour capter votre audience sur mobile.'
    },
    {
      icon: Target,
      title: 'Motion pour campagnes publicitaires',
      description: 'Créez des publicités animées impactantes pour Instagram, TikTok, LinkedIn ou YouTube.'
    }
  ];

  const methodology = [
    {
      step: 1,
      title: 'Découverte & brief initial',
      description: 'Analyse de vos enjeux, cibles et objectifs pour définir la bonne direction créative.',
      icon: Users
    },
    {
      step: 2,
      title: 'Scénario & storyboard',
      description: 'Écriture du script et storyboard séquence par séquence pour valider le fil narratif.',
      icon: Lightbulb
    },
    {
      step: 3,
      title: 'Création graphique',
      description: 'Développement du style visuel, illustrations, typographies et éléments graphiques.',
      icon: Palette
    },
    {
      step: 4,
      title: 'Animation & sound design',
      description: 'Mise en mouvement 2D/3D, transitions fluides, habillages sonores et voix-off optionnelle.',
      icon: Play
    },
    {
      step: 5,
      title: 'Feedbacks & ajustements',
      description: 'Allers-retours encadrés (3 cycles inclus) pour affiner chaque détail ensemble.',
      icon: Settings
    },
    {
      step: 6,
      title: 'Livraison & déclinaisons',
      description: 'Export HD, formats réseaux, sous-titres et fichiers sources disponibles sur demande.',
      icon: CheckCircle
    }
  ];

  const advantages = [
    {
      icon: Sparkles,
      title: 'Style adaptatif',
      description: 'Un rendu visuel aligné avec votre identité de marque pour rester cohérent sur tous vos canaux.'
    },
    {
      icon: Clock,
      title: 'Délais maîtrisés',
      description: 'Planning clair, jalons réguliers et respect strict des échéances annoncées.'
    },
    {
      icon: Target,
      title: 'Impact mesurable',
      description: 'Optimisation pour la conversion, avec des messages pensés pour déclencher l’action.'
    }
  ];

  const faqItems = [
    {
      question: 'Quel est le délai moyen pour produire une animation ?',
      answer:
        'En moyenne 2 à 4 semaines selon la durée et la complexité du projet. Nous établissons un planning précis dès la validation du brief pour respecter vos échéances.'
    },
    {
      question: 'Proposez-vous de la 3D ou uniquement de la 2D ?',
      answer:
        'Les deux ! Nous maîtrisons aussi bien l’animation 2D que 3D. Nous choisissons la technique la plus adaptée à votre projet, à vos objectifs et à votre budget.'
    },
    {
      question: 'Dois-je fournir un script ou des éléments visuels ?',
      answer:
        'Pas forcément. Nous pouvons tout prendre en charge : script, storyboard, design. Si vous avez déjà des éléments, nous les intégrons volontiers à la production.'
    },
    {
      question: 'Comment se déroule la collaboration ?',
      answer:
        'Un chef de projet unique vous accompagne à chaque étape. Vous disposez d’un espace de suivi pour valider les étapes clés et suivre l’avancement en temps réel.'
    },
    {
      question: 'Puis-je fournir mes références graphiques ?',
      answer:
        'Absolument ! Vos inspirations, chartes existantes et moodboards sont les bienvenus pour garantir un rendu parfaitement aligné avec votre univers.'
    },
    {
      question: 'Combien de modifications sont incluses ?',
      answer:
        'Nous prévoyons 3 cycles de retours complets (storyboard, première version animée, version finale). Au-delà, nous ajustons ensemble selon vos besoins.'
    }
  ];

  const themeColors = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
  };

  return (
    <div className="service-page service-motion min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section
        data-service-section="hero"
        className="relative overflow-hidden"
        aria-labelledby="service-motion-hero-title"
      >
        <div className="absolute inset-0">
          <img
            src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250923_2241_Atelier%20Motion%20Design_simple_compose_01k5w4v1pkee2r37dkh7ppkb18.png"
            alt="Atelier Motion Design - Équipe créative en pleine production vidéo animée"
            className="h-full w-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-slate-900/55 lg:bg-slate-900/45" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-end gap-6 px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-36 lg:min-h-[90vh] lg:pb-24">
          <h1
            id="service-motion-hero-title"
            className="text-balance text-[clamp(2.1rem,5.1vw,4.6rem)] font-black leading-[1.05] tracking-tight text-white"
          >
            🎥 Motion design sur mesure
          </h1>
          <p className="text-balance text-[clamp(1.125rem,3vw,1.75rem)] font-light leading-relaxed text-white/90">
            Animez vos idées. Dynamisez votre image. Attirez votre public.
          </p>
          <ButtonGND
            variant="primary"
            onClick={scrollToContact}
            className="w-full max-w-md items-center justify-center gap-3 rounded-2xl px-6 py-4 text-[clamp(1rem,2.6vw,1.25rem)] hover:scale-[1.02] sm:max-w-lg sm:px-8 sm:py-5 lg:max-w-xl lg:px-12 lg:py-6 shadow-xl shadow-blue-600/30"
            style={{
              backgroundImage: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)'
            }}
          >
            <Play className="h-5 w-5 sm:h-6 sm:w-6" />
            Demander un devis personnalisé
          </ButtonGND>
        </div>
      </section>

      {/* INTRO */}
      <section
        data-service-section="intro"
        className="bg-gradient-to-b from-white to-slate-50 py-24 lg:py-32 px-4 sm:px-6 lg:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-balance text-[clamp(1rem,2.6vw,1.5rem)] leading-relaxed text-slate-700">
            Chez GND Consulting, nous créons des vidéos en motion design qui{' '}
            <strong className="text-slate-900">informent, séduisent et déclenchent l’action</strong>. Simplifier un concept
            complexe, dynamiser vos réseaux sociaux ou présenter votre marque : chaque animation est pensée pour{' '}
            <strong className="text-slate-900">vous démarquer et engager votre audience</strong>. Nos créations sont
            optimisées pour le digital, prêtes à booster votre branding et vos conversions.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section
        data-service-section="services"
        className="bg-slate-50 py-24 lg:py-32 px-4 sm:px-6 lg:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,3rem)] font-black text-slate-900">
              ✨ Nos expertises motion design
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-slate-600">
              Des contenus animés qui captent l’attention et transmettent vos messages en un clin d’œil.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <article
                  key={service.title}
                  className="group relative flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-8"
                >
                  <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-500 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-18 sm:w-18">
                    <IconComponent className="h-8 w-8" />
                  </span>
                  <h3 className="text-[clamp(1.125rem,2.6vw,1.35rem)] font-bold text-slate-900 transition-colors duration-300 group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[clamp(0.9375rem,2.3vw,1rem)] leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MÉTHODOLOGIE */}
      <section
        data-service-section="methodology"
        className="bg-white py-24 lg:py-32 px-4 sm:px-6 lg:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,3rem)] font-black text-slate-900">
              Un processus fluide et collaboratif
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-slate-600">
              De la première idée à la livraison finale, nous orchestrons chaque étape pour garantir un résultat à la hauteur
              de vos attentes.
            </p>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {methodology.map((step) => {
              const IconComponent = step.icon;
              return (
                <li
                  key={step.step}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                      {step.step}
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                      <IconComponent className="h-5 w-5" />
                    </span>
                    <h3 className="text-[clamp(1.0625rem,2.3vw,1.2rem)] font-semibold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="pl-[3.6rem] text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* AVANTAGES */}
      <section
        data-service-section="advantages"
        className="bg-gradient-to-br from-blue-50 via-blue-50 to-white py-24 lg:py-32 px-4 sm:px-6 lg:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" /> Avantages exclusifs
            </div>
            <h2 className="mt-5 text-balance text-[clamp(1.875rem,4vw,2.75rem)] font-black text-slate-900">
              Ce qui fait la différence GND
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {advantages.map((item) => {
              const IconComponent = item.icon;
              return (
                <article
                  key={item.title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-white/70 bg-white/90 p-6 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                    <IconComponent className="h-7 w-7" />
                  </span>
                  <h3 className="text-[clamp(1.05rem,2.4vw,1.2rem)] font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <p className="max-w-2xl text-[clamp(1rem,2.4vw,1.2rem)] font-medium text-slate-700">
              Prêt à transformer vos idées en animations percutantes ?
            </p>
            <button
              onClick={scrollToContact}
              className="inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-2xl bg-slate-900 px-6 py-3 text-[clamp(0.95rem,2.3vw,1.1rem)] font-bold text-white transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-500/40 sm:w-auto sm:px-8 sm:py-4"
            >
              <Heart className="h-5 w-5" />
              Demander un devis
            </button>
          </div>
        </div>
      </section>

      <UnifiedFAQ
        title="QUESTIONS FRÉQUENTES"
        subtitle="Tout ce que vous devez savoir sur nos offres motion design."
        description="Processus, formats livrés, délais… nous répondons aux questions les plus courantes."
        emoji="🎬"
        faqItems={faqItems}
        themeColor={themeColors}
        ctaText="Démarrer mon projet"
        ctaLink="#contact"
      />

      {/* CTA FINAL */}
      <section
        data-service-section="cta-final"
        className="relative overflow-hidden bg-gradient-to-br from-[#F5E8FF] via-white to-blue-50 py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="pointer-events-none absolute top-16 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-300/30 to-blue-400/30 blur-3xl sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute bottom-10 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-blue-300/30 to-blue-400/30 blur-3xl sm:h-96 sm:w-96" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="text-balance text-[clamp(1.875rem,5vw,3.5rem)] font-black text-slate-900">
            Donnez du mouvement à vos messages
          </h2>
          <p className="mt-4 max-w-3xl text-balance text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-slate-700">
            Animation produit, storytelling, lancement de marque ou formation interne : nous composons le motion design
            qui fera vibrer votre audience.
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
