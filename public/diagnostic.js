// Script de diagnostic pour vérifier l'état des vidéos
console.log('🔍 DIAGNOSTIC DES VIDÉOS SUPABASE');
console.log('================================');

// Vérifier les Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log('🔍 Service Workers actifs:', registrations.length);
    if (registrations.length === 0) {
      console.log('✅ Aucun Service Worker actif - Parfait !');
    } else {
      console.log('❌ Service Workers encore actifs:', registrations.map(r => r.scope));
    }
  });
}

// Vérifier les caches
if ('caches' in window) {
  caches.keys().then(cacheNames => {
    console.log('🔍 Caches actifs:', cacheNames.length);
    cacheNames.forEach(cacheName => {
      console.log('📦 Cache:', cacheName);
    });
  });
}

// Tester les URLs des vidéos
const videoUrls = [
  'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/trinity_rebel_univers_officiel.mp4',
  'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Esther%20Seems%20-%20Bobine.mp4',
  'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Miel%20test%20website.mp4'
];

console.log('🎬 Test des URLs des vidéos:');
videoUrls.forEach((url, index) => {
  fetch(url, { method: 'HEAD' })
    .then(response => {
      console.log(`✅ Vidéo ${index + 1}: ${response.status} - ${response.statusText}`);
    })
    .catch(error => {
      console.log(`❌ Vidéo ${index + 1}: Erreur - ${error.message}`);
    });
});

console.log('✅ Diagnostic terminé');
