import React from 'react';
import { useLocation } from 'react-router-dom';
import { pageSEO } from '../utils/seo';

export function StructuredData() {
  const location = useLocation();
  const baseUrl = 'https://www.gndconsulting.fr';
  const url = `${baseUrl}${location.pathname}`;

  // Déterminer les métadonnées de la page actuelle
  const getPageMeta = () => {
    const path = location.pathname;
    if (path === '/') return pageSEO.home;
    if (path.startsWith('/services/design')) return pageSEO.designService;
    if (path.startsWith('/services/motion-design')) return pageSEO.motionDesignService;
    if (path.startsWith('/services/production-audiovisuelle')) return pageSEO.productionService;
    if (path.startsWith('/services/photographie')) return pageSEO.photographyService;
    if (path.startsWith('/services/automatisation-ia')) return pageSEO.aiService;
    if (path.startsWith('/mentions-legales')) return { title: 'Mentions Légales | GND Consulting', description: 'Mentions légales et informations légales de GND Consulting.' };
    if (path.startsWith('/partenaires')) return { title: 'Partenaires | GND Consulting', description: 'Nos partenaires et collaborations.' };
    return pageSEO.home;
  };

  const pageMeta = getPageMeta();

  // Organisation avec noms alternatifs pour améliorer la recherche
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: 'GND Consulting',
    alternateName: [
      'GND',
      'G.N.D. Consulting',
      'GND Studio',
      'Studio GND',
      'GND Consulting Paris',
      'gndconsulting',
      'gndconsulting.fr'
    ],
    url: baseUrl,
    logo: `${baseUrl}/GND consulting Logo.png`,
    image: `${baseUrl}/GND consulting Logo Blanc.png`,
    description: 'Studio créatif alliant créativité humaine et intelligence artificielle. Production vidéo, motion design, design graphique, photographie et automatisation IA.',
    slogan: 'Studio créatif humain & IA',
    foundingDate: '2023',
    areaServed: {
      '@type': 'Country',
      name: 'France'
    },
    serviceType: [
      'Production vidéo',
      'Motion design',
      'Design graphique',
      'Identité visuelle',
      'Photographie professionnelle',
      'Automatisation IA',
      'Création de contenu'
    ],
    sameAs: [
      'https://www.instagram.com/gndconsulting/',
      'https://linkedin.com/in/roodny-pierre',
      'https://tiktok.com/@gndconsulting'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33759506322',
      email: 'contact@gndconsulting.fr',
      contactType: 'customer service',
      availableLanguage: ['French', 'English']
    }
  };

  // Schema WebSite pour améliorer l'affichage dans les résultats Google
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'GND Consulting',
    alternateName: 'GND Studio Créatif',
    url: baseUrl,
    description: 'Studio créatif: production vidéo, motion design, design graphique, automatisation IA.',
    publisher: {
      '@id': `${baseUrl}/#organization`
    },
    inLanguage: 'fr-FR'
  };

  const segments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: `${baseUrl}/`
    }
  ];

  segments.forEach((seg, idx) => {
    const path = `/${segments.slice(0, idx + 1).join('/')}`;
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: idx + 2,
      name: seg.replace(/-/g, ' '),
      item: `${baseUrl}${path}`
    });
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  };

  // Schema WebPage pour renforcer le titre et la description de chaque page
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url: url,
    name: pageMeta.title,
    description: pageMeta.description,
    isPartOf: {
      '@id': `${baseUrl}/#website`
    },
    about: {
      '@id': `${baseUrl}/#organization`
    },
    inLanguage: 'fr-FR',
    datePublished: '2023-01-01',
    dateModified: new Date().toISOString().split('T')[0]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}


