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
  '/agence-web-montreuil',
  '/agence-automatisation-ia-paris',
]);

/* Routes valides SANS snapshot pré-rendu : elles doivent rester servies
   normalement (200 + SPA), mais ne sont pas dans PRERENDERED. Sans cette
   liste, le garde-fou 404 ci-dessous les casserait. */
const KNOWN_NO_SNAPSHOT = new Set([
  // Page en cours de retravail : noindex, hors sitemap, mais bien servie.
  '/creation-site-internet-restaurant',
  // Alias hérités. vercel.json les redirige en 301 avant le middleware ;
  // listés ici par sécurité, au cas où l'ordre d'exécution changerait.
  '/services',
  '/portfolio',
  '/partenaires',
  '/services/production-audiovisuelle',
  '/services/motion-design',
  '/services/photographie',
  '/services/design-identite-visuelle',
]);

/* Une route est connue si elle a un snapshot, si elle figure ci-dessus, ou
   si c'est un détail de réalisation (id libre, pages hors sitemap). */
function isKnownRoute(path: string): boolean {
  return (
    PRERENDERED.has(path) ||
    KNOWN_NO_SNAPSHOT.has(path) ||
    path.startsWith('/realisations/')
  );
}

/* Liste explicite + filet générique (crawler|spider|scraper|"bot" en mot) :
   couvre les outils SEO (BotSEO, Ahrefs, Screaming Frog…) et les futurs
   crawlers IA sans maintenance. Les navigateurs humains ne matchent jamais ;
   headless Chrome (Lighthouse/PageSpeed) non plus → il garde le SPA et
   mesure la vraie expérience visiteur.

   ⚠️ `google-extended` doit être listé EXPLICITEMENT : contrairement à
   « googlebot », le nom ne contient pas « bot », il échappait donc au filet
   générique. Conséquence constatée le 30/07/26 : il recevait la coquille SPA
   vide (7,9 Ko) là où Googlebot recevait 54 Ko de HTML pré-rendu — autrement
   dit le corpus Gemini ne voyait rien du site. Même raison pour
   applebot-extended, meta-externalagent, mistralai et cohere-ai. */
const BOT =
  /(googlebot|google-extended|google-cloudvertexbot|google-inspectiontool|storebot-google|bingbot|bingpreview|slurp|duckduckbot|baiduspider|yandex|sogou|exabot|facebookexternalhit|facebot|twitterbot|linkedinbot|embedly|quora link preview|pinterest|slackbot|vkshare|w3c_validator|applebot|applebot-extended|ia_archiver|gptbot|oai-searchbot|chatgpt-user|perplexitybot|claudebot|claude-web|anthropic-ai|ccbot|amazonbot|bytespider|petalbot|meta-externalagent|mistralai|cohere-ai|duckassistbot|youbot|crawler|spider|scraper|linkpreview|botseo|ahrefs|semrush|screaming frog|dataforseo|seranking|majestic|\bbot\b|bot\/\d)/i;

export default async function middleware(req: Request) {
  // Filet de sécurité : toute erreur → next() (application normale). Le
  // visiteur ne peut JAMAIS être impacté par un bug du middleware.
  try {
    const ua = req.headers.get('user-agent') || '';
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    /* URL inexistante → vraie 404.
     *
     * Avant : le rewrite SPA de vercel.json renvoyait index.html en 200 pour
     * n'importe quelle URL. Google appelle ça un « soft 404 » : il doit
     * deviner, à l'aveugle, qu'une page servie en 200 est en fait vide. Ici
     * on répond avec le bon statut, plus un x-robots-tag qui tranche la
     * question même pour les crawlers qui n'exécutent pas le JavaScript.
     *
     * Le corps servi reste la coquille de l'application : le visiteur garde
     * la vraie page 404 du site, avec sa mise en page et ses liens de
     * repli. On ne redirige pas, un contenu absent doit répondre 404. */
    if (!isKnownRoute(path)) {
      const shell = await fetch(new URL('/index.html', url.origin));
      return new Response(shell.body, {
        status: 404,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'x-robots-tag': 'noindex, follow',
          'cache-control': 'no-store',
        },
      });
    }

    // Humain, ou route sans snapshot → application normale, rien n'est touché.
    if (!BOT.test(ua) || !PRERENDERED.has(path)) return next();

    // Robot → on sert le snapshot HTML statique correspondant.
    const file = path === '/' ? '/__prerender/index.html' : `/__prerender${path}/index.html`;
    return rewrite(new URL(file, url.origin));
  } catch {
    return next();
  }
}
