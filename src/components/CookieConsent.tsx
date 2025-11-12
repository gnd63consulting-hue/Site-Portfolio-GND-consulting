import React, { useState, useEffect } from 'react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleCustomize = () => {
    // Pour l'instant, juste accepter
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <button 
        onClick={() => setIsVisible(false)}
        className="cookie-close"
        aria-label="Fermer"
      >
        ×
      </button>
      
      <div className="cookie-content">
        <div className="cookie-text">
          <span className="cookie-icon">🍪</span>
          Nous utilisons des cookies pour améliorer votre expérience.
          <a href="/mentions-legales#section-7" className="cookie-link">En savoir plus</a>
        </div>
        
        <div className="cookie-actions">
          <button 
            onClick={handleCustomize}
            className="cookie-customize-btn"
          >
            Personnaliser
          </button>
          <button 
            onClick={handleAcceptAll}
            className="cookie-accept-btn"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;