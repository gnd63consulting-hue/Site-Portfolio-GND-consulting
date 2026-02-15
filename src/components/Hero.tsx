import React from 'react';
import { trackEvent } from '../utils/analytics';

export function Hero() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen flex flex-col justify-center bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full py-32 lg:py-40">
        {/* Titre principal — Stitch editorial */}
        <h1
          className="font-display font-semibold text-[#1A1A1A] leading-[0.9] tracking-tight reveal text-6xl md:text-8xl lg:text-[7rem]"
          role="heading"
          aria-level={1}
        >
          <span className="block">L'Art de la</span>
          <span className="block italic font-light text-gray-400">Clarté Digitale</span>
        </h1>

        {/* Sous-titre */}
        <p className="mt-8 text-lg text-[#64748B] leading-relaxed max-w-lg reveal delay-100">
          Studio créatif parisien spécialisé en production audiovisuelle, design et automatisation IA.
        </p>

        {/* Metadata — Stitch style */}
        <div className="mt-12 flex items-center gap-6 text-xs text-[#64748B] uppercase tracking-widest reveal delay-150">
          <span>Paris, FR</span>
          <span className="w-1 h-1 bg-[#64748B] rounded-full"></span>
          <span>Est. 2024</span>
          <span className="w-1 h-1 bg-[#64748B] rounded-full"></span>
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
      </div>
    </main>
  );
}
