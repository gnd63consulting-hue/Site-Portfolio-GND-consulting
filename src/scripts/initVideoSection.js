/**
 * Script d'initialisation de la section vidéos
 * Utilise les données de src/data/videosData.js
 */

import { videosData } from '../data/videosData.js';

let currentVideoIndex = 0;
let intersectionObserver = null;
let isFirstThumbnailVisible = false;
let isLastThumbnailVisible = false;

// Fonction de raccourcissement intelligent des titres
function truncateTitle(title, maxLength = 35) {
  if (!title || title.length <= maxLength) {
    return title;
  }

  // Mots à supprimer (mots inutiles)
  const wordsToRemove = [
    'AVEC', 'AVEC', 'DE', 'DU', 'DES', 'LE', 'LA', 'LES', 'UN', 'UNE',
    'OFFICIEL', 'OFFICIELLE', 'CONCERT', 'LIVE', 'CAPTATION', 'ÉDITION',
    'FT', 'FEAT', 'FEATURING', 'COLLABORATION', 'PRODUCTION', 'RÉALISATION',
    'CLIP', 'VIDÉO', 'MUSICAL', 'MUSICALE', 'OFFICIEL', 'OFFICIELLE'
  ];

  // Mots importants à garder (noms d'artistes, événements)
  const importantWords = [
    'COOK', 'SOUL', 'KAOUTAR', 'PÉKIN', 'EXPRESS', 'ALI', 'SCIENTIFIC',
    'TRINITY', 'REBEL', 'DAFXCX', 'UNIVERS', 'ESTHER', 'SEEMS', 'BOBINE',
    'LEYEL', 'MIEL', 'SABAY', 'FESTIVAL', 'YUNGCALLY'
  ];

  // Nettoyer le titre
  let cleanTitle = title
    .replace(/[–—]/g, '-') // Remplacer les tirets longs par des tirets courts
    .replace(/\s+/g, ' ') // Normaliser les espaces
    .trim();

  // Diviser en mots
  let words = cleanTitle.split(' ');

  // Supprimer les mots inutiles
  words = words.filter(word => {
    const upperWord = word.toUpperCase();
    return !wordsToRemove.includes(upperWord);
  });

  // Reconstituer le titre
  let shortTitle = words.join(' ');

  // Appliquer des règles spécifiques pour certains titres connus
  if (title.includes('COOK & SOUL') && title.includes('KAOUTAR')) {
    return 'Cook & Soul - Pékin Express';
  }
  if (title.includes('ALI') && title.includes('SCIENTIFIC')) {
    return 'Ali 45 Scientific - Live';
  }
  if (title.includes('TRINITY REBEL') && title.includes('DAFXCX')) {
    return 'Trinity Rebel ft. Dafxcx';
  }

  // Si c'est encore trop long après nettoyage, appliquer des règles génériques
  if (shortTitle.length > maxLength) {
    if (title.includes('ESTHER SEEMS')) {
      return 'Esther Seems - Bobine';
    }
    if (title.includes('LEYEL') && title.includes('MIEL')) {
      return 'Leyel - Miel';
    }
    if (title.includes('SABAY FESTIVAL')) {
      return 'Sabay Festival 2023';
    }
    if (title.includes('YUNGCALLY')) {
      return 'Yungcally - Clip Officiel';
    }

    // Raccourcissement générique intelligent
    // Garder les premiers mots importants
    let importantWordsFound = [];
    let otherWords = [];
    
    words.forEach(word => {
      const upperWord = word.toUpperCase();
      if (importantWords.some(important => upperWord.includes(important))) {
        importantWordsFound.push(word);
      } else {
        otherWords.push(word);
      }
    });

    // Construire le titre raccourci
    if (importantWordsFound.length > 0) {
      shortTitle = importantWordsFound.join(' ');
      if (otherWords.length > 0 && shortTitle.length < maxLength - 10) {
        shortTitle += ' - ' + otherWords.slice(0, 2).join(' ');
      }
    } else {
      // Fallback : prendre les premiers mots
      shortTitle = words.slice(0, 4).join(' ');
    }
  }

  // Ajouter "..." seulement si vraiment nécessaire
  if (shortTitle.length > maxLength) {
    shortTitle = shortTitle.substring(0, maxLength - 3) + '...';
  }

  return shortTitle;
}

