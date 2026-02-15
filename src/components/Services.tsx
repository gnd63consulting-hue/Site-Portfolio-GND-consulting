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
      icon: "brush",
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
      icon: "campaign",
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
      icon: "movie",
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
      icon: "smart_toy",
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
      <section id="services" className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto relative">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          <p className="text-text-muted mt-4">Chargement des services...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto relative">
        <div className="text-center">
          <p className="text-red-500">Erreur lors du chargement des services</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto relative bg-white" aria-labelledby="services-title">

      {/* Détails des offres */}
      {selectedCategory && (
        <div className="rounded-2xl p-4 sm:p-6 md:p-8 bg-gray-50 border border-gray-200 relative overflow-hidden mb-12 sm:mb-16 reveal">
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
                  <h3 className="font-display font-semibold text-text-main text-[clamp(1.25rem,4vw,1.5rem)]">
                    {getCategoryIcon(service.categorie)} {service.nom} - Nos Offres
                  </h3>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-auto w-8 h-8 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {generateDefaultOffers(service).map((offer, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-black/20 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-display font-semibold text-lg">{offer.name}</h4>
                        <span className="text-text-main font-semibold text-lg">{offer.price}</span>
                      </div>

                      <ul className="space-y-2">
                        {offer.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-start gap-2 text-text-muted text-sm">
                            <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#contact"
                        className="w-full mt-4 px-4 py-2 bg-black text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 cursor-pointer block text-center"
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

      {/* Titre de section — Stitch style */}
      <div className="text-center space-y-4 mb-12 relative z-10 reveal">
        <span className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted">
          Expertise
        </span>
        <h2 id="services-title" className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-text-main leading-[0.95]">
          Nos Services Créatifs
        </h2>
        <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
          Production audiovisuelle, design graphique, automatisation IA — découvrez notre gamme complète de services sur mesure
        </p>
        <a href="#services" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-black transition-colors duration-300">
          Voir tous les services
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>

      {/* Grille des 4 catégories — Stitch card style */}
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 reveal delay-100">
        {serviceCategories.map((category, index) => {
          const isActive = selectedCategory === category.id;

          return (
            <button
              type="button"
              key={category.id}
              onClick={() => setSelectedCategory(isActive ? null : category.id)}
              aria-label={`Explorer ${category.title}`}
              className={`group relative bg-gray-50 rounded-2xl p-8 h-[420px] flex flex-col justify-between text-left transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/30 ${
                isActive
                  ? 'bg-black text-white ring-2 ring-accent/30'
                  : 'hover:bg-black hover:text-white'
              }`}
            >
              {/* Icon */}
              <div>
                <span className={`material-symbols-outlined text-3xl ${isActive ? 'text-white' : 'text-text-main group-hover:text-white'} transition-colors duration-500`}>
                  {category.icon}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <span className={`text-xs font-medium uppercase tracking-widest ${isActive ? 'text-gray-400' : 'text-text-muted group-hover:text-gray-400'} transition-colors duration-500`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className={`font-display text-xl font-semibold leading-tight ${isActive ? 'text-white' : 'text-text-main group-hover:text-white'} transition-colors duration-500`}>
                  {category.title}
                </h4>
                <p className={`text-sm ${isActive ? 'text-gray-300' : 'text-text-muted group-hover:text-gray-300'} transition-colors duration-500`}>
                  {category.subtitle}
                </p>
              </div>

              {/* Footer — link */}
              <div className={`flex items-center justify-between border-t pt-4 ${isActive ? 'border-white/20' : 'border-gray-200 group-hover:border-white/20'} transition-colors duration-500`}>
                <span className={`text-xs font-medium uppercase tracking-widest ${isActive ? 'text-gray-400' : 'text-text-muted group-hover:text-gray-400'} transition-colors duration-500`}>
                  Découvrir
                </span>
                <span className={`text-sm font-semibold ${isActive ? 'text-gray-400' : 'text-text-muted group-hover:text-gray-400'} transition-transform duration-300 group-hover:translate-x-1`}>
                  →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
