import React from 'react';
import { Phone, Calendar, Images } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pointer-events-none">
      <div className="max-w-screen-sm mx-auto px-3 pb-3 pointer-events-auto">
        <div className="glass-nav rounded-2xl shadow-2xl">
          <nav className="grid grid-cols-3 divide-x divide-gray-200/60">
            <a href="#contact" onClick={() => trackEvent('cta_click', { location: 'sticky-contact' })} className="flex flex-col items-center justify-center py-3 text-black hover:text-gray-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-black/20">
              <Phone className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wide">Contact</span>
            </a>
            <a href="#realisations" onClick={() => trackEvent('cta_click', { location: 'sticky-portfolio' })} className="flex flex-col items-center justify-center py-3 text-black hover:text-gray-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-black/20">
              <Images className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wide">Portfolio</span>
            </a>
            <a href="#contact" onClick={() => trackEvent('cta_click', { location: 'sticky-book' })} className="flex flex-col items-center justify-center py-3 text-black hover:text-gray-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-black/20">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wide">Réserver</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
