/* ProcessGraph, node-graph diagram inspired by dialedweb.com "Our Services" section.
 *
 * Adapted for GND palette:
 *   - dark chocolate bg + cream text + accent orange (vs dialedweb white/violet on black)
 *   - 5 step tiles instead of 4 service tiles
 *   - central hub = "Votre marque" instead of "Your Business"
 *   - SVG connectors fan from each tile down to central hub pill
 */
import * as React from 'react';
import { motion } from 'framer-motion';
import { Plus, ClipboardList, Palette, Lightbulb, RefreshCw, Send } from 'lucide-react';
import { Container } from '../ui';

export type ProcessStep = {
  n: string;
  t: string;
  d: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

export type ProcessGraphProps = {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  hubLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** 5 étapes à afficher (défaut = DEFAULT_STEPS branding). */
  steps?: ProcessStep[];
};

/* ------------------------------------------------------------------ *
 * ProcessTile + ProcessGrid, Linear/Vercel-style group spotlight
 * + Magic UI BorderBeam conic rotating border + animated count-up number.
 *
 * Pattern (NOT a basic hover-tilt) :
 *   1. Parent grid tracks mouse globally → CSS vars --mouse-x / --mouse-y
 *   2. Each tile has TWO radial-gradient masks driven by those vars :
 *      - one paints a BORDER highlight that lights up the portion of
 *        the tile border facing the cursor (mask trick)
 *      - one paints a fill SPOTLIGHT inside the tile, faint orange glow
 *   3. Continuous conic-gradient that rotates around each tile (BorderBeam)
 *   4. Number count-up animation when tile enters viewport
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ *
 * "Power-on sequence" tile pattern.
 *
 * Surprise factors that should be IMMEDIATELY visible :
 *   1. On viewport-enter : tiles bounce in BIG (y 120 → 0, scale 0.4 → 1, opacity 0 → 1)
 *      with elastic spring (stiffness 90, damping 9) staggered every 180ms.
 *   2. A bright orange shimmer wave SWEEPS left → right across the whole grid
 *      once on enter, visually like a power surge passing through the row.
 *   3. Each tile has a continuous pulse-ring under it (warm orange glow, 2.6s loop).
 *   4. Icon does a 540° rotation when its tile lands.
 *   5. On hover: tile RISES with strong orange shadow + scale 1.04 + content slides up.
 *   6. CountUp number ticks from 00 to its value, then a quick flash highlights it.
 * ------------------------------------------------------------------ */

function CountUp({ value, durationMs = 1100 }: { value: string; durationMs?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const numericTarget = parseInt(value, 10);
  const [display, setDisplay] = React.useState('00');
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current || started) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            const current = Math.round(eased * numericTarget);
            setDisplay(String(current).padStart(2, '0'));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [durationMs, numericTarget, started]);

  return <span ref={ref}>{display}</span>;
}

