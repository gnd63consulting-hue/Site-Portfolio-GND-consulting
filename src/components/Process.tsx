import React from 'react';
import { MessageCircle, FileText, Cog, CheckCircle } from 'lucide-react';

export function Process() {
  const steps = [
    {
      icon: MessageCircle,
      title: "Premier échange",
      description: "Mail, visio, téléphone",
      details: "Nous prenons le temps de comprendre vos besoins et objectifs"
    },
    {
      icon: FileText,
      title: "Brief simple & devis clair",
      description: "Proposition transparente",
      details: "Devis détaillé avec délais et livrables précis"
    },
    {
      icon: Cog,
      title: "Production créative",
      description: "Avec retours réguliers",
      details: "Suivi en temps réel et validation à chaque étape"
    },
    {
      icon: CheckCircle,
      title: "Livraison finale",
      description: "Et support post-projet si besoin",
      details: "Contenus prêts à l'emploi et accompagnement continu"
    }
  ];

  return (
    <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto relative bg-background-alt">
      <div className="text-center mb-12 sm:mb-16 relative z-10 reveal">
        <span className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted mb-6">
          Processus
        </span>
        <h2 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-text-main leading-[0.95]" id="process">
          Notre Méthode de Travail
        </h2>
        <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto mt-4">
          Un processus collaboratif en 4 étapes pour garantir la réussite de vos projets créatifs
        </p>
      </div>

      {/* Frise chronologique — Stitch style */}
      <div className="relative z-10 reveal delay-100">
        {/* Ligne de connexion horizontale */}
        <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gray-300 z-0 mx-8"></div>

        {/* Conteneur des étapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="relative timeline-step my-4 sm:my-0">
              {/* Ligne de connexion mobile (verticale) */}
              {index < steps.length - 1 && (
                <div className="lg:hidden absolute top-full left-1/2 w-px h-8 bg-gray-300 z-0 transform -translate-x-1/2"></div>
              )}

              <div className="group bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200 hover:bg-black hover:text-white transition-all duration-500 hover:scale-105 text-center relative z-10">
                {/* Point de connexion sur la ligne */}
                <div className="hidden lg:block absolute -top-2 left-1/2 w-4 h-4 bg-black rounded-full border-4 border-white shadow-sm z-20 transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300"></div>

                {/* Numéro d'étape */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 lg:-top-8 w-12 h-12 lg:w-16 lg:h-16 bg-black group-hover:bg-white group-hover:text-black rounded-full flex items-center justify-center text-white font-semibold text-lg lg:text-xl shadow-sm z-30 group-hover:scale-110 transition-all duration-500">
                  {index + 1}
                </div>

                {/* Icône */}
                <div className="w-16 h-16 bg-gray-100 group-hover:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 mt-8 group-hover:scale-110 transition-all duration-500">
                  <IconComponent className="w-8 h-8 text-text-main group-hover:text-white transition-colors duration-500" />
                </div>

                {/* Badge de progression */}
                <div className="absolute top-4 right-4 text-text-muted group-hover:text-gray-400 text-[0.7rem] sm:text-xs font-medium px-2 py-1 rounded-full border border-gray-200 group-hover:border-white/20 mt-2 transition-all duration-500">
                  Étape {index + 1}/4
                </div>

                <h3 className="font-display text-text-main group-hover:text-white font-semibold mb-3 mt-2 text-[clamp(1rem,3vw,1.25rem)] transition-colors duration-500">
                  {step.title}
                </h3>

                <p className="text-accent group-hover:text-accent-light font-medium mb-3 sm:mb-4 leading-relaxed text-[clamp(0.875rem,2.5vw,1rem)] transition-colors duration-500">
                  {step.description}
                </p>

                <p className="text-text-muted group-hover:text-gray-300 leading-[1.6] text-[clamp(0.8rem,2.2vw,0.95rem)] transition-colors duration-500">
                  {step.details}
                </p>
              </div>
            </div>
          );
        })}
        </div>

        {/* Légende de la frise */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white rounded-full px-6 py-3 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-xs text-text-muted font-medium uppercase tracking-widest">Processus optimisé</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs text-text-muted font-medium uppercase tracking-widest">Suivi en temps réel</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12 sm:mt-16 relative z-10 reveal delay-150">
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-sm inline-block max-w-full">
          <h3 className="font-display font-semibold text-text-main text-center mb-3 sm:mb-4 text-[clamp(1.25rem,4vw,1.75rem)]">
            Prêt à démarrer votre projet ?
          </h3>
          <p className="text-text-muted mb-4 sm:mb-6 max-w-md text-center text-[clamp(0.875rem,2.5vw,1rem)] leading-relaxed">
            Contactez-nous dès maintenant pour un premier échange gratuit et sans engagement.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-full transition-all duration-300 hover:scale-105"
            style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
            onClick={(e) => {
              const el = e.currentTarget;
              el.setAttribute('aria-busy', 'true');
              setTimeout(() => el.removeAttribute('aria-busy'), 1200);
            }}
          >
            Démarrer mon projet
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
