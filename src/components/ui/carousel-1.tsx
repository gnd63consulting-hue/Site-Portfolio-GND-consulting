/* BasicCarousel — composant 21st.dev (Ark UI Carousel).
 *
 * Améliorations 01/06/2026 :
 *  - YouTube `maxresdefault.jpg` casse pour vidéos sans master HD → fallback
 *    `onError` vers `hqdefault.jpg` (résolution 480×360, toujours disponible).
 *  - Reels Supabase MP4 utilisaient un placeholder générique (`gnd-cover.png`)
 *    → extraction client-side de la première frame via <video> + canvas, dataURL
 *    injecté en poster pour le slide ET la vignette.
 *
 * Type Reel + handler `onPlay` ajoutés pour bridger composant avec
 * setActiveReel du service-pages.tsx.
 */
import { Carousel } from '@ark-ui/react/carousel';
import { useEffect, useState } from 'react';

export type CarouselReel = {
  id: string;
  t: string;     // title
  k: string;     // category tag
  y: string;     // year
  img: string;   // poster image (fallback)
  video?: string;
  youtube?: string;
};

interface BasicCarouselProps {
  reels: CarouselReel[];
  onPlay: (reel: CarouselReel) => void;
}

/**
 * Calcule luminance moyenne BT.601 sur la zone centrale 50% d'un canvas.
 * Évite contamination par letterboxing / bandes noires bord.
 */
function avgCenterLuminance(canvas: HTMLCanvasElement): number {
  const ctx = canvas.getContext('2d');
  if (!ctx) return 0;
  const w = canvas.width;
  const h = canvas.height;
  try {
    const data = ctx.getImageData(
      Math.floor(w * 0.25),
      Math.floor(h * 0.25),
      Math.floor(w * 0.5),
      Math.floor(h * 0.5),
    ).data;
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    return sum / (data.length / 4);
  } catch {
    return 0;
  }
}

/**
 * Extrait la première frame "utile" d'une vidéo MP4 distante.
 * Beaucoup de clips démarrent par un fade-in noir (ex: Yungcally) — on
 * essaie plusieurs seek points jusqu'à trouver une frame avec luminance
 * centrale suffisante.
 * Stratégie : <video> caché → seek dans liste → drawImage canvas →
 * check luminance → si trop sombre on retente, sinon toDataURL.
 * Requiert CORS sur le bucket source (Supabase public bucket OK).
 */
function extractFirstFrame(videoUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    // Points de seek successifs. Premier passage 0.5s pour rapidité,
    // sinon on avance dans la timeline jusqu'à 5s pour passer fade-in.
    const SEEK_POINTS = [0.5, 1.5, 3.0, 5.0];
    const MIN_LUMINANCE = 30; // sur 0–255 ; 30 ≈ noir mat évident
    let attemptIdx = 0;

    const cleanup = () => {
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', onError);
      video.src = '';
      video.load();
    };

    const tryNextSeek = () => {
      if (attemptIdx >= SEEK_POINTS.length) {
        // Toutes tentatives noires — on garde la dernière capture.
        captureAndResolve(false);
        return;
      }
      const target = Math.min(
        SEEK_POINTS[attemptIdx],
        Math.max(0.1, (video.duration || 10) - 0.1),
      );
      attemptIdx++;
      video.currentTime = target;
    };

    const onMeta = () => {
      tryNextSeek();
    };

    const captureAndResolve = (allowRetry: boolean) => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('No 2D context');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        if (allowRetry && attemptIdx < SEEK_POINTS.length) {
          const lum = avgCenterLuminance(canvas);
          if (lum < MIN_LUMINANCE) {
            tryNextSeek();
            return;
          }
        }

        const dataUrl = canvas.toDataURL('image/jpeg', 0.78);
        cleanup();
        resolve(dataUrl);
      } catch (err) {
        cleanup();
        reject(err);
      }
    };

    const onSeeked = () => {
      captureAndResolve(true);
    };

    const onError = () => {
      cleanup();
      reject(new Error('video load failed'));
    };

    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', onError);

    video.src = videoUrl;
  });
}

