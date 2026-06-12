/* PhotoViewer V3 — console média « verre fumé » (réf. maquette validée 12/06) :
 *   scène = coque très arrondie avec image GND floutée en fond,
 *   panneaux chocolat translucides (glassmorphism léger, backdrop-blur),
 *   rail gauche labellisé (icônes univers vidéo), viewer central dominant,
 *   colonne droite « Sélection » en bandeaux numérotés aérés + bouton
 *   showreel, rangée basse « Choisir un style » + « Coup de cœur ».
 * Charte GND : crème sur chocolat profond, accent orange. Texte crème = text-bg.
 * Motion : GSAP entrée au scroll (once) · Motion pour les hovers
 * (useReducedMotion respecté). Visible par défaut sans JS.
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Clapperboard, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Icons } from '../icons';

gsap.registerPlugin(ScrollTrigger);

export type ViewerPhoto = {
  id: string;
  title: string;
  sub: string;
  img: string;
  ratio?: string;
  /** mp4 direct (Supabase) — lu dans le viewer au clic Play */
  video?: string;
  /** id YouTube — embed dans le viewer au clic Play */
  youtube?: string;
  /** catégorie (Clip/Live/Production…) : si présente, pilote les filtres */
  cat?: string;
};

const STYLES = ['Tout', 'Portrait', 'Studio', 'Événementiel', 'Urbain'];

/* Libellés du rail façon maquette (catégorie réelle → label vidéo) */
const RAIL_LABELS: Record<string, string> = {
  Tout: 'Vidéos',
  Clip: 'Clips',
  Live: 'Tournages',
  Production: 'Productions',
};

/* Recette panneau « verre fumé » commune (chocolat translucide + blur) */
const GLASS = 'bg-text-strong/45 backdrop-blur-xl ring-1 ring-bg/10';

