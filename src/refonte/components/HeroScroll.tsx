/* HeroScroll, Chicken Drive-style frame-sequence scroll-scrub hero.
   3 couches d'animation :
   - Couche 1 (idle) : visor pulse via CSS overlay, particules déjà rendues dans les frames
   - Couche 2 (scroll-scrub) : GSAP ScrollTrigger pinné sur la section parente, mappe le
     scroll progress aux 150 frames Three.js pré-rendues (camera dolly-in, head turn,
     visor power-up, particules intensifient)
   - Couche 3 (mouse parallax) : tilt subtil ±3% du conteneur sur position souris

   Les frames sont en /public/assets/hero-frames/frame_0000.jpg → 0149.jpg.
   Si elles ne sont pas encore présentes, le fallback est la JPG statique. */

import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 150;
const framePath = (i: number) =>
  `/assets/hero-frames/frame_${String(i).padStart(4, '0')}.jpg`;
const FALLBACK_PATH = '/assets/hero-portrait.webp';

interface HeroScrollProps {
  /** CSS selector or ref for the section to pin (the trigger of the scrub). */
  pinTargetSelector?: string;
  className?: string;
}

export function HeroScroll({ pinTargetSelector = 'section.hero-scroll-root', className = '' }: HeroScrollProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const framesRef = React.useRef<HTMLImageElement[]>([]);
  const fallbackImgRef = React.useRef<HTMLImageElement | null>(null);
  const [framesLoaded, setFramesLoaded] = React.useState(0);
  const [framesUsable, setFramesUsable] = React.useState(false);
  const [mx, setMx] = React.useState(0);
  const [my, setMy] = React.useState(0);

  /* Preload frames (with fallback to the static JPG if frames missing). */
  React.useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    let errored = 0;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);

    const drawFallback = () => {
      const fb = new Image();
      fb.crossOrigin = 'anonymous';
      fb.onload = () => {
        fallbackImgRef.current = fb;
        drawFrame(fb);
      };
      fb.src = FALLBACK_PATH;
    };

    const loadAllFrames = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.onload = () => {
          if (cancelled) return;
          loaded++;
          setFramesLoaded(loaded);
          // Once first frame is loaded, paint it immediately
          if (i === 0) drawFrame(img);
          // Mark as usable once we have enough frames (e.g., 30) to start animating
          if (loaded >= 30 && !framesUsable) setFramesUsable(true);
        };
        img.onerror = () => {
          if (cancelled) return;
          errored++;
          // If a critical share of frames fail, drop to fallback
          if (errored > FRAME_COUNT * 0.2 && !fallbackImgRef.current) {
            drawFallback();
          }
        };
        img.src = framePath(i);
        imgs[i] = img;
      }
      framesRef.current = imgs;
    };

    // Sonde : on teste UNE frame avant de lancer les 150 requêtes — si la
    // séquence n'est pas déployée (cas actuel), fallback direct sans spammer
    // le réseau de 404.
    const probe = new Image();
    probe.onload = () => { if (!cancelled) loadAllFrames(); };
    probe.onerror = () => { if (!cancelled) drawFallback(); };
    probe.src = framePath(0);

    return () => {
      cancelled = true;
      imgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Canvas sizing, fixed internal resolution to match captured frames (1920×1080).
     CSS scales to fill container. The browser's hardware-accelerated GPU scaling is
     way more efficient than redrawing at every viewport size. */
  React.useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = 1920;
    canvasRef.current.height = 1080;
  }, []);

  /* Paint a frame onto the canvas. */
  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  /* ScrollTrigger pin + scrub on the parent section, mapping scroll progress
     to a frame index. */
  React.useEffect(() => {
    if (!framesUsable) return;

    const target = document.querySelector(pinTargetSelector);
    if (!target) return;

    const trigger = ScrollTrigger.create({
      trigger: target as Element,
      start: 'top top',
      end: '+=1400', // 1400 px de scroll pour parcourir toute la scrubbe
      pin: true,
      pinSpacing: true,
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = self.progress;
        const idx = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(progress * (FRAME_COUNT - 1)))
        );
        const img = framesRef.current[idx];
        if (img && img.complete && img.naturalWidth > 0) {
          drawFrame(img);
        } else if (fallbackImgRef.current) {
          drawFrame(fallbackImgRef.current);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [framesUsable, pinTargetSelector]);

  /* Mouse parallax, listens window-wide, but only applies subtle transform to
     this wrapper. Throttled via requestAnimationFrame for smoothness. */
  React.useEffect(() => {
    let raf = 0;
    let nx = 0, ny = 0;
    const onMove = (e: MouseEvent) => {
      nx = (e.clientX / window.innerWidth - 0.5) * 2;
      ny = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          setMx(nx);
          setMy(ny);
          raf = 0;
        });
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        transform: `translate(${mx * 8}px, ${my * 6}px)`,
        transition: 'transform 200ms ease-out',
      }}
    >
      {/* Frame canvas, base layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'cover' }}
      />

      {/* Couche 1, visor pulse overlay (idle motion). Radial gradient orange placed
          where the visor sits in the frame composition (~55% x, 38% y). */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background:
            'radial-gradient(ellipse 18% 12% at 55% 38%, rgba(255,149,79,.32), transparent 70%)',
          animation: 'gnd-visor-pulse 4.2s ease-in-out infinite',
        }}
      />

      {/* Loading status (only visible if frames aren't ready and < 30 loaded) */}
      {!framesUsable && framesLoaded < 30 && (
        <div className="absolute bottom-3 left-3 text-text-muted text-[10px] label-mono opacity-50">
          chargement · {framesLoaded}/{FRAME_COUNT}
        </div>
      )}

      <style>{`
        @keyframes gnd-visor-pulse {
          0%, 100% { opacity: .5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default HeroScroll;
