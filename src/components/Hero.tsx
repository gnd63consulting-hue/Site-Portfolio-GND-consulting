import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export function Hero() {
  const [showVideo, setShowVideo] = useState(false);

  // Image hero existante du portfolio Supabase
  const heroImage = "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png";
  // Showreel existante
  const showreelUrl = "https://www.youtube.com/watch?v=Vyhz7_D4fFU";

  return (
    <main
      id="main-content"
      className="relative min-h-screen flex flex-col justify-center"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-32 pb-20 relative z-10">
        {/* Titre principal — Stitch editorial */}
        <h1
          className="font-display font-semibold text-white leading-[0.9] tracking-tight reveal text-5xl sm:text-6xl md:text-8xl lg:text-[7rem]"
          role="heading"
          aria-level={1}
        >
          <span className="block">L'Art de la</span>
          <span className="block italic font-light text-white/60">Clarté Digitale</span>
        </h1>

        {/* Sous-titre */}
        <p className="mt-8 text-lg text-white/70 leading-relaxed max-w-lg reveal delay-100">
          Studio créatif parisien spécialisé en production audiovisuelle, design et automatisation IA.
        </p>

        {/* Metadata — Stitch style */}
        <div className="mt-12 flex items-center gap-6 text-xs text-white/50 uppercase tracking-widest reveal delay-150">
          <span>Paris, FR</span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span>Est. 2024</span>
          <span className="w-1 h-1 bg-white/50 rounded-full"></span>
          <span>Scroll</span>
        </div>

        {/* CTA */}
        <div className="mt-12 reveal delay-200">
          <a
            href="#realisations"
            className="inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 no-underline hover:no-underline visited:text-white hover:text-white"
            style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
            onClick={() => trackEvent('cta_click', { location: 'hero' })}
          >
            Voir nos réalisations
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </a>
        </div>

        {/* Hero Image / Showreel — Reference design */}
        <div className="mt-16 reveal delay-300">
          <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] rounded-2xl overflow-hidden shadow-2xl group">
            {showVideo ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/Vyhz7_D4fFU?rel=0&autoplay=1&modestbranding=1`}
                className="w-full h-full"
                title="Showreel GND Consulting"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={heroImage}
                  alt="GND Consulting — Studio créatif parisien"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Overlay sombre */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Bouton Play centré */}
                <button
                  onClick={() => {
                    setShowVideo(true);
                    trackEvent('showreel_play', { location: 'hero' });
                  }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                  aria-label="Lire le showreel"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white ml-1" />
                  </div>
                </button>

                {/* Badge Showreel */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                  <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-xs font-medium text-white uppercase tracking-widest">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    Showreel 2024
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