// Fonction pour générer la première frame d'une vidéo YouTube avec fallback
function getYouTubeThumbnail(videoUrl, quality = 'maxresdefault') {
  const videoId = videoUrl.split('v=')[1];
  if (!videoId) return null;
  
  // Essayer différentes qualités dans l'ordre de préférence
  const qualities = ['maxresdefault', 'hqdefault', 'mqdefault', 'default'];
  const targetQuality = qualities.includes(quality) ? quality : 'maxresdefault';
  
  return `https://img.youtube.com/vi/${videoId}/${targetQuality}.jpg`;
}

// Fonction pour tester si une image YouTube existe
function testYouTubeThumbnail(videoId, quality, callback) {
  const img = new Image();
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.src = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// Fonction pour obtenir le meilleur thumbnail YouTube disponible
function getBestYouTubeThumbnail(videoUrl, callback) {
  const videoId = videoUrl.split('v=')[1];
  if (!videoId) {
    callback(null);
    return;
  }
  
  const qualities = ['maxresdefault', 'hqdefault', 'mqdefault', 'default'];
  let currentIndex = 0;
  
  function tryNextQuality() {
    if (currentIndex >= qualities.length) {
      callback(null);
      return;
    }
    
    const quality = qualities[currentIndex];
    testYouTubeThumbnail(videoId, quality, (exists) => {
      if (exists) {
        callback(`https://img.youtube.com/vi/${videoId}/${quality}.jpg`);
      } else {
        currentIndex++;
        tryNextQuality();
      }
    });
  }
  
  tryNextQuality();
}

// Fonction pour générer la première frame d'une vidéo Supabase
function getSupabaseThumbnail(videoUrl) {
  // Pour les vidéos Supabase, créer une URL de thumbnail basée sur la première frame
  // Format: https://domain.com/video.mp4 -> https://domain.com/video_thumb.jpg
  const baseUrl = videoUrl.replace('.mp4', '');
  return `${baseUrl}_firstframe.jpg`;
}

// Fonction pour créer une première frame dynamique
function createVideoThumbnail(videoUrl, callback) {
  const video = document.createElement('video');
  video.crossOrigin = 'anonymous';
  video.preload = 'metadata';
  video.muted = true; // Important pour éviter les problèmes d'autoplay
  
  let timeoutId;
  
  video.onloadedmetadata = function() {
    // Aller à la première frame (0.1 seconde pour éviter les problèmes)
    video.currentTime = 0.1;
  };
  
  video.onseeked = function() {
    clearTimeout(timeoutId);
    try {
      // Créer un canvas pour capturer la première frame
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Dessiner la première frame sur le canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convertir en URL de données
      const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
      callback(thumbnailUrl);
    } catch (error) {
      console.warn('Erreur lors de la génération de la première frame:', error);
      callback(null);
    }
  };
  
  video.onerror = function() {
    clearTimeout(timeoutId);
    console.warn('Erreur lors du chargement de la vidéo pour la première frame:', videoUrl);
    callback(null);
  };
  
  // Timeout de sécurité
  timeoutId = setTimeout(() => {
    console.warn('Timeout lors de la génération de la première frame');
    callback(null);
  }, 5000);
  
  video.src = videoUrl;
}

// Fonction pour charger une vidéo par index
function loadVideo(index) {
  if (index < 0 || index >= videosData.length) return;
  
  const video = videosData[index];
  currentVideoIndex = index;
  
  // Mettre à jour le titre
  const titleElement = document.getElementById('videoTitle');
  if (titleElement) {
    titleElement.textContent = video.title;
  }
  
  // Mettre à jour la description
  const descriptionElement = document.getElementById('videoDescription');
  if (descriptionElement) {
    descriptionElement.innerHTML = video.description.replace(/\n\n/g, '<br><br>');
  }
  
  // Mettre à jour les crédits avec la nouvelle structure
  const creditsElement = document.getElementById('videoCredits');
  if (creditsElement) {
    // Extraire l'icône et le texte des crédits
    const creditsText = video.credits;
    let icon = '';
    let text = creditsText;
    
    // Déterminer l'icône selon le type de crédit
    if (creditsText.includes('🎬 Réalisation')) {
      icon = '🎬';
      text = creditsText.replace('🎬 ', '');
    } else if (creditsText.includes('📹 Production')) {
      icon = '📹';
      text = creditsText.replace('📹 ', '');
    } else if (creditsText.includes('📹 Captation')) {
      icon = '📹';
      text = creditsText.replace('📹 ', '');
    }
    
    // Créer la nouvelle structure HTML
    creditsElement.innerHTML = `
      <span class="video-credit-icon">${icon}</span>
      <span class="video-credit-text">${text}</span>
    `;
  }
  
  // Charger la vidéo dans l'iframe
  const videoEmbed = document.getElementById('videoEmbed');
  if (videoEmbed) {
    if (video.videoSource === 'youtube') {
      const videoId = video.videoUrl.split('v=')[1];
      videoEmbed.innerHTML = `
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&origin=${window.location.origin}"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          loading="lazy"
          title="${video.title}"
        ></iframe>
      `;
    } else if (video.videoSource === 'supabase') {
      // Pour les vidéos Supabase, générer une première frame dynamique pour le poster
      createVideoThumbnail(video.videoUrl, (thumbnailUrl) => {
        if (thumbnailUrl) {
          videoEmbed.innerHTML = `
            <video 
              controls 
              preload="metadata"
              poster="${thumbnailUrl}"
              title="${video.title}"
            >
              <source src="${video.videoUrl}" type="video/mp4">
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          `;
        } else {
          // Fallback avec l'image par défaut
          videoEmbed.innerHTML = `
            <video 
              controls 
              preload="metadata"
              poster="${video.thumbnailUrl}"
              title="${video.title}"
            >
              <source src="${video.videoUrl}" type="video/mp4">
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          `;
        }
      });
    }
  }
  
  // Mettre à jour les thumbnails actives
  updateActiveThumbnail(index);
  
  // Mettre à jour les dots actifs
  updateActiveDot(index);
  
  // Scroll vers la vignette sélectionnée
  scrollToThumbnail(index);
}

// Fonction pour mettre à jour le thumbnail actif
function updateActiveThumbnail(index) {
  const thumbnails = document.querySelectorAll('.thumbnail-item');
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

// Fonction pour mettre à jour le dot actif
function updateActiveDot(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Fonction pour mettre à jour l'état des flèches de navigation
function updateNavigationArrows() {
  const prevButton = document.querySelector('.slider-nav-prev');
  const nextButton = document.querySelector('.slider-nav-next');
  
  if (prevButton) {
    if (isFirstThumbnailVisible) {
      prevButton.disabled = true;
      prevButton.classList.add('disabled');
    } else {
      prevButton.disabled = false;
      prevButton.classList.remove('disabled');
    }
  }
  
  if (nextButton) {
    if (isLastThumbnailVisible) {
      nextButton.disabled = true;
      nextButton.classList.add('disabled');
    } else {
      nextButton.disabled = false;
      nextButton.classList.remove('disabled');
    }
  }
}

// Fonction pour initialiser l'IntersectionObserver
function initIntersectionObserver() {
  const thumbnailsTrack = document.querySelector('.thumbnails-track');
  if (!thumbnailsTrack) return;
  
  // Nettoyer l'observer existant
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }
  
  // Créer un nouvel observer
  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const thumbnailIndex = parseInt(entry.target.dataset.videoIndex);
      
      if (thumbnailIndex === 0) {
        // Première vignette
        isFirstThumbnailVisible = entry.isIntersecting;
      } else if (thumbnailIndex === videosData.length - 1) {
        // Dernière vignette
        isLastThumbnailVisible = entry.isIntersecting;
      }
    });
    
    // Mettre à jour les flèches après chaque changement
    updateNavigationArrows();
  }, {
    root: thumbnailsTrack,
    rootMargin: '0px',
    threshold: 1.0 // La vignette doit être complètement visible
  });
  
  // Observer toutes les vignettes
  const thumbnails = document.querySelectorAll('.thumbnail-item');
  thumbnails.forEach((thumbnail) => {
    intersectionObserver.observe(thumbnail);
  });
}

