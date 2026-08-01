type Consent = {
  analytics: boolean;
};

let consent: Consent = { analytics: false };
let initialized = false;

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

function injectGtag(measurementId: string) {
  if (typeof document === 'undefined') return;
  if (document.getElementById('gtag-js')) return;

  /* La file dataLayer et le stub gtag sont posés AVANT le chargement du
     script, pas dans son onload. C'est le motif officiel de Google, et ce
     n'est pas cosmétique : gtag.js met 200 à 600 ms à arriver, et pendant
     ce temps `window.gtag` n'existait pas. Résultat, tout événement déclenché
     tôt (clic CTA au-dessus de la ligne de flottaison, envoi du formulaire
     d'un visiteur pressé) tombait dans le vide sans erreur. Avec le stub,
     ces appels s'empilent dans dataLayer et sont rejoués au chargement. */
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(){ window.dataLayer.push(arguments as unknown as never); } as any;
  }
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true });

  const script = document.createElement('script');
  script.id = 'gtag-js';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

export function loadConsentFromStorage() {
  try {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem('gnd-cookie-consent');
    if (raw) {
      const prefs = JSON.parse(raw);
      consent.analytics = !!prefs.analytics;
    }
  } catch {}
}

export function initAnalytics(measurementId?: string) {
  if (initialized) return;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  loadConsentFromStorage();
  if (!consent.analytics) return; // Respect consent
  if (!measurementId) return;
  injectGtag(measurementId);
  initialized = true;
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (!consent.analytics) return;
  if (typeof window === 'undefined') return;
  // gtag est le stub posé par injectGtag : l'appel est mis en file dans
  // dataLayer même si gtag.js n'a pas fini de charger.
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params || {});
  }
}

export function setConsent(newConsent: Partial<Consent>) {
  consent = { ...consent, ...newConsent };
}


