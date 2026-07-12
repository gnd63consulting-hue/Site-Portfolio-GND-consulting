/* Photos portfolio hébergées DANS le repo (12/07/26).
   Contexte : le projet Supabase `gublhtivvydkuooooffg` (storage des photos et
   vidéos du site) a disparu (DNS NXDOMAIN, projet free tier supprimé ou purgé)
   → toutes les images du site étaient cassées en prod. Les originaux ont été
   récupérés sur le disque externe « Sitegnd contenus » et recompressés en
   WebP 1600px dans public/portfolio/. Le site vitrine ne dépend plus d'aucun
   service externe pour ses images (règle de l'audit du 17/05/26).
   ⚠️ gnd-cover.png : original perdu avec le projet Supabase, remplacé
   provisoirement par le poster hero. Vidéos portfolio-videos/ : perdues aussi,
   entrées vidéo désactivées en attendant un re-hébergement. */
export const PORTFOLIO_PHOTOS: Record<string, string> = {
  '6F0A1817.JPG': '/portfolio/6f0a1817.webp',
  '6F0A1873 - copie 2_1.jpg': '/portfolio/6f0a1873-2.webp',
  '6F0A1873%20-%20copie%202_1.jpg': '/portfolio/6f0a1873-2.webp',
  '6F0A2054.JPG': '/portfolio/6f0a2054.webp',
  '6F0A3992.jpg': '/portfolio/6f0a3992.webp',
  '6F0A4002.JPG': '/portfolio/6f0a4002.webp',
  '6F0A4028.jpg': '/portfolio/6f0a4028.webp',
  '6F0A4135.jpg': '/portfolio/6f0a4135.webp',
  '6F0A4149.jpg': '/portfolio/6f0a4149.webp',
  '6F0A4251.jpg': '/portfolio/6f0a4251.webp',
  '6F0A4267.jpg': '/portfolio/6f0a4267.webp',
  'gnd-cover.png': '/assets/hero1-poster.webp',
};

export const photo = (f: string): string => PORTFOLIO_PHOTOS[f] ?? `/portfolio/${f}`;
