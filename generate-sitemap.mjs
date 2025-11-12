import { writeFileSync } from 'node:fs';

const baseUrl = process.env.SITE_URL || 'https://gndconsulting.fr';
const today = new Date().toISOString().split('T')[0];

// Static routes (extend if more pages)
const routes = [
  '/',
  '/mentions-legales',
  '/services/design-identite-visuelle',
  '/services/motion-design',
  '/services/production-audiovisuelle',
  '/services/photographie',
  '/services/automatisation-ia',
  '/partenaires'
];

const urls = routes.map((path) => `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>\n`;

writeFileSync('./public/sitemap.xml', xml, 'utf8');
console.log('sitemap.xml generated at public/sitemap.xml');


