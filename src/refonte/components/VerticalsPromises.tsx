/* VerticalsPromises, promesses différenciantes par verticale.
 * Desktop : armature wood+copper Nano Banana avec overlays icônes Lucide + texte par anneau.
 * Mobile  : fallback liste verticale classique (asset trop horizontal pour mobile portrait).
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Section, Container, Kicker } from '../ui';
import { Icons } from '../icons';

gsap.registerPlugin(ScrollTrigger);

interface Vertical {
  icon: any;
  metier: string;
  promesse: string;
  // Position % du centre de l'anneau cuivre dans l'image (mesurée via PIL/scipy sur verticals-armature.png 1365×768)
  ringX: number;
  ringY: number;
  // Décalage vertical fin du label en % (positif = vers le bas, négatif = vers le haut).
  // Compense le fait que le label (titre + body) est centré sur ringY via -translate-y-1/2,
  // ce qui fait que sur le 1er/dernier anneau, l'œil perçoit un léger désalignement.
  labelYOffset?: number;
}

const VERTICALS: readonly Vertical[] = [
  {
    icon: Icons.Utensils,
    metier: 'Restaurants · cafés',
    promesse: 'Plus de réservations directes, sans commission TheFork.',
    ringX: 61.61,
    ringY: 22.45,
    labelYOffset: -1.6, // remonte le label
  },
  {
    icon: Icons.Scissors,
    metier: 'Coiffeurs · instituts',
    promesse: 'Vos clientes vous trouvent et réservent en 30 secondes.',
    ringX: 67.43,
    ringY: 35.17,
  },
  {
    icon: Icons.Car,
    metier: 'Auto-écoles',
    promesse: 'Inscriptions en ligne · CPF intégré · paiement échelonné.',
    ringX: 68.41,
    ringY: 50.16,
  },
  {
    icon: Icons.Hammer,
    metier: 'Artisans BTP',
    promesse: 'Téléphone qui sonne, devis qui rentrent, Top 3 Google Maps.',
    ringX: 67.88,
    ringY: 65.06,
  },
  {
    icon: Icons.Store,
    metier: 'Commerces · indépendants',
    promesse: 'Une vraie maison digitale au lieu d\'un compte Insta fragile.',
    ringX: 61.07,
    ringY: 77.22,
    labelYOffset: 1.6, // redescend le label
  },
];

// Centre du gros disque cream (pour overlay "GND" au centre)
const CENTER_DISC = { x: 38.61, y: 50.09 };

export function VerticalsPromises() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Header
      gsap.from('[data-anim="vp-header"] > *', {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
      // Armature
      gsap.from('[data-anim="vp-armature"]', {
        opacity: 0,
        scale: 0.94,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      });
      // Centre brand
      gsap.from('[data-anim="vp-brand"]', {
        opacity: 0,
        scale: 0.7,
        duration: 0.7,
        delay: 0.5,
        ease: 'back.out(1.5)',
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      });
      // Anneaux icon + texte stagger
      gsap.from('[data-anim="vp-ring"]', {
        opacity: 0,
        scale: 0.6,
        duration: 0.55,
        stagger: 0.12,
        delay: 0.4,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      });
      gsap.from('[data-anim="vp-label"]', {
        opacity: 0,
        x: -12,
        duration: 0.5,
        stagger: 0.12,
        delay: 0.55,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      });
      // Mobile rows
      gsap.from('[data-anim="vp-row"]', {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Section className="py-24 md:py-32" bg="alt">
      <Container>
        <div ref={ref}>
          {/* Header */}
          <div data-anim="vp-header" className="max-w-4xl mb-16 md:mb-20">
            <Kicker>Promesses par métier</Kicker>
            <h2 className="display text-5xl md:text-7xl mt-6 text-text-strong leading-tight">
              Selon votre métier, votre site{' '}
              <span className="italic text-accent">change la donne autrement</span>.
            </h2>
          </div>

          {/* ─── DESKTOP (md+) : armature avec overlays ──────────────────────────── */}
          {/* Outer container large + inner image-frame ancré à gauche (78% width).
              Labels positionnés en % du image-frame mais peuvent déborder à droite (overflow-visible).
              → l'armature recule visuellement à gauche, le texte respire à droite. */}
          <div className="hidden md:block">
            <div className="relative w-full max-w-[1600px] mx-auto">
              {/* Image-frame ancré à gauche + agrandi + débord négatif gauche pour reculer sur côté gauche page. */}
              <div
                className="relative w-[102%] mr-auto"
                style={{ aspectRatio: '1365 / 768', marginLeft: '-24%' }}
              >
                {/* Armature image */}
                <img
                  data-anim="vp-armature"
                  src="/assets/verticals-armature.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                  draggable={false}
                />

                {/* Centre disc, branding GND */}
                <div
                  data-anim="vp-brand"
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center"
                  style={{ left: `${CENTER_DISC.x}%`, top: `${CENTER_DISC.y}%`, width: '22%' }}
                >
                  <div className="label-mono text-[13px] lg:text-[14px] tracking-[0.32em] text-text-muted mb-3">
                   GND
                  </div>
                  <div className="display text-4xl lg:text-5xl text-text-strong leading-[1.05]">
                    Votre site,<br/>
                    <span className="italic text-accent">votre métier</span>
                  </div>
                </div>

                {/* Overlays anneaux + labels */}
                {VERTICALS.map((v, idx) => {
                  const Ico = v.icon;
                  return (
                    <React.Fragment key={v.metier}>
                      {/* Icône centrée dans le cream-disc cuivre */}
                      <span
                        data-anim="vp-ring"
                        className="absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center text-text-strong pointer-events-none"
                        style={{
                          left: `${v.ringX}%`,
                          top: `${v.ringY}%`,
                          width: '3.4%',
                          height: '3.4%',
                        }}
                      >
                        <Ico size={28} stroke={1.6} className="text-text-strong" />
                      </span>

                      {/* Label texte à droite de l'anneau, width et offset en % de image-frame.
                          Image-frame fait 76% outer (centré mx-auto), label 40% du frame = 30% outer ;
                          label déborde ~14% à droite, équilibré par 24% padding outer (mx-auto). */}
                      <div
                        data-anim="vp-label"
                        className="absolute -translate-y-1/2"
                        style={{
                          left: `${v.ringX + 5.5}%`,
                          top: `${v.ringY + (v.labelYOffset ?? 0)}%`,
                          width: '40%',
                        }}
                      >
                        <div className="display text-accent text-lg lg:text-2xl leading-tight">
                          {v.metier}
                        </div>
                        <div className="text-text text-sm lg:text-base leading-snug mt-1.5">
                          {v.promesse}
                        </div>
                      </div>

                      {/* Numéro label-mono optionnel au-dessus, discret */}
                      <span
                        data-anim="vp-ring"
                        className="absolute -translate-x-1/2 label-mono text-[11px] tracking-[0.24em] text-accent-deep pointer-events-none"
                        style={{
                          left: `${v.ringX}%`,
                          top: `${v.ringY - 4}%`,
                        }}
                      >
                        0{idx + 1}
                      </span>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── MOBILE (< md) : armature visuelle (animation conservée) + liste lisible ── */}
          <div className="md:hidden">
            {/* Armature radiale scalée : disc cuivre + 5 satellites + icônes, sans
                le texte latéral (illisible en portrait) → le texte est dans la liste
                dessous. Mêmes data-anim → même animation GSAP que desktop. */}
            <div
              className="relative w-full mx-auto max-w-[440px]"
              style={{ aspectRatio: '1365 / 768', containerType: 'inline-size' }}
            >
              <img
                data-anim="vp-armature"
                src="/assets/verticals-armature.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
              />
              {/* Disc centre */}
              <div
                data-anim="vp-brand"
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center"
                style={{ left: `${CENTER_DISC.x}%`, top: `${CENTER_DISC.y}%`, width: '26%' }}
              >
                <div
                  className="label-mono text-text-muted"
                  style={{ fontSize: 'clamp(5px, 1.7cqw, 14px)', letterSpacing: '0.3em', marginBottom: 'clamp(2px, 0.7cqw, 12px)' }}
                >
                  GND
                </div>
                <div
                  className="display text-text-strong leading-[1.05]"
                  style={{ fontSize: 'clamp(12px, 4.4cqw, 48px)' }}
                >
                  Votre site,<br />
                  <span className="italic text-accent">votre métier</span>
                </div>
              </div>
              {/* Satellites : icône + numéro (sans texte latéral) */}
              {VERTICALS.map((v, idx) => {
                const Ico = v.icon;
                return (
                  <React.Fragment key={v.metier}>
                    <span
                      data-anim="vp-ring"
                      className="absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center text-text-strong pointer-events-none"
                      style={{ left: `${v.ringX}%`, top: `${v.ringY}%`, width: '4.6%', height: '4.6%' }}
                    >
                      <Ico stroke={1.6} className="w-full h-full text-text-strong" />
                    </span>
                    <span
                      data-anim="vp-ring"
                      className="absolute -translate-x-1/2 label-mono text-accent-deep pointer-events-none"
                      style={{ left: `${v.ringX}%`, top: `${v.ringY - 5}%`, fontSize: 'clamp(4px, 1.1cqw, 11px)', letterSpacing: '0.2em' }}
                    >
                      0{idx + 1}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Liste lisible (métier + promesse), sous l'armature */}
            <div className="mt-10 divide-y divide-text-strong/10 border-y border-text-strong/10">
            {VERTICALS.map((v, idx) => {
              const Ico = v.icon;
              return (
                <div
                  key={v.metier}
                  data-anim="vp-row"
                  className="grid grid-cols-12 gap-4 py-6 items-center"
                >
                  <div className="col-span-2 flex justify-center">
                    <span className="w-11 h-11 rounded-full bg-accent/15 text-accent-deep inline-flex items-center justify-center relative">
                      <Ico size={18} />
                      <span className="absolute -top-1.5 -right-1.5 label-mono text-[8px] tracking-[0.15em] text-accent-deep bg-bg rounded-full px-1.5 py-0.5 border border-accent/30">
                        0{idx + 1}
                      </span>
                    </span>
                  </div>
                  <div className="col-span-10">
                    <div className="display text-accent text-lg leading-tight">
                      {v.metier}
                    </div>
                    <div className="text-text text-sm leading-snug mt-1">
                      {v.promesse}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
