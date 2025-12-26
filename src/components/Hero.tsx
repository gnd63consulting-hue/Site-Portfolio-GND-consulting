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
      <section
        ref={heroRef}
        id="hero"
        className="relative overflow-hidden"
        style={{
          minHeight: '100vh',
          paddingTop: 'clamp(4.5rem, 18vh, 12rem)',
          paddingBottom: 'clamp(2rem, 10vh, 5rem)'
        }}
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
          
          {/* Overlay pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Fallback image masquée - La vidéo est forcée à s'afficher */}
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
        
        {/* Texte d'introduction sur la vidéo */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-left px-4 sm:px-6 max-w-5xl ml-2 sm:ml-4">
            <h1 className="font-black text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl" style={{ fontSize: 'clamp(1.75rem, 7vw, 4.5rem)' }}>
              <span className="block font-bold tracking-wide leading-tight uppercase" role="heading" aria-level="1">Donnez vie à vos idées créatives</span>
            </h1>
            <p className="text-white font-medium leading-relaxed drop-shadow-xl mb-6 sm:mb-8" style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)' }} role="text">
              Chez GND, chaque projet est une aventure créative pensée pour vous inspirer et marquer les esprits.
            </p>
            <ButtonGND as="a" href="#realisations" className="rounded-full" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)', minWidth: '200px' }} onClick={() => trackEvent('cta_click', { location: 'hero' })} feedbackLabel="">
              <span>Voir nos réalisations</span>
              <Play className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </ButtonGND>
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

      </section>
      
    </>
  );
}
