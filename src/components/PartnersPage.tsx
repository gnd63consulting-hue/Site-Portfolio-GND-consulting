import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Camera, Users, Quote, ExternalLink, Star, Award, Zap, Shield, Play, ArrowRight, ArrowLeft, Eye, Sparkles, Target, Clock, ChevronDown, ChevronUp, MessageCircle, CheckCircle, Video } from 'lucide-react';
import { Header } from './Header';
import { HeroPartners } from './HeroPartners';
import { Footer } from './Footer';
import { Contact } from './Contact';

export function PartnersPage() {
  // Redirection automatique vers la page d'accueil
  React.useEffect(() => {
    window.location.href = '/';
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCaption, setSelectedCaption] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'photo'>('all');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Portfolio complet avec vidéos et photos
  const portfolioItems = [
    // Vidéos
    {
      id: 'esther-seems-bobine',
      title: 'Esther Seems – Bobine',
      description: 'Esther Seems - Bobine',
      type: 'video' as const,
      mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Esther%20Seems%20-%20Bobine.mp4',
      tag: 'Vidéo HD'
    },
    {
      id: 'leyel-miel',
      title: 'LEYEL – MIEL',
      description: 'Clip musical artistique – Réalisation créative',
      type: 'video' as const,
      mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Miel%20test%20website.mp4',
      tag: 'Vidéo 4K'
    },
    {
      id: 'trinity-rebel-univers-officiel',
      title: 'TRINITY REBEL FT DAFXCX – L\'Univers Officiel',
      description: 'TRINITY REBEL FT DAFXCX – L\'Univers Officiel',
      type: 'video' as const,
      mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/trinity_rebel_univers_officiel.mp4',
      tag: 'Motion Design'
    },
    // Photos Nocéum
    {
      id: 'noceum-1',
      title: 'Moments intimes capturés',
      description: 'Moments intimes capturés avec sincérité',
      type: 'photo' as const,
      thumbnail: '/PHOTO-2025-07-13-18-18-00.jpg',
      tag: 'Photo Nocéum'
    },
    {
      id: 'noceum-2',
      title: 'L\'émotion au cœur',
      description: 'L\'émotion au cœur de chaque image',
      type: 'photo' as const,
      thumbnail: '/PHOTO-2025-07-13-18-18-01.jpg',
      tag: 'Photo Nocéum'
    },
    {
      id: 'noceum-3',
      title: 'Souvenirs éternels',
      description: 'Des souvenirs pour l\'éternité',
      type: 'photo' as const,
      thumbnail: '/PHOTO-2025-07-13-18-18-02.jpg',
      tag: 'Photo Nocéum'
    },
    {
      id: 'noceum-4',
      title: 'Chaque détail compte',
      description: 'Chaque détail raconte une histoire',
      type: 'photo' as const,
      thumbnail: '/PHOTO-2025-07-13-18-18-01 2.jpg',
      tag: 'Photo Nocéum'
    },
    {
      id: 'noceum-5',
      title: 'L\'art de transmettre',
      description: 'L\'art de transmettre l\'amour',
      type: 'photo' as const,
      thumbnail: '/PHOTO-2025-07-13-18-18-00 2.jpg',
      tag: 'Photo Nocéum'
    }
  ];

  // Filtrer les médias selon le filtre actif
  const filteredMedia = portfolioItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  // Auto-play du carrousel (désactivé si vidéo en cours)
  useEffect(() => {
    const hasVideos = filteredMedia.some(media => media.type === 'video');
    const shouldAutoplay = !hasVideos && !isVideoPlaying && autoplayEnabled;
    
    if (filteredMedia.length > 1 && shouldAutoplay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % filteredMedia.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [filteredMedia.length, isVideoPlaying, autoplayEnabled]);

  // Reset slide when filter changes
  useEffect(() => {
    setCurrentSlide(0);
    setIsVideoPlaying(false);
    setAutoplayEnabled(true);
  }, [activeFilter]);

  // Ensure currentSlide is always valid
  useEffect(() => {
    if (filteredMedia.length > 0 && currentSlide >= filteredMedia.length) {
      setCurrentSlide(0);
    }
  }, [filteredMedia.length, currentSlide]);

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % filteredMedia.length;
    setCurrentSlide(newIndex);
    
    const newMedia = filteredMedia[newIndex];
    if (newMedia && newMedia.type === 'video' && videoRef.current && newMedia.mediaUrl) {
      videoRef.current.src = newMedia.mediaUrl;
      videoRef.current.load();
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {
        setIsVideoPlaying(false);
      });
    } else {
      setIsVideoPlaying(false);
    }
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + filteredMedia.length) % filteredMedia.length;
    setCurrentSlide(newIndex);
    
    const newMedia = filteredMedia[newIndex];
    if (newMedia && newMedia.type === 'video' && videoRef.current && newMedia.mediaUrl) {
      videoRef.current.src = newMedia.mediaUrl;
      videoRef.current.load();
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {
        setIsVideoPlaying(false);
      });
    } else {
      setIsVideoPlaying(false);
    }
  };

  const openImageModal = (image: string, caption: string) => {
    setSelectedImage(image);
    setSelectedCaption(caption);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedCaption('');
  };

  const scrollToContact = () => {
    // Aller vers le footer au lieu du formulaire local
    const contactSection = document.querySelector('footer');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMediaClick = (media: any) => {
    if (media.type === 'photo') {
      openImageModal(media.thumbnail, media.description);
    } else if (media.type === 'video') {
      if (videoRef.current) {
        const currentSrc = videoRef.current.src;
        const newSrc = media.mediaUrl;
        if (currentSrc !== newSrc && newSrc) {
          videoRef.current.src = newSrc;
          videoRef.current.load();
        }
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    setAutoplayEnabled(false);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    setAutoplayEnabled(true);
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setAutoplayEnabled(true);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
    
    const selectedMedia = filteredMedia[index];
    if (selectedMedia && selectedMedia.type === 'video' && videoRef.current && selectedMedia.mediaUrl) {
      videoRef.current.src = selectedMedia.mediaUrl;
      videoRef.current.load();
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {
        setIsVideoPlaying(false);
      });
    } else {
      setIsVideoPlaying(false);
    }
  };

  const faqItems = [
    {
      question: "Peut-on personnaliser entièrement un film de mariage ?",
      answer: "Absolument ! Chez Nocéum, chaque film est unique et entièrement personnalisé. Nous prenons le temps de comprendre votre histoire, vos goûts et vos attentes pour créer une œuvre qui vous ressemble parfaitement."
    },
    {
      question: "Combien de temps dure la production d'un film de mariage ?",
      answer: "La production complète prend généralement entre 6 à 12 semaines après votre mariage. Ce délai nous permet de créer un montage soigné, avec une attention particulière portée à chaque détail de votre histoire."
    },
    {
      question: "Est-il possible d'intégrer des interviews de proches ?",
      answer: "C'est même notre spécialité ! Les interviews intimes avec vos proches (famille, amis) sont au cœur de notre approche. Elles apportent une dimension émotionnelle unique à votre film et créent un véritable héritage familial."
    },
    {
      question: "Quels sont les formats de livraison proposés ?",
      answer: "Nous livrons votre film en plusieurs formats : version longue cinématographique, version courte pour les réseaux sociaux, et extraits personnalisés. Tous les formats sont optimisés pour une qualité maximale sur tous vos supports."
    },
    {
      question: "Nocéum intervient-il en dehors de la région ?",
      answer: "Oui, Nocéum se déplace partout en France et à l'international pour vos événements exceptionnels. Les frais de déplacement sont intégrés dans le devis selon la destination."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-slate-900 relative overflow-hidden">
      {/* Header global */}
      <Header />
      
      {/* Hero immersif avec storytelling */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Vidéo d'arrière-plan */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Video%20page%20Partenaires%20Gnd.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
          
          {/* Overlay pour améliorer la lisibilité du texte */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Vidéo d'arrière-plan */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Video%20page%20Partenaires%20Gnd.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
          
          {/* Overlay pour améliorer la lisibilité du texte */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Contenu hero */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pt-16">
          <div className="text-center px-6 max-w-6xl">
            {/* Badge d'introduction */}
            <div className="inline-flex items-center gap-3 mb-8 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-slate-200/50">
              <Users className="w-6 h-6 text-primary" />
              <span className="text-slate-800 font-bold text-lg uppercase tracking-wide">Écosystème Créatif</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
              PARTENARIATS&nbsp;D'EXCELLENCE
            </h1>
            
            <p className="text-xl md:text-3xl text-white/90 font-light mb-12 leading-relaxed max-w-5xl mx-auto">
              Des collaborations privilégiées avec les meilleurs talents créatifs pour vous offrir une expertise complète et diversifiée
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => {
                  const nocuemSection = document.getElementById('noceum-section');
                  if (nocuemSection) {
                    nocuemSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-3 px-12 py-6 bg-rose-500 text-white font-bold text-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <Heart className="w-6 h-6" />
                Découvrir Nocéum
              </button>
              
              <button 
                onClick={() => {
                  const portfolioSection = document.getElementById('portfolio-section');
                  if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-3 px-12 py-6 border-2 border-white/80 text-white font-bold text-xl rounded-2xl transition-all duration-500 hover:bg-white/20 hover:border-white hover:scale-105 backdrop-blur-sm"
              >
                <Eye className="w-6 h-6" />
                Voir nos réalisations
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Éléments décoratifs de fond */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-rose-200/40 to-pink-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-blue-300/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 pt-32 pb-16 px-6 max-w-7xl mx-auto">
        
        {/* Section Présentation - Partenariats d'Excellence */}
        <section className="py-24 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200/50 shadow-lg">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Collaborations • Excellence • Innovation</span>
            </div>
            
            <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-8">
              L'Art de la Collaboration Créative
            </h2>
            
            <p className="section-description text-xl text-slate-700 max-w-5xl mx-auto leading-relaxed">
              Chez GND Consulting, nous croyons que les plus belles créations naissent de la rencontre entre talents complémentaires. 
              Notre écosystème de partenaires d'exception nous permet de vous offrir une expertise complète, 
              alliant vision artistique, excellence technique et innovation permanente.
            </p>
          </div>
          
          {/* Carte Partenariats d'Excellence */}
          <div className="flex justify-center mb-20">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-white/50 relative overflow-hidden max-w-5xl hover:scale-[1.02] hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-blue-300/20 rounded-full translate-y-16 -translate-x-16"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl flex items-center justify-center mb-10 shadow-xl mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Users className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 group-hover:text-rose-600 transition-colors duration-300">
                  Un Réseau d'Excellence à Votre Service
                </h3>
                
                <p className="text-slate-700 leading-relaxed mb-10 text-lg max-w-3xl mx-auto">
                  Chaque partenaire de notre écosystème a été sélectionné pour son expertise unique et sa capacité à sublimer vos projets. 
                  Ensemble, nous formons une équipe créative complète, capable de répondre à tous vos besoins avec excellence et passion.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Vision Partagée</h4>
                    <p className="text-slate-600 text-sm">Excellence créative et satisfaction client au cœur de chaque collaboration</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Qualité Garantie</h4>
                    <p className="text-slate-600 text-sm">Standards élevés et processus rigoureux pour des résultats exceptionnels</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">Innovation Continue</h4>
                    <p className="text-slate-600 text-sm">Veille technologique et créative pour rester à la pointe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Nocéum - Storytelling renforcé */}
        <section id="noceum-section" className="py-24 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8 bg-rose-50 rounded-full px-6 py-3 border border-rose-200/50 shadow-lg">
              <Heart className="w-5 h-5 text-rose-500" />
              <span className="text-rose-700 font-semibold">Partenaire Premium • Films de Mariage</span>
            </div>
            
            <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-8">
              NOCÉUM
            </h2>
            
            <p className="text-2xl md:text-3xl font-semibold text-rose-600 mb-12 leading-relaxed">
              Films de Mariage Cinématographiques
            </p>
          </div>
          
          {/* Storytelling Nocéum - Texte original préservé */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-rose-200/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-blue-300/20 rounded-full translate-x-24 translate-y-24"></div>
              
              <div className="relative z-10">
                {/* Citation mise en avant */}
                <div className="text-center mb-12">
                  <Quote className="w-16 h-16 text-rose-400/50 mx-auto mb-6" />
                  <blockquote className="text-3xl md:text-4xl font-light italic text-slate-800 leading-relaxed">
                    "Ce que vous vivez aujourd'hui mérite d'être transmis demain."
                  </blockquote>
                </div>
                
                {/* Texte principal - Préservé intégralement */}
                <div className="prose prose-xl max-w-none text-slate-700 leading-relaxed">
                  <p className="text-lg md:text-xl font-light leading-relaxed mb-8">
                    Nocéum transforme vos moments les plus précieux en œuvres cinématographiques intemporelles. 
                    À travers des interviews intimes et une narration soignée, nous créons l'héritage visuel de votre amour. 
                    Chaque film devient un témoignage authentique, une capsule temporelle qui traverse les générations.
                  </p>
                  
                  <p className="text-lg md:text-xl font-light leading-relaxed">
                    Notre approche unique mêle technique cinématographique et sensibilité humaine pour capturer 
                    non seulement les images, mais l'essence même de votre histoire d'amour. 
                    Chaque couple est unique, chaque film le devient aussi.
                  </p>
                </div>
                
                {/* CTA vers Nocéum */}
                <div className="text-center mt-12">
                  <a 
                    href="https://noceum.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-rose-500 text-white font-bold text-lg rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Découvrir Nocéum.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* L'expertise Nocéum - 4 piliers */}
        <section className="py-24 relative">
          <div className="text-center mb-20">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
              L'Expertise Nocéum
            </h3>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Quatre piliers fondamentaux qui font l'excellence de nos films de mariage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Films cinématographiques",
                description: "Réalisation artistique et technique d'exception avec une approche cinématographique professionnelle",
                icon: "🎬",
                color: "from-rose-500 to-pink-500"
              },
              {
                title: "Interviews intimes",
                description: "Captation authentique des émotions et témoignages de vos proches pour enrichir votre récit",
                icon: "💝",
                color: "from-blue-500 to-blue-500"
              },
              {
                title: "Narration personnalisée",
                description: "Storytelling unique adapté à chaque couple, racontant votre histoire avec sensibilité",
                icon: "📖",
                color: "from-blue-500 to-blue-500"
              },
              {
                title: "Héritage familial",
                description: "Création d'un patrimoine visuel transmissible aux générations futures",
                icon: "👨‍👩‍👧‍👦",
                color: "from-blue-500 to-blue-500"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 hover:border-rose-400/50 transition-all duration-500 hover:scale-105 group text-center shadow-lg hover:shadow-xl">
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <span className="text-white text-3xl">
                    {feature.icon}
                  </span>
                </div>
                
                <h4 className="text-lg font-semibold text-slate-900 mb-4 group-hover:text-rose-600 transition-colors duration-300">
                  {feature.title}
                </h4>
                
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Section - Identique à la page d'accueil */}
        <section id="portfolio-section" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-8 break-words">
                Portfolio Créatif
              </h2>
              <p className="section-description text-xl text-slate-700 max-w-4xl mx-auto break-words">
                Découvrez nos réalisations et celles de nos partenaires d'exception
              </p>
            </div>

            {/* Menu segmenté (pills) */}
            <div className="flex justify-center items-center mb-8 sm:mb-10 md:mb-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-1.5 sm:p-2 inline-flex flex-wrap justify-center gap-2 shadow-lg border border-slate-200/50">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 min-w-[100px] text-sm sm:text-base ${
                    activeFilter === 'all'
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span className="whitespace-nowrap">Tous</span>
                </button>
                <button
                  onClick={() => setActiveFilter('video')}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 min-w-[100px] text-sm sm:text-base ${
                    activeFilter === 'video'
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="whitespace-nowrap">Vidéos</span>
                </button>
                <button
                  onClick={() => setActiveFilter('photo')}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 min-w-[100px] text-sm sm:text-base ${
                    activeFilter === 'photo'
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="whitespace-nowrap">Photos</span>
                </button>
              </div>
            </div>

            {/* Visionneuse moderne - Identique à la page d'accueil */}
            {filteredMedia.length > 0 && filteredMedia[currentSlide] && (
              <div className="mb-12 sm:mb-16 md:mb-20">
                <div className="relative w-full">
                  {/* Visionneuse principale */}
                  <div className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-primary/20 group cursor-pointer bg-black">
                  {filteredMedia[currentSlide]?.type === 'video' ? (
                    <div className="relative w-full h-full bg-black">
                      {/* Overlay Play button pour vidéos - visible seulement si pas en lecture */}
                      {!isVideoPlaying && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                          onClick={() => handleMediaClick(filteredMedia[currentSlide])}
                        >
                          <div className="w-20 h-20 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:bg-black/70 hover:shadow-2xl">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      )}
                      
                      <video
                        ref={videoRef}
                        className="w-full h-full object-contain bg-black"
                        controls
                        playsInline
                        preload="metadata"
                        src={filteredMedia[currentSlide]?.mediaUrl}
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                        onEnded={handleVideoEnded}
                      >
                        {filteredMedia[currentSlide]?.mediaUrl && (
                          <source src={filteredMedia[currentSlide].mediaUrl} type="video/mp4" />
                        )}
                        Votre navigateur ne supporte pas la lecture vidéo.
                      </video>
                    </div>
                  ) : (
                    <img
                      src={filteredMedia[currentSlide]?.thumbnail}
                      alt={`${filteredMedia[currentSlide]?.title} - ${filteredMedia[currentSlide]?.description} - Portfolio partenaire GND Consulting`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (filteredMedia[currentSlide]) {
                          handleMediaClick(filteredMedia[currentSlide]);
                        }
                      }}
                    />
                  )}
                  
                  {/* Badge type */}
                  <div className="absolute top-3 sm:top-6 left-3 sm:left-6 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-3 shadow-lg border border-primary/20">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {filteredMedia[currentSlide]?.type === 'video' ? (
                        <Video className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary" />
                      ) : (
                        <Camera className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary" />
                      )}
                      <span className="text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wide whitespace-nowrap break-words">
                        {filteredMedia[currentSlide]?.tag || (filteredMedia[currentSlide]?.type === 'video' ? 'Vidéo GND' : 'Photo GND')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Overlay pour agrandir (photos seulement) */}
                  {filteredMedia[currentSlide]?.type === 'photo' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20">
                      <div 
                        className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (filteredMedia[currentSlide]) {
                            handleMediaClick(filteredMedia[currentSlide]);
                          }
                        }}
                      >
                        <Eye className="w-8 h-8 text-slate-900" />
                      </div>
                    </div>
                  )}
                  
                  {/* Contrôles de navigation */}
                  {filteredMedia.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevSlide();
                        }}
                        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 hover:bg-white z-20"
                        aria-label="Média précédent"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-slate-900" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextSlide();
                        }}
                        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 hover:bg-white z-20"
                        aria-label="Média suivant"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-slate-900" />
                      </button>
                    </>
                  )}
                </div>

                {/* Informations du média */}
                <div className="mt-6 sm:mt-8 text-center px-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 break-words">
                    {filteredMedia[currentSlide]?.title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto break-words">
                    {filteredMedia[currentSlide]?.description}
                  </p>
                </div>

                {/* Miniatures de navigation */}
                {filteredMedia.length > 1 && (
                  <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-10 md:mt-12 overflow-x-auto pb-4 px-2">
                    {filteredMedia.map((media, index) => (
                      <button
                        key={media.id}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          index === currentSlide
                            ? 'border-primary shadow-lg scale-110'
                            : 'border-slate-200 hover:border-primary/50 hover:scale-105'
                        }`}
                        aria-label={`Sélectionner ${media.title}`}
                      >
                        {media.type === 'video' ? (
                          <div className="w-full h-full bg-black flex items-center justify-center">
                            <Play className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </div>
                        ) : (
                          <img
                            src={media.thumbnail}
                            alt={`Miniature - ${media.title} - Projet partenaire GND`}
                            className="w-full h-full object-cover"
                          />
                        )}

                        {/* Indicateur de type */}
                        <div className="absolute top-1 right-1 w-3 h-3 sm:w-4 sm:h-4 bg-white/90 rounded-full flex items-center justify-center">
                          {media.type === 'video' ? (
                            <Video className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-primary" />
                          ) : (
                            <Camera className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-primary" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200/50 shadow-lg">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Questions • Réponses • Transparence</span>
            </div>
            
            <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-8">
              Questions Fréquentes
            </h2>
            
            <p className="section-description text-xl text-slate-700 max-w-4xl mx-auto">
              Tout ce que vous devez savoir sur nos services et nos partenariats
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-6">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 hover:border-primary/30 transition-all duration-300 text-left group shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 pr-4">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUp className="w-6 h-6 text-primary" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-slate-500 group-hover:text-primary transition-colors duration-300" />
                      )}
                    </div>
                  </div>
                  
                  {openFAQ === index && (
                    <div className="mt-6 pt-6 border-t border-slate-200/50">
                      <p className="text-slate-700 leading-relaxed text-lg">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 relative">
          <div className="text-center">
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-16 border border-primary/20 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-blue-300/20 rounded-full translate-y-16 -translate-x-16"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-8">
                  Prêt à Créer Ensemble ?
                </h2>
                
                <p className="text-xl text-slate-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Découvrez comment notre écosystème de partenaires d'exception peut transformer vos projets en réalisations extraordinaires.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-3 px-12 py-6 bg-primary text-white font-bold text-xl rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl shadow-blue-600/30"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Discutons de votre projet
                  </button>
                  
                  <a 
                    href="https://noceum.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-12 py-6 border-2 border-rose-500 text-rose-600 font-bold text-xl rounded-2xl transition-all duration-500 hover:bg-rose-500 hover:text-white hover:scale-105"
                  >
                    <Heart className="w-6 h-6" />
                    Découvrir Nocéum
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal pour les images */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={closeImageModal}>
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img
              src={selectedImage}
              alt={`Photo agrandie - ${selectedCaption} - Portfolio partenaire GND Consulting`}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {selectedCaption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white p-6 rounded-b-2xl">
                <p className="text-lg font-medium text-center">{selectedCaption}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer global */}
      <Footer />
    </div>
  );
}