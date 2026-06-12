/* Copie les snapshots SEO commités (prerendered/) dans dist/ après le
   build Vercel. Vercel sert les fichiers statiques AVANT le rewrite SPA
   (vercel.json) : les routes pré-rendues renvoient donc du vrai HTML aux
   crawlers, le JS de l'app reprend la main côté navigateur. */
import { cpSync, existsSync } from 'node:fs';

if (existsSync('prerendered')) {
  cpSync('prerendered', 'dist', { recursive: true });
  console.log('prerendered/ → dist/ copié');
} else {
  console.log('prerendered/ absent — snapshots SEO non déployés (lancer npm run prerender)');
}
