import React, { useState, useEffect } from 'react';
import { Brain, Target, Clock, TrendingUp, Zap, Shield, Users, CheckCircle } from 'lucide-react';

export function AISection() {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('ai-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setAnimationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const metrics = [
    {
      icon: Target,
      label: "Précision",
      value: Math.floor(animationProgress * 0.08 + 92) + "%",
      color: "text-green-400"
    },
    {
      icon: Clock,
      label: "Temps économisé",
      value: Math.floor(animationProgress * 0.05 + 15) + "min",
      color: "text-blue-400"
    },
    {
      icon: TrendingUp,
      label: "Productivité",
      value: "+" + Math.floor(animationProgress * 0.4 + 40) + "%",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      label: "Automatisation",
      value: Math.floor(animationProgress * 0.6 + 85) + "%",
      color: "text-blue-400"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "IA Générative",
      description: "Création de contenus automatisée avec GPT-4 et Claude"
    },
    {
      icon: Shield,
      title: "Sécurité Avancée",
      description: "Protection des données et conformité RGPD garantie"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Workflows partagés et gestion d'équipe intégrée"
    },
    {
      icon: CheckCircle,
      title: "Résultats Mesurables",
      description: "Analytics en temps réel et ROI quantifiable"
    }
  ];

  return (
    <section id="ai-section" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Éléments décoratifs */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-rose-200/40 to-pink-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-blue-300/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-full blur-2xl"></div>
      
      <div className="text-center mb-12 sm:mb-14 md:mb-16 relative z-10">
        <h2 className="section-title" id="ai" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', wordBreak: 'break-word' }}>
          Intelligence Artificielle & Créativité
        </h2>

        <p className="section-description text-slate-700" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)', wordBreak: 'break-word' }}>
          Découvrez comment nous intégrons l'IA dans nos processus créatifs pour optimiser vos projets et décupler votre impact
        </p>
      </div>

      {/* Métriques animées */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-14 md:mb-16 relative z-10">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="glass rounded-2xl p-4 sm:p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-primary/30">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
              </div>
              <div className={`font-bold ${metric.color} mb-2`} style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
                {metric.value}
              </div>
              <div className="text-slate-600 font-medium" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fonctionnalités IA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="glass rounded-3xl p-4 sm:p-6 md:p-8 border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 group">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-slate-900 font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', wordBreak: 'break-word' }}>
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors duration-300" style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', wordBreak: 'break-word' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-12 sm:mt-14 md:mt-16 relative z-10">
        <div className="glass rounded-3xl p-4 sm:p-6 md:p-8 border border-primary/30 inline-block max-w-full">
          <h3 className="section-subtitle text-center mb-3 sm:mb-4" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', wordBreak: 'break-word' }}>
            Prêt à intégrer l'IA dans vos projets ?
          </h3>
          <p className="card-text mb-4 sm:mb-6 max-w-md text-center mx-auto" style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1rem)', wordBreak: 'break-word' }}>
            Découvrez comment nos solutions IA peuvent transformer votre workflow créatif.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-5 bg-primary text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-blue-600/30 uppercase tracking-wider focus:outline-none focus:ring-4 focus:ring-white/50"
            style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)', minHeight: 'clamp(48px, 10vw, 60px)' }}
          >
            Découvrir nos solutions IA
          </a>
        </div>
      </div>
    </section>
  );
}
