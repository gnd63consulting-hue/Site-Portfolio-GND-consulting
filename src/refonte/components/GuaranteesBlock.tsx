/* GuaranteesBlock, 3 garanties GND avec gradient skewed cards (21st.dev pattern) */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Section, Container, Kicker } from '../ui';
import { GradientCardShowcase, type GradientCard } from '@/components/ui/gradient-card-showcase';

gsap.registerPlugin(ScrollTrigger);

// 3 gradients warm GND différenciants (match original variation 21st.dev) :
// Card 1 : SOLAIRE, orange clair → orange deep (lumière forte)
// Card 2 : TWILIGHT, orange → walnut deep (transition jour/nuit)
// Card 3 : CREAM-CHOCO, cream warm → chocolate (pastel chaud)
const GUARANTEES: readonly GradientCard[] = [
  {
    id: 'maquette',
    icon: 'Sparkles',
    kicker: 'GARANTIE',
    title: 'Garantie maquette',
    sub: '3 ITÉRATIONS INCLUSES',
    body: "Vous validez le design avant la mise en ligne. 3 rounds de retours compris dans le tarif. Si on n'y arrive pas, on rembourse.",
    cta: 'Voir le devis-type',
    ctaHref: '/contact',
    gradientFrom: '#FFB582',
    gradientTo: '#FF954F',
  },
  {
    id: 'seo',
    icon: 'Globe',
    kicker: 'GARANTIE',
    title: 'Garantie SEO local',
    sub: '90 JOURS',
    body: "Si votre site n'apparaît pas sur la première page Google pour « votre métier + votre ville » sous 90 jours, on retravaille la SEO sans surcoût.",
    cta: 'En savoir plus',
    ctaHref: '/contact',
    gradientFrom: '#FF954F',
    gradientTo: '#E8772C',
  },
  {
    id: 'propriete',
    icon: 'Shield',
    kicker: 'GARANTIE',
    title: 'Garantie propriété',
    sub: 'À VIE',
    body: "Nom de domaine à votre nom. Code source à vous. Comptes Google à vous. Le jour où vous voulez partir, vous partez, sans nous.",
    cta: 'Voir nos accès',
    ctaHref: '/contact',
    gradientFrom: '#FFC9A0',
    gradientTo: '#FF954F',
  },
];

export function GuaranteesBlock() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="g-header"] > *', {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Section className="py-20 md:py-28" bg="alt">
      <Container>
        <div ref={ref}>
          <div data-anim="g-header" className="max-w-3xl mb-12 md:mb-14">
            <Kicker>Engagements GND</Kicker>
            <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong leading-tight">
              On écrit nos promesses,{' '}
              <span className="italic text-accent">noir sur blanc</span>.
            </h2>
            <p className="mt-5 text-text leading-relaxed max-w-2xl">
              Trois garanties contractuelles, écrites au devis. Aucune agence
              parisienne du marché ne s'engage à ce niveau pour ce prix.
            </p>
          </div>

          <GradientCardShowcase cards={GUARANTEES} />
        </div>
      </Container>
    </Section>
  );
}
