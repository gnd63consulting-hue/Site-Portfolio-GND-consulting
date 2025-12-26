import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTestimonials } from '../hooks/useSupabase';

export function TestimonialsSection() {
  const { testimonials, loading, error } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section className="py-[8rem] px-[5%] max-w-[1200px] mx-auto relative">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#20C2A3]"></div>
          <p className="text-[#A0AEC0] mt-4">Chargement des témoignages...</p>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return null; // Ne pas afficher la section s'il n'y a pas de témoignages
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto relative" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0f9ff 100%)' }}>
      {/* Effet de fond */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-rose-200/40 to-pink-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-blue-300/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-full blur-2xl"></div>
      
      <div className="text-center mb-12 sm:mb-14 md:mb-16 relative z-10">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
          </div>
          <h2 className="section-title" id="testimonials" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', wordBreak: 'break-word' }}>
            Avis de Nos Clients
          </h2>
        </div>

        <p className="section-description text-slate-700" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)', wordBreak: 'break-word' }}>
          Retours d'expérience authentiques de nos clients : découvrez pourquoi ils nous font confiance pour leurs projets créatifs
        </p>
      </div>
        
      {/* Carrousel de témoignages */}
      <div className="relative glass rounded-3xl p-6 sm:p-8 md:p-12 border border-primary/30 overflow-hidden">
        <div className="absolute inset-0 holographic opacity-10"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Citation */}
          <Quote className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-primary/30 mx-auto mb-6 sm:mb-8" aria-hidden="true" />

          <blockquote className="text-white font-medium italic leading-relaxed mb-6 sm:mb-8" style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', wordBreak: 'break-word' }}>
            "{currentTestimonial.citation}"
          </blockquote>
          
          {/* Note */}
          {currentTestimonial.note && (
            <div className="flex justify-center gap-1 mb-4 sm:mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    i < currentTestimonial.note!
                      ? 'text-blue-400 fill-current'
                      : 'text-slate-600'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          )}
          
          {/* Informations client */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {currentTestimonial.photo_client_url && (
              <img
                src={currentTestimonial.photo_client_url}
                alt={`Photo de profil de ${currentTestimonial.nom_client} - Témoignage client GND Consulting`}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#20C2A3]/30"
                loading="lazy"
              />
            )}
            <div className="text-center sm:text-left">
              <h4 className="card-title" style={{ fontSize: 'clamp(1rem, 3vw, 1.125rem)', wordBreak: 'break-word' }}>
                {currentTestimonial.nom_client}
              </h4>
              {currentTestimonial.fonction && (
                <p className="card-text" style={{ fontSize: 'clamp(0.8rem, 2.2vw, 0.875rem)', wordBreak: 'break-word' }}>
                  {currentTestimonial.fonction}
                  {currentTestimonial.entreprise && ` • ${currentTestimonial.entreprise}`}
                </p>
              )}
              {currentTestimonial.projet_concerne && (
                <p className="text-primary/80 mt-1" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', wordBreak: 'break-word' }}>
                  Projet: {currentTestimonial.projet_concerne}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Contrôles de navigation */}
        {testimonials.length > 1 && (
          <>
            <button
              onClick={prevTestimonial}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 hover:bg-primary/80 hover:text-white transition-all duration-300 border border-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/50"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 hover:bg-primary/80 hover:text-white transition-all duration-300 border border-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/50"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </button>
          </>
        )}
        
        {/* Indicateurs */}
        {testimonials.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Grille de témoignages (si plus de 3) */}
      {testimonials.length > 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 relative z-10">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={testimonial.id} className="glass rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < (testimonial.note || 5) 
                        ? 'text-blue-400 fill-current' 
                        : 'text-slate-600'
                    }`} 
                  />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                "{testimonial.citation.length > 120 
                  ? testimonial.citation.substring(0, 120) + '...' 
                  : testimonial.citation}"
              </p>
              <div className="flex items-center gap-3">
                {testimonial.photo_client_url && (
                  <img
                    src={testimonial.photo_client_url}
                    alt={`Photo de profil de ${testimonial.nom_client} - Client satisfait`}
                    className="w-10 h-10 rounded-full object-cover border border-primary/30"
                  />
                )}
                <div>
                  <h5 className="card-title text-sm">{testimonial.nom_client}</h5>
                  {testimonial.entreprise && (
                    <p className="card-text text-xs">{testimonial.entreprise}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}