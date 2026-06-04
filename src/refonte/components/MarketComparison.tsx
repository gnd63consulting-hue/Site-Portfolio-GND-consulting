/* MarketComparison, pricing-table Pinterest structure + animations premium.
 *
 * Anim stack (Framer Motion + GSAP + CSS) :
 *   1. Entry stagger : Framer Motion spring physics (cards bounce-in from below)
 *   2. Hover 3D tilt : perspective + rotateX/Y via useMotionValue + useTransform
 *   3. Cursor-follow radial glow : CSS vars --glow-x/y updated onMouseMove
 *   4. Price counter : framer-motion animate() from 0 to target sur entrée viewport
 *   5. Icon pop spring : motion.div par cellule avec stagger par row index
 *   6. Featured GND : conic-gradient border rotation infinie (CSS-only)
 *   7. Hover lift smooth via Framer Motion whileHover
 */
import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
  type MotionValue,
} from 'framer-motion';
import { Section, Container, Kicker } from '../ui';
import { cn } from '@/lib/utils';

// ─── Critères ──────────────────────────────────────────────────────────────────
const CRITERIA = [
  { label: 'Propriété du site',          sub: 'Domaine, code, accès' },
  { label: 'Délai mise en ligne',        sub: 'De la commande au live' },
  { label: 'SEO local Google',           sub: 'Visibilité organique' },
  { label: 'Commission réservation',     sub: 'Par client confirmé' },
  { label: 'Modifications post-livr.',   sub: 'Évolutions site' },
  { label: 'Engagement / abonnement',    sub: 'Durée minimale' },
] as const;

type CellType = 'yes' | 'no' | 'partial';

interface Cell { type: CellType; text: string; }

interface Actor {
  id: string;
  tagline: string;
  name: string;
  // Si numericPrice défini → animate counter; sinon string price affiché tel quel
  numericPrice?: number;
  priceFigure: string;
  priceSub: string;
  cells: readonly Cell[];
  featured?: boolean;
  scheme: {
    outerStyle?: React.CSSProperties;
    outerClass: string;
    title: string;
    body: string;
    muted: string;
    price: string;
    checkColor: string;
    crossColor: string;
    partialColor: string;
    divider: string;
    glowColor: string; // pour radial-gradient cursor-follow
  };
}

