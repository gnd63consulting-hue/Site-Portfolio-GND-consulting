import React from 'react';
import { useLocation } from 'react-router-dom';

export function StructuredData() {
  const location = useLocation();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const url = `${baseUrl}${location.pathname}`;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GND Consulting',
    url: baseUrl || 'https://gndconsulting.fr',
    logo: `${baseUrl}/GND consulting Logo.png`,
    sameAs: [
      'https://www.instagram.com/gndconsulting/',
      'https://linkedin.com/in/roodny-pierre'
    ],
    description: 'Studio créatif: production vidéo, motion design, design graphique, automatisation IA.'
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}


