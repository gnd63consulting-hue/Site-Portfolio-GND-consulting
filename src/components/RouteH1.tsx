import { useLocation } from 'react-router-dom';

export function RouteH1() {
  const { pathname } = useLocation();
  let text = 'GND Consulting';
  if (pathname.startsWith('/services/design')) text = 'Design & Identité Visuelle';
  else if (pathname.startsWith('/services/motion-design')) text = 'Motion Design';
  else if (pathname.startsWith('/services/production-audiovisuelle')) text = 'Production Audiovisuelle';
  else if (pathname.startsWith('/services/photographie')) text = 'Photographie';
  else if (pathname.startsWith('/services/automatisation-ia')) text = 'Automatisation & IA';
  else if (pathname.startsWith('/mentions-legales')) text = 'Mentions légales';
  else if (pathname.startsWith('/partenaires')) text = 'Partenaires';

  return (
    <h1 className="sr-only">{text}</h1>
  );
}


