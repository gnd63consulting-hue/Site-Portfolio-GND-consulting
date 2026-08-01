/* Source unique des zones d'intervention (pages locales) — 31/07/26.
 *
 * Module de données volontairement séparé du composant LocalAreaLinks :
 * `layout.tsx` (footer) fait partie du bundle initial, il ne doit pas tirer
 * le composant complet ni sa feuille de style pour lire six entrées. Le
 * chantier perf du 12/07 a ramené la home de 13,5 Mo à 3,6 Mo, on ne
 * réintroduit pas du poids dans le chunk d'entrée pour du confort d'import.
 *
 * Toute nouvelle ville s'ajoute ICI, et se répercute automatiquement sur :
 *   - le footer (colonne « Zones desservies », toutes pages) ;
 *   - le bloc de maillage en bas de chaque page locale ;
 *   - le bloc « près de chez vous » de /services/sites-vitrines.
 * Restent à câbler à la main pour chaque nouvelle ville : la route dans
 * RefonteApp.tsx, SEO_META + LOCAL_PAGES dans seo.ts, la liste de
 * scripts/prerender.mjs, BOT_ROUTES dans middleware.ts, public/sitemap.xml
 * et public/llms.txt.
 */

export type LocalArea = {
  slug: string;
  /* Ancre longue, utilisée dans le corps des pages : c'est elle qui porte
     le signal sémantique. */
  anchor: string;
  /* Ancre courte, utilisée dans le footer. Volontairement naturelle plutôt
     qu'en exact-match : le footer répète les mêmes liens sur toutes les
     pages, et un empilement de « Agence web [ville] » site-wide sonnerait
     artificiel pour un gain nul (les liens de boilerplate sont de toute
     façon pondérés à la baisse). L'objectif du footer est la crawlabilité
     et le flux d'autorité, pas l'ancre. */
  short: string;
  dept: string;
  blurb: string;
};

/* Ordre géographique (ouest → est), pas alphabétique : la lecture suit la
   carte. Le vertical IA Paris ferme la liste, il est de nature différente. */
export const LOCAL_AREAS: LocalArea[] = [
  {
    slug: '/agence-web-versailles',
    anchor: 'Agence web à Versailles',
    short: 'Versailles (78)',
    dept: 'Yvelines · 78',
    blurb: 'Création et refonte de site pour les commerces, artisans et indépendants de Versailles.',
  },
  {
    slug: '/agence-web-boulogne-billancourt',
    anchor: 'Agence web à Boulogne-Billancourt',
    short: 'Boulogne-Billancourt (92)',
    dept: 'Hauts-de-Seine · 92',
    blurb: 'Sites vitrines et refontes pour les entreprises et professions libérales de Boulogne.',
  },
  {
    slug: '/agence-web-nanterre',
    anchor: 'Agence web à Nanterre',
    short: 'Nanterre (92)',
    dept: 'Hauts-de-Seine · 92',
    blurb: 'Création de site internet et référencement local pour les activités nanterriennes.',
  },
  {
    slug: '/agence-web-montreuil',
    anchor: 'Agence web à Montreuil',
    short: 'Montreuil (93)',
    dept: 'Seine-Saint-Denis · 93',
    blurb: 'Sites sur mesure pour les artisans, ateliers et commerces de Montreuil.',
  },
  {
    slug: '/agence-web-creteil',
    anchor: 'Agence web à Créteil',
    short: 'Créteil (94)',
    dept: 'Val-de-Marne · 94',
    blurb: 'Création de site vitrine et visibilité Google pour les entreprises de Créteil.',
  },
  {
    slug: '/agence-automatisation-ia-paris',
    anchor: 'Agence automatisation IA à Paris',
    short: 'Automatisation IA · Paris',
    dept: 'Paris · vertical IA',
    blurb: 'Agents IA, workflows et automatisation des tâches répétitives pour les PME parisiennes.',
  },
];
