/* Captures ciblées pour le comparatif contraste AVANT/APRÈS (12/07/26).
   Usage : node scripts/shot-contrast.mjs <prefix>  (le preview :4517 doit tourner) */
import puppeteer from 'puppeteer';

const prefix = process.argv[2] || 'before';
const OUT = process.env.SHOT_DIR || '/Users/scaary/gnd/livrables/2026-07-12';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

const shots = [
  { url: '/', find: "une vision", name: 'signature' },
  { url: '/', find: "Créons l'impact", name: 'ctaband' },
  { url: '/services/branding-identite', find: null, selector: '.num-display', name: 'numeros' },
  { url: '/', find: null, selector: 'footer', name: 'footer-sombre' },
];

for (const s of shots) {
  await page.goto(`http://localhost:4517${s.url}`, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));
  await page.evaluate(() => {
    const hero = document.querySelector('main > div');
    if (hero) hero.style.display = 'none';
    document.querySelectorAll('div').forEach((d) => {
      if (/Tout refuser/.test(d.textContent || '') && /fixed/.test(String(d.className))) d.style.display = 'none';
    });
    // Force l'affichage : montre les DeferMount + neutralise les états GSAP opacity:0
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise((r) => setTimeout(r, 1500));
  const found = await page.evaluate((f, sel) => {
    let el = null;
    if (sel) el = document.querySelector(sel);
    else el = Array.from(document.querySelectorAll('h2,h3,span')).find((e) => (e.textContent || '').includes(f) && e.children.length < 4);
    if (!el) return false;
    el.scrollIntoView({ block: 'center' });
    return true;
  }, s.find, s.selector || null);
  if (!found) { console.log(`INTROUVABLE ${s.name}`); continue; }
  await new Promise((r) => setTimeout(r, 1500));
  // Neutralise les opacités GSAP résiduelles dans le viewport
  await page.evaluate(() => {
    document.querySelectorAll('[style*="opacity: 0"]').forEach((e) => { e.style.opacity = '1'; e.style.transform = 'none'; });
  });
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: `${OUT}/contraste-${prefix}-${s.name}.png` });
  console.log(`ok ${prefix}-${s.name}`);
}
await browser.close();
