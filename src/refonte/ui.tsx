/* Shared UI primitives, ported to ES modules (was window-global in prototype) */
import { Icons } from './icons';

const Kicker = ({ children, className = "" }: any) => (
  <div className={"kicker " + className}>
    <span>{children}</span>
  </div>
);

const Section = ({ id, className = "", bg = "alt", children, style }: any) => (
  // Défaut "alt" → bg-bg-alt (#FFF3E8 cream chaud) = bg uniforme partout sur la home.
  // Override possible avec bg="dark" (chocolat) ou bg="white" (#FDF6EE).
  <section id={id} style={style} className={`relative ${bg === "alt" ? "bg-bg-alt" : bg === "dark" ? "bg-text-strong text-bg" : "bg-bg"} ${className}`}>
    {children}
  </section>
);

const Container = ({ children, className = "" }: any) => (
  <div className={`mx-auto w-full max-w-[1400px] px-6 md:px-10 ${className}`}>{children}</div>
);

const Btn = ({ href, onClick, children, variant = "primary", icon = true, className = "" }: any) => {
  const cls = `btn btn-${variant} focus-ring ${className}`;
  const inner = (<>
    <span>{children}</span>
    {icon && <Icons.ArrowUpRight size={16} stroke={1.8} />}
  </>);
  if (href) return <a href={href} className={cls} onClick={onClick}>{inner}</a>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
};

