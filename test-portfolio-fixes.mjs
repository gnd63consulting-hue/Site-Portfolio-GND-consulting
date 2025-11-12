#!/usr/bin/env node

import puppeteer from 'puppeteer';

console.log('🔍 TEST DES CORRECTIONS - SECTION PORTFOLIO VIDÉOS');
console.log('================================================');

const browser = await puppeteer.launch({ 
  headless: false, 
  devtools: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();

// Activer les logs de la console
page.on('console', msg => {
  const type = msg.type();
  const text = msg.text();
  
  if (type === 'error') {
    console.log(`❌ CONSOLE ERROR: ${text}`);
  } else if (type === 'warn') {
    console.log(`⚠️ CONSOLE WARN: ${text}`);
  } else if (text.includes('🔧') || text.includes('✅') || text.includes('❌') || text.includes('⚠️') || text.includes('🔄')) {
    console.log(`📝 CONSOLE LOG: ${text}`);
  }
});

// Intercepter les erreurs réseau
page.on('response', response => {
  if (!response.ok() && response.url().includes('supabase')) {
    console.log(`🌐 NETWORK ERROR: ${response.status()} - ${response.url()}`);
  }
});

try {
  console.log('📱 Navigation vers la section portfolio...');
  await page.goto('http://localhost:5175/#portfolio', { 
    waitUntil: 'networkidle0',
    timeout: 10000 
  });

  // Attendre que le composant soit chargé
  await page.waitForSelector('[data-testid="portfolio-section"], .portfolio-section, #portfolio', { timeout: 5000 });
  
  console.log('✅ Page chargée avec succès');

  // Attendre que les vidéos soient chargées
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Test 1: Vérifier les corrections des URLs Supabase
  console.log('\n🎬 TEST 1: Vérification des corrections URLs Supabase');
  console.log('=====================================================');
  
  const supabaseVideos = await page.evaluate(() => {
    const videos = document.querySelectorAll('video');
    const supabaseVideos = [];
    
    videos.forEach((video, index) => {
      if (video.src && video.src.includes('supabase.co')) {
        supabaseVideos.push({
          index,
          src: video.src,
          error: video.error,
          readyState: video.readyState,
          duration: video.duration,
          currentTime: video.currentTime,
          paused: video.paused,
          // Vérifier si l'URL est bien encodée
          isEncoded: video.src.includes('%20') || video.src.includes('%2E') || video.src.includes('%2D')
        });
      }
    });
    
    return supabaseVideos;
  });

  console.log(`📊 Vidéos Supabase trouvées: ${supabaseVideos.length}`);
  supabaseVideos.forEach((video, index) => {
    console.log(`  ${index + 1}. URL: ${video.src}`);
    console.log(`     ReadyState: ${video.readyState} (${getReadyStateText(video.readyState)})`);
    console.log(`     Duration: ${video.duration}s`);
    console.log(`     Error: ${video.error ? 'OUI' : 'NON'}`);
    console.log(`     Encodée: ${video.isEncoded ? 'OUI' : 'NON'}`);
    if (video.error) {
      console.log(`     Erreur détail: ${video.error.message}`);
    }
  });

  // Test 2: Vérifier la synchronisation du bouton Play central
  console.log('\n🎮 TEST 2: Vérification de la synchronisation du bouton Play');
  console.log('==========================================================');
  
  // Cliquer sur le bouton Play central
  const centralPlayButton = await page.$('.vp-center');
  if (centralPlayButton) {
    console.log('🎯 Test du bouton Play central...');
    await centralPlayButton.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Vérifier l'état après le clic
    const playButtonState = await page.evaluate(() => {
      const video = document.querySelector('video');
      const playButton = document.querySelector('.vp-center');
      const overlayPlayButton = document.querySelector('.absolute.inset-0.flex.items-center.justify-center.z-10');
      
      return {
        videoPaused: video ? video.paused : null,
        playButtonVisible: playButton ? playButton.offsetParent !== null : false,
        overlayPlayButtonVisible: overlayPlayButton ? overlayPlayButton.offsetParent !== null : false,
        videoReadyState: video ? video.readyState : null
      };
    });
    
    console.log('📊 État après clic sur Play central:');
    console.log(`  Vidéo en pause: ${playButtonState.videoPaused}`);
    console.log(`  Bouton Play central visible: ${playButtonState.playButtonVisible}`);
    console.log(`  Overlay Play visible: ${playButtonState.overlayPlayButtonVisible}`);
    console.log(`  ReadyState vidéo: ${playButtonState.videoReadyState}`);
  }

  // Test 3: Vérifier les boutons de contrôle timeline
  console.log('\n⏰ TEST 3: Vérification des boutons timeline (+10s / -10s)');
  console.log('=======================================================');
  
  const timelineControls = await page.evaluate(() => {
    const minus10Button = document.querySelector('button:has-text("-10s"), button[aria-label*="Reculer"]');
    const plus10Button = document.querySelector('button:has-text("+10s"), button[aria-label*="Avancer"]');
    const video = document.querySelector('video');
    
    return {
      minus10Button: minus10Button ? {
        visible: minus10Button.offsetParent !== null,
        disabled: minus10Button.disabled,
        text: minus10Button.textContent
      } : null,
      plus10Button: plus10Button ? {
        visible: plus10Button.offsetParent !== null,
        disabled: plus10Button.disabled,
        text: plus10Button.textContent
      } : null,
      video: video ? {
        readyState: video.readyState,
        duration: video.duration,
        currentTime: video.currentTime
      } : null
    };
  });

  console.log('🎯 Boutons timeline:');
  console.log(`  -10s Button: ${timelineControls.minus10Button ? 'TROUVÉ' : 'NON TROUVÉ'}`);
  if (timelineControls.minus10Button) {
    console.log(`    Visible: ${timelineControls.minus10Button.visible}`);
    console.log(`    Disabled: ${timelineControls.minus10Button.disabled}`);
    console.log(`    Text: "${timelineControls.minus10Button.text}"`);
  }
  
  console.log(`  +10s Button: ${timelineControls.plus10Button ? 'TROUVÉ' : 'NON TROUVÉ'}`);
  if (timelineControls.plus10Button) {
    console.log(`    Visible: ${timelineControls.plus10Button.visible}`);
    console.log(`    Disabled: ${timelineControls.plus10Button.disabled}`);
    console.log(`    Text: "${timelineControls.plus10Button.text}"`);
  }
  
  console.log(`  Vidéo ReadyState: ${timelineControls.video?.readyState}`);
  console.log(`  Vidéo Duration: ${timelineControls.video?.duration}s`);

  // Test 4: Vérifier le changement de vidéo dans le carrousel
  console.log('\n🎠 TEST 4: Test de changement de vidéo dans le carrousel');
  console.log('======================================================');
  
  // Chercher les boutons de navigation du carrousel
  const carouselButtons = await page.$$('button[aria-label*="Précédent"], button[aria-label*="Suivant"], .carousel button');
  console.log(`🎯 Boutons de carrousel trouvés: ${carouselButtons.length}`);
  
  if (carouselButtons.length > 0) {
    console.log('🔄 Test de clic sur le premier bouton de navigation...');
    
    // Capturer l'état avant le changement
    const beforeState = await page.evaluate(() => {
      const video = document.querySelector('video');
      return video ? {
        src: video.src,
        readyState: video.readyState,
        duration: video.duration,
        currentTime: video.currentTime
      } : null;
    });
    
    console.log('📊 État avant changement:', beforeState);
    
    await carouselButtons[0].click();
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Vérifier si la vidéo a changé
    const afterState = await page.evaluate(() => {
      const video = document.querySelector('video');
      return video ? {
        src: video.src,
        readyState: video.readyState,
        duration: video.duration,
        currentTime: video.currentTime
      } : null;
    });
    
    console.log('📊 État après changement:', afterState);
    
    if (beforeState && afterState) {
      const hasChanged = beforeState.src !== afterState.src;
      console.log(`✅ Vidéo a changé: ${hasChanged ? 'OUI' : 'NON'}`);
      if (hasChanged) {
        console.log(`  Avant: ${beforeState.src}`);
        console.log(`  Après: ${afterState.src}`);
      }
    }
  }

  // Test 5: Vérifier la gestion des erreurs
  console.log('\n🚨 TEST 5: Vérification de la gestion des erreurs');
  console.log('===============================================');
  
  const errorHandling = await page.evaluate(() => {
    const video = document.querySelector('video');
    const errorOverlay = document.querySelector('.absolute.inset-0.flex.flex-col.items-center.justify-center.gap-3.bg-black\\/60');
    
    return {
      videoError: video ? video.error : null,
      errorOverlayVisible: errorOverlay ? errorOverlay.offsetParent !== null : false,
      retryButton: document.querySelector('button:has-text("Réessayer")')
    };
  });
  
  console.log('📊 Gestion des erreurs:');
  console.log(`  Erreur vidéo: ${errorHandling.videoError ? 'OUI' : 'NON'}`);
  console.log(`  Overlay d'erreur visible: ${errorHandling.errorOverlayVisible}`);
  console.log(`  Bouton Réessayer: ${errorHandling.retryButton ? 'TROUVÉ' : 'NON TROUVÉ'}`);

  console.log('\n✅ TESTS TERMINÉS');
  console.log('================');

} catch (error) {
  console.error('❌ Erreur lors des tests:', error);
} finally {
  await browser.close();
}

function getReadyStateText(readyState) {
  const states = {
    0: 'HAVE_NOTHING',
    1: 'HAVE_METADATA', 
    2: 'HAVE_CURRENT_DATA',
    3: 'HAVE_FUTURE_DATA',
    4: 'HAVE_ENOUGH_DATA'
  };
  return states[readyState] || 'UNKNOWN';
}
