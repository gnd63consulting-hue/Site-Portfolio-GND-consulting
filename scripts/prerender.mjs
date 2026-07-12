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
  { path: '/', title: 'GND Consulting, Studio créatif humain × IA · Paris', desc: "Studio créatif hybride à Paris : sites web & SEO, branding, audiovisuel, automatisation IA. L'œil humain pour signer, l'IA pour accélérer. Devis sous 48h." },
  { path: '/agence', title: "GND Consulting, L'Agence — Manifeste Humain × IA", desc: "Studio créatif fondé en 2025 : une équipe, quatre branches, une direction créative unifiée. Manifeste, éthique et méthode hybride humain × IA." },
  { path: '/services/sites-vitrines', title: 'GND Consulting, Sites vitrines & SEO clé en main', desc: "Sites vitrines clé en main pour commerces et indépendants : design sur-mesure, SEO local, livraison en 1 à 2 semaines, sans abonnement, site 100 % propriétaire." },
  { path: '/services/branding-identite', title: 'GND Consulting, Branding & Identité visuelle', desc: "Création de marque complète : logo, charte graphique, direction créative, supports imprimés et déclinaisons digitales. Une identité cohérente qui marque les esprits." },
  { path: '/services/audiovisuel', title: 'GND Consulting, Production audiovisuelle — Vidéo, motion, photo', desc: "Studio parisien : captation 4K/8K, clips, aftermovies, émissions, montage, motion design et photographie. De l'écriture à la livraison, tout en interne." },
  { path: '/services/automatisation-ia', title: 'GND Consulting, Automatisation & IA', desc: "Workflows intelligents, agents IA sur-mesure, audit et accompagnement à l'adoption : l'IA au service de votre productivité, pilotée par une direction humaine." },
  { path: '/realisations', title: 'GND Consulting, Réalisations — Portfolio', desc: "Clips, captations live, émissions, photographie et identité visuelle : le portfolio GND Consulting. Chaque projet porte une intention, chaque image une signature." },
  { path: '/contact', title: 'GND Consulting, Contact — Démarrer un projet', desc: "Parlez-nous de votre projet : réponse sous 24h, devis sous 48h, sans engagement. Studio créatif humain × IA basé à Paris." },
  { path: '/mentions-legales', title: 'GND Consulting, Mentions légales', desc: "Mentions légales de GND Consulting : informations sur l'éditeur, l'hébergeur, la propriété intellectuelle, les données personnelles et la politique cookies du site." },
  { path: '/guides', title: 'GND Consulting, Guides — Ressources pour votre projet', desc: 'Guides clairs pour réussir votre projet digital : sites web, identité visuelle, vidéo, automatisation IA. Réponses concrètes pour PME et indépendants.' },
  { path: '/guides/freelance-ou-agence', title: 'GND Consulting, Freelance ou agence : qui choisir pour créer son site ?', desc: "Freelance, agence ou studio hybride : avantages, coûts et risques pour créer le site de votre PME en 2026. Le guide GND pour choisir sans se tromper." },
  { path: '/guides/faut-il-un-site-internet-commerce', title: 'GND Consulting, Faut-il un site internet pour son commerce en 2026 ?', desc: "Faut-il encore un site quand on a une fiche Google ? La réponse claire pour commerces et indépendants : visibilité, crédibilité, propriété. Le guide GND." },
  { path: '/guides/etre-visible-google-local', title: 'GND Consulting, Comment être visible sur Google quand on est un commerce local ?', desc: "SEO local 2026 : fiche Google Business Profile, avis, site rapide. Les leviers concrets pour apparaître dans Google Maps et le Local Pack. Le guide GND." },
  { path: '/guides/quand-refaire-son-site', title: "GND Consulting, Quand refaire son site internet ? Les signaux qui ne trompent pas", desc: "Site daté, lent, pas mobile, invisible sur Google : les signaux qui montrent qu'il faut refondre votre site, et comment s'y prendre. Le guide GND." },
  { path: '/guides/charte-graphique-vs-brand-book', title: "GND Consulting, Charte graphique ou brand book : quelle différence ?", desc: "Charte graphique ou brand book : la différence claire, ce que contient chacun, et lequel choisir selon votre marque. Le guide GND, sans jargon." },
  { path: '/guides/etre-proprietaire-de-son-site', title: "GND Consulting, Êtes-vous vraiment propriétaire de votre site internet ?", desc: "Site loué ou site qui vous appartient ? Ce que « propriétaire » veut dire, les pièges de l'abonnement à vie, et comment reprendre la main. Le guide GND." },
  { path: '/guides/n8n-make-zapier-comparatif', title: "GND Consulting, n8n, Make ou Zapier : quel outil d'automatisation choisir ?", desc: "n8n, Make ou Zapier : forces, limites, prix et souveraineté des données. Le comparatif clair pour choisir votre outil d'automatisation. Le guide GND." },
  { path: '/guides/prix-site-vitrine', title: "GND Consulting, Combien coûte un site vitrine en 2026 ?", desc: "Combien coûte un site vitrine en 2026 ? Fourchettes freelance, agence et no-code, ce qui fait varier le prix, et comment budgéter. Le guide GND." },
  { path: '/guides/prix-identite-visuelle', title: "GND Consulting, Combien coûte une identité visuelle en 2026 ?", desc: "Prix d'un logo, d'une charte graphique, d'un brand book : les fourchettes de marché, ce qui les fait varier, et comment budgéter votre identité. Le guide GND." },
  { path: '/guides/logo-freelance-ou-agence', title: "GND Consulting, Logo : freelance ou agence ?", desc: "Logo freelance ou agence : prix, qualité, droits et fichiers sources. Comment choisir selon votre projet, sans mauvaise surprise. Le guide GND." },
  { path: '/guides/prix-clip-musical', title: "GND Consulting, Combien coûte un clip musical en 2026 ?", desc: "Prix d'un clip musical en France : fourchettes selon l'ambition, ce qui fait varier le budget, et comment dépenser utile. Le guide GND." },
  { path: '/guides/tarif-video-entreprise', title: "GND Consulting, Combien coûte une vidéo d'entreprise en 2026 ?", desc: "Prix d'une vidéo d'entreprise : film institutionnel, interview, motion. Fourchettes de marché et ce qui fait varier le devis. Le guide GND." },
  { path: '/guides/prix-agent-ia-pme', title: "GND Consulting, Combien coûte un agent IA pour une PME en 2026 ?", desc: "Prix d'un agent IA sur-mesure pour une PME : fourchettes de marché, ce qui fait varier le coût, et comment estimer le retour sur investissement. Le guide GND." },
  { path: '/guides/agent-ia-vs-chatbot', title: "GND Consulting, Agent IA ou chatbot : quelle différence ?", desc: "Agent IA ou chatbot : la différence claire, ce que chacun sait faire, et lequel choisir selon votre besoin. Le guide GND, sans jargon." },
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
    // Drapeau lu par DeferMount (home.tsx) : en prerender, toutes les sections
    // différées se montent immédiatement — le scroll ci-dessous ne suffit pas,
    // le hero ScrollExpand épingle window.scrollY tant qu'il n'est pas étendu.
    await page.evaluateOnNewDocument(() => { window.__PRERENDER__ = true; });
    await page.goto(`http://localhost:${PORT}${route.path}`, { waitUntil: 'networkidle2', timeout: 90000 });
    await new Promise((r) => setTimeout(r, 3000));
    // Scroll complet de la page AVANT capture : certaines sections (héros #2
    // CinematicHero, formulaires, blocs animés sous la ligne de flottaison)
    // ne se montent qu'après défilement (scroll-hijack / IntersectionObserver).
    // Sans ça, le snapshot capture une page à moitié rendue (contenu perdu
    // pour les bots). On descend par paliers, on remonte, on laisse respirer.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const tick = () => {
          window.scrollTo(0, y);
          y += Math.round(window.innerHeight * 0.8);
          if (y < document.body.scrollHeight + window.innerHeight) {
            setTimeout(tick, 120);
          } else {
            window.scrollTo(0, 0);
            resolve();
          }
        };
        tick();
      });
    });
    await new Promise((r) => setTimeout(r, 1500));
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
