import React, { useEffect, useState, useRef } from 'react';
import { Play, Sparkles, Zap, Brain, Video, Palette } from 'lucide-react';
import { ButtonGND } from './ButtonGND';
import { trackEvent } from '../utils/analytics';
import '../styles/hero.css';

export function Hero() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number>();
  const totalFrames = 60;

  // Animation automatique
  useEffect(() => {
    let frameIndex = 0;
    const animate = () => {
      if (frameIndex < totalFrames && isAnimating) {
        setCurrentFrame(frameIndex);
        frameIndex++;
        animationRef.current = requestAnimationFrame(() => {
          setTimeout(animate, 50);
        });
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

        if (!isVisible && isAnimating) {
          setIsAnimating(false);
          setCurrentFrame(totalFrames - 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAnimating]);

  // Données animées
  const progress = Math.min(currentFrame / totalFrames, 1);
  const data = {
    renderProgress: Math.min(progress * 100, 100),
    colorGradingProgress: Math.min(progress * 100, 100),
    audioProgress: Math.min(progress * 100, 100),
    waveform: Array.from({ length: 6 }, (_, i) =>
      Math.sin((currentFrame + i) * 0.3) * 0.5 + 0.5
    ),
    spectrum: Array.from({ length: 4 }, (_, i) =>
      Math.sin((currentFrame + i * 3) * 0.2) * 0.6 + 0.4
    )
  };

  return (
    <>
      <main
        ref={heroRef}
        id="main-content"
        className="relative overflow-hidden min-h-screen pt-32 pb-20"
      >
        {/* Vidéo d'arrière-plan */}
        <div className="hero-video-container">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            poster="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png"
          >
            <source src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>

          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Fallback image masquée */}
          <picture style={{ display: 'none', visibility: 'hidden', opacity: 0 }}>
            <source srcSet="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png 1920w" type="image/png" />
            <img
              src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: -999, display: 'none', visibility: 'hidden', opacity: 0 }}
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
              sizes="100vw"
              aria-hidden="true"
            />
          </picture>
        </div>

        {/* Contenu texte hero — Stitch style */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-3xl">
              {/* Titre H1 massif — Stitch font-display */}
              <h1 className="font-display font-semibold text-white mb-6 leading-[0.9] tracking-tight reveal text-[clamp(2.5rem,8vw,7rem)]" role="heading" aria-level={1}>
                <span className="block">Donnez vie à vos</span>
                <span className="block text-gray-400 italic font-light">idées créatives</span>
              </h1>

              {/* Sous-titre */}
              <p className="text-lg text-gray-300 leading-relaxed max-w-md mb-8 reveal delay-100">
                Chez GND, chaque projet est une aventure créative pensée pour vous inspirer et marquer les esprits.
              </p>

              {/* Séparation metadata — Stitch style */}
              <div className="flex items-center gap-6 text-xs text-gray-400 uppercase tracking-widest border-t border-white/20 pt-6 mb-8 reveal delay-150">
                <span>Paris, FR</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span>Est. 2024</span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span>Scroll</span>
              </div>

              {/* CTA Button — Stitch rounded-full */}
              <div className="reveal delay-200">
                <ButtonGND
                  as="a"
                  href="#realisations"
                  className="rounded-full text-[clamp(0.9rem,2.5vw,1.125rem)] min-w-[200px]"
                  onClick={() => trackEvent('cta_click', { location: 'hero' })}
                  feedbackLabel=""
                >
                  <span>Voir nos réalisations</span>
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                </ButtonGND>
              </div>
            </div>
          </div>
        </div>

        {/* Badge Showreel — Stitch style */}
        <div className="absolute bottom-8 left-8 z-20 reveal delay-300">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-medium tracking-wide">Showreel 2024</span>
          </div>
        </div>

        {/* Particules modernes */}
        <div className="particles relative z-10" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </main>
    </>
  );
}
