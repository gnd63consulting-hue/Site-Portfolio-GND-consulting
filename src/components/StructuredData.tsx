import React from 'react';
import { useLocation } from 'react-router-dom';

export function StructuredData() {
  const location = useLocation();
  const baseUrl = 'https://www.gndconsulting.fr';
  const url = `${baseUrl}${location.pathname}`;

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}


