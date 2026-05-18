/* ============================================================
   BRANCHE `refonte-site` — App.tsx pointe sur la refonte CRÈME.
   Le site live (charte bleue) reste intact dans src/components/*
   et sera restauré ici uniquement au merge validé par Roodny.
   ============================================================ */
import React from 'react';
import RefonteApp from './refonte/RefonteApp';

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
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2A1810' }}>
            Une erreur est survenue
          </h1>
          <p style={{ color: '#7D3E2C', marginBottom: '2rem' }}>
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
              background: '#FF954F', color: '#2A1810', border: 'none',
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
      <RefonteApp />
    </ErrorBoundary>
  );
}

export default App;
