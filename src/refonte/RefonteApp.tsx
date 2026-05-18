/* GND Refonte — hash-based router (ported from prototype app.jsx).
   Mounted by App.tsx on the `refonte-site` branch. Live site (main) is untouched. */
import * as React from 'react';
import './refonte.css';
import { Header, Footer, CookieBanner } from './layout';
import { HomePage } from './pages/home';
import { AgencePage } from './pages/agence';
import { ServicesHub } from './pages/services';
import { SitesVitrinesPage } from './pages/sites-vitrines';
import { DesignPage, MotionPage, ProductionPage, PhotoPage, IAPage } from './pages/service-pages';
import { RealisationsPage, ProjectDetail } from './pages/realisations';
import { ContactPage } from './pages/contact';
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
  "/agence": "L'Agence — Manifeste Humain × IA",
  "/services": "Services — Six métiers, une équipe",
  "/services/sites-vitrines": "Sites Vitrines — Clé en main",
  "/services/design-identite-visuelle": "Design & Identité Visuelle",
  "/services/motion-design": "Motion Design",
  "/services/production-audiovisuelle": "Production Audiovisuelle",
  "/services/photographie": "Photographie Professionnelle",
  "/services/automatisation-ia": "Automatisation & IA",
  "/realisations": "Réalisations",
  "/contact": "Contact",
  "/mentions-legales": "Mentions légales",
};

function RefonteApp() {
  const raw = useRoute();
  // Strip trailing legal anchor (e.g. /mentions-legales#cookies)
  const route = raw.split("#")[0];

  // Detect legacy redirect: /portfolio → /realisations
  React.useEffect(() => {
    if (route === "/portfolio") window.location.hash = "#/realisations";
  }, [route]);

  React.useEffect(() => {
    const base = "GND Consulting";
    const sub = ROUTE_LABELS[route] || ROUTE_LABELS[route.split("/").slice(0, 3).join("/")];
    document.title = sub ? `${base} — ${sub}` : `${base} — Studio créatif humain × IA · Paris`;
  }, [route]);

  let page: React.ReactNode;
  if (route === "/" || route === "") page = <HomePage/>;
  else if (route === "/agence") page = <AgencePage/>;
  else if (route === "/services") page = <ServicesHub/>;
  else if (route === "/services/sites-vitrines") page = <SitesVitrinesPage/>;
  else if (route === "/services/design-identite-visuelle") page = <DesignPage/>;
  else if (route === "/services/motion-design") page = <MotionPage/>;
  else if (route === "/services/production-audiovisuelle") page = <ProductionPage/>;
  else if (route === "/services/photographie") page = <PhotoPage/>;
  else if (route === "/services/automatisation-ia") page = <IAPage/>;
  else if (route === "/realisations") page = <RealisationsPage/>;
  else if (route.startsWith("/realisations/")) page = <ProjectDetail id={route.replace("/realisations/", "")}/>;
  else if (route === "/contact") page = <ContactPage/>;
  else if (route === "/mentions-legales") page = <LegalPage/>;
  else page = <NotFoundPage/>;

  return (
    <>
      <Header route={route}/>
      <div key={route}>{page}</div>
      <Footer/>
      <CookieBanner/>
    </>
  );
}

export default RefonteApp;
