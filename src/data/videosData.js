/**
 * Données des vidéos du Portfolio GND Consulting
 * Extrait de src/components/Portfolio.tsx
 * 
 * Structure pour chaque vidéo :
 * - id: identifiant unique
 * - title: titre de la vidéo
 * - description: description complète avec crédits
 * - videoSource: "youtube" ou "supabase"
 * - videoUrl: URL complète de la vidéo
 * - thumbnailUrl: URL de la miniature
 * - credits: crédits de réalisation
 * - tags: tags/catégories
 * 
 * Note: Les vidéos cachées (hiddenVideoIds) ne sont pas incluses :
 * - live-leyel-papa
 * - live-eleonore-surprising
 */

export const videosData = [
  {
    id: 'esther-seems-bobine',
    title: 'ESTHER SEEMS – BOBINE',
    shortTitle: 'ESTHER SEEMS',
    description: '« Clip musical de l\'artiste Esther Seems, porté par une esthétique hip-hop/R&B sobre et émotive.\n\nCe projet rend hommage à son meilleur ami tragiquement disparu, transformant la douleur en une œuvre à la fois intime et universelle.\n\nRéalisé en collaboration avec AMS Visions, ce clip illustre la capacité de la création audiovisuelle à mêler émotion brute et expression artistique. »',
    videoSource: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=6oaO6YoWjyQ',
    thumbnailUrl: 'https://img.youtube.com/vi/6oaO6YoWjyQ/maxresdefault.jpg', // Première frame haute qualité
    credits: '🎬 Réalisation : Jonathan Ransau',
    tags: ['YouTube', 'Production audiovisuelle', 'GND Consulting']
  },
  {
    id: 'leyel-miel',
    title: 'LEYEL – MIEL',
    description: '« Clip officiel de l\'artiste Leyel, une mise en scène délicate qui raconte la rencontre de deux âmes destinées à s\'unir.\n\nEntre sonorités douces, guitare et ambiance intimiste, ce projet illustre la force de la variété française à travers une réalisation visuelle soignée.\n\nConçu dans le cadre d\'une collaboration avec O2M, ce clip marque une étape importante dans un savoir-faire qui se poursuit et s\'affirme aujourd\'hui au sein de GND Consulting. »',
    videoSource: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=UbXQim7iNLI',
    thumbnailUrl: 'https://img.youtube.com/vi/UbXQim7iNLI/maxresdefault.jpg', // Première frame haute qualité
    credits: '🎬 Réalisation : Jonathan Ransau',
    tags: ['YouTube', 'Production audiovisuelle', 'GND Consulting']
  },
  {
    id: 'trinity-rebel-univers-officiel',
    title: 'TRINITY REBEL FT DAFXCX – L\'UNIVERS OFFICIEL',
    description: '« Clip musical officiel de Trinity Rebel ft Dafxcx, aux sonorités chaleureuses et festives, inspirées des rythmes urbains et caribéens.\n\nUne réalisation qui capte l\'énergie décontractée et positive de l\'artiste, entre univers coloré et ambiance conviviale. »',
    videoSource: 'supabase',
    videoUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/trinity_rebel_univers_officiel.mp4',
    thumbnailUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
    credits: '🎬 Réalisation : Julien Ancieaux',
    tags: ['Motion Design', 'Production audiovisuelle', 'GND Consulting']
  },
  {
    id: 'sabay-festival-2023',
    title: 'SABAY FESTIVAL 2023',
    description: '« Captation et réalisation de l\'aftermovie officiel du Sabay Festival 2023, un rendez-vous annuel devenu incontournable à la Grande Pagode de Vincennes.\n\nCette édition a célébré la richesse des traditions cambodgiennes à travers des rituels, des spectacles vivants et des animations culturelles accessibles à tous.\n\nNotre équipe a mis en lumière l\'énergie collective, l\'esprit solidaire et les instants mémorables qui font du Sabay Festival un moment unique de transmission et de convivialité. »',
    videoSource: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=Vyhz7_D4fFU',
    thumbnailUrl: 'https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg', // Première frame disponible
    credits: '📹 Production audiovisuelle – GND Consulting',
    tags: ['YouTube', 'Production audiovisuelle', 'GND Consulting']
  },
  {
    id: 'concert-ali',
    title: 'CAPTATION LIVE CONCERT ALI 45 SCIENTIFIC',
    description: '« Captation live du concert d\'Ali, figure emblématique du rap français et cofondateur du collectif 45 Scientific aux côtés de Booba.\n\nCe live, enregistré au Café LaPêche à Montreuil, met en valeur la puissance scénique de l\'artiste dans un cadre urbain et authentique.\n\nRéalisé à l\'époque dans le cadre de la collaboration IAMTV / O2M, ce projet s\'inscrit aujourd\'hui dans la continuité de GND Consulting, qui poursuit et développe ce savoir-faire pour documenter et sublimer des moments uniques. »',
    videoSource: 'supabase',
    videoUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Concert%20Ali.mp4',
    thumbnailUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
    credits: '📹 Captation audiovisuelle – IAMTV / O2M / GND Consulting',
    tags: ['Supabase', 'Production audiovisuelle', 'GND Consulting']
  },
  {
    id: 'sabay-festival-2022',
    title: 'SABAY FESTIVAL 2022',
    description: '« Captation et réalisation de l\'aftermovie officiel du Sabay Festival 2022, un rendez-vous annuel devenu incontournable à la Grande Pagode de Vincennes.\n\nCette édition a célébré la richesse des traditions cambodgiennes à travers des rituels, des spectacles vivants et des animations culturelles accessibles à tous.\n\nNotre équipe a mis en lumière l\'énergie collective, l\'esprit solidaire et les instants mémorables qui font du Sabay Festival un moment unique de transmission et de convivialité. »',
    videoSource: 'supabase',
    videoUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Thiek%20au%20Sabay%20Festival%202022%20Haute%20def%204k%20v2.mp4',
    thumbnailUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
    credits: '📹 Production audiovisuelle – GND Consulting',
    tags: ['Supabase', 'Production audiovisuelle', 'GND Consulting']
  },
  {
    id: 'cook-soul-kaoutar',
    title: 'COOK & SOUL AVEC KAOUTAR DE PÉKIN EXPRESS, ÉDITION 14',
    description: '« Émission musicale produite initialement pour IAMTV, dans le cadre de la collaboration avec l\'équipe O2M.\n\nCe projet audiovisuel met en lumière l\'univers artistique de l\'invité, avec une captation authentique et soignée, fidèle à l\'esprit des créations de cette époque.\n\nAujourd\'hui, ce savoir-faire continue d\'être valorisé et développé au sein de GND Consulting, en prolongeant l\'héritage de ces réalisations collectives. »',
    videoSource: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=galhl8_dYyk',
    thumbnailUrl: 'https://img.youtube.com/vi/galhl8_dYyk/hqdefault.jpg',
    credits: '🎬 Réalisation : Gwen Templier',
    tags: ['YouTube', 'Production audiovisuelle', 'GND Consulting']
  },
  {
    id: 'portfolio-jyfviku',
    title: 'YUNGCALLY – CLIP OFFICIEL',
    description: '« Clip officiel de Yungcally, jeune artiste franco-américain à l\'univers situé entre hip-hop et sonorités urbaines modernes.\n\nAvec une énergie qui évoque la vibe de Wiz Khalifa et Post Malone, ce projet traduit un mélange de nonchalance assumée et de créativité visuelle affirmée.\n\nUn travail qui illustre l\'ouverture internationale et la diversité des projets portés par notre équipe. »',
    videoSource: 'supabase',
    videoUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/jyfviku.mp4',
    thumbnailUrl: 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/gnd-cover.png',
    credits: '🎬 Réalisation : Jonathan Ransau',
    tags: ['Supabase', 'Production audiovisuelle', 'GND Consulting']
  },
  {
    id: 'lanecdote',
    title: 'L\'ANECDOTE',
    description: '« Émission l\'Anecdote, un format original mêlant interviews et moments de partage.\n\nUn projet qui illustre la capacité de GND Consulting à concevoir des contenus audiovisuels engageants et authentiques. »',
    videoSource: 'youtube',
    videoUrl: 'https://www.youtube.com/watch?v=AGC_2cFHE_0',
    thumbnailUrl: 'https://img.youtube.com/vi/AGC_2cFHE_0/maxresdefault.jpg',
    credits: '🎬 Réalisation : GND Consulting',
    tags: ['YouTube', 'Production audiovisuelle', 'GND Consulting']
  }
];

// Statistiques des vidéos
export const videoStats = {
  total: videosData.length,
  youtube: videosData.filter(video => video.videoSource === 'youtube').length,
  supabase: videosData.filter(video => video.videoSource === 'supabase').length,
  tags: {
    'YouTube': videosData.filter(video => video.tags.includes('YouTube')).length,
    'Supabase': videosData.filter(video => video.tags.includes('Supabase')).length,
    'Motion Design': videosData.filter(video => video.tags.includes('Motion Design')).length,
    'Production audiovisuelle': videosData.filter(video => video.tags.includes('Production audiovisuelle')).length,
    'GND Consulting': videosData.filter(video => video.tags.includes('GND Consulting')).length
  }
};