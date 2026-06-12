/* Navigation History API du site refonte (remplace le hash routing).
   navigate() pousse une vraie URL (/realisations, /services/audiovisuel…)
   et notifie le routeur via un événement custom — les composants peuvent
   donc naviguer sans dépendre de window.location.hash. */

export const NAV_EVENT = 'gnd:navigate';

export function navigate(path: string) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname === path) {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    return;
  }
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event(NAV_EVENT));
}
