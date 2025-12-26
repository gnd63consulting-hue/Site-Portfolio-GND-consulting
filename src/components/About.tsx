import React, { useState } from 'react';
import { Star, CheckCircle, Clock } from 'lucide-react';
import { AboutHeaderBento } from './AboutHeaderBento';
import { AboutServicesBlocks } from './AboutServicesBlocks';
import { ValuesSection } from './ValuesSection';
import '../styles/aboutServices.css';

interface Testimonial {
  nom_client: string;
  poste_client: string;
  contenu_temoignage: string;
}

interface AboutProps {
  testimonials?: Testimonial[];
}

const About: React.FC<AboutProps> = ({ testimonials = [] }) => {
  const [isHistorySectionVisible, setIsHistorySectionVisible] = useState(false);

  const toggleHistorySection = () => {
    setIsHistorySectionVisible(!isHistorySectionVisible);
  };

  return (
    <section id="qui-sommes-nous" className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-blue-200/30 rounded-full animate-pulse ${
              i % 2 === 0 ? 'animate-bounce' : 'animate-pulse'
            }`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          />
        ))}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-blue-100/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-blue-100/20 rounded-full blur-lg" />
      </div>
      
      {/* Header Bento Grid dynamique moderne */}
      <AboutHeaderBento />
      
      {/* Section principale avec bouton de dévoilement */}
      <div id="history-section" className="max-w-[1200px] mx-auto mb-16 sm:mb-20 md:mb-24 px-4">
        {/* Bouton de dévoilement */}
        <div className="text-center mb-12">
          <button
            onClick={toggleHistorySection}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
          >
            <span>
              {isHistorySectionVisible ? 'Masquer notre histoire' : 'Découvrir notre histoire'}
            </span>
            <div className={`w-6 h-6 transition-transform duration-300 ${isHistorySectionVisible ? 'rotate-180' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Contenu révélé avec animation progressive */}
        <div className={`transition-all duration-1500 overflow-hidden ${
          isHistorySectionVisible ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {/* Layout alterné dynamique des 3 blocs principaux */}
          <AboutServicesBlocks isVisible={isHistorySectionVisible} />
        </div>
      </div>

      {/* Section Avantages déplacée ici */}
      <div className="mt-12 sm:mt-16 px-4">
        <div className="mx-auto max-w-[1180px]">
          <div className="relative overflow-hidden rounded-2xl border border-blue-100/50 bg-white/95 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/35 to-white opacity-90 pointer-events-none" />
            <div className="relative px-6 py-10 sm:px-10 sm:py-12">
              <h3
                className="text-center font-black text-slate-900"
                style={{ fontSize: 'clamp(1.35rem, 3.6vw, 2rem)', wordBreak: 'break-word' }}
              >
                Pourquoi Choisir GND Consulting ?
              </h3>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-3">
                <div className="group rounded-2xl border border-blue-100/60 bg-white/95 p-6 sm:p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/12 text-slate-900 ring-1 ring-white/80">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h4
                    className="mt-5 text-center font-semibold text-slate-900 tracking-tight"
                    style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', wordBreak: 'break-word' }}
                  >
                    Bénéfices Garantis
                  </h4>
                  <p
                    className="mt-3 text-center text-sm text-slate-600 leading-relaxed sm:text-base"
                    style={{ wordBreak: 'break-word' }}
                  >
                    Résultats concrets et mesurables pour votre entreprise
                  </p>
                  <div className="mx-auto mt-6 h-[2px] w-12 rounded-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent transition-transform duration-300 group-hover:scale-x-110" />
                </div>

                <div className="group rounded-2xl border border-blue-100/60 bg-white/95 p-6 sm:p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/12 text-slate-900 ring-1 ring-white/80">
                    <Star className="h-6 w-6" />
                  </div>
                  <h4
                    className="mt-5 text-center font-semibold text-slate-900 tracking-tight"
                    style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', wordBreak: 'break-word' }}
                  >
                    Excellence Créative
                  </h4>
                  <p
                    className="mt-3 text-center text-sm text-slate-600 leading-relaxed sm:text-base"
                    style={{ wordBreak: 'break-word' }}
                  >
                    Des créations uniques qui marquent les esprits
                  </p>
                  <div className="mx-auto mt-6 h-[2px] w-12 rounded-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent transition-transform duration-300 group-hover:scale-x-110" />
                </div>

                <div className="group rounded-2xl border border-blue-100/60 bg-white/95 p-6 sm:p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/12 text-slate-900 ring-1 ring-white/80">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h4
                    className="mt-5 text-center font-semibold text-slate-900 tracking-tight"
                    style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', wordBreak: 'break-word' }}
                  >
                    Respect des Délais
                  </h4>
                  <p
                    className="mt-3 text-center text-sm text-slate-600 leading-relaxed sm:text-base"
                    style={{ wordBreak: 'break-word' }}
                  >
                    Livraison dans les temps, qualité préservée
                  </p>
                  <div className="mx-auto mt-6 h-[2px] w-12 rounded-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent transition-transform duration-300 group-hover:scale-x-110" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Valeurs */}
      <ValuesSection />

      {/* Section Témoignages - CACHÉE POUR L'INSTANT */}
      {/* {testimonials && testimonials.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Ce Que Disent Nos Clients
            </h3>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Des témoignages authentiques qui reflètent notre engagement envers l'excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg sm:text-xl">
                      {testimonial.nom_client?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-slate-900">{testimonial.nom_client || 'Client'}</h4>
                    <p className="text-slate-600 text-sm">{testimonial.poste_client || 'Directeur'}</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed italic">
                  "{testimonial.contenu_temoignage || 'Excellent travail, très professionnel.'}"
                </p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-blue-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </section>
  );
};

export default About;