const ACTORS: readonly Actor[] = [
  {
    id: 'gnd',
    tagline: "L'ARTISAN INDÉ",
    name: 'GND',
    numericPrice: 1500,
    priceFigure: '1 500 €',
    priceSub: 'unique · 5 ans',
    featured: true,
    cells: [
      { type: 'yes', text: 'À vous (WHOIS vérifiable)' },
      { type: 'yes', text: '7-14 jours ouvrés' },
      { type: 'yes', text: 'Optimisé sur-mesure' },
      { type: 'yes', text: 'Aucune commission' },
      { type: 'yes', text: 'Devis transparent' },
      { type: 'yes', text: 'Aucun engagement' },
    ],
    scheme: {
      outerStyle: { backgroundColor: '#FF954F' },
      outerClass: '',
      title: 'text-text-strong',
      body: 'text-text-strong',
      muted: 'text-text-strong/70',
      price: 'text-text-strong',
      checkColor: 'text-text-strong',
      crossColor: 'text-text-strong/60',
      partialColor: 'text-text-strong/75',
      divider: 'border-text-strong/20',
      glowColor: 'rgba(255,243,232,0.35)',
    },
  },
  {
    id: 'wix',
    tagline: 'BUILDER GRAND PUBLIC',
    name: 'Wix · Squarespace',
    numericPrice: 5940,
    priceFigure: '5 940 €',
    priceSub: '99 €/mois · 5 ans',
    cells: [
      { type: 'no',      text: 'Location plateforme' },
      { type: 'yes',     text: '1 journée (template)' },
      { type: 'no',      text: 'Bridé par template' },
      { type: 'partial', text: 'Plugin externe payant' },
      { type: 'partial', text: 'Vous-même, sans aide' },
      { type: 'no',      text: '12-24 mois min.' },
    ],
    scheme: {
      outerStyle: { backgroundColor: '#FDF6EE' },
      outerClass: 'border border-text-strong/8',
      title: 'text-text-strong',
      body: 'text-text-strong',
      muted: 'text-text-muted',
      price: 'text-text-strong',
      checkColor: 'text-accent-deep',
      crossColor: 'text-text-muted',
      partialColor: 'text-text',
      divider: 'border-text-strong/12',
      glowColor: 'rgba(255,149,79,0.22)',
    },
  },
  {
    id: 'agence',
    tagline: 'AGENCE PARISIENNE',
    name: 'Grosse agence',
    priceFigure: '5–15 k€',
    priceSub: 'selon prestation',
    cells: [
      { type: 'yes',     text: 'À vous' },
      { type: 'no',      text: '6-12 semaines' },
      { type: 'yes',     text: 'Selon spécialiste' },
      { type: 'partial', text: 'Selon presta retenue' },
      { type: 'no',      text: 'Devis lourds' },
      { type: 'partial', text: 'Selon contrat' },
    ],
    scheme: {
      outerStyle: { backgroundColor: '#532418' },
      outerClass: '',
      title: 'text-bg',
      body: 'text-bg',
      muted: 'text-bg/75',
      price: 'text-bg',
      checkColor: 'text-accent',
      crossColor: 'text-bg/65',
      partialColor: 'text-bg/85',
      divider: 'border-bg/20',
      glowColor: 'rgba(255,149,79,0.3)',
    },
  },
  {
    id: 'verticale',
    tagline: 'TOUT-EN-UN VERTICAL',
    name: 'Plateforme verticale',
    numericPrice: 6000,
    priceFigure: '6 000 €+',
    priceSub: '99 €/mois + commission',
    cells: [
      { type: 'no',      text: 'Location plateforme' },
      { type: 'yes',     text: '1-3 jours' },
      { type: 'no',      text: 'Sous-domaine' },
      { type: 'no',      text: 'Prélevée sur résa' },
      { type: 'partial', text: 'Vous-même' },
      { type: 'no',      text: '12 mois min.' },
    ],
    scheme: {
      outerStyle: { backgroundColor: '#E8772C' },
      outerClass: '',
      title: 'text-text-strong',
      body: 'text-text-strong',
      muted: 'text-text-strong/70',
      price: 'text-text-strong',
      checkColor: 'text-text-strong',
      crossColor: 'text-text-strong/65',
      partialColor: 'text-text-strong/80',
      divider: 'border-text-strong/20',
      glowColor: 'rgba(255,243,232,0.28)',
    },
  },
];

const ROW_HEIGHTS = {
  header: 'h-[210px] md:h-[230px]',
  feature: 'min-h-[78px] md:min-h-[84px]',
  footer: 'h-[64px]',
};

// ─── Icons ─────────────────────────────────────────────────────────────────────
function CheckSvg({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12l4 4L19 7" />
    </svg>
  );
}
function CrossSvg({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
function PartialSvg({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14" />
    </svg>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function PriceCounter({
  value,
  display,
  inView,
  delay,
  className,
}: {
  value?: number;
  display: string;
  inView: boolean;
  delay: number;
  className?: string;
}) {
  const [current, setCurrent] = React.useState(value ?? 0);
  React.useEffect(() => {
    if (!inView || value === undefined) return;
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier ease-out-expo
      onUpdate: (v) => setCurrent(v),
    });
    return () => controls.stop();
  }, [inView, value, delay]);

  if (value === undefined) {
    // Pas de counter (ex. "5-15 k€"), affiche directement le texte avec stagger pop
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay, type: 'spring', stiffness: 200, damping: 14 }}
      >
        {display}
      </motion.span>
    );
  }

  // Format FR avec espace insécable entre milliers
  const rounded = Math.round(current);
  const formatted = rounded.toLocaleString('fr-FR').replace(/ | /g, ' ');
  // Conserver suffixe (ex. "€+" pour Verticale "6 000 €+")
  const suffix = display.replace(/[\d\s  ]/g, '').trim();

  return (
    <span className={className}>
      {formatted}
      {suffix ? ` ${suffix}` : ' €'}
    </span>
  );
}

