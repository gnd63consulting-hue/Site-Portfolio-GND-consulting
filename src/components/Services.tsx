import React, { useState } from 'react';
import { trackEvent } from '../utils/analytics';
import { Play, Clock, CheckCircle, Star } from 'lucide-react';
import { useServices } from '../hooks/useSupabase';

export function Services() {
  const { services, loading, error } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fonction pour générer les icônes selon la catégorie
  const getCategoryIcon = (categorie: string) => {
    switch (categorie) {
      case 'production_audiovisuelle': return '🎬';
      case 'design_graphique': return '🎨';
      case 'motion_design': return '✨';
      case 'web_digital': return '💻';
      case 'strategie_communication': return '📈';
      default: return '⭐';
    }
  };

  // Fonction pour générer les offres par défaut
  const generateDefaultOffers = (service: any) => {
    const basePrice = service.tarif_min || 100;
    const maxPrice = service.tarif_max || basePrice * 3;
    
    return [
      {
        name: "Essentiel",
        price: `${basePrice}€`,
        features: [
          "Version de base",
          "Livraison standard",
          "2 modifications incluses",
          "Support par email"
        ]
      },
      {
        name: "Premium",
        price: `${Math.round(basePrice * 1.8)}€`,
        features: [
          "Version avancée",
          "Livraison prioritaire",
          "4 modifications incluses",
          "Support téléphonique",
          "Conseils personnalisés"
        ]
      },
      {
        name: "Sur-mesure",
        price: maxPrice > basePrice * 2 ? `${maxPrice}€` : "Sur devis",
        features: [
          "Solution personnalisée",
          "Accompagnement complet",
          "Modifications illimitées",
          "Support prioritaire",
          "Garantie résultats"
        ]
      }
    ];
  };

  const serviceCategories = [
    {
      id: 'content',
      matchCategories: ['production_audiovisuelle', 'design_graphique'],
      emoji: "🎨",
      title: "Création de contenus & production visuelle",
      subtitle: "Créativité sur mesure pour votre image",
      color: "from-pink-500 to-rose-500",
      services: [
        { name: "Logos & identités visuelles", price: "Sur devis" },
        { name: "Cartes de visite premium", price: "≥ Sur devis" },
        { name: "Flyers & supports print", price: "≥ Sur devis" },
        { name: "Charte graphique complète", price: "≥ Sur devis" },
        { name: "Packaging & PLV", price: "Sur devis" }
      ]
    },
    {
      id: 'branding',
      matchCategories: ['strategie_communication', 'web_digital'],
      emoji: "📱",
      title: "Stratégie digitale & identité de marque",
      subtitle: "Animation intelligente & IA créative",
      color: "from-blue-500 to-blue-500",
      services: [
        { name: "Motion graphics pro", price: "Sur devis" },
        { name: "Vidéos réseaux sociaux", price: "≥ Sur devis" },
        { name: "Templates automatisés", price: "≥ Sur devis" },
        { name: "Contenus générés par IA", price: "≥ Sur devis" },
        { name: "Animations sur mesure", price: "Sur devis" }
      ]
    },
    {
      id: 'automation',
      matchCategories: ['automatisation', 'motion_design', 'production_audiovisuelle'],
      emoji: "🎬",
      title: "Automatisation & IA créative",
      subtitle: "Excellence technique & créative",
      color: "from-blue-500 to-blue-500",
      services: [
        { name: "Captation multi-caméras", price: "Sur devis" },
        { name: "Montage professionnel", price: "≥ Sur devis" },
        { name: "Post-production avancée", price: "≥ Sur devis" },
        { name: "Livestream & régie", price: "≥ Sur devis" },
        { name: "Documentaires corporate", price: "Sur devis" }
      ]
    },
    {
      id: 'strategy',
      matchCategories: ['strategie_communication', 'pilotage_projet'],
      emoji: "⚡",
      title: "Accompagnement stratégique & pilotage de projet",
      subtitle: "Workflows intelligents pour votre business",
      color: "from-blue-500 to-blue-500",
      services: [
        { name: "Agents IA personnalisés", price: "Sur devis" },
        { name: "Automatisation processus", price: "≥ Sur devis" },
        { name: "Intégrations sur mesure", price: "≥ Sur devis" },
        { name: "Formation équipes", price: "≥ Sur devis" },
        { name: "Audit & stratégie", price: "≥ Sur devis" }
      ]
    }
  ];

  if (loading) {
    return (
      <section id="services" className="py-[10rem] px-[5%] max-w-[1400px] mx-auto relative">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#20C2A3]"></div>
          <p className="text-[#A0AEC0] mt-4">Chargement des services...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-[10rem] px-[5%] max-w-[1400px] mx-auto relative">
        <div className="text-center">
          <p className="text-red-400">Erreur lors du chargement des services</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto relative" style={{ background: '#f8fafc' }}>
      {/* Éléments décoratifs */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-rose-200/40 to-pink-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-slate-200/30 via-white to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-slate-200/25 via-white to-transparent rounded-full blur-2xl"></div>
      
      {/* Détails des offres */}
      {selectedCategory && (
        <div className="glass rounded-3xl p-4 sm:p-6 md:p-8 border border-primary/30 relative overflow-hidden mb-12 sm:mb-16">
          <div className="absolute inset-0 holographic opacity-20"></div>
          
          {(() => {
            const normalizedSelection = selectedCategory?.toLowerCase();
            const selectedCategoryConfig = serviceCategories.find(cat => cat.id === selectedCategory);
            const service = services.find((s) => {
              const serviceCategory = s.categorie?.toLowerCase();
              if (s.id === selectedCategory) return true;
              if (normalizedSelection && s.nom?.toLowerCase() === normalizedSelection) return true;
              if (serviceCategory && selectedCategoryConfig?.matchCategories?.includes(serviceCategory)) return true;
              return false;
            }) || services[0];
            if (!service) return null;
            
            return (
              <div className="relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <h3 className="font-bold text-primary" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}>
                    {getCategoryIcon(service.categorie)} {service.nom} - Nos Offres
                  </h3>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-auto w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center transition-all duration-300 border border-red-500/30"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {generateDefaultOffers(service).map((offer, idx) => (
                    <div key={idx} className="glass rounded-2xl p-4 sm:p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-primary font-bold text-lg">{offer.name}</h4>
                        <span className="text-slate-900 font-bold text-lg">{offer.price}</span>
                      </div>
                      
                      <ul className="space-y-2">
                        {offer.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-start gap-2 text-slate-600 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <a 
                        href="#contact"
                        className="w-full mt-4 px-4 py-2 bg-primary/10 border border-primary/30 rounded-xl text-primary text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:scale-105 cursor-pointer block text-center"
                        aria-label="Choisir cette offre et ouvrir la section contact"
                        onClick={() => {
                          try { trackEvent('cta_click', { location: 'service-offer', serviceId: service.id, offer: offer.name }); } catch {}
                        }}
                      >
                        Choisir cette offre
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Titre de section */}
      <div className="text-center space-y-4 mb-8 sm:mb-12 relative z-10">
        <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
          Nos Services Créatifs
        </h2>
        <p className="section-description text-slate-700" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)' }}>
          Production audiovisuelle, design graphique, automatisation IA découvrez notre gamme complète de services sur mesure
        </p>
      </div>

      {/* Résumé des services */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-2xl border border-white/60 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl px-4 sm:px-10 py-12 sm:py-14 mb-16">
        <div className="absolute inset-0">
          <div className="absolute -top-44 -left-36 h-80 w-80 rounded-full bg-gradient-to-br from-rose-300/35 via-white to-transparent blur-3xl" />
          <div className="absolute -bottom-48 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-slate-200/28 via-white to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/98 via-white/95 to-white/90" />
          <div className="absolute inset-x-10 top-1/2 h-[70%] rounded-2xl bg-white/35 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col items-center text-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/90 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-900 shadow-[0_12px_32px_rgba(59,130,246,0.18)]">
              Services Signature
            </span>
            <div className="max-w-3xl space-y-3 px-2 sm:px-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                Nos Expertises Clés
              </h3>
              <p className="max-w-3xl text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
                De l'identité visuelle aux écosystèmes automatisés, nos équipes créatives et techniques orchestrent des expériences sur-mesure qui marient esthétique, narration et innovation.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((category, index) => {
              const isActive = selectedCategory === category.id;
              const baseCardClass = 'group relative overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-[1px] shadow-[0_20px_55px_rgba(15,23,42,0.08)] transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/40';
              const activeClass = isActive
                ? ' ring-2 ring-blue-400/40 hover:ring-blue-400/50'
                : ' hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]';

              return (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => setSelectedCategory(isActive ? null : category.id)}
                  aria-label={`Explorer ${category.title}`}
                  className={`${baseCardClass}${activeClass}`}
                >
                  <div className="relative flex h-full flex-col gap-5 sm:gap-6 rounded-2xl sm:rounded-2xl bg-white/95 px-5 py-6 sm:px-6 sm:py-7">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/45 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                      <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} text-xl sm:text-2xl shadow-lg shadow-[rgba(37,99,235,0.25)]`}>
                        <span>{category.emoji}</span>
                      </div>
                      <span className="text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="relative flex flex-col gap-2 sm:gap-3 text-center sm:text-left">
                      <h4 className="text-base sm:text-lg font-bold leading-tight text-slate-900">
                        {category.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {category.subtitle}
                      </p>
                    </div>

                    <div className="relative mt-auto flex flex-col items-center justify-center gap-3 border-t border-slate-200/70 pt-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left sm:gap-6">
                      <span className="text-[0.6rem] sm:text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Découvrir
                      </span>
                      <span className="text-sm font-semibold text-slate-500 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avantages */}
    </section>
  );
}
