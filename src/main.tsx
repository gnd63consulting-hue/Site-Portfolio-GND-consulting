import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Silence non-essential console logs in production (keep errors)
const __isDev = (typeof import.meta !== 'undefined' && (import.meta as any).env?.MODE === 'development') || process.env.NODE_ENV === 'development';
if (typeof window !== 'undefined' && !__isDev) {
  const __noop = () => {};
  // Only silence log/warn/debug; keep console.error for real issues
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (console as any).log = __noop;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (console as any).warn = __noop;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (console as any).debug = __noop;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register Service Worker (non-blocking) - TEMPORAIREMENT DÉSACTIVÉ POUR LES TESTS VIDÉO
// if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').catch(() => {});
//   });
// }

// Désactiver COMPLÈTEMENT le Service Worker pour éviter les conflits CORS avec Supabase
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  // Désactiver immédiatement tous les Service Workers
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('🚫 Désactivation FORCÉE de tous les Service Workers:', registrations.length);
    registrations.forEach(registration => {
      console.log('🚫 Désactivation du Service Worker:', registration.scope);
      registration.unregister().then(() => {
        console.log('✅ Service Worker désactivé avec succès');
      }).catch(error => {
        console.error('❌ Erreur lors de la désactivation:', error);
      });
    });
  });
  
  // Empêcher l'enregistrement de nouveaux Service Workers
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('🚫 Tentative d\'enregistrement de Service Worker bloquée');
  });
}
