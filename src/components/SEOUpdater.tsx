import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateMetaTags, pageSEO } from '../utils/seo';

export function SEOUpdater() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      updateMetaTags(pageSEO.home);
    } else if (path.startsWith('/services/design')) {
      updateMetaTags(pageSEO.designService);
    } else if (path.startsWith('/services/motion-design')) {
      updateMetaTags(pageSEO.motionDesignService);
    } else if (path.startsWith('/services/production-audiovisuelle')) {
      updateMetaTags(pageSEO.productionService);
    } else if (path.startsWith('/services/photographie')) {
      updateMetaTags(pageSEO.photographyService);
    } else if (path.startsWith('/services/automatisation-ia')) {
      updateMetaTags(pageSEO.aiService);
    } else if (path.startsWith('/mentions-legales')) {
      updateMetaTags({ title: 'Mentions Légales | gndconsulting.fr', description: 'Mentions légales et informations légales de gndconsulting.fr.' });
    } else if (path.startsWith('/partenaires')) {
      updateMetaTags({ title: 'Partenaires | gndconsulting.fr', description: 'Nos partenaires et collaborations.' });
    } else {
      // Fallback
      updateMetaTags(pageSEO.home);
    }
  }, [location]);

  return null;
}


