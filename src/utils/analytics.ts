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
  const script = document.createElement('script');
  script.id = 'gtag-js';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(){ window.dataLayer.push(arguments as unknown as never); } as any;
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true });
  };
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
  // @ts-ignore
  if (typeof window.gtag === 'function') {
    // @ts-ignore
    window.gtag('event', eventName, params || {});
  }
}

export function setConsent(newConsent: Partial<Consent>) {
  consent = { ...consent, ...newConsent };
}


