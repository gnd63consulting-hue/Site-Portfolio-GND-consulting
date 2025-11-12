import React from 'react';
import { Phone, Calendar, Images } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{ pointerEvents: 'none' }}>
      <div className="max-w-screen-sm mx-auto px-3 pb-3" style={{ pointerEvents: 'auto' }}>
        <div className="rounded-2xl shadow-2xl border border-blue-200/60 backdrop-blur-md"
             style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,249,255,0.95) 100%)' }}>
          <nav className="grid grid-cols-3 divide-x divide-blue-200/60">
            <a href="#contact" onClick={() => trackEvent('cta_click', { location: 'sticky-contact' })} className="flex flex-col items-center justify-center py-3 text-slate-900 hover:text-blue-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/40">
              <Phone className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wide">Contact</span>
            </a>
            <a href="#realisations" onClick={() => trackEvent('cta_click', { location: 'sticky-portfolio' })} className="flex flex-col items-center justify-center py-3 text-slate-900 hover:text-blue-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/40">
              <Images className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wide">Portfolio</span>
            </a>
            <a href="#contact" onClick={() => trackEvent('cta_click', { location: 'sticky-book' })} className="flex flex-col items-center justify-center py-3 text-slate-900 hover:text-blue-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/40">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wide">Réserver</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
