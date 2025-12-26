import React from 'react';
import { Users, Palette, Zap, TrendingUp } from 'lucide-react';

export function AboutHeaderBento() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-20 hidden md:block w-80 h-80 bg-gradient-to-br from-blue-100 via-white to-blue-100 opacity-70 blur-3xl" />
        <div className="absolute -bottom-36 -right-16 hidden md:block w-96 h-96 bg-gradient-to-tl from-blue-100 via-white to-blue-100 opacity-60 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-blue-50/30" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          {/* GRANDE CARTE PRINCIPALE */}
          <div className="relative">
            <div className="absolute -inset-1 hidden sm:block rounded-2xl bg-gradient-to-br from-blue-100/90 via-white to-blue-100/90 opacity-70 blur-xl" />
            <div className="relative h-full rounded-3xl sm:rounded-2xl bg-white/90 p-6 sm:p-8 lg:p-14 shadow-xl ring-1 ring-blue-100/70 backdrop-blur">
              {/* Badge */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-center sm:text-left">
                <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.32em] text-white shadow-md shadow-blue-500/30">
                  Studio Créatif
                </span>
              </div>

              {/* Titre */}
              <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4 text-center sm:text-left">
                <span className="inline-flex justify-center sm:justify-start rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-4 sm:px-5 py-1.5 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.32em] text-slate-900">
                  À PROPOS DE
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-slate-900">
                  <span>
                    GND CONSULTING
                  </span>
                </h2>
              </div>

              {/* Description */}
              <p className="mt-6 sm:mt-8 mx-auto max-w-2xl rounded-2xl border border-blue-100 bg-gradient-to-r from-slate-50/85 to-slate-100/85 p-6 sm:p-8 text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 shadow-inner text-center sm:text-left">
                Studio créatif alliant créativité humaine et intelligence artificielle 
                pour des projets audiovisuels et digitaux d&apos;exception
              </p>
            </div>
          </div>

          {/* PETITES CARTES EMPILÉES À DROITE */}
          <div className="relative">
            <div className="absolute left-5 top-0 hidden h-full lg:block">
              <div className="h-full w-px bg-gradient-to-b from-blue-200 via-blue-100 to-transparent" />
            </div>

            <div className="relative grid gap-4 sm:gap-6">
              <div className="relative pl-0 lg:pl-12">
                <div className="absolute left-0 top-8 hidden h-3 w-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/30 lg:block" />
                <div className="group relative rounded-3xl sm:rounded-2xl bg-gradient-to-br from-white via-blue-50/60 to-white p-[1px] shadow-lg shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="rounded-2xl bg-white/90 p-6 sm:p-8 text-center backdrop-blur group-hover:bg-white">
                    <div className="mb-4 sm:mb-6 mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-blue-100">
                      <Palette className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800">Créativité</h3>
                    <p className="mt-2 text-sm text-slate-500">100% humaine</p>
                  </div>
                </div>
              </div>

              <div className="relative pl-0 lg:pl-12">
                <div className="absolute left-0 top-8 hidden h-3 w-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/30 lg:block" />
                <div className="group relative rounded-3xl sm:rounded-2xl bg-gradient-to-br from-white via-blue-50/60 to-white p-[1px] shadow-lg shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="rounded-2xl bg-white/90 p-6 sm:p-8 text-center backdrop-blur group-hover:bg-white">
                    <div className="mb-4 sm:mb-6 mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-amber-100">
                      <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-amber-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800">Technologie</h3>
                    <p className="mt-2 text-sm text-slate-500">IA &amp; Automation</p>
                  </div>
                </div>
              </div>

              <div className="relative pl-0 lg:pl-12">
                <div className="absolute left-0 top-8 hidden h-3 w-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/30 lg:block" />
                <div className="group relative rounded-3xl sm:rounded-2xl bg-gradient-to-br from-white via-blue-50/60 to-white p-[1px] shadow-lg shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="rounded-2xl bg-white/90 p-6 sm:p-8 text-center backdrop-blur group-hover:bg-white">
                    <div className="mb-4 sm:mb-6 mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-green-100">
                      <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800">Résultats</h3>
                    <p className="mt-2 text-sm text-slate-500">Garantis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
