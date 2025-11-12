import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const BASE = 'http://localhost:5174';
const ROUTES = [
  '/',
  '/services/design-identite-visuelle',
  '/services/motion-design',
  '/services/production-audiovisuelle',
  '/services/photographie',
  '/services/automatisation-ia',
  '/partenaires',
  '/mentions-legales'
];

const outDir = new URL('./reports/', import.meta.url);

async function ensureOut() {
  try { await fs.mkdir(outDir, { recursive: true }); } catch {}
}

async function auditRoute(page, path) {
  const url = `${BASE}${path}`;
  const logs = []; const errors = []; const requests = [];

  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') errors.push(text); else logs.push(`[${type}] ${text}`);
  });
  page.on('pageerror', err => errors.push(err.message));
  page.on('requestfailed', req => requests.push({ url: req.url(), error: req.failure()?.errorText }));

  const t0 = Date.now();
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  const t1 = Date.now();

  // Basic SEO checks
  const seo = await page.evaluate(() => ({
    title: document.title || '',
    metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    h1: Array.from(document.querySelectorAll('h1')).map(el => el.textContent?.trim()).filter(Boolean)
  }));

  // Links count
  const linksCount = await page.$$eval('a[href]', as => as.length);

  return { path, url, loadMs: t1 - t0, errors, logs, requests, seo, linksCount };
}

(async () => {
  await ensureOut();
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const report = [];
  for (const route of ROUTES) {
    try {
      report.push(await auditRoute(page, route));
    } catch (e) {
      report.push({ path: route, url: `${BASE}${route}`, error: String(e) });
    }
  }

  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const outPath = new URL(`./audit-global-${ts}.json`, outDir);
  await fs.writeFile(outPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('✅ Audit global terminé →', outPath.pathname);

  await browser.close();
})();
