import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { VideoFirstFrame } from './VideoFirstFrame';
import { Play, Pause, Camera, Video, X, ChevronLeft, ChevronRight, Eye, ChevronUp, ChevronDown, Rewind, FastForward } from 'lucide-react';
import { useProjects } from '../hooks/useSupabase';
import clsx from 'clsx';

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

// Composant VideoPlayer pour afficher les vidéos
interface VideoPlayerProps {
  currentMedia: MediaItem | undefined;
  currentIndex?: number;
}

interface HighlightCardProps {
  content: string;
}

interface CreditsCardProps {
  currentMedia: MediaItem | undefined;
}

const getYouTubeEmbedUrl = (rawUrl: string | undefined): string => {
  if (!rawUrl) return '';

  try {
    const url = new URL(rawUrl);

    // Gestion des URL courtes youtu.be
    if (url.hostname.includes('youtu.be')) {
      const videoId = url.pathname.replace('/', '');
      const startSeconds = url.searchParams.get('t') || url.searchParams.get('start');
      const startQuery = startSeconds ? `&start=${encodeURIComponent(startSeconds)}` : '';
      return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${startQuery}`;
    }

    // URL déjà au format embed
    if (url.pathname.startsWith('/embed/')) {
      const separator = url.search ? '&' : '?';
      return `https://www.youtube-nocookie.com${url.pathname}${url.search}${separator}rel=0&modestbranding=1&enablejsapi=1`;
    }

    const videoId = url.searchParams.get('v');
    if (!videoId) return '';

    const startSeconds = url.searchParams.get('t') || url.searchParams.get('start');
    const startQuery = startSeconds ? `&start=${encodeURIComponent(startSeconds)}` : '';

    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${startQuery}`;
  } catch (error) {
    console.error('❌ Impossible de formater l’URL YouTube:', rawUrl, error);
    return '';
  }
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ currentMedia, currentIndex }) => {
  if (!currentMedia) return null;

  const youtubeEmbedUrl = getYouTubeEmbedUrl(currentMedia.youtubeUrl);

  return (
    <div className="relative w-full">
      <div className="relative w-full aspect-[16/9] max-h-[640px]">
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/45 to-white/0 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
          aria-hidden="true"
        />
        <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl">
          {typeof currentIndex === 'number' && currentIndex < 0 && (
            <span className="pointer-events-none absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-white shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-500" />
              Vidéo {String(currentIndex + 1).padStart(2, '0')}
            </span>
          )}
          {youtubeEmbedUrl ? (
            <iframe
              key={`${currentMedia.id}-youtube`}
              src={youtubeEmbedUrl}
              className="h-full w-full"
              title={currentMedia.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : currentMedia.mediaUrl ? (
            <video
              src={currentMedia.mediaUrl}
              className="h-full w-full object-cover"
              controls
              preload="metadata"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900 text-white">
              Aucune vidéo disponible
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const highlightMeta: Record<string, { label: string; gradient: string; accent: string }> = {
  '🎬': {
    label: 'Réalisation',
    gradient: 'from-white/95 via-white to-white',
    accent: 'from-blue-500 to-blue-400'
  },
  '📹': {
    label: 'Production',
    gradient: 'from-white/95 via-white to-white',
    accent: 'from-blue-500 to-blue-400'
  },
  '🤝': {
    label: 'Collaboration',
    gradient: 'from-white/95 via-white to-white',
    accent: 'from-blue-500 to-blue-400'
  },
  '📸': {
    label: 'Photographie',
    gradient: 'from-white/95 via-white to-white',
    accent: 'from-amber-500 to-rose-400'
  },
  '⚡': {
    label: 'Point fort',
    gradient: 'from-white/95 via-white to-white',
    accent: 'from-blue-500 to-blue-400'
  },
  '🎥': {
    label: 'Direction',
    gradient: 'from-white/95 via-white to-white',
    accent: 'from-blue-500 to-blue-400'
  }
};

const HighlightCard: React.FC<HighlightCardProps> = ({ content }) => {
  const characters = Array.from(content);
  const emoji = characters[0] ?? '';
  const rest = characters.slice(1).join('').trim();
  const { label, gradient, accent } = highlightMeta[emoji] ?? {
    label: 'Crédit',
    gradient: 'from-white/95 via-white to-white',
    accent: 'from-slate-500 to-slate-400'
  };

  let details = rest;
  if (label && details.toLowerCase().startsWith(label.toLowerCase())) {
    details = details.slice(label.length).trim();
    details = details.replace(/^[:\-–—]+/, '').trim();
  }

  return (
    <div className={clsx(
      'relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br p-5 shadow-xl backdrop-blur',
      gradient
    )}>
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/40 opacity-70" />
      <div className="relative flex items-start gap-4">
        <span className={clsx(
          'flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-semibold text-white shadow-lg',
          accent
        )}>
          {emoji || '✦'}
        </span>
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-base font-semibold text-slate-800 sm:text-lg">
            {details || rest}
          </p>
        </div>
      </div>
    </div>
  );
};

const CreditsCard: React.FC<CreditsCardProps> = ({ currentMedia }) => {
  if (!currentMedia) return null;

  const signatureLabel = currentMedia.type === 'video' ? 'Production audiovisuelle' : 'Photographie professionnelle';

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/60 bg-white p-6 shadow-xl backdrop-blur">
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-500 to-blue-400 text-lg font-semibold text-white shadow-lg shadow-blue-600/25">
            ✨
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-500">
              Crédits principaux
            </span>
            <span className="mt-1 text-base font-semibold text-slate-800 sm:text-lg">
              {signatureLabel}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-3 rounded-xl border border-white/60 bg-white/90 px-5 py-3 text-base font-semibold text-slate-700 shadow-lg">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-400" />
            {signatureLabel}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-600 shadow-md shadow-blue-500/20">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-blue-500 to-blue-400" />
              GND Consulting
            </span>
            {currentMedia.tag && (
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-600 shadow-md">
                <span className="h-2 w-2 rounded-full bg-gradient-to-br from-slate-400 to-slate-600" />
                {currentMedia.tag}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
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
  description?: string;
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
  const quickNavRef = useRef<HTMLDivElement>(null);
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
  const [quickScrollState, setQuickScrollState] = useState({ canScrollLeft: false, canScrollRight: false });
  const { canScrollLeft, canScrollRight } = quickScrollState;
  const updateQuickScrollState = useCallback(() => {
    const container = quickNavRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = Math.max(scrollWidth - clientWidth, 0);

    setQuickScrollState({
      canScrollLeft: scrollLeft > 8,
      canScrollRight: scrollLeft < maxScrollLeft - 8
    });
  }, []);

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
    return document.querySelector('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]') as HTMLIFrameElement;
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

  useEffect(() => {
    const container = quickNavRef.current;
    if (!container) return;

    const handleResize = () => updateQuickScrollState();
    container.addEventListener('scroll', updateQuickScrollState, { passive: true });
    window.addEventListener('resize', handleResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => updateQuickScrollState());
      observer.observe(container);
    }

    updateQuickScrollState();

    return () => {
      container.removeEventListener('scroll', updateQuickScrollState);
      window.removeEventListener('resize', handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [updateQuickScrollState]);

  useLayoutEffect(() => {
    updateQuickScrollState();
  }, [filteredMedia.length, selectedMediaIndex, activeTab, updateQuickScrollState]);

  useEffect(() => {
    const container = quickNavRef.current;
    const activeThumb = thumbsRef.current[selectedMediaIndex];
    if (!container || !activeThumb) return;

    const containerRect = container.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();
    const leftThreshold = containerRect.left + 48;
    const rightThreshold = containerRect.right - 48;

    if (thumbRect.left < leftThreshold) {
      container.scrollBy({
        left: thumbRect.left - leftThreshold,
        behavior: 'smooth'
      });
    } else if (thumbRect.right > rightThreshold) {
      container.scrollBy({
        left: thumbRect.right - rightThreshold,
        behavior: 'smooth'
      });
    }
  }, [selectedMediaIndex, activeTab]);

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
              // Try nocookie first; if onReady fails, fallback handled by timer
              iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&controls=0&showinfo=0&iv_load_policy=3&origin=${window.location.origin}`;
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

  const scrollQuickSelection = (direction: 'prev' | 'next') => {
    const container = quickNavRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.85;
    const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth, 0);
    const current = container.scrollLeft;
    const target = direction === 'next'
      ? Math.min(current + scrollAmount, maxScrollLeft)
      : Math.max(current - scrollAmount, 0);

    if (Math.abs(target - current) < 1) {
      return;
    }

    container.scrollTo({
      left: target,
      behavior: 'smooth'
    });

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(updateQuickScrollState);
      window.setTimeout(updateQuickScrollState, 360);
    }
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
    const iframe = document.querySelector('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]') as HTMLIFrameElement;
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
          iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
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

  const currentMedia = filteredMedia[selectedMediaIndex];
  const videoParagraphs = React.useMemo(() => {
    if (!currentMedia?.caption) return [];
    return currentMedia.caption.split('\n\n').map((block) => block.trim()).filter(Boolean);
  }, [currentMedia?.caption]);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [currentMedia?.id]);

  const descriptionBlocks = React.useMemo(() => {
    if (videoParagraphs.length > 0) return videoParagraphs;
    if (currentMedia?.description) return [currentMedia.description];
    return [];
  }, [videoParagraphs, currentMedia?.description]);

  // Section Découvrir nos réalisations – État de chargement
  if (loading) {
    return (
      <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto relative">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-slate-600 mt-4">Chargement du portfolio...</p>
        </div>
      </section>
    );
  }

  // Section Découvrir nos réalisations – ID utilisé pour scroll via menu Portfolio
  return (
    <section id="realisations" className="py-32 px-6 lg:px-12 w-full relative overflow-hidden bg-background-alt" role="region" aria-label="Portfolio vidéos et photos">
      {/* Titre section — Stitch style */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20 relative z-10 max-w-[1400px] mx-auto reveal">
        <div className="mb-6 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted">
            Réalisations
          </span>
        </div>
        <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-text-main leading-[0.95]">
          Nos Réalisations Audiovisuelles
        </h2>
        <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto mt-4">
          Vidéos corporate, captations live, motion design : découvrez nos projets audiovisuels qui allient créativité et expertise technique
        </p>
      </div>

      {/* Menu segmenté (pills) — Stitch style */}
      <div id="portfolio-tabs" className="flex justify-center mb-8 sm:mb-12 relative z-40 max-w-[1400px] mx-auto pointer-events-auto px-2 sm:px-0 reveal delay-100">
        <div className="glass-nav p-1.5 sm:p-2 inline-flex flex-wrap items-center justify-center gap-1 sm:gap-2 max-w-[280px] sm:max-w-none" role="tablist">
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
              'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 pointer-events-auto text-xs sm:text-sm min-w-[120px] justify-center',
              activeTab === 'video'
                ? 'bg-black text-white'
                : 'bg-transparent hover:bg-gray-100 text-gray-600'
            )}
          >
            <Video className="w-3 h-3 sm:w-4 sm:h-4" />
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
              'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 pointer-events-auto text-xs sm:text-sm min-w-[120px] justify-center',
              activeTab === 'photo'
                ? 'bg-black text-white'
                : 'bg-transparent hover:bg-gray-100 text-gray-600'
            )}
          >
            <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">Photos</span>
          </button>
        </div>
      </div>

      {/* Interface principale : Roue en arc + Visionneuse - Pleine largeur */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto pointer-events-auto">
        {activeTab === 'video' && (
          <div
            id="portfolio-videos"
            role="tabpanel"
            aria-labelledby="tab-videos"
            className="relative py-10 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 overflow-visible animate-fade-in"
          >
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/35 via-white to-transparent blur-3xl" />
              <div className="absolute -bottom-44 -right-28 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200/35 via-white to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/98 via-white/95 to-white/90" />
              <div className="absolute inset-x-4 bottom-10 h-[320px] rounded-2xl bg-white/35 blur-3xl" />
            </div>

            <style>{`
              @media (max-width: 768px) {
                #portfolio-videos .video-focus-card {
                  margin-top: 1.5rem;
                }
                #portfolio-videos .video-grid {
                  gap: 2rem !important;
                }
              }
              @media (max-width: 640px) {
                #portfolio-tabs [role="tab"] {
                  flex: 1 1 calc(50% - 0.5rem);
                  text-align: center;
                }
                #portfolio-videos .quick-selection-shell {
                  padding-inline: 0.75rem !important;
                  gap: 0.75rem !important;
                }
                #portfolio-videos .quick-selection-shell > button[aria-label] {
                  height: 44px !important;
                  width: 44px !important;
                }
                #portfolio-videos .video-focus-card h3 {
                  font-size: 1.45rem !important;
                  line-height: 1.3 !important;
                }
                #portfolio-videos .video-description {
                  font-size: 0.95rem !important;
                }
              }
              @media (max-width: 520px) {
                #portfolio-videos .video-focus-card {
                  padding: 1.25rem !important;
                }
                #portfolio-videos .video-focus-card h3 {
                  font-size: 1.3rem !important;
                }
                #portfolio-videos .video-description {
                  font-size: 0.9rem !important;
                }
                #portfolio-videos .quick-selection-shell {
                  flex-wrap: wrap;
                  justify-content: center;
                }
                #portfolio-videos .quick-selection-shell > div.group {
                  order: 1;
                  width: 100%;
                  max-width: 100%;
                }
                #portfolio-videos .quick-selection-shell > button[aria-label] {
                  order: 2;
                  height: 44px !important;
                  width: 44px !important;
                }
                #portfolio-videos .quick-selection-shell > button[aria-label="Vidéos suivantes"] {
                  order: 3;
                }
                #portfolio-videos .quick-selection-shell > div.group button.group {
                  width: 132px !important;
                }
              }
              @media (max-width: 420px) {
                #portfolio-videos .quick-selection-shell {
                  row-gap: 0.75rem;
                }
                #portfolio-videos .quick-selection-shell > div.group button.group {
                  width: 120px !important;
                }
              }
            `}</style>
            <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-9 sm:gap-12">
              <div className="grid video-grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-stretch">
                <div className="group relative">
                  <div className="pointer-events-none absolute -left-3 -right-3 -top-6 h-[320px] rounded-2xl bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_55%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.12),transparent_60%)] opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-95 sm:-left-10 sm:-right-6 sm:-top-8 sm:h-[440px] sm:rounded-2xl sm:blur-3xl" aria-hidden="true" />
                  <div className="relative rounded-2xl sm:rounded-2xl bg-white/95 p-[1px] sm:p-[1.5px] shadow-xl sm:shadow-2xl">
                    <div className="rounded-2xl sm:rounded-2xl bg-white/70 backdrop-blur-2xl p-1 sm:p-1.5">
                      <VideoPlayer currentMedia={currentMedia} currentIndex={selectedMediaIndex} />
                    </div>
                  </div>
                </div>

                <article className="relative overflow-hidden rounded-2xl sm:rounded-2xl border border-white/60 bg-white/95 p-6 sm:p-8 shadow-xl sm:shadow-xl backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl text-center sm:text-left video-focus-card">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/40 to-white/0 opacity-0 transition-opacity duration-500 hover:opacity-100" />
                  <div className="relative flex flex-col gap-5 text-center sm:text-left items-center sm:items-start">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[0.6rem] sm:text-xs font-medium uppercase tracking-[0.3em] sm:tracking-[0.35em] text-slate-500">
                      <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 text-sm sm:text-base text-white shadow-lg shadow-lg">🎬</span>
                      <span>Focus projet</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold leading-tight text-slate-900">
                      {currentMedia?.title}
                    </h3>

                    <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-600 video-description text-center sm:text-left">
                      {(isDescriptionExpanded ? descriptionBlocks : descriptionBlocks.slice(0, 1)).map((paragraph, idx) => {
                        const trimmed = paragraph.replace(/^«|»$/g, '').trim();
                        const isHighlight = ['🎬', '📹', '🤝', '📸', '⚡', '🎥'].some((emoji) => trimmed.startsWith(emoji));

                        return isHighlight ? (
                          <HighlightCard key={idx} content={trimmed} />
                        ) : (
                          <p key={idx} className="text-slate-600">
                            {trimmed}
                          </p>
                        );
                      })}
                    </div>

                    {isDescriptionExpanded && <CreditsCard currentMedia={currentMedia} />}
                    {descriptionBlocks.length > 1 && (
                      <div className="w-full">
                        <button
                          type="button"
                          onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                          className="group inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-4 py-2 rounded-full text-sm transition-all duration-200"
                        >
                          {isDescriptionExpanded ? 'Réduire' : 'Lire la suite'}
                          <span className="text-blue-400 transition-transform duration-300 group-hover:translate-x-1">
                            {isDescriptionExpanded ? '−' : '→'}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              </div>

              <div className="relative flex flex-col gap-6">
                <div className="flex flex-col items-center justify-center gap-3 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                  <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.45em] text-center sm:text-left">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-400" />
                    Sélection rapide
                  </p>
                  <div className="hidden sm:block h-[1px] flex-1 ml-6 bg-gradient-to-r from-slate-200 via-slate-300/70 to-transparent" />
                </div>

                <div className="relative overflow-hidden rounded-2xl sm:rounded-2xl border border-white/70 bg-white py-4 sm:py-5 shadow-xl backdrop-blur-2xl">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/50 opacity-70" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_55%)] opacity-70" />

                  <div className="relative z-10 flex w-full flex-wrap items-center justify-center gap-3 px-3 sm:flex-nowrap sm:justify-between sm:gap-4 sm:px-6 lg:px-8 quick-selection-shell">
                    <button
                      type="button"
                      aria-label="Vidéos précédentes"
                      onClick={() => scrollQuickSelection('prev')}
                      aria-disabled={!canScrollLeft}
                      className={clsx(
                        'relative z-20 pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white text-slate-600 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 sm:h-12 sm:w-12 sm:shadow-lg',
                        canScrollLeft
                          ? 'hover:-translate-x-1 hover:text-slate-900'
                          : 'opacity-40'
                      )}
                    >
                      <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
                    </button>

                    <div
                      ref={quickNavRef}
                      className="group relative flex min-w-0 flex-1 gap-3 sm:gap-4 overflow-x-auto px-2 sm:px-4 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      style={{ scrollbarWidth: 'none' }}
                    >
                      <div
                        className={clsx(
                          'pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-20 bg-white/90 transition-opacity duration-300',
                          canScrollLeft ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div
                        className={clsx(
                          'pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-l from-white via-white/90 to-transparent transition-opacity duration-300',
                          canScrollRight ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className="relative z-10 flex min-w-full gap-3 sm:gap-4">
                        {filteredMedia.map((media, idx) => {
                          const active = idx === selectedMediaIndex;
                          const badgeLabel = media.tag || (media.type === 'video' ? 'Vidéo' : 'Photo');
                          return (
                            <button
                              key={media.id}
                              type="button"
                              onClick={() => setSelectedMediaIndex(idx)}
                              ref={(el) => { thumbsRef.current[idx] = el; }}
                              className={clsx(
                                'group relative flex w-[140px] sm:w-[190px] shrink-0 flex-col overflow-hidden rounded-xl sm:rounded-2xl border backdrop-blur transition-all duration-500',
                                active
                                  ? 'border-blue-300/60 bg-white shadow-lg shadow-blue-500/20 scale-[1.02]'
                                  : 'border-white/60 bg-white/85 hover:-translate-y-1 hover:border-blue-200/60 hover:shadow-lg'
                              )}
                              aria-label={`Lire ${media.title}`}
                            >
                              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-white/0" />
                              </div>
                              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-xl">
                                {media.type === 'video' && media.mediaUrl ? (
                                  <VideoFirstFrame
                                    src={media.mediaUrl}
                                    poster={media.thumbnail || media.posterUrl || currentMedia?.thumbnail}
                                    alt={media.title}
                                    width={320}
                                    height={180}
                                    className={clsx(
                                      'h-full w-full object-cover transition-transform duration-700',
                                      active ? 'scale-105' : 'scale-100 group-hover:scale-105'
                                    )}
                                  />
                                ) : (
                                  <img
                                    src={media.thumbnail || media.posterUrl || currentMedia?.thumbnail}
                                    alt={media.title}
                                    className={clsx(
                                      'h-full w-full object-cover transition-transform duration-700',
                                      active ? 'scale-105' : 'scale-100 group-hover:scale-105'
                                    )}
                                  />
                                )}
                                {active && (
                                  <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/85 px-2 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.28em] sm:tracking-[0.3em] text-slate-900 shadow-md shadow-blue-500/20">
                                    En lecture
                                  </span>
                                )}
                              </div>
                              <div className="relative mt-3 space-y-1 px-2 pb-3 text-center sm:text-left">
                                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/90 px-2 py-1 text-[0.6rem] sm:text-[10px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-slate-500">
                                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-400" />
                                  {badgeLabel}
                                </span>
                                <p
                                  className={clsx(
                                    'text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis',
                                    active && 'text-slate-900'
                                  )}
                                >
                                  {media.title}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label="Vidéos suivantes"
                      onClick={() => scrollQuickSelection('next')}
                      aria-disabled={!canScrollRight}
                      className={clsx(
                        'relative z-20 pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white text-slate-600 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 sm:h-12 sm:w-12 sm:shadow-lg',
                        canScrollRight
                          ? 'hover:translate-x-1 hover:text-slate-900'
                          : 'opacity-40'
                      )}
                    >
                      <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'photo' && (
          <div
            id="portfolio-photos"
            role="tabpanel"
            aria-labelledby="tab-photos"
            className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-visible animate-fade-in bg-[linear-gradient(180deg,#e0f2fe_0%,#f0f9ff_50%,#fef3f2_100%)]"
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
            <div className="relative z-10 max-w-[1400px] mx-auto">
              <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-slide-up">
                <h2 className="font-black text-slate-900 mb-3 sm:mb-4 tracking-tight uppercase text-[clamp(2rem,6vw,3.75rem)] break-words" id="portfolio-photo">
                  Photographie Professionnelle
                </h2>
                <p className="text-slate-700 max-w-2xl mx-auto leading-relaxed px-4 text-[clamp(0.9rem,2.5vw,1.125rem)]">
                  Portraits corporate, créations artistiques et reportages : nos shootings photos capturent l'essence de votre identité visuelle
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 lg:mb-12 animate-slide-up px-4 w-full max-w-2xl mx-auto [animation-delay:0.1s]">
                {(['TOUS', 'CRÉATIONS', 'AMBIANCES', 'PORTRAITS'] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setPhotoFilter(category)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                      photoFilter === category
                        ? 'bg-blue-400 text-slate-900 shadow-md scale-105'
                        : 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm'
                    } text-[clamp(0.65rem,1.8vw,0.75rem)]`}
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
                        <div className="pointer-events-none absolute inset-0 translate-y-6 scale-[0.98] rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent_55%)] opacity-0 blur-2xl transition-all duration-500 ease-out group-hover:opacity-60 group-hover:translate-y-4 group-hover:scale-100" />
                        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="relative h-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out overflow-visible bg-slate-950/40">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/10 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/40 group-hover:from-black/40 group-hover:to-black/60 transition-all duration-300 ease-in-out z-10 rounded-2xl overflow-hidden" />

                          <img
                            src={photo.thumbnail}
                            alt={`Photo ${photo.category} - ${photo.title} - Photographie professionnelle GND`}
                            loading={index < 6 ? "eager" : "lazy"}
                            fetchPriority={index < 3 ? "high" : "auto"}
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 rounded-2xl"
                          />

                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-30 p-4 sm:p-6 md:p-8">
                            <Eye className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white mb-2 sm:mb-3 drop-shadow-lg flex-shrink-0" aria-hidden="true" />
                            <div className="w-full max-w-full overflow-visible">
                              <h3 className="text-white font-semibold text-center mb-1 sm:mb-2 drop-shadow-lg whitespace-normal max-w-full text-[clamp(0.95rem,2.6vw,1.18rem)] break-words">
                                {photo.title}
                              </h3>
                              {photo.caption.split('\n\n').map((paragraph, idx) => (
                                <p
                                  key={idx}
                                  className={`text-white font-medium text-center drop-shadow-lg whitespace-normal max-w-full ${
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
                            <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-br from-white/95 via-white to-white/90 text-slate-900 font-bold rounded-full shadow-lg uppercase tracking-wide whitespace-nowrap ring-1 ring-white/60 text-[clamp(0.6rem,1.6vw,0.7rem)]">
                              {photo.category}
                            </span>
                          </div>

                          <div className="pointer-events-none absolute bottom-4 inset-x-6 z-30 hidden sm:flex justify-center">
                            <span className="h-1 w-32 rounded-full bg-gradient-to-r from-blue-400/0 via-blue-400/40 to-blue-400/0 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          </div>

                          <div className="pointer-events-none absolute -top-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-br from-white/35 via-amber-200/30 to-transparent blur-xl opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
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
                      className="absolute top-8 right-8 w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-[210] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeImageModal();
                      }}
                      aria-label="Fermer la photo agrandie"
                    >
                      <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" aria-hidden="true" />
                    </button>

                    <button
                      className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out hover:scale-105 z-[210] focus:outline-none focus:ring-2 focus:ring-white/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
                        openImageModal(allPhotos[prevIndex].thumbnail, allPhotos[prevIndex].caption);
                      }}
                      aria-label="Photo précédente"
                    >
                      <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-md min-w-6 min-h-6 max-w-8 max-h-8" aria-hidden="true" />
                    </button>

                    <button
                      className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 ease-in-out hover:scale-105 z-[210] focus:outline-none focus:ring-2 focus:ring-white/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextIndex = (currentIndex + 1) % allPhotos.length;
                        openImageModal(allPhotos[nextIndex].thumbnail, allPhotos[nextIndex].caption);
                      }}
                      aria-label="Photo suivante"
                    >
                      <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-md min-w-6 min-h-6 max-w-8 max-h-8" aria-hidden="true" />
                    </button>

                    <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                      <div className="relative">
                        <img
                          src={selectedImage}
                          alt={currentPhoto?.title ? `Photo agrandie - ${currentPhoto.title} - ${currentPhoto.category} - Portfolio GND Consulting` : 'Image agrandie - Portfolio photographie professionnelle'}
                          className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                        />

                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white text-xs sm:text-sm font-bold rounded-full shadow-xl">
                            {currentIndex + 1} / {allPhotos.length}
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 bg-gradient-to-br from-[#F5E8FF]/70 via-white/85 to-white backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 lightbox-info">
                        <h3 id="photo-lightbox-title" className="text-slate-900 text-3xl font-black mb-6 uppercase tracking-wide text-center">
                          {currentPhoto?.title}
                        </h3>
                        <div className="space-y-4">
                          {selectedCaption.split('\n\n').map((paragraph, index) => {
                            if (paragraph.startsWith('📸')) {
                              return (
                                <p key={index} className="text-slate-700 text-base italic text-center mt-8 pt-4 border-t border-slate-300/30">
                                  {paragraph}
                                </p>
                              );
                            } else {
                              return (
                                <p key={index} className="text-slate-800 text-lg leading-relaxed text-center">
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
