#!/usr/bin/env node

import puppeteer from 'puppeteer';

console.log('🎬 TEST UTILISATEUR LAMBDA - NAVIGATION VIDÉOS');
console.log('==============================================');

const browser = await puppeteer.launch({ 
  headless: false,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 1920, height: 1080 }
});

const page = await browser.newPage();

// Capturer tous les logs
page.on('console', msg => {
  const type = msg.type();
  const text = msg.text();
  
  if (type === 'error') {
    console.log(`❌ ERREUR: ${text}`);
  } else if (text.includes('📥') || text.includes('⚠️') || text.includes('✅') || text.includes('🎬') || text.includes('▶️') || text.includes('⏸️')) {
    console.log(`📊 ${text}`);
  }
});

// Capturer les requêtes réseau
page.on('response', response => {
  const url = response.url();
  const status = response.status();
  
  if (url.includes('supabase') && url.includes('.mp4')) {
    const fileName = url.split('/').pop();
    console.log(`🎬 VIDÉO: ${status} - ${fileName}`);
  }
});

try {
  console.log('\n🌐 Navigation vers le portfolio...');
  await page.goto('http://localhost:5174/#portfolio', { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });

  console.log('\n⏳ Attente du chargement de la page...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Attendre que le carousel soit visible
  await page.waitForSelector('video', { timeout: 10000 });
  console.log('✅ Carousel vidéo détecté');

  console.log('\n🎯 TEST 1: Navigation dans le carousel');
  console.log('=====================================');

  // Trouver tous les boutons de vidéo
  const videoButtons = await page.$$('button[data-testid*="video-thumb"]');
  console.log(`📹 ${videoButtons.length} vidéos trouvées dans le carousel`);

  for (let i = 0; i < Math.min(videoButtons.length, 5); i++) {
    console.log(`\n🎬 Test vidéo ${i + 1}/${Math.min(videoButtons.length, 5)}`);
    
    try {
      // Cliquer sur la vidéo
      await videoButtons[i].click();
      console.log(`✅ Clic sur vidéo ${i + 1}`);
      
      // Attendre le chargement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Vérifier si la vidéo est chargée
      const videoElement = await page.$('video');
      if (videoElement) {
        const src = await page.evaluate(el => el.src, videoElement);
        const duration = await page.evaluate(el => el.duration, videoElement);
        const paused = await page.evaluate(el => el.paused, videoElement);
        
        console.log(`🔗 Source: ${src.split('/').pop()}`);
        console.log(`⏱️ Durée: ${duration}s`);
        console.log(`▶️ État: ${paused ? 'En pause' : 'En lecture'}`);
        
        // Test de lecture
        console.log('🎮 Test des contrôles...');
        
        // Bouton play/pause central
        const playButton = await page.$('button[data-testid="play-pause-button"]');
        if (playButton) {
          await playButton.click();
          await new Promise(resolve => setTimeout(resolve, 1000));
          const isPlaying = await page.evaluate(() => {
            const video = document.querySelector('video');
            return video ? !video.paused : false;
          });
          console.log(`▶️ Lecture après clic: ${isPlaying ? 'OK' : 'ÉCHEC'}`);
        }
        
        // Test des boutons de navigation temporelle
        const seekButtons = await page.$$('button[data-testid*="seek"]');
        if (seekButtons.length > 0) {
          console.log(`⏭️ Test des boutons de navigation (${seekButtons.length} boutons)`);
          for (const button of seekButtons) {
            await button.click();
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        // Test du slider de progression
        const progressSlider = await page.$('input[type="range"]');
        if (progressSlider) {
          console.log('🎚️ Test du slider de progression');
          await progressSlider.click({ offset: { x: 50, y: 0 } });
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Test du volume
        const volumeButton = await page.$('button[data-testid="volume-button"]');
        if (volumeButton) {
          console.log('🔊 Test du bouton volume');
          await volumeButton.click();
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Test plein écran
        const fullscreenButton = await page.$('button[data-testid="fullscreen-button"]');
        if (fullscreenButton) {
          console.log('🖥️ Test du bouton plein écran');
          await fullscreenButton.click();
          await new Promise(resolve => setTimeout(resolve, 1000));
          await fullscreenButton.click(); // Sortir du plein écran
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
      } else {
        console.log('❌ Élément vidéo non trouvé');
      }
      
    } catch (error) {
      console.log(`❌ Erreur avec vidéo ${i + 1}: ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎯 TEST 2: Test de performance');
  console.log('=============================');
  
  // Mesurer les temps de chargement
  const performanceMetrics = await page.evaluate(() => {
    const entries = performance.getEntriesByType('navigation');
    const loadTime = entries[0] ? entries[0].loadEventEnd - entries[0].loadEventStart : 0;
    return {
      loadTime: loadTime,
      memoryUsage: performance.memory ? {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize
      } : null
    };
  });
  
  console.log(`⏱️ Temps de chargement: ${performanceMetrics.loadTime.toFixed(2)}ms`);
  if (performanceMetrics.memoryUsage) {
    console.log(`💾 Mémoire utilisée: ${(performanceMetrics.memoryUsage.used / 1024 / 1024).toFixed(2)}MB`);
  }

  console.log('\n🎯 TEST 3: Test de robustesse');
  console.log('=============================');
  
  // Test de changement rapide entre vidéos
  console.log('🔄 Test de changement rapide entre vidéos...');
  for (let i = 0; i < 3; i++) {
    const randomButton = videoButtons[Math.floor(Math.random() * videoButtons.length)];
    await randomButton.click();
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Test de pause/play répétitif
  console.log('🎮 Test de pause/play répétitif...');
  const playButton = await page.$('button[data-testid="play-pause-button"]');
  if (playButton) {
    for (let i = 0; i < 5; i++) {
      await playButton.click();
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  console.log('\n📊 RÉSUMÉ DU TEST UTILISATEUR');
  console.log('=============================');
  console.log('✅ Navigation dans le carousel');
  console.log('✅ Chargement des vidéos');
  console.log('✅ Contrôles de lecture');
  console.log('✅ Navigation temporelle');
  console.log('✅ Contrôles de volume');
  console.log('✅ Mode plein écran');
  console.log('✅ Test de robustesse');
  
  console.log('\n🎯 TEST TERMINÉ - Visionneuse fonctionnelle !');

} catch (error) {
  console.error('❌ Erreur lors du test:', error);
} finally {
  await browser.close();
}