/** Fallback YouTube — deux pièges :
 *  1. `maxresdefault.jpg` 404 → géré via onError.
 *  2. YouTube renvoie un PLACEHOLDER GRIS 120×90 en HTTP 200 OK quand la
 *     vidéo n'a pas de version HD (i-vi/...vid?/default_live, etc.).
 *     Status 200 → onError ne fire pas. On détecte sur onLoad par
 *     dimensions et on fallback à hqdefault.jpg (480×360, toujours dispo).
 */
const YT_FINAL_FALLBACK =
  'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png';

function handleYoutubeImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src.includes('maxresdefault.jpg')) {
    img.src = img.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
  } else if (img.src.includes('hqdefault.jpg')) {
    img.src = img.src.replace('hqdefault.jpg', 'mqdefault.jpg');
  } else if (img.src.includes('mqdefault.jpg')) {
    // Vidéo YouTube supprimée / privée (ex: AGC_2cFHE_0 L'Anecdote au 01/06/26).
    img.src = YT_FINAL_FALLBACK;
  }
}
function handleYoutubeImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  // Placeholder gris YouTube = 120×90 exact. Vrai maxresdefault = 1280×720.
  if (
    img.naturalWidth === 120 &&
    img.naturalHeight === 90 &&
    img.src.includes('maxresdefault.jpg')
  ) {
    img.src = img.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
  }
}

export default function BasicCarousel({ reels, onPlay }: BasicCarouselProps) {
  // Posters générés depuis la 1ère frame des vidéos MP4 Supabase.
  const [posters, setPosters] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    reels.forEach((reel) => {
      if (!reel.video) return; // YouTube géré via thumbnail URL directement
      if (posters[reel.id]) return;
      extractFirstFrame(reel.video)
        .then((dataUrl) => {
          if (!cancelled) {
            setPosters((prev) => ({ ...prev, [reel.id]: dataUrl }));
          }
        })
        .catch(() => {
          /* silencieux — on garde reel.img comme fallback */
        });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reels]);

  const posterFor = (reel: CarouselReel) => posters[reel.id] || reel.img;

  return (
    <Carousel.Root
      defaultPage={0}
      slideCount={reels.length}
      className="max-w-6xl mx-auto"
    >
      <Carousel.Control className="flex items-center justify-between mb-4">
        <Carousel.PrevTrigger className="px-5 py-2.5 bg-accent hover:bg-accent-deep text-bg rounded-full font-medium tracking-tight transition-colors shadow-sm">
          ← Précédent
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className="px-5 py-2.5 bg-accent hover:bg-accent-deep text-bg rounded-full font-medium tracking-tight transition-colors shadow-sm">
          Suivant →
        </Carousel.NextTrigger>
      </Carousel.Control>

      <Carousel.ItemGroup className="overflow-hidden rounded-lg">
        {reels.map((reel, index) => (
          <Carousel.Item key={reel.id} index={index}>
            <button
              type="button"
              onClick={() => onPlay(reel)}
              className="block w-full"
              aria-label={`Lire la vidéo : ${reel.t}`}
            >
              <img
                src={posterFor(reel)}
                alt={`Slide ${index + 1}`}
                onError={reel.youtube ? handleYoutubeImgError : undefined}
                onLoad={reel.youtube ? handleYoutubeImgLoad : undefined}
                className="w-full h-[420px] md:h-[560px] lg:h-[640px] object-cover"
              />
            </button>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      {/* Thumbnails strip — remplace dots. Chaque vignette = poster vidéo
        cliquable, ring accent sur slide actif, scroll horizontal si overflow. */}
      <Carousel.IndicatorGroup className="flex justify-start md:justify-center items-center mt-6 gap-2 md:gap-3 overflow-x-auto px-2 pb-2 snap-x snap-mandatory">
        {reels.map((reel, index) => (
          <Carousel.Indicator
            key={reel.id}
            index={index}
            aria-label={`Aller à la vidéo : ${reel.t}`}
            className="relative shrink-0 w-24 h-14 md:w-28 md:h-16 lg:w-32 lg:h-[72px] rounded-md overflow-hidden snap-start cursor-pointer ring-2 ring-transparent data-current:ring-accent opacity-50 hover:opacity-100 data-current:opacity-100 transition-all"
          >
            <img
              src={posterFor(reel)}
              alt=""
              loading="lazy"
              onError={reel.youtube ? handleYoutubeImgError : undefined}
              onLoad={reel.youtube ? handleYoutubeImgLoad : undefined}
              className="w-full h-full object-cover"
            />
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  );
}
