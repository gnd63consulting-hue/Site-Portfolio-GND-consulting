#!/usr/bin/env node

import puppeteer from 'puppeteer';

console.log('🔍 AUDIT COMPLET - SECTION PORTFOLIO VIDÉOS');
console.log('==========================================');

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
  } else if (text.includes('🔧') || text.includes('✅') || text.includes('❌') || text.includes('⚠️')) {
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

  // Test 1: Vérifier les vidéos Supabase
  console.log('\n🎬 TEST 1: Vérification des vidéos Supabase');
  console.log('==========================================');
  
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
          paused: video.paused
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
    if (video.error) {
      console.log(`     Erreur détail: ${video.error.message}`);
    }
  });

  // Test 2: Vérifier les boutons de contrôle
  console.log('\n🎮 TEST 2: Vérification des boutons de contrôle');
  console.log('==============================================');
  
  const controls = await page.evaluate(() => {
    const playButton = document.querySelector('button[aria-label*="Lire"], button[aria-label*="Play"]');
    const pauseButton = document.querySelector('button[aria-label*="Pause"]');
    const minus10Button = document.querySelector('button:has-text("-10s"), button[aria-label*="Reculer"]');
    const plus10Button = document.querySelector('button:has-text("+10s"), button[aria-label*="Avancer"]');
    const timeline = document.querySelector('input[type="range"]');
    
    return {
      playButton: playButton ? {
        visible: playButton.offsetParent !== null,
        disabled: playButton.disabled,
        text: playButton.textContent
      } : null,
      pauseButton: pauseButton ? {
        visible: pauseButton.offsetParent !== null,
        disabled: pauseButton.disabled,
        text: pauseButton.textContent
      } : null,
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
      timeline: timeline ? {
        visible: timeline.offsetParent !== null,
        disabled: timeline.disabled,
        min: timeline.min,
        max: timeline.max,
        value: timeline.value
      } : null
    };
  });

  console.log('🎯 Boutons de contrôle:');
  console.log(`  Play Button: ${controls.playButton ? 'TROUVÉ' : 'NON TROUVÉ'}`);
  if (controls.playButton) {
    console.log(`    Visible: ${controls.playButton.visible}`);
    console.log(`    Disabled: ${controls.playButton.disabled}`);
    console.log(`    Text: "${controls.playButton.text}"`);
  }
  
  console.log(`  Pause Button: ${controls.pauseButton ? 'TROUVÉ' : 'NON TROUVÉ'}`);
  if (controls.pauseButton) {
    console.log(`    Visible: ${controls.pauseButton.visible}`);
    console.log(`    Disabled: ${controls.pauseButton.disabled}`);
  }
  
  console.log(`  -10s Button: ${controls.minus10Button ? 'TROUVÉ' : 'NON TROUVÉ'}`);
  if (controls.minus10Button) {
    console.log(`    Visible: ${controls.minus10Button.visible}`);
    console.log(`    Disabled: ${controls.minus10Button.disabled}`);
  }
  
  console.log(`  +10s Button: ${controls.plus10Button ? 'TROUVÉ' : 'NON TROUVÉ'}`);
  if (controls.plus10Button) {
    console.log(`    Visible: ${controls.plus10Button.visible}`);
    console.log(`    Disabled: ${controls.plus10Button.disabled}`);
  }
  
  console.log(`  Timeline: ${controls.timeline ? 'TROUVÉ' : 'NON TROUVÉ'}`);
  if (controls.timeline) {
    console.log(`    Visible: ${controls.timeline.visible}`);
    console.log(`    Disabled: ${controls.timeline.disabled}`);
    console.log(`    Min: ${controls.timeline.min}, Max: ${controls.timeline.max}, Value: ${controls.timeline.value}`);
  }

  // Test 3: Vérifier les erreurs dans la console
  console.log('\n🚨 TEST 3: Vérification des erreurs');
  console.log('===================================');
  
  const errors = await page.evaluate(() => {
    return window.consoleErrors || [];
  });
  
  console.log(`📊 Erreurs capturées: ${errors.length}`);
  errors.forEach((error, index) => {
    console.log(`  ${index + 1}. ${error}`);
  });

  // Test 4: Tester la navigation du carrousel
  console.log('\n🎠 TEST 4: Test de navigation du carrousel');
  console.log('==========================================');
  
  // Chercher les boutons de navigation du carrousel
  const carouselButtons = await page.$$('button[aria-label*="Précédent"], button[aria-label*="Suivant"], .carousel button');
  console.log(`🎯 Boutons de carrousel trouvés: ${carouselButtons.length}`);
  
  if (carouselButtons.length > 0) {
    console.log('🔄 Test de clic sur le premier bouton de navigation...');
    await carouselButtons[0].click();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Vérifier si la vidéo a changé
    const newVideoState = await page.evaluate(() => {
      const video = document.querySelector('video');
      return video ? {
        src: video.src,
        readyState: video.readyState,
        duration: video.duration
      } : null;
    });
    
    console.log('📊 État de la vidéo après navigation:');
    if (newVideoState) {
      console.log(`  Src: ${newVideoState.src}`);
      console.log(`  ReadyState: ${newVideoState.readyState}`);
      console.log(`  Duration: ${newVideoState.duration}s`);
    } else {
      console.log('  ❌ Aucune vidéo trouvée');
    }
  }

  console.log('\n✅ AUDIT TERMINÉ');
  console.log('================');

} catch (error) {
  console.error('❌ Erreur lors de l\'audit:', error);
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