// Fonction pour scroll vers une vignette spécifique
function scrollToThumbnail(index) {
  const thumbnailsTrack = document.querySelector('.thumbnails-track');
  const thumbnailElement = document.querySelector(`[data-video-index="${index}"]`);
  
  if (!thumbnailsTrack || !thumbnailElement) return;
  
  // Utiliser scrollIntoView pour centrer la vignette
  thumbnailElement.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'nearest'
  });
}

// Fonction pour calculer la largeur d'une vignette + gap
function getThumbnailWidth() {
  const thumbnailsTrack = document.querySelector('.thumbnails-track');
  if (!thumbnailsTrack) return 0;
  
  const firstThumbnail = thumbnailsTrack.querySelector('.thumbnail-item');
  if (!firstThumbnail) return 0;
  
  const thumbnailWidth = firstThumbnail.offsetWidth;
  const gap = parseInt(getComputedStyle(thumbnailsTrack).gap) || 16;
  
  return thumbnailWidth + gap;
}

// Fonction pour calculer le nombre de vignettes visibles
function getVisibleThumbnailsCount() {
  const thumbnailsSlider = document.querySelector('.thumbnails-slider');
  if (!thumbnailsSlider) return 1;
  
  const sliderWidth = thumbnailsSlider.offsetWidth;
  const thumbnailWidth = getThumbnailWidth();
  
  return Math.floor(sliderWidth / thumbnailWidth);
}

