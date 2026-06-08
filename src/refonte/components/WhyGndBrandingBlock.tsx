/* WhyGndBrandingBlock, variante de WhyGndBlock pour /services/branding-identite.
 * 6 chips orientés branding : Vue d'ensemble, Logo, Charte, Direction artistique, Supports, Garanties.
 * Réutilise WhyGndBlock (refactor à props categories). Pas de duplication du JSX (~700 lignes).
 */
import { WhyGndBlock, type CategoryData } from './WhyGndBlock';

const BRANDING_CATEGORIES: CategoryData[] = [
  {
    id: '01',
    label: 'GND Consulting',
    hideCallout: true,
    headline: {
      plain: "Le branding n'est pas une dépense.",
      italic: "C'est un actif",
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Notre conviction :',
        body: "Chez GND Consulting, nous considérons l'identité visuelle comme un levier de croissance. C'est elle qui crée la première impression, inspire confiance et donne de la cohérence à toute votre communication. Une marque forte est reconnue, comprise et mémorisée.",
      },
      {
        label: 'Nous construisons des systèmes de marque :',
        body: "Au-delà du logo, nous concevons un univers visuel complet : identité, direction artistique, règles d'usage et supports de communication. L'objectif est simple, que votre marque reste cohérente partout où elle apparaît, sur votre site, vos réseaux sociaux, vos vidéos et vos supports commerciaux.",
      },
      {
        label: 'Comprendre avant de créer :',
        body: "Avant toute proposition graphique, nous prenons le temps de comprendre votre activité, votre marché et vos objectifs. Une identité durable ne naît pas d'un template ou d'une tendance. Elle naît d'une compréhension claire de ce qui rend votre entreprise unique.",
      },
    ],
    palette: {
      bg: '#2A1810',
      bgImage: '/assets/branding-hero3-bg01.png',
      glow:
        'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(255,149,79,0.18) 0%, transparent 70%), radial-gradient(ellipse 45% 65% at 10% 80%, rgba(255,149,79,0.10) 0%, transparent 65%)',
      ring: '#3A2418',
      bubbleImage: '/assets/branding-hero3-bubble01.png',
      bubbleAlt: 'Studio GND, vision de marque',
    },
    callout: {
      kicker: 'À propos',
      title: 'Studio créatif Paris',
      price: 'Sur devis',
      description:
        "Un seul interlocuteur, une seule direction artistique. Du brief au livrable, sans intermédiaire.",
      tags: ['Studio boutique', 'Humain × IA', 'Direction unique'],
    },
    stats: [
      { value: '360°', label: 'identité complète' },
      { value: '1', label: 'direction artistique' },
      { value: '100 %', label: 'sur-mesure' },
    ],
  },
  {
    id: '02',
    label: 'Stratégie de marque',
    headline: {
      plain: 'La fondation,',
      italic: 'avant la forme',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Le cadrage :',
        body: "Positionnement, valeurs, promesse et audience cible. Avant de créer, nous clarifions ce que votre marque représente, à qui elle s'adresse et ce qui la distingue. Chaque décision créative repose sur cette base.",
      },
      {
        label: 'La plateforme de marque :',
        body: "Une marque ne se résume pas à son apparence. Elle se définit aussi par sa manière de s'exprimer. Ton de voix, vocabulaire, messages clés : nous documentons le verbal avec la même rigueur que le visuel.",
      },
      {
        label: 'Ce qui ne se voit pas fait toute la différence :',
        body: "La stratégie est souvent invisible, mais c'est elle qui donne du sens à l'ensemble. Sans fondation, vous obtenez un logo. Avec une fondation solide, vous construisez une marque capable d'évoluer et de durer.",
      },
    ],
    palette: {
      bg: '#3F2418',
      bgImage: '/assets/branding-hero3-bg02.png',
      glow:
        'radial-gradient(ellipse 70% 60% at 25% 30%, rgba(253,246,238,0.14) 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 90% 80%, rgba(255,149,79,0.18) 0%, transparent 60%)',
      ring: '#553420',
      bubbleImage: '/assets/branding-hero3-bubble02.png',
      bubbleAlt: 'Stratégie de marque, positionnement & ton',
    },
    callout: {
      kicker: 'Fondation',
      title: 'Stratégie & plateforme',
      price: 'Sur devis',
      description:
        "Positioning, valeurs, promesse, ton de voix. La fondation invisible qui rend tout le reste évident.",
      tags: ['Positioning', 'Ton de voix', 'Plateforme verbale'],
    },
    stats: [
      { value: '1', label: 'positioning clair' },
      { value: '360°', label: 'plateforme' },
      { value: 'Tenue', label: 'dans le temps' },
    ],
  },
  {
    id: '03',
    label: 'Logo & système d\'identité',
    headline: {
      plain: 'Un logo',
      italic: 'pensé pour durer',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'La conception :',
        body: "Recherche typographique, exploration graphique et présentation de plusieurs directions créatives. Chaque piste est expliquée et argumentée pour vous permettre de faire un choix éclairé.",
      },
      {
        label: 'Un système, pas un simple symbole :',
        body: "Logo principal, variantes, monogramme, versions monochromes et négatives. Chaque élément est conçu pour rester lisible et cohérent sur tous vos supports, du site web à l'enseigne physique.",
      },
      {
        label: "Des livrables prêts à l'emploi :",
        body: "Vous récupérez l'ensemble des fichiers professionnels (AI, EPS, SVG, PNG, JPG), organisés et documentés. Un système de marque exploitable par n'importe quel prestataire, sans dépendance à GND.",
      },
    ],
    palette: {
      bg: '#4A1E0A',
      bgImage: '/assets/branding-hero3-bg03.png',
      // Slide 03 : moins de teinte chocolat → opacité image quasi pleine + scrim
      // beaucoup plus léger (juste assez à gauche pour la lisibilité du texte).
      bgImageOpacity: 0.96,
      scrimBackground:
        'linear-gradient(90deg, rgba(42,24,16,0.48) 0%, rgba(42,24,16,0.26) 38%, rgba(42,24,16,0.08) 70%, rgba(42,24,16,0) 100%)',
      glow:
        'radial-gradient(ellipse 75% 65% at 70% 30%, rgba(255,149,79,0.50) 0%, transparent 65%), radial-gradient(ellipse 55% 70% at 15% 85%, rgba(255,149,79,0.22) 0%, transparent 60%)',
      ring: '#5C2A14',
      bubbleImage: '/assets/branding-hero3-bubble03.png',
      bubbleAlt: 'Logo & système d\'identité, variantes',
    },
    callout: {
      kicker: 'Brique fondatrice',
      title: 'Logo & système',
      price: 'Sur devis',
      description:
        "Conception originale, deux à trois directions, trois rounds d'itération, variantes complètes, livrables multi-formats.",
      tags: ['2–3 directions', '3 rounds inclus', 'Multi-formats'],
    },
    stats: [
      { value: '2–3', label: 'directions présentées' },
      { value: '3', label: 'rounds inclus' },
      { value: 'AI / EPS', label: 'formats pros' },
    ],
  },
  {
    id: '04',
    label: 'Charte & brand book',
    headline: {
      plain: 'Une charte',
      italic: 'pensée pour être utilisée',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Un système graphique cohérent :',
        body: "Couleurs, typographies, hiérarchies visuelles, espacements et principes de mise en page. Chaque élément est documenté pour garantir une communication homogène sur tous vos supports.",
      },
      {
        label: 'Des règles simples et claires :',
        body: "Zones de protection, tailles minimales, usages recommandés et erreurs à éviter. L'objectif est que votre marque reste reconnaissable et cohérente, quel que soit le support ou le prestataire qui intervient.",
      },
      {
        label: 'Un brand book qui vous appartient :',
        body: "Vous recevez un document structuré, conçu pour être compris et utilisé dans le temps. Votre identité reste exploitable par n'importe quel designer, agence ou collaborateur, sans dépendance.",
      },
      {
        label: 'En option, les Generative Guidelines :',
        body: "Nos règles d'usage IA documentées peuvent être intégrées au brand book pour les marques qui souhaitent préparer leur communication de demain.",
      },
    ],
    palette: {
      bg: '#160A04',
      bgImage: '/assets/branding-hero3-bg04.png',
      bgImageOpacity: 0.92,
      scrimBackground:
        'linear-gradient(90deg, rgba(42,24,16,0.5) 0%, rgba(42,24,16,0.3) 38%, rgba(42,24,16,0.1) 70%, rgba(42,24,16,0) 100%)',
      glow:
        'radial-gradient(ellipse 65% 55% at 75% 25%, rgba(255,149,79,0.28) 0%, transparent 60%), radial-gradient(ellipse 55% 65% at 20% 80%, rgba(212,165,42,0.20) 0%, transparent 60%)',
      ring: '#241408',
      bubbleImage: '/assets/branding-hero3-bubble04.png',
      bubbleAlt: 'Charte & brand book, système 360°',
    },
    callout: {
      kicker: 'Système complet',
      title: 'Charte & brand book',
      price: 'Sur devis',
      description:
        "Couleurs, typographies, grilles, règles d'usage, exemples d'application. Brand book PDF exploitable par tous vos prestataires.",
      tags: ['Couleurs', 'Typographies', 'PDF exploitable'],
    },
    stats: [
      { value: '360°', label: 'système complet' },
      { value: 'PDF', label: 'exploitable' },
      { value: '100 %', label: 'reprenable' },
    ],
  },
  {
    id: '05',
    label: 'Activation marketing',
    headline: {
      plain: "L'identité",
      italic: 'au service de votre croissance',
      suffix: '.',
    },
    paragraphs: [
      {
        label: "Du brand book à l'action :",
        body: "Une identité qui reste dans un PDF ne crée aucun impact. Nous la transformons en outils concrets, prêts à être utilisés par vos équipes au quotidien.",
      },
      {
        label: 'Déclinaisons digitales :',
        body: "Templates Instagram, LinkedIn, signatures e-mail, miniatures vidéo, bannières et supports web. Tout est pensé pour gagner du temps sans sacrifier la cohérence de votre marque.",
      },
      {
        label: 'Supports imprimés :',
        body: "Cartes de visite, flyers, brochures, kakemonos, packaging et signalétique. De la conception au suivi d'impression, nous vous accompagnons pour garantir un rendu fidèle à votre identité.",
      },
    ],
    palette: {
      bg: '#352014',
      glow:
        'radial-gradient(ellipse 65% 55% at 35% 30%, rgba(212,165,42,0.24) 0%, transparent 60%), radial-gradient(ellipse 55% 60% at 85% 75%, rgba(255,149,79,0.18) 0%, transparent 60%)',
      ring: '#4A2E1E',
      bubbleAlt: 'Activation marketing, déclinaisons digital + print',
    },
    callout: {
      kicker: 'Application',
      title: 'Activation marketing',
      price: 'Sur devis',
      description:
        "Templates sociaux, signatures, supports imprimés, packaging. L'identité prête à descendre dans votre communication.",
      tags: ['Templates', 'Print', 'Réseau imprimeurs'],
    },
    stats: [
      { value: '∞', label: 'déclinaisons' },
      { value: 'Print', label: 'partenaires' },
      { value: 'BAT', label: 'inclus' },
    ],
  },
  {
    id: '06',
    label: 'Propriété & garanties',
    headline: {
      plain: 'Votre marque vous appartient.',
      italic: 'Point final',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Tous les fichiers sont transmis :',
        body: "À la fin de la mission, vous récupérez l'ensemble des fichiers sources et formats professionnels (AI, EPS, SVG, PSD, INDD...). Votre identité reste pleinement exploitable, aujourd'hui comme demain.",
      },
      {
        label: 'Aucune dépendance :',
        body: "Le brand book est conçu pour être compris et utilisé par n'importe quel designer, agence ou collaborateur. Vous êtes libre de faire évoluer votre marque avec le partenaire de votre choix.",
      },
      {
        label: 'Transparence du début à la fin :',
        body: "Trois rounds de modifications sont inclus. Les délais sont définis dès le devis et suivis tout au long du projet. Vous gardez le contrôle créatif, nous assurons la méthode, l'exécution et le suivi.",
      },
    ],
    palette: {
      bg: '#0F0604',
      glow:
        'radial-gradient(ellipse 50% 45% at 50% 25%, rgba(255,149,79,0.18) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 15% 75%, rgba(212,165,42,0.14) 0%, transparent 60%)',
      ring: '#1F1208',
      bubbleAlt: 'Propriété & garanties GND',
    },
    callout: {
      kicker: 'Engagements GND',
      title: 'Propriété totale',
      price: 'Inclus',
      description:
        "Fichiers sources transmis, brand book exploitable, trois rounds inclus, délais tenus. Tout vous appartient.",
      tags: ['Sources transmises', 'Brand book reprenable', 'Sans verrou'],
    },
    stats: [
      { value: '100 %', label: 'propriétaire' },
      { value: '0', label: 'verrou' },
      { value: '3', label: 'rounds inclus' },
    ],
  },
];

export function WhyGndBrandingBlock() {
  return (
    <WhyGndBlock
      categories={BRANDING_CATEGORIES}
      kickerLabel="Notre vision"
      kickerSubLabel="Branding & identité"
      defaultActiveCat="01"
      hideCtas
    />
  );
}
