/* HologramShowcase, section "Notre portfolio en mouvement".
   Asset : public/assets/hologram-scene.webp (2752x1536, Nano Banana Pro).
   Animation séquentielle scroll-triggered niveau A :
     1. Cover mask sombre couvre la scène (hologramme + beam + icônes cachés)
     2. Au scroll-in : mask radial gradient expand from phone position (50%, 92%) → reveal
     3. Vidéo overlay crossfade in dans la zone blanche (L=29.51% T=14.71% W=40.92% H=42.45%)
     4. Boucle : pulse glow + dust particles canvas + mouse parallax perspective tilt
   Switch vidéo : 4 thumbs sous la scène, crossfade 400ms entre vidéos. */

import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Pool vidéos = 4 projets GND avec MP4 direct Supabase (autoplay possible). */
const SB = 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/';
const COVER = SB + 'portfolio-photos/gnd-cover.png';
/* hqdefault.jpg = 480x360, TOUJOURS dispo (vs maxresdefault.jpg qui peut retourner placeholder gris en 200 OK
   non interceptable par onError). Qualité suffisante pour thumbs 132x78. */
const yt = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

interface VideoEntry {
  id: string;
  title: string;
  subtitle: string;
  /** YouTube ID (lecture via iframe nocookie + watermark masqué par overlay GND) */
  youtube: string;
  /** Thumb local GND (PAS img.youtube.com) */
  thumb: string;
}

const VIDEOS: VideoEntry[] = [
  {
    id: 'esther-seems',
    title: 'Esther Seems, Bobine',
    subtitle: 'Clip musical · 2024',
    youtube: '6oaO6YoWjyQ',
    thumb: yt('6oaO6YoWjyQ'),
  },
  {
    id: 'cook-soul',
    title: 'Cook & Soul, Kaoutar',
    subtitle: 'Émission · 2024',
    youtube: 'GksYCOSW3qc',
    thumb: yt('GksYCOSW3qc'),
  },
  {
    id: 'sabay-2023',
    title: 'Sabay Festival 2023',
    subtitle: 'Grande Pagode de Vincennes',
    youtube: 'Vyhz7_D4fFU',
    thumb: yt('Vyhz7_D4fFU'),
  },
  {
    id: 'leyel-miel',
    title: 'Leyel, Miel',
    subtitle: 'Clip officiel · 2025',
    youtube: 'UbXQim7iNLI',
    thumb: yt('UbXQim7iNLI'),
  },
];

/* Zone blanche hologramme V3 (mesurée PIL sur asset 2752x1536, hologramme agrandi) */
const HOLO_ZONE = {
  left: '26.02%',
  top: '10.68%',
  width: '47.82%',
  height: '48.11%',
};

/* Phone position (origine clip-path circle reveal) */
const PHONE_ORIGIN = '50% 92%';

