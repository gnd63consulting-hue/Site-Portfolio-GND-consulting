import React from 'react';
import { Users, Target, Brain } from 'lucide-react';

export function AboutServicesBlocks({ isVisible }: { isVisible: boolean }) {
  const images = {
    studio: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png",
    expertise: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20251006_2055_Espace%20Travail%20Futuriste_simple_compose_01k6xdztmrewrv8rq637vqqpnp.png",
    innovation: "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20251006_2055_Espace%20Travail%20Futuriste_simple_compose_01k6xdztmrewrv8rq637vqqpnp.png"
  };

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

  const blocks = [
    {
      icon: Users,
      title: 'Studio Créatif',
      description: "Chez GND Consulting, nous croyons que chaque projet est une opportunité de créer quelque chose d'unique et de mémorable. Notre équipe de créatifs passionnés travaille main dans la main avec nos techniciens experts pour donner vie à vos idées les plus audacieuses.",
      tags: ['Production audiovisuelle', 'Design créatif', 'Collaboration'],
      image: images.studio,
      backup: backupImages.studio,
      alt: 'Studio créatif GND Consulting - Équipe collaborative',
    },
    {
      icon: Target,
      title: 'Expertise Globale',
      description: "Notre approche holistique couvre tous les aspects de votre projet, de la conception initiale à la livraison finale. Nous combinons expertise technique et vision stratégique pour garantir des résultats qui dépassent vos attentes et marquent durablement votre audience.",
      tags: ['Stratégie', 'Technique', 'Excellence'],
      image: images.expertise,
      backup: backupImages.expertise,
      alt: 'Expertise technique et stratégique de GND Consulting',
    },
    {
      icon: Brain,
      title: 'Innovation IA',
      description: "Animé par une vision prospective, GND Consulting reste en veille permanente des nouvelles tendances et technologies émergentes, notamment l'intelligence artificielle, pour propulser les projets de ses clients vers de nouveaux horizons.",
      tags: ['Intelligence Artificielle', 'Automatisation', 'Innovation'],
      image: images.innovation,
      backup: backupImages.innovation,
      alt: 'Innovation IA et automatisation chez GND Consulting',
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12 space-y-20">
      {blocks.map((block, index) => {
        const Icon = block.icon;
        const isReversed = index % 2 === 1;

        return (
          <div
            key={block.title}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${200 + index * 150}ms` }}
          >
            {/* Image */}
            <div className={`${isReversed ? 'lg:order-2' : ''}`}>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={block.image}
                  alt={block.alt}
                  className="w-full max-h-[400px] object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => handleImageError(e, block.backup)}
                />
              </div>
            </div>

            {/* Content */}
            <div className={`${isReversed ? 'lg:order-1' : ''}`}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-[#1A1A1A] tracking-tight">
                  {block.title}
                </h3>
              </div>

              <p className="text-base lg:text-lg text-[#64748B] leading-relaxed mb-6">
                {block.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {block.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium text-[#1A1A1A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
