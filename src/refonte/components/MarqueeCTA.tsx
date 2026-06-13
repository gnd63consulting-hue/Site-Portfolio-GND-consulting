/* MarqueeCTA, bandeau call-to-action infini partagé home + sites-vitrines.
 * Anim CSS marquee 40s linear infinite (cf refonte.css).
 */
import * as React from 'react';

const DEFAULT_ITEMS = [
  'Démarrer un projet',
  'Devis sous 48h',
  'Audit offert',
  'Échangeons sur votre projet',
  'Boostez votre présence digitale',
  'Faisons décoller votre marque',
  'Activez votre transformation IA',
  'Concrétisons vos ambitions',
];

type MarqueeCTAProps = {
  items?: string[];
  className?: string;
};

export function MarqueeCTA({ items = DEFAULT_ITEMS, className = '' }: MarqueeCTAProps) {
  const row = [...items, ...items];
  // Fondu progressif aux deux bords : le texte qui défile s'estompe au lieu
  // d'être tranché net (sinon, sur mobile, le mot coupé à droite lit comme
  // un bug d'affichage). Marge de fondu plus courte sur petit écran.
  const edgeFade =
    'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)';
  return (
    <div
      className={`bg-bg-alt text-text-strong overflow-hidden py-7 border-y border-text-strong/10 ${className}`}
      style={{ WebkitMaskImage: edgeFade, maskImage: edgeFade }}
    >
      <div className="flex gap-8 md:gap-12 marquee-track whitespace-nowrap">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-12 shrink-0">
            <span className="display text-2xl md:text-5xl text-text-strong/95">{t}</span>
            <span className="text-accent text-2xl md:text-3xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
