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
};

const STYLES = ['Tout', 'Portrait', 'Studio', 'Événementiel', 'Urbain'];

const SearchGlyph = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
  </svg>
);

export function PhotoViewer({ photos }: { photos: ViewerPhoto[] }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [style, setStyle] = React.useState('Tout');
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);

  const filtered = React.useMemo(() => {
    let r = photos;
    if (style !== 'Tout') {
      const byStyle = r.filter((p) => p.sub.toLowerCase().includes(style.toLowerCase()));
      if (byStyle.length) r = byStyle;
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      const byQ = r.filter((p) => (p.title + ' ' + p.sub).toLowerCase().includes(q));
      if (byQ.length) r = byQ;
    }
    return r;
  }, [photos, style, query]);

  React.useEffect(() => setActive(0), [style, query]);

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

  const railIcons: { label: string; Ico: any; onClick?: () => void }[] = [
    { label: 'Toutes les photos', Ico: Icons.Layers, onClick: () => { setStyle('Tout'); setQuery(''); } },
    { label: 'Portraits', Ico: Icons.Users, onClick: () => setStyle('Portrait') },
    { label: 'Studio', Ico: Icons.Camera, onClick: () => setStyle('Studio') },
    { label: 'Événementiel', Ico: Icons.Film, onClick: () => setStyle('Événementiel') },
    { label: 'Direction artistique', Ico: Icons.Palette },
  ];

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
        className="relative rounded-[40px] md:rounded-[48px] bg-[#1C120D] p-2.5 md:p-4 ring-1 ring-bg/10"
        style={{ boxShadow: '0 30px 90px rgba(42,24,16,0.32)' }}
      >
        {/* Encoche réelle : cercle couleur de page à cheval sur le bord gauche */}
        <span
          aria-hidden
          className="hidden md:block pointer-events-none absolute left-0 top-1/2 z-10 size-[76px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg"
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
        <div className="grid gap-2.5 md:gap-4 rounded-[30px] md:rounded-[34px] bg-[#2A1810] p-2.5 md:p-4 md:min-h-[620px] md:grid-cols-[88px_minmax(0,1fr)_260px] md:grid-rows-[minmax(0,1fr)_180px]">
          {/* RAIL UTILITAIRE GAUCHE */}
          <aside
            data-anim="pv-rail"
            className="row-span-2 hidden md:flex flex-col items-center justify-between rounded-[26px] bg-bg-alt p-3"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-text-strong text-bg">
              <Icons.Sparkles size={16} />
            </span>
            <div className="flex flex-col items-center gap-2">
              {railIcons.map(({ label, Ico, onClick }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={onClick}
                  className="flex size-11 items-center justify-center rounded-full text-text transition-colors hover:bg-surface hover:text-text-strong"
                >
                  <Ico size={17} />
                </button>
              ))}
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
            className="relative overflow-hidden rounded-[24px] md:rounded-[26px] bg-surface aspect-[4/3] md:aspect-auto"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={cur.id}
                src={cur.img}
                alt={cur.title}
                initial={reduce ? false : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </AnimatePresence>
            {/* voiles haut/bas légers */}
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,18,13,0.22)_0%,transparent_28%,transparent_62%,rgba(28,18,13,0.38)_100%)]" />
            {/* chip + compteur */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-text-strong/70 backdrop-blur px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-bg/90">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Photo
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
          <aside data-anim="pv-side" className="flex flex-col gap-2.5 md:gap-3 rounded-[24px] md:rounded-[26px] bg-bg-alt p-2.5 md:p-3">
            <label className="relative block shrink-0">
              <span className="sr-only">Rechercher une photo</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher"
                className="h-11 w-full rounded-full border border-surface bg-white/80 pl-4 pr-10 text-sm text-text-strong placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                <SearchGlyph />
              </span>
            </label>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-2.5 md:overflow-y-auto md:max-h-[340px] no-scrollbar">
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
                    <img src={p.img} alt="" className="h-full w-full object-cover" loading="lazy" draggable={false} />
                    {!on && <span aria-hidden className="absolute inset-0 bg-text-strong/35" />}
                    <span className={`absolute left-2 top-2 flex size-7 items-center justify-center rounded-full text-[10px] label-mono ${on ? 'bg-accent text-text-strong' : 'bg-bg-alt/90 text-text'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </aside>

          {/* RANGÉE BASSE : styles + coup de cœur */}
          <div className="grid gap-2.5 md:gap-4 md:col-span-2 md:grid-cols-[minmax(0,1fr)_260px]">
            <div data-anim="pv-bottom" className="rounded-[24px] md:rounded-[26px] bg-bg-alt p-4 md:p-5">
              <p className="label-mono mb-3 flex items-center gap-2 text-text-muted">
                <Icons.Layers size={13} className="text-accent" />
                Choisir un style
              </p>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => {
                  const on = s === style;
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setStyle(s)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs md:text-sm transition-colors ${
                        on
                          ? 'border-accent bg-accent/15 text-text-strong'
                          : 'border-text-strong/12 text-text-muted hover:border-accent/60 hover:text-text-strong'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
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
                <img src={inspired.img} alt={inspired.title} className="aspect-[16/8] md:aspect-[16/7] w-full object-cover" loading="lazy" draggable={false} />
              </span>
              <span className="mt-2 block truncate text-sm text-text-strong display">{inspired.title}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
