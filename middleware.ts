/* Vercel Edge Middleware — pré-rendu SEO/GEO « robots only ».
 *
 * Les robots (Google + crawlers IA) reçoivent le HTML pré-rendu, lisible
 * sans JavaScript (dossier /__prerender/...). TOUS les autres visiteurs
 * (humains) passent par next() = l'application normale, INTACTE. Le
 * middleware ne peut donc pas casser l'expérience visiteur : pour eux il
 * ne fait rien.
 *
 * Snapshots générés par `npm run prerender`, commités dans prerendered/,
 * copiés dans dist/ au build (scripts/copy-prerendered.mjs). */
import { next, rewrite } from '@vercel/edge';

export const config = {
  // S'exécute sur les routes de pages (pas les assets, pas les snapshots,
  // pas les fichiers avec extension).
  matcher: ['/((?!assets/|__prerender/|.*\\.).*)'],
};

// Seules ces routes ont un snapshot pré-rendu. Les autres (ex. détail
// projet /realisations/xxx) → next() (l'app, comportement inchangé).
const PRERENDERED = new Set([
  '/',
  '/agence',
  '/services/sites-vitrines',
  '/services/branding-identite',
  '/services/audiovisuel',
  '/services/automatisation-ia',
  '/realisations',
  '/contact',
  '/mentions-legales',
  '/guides',
  '/guides/freelance-ou-agence',
  '/guides/faut-il-un-site-internet-commerce',
  '/guides/etre-visible-google-local',
  '/guides/quand-refaire-son-site',
  '/guides/charte-graphique-vs-brand-book',
  '/guides/etre-proprietaire-de-son-site',
  '/guides/n8n-make-zapier-comparatif',
  '/guides/prix-site-vitrine',
  '/guides/prix-identite-visuelle',
  '/guides/logo-freelance-ou-agence',
  '/guides/prix-clip-musical',
  '/guides/tarif-video-entreprise',
  '/guides/prix-agent-ia-pme',
  '/guides/agent-ia-vs-chatbot',
  '/agence-web-versailles',
  '/agence-web-boulogne-billancourt',
  '/agence-web-nanterre',
  '/agence-web-creteil',
]);

/* Liste explicite + filet générique (crawler|spider|scraper|"bot" en mot) :
   couvre les outils SEO (BotSEO, Ahrefs, Screaming Frog…) et les futurs
   crawlers IA sans maintenance. Les navigateurs humains ne matchent jamais ;
   headless Chrome (Lighthouse/PageSpeed) non plus → il garde le SPA et
   mesure la vraie expérience visiteur. */
const BOT =
  /(googlebot|google-inspectiontool|storebot-google|bingbot|bingpreview|slurp|duckduckbot|baiduspider|yandex|sogou|exabot|facebookexternalhit|facebot|twitterbot|linkedinbot|embedly|quora link preview|pinterest|slackbot|vkshare|w3c_validator|applebot|ia_archiver|gptbot|oai-searchbot|chatgpt-user|perplexitybot|claudebot|claude-web|anthropic-ai|ccbot|amazonbot|bytespider|petalbot|crawler|spider|scraper|linkpreview|botseo|ahrefs|semrush|screaming frog|dataforseo|seranking|majestic|\bbot\b|bot\/\d)/i;

export default function middleware(req: Request) {
  // Filet de sécurité : toute erreur → next() (application normale). Le
  // visiteur ne peut JAMAIS être impacté par un bug du middleware.
  try {
    const ua = req.headers.get('user-agent') || '';
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    // Humain, ou route sans snapshot → application normale, rien n'est touché.
    if (!BOT.test(ua) || !PRERENDERED.has(path)) return next();

    // Robot → on sert le snapshot HTML statique correspondant.
    const file = path === '/' ? '/__prerender/index.html' : `/__prerender${path}/index.html`;
    return rewrite(new URL(file, url.origin));
  } catch {
    return next();
  }
}
