import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const url = process.env.LH_URL || 'http://localhost:4173';

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--no-sandbox'] });
const options = { logLevel: 'info', output: 'json', onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'], port: chrome.port };
const runnerResult = await lighthouse(url, options);

const { categories } = runnerResult.lhr;
console.log(JSON.stringify({
  url,
  scores: {
    performance: categories.performance.score,
    accessibility: categories.accessibility.score,
    seo: categories.seo.score,
    bestPractices: categories['best-practices'].score,
  }
}, null, 2));

await chrome.kill();


