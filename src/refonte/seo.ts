/* SEO par route — natif refonte (pas de react-router).
 * Met à jour, à chaque changement de page : <title>, meta description,
 * canonical, Open Graph, Twitter + injecte les données structurées
 * WebPage et BreadcrumbList propres à la page.
 * 100 % côté <head>, invisible pour le visiteur (aucun impact visuel).
 * L'Organization + WebSite sont statiques dans index.html (lus sans JS) ;
 * ces snapshots-ci seront vus par Google une fois le pré-rendu en place. */

import { GUIDES } from './pages/guides';

const BASE = 'https://www.gndconsulting.fr';

type Meta = { title: string; description: string };

export const SEO_META: Record<string, Meta> = {
  '/': {
    title: 'GND Consulting, Studio créatif humain × IA · Paris',
    description:
      "Studio créatif hybride à Paris : sites web & SEO, branding, audiovisuel, automatisation IA. L'œil humain pour signer, l'IA pour accélérer. Devis sous 48h.",
  },
  '/agence': {
    title: "GND Consulting, L'Agence — Manifeste Humain × IA",
    description:
      "Studio créatif fondé en 2025 : une équipe, quatre branches, une direction créative unifiée. Manifeste, éthique et méthode hybride humain × IA.",
  },
  '/services/sites-vitrines': {
    title: 'GND Consulting, Sites vitrines & SEO clé en main',
    description:
      "Sites vitrines clé en main pour commerces et indépendants : design sur-mesure, SEO local, livraison en 1 à 2 semaines, sans abonnement, site 100 % propriétaire.",
  },
  '/services/branding-identite': {
    title: 'GND Consulting, Branding & Identité visuelle',
    description:
      'Création de marque complète : logo, charte graphique, direction créative, supports imprimés et déclinaisons digitales. Une identité cohérente qui marque les esprits.',
  },
  '/services/audiovisuel': {
    title: 'GND Consulting, Production audiovisuelle — Vidéo, motion, photo',
    description:
      "Studio parisien : captation 4K/8K, clips, aftermovies, émissions, montage, motion design et photographie. De l'écriture à la livraison, tout en interne.",
  },
  '/services/automatisation-ia': {
    title: 'GND Consulting, Automatisation & IA',
    description:
      "Workflows intelligents, agents IA sur-mesure, audit et accompagnement à l'adoption : l'IA au service de votre productivité, pilotée par une direction humaine, conforme RGPD.",
  },
  '/realisations': {
    title: 'GND Consulting, Réalisations — Portfolio',
    description:
      'Clips, captations live, émissions, photographie et identité visuelle : le portfolio GND Consulting. Chaque projet porte une intention, chaque image une signature.',
  },
  '/contact': {
    title: 'GND Consulting, Contact — Démarrer un projet',
    description:
      'Parlez-nous de votre projet : réponse sous 24h, devis sous 48h, sans engagement. Studio créatif humain × IA basé en région parisienne.',
  },
  '/mentions-legales': {
    title: 'GND Consulting, Mentions légales',
    description:
      'Mentions légales de GND Consulting : informations sur l\'éditeur, l\'hébergeur, la propriété intellectuelle, les données personnelles et la politique cookies du site.',
  },
  '/guides': {
    title: 'GND Consulting, Guides — Ressources pour votre projet',
    description:
      'Guides clairs pour réussir votre projet digital : sites web, identité visuelle, vidéo, automatisation IA. Réponses concrètes pour PME et indépendants.',
  },
  '/creation-site-internet-restaurant': {
    title: 'GND Consulting, Création de site internet pour restaurant',
    description:
      "Site internet pour restaurant : design qui donne faim, zéro commission, trouvable sur Google et par les IA. Réservation et commande en direct, site 100 % propriétaire. Dès 800 €.",
  },
  '/agence-web-versailles': {
    title: 'Agence web Versailles, création de site internet (78) | GND Consulting',
    description:
      "Studio créatif parisien intervenant à Versailles et dans les Yvelines (78). Création de site internet, sites vitrines dès 800 €, référencement local inclus, paiement unique sans abonnement.",
  },
  '/agence-web-boulogne-billancourt': {
    title: 'Agence web Boulogne-Billancourt, création de site internet (92) | GND Consulting',
    description:
      "Studio créatif parisien intervenant à Boulogne-Billancourt et dans les Hauts-de-Seine (92). Création de site internet, sites vitrines dès 800 €, référencement local inclus, paiement unique sans abonnement.",
  },
  '/agence-web-nanterre': {
    title: 'Agence web Nanterre, création de site internet (92) | GND Consulting',
    description:
      "Studio créatif parisien intervenant à Nanterre et dans les Hauts-de-Seine (92). Création de site internet, sites vitrines dès 800 €, référencement local inclus, paiement unique sans abonnement.",
  },
};

