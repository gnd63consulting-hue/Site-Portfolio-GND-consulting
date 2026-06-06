/* HumanAiBlock, "Humain × IA en pratique"
 * Refactor : pile shuffle draggable (3 cartes) au lieu du grid 3-cols.
 * Anim shuffle-cards conservée intacte. Couleurs adaptées charte GND.
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Section, Container, Kicker } from '../ui';
import { Icons } from '../icons';
import { ShuffleCards, type ShuffleCardData } from '@/components/ui/shuffle-cards';

gsap.registerPlugin(ScrollTrigger);

const CARDS: ShuffleCardData[] = [
  {
    id: 1,
    kicker: "01 · L'humain pilote",
    title: 'On vous écoute',
    body:
      "Échange direct avec l'équipe qui conçoit votre site. Briefing en visio, choix esthétiques, relation client de bout en bout. Pas de service après-vente délégué à un freelance distant.",
    Icon: Icons.Users,
  },
  {
    id: 2,
    kicker: "02 · L'IA accélère",
    title: 'Production en jours, pas en mois',
    body:
      "Génération maquettes, copywriting, photo et code accélérés par les bons outils, pour livrer en 7-14 jours ce qu'une agence classique livre en 8 semaines.",
    Icon: Icons.Cpu,
  },
  {
    id: 3,
    kicker: '03 · Vous validez',
    title: '3 itérations design incluses',
    body:
      'Vous voyez votre site avant la mise en ligne, vous demandez les ajustements qui comptent. Garantie maquette : 3 rounds de retours inclus, sans surcoût.',
    Icon: Icons.Check,
  },
];

export function HumanAiBlock() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="hai-header"]', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
      gsap.from('[data-anim="hai-stack"]', {
        opacity: 0,
        y: 30,
        scale: 0.96,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Section className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,149,79,0.10) 0%, transparent 75%)',
        }}
      />
      <Container>
        <div ref={ref} className="relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Colonne texte */}
            <div className="min-w-0 lg:col-span-6 xl:col-span-7" data-anim="hai-header">
              <Kicker>Humain × IA, en pratique</Kicker>
              <h2 className="display text-5xl md:text-6xl lg:text-7xl mt-5 text-text-strong leading-[1.05]">
                On ne remplace personne.{' '}
                <span className="italic text-accent">
                  On accélère le bon travail
                </span>
                .
              </h2>
              <p className="mt-6 text-text leading-relaxed max-w-2xl">
                Notre méthode tient en trois temps. C'est ce qui nous permet de
                vous livrer en 7-14 jours, à un prix d'agence boutique, sans
                rogner sur la qualité.
              </p>
              <p className="mt-8 text-xs tracking-[0.22em] uppercase text-text-muted">
                Glissez la carte vers la gauche pour révéler la suivante →
              </p>
            </div>

            {/* Colonne pile shuffle */}
            <div
              className="min-w-0 lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end"
              data-anim="hai-stack"
            >
              <ShuffleCards cards={CARDS} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
