/* GND Refonte — routeur History API (vraies URLs, indexables).
   12/06/26 : migration depuis le hash routing (#/...) — chaque page a
   désormais une URL propre servie par le rewrite SPA Vercel + snapshots
   pré-rendus (scripts/prerender.mjs) pour les crawlers. Les anciennes
   URLs #/... sont migrées au boot (replaceState). */
import * as React from 'react';
import './refonte.css';
import { navigate, NAV_EVENT } from './nav';
import { applyRouteSeo } from './seo';
import { Header, Footer, CookieBanner } from './layout';
import { ImageMaskDefs } from '../components/ui/image-mask';
import { HomePage, ContactBlock } from './pages/home';
import { AgencePage } from './pages/agence';
import { SitesVitrinesPage } from './pages/sites-vitrines';
import { BrandingPage, AudiovisuelPage, IAPage } from './pages/service-pages';
import { RealisationsPage, ProjectDetail } from './pages/realisations';
import { GuidesIndex, GuidePage } from './pages/guides';
import { LegalPage, NotFoundPage } from './pages/legal';

function useRoute() {
  const get = () => {
    let p = window.location.pathname.replace(/\/{2,}/g, "/");
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p || "/";
  };
  const [route, setRoute] = React.useState(() => {
    // Migration des anciennes URLs hash (#/realisations → /realisations)
    if (window.location.hash.startsWith("#/")) {
      window.history.replaceState({}, "", window.location.hash.slice(1));
    }
    return get();
  });
  React.useEffect(() => {
    // Navigation interne (clic) : nouvelle route + retour en haut de page.
    const onNav = () => { setRoute(get()); window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); };
    // Back/forward navigateur : nouvelle route, scroll restauré par le navigateur.
    const onPop = () => setRoute(get());
    window.addEventListener(NAV_EVENT, onNav);
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener(NAV_EVENT, onNav);
      window.removeEventListener("popstate", onPop);
    };
  }, []);
  return route;
}

// Legacy URL aliases, keep old links working
const LEGACY_REDIRECTS: Record<string, string> = {
  // Page hub /services supprimée (12/06/26) : services détaillés sur
  // accueil/agence + 4 sous-pages dédiées. Redirige vers l'accueil.
  "/services": "/",
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
    if (route === "/portfolio") navigate("/realisations");
    else if (LEGACY_REDIRECTS[route]) navigate(LEGACY_REDIRECTS[route]);
  }, [route]);

  // Interception des clics sur liens internes (href="/...") : navigation
  // History API sans rechargement. Les ancres pures (#contact), liens
  // externes, target=_blank et clics modifiés gardent le comportement natif.
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('/') && !href.startsWith('//')) { e.preventDefault(); navigate(href); }
      else if (href.startsWith('#/')) { e.preventDefault(); navigate(href.slice(1)); }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // SEO par page : titre, description, canonical, Open Graph, Twitter +
  // données structurées WebPage / fil d'Ariane. 100 % <head>, invisible.
  React.useEffect(() => {
    applyRouteSeo(route);
  }, [route]);

  // Analytics consent-gated : ne charge GA4 que si le visiteur a accepté
  // (gnd-cookie-consent) ET que VITE_GA_MEASUREMENT_ID est défini.
  React.useEffect(() => {
    import('../utils/analytics').then(({ initAnalytics }) =>
      initAnalytics((import.meta as any).env?.VITE_GA_MEASUREMENT_ID)
    );
  }, []);

  let page: React.ReactNode;
  if (route === "/" || route === "") page = <HomePage/>;
  // Hub /services supprimé : rend l'accueil pendant que le redirect joue
  // (évite un flash 404 d'une frame).
  else if (route === "/services") page = <HomePage/>;
  else if (route === "/agence") page = <AgencePage/>;
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
  else if (route === "/guides") page = <GuidesIndex/>;
  else if (route.startsWith("/guides/")) page = <GuidePage slug={route.replace("/guides/", "")}/>;
  else if (route === "/contact") page = <main id="main" className="pt-24 md:pt-28"><h1 className="sr-only">Contact — GND Consulting, studio créatif humain × IA à Paris : devis sous 48h</h1><ContactBlock/></main>;
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