// Fonction pour naviguer vers la vidéo suivante avec scroll
function nextVideo() {
  const thumbnailsTrack = document.querySelector('.thumbnails-track');
  if (!thumbnailsTrack) return;
  
  // Vérifier si la dernière vignette est visible
  if (isLastThumbnailVisible) {
    return; // Ne pas naviguer si toutes les vignettes sont visibles
  }
  
  const thumbnailWidth = getThumbnailWidth();
  const currentScroll = thumbnailsTrack.scrollLeft;
  const maxScroll = thumbnailsTrack.scrollWidth - thumbnailsTrack.clientWidth;
  
  // Calculer la position de scroll pour révéler la prochaine vignette cachée
  let nextScrollPosition;
  
  if (currentScroll >= maxScroll - 10) { // Tolérance de 10px
    // Si on est à la fin, revenir au début
    nextScrollPosition = 0;
  } else {
    // Calculer la position pour révéler la prochaine vignette complètement
    const currentVisibleIndex = Math.floor(currentScroll / thumbnailWidth);
    const nextVisibleIndex = currentVisibleIndex + 1;
    nextScrollPosition = nextVisibleIndex * thumbnailWidth;
    
    // S'assurer qu'on ne dépasse pas la limite
    nextScrollPosition = Math.min(nextScrollPosition, maxScroll);
  }
  
  // Scroll smooth vers la nouvelle position
  thumbnailsTrack.scrollTo({
    left: nextScrollPosition,
    behavior: 'smooth'
  });
  
  // Mettre à jour l'index de la vidéo actuelle
  const nextIndex = (currentVideoIndex + 1) % videosData.length;
  currentVideoIndex = nextIndex;
  
  // Mettre à jour les éléments actifs
  updateActiveThumbnail(nextIndex);
  updateActiveDot(nextIndex);
}

// Fonction pour naviguer vers la vidéo précédente avec scroll
function prevVideo() {
  const thumbnailsTrack = document.querySelector('.thumbnails-track');
  if (!thumbnailsTrack) return;
  
  // Vérifier si la première vignette est visible
  if (isFirstThumbnailVisible) {
    return; // Ne pas naviguer si on est au début
  }
  
  const thumbnailWidth = getThumbnailWidth();
  const currentScroll = thumbnailsTrack.scrollLeft;
  
  // Calculer la position de scroll pour révéler la vignette précédente
  let prevScrollPosition;
  
  if (currentScroll <= 10) { // Tolérance de 10px
    // Si on est au début, aller à la fin
    const maxScroll = thumbnailsTrack.scrollWidth - thumbnailsTrack.clientWidth;
    prevScrollPosition = maxScroll;
  } else {
    // Calculer la position pour révéler la vignette précédente complètement
    const currentVisibleIndex = Math.floor(currentScroll / thumbnailWidth);
    const prevVisibleIndex = Math.max(0, currentVisibleIndex - 1);
    prevScrollPosition = prevVisibleIndex * thumbnailWidth;
  }
  
  // Scroll smooth vers la nouvelle position
  thumbnailsTrack.scrollTo({
    left: prevScrollPosition,
    behavior: 'smooth'
  });
  
  // Mettre à jour l'index de la vidéo actuelle
  const prevIndex = currentVideoIndex === 0 ? videosData.length - 1 : currentVideoIndex - 1;
  currentVideoIndex = prevIndex;
  
  // Mettre à jour les éléments actifs
  updateActiveThumbnail(prevIndex);
  updateActiveDot(prevIndex);
}

