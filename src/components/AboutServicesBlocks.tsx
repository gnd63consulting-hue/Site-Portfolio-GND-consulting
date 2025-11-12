import React from 'react';
import { Users, Target, Brain } from 'lucide-react';

export function AboutServicesBlocks({ isVisible }: { isVisible: boolean }) {
  // Images spécifiques et UNIQUES pour chaque section - RESTAURÉES À L'ORIGINAL
  const images = {
    studio: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png", // Photo d'équipe collaborative
    expertise: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20251006_2055_Espace%20Travail%20Futuriste_simple_compose_01k6xdztmrewrv8rq637vqqpnp.png", // Réunion stratégique
    innovation: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250925_0058_Espace%20Collaboratif%20Futuriste_simple_compose_01k5yz5snhfbsaage8pcpcxk8q.png" // Scène innovation/IA
  };
  
  // Images de backup spécifiques
  const backupImages = {
    studio: "/20250923_1821_Vibrant Design Collaboration_simple_compose_01k5vnxw55e4evcwhnpmf5f7eb.png",
    expertise: "/20250923_2220_Agence Créative Design_simple_compose_01k5w3m9gte9jswy2ws0804ffe copy.png",
    innovation: "/20250915_0414_Futuristic Miniature Film Set_remix_01k55j9a80e989ej6vnkz68jjz copy.png"
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, backupSrc: string) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== backupSrc) {
      target.src = backupSrc;
    }
  };

  return (
    <div className="about-services-grid">
      <div className="feature-timeline-wrapper">
        <div className="feature-timeline-line" />
      </div>

      {/* SECTION 1 - Studio Créatif - Layout standard */}
      <div className="feature-node">
        <div className="feature-node-dot" />
        <div className={`service-feature-card transform transition-all duration-1000 delay-200 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}>
        <div className="feature-image">
          <img
            src={images.studio}
            alt="Studio créatif GND Consulting - Équipe collaborative"
            loading="lazy"
            decoding="async"
            onError={(e) => handleImageError(e, backupImages.studio)}
          />
        </div>
        
        <div className="feature-content">
          <div className="feature-header">
            <div className="feature-icon">
              <Users className="w-8 h-8" />
            </div>
            <span className="feature-eyebrow">Studio Créatif</span>
          </div>
          <h3 className="feature-title">Studio Créatif</h3>
          <p className="feature-description">
            Chez GND Consulting, nous croyons que chaque projet est une opportunité de créer quelque chose d'unique et de mémorable. Notre équipe de créatifs passionnés travaille main dans la main avec nos techniciens experts pour donner vie à vos idées les plus audacieuses.
          </p>
          <div className="feature-tags">
            <span>Production audiovisuelle</span>
            <span>Design créatif</span>
            <span>Collaboration</span>
          </div>
        </div>
      </div>
      </div>

      {/* SECTION 2 - Expertise Globale - Layout inversé */}
      <div className="feature-node">
        <div className="feature-node-dot" />
        <div className={`service-feature-card reverse transform transition-all duration-1000 delay-300 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}>
        <div className="feature-content">
          <div className="feature-header">
            <div className="feature-icon">
              <Target className="w-8 h-8" />
            </div>
            <span className="feature-eyebrow">Expertise Globale</span>
          </div>
          <h3 className="feature-title">Expertise Globale</h3>
          <p className="feature-description">
            Notre approche holistique couvre tous les aspects de votre projet, de la conception initiale à la livraison finale. Nous combinons expertise technique et vision stratégique pour garantir des résultats qui dépassent vos attentes et marquent durablement votre audience.
          </p>
          <div className="feature-tags">
            <span>Stratégie</span>
            <span>Technique</span>
            <span>Excellence</span>
          </div>
        </div>
        
        <div className="feature-image">
          <img
            src={images.expertise}
            alt="Expertise technique et stratégique de GND Consulting"
            loading="lazy"
            decoding="async"
            onError={(e) => handleImageError(e, backupImages.expertise)}
          />
        </div>
      </div>
      </div>

      {/* SECTION 3 - Innovation IA - Design pleine largeur avec overlay */}
      <div className="feature-node">
        <div className="feature-node-dot" />
        <div className={`service-feature-card fullwidth-overlay transform transition-all duration-1000 delay-400 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}>
        <div className="feature-image-fullwidth">
          <img
            src={images.innovation}
            alt="Innovation IA et automatisation chez GND Consulting"
            loading="lazy"
            decoding="async"
            onError={(e) => handleImageError(e, backupImages.innovation)}
          />
        </div>
        
        <div className="image-overlay-dark"></div>
        
        <div className="feature-content-overlay">
          <div className="feature-header overlay">
            <div className="feature-icon">
              <Brain className="w-8 h-8" />
            </div>
            <span className="feature-eyebrow overlay">Innovation IA</span>
          </div>
          <h3 className="feature-title">Innovation IA</h3>
          <p className="feature-description">
            Animé par une vision prospective, GND Consulting reste en veille permanente des nouvelles tendances et technologies émergentes, notamment l'intelligence artificielle, pour propulser les projets de ses clients vers de nouveaux horizons.
          </p>
          <div className="feature-tags">
            <span>Intelligence Artificielle</span>
            <span>Automatisation</span>
            <span>Innovation</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
