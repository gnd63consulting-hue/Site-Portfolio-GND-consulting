/* WithoutWithSite, comparatif punch "Sans site / Avec site" via 2 FlippingCards XL.
 * 2 cartes côte à côte, listes complètes 5 items.
 * Hover flip : carte révèle "preuve / promesse" condensée (stat + punch + CTA).
 * Charte GND : front cream/chocolate, back chocolate/cream + accent orange.
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Section, Container, Kicker } from '../ui';
import { Icons } from '../icons';
import { FlippingCard } from '@/components/ui/flipping-card';

gsap.registerPlugin(ScrollTrigger);

const WITHOUT_ITEMS = [
  'Vos clients tombent sur les commissions Uber Eats (30 % par commande)',
  'Vos comptes Insta / TikTok peuvent être bannis du jour au lendemain',
  'Vous payez 99 €/mois à Zenchef, TheFork, Planity… à vie',
  "Quand on cherche votre métier + votre ville, on trouve votre concurrent",
  'Vous ne gardez aucune donnée client',
];

const WITH_ITEMS = [
  'Vous gardez 100 % du chiffre, vous fixez vos propres règles',
  'Votre maison existe sur votre domaine, personne ne peut vous fermer',
  'Vous payez une fois, le site est à vous, à vie',
  'Vous apparaissez en Top 3 Google sur votre activité locale',
  'Vos clients, vos emails, vos réservations, sont à vous',
];

/* ─── FRONT, Sans site (cream, liste 5 items, X icons) ─── */
function WithoutFront() {
  return (
    <div className="flex flex-col h-full w-full p-8 md:p-10 rounded-[inherit] bg-bg-alt border border-text-strong/10 shadow-xl shadow-text-strong/[0.06]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-text-muted">
          <Icons.X size={14} />
          Aujourd'hui · Sans site
        </div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-accent">
          Survolez ↗
        </span>
      </div>

      <h3 className="display text-3xl md:text-[34px] text-text-strong mt-6 leading-[1.05]">
        Ce que vous laissez{' '}
        <span className="italic text-text-muted">sur la table</span>.
      </h3>

      <ul className="mt-6 space-y-3.5">
        {WITHOUT_ITEMS.map((line, i) => (
          <li
            key={line}
            className="flex items-start gap-3 text-text/85 text-[14px] md:text-[15px] leading-snug"
          >
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-text-strong/8 text-text-muted">
              <Icons.X size={11} />
            </span>
            <span>
              <span className="text-text-muted/90 mr-2 label-mono text-[10px]">
                0{i + 1}
              </span>
              {line}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-text-muted/70">
        <span>Avant GND</span>
        <span className="text-accent">Voir la suite ↻</span>
      </div>
    </div>
  );
}

/* ─── BACK, Sans site flip (chocolate, stat punch + CTA) ─── */
function WithoutBack() {
  return (
    <div className="flex flex-col h-full w-full p-8 md:p-10 rounded-[inherit] bg-text-strong text-bg ring-1 ring-accent/40 shadow-2xl shadow-text-strong/40">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-accent">
        <Icons.Zap size={14} />
        Coût réel · Sans site
      </div>

      <h3 className="display text-3xl md:text-[34px] text-bg mt-6 leading-[1.05]">
        Combien ça vous coûte{' '}
        <span className="italic text-accent">vraiment</span> ?
      </h3>

      <div className="mt-7 grid grid-cols-3 gap-4">
        <div>
          <div className="display text-3xl md:text-4xl text-accent">−30 %</div>
          <div className="mt-1 text-[11px] tracking-[0.16em] uppercase text-bg/60">
            par commande
          </div>
        </div>
        <div>
          <div className="display text-3xl md:text-4xl text-accent">99 €</div>
          <div className="mt-1 text-[11px] tracking-[0.16em] uppercase text-bg/60">
            /mois à vie
          </div>
        </div>
        <div>
          <div className="display text-3xl md:text-4xl text-accent">0 €</div>
          <div className="mt-1 text-[11px] tracking-[0.16em] uppercase text-bg/60">
            de propriété
          </div>
        </div>
      </div>

      <p className="mt-6 text-bg/85 leading-relaxed text-[14px] md:text-[15px]">
        Plateformes, OTAs, apps. Vous payez à vie pour exister sur des
        canaux qu'ils possèdent, et qu'ils peuvent vous reprendre.
      </p>

      <div className="mt-auto pt-6 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-bg/60">
        <span>Constat</span>
        <span className="text-accent">Comparez ↗</span>
      </div>
    </div>
  );
}

/* ─── FRONT, Avec site GND (chocolate, liste 5 items, check icons) ─── */
function WithFront() {
  return (
    <div className="flex flex-col h-full w-full p-8 md:p-10 rounded-[inherit] bg-text-strong text-bg ring-1 ring-accent shadow-2xl shadow-text-strong/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-accent">
          <Icons.Check size={14} />
          Demain · Avec un site GND
        </div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-accent">
          Survolez ↗
        </span>
      </div>

      <h3 className="display text-3xl md:text-[34px] text-bg mt-6 leading-[1.05]">
        Ce que vous{' '}
        <span className="italic text-accent">gardez</span>.
      </h3>

      <ul className="mt-6 space-y-3.5">
        {WITH_ITEMS.map((line, i) => (
          <li
            key={line}
            className="flex items-start gap-3 text-bg/90 text-[14px] md:text-[15px] leading-snug"
          >
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-text-strong">
              <Icons.Check size={11} />
            </span>
            <span>
              <span className="text-accent mr-2 label-mono text-[10px]">
                0{i + 1}
              </span>
              {line}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-bg/60">
        <span>Promesse GND</span>
        <span className="text-accent">Voir le détail ↻</span>
      </div>
    </div>
  );
}

/* ─── BACK, Avec site GND flip (cream, garanties chiffrées + CTA) ─── */
function WithBack() {
  return (
    <div className="flex flex-col h-full w-full p-8 md:p-10 rounded-[inherit] bg-bg-alt border border-accent/40 shadow-xl shadow-accent/20">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-accent">
        <Icons.Sparkles size={14} />
        Garanties · Avec site GND
      </div>

      <h3 className="display text-3xl md:text-[34px] text-text-strong mt-6 leading-[1.05]">
        Tenu en{' '}
        <span className="italic text-accent">7-14 jours</span>.
      </h3>

      <div className="mt-7 grid grid-cols-3 gap-4">
        <div>
          <div className="display text-3xl md:text-4xl text-text-strong">100 %</div>
          <div className="mt-1 text-[11px] tracking-[0.16em] uppercase text-text-muted">
            du chiffre
          </div>
        </div>
        <div>
          <div className="display text-3xl md:text-4xl text-text-strong">0 €</div>
          <div className="mt-1 text-[11px] tracking-[0.16em] uppercase text-text-muted">
            d'abonnement
          </div>
        </div>
        <div>
          <div className="display text-3xl md:text-4xl text-text-strong">3</div>
          <div className="mt-1 text-[11px] tracking-[0.16em] uppercase text-text-muted">
            rounds inclus
          </div>
        </div>
      </div>

      <p className="mt-6 text-text leading-relaxed text-[14px] md:text-[15px]">
        Vous êtes propriétaire à vie. Code source transmis, nom de domaine à
        votre nom. SEO local optimisé. Pas d'abonnement, jamais.
      </p>

      <a
        href="#/contact"
        className="mt-auto inline-flex items-center justify-between gap-2 rounded-full bg-text-strong text-bg px-5 py-3.5 text-sm font-medium hover:bg-accent hover:text-text-strong transition-colors"
      >
        <span>Demander un devis</span>
        <span aria-hidden>↗</span>
      </a>
    </div>
  );
}

export function WithoutWithSite() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        defaults: { ease: 'power3.out' },
      });
      tl.from('[data-anim="ww-kicker"]', { y: 14, opacity: 0, duration: 0.45 })
        .from('[data-anim="ww-title"]', { y: 22, opacity: 0, duration: 0.7 }, '-=0.2')
        .from(
          '[data-anim="ww-card"]',
          { y: 32, opacity: 0, scale: 0.97, duration: 0.7, stagger: 0.14 },
          '-=0.3'
        );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Section className="py-20 md:py-28">
      <Container>
        <div ref={ref}>
          <div className="max-w-3xl">
            <Kicker data-anim="ww-kicker">Sans site · Avec site</Kicker>
            <h2
              data-anim="ww-title"
              className="display text-5xl md:text-7xl mt-5 text-text-strong leading-[0.9]"
            >
              Aujourd'hui, ce que vous laissez sur la table,{' '}
              <span className="italic text-accent">demain ce que vous gardez</span>.
            </h2>
            <p className="mt-6 text-text leading-relaxed max-w-2xl">
              Survolez chaque carte pour basculer du constat à la preuve. Deux
              perspectives, un même résultat : récupérer la valeur de votre
              activité locale.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8 justify-items-center">
            <div data-anim="ww-card" className="w-full flex justify-center md:justify-end">
              <FlippingCard
                width={520}
                height={560}
                className="max-w-full"
                frontContent={<WithoutFront />}
                backContent={<WithoutBack />}
              />
            </div>
            <div data-anim="ww-card" className="w-full flex justify-center md:justify-start">
              <FlippingCard
                width={520}
                height={560}
                className="max-w-full"
                frontContent={<WithFront />}
                backContent={<WithBack />}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
