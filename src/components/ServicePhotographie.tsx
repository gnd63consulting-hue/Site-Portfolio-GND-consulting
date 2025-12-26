import React, { useEffect } from 'react';
import {
  Camera,
  Sparkles,
  Heart,
  Users,
  Building,
  ShoppingBag,
  Smartphone,
  Palette,
  Award,
  CheckCircle,
  Target,
  Clock
} from 'lucide-react';
import { UnifiedFAQ } from './UnifiedFAQ';
import { updateMetaTags, pageSEO } from '../utils/seo';
import { ButtonGND } from './ButtonGND';

export function ServicePhotographie() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.photographyService,
      url: `${window.location.origin}/services/photographie`
    });
  }, []);

  const scrollToContact = () => {
    const contactSection = document.querySelector('footer');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const approachPillars = [
    {
      icon: Sparkles,
      title: 'Créativité & storytelling',
      description:
        'Chaque image raconte une histoire. Nous mettons en scène votre univers pour créer des visuels qui marquent durablement.'
    },
    {
      icon: Camera,
      title: 'Qualité professionnelle',
      description:
        'Matériel haut de gamme, lumière maîtrisée, retouches soignées. Vos photos sont prêtes pour tous vos supports.'
    },
    {
      icon: Heart,
      title: 'Expérience humaine',
      description:
        'Un accompagnement attentif pour des séances fluides, bienveillantes et alignées avec votre vision.'
    }
  ];

  const services = [
    {
      icon: Users,
      title: 'Portraits & reportages corporate',
      description:
        'Valorisez vos équipes, vos locaux ou votre savoir-faire avec des portraits professionnels et reportages en entreprise.',
      features: ['Portraits pro', 'Reportages internes', 'Photos en situation', 'Séances en entreprise'],
      tag: 'Business'
    },
    {
      icon: Building,
      title: 'Photographie événementielle',
      description:
        'Capturez les moments forts de vos séminaires, conférences, lancements de produit ou soirées professionnelles.',
      features: ['Séminaires & conférences', 'Lancements & inaugurations', 'Photos naturelles', 'Rendu optimisé communication'],
      tag: 'Événement'
    },
    {
      icon: ShoppingBag,
      title: 'Packshots & produits e-commerce',
      description:
        'Des visuels nets et stylisés pour mettre vos produits en valeur sur les marketplaces ou vos catalogues.',
      features: ['Packshots studio', 'Fond blanc ou créatif', 'Optimisation marketplaces', 'Post-production incluse'],
      tag: 'E-commerce'
    },
    {
      icon: Smartphone,
      title: 'Visuels réseaux sociaux & influence',
      description:
        'Des photos impactantes et immersives pour booster votre image sur Instagram, TikTok ou LinkedIn.',
      features: ['Shoots créatifs', 'Mises en scène storytelling', 'Formats verticaux', 'Identité visuelle forte'],
      tag: 'Social'
    },
    {
      icon: Palette,
      title: 'Publicité & branding',
      description:
        'Des visuels premium pour vos campagnes publicitaires, affiches, brochures ou sites web.',
      features: ['Campagnes créatives', 'Direction artistique', 'Formats print & web', 'Moodboards personnalisés'],
      tag: 'Branding'
    },
    {
      icon: Award,
      title: 'Créations artistiques & book',
      description:
        'Projets artistiques, book modèle, contenu personnel haut de gamme : nous sublimons votre univers.',
      features: ['Shoots book', 'Projets artistiques', 'Collaboration DA', 'Édition sur demande'],
      tag: 'Créatif'
    }
  ];

  const faqItems = [
    {
      question: 'Quels types de séances proposez-vous ?',
      answer:
        'Portraits corporate, reportages, événements, packshots, visuels réseaux sociaux, campagnes publicitaires et shootings artistiques. Chaque prestation est adaptée à vos objectifs.'
    },
    {
      question: 'Quand faut-il réserver ?',
      answer:
        'Idéalement 2 à 3 semaines en amont. Pour les demandes urgentes ou événements, nous trouvons toujours la meilleure option selon nos disponibilités.'
    },
    {
      question: 'Les retouches sont-elles incluses ?',
      answer:
        'Oui. Toutes nos prestations incluent la retouche professionnelle (colorimétrie, exposition, retouche beauté légère). Les retouches avancées sont possibles sur devis.'
    },
    {
      question: 'Quels formats livrez-vous ?',
      answer:
        'Photos haute définition (JPEG et RAW sur demande), optimisées pour le web, les réseaux sociaux et l’impression. Galerie en ligne sécurisée incluse.'
    },
    {
      question: 'Peut-on shooter dans plusieurs lieux ?',
      answer:
        'Absolument. Studio, locaux, extérieurs, multi-sites : nous organisons la séance en fonction de votre planning et de la lumière.'
    }
  ];

  const themeColors = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
  };

  return (
    <main id="main-content" className="service-page service-photo min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section
        data-service-section="hero"
        className="relative overflow-hidden"
        aria-labelledby="service-photo-hero-title"
      >
        <div className="absolute inset-0">
          <img
            src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250924_2210_Elegant%20Studio%20Photography_simple_compose_01k5ynf4s3ea582mksy2kf032p.png"
            alt="Studio photo contemporain avec éclairages professionnels"
            className="h-full w-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-slate-900/55 lg:bg-slate-900/45" />
        </div>

        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-end gap-5 px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-36 lg:min-h-[88vh] lg:pb-24">
          <h1
            id="service-photo-hero-title"
            className="text-balance text-[clamp(1.85rem,5vw,3.75rem)] font-black leading-tight tracking-tight text-white"
          >
            Photographie professionnelle & direction artistique
          </h1>
          <p className="text-balance text-[clamp(1rem,3.8vw,1.5rem)] font-light leading-relaxed text-white/90">
            Portraits, reportages, packshots, campagnes : composez des images qui laissent une empreinte.
          </p>
          <ButtonGND
            variant="primary"
            onClick={scrollToContact}
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl text-[clamp(1rem,2.6vw,1.25rem)] px-6 py-4 sm:px-8 sm:py-5 lg:px-12 lg:py-6"
          >
            <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
            Réserver une séance sur mesure
          </ButtonGND>
        </div>
      </section>

      {/* INTRO */}
      <section
        data-service-section="intro"
        className="bg-gradient-to-b from-white to-slate-50 py-24 lg:py-32 px-4 sm:px-6 lg:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-balance text-[clamp(1rem,2.6vw,1.45rem)] leading-relaxed text-slate-700">
            Plus qu’un simple shooting, nous créons une expérience. Chaque séance est pensée pour refléter votre identité,
            votre équipe ou vos produits sous leur meilleur angle, avec une direction artistique sur-mesure et un workflow
            parfaitement orchestré.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section
        data-service-section="advantages"
        className="bg-white py-24 lg:py-32 px-4 sm:px-6 lg:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,2.75rem)] font-black text-slate-900">
              Une approche créative & humaine
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {approachPillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50/70 p-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
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

      {/* SERVICES */}
      <section
        data-service-section="services"
        className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24 lg:py-32 px-4 sm:px-6 lg:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,3rem)] font-black text-slate-900">
              Nos prestations photo
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-slate-600">
              Une palette complète pour nourrir vos campagnes, votre communication interne ou vos réseaux sociaux.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <article
                  key={service.title}
                  className="flex h-full flex-col rounded-3xl border border-white/70 bg-white/95 p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                      <IconComponent className="h-7 w-7" />
                    </span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                      {service.tag}
                    </span>
                  </div>
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

      {/* PROCESS */}
      <section
        data-service-section="methodology"
        className="bg-white py-24 lg:py-32 px-4 sm:px-6 lg:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-[clamp(1.875rem,4vw,2.75rem)] font-black text-slate-900">
              Un workflow fluide et cadré
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-slate-600">
              De la préparation à la livraison, chaque étape est maîtrisée pour garantir un résultat impeccable.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                icon: Target,
                title: 'Brief & moodboard',
                description: 'Définition du style, repérage des lieux, préparation des tenues et des accessoires.'
              },
              {
                icon: Camera,
                title: 'Séance photo',
                description: 'Session guidée, direction artistique, lumière maîtrisée et ambiance posée.'
              },
              {
                icon: CheckCircle,
                title: 'Sélection & retouche',
                description: 'Tri des meilleures images, retouches professionnelles, harmonisation colorimétrique.'
              },
              {
                icon: Clock,
                title: 'Livraison rapide',
                description: 'Galerie sécurisée, formats optimisés pour vos canaux web & print, sauvegarde longue durée.'
              }
            ].map((step, index) => (
              <article
                key={step.title}
                className="flex h-full flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-[clamp(1.0625rem,2.3vw,1.2rem)] font-semibold text-slate-900">{step.title}</h3>
                </div>
                <p className="pl-[3.6rem] text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <UnifiedFAQ
        title="QUESTIONS FRÉQUENTES"
        subtitle="Tout savoir avant votre séance photo."
        description="Planning, retouches, formats livrés… retrouvez les réponses aux questions les plus posées."
        emoji="📸"
        faqItems={faqItems}
        themeColor={themeColors}
        ctaText="Je lance mon projet photo"
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
          <h2 className="text-balance text-[clamp(1.875rem,5vw,3.4rem)] font-black text-slate-900">
            Prêt à créer des visuels inoubliables ?
          </h2>
          <p className="mt-4 max-w-3xl text-balance text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-slate-700">
            Transformons vos idées en images qui inspirent confiance, désir et engagement. Parlez-nous de votre projet et
            imaginons ensemble la séance idéale.
          </p>
          <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            <ButtonGND
              variant="primary"
              onClick={scrollToContact}
              className="w-full max-w-sm sm:w-auto"
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              Réserver une séance
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
