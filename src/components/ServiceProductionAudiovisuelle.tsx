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

  // Animation reveal au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
        'Présentations d\'entreprise, vidéos de formation, contenus internes, témoignages clients ou onboarding.',
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
      description: 'Micro-structure flexible, épaulée par un réseau d\'experts activable selon les besoins.'
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
      description: 'Les vidéos génèrent jusqu\'à 12 fois plus de partages que du contenu image ou texte.'
    },
    {
      icon: Eye,
      title: '95% de mémorisation',
      description: 'Un message en vidéo est retenu beaucoup plus longtemps qu\'un message uniquement textuel.'
    },
    {
      icon: Heart,
      title: '80% des utilisateurs',
      description: 'Préfèrent découvrir un produit ou un service via une vidéo plutôt que du texte.'
    },
    {
      icon: Award,
      title: '5x plus d\'engagement',
      description: 'Les campagnes intégrant la vidéo déclenchent plus d\'interactions et de conversions.'
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
        'Bien sûr. Nous proposons des prestations "post-production only" si vous disposez déjà de rushs. Nous travaillons avec tous les formats (caméra, smartphone, DSLR…).'
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

  // Vrais projets audiovisuels de GND Consulting
  const audiovisualProjects = [
    {
      id: 'esther-seems-bobine',
      title: 'ESTHER SEEMS – BOBINE',
      tag: 'Clip musical',
      thumbnail: 'https://img.youtube.com/vi/6oaO6YoWjyQ/maxresdefault.jpg',
      href: '/#realisations',
    },
    {
      id: 'leyel-miel',
      title: 'LEYEL – MIEL',
      tag: 'Clip musical',
      thumbnail: 'https://img.youtube.com/vi/UbXQim7iNLI/maxresdefault.jpg',
      href: '/#realisations',
    },
    {
      id: 'sabay-festival-2023',
      title: 'SABAY FESTIVAL 2023',
      tag: 'Événementiel',
      thumbnail: 'https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg',
      href: '/#realisations',
    },
    {
      id: 'concert-ali',
      title: 'CONCERT ALI 45 SCIENTIFIC',
      tag: 'Captation live',
      thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
      href: '/#realisations',
    },
  ];

  return (
    <main id="main-content" className="service-page service-production min-h-screen bg-white text-[#1A1A1A] font-sans">

      {/* ═══════════════════════════════════════════════════
          1. HERO SERVICE — badge, H1 massif, sous-titre, image
          ═══════════════════════════════════════════════════ */}
      <section
        data-service-section="hero"
        className="relative bg-white pt-32 pb-20"
        aria-labelledby="service-production-hero-title"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Badge catégorie */}
          <div className="reveal">
            <span className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-8">
              <span className="material-symbols-outlined text-sm">movie</span>
              Production Audiovisuelle
            </span>
          </div>

          {/* Titre H1 massif en font-display */}
          <h1
            id="service-production-hero-title"
            className="reveal font-display font-semibold text-[#1A1A1A] leading-[0.9] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
          >
            Production audiovisuelle
            <br />
            <span className="italic font-light text-gray-400">sur-mesure</span>
          </h1>

          {/* Sous-titre descriptif */}
          <p className="reveal delay-100 text-lg text-[#64748B] leading-relaxed max-w-2xl mb-12">
            Captation live, montage, clips, corporate : nous sublimons vos histoires en images.
            Deux décennies de captation, montage et post-production nous ont appris une chose : une vidéo réussie
            est un savant mélange d'émotion, de rythme et d'exigence technique.
          </p>

          {/* Image hero — vidéo autoplay existante */}
          <div className="reveal delay-200 relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-xs font-medium text-white uppercase tracking-widest">
                <span className="w-2 h-2 bg-white rounded-full" />
                GND Consulting
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. DESCRIPTION — grille texte gauche + prestations droite
          ═══════════════════════════════════════════════════ */}
      <section
        data-service-section="services"
        className="py-32 px-6 lg:px-12 bg-white"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Texte explicatif gauche */}
            <div>
              <span className="inline-flex items-center border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-8">
                Notre offre
              </span>
              <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3rem)] text-[#1A1A1A] leading-[0.95] mb-6">
                Nos expertises vidéo
              </h2>
              <p className="text-lg text-[#64748B] leading-relaxed mb-4">
                Chez GND Consulting, nous concevons des contenus audiovisuels qui{' '}
                <strong className="text-accent">attirent l'attention, racontent votre histoire</strong> et
                génèrent le bon impact, quel que soit le support de diffusion.
              </p>
              <p className="text-base text-[#64748B] leading-relaxed">
                Une offre complète, de la captation live au montage final, pour couvrir tous vos besoins audiovisuels.
              </p>
            </div>

            {/* Liste de prestations droite — cards avec icônes Material Symbols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertises.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group bg-gray-50 rounded-2xl p-6 transition-all duration-500 hover:bg-black hover:text-white"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white group-hover:bg-white group-hover:text-black transition-all duration-500 flex-shrink-0">
                        <IconComponent className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-sm font-semibold text-[#1A1A1A] group-hover:text-white transition-colors duration-500 leading-tight pt-2">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed group-hover:text-gray-300 transition-colors duration-500 mb-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-[10px] uppercase tracking-wider text-[#64748B] group-hover:text-gray-400 border border-gray-200 group-hover:border-white/20 rounded-full px-2.5 py-1 transition-colors duration-500"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent group-hover:text-blue-300 transition-colors duration-500">
                      <Clock className="h-3 w-3" />
                      {item.delay}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. PROCESSUS — 4 étapes horizontales numérotées
          ═══════════════════════════════════════════════════ */}
      <section
        data-service-section="methodology"
        className="py-32 px-6 lg:px-12 bg-[#F3F4F6]"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-16 reveal">
            <span className="inline-flex items-center border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-6">
              Processus
            </span>
            <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95]">
              Un processus cadré et transparent
            </h2>
            <p className="mt-4 text-lg text-[#64748B] leading-relaxed max-w-3xl mx-auto">
              Nous orchestrons chaque étape pour vous livrer une production fluide, sereine et fidèle à votre vision.
            </p>
          </div>

          {/* 4 étapes en grille horizontale */}
          <div className="reveal delay-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.title}
                  className="group relative bg-white rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white"
                >
                  {/* Numéro en fond */}
                  <span className="font-display text-5xl font-semibold text-gray-100 group-hover:text-white/10 transition-colors duration-500 absolute top-6 right-6">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icône */}
                  <div className="relative z-10 mb-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                      <IconComponent className="h-6 w-6" />
                    </span>
                  </div>

                  {/* Contenu */}
                  <h3 className="relative z-10 font-display text-lg font-semibold text-[#1A1A1A] group-hover:text-white transition-colors duration-500 mb-3">
                    {step.title}
                  </h3>
                  <p className="relative z-10 text-sm text-[#64748B] leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {step.description}
                  </p>

                  {/* Séparateur vers étape suivante */}
                  {index < methodology.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gray-200 z-20" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. PILIERS — 4 avantages
          ═══════════════════════════════════════════════════ */}
      <section
        data-service-section="advantages"
        className="py-32 px-6 lg:px-12 bg-white"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95]">
              Nos 4 piliers pour une vidéo réussie
            </h2>
          </div>

          <div className="reveal delay-100 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group bg-gray-50 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="text-xs font-medium uppercase tracking-widest text-[#64748B] group-hover:text-gray-400 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="mx-auto mt-4 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#1A1A1A] group-hover:text-white transition-colors duration-500">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#64748B] leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. IMPACTS — Pourquoi miser sur la vidéo
          ═══════════════════════════════════════════════════ */}
      <section
        data-service-section="impact"
        className="py-32 px-6 lg:px-12 bg-[#F3F4F6]"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-16 reveal">
            <span className="inline-flex items-center border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-6">
              Impact
            </span>
            <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95]">
              Pourquoi miser sur la vidéo ?
            </h2>
            <p className="mt-4 text-lg text-[#64748B] leading-relaxed max-w-3xl mx-auto">
              Des chiffres clés qui montrent la puissance de l'audiovisuel pour votre communication.
            </p>
          </div>

          <div className="reveal delay-100 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {videoImpacts.map((impact) => {
              const IconComponent = impact.icon;
              return (
                <div
                  key={impact.title}
                  className="group bg-white rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <IconComponent className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-[#1A1A1A] group-hover:text-white transition-colors duration-500">
                    {impact.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#64748B] leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                    {impact.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. PROJETS LIÉS — Grille asymétrique
          ═══════════════════════════════════════════════════ */}
      <section
        data-service-section="projects"
        className="py-32 px-6 lg:px-12 bg-white"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-16 reveal">
            <span className="inline-flex items-center border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-6">
              Portfolio
            </span>
            <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95]">
              Projets audiovisuels
            </h2>
            <p className="mt-4 text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              Quelques réalisations qui illustrent notre savoir-faire en production audiovisuelle.
            </p>
          </div>

          {/* Grille asymétrique — même style que homepage */}
          <div className="reveal delay-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colonne gauche — aspect-[4/3] */}
            <div className="flex flex-col gap-6">
              {audiovisualProjects.slice(0, 2).map((project) => (
                <a
                  key={project.id}
                  href={project.href}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden no-underline focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="font-display text-lg font-semibold text-white mb-2">{project.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70 uppercase tracking-widest">{project.tag}</span>
                      <span className="material-symbols-outlined text-white text-sm">arrow_outward</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Colonne droite — aspect-[3/4] avec md:mt-24 */}
            <div className="flex flex-col gap-6 md:mt-24">
              {audiovisualProjects.slice(2, 4).map((project) => (
                <a
                  key={project.id}
                  href={project.href}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden no-underline focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="font-display text-lg font-semibold text-white mb-2">{project.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70 uppercase tracking-widest">{project.tag}</span>
                      <span className="material-symbols-outlined text-white text-sm">arrow_outward</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bouton vers portfolio complet */}
          <div className="text-center mt-12 reveal delay-150">
            <a
              href="/#realisations"
              className="inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 text-sm font-medium font-display transition-all duration-300 hover:bg-gray-800 hover:scale-105 no-underline"
            >
              Voir tout le portfolio
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ — contenu existant intégralement conservé */}
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

      {/* ═══════════════════════════════════════════════════
          7. CTA FINAL
          ═══════════════════════════════════════════════════ */}
      <section
        data-service-section="cta-final"
        className="py-20 px-6 lg:px-12 bg-white"
      >
        <div className="mx-auto max-w-[1400px] text-center reveal">
          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95] mb-4">
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto mb-8">
            Nous mettons notre énergie créative et notre expertise technique au service de vos ambitions.
            Briefons-nous et imaginons ensemble la production qui marquera votre audience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 text-sm font-medium font-display transition-all duration-300 hover:bg-gray-800 hover:scale-105"
            >
              Discutons-en
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </button>
            <a
              href="/#realisations"
              className="inline-flex items-center gap-2 border border-gray-300 text-[#1A1A1A] rounded-full px-8 py-4 text-sm font-medium font-display transition-all duration-300 hover:bg-gray-50 no-underline"
            >
              Voir nos réalisations
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
