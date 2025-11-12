import React, { useState } from 'react';
import { X, Cookie, Settings, Shield, BarChart3, Zap, Palette, Target, Share2 } from 'lucide-react';
import { ModalGND } from './ModalGND';
import { initAnalytics, setConsent } from '../utils/analytics';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  performance: boolean;
  personalization: boolean;
  advertising: boolean;
  social: boolean;
}

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({ isOpen, onClose }) => {
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const saved = localStorage.getItem('gnd-cookie-consent');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      essential: true,
      analytics: false,
      performance: false,
      personalization: false,
      advertising: false,
      social: false,
    };
  });

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('gnd-cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('gnd-cookie-consent-date', new Date().toISOString());
    setConsent({ analytics: prefs.analytics });
    if (prefs.analytics) {
      initAnalytics(import.meta.env.VITE_GA_MEASUREMENT_ID);
    }
    onClose();
  };

  const handleAcceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      performance: true,
      personalization: true,
      advertising: true,
      social: true,
    });
  };

  const handleRejectNonEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      performance: false,
      personalization: false,
      advertising: false,
      social: false,
    });
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const handleBack = () => {
    setShowCustomize(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return;
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  if (!isOpen) return null;

  const cookieCategories = [
    {
      key: 'essential' as keyof CookiePreferences,
      icon: Shield,
      title: 'Cookies Essentiels',
      description: 'Indispensables au bon fonctionnement du site',
      alwaysActive: true,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      icon: BarChart3,
      title: 'Mesure d\'audience',
      description: 'Statistiques anonymes de visite',
      alwaysActive: false,
      color: 'text-slate-900',
      bgColor: 'bg-blue-50',
    },
    {
      key: 'performance' as keyof CookiePreferences,
      icon: Zap,
      title: 'Performance',
      description: 'Améliorent la rapidité du site',
      alwaysActive: false,
      color: 'text-slate-900',
      bgColor: 'bg-blue-50',
    },
    {
      key: 'personalization' as keyof CookiePreferences,
      icon: Palette,
      title: 'Personnalisation',
      description: 'Sauvegarde de vos préférences visuelles',
      alwaysActive: false,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
    },
    {
      key: 'advertising' as keyof CookiePreferences,
      icon: Target,
      title: 'Publicité ciblée',
      description: 'Publicités personnalisées & retargeting',
      alwaysActive: false,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      key: 'social' as keyof CookiePreferences,
      icon: Share2,
      title: 'Réseaux sociaux',
      description: 'Partage direct sur les plateformes sociales',
      alwaysActive: false,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
  ];

  return (
    <ModalGND isOpen={isOpen} onClose={onClose} title={!showCustomize ? 'Gestion des cookies' : 'Personnaliser les cookies'}>
      {!showCustomize ? (
        <>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Cookie className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Gestion des cookies
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700 leading-relaxed">
              GND Consulting utilise quelques cookies pour améliorer votre expérience. Vous pouvez accepter, continuer sans accepter, ou personnaliser vos choix.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              En cliquant sur "Accepter tous les cookies", vous consentez à l'utilisation de cookies à des fins de mesure d'audience uniquement. Aucune donnée personnelle n'est utilisée à des fins commerciales.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Accepter tous les cookies
            </button>

            <button
              onClick={handleRejectNonEssential}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Refuser non essentiels
            </button>
          </div>

          <button
            onClick={handleCustomize}
            className="w-full mt-3 px-6 py-2.5 text-sm text-slate-900 hover:text-slate-900 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <Settings className="w-4 h-4" />
            Personnaliser mes préférences
          </button>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Settings className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Personnaliser les cookies
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto scrollbar-thin">
            {cookieCategories.map((category) => {
              const IconComponent = category.icon;
              const isActive = preferences[category.key];

              return (
                <div
                  key={category.key}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    category.alwaysActive
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`p-2 ${category.bgColor} rounded-lg flex-shrink-0`}>
                        <IconComponent className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                          {category.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {category.alwaysActive ? (
                        <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap">
                          Toujours actifs
                        </div>
                      ) : (
                        <button
                          onClick={() => togglePreference(category.key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            isActive ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          aria-label={isActive ? 'Désactiver' : 'Activer'}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSaveCustom}
              className="flex-1 px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Enregistrer mes préférences
            </button>

            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Retour
            </button>
          </div>
        </>
      )}
    </ModalGND>
  );
};

export default CookiePreferencesModal;
