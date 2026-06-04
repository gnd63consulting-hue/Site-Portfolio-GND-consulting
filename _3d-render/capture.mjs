/* Hero figure frame-sequence capture — Chicken Drive-style pipeline.
   Loads the Three.js render at /_render/render.html (served by Vite),
   waits for the GLB to be ready, then steps through progress t = 0..1 over
   FRAME_COUNT frames, screenshotting each to public/assets/hero-frames/.
   Output: frame_0000.jpg … frame_(N-1).jpg, JPEG quality 78. */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const FRAME_COUNT = 150;
const W = 1920, H = 1080;
const OUT_DIR = path.resolve('public/assets/hero-frames');
const RENDER_URL = 'http://localhost:5173/_render/render.html';
const CHROMIUM = '/opt/homebrew/bin/chromium';

// clean output dir
fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

console.log('[capture] launching chromium…');
const br = await puppeteer.launch({
  headless: 'new',
  executablePath: CHROMIUM,
  args: [
    '--no-sandbox',
    '--enable-unsafe-swiftshader',
    '--use-angle=swiftshader',
    '--use-gl=angle',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    `--window-size=${W},${H}`,
  ],
});
const page = await br.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

const errs = [];
page.on('pageerror', e => errs.push('PAGEERR ' + e.message));
page.on('console', m => {
  const t = m.type();
  if (t === 'error' || t === 'warning') errs.push(`[${t}] ${m.text()}`);
});

console.log('[capture] loading render.html…');
await page.goto(RENDER_URL, { waitUntil: 'networkidle2', timeout: 60000 });

console.log('[capture] waiting for GLB to load (window.READY)…');
const readyStart = Date.now();
try {
  await page.waitForFunction('window.READY === true || window.LOAD_ERROR', { timeout: 120000 });
} catch (e) {
  console.error('[capture] timeout waiting for GLB load. Errors so far:', errs);
  process.exit(1);
}
const loadErr = await page.evaluate(() => window.LOAD_ERROR);
if (loadErr) {
  console.error('[capture] GLB load error:', loadErr);
  process.exit(1);
}
console.log(`[capture] GLB ready in ${Math.round((Date.now() - readyStart)/1000)}s`);

// let particles settle a tick
await new Promise(r => setTimeout(r, 800));

console.log(`[capture] capturing ${FRAME_COUNT} frames at ${W}×${H}…`);
const t0 = Date.now();
for (let i = 0; i < FRAME_COUNT; i++) {
  const t = i / (FRAME_COUNT - 1);
  await page.evaluate(tt => window.setProgress(tt), t);
  // give the rAF cycle from setProgress a moment to land on canvas
  await new Promise(r => setTimeout(r, 35));
  const fname = path.join(OUT_DIR, `frame_${String(i).padStart(4, '0')}.jpg`);
  await page.screenshot({
    path: fname,
    type: 'jpeg',
    quality: 78,
    omitBackground: false,
    clip: { x: 0, y: 0, width: W, height: H },
  });
  if ((i + 1) % 25 === 0 || i === FRAME_COUNT - 1) {
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    process.stdout.write(`  ${i + 1}/${FRAME_COUNT}  (${elapsed}s)\n`);
  }
}

const total = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`[capture] done in ${total}s. Output: ${OUT_DIR}`);
if (errs.length) console.log(`[capture] ${errs.length} page warnings/errors (non-fatal):\n  ` + errs.slice(0, 5).join('\n  '));
await br.close();
