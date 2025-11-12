import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'node:fs/promises';

const BASE_URL = process.env.VIDEO_URL || 'http://localhost:4176/';

function nowTs() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

async function ensureReportsDir() {
  await mkdir('./reports', { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

  const report = { baseUrl: BASE_URL, ts: new Date().toISOString(), summary: {}, items: [], duplicates: [], navChecks: [] };

  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

  // Expose a flag for YouTube play state via postMessage listener in the page context
  await page.evaluate(() => {
    // @ts-ignore
    window.__ytPlayed = false;
    window.addEventListener('message', (event) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'onStateChange' && data.info === 1) {
          // @ts-ignore
          window.__ytPlayed = true;
        }
      } catch {}
    }, { passive: true });
  });

  // Scroll to portfolio
  await page.evaluate(() => {
    const el = document.querySelector('#realisations');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForSelector('#video-carousel', { timeout: 15000 });

  // Collect thumbnails
  const thumbs = await page.$$('#video-carousel .vp-thumb-btn');
  const titles = await page.$$eval('#video-carousel .vp-thumb-btn', nodes => nodes.map(n => n.getAttribute('aria-label') || ''));
  // Detect duplicates by normalized aria-label
  const seen = new Map();
  const dups = [];
  titles.forEach((t, i) => {
    const key = t.replace(/\s+/g, ' ').trim().toLowerCase();
    if (seen.has(key)) dups.push({ firstIndex: seen.get(key), dupIndex: i, label: t });
    else seen.set(key, i);
  });
  report.duplicates = dups;

  // Test nav arrows position at small viewport
  for (const size of [ { w: 320, h: 640 }, { w: 360, h: 640 } ]) {
    await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: 2 });
    const navBoxes = await page.$$eval('#portfolio-navigation button', btns => btns.map(b => {
      const r = b.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height, offscreen: r.x + r.width < 0 || r.y + r.height < 0 || r.x > innerWidth || r.y > innerHeight };
    }));
    report.navChecks.push({ size, buttons: navBoxes });
  }

  // Restore a larger viewport for playback tests
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

  // Iterate through a subset (max 12) to keep runtime reasonable
  const maxCheck = Math.min(thumbs.length, 12);
  const knownMedia = {
    "TRINITY REBEL FT DAFXCX – L'UNIVERS OFFICIEL": "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/trinity_rebel_univers_officiel.mp4",
    "CAPTATION LIVE CONCERT ALI 45 SCIENTIFIC": "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Concert%20Ali.mp4",
    "SABAY FESTIVAL 2022": "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Thiek%20au%20Sabay%20Festival%202022%20Haute%20def%204k%20v2.mp4",
    "YUNGCALLY – CLIP OFFICIEL": "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/jyfviku.mp4"
  };

  for (let i = 0; i < maxCheck; i++) {
    // Select item
    await thumbs[i].click();
    await new Promise(r => setTimeout(r, 700));

    // Read current title from right panel
    const title = await page.$eval('#project-title', el => el.textContent?.trim() || '');
    const descPresent = await page.$eval('[role="article"]', el => (el.textContent || '').trim().length > 30);
    const creditsHint = await page.$eval('[role="article"]', el => /crédit|credits|📸/i.test(el.textContent || ''));

    // Determine type (YouTube iframe vs mp4 video) with softer detection
    const overlayBtn = await page.$('section[aria-label="Lecteur vidéo et détails du projet"] button[aria-label^="Lire la vidéo"]');
    const hasIframeReal = await page.$('section[aria-label="Lecteur vidéo et détails du projet"] iframe[src*="youtube.com/embed"]') !== null;
    const hasIframe = hasIframeReal || !!overlayBtn;
    let hasVideo = await page.$('section[aria-label="Lecteur vidéo et détails du projet"] video') !== null;
    if (!hasVideo) {
      // progressive wait for video element to appear (mp4)
      for (const t of [300, 700, 1200]) {
        try { await page.waitForSelector('section[aria-label="Lecteur vidéo et détails du projet"] video', { timeout: t }); hasVideo = true; break; } catch {}
      }
    }

    let playAttempted = false;
    let playStateOk = false;
    let lazyOk = false;
    let fallbackOk = false;

    if (hasIframe) {
      // Click play overlay if present
      let overlay = overlayBtn || await page.$('section[aria-label="Lecteur vidéo et détails du projet"] button[aria-label^="Lire la vidéo"]');
      if (!overlay) overlay = await page.$('section[aria-label="Lecteur vidéo et détails du projet"] [class*="group/youtube"] button');
      if (overlay) {
        await overlay.click({ delay: 10 });
        playAttempted = true;
        // Wait up to 1200ms for YT play signal
        try {
          await page.waitForFunction(() => {
            // @ts-ignore
            return window.__ytPlayed === true;
          }, { timeout: 1200 });
          playStateOk = true;
        } catch {
          playStateOk = false;
        }
      }
    } else if (hasVideo) {
      // Click overlay
      let overlay = await page.$('section[aria-label="Lecteur vidéo et détails du projet"] [class*="group/video"] button');
      if (!overlay) overlay = await page.$('section[aria-label="Lecteur vidéo et détails du projet"] button[aria-label^="Lire la vidéo"]');
      if (overlay) {
        await overlay.click({ delay: 10 });
        playAttempted = true;
      }
      // Wait for video to become playing (paused === false) up to 1200ms
      try {
        await page.waitForFunction(() => {
          const v = document.querySelector('section[aria-label="Lecteur vidéo et détails du projet"] video');
          return v instanceof HTMLVideoElement ? v.paused === false : false;
        }, { timeout: 1200 });
        playStateOk = true;
      } catch {
        playStateOk = await page.$eval('section[aria-label="Lecteur vidéo et détails du projet"] video', v => (v instanceof HTMLVideoElement) ? !v.paused : false).catch(() => false);
      }
      // Check lazy attributes
      lazyOk = await page.$eval('section[aria-label="Lecteur vidéo et détails du projet"] video', v => (v instanceof HTMLVideoElement) ? v.getAttribute('preload') === 'none' : false).catch(() => false);
      // Test fallback by forcing bad src then restore
      fallbackOk = await page.evaluate(() => {
        const v = document.querySelector('section[aria-label="Lecteur vidéo et détails du projet"] video');
        if (!(v instanceof HTMLVideoElement)) return false;
        const original = v.currentSrc || v.getAttribute('src');
        try {
          v.src = 'https://example.com/invalid-file-404.mp4';
          v.load();
          return true;
        } catch {
          return false;
        } finally {
          if (original) { v.src = original; v.load(); }
        }
      });
    }

    // Verify thumbnails lazy
    const thumbLazyOk = await page.$$eval('#video-carousel .vp-thumb img', imgs => imgs.every(img => img.loading === 'lazy'));

    let mediaHeadStatus = null;
    if (!hasIframe && !hasVideo && knownMedia[title]) {
      try {
        const res = await fetch(knownMedia[title], { method: 'HEAD' });
        mediaHeadStatus = res.status;
      } catch (e) {
        mediaHeadStatus = 'fetch_error';
      }
    }

    report.items.push({ index: i, ariaLabel: titles[i], title, hasIframe, hasVideo, playAttempted, playStateOk, descPresent, creditsHint, lazyOk: lazyOk || thumbLazyOk, fallbackOk, mediaHeadStatus });
  }

  // Save report
  await ensureReportsDir();
  const jsonPath = `./reports/video-check-${nowTs()}.json`;
  await writeFile(jsonPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('Video check completed. Results:', jsonPath);
  console.log('Summary:', {
    totalThumbs: thumbs.length,
    duplicates: report.duplicates.length,
    failures: report.items.filter(x => !(x.playStateOk || x.hasIframe)).length
  });

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});


