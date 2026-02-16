import React, { useEffect, useState, useCallback } from 'react';
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
  Clock,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { UnifiedFAQ } from './UnifiedFAQ';
import { updateMetaTags, pageSEO } from '../utils/seo';
import { ButtonGND } from './ButtonGND';

export function ServicePhotographie() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    updateMetaTags({
      ...pageSEO.photographyService,
      url: `${window.location.origin}/services/photographie`
    });
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : null));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : null));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex]);

  const scrollToContact = () => {
    const contactSection = document.querySelector('footer');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const galleryPhotos = [
    {
      src: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4251.jpg',
      alt: 'Shooting corporate en entreprise'
    },
    {
      src: '/PHOTO-2025-07-13-18-18-00.jpg',
      alt: 'Portrait professionnel'
    },
    {
      src: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4135.jpg',
      alt: 'Photographie événementielle'
    },
    {
      src: '/PHOTO-2025-07-13-18-18-01.jpg',
      alt: 'Séance photo corporate'
    },
    {
      src: '/PHOTO-2025-07-13-18-18-02.jpg',
      alt: 'Direction artistique'
    },
    {
      src: '/PHOTO-2025-07-13-18-18-00 2.jpg',
      alt: 'Portrait en lumière naturelle'
    }
  ];

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

  const methodology = [
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
        'Photos haute définition (JPEG et RAW sur demande), optimisées pour le web, les réseaux sociaux et l\u2019impression. Galerie en ligne sécurisée incluse.'
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
    <main id="main-content" className="service-page service-photo min-h-screen bg-white text-[#1A1A1A] font-sans">
      {/* HERO — image plein écran + overlay + badge catégorie */}
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
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative mx-auto flex min-h-[60vh] w-full max-w-[1400px] flex-col items-center justify-end gap-6 px-6 pb-16 pt-32 text-center lg:px-12 lg:min-h-[88vh] lg:pb-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-xs font-medium uppercase tracking-widest text-white/80">
            Photographie
          </span>
          <h1
            id="service-photo-hero-title"
            className="font-display text-balance text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.9] tracking-tight text-white"
          >
            Photographie professionnelle & direction artistique
          </h1>
          <p className="max-w-2xl text-balance text-[clamp(1.125rem,3vw,1.75rem)] font-light leading-relaxed text-white/90">
            Portraits, reportages, packshots, campagnes : composez des images qui laissent une empreinte.
          </p>
          <ButtonGND
            variant="primary"
            onClick={scrollToContact}
            className="w-full max-w-md sm:max-w-lg lg:max-w-xl text-[clamp(1rem,2.6vw,1.25rem)] bg-black text-white rounded-full px-8 py-4 hover:bg-gray-800 hover:scale-105"
          >
            <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
            Réserver une séance sur mesure
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
            Plus qu&apos;un simple shooting, nous créons une expérience. Chaque séance est pensée pour refléter votre identité,
            votre équipe ou vos produits sous leur meilleur angle, avec une direction artistique sur-mesure et un workflow
            parfaitement orchestré.
          </p>
        </div>
      </section>

      {/* GALERIE — masonry grid avec lightbox */}
      <section
        data-service-section="gallery"
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted mb-6">
              Portfolio
            </span>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Nos dernières réalisations
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-text-muted">
              Une sélection de nos shootings récents, du portrait corporate à la captation événementielle.
            </p>
          </div>

          {/* Masonry grid via CSS columns */}
          <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryPhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end justify-start p-6">
                  <span className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-sm font-medium text-white">
                    {photo.alt}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Galerie photo"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
            }}
            className="absolute left-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 sm:left-8"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <img
            src={galleryPhotos[lightboxIndex].src}
            alt={galleryPhotos[lightboxIndex].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length);
            }}
            className="absolute right-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 sm:right-8"
            aria-label="Photo suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {lightboxIndex + 1} / {galleryPhotos.length}
          </div>
        </div>
      )}

      {/* NOTRE APPROCHE — 3 colonnes numérotées, icon inversion */}
      <section
        data-service-section="advantages"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted mb-6">
              Notre approche
            </span>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Une approche créative & humaine
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {approachPillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="group flex h-full flex-col gap-4 bg-gray-50 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted transition-colors duration-500 group-hover:text-gray-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-all duration-500 group-hover:bg-white group-hover:text-black">
                    <IconComponent className="h-7 w-7" />
                  </span>
                  <h3 className="text-[clamp(1.05rem,2.4vw,1.2rem)] font-semibold text-[#1A1A1A] transition-colors duration-500 group-hover:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-[clamp(0.9375rem,2.2vw,1.05rem)] leading-relaxed text-text-muted transition-colors duration-500 group-hover:text-gray-300">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFFRE — 6 cards avec icônes, hover-to-black + icon inversion + tags */}
      <section
        data-service-section="services"
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted mb-6">
              Notre offre
            </span>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Nos prestations photo
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.25rem)] text-text-muted">
              Une palette complète pour nourrir vos campagnes, votre communication interne ou vos réseaux sociaux.
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
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-all duration-500 group-hover:bg-white group-hover:text-black">
                      <IconComponent className="h-7 w-7" />
                    </span>
                    <span className="border border-gray-300 group-hover:border-white/20 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent transition-colors duration-500 group-hover:text-blue-300">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[clamp(1.125rem,2.6vw,1.35rem)] font-bold text-[#1A1A1A] transition-colors duration-500 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[clamp(0.9375rem,2.3vw,1rem)] leading-relaxed text-text-muted transition-colors duration-500 group-hover:text-gray-300">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-[clamp(0.9rem,2.2vw,0.975rem)] text-text-muted">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 transition-colors duration-500 group-hover:text-gray-300">
                        <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0"></span>
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

      {/* PROCESSUS — 4 étapes numérotées */}
      <section
        data-service-section="methodology"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted mb-6">
              Processus
            </span>
            <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
              Un workflow fluide et cadré
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-text-muted">
              De la préparation à la livraison, chaque étape est maîtrisée pour garantir un résultat impeccable.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <article
                  key={step.title}
                  className="group relative flex h-full flex-col gap-4 bg-gray-50 rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="font-display text-5xl font-semibold text-gray-200 group-hover:text-white/10 transition-colors duration-500 absolute top-6 right-6">
                    {String(index + 1).padStart(2, '0')}
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
                  {index < methodology.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gray-200 z-10" />
                  )}
                </article>
              );
            })}
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
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-center text-center">
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
            Prêt à créer des visuels inoubliables ?
          </h2>
          <p className="mt-4 max-w-3xl text-balance text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-text-muted">
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
