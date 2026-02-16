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
      description: 'Optimisation pour la conversion, avec des messages pensés pour déclencher l\u2019action.'
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
        'Les deux ! Nous maîtrisons aussi bien l\u2019animation 2D que 3D. Nous choisissons la technique la plus adaptée à votre projet, à vos objectifs et à votre budget.'
    },
    {
      question: 'Dois-je fournir un script ou des éléments visuels ?',
      answer:
        'Pas forcément. Nous pouvons tout prendre en charge : script, storyboard, design. Si vous avez déjà des éléments, nous les intégrons volontiers à la production.'
    },
    {
      question: 'Comment se déroule la collaboration ?',
      answer:
        'Un chef de projet unique vous accompagne à chaque étape. Vous disposez d\u2019un espace de suivi pour valider les étapes clés et suivre l\u2019avancement en temps réel.'
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
    <main id="main-content" className="service-page service-motion min-h-screen bg-white text-[#1A1A1A] font-sans">
      {/* HERO — image plein écran + overlay + badge catégorie */}
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
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative mx-auto flex min-h-[60vh] w-full max-w-[1400px] flex-col items-center justify-end gap-6 px-6 pb-16 pt-32 text-center lg:px-12 lg:min-h-[88vh] lg:pb-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs font-medium uppercase tracking-widest text-white/80">
            Motion Design
          </span>
          <h1
            id="service-motion-hero-title"
            className="font-display text-balance text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.9] tracking-tight text-white"
          >
            Motion design sur mesure
          </h1>
          <p className="max-w-2xl text-balance text-[clamp(1.125rem,3vw,1.75rem)] font-light leading-relaxed text-white/90">
            Animez vos idées. Dynamisez votre image. Attirez votre public.
          </p>
          <ButtonGND
            variant="primary"
            onClick={scrollToContact}
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl text-[clamp(1rem,2.6vw,1.25rem)] bg-black text-white rounded-full px-8 py-4 hover:bg-gray-800 hover:scale-105"
          >
            <Play className="h-5 w-5 sm:h-6 sm:w-6" />
            Demander un devis personnalisé
          </ButtonGND>
        </div>
      </section>

      {/* INTRO */}
      <section
        data-service-section="intro"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="text-balance text-[clamp(1rem,2.6vw,1.5rem)] leading-relaxed text-text-muted">
            Chez GND Consulting, nous créons des vidéos en motion design qui{' '}
            <strong className="text-accent">informent, séduisent et déclenchent l&apos;action</strong>. Simplifier un concept
            complexe, dynamiser vos réseaux sociaux ou présenter votre marque : chaque animation est pensée pour{' '}
            <strong className="text-accent">vous démarquer et engager votre audience</strong>. Nos créations sont
            optimisées pour le digital, prêtes à booster votre branding et vos conversions.
          </p>
        </div>
      </section>

      {/* SHOWREEL — player vidéo démo */}
      <section
        data-service-section="showreel"
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted mb-6">
              Showreel
            </span>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Nos créations en mouvement
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-text-muted">
              Découvrez quelques exemples de nos productions motion design.
            </p>
          </div>

          <div className="mt-12 relative overflow-hidden rounded-3xl shadow-2xl mx-auto max-w-4xl aspect-video bg-black">
            <video
              className="h-full w-full object-cover"
              controls
              preload="metadata"
              poster="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250923_2241_Atelier%20Motion%20Design_simple_compose_01k5w4v1pkee2r37dkh7ppkb18.png"
            >
              <source src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* OFFRE — 5 cards avec icônes, hover-to-black + icon inversion */}
      <section
        data-service-section="services"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted mb-6">
              Notre offre
            </span>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Nos expertises motion design
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-text-muted">
              Des contenus animés qui captent l&apos;attention et transmettent vos messages en un clin d&apos;œil.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <article
                  key={service.title}
                  className="group flex h-full flex-col bg-gray-50 rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-all duration-500 group-hover:bg-white group-hover:text-black">
                    <IconComponent className="h-7 w-7" />
                  </span>
                  <h3 className="text-[clamp(1.125rem,2.6vw,1.35rem)] font-bold text-[#1A1A1A] transition-colors duration-500 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[clamp(0.9375rem,2.3vw,1rem)] leading-relaxed text-text-muted transition-colors duration-500 group-hover:text-gray-300">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESSUS — 6 étapes numérotées, grille 3 colonnes */}
      <section
        data-service-section="methodology"
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted mb-6">
              Processus
            </span>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Un processus fluide et collaboratif
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-text-muted">
              De la première idée à la livraison finale, nous orchestrons chaque étape pour garantir un résultat à la hauteur
              de vos attentes.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {methodology.map((step) => {
              const IconComponent = step.icon;
              return (
                <article
                  key={step.step}
                  className="group relative flex h-full flex-col gap-4 bg-gray-50 rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="font-display text-5xl font-semibold text-gray-200 group-hover:text-white/10 transition-colors duration-500 absolute top-6 right-6">
                    {String(step.step).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:bg-white group-hover:text-black">
                      <IconComponent className="h-5 w-5" />
                    </span>
                    <h3 className="text-[clamp(1.0625rem,2.3vw,1.2rem)] font-semibold text-[#1A1A1A] transition-colors duration-500 group-hover:text-white">{step.title}</h3>
                  </div>
                  <p className="text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-text-muted transition-colors duration-500 group-hover:text-gray-300">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* AVANTAGES — 3 colonnes numérotées, icon inversion */}
      <section
        data-service-section="advantages"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Ce qui fait la différence GND
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {advantages.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <article
                  key={item.title}
                  className="group flex h-full flex-col gap-4 bg-gray-50 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted transition-colors duration-500 group-hover:text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-all duration-500 group-hover:bg-white group-hover:text-black">
                    <IconComponent className="h-7 w-7" />
                  </span>
                  <h3 className="text-[clamp(1.05rem,2.4vw,1.2rem)] font-semibold text-[#1A1A1A] transition-colors duration-500 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-text-muted transition-colors duration-500 group-hover:text-gray-300">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <p className="max-w-2xl text-[clamp(1rem,2.4vw,1.2rem)] font-medium text-text-muted">
              Prêt à transformer vos idées en animations percutantes ?
            </p>
            <ButtonGND
              variant="primary"
              onClick={scrollToContact}
              className="w-full max-w-xs sm:w-auto"
            >
              <Heart className="h-5 w-5" />
              Demander un devis
            </ButtonGND>
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
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-center text-center">
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
            Donnez du mouvement à vos messages
          </h2>
          <p className="mt-4 max-w-3xl text-balance text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-text-muted">
            Animation produit, storytelling, lancement de marque ou formation interne : nous composons le motion design
            qui fera vibrer votre audience.
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