function ProcessTile({ step, index }: { step: ProcessStep; index: number }) {
  const Icon = step.icon;
  return (
    <motion.div
      className="proc-tile group relative rounded-2xl bg-bg-alt p-5 min-h-0 lg:min-h-[260px] overflow-visible cursor-pointer"
      initial={{ opacity: 0, y: 120, scale: 0.4, rotate: -8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        type: 'spring',
        stiffness: 90,
        damping: 10,
        mass: 0.9,
        delay: index * 0.18,
      }}
      whileHover={{
        y: -10,
        scale: 1.04,
        transition: { type: 'spring', stiffness: 240, damping: 18 },
      }}
      style={{
        boxShadow: '0 4px 20px rgba(42,24,16,0.08)',
      }}
    >
      {/* Continuous pulse-ring under tile, warm orange glow loop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow: '0 0 0 0 rgba(255,149,79,0.0)',
        }}
        animate={{
          boxShadow: [
            '0 0 0 0px rgba(255,149,79,0.35)',
            '0 0 0 22px rgba(255,149,79,0)',
            '0 0 0 0px rgba(255,149,79,0)',
          ],
        }}
        transition={{
          duration: 2.6,
          ease: 'easeOut',
          repeat: Infinity,
          delay: index * 0.35,
        }}
      />

      {/* Hover glow drop, heavy warm shadow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow:
            '0 24px 60px rgba(255,149,79,0.45), 0 6px 18px rgba(42,24,16,0.20)',
        }}
      />

      {/* Static border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border border-text-strong/10 group-hover:border-accent transition-colors duration-300"
      />

      {/* Cursor-aware border highlight (mask trick), bright orange */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle 320px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,149,79,0.9), transparent 50%)',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '2px',
          borderRadius: '1rem',
        }}
      />

      {/* Inner soft fill glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle 320px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,149,79,0.13), transparent 60%)',
        }}
      />

      {/* Tile content */}
      <div className="relative z-10 flex flex-col gap-3 lg:gap-4 h-full w-full">
        <div className="flex items-center justify-between w-full">
          <motion.span
            className="num-display text-3xl text-accent leading-none tabular-nums"
            initial={{ filter: 'brightness(1) drop-shadow(0 0 0 rgba(255,149,79,0))' }}
            whileInView={{
              filter: [
                'brightness(1) drop-shadow(0 0 0 rgba(255,149,79,0))',
                'brightness(1.4) drop-shadow(0 0 14px rgba(255,149,79,0.9))',
                'brightness(1) drop-shadow(0 0 0 rgba(255,149,79,0))',
              ],
            }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: index * 0.18 + 0.6 }}
          >
            <CountUp value={step.n} />
          </motion.span>
          <motion.span
            className="text-text-muted group-hover:text-accent transition-colors duration-300 inline-flex"
            initial={{ rotate: -180, opacity: 0 }}
            whileInView={{ rotate: 360, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 1,
              delay: index * 0.18 + 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Icon size={20} />
          </motion.span>
        </div>
        <motion.div
          className="display text-lg leading-tight text-text-strong"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: index * 0.18 + 0.45 }}
        >
          {step.t}
        </motion.div>
        <motion.p
          className="text-sm lg:text-xs leading-relaxed text-text-muted lg:mt-auto"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: index * 0.18 + 0.6 }}
        >
          {step.d}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* Grid wrapper, captures pointer position + paints shimmer wave on viewport enter. */
