export interface SEOMetaData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export const updateMetaTags = (metadata: SEOMetaData) => {
  const baseUrl = window.location.origin;
  const currentUrl = metadata.url || window.location.href;
  const defaultImage = `${baseUrl}/GND consulting Logo Blanc.png`;

  document.title = metadata.title;

  const updateOrCreateMeta = (property: string, content: string) => {
    let element = document.querySelector(`meta[property="${property}"]`) ||
                   document.querySelector(`meta[name="${property}"]`);

    if (!element) {
      element = document.createElement('meta');
      if (property.startsWith('og:') || property.startsWith('twitter:')) {
        element.setAttribute('property', property);
      } else {
        element.setAttribute('name', property);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const updateOrCreateLink = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    element.setAttribute('href', href);
  };

  updateOrCreateMeta('description', metadata.description);
  updateOrCreateMeta('robots', 'index, follow');

  updateOrCreateMeta('og:title', metadata.title);
  updateOrCreateMeta('og:description', metadata.description);
  updateOrCreateMeta('og:image', metadata.image || defaultImage);
  updateOrCreateMeta('og:url', currentUrl);
  updateOrCreateMeta('og:type', metadata.type || 'website');
  updateOrCreateMeta('og:locale', 'fr_FR');
  updateOrCreateMeta('og:site_name', 'GND Consulting');

  updateOrCreateMeta('twitter:card', 'summary_large_image');
  updateOrCreateMeta('twitter:site', '@gndconsulting');
  updateOrCreateMeta('twitter:title', metadata.title);
  updateOrCreateMeta('twitter:description', metadata.description);
  updateOrCreateMeta('twitter:image', metadata.image || defaultImage);

  updateOrCreateLink('canonical', currentUrl);
};

export const defaultSEO: SEOMetaData = {
  title: 'gndconsulting.fr - Créativité & Impact Digital',
  description: 'Studio créatif spécialisé en production audiovisuelle, design graphique et stratégie digitale. Créativité, innovation et résultats garantis.',
  image: '/GND consulting Logo Blanc.png',
  type: 'website'
};

export const pageSEO = {
  home: {
    title: 'GND Consulting – Studio créatif humain & IA',
    description: 'Studio créatif: production vidéo, motion design, design graphique, automatisation IA.',
    url: 'https://www.gndconsulting.fr/',
  },
  about: {
    title: 'À Propos | GND Consulting – Studio créatif Paris',
    description: 'GND Consulting: studio créatif hybride alliant créativité humaine et intelligence artificielle.',
  },
  portfolio: {
    title: 'Portfolio & Réalisations | GND Consulting',
    description: 'Découvrez nos réalisations: production audiovisuelle 4K, motion design et photographie professionnelle.',
  },
  services: {
    title: 'Nos Services Créatifs | GND Consulting',
    description: 'Services: production vidéo 4K, design d\'identité, motion design, photo, automatisation IA.',
  },
  contact: {
    title: 'Contact | GND Consulting – Devis gratuit',
    description: 'Contactez GND Consulting: devis gratuit sous 2h pour vos projets créatifs.',
  },
  designService: {
    title: 'Design & Identité Visuelle | GND Consulting',
    description: 'Création de logos, chartes graphiques et identités visuelles sur mesure par GND Consulting.',
  },
  motionDesignService: {
    title: 'Motion Design & Animation 2D/3D | GND Consulting',
    description: 'Création de vidéos motion design, animations 2D/3D et contenus animés captivants.',
  },
  productionService: {
    title: 'Production Audiovisuelle 4K | GND Consulting',
    description: 'Production vidéo professionnelle: clips, corporate, captations live et films publicitaires.',
  },
  photographyService: {
    title: 'Photographie Professionnelle | GND Consulting',
    description: 'Photographie: portraits corporate, packshots produits, événementiel et créations artistiques.',
  },
  aiService: {
    title: 'Automatisation & IA | GND Consulting',
    description: 'Solutions d\'automatisation et intelligence artificielle pour optimiser vos workflows.',
  }
};
