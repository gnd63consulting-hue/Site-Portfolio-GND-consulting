import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'node:fs/promises';

async function run() {
  const BASE = process.env.HOME_URL || 'http://localhost:5177/';
  await mkdir('./reports', { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    const logs = []; const errors = []; const requests = [];
    page.on('console', msg => {
      const type = msg.type(); const text = msg.text();
      if (type === 'error') errors.push(text); else logs.push(`[${type}] ${text}`);
    });
    page.on('pageerror', err => errors.push(err.message));
    page.on('requestfailed', req => requests.push({ url: req.url(), error: req.failure()?.errorText }));

    const t0 = Date.now();
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const t1 = Date.now();

    const seo = await page.evaluate(() => ({
      title: document.title || '',
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      h1: Array.from(document.querySelectorAll('h1')).map(el => el.textContent?.trim()).filter(Boolean)
    }));
    const linksCount = await page.$$eval('a[href]', as => as.length);

    const report = [{ path: '/', url: BASE, loadMs: t1 - t0, errors, logs, requests, seo, linksCount }];
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const outPath = `./reports/audit-home-${ts}.json`;
    await writeFile(outPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(outPath);
  } finally {
    await browser.close();
  }
}

run().catch(err => { console.error(err); process.exit(1); });