function ProcessTileGrid({ steps }: { steps: ProcessStep[] }) {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const tiles = ref.current?.querySelectorAll<HTMLElement>('.proc-tile');
    if (!tiles) return;
    tiles.forEach((tile) => {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tile.style.setProperty('--mouse-x', `${x}px`);
      tile.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative z-10"
    >
      {/* Shimmer wave, sweeps across grid once on enter */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -inset-x-10 z-20"
        initial={{ x: '-110%', opacity: 0 }}
        whileInView={{ x: '110%', opacity: [0, 1, 0] }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          background:
            'linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255,149,79,0.35) 50%, rgba(253,246,238,0.55) 52%, rgba(255,149,79,0.35) 54%, transparent 64%, transparent 100%)',
          mixBlendMode: 'screen',
        }}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {steps.map((step, idx) => (
          <ProcessTile key={step.n} step={step} index={idx} />
        ))}
      </div>
    </div>
  );
}

const DEFAULT_STEPS: ProcessStep[] = [
  {
    n: '01',
    t: 'Audit & Cadrage',
    d: "Échange de fond, analyse de votre marché et de vos concurrents directs. Nous synthétisons vos objectifs dans un document écrit. La production ne démarre jamais sans ce socle stratégique.",
    icon: ClipboardList,
  },
  {
    n: '02',
    t: 'Plateforme & Moodboard',
    d: "Définition de votre positionnement, du ton de voix et exploration visuelle. Nous validons ensemble l'orientation esthétique et le message avant de dessiner la moindre ligne.",
    icon: Palette,
  },
  {
    n: '03',
    t: 'Concepts créatifs',
    d: "Nous ne vous laissons pas deviner. Nous présentons deux à trois directions visuelles distinctes, argumentées et défendues à voix haute. Vous choisissez en tant que dirigeant, avec toutes les cartes en main.",
    icon: Lightbulb,
  },
  {
    n: '04',
    t: 'Itérations structurées',
    d: "Trois rounds d'affinage inclus. Notre méthode est linéaire, chaque palier est validé avant de passer au suivant. Ce cadre garantit un résultat précis, sans retours en arrière chaotiques ni perte de temps.",
    icon: RefreshCw,
  },
  {
    n: '05',
    t: 'Déploiement & Autonomie',
    d: "Livraison du brand book, des Generative Guidelines (règles d'usage IA), des templates digitaux prêts à publier et de 100 % de vos fichiers sources. Le système est complet. Votre marque est prête à vivre, avec ou sans nous.",
    icon: Send,
  },
];

export function ProcessGraph({
  kicker = 'Le process',
  title,
  intro,
  hubLabel = 'Votre marque',
  ctaLabel,
  ctaHref = '#/contact',
  steps = DEFAULT_STEPS,
}: ProcessGraphProps) {

  // 5 columns evenly spaced on viewBox 0-1000 → centers at 100, 300, 500, 700, 900
  // Matches the grid-cols-5 column centers (each column = 20% width)
  const xs = [100, 300, 500, 700, 900];

  return (
    <section className="relative bg-bg-alt text-text-strong px-5 py-16 sm:px-8 sm:py-24 md:py-32 overflow-hidden">
      <Container>
        {/* Kicker + titre + intro */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] tracking-[0.22em] uppercase text-accent label-mono">
            {kicker}
          </span>
          <h2 className="mt-5 display text-[clamp(2rem,5vw,4rem)] text-text-strong leading-[1.04]">
            {title}
          </h2>
          {intro && (
            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-text-muted leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* Diagramme node-graph, carte chocolat sur fond crème */}
        <div className="relative mx-auto mt-10 sm:mt-14 max-w-[1180px] overflow-hidden rounded-[28px] border border-text-strong/10 bg-text-strong text-bg p-5 sm:p-10 md:p-14 shadow-2xl shadow-text-strong/15">
          {/* Tiles, fond crème + group-spotlight Linear-style + BorderBeam Magic UI + count-up */}
          <ProcessTileGrid steps={steps} />

          {/* SVG connectors fan to central hub, viewBox spans full grid width */}
          {/* Connecteur vertical simple en mobile/tablette (l'éventail SVG est pensé
              pour 5 colonnes horizontales → masqué <lg) */}
          <div className="lg:hidden mx-auto mt-6 mb-2 h-10 w-px bg-bg/25" aria-hidden />
          <svg
            className="relative z-0 my-2 h-24 w-full hidden lg:block"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            {xs.map((x) => {
              // Each path goes down from tile column, bends toward center column (500)
              const isLeftSide = x < 500;
              const isCenter = x === 500;
              if (isCenter) {
                return (
                  <line
                    key={x}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="55"
                    stroke="rgba(253,246,238,0.22)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              }
              const bendX = isLeftSide ? x + 40 : x - 40;
              return (
                <path
                  key={x}
                  d={`M ${x} 0 V 35 Q ${x} 55 ${bendX} 55 H 500`}
                  stroke="rgba(253,246,238,0.22)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
            {/* Final drop from hub junction to pill */}
            <line
              x1="500"
              y1="55"
              x2="500"
              y2="85"
              stroke="rgba(253,246,238,0.22)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="500" cy="55" r="3.5" fill="rgba(255,149,79,0.7)" />
          </svg>

          {/* Hub central */}
          <div className="relative z-10 flex justify-center">
            <div className="flex items-center gap-3 rounded-full border border-bg/15 bg-text-strong px-5 py-3 shadow-2xl shadow-black/40">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent">
                <Plus size={15} className="text-text-strong" strokeWidth={2.5} />
              </span>
              <span className="display text-lg text-bg">
                {hubLabel}
              </span>
            </div>
          </div>

          {/* Warm ambient glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[460px] w-[460px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,149,79,0.08) 0%, transparent 70%)' }}
            aria-hidden
          />
        </div>

        {/* CTA */}
        {ctaLabel && (
          <div className="mt-12 flex justify-center">
            <a
              href={ctaHref}
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-text-strong transition-transform hover:scale-[0.97]"
              style={{ boxShadow: '0 14px 32px rgba(255,149,79,0.32)' }}
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
