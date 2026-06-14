/* Prerender SEO — snapshots HTML des routes du site (Lot 3 audit 12/06/26).
 *
 * Usage : npm run prerender   (après npm run build)
 *
 * Lance `vite preview` sur dist/, visite chaque route avec Puppeteer,
 * capture le DOM rendu et écrit `prerendered/<route>/index.html` avec
 * title / meta description / canonical / og:url propres à chaque page.
 * Les snapshots sont COMMITÉS (dossier prerendered/) puis copiés dans
 * dist/ au build Vercel (scripts/copy-prerendered.mjs) — Vercel sert les
 * fichiers statiques avant le rewrite SPA, donc les crawlers reçoivent
 * du vrai HTML tandis que le JS reprend la main pour les visiteurs.
 *
 * À RELANCER après tout changement de contenu notable :
 *   npm run build && npm run prerender && git add prerendered && commit
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import puppeteer from 'puppeteer';

const ORIGIN = 'https://www.gndconsulting.fr';
const PORT = 4261;

/* Routes + meta dédiées (title déjà géré par ROUTE_LABELS côté app ;
   ici on fige title + description + canonical dans le HTML statique). */
const ROUTES = [
  { path: '/', title: 'GND Consulting, Studio créatif humain × IA · Paris', desc: "Studio créatif hybride à Paris : sites web & SEO, branding & identité, production audiovisuelle, automatisation IA. L'œil humain pour signer, l'IA pour accélérer. Devis sous 48h." },
  { path: '/agence', title: "GND Consulting, L'Agence — Manifeste Humain × IA", desc: "Studio créatif fondé en 2025 : une équipe, quatre branches, une direction créative unifiée. Manifeste, éthique et méthode hybride humain × IA." },
  { path: '/services/sites-vitrines', title: 'GND Consulting, Sites vitrines & SEO clé en main', desc: "Sites vitrines clé en main pour commerces et indépendants : design sur-mesure, SEO local, hébergement configuré, livraison 1 à 2 semaines, 0 € d'abonnement, 100 % propriétaire." },
  { path: '/services/branding-identite', title: 'GND Consulting, Branding & Identité visuelle', desc: "Création de marque complète : logo, charte graphique, direction créative, supports imprimés et déclinaisons digitales. Une identité cohérente qui marque les esprits." },
  { path: '/services/audiovisuel', title: 'GND Consulting, Production audiovisuelle — Vidéo, motion, photo', desc: "Studio parisien : captation 4K/8K, clips musicaux, aftermovies, émissions, montage cinéma, motion design et photographie. De l'écriture à la livraison, tout en interne." },
  { path: '/services/automatisation-ia', title: 'GND Consulting, Automatisation & IA', desc: "Workflows intelligents, agents IA sur-mesure, audit et accompagnement à l'adoption : l'IA au service de votre productivité, pilotée par une direction humaine." },
  { path: '/realisations', title: 'GND Consulting, Réalisations — Portfolio', desc: "Clips musicaux, captations live, émissions, photographie et identité visuelle : le portfolio GND Consulting. Chaque projet porte une intention, chaque image une signature." },
  { path: '/contact', title: 'GND Consulting, Contact — Démarrer un projet', desc: "Parlez-nous de votre projet : réponse sous 24h, devis sous 48h, sans engagement. Studio créatif humain × IA basé à Paris." },
  { path: '/mentions-legales', title: 'GND Consulting, Mentions légales', desc: 'Mentions légales, informations éditeur et politique cookies du site gndconsulting.fr.' },
  { path: '/guides', title: 'GND Consulting, Guides — Ressources pour votre projet', desc: 'Guides clairs pour réussir votre projet digital : sites web, identité visuelle, vidéo, automatisation IA. Réponses concrètes pour PME et indépendants.' },
  { path: '/guides/freelance-ou-agence', title: 'GND Consulting, Freelance ou agence : qui choisir pour créer son site ?', desc: "Freelance, agence ou studio hybride : avantages, coûts et risques pour créer le site de votre PME en 2026. Le guide GND pour choisir sans se tromper." },
  { path: '/guides/faut-il-un-site-internet-commerce', title: 'GND Consulting, Faut-il un site internet pour son commerce en 2026 ?', desc: "Faut-il encore un site quand on a une fiche Google ? La réponse claire pour commerces et indépendants : visibilité, crédibilité, propriété. Le guide GND." },
  { path: '/guides/etre-visible-google-local', title: 'GND Consulting, Comment être visible sur Google quand on est un commerce local ?', desc: "SEO local 2026 : fiche Google Business Profile, avis, site rapide. Les leviers concrets pour apparaître dans Google Maps et le Local Pack. Le guide GND." },
  { path: '/guides/quand-refaire-son-site', title: "GND Consulting, Quand refaire son site internet ? Les signaux qui ne trompent pas", desc: "Site daté, lent, pas mobile, invisible sur Google : les signaux qui montrent qu'il faut refondre votre site, et comment s'y prendre. Le guide GND." },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function rewriteHead(html, { path, title, desc }) {
  const url = ORIGIN + (path === '/' ? '/' : path);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  return html;
}

/* Build PROPRE d'abord (vite build direct, SANS copy-prerendered) : sinon le
   preview servirait les snapshots du run précédent et on capturerait des
   captures (régression circulaire). */
await new Promise((resolve, reject) => {
  const b = spawn('npx', ['vite', 'build'], { stdio: 'inherit' });
  b.on('exit', (code) => (code === 0 ? resolve() : reject(new Error('vite build failed'))));
});

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], { stdio: 'ignore', detached: false });
await new Promise((r) => setTimeout(r, 4000));

try {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  rmSync('prerendered', { recursive: true, force: true });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 950 });
    await page.goto(`http://localhost:${PORT}${route.path}`, { waitUntil: 'networkidle2', timeout: 90000 });
    await new Promise((r) => setTimeout(r, 3000));
    // Bandeau cookies hors snapshot (état UI, pas du contenu)
    await page.evaluate(() => {
      document.querySelectorAll('.fixed').forEach((el) => {
        if (/Tout refuser/.test(el.textContent || '')) el.remove();
      });
    });
    let html = await page.evaluate(() => '<!DOCTYPE html>\n' + document.documentElement.outerHTML);
    html = rewriteHead(html, route);
    // Snapshots servis UNIQUEMENT aux robots (via middleware.ts) → on retire
    // le script de l'app : HTML pur, aucune exécution JS, aucun risque de
    // re-montage. Les visiteurs ne voient jamais ces fichiers.
    html = html.replace(/<script type="module"[^>]*><\/script>/g, '');
    const out =
      route.path === '/'
        ? 'prerendered/__prerender/index.html'
        : join('prerendered/__prerender', route.path.slice(1), 'index.html');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    console.log('✓', route.path, Math.round(html.length / 1024) + 'KB');
    await page.close();
  }
  await browser.close();
} finally {
  server.kill();
}
console.log('prerender done');
