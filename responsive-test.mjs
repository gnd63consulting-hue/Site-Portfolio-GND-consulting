import puppeteer from 'puppeteer';

const url = process.env.TEST_URL || 'http://localhost:4173';
const viewports = [
  { width: 360, height: 640, name: 'mobile-360x640' },
  { width: 414, height: 896, name: 'mobile-414x896' },
  { width: 768, height: 1024, name: 'tablet-768x1024' },
  { width: 1024, height: 1366, name: 'tablet-1024x1366' },
  { width: 1440, height: 900, name: 'desktop-1440x900' },
  { width: 1920, height: 1080, name: 'desktop-1920x1080' },
];

function hasHorizontalOverflow() {
  return document.documentElement.scrollWidth > document.documentElement.clientWidth;
}

function findOverlaps() {
  function cssSelector(el) {
    if (el.id) return `#${el.id}`;
    const cls = (el.className && typeof el.className === 'string') ? '.' + el.className.trim().split(/\s+/).slice(0,3).join('.') : '';
    return `${el.tagName.toLowerCase()}${cls}`;
  }
  const overlaps = [];
  // cibler les éléments interactifs pour limiter le bruit
  const candidates = Array.from(document.querySelectorAll('a, button, input, select, textarea, [role="button"], [role="link"]'));
  const elements = candidates.filter((el) => {
    const style = window.getComputedStyle(el);
    return style.visibility !== 'hidden' && style.display !== 'none' && el.getClientRects().length > 0;
  });
  for (let i = 0; i < elements.length; i++) {
    const a = elements[i];
    const ra = a.getBoundingClientRect();
    if (ra.width === 0 || ra.height === 0) continue;
    for (let j = i + 1; j < elements.length; j++) {
      const b = elements[j];
      const rb = b.getBoundingClientRect();
      if (rb.width === 0 || rb.height === 0) continue;
      const overlap = !(ra.right <= rb.left || ra.left >= rb.right || ra.bottom <= rb.top || ra.top >= rb.bottom);
      // ignorer si l'un contient l'autre (chevauchement attendu)
      if (overlap && (a.contains(b) || b.contains(a))) continue;
      // ignorer les recouvrements très faibles (< 2px) pour réduire les faux positifs
      const xOverlap = Math.max(0, Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left));
      const yOverlap = Math.max(0, Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top));
      const minDim = Math.min(ra.width, ra.height, rb.width, rb.height);
      if (overlap && xOverlap >= 2 && yOverlap >= 2 && minDim >= 8) {
        overlaps.push({ a: cssSelector(a), b: cssSelector(b), xOverlap: Math.round(xOverlap), yOverlap: Math.round(yOverlap) });
      }
    }
  }
  return overlaps.slice(0, 20);
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const issues = [];
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    const overflow = await page.evaluate(hasHorizontalOverflow);
    const overlaps = await page.evaluate(findOverlaps);
    issues.push({ viewport: vp.name, overflow, overlapsCount: overlaps.length, overlaps: overlaps });
  }
  console.log(JSON.stringify({ url, issues }, null, 2));
  await browser.close();
})();


