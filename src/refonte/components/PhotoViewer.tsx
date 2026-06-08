/* PhotoViewer — visionneuse photo "device" (inspiration UI tablette Pinterest)
 * adaptée à la charte GND : cadre arrondi chocolat + bouton circulaire latéral,
 * image principale, rail de miniatures numérotées à droite, et deux cartes en
 * bas (« Choisir un style » = filtres + « Coup de cœur » = mise en avant).
 * Responsive : desktop = device 2 colonnes ; mobile = empilé, rail horizontal.
 */
import * as React from 'react';
import { Icons } from '../icons';

export type ViewerPhoto = {
  id: string;
  title: string;
  sub: string;
  img: string;
  ratio?: string;
};

// Styles dérivés des sous-titres (Portrait · Studio, Événementiel · Reportage…)
const STYLES = ['Tout', 'Portrait', 'Studio', 'Événementiel', 'Urbain'];

export function PhotoViewer({ photos }: { photos: ViewerPhoto[] }) {
  const [style, setStyle] = React.useState('Tout');
  const [active, setActive] = React.useState(0);

  const filtered = React.useMemo(() => {
    if (style === 'Tout') return photos;
    const r = photos.filter((p) => p.sub.toLowerCase().includes(style.toLowerCase()));
    return r.length ? r : photos;
  }, [photos, style]);

  React.useEffect(() => setActive(0), [style]);

  const cur = filtered[Math.min(active, filtered.length - 1)] || photos[0];
  // « Coup de cœur » : 1re photo d'une autre série que l'active.
  const inspired = filtered.find((p) => p.id !== cur.id) || photos[1] || cur;

  if (!cur) return null;

  return (
    <div className="relative mx-auto w-full max-w-[1180px]">
      {/* halo chaud derrière le device */}
      <div
        className="absolute -inset-6 md:-inset-10 rounded-[60px] pointer-events-none"
        style={{ background: 'radial-gradient(60% 60% at 50% 45%, rgba(255,149,79,0.18) 0%, transparent 70%)', filter: 'blur(30px)' }}
        aria-hidden
      />

      {/* DEVICE */}
      <div className="relative rounded-[34px] md:rounded-[40px] bg-text-strong p-2.5 md:p-3 shadow-2xl shadow-text-strong/40 ring-1 ring-bg/10">
        {/* bouton circulaire latéral gauche (le "pied / point") */}
        <button
          type="button"
          aria-label="Galerie photo GND"
          className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-text-strong ring-1 ring-bg/15 items-center justify-center z-20 shadow-xl text-bg/80 hover:text-accent transition-colors"
        >
          <Icons.Camera size={18} />
        </button>

        {/* écran */}
        <div className="rounded-[26px] md:rounded-[30px] overflow-hidden bg-[#150a05] p-2.5 md:p-4">
          {/* haut : image principale + rail */}
          <div className="grid lg:grid-cols-12 gap-2.5 md:gap-4">
            {/* image principale */}
            <div className="lg:col-span-8">
              <div className="relative rounded-2xl overflow-hidden bg-black/40 aspect-[16/11] md:aspect-[16/10]">
                <img
                  key={cur.id}
                  src={cur.img}
                  alt={cur.title}
                  className="w-full h-full object-cover anim-up"
                  loading="lazy"
                  draggable={false}
                />
                {/* pastille catégorie haut-gauche */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-text-strong/70 backdrop-blur px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase text-bg/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Photo
                </div>
                {/* compteur haut-droite */}
                <div className="absolute top-3 right-3 rounded-full bg-text-strong/70 backdrop-blur px-3 py-1.5 text-[10px] label-mono text-bg/80">
                  {String(Math.min(active, filtered.length - 1) + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                </div>
                {/* titre bas */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/35 to-transparent">
                  <div className="display text-2xl md:text-4xl text-bg leading-tight">{cur.title}</div>
                  <div className="mt-1 text-bg/70 text-xs md:text-sm">{cur.sub}</div>
                </div>
              </div>
            </div>

            {/* rail miniatures */}
            <div className="lg:col-span-4 flex lg:flex-col gap-2.5 md:gap-3 overflow-x-auto lg:overflow-visible -mx-0.5 px-0.5 lg:mx-0 lg:px-0 lg:max-h-[420px] lg:overflow-y-auto no-scrollbar">
              {filtered.map((p, i) => {
                const on = i === Math.min(active, filtered.length - 1);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative shrink-0 w-24 lg:w-full aspect-[4/3] rounded-xl overflow-hidden transition-all ring-2 ${
                      on ? 'ring-accent' : 'ring-transparent hover:ring-bg/25'
                    }`}
                  >
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" draggable={false} />
                    <span className={`absolute top-1.5 left-1.5 rounded-md px-1.5 py-0.5 text-[9px] label-mono ${on ? 'bg-accent text-text-strong' : 'bg-text-strong/70 text-bg/85'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {!on && <span className="absolute inset-0 bg-text-strong/35" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* bas : carte filtres + carte coup de cœur */}
          <div className="grid lg:grid-cols-12 gap-2.5 md:gap-4 mt-2.5 md:mt-4">
            {/* Choisir un style */}
            <div className="lg:col-span-8 rounded-2xl bg-bg-alt p-4 md:p-5">
              <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-text-muted">
                <Icons.Layers size={13} className="text-accent" />
                Choisir un style
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {STYLES.map((s) => {
                  const on = s === style;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs md:text-sm transition-colors ${
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

            {/* Coup de cœur */}
            <button
              type="button"
              onClick={() => {
                const idx = filtered.findIndex((p) => p.id === inspired.id);
                if (idx >= 0) setActive(idx);
              }}
              className="lg:col-span-4 group relative rounded-2xl overflow-hidden bg-text-strong text-left min-h-[120px]"
            >
              <img src={inspired.img} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-70 transition-opacity" draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-text-strong/90 via-text-strong/50 to-transparent" />
              <div className="relative p-4 md:p-5 h-full flex flex-col justify-between">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-accent">
                  <Icons.Sparkles size={13} />
                  Coup de cœur
                </div>
                <div>
                  <div className="display text-lg text-bg leading-tight">{inspired.title}</div>
                  <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-bg/75">
                    Voir <Icons.ArrowUpRight size={13} />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
