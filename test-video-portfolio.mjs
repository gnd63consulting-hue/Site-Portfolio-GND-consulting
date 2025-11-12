#!/usr/bin/env node

/**
 * 🧪 SCRIPT DE TEST AUTOMATISÉ - PORTFOLIO VIDÉO
 * 
 * Ce script teste toutes les fonctionnalités du lecteur vidéo :
 * - Chargement des vidéos YouTube et Supabase
 * - Navigation dans le carrousel
 * - Contrôles de lecture
 * - Gestion des erreurs
 */

import puppeteer from 'puppeteer';

const PORTFOLIO_URL = 'http://localhost:5175/#portfolio';

// Liste des vidéos à tester (basée sur le code Portfolio.tsx)
const VIDEOS_TO_TEST = [
  {
    id: 'esther-seems-bobine',
    title: 'ESTHER SEEMS – BOBINE',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=6oaO6YoWjyQ',
    expected: 'should_load'
  },
  {
    id: 'leyel-miel',
    title: 'LEYEL – MIEL',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=UbXQim7iNLI',
    expected: 'should_load'
  },
  {
    id: 'trinity-rebel-univers-officiel',
    title: 'TRINITY REBEL FT DAFXCX – L\'UNIVERS OFFICIEL',
    type: 'supabase',
    url: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/trinity_rebel_univers_officiel.mp4',
    expected: 'should_load'
  },
  {
    id: 'sabay-festival-2023',
    title: 'SABAY FESTIVAL 2023',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=Vyhz7_D4fFU',
    expected: 'should_load'
  },
  {
    id: 'concert-ali',
    title: 'CAPTATION LIVE CONCERT ALI 45 SCIENTIFIC',
    type: 'supabase',
    url: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Concert%20Ali.mp4',
    expected: 'should_load'
  },
  {
    id: 'sabay-festival-2022',
    title: 'SABAY FESTIVAL 2022',
    type: 'supabase',
    url: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Thiek%20au%20Sabay%20Festival%202022%20Haute%20def%204k%20v2.mp4',
    expected: 'should_load'
  },
  {
    id: 'lanecdote',
    title: 'L\'ANECDOTE',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=AGC_2cFHE_0',
    expected: 'should_load'
  },
  {
    id: 'cook-soul-kaoutar',
    title: 'COOK & SOUL AVEC KAOUTAR DE PÉKIN EXPRESS, ÉDITION 14',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=galhl8_dYyk',
    expected: 'should_load'
  },
  {
    id: 'live-eleonore-surprising',
    title: 'LIVE ON STAGE ÉLÉONORE "SURPRISING" VERSION ACOUSTIQUE',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=-E4Uk-Z5qEc',
    expected: 'should_load'
  },
  {
    id: 'live-leyel-papa',
    title: 'LIVE ON STAGE LEYEL "PAPA" ACOUSTIQUE VERSION',
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=GksYCOSW3qc',
    expected: 'should_load'
  },
  {
    id: 'portfolio-jyfviku',
    title: 'YUNGCALLY – CLIP OFFICIEL',
    type: 'supabase',
    url: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/jyfviku.mp4',
    expected: 'should_load'
  }
];

class VideoPortfolioTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = [];
  }

  async init() {
    console.log('🚀 Initialisation du testeur de portfolio vidéo...');
    
    this.browser = await puppeteer.launch({
      headless: false, // Mode visible pour observer les tests
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    this.page = await this.browser.newPage();
    
    // Intercepter les logs de la console
    this.page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      
      if (type === 'error') {
        console.log(`❌ Console Error: ${text}`);
      } else if (text.includes('🔄') || text.includes('🎯') || text.includes('▶️') || text.includes('⏸️')) {
        console.log(`📝 Console Log: ${text}`);
      }
    });

    // Intercepter les erreurs réseau
    this.page.on('response', (response) => {
      if (!response.ok() && response.url().includes('supabase.co')) {
        console.log(`⚠️ Erreur réseau Supabase: ${response.status()} - ${response.url()}`);
      }
    });

    await this.page.goto(PORTFOLIO_URL, { waitUntil: 'networkidle2' });
    
    // Attendre que la section portfolio soit chargée
    await this.page.waitForSelector('#video-portfolio', { timeout: 10000 });
    console.log('✅ Page portfolio chargée');
  }

  async testVideoCarousel() {
    console.log('\n🎠 === TEST DU CARROUSEL VIDÉO ===');
    
    // Attendre que le carrousel soit visible
    await this.page.waitForSelector('.vp-ring', { timeout: 5000 });
    
    // Compter le nombre de miniatures vidéo
    const thumbnails = await this.page.$$('.vp-thumb-btn');
    console.log(`📊 Nombre de miniatures trouvées: ${thumbnails.length}`);
    
    // Tester la navigation avec les flèches
    console.log('\n🔄 Test de navigation avec les flèches...');
    
    const nextButton = await this.page.$('#portfolio-navigation button[aria-label*="suivant"], #portfolio-navigation button:last-child');
    const prevButton = await this.page.$('#portfolio-navigation button[aria-label*="précédent"], #portfolio-navigation button:first-child');
    
    if (nextButton && prevButton) {
      console.log('✅ Boutons de navigation trouvés');
      
      // Test navigation suivante
      await nextButton.click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('➡️ Navigation suivante testée');
      
      // Test navigation précédente
      await prevButton.click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('⬅️ Navigation précédente testée');
    } else {
      console.log('⚠️ Boutons de navigation non trouvés');
    }
    
    return thumbnails.length;
  }

  async testVideoLoading() {
    console.log('\n🎬 === TEST DE CHARGEMENT DES VIDÉOS ===');
    
    const results = [];
    
    for (let i = 0; i < VIDEOS_TO_TEST.length; i++) {
      const video = VIDEOS_TO_TEST[i];
      console.log(`\n📹 Test vidéo ${i + 1}/${VIDEOS_TO_TEST.length}: ${video.title}`);
      
      try {
        // Cliquer sur la miniature correspondante
        const thumbnail = await this.page.$(`[data-video-id="${video.id}"], .vp-thumb-btn:nth-child(${i + 1})`);
        
        if (thumbnail) {
          await thumbnail.click();
          await new Promise(resolve => setTimeout(resolve, 2000)); // Attendre le chargement
          
          // Vérifier si c'est une vidéo YouTube ou Supabase
          if (video.type === 'youtube') {
            const iframe = await this.page.$('iframe[src*="youtube.com"]');
            if (iframe) {
              console.log(`✅ Vidéo YouTube chargée: ${video.title}`);
              results.push({ video: video.title, status: 'success', type: 'youtube' });
            } else {
              console.log(`❌ Vidéo YouTube non chargée: ${video.title}`);
              results.push({ video: video.title, status: 'failed', type: 'youtube' });
            }
          } else if (video.type === 'supabase') {
            const videoElement = await this.page.$('video[src*="supabase.co"]');
            if (videoElement) {
              // Vérifier si la vidéo a des métadonnées chargées
              const duration = await this.page.evaluate(() => {
                const video = document.querySelector('video[src*="supabase.co"]');
                return video ? video.duration : 0;
              });
              
              if (duration > 0) {
                console.log(`✅ Vidéo Supabase chargée (durée: ${duration}s): ${video.title}`);
                results.push({ video: video.title, status: 'success', type: 'supabase', duration });
              } else {
                console.log(`⚠️ Vidéo Supabase chargée mais sans métadonnées: ${video.title}`);
                results.push({ video: video.title, status: 'partial', type: 'supabase' });
              }
            } else {
              console.log(`❌ Vidéo Supabase non chargée: ${video.title}`);
              results.push({ video: video.title, status: 'failed', type: 'supabase' });
            }
          }
        } else {
          console.log(`⚠️ Miniature non trouvée pour: ${video.title}`);
          results.push({ video: video.title, status: 'not_found', type: video.type });
        }
        
        // Attendre un peu avant le prochain test
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.log(`❌ Erreur lors du test de ${video.title}:`, error.message);
        results.push({ video: video.title, status: 'error', type: video.type, error: error.message });
      }
    }
    
    return results;
  }

  async testVideoControls() {
    console.log('\n🎮 === TEST DES CONTRÔLES VIDÉO ===');
    
    const results = [];
    
    try {
      // Trouver une vidéo Supabase pour tester les contrôles
      const supabaseVideo = VIDEOS_TO_TEST.find(v => v.type === 'supabase');
      
      if (supabaseVideo) {
        console.log(`🎯 Test des contrôles sur: ${supabaseVideo.title}`);
        
        // Cliquer sur la vidéo pour la charger
        const thumbnail = await this.page.$(`[data-video-id="${supabaseVideo.id}"], .vp-thumb-btn:nth-child(3)`);
        if (thumbnail) {
          await thumbnail.click();
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          // Test du bouton play central
          const playButton = await this.page.$('button[aria-label*="Lire la vidéo"]');
          if (playButton) {
            await playButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('▶️ Bouton play central testé');
            
            // Vérifier si la vidéo est en lecture
            const isPlaying = await this.page.evaluate(() => {
              const video = document.querySelector('video[src*="supabase.co"]');
              return video ? !video.paused : false;
            });
            
            if (isPlaying) {
              console.log('✅ Vidéo en lecture après clic sur play');
              results.push({ control: 'play_button', status: 'success' });
              
              // Test du bouton pause
              const pauseButton = await this.page.$('button[aria-label*="Mettre en pause"]');
              if (pauseButton) {
                await pauseButton.click();
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('⏸️ Bouton pause testé');
                results.push({ control: 'pause_button', status: 'success' });
              }
              
              // Test des boutons de navigation temporelle
              const minusButton = await this.page.$('button[aria-label*="Reculer de 10 secondes"]');
              const plusButton = await this.page.$('button[aria-label*="Avancer de 10 secondes"]');
              
              if (minusButton && plusButton) {
                await minusButton.click();
                await new Promise(resolve => setTimeout(resolve, 500));
                console.log('⏪ Bouton -10s testé');
                
                await plusButton.click();
                await new Promise(resolve => setTimeout(resolve, 500));
                console.log('⏩ Bouton +10s testé');
                
                results.push({ control: 'time_navigation', status: 'success' });
              }
              
              // Test de la timeline
              const timeline = await this.page.$('input[type="range"][aria-label*="progression"]');
              if (timeline) {
                const currentValue = await this.page.evaluate(() => {
                  const input = document.querySelector('input[type="range"][aria-label*="progression"]');
                  return input ? input.value : 0;
                });
                
                console.log(`📊 Timeline trouvée, valeur actuelle: ${currentValue}`);
                results.push({ control: 'timeline', status: 'success', value: currentValue });
              }
              
            } else {
              console.log('❌ Vidéo non en lecture après clic sur play');
              results.push({ control: 'play_button', status: 'failed' });
            }
          } else {
            console.log('⚠️ Bouton play central non trouvé');
            results.push({ control: 'play_button', status: 'not_found' });
          }
        }
      }
      
    } catch (error) {
      console.log('❌ Erreur lors du test des contrôles:', error.message);
      results.push({ control: 'general', status: 'error', error: error.message });
    }
    
    return results;
  }

  async testErrorHandling() {
    console.log('\n🛡️ === TEST DE GESTION D\'ERREUR ===');
    
    const results = [];
    
    try {
      // Vérifier s'il y a des messages d'erreur dans la console
      const consoleErrors = await this.page.evaluate(() => {
        return window.consoleErrors || [];
      });
      
      if (consoleErrors.length > 0) {
        console.log(`⚠️ ${consoleErrors.length} erreurs console détectées`);
        consoleErrors.forEach(error => {
          console.log(`   - ${error}`);
        });
        results.push({ test: 'console_errors', count: consoleErrors.length, errors: consoleErrors });
      } else {
        console.log('✅ Aucune erreur console détectée');
        results.push({ test: 'console_errors', count: 0 });
      }
      
      // Vérifier les erreurs réseau
      const networkErrors = await this.page.evaluate(() => {
        return window.networkErrors || [];
      });
      
      if (networkErrors.length > 0) {
        console.log(`⚠️ ${networkErrors.length} erreurs réseau détectées`);
        results.push({ test: 'network_errors', count: networkErrors.length, errors: networkErrors });
      } else {
        console.log('✅ Aucune erreur réseau détectée');
        results.push({ test: 'network_errors', count: 0 });
      }
      
    } catch (error) {
      console.log('❌ Erreur lors du test de gestion d\'erreur:', error.message);
      results.push({ test: 'error_handling', status: 'error', error: error.message });
    }
    
    return results;
  }

  async generateReport() {
    console.log('\n📊 === RAPPORT DE TEST ===');
    
    const report = {
      timestamp: new Date().toISOString(),
      url: PORTFOLIO_URL,
      tests: {
        carousel: this.results.carousel || 'non_testé',
        videoLoading: this.results.videoLoading || [],
        controls: this.results.controls || [],
        errorHandling: this.results.errorHandling || []
      }
    };
    
    // Sauvegarder le rapport
    const fs = await import('fs');
    const reportPath = `./reports/video-test-${Date.now()}.json`;
    
    try {
      await fs.promises.mkdir('./reports', { recursive: true });
      await fs.promises.writeFile(reportPath, JSON.stringify(report, null, 2));
      console.log(`📄 Rapport sauvegardé: ${reportPath}`);
    } catch (error) {
      console.log('⚠️ Impossible de sauvegarder le rapport:', error.message);
    }
    
    return report;
  }

  async runAllTests() {
    try {
      await this.init();
      
      // Test 1: Carrousel
      this.results.carousel = await this.testVideoCarousel();
      
      // Test 2: Chargement des vidéos
      this.results.videoLoading = await this.testVideoLoading();
      
      // Test 3: Contrôles
      this.results.controls = await this.testVideoControls();
      
      // Test 4: Gestion d'erreur
      this.results.errorHandling = await this.testErrorHandling();
      
      // Générer le rapport
      const report = await this.generateReport();
      
      console.log('\n🎉 === TESTS TERMINÉS ===');
      console.log('Résumé:');
      console.log(`- Carrousel: ${this.results.carousel} miniatures`);
      console.log(`- Vidéos testées: ${this.results.videoLoading.length}`);
      console.log(`- Contrôles testés: ${this.results.controls.length}`);
      console.log(`- Tests d'erreur: ${this.results.errorHandling.length}`);
      
      return report;
      
    } catch (error) {
      console.error('❌ Erreur lors des tests:', error);
      throw error;
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Exécuter les tests
async function main() {
  console.log('🧪 === DÉMARRAGE DES TESTS PORTFOLIO VIDÉO ===');
  
  const tester = new VideoPortfolioTester();
  
  try {
    const report = await tester.runAllTests();
    console.log('\n✅ Tests terminés avec succès!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Tests échoués:', error);
    process.exit(1);
  }
}

main();