export function PhotoViewer({ photos }: { photos: ViewerPhoto[] }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [style, setStyle] = React.useState('Tout');
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  // Filtres : catégories réelles des items si fournies, sinon styles photo.
  const styles = React.useMemo(() => {
    const cats = Array.from(new Set(photos.map((p) => p.cat).filter(Boolean))) as string[];
    return cats.length ? ['Tout', ...cats] : STYLES;
  }, [photos]);

  const filtered = React.useMemo(() => {
    if (style === 'Tout') return photos;
    const r = photos.filter((p) =>
      p.cat ? p.cat === style : p.sub.toLowerCase().includes(style.toLowerCase())
    );
    return r.length ? r : photos;
  }, [photos, style]);

  React.useEffect(() => setActive(0), [style]);
  React.useEffect(() => setPlaying(false), [active, style]);

  // Entrée GSAP : coque puis zones en stagger. prefers-reduced-motion → rien
  // n'est masqué (gsap.matchMedia), composant visible par défaut.
  React.useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
          defaults: { ease: 'power3.out' },
        });
        tl.from('[data-anim="pv-shell"]', { y: 36, opacity: 0, scale: 0.97, duration: 0.75 })
          .from('[data-anim="pv-rail"]', { x: -18, opacity: 0, duration: 0.5 }, '-=0.35')
          .from('[data-anim="pv-hero"]', { y: 20, opacity: 0, duration: 0.55 }, '-=0.35')
          .from('[data-anim="pv-side"]', { x: 18, opacity: 0, duration: 0.5 }, '-=0.4')
          .from('[data-anim="pv-bottom"]', { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3');
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const cur = filtered[Math.min(active, filtered.length - 1)] || photos[0];
  const inspired = filtered.find((p) => p.id !== cur?.id) || photos[1] || cur;
  if (!cur) return null;

  // Rail = raccourcis réels vers les filtres + 2 liens (galerie, univers),
  // icônes 100% univers vidéo (play, bobine, caméra, clap).
  const RAIL_ICON: Record<string, any> = {
    Tout: Icons.Play,
    Clip: Icons.Film,
    Live: Icons.Camera,
    Production: Clapperboard,
    Portrait: Icons.Users,
    Studio: Icons.Camera,
    'Événementiel': Icons.Film,
    Urbain: Icons.Palette,
  };
  const railItems = styles.map((s) => ({
    label: RAIL_LABELS[s] ?? s,
    style: s,
    Ico: RAIL_ICON[s] ?? Icons.Sparkles,
  }));

  const counterIdx = Math.min(active, filtered.length - 1);

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[1180px]">
      {/* halo chaud */}
      <div
        aria-hidden
        className="absolute -inset-8 md:-inset-12 rounded-[64px] pointer-events-none"
        style={{ background: 'radial-gradient(60% 60% at 50% 45%, rgba(255,149,79,0.16) 0%, transparent 70%)', filter: 'blur(32px)' }}
      />

      {/* COQUE — scène avec image GND floutée en fond + vignettage chaud */}
      <div
        data-anim="pv-shell"
        className="relative overflow-hidden rounded-[40px] md:rounded-[48px] bg-text-strong p-3 md:p-5 ring-1 ring-bg/10"
        style={{ boxShadow: '0 30px 90px rgba(42,24,16,0.32)' }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src="/assets/viewer-shell-bg.webp"
            alt=""
            draggable={false}
            className="h-full w-full scale-105 object-cover blur-[7px]"
          />
          {/* scrim léger + vignettage : le fond reste perceptible */}
          <span className="absolute inset-0 bg-text-strong/35" />
          <span
            className="absolute inset-0"
            style={{ background: 'radial-gradient(120% 90% at 50% 40%, transparent 45%, rgba(42,24,16,0.55) 100%)' }}
          />
        </div>

        {/* SCÈNE */}
        <div className="relative grid gap-3 md:gap-4 md:min-h-[620px] md:grid-cols-[196px_minmax(0,1fr)_300px] md:grid-rows-[minmax(0,1fr)_auto]">
          {/* RAIL GAUCHE — panneau verre, items labellisés univers vidéo */}
          <aside
            data-anim="pv-rail"
            className={`row-span-2 hidden md:flex flex-col justify-between rounded-[26px] p-4 ${GLASS}`}
          >
            <div className="px-2 pt-1">
              <img
                src="/assets/logos/gnd-logo-blanc-cropped.png"
                alt="GND Consulting"
                draggable={false}
                className="w-[108px]"
              />
            </div>

            <nav className="flex flex-col gap-1.5" aria-label="Filtres galerie">
              {railItems.map(({ label, style: s, Ico }) => {
                const on = s === style;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setStyle(s)}
                    className={`group flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-left transition-all ${
                      on ? 'bg-bg/10' : 'hover:bg-bg/5'
                    }`}
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-all ${
                        on
                          ? 'bg-accent text-text-strong shadow-[0_8px_22px_rgba(232,119,44,0.4)]'
                          : 'ring-1 ring-bg/15 text-bg/70 group-hover:text-bg'
                      }`}
                    >
                      <Ico size={15} />
                    </span>
                    <span className={`flex-1 text-[10px] uppercase tracking-[0.18em] transition-colors ${on ? 'text-bg' : 'text-bg/60 group-hover:text-bg/90'}`}>
                      {label}
                    </span>
                    {on && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  /* scroll doux si la galerie photo est sur la page (réalisations),
                     sinon navigation vers la page Réalisations. Pas d'ancre hash :
                     le routeur hash traiterait #galerie-photo comme une route. */
                  const el = document.getElementById('galerie-photo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.hash = '#/realisations';
                }}
                className="group flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-left hover:bg-bg/5 transition-all"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-bg/15 text-bg/70 group-hover:text-bg transition-all">
                  <LayoutGrid size={15} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-bg/60 group-hover:text-bg/90 transition-colors">Galerie</span>
              </button>
              <button
                type="button"
                onClick={() => rootRef.current?.querySelector('[data-univers]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className="group flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 text-left hover:bg-bg/5 transition-all"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-bg/15 text-bg/70 group-hover:text-bg transition-all">
                  <Icons.Layers size={15} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-bg/60 group-hover:text-bg/90 transition-colors">Univers</span>
              </button>
            </nav>

            <div className="flex flex-col items-center gap-4 pb-1">
              <span aria-hidden className="h-px w-10 bg-bg/15" />
              <span
                aria-hidden
                className="flex size-11 items-center justify-center rounded-full bg-accent text-text-strong display text-base"
                style={{ boxShadow: '0 10px 28px rgba(232,119,44,0.35)' }}
              >
                G
              </span>
            </div>
          </aside>

          {/* VIEWER CENTRAL — panneau verre, média dominant */}
          <article
            data-anim="pv-hero"
            className={`relative rounded-[24px] md:rounded-[26px] p-2 md:p-2.5 ${GLASS}`}
          >
            <div className="relative h-full min-h-[230px] overflow-hidden rounded-[18px] md:rounded-[20px] aspect-[4/3] md:aspect-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur.id + (playing ? '-play' : '')}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {playing && cur.video ? (
                    <video
                      src={cur.video}
                      poster={cur.img}
                      autoPlay
                      controls
                      playsInline
                      className="relative h-full w-full object-contain"
                    />
                  ) : playing && cur.youtube ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${cur.youtube}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                      title={cur.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    /* poster statique (première frame extraite côté build pour les
                       mp4 — un <video preload="metadata"> téléchargeait plusieurs
                       Mo par vidéo, moov atom en fin de fichier) */
                    /* média ENTIER, jamais recadré, sans fond ajouté */
                    <img
                      src={cur.img}
                      alt={cur.title}
                      className="relative h-full w-full object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* bouton lecture si l'item est une vidéo */}
              {!playing && (cur.video || cur.youtube) && (
                <motion.button
                  type="button"
                  aria-label={`Lire ${cur.title}`}
                  onClick={() => setPlaying(true)}
                  whileHover={reduce ? undefined : { scale: 1.06 }}
                  whileTap={reduce ? undefined : { scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-text-strong"
                  style={{ boxShadow: '0 14px 40px rgba(232,119,44,0.45)' }}
                >
                  <Icons.Play size={22} />
                </motion.button>
              )}

              {/* chip média + compteur */}
              <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-text-strong/60 backdrop-blur px-3.5 py-1.5 text-[10px] tracking-[0.18em] uppercase text-bg/90 ring-1 ring-bg/10">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                {cur.video || cur.youtube ? 'Vidéo' : 'Photo'}
              </div>
              <div className="absolute top-3 right-3 rounded-full bg-text-strong/60 backdrop-blur px-3.5 py-1.5 text-[10px] label-mono ring-1 ring-bg/10">
                <span className="text-accent">{String(counterIdx + 1).padStart(2, '0')}</span>
                <span className="text-bg/60"> / {String(filtered.length).padStart(2, '0')}</span>
              </div>

              {/* pill légende — verre fumé, texte crème */}
              <div className="absolute bottom-3 left-3 right-3 md:right-auto md:max-w-[78%]">
                <div className="inline-flex max-w-full items-center gap-2.5 rounded-full bg-text-strong/60 backdrop-blur px-4 py-2.5 ring-1 ring-bg/10">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-text-strong">
                    <Icons.Plus size={13} />
                  </span>
                  <span className="truncate text-sm text-bg">
                    <span className="display">{cur.title}</span>
                    <span className="text-bg/60"> · {cur.sub}</span>
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* COLONNE DROITE — « Sélection » en bandeaux numérotés + showreel */}
          <aside
            data-anim="pv-side"
            className={`row-span-2 flex flex-col rounded-[24px] md:rounded-[26px] p-4 md:p-5 ${GLASS}`}
          >
            <p className="label-mono shrink-0 px-1 pb-4 text-bg/60">Sélection · {String(filtered.length).padStart(2, '0')}</p>
            <div className="grid grid-cols-3 gap-2.5 md:flex md:flex-1 md:flex-col md:gap-3 md:overflow-y-auto md:pr-1 no-scrollbar md:max-h-[420px]">
              {filtered.map((p, i) => {
                const on = i === counterIdx;
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Voir ${p.title}`}
                    whileHover={reduce ? undefined : { scale: 1.015 }}
                    transition={{ duration: 0.16 }}
                    className={`group relative shrink-0 overflow-hidden rounded-[14px] aspect-[4/5] md:aspect-auto md:h-[60px] ring-1 transition-all ${
                      on ? 'ring-accent shadow-[0_10px_28px_rgba(232,119,44,0.25)]' : 'ring-bg/10 hover:ring-bg/30'
                    }`}
                  >
                    <img src={p.img} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" draggable={false} />
                    {!on && <span aria-hidden className="absolute inset-0 bg-text-strong/45 transition-opacity group-hover:opacity-60" />}
                    <span
                      className={`absolute left-2 top-1/2 hidden md:flex -translate-y-1/2 size-7 items-center justify-center rounded-full text-[10px] label-mono ${
                        on ? 'bg-accent text-text-strong' : 'bg-bg/90 text-text-strong'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`absolute left-2 top-2 md:hidden flex size-6 items-center justify-center rounded-full text-[9px] label-mono ${
                        on ? 'bg-accent text-text-strong' : 'bg-bg/90 text-text-strong'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {(p.video || p.youtube) && (
                      <span aria-hidden className="absolute bottom-1.5 right-1.5 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-2.5 flex size-6 items-center justify-center rounded-full bg-text-strong/60 text-bg backdrop-blur">
                        <Icons.Play size={10} />
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => { setStyle('Tout'); setActive(0); setPlaying(true); }}
              className="mt-4 flex shrink-0 items-center justify-between rounded-[16px] border border-bg/15 px-4 py-3.5 text-[10px] uppercase tracking-[0.18em] text-bg/80 transition-all hover:border-accent/60 hover:text-bg"
            >
              Voir tout le showreel
              <Icons.ArrowUpRight size={13} />
            </button>
          </aside>

          {/* RANGÉE BASSE — « Choisir un style » + « Coup de cœur » */}
          <div className="grid gap-3 md:gap-4 md:col-start-2 md:grid-cols-[minmax(0,1fr)_252px]">
            <div data-anim="pv-bottom" data-univers className={`flex flex-col justify-between rounded-[24px] md:rounded-[26px] p-4 md:p-5 ${GLASS}`}>
              <div className="flex items-center justify-between">
                <p className="label-mono flex items-center gap-2 text-bg/70">
                  <span className="flex size-6 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Icons.Layers size={12} />
                  </span>
                  Choisir un style
                </p>
                <span className="hidden md:inline-flex items-center gap-2 text-xs text-bg/50">
                  Filtrez la galerie par univers
                  <SlidersHorizontal size={13} className="text-accent" />
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {styles.map((s) => {
                  const on = s === style;
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setStyle(s)}
                      className={`rounded-full px-4 py-2 text-xs md:text-sm transition-all ${
                        on
                          ? 'bg-bg text-text-strong shadow-[0_8px_22px_rgba(42,24,16,0.35)]'
                          : 'border border-bg/20 text-bg/70 hover:border-accent/70 hover:text-bg'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <div aria-hidden className="mt-4 flex items-center gap-1.5">
                {styles.map((s) => (
                  <span
                    key={s}
                    className={`h-1.5 rounded-full transition-all ${s === style ? 'w-5 bg-accent' : 'w-1.5 bg-bg/20'}`}
                  />
                ))}
              </div>
            </div>

            <motion.button
              data-anim="pv-bottom"
              type="button"
              onClick={() => {
                const idx = filtered.findIndex((p) => p.id === inspired.id);
                if (idx >= 0) setActive(idx);
              }}
              whileHover={reduce ? undefined : { y: -3 }}
              transition={{ duration: 0.18 }}
              className={`rounded-[24px] md:rounded-[26px] p-4 text-left ${GLASS}`}
            >
              <p className="label-mono mb-3 flex items-center justify-between text-bg/70">
                <span className="flex items-center gap-2">
                  <Icons.Sparkles size={13} className="text-accent" />
                  Coup de cœur
                </span>
                <Icons.ArrowUpRight size={13} className="text-bg/50" />
              </p>
              <span className="block overflow-hidden rounded-[14px] ring-1 ring-bg/10">
                <img src={inspired.img} alt={inspired.title} className="aspect-[16/8] md:aspect-[16/7] w-full object-cover" loading="lazy" draggable={false} />
              </span>
              <span className="mt-2.5 block truncate text-sm text-bg display">{inspired.title}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
