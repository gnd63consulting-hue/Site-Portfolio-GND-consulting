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
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto relative" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f9ff 100%)' }}>
      {/* Effet de fond */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-rose-200/40 to-pink-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-sky-300/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-sky-200/30 to-indigo-300/30 rounded-full blur-2xl"></div>
      
      <div className="text-center mb-12 sm:mb-16 relative z-10">
        <h2 className="section-title" id="process" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
          Notre Méthode de Travail
        </h2>
        <p className="section-description text-gray-700" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)' }}>
          Un processus collaboratif en 4 étapes pour garantir la réussite de vos projets créatifs
        </p>
      </div>

      {/* Frise chronologique */}
      <div className="relative z-10">
        {/* Ligne de connexion horizontale */}
        <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary z-0 mx-8"></div>
        
        {/* Conteneur des étapes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="relative timeline-step my-4 sm:my-0">
              {/* Ligne de connexion mobile (verticale) */}
              {index < steps.length - 1 && (
                <div className="lg:hidden absolute top-full left-1/2 w-0.5 h-8 bg-gradient-to-b from-primary to-secondary z-0 transform -translate-x-1/2"></div>
              )}

              <div className="glass rounded-3xl p-5 sm:p-6 md:p-8 border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 group text-center relative z-10 timeline-card">
                {/* Point de connexion sur la ligne */}
                <div className="hidden lg:block absolute -top-2 left-1/2 w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-white shadow-lg z-20 transform -translate-x-1/2 group-hover:scale-125 transition-transform duration-300"></div>

                {/* Numéro d'étape - repositionné */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 lg:-top-8 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg z-30 group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>

                {/* Icône avec animation */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 mt-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 border border-primary/30 shadow-md">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>

                {/* Badge de progression */}
                <div className="absolute top-4 right-4 bg-primary/10 text-primary text-[0.7rem] sm:text-xs font-bold px-2 py-1 rounded-full border border-primary/20 mt-2">
                  Étape {index + 1}/4
                </div>

                <h3 className="text-slate-900 font-bold mb-3 mt-2" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
                  {step.title}
                </h3>

                <p className="text-primary font-medium mb-3 sm:mb-4 group-hover:text-secondary transition-colors duration-300 leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
                  {step.description}
                </p>

                <p className="card-text group-hover:text-gray-800 transition-colors duration-300 leading-[1.6]" style={{ fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)' }}>
                  {step.details}
                </p>

                {/* Indicateur de temps estimé */}
              </div>
            </div>
          );
        })}
        </div>
        
        {/* Légende de la frise */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 border border-primary/20 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-gray-600 font-medium">Processus optimisé</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">Suivi en temps réel</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12 sm:mt-16 relative z-10">
        <div className="glass rounded-3xl p-4 sm:p-6 md:p-8 border border-primary/30 inline-block max-w-full">
          <h3 className="section-subtitle text-center mb-3 sm:mb-4" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)' }}>
            Prêt à démarrer votre projet ?
          </h3>
          <p className="card-text mb-4 sm:mb-6 max-w-md text-center" style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}>
            Contactez-nous dès maintenant pour un premier échange gratuit et sans engagement.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 sm:px-8 py-3 sm:py-5 bg-primary text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] uppercase tracking-wider flex items-center justify-center"
            style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)', minHeight: 'clamp(48px, 10vw, 60px)' }}
            onClick={(e) => {
              const el = e.currentTarget;
              el.setAttribute('aria-busy', 'true');
              setTimeout(() => el.removeAttribute('aria-busy'), 1200);
            }}
          >
            Démarrer mon projet
          </a>
        </div>
      </div>
    </section>
  );
}