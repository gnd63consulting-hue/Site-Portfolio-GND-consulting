import React, { useState, useRef, useEffect } from 'react';
import { VideoFirstFrame } from './VideoFirstFrame';
import { Play, Pause, Camera, Video, X, ChevronLeft, ChevronRight, Eye, ChevronUp, ChevronDown, Rewind, FastForward } from 'lucide-react';
import { useProjects } from '../hooks/useSupabase';
import clsx from 'clsx';
import { updateMetaTags } from '../utils/seo';

// Fonction utilitaire pour valider et nettoyer les URLs de vidéos
const getValidVideoUrl = (url: string | undefined): string => {
  if (!url) return '';
  
  try {
    // Vérifier que l'URL est valide
    new URL(url);
    return url;
  } catch (error) {
    console.error('❌ URL vidéo invalide:', url, error);
    return '';
  }
};



// FIXED by audit - Fonction de validation des états React
const validateReactStates = (states: {
  isVideoPlaying: boolean;
  currentTime: number;
  duration: number;
  videoError: boolean;
  isVideoLoading: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
}) => {
  const { isVideoPlaying, currentTime, duration, videoError, isVideoLoading, videoRef } = states;
  
  // Vérifications de cohérence
  if (isVideoPlaying && videoRef.current?.paused) {
    console.warn('⚠️ Incohérence détectée: isVideoPlaying=true mais vidéo en pause');
  }
  
  if (!isVideoPlaying && videoRef.current && !videoRef.current.paused) {
    console.warn('⚠️ Incohérence détectée: isVideoPlaying=false mais vidéo en lecture');
  }
  
  if (currentTime > duration && duration > 0) {
    console.warn('⚠️ Incohérence détectée: currentTime > duration');
  }
  
  if (videoError && isVideoLoading) {
    console.warn('⚠️ Incohérence détectée: videoError=true et isVideoLoading=true');
  }
  
  return {
    isValid: !videoError && (duration === 0 || currentTime <= duration),
    warnings: []
  };
};




interface ProjectCard {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'photo';
  thumbnail: string;
  mediaUrl?: string;
  youtubeUrl?: string;
  supabaseFileName?: string;
  posterUrl?: string;
  tag: string;
}

interface MediaItem {
  id: string;
  title: string;
  type: 'video' | 'photo';
  thumbnail: string;
  caption: string;
  supabaseFileName?: string;
  mediaUrl?: string;
  youtubeUrl?: string;
  posterUrl?: string;
}