const SectionHeader = ({ kicker, title, intro, align = "left", actions }: any) => (
  <div className={`flex flex-col gap-5 ${align === "center" ? "items-center text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
    {kicker && <Kicker>{kicker}</Kicker>}
    <h2 className="display text-5xl md:text-6xl lg:text-7xl text-text-strong">{title}</h2>
    {intro && <p className="text-lg md:text-xl text-text leading-relaxed max-w-2xl">{intro}</p>}
    {actions && <div className="flex flex-wrap gap-3 mt-2">{actions}</div>}
  </div>
);

const ImgPlaceholder = ({ label, ratio = "16/9", className = "", rounded = "rounded-2xl" }: any) => (
  <div className={`img-placeholder ${rounded} ${className}`} style={{ aspectRatio: ratio }}>
    <span>{label}</span>
  </div>
);

/* Sculptural cream portrait placeholder, elegant marble-bust feel.
   SWAP this slot for a real generated asset at implementation. */
const PortraitHero = ({ className = "", showTag = true }: any) => (
  <div className={`relative w-full h-full ${className}`} aria-hidden="true">
    <svg viewBox="0 0 400 500" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
      style={{ filter:'drop-shadow(0 30px 60px rgba(0,0,0,.55))' }}>
      {/* warm halo behind subject */}
      <ellipse cx="200" cy="220" rx="180" ry="200" fill="#FF954F" opacity="0.18"/>

      {/* bust / shoulders */}
      <path d="M40,500 C40,400 100,355 150,350 L250,350 C300,355 360,400 360,500 Z" fill="#E8D8C5"/>
      {/* shoulder shading L+R */}
      <path d="M40,500 C40,420 90,380 130,372 L130,500 Z" fill="#7D3E2C" opacity="0.35"/>
      <path d="M360,500 C360,420 310,380 270,372 L270,500 Z" fill="#532418" opacity="0.42"/>

      {/* neck */}
      <path d="M168,302 L168,362 C168,378 182,390 200,390 C218,390 232,378 232,362 L232,302 Z" fill="#E8D8C5"/>
      <path d="M168,302 L168,362 C168,376 178,386 190,389 L190,302 Z" fill="#7D3E2C" opacity="0.3"/>
      {/* collar shadow */}
      <ellipse cx="200" cy="388" rx="46" ry="6" fill="#2A1810" opacity="0.45"/>

      {/* HEAD, base cream */}
      <ellipse cx="200" cy="200" rx="118" ry="148" fill="#FDF6EE"/>
      {/* head right-side shadow */}
      <path d="M200,52 C262,52 318,110 318,200 C318,275 268,344 200,348 Z" fill="#E8D8C5"/>
      {/* deeper shadow on right side */}
      <path d="M252,82 C290,118 318,165 318,210 C318,275 280,335 234,346 L234,82 Z" fill="#7D3E2C" opacity="0.32"/>

      {/* HAIR, smooth cap */}
      <path d="M88,178 C88,98 134,42 200,42 C266,42 312,98 312,178 C300,138 264,108 200,108 C136,108 100,138 88,178 Z" fill="#2A1810"/>
      {/* hair highlights left */}
      <path d="M96,170 C100,118 130,76 180,52 C168,72 158,98 148,128 C124,140 108,156 96,170 Z" fill="#532418" opacity="0.7"/>

      {/* visor */}
      <rect x="98" y="178" width="204" height="68" rx="34" fill="#0d0604"/>
      <rect x="98" y="178" width="204" height="68" rx="34" fill="none" stroke="#FF954F" strokeWidth="1.8" opacity="0.55"/>
      <rect x="104" y="184" width="192" height="56" rx="28" fill="#1a0a04"/>
      {/* visor inner warm glow */}
      <ellipse cx="200" cy="212" rx="90" ry="22" fill="#FF954F" opacity="0.18"/>
      {/* visor sharp highlight bar */}
      <rect x="120" y="186" width="80" height="3" rx="1.5" fill="#FDF6EE" opacity="0.45"/>
      <rect x="216" y="188" width="46" height="2" rx="1" fill="#FDF6EE" opacity="0.3"/>
      {/* tiny spec reflections */}
      <ellipse cx="138" cy="218" rx="3" ry="1.5" fill="#FFFBF4" opacity="0.55"/>
      <ellipse cx="262" cy="218" rx="2" ry="1" fill="#FFFBF4" opacity="0.35"/>

      {/* nose / lower face */}
      <path d="M194,258 L189,288 Q200,294 211,288 L206,258 Z" fill="#E8D8C5"/>
      <path d="M194,258 L189,288 Q194,292 200,292 L200,258 Z" fill="#7D3E2C" opacity="0.28"/>
      {/* lips */}
      <path d="M180,308 Q200,318 220,308 Q210,314 200,314 Q190,314 180,308 Z" fill="#7D3E2C" opacity="0.55"/>
      {/* chin shadow */}
      <ellipse cx="200" cy="334" rx="32" ry="5" fill="#7D3E2C" opacity="0.28"/>

      {/* rim light, left edge, subtle */}
      <path d="M88,205 C90,135 130,72 200,52 L200,68 C140,86 100,142 92,205 Z" fill="#FFB682" opacity="0.32"/>
    </svg>
    {showTag && (
      <div className="absolute -bottom-1 right-2 label-mono opacity-50 text-[10px] text-bg/70">[ portrait · humain × ia ]</div>
    )}
  </div>
);

const Stat = ({ value, label, sub }: any) => (
  <div className="flex flex-col gap-2 border-t hairline border-t pt-5">
    <div className="num-display text-5xl md:text-6xl text-text-strong">{value}</div>
    <div className="text-sm text-text-muted">{label}</div>
    {sub && <div className="label-mono">{sub}</div>}
  </div>
);

const Chip = ({ children, dot }: any) => (
  <span className="chip">
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>}
    {children}
  </span>
);

const Tag = ({ children }: any) => (
  <span className="label-mono px-2 py-1 rounded bg-surface/60 text-text">{children}</span>
);

/* FAQ item */
const Faq = ({ q, a }: any) => (
  <details className="border-b hairline border-b group">
    <summary className="flex items-start justify-between gap-6 py-6 select-none">
      <span className="faq-q display text-2xl md:text-3xl text-text-strong leading-tight max-w-2xl">{q}</span>
      <span className="faq-icon shrink-0 mt-1 flex h-10 w-10 items-center justify-center rounded-full border hairline border bg-bg text-text-strong">
        <Icons.Plus size={16} />
      </span>
    </summary>
    {/* contenu toujours monté (SEO/pré-rendu) + ouverture fluide via CSS */}
    <div className="faq-content">
      <div className="faq-content-inner">
        <div className="pb-6 max-w-3xl text-text leading-relaxed">{a}</div>
      </div>
    </div>
  </details>
);

/* CTA band (re-usable bottom block) */
const CtaBand = ({ title = "Créons l'impact ensemble.", sub, cta = "Lancer un projet", href = "/contact" }: any) => (
  <Section bg="alt" className="py-28 md:py-40">
    <Container className="text-center">
      <div className="kicker mx-auto inline-flex">contactez-nous</div>
      <h2 className="display text-6xl md:text-8xl lg:text-9xl mt-6 text-text-strong">{title}</h2>
      {sub && <p className="mt-6 text-lg text-text max-w-2xl mx-auto">{sub}</p>}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Btn href={href} variant="primary">{cta}</Btn>
        <Btn href="/realisations" variant="secondary">Voir nos réalisations</Btn>
      </div>
    </Container>
  </Section>
);

/* CINEMATIC HERO, shared shell across all service / sub pages.
   Dark stage (default), intense orange halo, sculptural feature, floating chips.
   `theme="light"` → cream stage matching HeroBuildUpBranding / HeroBuildUpSV / Home
   (used by AudiovisuelPage to align with cream-hero cluster).
   Pass `media` for a custom right-column visual (defaults to PortraitHero). */
const CinematicHero = ({ kicker, eyebrow, title, subtitle, ctas, badges, media, footerLabel, theme = 'dark', bgImage, mediaAnchor }: any) => {
  const light = theme === 'light';
  return (
  <section className={`relative min-h-[88vh] overflow-hidden pt-24 md:pt-32 pb-12 ${light ? 'bg-bg-alt text-text-strong' : 'bg-text-strong text-bg'}`}>
    {/* Cinematic background */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {light ? (
        <>
          <div className="absolute inset-0"
            style={{ background:'radial-gradient(ellipse 80% 90% at 50% 50%, rgba(255,149,79,0.18) 0%, transparent 75%)' }}></div>
          <div className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{ backgroundImage:'radial-gradient(rgba(42,24,16,.05) 1px, transparent 1px)', backgroundSize:'3px 3px' }}></div>
        </>
      ) : bgImage ? (
        <>
          {/* Image de fond (ex : même fond que le Hero #2 de la home) + dégradé
              gauche→droite sombre pour la lisibilité du texte à gauche, le fond
              reste visible à droite derrière le sujet. */}
          <img src={bgImage} alt="" aria-hidden draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none" />
          <div className="absolute inset-0"
            style={{ background:'linear-gradient(90deg, rgba(26,13,8,.93) 0%, rgba(26,13,8,.74) 38%, rgba(26,13,8,.42) 70%, rgba(26,13,8,.32) 100%)' }}></div>
          <div className="absolute inset-0"
            style={{ boxShadow:'inset 0 0 200px 70px rgba(0,0,0,.45)' }}></div>
        </>
      ) : (
        <>
          <div className="absolute inset-0"
            style={{ background:'radial-gradient(ellipse 70% 70% at 75% 50%, rgba(255,149,79,.75) 0%, rgba(232,119,44,.4) 22%, rgba(120,40,14,.45) 55%, #1a0d08 85%)' }}></div>
          <div className="absolute inset-0 opacity-35 mix-blend-overlay"
            style={{ backgroundImage:'radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)', backgroundSize:'3px 3px' }}></div>
          <div className="absolute inset-0"
            style={{ boxShadow:'inset 0 0 240px 80px rgba(0,0,0,.55)' }}></div>
        </>
      )}
    </div>

    {/* Sujet ancré en bas (mediaAnchor="bottom") : grand, incrusté au bas du hero
        comme le personnage du Hero #2 de la home. Absolu / section, clippé par
        overflow-hidden → le bas du visuel s'arrête au bas du hero. */}
    {media && mediaAnchor === 'bottom' && (
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 z-[6] flex items-end justify-end w-[80%] sm:w-[60%] lg:w-[52%] max-w-[700px]">
        {media}
      </div>
    )}

    {/* top breadcrumb */}
    {eyebrow && (
      <div className="relative z-10 mb-12">
        <Container>
          <div className={`flex items-center justify-between ${light ? 'text-text-muted' : 'text-bg/65'}`}>
            <div className="flex items-center gap-3 text-xs label-mono">
              <a href="/" className="hover:text-accent">accueil</a>
              <span className="opacity-40">/</span>
              <span className={light ? 'text-text-strong/85' : 'text-bg/85'}>{eyebrow}</span>
            </div>
            <span className={`chip backdrop-blur ${light ? '!bg-text-strong/8 !text-text-strong/85' : '!bg-bg/10 !text-bg/85'}`}><span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span> Studio actif</span>
          </div>
        </Container>
      </div>
    )}

    <Container className="relative z-10">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className={media ? "lg:col-span-7" : "lg:col-span-12 max-w-4xl"}>
          {kicker && <Kicker className={light ? '!text-text-muted' : '!text-bg/55'}>{kicker}</Kicker>}
          <h1 className={`display text-6xl md:text-8xl lg:text-[7.5rem] mt-6 leading-[.88] tracking-huge ${light ? 'text-text-strong' : 'text-bg'}`}>{title}</h1>
          {subtitle && <p className={`mt-8 text-lg md:text-xl leading-relaxed max-w-xl ${light ? 'text-text' : 'text-bg/80'}`}>{subtitle}</p>}
          {badges && (
            <div className="mt-7 flex flex-wrap gap-2">
              {badges.map((b: any) => <span key={b} className={`chip backdrop-blur ${light ? '!bg-text-strong/8 !text-text-strong/85' : '!bg-bg/10 !text-bg/85'}`}><span className="w-1.5 h-1.5 rounded-full bg-accent"></span>{b}</span>)}
            </div>
          )}
          {ctas && <div className="mt-9 flex flex-wrap gap-3">{ctas}</div>}
        </div>
        {/* media slot — rendu uniquement si un visuel est fourni (plus de
            PortraitHero "brouillon" par défaut, qui venait de la maquette). */}
        {media && mediaAnchor !== 'bottom' && (
          <div className="lg:col-span-5 relative">
            <div className="relative">{media}</div>
          </div>
        )}
      </div>

      {footerLabel && (
        <div className={`mt-16 border-t pt-5 flex items-center justify-between text-xs label-mono ${light ? 'border-text-strong/10 text-text-muted' : 'border-bg/10 text-bg/55'}`}>
          <span><Icons.ArrowDown size={12} className="inline scroll-pulse"/> scroll · découvrir</span>
          <span>{footerLabel}</span>
          <span>est. 2025 · paris · fr</span>
        </div>
      )}
    </Container>
  </section>
  );
};

/* BigHeading, kicker + huge title with italic accent. Used across pages. */
const BigHeading = ({ kicker, eyebrowEnd, title, intro, dark = false, align = "left" }: any) => (
  <div className={`flex flex-col ${align === "right" ? "md:flex-row md:items-end md:justify-between" : "md:flex-row md:items-end md:justify-between"} gap-8 mb-14`}>
    <div className="max-w-3xl">
      {kicker && <Kicker className={dark ? "!text-bg/55" : ""}>{kicker}</Kicker>}
      <h2 className={`display text-5xl md:text-7xl lg:text-8xl mt-5 leading-[.9] ${dark ? "text-bg" : "text-text-strong"}`}>{title}</h2>
    </div>
    {intro && <p className={`max-w-md ${dark ? "text-bg/70" : "text-text"} md:text-right leading-relaxed`}>{intro}</p>}
    {eyebrowEnd && <div className={`${dark ? "text-bg/55" : "text-text-muted"} label-mono`}>{eyebrowEnd}</div>}
  </div>
);

export {
  Kicker, Section, Container, Btn, SectionHeader, ImgPlaceholder,
  PortraitHero, Stat, Chip, Tag, Faq, CtaBand, CinematicHero, BigHeading,
};
