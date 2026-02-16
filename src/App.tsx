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

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[GND] Render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1A1A1A' }}>
            Une erreur est survenue
          </h1>
          <p style={{ color: '#64748B', marginBottom: '2rem' }}>
            Veuillez rafraîchir la page. Si le problème persiste, videz le cache de votre navigateur.
          </p>
          <button
            onClick={() => {
              if ('caches' in window) {
                caches.keys().then(names => names.forEach(name => caches.delete(name)));
              }
              window.location.reload();
            }}
            style={{
              background: '#1A1A1A', color: '#fff', border: 'none',
              padding: '12px 32px', borderRadius: '9999px', cursor: 'pointer',
              fontSize: '0.875rem', fontWeight: 500
            }}
          >
            Rafraîchir la page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
