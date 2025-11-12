// Script de diagnostic pour la vidéo hero mobile
console.log('🔍 DIAGNOSTIC VIDÉO HERO MOBILE');

// Vérifier si on est sur mobile
const isMobile = window.innerWidth <= 768;
console.log('📱 Mobile détecté:', isMobile, 'Largeur:', window.innerWidth);

// Vérifier les éléments vidéo
const heroVideo = document.querySelector('.hero-video');
const heroContainer = document.querySelector('.hero-video-container');
const heroSection = document.querySelector('#hero');

console.log('🎥 Éléments trouvés:');
console.log('- Hero video:', heroVideo ? '✅ Trouvé' : '❌ Non trouvé');
console.log('- Hero container:', heroContainer ? '✅ Trouvé' : '❌ Non trouvé');
console.log('- Hero section:', heroSection ? '✅ Trouvé' : '❌ Non trouvé');

if (heroVideo) {
  console.log('🎬 Propriétés vidéo:');
  console.log('- Display:', getComputedStyle(heroVideo).display);
  console.log('- Visibility:', getComputedStyle(heroVideo).visibility);
  console.log('- Opacity:', getComputedStyle(heroVideo).opacity);
  console.log('- Object-fit:', getComputedStyle(heroVideo).objectFit);
  console.log('- Object-position:', getComputedStyle(heroVideo).objectPosition);
  console.log('- Z-index:', getComputedStyle(heroVideo).zIndex);
  console.log('- Position:', getComputedStyle(heroVideo).position);
  console.log('- Width:', getComputedStyle(heroVideo).width);
  console.log('- Height:', getComputedStyle(heroVideo).height);
  
  // Vérifier si la vidéo est en cours de lecture
  console.log('▶️ État de lecture:');
  console.log('- Paused:', heroVideo.paused);
  console.log('- Ended:', heroVideo.ended);
  console.log('- Ready state:', heroVideo.readyState);
  console.log('- Current time:', heroVideo.currentTime);
  console.log('- Duration:', heroVideo.duration);
  
  // Vérifier les sources
  console.log('📺 Sources vidéo:');
  const sources = heroVideo.querySelectorAll('source');
  sources.forEach((source, index) => {
    console.log(`- Source ${index + 1}:`, source.src, source.type);
  });
}

if (heroContainer) {
  console.log('📦 Propriétés conteneur:');
  console.log('- Display:', getComputedStyle(heroContainer).display);
  console.log('- Visibility:', getComputedStyle(heroContainer).visibility);
  console.log('- Overflow:', getComputedStyle(heroContainer).overflow);
}

if (heroSection) {
  console.log('🏠 Propriétés section:');
  console.log('- Height:', getComputedStyle(heroSection).height);
  console.log('- Min-height:', getComputedStyle(heroSection).minHeight);
  console.log('- Overflow:', getComputedStyle(heroSection).overflow);
}

// Vérifier les images de fallback
const fallbackImages = document.querySelectorAll('.hero-video-container img');
console.log('🖼️ Images de fallback:', fallbackImages.length);
fallbackImages.forEach((img, index) => {
  console.log(`- Image ${index + 1}:`, img.src, 'Display:', getComputedStyle(img).display);
});

console.log('✅ Diagnostic terminé');
