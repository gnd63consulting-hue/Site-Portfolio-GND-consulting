import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import lighthouse from 'lighthouse';
import { launch as launchChrome } from 'chrome-launcher';

const PREVIEW_PORT = process.env.PORT || 4173;
const TARGET_URL = process.env.LH_URL || `http://localhost:${PREVIEW_PORT}`;

async function run() {
  // Build
  await new Promise((resolve, reject) => {
    const p = spawn('npm', ['run', 'build'], { stdio: 'inherit', shell: true });
    p.on('exit', (code) => (code === 0 ? resolve(null) : reject(new Error('Build failed'))));
  });

  // Preview server
  const preview = spawn('npm', ['run', 'preview', '--', '--host', '0.0.0.0', '--port', String(PREVIEW_PORT)], { shell: true });

  // Wait for server
  const start = Date.now();
  while (Date.now() - start < 30000) {
    try {
      const res = await fetch(TARGET_URL, { method: 'HEAD' });
      if (res.ok) break;
    } catch {}
    await delay(500);
  }

  // Launch Chrome and run Lighthouse
  const chrome = await launchChrome({ chromeFlags: ['--headless=new', '--no-sandbox'] });
  const options = { logLevel: 'info', output: ['json', 'html'], port: chrome.port };
  const config = {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'mobile',
      screenEmulation: { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false },
    },
  };

  const runnerResult = await lighthouse(TARGET_URL, options, config);

  const reportsDir = new URL('./reports/', import.meta.url).pathname;
  await mkdir(reportsDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const jsonPath = `${reportsDir}lh-report-${ts}.json`;
  const htmlPath = `${reportsDir}lh-report-${ts}.html`;
  await writeFile(jsonPath, runnerResult.report[0], 'utf8');
  await writeFile(htmlPath, runnerResult.report[1], 'utf8');

  const categories = runnerResult.lhr.categories;
  console.log('Lighthouse scores:', {
    performance: categories.performance.score,
    accessibility: categories.accessibility.score,
    'best-practices': categories['best-practices'].score,
    seo: categories.seo.score,
  });

  await chrome.kill();
  preview.kill();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});


