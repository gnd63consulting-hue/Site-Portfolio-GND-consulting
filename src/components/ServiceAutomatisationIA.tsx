import React, { useEffect } from 'react';
import {
  Zap,
  Brain,
  Target,
  Clock,
  TrendingUp,
  Users,
  Shield,
  Settings,
  Sparkles,
  Eye,
  Cog,
  Monitor,
  Smartphone,
  Heart
} from 'lucide-react';
import { UnifiedFAQ } from './UnifiedFAQ';
import { updateMetaTags, pageSEO } from '../utils/seo';

export function ServiceAutomatisationIA() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.aiService,
      url: `${window.location.origin}/services/automatisation-ia`
    });
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector('footer');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const keyMetrics = [
    {
      icon: TrendingUp,
      value: '+40%',
      label: 'Gains de productivité',
      description: 'Automatisation des tâches répétitives et optimisation des processus end-to-end.'
    },
    {
      icon: Clock,
      value: '20 min/jour',
      label: 'Temps économisé par collaborateur',
      description: 'Comptes-rendus automatiques, recherche accélérée, routage intelligent.'
    },
    {
      icon: Zap,
      value: '+66%',
      label: 'Débit opérationnel',
      description: 'Des workflows orchestrés qui accélèrent la prise en charge des demandes.'
    },
    {
      icon: Target,
      value: '25%',
      label: 'Économies constatées',
      description: 'Effets combinés sur les coûts opérationnels et la qualité de service.'
    }
  ];

  const services = [
    {
      icon: Brain,
      title: 'Agents IA personnalisés',
      description: 'Assistants digitaux entraînés sur vos données pour répondre, qualifier, exécuter.',
      features: [
        'Support client 24/7',
        'Qualification & nurturing de leads',
        'Assistance interne (RH, IT, finance)',
        'Supervision & audit trail'
      ]
    },
    {
      icon: Settings,
      title: 'Automatisation de processus',
      description: 'Orchestration des tâches répétitives et validations multi-applications.',
      features: [
        'Onboarding client/fournisseur',
        'Génération & routage de documents',
        'Synchronisation CRM / ERP',
        'Notifications & relances intelligentes'
      ]
    },
    {
      icon: Cog,
      title: 'Intégrations sur-mesure',
      description: 'Connecter votre écosystème pour éviter les silos de données.',
      features: [
        'CRM, suites bureautiques, Notion, Slack…',
        'APIs, webhooks, connecteurs iPaaS',
        'Normalisation & monitoring',
        'Sécurité & gouvernance'
      ]
    },
    {
      icon: Sparkles,
      title: 'Création assistée par IA',
      description: 'Accélérer sans renoncer à la qualité et à la cohérence éditoriale.',
      features: [
        'Rédaction guidée (articles, scripts, emails)',
        'Aide à la conception visuelle',
        'Génération de présentations & résumés',
        'Contrôles : ton, marque, validation humaine'
      ]
    },
    {
      icon: Users,
      title: 'Formation & adoption',
      description: "Ateliers métiers et conduite du changement pour ancrer l'usage.",
      features: [
        'Workshops marketing, vente, ops, RH',
        'Guides & politiques IA',
        "Coaching d’équipes, gouvernance",
        'Support continu'
      ]
    },
    {
      icon: Eye,
      title: 'Audit & stratégie IA',
      description: 'Cartographier vos opportunités, prioriser et chiffrer le ROI.',
      features: ['Diagnostic des flux', 'Feuille de route 90 jours', 'POC rapide', 'Déploiement progressif']
    }
  ];

  const applicationDomains = [
    {
      icon: Target,
      title: 'Marketing & communication',
      points: [
        'Génération & déclinaison de contenus multicanaux',
        'Analyse de tendances et social listening',
        'Personnalisation en temps réel',
        'Orchestration automatisée des campagnes'
      ]
    },
    {
      icon: Users,
      title: 'Ventes & relation client',
      points: [
        'Agents conversationnels & self-service',
        'Qualification intelligente des prospects',
        'Follow-up automatisés',
        'Coaching commercial assisté'
      ]
    },
    {
      icon: Monitor,
      title: 'Opérations & finance',
      points: [
        'Automatisation back-office',
        'Pilotage dashboards & alertes',
        'Prévisions & reporting assistés',
        'Gestion des risques et conformité'
      ]
    },
    {
      icon: Smartphone,
      title: 'RH & expérience collaborateur',
      points: [
        'Onboarding & demandes internes',
        'FAQ RH intelligentes',
        'Formation personnalisée',
        'Suivi bien-être & feedback'
      ]
    }
  ];

  const whyNowStats = [
    { value: '+60%', label: 'de croissance des revenus chez les leaders IA' },
    { value: '+30%', label: "d’économies potentielles grâce à l’automatisation" },
    { value: '+66%', label: 'de débit opérationnel sur des processus récurrents' },
    { value: '~26%', label: 'des organisations capturent déjà une valeur IA tangible' }
  ];

  const faqItems = [
    {
      question: 'Est-ce adapté à mon entreprise ?',
      answer:
        "Oui. Nos solutions sont modulaires et s'adaptent à votre taille, votre secteur et votre maturité numérique. Nous concevons des automatisations proportionnées à vos besoins."
    },
    {
      question: 'Dois-je déjà disposer d’outils spécifiques ?',
      answer:
        "Pas nécessairement. Nous partons de votre stack actuelle et la complétons si besoin. L'objectif : valoriser l'existant avant d'introduire de nouveaux outils."
    },
    {
      question: 'Combien de temps pour un premier résultat ?',
      answer:
        'Quelques semaines pour un POC, 1 à 3 mois pour un déploiement progressif selon le périmètre. Nous privilégions des cycles courts avec des gains mesurables à chaque étape.'
    },
    {
      question: 'Quel ROI attendre ?',
      answer:
        "Nous estimons le ROI dès l'audit. Selon les cas, un retour sur investissement est observé entre 3 et 6 mois grâce aux gains de temps, à la réduction des erreurs et à l'amélioration de la conversion."
    },
    {
      question: 'Comment garantissez-vous la sécurité des données ?',
      answer:
        "Conformité RGPD, chiffrement, contrôle d'accès, audit trail… et possibilité de travailler en mode on-premise. La sécurité est intégrée à chaque étape."
    },
    {
      question: 'Proposez-vous de la formation ?',
      answer:
        "Absolument. L'adoption humaine est clé : ateliers, guides d'usage, coaching d'équipes et support continu font partie de notre accompagnement."
    }
  ];

  const themeColors = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
  };

  return (
    <div className="service-page service-ai min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section
        data-service-section="hero"
        className="relative overflow-hidden"
        aria-labelledby="service-ai-hero-title"
      >
        <div className="absolute inset-0">
          <img
            src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20251006_2055_Espace%20Travail%20Futuriste_simple_compose_01k6xdztmrewrv8rq637vqqpnp.png"
            alt="Espace collaboratif futuriste - Automatisation et intelligence artificielle"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/55 lg:bg-slate-900/45" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-end gap-6 px-4 pb-16 pt-32 text-center sm:px-6 sm:pb-20 sm:pt-36 lg:min-h-[90vh] lg:pb-24">
          <h1
            id="service-ai-hero-title"
            className="text-balance text-[clamp(2.1rem,5vw,4.6rem)] font-black leading-[1.05] tracking-tight text-white"
          >
            Automatisation & IA sur mesure
          </h1>
          <p className="text-balance text-[clamp(1.125rem,3vw,1.75rem)] font-light leading-relaxed text-white/90">
            Des workflows intelligents pour booster la productivité, la qualité et l’engagement.
          </p>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={scrollToContact}
              className="hero-cta inline-flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-[clamp(1rem,2.6vw,1.25rem)] font-bold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(59,130,246,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:max-w-lg sm:px-8 sm:py-5 lg:max-w-xl lg:px-12 lg:py-6"
            >
              <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
              Démarrer un projet pilote
            </button>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
              <Shield className="h-4 w-4" />
              <span>RGPD & sécurité intégrées</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section
        data-service-section="intro"
        className="bg-gradient-to-b from-white to-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-balance text-[clamp(1rem,2.6vw,1.5rem)] leading-relaxed text-slate-700">
            De l’automatisation de processus aux agents IA spécialisés, nous concevons des solutions pragmatiques qui
            s’intègrent à votre stack, délivrent des gains rapides et s’échelonnent en toute sécurité.
          </p>
        </div>
      </section>

      {/* METRICS */}
      <section
        data-service-section="metrics"
        className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {keyMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <article
                  key={metric.label}
                  className="flex h-full flex-col gap-3 rounded-3xl border border-slate-100 bg-slate-50/70 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                    <IconComponent className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[clamp(1.5rem,4vw,2.25rem)] font-black text-slate-900">{metric.value}</p>
                    <p className="text-[clamp(0.95rem,2.3vw,1.1rem)] font-semibold text-slate-700">{metric.label}</p>
                  </div>
                  <p className="text-[clamp(0.9rem,2.2vw,1rem)] text-slate-600">{metric.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        data-service-section="services"
        className="bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,3rem)] font-black text-slate-900">
              Nos briques IA & automatisation
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-slate-600">
              Des modules combinables pour bâtir votre feuille de route IA, du POC au déploiement à l’échelle.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <article
                  key={service.title}
                  className="flex h-full flex-col rounded-3xl border border-white/70 bg-white/95 p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-8"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                    <IconComponent className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-[clamp(1.125rem,2.6vw,1.35rem)] font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-[clamp(0.9375rem,2.3vw,1rem)] leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-[clamp(0.9rem,2.2vw,0.975rem)] text-slate-600">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOMAINES */}
      <section
        data-service-section="domains"
        className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,2.8rem)] font-black text-slate-900">
              Domaines d’application prioritaires
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {applicationDomains.map((domain) => {
              const IconComponent = domain.icon;
              return (
                <article
                  key={domain.title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50/70 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                      <IconComponent className="h-6 w-6" />
                    </span>
                    <h3 className="text-[clamp(1.0625rem,2.3vw,1.2rem)] font-semibold text-slate-900">{domain.title}</h3>
                  </div>
                  <ul className="space-y-2 text-[clamp(0.9rem,2.2vw,1rem)] text-slate-600">
                    {domain.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section
        data-service-section="why-now"
        className="bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-[clamp(1.75rem,4vw,2.75rem)] font-black text-slate-900">
            Pourquoi accélérer maintenant ?
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {whyNowStats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-3xl border border-primary/15 bg-white/90 p-6 text-slate-800 shadow-[0_18px_44px_rgba(59,130,246,0.18)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(59,130,246,0.22)]"
              >
                <p className="text-[clamp(1.5rem,4vw,2.25rem)] font-black text-primary">{stat.value}</p>
                <p className="mt-2 text-[clamp(0.95rem,2.3vw,1.1rem)] text-slate-600">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <UnifiedFAQ
        title="QUESTIONS FRÉQUENTES"
        subtitle="Clarifiez vos interrogations avant d’automatiser."
        description="Notre approche met l’humain et la sécurité au cœur de chaque projet."
        emoji="⚡"
        faqItems={faqItems}
        themeColor={themeColors}
        ctaText="Parler à un expert"
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
          <h2 className="text-balance text-[clamp(1.875rem,5vw,3.4rem)] font-black text-slate-900">
            Prêt à industrialiser vos workflows ?
          </h2>
          <p className="mt-4 max-w-3xl text-balance text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-slate-700">
            Audit offert, feuille de route priorisée, accompagnement humain et sécurisation totale. Lançons ensemble vos
            premières automatisations IA.
          </p>
          <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={scrollToContact}
              className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-[clamp(1rem,2.6vw,1.25rem)] font-bold text-white shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(59,130,246,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 sm:w-auto sm:px-10 sm:py-5"
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              Planifier un audit gratuit
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