export function Portfolio() {
  const { loading } = useProjects();
  const [activeTab, setActiveTab] = useState<'video' | 'photo'>('video');
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState('corporate');
  const [wheelRotation, setWheelRotation] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCaption, setSelectedCaption] = useState<string>('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [photoFilter, setPhotoFilter] = useState<'TOUS' | 'CRÉATIONS' | 'AMBIANCES' | 'PORTRAITS'>('TOUS');
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(true);
  const [youtubeCurrentTime, setYoutubeCurrentTime] = useState(0);
  const [youtubeDuration, setYoutubeDuration] = useState(0);
  const [youtubeReady, setYoutubeReady] = useState(false);
  const [youtubeUiCurrentTime, setYoutubeUiCurrentTime] = useState(0);
  const youtubeRafRef = useRef<number | null>(null);
  const youtubeLastTickRef = useRef<number | null>(null);
  const youtubeCmdQueue = useRef<Array<{ cmd: string; args: (string | number | boolean)[] }>>([]);
  const ringRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const imageCache = useRef(new Set<string>());
  const preloadCache = useRef(new Map<string, HTMLVideoElement>());
  const retryCount = useRef(new Map<string, number>());
  const performanceMetrics = useRef({
    loadTimes: new Map<string, number>(),
    fileSizes: new Map<string, number>(),
    qualityLevels: new Map<string, string>()
  });
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseBtnRef = useRef<HTMLButtonElement>(null);

  // IDs des vidéos YouTube privées à masquer (fallback uniquement)
  const privateVideoIds: string[] = [];

  // IDs des vidéos à masquer complètement du rendu public
  const hiddenVideoIds: string[] = ['live-leyel-papa', 'live-eleonore-surprising', 'lanecdote'];

  // Collections de photos organisées par shooting avec catégories
  const photoCollections = {
    corporate: {
      name: "Corporate Premium",
      description: "Portraits professionnels et reportages d'entreprise avec une approche moderne et créative",
      category: "CRÉATIONS",
      photos: [
        {
          id: 'corporate-1',
          title: 'MASQUE & IDENTITÉ',
          thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4251.jpg',
          caption: '« Un portrait saisissant qui capture l\'univers du Criminal Designer. L\'anonymat devient une force, transformant le masque en symbole d\'expression et de créativité libre. »\n\n📸 Crédit photo : Jonathan R.',
          category: 'CRÉATIONS'
        },
        {
          id: 'corporate-2',
          title: 'L\'ART EN MOUVEMENT',
          thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4135.jpg',
          caption: '« Dans l\'atelier, chaque geste devient performance. Le Criminal Designer exprime son identité à travers la matière brute, fusionnant énergie urbaine et vision artistique. »\n\n📸 Crédit photo : Jonathan R.',
          category: 'CRÉATIONS'
        },
        {
          id: 'corporate-3',
          title: 'PUISSANCE CRÉATIVE',
          thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4149.jpg',
          caption: '« Une mise en scène où se rencontrent charisme et rébellion. Le Criminal Designer impose une esthétique singulière, entre force, style et liberté totale. »\n\n📸 Crédit photo : Jonathan R.',
          category: 'CRÉATIONS'
        },
        {
          id: 'corporate-4',
          title: 'VISION MASQUÉE',
          thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4267.jpg',
          caption: '« Gros plan iconique sur le masque, emblème du Criminal Designer. L\'anonymat n\'efface pas l\'identité, il révèle une puissance créative tournée vers l\'avenir. »\n\n📸 Crédit photo : Jonathan R.',
          category: 'CRÉATIONS'
        }
      ]
    },
    branding: {
      name: "Branding Visuel",
      description: "Création d'univers visuels pour marques avec direction artistique complète et identité forte",
      category: "PORTRAITS",
      photos: [
        {
          id: 'branding-1',
          title: 'Énergie Collective',
          thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4028.jpg',
          caption: '« Intensité des regards et force du groupe, un cliché qui exprime la puissance d\'une énergie humaine et créative. »\n\n📸 Crédit photo : Jonathan R.',
          category: 'PORTRAITS'
        },
        {
          id: 'branding-2',
          title: 'ATTITUDE & CONFIANCE',
          thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A3992.jpg',
          caption: '« Une présence naturelle captée en studio, entre assurance et style. Simplicité et charisme au cœur du portrait. »\n\n📸 Crédit photo : Jonathan R.',
          category: 'PORTRAITS'
        },
        {
          id: 'branding-3',
          title: 'VISION URBAINE',
          thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4002.JPG',
          caption: '« Jeu de postures et minimalisme graphique, souligné par des contrastes forts pour une esthétique moderne. »\n\n📸 Crédit photo : Jonathan R.',
          category: 'PORTRAITS'
        }
      ]
    },
    evenementiel: {
      name: "Événementiel",
      description: "Captation d'événements corporate et privés avec approche journalistique et créative",
      category: "AMBIANCES",
      photos: [
        {
          id: 'event-1',
          title: 'SAVEURS',
          thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A1817.JPG',
          caption: '« Mise en lumière des détails culinaires et décoratifs qui font l\'essence d\'un événement.\nChaque geste, chaque plat raconte une histoire visuelle unique. »\n\n📸 Crédit photo : Jonathan R.',
          category: 'AMBIANCES'
        },
        {
          id: 'event-2',
          title: 'INSTANTS',
          thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A1873%20-%20copie%202_1.jpg',
          caption: '« Immersion dans l\'atmosphère et l\'énergie d\'un événement.\nLes détails du décor et des ambiances renforcent l\'expérience collective. »\n\n📸 Crédit photo : Jonathan R.',
          category: 'AMBIANCES'
        },
        {
          id: 'event-3',
          title: 'PARTAGES',
          thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A2054.JPG',
          caption: '« Focus sur les échanges et connexions entre participants.\nChaque interaction devient une scène vivante et authentique de l\'événement. »\n\n📸 Crédit photo : Jonathan R.',
          category: 'AMBIANCES'
        }
      ]
    }
  };

  // Données de démonstration avec projets réels et fictifs
  const portfolioCards: ProjectCard[] = [
    // Projets vidéo
    {
      id: 'esther-seems-bobine',
      title: 'ESTHER SEEMS – BOBINE',
      description: '« Clip musical de l\'artiste Esther Seems, porté par une esthétique hip-hop/R&B sobre et émotive.\n\nCe projet rend hommage à son meilleur ami tragiquement disparu, transformant la douleur en une œuvre à la fois intime et universelle.\n\nRéalisé en collaboration avec AMS Visions, ce clip illustre la capacité de la création audiovisuelle à mêler émotion brute et expression artistique. »\n\n🎬 Réalisation : Jonathan Ransau',
      type: 'video',
      youtubeUrl: 'https://www.youtube.com/watch?v=6oaO6YoWjyQ',
      thumbnail: 'https://img.youtube.com/vi/6oaO6YoWjyQ/hqdefault.jpg',
      tag: 'YouTube'
    },
    {
      id: 'leyel-miel',
      title: 'LEYEL – MIEL',
      description: '« Clip officiel de l\'artiste Leyel, une mise en scène délicate qui raconte la rencontre de deux âmes destinées à s\'unir.\n\nEntre sonorités douces, guitare et ambiance intimiste, ce projet illustre la force de la variété française à travers une réalisation visuelle soignée.\n\nConçu dans le cadre d\'une collaboration avec O2M, ce clip marque une étape importante dans un savoir-faire qui se poursuit et s\'affirme aujourd\'hui au sein de GND Consulting. »\n\n🎬 Réalisation : Jonathan Ransau',
      type: 'video',
      youtubeUrl: 'https://www.youtube.com/watch?v=UbXQim7iNLI',
      thumbnail: 'https://img.youtube.com/vi/UbXQim7iNLI/hqdefault.jpg',
      tag: 'YouTube'
    },
    {
      id: 'trinity-rebel-univers-officiel',
      title: 'TRINITY REBEL FT DAFXCX – L\'UNIVERS OFFICIEL',
      description: '« Clip musical officiel de Trinity Rebel ft Dafxcx, aux sonorités chaleureuses et festives, inspirées des rythmes urbains et caribéens.\n\nUne réalisation qui capte l\'énergie décontractée et positive de l\'artiste, entre univers coloré et ambiance conviviale. »\n\n🎬 Réalisation : Julien Ancieaux',
      type: 'video',
      mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/trinity_rebel_univers_officiel.mp4',
      thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
      tag: 'Motion Design'
    },
    {
      id: 'sabay-festival-2023',
      title: 'SABAY FESTIVAL 2023',
      description: '« Captation et réalisation de l\'aftermovie officiel du Sabay Festival 2023, un rendez-vous annuel devenu incontournable à la Grande Pagode de Vincennes.\n\nCette édition a célébré la richesse des traditions cambodgiennes à travers des rituels, des spectacles vivants et des animations culturelles accessibles à tous.\n\nNotre équipe a mis en lumière l\'énergie collective, l\'esprit solidaire et les instants mémorables qui font du Sabay Festival un moment unique de transmission et de convivialité. »\n\n📹 Production audiovisuelle – GND Consulting',
      type: 'video' as const,
      youtubeUrl: 'https://www.youtube.com/watch?v=Vyhz7_D4fFU',
      thumbnail: 'https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg',
      tag: 'YouTube'
    },
    {
      id: 'concert-ali',
      title: 'CAPTATION LIVE CONCERT ALI 45 SCIENTIFIC',
      description: '« Captation live du concert d\'Ali, figure emblématique du rap français et cofondateur du collectif 45 Scientific aux côtés de Booba.\n\nCe live, enregistré au Café LaPêche à Montreuil, met en valeur la puissance scénique de l\'artiste dans un cadre urbain et authentique.\n\nRéalisé à l\'époque dans le cadre de la collaboration IAMTV / O2M, ce projet s\'inscrit aujourd\'hui dans la continuité de GND Consulting, qui poursuit et développe ce savoir-faire pour documenter et sublimer des moments uniques. »\n\n📹 Captation audiovisuelle – IAMTV / O2M / GND Consulting',
      type: 'video' as const,
      mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Concert%20Ali.mp4',
      thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
      tag: 'Supabase'
    },
    {
      id: 'sabay-festival-2022',
      title: 'SABAY FESTIVAL 2022',
      description: '« Captation et réalisation de l\'aftermovie officiel du Sabay Festival 2022, un rendez-vous annuel devenu incontournable à la Grande Pagode de Vincennes.\n\nCette édition a célébré la richesse des traditions cambodgiennes à travers des rituels, des spectacles vivants et des animations culturelles accessibles à tous.\n\nNotre équipe a mis en lumière l\'énergie collective, l\'esprit solidaire et les instants mémorables qui font du Sabay Festival un moment unique de transmission et de convivialité. »\n\n📹 Production audiovisuelle – GND Consulting',
      type: 'video' as const,
      mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Thiek%20au%20Sabay%20Festival%202022%20Haute%20def%204k%20v2.mp4',
      thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
      tag: 'Supabase'
    },
    {
      id: 'lanecdote',
      title: 'L\'ANECDOTE',
      description: '« Émission pensée pour retracer l\'histoire du hip-hop français, depuis ses origines jusqu\'à nos jours.\n\nÀ travers ce format, les codes, les anecdotes et les influences majeures de cette culture sont mis en lumière, avec l\'ambition de créer un pont entre mémoire et modernité.\n\nConçu dans le cadre de la collaboration IAMTV / O2M, ce projet témoigne du savoir-faire collectif que nous poursuivons aujourd\'hui au sein de GND Consulting. »\n\n✍️ Co-écriture : Roodny Pierre & Patrick Veiga Cardozo\n\n🎬 Réalisation : Roodny Pierre & Patrick Veiga Cardozo',
      type: 'video',
      youtubeUrl: 'https://www.youtube.com/watch?v=AGC_2cFHE_0',
      thumbnail: 'https://img.youtube.com/vi/AGC_2cFHE_0/hqdefault.jpg',
      tag: 'YouTube'
    },
    {
      id: 'cook-soul-kaoutar',
      title: 'COOK & SOUL AVEC KAOUTAR DE PÉKIN EXPRESS, ÉDITION 14',
      description: '« Émission musicale produite initialement pour IAMTV, dans le cadre de la collaboration avec l\'équipe O2M.\n\nCe projet audiovisuel met en lumière l\'univers artistique de l\'invité, avec une captation authentique et soignée, fidèle à l\'esprit des créations de cette époque.\n\nAujourd\'hui, ce savoir-faire continue d\'être valorisé et développé au sein de GND Consulting, en prolongeant l\'héritage de ces réalisations collectives. »\n\n🎬 Réalisation : Gwen Templier',
      type: 'video',
      youtubeUrl: 'https://www.youtube.com/watch?v=galhl8_dYyk',
      thumbnail: 'https://img.youtube.com/vi/galhl8_dYyk/hqdefault.jpg',
      tag: 'YouTube'
    },
    {
      id: 'live-eleonore-surprising',
      title: 'LIVE ON STAGE ÉLÉONORE "SURPRISING" VERSION ACOUSTIQUE',
      description: '« Émission musicale conçue initialement pour IAMTV, dans le cadre d\'une collaboration avec l\'équipe O2M. Cette performance acoustique de Éléonore, captée en toute intimité, met en lumière une interprétation sensible et une présence scénique marquée.\n\nCette création a été réalisée par Jonathan Ransau et Julien Ancieaux, et s\'inscrit dans le savoir-faire que nous poursuivons aujourd\'hui avec GND Consulting.\n\nL\'émission a ensuite été diffusée sur la chaîne BET, confirmant sa portée et son impact. »\n\n🎬 Réalisation : Jonathan Ransau & Julien Ancieaux',
      type: 'video',
      youtubeUrl: 'https://www.youtube.com/watch?v=-E4Uk-Z5qEc',
      thumbnail: 'https://img.youtube.com/vi/-E4Uk-Z5qEc/hqdefault.jpg',
      tag: 'YouTube'
    },
    {
      id: 'live-leyel-papa',
      title: 'LIVE ON STAGE LEYEL "PAPA" ACOUSTIQUE VERSION',
      description: '« Émission musicale conçue initialement pour IAMTV, dans le cadre d\'une collaboration avec l\'équipe O2M. Cette performance live acoustique de LEYEL, captée en toute intimité, met en valeur l\'émotion et la puissance de l\'interprétation.\n\nCette création a été réalisée par Jonathan Ransau et Julien Ancieaux, et s\'inscrit dans le savoir-faire que nous poursuivons aujourd\'hui avec GND Consulting.\n\nL\'émission a ensuite été diffusée sur la chaîne BET, confirmant son impact et sa portée. »\n\n🎬 Réalisation : Jonathan Ransau & Julien Ancieaux',
      type: 'video',
      youtubeUrl: 'https://www.youtube.com/watch?v=GksYCOSW3qc',
      thumbnail: 'https://img.youtube.com/vi/GksYCOSW3qc/hqdefault.jpg',
      tag: 'YouTube'
    },
    {
      id: 'portfolio-jyfviku',
      title: 'YUNGCALLY – CLIP OFFICIEL',
      description: '« Clip officiel de Yungcally, jeune artiste franco-américain à l\'univers situé entre hip-hop et sonorités urbaines modernes.\n\nAvec une énergie qui évoque la vibe de Wiz Khalifa et Post Malone, ce projet traduit un mélange de nonchalance assumée et de créativité visuelle affirmée.\n\nUn travail qui illustre l\'ouverture internationale et la diversité des projets portés par notre équipe. »\n\n🎬 Réalisation : Jonathan Ransau',
      type: 'video',
      mediaUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/jyfviku.mp4',
      thumbnail: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
      tag: 'Supabase'
    },
    // Projets photo
    {
      id: '4',
      title: 'PHOTOGRAPHIE PROFESSIONNELLE',
      description: 'Séance photo corporate avec mise en scène créative et éclairage professionnel',
      type: 'photo',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      tag: 'Photo HD'
    },
    {
      id: '5',
      title: 'PORTRAIT CORPORATE',
      description: 'Portraits professionnels en studio avec retouche haut de gamme',
      type: 'photo',
      thumbnail: 'https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=600',
      tag: 'Portrait Pro'
    },
    {
      id: '6',
      title: 'ÉVÉNEMENTIEL PREMIUM',
      description: 'Captation photo d\'événements corporate avec approche journalistique',
      type: 'photo',
      thumbnail: 'https://images.pexels.com/photos/2182972/pexels-photo-2182972.jpeg?auto=compress&cs=tinysrgb&w=600',
      tag: 'Événementiel'
    },
    {
      id: '7',
      title: 'BRANDING VISUEL',
      description: 'Création d\'univers visuel pour marque avec direction artistique complète',
      type: 'photo',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      tag: 'Branding'
    },
    {
      id: '8',
      title: 'PACKSHOT PRODUIT',
      description: 'Mise en valeur produits avec éclairage studio et post-production soignée',
      type: 'photo',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
      tag: 'E-commerce'
    }
  ];

  // Créer les médias pour la roue
  const normalizedVideoItems = React.useMemo(() => {
    const items = portfolioCards
      .filter(card => card.type === 'video' && !hiddenVideoIds.includes(card.id))
      .map(card => ({
        id: card.id,
        title: card.title,
        type: card.type,
        thumbnail: card.thumbnail,
        caption: card.description,
        mediaUrl: card.mediaUrl,
        youtubeUrl: card.youtubeUrl,
        posterUrl: card.posterUrl
      }));
    const seen = new Set<string>();
    return items.filter(item => {
      const key = item.youtubeUrl ? `yt:${item.youtubeUrl}` : (item.mediaUrl ? `mp4:${item.mediaUrl}` : `id:${item.id}`);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  // Normaliser les photos de la collection sélectionnée
  const normalizedPhotoItems = React.useMemo(() => {
    const collection = photoCollections[selectedCollection as keyof typeof photoCollections];
    return collection.photos.map(photo => ({
      id: photo.id,
      title: photo.title,
      type: 'photo' as const,
      thumbnail: photo.thumbnail,
      caption: photo.caption
    }));
  }, [selectedCollection]);

  // Filtrer les médias selon le filtre actif
  const filteredMedia = React.useMemo(() => {
    return activeTab === 'video' ? normalizedVideoItems : normalizedPhotoItems;
  }, [normalizedVideoItems, normalizedPhotoItems, activeTab]);

  // FIXED by audit - Reset selection when filter changes avec gestion d'erreur renforcée
  useEffect(() => {
    try {
      setSelectedMediaIndex(0);
      setIsVideoPlaying(false);
      setWheelRotation(0);
      setVideoError(false);
      setCurrentTime(0);
      setDuration(0);
      setIsVideoLoading(false);
      setLoadingTimeout(false);
      
      // Reset la vidéo si elle existe
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        // Nettoyer les compteurs de retry
        retryCount.current.clear();
      }
      
      console.log('🔄 Reset des états vidéo lors du changement de filtre');
    } catch (error) {
      console.error('❌ Erreur lors du reset des états:', error);
    }
  }, [activeTab, selectedCollection]);


  // FIXED by audit - Gestion de la visibilité des contrôles vidéo
  useEffect(() => {
    let hideControlsTimeout: NodeJS.Timeout;
    
    if (isVideoPlaying) {
      // Masquer les contrôles après 3 secondes de lecture
      hideControlsTimeout = setTimeout(() => {
        setShowVideoControls(false);
        console.log('🎮 Contrôles masqués pendant la lecture');
      }, 3000);
    } else {
      // Afficher les contrôles quand la vidéo est en pause
      setShowVideoControls(true);
      console.log('🎮 Contrôles affichés (vidéo en pause)');
    }
    
    return () => {
      if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout);
      }
    };
  }, [isVideoPlaying]);

  // FIXED by audit - Fonctions pour contrôler les vidéos YouTube
  const getYouTubePlayer = () => {
    return document.querySelector('iframe[src*="youtube.com/embed"]') as HTMLIFrameElement;
  };

  const sendYouTubeCommand = (command: string, ...args: (string | number | boolean)[]) => {
    const iframe = getYouTubePlayer();
    if (iframe && iframe.contentWindow) {
      if (!youtubeReady && command !== 'addEventListener') {
        youtubeCmdQueue.current.push({ cmd: command, args });
      } else {
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args }), '*');
        console.log(`🎬 Commande YouTube envoyée: ${command}`);
      }
    }
  };

  const seekYouTube = (seconds: number) => {
    // IFrame API expects [seconds, allowSeekAhead]
    sendYouTubeCommand('seekTo', seconds, true);
    setYoutubeCurrentTime(seconds);
    setYoutubeUiCurrentTime(seconds);
  };

  const primeYouTubePlayer = () => {
    try {
      sendYouTubeCommand('mute');
      sendYouTubeCommand('playVideo');
      setTimeout(() => {
        sendYouTubeCommand('pauseVideo');
        sendYouTubeCommand('seekTo', 0, true);
      }, 250);
    } catch {}
  };

  const getYouTubeDuration = () => {
    const iframe = getYouTubePlayer();
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'getDuration',
        args: ''
      }), '*');
    }
  };

  // Helper pour formater mm:ss
  const formatSeconds = (totalSeconds: number) => {
    const clamped = Math.max(0, Math.floor(totalSeconds || 0));
    const minutes = Math.floor(clamped / 60);
    const seconds = clamped % 60;
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  // FIXED by audit - Écouter les messages YouTube pour synchroniser les états
  useEffect(() => {
    const handleYouTubeMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com' && event.origin !== 'https://www.youtube-nocookie.com') return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        // onReady
        if (data?.event === 'onReady') {
          setYoutubeReady(true);
          // Draine la file de commandes en attente
          const iframe = getYouTubePlayer();
          while (youtubeCmdQueue.current.length && iframe && iframe.contentWindow) {
            const { cmd, args } = youtubeCmdQueue.current.shift()!;
            iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: cmd, args }), '*');
          }
          // Demander des infos initiales
          sendYouTubeCommand('getDuration');
          sendYouTubeCommand('getCurrentTime');
          return;
        }
        // onStateChange
        if (data?.event === 'onStateChange') {
          const state = data?.info;
          if (state === 1) setIsVideoPlaying(true); // playing
          if (state === 2) setIsVideoPlaying(false); // paused
        }
        // infoDelivery => currentTime/duration
        if (data?.event === 'infoDelivery' && data?.info) {
          if (typeof data.info.currentTime === 'number') setYoutubeCurrentTime(data.info.currentTime);
          if (typeof data.info.duration === 'number') setYoutubeDuration(data.info.duration);
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener('message', handleYouTubeMessage);
    return () => window.removeEventListener('message', handleYouTubeMessage);
  }, []);

  // FIXED by audit - Récupérer la durée YouTube quand la vidéo change
  useEffect(() => {
    const currentMedia = filteredMedia[selectedMediaIndex];
    if (currentMedia && currentMedia.type === 'video' && currentMedia.youtubeUrl) {
      // Réinitialiser les états YouTube
      setYoutubeCurrentTime(0);
      setYoutubeDuration(0);
      setYoutubeReady(false);
      // S'assurer que l'overlay play est affiché jusqu'à démarrage effectif
      setIsVideoPlaying(false);
      // Reset de l'état UI (timeline)
      setYoutubeUiCurrentTime(0);
      
      // Demander la durée après un délai pour laisser l'iframe se charger
      const timeoutId = setTimeout(() => {
        // S'abonner aux évènements IFrame API
        sendYouTubeCommand('addEventListener', 'onReady');
        sendYouTubeCommand('addEventListener', 'onStateChange');
        sendYouTubeCommand('addEventListener', 'infoDelivery');
        getYouTubeDuration();
        console.log('🎬 Demande de durée YouTube pour:', currentMedia.title);
      }, 250);
      
      return () => clearTimeout(timeoutId);
    }
  }, [selectedMediaIndex, filteredMedia]);

  // Synchroniser l'UI time avec les mises à jour réelles de YouTube
  useEffect(() => {
    setYoutubeUiCurrentTime(youtubeCurrentTime || 0);
  }, [youtubeCurrentTime]);

  // Lissage visuel de la timeline via requestAnimationFrame quand la vidéo joue
  useEffect(() => {
    const media = filteredMedia[selectedMediaIndex];
    const isYouTube = !!(media && media.type === 'video' && media.youtubeUrl);
    if (!isYouTube) return;

    if (isVideoPlaying && (youtubeDuration || 0) > 0) {
      youtubeLastTickRef.current = null;
      const tick = (now: number) => {
        const last = youtubeLastTickRef.current;
        youtubeLastTickRef.current = now;
        if (last != null) {
          const deltaSeconds = (now - last) / 1000;
          setYoutubeUiCurrentTime((prev) => Math.min(youtubeDuration || 0, prev + deltaSeconds));
        }
        youtubeRafRef.current = requestAnimationFrame(tick);
      };
      youtubeRafRef.current = requestAnimationFrame(tick);
      return () => {
        if (youtubeRafRef.current) cancelAnimationFrame(youtubeRafRef.current);
        youtubeRafRef.current = null;
        youtubeLastTickRef.current = null;
      };
    } else {
      if (youtubeRafRef.current) cancelAnimationFrame(youtubeRafRef.current);
      youtubeRafRef.current = null;
      youtubeLastTickRef.current = null;
    }
  }, [isVideoPlaying, youtubeDuration, selectedMediaIndex, filteredMedia]);

  // FIXED by audit - Polling de secours pour YouTube tant que la durée n'est pas connue
  useEffect(() => {
    const currentMedia = filteredMedia[selectedMediaIndex];
    if (!(currentMedia && currentMedia.type === 'video' && currentMedia.youtubeUrl)) return;
    let intervalId: number | undefined;
    intervalId = window.setInterval(() => {
      sendYouTubeCommand('getCurrentTime');
      sendYouTubeCommand('getDuration');
    }, 1000);
    return () => { if (intervalId) window.clearInterval(intervalId); };
  }, [selectedMediaIndex, filteredMedia]);

  // Reset selection when collection changes
  useEffect(() => {
    if (activeTab === 'photo') {
      setSelectedMediaIndex(0);
    }
  }, [activeTab]);

  // Preload all photo thumbnails for instant display
  useEffect(() => {
    const allPhotoUrls = Object.values(photoCollections)
      .flatMap(collection => collection.photos)
      .map(photo => photo.thumbnail);

    const preloadImages = () => {
      allPhotoUrls.forEach(url => {
        if (!imageCache.current.has(url)) {
          const img = new Image();
          img.src = url;
          img.onload = () => imageCache.current.add(url);
        }
      });
      setImagesPreloaded(true);
    };

    if (activeTab === 'photo' && !imagesPreloaded) {
      preloadImages();
    } else if (!imagesPreloaded) {
      const timer = setTimeout(preloadImages, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab, imagesPreloaded]);

  // Ensure selectedMediaIndex is always valid
  useEffect(() => {
    if (filteredMedia.length > 0 && selectedMediaIndex >= filteredMedia.length) {
      setSelectedMediaIndex(0);
    }
  }, [filteredMedia.length, selectedMediaIndex]);

  // Update SEO meta tags when selected media changes
  useEffect(() => {
    if (filteredMedia.length > 0 && filteredMedia[selectedMediaIndex]) {
      const currentMedia = filteredMedia[selectedMediaIndex];
      const baseUrl = window.location.origin;

      updateMetaTags({
        title: `${currentMedia.title} - Portfolio GND Consulting`,
        description: currentMedia.caption.split('\n\n')[0].replace(/[«»""]/g, '').trim(),
        image: currentMedia.thumbnail,
        url: `${baseUrl}/#portfolio`,
        type: 'article'
      });
    }
  }, [selectedMediaIndex, filteredMedia]);

  // Listen to YouTube IFrame API events for play/pause state
  useEffect(() => {
    const handleYouTubeMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange') {
          if (data.info === 1) {
            setIsVideoPlaying(true);
          } else if (data.info === 2 || data.info === 0) {
            setIsVideoPlaying(false);
          }
        }
      } catch (e) {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener('message', handleYouTubeMessage);
    return () => window.removeEventListener('message', handleYouTubeMessage);
  }, []);

  // FIXED by audit - Synchronisation automatique de l'état React avec l'état réel de la vidéo
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    
    const syncVideoState = () => {
      if (video.paused !== !isVideoPlaying) {
        console.log('🔄 Synchronisation état vidéo:', {
          reactState: isVideoPlaying,
          actualState: !video.paused,
          readyState: video.readyState
        });
        setIsVideoPlaying(!video.paused);
      }
    };

    // Synchroniser immédiatement
    syncVideoState();

    // Écouter les changements d'état
    video.addEventListener('play', () => {
      console.log('▶️ Événement play détecté');
      setIsVideoPlaying(true);
    });

    video.addEventListener('pause', () => {
      console.log('⏸️ Événement pause détecté');
      setIsVideoPlaying(false);
    });

    video.addEventListener('ended', () => {
      console.log('🏁 Événement ended détecté');
      setIsVideoPlaying(false);
    });

    // Synchroniser périodiquement pour éviter les désynchronisations
    const syncInterval = setInterval(syncVideoState, 1000);

    return () => {
      video.removeEventListener('play', () => setIsVideoPlaying(true));
      video.removeEventListener('pause', () => setIsVideoPlaying(false));
      video.removeEventListener('ended', () => setIsVideoPlaying(false));
      clearInterval(syncInterval);
    };
  }, [isVideoPlaying, videoRef.current]);

  // Handle wheel scroll and touch swipe navigation on video carousel
  useEffect(() => {
    if (activeTab !== 'video') return;

    const carousel = ringRef.current;
    if (!carousel) return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let touchStartY = 0;
    let touchEndY = 0;

    const navigateCarousel = (direction: 'up' | 'down') => {
      const mediaLength = filteredMedia.length;
      if (mediaLength === 0) return;

      const step = 360 / Math.max(mediaLength, 1);

      setWheelRotation(prev => direction === 'down' ? prev + step : prev - step);

      setSelectedMediaIndex(prevIndex => {
        const newIndex = direction === 'down'
          ? (prevIndex + 1) % mediaLength
          : (prevIndex - 1 + mediaLength) % mediaLength;

        const media = filteredMedia[newIndex];
        if (media && media.type === 'video' && !media.youtubeUrl && videoRef.current && media.mediaUrl) {
          console.log('🔄 Changement de vidéo vers:', media.title);
          const validUrl = getValidVideoUrl(media.mediaUrl);
          if (validUrl) {
            try {
              // Reset simple avant changement
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
              
          // Utiliser l'URL directement
          videoRef.current.src = validUrl;
              videoRef.current.load();
              
              // Reset des états
              setIsVideoPlaying(false);
              setCurrentTime(0);
              setDuration(0);
              setVideoError(false);
              setIsVideoLoading(true);
              setLoadingTimeout(false);
              
          console.log('✅ Changement de vidéo réussi:', {
            title: media.title,
            url: validUrl
          });
            } catch (error) {
              console.error('❌ Erreur lors du changement de vidéo:', error);
              setVideoError(true);
              setIsVideoLoading(false);
            }
          } else {
            console.error('❌ URL vidéo invalide pour:', media.title);
            setVideoError(true);
            setIsVideoLoading(false);
          }
        }

        return newIndex;
      });
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      isScrolling = true;

      navigateCarousel(e.deltaY > 0 ? 'down' : 'up');

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 500);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;

      const swipeDistance = touchStartY - touchEndY;
      const minSwipeDistance = 30;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        navigateCarousel(swipeDistance > 0 ? 'down' : 'up');
      }
    };

    carousel.addEventListener('wheel', handleWheel, { passive: false });
    carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
    carousel.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      carousel.removeEventListener('wheel', handleWheel);
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
      carousel.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, filteredMedia]);

  // Polar layout positioning for video thumbnails
  useEffect(() => {
    if (activeTab !== 'video') return;

    const layoutPolar = () => {
      if (!ringRef.current) return;

      const ring = ringRef.current;
      const thumbElements = thumbsRef.current.filter(Boolean);

      if (thumbElements.length === 0) return;

      // Get actual computed dimensions
      const ringSize = ring.offsetWidth;
      if (ringSize === 0) return;

      // Get CSS variables from the #video-portfolio section
      const videoSection = document.getElementById('video-portfolio');
      if (!videoSection) return;

      const style = getComputedStyle(videoSection);
      const thumbSizeStr = style.getPropertyValue('--thumb-size').trim();
      const gapStr = style.getPropertyValue('--thumb-gap').trim();

      // Parse clamp() values by evaluating the actual computed size
      const thumbSize = parseFloat(thumbSizeStr) || 80;
      const gap = parseFloat(gapStr) || 12;

      const n = thumbElements.length;
      const cx = ringSize / 2;
      const cy = ringSize / 2;

      // Calculate radius with safety margin
      let radius = (ringSize / 2) - (thumbSize / 2) - (gap * 2);

      // GUARD: Minimal radius to prevent clustering
      const minRadius = thumbSize * 1.2;
      if (radius < minRadius) {
        radius = minRadius;
      }

      // Full 360° distribution starting from top
      thumbElements.forEach((el, i) => {
        const angle = (i * 2 * Math.PI / n) - (Math.PI / 2);
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        if (el) {
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
          el.style.transform = 'translate(-50%, -50%)';
        }
      });

      console.log('🔵 Polar layout applied:', {
        ringSize,
        thumbSize,
        gap,
        radius,
        count: thumbElements.length,
        positions: thumbElements.map((el, i) => {
          const angle = (i * 2 * Math.PI / n) - (Math.PI / 2);
          return {
            index: i,
            x: cx + radius * Math.cos(angle),
            y: cy + radius * Math.sin(angle)
          };
        })
      });
    };

    // Initial layout with delays to ensure DOM is fully rendered
    const timer1 = setTimeout(layoutPolar, 100);
    const timer2 = setTimeout(layoutPolar, 300);
    const timer3 = setTimeout(layoutPolar, 500);

    // Re-layout on resize
    const handleResize = () => {
      requestAnimationFrame(layoutPolar);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTab, filteredMedia.length]);

  const handleMediaSelect = (index: number) => {
    setSelectedMediaIndex(index);
    const media = filteredMedia[index];

    if (media && media.type === 'video' && !media.youtubeUrl && videoRef.current && media.mediaUrl) {
      console.log('🎯 Sélection de vidéo:', media.title);
      const validUrl = getValidVideoUrl(media.mediaUrl);
      if (validUrl) {
        try {
          // Reset simple avant changement
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          
          // Utiliser l'URL directement
          videoRef.current.src = validUrl;
          videoRef.current.load();
          
          // Reset des états
          setIsVideoPlaying(false);
          setVideoError(false);
          setCurrentTime(0);
          setDuration(0);
          setIsVideoLoading(true);
          setLoadingTimeout(false);
          
          console.log('✅ Sélection de vidéo réussie:', {
            title: media.title,
            url: validUrl
          });
        } catch (error) {
          console.error('❌ Erreur lors de la sélection de vidéo:', error);
          setVideoError(true);
          setIsVideoLoading(false);
        }
      } else {
        console.error('❌ URL vidéo invalide pour:', media.title);
        setVideoError(true);
        setIsVideoLoading(false);
      }
    }

    // Update SEO meta tags for selected media
    if (media) {
      const baseUrl = window.location.origin;
      updateMetaTags({
        title: `${media.title} - Portfolio GND Consulting`,
        description: media.caption.split('\n\n')[0].replace(/[«»""]/g, '').trim(),
        image: media.thumbnail,
        url: `${baseUrl}/#realisations`,
        type: 'article'
      });
    }
  };

  const handleThumbnailClick = (index: number) => {
    const isAlreadySelected = index === selectedMediaIndex;
    const currentMedia = filteredMedia[index];

    // Dev guard: avoid crashing flow when a video has no usable URL
    if (
      currentMedia &&
      currentMedia.type === 'video' &&
      !currentMedia.youtubeUrl &&
      !currentMedia.mediaUrl
    ) {
      if (import.meta.env.MODE !== 'production') {
        console.warn('missing url for video thumbnail', { index, id: currentMedia.id, title: currentMedia.title });
      }
      return;
    }

    if (!isAlreadySelected) {
      handleMediaSelect(index);
      return;
    }

    if (currentMedia && currentMedia.type === 'video') {
      if (currentMedia.type === 'video' && currentMedia.youtubeUrl) {
        const iframe = document.querySelector('iframe[src*="youtube.com/embed"]') as HTMLIFrameElement;
        if (iframe) {
          if (isVideoPlaying) {
            iframe.contentWindow?.postMessage(JSON.stringify({
              event: 'command',
              func: 'pauseVideo',
              args: ''
            }), '*');
            setIsVideoPlaying(false);
          } else {
            if (!iframe.src.includes('enablejsapi=1')) {
              const videoId = currentMedia.youtubeUrl.split('v=')[1]?.split('&')[0];
              iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&controls=0&showinfo=0&iv_load_policy=3&origin=${window.location.origin}`;
            } else {
              iframe.contentWindow?.postMessage(JSON.stringify({
                event: 'command',
                func: 'playVideo',
                args: ''
              }), '*');
            }
            setIsVideoPlaying(true);

            setTimeout(() => {
              iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          }
        }
      } else if (currentMedia.mediaUrl && videoRef.current) {
        const video = videoRef.current;

        if (video.paused) {
          video.play().then(() => {
            setIsVideoPlaying(true);
            video.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }).catch((error) => {
            console.error('Erreur lors de la lecture automatique:', error);
          });
        } else {
          video.pause();
          setIsVideoPlaying(false);
        }
      }
    }
  };

  const rotateWheel = (direction: 'up' | 'down') => {
    const step = 360 / Math.max(filteredMedia.length, 1);
    const newRotation = direction === 'down' 
      ? wheelRotation + step 
      : wheelRotation - step;
    
    setWheelRotation(newRotation);
    
    // Calculer le nouvel index sélectionné
    const newIndex = direction === 'down'
      ? (selectedMediaIndex + 1) % filteredMedia.length
      : (selectedMediaIndex - 1 + filteredMedia.length) % filteredMedia.length;
    
    handleMediaSelect(newIndex);
  };

  const handleVideoPlay = () => {
    try {
      console.log('▶️ Vidéo en lecture');
      setIsVideoPlaying(true);
      setVideoError(false); // Reset l'erreur si la vidéo démarre
      setLoadingTimeout(false); // Reset le timeout de chargement
      
      // FIXED by audit - Synchronisation supplémentaire avec l'état réel de la vidéo
      if (videoRef.current) {
        console.log('🔄 Synchronisation état vidéo:', {
          paused: videoRef.current.paused,
          readyState: videoRef.current.readyState,
          duration: videoRef.current.duration
        });
        
        // Validation des états React
        validateReactStates({
          isVideoPlaying: true,
          currentTime,
          duration,
          videoError: false,
          isVideoLoading,
          videoRef
        });
      }
    } catch (error) {
      console.error('❌ Erreur lors de la lecture:', error);
      setVideoError(true);
    }
  };

  const handleVideoPause = () => {
    try {
      console.log('⏸️ Vidéo en pause');
      setIsVideoPlaying(false);
      
      // FIXED by audit - Synchronisation supplémentaire avec l'état réel de la vidéo
      if (videoRef.current) {
        console.log('🔄 Synchronisation état pause:', {
          paused: videoRef.current.paused,
          currentTime: videoRef.current.currentTime
        });
      }
    } catch (error) {
      console.error('❌ Erreur lors de la pause:', error);
    }
  };

  const handleVideoEnded = () => {
    try {
      console.log('🏁 Vidéo terminée');
      setIsVideoPlaying(false);
      setCurrentTime(0); // Reset le temps à la fin
    } catch (error) {
      console.error('❌ Erreur lors de la fin de vidéo:', error);
    }
  };

  // Fonction de préchargement des vidéos
  const preloadVideo = (url: string, title: string): Promise<HTMLVideoElement> => {
    return new Promise((resolve, reject) => {
      if (preloadCache.current.has(url)) {
        console.log('📦 Vidéo déjà en cache:', title);
        resolve(preloadCache.current.get(url)!);
        return;
      }

      console.log('🔄 Préchargement de la vidéo:', title);
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      
      video.addEventListener('loadedmetadata', () => {
        console.log('✅ Vidéo préchargée:', title);
        preloadCache.current.set(url, video);
        resolve(video);
      });
      
      video.addEventListener('error', (e) => {
        console.warn('⚠️ Erreur de préchargement:', title, e);
        reject(e);
      });
      
      video.src = url;
    });
  };

  // Précharger les vidéos adjacentes
  const preloadAdjacentVideos = (currentIndex: number) => {
    const videosToPreload = [];
    
    // Vidéo précédente
    const prevIndex = (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    const prevMedia = filteredMedia[prevIndex];
    if (prevMedia && prevMedia.type === 'video' && prevMedia.mediaUrl && !prevMedia.youtubeUrl) {
      videosToPreload.push({ media: prevMedia, index: prevIndex });
    }
    
    // Vidéo suivante
    const nextIndex = (currentIndex + 1) % filteredMedia.length;
    const nextMedia = filteredMedia[nextIndex];
    if (nextMedia && nextMedia.type === 'video' && nextMedia.mediaUrl && !nextMedia.youtubeUrl) {
      videosToPreload.push({ media: nextMedia, index: nextIndex });
    }
    
    // Précharger les vidéos identifiées
    videosToPreload.forEach(({ media }) => {
      const validUrl = getValidVideoUrl(media.mediaUrl);
      if (validUrl) {
        preloadVideo(validUrl, media.title).catch(() => {
          // Ignorer les erreurs de préchargement
        });
      }
    });
  };

  // Fonction pour essayer une URL alternative en cas d'échec
  const tryAlternativeUrl = (originalUrl: string, title: string) => {
    console.log('🔄 Tentative d\'URL alternative pour:', title);
    
    // Stratégies d'URL alternative
    const alternativeStrategies = [
      // 1. Essayer sans encodage
      originalUrl.replace(/%20/g, ' '),
      // 2. Essayer avec encodage différent
      originalUrl.replace(/ /g, '%20'),
      // 3. Essayer avec l'URL de base Supabase
      originalUrl.includes('supabase.co') ? originalUrl.replace('/storage/v1/object/public/', '/storage/v1/object/sign/') : originalUrl
    ];
    
    let strategyIndex = 0;
    
    const tryNextStrategy = () => {
      if (strategyIndex < alternativeStrategies.length) {
        const alternativeUrl = alternativeStrategies[strategyIndex];
        console.log(`🔄 Stratégie ${strategyIndex + 1}: ${alternativeUrl}`);
        
        if (videoRef.current) {
          videoRef.current.src = alternativeUrl;
          videoRef.current.load();
          setIsVideoLoading(true);
          setVideoError(false);
          
          // Reset le compteur de retry pour cette nouvelle URL
          retryCount.current.set(alternativeUrl, 0);
        }
        
        strategyIndex++;
      } else {
        console.error('❌ Toutes les stratégies d\'URL alternative ont échoué pour:', title);
        setVideoError(true);
        setIsVideoLoading(false);
      }
    };
    
    // Essayer la première stratégie après un délai
    setTimeout(tryNextStrategy, 2000);
  };

  // Fonction pour optimiser les performances selon la connexion
  const optimizeForConnection = (url: string): string => {
    // Détecter la qualité de connexion
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      const effectiveType = connection.effectiveType;
      console.log('📊 Type de connexion détecté:', effectiveType);
      
      // Adapter la qualité selon la connexion
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        console.log('🐌 Connexion lente détectée - optimisation pour faible bande passante');
        // Pour les connexions lentes, on pourrait utiliser des versions compressées
        return url.replace('.mp4', '_low.mp4');
      } else if (effectiveType === '3g') {
        console.log('📱 Connexion 3G détectée - optimisation modérée');
        return url.replace('.mp4', '_medium.mp4');
      }
    }
    
    return url;
  };

  // Fonction pour mesurer les performances de chargement
  const measureLoadPerformance = (url: string, title: string) => {
    const startTime = performance.now();
    
    return {
      start: startTime,
      end: () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        performanceMetrics.current.loadTimes.set(url, loadTime);
        console.log(`⏱️ Temps de chargement pour "${title}": ${loadTime.toFixed(2)}ms`);
        
        // Ajuster la stratégie de préchargement selon les performances
        if (loadTime > 5000) {
          console.log('⚠️ Chargement lent détecté - réduction du préchargement');
        }
      }
    };
  };

  // Fonction pour nettoyer le cache des performances
  const cleanupPerformanceCache = () => {
    const maxCacheSize = 10;
    
    if (performanceMetrics.current.loadTimes.size > maxCacheSize) {
      const entries = Array.from(performanceMetrics.current.loadTimes.entries());
      entries.sort((a, b) => a[1] - b[1]); // Trier par temps de chargement
      
      // Garder seulement les 10 plus rapides
      performanceMetrics.current.loadTimes.clear();
      entries.slice(0, maxCacheSize).forEach(([url, time]) => {
        performanceMetrics.current.loadTimes.set(url, time);
      });
      
      console.log('🧹 Cache des performances nettoyé');
    }
  };

  const handleCentralPlayClick = () => {
    const currentMedia = filteredMedia[selectedMediaIndex];
    if (!currentMedia || currentMedia.type !== 'video') return;

    if (currentMedia.type === 'video' && currentMedia.youtubeUrl) {
      const iframe = document.querySelector('iframe[src*="youtube.com/embed"]') as HTMLIFrameElement;
      if (iframe) {
        const videoId = currentMedia.youtubeUrl.split('v=')[1]?.split('&')[0];
        const currentSrc = iframe.src;

        if (isVideoPlaying) {
          iframe.contentWindow?.postMessage(JSON.stringify({
            event: 'command',
            func: 'pauseVideo',
            args: ''
          }), '*');
          setIsVideoPlaying(false);
        } else {
          if (!currentSrc.includes('enablejsapi=1')) {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
          } else {
            iframe.contentWindow?.postMessage(JSON.stringify({
              event: 'command',
              func: 'playVideo',
              args: ''
            }), '*');
          }
          setIsVideoPlaying(true);

          setTimeout(() => {
            iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      }
    } else if (currentMedia.mediaUrl && videoRef.current) {
      const video = videoRef.current;

      if (video.paused) {
        video.play().then(() => {
          setIsVideoPlaying(true);
          video.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }).catch((error) => {
          console.error('Erreur lors de la lecture automatique:', error);
        });
      } else {
        video.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const openImageModal = (image: string, caption: string) => {
    setSelectedImage(image);
    setSelectedCaption(caption);
    document.body.style.overflow = 'hidden';
    const header = document.querySelector('header');
    if (header) {
      (header as HTMLElement).style.display = 'none';
    }
    const tabs = document.getElementById('portfolio-tabs');
    if (tabs) {
      (tabs as HTMLElement).style.display = 'none';
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedCaption('');
    document.body.style.overflow = '';
    const header = document.querySelector('header');
    if (header) {
      (header as HTMLElement).style.display = '';
    }
    const tabs = document.getElementById('portfolio-tabs');
    if (tabs) {
      (tabs as HTMLElement).style.display = '';
    }
  };

  // Accessibilité lightbox: focus trap + ESC pour fermer
  useEffect(() => {
    if (!selectedImage) return;

    // Focus initial sur le bouton fermer
    const focusTimeout = window.setTimeout(() => {
      lightboxCloseBtnRef.current?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxRef.current) return;
      // ESC pour fermer
      if (e.key === 'Escape') {
        e.preventDefault();
        closeImageModal();
        return;
      }
      // Trap du focus avec Tab
      if (e.key === 'Tab') {
        const focusableSelectors = [
          'a[href]','button:not([disabled])','textarea:not([disabled])','input[type="text"]:not([disabled])','input[type="radio"]:not([disabled])','input[type="checkbox"]:not([disabled])','select:not([disabled])','[tabindex]:not([tabindex="-1"])'
        ];
        const nodes = Array.from(lightboxRef.current.querySelectorAll<HTMLElement>(focusableSelectors.join(',')));
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || !lightboxRef.current.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  // Section Découvrir nos réalisations – État de chargement
  if (loading) {
    return (
      <section className="py-[10rem] px-[5%] max-w-[1400px] mx-auto relative">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-gray-600 mt-4">Chargement du portfolio...</p>
        </div>
      </section>
    );
  }

  const currentMedia = filteredMedia[selectedMediaIndex];

  // Section Découvrir nos réalisations – ID utilisé pour scroll via menu Portfolio
  return (
    <section id="realisations" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden" role="region" aria-label="Portfolio vidéos et photos" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f9ff 100%)' }}>
      {/* Éléments décoratifs */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-rose-200/40 to-pink-300/40 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-cyan-300/40 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-indigo-300/30 rounded-full blur-2xl" aria-hidden="true"></div>

      <div className="text-center mb-12 sm:mb-16 md:mb-20 relative z-10 max-w-7xl mx-auto">
        <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
          Nos Réalisations Audiovisuelles
        </h2>
        <p className="section-description text-gray-700" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)' }}>
          Vidéos corporate, captations live, motion design : découvrez nos projets audiovisuels qui allient créativité et expertise technique
        </p>
      </div>

      {/* Menu segmenté (pills) */}
      <div id="portfolio-tabs" className="flex justify-center mb-8 sm:mb-12 relative z-40 max-w-7xl mx-auto pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-1.5 sm:p-2 inline-flex gap-1.5 sm:gap-2 shadow-lg border border-gray-200/50" role="tablist">
          <button
            type="button"
            role="tab"
            data-testid="tab-videos"
            aria-selected={activeTab === 'video'}
            aria-controls="portfolio-videos"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('video');
            }}
            className={clsx(
              'flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 pointer-events-auto text-sm sm:text-base',
              activeTab === 'video'
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
            )}
          >
            <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">Vidéos</span>
          </button>
          <button
            type="button"
            role="tab"
            data-testid="tab-photos"
            aria-selected={activeTab === 'photo'}
            aria-controls="portfolio-photos"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('photo');
            }}
            className={clsx(
              'flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 pointer-events-auto text-sm sm:text-base',
              activeTab === 'photo'
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
            )}
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">Photos</span>
          </button>
        </div>
      </div>

      {/* Interface principale : Roue en arc + Visionneuse - Pleine largeur */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto pointer-events-auto">
        {activeTab === 'video' && (
          <section
            id="video-portfolio"
            data-scope="video-portfolio"
            role="tabpanel"
            aria-labelledby="tab-videos"
            className="vp-section-wrapper relative grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 w-full animate-fade-in"
            style={{
              '--ring-size': 'clamp(260px, 60vw, 560px)',
              '--thumb-size': 'clamp(56px, 10vw, 120px)',
              '--thumb-gap': 'clamp(8px, 2.5vw, 20px)',
              '--center-play': 'clamp(56px, 9vw, 120px)'
            } as React.CSSProperties}
          >
            <style>{`
              /* ====== Navigation arrows visibility enhancement - Video section only ====== */
              #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button {
                opacity: 1 !important;
                transform: none;
                pointer-events: auto;

                width: 44px;
                height: 44px;
                border-radius: 12px;

                background: rgba(255, 255, 255, 0.92) !important;
                color: #111 !important;
                border: 1px solid rgba(17, 17, 17, 0.08) !important;
                backdrop-filter: saturate(140%) blur(6px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18),
                            0 2px 6px rgba(0, 0, 0, 0.08) !important;

                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                z-index: 30;
              }

              #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button svg {
                width: 18px !important;
                height: 18px !important;
                stroke-width: 2.5;
                color: #111 !important;
                filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
              }

              #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button:hover {
                background: rgba(255, 255, 255, 1) !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22),
                            0 3px 8px rgba(0, 0, 0, 0.10) !important;
              }

              #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button:hover svg {
                color: #3b82f6 !important;
              }

              #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button:active {
                transform: translateY(0) !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16),
                            0 2px 4px rgba(0, 0, 0, 0.08) !important;
              }

              #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button:focus-visible {
                outline: none;
                box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.55),
                            0 6px 20px rgba(0, 0, 0, 0.18) !important;
              }

              @media (max-width: 640px) {
                #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button {
                  width: 48px !important;
                  height: 48px !important;
                  border-radius: 14px;
                }

                #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button svg {
                  width: 20px !important;
                  height: 20px !important;
                }
              }

              @media (prefers-color-scheme: dark) {
                #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button {
                  background: rgba(28, 28, 28, 0.9) !important;
                  color: #fff !important;
                  border-color: rgba(255, 255, 255, 0.08) !important;
                  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.35),
                              0 2px 8px rgba(0, 0, 0, 0.18) !important;
                }

                #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button svg {
                  color: #fff !important;
                }
              }

              /* Scoped styles for video portfolio only */
              #video-portfolio[data-scope="video-portfolio"] .vp-thumb {
                width: var(--thumb-size);
                height: calc(var(--thumb-size) * 0.714);
                object-fit: cover;
              }

              #video-portfolio[data-scope="video-portfolio"] .thumb-media {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: inherit;
                background: #000;
                display: block;
              }

              #video-portfolio[data-scope="video-portfolio"] .vp-ring {
                position: relative;
                margin-inline: auto;
                overflow: visible !important;
                transform: translateZ(0);
              }

              /* Ensure parent container also allows overflow */
              #video-portfolio[data-scope="video-portfolio"] .carousel-wheel {
                overflow: visible !important;
              }

              /* Anti-superposition : force un espacement minimal */
              #video-portfolio[data-scope="video-portfolio"] .vp-thumb-btn {
                margin: 0 !important;
                padding: 0 !important;
                width: var(--thumb-size);
                height: calc(var(--thumb-size) * 0.714);
                background: transparent !important;
              }

              #video-portfolio[data-scope="video-portfolio"] .vp-center {
                display: grid;
                place-items: center;
                border-radius: 9999px;
              }

              /* Suppression de tout fond blanc/bleu parasite */
              #video-portfolio[data-scope="video-portfolio"] .vp-thumb img,
              #video-portfolio[data-scope="video-portfolio"] .vp-thumb button,
              #video-portfolio[data-scope="video-portfolio"] .vp-thumb-btn,
              #video-portfolio[data-scope="video-portfolio"] .vp-thumb div {
                background: transparent !important;
              }

              /* Forcer les fallbacks à utiliser des fonds sombres cohérents */
              #video-portfolio[data-scope="video-portfolio"] .vp-thumb [class*="bg-gradient"] {
                background: transparent !important;
              }

              /* Responsive breakpoints pour éviter l'amas au centre */
              @media (max-width: 480px) {
                #video-portfolio[data-scope="video-portfolio"] {
                  --ring-size: clamp(240px, 78vw, 340px);
                  --thumb-size: clamp(44px, 12vw, 72px);
                  --thumb-gap: clamp(6px, 2vw, 14px);
                  --center-play: clamp(48px, 12vw, 84px);
                }
                /* Garder les flèches visibles sous 320px de large */
                #video-portfolio[data-scope="video-portfolio"] #portfolio-navigation button {
                  transform: translateY(12px) !important;
                }
              }

              /* iPhone XR/11/Plus (≈414px de large) - augmenter l'espacement et réduire le bouton central */
              @media (min-width: 400px) and (max-width: 430px) {
                #video-portfolio[data-scope="video-portfolio"] {
                  --ring-size: clamp(260px, 82vw, 360px);
                  --thumb-size: clamp(46px, 11.5vw, 70px);
                  --thumb-gap: clamp(10px, 3vw, 18px);
                  --center-play: clamp(44px, 10vw, 72px);
                }
              }

              @media (min-width: 481px) and (max-width: 767px) {
                #video-portfolio[data-scope="video-portfolio"] {
                  --ring-size: clamp(280px, 65vw, 420px);
                  --thumb-size: clamp(52px, 10.5vw, 90px);
                  --thumb-gap: clamp(7px, 2.2vw, 16px);
                  --center-play: clamp(52px, 10vw, 100px);
                }
              }

              @media (min-width: 768px) and (max-width: 1023px) {
                #video-portfolio[data-scope="video-portfolio"] {
                  --ring-size: clamp(360px, 56vw, 520px);
                  --thumb-size: clamp(60px, 8.5vw, 100px);
                  --thumb-gap: clamp(8px, 1.8vw, 18px);
                  --center-play: clamp(60px, 9vw, 110px);
                }
              }

              @media (min-width: 1024px) {
                #video-portfolio[data-scope="video-portfolio"] {
                  --ring-size: clamp(520px, 66vw, 640px);
                  --thumb-size: clamp(72px, 8.5vw, 112px);
                  --thumb-gap: clamp(20px, 3.5vw, 28px);
                  --center-play: clamp(52px, 6.5vw, 90px);
                }
              }

              /* Ajustement spécifique tablette large pour éviter chevauchements */
              @media (min-width: 1024px) and (max-width: 1366px) {
                #video-portfolio[data-scope="video-portfolio"] .vp-center {
                  z-index: 30;
                }
                #video-portfolio[data-scope="video-portfolio"] .vp-thumb-btn {
                  z-index: 20;
                }
                /* Réduire légèrement la taille et augmenter l'espacement pour limiter les overlaps */
                #video-portfolio[data-scope="video-portfolio"] {
                  --thumb-size: clamp(64px, 7.5vw, 96px);
                  --thumb-gap: clamp(22px, 3.8vw, 32px);
                  --center-play: clamp(44px, 5.5vw, 78px);
                }
              }
            `}</style>

            {/* COLONNE GAUCHE - Roue circulaire complète pleine hauteur */}
            <div
              className="relative flex flex-col items-center justify-center min-h-[600px] sm:min-h-[700px] lg:min-h-[900px]"
              role="region"
              aria-label="Carrousel de vidéos circulaire"
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Fond décoratif avec aura futuriste animée */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-300/15 to-teal-400/20 rounded-full blur-3xl scale-[2.8] opacity-70 pointer-events-none select-none z-0 animate-pulse" style={{ animationDuration: '5s' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-secondary/20 to-primary/25 rounded-full blur-2xl scale-[2.4] opacity-80 pointer-events-none select-none z-0 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-blue-50/20 to-transparent rounded-full blur-xl scale-[2] pointer-events-none select-none z-0"></div>

                {/* Contrôles de navigation de la roue - Design 2025 */}
                <div id="portfolio-navigation" className="relative flex justify-center mb-8 sm:mb-12 lg:mb-16 z-20 pointer-events-auto mt-8" role="group" aria-label="Navigation du carrousel">
                  <div className="flex justify-center items-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => rotateWheel('up')}
                      aria-label="Vidéo précédente"
                      aria-controls="video-carousel"
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/90 backdrop-blur-lg rounded-2xl flex items-center justify-center text-gray-700 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 ease-in-out shadow-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] pointer-events-auto group"
                    >
                      <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" aria-hidden="true" style={{ minWidth: '24px', minHeight: '24px', maxWidth: '32px', maxHeight: '32px' }} />
                    </button>
                    <button
                      type="button"
                      onClick={() => rotateWheel('down')}
                      aria-label="Vidéo suivante"
                      aria-controls="video-carousel"
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/90 backdrop-blur-lg rounded-2xl flex items-center justify-center text-gray-700 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 ease-in-out shadow-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] pointer-events-auto group"
                    >
                      <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" aria-hidden="true" style={{ minWidth: '24px', minHeight: '24px', maxWidth: '32px', maxHeight: '32px' }} />
                    </button>
                  </div>
                </div>

                {/* Container de la roue circulaire complète */}
                <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center px-4">
                  {/* Roue circulaire complète - Design 2025 */}
                  <div
                    ref={ringRef}
                    id="video-carousel"
                    role="group"
                    aria-roledescription="carousel"
                    aria-label="Sélection de vidéos"
                    className="vp-ring carousel-wheel relative"
                    style={{
                      width: 'var(--ring-size)',
                      height: 'var(--ring-size)',
                      transform: `perspective(1500px) rotateX(5deg)`,
                      overflow: 'visible',
                      touchAction: 'pan-y'
                    }}
                  >
                    {/* Cercle principal avec design premium glow-up */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d0f2fe]/95 via-[#a0e7ff]/85 to-[#70d9ff]/90 backdrop-blur-3xl border-[3px] border-white/80 shadow-[0_0_120px_rgba(0,200,255,0.5),0_0_80px_rgba(208,242,254,0.6),0_30px_80px_rgba(0,0,0,0.2),inset_0_0_60px_rgba(255,255,255,0.3)] transition-all duration-700 group-hover/wheel:shadow-[0_0_150px_rgba(0,200,255,0.7),0_0_100px_rgba(208,242,254,0.8),0_35px_90px_rgba(0,0,0,0.25)] pointer-events-none select-none z-0">
                      {/* Reflet brillant en arc supérieur */}
                      <div className="absolute top-0 left-1/4 right-1/4 h-1/4 rounded-full bg-gradient-to-b from-white/60 to-transparent blur-xl pointer-events-none"></div>
                    </div>

                    {/* Aura lumineuse externe optimisée (animations réduites) */}
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#00c8ff]/30 via-[#d0f2fe]/35 to-[#00a8e8]/30 blur-xl opacity-40 pointer-events-none select-none z-0"></div>

                    {/* Cercles concentriques avec reflets et profondeur améliorée */}
                    <div className="absolute inset-12 rounded-full bg-gradient-to-br from-white/40 via-[#d0f2fe]/20 to-transparent border-2 border-white/50 shadow-[inset_0_0_40px_rgba(255,255,255,0.4),0_0_20px_rgba(0,200,255,0.3)] backdrop-blur-sm pointer-events-none select-none z-0"></div>
                    <div className="absolute inset-20 rounded-full border-2 border-[#00c8ff]/30 opacity-60 shadow-[0_0_15px_rgba(0,200,255,0.4)] pointer-events-none select-none z-0"></div>
                    <div className="absolute inset-28 rounded-full border border-cyan-300/25 opacity-50 shadow-[0_0_10px_rgba(112,217,255,0.3)] pointer-events-none select-none z-0"></div>

                    {/* Bouton central premium ultra-moderne avec glow effet */}
                    <button
                      type="button"
                      onClick={handleCentralPlayClick}
                      aria-label={isVideoPlaying && videoRef.current && !videoRef.current.paused ? "Mettre en pause la vidéo" : "Lire la vidéo sélectionnée"}
                      className={`vp-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br rounded-full z-50 border-[5px] hover:scale-125 active:scale-95 transition-all duration-500 cursor-pointer pointer-events-auto group/center focus:outline-none focus:ring-4 ${
                        isVideoPlaying && videoRef.current && !videoRef.current.paused
                          ? 'from-[#ff6b6b] via-[#ee5a52] to-[#dc4040] shadow-[0_0_50px_rgba(255,107,107,0.9),0_0_80px_rgba(255,107,107,0.6),0_10px_40px_rgba(0,0,0,0.3)] border-white/95 hover:shadow-[0_0_70px_rgba(255,107,107,1),0_0_100px_rgba(255,107,107,0.8),0_15px_50px_rgba(0,0,0,0.4)] hover:border-[#ffe0e0] focus:ring-[#ff6b6b]/70'
                          : 'from-[#00c8ff] via-[#0096cc] to-[#007899] shadow-[0_0_50px_rgba(0,200,255,0.9),0_0_80px_rgba(0,200,255,0.6),0_10px_40px_rgba(0,0,0,0.3)] border-white/95 hover:shadow-[0_0_70px_rgba(0,200,255,1),0_0_100px_rgba(0,200,255,0.8),0_15px_50px_rgba(0,0,0,0.4)] hover:border-[#d0f2fe] focus:ring-[#00c8ff]/70'
                      }`}
                      style={{
                        width: 'var(--center-play)',
                        height: 'var(--center-play)'
                      }}
                    >
                      {/* Effet de lueur interne premium */}
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/50 via-[#d0f2fe]/30 to-transparent shadow-[inset_0_0_20px_rgba(255,255,255,0.6)] pointer-events-none select-none"></div>

                      {/* Reflet brillant supérieur */}
                      <div className="absolute top-1 left-1/4 right-1/4 h-1/3 rounded-full bg-gradient-to-b from-white/60 to-transparent blur-sm pointer-events-none select-none"></div>

                      {/* Pictogramme Play/Pause animé avec glow */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                        {isVideoPlaying && videoRef.current && !videoRef.current.paused ? (
                          <Pause className="w-8 h-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover/center:scale-110 group-hover/center:drop-shadow-[0_0_25px_rgba(255,255,255,1)] transition-all duration-300" />
                        ) : (
                          <Play className="w-8 h-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover/center:scale-110 group-hover/center:drop-shadow-[0_0_25px_rgba(255,255,255,1)] transition-all duration-300 ml-1" />
                        )}
                      </div>

                      {/* Animation de pulsation améliorée */}
                      <div className="absolute -inset-3 rounded-full border-2 border-[#00c8ff]/60 animate-ping opacity-75 shadow-[0_0_20px_rgba(0,200,255,0.5)]" style={{ animationDuration: '2s' }}></div>
                      <div className="absolute -inset-4 rounded-full border border-white/40 animate-ping opacity-50 shadow-[0_0_15px_rgba(255,255,255,0.4)]" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
                    </button>

                    {/* Vignettes disposées en cercle complet */}
                    {filteredMedia.map((media, index) => {
                      // Dev-only check to ensure parity of thumbnails vs data
                      if (import.meta.env.MODE !== 'production' && (!media || !media.thumbnail)) {
                        console.warn('thumbnail mismatch or missing', { index, media });
                      }
                      const isSelected = index === selectedMediaIndex;
                      const totalItems = filteredMedia.length;

                      // Effets visuels selon la position
                      const distanceFromCenter = Math.abs(index - selectedMediaIndex);
                      const normalizedDistance = Math.min(distanceFromCenter, totalItems - distanceFromCenter);
                      const opacity = isSelected ? 1 : Math.max(0.75, 1 - normalizedDistance * 0.08);
                      const scale = isSelected ? 1.6 : Math.max(0.9, 1 - normalizedDistance * 0.05);
                      const zIndex = isSelected ? 40 : Math.max(10, 20 - normalizedDistance);

                      return (
                        <button
                          key={media.id}
                          type="button"
                          data-index={index}
                          ref={(el) => (thumbsRef.current[index] = el)}
                          onClick={() => handleThumbnailClick(index)}
                          role="button"
                          aria-label={isSelected && media.type === 'video' ? (isVideoPlaying ? `Mettre en pause ${media.title}` : `Lire ${media.title}`) : `Sélectionner la vidéo ${media.title}`}
                          aria-current={isSelected ? 'true' : 'false'}
                          tabIndex={isSelected ? 0 : -1}
                          className="vp-thumb-btn thumbnail cursor-pointer transition-all duration-300 ease-in-out transform-gpu hover:z-40 hover:scale-105 group/vignette pointer-events-auto focus:outline-none rounded-2xl"
                          style={{
                            position: 'absolute',
                            opacity,
                            zIndex,
                            transformStyle: 'preserve-3d',
                            margin: 0,
                            padding: 0,
                            background: 'transparent',
                            border: 'none',
                            willChange: 'transform'
                          }}
                        >
                          {/* Effet de lueur externe premium pour l'élément sélectionné */}
                          {isSelected && (
                            <>
                              <div className="absolute -inset-3 bg-[#00c8ff]/40 rounded-2xl blur-2xl animate-pulse pointer-events-none" style={{ animationDuration: '2s' }}></div>
                              <div className="absolute -inset-2 bg-[#d0f2fe]/50 rounded-2xl blur-xl animate-pulse pointer-events-none" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
                            </>
                          )}

                          {/* Vignette premium avec glow-up */}
                          <div className={`vp-thumb relative rounded-2xl overflow-hidden transition-all duration-500 ${
                            isSelected
                              ? 'ring-[3px] ring-[#00c8ff] shadow-[0_0_40px_rgba(0,200,255,0.9),0_0_20px_rgba(208,242,254,0.7),inset_0_0_10px_rgba(255,255,255,0.3)]'
                              : 'ring-2 ring-white/50 shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover/vignette:ring-[3px] group-hover/vignette:ring-cyan-300 group-hover/vignette:shadow-[0_0_25px_rgba(0,200,255,0.6),0_0_15px_rgba(112,217,255,0.5)]'
                          }`}
                          style={{
                            background: 'transparent',
                            padding: 0,
                            margin: 0
                          }}>
                            {/* Micro-interaction overlay */}
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/vignette:opacity-100 transition-opacity duration-300">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>

                            {/* Image/Vidéo thumbnail */}
                            {media.type === 'video' && (media.mediaUrl || media.youtubeUrl) ? (
                              <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ background: 'transparent', padding: 0, margin: 0 }}>
                                {/* THUMBNAIL RÉELLE - visible sur toutes résolutions */}
                                {media.youtubeUrl ? (
                                  <img
                                    src={media.thumbnail}
                                    alt={`Miniature vidéo - ${media.title} - Production audiovisuelle GND Consulting`}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/vignette:scale-110"
                                    style={{
                                      display: 'block',
                                      background: 'transparent',
                                      margin: 0,
                                      padding: 0
                                    }}
                                    onError={(e) => {
                                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="68"%3E%3Crect fill="%23374151" width="120" height="68"/%3E%3C/svg%3E';
                                    }}
                                  />
                                ) : media.mediaUrl ? (
                                  <VideoFirstFrame
                                    src={media.mediaUrl}
                                    poster={media.thumbnail}
                                    alt={`Miniature vidéo - ${media.title} - Production audiovisuelle GND Consulting`}
                                    width={320}
                                    height={180}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/vignette:scale-110"
                                    style={{
                                      display: 'block',
                                      background: 'transparent',
                                      margin: 0,
                                      padding: 0
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={media.thumbnail}
                                    alt={`Miniature vidéo - ${media.title} - Production audiovisuelle GND Consulting`}
                                    loading="lazy"
                                    decoding="async"
                                    width={320}
                                    height={180}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/vignette:scale-110"
                                    style={{
                                      display: 'block',
                                      background: 'transparent',
                                      margin: 0,
                                      padding: 0
                                    }}
                                  />
                                )}

                                {/* Overlay Play/Pause - fond semi-transparent */}
                                <div className={`absolute inset-0 flex items-center justify-center rounded-2xl transition-opacity duration-300 ${
                                  isSelected
                                    ? 'bg-black/30'
                                    : 'bg-black/20 opacity-0 group-hover/vignette:opacity-100'
                                }`}>
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                                    isSelected && isVideoPlaying && videoRef.current && !videoRef.current.paused
                                      ? 'bg-gradient-to-br from-red-500 to-red-600'
                                      : 'bg-gradient-to-br from-primary to-secondary'
                                  }`}>
                                    {isSelected && isVideoPlaying && videoRef.current && !videoRef.current.paused ? (
                                      <Pause className="w-5 h-5 text-white drop-shadow-lg" />
                                    ) : (
                                      <Play className="w-5 h-5 text-white drop-shadow-lg ml-0.5" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                                  <img
                                src={media.thumbnail}
                                alt={`Photo - ${media.title} - Photographie professionnelle GND Consulting`}
                                loading="lazy"
                                    decoding="async"
                                    width={320}
                                    height={180}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/vignette:scale-110"
                                style={{
                                  display: 'block',
                                  background: 'transparent',
                                  margin: 0,
                                  padding: 0
                                }}
                              />
                            )}
                          </div>

                          {/* Capsule titre discrète sous la vignette sélectionnée */}
                          {isSelected && (
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-[35] pointer-events-none animate-fade-in" role="status" aria-live="polite">
                              <div className="bg-gray-950/90 backdrop-blur-xl rounded-xl px-4 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_1px_rgba(255,255,255,0.1)] border border-white/30">
                                <span className="text-white text-xs font-bold tracking-wide truncate block max-w-[140px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                  {media.title.length > 22 ? media.title.substring(0, 22) + '...' : media.title}
                                </span>
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Indicateur de progression modernisé 2025 */}
                <div className="relative flex justify-center mt-8 sm:mt-10 lg:mt-12 z-20 pointer-events-none" role="status" aria-live="polite" aria-atomic="true">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 bg-white/95 backdrop-blur-xl rounded-3xl px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-2 border-primary/30 hover:shadow-[0_15px_50px_rgba(59,130,246,0.25)] transition-all duration-500 ease-in-out">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-primary to-secondary rounded-full animate-pulse shadow-lg" aria-hidden="true"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm sm:text-base font-bold text-gray-800" aria-label={`Vidéo ${selectedMediaIndex + 1} sur ${filteredMedia.length}`}>
                        {selectedMediaIndex + 1} / {filteredMedia.length}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 font-semibold tracking-wide">Pagination</span>
                    </div>
                    <div className="w-16 sm:w-20 md:w-28 lg:w-36 h-2.5 sm:h-3 lg:h-3.5 bg-gray-200/80 rounded-full overflow-hidden shadow-inner" role="progressbar" aria-valuenow={selectedMediaIndex + 1} aria-valuemin={1} aria-valuemax={filteredMedia.length} aria-label="Progression dans le carrousel">
                      <div
                        className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-700 shadow-lg"
                        style={{
                          width: `${((selectedMediaIndex + 1) / filteredMedia.length) * 100}%`
                        }}
                      ></div>
                    </div>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-gradient-to-br from-secondary to-primary rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }} aria-hidden="true"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* COLONNE DROITE - Visionneuse pleine hauteur modernisée 2025 */}
            <div className="flex items-center min-h-[600px] sm:min-h-[700px] lg:min-h-[900px]" role="region" aria-label="Lecteur vidéo et détails du projet">
              {currentMedia && (
                <div className="space-y-4 sm:space-y-6 lg:space-y-8 w-full">
                  {/* Visionneuse principale - Design 2025 */}
                  <div className="relative aspect-video rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] border-2 border-primary/20 bg-black group hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_50px_rgba(59,130,246,0.4),0_25px_70px_rgba(0,0,0,0.25)] hover:border-primary/40 transition-all duration-300 ease-in-out" role="region" aria-label="Lecteur vidéo" tabIndex={0}>
                    {currentMedia && currentMedia.type === 'video' && currentMedia.youtubeUrl && privateVideoIds.includes(currentMedia.id) ? (
                      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 text-center max-w-md mx-4 sm:mx-auto shadow-lg">
                          <p className="font-medium" style={{ color: '#444', fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)' }}>
                            🎬 Vidéo temporairement indisponible
                          </p>
                          <p className="mt-2" style={{ color: '#666', fontSize: 'clamp(0.8rem, 2vw, 0.875rem)' }}>
                            Le contenu sera bientôt de retour.
                          </p>
                        </div>
                      </div>
                    ) : currentMedia && currentMedia.type === 'video' && currentMedia.youtubeUrl ? (
                      <div className="relative w-full h-full group/youtube" onMouseMove={() => setShowVideoControls(true)} onTouchStart={() => setShowVideoControls(true)}>
                        {/* Bouton Play/Pause personnalisé pour YouTube */}
                        {!isVideoPlaying && (
                          <button
                            type="button"
                            className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer focus:outline-none bg-black/40"
                            onClick={() => {
                              const iframe = document.querySelector('iframe[src*="youtube.com/embed"]') as HTMLIFrameElement;
                              if (iframe) {
                                iframe.contentWindow?.postMessage(JSON.stringify({
                                  event: 'command',
                                  func: 'playVideo',
                                  args: ''
                                }), '*');
                                setIsVideoPlaying(true);
                              }
                            }}
                            aria-label={`Lire la vidéo ${currentMedia.title}`}
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/95 backdrop-blur-lg rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] border-4 border-white/80">
                              <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-900 hover:text-white ml-1 sm:ml-1.5 transition-colors duration-300" aria-hidden="true" />
                            </div>
                          </button>
                        )}

                        {/* Overlay de contrôle pendant la lecture - apparaît au survol */}
                        {isVideoPlaying && (
                          <div
                            className="absolute inset-0 z-10 cursor-default opacity-0 bg-black/20"
                            style={{ pointerEvents: 'none' }}
                            onClick={() => {
                              const iframe = document.querySelector('iframe[src*="youtube.com/embed"]') as HTMLIFrameElement;
                              if (iframe) {
                                iframe.contentWindow?.postMessage(JSON.stringify({
                                  event: 'command',
                                  func: 'pauseVideo',
                                  args: ''
                                }), '*');
                                setIsVideoPlaying(false);
                              }
                            }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-110 border-3 border-white/80">
                                <Pause className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-900 transition-colors duration-300" aria-hidden="true" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Contrôles vidéo accessibles avec masquage automatique - YouTube */}
                        <div 
                          className={`absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 transition-opacity duration-500 ${
                            showVideoControls ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{ pointerEvents: 'auto' }}
                          onMouseEnter={() => {
                            setShowVideoControls(true);
                            console.log('🎮 Contrôles affichés (survol)');
                          }}
                          onMouseLeave={() => {
                            if (isVideoPlaying) {
                              setTimeout(() => {
                                setShowVideoControls(false);
                                console.log('🎮 Contrôles masqués (fin survol)');
                              }, 1000);
                            }
                          }}
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/65 backdrop-blur-xl rounded-2xl px-2.5 sm:px-4 py-2 sm:py-2.5 border border-white/15 shadow-[0_8px_22px_rgba(0,0,0,0.35)]">
                            <button
                              type="button"
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 text-gray-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 flex items-center justify-center"
                              onClick={() => {
                                const media = filteredMedia[selectedMediaIndex];
                                if (media && media.type === 'video' && media.youtubeUrl) {
                                  if (isVideoPlaying) {
                                    sendYouTubeCommand('pauseVideo');
                                    setIsVideoPlaying(false);
                                  } else {
                                    sendYouTubeCommand('playVideo');
                                    setIsVideoPlaying(true);
                                  }
                                }
                              }}
                              aria-label={isVideoPlaying ? 'Mettre en pause' : 'Lire la vidéo'}
                            >
                              {isVideoPlaying ? (
                                <Pause className="w-4.5 h-4.5" />
                              ) : (
                                <Play className="w-4.5 h-4.5 ml-0.5" />
                              )}
                            </button>

                            <button
                              type="button"
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/60 bg-white/80 text-gray-900 hover:bg-white flex items-center justify-center`}
                              onClick={() => { 
                                const newTime = Math.max(0, (youtubeUiCurrentTime || youtubeCurrentTime || 0) - 10);
                                seekYouTube(newTime);
                                console.log('⏪ YouTube -10s, temps:', youtubeUiCurrentTime, '→', newTime);
                              }}
                              disabled={false}
                              aria-label="Reculer de 10 secondes"
                            >
                              <Rewind className="w-4.5 h-4.5" />
                            </button>

                            <button
                              type="button"
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/60 bg-white/80 text-gray-900 hover:bg-white flex items-center justify-center`}
                              onClick={() => { 
                                const base = (youtubeUiCurrentTime || youtubeCurrentTime || 0);
                                const newTime = Math.min(youtubeDuration || 0, base + 10);
                                seekYouTube(newTime);
                                console.log('⏩ YouTube +10s, temps:', youtubeUiCurrentTime, '→', newTime);
                              }}
                              disabled={false}
                              aria-label="Avancer de 10 secondes"
                            >
                              <FastForward className="w-4.5 h-4.5" />
                            </button>

                            <div className="ml-1.5 text-white text-[11px] sm:text-xs whitespace-nowrap" aria-live="polite">
                              {formatSeconds(youtubeUiCurrentTime)} / {formatSeconds(youtubeDuration)}
                            </div>
                          </div>

                          <input
                            type="range"
                            min={0}
                            max={Math.max(youtubeDuration || 0, 1)}
                            step={0.1}
                            value={Math.min(youtubeUiCurrentTime, youtubeDuration || 0)}
                            onInput={(e) => {
                              const val = Number((e.target as HTMLInputElement).value);
                              seekYouTube(val);
                              setYoutubeUiCurrentTime(val);
                            }}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              // Débloquer la seekbar même avec controls=0 en utilisant seekTo(seconds, allowSeekAhead)
                              seekYouTube(val);
                              setYoutubeUiCurrentTime(val);
                              console.log('⏱️ YouTube seek vers:', val, 'secondes (durée:', youtubeDuration, 's)');
                            }}
                            aria-label="Barre de progression vidéo"
                            aria-valuemin={0}
                            aria-valuemax={Math.max(youtubeDuration || 0, 1)}
                            aria-valuenow={Math.min(youtubeUiCurrentTime, youtubeDuration || 0)}
                            aria-valuetext={`${formatSeconds(youtubeUiCurrentTime)} sur ${formatSeconds(youtubeDuration)}`}
                            className="mt-2 w-full h-2 rounded-full appearance-none cursor-pointer bg-white/20 shadow-inner"
                            style={{
                              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.95) ${((youtubeDuration || 0) > 0 ? (Math.min(youtubeUiCurrentTime, youtubeDuration) / (youtubeDuration || 1)) * 100 : 0)}%, rgba(255,255,255,0.25) ${((youtubeDuration || 0) > 0 ? (Math.min(youtubeUiCurrentTime, youtubeDuration) / (youtubeDuration || 1)) * 100 : 0)}%)`,
                              backdropFilter: 'saturate(120%) blur(2px)'
                            }}
                          />
                        </div>

                        <iframe
                          id="youtube-player"
                          className={`w-full h-full rounded-[2rem] transition-opacity duration-200 ${(youtubeReady || isVideoPlaying) ? 'opacity-100' : 'opacity-0'}`}
                          key={`yt-${currentMedia.youtubeUrl.split('v=')[1]?.split('&')[0]}`}
                          src={`https://www.youtube.com/embed/${currentMedia.youtubeUrl.split('v=')[1]?.split('&')[0]}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1&controls=0&disablekb=1&showinfo=0&iv_load_policy=3&playsinline=1&fs=0&origin=${window.location.origin}`}
                          title={currentMedia.title}
                          frameBorder="0"
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          onLoad={() => {
                            // Dès que l'iframe est chargée, on enregistre les listeners pour éviter la latence
                            try {
                              // Handshake requis pour recevoir infoDelivery
                              const iframe = getYouTubePlayer();
                              if (iframe && iframe.contentWindow) {
                                iframe.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: 1 }), '*');
                              }
                              sendYouTubeCommand('addEventListener', 'onReady');
                              sendYouTubeCommand('addEventListener', 'onStateChange');
                              sendYouTubeCommand('addEventListener', 'infoDelivery');
                              // Demander immédiatement les infos de durée/temps courant
                              sendYouTubeCommand('getDuration');
                              sendYouTubeCommand('getCurrentTime');
                            } catch {}
                          }}
                        ></iframe>
                      </div>
                    ) : currentMedia && currentMedia.type === 'video' && currentMedia.mediaUrl ? (
                      <div className="relative w-full h-full group/video">
                        {/* Première frame en couverture tant que la vidéo n'est pas en lecture */}
                        {!isVideoPlaying && !isVideoLoading && !videoError && (
                          <div className="absolute inset-0 z-0">
                            <VideoFirstFrame
                              src={getValidVideoUrl(currentMedia.mediaUrl)}
                              poster={currentMedia.thumbnail}
                              alt={`Couverture - ${currentMedia.title}`}
                              className="w-full h-full object-contain"
                              width={1280}
                              height={720}
                              style={{ background: 'transparent' }}
                            />
                          </div>
                        )}
                        {/* Indicateur de chargement amélioré */}
                        {isVideoLoading && (
                          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm">
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <p className="text-white text-sm font-medium">
                                {loadingTimeout ? 'Chargement lent...' : 'Chargement de la vidéo...'}
                              </p>
                              {loadingTimeout && (
                                <p className="text-white/70 text-xs text-center max-w-xs">
                                  Chargement en cours...<br />
                                  Les vidéos Supabase peuvent prendre quelques secondes supplémentaires.
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Overlay Play button pour vidéos modernisé 2025 */}
                        {!isVideoPlaying && !videoError && !isVideoLoading && videoRef.current && videoRef.current.paused && (
                          <button
                            type="button"
                            className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer focus:outline-none"
                            onClick={() => {
                              if (videoRef.current) {
                                try {
                                  // FIXED by audit - Vérification supplémentaire avant lecture
                                  if (videoRef.current.readyState >= 2) {
                                    videoRef.current.play().catch((error) => {
                                      console.error('❌ Erreur lors du démarrage de la vidéo:', error);
                                      setVideoError(true);
                                    });
                                  } else {
                                    console.warn('⚠️ Vidéo pas encore prête pour la lecture');
                                    setIsVideoLoading(true);
                                  }
                                } catch (error) {
                                  console.error('❌ Erreur lors de l\'interaction avec la vidéo:', error);
                                  setVideoError(true);
                                }
                              } else {
                                console.warn('⚠️ videoRef.current non défini pour le bouton play');
                              }
                            }}
                            aria-label={`Lire la vidéo ${currentMedia.title}`}
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/95 backdrop-blur-lg rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] border-4 border-white/80">
                              <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-900 hover:text-white ml-1 sm:ml-1.5 transition-colors duration-300" aria-hidden="true" />
                            </div>
                          </button>
                        )}

                        {/* Overlay de contrôle pendant la lecture - apparaît au survol */}
                        {isVideoPlaying && !videoError && videoRef.current && !videoRef.current.paused && (
                          <div
                            className="absolute inset-0 z-10 cursor-pointer opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 bg-black/20"
                            style={{ pointerEvents: 'none' }}
                            onClick={() => {
                              if (videoRef.current) {
                                try {
                                  videoRef.current.pause();
                                  console.log('⏸️ Pause via overlay');
                                } catch (error) {
                                  console.error('❌ Erreur lors de la pause via overlay:', error);
                                }
                              } else {
                                console.warn('⚠️ videoRef.current non défini pour le bouton pause');
                              }
                            }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-110 border-3 border-white/80">
                                <Pause className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-900 transition-colors duration-300" aria-hidden="true" />
                              </div>
                            </div>
                          </div>
                        )}

                        <video
                          ref={videoRef}
                          className="w-full h-full object-contain bg-black relative z-[1]"
                          playsInline
                          preload="metadata"
                          crossOrigin="anonymous"
                          src={getValidVideoUrl(currentMedia.mediaUrl)}
                          onPlay={handleVideoPlay}
                          onPause={handleVideoPause}
                          onEnded={handleVideoEnded}
                          onLoadStart={() => {
                            console.log('📥 Début du chargement de la vidéo...');
                            setVideoError(false);
                            setIsVideoLoading(true);
                            setLoadingTimeout(false);
                            
                            // Timeout de 15 secondes pour détecter un chargement lent (FIXED by audit)
                            setTimeout(() => {
                              if (isVideoLoading) {
                                setLoadingTimeout(true);
                                console.log('⚠️ Chargement lent détecté (>15s)');
                              }
                            }, 15000);
                          }}
                          onLoadedMetadata={(e) => {
                            const el = e.currentTarget;
                            setDuration(el.duration || 0);
                            console.log('✅ Métadonnées vidéo chargées, durée:', el.duration);
                            setIsVideoLoading(false);
                            setLoadingTimeout(false);
                          }}
                          onCanPlay={() => {
                            console.log('🎬 Vidéo prête à être lue');
                            setVideoError(false);
                            setIsVideoLoading(false);
                            setLoadingTimeout(false);
                            
                            // Reset le compteur de retry en cas de succès
                            const currentUrl = getValidVideoUrl(currentMedia.mediaUrl);
                            if (currentUrl) {
                              retryCount.current.delete(currentUrl);
                              
                              // Mesurer le temps de chargement final
                              const loadTime = performanceMetrics.current.loadTimes.get(currentUrl);
                              if (loadTime) {
                                console.log(`📊 Performance finale pour "${currentMedia.title}": ${loadTime.toFixed(2)}ms`);
                              }
                            }
                          }}
                          onWaiting={() => {
                            console.log('⏳ Vidéo en attente de données...');
                            // Ne pas forcer isLoading=true ici pour éviter les conflits
                          }}
                          onCanPlayThrough={() => {
                            console.log('🎯 Vidéo peut être lue entièrement');
                            setIsVideoLoading(false);
                          }}
                          onTimeUpdate={(e) => {
                            const el = e.currentTarget;
                            setCurrentTime(el.currentTime || 0);
                          }}
                          onError={(e) => {
                            console.error('❌ Erreur de lecture vidéo Supabase:', {
                              title: currentMedia.title,
                              url: getValidVideoUrl(currentMedia.mediaUrl),
                              error: e,
                              timestamp: new Date().toISOString(),
                              readyState: e.currentTarget.readyState,
                              networkState: e.currentTarget.networkState
                            });
                            
                            setVideoError(true);
                            setIsVideoPlaying(false);
                            setIsVideoLoading(false);
                            
                            // Retry automatique avec backoff exponentiel (FIXED by audit)
                            const currentUrl = getValidVideoUrl(currentMedia.mediaUrl);
                            if (currentUrl && videoRef.current) {
                              const retries = retryCount.current.get(currentUrl) || 0;
                              if (retries < 3) {
                                const delay = Math.pow(2, retries) * 1000; // 1s, 2s, 4s
                                console.log(`🔄 Retry ${retries + 1}/3 dans ${delay}ms pour:`, currentUrl);
                                
                                setTimeout(() => {
                                  if (videoRef.current) {
                                    videoRef.current.load();
                                    retryCount.current.set(currentUrl, retries + 1);
                                  }
                                }, delay);
                              } else {
                                console.error('❌ Échec définitif après 3 tentatives pour:', currentUrl);
                                retryCount.current.delete(currentUrl);
                                
                                // Reset simple du player
                                videoRef.current.pause();
                                videoRef.current.currentTime = 0;
                              }
                            }
                          }}
                          aria-label={`Vidéo: ${currentMedia.title}`}
                        >
                          {getValidVideoUrl(currentMedia.mediaUrl) && (
                            <source src={getValidVideoUrl(currentMedia.mediaUrl)} type="video/mp4" />
                          )}
                          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
                            <img src={currentMedia.thumbnail} alt={`Aperçu vidéo - ${currentMedia.title} - Projet audiovisuel`} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        </video>

                        {videoError && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 text-white z-20">
                            <p className="text-sm font-medium px-4 text-center">Impossible de charger la vidéo. Vous pouvez réessayer.</p>
                            <button
                              type="button"
                              className="px-4 py-2 rounded-lg bg-white/90 text-gray-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary/60"
                              onClick={() => {
                                setVideoError(false);
                                if (videoRef.current) {
                                  videoRef.current.load();
                                }
                              }}
                            >
                              Réessayer
                            </button>
                          </div>
                        )}

                        {/* Contrôles vidéo accessibles avec masquage automatique */}
                        <div 
                          className={`absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500 ${
                            showVideoControls ? 'opacity-100' : 'opacity-0'
                          }`}
                          onMouseEnter={() => {
                            setShowVideoControls(true);
                            console.log('🎮 Contrôles affichés (survol)');
                          }}
                          onMouseLeave={() => {
                            if (isVideoPlaying) {
                              setTimeout(() => {
                                setShowVideoControls(false);
                                console.log('🎮 Contrôles masqués (fin survol)');
                              }, 1000);
                            }
                          }}
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/65 backdrop-blur-xl rounded-2xl px-2.5 sm:px-4 py-2 sm:py-2.5 border border-white/15 shadow-[0_8px_22px_rgba(0,0,0,0.35)]">
                            <button
                              type="button"
                              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 text-gray-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 flex items-center justify-center"
                            onClick={() => {
                              // FIXED by audit - Contrôle universel pour YouTube et Supabase
                              const media = filteredMedia[selectedMediaIndex];
                              if (media && media.type === 'video' && media.youtubeUrl) {
                                // Contrôle YouTube
                                if (isVideoPlaying) {
                                  sendYouTubeCommand('pauseVideo');
                                  setIsVideoPlaying(false);
                                } else {
                                  sendYouTubeCommand('playVideo');
                                  setIsVideoPlaying(true);
                                }
                              } else if (videoRef.current) {
                                // Contrôle Supabase
                                try {
                                  if (videoRef.current.paused) {
                                    videoRef.current.play().catch((error) => {
                                      console.error('❌ Erreur lors du démarrage:', error);
                                      setVideoError(true);
                                    });
                                  } else {
                                    videoRef.current.pause();
                                  }
                                } catch (error) {
                                  console.error('❌ Erreur lors de l\'interaction avec la vidéo:', error);
                                  setVideoError(true);
                                }
                              } else {
                                console.warn('⚠️ videoRef.current non défini');
                              }
                            }}
                              aria-label={isVideoPlaying ? 'Mettre en pause' : 'Lire la vidéo'}
                            >
                              {isVideoPlaying ? (
                                <Pause className="w-4.5 h-4.5" />
                              ) : (
                                <Play className="w-4.5 h-4.5 ml-0.5" />
                              )}
                            </button>

                            <button
                              type="button"
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                                (() => {
                                  const media = filteredMedia[selectedMediaIndex];
                                  return (media && media.type === 'video' && media.youtubeUrl && youtubeDuration > 0) || (videoRef.current && videoRef.current.readyState >= 2 && duration > 0);
                                })()
                                  ? 'bg-white/80 text-gray-900 hover:bg-white flex items-center justify-center'
                                  : 'bg-gray-300/50 text-gray-500 cursor-not-allowed flex items-center justify-center'
                              }`}
                              onClick={() => { 
                                // FIXED by audit - Contrôle universel -10s pour YouTube et Supabase
                                const media = filteredMedia[selectedMediaIndex];
                                if (media && media.type === 'video' && media.youtubeUrl) {
                                  // Contrôle YouTube
                                  const newTime = Math.max(0, youtubeCurrentTime - 10);
                                  seekYouTube(newTime);
                                  console.log('⏪ YouTube -10s, temps:', youtubeCurrentTime, '→', newTime);
                                } else if (videoRef.current && duration > 0 && videoRef.current.readyState >= 2) {
                                  // Contrôle Supabase
                                  try {
                                    const currentTime = videoRef.current.currentTime;
                                    const newTime = Math.max(0, currentTime - 10);
                                    videoRef.current.currentTime = newTime;
                                    setCurrentTime(newTime);
                                    console.log('⏪ Supabase -10s, temps:', currentTime, '→', newTime, '(durée:', duration, 's)');
                                  } catch (error) {
                                    console.error('❌ Erreur lors du recul de 10s:', error);
                                    setCurrentTime(videoRef.current.currentTime || 0);
                                  }
                                } else {
                                  const media = filteredMedia[selectedMediaIndex];
                                  const reason = (media && media.type === 'video' && media.youtubeUrl) ? 'YouTube pas encore chargé' :
                                                !videoRef.current ? 'videoRef non défini' : 
                                                duration === 0 ? 'durée non définie' : 
                                                'vidéo pas encore chargée (readyState: ' + videoRef.current?.readyState + ')';
                                  console.warn('⚠️ Bouton -10s désactivé:', reason);
                                }
                              }}
                              disabled={(() => {
                                const media = filteredMedia[selectedMediaIndex];
                                return (media && media.type === 'video' && media.youtubeUrl && youtubeDuration === 0) || (!videoRef.current || videoRef.current.readyState < 2 || duration === 0);
                              })()}
                              aria-label="Reculer de 10 secondes"
                            >
                              <Rewind className="w-4.5 h-4.5" />
                            </button>
                            <button
                              type="button"
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                                (() => {
                                  const media = filteredMedia[selectedMediaIndex];
                                  return (media && media.type === 'video' && media.youtubeUrl && youtubeDuration > 0) || (videoRef.current && videoRef.current.readyState >= 2 && duration > 0);
                                })()
                                  ? 'bg-white/80 text-gray-900 hover:bg-white flex items-center justify-center'
                                  : 'bg-gray-300/50 text-gray-500 cursor-not-allowed flex items-center justify-center'
                              }`}
                              onClick={() => { 
                                // FIXED by audit - Contrôle universel +10s pour YouTube et Supabase
                                const media = filteredMedia[selectedMediaIndex];
                                if (media && media.type === 'video' && media.youtubeUrl) {
                                  // Contrôle YouTube
                                  const newTime = Math.min(youtubeDuration, youtubeCurrentTime + 10);
                                  seekYouTube(newTime);
                                  console.log('⏩ YouTube +10s, temps:', youtubeCurrentTime, '→', newTime);
                                } else if (videoRef.current && duration > 0 && videoRef.current.readyState >= 2) {
                                  // Contrôle Supabase
                                  try {
                                    const currentTime = videoRef.current.currentTime;
                                    const newTime = Math.min(duration, currentTime + 10);
                                    videoRef.current.currentTime = newTime;
                                    setCurrentTime(newTime);
                                    console.log('⏩ Supabase +10s, temps:', currentTime, '→', newTime, '(durée:', duration, 's)');
                                  } catch (error) {
                                    console.error('❌ Erreur lors de l\'avance de 10s:', error);
                                    setCurrentTime(videoRef.current.currentTime || 0);
                                  }
                                } else {
                                  const media = filteredMedia[selectedMediaIndex];
                                  const reason = (media && media.type === 'video' && media.youtubeUrl) ? 'YouTube pas encore chargé' :
                                                !videoRef.current ? 'videoRef non défini' : 
                                                duration === 0 ? 'durée non définie' : 
                                                'vidéo pas encore chargée (readyState: ' + videoRef.current?.readyState + ')';
                                  console.warn('⚠️ Bouton +10s désactivé:', reason);
                                }
                              }}
                              disabled={(() => {
                                const media = filteredMedia[selectedMediaIndex];
                                return (media && media.type === 'video' && media.youtubeUrl && youtubeDuration === 0) || (!videoRef.current || videoRef.current.readyState < 2 || duration === 0);
                              })()}
                              aria-label="Avancer de 10 secondes"
                            >
                              <FastForward className="w-4.5 h-4.5" />
                            </button>

                            <div className="ml-1.5 text-white text-[11px] sm:text-xs whitespace-nowrap" aria-live="polite">
                              {(() => {
                                const media = filteredMedia[selectedMediaIndex];
                                if (media && media.type === 'video' && media.youtubeUrl) {
                                  return (
                                    <>
                                      {new Date(youtubeCurrentTime * 1000).toISOString().substring(14, 19)} / {new Date((youtubeDuration || 0) * 1000).toISOString().substring(14, 19)}
                                    </>
                                  );
                                } else {
                                  return (
                                    <>
                                      {new Date(currentTime * 1000).toISOString().substring(14, 19)} / {new Date((duration || 0) * 1000).toISOString().substring(14, 19)}
                                    </>
                                  );
                                }
                              })()}
                            </div>
                          </div>

                          <input
                            type="range"
                            min={0}
                            max={(() => {
                              const media = filteredMedia[selectedMediaIndex];
                              return media && media.type === 'video' && media.youtubeUrl ? Math.max(youtubeDuration || 0, 1) : Math.max(duration || 0, 1);
                            })()}
                            step={0.1}
                            value={(() => {
                              const media = filteredMedia[selectedMediaIndex];
                              return media && media.type === 'video' && media.youtubeUrl ? Math.min(youtubeCurrentTime, youtubeDuration || 0) : Math.min(currentTime, duration || 0);
                            })()}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              const media = filteredMedia[selectedMediaIndex];
                              
                              if (media && media.type === 'video' && media.youtubeUrl) {
                                // Contrôle YouTube
                                seekYouTube(val);
                                console.log('⏱️ YouTube seek vers:', val, 'secondes (durée:', youtubeDuration, 's)');
                              } else {
                                // Contrôle Supabase
                                setCurrentTime(val);
                                
                                if (videoRef.current && duration > 0 && videoRef.current.readyState >= 2) {
                                  try {
                                    const clampedVal = Math.max(0, Math.min(val, duration));
                                    videoRef.current.currentTime = clampedVal;
                                    setCurrentTime(clampedVal);
                                    console.log('⏱️ Supabase seek vers:', clampedVal, 'secondes (durée:', duration, 's)');
                                  } catch (error) {
                                    console.error('❌ Erreur lors du seek:', error);
                                    setCurrentTime(videoRef.current.currentTime || 0);
                                  }
                                } else if (videoRef.current && duration === 0) {
                                  console.warn('⚠️ Impossible de seeker: durée non définie (readyState:', videoRef.current.readyState, ')');
                                } else if (!videoRef.current) {
                                  console.warn('⚠️ Impossible de seeker: videoRef non défini');
                                } else {
                                  console.warn('⚠️ Impossible de seeker: vidéo pas encore chargée (readyState:', videoRef.current?.readyState, ')');
                                }
                              }
                            }}
                            aria-label="Barre de progression vidéo"
                            aria-valuemin={0}
                            aria-valuemax={(() => {
                              const media = filteredMedia[selectedMediaIndex];
                              return media && media.type === 'video' && media.youtubeUrl ? Math.max(youtubeDuration || 0, 1) : Math.max(duration || 0, 1);
                            })()}
                            aria-valuenow={(() => {
                              const media = filteredMedia[selectedMediaIndex];
                              return media && media.type === 'video' && media.youtubeUrl ? Math.min(youtubeCurrentTime, youtubeDuration || 0) : Math.min(currentTime, duration || 0);
                            })()}
                            aria-valuetext={(() => {
                              const media = filteredMedia[selectedMediaIndex];
                              const cur = media && media.type === 'video' && media.youtubeUrl ? youtubeCurrentTime : currentTime;
                              const dur = media && media.type === 'video' && media.youtubeUrl ? youtubeDuration : duration;
                              return `${formatSeconds(cur)} sur ${formatSeconds(dur)}`;
                            })()}
                            className="mt-2 w-full h-2 rounded-full appearance-none cursor-pointer bg-white/20 shadow-inner"
                            style={{
                              backgroundImage: (() => {
                                const media = filteredMedia[selectedMediaIndex];
                                const dur = media && media.type === 'video' && media.youtubeUrl ? (youtubeDuration || 0) : (duration || 0);
                                const cur = media && media.type === 'video' && media.youtubeUrl ? Math.min(youtubeCurrentTime, dur) : Math.min(currentTime, dur);
                                const pct = dur > 0 ? (cur / dur) * 100 : 0;
                                return `linear-gradient(to right, rgba(255,255,255,0.95) ${pct}%, rgba(255,255,255,0.25) ${pct}%)`;
                              })(),
                              backdropFilter: 'saturate(120%) blur(2px)'
                            }}
                          />
                        </div>

                        {/* Gestes mobiles: tap pour play/pause */}
                        <div
                          className="absolute inset-0 z-10 sm:hidden"
                          style={{ pointerEvents: isVideoPlaying ? 'none' : 'auto' }}
                          onClick={() => { if (videoRef.current) { videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause(); } }}
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full h-full group cursor-pointer" role="button" tabIndex={0} aria-label={`Voir la photo ${currentMedia.title} en grand`} onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openImageModal(currentMedia.thumbnail, currentMedia.caption);
                        }
                      }}>
                        <img
                          src={currentMedia.thumbnail}
                          alt={`Photo professionnelle - ${currentMedia.title} - ${currentMedia.caption.substring(0, 80)}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                          onClick={() => openImageModal(currentMedia.thumbnail, currentMedia.caption)}
                        />

                        {/* Overlay pour agrandir modernisé */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-black/30 backdrop-blur-sm">
                          <div
                            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white/95 backdrop-blur-lg rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] border-4 border-white/80"
                            onClick={() => openImageModal(currentMedia.thumbnail, currentMedia.caption)}
                          >
                            <Eye className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-900" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Informations du projet modernisées 2025 - Design élégant et aéré */}
                  <div className="relative max-w-4xl mx-auto px-2 sm:px-0" role="article" aria-labelledby="project-title">
                    {/* Halo de fond subtil */}
                    <div className="absolute -inset-8 bg-gradient-to-br from-primary/10 via-secondary/8 to-primary/10 rounded-[3rem] blur-3xl opacity-60"></div>

                    <div className="relative bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-10 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_48px_rgba(59,130,246,0.12),0_0_60px_rgba(59,130,246,0.08)] transition-all duration-500">
                      <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                        {/* Icône du type de projet - Plus discrète */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl sm:rounded-2xl flex items-center justify-center border border-primary/25 flex-shrink-0 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                          {currentMedia.type === 'video' ? (
                            <Video className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                          ) : (
                            <Camera className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Titre */}
                          <h3 id="project-title" className="font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-5 leading-tight tracking-tight" style={{ fontSize: 'clamp(1rem, 3.5vw, 1.5rem)', wordBreak: 'break-word' }}>
                            {currentMedia.title}
                          </h3>

                          {/* Séparateur subtil */}
                          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3 sm:mb-4 lg:mb-5"></div>

                          {/* Description */}
                          <div className="space-y-2 px-4 sm:px-6 text-left mb-3 sm:mb-4 lg:mb-5">
                            {currentMedia.caption.split('\n\n').map((paragraph, index) => {
                              if (paragraph.startsWith('🎬') || paragraph.startsWith('📹') || paragraph.startsWith('🤝') || paragraph.startsWith('📸')) {
                                return (
                                  <div key={index} className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-gray-200/60">
                                    <p className="text-[#081F2C] font-bold text-sm sm:text-base">
                                      {paragraph}
                                    </p>
                                  </div>
                                );
                              } else {
                                return (
                                  <p key={index} className="text-[#3C4F62] text-[15px] leading-[1.6]">
                                    {paragraph}
                                  </p>
                                );
                              }
                            })}
                          </div>

                          {/* Tags en bas */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-br from-primary/12 to-secondary/12 text-primary rounded-full font-semibold border border-primary/20 hover:border-primary/30 hover:shadow-sm transition-all duration-300 whitespace-nowrap">
                              {currentMedia.type === 'video' ? 'Production audiovisuelle' : 'Photographie professionnelle'}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="font-semibold text-gray-600 whitespace-nowrap">GND Consulting</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'photo' && (
          <div
            id="portfolio-photos"
            role="tabpanel"
            aria-labelledby="tab-photos"
            className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-visible animate-fade-in"
            style={{ background: 'linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 50%, #fef3f2 100%)' }}
          >
            <style>{`
              /* === Responsive mobile – Section PHOTOS uniquement === */
              @media (max-width: 640px) {
                /* Grille en 1 colonne, marges respirantes */
                #portfolio-photos #portfolio-cards {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 12px;
                }

                /* Carte photo : pas de hauteur fixe en mobile, laisse le contenu respirer */
                #portfolio-photos #portfolio-cards > div.relative.group {
                  min-height: 0 !important;
                  height: auto !important;
                  aspect-ratio: unset !important;
                }

                /* Conteneur interne : hauteur auto */
                #portfolio-photos #portfolio-cards > div.relative.group > div.relative.h-full {
                  height: auto !important;
                }

                /* Image : largeur 100%, hauteur auto pour éviter les crops */
                #portfolio-photos #portfolio-cards img {
                  width: 100%;
                  height: auto !important;
                  object-fit: cover;
                  display: block;
                }

                /* Overlay / légende : ne coupe plus le texte, s'étend en bas de l'image */
                #portfolio-photos #portfolio-cards .absolute.inset-0.flex.flex-col {
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  top: auto !important;

                  /* Fond lisible sur photo */
                  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.75) 100%);

                  padding: 12px 14px !important;

                  /* Aligner en bas, pas centré */
                  justify-content: flex-end !important;
                  align-items: flex-start !important;

                  /* Laisser le texte sur plusieurs lignes */
                  white-space: normal;
                  overflow: visible !important;
                  text-overflow: unset;
                }

                /* Textes dans l'overlay : tailles adaptées mobile */
                #portfolio-photos #portfolio-cards .text-white.font-medium.text-center {
                  font-size: 13px !important;
                  line-height: 1.35 !important;
                  margin-bottom: 4px !important;
                  max-height: none !important;
                  overflow: visible !important;
                  text-align: left !important;
                }

                /* Titres H3 dans légende */
                #portfolio-photos #portfolio-cards h3.text-white {
                  margin: 0 0 6px 0 !important;
                  font-size: 15px !important;
                  font-weight: 700;
                  text-align: left !important;
                }

                /* Icône Eye : repositionner pour ne pas chevaucher texte */
                #portfolio-photos #portfolio-cards .absolute.inset-0 svg {
                  display: none !important;
                }

                /* Badge catégorie : conserver en haut à gauche */
                #portfolio-photos #portfolio-cards .absolute.top-2 {
                  position: absolute;
                  top: 8px;
                  left: 8px;
                  z-index: 40;
                }
              }

              @media (min-width: 641px) and (max-width: 768px) {
                /* Tablette : léger ajustement padding uniquement */
                #portfolio-photos #portfolio-cards .absolute.inset-0.flex.flex-col {
                  padding: 1rem !important;
                }

                #portfolio-photos #portfolio-cards .text-white.font-medium.text-center {
                  font-size: 0.75rem !important;
                  line-height: 1.35 !important;
                }
              }
            `}</style>
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-slide-up">
                <h2 className="font-black text-gray-900 mb-3 sm:mb-4 tracking-tight uppercase" id="portfolio-photo" style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', wordBreak: 'break-word' }}>
                  Photographie Professionnelle
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed px-4" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)' }}>
                  Portraits corporate, créations artistiques et reportages : nos shootings photos capturent l'essence de votre identité visuelle
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 lg:mb-12 animate-slide-up px-4" style={{ animationDelay: '0.1s' }}>
                {(['TOUS', 'CRÉATIONS', 'AMBIANCES', 'PORTRAITS'] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setPhotoFilter(category)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                      photoFilter === category
                        ? 'bg-blue-400 text-gray-900 shadow-md scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                    }`}
                    style={{ fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)' }}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div id="portfolio-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto px-2" role="region" aria-label="Galerie de photos professionnelles">
                {Object.values(photoCollections)
                  .flatMap(collection => collection.photos)
                  .filter(photo => photoFilter === 'TOUS' || photo.category === photoFilter)
                  .slice(0, 9)
                  .map((photo, index) => {
                    return (
                      <div
                        key={photo.id}
                        className="relative group cursor-pointer animate-scale-in min-h-[220px] xs:min-h-[260px] sm:min-h-[300px] md:min-h-[340px] hover:-translate-y-2 hover:scale-105 hover:z-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-primary/50 z-10"
                        style={{
                          animationDelay: `${index * 0.05}s`,
                          aspectRatio: '16/9'
                        }}
                        onClick={() => openImageModal(photo.thumbnail, photo.caption)}
                        role="button"
                        aria-label={`Projet photo ${photo.title} - ${photo.category}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openImageModal(photo.thumbnail, photo.caption);
                          }
                        }}
                      >
                        <div className="relative h-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-visible">
                          <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/40 group-hover:from-black/40 group-hover:to-black/60 transition-all duration-300 ease-in-out z-10 rounded-2xl overflow-hidden" />

                          <img
                            src={photo.thumbnail}
                            alt={`Photo ${photo.category} - ${photo.title} - Photographie professionnelle GND`}
                            loading={index < 6 ? "eager" : "lazy"}
                            fetchPriority={index < 3 ? "high" : "auto"}
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-2xl"
                          />

                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-30 p-4 sm:p-6 md:p-8">
                            <Eye className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white mb-2 sm:mb-3 drop-shadow-md flex-shrink-0" aria-hidden="true" />
                            <div className="w-full max-w-full overflow-visible">
                              <h3 className="text-white font-medium text-center mb-1 sm:mb-2 drop-shadow-md whitespace-normal max-w-full" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                                {photo.title}
                              </h3>
                              {photo.caption.split('\n\n').map((paragraph, idx) => (
                                <p
                                  key={idx}
                                  className={`text-white font-medium text-center drop-shadow-md whitespace-normal max-w-full ${
                                    paragraph.startsWith('📸')
                                      ? 'mt-2 sm:mt-3 opacity-90 italic'
                                      : 'mb-1'
                                  }`}
                                  style={{ fontSize: paragraph.startsWith('📸') ? 'clamp(0.65rem, 1.6vw, 0.7rem)' : 'clamp(0.75rem, 1.8vw, 0.8rem)', wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                >
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>

                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-30">
                            <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white text-gray-900 font-bold rounded-full shadow-md uppercase tracking-wide whitespace-nowrap" style={{ fontSize: 'clamp(0.6rem, 1.6vw, 0.7rem)' }}>
                              {photo.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {selectedImage && (() => {
                const allPhotos = Object.values(photoCollections)
                  .flatMap(c => c.photos)
                  .filter(photo => photoFilter === 'TOUS' || photo.category === photoFilter);
                const currentIndex = allPhotos.findIndex(p => p.thumbnail === selectedImage);
                const currentPhoto = allPhotos[currentIndex];

                return (
                  <div
                    ref={lightboxRef}
                    className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-8 animate-fade-in"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="photo-lightbox-title"
                    onClick={closeImageModal}
                  >
                    <button
                      ref={lightboxCloseBtnRef}
                      className="absolute top-8 right-8 w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-[210] group cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeImageModal();
                      }}
                      aria-label="Fermer la photo agrandie"
                    >
                      <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" aria-hidden="true" />
                    </button>

                    <button
                      className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out hover:scale-105 z-[210]"
                      onClick={(e) => {
                        e.stopPropagation();
                        const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
                        openImageModal(allPhotos[prevIndex].thumbnail, allPhotos[prevIndex].caption);
                      }}
                      aria-label="Photo précédente"
                    >
                      <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-md" aria-hidden="true" style={{ minWidth: '24px', minHeight: '24px', maxWidth: '32px', maxHeight: '32px' }} />
                    </button>

                    <button
                      className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out hover:scale-105 z-[210]"
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIndex = (currentIndex + 1) % allPhotos.length;
                        openImageModal(allPhotos[nextIndex].thumbnail, allPhotos[nextIndex].caption);
                      }}
                      aria-label="Photo suivante"
                    >
                      <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-md" aria-hidden="true" style={{ minWidth: '24px', minHeight: '24px', maxWidth: '32px', maxHeight: '32px' }} />
                    </button>

                    <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                      <div className="relative">
                        <img
                          src={selectedImage}
                          alt={currentPhoto?.title ? `Photo agrandie - ${currentPhoto.title} - ${currentPhoto.category} - Portfolio GND Consulting` : 'Image agrandie - Portfolio photographie professionnelle'}
                          className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                        />

                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm font-bold rounded-full shadow-xl">
                            {currentIndex + 1} / {allPhotos.length}
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 bg-gradient-to-br from-[#D0F2FE]/80 via-white/70 to-blue-50/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 lightbox-info">
                        <h3 id="photo-lightbox-title" className="text-gray-900 text-3xl font-black mb-6 uppercase tracking-wide text-center">
                          {currentPhoto?.title}
                        </h3>
                        <div className="space-y-4">
                          {selectedCaption.split('\n\n').map((paragraph, index) => {
                            if (paragraph.startsWith('📸')) {
                              return (
                                <p key={index} className="text-gray-700 text-base italic text-center mt-8 pt-4 border-t border-gray-300/30">
                                  {paragraph}
                                </p>
                              );
                            } else {
                              return (
                                <p key={index} className="text-gray-800 text-lg leading-relaxed text-center">
                                  {paragraph}
                                </p>
                              );
                            }
                          })}
                        </div>
                      </div>

                      {/* Responsiveness: reduce bottom padding on very small screens only */}
                      <style>{`
                        @media (max-width: 360px) {
                          .lightbox-info { padding-bottom: 1.75rem !important; }
                        }
                      `}</style>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

    </section>
  );
}