/* SEO par route — natif refonte (pas de react-router).
 * Met à jour, à chaque changement de page : <title>, meta description,
 * canonical, Open Graph, Twitter + injecte les données structurées
 * WebPage et BreadcrumbList propres à la page.
 * 100 % côté <head>, invisible pour le visiteur (aucun impact visuel).
 * L'Organization + WebSite sont statiques dans index.html (lus sans JS) ;
 * ces snapshots-ci seront vus par Google une fois le pré-rendu en place. */

const BASE = 'https://www.gndconsulting.fr';

type Meta = { title: string; description: string };

export const SEO_META: Record<string, Meta> = {
  '/': {
    title: 'GND Consulting, Studio créatif humain × IA · Paris',
    description:
      "Studio créatif hybride à Paris : sites web & SEO, branding & identité, production audiovisuelle, automatisation IA. L'œil humain pour signer, l'IA pour accélérer. Devis sous 48h.",
  },
  '/agence': {
    title: "GND Consulting, L'Agence — Manifeste Humain × IA",
    description:
      "Studio créatif fondé en 2025 : une seule équipe, quatre branches, une direction créative unifiée. Notre manifeste, notre éthique et notre méthode hybride humain × IA.",
  },
  '/services/sites-vitrines': {
    title: 'GND Consulting, Sites vitrines & SEO clé en main',
    description:
      "Sites vitrines clé en main pour commerces et indépendants : design sur-mesure, SEO local, hébergement configuré, livraison 1 à 2 semaines, 0 € d'abonnement, 100 % propriétaire.",
  },
  '/services/branding-identite': {
    title: 'GND Consulting, Branding & Identité visuelle',
    description:
      'Création de marque complète : logo, charte graphique, direction créative, supports imprimés et déclinaisons digitales. Une identité cohérente qui marque les esprits.',
  },
  '/services/audiovisuel': {
    title: 'GND Consulting, Production audiovisuelle — Vidéo, motion, photo',
    description:
      "Studio parisien : captation 4K/8K, clips musicaux, aftermovies, émissions, montage cinéma, motion design et photographie. De l'écriture à la livraison, tout en interne.",
  },
  '/services/automatisation-ia': {
    title: 'GND Consulting, Automatisation & IA',
    description:
      "Workflows intelligents, agents IA sur-mesure, audit et accompagnement à l'adoption : l'IA au service de votre productivité, pilotée par une direction humaine, conforme RGPD.",
  },
  '/realisations': {
    title: 'GND Consulting, Réalisations — Portfolio',
    description:
      'Clips musicaux, captations live, émissions, photographie et identité visuelle : le portfolio GND Consulting. Chaque projet porte une intention, chaque image une signature.',
  },
  '/contact': {
    title: 'GND Consulting, Contact — Démarrer un projet',
    description:
      'Parlez-nous de votre projet : réponse sous 24h, devis sous 48h, sans engagement. Studio créatif humain × IA basé en région parisienne.',
  },
  '/mentions-legales': {
    title: 'GND Consulting, Mentions légales',
    description:
      'Mentions légales, informations éditeur et politique cookies du site gndconsulting.fr.',
  },
};

function metaFor(route: string): Meta {
  if (SEO_META[route]) return SEO_META[route];
  if (route.startsWith('/realisations/')) {
    return {
      title: 'GND Consulting, Réalisation — Portfolio',
      description:
        'Étude de cas GND Consulting : contexte, direction créative et exécution. Clips, captations, productions et identité visuelle.',
    };
  }
  // Sous-route inconnue d'une branche services → fallback sur la branche parente
  const parent = route.split('/').slice(0, 3).join('/');
  if (SEO_META[parent]) return SEO_META[parent];
  return SEO_META['/'];
}

/* Helpers <head> — créent la balise si absente, sinon la mettent à jour. */
function setMeta(key: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectJsonLd(id: string, obj: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(obj);
}

function breadcrumbFor(route: string, title: string) {
  const items: any[] = [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${BASE}/` },
  ];
  const segs = route.split('/').filter(Boolean);
  segs.forEach((seg, i) => {
    const path = `/${segs.slice(0, i + 1).join('/')}`;
    const last = i === segs.length - 1;
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: last ? title.replace(/^GND Consulting,\s*/, '') : seg.replace(/-/g, ' '),
      item: `${BASE}${path}`,
    });
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function applyRouteSeo(route: string) {
  if (typeof document === 'undefined') return;
  const { title, description } = metaFor(route);
  const url = BASE + (route === '/' ? '/' : route);

  document.title = title;
  setMeta('description', description);
  setCanonical(url);
  setMeta('og:title', title, 'property');
  setMeta('og:description', description, 'property');
  setMeta('og:url', url, 'property');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);

  injectJsonLd('gnd-jsonld-webpage', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
  });
  injectJsonLd('gnd-jsonld-breadcrumb', breadcrumbFor(route, title));
}