/* Pages locales : schema LocalBusiness + Service avec areaServed précis
   (ville + département) pour le SEO local. 1 page = 1 ville. */
const LOCAL_PAGES: Record<string, { serviceType: string; city: string; region: string }> = {
  '/agence-web-versailles': {
    serviceType: 'Création de site internet',
    city: 'Versailles',
    region: 'Yvelines',
  },
  '/agence-web-boulogne-billancourt': {
    serviceType: 'Création de site internet',
    city: 'Boulogne-Billancourt',
    region: 'Hauts-de-Seine',
  },
  '/agence-web-nanterre': {
    serviceType: 'Création de site internet',
    city: 'Nanterre',
    region: 'Hauts-de-Seine',
  },
};

/* serviceType par page service — pour le schema Service (résultats enrichis). */
const SERVICE_TYPE: Record<string, string> = {
  '/services/sites-vitrines': 'Création de site web',
  '/services/branding-identite': 'Identité visuelle et branding',
  '/services/audiovisuel': 'Production audiovisuelle',
  '/services/automatisation-ia': 'Automatisation et intelligence artificielle',
};

function metaFor(route: string): Meta {
  if (SEO_META[route]) return SEO_META[route];
  if (route.startsWith('/guides/')) {
    const g = GUIDES.find((x) => x.slug === route.replace('/guides/', ''));
    if (g) return { title: `GND Consulting, ${g.title}`, description: g.description };
    return SEO_META['/guides'];
  }
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

/* Retire un bloc JSON-LD devenu hors-sujet lors d'un changement de page
   (ex. le Service ne doit pas rester sur un guide). */
function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
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
  // Pages exclues de l'index (boilerplate, ou en cours de retravail) → noindex.
  const NOINDEX = ['/mentions-legales', '/creation-site-internet-restaurant'];
  setMeta('robots', NOINDEX.includes(route) ? 'noindex, follow' : 'index, follow');
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

  // Schema Service sur les pages service (sinon on le retire).
  if (SERVICE_TYPE[route]) {
    injectJsonLd('gnd-jsonld-service', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: title.replace(/^GND Consulting,\s*/, ''),
      serviceType: SERVICE_TYPE[route],
      description,
      url,
      provider: { '@id': `${BASE}/#organization` },
      areaServed: [
        { '@type': 'Country', name: 'France' },
        { '@type': 'City', name: 'Paris' },
      ],
    });
  } else {
    removeJsonLd('gnd-jsonld-service');
  }

  // Pages locales : Service ancré à une ville (LocalBusiness comme provider,
  // areaServed = ville + département) pour le référencement local.
  if (LOCAL_PAGES[route]) {
    const { serviceType, city, region } = LOCAL_PAGES[route];
    injectJsonLd('gnd-jsonld-local', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: title.replace(/\s*\|\s*GND Consulting.*$/, '').trim(),
      serviceType,
      description,
      url,
      provider: {
        '@type': 'ProfessionalService',
        name: 'GND Consulting',
        '@id': `${BASE}/#organization`,
        url: `${BASE}/`,
        areaServed: [
          { '@type': 'City', name: city },
          { '@type': 'AdministrativeArea', name: region },
        ],
      },
      areaServed: [
        { '@type': 'City', name: city },
        { '@type': 'AdministrativeArea', name: region },
      ],
    });
  } else {
    removeJsonLd('gnd-jsonld-local');
  }

  // Schema Article sur les guides (E-E-A-T). Auteur = l'organisation GND
  // (pas de personne inventée). Pas de date fabriquée.
  if (route.startsWith('/guides/') && GUIDES.some((g) => g.slug === route.replace('/guides/', ''))) {
    injectJsonLd('gnd-jsonld-article', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: title.replace(/^GND Consulting,\s*/, ''),
      description,
      url,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-13',
      dateModified: '2026-06-22',
      author: {
        '@type': 'Organization',
        name: 'GND Consulting',
        '@id': `${BASE}/#organization`,
      },
      publisher: { '@id': `${BASE}/#organization` },
      isPartOf: { '@id': `${BASE}/#website` },
    });
  } else {
    removeJsonLd('gnd-jsonld-article');
  }
}
