import React from 'react';

export function AboutHeaderBento() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16 lg:mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text content */}
        <div className="reveal">
          <span className="inline-flex items-center border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-8">
            À propos
          </span>

          <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95] mb-6">
            L'intersection de l'humain
            <br />
            <span className="italic font-light text-[#4A4A4A]">& de la tech.</span>
          </h2>

          <p className="text-lg text-[#64748B] leading-relaxed max-w-xl">
            Studio créatif alliant créativité humaine et intelligence artificielle
            pour des projets audiovisuels et digitaux d&apos;exception.
          </p>
        </div>

        {/* Right: Stats & Tags */}
        <div className="reveal delay-100">
          <div className="flex items-end gap-8 mb-8">
            <div>
              <span className="font-display text-6xl lg:text-7xl font-semibold text-[#1A1A1A] leading-none">15+</span>
              <p className="text-sm text-[#64748B] mt-2">Projets réalisés</p>
            </div>
            <div>
              <span className="font-display text-6xl lg:text-7xl font-semibold text-[#1A1A1A] leading-none">100%</span>
              <p className="text-sm text-[#64748B] mt-2">Satisfaction client</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B]">Stratégie</span>
            <span className="border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B]">Création</span>
            <span className="border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B]">Tech</span>
            <span className="border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B]">IA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
