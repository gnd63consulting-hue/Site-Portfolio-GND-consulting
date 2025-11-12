import { useEffect } from 'react';

export function useScrollToAnchor(offsetById: Record<string, number> = {}, defaultOffset = 100) {
  useEffect(() => {
    const handle = () => {
      if (window.location.hash) {
        const id = window.location.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const offset = offsetById[id] ?? defaultOffset;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const top = Math.max(0, elementPosition - offset);
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    };

    // Initial navigation and subsequent hash changes
    const onHashChange = () => setTimeout(handle, 50);
    window.addEventListener('hashchange', onHashChange);
    // Run once on mount for direct deep-links
    setTimeout(handle, 150);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, [defaultOffset, offsetById]);
}


