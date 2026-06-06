/* GND Refonte, hash-based router (ported from prototype app.jsx).
   Mounted by App.tsx on the `refonte-site` branch. Live site (main) is untouched. */
import * as React from 'react';
import './refonte.css';
import { Header, Footer, CookieBanner } from './layout';
import { ImageMaskDefs } from '../components/ui/image-mask';
import { HomePage, ContactBlock } from './pages/home';
import { AgencePage } from './pages/agence';
import { ServicesHub } from './pages/services';
import { SitesVitrinesPage } from './pages/sites-vitrines';
import { BrandingPage, AudiovisuelPage, IAPage } from './pages/service-pages';
import { RealisationsPage, ProjectDetail } from './pages/realisations';
import { LegalPage, NotFoundPage } from './pages/legal';

function useRoute() {
  const get = () => {
    const h = window.location.hash.replace(/^#/, "") || "/";
    return h;
  };
  const [route, setRoute] = React.useState(get());
  React.useEffect(() => {
    const on = () => { setRoute(get()); window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

const ROUTE_LABELS: Record<string, string> = {
  "/": "Studio créatif humain × IA",
  "/agence": "L'Agence, Manifeste Humain × IA",
  "/services": "Services, Quatre branches, une équipe",
  "/services/sites-vitrines": "Sites & SEO, Sites vitrines clé en main",
  "/services/branding-identite": "Branding & Identité, Marque, logo, charte",
  "/services/audiovisuel": "Audiovisuel, Vidéo, motion, photo",
  "/services/automatisation-ia": "Automatisation & IA, Workflows & agents",
  "/realisations": "Réalisations",
  "/contact": "Contact",
  "/mentions-legales": "Mentions légales",
};

// Legacy URL aliases, keep old links working
const LEGACY_REDIRECTS: Record<string, string> = {
  "/services/design-identite-visuelle": "/services/branding-identite",
  "/services/motion-design": "/services/audiovisuel",
  "/services/production-audiovisuelle": "/services/audiovisuel",
  "/services/photographie": "/services/audiovisuel",
};

function RefonteApp() {
  const raw = useRoute();
  // Strip trailing legal anchor (e.g. /mentions-legales#cookies)
  const route = raw.split("#")[0];

  // Detect legacy redirects: /portfolio → /realisations + old service URLs → 4 branches
  React.useEffect(() => {
    if (route === "/portfolio") window.location.hash = "#/realisations";
    else if (LEGACY_REDIRECTS[route]) window.location.hash = "#" + LEGACY_REDIRECTS[route];
  }, [route]);

  React.useEffect(() => {
    const base = "GND Consulting";
    const sub = ROUTE_LABELS[route] || ROUTE_LABELS[route.split("/").slice(0, 3).join("/")];
    document.title = sub ? `${base}, ${sub}` : `${base}, Studio créatif humain × IA · Paris`;
  }, [route]);

  let page: React.ReactNode;
  if (route === "/" || route === "") page = <HomePage/>;
  else if (route === "/agence") page = <AgencePage/>;
  else if (route === "/services") page = <ServicesHub/>;
  else if (route === "/services/sites-vitrines") page = <SitesVitrinesPage/>;
  else if (route === "/services/branding-identite") page = <BrandingPage/>;
  else if (route === "/services/audiovisuel") page = <AudiovisuelPage/>;
  else if (route === "/services/automatisation-ia") page = <IAPage/>;
  // Legacy URLs handled by LEGACY_REDIRECTS effect above, fallback render = audiovisuel/branding
  else if (route === "/services/design-identite-visuelle") page = <BrandingPage/>;
  else if (route === "/services/motion-design"
        || route === "/services/production-audiovisuelle"
        || route === "/services/photographie") page = <AudiovisuelPage/>;
  else if (route === "/realisations") page = <RealisationsPage/>;
  else if (route.startsWith("/realisations/")) page = <ProjectDetail id={route.replace("/realisations/", "")}/>;
  else if (route === "/contact") page = <main id="main" className="pt-24 md:pt-28"><ContactBlock/></main>;
  else if (route === "/mentions-legales") page = <LegalPage/>;
  else page = <NotFoundPage/>;

  return (
    <>
      {/* Catalogue SVG <clipPath> globaux pour MaskedImage, mount-once,
          réutilisable sur n'importe quelle page via id `clip-pattern{0..8}` ou `clip-inverted`. */}
      <ImageMaskDefs />
      <Header route={route}/>
      <div key={route}>{page}</div>
      <Footer/>
      <CookieBanner/>
    </>
  );
}

export default RefonteApp;
