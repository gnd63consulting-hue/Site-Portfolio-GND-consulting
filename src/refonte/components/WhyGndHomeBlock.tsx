/* WhyGndHomeBlock, variante de WhyGndBlock pour la HOME (page d'accueil).
 *
 * 5 chips home : GND Consulting · Sites & SEO · Branding · Audiovisuel · Auto & IA.
 *
 * Mirror exact structurel de WhyGndAudiovisuelBlock / WhyGndBrandingBlock :
 * réutilise WhyGndBlock (refactor à props categories) avec un content set
 * orienté positionnement studio créatif global plutôt qu'audiovisuel pur.
 *
 * Créé 03/06/26 dans le cadre du test "mirror structure 3-héros audiovisuel
 * sur la HOME" demandé par Roodny. Les textes de la home restent inchangés ;
 * ce composant ajoute un Hero #3 sous le HeroHome existant (qui devient
 * Hero #2 du nouveau pattern).
 */
import { WhyGndBlock, type CategoryData } from './WhyGndBlock';

const HOME_CATEGORIES: CategoryData[] = [
  {
    id: '01',
    label: 'GND Consulting',
    hideCallout: true,
    headline: {
      plain: 'Un studio créatif,',
      italic: 'une vision unique',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Quatre disciplines, une seule direction.',
        body: "Sites web, branding, audiovisuel et automatisation IA réunis sous une même direction artistique. Un seul interlocuteur, une cohérence de bout en bout, des projets livrés en 1 à 3 semaines selon la maille.",
        labelAsBlock: true,
      },
      {
        label: "L'humain d'abord, l'outil ensuite.",
        body: "Notre métier n'est pas de produire des livrables : c'est d'aider des entrepreneurs à transformer leur présence digitale en levier business. L'IA accélère, mais l'intention reste humaine. Chaque projet part d'un brief réel, jamais d'un template.",
        labelAsBlock: true,
      },
      {
        label: 'Un studio boutique, pas une agence.',
        body: "Pas d'intermédiaire, pas de chaîne de commandement. Vous parlez directement aux personnes qui produisent. Décisions rapides, itérations courtes, livraison sans friction.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#2A1810',
      bgImage: '/assets/svc-production.png',
      glow:
        'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(255,149,79,0.18) 0%, transparent 70%), radial-gradient(ellipse 45% 65% at 10% 80%, rgba(255,149,79,0.10) 0%, transparent 65%)',
      ring: '#3A2418',
      bubbleAlt: 'GND Consulting, studio créatif Paris',
    },
    stats: [
      { value: '4', label: 'disciplines internalisées' },
      { value: '1', label: 'direction artistique' },
      { value: '100 %', label: 'sur-mesure' },
    ],
  },
  {
    id: '02',
    label: 'Sites & SEO',
    headline: {
      plain: 'Des sites pensés',
      italic: 'pour convertir',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Sites vitrines clé en main.',
        body: "Vitrines, landing pages et boutiques en ligne livrées en 1 à 2 semaines. Design sur-mesure, code propre, performance Core Web Vitals au vert, hébergement et déploiement gérés.",
        labelAsBlock: true,
      },
      {
        label: 'SEO local intégré dès le brief.',
        body: "Architecture pensée pour le référencement, schémas structurés, sitemap, balises optimisées et fiche Google Business Profile cadrée. Visibilité organique, pas dépendance pub.",
        labelAsBlock: true,
      },
      {
        label: 'Charge cognitive zéro.',
        body: "On fait le site, vous validez deux clics, vous n'y touchez plus. Maintenance incluse 6 mois sur tous les packs. Mises à jour, sauvegardes, sécurité prises en charge.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#3F2418',
      bgImage: '/assets/svc-sites.png',
      glow:
        'radial-gradient(ellipse 70% 60% at 25% 30%, rgba(253,246,238,0.14) 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 90% 80%, rgba(255,149,79,0.18) 0%, transparent 60%)',
      ring: '#553420',
      bubbleAlt: 'Sites & SEO, vitrines clé en main',
    },
    callout: {
      kicker: 'Présence digitale',
      title: 'Sites & SEO',
      price: 'À partir de 1 500 €',
      description:
        "Vitrines, landing pages, boutiques. Design sur-mesure, SEO local intégré, livraison 1-2 sem, maintenance 6 mois incluse.",
      tags: ['Vitrine', 'Landing', 'SEO local'],
    },
    stats: [
      { value: '1-2 sem', label: 'délai moyen' },
      { value: 'CWV vert', label: 'performance' },
      { value: '6 mois', label: 'maintenance incluse' },
    ],
  },
  {
    id: '03',
    label: 'Branding & Identité',
    headline: {
      plain: 'Une marque',
      italic: 'qui marque',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Logo, charte, direction créative.',
        body: "Identité visuelle complète : logo, palette, typographie, principes de cadrage, déclinaisons print et digitales. Un brand book exploitable, pas un PDF qui prend la poussière.",
        labelAsBlock: true,
      },
      {
        label: 'Supports imprimés sur-mesure.',
        body: "Cartes de visite, plaquettes, flyers, packaging, signalétique : tout ce qui matérialise votre marque dans le monde physique, pensé comme un prolongement cohérent du digital.",
        labelAsBlock: true,
      },
      {
        label: 'Une marque qui tient dans le temps.',
        body: "Pas de tendance jetable. Une identité construite pour durer cinq à dix ans, qui résiste aux modes et reste reconnaissable sur tous vos supports, du site à l'enseigne.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#4A1E0A',
      bgImage: '/assets/svc-design.png',
      glow:
        'radial-gradient(ellipse 75% 65% at 70% 30%, rgba(255,149,79,0.50) 0%, transparent 65%), radial-gradient(ellipse 55% 70% at 15% 85%, rgba(255,149,79,0.22) 0%, transparent 60%)',
      ring: '#5C2A14',
      bubbleAlt: 'Branding & Identité, direction créative',
    },
    callout: {
      kicker: 'Identité de marque',
      title: 'Branding & Identité',
      price: 'À partir de 2 500 €',
      description:
        "Logo, charte graphique, brand book, supports imprimés. Identité visuelle complète pensée pour durer cinq à dix ans.",
      tags: ['Logo', 'Charte', 'Print'],
    },
    stats: [
      { value: '5-10 ans', label: 'durabilité' },
      { value: '360°', label: 'cohérence' },
      { value: 'Print + digital', label: 'déclinaisons' },
    ],
  },
  {
    id: '04',
    label: 'Audiovisuel',
    headline: {
      plain: "L'image",
      italic: "au service de l'émotion",
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Vidéo, motion, photographie.',
        body: "Captation 4K/8K, montage cinéma, motion design 2D/3D, photographie pro. Trois disciplines réunies sous une même direction artistique pour garantir une cohérence visuelle totale.",
        labelAsBlock: true,
      },
      {
        label: "L'activité historique de GND.",
        body: "Avant les sites web et l'IA, il y avait l'image. Cette expertise continue d'influencer tout ce que nous produisons : rythme, cadrage, lumière, intention narrative dans chaque contenu.",
        labelAsBlock: true,
      },
      {
        label: 'Du brief au master final.',
        body: "Pré-production, tournage, post-production, étalonnage, sound design, livraison multi-formats. Un seul interlocuteur de bout en bout. Sources transmises, archive 3 ans incluse.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#160A04',
      bgImage: '/assets/svc-production.png',
      glow:
        'radial-gradient(ellipse 65% 55% at 75% 25%, rgba(255,149,79,0.28) 0%, transparent 60%), radial-gradient(ellipse 55% 65% at 20% 80%, rgba(212,165,42,0.20) 0%, transparent 60%)',
      ring: '#241408',
      bubbleAlt: 'Audiovisuel, vidéo, motion, photographie',
    },
    callout: {
      kicker: 'Captation cinéma',
      title: 'Audiovisuel',
      price: 'Sur devis',
      description:
        "Captation 4K/8K, montage narratif, motion design, photographie pro. Du brief au master final, sources transmises.",
      tags: ['4K · 8K', 'Motion 2D/3D', 'Photo pro'],
    },
    stats: [
      { value: '4K / 8K', label: 'qualité broadcast' },
      { value: '3 ans', label: 'archive sources' },
      { value: 'Multi-format', label: 'livraison' },
    ],
  },
  {
    id: '05',
    label: 'Automatisation & IA',
    headline: {
      plain: "L'IA au service",
      italic: 'de votre productivité',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Workflows intelligents sur-mesure.',
        body: "n8n, Make, Zapier, agents IA custom : chaînes d'automatisation pensées pour vos vrais usages métier. Pas de gadget. Pas de POC qui dort. Que des workflows qui tournent en prod et économisent des heures.",
        labelAsBlock: true,
      },
      {
        label: "Audit & accompagnement à l'adoption.",
        body: "L'IA n'est pas une baguette magique. Avant de déployer, on cartographie vos process, on identifie les gisements de temps, on prototype, on mesure. Adoption progressive, pas big bang.",
        labelAsBlock: true,
      },
      {
        label: "Intégration humain × IA.",
        body: "L'IA accélère, l'humain décide. Chaque automatisation laisse à votre équipe le contrôle des décisions sensibles. Pas de boîte noire, pas de dépendance opaque à un prestataire.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#352014',
      bgImage: '/assets/svc-ia.png',
      glow:
        'radial-gradient(ellipse 65% 55% at 35% 30%, rgba(212,165,42,0.24) 0%, transparent 60%), radial-gradient(ellipse 55% 60% at 85% 75%, rgba(255,149,79,0.18) 0%, transparent 60%)',
      ring: '#4A2E1E',
      bubbleAlt: 'Automatisation & IA, workflows intelligents',
    },
    callout: {
      kicker: 'Productivité',
      title: 'Automatisation & IA',
      price: 'Sur devis',
      description:
        "Workflows n8n/Make/Zapier, agents IA sur-mesure, audit process, accompagnement adoption. Pas de POC qui dort.",
      tags: ['n8n', 'Agents IA', 'Audit process'],
    },
    stats: [
      { value: 'Humain × IA', label: 'philosophie' },
      { value: '0', label: 'boîte noire' },
      { value: 'Prod', label: 'pas POC' },
    ],
  },
];

export function WhyGndHomeBlock({ bubble01 }: { bubble01?: string } = {}) {
  // bubble01 (optionnel) : override l'image de la bulle de la slide 01 — utilisé
  // par la page Agence sans impacter la home (catégories partagées).
  const categories = bubble01
    ? HOME_CATEGORIES.map((c) =>
        c.id === '01'
          ? { ...c, palette: { ...c.palette, bubbleImage: bubble01 } }
          : c
      )
    : HOME_CATEGORIES;
  return (
    <WhyGndBlock
      categories={categories}
      kickerLabel="Notre vision"
      kickerSubLabel="Studio créatif"
      defaultActiveCat="01"
      hideCtas
    />
  );
}
