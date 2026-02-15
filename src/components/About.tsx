import React, { useState } from 'react';
import { CheckCircle, Star, Clock } from 'lucide-react';
import { AboutHeaderBento } from './AboutHeaderBento';
import { AboutServicesBlocks } from './AboutServicesBlocks';
import { ValuesSection } from './ValuesSection';

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
    <section id="qui-sommes-nous" className="py-32 bg-[#F3F4F6] relative" aria-labelledby="about-title">
      {/* Header — Stitch style */}
      <AboutHeaderBento />

      {/* Section principale avec bouton de dévoilement */}
      <div id="history-section" className="max-w-[1400px] mx-auto mb-16 sm:mb-20 md:mb-24 px-6 lg:px-12">
        <div className="text-center mb-12 reveal">
          <button
            onClick={toggleHistorySection}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-gray-800 text-white text-base font-medium rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-black/20"
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

        <div className={`transition-all duration-1500 overflow-hidden ${
          isHistorySectionVisible ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <AboutServicesBlocks isVisible={isHistorySectionVisible} />
        </div>
      </div>

      {/* Section Avantages — Stitch cards */}
      <div className="mt-12 sm:mt-16 px-6 lg:px-12 reveal">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-12">
            <h3 className="font-display font-semibold text-[clamp(1.5rem,4vw,2.5rem)] text-[#1A1A1A] leading-[0.95]">
              Pourquoi Choisir GND Consulting ?
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="group bg-white rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-[#1A1A1A] group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h4 className="mt-5 text-center font-display font-semibold text-[#1A1A1A] group-hover:text-white transition-colors duration-500">
                Bénéfices Garantis
              </h4>
              <p className="mt-3 text-center text-sm text-[#64748B] leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                Résultats concrets et mesurables pour votre entreprise
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-[#1A1A1A] group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                <Star className="h-6 w-6" />
              </div>
              <h4 className="mt-5 text-center font-display font-semibold text-[#1A1A1A] group-hover:text-white transition-colors duration-500">
                Excellence Créative
              </h4>
              <p className="mt-3 text-center text-sm text-[#64748B] leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                Des créations uniques qui marquent les esprits
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 transition-all duration-500 hover:bg-black hover:text-white">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-[#1A1A1A] group-hover:bg-white/10 group-hover:text-white transition-all duration-500">
                <Clock className="h-6 w-6" />
              </div>
              <h4 className="mt-5 text-center font-display font-semibold text-[#1A1A1A] group-hover:text-white transition-colors duration-500">
                Respect des Délais
              </h4>
              <p className="mt-3 text-center text-sm text-[#64748B] leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                Livraison dans les temps, qualité préservée
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Valeurs */}
      <ValuesSection />
    </section>
  );
};

export default About;
