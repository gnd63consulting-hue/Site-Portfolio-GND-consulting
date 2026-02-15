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
    <section id="qui-sommes-nous" className="py-32 bg-background-alt relative overflow-hidden" aria-labelledby="about-title">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gray-300/30 rounded-full animate-pulse ${
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
      </div>

      {/* Header Bento Grid dynamique moderne */}
      <AboutHeaderBento />

      {/* Section principale avec bouton de dévoilement */}
      <div id="history-section" className="max-w-[1400px] mx-auto mb-16 sm:mb-20 md:mb-24 px-6 lg:px-12">
        {/* Bouton de dévoilement — Stitch style */}
        <div className="text-center mb-12 reveal">
          <button
            onClick={toggleHistorySection}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-gray-800 text-white text-base font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
            style={{ fontFamily: '"Clash Display", Syne, sans-serif' }}
          >
            <span>
              {isHistorySectionVisible ? 'Masquer notre histoire' : 'Découvrir notre histoire'}
            </span>
            <div className={`w-5 h-5 transition-transform duration-300 ${isHistorySectionVisible ? 'rotate-180' : ''}`}>
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

      {/* Section Avantages — Stitch style cards */}
      <div className="mt-12 sm:mt-16 px-6 lg:px-12 reveal">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="relative px-6 py-10 sm:px-10 sm:py-12">
              <h3
                className="text-center font-display font-semibold text-[clamp(1.35rem,3.6vw,2rem)] text-text-main"
              >
                Pourquoi Choisir GND Consulting ?
              </h3>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-3">
                <div className="group rounded-2xl bg-gray-50 p-6 sm:p-7 transition-all duration-500 hover:bg-black hover:text-white">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-text-main group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h4 className="mt-5 text-center font-display font-semibold tracking-tight text-[clamp(1rem,2.5vw,1.15rem)] group-hover:text-white transition-colors duration-500">
                    Bénéfices Garantis
                  </h4>
                  <p className="mt-3 text-center text-sm text-text-muted leading-relaxed sm:text-base group-hover:text-gray-300 transition-colors duration-500">
                    Résultats concrets et mesurables pour votre entreprise
                  </p>
                </div>

                <div className="group rounded-2xl bg-gray-50 p-6 sm:p-7 transition-all duration-500 hover:bg-black hover:text-white">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-text-main group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                    <Star className="h-6 w-6" />
                  </div>
                  <h4 className="mt-5 text-center font-display font-semibold tracking-tight text-[clamp(1rem,2.5vw,1.15rem)] group-hover:text-white transition-colors duration-500">
                    Excellence Créative
                  </h4>
                  <p className="mt-3 text-center text-sm text-text-muted leading-relaxed sm:text-base group-hover:text-gray-300 transition-colors duration-500">
                    Des créations uniques qui marquent les esprits
                  </p>
                </div>

                <div className="group rounded-2xl bg-gray-50 p-6 sm:p-7 transition-all duration-500 hover:bg-black hover:text-white">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-text-main group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h4 className="mt-5 text-center font-display font-semibold tracking-tight text-[clamp(1rem,2.5vw,1.15rem)] group-hover:text-white transition-colors duration-500">
                    Respect des Délais
                  </h4>
                  <p className="mt-3 text-center text-sm text-text-muted leading-relaxed sm:text-base group-hover:text-gray-300 transition-colors duration-500">
                    Livraison dans les temps, qualité préservée
                  </p>
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
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-text-main mb-4 sm:mb-6">
              Ce Que Disent Nos Clients
            </h3>
            <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
              Des témoignages authentiques qui reflètent notre engagement envers l'excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-display font-bold text-lg sm:text-xl">
                      {testimonial.nom_client?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-display font-semibold text-text-main">{testimonial.nom_client || 'Client'}</h4>
                    <p className="text-text-muted text-sm">{testimonial.poste_client || 'Directeur'}</p>
                  </div>
                </div>
                <p className="text-text-muted leading-relaxed italic">
                  "{testimonial.contenu_temoignage || 'Excellent travail, très professionnel.'}"
                </p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-current" />
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
