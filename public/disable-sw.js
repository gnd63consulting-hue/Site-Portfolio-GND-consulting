// Script pour forcer la désactivation du Service Worker
console.log('🚫 DÉSACTIVATION FORCÉE DU SERVICE WORKER');

// Désactiver tous les Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('🔍 Service Workers trouvés:', registrations.length);
    registrations.forEach(registration => {
      console.log('🚫 Désactivation:', registration.scope);
      registration.unregister().then(() => {
        console.log('✅ Service Worker désactivé:', registration.scope);
      }).catch(error => {
        console.error('❌ Erreur:', error);
      });
    });
  });
}

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

console.log('✅ Script de désactivation terminé');