function CellRow({
  cell,
  scheme,
  rowIdx,
  inView,
}: {
  cell: Cell;
  scheme: Actor['scheme'];
  rowIdx: number;
  inView: boolean;
}) {
  const Ico = cell.type === 'yes' ? CheckSvg : cell.type === 'no' ? CrossSvg : PartialSvg;
  const color =
    cell.type === 'yes' ? scheme.checkColor : cell.type === 'no' ? scheme.crossColor : scheme.partialColor;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center gap-1.5 py-3',
        ROW_HEIGHTS.feature,
        rowIdx > 0 && cn('border-t', scheme.divider),
      )}
    >
      <motion.span
        className={cn('flex-shrink-0 inline-flex', color)}
        initial={{ scale: 0, opacity: 0, rotate: -90 }}
        animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
        transition={{
          delay: 0.9 + rowIdx * 0.07,
          type: 'spring',
          stiffness: 320,
          damping: 16,
        }}
      >
        <Ico />
      </motion.span>
      <motion.span
        className={cn('text-[11px] lg:text-xs leading-tight', scheme.body)}
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.95 + rowIdx * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {cell.text}
      </motion.span>
    </div>
  );
}

function ActorCard({
  actor,
  index,
  parentInView,
}: {
  actor: Actor;
  index: number;
  parentInView: boolean;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Spring smoothing
  const smx = useSpring(mx, { stiffness: 150, damping: 18 });
  const smy = useSpring(my, { stiffness: 150, damping: 18 });
  // Translate mouse position [-0.5, 0.5] → rotation degrees
  const rotateX = useTransform(smy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smx, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mx.set(px - 0.5);
    my.set(py - 0.5);
    e.currentTarget.style.setProperty('--glow-x', `${(px * 100).toFixed(2)}%`);
    e.currentTarget.style.setProperty('--glow-y', `${(py * 100).toFixed(2)}%`);
  }, [mx, my]);

  const handleMouseLeave = React.useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const entryDelay = 0.15 + index * 0.1;

  return (
    <motion.div
      ref={cardRef}
      data-mc-featured={actor.featured ? '' : undefined}
      className={cn(
        'mc-card group flex flex-col overflow-hidden relative rounded-3xl',
        'transform-gpu will-change-transform',
        actor.scheme.outerClass,
        actor.featured && 'mc-featured z-10',
      )}
      style={{
        ...actor.scheme.outerStyle,
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        // CSS var défaut pour glow (au centre)
        '--glow-x': '50%',
        '--glow-y': '50%',
        '--glow-color': actor.scheme.glowColor,
      } as React.CSSProperties}
      initial={{ opacity: 0, y: 70, scale: 0.93 }}
      animate={parentInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: entryDelay,
        type: 'spring',
        stiffness: 80,
        damping: 14,
        mass: 0.9,
      }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor-follow radial glow overlay */}
      <div
        className="mc-card-glow absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{
          background:
            'radial-gradient(circle at var(--glow-x) var(--glow-y), var(--glow-color), transparent 55%)',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Featured badge */}
      {actor.featured && (
        <motion.div
          className="absolute top-3 right-3 z-20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={parentInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: entryDelay + 0.4, type: 'spring', stiffness: 280, damping: 14 }}
        >
          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium bg-text-strong text-accent border border-text-strong/40">
            Notre offre
          </span>
        </motion.div>
      )}

      {/* Header */}
      <div className={cn('px-4 lg:px-5 pt-6 lg:pt-8 pb-6 flex flex-col justify-end text-center relative z-10', ROW_HEIGHTS.header)}>
        <motion.div
          className={cn('label-mono text-[9px] lg:text-[10px] tracking-[0.22em] mb-3', actor.scheme.muted)}
          initial={{ opacity: 0, y: 10 }}
          animate={parentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: entryDelay + 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {actor.tagline}
        </motion.div>
        <motion.h3
          className={cn('display text-lg lg:text-xl leading-tight mb-4', actor.scheme.title)}
          initial={{ opacity: 0, y: 12 }}
          animate={parentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: entryDelay + 0.3, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {actor.name}
        </motion.h3>
        <PriceCounter
          value={actor.numericPrice}
          display={actor.priceFigure}
          inView={parentInView}
          delay={entryDelay + 0.45}
          className={cn(
            'num-display text-3xl lg:text-[2rem] font-bold tracking-tighter leading-none block',
            actor.scheme.price,
          )}
        />
        <motion.div
          className={cn('text-[11px] lg:text-xs mt-2', actor.scheme.body)}
          initial={{ opacity: 0 }}
          animate={parentInView ? { opacity: 1 } : {}}
          transition={{ delay: entryDelay + 0.7, duration: 0.5 }}
        >
          {actor.priceSub}
        </motion.div>
      </div>

      {/* Cells */}
      <div className="flex-1 px-3 lg:px-4 relative z-10">
        {actor.cells.map((cell, idx) => (
          <CellRow key={idx} cell={cell} scheme={actor.scheme} rowIdx={idx} inView={parentInView} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className={cn('flex items-center justify-center border-t relative z-10', actor.scheme.divider, ROW_HEIGHTS.footer)}
        initial={{ opacity: 0 }}
        animate={parentInView ? { opacity: 1 } : {}}
        transition={{ delay: entryDelay + 1.6, duration: 0.4 }}
      >
        <div className={cn('label-mono text-[9px] tracking-[0.22em]', actor.scheme.muted)}>
          {actor.featured ? '✓ RECOMMANDÉ' : `${actor.id.toUpperCase()}`}
        </div>
      </motion.div>
    </motion.div>
  );
}

function LabelCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="flex flex-col overflow-hidden rounded-3xl relative"
      style={{ backgroundColor: '#2A1810' }}
      initial={{ opacity: 0, y: 70, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.1, type: 'spring', stiffness: 80, damping: 14, mass: 0.9 }}
    >
      {/* Header */}
      <div className={cn('px-6 lg:px-8 pt-6 lg:pt-8 pb-6 flex flex-col justify-end', ROW_HEIGHTS.header)}>
        <motion.div
          className="label-mono text-[10px] tracking-[0.28em] text-bg/65 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
         COMPARATIF GND
        </motion.div>
        <motion.div
          className="display text-2xl lg:text-[1.7rem] text-bg leading-tight"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.55 }}
        >
          Ce que vous obtenez
        </motion.div>
        <motion.div
          className="label-mono text-[10px] tracking-[0.22em] text-bg/75 mt-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          ÉVALUÉ SUR 5 ANS
        </motion.div>
      </div>

      {/* Critères */}
      <div className="flex-1 px-6 lg:px-8">
        {CRITERIA.map((c, idx) => (
          <motion.div
            key={c.label}
            className={cn(
              'flex flex-col justify-center py-4',
              ROW_HEIGHTS.feature,
              idx > 0 && 'border-t border-bg/15',
            )}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.85 + idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="display text-sm lg:text-base text-bg leading-tight">
              {c.label}
            </div>
            <div className="label-mono text-[9px] tracking-[0.18em] text-bg/65 mt-1">
              {c.sub}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className={cn('px-6 lg:px-8 flex items-center justify-start border-t border-bg/15', ROW_HEIGHTS.footer)}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.7, duration: 0.4 }}
      >
        <div className="label-mono text-[10px] tracking-[0.22em] text-bg/75">
          VOTRE CHOIX →
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function MarketComparison() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-15%' });

  return (
    <Section className="py-24 md:py-32">
      <Container>
        <div ref={sectionRef}>
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Kicker>Comparatif honnête</Kicker>
            </motion.div>
            <motion.h2
              className="display text-5xl md:text-7xl mt-5 text-text-strong leading-tight"
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Ce que vous payez,{' '}
              <span className="italic text-accent">ce que vous économisez</span>.
            </motion.h2>
            <motion.p
              className="mt-5 text-text leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              On vous compare aux vraies options du marché. Sans bullshit. À vous de choisir.
            </motion.p>
          </div>

          {/* DESKTOP grid */}
          <div className="hidden md:grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-3 lg:gap-4">
            <LabelCard inView={inView} />
            {ACTORS.map((a, idx) => (
              <ActorCard key={a.id} actor={a} index={idx + 1} parentInView={inView} />
            ))}
          </div>

          {/* MOBILE stack */}
          <div className="md:hidden space-y-5">
            {ACTORS.map((a, idx) => (
              <motion.div
                key={a.id}
                className={cn(
                  'rounded-3xl overflow-hidden relative',
                  a.scheme.outerClass,
                  a.featured && 'mc-featured',
                )}
                style={a.scheme.outerStyle}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + idx * 0.1, type: 'spring', stiffness: 80, damping: 14 }}
              >
                {a.featured && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium bg-text-strong text-accent border border-text-strong/40">
                      Notre offre
                    </span>
                  </div>
                )}
                <div className="px-6 pt-7 pb-5">
                  <div className={cn('label-mono text-[10px] tracking-[0.22em] mb-2', a.scheme.muted)}>
                    {a.tagline}
                  </div>
                  <h3 className={cn('display text-2xl leading-tight mb-3', a.scheme.title)}>
                    {a.name}
                  </h3>
                  <PriceCounter
                    value={a.numericPrice}
                    display={a.priceFigure}
                    inView={inView}
                    delay={0.3 + idx * 0.1}
                    className={cn('num-display text-4xl font-bold tracking-tighter leading-none block', a.scheme.price)}
                  />
                  <div className={cn('text-xs mt-2', a.scheme.body)}>
                    {a.priceSub}
                  </div>
                </div>
                <ul className={cn('px-6 pb-6 space-y-3 border-t pt-4', a.scheme.divider)}>
                  {a.cells.map((cell, cidx) => {
                    const Ico = cell.type === 'yes' ? CheckSvg : cell.type === 'no' ? CrossSvg : PartialSvg;
                    const color =
                      cell.type === 'yes' ? a.scheme.checkColor
                      : cell.type === 'no' ? a.scheme.crossColor
                      : a.scheme.partialColor;
                    return (
                      <li key={cidx} className="flex items-start gap-3">
                        <span className={cn('flex-shrink-0 mt-0.5', color)}>
                          <Ico />
                        </span>
                        <div className={cn('text-sm leading-snug', a.scheme.body)}>
                          <span className="font-medium">{CRITERIA[cidx].label}</span>
                          <span className="opacity-80"> · {cell.text}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Footnote */}
          <motion.p
            className="mt-8 text-xs md:text-sm text-text-muted max-w-3xl"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 0.5 }}
          >
            * Plateforme verticale : Zenchef, Planity, Doctolib, La Fourchette Manager, etc.
            Tarifs indicatifs constatés marché 2025-2026.
          </motion.p>
        </div>
      </Container>

      {/* ─── CSS animations (featured ring + glow) ───────────────────────────── */}
      <style>{`
        @property --mc-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes mc-featured-pulse {
          0%, 100% {
            box-shadow:
              0 18px 50px -18px rgba(255,149,79,0.45),
              0 0 0 2px rgba(255,149,79,0.35),
              0 0 30px rgba(255,149,79,0.18);
          }
          50% {
            box-shadow:
              0 28px 72px -16px rgba(255,149,79,0.75),
              0 0 0 3px rgba(255,149,79,0.55),
              0 0 50px rgba(255,149,79,0.35);
          }
        }
        @keyframes mc-ring-rotate {
          to { --mc-angle: 360deg; }
        }
        .mc-featured {
          animation: mc-featured-pulse 3.4s ease-in-out infinite;
          position: relative;
        }
        .mc-featured::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: conic-gradient(
            from var(--mc-angle, 0deg),
            rgba(255,149,79,0.0) 0%,
            rgba(255,149,79,0.9) 25%,
            rgba(232,119,44,0.95) 50%,
            rgba(255,149,79,0.9) 75%,
            rgba(255,149,79,0.0) 100%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          animation: mc-ring-rotate 4.5s linear infinite;
          z-index: 1;
          pointer-events: none;
        }
        .mc-card {
          backface-visibility: hidden;
        }
      `}</style>
    </Section>
  );
}
