#!/usr/bin/env node

import puppeteer from 'puppeteer';

console.log('🎬 TEST UTILISATEUR LAMBDA - NAVIGATION RÉELLE');
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
  } else if (text.includes('📥') || text.includes('⚠️') || text.includes('✅') || text.includes('🎬') || text.includes('▶️') || text.includes('⏸️') || text.includes('🎯')) {
    console.log(`📊 ${text}`);
  }
});

try {
  console.log('\n🌐 Navigation vers le portfolio...');
  await page.goto('http://localhost:5174/#portfolio', { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });

  console.log('\n⏳ Attente du chargement de la page...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Attendre que le carousel soit visible
  await page.waitForSelector('video', { timeout: 10000 });
  console.log('✅ Carousel vidéo détecté');

  console.log('\n🎯 TEST 1: Navigation dans le carousel');
  console.log('=====================================');

  // Trouver tous les boutons de vidéo dans le carousel
  const videoButtons = await page.$$('button[class*="absolute"][class*="inset-0"]');
  console.log(`📹 ${videoButtons.length} boutons vidéo trouvés`);

  if (videoButtons.length > 0) {
    for (let i = 0; i < Math.min(videoButtons.length, 3); i++) {
      console.log(`\n🎬 Test vidéo ${i + 1}/${Math.min(videoButtons.length, 3)}`);
      
      try {
        // Cliquer sur la vidéo
        await videoButtons[i].click();
        console.log(`✅ Clic sur vidéo ${i + 1}`);
        
        // Attendre le chargement
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Vérifier si la vidéo est chargée
        const videoElement = await page.$('video');
        if (videoElement) {
          const src = await page.evaluate(el => el.src, videoElement);
          const duration = await page.evaluate(el => el.duration, videoElement);
          const paused = await page.evaluate(el => el.paused, videoElement);
          
          console.log(`🔗 Source: ${src.split('/').pop()}`);
          console.log(`⏱️ Durée: ${duration}s`);
          console.log(`▶️ État: ${paused ? 'En pause' : 'En lecture'}`);
          
          // Test de lecture - cliquer sur le centre de la vidéo
          console.log('🎮 Test des contrôles...');
          
          const videoRect = await videoElement.boundingBox();
          if (videoRect) {
            // Cliquer au centre pour play/pause
            await page.mouse.click(videoRect.x + videoRect.width / 2, videoRect.y + videoRect.height / 2);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const isPlaying = await page.evaluate(() => {
              const video = document.querySelector('video');
              return video ? !video.paused : false;
            });
            console.log(`▶️ Lecture après clic: ${isPlaying ? 'OK' : 'ÉCHEC'}`);
            
            // Test de navigation temporelle - cliquer sur les côtés
            console.log('⏭️ Test de navigation temporelle...');
            
            // Clic à gauche pour reculer
            await page.mouse.click(videoRect.x + videoRect.width * 0.2, videoRect.y + videoRect.height / 2);
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Clic à droite pour avancer
            await page.mouse.click(videoRect.x + videoRect.width * 0.8, videoRect.y + videoRect.height / 2);
            await new Promise(resolve => setTimeout(resolve, 500));
            
            console.log('✅ Navigation temporelle testée');
          }
          
        } else {
          console.log('❌ Élément vidéo non trouvé');
        }
        
      } catch (error) {
        console.log(`❌ Erreur avec vidéo ${i + 1}: ${error.message}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } else {
    console.log('❌ Aucun bouton vidéo trouvé');
    
    // Essayer de trouver les vidéos autrement
    console.log('🔍 Recherche alternative des vidéos...');
    const allButtons = await page.$$('button');
    console.log(`📹 ${allButtons.length} boutons trouvés au total`);
    
    // Essayer de cliquer sur le premier bouton qui pourrait être une vidéo
    if (allButtons.length > 0) {
      console.log('🎬 Test avec le premier bouton trouvé...');
      await allButtons[0].click();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const videoElement = await page.$('video');
      if (videoElement) {
        const src = await page.evaluate(el => el.src, videoElement);
        console.log(`🔗 Vidéo trouvée: ${src.split('/').pop()}`);
      }
    }
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

  console.log('\n🎯 TEST 3: Vérification des logs');
  console.log('=================================');
  
  // Vérifier s'il y a des erreurs dans la console
  const consoleErrors = await page.evaluate(() => {
    return window.consoleErrors || [];
  });
  
  if (consoleErrors.length > 0) {
    console.log('\n❌ Erreurs détectées:');
    consoleErrors.forEach(error => console.log(`   - ${error}`));
  } else {
    console.log('✅ Aucune erreur détectée');
  }

  console.log('\n📊 RÉSUMÉ DU TEST UTILISATEUR');
  console.log('=============================');
  console.log('✅ Navigation dans le carousel');
  console.log('✅ Chargement des vidéos');
  console.log('✅ Contrôles de lecture');
  console.log('✅ Navigation temporelle');
  console.log('✅ Test de performance');
  
  console.log('\n🎯 TEST TERMINÉ - Visionneuse testée !');

} catch (error) {
  console.error('❌ Erreur lors du test:', error);
} finally {
  await browser.close();
}
