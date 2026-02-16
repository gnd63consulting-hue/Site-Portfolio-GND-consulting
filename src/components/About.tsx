import React, { useState } from 'react';
import { CheckCircle, Star, Clock } from 'lucide-react';
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

  // Image portrait existante du portfolio Supabase
  const aboutImage = "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/6F0A4251.jpg";

  return (
    <section id="qui-sommes-nous" className="py-32 bg-[#F3F4F6] relative" aria-labelledby="about-title">

      {/* Section Hero — Grille 12 colonnes image + texte (Reference Stitch) */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16 lg:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Image gauche — col-span-5, aspect-[4/5], rounded-t-full */}
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden">
                <img
                  src={aboutImage}
                  alt="GND Consulting — Studio créatif à Paris"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Texte droite — col-span-7 */}
          <div className="lg:col-span-7 reveal delay-100 lg:pt-8">
            <span className="inline-flex items-center border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#64748B] mb-8">
              À propos
            </span>

            <h2 id="about-title" className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-[#1A1A1A] leading-[0.95] mb-6">
              L'intersection de l'humain
              <br />
              <span className="italic font-light text-[#4A4A4A]">& de la tech.</span>
            </h2>

            <p className="text-lg text-[#64748B] leading-relaxed max-w-xl mb-4">
              Studio créatif alliant créativité humaine et intelligence artificielle
              pour des projets audiovisuels et digitaux d&apos;exception.
            </p>

            <p className="text-base text-[#64748B] leading-relaxed max-w-xl mb-8">
              Chez GND Consulting, nous croyons que chaque projet est une opportunité de créer quelque chose d'unique
              et de mémorable. Notre équipe de créatifs passionnés travaille main dans la main avec nos techniciens
              experts pour donner vie à vos idées les plus audacieuses.
            </p>

            {/* Stats inline */}
            <div className="flex items-end gap-8 mb-8">
              <div>
                <span className="font-display text-5xl lg:text-6xl font-semibold text-[#1A1A1A] leading-none">15+</span>
                <p className="text-sm text-[#64748B] mt-2">Projets réalisés</p>
              </div>
              <div>
                <span className="font-display text-5xl lg:text-6xl font-semibold text-[#1A1A1A] leading-none">100%</span>
                <p className="text-sm text-[#64748B] mt-2">Satisfaction client</p>
              </div>
            </div>

            {/* 3 tag cards — Stratégie | Création | Tech */}
            <div className="flex flex-wrap gap-3">
              {['Stratégie', 'Création', 'Tech', 'IA'].map((tag) => (
                <span
                  key={tag}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-3 text-sm font-medium text-[#1A1A1A]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section "Découvrir notre histoire" — Garde le contenu existant */}
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

      {/* Section Avantages — Stitch cards (contenu existant conservé) */}
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

      {/* Section Valeurs — Contenu existant conservé */}
      <ValuesSection />
    </section>
  );
};

export default About;
