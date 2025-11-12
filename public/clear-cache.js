// Script pour nettoyer le cache et forcer le rechargement
console.log('🧹 NETTOYAGE DU CACHE ET RECHARGEMENT FORCÉ');

// Nettoyer tous les caches
if ('caches' in window) {
  caches.keys().then(cacheNames => {
    console.log('🗑️ Nettoyage des caches:', cacheNames.length);
    cacheNames.forEach(cacheName => {
      caches.delete(cacheName).then(() => {
        console.log('✅ Cache supprimé:', cacheName);
      });
    });
  });
}

// Désactiver tous les Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('🚫 Désactivation de tous les Service Workers:', registrations.length);
    registrations.forEach(registration => {
      registration.unregister().then(() => {
        console.log('✅ Service Worker désactivé:', registration.scope);
      });
    });
  });
}

// Forcer le rechargement après nettoyage
setTimeout(() => {
  console.log('🔄 Rechargement forcé de la page...');
  window.location.reload(true);
}, 2000);
