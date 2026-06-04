/* Quick single-frame preview to verify composition before committing to 150-frame run. */
import puppeteer from 'puppeteer';
const br = await puppeteer.launch({
  headless: 'new',
  executablePath: '/opt/homebrew/bin/chromium',
  args: ['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--use-gl=angle','--enable-webgl','--ignore-gpu-blocklist','--window-size=1920,1080'],
});
const page = await br.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
// capture console output (for debug logs)
page.on('console', m => { if (m.type() === 'log') console.log('[browser]', m.text()); });
page.on('pageerror', e => console.error('[pageerror]', e.message));
await page.goto('http://localhost:5173/_render/render.html', { waitUntil: 'networkidle2', timeout: 60000 });
await page.waitForFunction('window.READY === true || window.LOAD_ERROR', { timeout: 120000 });
await new Promise(r => setTimeout(r, 800));
// preview at t=0 (idle) and t=1 (full scroll)
await page.evaluate(() => window.setProgress(0));
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: '_preview-t0.jpg', quality: 78, type: 'jpeg' });
await page.evaluate(() => window.setProgress(1));
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: '_preview-t1.jpg', quality: 78, type: 'jpeg' });
console.log('preview ready: _preview-t0.jpg + _preview-t1.jpg');
await br.close();
