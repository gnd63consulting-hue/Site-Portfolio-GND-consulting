import React, { useEffect } from 'react';
import { Palette, Layers, Sparkles, Users, Zap, Shield, Pen, RefreshCw, Monitor, Printer, Heart } from 'lucide-react';
import { UnifiedFAQ } from './UnifiedFAQ';
import { updateMetaTags, pageSEO } from '../utils/seo';
import { ButtonGND } from './ButtonGND';

export function ServiceDesign() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.designService,
      url: `${window.location.origin}/services/design-identite-visuelle`
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
      icon: Pen,
      title: 'Création de logo',
      description: "Conception d'un logo unique qui incarne parfaitement votre identité et vos valeurs"
    },
    {
      icon: Layers,
      title: 'Déclinaisons visuelles',
      description: 'Adaptation de votre identité sur tous vos supports digitaux et réseaux sociaux'
    },
    {
      icon: Palette,
      title: 'Charte graphique complète',
      description: "Guide complet définissant couleurs, typographies et règles d'usage de votre marque"
    },
    {
      icon: RefreshCw,
      title: "Refonte d'identité existante",
      description: 'Modernisation et optimisation de votre identité visuelle actuelle'
    },
    {
      icon: Monitor,
      title: 'Bannières & miniatures',
      description: 'Création de visuels optimisés pour vos contenus web et vidéos'
    },
    {
      icon: Printer,
      title: 'Supports imprimés',
      description: 'Conception de cartes de visite, flyers et tous supports print professionnels'
    }
  ];

  const advantages = [
    {
      icon: Sparkles,
      title: 'Créativité & personnalisation',
      description: 'Chaque création est unique et pensée spécifiquement pour votre univers'
    },
    {
      icon: Users,
      title: 'Accompagnement humain + IA',
      description: "Alliance parfaite entre expertise humaine et outils d'intelligence artificielle"
    },
    {
      icon: Zap,
      title: 'Flexibilité & accessibilité',
      description: 'Solutions adaptées à tous les budgets avec une approche modulaire'
    },
    {
      icon: Shield,
      title: "Réseau d'experts à la demande",
      description: 'Accès à un écosystème de spécialistes selon vos besoins spécifiques'
    }
  ];

  const faqItems = [
    {
      question: 'Quels sont les délais de réalisation ?',
      answer:
        "Les délais varient selon la complexité : logo simple (5-7 jours), identité complète (2-3 semaines), refonte globale (3-4 semaines). Nous établissons un planning précis dès le brief validé."
    },
    {
      question: 'Combien de modifications sont incluses ?',
      answer:
        "Nous incluons 3 rounds de modifications dans nos prestations standard. Chaque étape fait l'objet d'une validation avant passage à la suivante pour optimiser le processus créatif."
    },
    {
      question: 'Quels formats de fichiers livrez-vous ?',
      answer:
        'Nous livrons tous les formats nécessaires : vectoriels (AI, EPS, SVG), haute résolution (PNG, JPG), et formats web optimisés. Vous recevez également un guide d’utilisation complet.'
    },
    {
      question: "Et si je n'ai aucune idée du design souhaité ?",
      answer:
        "C'est notre spécialité ! Nous commençons par un brief approfondi pour comprendre votre univers, vos valeurs et vos objectifs. Notre processus créatif vous guide étape par étape vers votre identité idéale."
    }
  ];

  const themeColors = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
  };

  return (
    <main id="main-content" className="service-page service-design min-h-screen bg-white text-[#1A1A1A] font-sans">
      {/* HERO */}
      <section
        data-service-section="hero"
        className="relative overflow-hidden"
        aria-labelledby="service-design-hero-title"
      >
        <div className="absolute inset-0">
          <img
            src="/20250923_1821_Vibrant Design Collaboration_simple_compose_01k5vnxw54fz9v244n3dr8mgjr copy.png"
            alt="Studio créatif moderne - Design graphique et identité visuelle sur mesure"
            className="h-full w-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-[1400px] flex-col items-center justify-end gap-6 px-6 pb-16 pt-32 text-center lg:px-12 lg:min-h-[88vh] lg:pb-24">
          <h1
            id="service-design-hero-title"
            className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] tracking-tight text-white"
          >
            Faites parler votre image
          </h1>
          <p className="text-balance text-[clamp(1.125rem,3vw,1.75rem)] font-light leading-relaxed text-white/90">
            Design graphique & identité visuelle sur mesure
          </p>
          <ButtonGND
            variant="primary"
            onClick={scrollToContact}
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl text-[clamp(1rem,2.6vw,1.25rem)] bg-black text-white rounded-full px-8 py-4 hover:bg-gray-800 hover:scale-105"
          >
            <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
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
            Chez GND Consulting, nous croyons que le design graphique n&apos;est pas qu&apos;une question
            d&apos;esthétique. C&apos;est un <strong className="text-accent">pilier stratégique</strong> qui raconte votre
            histoire, transmet vos valeurs et crée une connexion émotionnelle durable avec votre audience. Chaque trait,
            chaque couleur, chaque forme est pensée pour{' '}
            <strong className="text-accent">faire vibrer votre marque</strong> et la rendre inoubliable. Studio créatif à
            Paris, identité visuelle et branding sur mesure pour marques ambitieuses.
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
              Nos services Design &amp; Identité Visuelle
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-text-muted">
              Des solutions créatives complètes pour donner vie à votre univers visuel
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <article
                  key={service.title}
                  className="group flex h-full flex-col bg-gray-50 rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white"
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

      {/* APPROCHE */}
      <section
        data-service-section="approach"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
                Une identité qui vous ressemble vraiment
              </h2>
              <div className="space-y-5 text-[clamp(0.95rem,2.3vw,1.1rem)] leading-relaxed text-text-muted">
                <p>
                  Notre approche commence toujours par <strong className="text-accent">l&apos;écoute</strong>. Nous prenons
                  le temps de comprendre votre histoire, vos ambitions, votre personnalité unique. Car avant de créer, il
                  faut ressentir.
                </p>
                <p>
                  Ensuite vient la <strong className="text-accent">co-création</strong>. Vous n&apos;êtes pas spectateur,
                  vous êtes acteur de votre identité visuelle. Nous travaillons main dans la main, dans un processus
                  itératif où chaque étape est validée ensemble.
                </p>
                <p>
                  Le résultat ? Une identité visuelle <strong className="text-accent">authentique et impactante</strong>,
                  qui vous ressemble vraiment et qui saura toucher votre audience au cœur.
                </p>
              </div>
              <div>
                <ButtonGND
                  variant="primary"
                  onClick={scrollToContact}
                  className="w-full max-w-sm sm:w-auto"
                >
                  <Sparkles className="h-5 w-5" />
                  Découvrir notre approche
                </ButtonGND>
              </div>
            </div>

            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/20250923_1821_Vibrant Design Collaboration_simple_compose_01k5vnxw55e4evcwhnpmf5f7eb.png"
                  alt="Équipe créative au travail"
                  className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[460px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-black/20 blur-md lg:h-24 lg:w-24" />
              <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-black/15 blur-md lg:h-28 lg:w-28" />
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section
        data-service-section="advantages"
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Pourquoi choisir GND Consulting ?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-text-muted">
              4 raisons qui font la différence dans votre projet créatif
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {advantages.map((advantage) => {
              const IconComponent = advantage.icon;
              return (
                <article
                  key={advantage.title}
                  className="group flex h-full flex-col items-center bg-gray-50 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <IconComponent className="h-10 w-10" />
                  </span>
                  <h3 className="text-[clamp(1.125rem,2.6vw,1.35rem)] font-bold text-[#1A1A1A] transition-colors duration-300 group-hover:text-white">
                    {advantage.title}
                  </h3>
                  <p className="mt-3 text-[clamp(0.9375rem,2.3vw,1.05rem)] leading-relaxed text-text-muted">
                    {advantage.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <UnifiedFAQ
        title="QUESTIONS FRÉQUENTES"
        subtitle="Retrouvez ici toutes les réponses aux interrogations fréquentes sur nos services design."
        description="Tout ce que vous devez savoir sur nos services design et identité visuelle"
        emoji="🎨"
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
            Prêt à donner vie à votre univers visuel ?
          </h2>
          <p className="mt-4 max-w-3xl text-balance text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-text-muted">
            Créons ensemble une identité visuelle qui vous ressemble et qui marquera les esprits. Votre projet mérite une
            approche sur-mesure et créative.
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
              <Palette className="h-5 w-5 sm:h-6 sm:w-6" />
              Voir nos réalisations
            </ButtonGND>
          </div>
        </div>
      </section>
    </main>
  );
}
