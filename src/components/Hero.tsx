import React, { useEffect, useRef } from 'react';
import '../styles/hero.css';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Reveal animation observer
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main
      ref={heroRef}
      id="main-content"
      className="relative overflow-hidden min-h-screen pt-32 pb-20"
    >
      {/* Background video */}
      <div className="hero-video-container">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png"
        >
          <source
            src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-center min-h-[calc(100vh-8rem)]">
        {/* Main title */}
        <div className="reveal">
          <h1 className="font-display font-semibold text-white text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.9] tracking-tight">
            <span className="block">L'Art de la</span>
            <span className="block text-gray-400 italic font-light">Clarté Digitale</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="reveal delay-100 mt-6 text-lg text-white/70 max-w-md leading-relaxed">
          Chez GND, chaque projet est une aventure créative pensée pour vous inspirer et marquer les esprits.
        </p>

        {/* Separator line with metadata */}
        <div className="reveal delay-200 mt-12 border-t border-white/20 pt-6 flex items-center gap-8 text-xs text-white/50 uppercase tracking-[0.3em]">
          <span>Paris, FR</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>Est. 2024</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">expand_more</span>
            Scroll
          </span>
        </div>

        {/* Hero Image / Video showcase */}
        <div className="reveal delay-300 mt-12 relative">
          <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl">
              <video
                className="w-full h-full object-cover rounded-2xl"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source
                  src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-black/30 rounded-2xl" />
            </div>

            {/* Play button */}
            <button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
              aria-label="Jouer la vidéo showreel"
            >
              <span className="material-symbols-outlined text-3xl text-white">play_arrow</span>
            </button>

            {/* Badge Showreel */}
            <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-white uppercase tracking-[0.2em]">
              Showreel 2024
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
