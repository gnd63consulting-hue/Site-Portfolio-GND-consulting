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
    title: 'Un interlocuteur qui connaît votre projet',
    body:
      "Vous échangez directement avec les personnes qui conçoivent votre site. Pas de chaîne d'intermédiaires, pas de perte d'information entre la vente et la production. Vos retours sont entendus, compris et appliqués par ceux qui réalisent réellement le projet.",
    Icon: Icons.Users,
  },
  {
    id: 2,
    kicker: "02 · L'IA accélère",
    title: 'Plus de temps pour créer. Moins de temps perdu.',
    body:
      "Nous utilisons l'IA sur les tâches répétitives, techniques ou chronophages. La réflexion, la stratégie et les choix créatifs restent pilotés par l'humain. Résultat : des délais plus courts, une exécution plus fluide et davantage de temps consacré à ce qui fait la différence.",
    Icon: Icons.Cpu,
  },
  {
    id: 3,
    kicker: '03 · Vous gardez le contrôle',
    title: 'Votre projet avance par étapes validées',
    body:
      'Vous visualisez les propositions avant la mise en ligne et intervenez aux moments qui comptent. Trois rounds de retours sont inclus afin d\'affiner le projet sans complexifier le processus.',
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
                Une méthode simple.{' '}
                <span className="italic text-accent">
                  Des résultats plus rapides
                </span>
                .
              </h2>
              <p className="mt-6 text-text leading-relaxed max-w-2xl">
                Nous combinons expertise humaine et outils d'automatisation pour
                réduire les délais, limiter les frictions et concentrer le travail
                là où il apporte le plus de valeur.
              </p>
              <p className="mt-4 text-text leading-relaxed max-w-2xl">
                C'est ce qui nous permet de livrer des projets en quelques semaines,
                sans sacrifier la qualité ni la personnalisation.
              </p>
              <p className="mt-8 text-xs tracking-[0.22em] uppercase text-text-muted">
                Faites glisser pour découvrir notre méthode →
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