// Fonction d'initialisation
function initVideoSection() {
  // Injecter les thumbnails avec premières frames
  const thumbnailsTrack = document.getElementById('thumbnailsTrack');
  if (thumbnailsTrack) {
    thumbnailsTrack.innerHTML = '';
    videosData.forEach((video, index) => {
      const thumbButton = document.createElement('button');
      thumbButton.className = 'thumbnail-item' + (index === 0 ? ' active' : '');
      thumbButton.dataset.videoIndex = index;
      
      // Créer l'image avec placeholder
      const img = document.createElement('img');
      img.alt = video.title;
      img.loading = 'lazy';
      
      // Utiliser directement l'URL de thumbnail depuis les données
      img.src = video.thumbnailUrl;
      
      // Pour les vidéos Supabase, essayer de générer une première frame dynamique
      if (video.videoSource === 'supabase') {
        // Pour Supabase, générer dynamiquement la première frame
        img.src = video.thumbnailUrl; // Image temporaire
        createVideoThumbnail(video.videoUrl, (thumbnailUrl) => {
          img.src = thumbnailUrl; // Remplacer par la vraie première frame
        });
      }
      
      const label = document.createElement('span');
      label.className = 'thumbnail-label';
      const displayTitle = truncateTitle(video.title);
      label.textContent = displayTitle;
      
      // Ajouter les data-attributes pour le debug
      thumbButton.setAttribute('data-full-title', video.title);
      thumbButton.setAttribute('data-display-title', displayTitle);
      thumbButton.setAttribute('data-length', video.title.length.toString());
      
      // Ajouter l'attribut title pour le tooltip natif
      thumbButton.setAttribute('title', video.title);
      
      thumbButton.appendChild(img);
      thumbButton.appendChild(label);
      
      // Event listener pour le clic sur thumbnail
      thumbButton.addEventListener('click', () => {
        loadVideo(index);
      });
      
      thumbnailsTrack.appendChild(thumbButton);
    });
  }

  // Injecter les dots de pagination
  const paginationDots = document.getElementById('paginationDots');
  if (paginationDots) {
    paginationDots.innerHTML = '';
    videosData.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (index === 0 ? ' active' : '');
      dot.dataset.index = index;
      
      // Event listener pour le clic sur dot
      dot.addEventListener('click', () => {
        loadVideo(index);
      });
      
      paginationDots.appendChild(dot);
    });
  }

  // Event listeners pour les boutons de navigation
  const prevButton = document.querySelector('.slider-nav-prev');
  const nextButton = document.querySelector('.slider-nav-next');
  
  if (prevButton) {
    prevButton.addEventListener('click', prevVideo);
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', nextVideo);
  }

  // Charger la première vidéo
  loadVideo(0);
  
  // Initialiser l'IntersectionObserver après un délai pour s'assurer que le DOM est prêt
  setTimeout(() => {
    initIntersectionObserver();
  }, 100);
  
  // Initialiser le drag-to-scroll
  initDragToScroll();
}

// Variables pour le drag-to-scroll
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

// Fonction pour initialiser le drag-to-scroll
function initDragToScroll() {
  const thumbnailsTrack = document.querySelector('.thumbnails-track');
  if (!thumbnailsTrack) return;

  // Événements souris
  thumbnailsTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    thumbnailsTrack.classList.add('dragging');
    startX = e.pageX - thumbnailsTrack.offsetLeft;
    scrollLeft = thumbnailsTrack.scrollLeft;
    thumbnailsTrack.style.cursor = 'grabbing';
  });

  thumbnailsTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    thumbnailsTrack.classList.remove('dragging');
    thumbnailsTrack.style.cursor = 'grab';
  });

  thumbnailsTrack.addEventListener('mouseup', () => {
    isDragging = false;
    thumbnailsTrack.classList.remove('dragging');
    thumbnailsTrack.style.cursor = 'grab';
  });

  thumbnailsTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - thumbnailsTrack.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier pour un scroll plus rapide
    thumbnailsTrack.scrollLeft = scrollLeft - walk;
  });

  // Événements tactiles
  thumbnailsTrack.addEventListener('touchstart', (e) => {
    isDragging = true;
    thumbnailsTrack.classList.add('dragging');
    startX = e.touches[0].pageX - thumbnailsTrack.offsetLeft;
    scrollLeft = thumbnailsTrack.scrollLeft;
  });

  thumbnailsTrack.addEventListener('touchend', () => {
    isDragging = false;
    thumbnailsTrack.classList.remove('dragging');
  });

  thumbnailsTrack.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - thumbnailsTrack.offsetLeft;
    const walk = (x - startX) * 2; // Multiplier pour un scroll plus rapide
    thumbnailsTrack.scrollLeft = scrollLeft - walk;
  });

  // Empêcher le scroll par défaut sur les événements de wheel
  thumbnailsTrack.addEventListener('wheel', (e) => {
    e.preventDefault();
    thumbnailsTrack.scrollLeft += e.deltaY;
  });
}

// Exporter les fonctions pour utilisation externe
export { initVideoSection, loadVideo, nextVideo, prevVideo };

// Auto-initialisation si le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVideoSection);
} else {
  initVideoSection();
}
