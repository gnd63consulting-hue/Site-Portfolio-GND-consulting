import React, { useEffect } from 'react';
import { Palette, Layers, Sparkles, Users, Zap, Shield, Pen, RefreshCw, Monitor, Printer, Heart } from 'lucide-react';
import { UnifiedFAQ } from './UnifiedFAQ';
import { updateMetaTags, pageSEO } from '../utils/seo';

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
    <div className="service-page service-design min-h-screen bg-white text-slate-900">
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
          />
          <div className="absolute inset-0 bg-slate-900/45 lg:bg-slate-900/35" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-end gap-6 px-4 pb-16 pt-32 text-center sm:px-6 sm:pb-20 sm:pt-36 lg:min-h-[88vh] lg:pb-24">
          <h1
            id="service-design-hero-title"
            className="text-balance text-[clamp(2.1rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight text-white"
          >
            Faites parler votre image
          </h1>
          <p className="text-balance text-[clamp(1.125rem,3vw,1.75rem)] font-light leading-relaxed text-white/90">
            Design graphique & identité visuelle sur mesure
          </p>
          <button
            onClick={scrollToContact}
            className="hero-cta inline-flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-[clamp(1rem,2.8vw,1.25rem)] font-bold text-white transition-transform duration-300 hover:scale-[1.025] hover:shadow-xl shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:max-w-lg sm:px-8 sm:py-5 lg:max-w-xl lg:px-12 lg:py-6"
          >
            <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
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
            Chez GND Consulting, nous croyons que le design graphique n&apos;est pas qu&apos;une question
            d&apos;esthétique. C&apos;est un <strong className="text-primary">pilier stratégique</strong> qui raconte votre
            histoire, transmet vos valeurs et crée une connexion émotionnelle durable avec votre audience. Chaque trait,
            chaque couleur, chaque forme est pensée pour{' '}
            <strong className="text-primary">faire vibrer votre marque</strong> et la rendre inoubliable. Studio créatif à
            Paris, identité visuelle et branding sur mesure pour marques ambitieuses.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section
        data-service-section="services"
        className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,3rem)] font-black text-slate-900">
              Nos services Design &amp; Identité Visuelle
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-slate-600">
              Des solutions créatives complètes pour donner vie à votre univers visuel
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <article
                  key={service.title}
                  className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-8"
                >
                  <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-18 sm:w-18">
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

      {/* APPROCHE */}
      <section
        data-service-section="approach"
        className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <h2 className="text-balance text-[clamp(1.875rem,4.2vw,3rem)] font-black text-slate-900">
                Une identité qui vous ressemble vraiment
              </h2>
              <div className="space-y-5 text-[clamp(0.95rem,2.3vw,1.1rem)] leading-relaxed text-slate-700">
                <p>
                  Notre approche commence toujours par <strong className="text-primary">l&apos;écoute</strong>. Nous prenons
                  le temps de comprendre votre histoire, vos ambitions, votre personnalité unique. Car avant de créer, il
                  faut ressentir.
                </p>
                <p>
                  Ensuite vient la <strong className="text-primary">co-création</strong>. Vous n&apos;êtes pas spectateur,
                  vous êtes acteur de votre identité visuelle. Nous travaillons main dans la main, dans un processus
                  itératif où chaque étape est validée ensemble.
                </p>
                <p>
                  Le résultat ? Une identité visuelle <strong className="text-primary">authentique et impactante</strong>,
                  qui vous ressemble vraiment et qui saura toucher votre audience au cœur.
                </p>
              </div>
              <div>
                <button
                  onClick={scrollToContact}
                  className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-3 text-[clamp(0.95rem,2.5vw,1.0625rem)] font-bold text-white transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:w-auto sm:px-8 sm:py-4"
                >
                  <Sparkles className="h-5 w-5" />
                  Découvrir notre approche
                </button>
              </div>
            </div>

            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/20250923_1821_Vibrant Design Collaboration_simple_compose_01k5vnxw55e4evcwhnpmf5f7eb.png"
                  alt="Équipe créative au travail"
                  className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[460px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-secondary opacity-80 blur-md lg:h-24 lg:w-24" />
              <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 opacity-60 blur-md lg:h-28 lg:w-28" />
            </div>
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section
        data-service-section="advantages"
        className="bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,3rem)] font-black text-slate-900">
              Pourquoi choisir GND Consulting ?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-slate-600">
              4 raisons qui font la différence dans votre projet créatif
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {advantages.map((advantage) => {
              const IconComponent = advantage.icon;
              return (
                <article
                  key={advantage.title}
                  className="group flex h-full flex-col items-center rounded-3xl border border-white/60 bg-white/90 p-6 text-center shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-8"
                >
                  <span className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <IconComponent className="h-10 w-10" />
                  </span>
                  <h3 className="text-[clamp(1.125rem,2.6vw,1.35rem)] font-bold text-slate-900 transition-colors duration-300 group-hover:text-primary">
                    {advantage.title}
                  </h3>
                  <p className="mt-3 text-[clamp(0.9375rem,2.3vw,1.05rem)] leading-relaxed text-slate-600">
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
        className="relative overflow-hidden bg-gradient-to-br from-[#F5E8FF] via-white to-blue-50 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="pointer-events-none absolute top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-blue-300/30 to-blue-400/30 blur-3xl sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute bottom-10 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-blue-300/30 to-blue-400/30 blur-3xl sm:h-96 sm:w-96" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="text-balance text-[clamp(1.875rem,5vw,3.5rem)] font-black text-slate-900">
            Prêt à donner vie à votre univers visuel ?
          </h2>
          <p className="mt-4 max-w-3xl text-balance text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-slate-700">
            Créons ensemble une identité visuelle qui vous ressemble et qui marquera les esprits. Votre projet mérite une
            approche sur-mesure et créative.
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
              <Palette className="h-5 w-5 sm:h-6 sm:w-6" />
              Voir nos réalisations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
