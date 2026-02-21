import React, { useEffect, useState } from 'react';
import {
  Video,
  Scissors,
  Music,
  Camera,
  Smartphone,
  Briefcase,
  Heart,
  Sparkles,
  Users,
  Target,
  Zap,
  Clock,
  FileText,
  CheckCircle,
  Play
} from 'lucide-react';
import { UnifiedFAQ } from './UnifiedFAQ';
import { updateMetaTags, pageSEO } from '../utils/seo';
import { ButtonGND } from './ButtonGND';

const IMAGE_HERO =
  'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png';
const VIDEO_SHOWREEL =
  'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4';
const VIDEO_TRINITY =
  'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/trinity_rebel_univers_officiel.mp4';
const VIDEO_CONCERT_ALI =
  'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Concert%20Ali.mp4';
const VIDEO_THIEK =
  'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Thiek%20au%20Sabay%20Festival%202022%20Haute%20def%204k%20v2.mp4';

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

  const [activeVideo, setActiveVideo] = useState(VIDEO_TRINITY);

  const services = [
    {
      icon: Video,
      title: 'Captation live & technique',
      description:
        'Multi-caméras 4K/8K, régie vidéo, projection & retours écrans, streaming multiplateforme.'
    },
    {
      icon: Scissors,
      title: 'Montage & post-production',
      description:
        'Montage professionnel, étalonnage couleur, sound design et effets visuels.'
    },
    {
      icon: Music,
      title: 'Clips & contenus artistiques',
      description:
        'Clips musicaux, vidéos créatives, univers stylisés et narration immersive.'
    },
    {
      icon: Camera,
      title: 'Captation événementielle',
      description:
        'Tournage terrain, reportages, captation discrète et interviews professionnelles.'
    },
    {
      icon: Smartphone,
      title: 'Vidéos social media',
      description:
        'Reels, Stories, formats verticaux et contenus viraux pour TikTok, Instagram, YouTube.'
    },
    {
      icon: Briefcase,
      title: 'Corporate & e-learning',
      description:
        "Vidéos d'entreprise, formations, présentation produit et contenus pédagogiques."
    }
  ];

  const methodology = [
    {
      step: 1,
      title: 'Préparation & brief',
      description:
        'Brief créatif, repérages, scénario, moodboard et rétroplanning détaillé.',
      icon: Target
    },
    {
      step: 2,
      title: 'Captation',
      description:
        'Tournage professionnel avec équipe dédiée et matériel adapté à votre projet.',
      icon: Camera
    },
    {
      step: 3,
      title: 'Montage & post-production',
      description:
        'Montage, étalonnage, sound design, motion graphics, sous-titres et versions sociales.',
      icon: Scissors
    },
    {
      step: 4,
      title: 'Finalisation & livraison',
      description:
        'Validation finale et export de tous les formats nécessaires + archivage des sources.',
      icon: CheckCircle
    }
  ];

  const advantages = [
    {
      icon: Sparkles,
      title: 'Créativité sur-mesure',
      description:
        'Chaque projet est pensé pour être unique, impactant et aligné sur votre stratégie de marque.'
    },
    {
      icon: Zap,
      title: 'Agilité & réactivité',
      description:
        "Micro-structure flexible, épaulée par un réseau d'experts activable selon les besoins."
    },
    {
      icon: Users,
      title: 'Accompagnement personnalisé',
      description:
        'Nous co-construisons avec vos équipes pour créer des contenus qui vous ressemblent.'
    },
    {
      icon: Clock,
      title: 'Outils modernes intégrés',
      description:
        'Workflow optimisé avec IA, automatisations et process fluides pour livrer plus vite.'
    }
  ];

  const faqItems = [
    {
      question: 'Combien de temps dure une production vidéo ?',
      answer:
        'Cela dépend du projet : une vidéo social media peut être livrée en 3 à 7 jours, un corporate en 1 à 3 semaines. Nous établissons toujours un rétroplanning précis dès le brief.'
    },
    {
      question: 'Peut-on filmer dans plusieurs lieux ?',
      answer:
        "Oui, absolument. Nous intervenons sur toute la France et à l'international. Les frais de déplacement sont intégrés au devis."
    },
    {
      question: 'Pouvez-vous gérer uniquement le montage ?',
      answer:
        "Tout à fait. Si vous avez déjà des rushes, nous prenons en charge le montage, l'étalonnage, le sound design et les livrables finaux."
    },
    {
      question: 'Quel budget prévoir ?',
      answer:
        "Nos projets démarrent à partir de 800\u20AC pour une vidéo social media. Un corporate ou une captation événementielle commence autour de 2\u202F000\u20AC. Chaque projet fait l'objet d'un devis sur-mesure."
    },
    {
      question: 'Comment se déroule le premier brief ?',
      answer:
        'On commence par un appel de 30 minutes pour comprendre vos objectifs. Ensuite, nous envoyons une proposition créative et un devis détaillé sous 48h.'
    }
  ];

  const themeColors = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
  };

  return (
    <main
      id="main-content"
      className="service-page service-production min-h-screen bg-white text-[#1A1A1A] font-sans"
    >
      {/* HERO — Design system Stitch (dark immersif) */}
      <section className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden bg-black">
        {/* Fond plein écran — style homepage */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGE_HERO}
            alt=""
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Overlay sombre identique à la homepage */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-[1400px] mx-auto w-full z-10">

          {/* Bloc titre */}
          <div className="mb-12">
            <h1 className="font-display font-semibold text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight text-white mb-8">
              Production<br />
              <span className="text-white/60 italic font-normal">audiovisuelle.</span>
            </h1>

            {/* Ligne séparatrice + sous-titre + métadonnées */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/20 pt-8 mt-12">
              <p className="text-lg md:text-xl text-white/80 max-w-md leading-relaxed">
                Studio parisien spécialisé en captation live, montage et post-production — nous sublimons vos histoires en images.
              </p>
              <div className="flex items-center gap-3 text-sm font-medium tracking-wide uppercase text-white/50">
                <span>Paris, FR</span>
                <span className="text-white/30">•</span>
                <span>4K / 8K</span>
                <span className="text-white/30">•</span>
                <span>Scroll</span>
              </div>
            </div>
          </div>

          {/* CTA avant le bloc média */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href="/#contact-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-all hover:scale-105"
            >
              Voir nos réalisations
              <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </a>
          </div>

          {/* Bloc média — Showreel vidéo */}
          <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            >
              <source src={VIDEO_SHOWREEL} type="video/mp4" />
            </video>

            {/* Overlay léger */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />

            {/* Bouton play — apparaît au hover */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                <span className="material-symbols-outlined text-3xl">play_arrow</span>
              </div>
            </div>

            {/* Label bas gauche */}
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs font-mono uppercase tracking-widest mb-2 opacity-70">Showreel 2024</p>
              <p className="text-2xl font-display font-medium">Captation & Mouvement</p>
            </div>

            {/* CTA bas droite */}
            <div className="absolute bottom-8 right-8">
              <a
                href="/#contact-form"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-all hover:scale-105"
              >
                Demander un devis
                <span className="material-symbols-outlined text-sm">arrow_outward</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION INTRO — Pattern homepage "À propos" */}
      <section className="py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Colonne gauche — Image */}
          <div className="relative">
            <img
              src={IMAGE_HERO}
              alt="Production audiovisuelle GND Consulting"
              className="w-full aspect-square object-cover rounded-2xl"
            />
          </div>

          {/* Colonne droite — Texte */}
          <div className="flex flex-col gap-6">

            {/* Badge pill */}
            <div className="inline-flex items-center self-start px-4 py-2 rounded-full border border-gray-200 bg-white">
              <span className="text-xs font-medium tracking-widest uppercase text-gray-500">
                Notre approche
              </span>
            </div>

            {/* Titre Stitch */}
            <h2 className="text-5xl lg:text-6xl font-black leading-tight text-black">
              L&apos;image au service
              <br />
              <span className="italic font-normal text-gray-400">de votre histoire.</span>
            </h2>

            {/* Sous-titre */}
            <p className="text-lg text-gray-500 leading-relaxed">
              Studio parisien spécialisé en captation live, montage et post-production.
            </p>

            {/* Paragraphe */}
            <p className="text-base text-gray-600 leading-relaxed">
              Chez GND Consulting, nous concevons des contenus audiovisuels qui racontent votre histoire
              et génèrent le bon impact. Une vidéo réussie est un savant mélange d&apos;émotion, de rythme
              et d&apos;exigence technique, quel que soit le support de diffusion.
            </p>

            {/* Stats */}
            <div className="flex gap-12 py-4">
              <div>
                <p className="text-5xl font-black text-black">50+</p>
                <p className="text-sm text-gray-400 mt-1">Projets vidéo réalisés</p>
              </div>
              <div>
                <p className="text-5xl font-black text-black">4K/8K</p>
                <p className="text-sm text-gray-400 mt-1">Qualité de production</p>
              </div>
            </div>

            {/* Tags pills */}
            <div className="flex flex-wrap gap-3">
              {['Captation', 'Montage', 'Post-prod', 'Live'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="/realisations"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105"
              >
                Voir nos réalisations
                <span>↗</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION CRÉATIONS — Galerie 3 vidéos */}
      <section className="py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">

          {/* En-tête */}
          <div className="mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white mb-6">
              <span className="text-xs font-medium tracking-widest uppercase text-gray-500">
                Nos créations
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-black leading-tight">
              Des productions qui
              <br />
              <span className="italic font-normal text-gray-400">parlent d&apos;elles-mêmes.</span>
            </h2>
          </div>

          {/* Visionneuse principale */}
          <div className="relative max-w-3xl mx-auto mt-10 mb-8 aspect-video rounded-2xl overflow-hidden bg-gray-900">
            <video
              key={activeVideo}
              src={activeVideo}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
          </div>

          {/* Grille 3 vidéos — clic charge dans la visionneuse */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { src: VIDEO_TRINITY, categorie: 'Clip Musical', titre: 'Trinity Rebel — Univers Officiel' },
              { src: VIDEO_CONCERT_ALI, categorie: 'Captation Live', titre: 'Concert Ali' },
              { src: VIDEO_THIEK, categorie: 'Événementiel 4K', titre: 'Thiek — Sabay Festival 2022' },
            ].map((item) => (
              <div
                key={item.src}
                className={`group relative aspect-video bg-gray-900 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeVideo === item.src ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setActiveVideo(item.src)}
              >
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                {/* Bouton play */}
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <span className="text-white text-xl ml-1">▶</span>
                  </div>
                </div>
                {/* Label bas */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{item.categorie}</p>
                  <p className="text-white font-bold text-sm">{item.titre}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA bas */}
          <div className="mt-10 text-center">
            <a
              href="/services/production-audiovisuelle"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300"
            >
              Voir toutes nos réalisations
              <span>↗</span>
            </a>
          </div>

        </div>
      </section>

      {/* OFFRE — 6 cards avec icônes, hover-to-black + icon inversion */}
      <section
        data-service-section="services"
        className="reveal bg-white py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12">

            {/* Badge pill */}
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white mb-6">
              <span className="text-xs font-medium tracking-widest uppercase text-gray-500">
                Notre offre
              </span>
            </div>

            {/* Titre Stitch — aligné gauche */}
            <h2 className="text-5xl lg:text-6xl font-black leading-tight text-black">
              Nos expertises vidéo
              <br />
              <span className="italic font-normal text-gray-400">à votre service.</span>
            </h2>

          </div>

          {/* EXPERTISES PRINCIPALES — layout éditorial alternant */}
          <div className="space-y-0">

            {/* Expertise 1 — image gauche, texte droite */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-gray-100">
              <div className="aspect-[4/3] lg:aspect-auto bg-gray-100 overflow-hidden">
                <img
                  src={IMAGE_HERO}
                  alt="Captation live"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex flex-col justify-center p-12 lg:p-16">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">01</span>
                <h3 className="text-3xl font-black text-black mb-4">Captation live &amp; technique</h3>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Multi-caméras 4K/8K, régie vidéo, projection &amp; retours écrans, streaming multiplateforme. Nous couvrons vos événements avec la rigueur d&apos;un studio de broadcast.
                </p>
                <span className="text-xs font-mono uppercase tracking-widest border-b border-black pb-1 self-start cursor-default">
                  Captation · Streaming · Régie
                </span>
              </div>
            </div>

            {/* Expertise 2 — texte gauche, image droite */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-gray-100">
              <div className="flex flex-col justify-center p-12 lg:p-16 order-2 lg:order-1">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">02</span>
                <h3 className="text-3xl font-black text-black mb-4">Montage &amp; post-production</h3>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Montage narratif, étalonnage couleur cinématographique, sound design et effets visuels. Du rushes au master final livrable sur tous supports.
                </p>
                <span className="text-xs font-mono uppercase tracking-widest border-b border-black pb-1 self-start cursor-default">
                  Montage · Étalonnage · Sound design
                </span>
              </div>
              <div className="aspect-[4/3] lg:aspect-auto bg-gray-100 overflow-hidden order-1 lg:order-2">
                <img
                  src={IMAGE_HERO}
                  alt="Montage"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Expertise 3 — image gauche, texte droite */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-gray-100">
              <div className="aspect-[4/3] lg:aspect-auto bg-gray-100 overflow-hidden">
                <img
                  src={IMAGE_HERO}
                  alt="Clips artistiques"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex flex-col justify-center p-12 lg:p-16">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">03</span>
                <h3 className="text-3xl font-black text-black mb-4">Clips &amp; contenus artistiques</h3>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Clips musicaux, vidéos créatives, univers stylisés et narration immersive. On co-construit l&apos;esthétique avec l&apos;artiste pour servir sa vision.
                </p>
                <span className="text-xs font-mono uppercase tracking-widest border-b border-black pb-1 self-start cursor-default">
                  Clips · Direction artistique · Narration
                </span>
              </div>
            </div>

          </div>

          {/* EXPERTISES SECONDAIRES — 3 items en ligne simple */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 mt-0 border-b border-gray-100">

            {[
              { num: '04', titre: 'Captation événementielle', tags: 'Reportage · Interview · Terrain' },
              { num: '05', titre: 'Vidéos social media', tags: 'Reels · Stories · Formats verticaux' },
              { num: '06', titre: 'Corporate & e-learning', tags: 'Entreprise · Formation · Produit' },
            ].map((item) => (
              <div key={item.num} className="bg-white p-10 flex flex-col gap-4 hover:bg-gray-50 transition-colors">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">{item.num}</span>
                <h3 className="text-xl font-black text-black">{item.titre}</h3>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2 self-start">
                  {item.tags}
                </span>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* APPROCHE — 2 colonnes texte + image */}
      <section
        data-service-section="approach"
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted">
                Notre approche
              </span>
              <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
                L&apos;image qui raconte votre histoire
              </h2>
              <div className="space-y-5 text-[clamp(0.95rem,2.3vw,1.1rem)] leading-relaxed text-text-muted">
                <p>
                  Notre approche commence toujours par{' '}
                  <strong className="text-accent">l&apos;écoute</strong>. Nous prenons le
                  temps de comprendre vos enjeux, votre audience et l&apos;histoire que
                  vous voulez raconter.
                </p>
                <p>
                  Ensuite vient la{' '}
                  <strong className="text-accent">production sur-mesure</strong>. Chaque
                  captation, chaque montage est pensé pour transmettre l&apos;émotion
                  juste et générer l&apos;impact attendu.
                </p>
                <p>
                  Le résultat ? Des contenus vidéo{' '}
                  <strong className="text-accent">authentiques et percutants</strong>,
                  prêts à performer sur tous vos canaux de diffusion.
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
                  src={IMAGE_HERO}
                  alt="Équipe de production audiovisuelle GND Consulting"
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
              Du brief à la livraison
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.2rem)] text-text-muted">
              Un processus structuré et transparent, où chaque étape est validée ensemble.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                    <h3 className="text-[clamp(1rem,2.3vw,1.1rem)] font-semibold text-[#1A1A1A] transition-colors duration-500 group-hover:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[clamp(0.875rem,2vw,0.975rem)] leading-relaxed text-text-muted transition-colors duration-500 group-hover:text-gray-300">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* AVANTAGES — 4 colonnes numérotées, icon inversion */}
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
              4 raisons qui font la différence dans votre projet vidéo
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
              Prêt à tourner votre prochaine vidéo ?
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

      {/* SECTION FAQ — Design Stitch */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">

          {/* En-tête Stitch */}
          <div className="mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white mb-6">
              <span className="text-xs font-medium tracking-widest uppercase text-gray-500">
                FAQ
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-black leading-tight">
              Questions fréquentes
              <br />
              <span className="italic font-normal text-gray-400">sur nos productions.</span>
            </h2>
          </div>

          {/* Accordéons */}
          <div className="divide-y divide-gray-100">
            {[
              {
                question: 'Combien de temps dure une production vidéo ?',
                reponse: "Selon la complexité, comptez 1 à 3 semaines de la captation à la livraison finale. Un clip événementiel simple peut être livré en 5 jours ouvrés."
              },
              {
                question: 'Peut-on filmer dans plusieurs lieux ?',
                reponse: "Oui, nous nous déplaçons partout en France et à l'international. Les frais de déplacement sont inclus dans le devis selon la localisation."
              },
              {
                question: 'Pouvez-vous gérer uniquement le montage ?',
                reponse: "Tout à fait. Nous pouvons intervenir uniquement en post-production si vous avez déjà vos rushes. Envoyez-nous vos fichiers et nous nous occupons du reste."
              },
              {
                question: 'Quel budget prévoir ?',
                reponse: "Les projets démarrent à partir de 800\u20AC pour un contenu social media court. Pour un clip musical ou une captation événementielle complète, comptez entre 2\u202F000\u20AC et 8\u202F000\u20AC selon le dispositif."
              },
              {
                question: 'Comment se déroule le premier brief ?',
                reponse: "On commence par un appel de 30 minutes pour comprendre votre projet, vos objectifs et vos contraintes. On vous envoie ensuite une proposition détaillée sous 48h."
              },
            ].map((item, i) => (
              <details key={i} className="group py-6 cursor-pointer list-none">
                <summary className="flex items-center justify-between gap-4 text-base font-bold text-black hover:opacity-60 transition-opacity list-none">
                  {item.question}
                  <span className="text-xl font-light text-gray-400 group-open:rotate-45 transition-transform duration-300 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-gray-500 leading-relaxed text-sm max-w-2xl">
                  {item.reponse}
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section
        data-service-section="cta-final"
        className="reveal bg-background-alt py-32 px-6 lg:px-12"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-center text-center">
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] text-[#1A1A1A]">
            Prêt à tourner votre prochaine vidéo ?
          </h2>
          <p className="mt-4 max-w-3xl text-balance text-[clamp(1rem,2.5vw,1.5rem)] leading-relaxed text-text-muted">
            Nous mettons notre énergie créative et notre expertise technique au service de
            vos ambitions. Captation, montage, post-production : chaque étape est pensée
            pour sublimer votre image.
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
              <Video className="h-5 w-5 sm:h-6 sm:w-6" />
              Voir nos réalisations
            </ButtonGND>
          </div>
        </div>
      </section>
    </main>
  );
}
