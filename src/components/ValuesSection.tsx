import React from 'react';
import { Heart, Shield, Lightbulb, Users, Bot } from 'lucide-react';

export function ValuesSection() {
  const values = [
    {
      id: 'passion',
      icon: Heart,
      title: 'Passion',
      description: 'Nous mettons notre cœur dans chaque projet',
      accent: {
        badge: 'from-rose-500 to-rose-400',
        aura: 'from-rose-400/25 via-rose-300/15 to-transparent',
        text: 'text-rose-500'
      }
    },
    {
      id: 'reliability',
      icon: Shield,
      title: 'Fiabilité',
      description: 'Engagement total envers la qualité et les délais',
      accent: {
        badge: 'from-blue-600 to-blue-500',
        aura: 'from-blue-400/25 via-blue-300/15 to-transparent',
        text: 'text-slate-900'
      }
    },
    {
      id: 'innovation',
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Toujours à la pointe des dernières technologies',
      accent: {
        badge: 'from-amber-500 to-orange-400',
        aura: 'from-amber-300/25 via-orange-200/10 to-transparent',
        text: 'text-amber-500'
      }
    },
    {
      id: 'collaboration',
      icon: Users,
      title: 'Collaboration',
      description: 'Partenaire de confiance dans votre réussite',
      accent: {
        badge: 'from-blue-500 to-blue-400',
        aura: 'from-blue-300/25 via-blue-200/10 to-transparent',
        text: 'text-blue-500'
      }
    },
    {
      id: 'ai',
      icon: Bot,
      title: 'Innovation IA',
      description: "Intégration de l'IA et de l'automatisation quand c'est un vrai plus",
      accent: {
        badge: 'from-blue-500 to-blue-500',
        aura: 'from-blue-300/25 via-blue-200/10 to-transparent',
        text: 'text-blue-500'
      }
    }
  ];

  return (
    <section id="values-section" className="relative overflow-hidden py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white" />
      <div className="absolute -top-32 -right-16 h-64 w-64 rounded-full bg-gradient-to-br from-blue-100 via-white to-blue-100 opacity-70 blur-3xl" />
      <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200 via-white to-blue-100 opacity-60 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-16">
        <div className="flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/70 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-900 shadow-md shadow-blue-500/20">
            ADN GND
          </span>
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              Nos Valeurs Fondatrices
            </h2>
            <p className="max-w-3xl text-base sm:text-lg text-slate-600">
              Les principes qui guident notre approche et nous engagent à offrir des expériences mémorables, humaines et technologiquement visionnaires.
            </p>
          </div>
        </div>

        <div className="grid w-full max-w-6xl gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {values.map((value, index) => (
            <div
              key={value.id}
              className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-[1px] shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="relative rounded-2xl bg-white/95 px-5 py-7 sm:px-6 sm:py-9">
                <div
                  className={`pointer-events-none absolute inset-x-6 -top-20 h-44 bg-gradient-to-br ${value.accent.aura} blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                  <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.accent.badge} shadow-lg shadow-blue-500/20`}>
                    <value.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="relative mt-5 space-y-2 sm:space-y-3 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                    {value.description}
                  </p>
                </div>

                <div className="relative mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3 border-t border-slate-200/70 pt-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left sm:gap-6">
                  <span className={`text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.26em] sm:tracking-[0.3em] ${value.accent.text}`}>
                    Valeur clé
                  </span>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="h-[1px] w-10 sm:w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.32em] sm:tracking-[0.35em] text-slate-500">
                      GND
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
