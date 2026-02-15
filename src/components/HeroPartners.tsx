import React, { useEffect, useState } from 'react';
import { Users, Handshake, ArrowRight, Eye } from 'lucide-react';

interface HeroPartnersProps {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  media?: { video?: string; poster?: string };
  overlay?: string;
}

export function HeroPartners({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  media,
  overlay = "radial+linear"
}: HeroPartnersProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryCta = () => {
    if (primaryCta.href.startsWith('#')) {
      const element = document.querySelector(primaryCta.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = primaryCta.href;
    }
  };

  const handleSecondaryCta = () => {
    if (secondaryCta.href.startsWith('#')) {
      const element = document.querySelector(secondaryCta.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = secondaryCta.href;
    }
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {/* Video for desktop */}
        {media?.video && (
          <video
            className="hidden md:block w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={media.poster}
          >
            <source src={media.video} type="video/mp4" />
          </video>
        )}
        
        {/* Fallback image or mobile image */}
        <div 
          className={`${media?.video ? 'md:hidden' : ''} w-full h-full bg-gradient-to-br from-rose-100 via-pink-50 to-blue-100`}
          style={{
            backgroundImage: media?.poster ? `url(${media.poster})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Overlay for readability */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-blue-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-12 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className={`text-center lg:text-left transform transition-all duration-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {/* Chip */}
            <div className="inline-flex items-center gap-3 mb-8 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-slate-200/50">
              <Handshake className="w-5 h-5 text-primary" />
              <span className="text-slate-800 font-semibold uppercase tracking-wide text-sm">Nos Partenaires</span>
            </div>
            
            {/* Main title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              {title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 font-light mb-12 leading-relaxed max-w-prose">
              {subtitle}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button 
                onClick={handlePrimaryCta}
                className="inline-flex items-center gap-3 px-10 py-5 bg-rose-500 text-white font-bold text-lg rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <Users className="w-5 h-5" />
                {primaryCta.label}
              </button>
              
              <button 
                onClick={handleSecondaryCta}
                className="inline-flex items-center gap-3 px-10 py-5 border-2 border-white/80 text-white font-bold text-lg rounded-2xl transition-all duration-500 hover:bg-white/20 hover:border-white hover:scale-105 backdrop-blur-sm"
              >
                <Eye className="w-5 h-5" />
                {secondaryCta.label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}