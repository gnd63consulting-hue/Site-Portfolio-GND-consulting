/* WhyGndAudiovisuelBlock, variante de WhyGndBlock pour /services/audiovisuel.
 * 6 chips orientés audiovisuel : Vision · Vidéo · Motion · Photo · Direction artistique · Livraison & droits.
 * Réutilise WhyGndBlock (refactor à props categories), mirror exact de WhyGndBrandingBlock.
 */
import { WhyGndBlock, type CategoryData } from './WhyGndBlock';

const AUDIOVISUEL_CATEGORIES: CategoryData[] = [
  {
    id: '01',
    label: 'GND Consulting',
    hideCallout: true,
    headline: {
      plain: "L'image au service",
      italic: 'de votre histoire',
      suffix: '.',
    },
    paragraphs: [
      {
        label: "Une expertise construite sur l'audiovisuel.",
        body: "Bien avant les sites web, le branding ou l'automatisation, il y avait l'image. La vidéo, la photographie et la post-production ont façonné la manière dont nous concevons aujourd'hui chaque projet : avec une attention particulière portée au rythme, à la cohérence et à l'émotion. Cette exigence continue d'influencer tout ce que nous produisons.",
        labelAsBlock: true,
      },
      {
        label: 'Des contenus pensés pour avoir un impact.',
        body: "Une vidéo ne se résume pas à de belles images. Une photographie ne se résume pas à une bonne lumière. Chaque contenu doit servir un objectif précis : valoriser une marque, transmettre un message, capter l'attention ou créer une émotion durable. C'est cette intention qui guide nos choix créatifs du premier brief jusqu'à la livraison.",
        labelAsBlock: true,
      },
      {
        label: 'Un studio, une vision.',
        body: "Vidéo, motion design et photographie sont réunis sous une même direction créative pour garantir une communication cohérente sur l'ensemble de vos supports. Un seul interlocuteur. Une seule vision. Un projet maîtrisé de bout en bout.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#2A1810',
      bgImage: '/assets/why-bg-audiovisuel-01-gnd.webp',
      glow:
        'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(255,149,79,0.18) 0%, transparent 70%), radial-gradient(ellipse 45% 65% at 10% 80%, rgba(255,149,79,0.10) 0%, transparent 65%)',
      ring: '#3A2418',
      bubbleImage: '/assets/bubble-audiovisuel-01-gnd-v2.webp',
      bubbleAlt: 'Studio GND, production audiovisuelle',
      bubblePosition: '20% 50%',
    },
    callout: {
      kicker: 'À propos',
      title: 'Studio créatif Paris',
      price: 'Sur devis',
      description:
        "Un seul interlocuteur, une seule direction artistique. Du brief au master final, sans intermédiaire.",
      tags: ['Studio boutique', 'Humain × IA', 'Direction unique'],
    },
    stats: [
      { value: '3', label: 'disciplines internalisées' },
      { value: '1', label: 'direction artistique' },
      { value: '100 %', label: 'sur-mesure' },
    ],
  },
  {
    id: '02',
    label: 'Vidéo & production',
    headline: {
      plain: 'Une production',
      italic: 'pensée pour durer',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Une captation adaptée à votre projet.',
        body: "Événements, clips, interviews, contenus réseaux sociaux ou productions plus ambitieuses : chaque tournage est préparé en fonction du résultat attendu. Caméras professionnelles, dispositifs multi-caméras, diffusion en direct ou captation événementielle : nous adaptons les moyens techniques aux besoins réels du projet.",
        labelAsBlock: true,
      },
      {
        label: 'Du tournage à la livraison.',
        body: "Montage, étalonnage, sound design, motion design et finitions visuelles. Chaque étape est réalisée avec le même objectif : produire un contenu cohérent, fluide et prêt à être diffusé.",
        labelAsBlock: true,
      },
      {
        label: "Des fichiers prêts à l'emploi.",
        body: "Vous recevez l'ensemble des formats nécessaires pour le web, les réseaux sociaux ou l'archivage. Plus besoin de revenir vers nous pour chaque déclinaison ou export. Les fichiers sont organisés, livrés proprement.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#3F2418',
      bgImage: '/assets/why-bg-audiovisuel-02-video.webp',
      glow:
        'radial-gradient(ellipse 70% 60% at 25% 30%, rgba(253,246,238,0.14) 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 90% 80%, rgba(255,149,79,0.18) 0%, transparent 60%)',
      ring: '#553420',
      bubbleImage: '/assets/bubble-audiovisuel-02-video.webp',
      bubbleAlt: 'Vidéo & production, captation 4K/8K',
    },
    callout: {
      kicker: 'Captation cinéma',
      title: 'Vidéo & production',
      price: 'Sur devis',
      description:
        "Captation 4K/8K multi-cam, montage narratif, étalonnage couleur, sound design, déclinaisons sociales. Du rushes au master.",
      tags: ['4K · 8K', 'Multi-cam', 'Post-prod cinéma'],
    },
    stats: [
      { value: '4K / 8K', label: 'qualité broadcast' },
      { value: 'Multi-cam', label: 'régie pro' },
      { value: '∞', label: 'formats livrés' },
    ],
  },
  {
    id: '03',
    label: 'Motion design',
    headline: {
      plain: 'Le mouvement',
      italic: 'au service du message',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Une identité qui prend vie.',
        body: "Génériques, transitions, signatures vidéo, habillages ou animations de marque : nous créons un langage visuel cohérent qui renforce la reconnaissance de votre identité sur l'ensemble de vos contenus.",
        labelAsBlock: true,
      },
      {
        label: 'Des animations pensées pour être comprises.',
        body: "Motion design 2D, animations produit, contenus explicatifs ou univers visuels plus immersifs : chaque animation est conçue pour rendre votre message plus clair, plus engageant et plus facile à retenir. Nous choisissons toujours la technique la plus pertinente pour servir l'objectif du projet, jamais l'inverse.",
        labelAsBlock: true,
      },
      {
        label: 'Des contenus adaptés aux usages actuels.',
        body: "Reels, TikTok, Shorts ou campagnes digitales : les formats sont conçus pour capter l'attention rapidement et rester efficaces sur les plateformes où votre audience passe réellement son temps. Chaque seconde compte. Chaque mouvement a une fonction.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#4A1E0A',
      bgImage: '/assets/why-bg-audiovisuel-03-motion.webp',
      glow:
        'radial-gradient(ellipse 75% 65% at 70% 30%, rgba(255,149,79,0.50) 0%, transparent 65%), radial-gradient(ellipse 55% 70% at 15% 85%, rgba(255,149,79,0.22) 0%, transparent 60%)',
      ring: '#5C2A14',
      bubbleImage: '/assets/bubble-audiovisuel-03-motion.webp',
      bubbleAlt: 'Motion design, animations 2D / 3D',
    },
    callout: {
      kicker: 'Animation',
      title: 'Motion design',
      price: 'Sur devis',
      description:
        "Habillages animés, génériques, motion 2D et 3D, formats sociaux verticaux, idents de marque. Du concept au mastering.",
      tags: ['2D · 3D', 'Génériques', 'Sociaux verticaux'],
    },
    stats: [
      { value: '2D · 3D', label: 'techniques' },
      { value: '2-4 sem', label: 'délai moyen' },
      { value: 'HD', label: 'exports multi' },
    ],
  },
  {
    id: '04',
    label: 'Photographie',
    headline: {
      plain: 'Une direction artistique',
      italic: 'cohérente sur chaque image',
      suffix: '.',
    },
    paragraphs: [
      {
        label: "Portraits & communication d'entreprise.",
        body: "Dirigeants, équipes, artisans ou indépendants : nous réalisons des images qui renforcent votre crédibilité et valorisent votre savoir-faire. Chaque séance est pensée pour produire des visuels naturels, professionnels et réutilisables sur l'ensemble de vos supports de communication.",
        labelAsBlock: true,
      },
      {
        label: 'Événements & reportages.',
        body: "Conférences, séminaires, lancements ou événements privés : nous capturons les moments clés avec discrétion et exigence afin de raconter fidèlement ce qui s'est vécu sur place. Les galeries sont livrées dans des formats optimisés pour le partage, la communication et l'archivage.",
        labelAsBlock: true,
      },
      {
        label: 'Produits & univers de marque.',
        body: "Packshots, campagnes visuelles et contenus éditoriaux : chaque image est conçue pour mettre en valeur votre produit tout en renforçant l'identité de votre marque. Direction artistique, lumière, composition et retouche sont pensées comme un ensemble pour garantir une cohérence visuelle durable.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#160A04',
      bgImage: '/assets/why-bg-audiovisuel-04-photo.webp',
      glow:
        'radial-gradient(ellipse 65% 55% at 75% 25%, rgba(255,149,79,0.28) 0%, transparent 60%), radial-gradient(ellipse 55% 65% at 20% 80%, rgba(212,165,42,0.20) 0%, transparent 60%)',
      ring: '#241408',
      bubbleImage: '/assets/bubble-audiovisuel-04-photo.webp',
      bubbleAlt: 'Photographie, portrait studio direction artistique',
    },
    callout: {
      kicker: 'Image fixe',
      title: 'Photographie pro',
      price: 'Sur devis',
      description:
        "Portrait corporate, événementiel, packshot, branding visuel, séries éditoriales. Studio et extérieur, retouche pro incluse.",
      tags: ['Studio & extérieur', 'Retouche pro', 'Galerie sécurisée'],
    },
    stats: [
      { value: 'Studio', label: '+ extérieur' },
      { value: 'JPEG / RAW', label: 'livrés' },
      { value: '15+', label: 'photos portfolio' },
    ],
  },
  {
    id: '05',
    label: 'Direction artistique',
    headline: {
      plain: 'Une identité visuelle cohérente,',
      italic: "d'un support à l'autre",
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Une intention validée avant la production.',
        body: "Avant chaque tournage ou séance photo, nous définissons ensemble la direction visuelle du projet : références, ambiance, lumière, cadrages et objectifs. Cette étape permet d'aligner les attentes avant la première prise de vue.",
        labelAsBlock: true,
      },
      {
        label: 'Une seule direction artistique.',
        body: "Vidéo, motion design et photographie suivent la même logique visuelle. Les contenus partagent une cohérence de ton, de rythme et d'esthétique, qu'il s'agisse d'un clip, d'une campagne digitale ou d'un portrait professionnel.",
        labelAsBlock: true,
      },
      {
        label: 'Votre marque reste la référence.',
        body: "Si vous disposez déjà d'une charte graphique ou d'un brand book, nous nous y conformons. Dans le cas contraire, nous construisons ensemble les fondations visuelles du projet afin de garantir une communication cohérente dans le temps. Votre identité passe avant les effets de mode.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#352014',
      bgImage: '/assets/why-bg-audiovisuel-05-da.webp',
      glow:
        'radial-gradient(ellipse 65% 55% at 35% 30%, rgba(212,165,42,0.24) 0%, transparent 60%), radial-gradient(ellipse 55% 60% at 85% 75%, rgba(255,149,79,0.18) 0%, transparent 60%)',
      ring: '#4A2E1E',
      bubbleImage: '/assets/bubble-audiovisuel-05-da.webp',
      bubbleAlt: 'Direction artistique, moodboard et palette',
    },
    callout: {
      kicker: 'Cadrage créatif',
      title: 'Direction artistique',
      price: 'Sur devis',
      description:
        "Moodboard structuré, palette colorimétrique, principes de cadrage, cohérence cross-disciplines vidéo · motion · photo.",
      tags: ['Moodboard', 'Palette', 'Cohérence 360°'],
    },
    stats: [
      { value: '1', label: 'DA tenue' },
      { value: '360°', label: 'cohérence' },
      { value: 'Warm', label: 'signature' },
    ],
  },
  {
    id: '06',
    label: 'Livraison & droits',
    headline: {
      plain: 'Vos contenus vous appartiennent.',
      italic: 'Point final',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Tous les fichiers sont transmis.',
        body: "À la livraison, vous récupérez l'ensemble des exports nécessaires à votre communication : web, réseaux sociaux, diffusion ou archivage. Vos contenus restent pleinement exploitables, sans dépendance à un prestataire.",
        labelAsBlock: true,
      },
      {
        label: 'Une utilisation claire dès le départ.',
        body: "Les conditions d'exploitation sont définies en amont du projet. Vous savez précisément ce qui est inclus, où vos contenus peuvent être utilisés et dans quel cadre. Pas de zone grise. Pas de mauvaise surprise.",
        labelAsBlock: true,
      },
      {
        label: 'Une archive disponible dans le temps.',
        body: "Les fichiers sources sont conservés pendant trois ans. Si vous avez besoin d'une nouvelle version, d'un format complémentaire ou d'une adaptation plusieurs mois après la livraison, nous pouvons repartir de l'existant plutôt que de recommencer de zéro.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#0F0604',
      bgImage: '/assets/why-bg-audiovisuel-06-livraison.webp',
      glow:
        'radial-gradient(ellipse 50% 45% at 50% 25%, rgba(255,149,79,0.18) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 15% 75%, rgba(212,165,42,0.14) 0%, transparent 60%)',
      ring: '#1F1208',
      bubbleImage: '/assets/bubble-audiovisuel-06-livraison.webp',
      bubbleAlt: 'Livraison & droits, sources transmises',
    },
    callout: {
      kicker: 'Engagements GND',
      title: 'Propriété totale',
      price: 'Inclus',
      description:
        "Masters transmis, cession de droits claire, sources archivées trois ans. Tout vous appartient, sans verrou.",
      tags: ['Masters transmis', 'Cession claire', 'Archive 3 ans'],
    },
    stats: [
      { value: '100 %', label: 'propriétaire' },
      { value: '0', label: 'verrou' },
      { value: '3 ans', label: 'archive sources' },
    ],
  },
];

export function WhyGndAudiovisuelBlock() {
  return (
    <WhyGndBlock
      categories={AUDIOVISUEL_CATEGORIES}
      kickerLabel="Notre vision"
      kickerSubLabel="Audiovisuel"
      defaultActiveCat="01"
      hideCtas
    />
  );
}
