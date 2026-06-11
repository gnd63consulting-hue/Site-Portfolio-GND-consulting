/* PhotoViewer V2 — tablette immersive (recette "ImmersiveTabletShowcase" du
 * dossier technique, réf. bee_ui.ux) adaptée charte GND :
 *   coque chocolat profond très arrondie + encoche réelle (cercle couleur de
 *   page à cheval sur le bord) + bouton circulaire monté sur l'encoche,
 *   rail utilitaire vertical gauche, viewer central avec pill légende,
 *   colonne droite (recherche + vignettes numérotées), rangée basse
 *   « Choisir un style » + « Coup de cœur ».
 * Motion : GSAP entrée au scroll (once) · Motion pour les hovers
 * (useReducedMotion respecté). Visible par défaut sans JS.
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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

  // Rail = raccourcis réels vers les filtres, avec état actif visible.
  const ICON_MAP: Record<string, any> = {
    Tout: Icons.Layers,
    Portrait: Icons.Users,
    Studio: Icons.Camera,
    'Événementiel': Icons.Film,
    Urbain: Icons.Palette,
    Clip: Icons.Play,
    Live: Icons.Zap,
    Production: Icons.Film,
  };
  const railIcons = styles.map((s) => ({
    label: s === 'Tout' ? 'Toute la sélection' : s,
    style: s,
    Ico: ICON_MAP[s] ?? Icons.Sparkles,
  }));

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[1180px]">
      {/* halo chaud */}
      <div
        aria-hidden
        className="absolute -inset-8 md:-inset-12 rounded-[64px] pointer-events-none"
        style={{ background: 'radial-gradient(60% 60% at 50% 45%, rgba(255,149,79,0.16) 0%, transparent 70%)', filter: 'blur(32px)' }}
      />

      {/* COQUE */}
      <div
        data-anim="pv-shell"
        className="relative rounded-[40px] md:rounded-[48px] bg-text-strong p-2.5 md:p-4 ring-1 ring-bg/10"
        style={{ boxShadow: '0 30px 90px rgba(42,24,16,0.32)' }}
      >
        {/* Encoche réelle : cercle EXACTEMENT couleur de la section (bg-alt) à
            cheval sur le bord gauche — un mismatch crée un halo blanc visible. */}
        <span
          aria-hidden
          className="hidden md:block pointer-events-none absolute left-0 top-1/2 z-10 size-[76px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg-alt"
        />
        <motion.button
          type="button"
          aria-label="Galerie photo GND"
          whileHover={reduce ? undefined : { scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          transition={{ duration: 0.18 }}
          className="hidden md:flex absolute left-0 top-1/2 z-20 size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg-alt text-text-strong border border-surface/80"
          style={{ boxShadow: '0 10px 30px rgba(83,36,24,0.18)' }}
        >
          <Icons.Camera size={18} />
        </motion.button>

        {/* ÉCRAN */}
        {/* Écran : MÊME chocolat charte que la coque (un seul ton, pas de
            double fond marron/noir) — les cartes crème font le contraste. */}
        <div className="grid gap-2.5 md:gap-4 rounded-[30px] md:rounded-[34px] p-1 md:p-2 md:min-h-[620px] md:grid-cols-[88px_minmax(0,1fr)_260px] md:grid-rows-[minmax(0,1fr)_180px]">
          {/* RAIL UTILITAIRE GAUCHE */}
          <aside
            data-anim="pv-rail"
            className="row-span-2 hidden md:flex flex-col items-center justify-between rounded-[26px] bg-bg-alt p-3"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-text-strong text-bg">
              <Icons.Sparkles size={16} />
            </span>
            <div className="flex flex-col items-center gap-1.5">
              {railIcons.map(({ label, style: s, Ico }) => {
                const on = s === style;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    aria-pressed={on}
                    title={label}
                    onClick={() => setStyle(s)}
                    className={`flex size-11 items-center justify-center rounded-full transition-all ${
                      on
                        ? 'bg-text-strong text-bg shadow-[0_6px_18px_rgba(42,24,16,0.28)]'
                        : 'text-text-muted hover:bg-surface hover:text-text-strong'
                    }`}
                  >
                    <Ico size={18} stroke={1.7} />
                  </button>
                );
              })}
            </div>
            <span
              aria-hidden
              className="flex size-11 items-center justify-center rounded-full bg-accent text-text-strong display text-base"
            >
              G
            </span>
          </aside>

          {/* VIEWER CENTRAL */}
          <article
            data-anim="pv-hero"
            className="relative overflow-hidden rounded-[24px] md:rounded-[26px] aspect-[4/3] md:aspect-auto"
          >
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
                ) : cur.video ? (
                  /* poster = PREMIÈRE FRAME réelle, seule, sans fond ajouté */
                  <video
                    src={`${cur.video}#t=0.1`}
                    preload="metadata"
                    muted
                    playsInline
                    className="relative h-full w-full object-contain"
                  />
                ) : (
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
            {/* chip + compteur */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-text-strong/70 backdrop-blur px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-bg/90">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {cur.video || cur.youtube ? 'Vidéo' : 'Photo'}
            </div>
            <div className="absolute top-3 right-3 rounded-full bg-text-strong/70 backdrop-blur px-3 py-1.5 text-[10px] label-mono text-bg/80">
              {String(Math.min(active, filtered.length - 1) + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
            </div>
            {/* pill légende façon prompt-bar */}
            <div className="absolute bottom-3 left-3 right-3 md:right-auto md:max-w-[78%]">
              <div className="inline-flex max-w-full items-center gap-2.5 rounded-full bg-bg/95 backdrop-blur px-4 py-2.5 shadow-lg">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-text-strong">
                  <Icons.Plus size={13} />
                </span>
                <span className="truncate text-sm text-text-strong">
                  <span className="display">{cur.title}</span>
                  <span className="text-text-muted"> · {cur.sub}</span>
                </span>
              </div>
            </div>
          </article>

          {/* COLONNE DROITE : recherche + vignettes numérotées */}
          <aside data-anim="pv-side" className="flex flex-col gap-3 md:gap-4 rounded-[24px] md:rounded-[26px] bg-bg-alt p-3 md:p-4">
            <p className="label-mono shrink-0 px-1 pt-0.5 text-text-muted">Sélection · {String(filtered.length).padStart(2, '0')}</p>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-2.5 md:gap-3.5 md:overflow-y-auto md:max-h-[420px] md:pr-1 no-scrollbar">
              {filtered.map((p, i) => {
                const on = i === Math.min(active, filtered.length - 1);
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Voir ${p.title}`}
                    whileHover={reduce ? undefined : { scale: 1.02 }}
                    transition={{ duration: 0.16 }}
                    className={`group relative overflow-hidden rounded-[16px] md:rounded-[18px] aspect-[4/5] md:aspect-[16/10] ring-2 transition-colors ${
                      on ? 'ring-accent' : 'ring-transparent hover:ring-accent/50'
                    }`}
                  >
                    {p.video ? (
                      <video
                        src={`${p.video}#t=0.1`}
                        preload="metadata"
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img src={p.img} alt="" className="h-full w-full object-cover" loading="lazy" draggable={false} />
                    )}
                    {!on && <span aria-hidden className="absolute inset-0 bg-text-strong/35" />}
                    <span className={`absolute left-2 top-2 flex size-7 items-center justify-center rounded-full text-[10px] label-mono ${on ? 'bg-accent text-text-strong' : 'bg-bg-alt/90 text-text'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {(p.video || p.youtube) && (
                      <span aria-hidden className="absolute bottom-2 right-2 flex size-6 items-center justify-center rounded-full bg-text-strong/70 text-bg backdrop-blur">
                        <Icons.Play size={10} />
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </aside>

          {/* RANGÉE BASSE : styles + coup de cœur */}
          <div className="grid gap-2.5 md:gap-4 md:col-span-2 md:grid-cols-[minmax(0,1fr)_260px]">
            <div data-anim="pv-bottom" className="flex flex-col justify-between rounded-[24px] md:rounded-[26px] bg-bg-alt p-4 md:p-5">
              <div className="flex items-center justify-between">
                <p className="label-mono flex items-center gap-2 text-text-muted">
                  <span className="flex size-6 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
                    <Icons.Layers size={12} />
                  </span>
                  Choisir un style
                </p>
                <span className="hidden md:inline text-xs text-text-muted">Filtrez la galerie par univers</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
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
                          ? 'bg-text-strong text-bg shadow-[0_8px_22px_rgba(42,24,16,0.25)]'
                          : 'border border-text-strong/12 bg-bg/60 text-text-muted hover:border-accent/60 hover:text-text-strong'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <div aria-hidden className="mt-3.5 flex items-center gap-1.5">
                {styles.map((s) => (
                  <span
                    key={s}
                    className={`h-1.5 rounded-full transition-all ${s === style ? 'w-5 bg-accent' : 'w-1.5 bg-text-strong/15'}`}
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
              className="rounded-[24px] md:rounded-[26px] bg-bg-alt p-3.5 md:p-4 text-left"
            >
              <p className="label-mono mb-2.5 flex items-center justify-between text-text-muted">
                <span className="flex items-center gap-2">
                  <Icons.Sparkles size={13} className="text-accent" />
                  Coup de cœur
                </span>
                <Icons.ArrowUpRight size={13} className="text-text-muted" />
              </p>
              <span className="block overflow-hidden rounded-[16px] md:rounded-[18px]">
                {inspired.video ? (
                  <video
                    src={`${inspired.video}#t=0.1`}
                    preload="metadata"
                    muted
                    playsInline
                    className="aspect-[16/8] md:aspect-[16/7] w-full object-cover"
                  />
                ) : (
                  <img src={inspired.img} alt={inspired.title} className="aspect-[16/8] md:aspect-[16/7] w-full object-cover" loading="lazy" draggable={false} />
                )}
              </span>
              <span className="mt-2 block truncate text-sm text-text-strong display">{inspired.title}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
