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
    <main id="main-content" className="service-page service-motion min-h-screen bg-white text-[#1A1A1A] font-sans">
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
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-[1400px] flex-col items-center justify-end gap-6 px-6 pb-16 pt-28 text-center lg:px-12 lg:min-h-[90vh] lg:pb-24">
          <h1
            id="service-motion-hero-title"
            className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] tracking-tight text-white"
          >
            🎥 Motion design sur mesure
          </h1>
          <p className="text-balance text-[clamp(1.125rem,3vw,1.75rem)] font-light leading-relaxed text-white/90">
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
            <strong className="text-[#1A1A1A]">informent, séduisent et déclenchent l’action</strong>. Simplifier un concept
            complexe, dynamiser vos réseaux sociaux ou présenter votre marque : chaque animation est pensée pour{' '}
            <strong className="text-[#1A1A1A]">vous démarquer et engager votre audience</strong>. Nos créations sont
            optimisées pour le digital, prêtes à booster votre branding et vos conversions.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section
        data-service-section="services"
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              ✨ Nos expertises motion design
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-text-muted">
              Des contenus animés qui captent l'attention et transmettent vos messages en un clin d'œil.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <article
                  key={service.title}
                  className="group relative flex h-full flex-col bg-gray-50 rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-18 sm:w-18">
                    <IconComponent className="h-8 w-8" />
                  </span>
                  <h3 className="text-[clamp(1.125rem,2.6vw,1.35rem)] font-bold text-[#1A1A1A] transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[clamp(0.9375rem,2.3vw,1rem)] leading-relaxed text-text-muted">
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
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Un processus fluide et collaboratif
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-text-muted">
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
                  className="flex h-full flex-col gap-4 bg-gray-50 rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background-alt text-sm font-semibold text-accent">
                      {step.step}
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                      <IconComponent className="h-5 w-5" />
                    </span>
                    <h3 className="text-[clamp(1.0625rem,2.3vw,1.2rem)] font-semibold text-[#1A1A1A]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="pl-[3.6rem] text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-text-muted">
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
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-text-muted">
              <Sparkles className="h-4 w-4 text-accent" /> Avantages exclusifs
            </div>
            <h2 className="mt-5 font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Ce qui fait la différence GND
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {advantages.map((item) => {
              const IconComponent = item.icon;
              return (
                <article
                  key={item.title}
                  className="flex h-full flex-col gap-4 bg-gray-50 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                    <IconComponent className="h-7 w-7" />
                  </span>
                  <h3 className="text-[clamp(1.05rem,2.4vw,1.2rem)] font-semibold text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-text-muted">
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
