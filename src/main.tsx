import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Remove initial loader once React mounts
const rootEl = document.getElementById('root')!;
const loader = document.getElementById('initial-loader');
if (loader) loader.remove();

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Stitch reveal animation — IntersectionObserver
if (typeof window !== 'undefined') {
  const initReveal = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Re-observe on route changes (SPA)
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    });
    mutationObserver.observe(document.getElementById('root')!, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    requestAnimationFrame(initReveal);
  }
}

// Unregister all Service Workers (SW is disabled)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(r => r.unregister());
  });
}
