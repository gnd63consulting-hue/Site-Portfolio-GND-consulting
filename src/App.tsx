import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import About from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SEOUpdater } from './components/SEOUpdater';
import { StructuredData } from './components/StructuredData';
import { RouteH1 } from './components/RouteH1';
import { ServiceDesign } from './components/ServiceDesign';
import { ServiceMotionDesign } from './components/ServiceMotionDesign';
import { ServiceProductionAudiovisuelle } from './components/ServiceProductionAudiovisuelle';
import { ServicePhotographie } from './components/ServicePhotographie';
import { ServiceAutomatisationIA } from './components/ServiceAutomatisationIA';
import { PortfolioPage } from './components/PortfolioPage';
import { PartnersPage } from './components/PartnersPage';
import { MentionsLegales } from './components/MentionsLegales';
import { CookieConsent } from './components/CookieConsent';
import { BackToTop } from './components/BackToTop';
import { StickyCTA } from './components/StickyCTA';

function App() {
  return (
    <Router>
      <div className="App">
        <SEOUpdater />
        <StructuredData />
        <RouteH1 />
        <CookieConsent />
        
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <About />
              <Services />
              <Portfolio />
              <Contact />
              <Footer />
              <StickyCTA />
              <BackToTop />
            </>
          } />
          
          {/* Pages de services */}
          <Route path="/services/design-identite-visuelle" element={
            <>
              <Header />
              <ServiceDesign />
              <Footer />
              <BackToTop />
            </>
          } />
          
          <Route path="/services/motion-design" element={
            <>
              <Header />
              <ServiceMotionDesign />
              <Footer />
              <BackToTop />
            </>
          } />
          
          <Route path="/services/production-audiovisuelle" element={
            <>
              <Header />
              <ServiceProductionAudiovisuelle />
              <Footer />
              <BackToTop />
            </>
          } />
          
          <Route path="/services/photographie" element={
            <>
              <Header />
              <ServicePhotographie />
              <Footer />
              <BackToTop />
            </>
          } />
          
          <Route path="/services/automatisation-ia" element={
            <>
              <Header />
              <ServiceAutomatisationIA />
              <Footer />
              <BackToTop />
            </>
          } />
          
          {/* Page portfolio */}
          <Route path="/portfolio" element={
            <>
              <Header />
              <PortfolioPage />
              <Footer />
              <BackToTop />
            </>
          } />

          {/* Page partenaires */}
          <Route path="/partenaires" element={<PartnersPage />} />
          
          {/* Mentions légales */}
          <Route path="/mentions-legales" element={
            <>
              <Header />
              <MentionsLegales />
              <Footer />
              <BackToTop />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