export function HologramShowcase() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const sceneRef = React.useRef<HTMLDivElement>(null);
  /** Wrapper iframe YouTube (cible des anim opacity/scale) */
  const videoRef = React.useRef<HTMLDivElement>(null);
  /** Référence player YouTube IFrame API */
  const playerRef = React.useRef<any>(null);
  const dustCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [muted, setMuted] = React.useState(true);
  const [playing, setPlaying] = React.useState(true);

  /* ============ YouTube IFrame API, load script + create player ============ */
  React.useEffect(() => {
    /* Load YT iframe API script once */
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.body.appendChild(tag);
    }

    const initPlayer = () => {
      if (playerRef.current) return; /* already inited */
      const YT = (window as any).YT;
      if (!YT || !YT.Player) return;
      playerRef.current = new YT.Player('hologram-yt-player', {
        videoId: VIDEOS[0].youtube,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: VIDEOS[0].youtube,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            e.target.mute();
            e.target.playVideo();
          },
        },
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
    };
  }, []);

  /* ============ Animation ciblée vidéo (pas de cover global) ============ */
  React.useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      /* Initial state, vidéo invisible, scale légèrement réduit pour effet matérialisation */
      gsap.set(videoRef.current, { opacity: 0, scale: 0.92, transformOrigin: '50% 50%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl
        /* Phase 1, vidéo se matérialise dans l'hologramme (opacity + scale) */
        .to(videoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        });
      /* PAS de pulse glow ambient, causait flash noir cyclique via filter interpolation GSAP.
         Vie ambient assurée par : vidéo qui joue + particules dust canvas + mouse parallax. */
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* ============ Mouse parallax (perspective tilt 3D-like) ============ */
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(sceneRef.current, {
        rotationY: x * 5,
        rotationX: -y * 3,
        duration: 0.8,
        ease: 'power2.out',
      });
    };
    const onLeave = () => {
      gsap.to(sceneRef.current, { rotationY: 0, rotationX: 0, duration: 1, ease: 'power3.out' });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* ============ Dust particles canvas ============ */
  React.useEffect(() => {
    const canvas = dustCanvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    let rafId = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx2d.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      life: number;
    }
    const particles: Particle[] = [];
    const W = () => canvas.getBoundingClientRect().width;
    const H = () => canvas.getBoundingClientRect().height;

    const spawn = (): Particle => ({
      x: Math.random() * W(),
      y: H() * (0.6 + Math.random() * 0.4),
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.2 - Math.random() * 0.5,
      r: 0.5 + Math.random() * 1.8,
      alpha: 0,
      life: 0,
    });

    for (let i = 0; i < 30; i++) particles.push(spawn());

    const loop = () => {
      ctx2d.clearRect(0, 0, W(), H());
      ctx2d.globalCompositeOperation = 'screen';
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;
        /* fade-in then fade-out */
        if (p.life < 60) p.alpha = Math.min(0.7, p.alpha + 0.012);
        else p.alpha = Math.max(0, p.alpha - 0.005);
        if (p.alpha <= 0 || p.y < 0) {
          Object.assign(p, spawn());
        }
        ctx2d.fillStyle = `rgba(255, 200, 140, ${p.alpha})`;
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx2d.fill();
      }
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ============ Switch vidéo, fade out → loadVideoById (YT API) → fade in ============ */
  const switchTo = (idx: number) => {
    if (idx === activeIdx || !videoRef.current || !playerRef.current) return;
    const v = videoRef.current;
    gsap.to(v, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIdx(idx);
        try {
          playerRef.current.loadVideoById({
            videoId: VIDEOS[idx].youtube,
            startSeconds: 0,
          });
          /* re-apply playlist param for loop (loadVideoById ne préserve pas) */
          if (muted) playerRef.current.mute();
          else playerRef.current.unMute();
        } catch (e) { /* ignore */ }
        gsap.to(v, { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.3 });
      },
    });
  };

  const active = VIDEOS[activeIdx];

  return (
    <section
      ref={rootRef}
      className="pt-8 md:pt-12 pb-24 md:pb-32 relative overflow-hidden bg-bg-alt"
      style={{ perspective: '1400px' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header partagé maintenant dans ReelsMosaic (section unifiée, photos d'abord, vidéos ensuite).
            Petit transition label vers la partie vidéo. */}
        <div className="text-center mb-10 md:mb-12 text-text-muted label-mono text-xs">
         la suite, en vidéo ↓
        </div>

        {/* Hologram scene */}
        <div
          ref={sceneRef}
          className="relative mx-auto"
          style={{
            maxWidth: '1180px',
            aspectRatio: '2752 / 1536',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Background image */}
          <img
            src="/assets/hologram-scene.webp?v=3"
            alt=""
            draggable={false}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none rounded-xl"
          />

          {/* POSTER fallback (toujours visible derrière la vidéo, évite tout flash noir au switch) */}
          <img
            src={active.thumb}
            alt=""
            draggable={false}
            className="absolute pointer-events-none"
            style={{
              ...HOLO_ZONE,
              objectFit: 'cover',
            }}
          />

          {/* WRAPPER YouTube IFrame, anim opacity/scale ciblent ce wrapper.
              Le div interne #hologram-yt-player est remplacé par YT API au mount. */}
          <div
            ref={videoRef}
            className="absolute overflow-hidden"
            style={{
              ...HOLO_ZONE,
              opacity: 0,
            }}
          >
            <div id="hologram-yt-player" style={{ width: '100%', height: '100%' }} />

            {/* WATERMARK COVER, masque le mini "YouTube" bottom-right (modestbranding deprecated 2024).
                Petit rect couleur table walnut pour fondre avec le bas de la zone hologramme. */}
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                right: 0,
                bottom: 0,
                width: '20%',
                height: '14%',
                background: 'linear-gradient(135deg, transparent 0%, rgba(20,12,8,0.85) 40%, rgba(20,12,8,0.98) 100%)',
              }}
            />
          </div>

          {/* MUTE TOGGLE, YT iframe API */}
          <button
            onClick={() => {
              if (!playerRef.current) return;
              if (muted) {
                playerRef.current.unMute();
                setMuted(false);
              } else {
                playerRef.current.mute();
                setMuted(true);
              }
            }}
            aria-label={muted ? 'Activer le son' : 'Couper le son'}
            className="absolute z-10 flex items-center justify-center rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm transition-all duration-200 border border-white/15 hover:border-accent/60"
            style={{
              top: `calc(${HOLO_ZONE.top} + 12px)`,
              left: `calc(${HOLO_ZONE.left} + ${HOLO_ZONE.width} - 48px)`,
              width: 36,
              height: 36,
            }}
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          {/* PLAY/PAUSE TOGGLE, YT iframe API */}
          <button
            onClick={() => {
              if (!playerRef.current) return;
              if (playing) {
                playerRef.current.pauseVideo();
                setPlaying(false);
              } else {
                playerRef.current.playVideo();
                setPlaying(true);
              }
            }}
            aria-label={playing ? 'Mettre en pause' : 'Lecture'}
            className="absolute z-10 flex items-center justify-center rounded-full bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm transition-all duration-200 border border-white/15 hover:border-accent/60"
            style={{
              top: `calc(${HOLO_ZONE.top} + 12px)`,
              left: `calc(${HOLO_ZONE.left} + ${HOLO_ZONE.width} - 96px)`,
              width: 36,
              height: 36,
            }}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Dust particles canvas */}
          <canvas
            ref={dustCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
          />
        </div>

        {/* Thumbnail strip, switcher vidéo */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-10">
          {VIDEOS.map((v, i) => (
            <button
              key={v.id}
              onClick={() => switchTo(i)}
              className={`group relative overflow-hidden rounded-lg transition-all duration-300 ${
                i === activeIdx
                  ? 'ring-2 ring-accent shadow-[0_0_24px_rgba(255,149,79,0.45)] scale-105'
                  : 'ring-1 ring-text-strong/15 hover:ring-accent/60 opacity-70 hover:opacity-100'
              }`}
              style={{ width: 132, height: 78 }}
              aria-label={`Voir : ${v.title}`}
            >
              <img
                src={v.thumb}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  /* maxresdefault.jpg pas toujours dispo → fallback hqdefault.jpg (presque toujours présent) */
                  const img = e.currentTarget;
                  if (img.src.includes('maxresdefault')) {
                    img.src = img.src.replace('maxresdefault', 'hqdefault');
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-1 left-2 right-2 text-left">
                <div className="text-[10px] text-bg font-medium leading-tight truncate">{v.title}</div>
              </div>
              {i === activeIdx && (
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Active video caption */}
        <div className="text-center mt-6 md:mt-8">
          <div className="text-lg md:text-xl display text-text-strong">{active.title}</div>
          <div className="text-sm text-text-muted mt-1">{active.subtitle}</div>
        </div>

      </div>
    </section>
  );
}
