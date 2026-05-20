/* Home / Accueil — Cinematic edition — ported to ES modules + REAL gsap/ScrollTrigger */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { CircularGallery, type GalleryItem } from '../../components/ui/circular-gallery-2';
import { Section, Container, Kicker, Btn, PortraitHero, Tag, Faq, CtaBand } from '../ui';
import { Icons } from '../icons';

/* Real portfolio — source: live src/data/videosData.js (9 real video projects).
   Media is lazy / poster-first / click-to-play (jamais bloquant — cf. bug Supabase 24 s du live). */
const SB = "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/";
const COVER = SB + "portfolio-photos/gnd-cover.png";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

const PROJECTS = [
  { id: "esther-seems", title: "Esther Seems", subtitle: "BOBINE", tag: "Clip musical", year: "2024", ratio: "4/5", credit: "Réalisation · Jonathan Ransau", img: yt("6oaO6YoWjyQ"), youtube: "6oaO6YoWjyQ", desc: "Clip musical de l'artiste Esther Seems — esthétique hip-hop/R&B sobre et émotive, en hommage à un proche disparu. En collaboration avec AMS Visions." },
  { id: "trinity-rebel", title: "Trinity Rebel ft Dafxcx", subtitle: "L'Univers Officiel", tag: "Clip musical", year: "2025", ratio: "4/5", credit: "Réalisation · Julien Ancieaux", img: COVER, video: SB + "portfolio-videos/trinity_rebel_univers_officiel.mp4", desc: "Clip musical officiel — sonorités chaleureuses et festives, inspirées des rythmes urbains et caribéens." },
  { id: "sabay-2023", title: "Sabay Festival 2023", subtitle: "Grande Pagode de Vincennes", tag: "Événementiel", year: "2023", ratio: "16/9", credit: "Production · GND Consulting", img: "https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg", youtube: "Vyhz7_D4fFU", desc: "Captation et aftermovie officiel du Sabay Festival — traditions cambodgiennes, Grande Pagode de Vincennes." },
  { id: "concert-ali", title: "Concert Ali 45 Scientific", subtitle: "Café LaPêche · Montreuil", tag: "Captation live", year: "2024", ratio: "3/4", credit: "Captation · IAMTV / O2M / GND", img: COVER, video: SB + "portfolio-videos/Concert%20Ali.mp4", desc: "Captation live du concert d'Ali, cofondateur du collectif 45 Scientific aux côtés de Booba." },
  { id: "leyel-miel", title: "Leyel — Miel", subtitle: "Clip officiel", tag: "Clip musical", year: "2025", ratio: "4/5", credit: "Réalisation · Jonathan Ransau", img: yt("UbXQim7iNLI"), youtube: "UbXQim7iNLI", desc: "Clip officiel de l'artiste Leyel — variété française, mise en scène délicate. Collaboration O2M." },
  { id: "cook-soul", title: "Cook & Soul", subtitle: "Kaoutar · Pékin Express", tag: "Production", year: "2024", ratio: "16/9", credit: "Réalisation · Gwen Templier", img: yt("galhl8_dYyk"), youtube: "galhl8_dYyk", desc: "Émission musicale produite pour IAMTV, avec Kaoutar (Pékin Express). Collaboration O2M." },
  { id: "yungcally", title: "Yungcally", subtitle: "Clip officiel", tag: "Clip musical", year: "2024", ratio: "1/1", credit: "Réalisation · Jonathan Ransau", img: COVER, video: SB + "portfolio-videos/jyfviku.mp4", desc: "Clip officiel de Yungcally, jeune artiste franco-américain — vibe Wiz Khalifa / Post Malone." },
  { id: "sabay-2022", title: "Sabay Festival 2022", subtitle: "Grande Pagode de Vincennes", tag: "Événementiel", year: "2022", ratio: "4/3", credit: "Production · GND Consulting", img: COVER, video: SB + "portfolio-videos/Thiek%20au%20Sabay%20Festival%202022%20Haute%20def%204k%20v2.mp4", desc: "Aftermovie officiel du Sabay Festival 2022 — captation 4K." },
  { id: "lanecdote", title: "L'Anecdote", subtitle: "Émission · interviews", tag: "Production", year: "2024", ratio: "16/9", credit: "Réalisation · GND Consulting", img: "https://img.youtube.com/vi/AGC_2cFHE_0/hqdefault.jpg", youtube: "AGC_2cFHE_0", desc: "Émission L'Anecdote — format original mêlant interviews et moments de partage." },
];

const SERVICES_CARDS = [
  { num: "01", title: "Sites Vitrines", desc: "Sites professionnels clé en main, livrés en 1 à 2 semaines.", to: "#/services/sites-vitrines" },
  { num: "02", title: "Design & Identité Visuelle", desc: "Logos, chartes graphiques, supports imprimés sur-mesure.", to: "#/services/design-identite-visuelle" },
  { num: "03", title: "Motion Design", desc: "Animation 2D / 3D, habillages et formats sociaux.", to: "#/services/motion-design" },
  { num: "04", title: "Production Audiovisuelle", desc: "Captation 4K/8K, montage et post-production cinéma.", to: "#/services/production-audiovisuelle" },
  { num: "05", title: "Photographie", desc: "Direction artistique, branding, e-commerce, événement.", to: "#/services/photographie" },
  { num: "06", title: "Automatisation & IA", desc: "Workflows intelligents, agents IA, audit & adoption.", to: "#/services/automatisation-ia" },
];

const VALUES = [
  { num: "01", title: "Passion", desc: "Un métier, pas une prestation. Chaque projet porte une intention." },
  { num: "02", title: "Fiabilité", desc: "Délais tenus, points d'étape clairs, livrables documentés." },
  { num: "03", title: "Innovation", desc: "IA & automatisation intégrées à la chaîne créative, jamais subies." },
  { num: "04", title: "Collaboration", desc: "Co-création réelle : votre métier guide la création." },
];

/* ===================== HERO — cinematic, dramatic ===================== */
function HeroHome() {
  const [mx, setMx] = React.useState(0);
  const [my, setMy] = React.useState(0);
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMx(x); setMy(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative min-h-[760px] h-screen overflow-hidden bg-bg-alt text-text-strong flex flex-col">
      {/* Cinematic background — soft cream stage with warm orange halo kept as a touche
          (chocolat dominant removed → fond crème respire ; halo subtil au centre) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0"
          style={{ background:'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(255,149,79,.55) 0%, rgba(232,119,44,.22) 28%, transparent 65%)' }}></div>
        <div className="absolute inset-0"
          style={{ background:'radial-gradient(ellipse 90% 50% at 50% 110%, rgba(255,149,79,.14) 0%, transparent 60%)' }}></div>
        <div className="absolute inset-0"
          style={{ boxShadow:'inset 0 0 220px 80px rgba(83,36,24,.05)' }}></div>
      </div>

      {/* Top bar */}
      <div className="relative z-20 pt-16 md:pt-20 shrink-0">
        <Container>
          <div className="flex items-center justify-between py-3 text-text-muted">
            <div className="flex items-center gap-3 text-xs label-mono">
              <span className="text-text-strong">studio créatif</span>
              <span className="opacity-30">/</span>
              <span>paris · fr</span>
              <span className="opacity-30">/</span>
              <span className="hidden sm:inline">est. 2024</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="chip !bg-text-strong/8 !text-text-strong backdrop-blur"><span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span> En production</span>
            </div>
          </div>
        </Container>
      </div>

      {/* MAIN STAGE */}
      <div className="relative flex-1 z-10 min-h-0">
        {/* Wordmark — sized to viewport height, fills the screen horizontally */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h1
            className="display whitespace-nowrap text-text-strong leading-[.78] tracking-huge"
            style={{
              fontSize:'min(58vh, 30vw)',
              transform:`translate(${mx * -10}px, ${my * -8}px)`,
              textShadow:'0 6px 40px rgba(83,36,24,.12)'
            }}
            aria-label="GND Consulting">
            <span>G</span>
            <span className="opacity-0 inline-block" style={{ width:'0.7em' }}></span>
            <span>D</span>
          </h1>
        </div>

        {/* Central portrait — sized to viewport height */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative aspect-[4/5] anim-up"
            style={{ height:'min(86vh, 760px)', transform:`translate(${mx * 18}px, ${my * 12}px)` }}>
            {/* halo behind */}
            <div className="absolute -inset-8 rounded-full"
              style={{ background:'radial-gradient(circle, rgba(255,149,79,.35) 0%, transparent 65%)', filter:'blur(12px)' }}></div>
            <div className="relative w-full h-full overflow-hidden">
              {/* Avatar Hero — l'image 2D temporaire avant le pipeline 3D HeroScroll.
                  L'image est en ratio landscape avec figure centrée droite ; on crop à
                  droite (object-position 65%) pour cadrer le perso, le côté gauche
                  crème de l'image se fond avec le stage crème du hero. */}
              <img
                src="/assets/hero-portrait.jpg"
                alt="Personnage masqué GND — humain × IA"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: '65% center' }}
                loading="eager"
                decoding="async"
              />
            </div>
            {/* glow rim */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow:'0 0 100px 10px rgba(255,149,79,.35)', mixBlendMode:'screen' }}></div>
          </div>
        </div>

        {/* Floating method card — left */}
        <div className="hidden lg:block absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 z-20 anim-up d2">
          <div className="rounded-3xl bg-text-strong/85 backdrop-blur-md border border-bg/10 p-5 w-[240px] shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <span className="kicker !text-bg/55">— méthode</span>
              <Icons.Sparkles size={16} className="text-accent"/>
            </div>
            <div className="display text-4xl mt-2 text-bg leading-[.9]">
              Humain<br/><span className="text-accent">× IA</span>
            </div>
            <p className="text-bg/65 text-xs mt-3 leading-relaxed">L'humain décide. L'IA accélère.</p>
            <a href="#/agence" className="mt-3 inline-flex items-center gap-1.5 text-bg/85 hover:text-accent text-xs">
              Le manifeste <Icons.ArrowRight size={12}/>
            </a>
          </div>
        </div>

        {/* Floating contact card — right */}
        <div className="hidden lg:block absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 z-20 anim-up d3">
          <div className="rounded-3xl bg-bg backdrop-blur-md border border-text-strong/8 p-5 w-[260px] shadow-2xl shadow-text-strong/15">
            <div className="flex items-center justify-between">
              <span className="kicker">— contact</span>
              <span className="w-7 h-7 rounded-full bg-accent text-text-strong inline-flex items-center justify-center">
                <Icons.Mail size={12}/>
              </span>
            </div>
            <div className="display text-2xl mt-2 text-text-strong leading-tight">
              Un projet ?<br/>Échangeons.
            </div>
            <p className="text-text-muted text-xs mt-2">Devis sous 48h. Sans engagement.</p>
            <a href="#/contact" className="btn btn-primary !py-2.5 !px-4 mt-3 text-xs w-full justify-center">
              Démarrer <Icons.ArrowUpRight size={12}/>
            </a>
          </div>
        </div>

        {/* Mobile compact text block — sits over the hero */}
        <div className="lg:hidden absolute inset-x-0 bottom-0 z-30 px-6 pb-8 bg-gradient-to-t from-bg-alt via-bg-alt/85 to-transparent pt-20">
          <h2 className="display text-4xl md:text-5xl text-text-strong leading-[.95]">
            L'Art de la <span className="italic text-accent">Clarté</span> Digitale.
          </h2>
          <p className="mt-4 text-text text-sm leading-relaxed max-w-md">
            Studio créatif parisien. Production audiovisuelle, design, automatisation IA. <strong className="text-text-strong">Humain × IA.</strong>
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="#/realisations" className="btn btn-primary !py-3 !px-5 text-sm">Voir nos réalisations <Icons.ArrowUpRight size={14}/></a>
            <a href="#/contact" className="btn !bg-text-strong/8 !text-text-strong !border !border-text-strong/15 !py-3 !px-5 text-sm">Démarrer <Icons.ArrowUpRight size={14}/></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hidden lg:block relative z-20 shrink-0">
        <Container>
          <div className="border-t border-text-strong/10 py-4 grid grid-cols-3 items-center text-text-muted text-xs">
            <div className="flex items-center gap-2 label-mono">
              <Icons.ArrowDown size={14} className="scroll-pulse"/> scroll · découvrir
            </div>
            <div className="display text-center text-text-strong text-base">
              L'Art de la <span className="italic text-accent">Clarté</span> Digitale
            </div>
            <div className="flex items-center justify-end gap-2 label-mono">
              <span>est. 2024</span>
              <span className="opacity-40">·</span>
              <span>paris · fr</span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ===================== Marquee — projects ribbon ===================== */
function MarqueeProjects() {
  const items = ["Trinity Rebel", "Esther Seems", "Sabay Festival 2023", "Ali 45 Scientific", "Leyel · Miel", "Yungcally", "Cook & Soul", "Pékin Express"];
  const row = [...items, ...items];
  return (
    <div className="bg-text-strong text-bg overflow-hidden py-7 border-y border-bg/10">
      <div className="flex gap-12 marquee-track whitespace-nowrap">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="display text-3xl md:text-5xl text-bg/95">{t}</span>
            <span className="text-accent text-3xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== Who we are — Echelon segmented (refined) ===================== */
function WhoWeAreBlock() {
  const pillars = [
    { t:"innovation first", d:"Veille brute → outils intégrés.", style:"bg-bg-alt text-text-strong rounded-tl-[180px] rounded-tr-[24px] rounded-br-[24px] rounded-bl-[24px]", align:"items-start text-left", vpos:"justify-end", textPad:"pr-2" },
    { t:"global vision", d:"Six métiers internalisés.", style:"bg-text-strong text-bg rounded-tr-[180px] rounded-tl-[24px] rounded-bl-[24px] rounded-br-[24px]", align:"items-end text-right", vpos:"justify-end", textPad:"pl-2" },
    { t:"impact mesurable", d:"Chaque livrable a un KPI.", style:"bg-accent text-text-strong rounded-bl-[180px] rounded-tl-[24px] rounded-tr-[24px] rounded-br-[24px]", align:"items-start text-left", vpos:"justify-start", textPad:"pr-2" },
    { t:"true partnership", d:"Collaborations qui durent.", style:"bg-surface text-text-strong rounded-br-[180px] rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px]", align:"items-end text-right", vpos:"justify-start", textPad:"pl-2" },
  ];
  return (
    <Section className="py-28 md:py-40 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <Kicker>À propos</Kicker>
            <h2 className="display text-6xl md:text-8xl mt-5 text-text-strong leading-[.9]">
              who <span className="italic">we are</span>.
            </h2>
          </div>
          <p className="text-text max-w-md md:text-right">
            GND est un studio créatif hybride basé à Paris. L'œil humain pour signer, l'IA pour accélérer. Une seule équipe, six métiers, des engagements tenus.
          </p>
        </div>

        {/* 2x2 segmented grid with floating center — text pinned to OUTER corners */}
        <div className="relative mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-5 md:gap-7">
            {pillars.map((p, i) => (
              <div key={p.t} className={`${p.style} aspect-square p-6 md:p-10 flex flex-col ${p.align} ${p.vpos} shadow-xl shadow-text/10`}>
                <div className={`max-w-[68%] md:max-w-[58%] ${p.textPad}`}>
                  <span className={`label-mono block ${i === 1 ? "!text-bg/55" : i === 2 ? "!text-text-strong/65" : ""}`}>0{i+1}</span>
                  <div className="display text-2xl md:text-[2.1rem] leading-[1.05] mt-2 break-words">{p.t}</div>
                  <p className={`mt-3 text-xs md:text-sm leading-snug ${i === 1 ? "text-bg/70" : i === 2 ? "text-text-strong/80" : "text-text-muted"}`}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Floating center — smaller, no overlap with pillar text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[20%] aspect-square rounded-full bg-bg shadow-2xl shadow-text/30 flex flex-col items-center justify-center text-center p-2 md:p-3 border-4 border-bg">
              <div className="kicker text-[9px]">— méthode</div>
              <div className="display text-base md:text-2xl mt-1 text-text-strong leading-[.9]">
                Humain<br/><span className="text-accent italic">× IA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-14">
          <Btn href="#/agence" variant="primary">Découvrir notre histoire</Btn>
        </div>
      </Container>
    </Section>
  );
}

/* ===================== Services — feature row Echelon-style ===================== */
function ServicesGrid() {
  return (
    <Section bg="alt" className="py-28 md:py-40">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <Kicker>Expertise</Kicker>
            <h2 className="display text-6xl md:text-8xl mt-5 text-text-strong leading-[.9]">our<br/><span className="italic">services</span>.</h2>
          </div>
          <p className="text-text max-w-md md:text-right">
            On excelle sur six terrains, sous un même toit. Du concept à la livraison, sans courtage ni intermédiaire.
          </p>
        </div>

        {/* Service stages — each is a "stage" card with portrait, like Emma Larson */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {SERVICES_CARDS.map((s, i) => (
            <a key={s.num} href={s.to}
              className={`group relative overflow-hidden rounded-t-[180px] rounded-b-2xl card-hover
                ${i === 1 ? "bg-accent" : i === 4 ? "bg-text-strong text-bg" : "bg-bg"}`}
              style={{ aspectRatio:'1/2.1' }}>
              {/* background portrait silhouette */}
              <div className="absolute inset-0 overflow-hidden rounded-inherit">
                <div className="absolute inset-x-0 top-0 h-3/5">
                  <img
                    src={`/assets/${i === 0 ? "svc-sites" : i === 1 ? "svc-design" : i === 2 ? "svc-motion" : i === 3 ? "svc-production" : i === 4 ? "svc-photo" : i === 5 ? "svc-ia" : "portrait-cream"}.png`}
                    alt=""
                    draggable={false}
                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                    style={{ filter:'drop-shadow(0 22px 44px rgba(42,24,16,.26))' }}
                  />
                </div>
                <div className="absolute inset-x-0 top-[55%] h-[45%]"
                  style={{ background: i === 1 ? '#FF954F' : i === 4 ? '#2A1810' : '#FDF6EE' }}></div>
              </div>
              <div className="relative h-full flex flex-col justify-end p-5">
                <div className={`label-mono ${i === 1 ? "text-text-strong" : i === 4 ? "text-accent" : "text-text-muted"}`}>{s.num}</div>
                <div className={`display text-2xl md:text-3xl mt-3 leading-tight ${i === 1 ? "text-text-strong" : i === 4 ? "text-bg" : "text-text-strong"}`}>{s.title}</div>
                <div className={`mt-3 inline-flex items-center gap-1 text-xs ${i === 1 ? "text-text-strong/80" : i === 4 ? "text-bg/70" : "text-text-muted"}`}>
                  <span>En savoir plus</span> <Icons.ArrowUpRight size={12}/>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ===================== Reels mosaic — Cinematic + ported viewer (comp 7 spirit) ===================== */
function MediaSlot({ p, rounded = "rounded-2xl" }: any) {
  if (p && p.img) return <img src={p.img} alt={p.title} draggable={false} loading="lazy" decoding="async" className={`absolute inset-0 w-full h-full object-cover ${rounded}`} />;
  return (
    <div className={`img-placeholder absolute inset-0 ${rounded}`}>
      <span className="px-6 text-center">{p ? p.title : ""}</span>
    </div>
  );
}

function MediaLightbox({ items, index, onClose, onIndex }: any) {
  const [playing, setPlaying] = React.useState(false);
  React.useEffect(() => { setPlaying(false); }, [index]);
  React.useEffect(() => {
    if (index == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      else if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [index, items, onClose, onIndex]);
  if (index == null) return null;
  const p = items[index];
  const hasMedia = !!(p.youtube || p.video);
  const ctrl = { background: "rgba(253,246,238,.12)", color: "#FDF6EE", border: "1px solid rgba(253,246,238,.25)", cursor: "pointer" };
  const overlay = (
    <div role="dialog" aria-modal="true" aria-label={`${p.title} — ${p.subtitle}`} onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(42,24,16,.93)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "5vw", animation: "fadeUp .25s ease-out both" }}>
      <button aria-label="Fermer" onClick={onClose} className="focus-ring"
        style={{ position: "absolute", top: 22, right: 22, width: 48, height: 48, borderRadius: 999, fontSize: 22, lineHeight: 1, ...ctrl }}>×</button>
      <button aria-label="Précédent" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + items.length) % items.length); }}
        className="focus-ring hidden md:flex" style={{ position: "absolute", left: 22, top: "50%", transform: "translateY(-50%)", width: 52, height: 52, borderRadius: 999, alignItems: "center", justifyContent: "center", fontSize: 24, ...ctrl }}>‹</button>
      <button aria-label="Suivant" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % items.length); }}
        className="focus-ring hidden md:flex" style={{ position: "absolute", right: 22, top: "50%", transform: "translateY(-50%)", width: 52, height: 52, borderRadius: 999, alignItems: "center", justifyContent: "center", fontSize: 24, ...ctrl }}>›</button>
      <div onClick={(e) => e.stopPropagation()} className="w-full" style={{ maxWidth: "1080px" }}>
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9", background: "#E8D8C5" }}>
          {playing && p.youtube ? (
            <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${p.youtube}?autoplay=1&rel=0`}
              title={p.title} allow="accelerated-charset; autoplay; encrypted-media; picture-in-picture" allowFullScreen frameBorder="0" />
          ) : playing && p.video ? (
            <video className="absolute inset-0 w-full h-full object-cover" src={p.video} poster={p.img} controls autoPlay playsInline />
          ) : (
            <>
              <MediaSlot p={p} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(42,24,16,.7), transparent 55%)" }} />
              {hasMedia && (
                <button aria-label="Lire la vidéo" onClick={() => setPlaying(true)}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-accent text-text-strong inline-flex items-center justify-center shadow-2xl hover:scale-105 transition focus-ring">
                  <Icons.Play size={28}/>
                </button>
              )}
              <div className="absolute left-0 right-0 bottom-0 p-6 md:p-9">
                <div className="label-mono" style={{ color: "rgba(253,246,238,.7)" }}>{p.tag} · {p.year}</div>
                <div className="display text-3xl md:text-5xl mt-2" style={{ color: "#FDF6EE" }}>{p.title}</div>
                <div className="display italic text-lg md:text-2xl mt-1" style={{ color: "#FF954F" }}>{p.subtitle}</div>
                {p.credit && <div className="label-mono mt-3" style={{ color: "rgba(253,246,238,.55)" }}>{p.credit}</div>}
              </div>
            </>
          )}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="label-mono" style={{ color: "rgba(253,246,238,.5)" }}>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          <a href={`#/realisations/${p.id}`} onClick={onClose} className="btn btn-primary !py-3">Étude de cas <Icons.ArrowUpRight size={14}/></a>
        </div>
      </div>
    </div>
  );
  return createPortal(overlay, document.body);
}

/* OUR WORK = executive-impact-carousel installé VERBATIM dans src/components/ui/.
   GSAP/ScrollTrigger, CSS structurel et structure = 1:1. Seules adaptations : données
   (vrais projets GND) + couleurs charte crème. Importé en haut de ce fichier. */

/* OUR WORK — CircularGallery (OGL/WebGL) en bandeau plein écran sur scène chocolat.
   Série « Criminal Designer » : 4 portraits masqués validés par Roodny. Le reste du
   portfolio vit sur /réalisations (cohérence visuelle stricte = série masquée uniquement).
   Photos servies via le endpoint Supabase render/image (redimensionnées, légères). */
const MASKED_RENDER = "https://gublhtivvydkuooooffg.supabase.co/storage/v1/render/image/public/portfolio-photos/";
// Uniformisation PORTRAIT 2:3 (800×1200) — TOUTES les photos arrivent dans le même
// format, recadrées au centre côté serveur. Les 2 portraits natifs (4251, 4135) sont
// préservés ; les 2 landscapes (4267, 4149) sont recadrés au centre → le MASQUE,
// centré dans chaque shot, reste intact. Carrousel à rythme régulier garanti.
const m = (f: string) => `${MASKED_RENDER}${f}?width=800&height=1200&resize=cover&quality=82`;
const MASKED_GALLERY: GalleryItem[] = [
  { image: m("6F0A4251.jpg"), text: "Masque & Identité" },
  { image: m("6F0A4267.jpg"), text: "Vision Masquée" },
  { image: m("6F0A4135.jpg"), text: "L'Art en Mouvement" },
  // Puissance Créative (6F0A4149.jpg) retirée : le shot d'origine est en landscape
  // avec sujet décalé → le crop centré 2:3 portrait coupait au-dessus du genou.
  // Visible dans Réalisations, pas ici. Cohérence visuelle prioritaire.
];

function ReelsMosaic() {
  return (
    <section className="relative bg-bg-alt">
      {/* Header band — crème chaude, petites touches chocolat (kicker, titre, accent orange) */}
      <div className="relative pt-28 md:pt-40 pb-12">
        <Container className="relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <Kicker className="!text-text-muted">— réalisations · sélection</Kicker>
              <h2 className="display text-6xl md:text-8xl lg:text-9xl mt-5 text-text-strong leading-[.88]">
                our <span className="italic text-accent">work</span>.
              </h2>
            </div>
            <div className="md:text-right">
              <p className="text-text max-w-md leading-relaxed mb-4">
                Trois portraits, une série. Faites défiler — le reste du portfolio se découvre côté Réalisations.
              </p>
              <a href="#/realisations" className="arrow-link !text-text-strong">Voir tout le portfolio <Icons.ArrowRight size={18}/></a>
            </div>
          </div>
        </Container>
      </div>

      {/* CircularGallery (OGL) — pleine largeur. Couleur de texte forcée en chocolat
          pour que le label rendu sur canvas reste lisible sur la crème chaude. */}
      <div
        className="relative w-full h-[720px] md:h-[880px]"
        style={{ color: '#2A1810' }}
      >
        <CircularGallery
          items={MASKED_GALLERY}
          bend={2}
          borderRadius={0.04}
          scrollEase={0.05}
        />
      </div>

      {/* Footer band */}
      <div className="relative pt-10 pb-28 md:pb-40">
        <Container className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-text-strong/10 pt-6">
            <span className="text-text-muted label-mono">— 3 portraits ici · série « Criminal Designer » · portfolio complet sur Réalisations</span>
            <a href="#/realisations" className="inline-flex items-center gap-2 text-text-strong hover:text-accent transition">
              Découvrir tout le portfolio <Icons.ArrowRight size={18}/>
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ===================== Why we need [signature]  — Stoicism inspired ===================== */
function WhyBlock() {
  return (
    <Section bg="dark" className="py-28 md:py-40 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] max-w-[480px]">
              <div className="absolute inset-0 rounded-3xl"
                style={{ background:'radial-gradient(ellipse at 50% 40%, rgba(255,149,79,.4), transparent 65%)' }}></div>
              <div className="absolute inset-[8%]">
                <PortraitHero showTag={false} />
              </div>
              {/* orbiting "lessons" markers */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {["humain","ia","résultat"].map((t, i) => (
                  <div key={t} className="surface-card px-3 py-1.5 bg-bg/95">
                    <div className="label-mono text-[9px]">0{i+1}</div>
                    <div className="text-text-strong text-xs font-medium">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Kicker className="!text-bg/60">Notre conviction</Kicker>
            <h2 className="display text-5xl md:text-7xl mt-5 text-bg leading-[.95]">
              Pourquoi le <span className="italic text-accent">studio hybride</span> bat le studio classique.
            </h2>
            <div className="mt-7 space-y-5 text-lg text-bg/75 leading-relaxed max-w-xl">
              <p>Parce qu'un studio classique vend du temps humain — cher, lent, rare. Une IA brute vend du volume — vide, sans direction.</p>
              <p>GND fait les deux. <strong className="text-bg">Direction humaine, exécution augmentée.</strong> Le ratio idée/livré explose. Les délais fondent. Les budgets tiennent.</p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn href="#/agence" variant="primary">Lire le manifeste</Btn>
              <a href="#/realisations" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Voir la preuve <Icons.ArrowUpRight size={14}/></a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ===================== Values ===================== */
function ValuesBlock() {
  return (
    <Section className="py-28 md:py-40">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <Kicker>Notre ADN</Kicker>
            <h2 className="display text-6xl md:text-8xl mt-5 text-text-strong leading-[.9]">why <span className="italic">GND</span>.</h2>
            <p className="mt-6 text-text text-lg leading-relaxed max-w-md">
              Quatre valeurs qui guident chaque décision créative, technique et commerciale. Pas de promesses chiffrées en l'air — des engagements tenus.
            </p>
            <div className="mt-10">
              <Btn href="#/agence" variant="primary">Lire le manifeste</Btn>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {VALUES.map((v, i) => (
              <li key={v.num}
                className={`aspect-square rounded-3xl p-6 md:p-7 flex flex-col justify-between
                  ${i === 1 ? "bg-accent text-text-strong" : i === 2 ? "bg-text-strong text-bg" : "surface-card"}`}>
                <span className={`label-mono ${i === 2 ? "text-accent" : ""}`}>{v.num}</span>
                <div>
                  <div className="display text-3xl md:text-4xl leading-tight">{v.title}</div>
                  <div className={`mt-3 text-xs md:text-sm ${i === 1 ? "text-text-strong/85" : i === 2 ? "text-bg/70" : "text-text-muted"}`}>{v.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function TestimonialsBlock() {
  // Pas de témoignages clients fabriqués : on affiche la signature réelle du studio
  // (engagements vérifiables) tant que de vrais verbatims clients ne sont pas collectés.
  const items = [
    { q:"L'humain décide, l'IA accélère. Chaque livrable est signé à la main — la direction créative ne se délègue pas.", a:"Méthode GND", role:"Humain × IA" },
    { q:"Un studio, six métiers internalisés, un seul interlocuteur. La preuve avant la promesse.", a:"Promesse GND", role:"Studio créatif · Paris" },
    { q:"Délais tenus, droits clairs, livrables documentés. Des engagements vérifiables, pas des slogans.", a:"Engagement GND", role:"Production interne" },
  ];
  const [i, setI] = React.useState(0);
  return (
    <Section bg="alt" className="py-28 md:py-40">
      <Container>
        <div className="max-w-4xl">
          <Kicker>Notre signature — Humain × IA</Kicker>
          <Icons.Quote size={56} className="text-accent mt-8"/>
          <p className="display text-3xl md:text-5xl text-text-strong mt-6 leading-[1.15]">
            {items[i].q}
          </p>
          <div className="mt-10 flex items-center justify-between">
            <div>
              <div className="text-text-strong font-medium">{items[i].a}</div>
              <div className="text-sm text-text-muted">{items[i].role}</div>
            </div>
            <div className="flex items-center gap-2">
              {items.map((_, k) => (
                <button key={k} onClick={() => setI(k)}
                  aria-label={`Témoignage ${k+1}`}
                  className={`h-1.5 transition-all rounded-full ${k === i ? "w-10 bg-accent" : "w-4 bg-surface"}`}/>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FaqHome() {
  return (
    <Section className="py-28 md:py-40">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Kicker>Questions fréquentes</Kicker>
            <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Toutes les <span className="italic">réponses</span>.</h2>
            <p className="mt-6 text-text">Une question qui ne figure pas ici ? Écrivez-nous, réponse sous 24h.</p>
          </div>
          <div className="lg:col-span-8">
            <Faq q="Comment travaillez-vous concrètement ?" a={<>Brief, co-création, validation, livraison — toujours documenté. L'IA accélère certaines étapes (recherche, prototypage, post-production), mais la direction créative reste humaine.</>}/>
            <Faq q="Quel budget pour un projet ?" a={<>Nous travaillons en approche sur-mesure : chaque projet fait l'objet d'un <strong>devis personnalisé</strong>. Pour les sites vitrines, découvrez nos formules sur la <a href="#/services/sites-vitrines" className="underline decoration-accent underline-offset-4">page dédiée</a>.</>}/>
            <Faq q="Travaillez-vous à distance ?" a={<>Oui — équipe basée à Paris, captations partout en France et à l'international. Visios pour la phase brief et validation.</>}/>
            <Faq q="Comment utilisez-vous l'IA ?" a={<>Comme un outil de productivité encadré : génération de variantes, automatisations, post-production. Les usages sont documentés et conformes à l'AI Act (UE 2024/1689).</>}/>
            <Faq q="Quels sont les délais habituels ?" a={<>Site vitrine : 1–2 semaines. Identité visuelle : 2–4 semaines. Production vidéo : variable selon ampleur — devis détaillé en 48h.</>}/>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Team slider — ported from the 21st.dev testimonial-slider, recolored to the cream charte.
   Incarnates the team. Animation timings/rotations kept verbatim. */
function TeamSlider() {
  const members = [
    { initials: "RP", quote: "L'humain décide, l'IA accélère. Chaque projet est signé à la main — la direction créative ne se délègue pas.", name: "Roodny Pierre", role: "Fondateur & CEO" },
    { initials: "J", quote: "Un studio, six métiers, des engagements tenus. On livre la preuve avant la promesse.", name: "Jean", role: "Associé · Opérations" },
    { initials: "GND", quote: "Un réseau d'experts activable à la demande, orchestré par une seule équipe responsable de bout en bout.", name: "Le réseau GND", role: "Collectif créatif & tech" },
  ];
  const [active, setActive] = React.useState(0);
  const [prev, setPrev] = React.useState(-1);
  const [auto, setAuto] = React.useState(true);
  const select = (n: number) => setActive((cur) => { setPrev(cur); return n; });
  React.useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((cur) => { setPrev(cur); return (cur + 1) % members.length; }), 7000);
    return () => clearInterval(id);
  }, [auto]);
  const EASE = "cubic-bezier(.68,-.3,.32,1)";
  return (
    <Section className="py-28 md:py-40 overflow-hidden">
      <Container>
        <div className="text-center mb-12"><Kicker>L'équipe — Humain × IA incarné</Kicker></div>
        <div className="mx-auto w-full max-w-4xl text-center">
          {/* rotating avatar + warm glow dome — faithful to the 21st.dev slider */}
          <div className="relative h-44">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2">
              <div className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(to bottom, rgba(255,149,79,.30), rgba(255,149,79,.07) 25%, rgba(255,149,79,0) 70%)" }} />
              <div className="h-44"
                style={{ WebkitMaskImage: "linear-gradient(0deg,transparent,#000 20%,#000)", maskImage: "linear-gradient(0deg,transparent,#000 20%,#000)" }}>
                {members.map((m, idx) => {
                  const rot = idx === active ? 0 : idx === prev ? 60 : -60;
                  return (
                    <div key={idx} className="absolute inset-0 h-full"
                      style={{ opacity: idx === active ? 1 : 0, transform: `rotate(${rot}deg)`, transition: `opacity .7s ${EASE}, transform .7s ${EASE}` }}>
                      <div className="relative top-14 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-bg-alt flex items-center justify-center"
                        style={{ border: "1px solid rgba(83,36,24,.15)", boxShadow: "0 14px 36px -8px rgba(83,36,24,.45)" }}>
                        <span className="text-2xl text-text-strong" style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700 }}>{m.initials}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* quote — slide + fade, faithful timings */}
          <div className="mb-10 relative" style={{ minHeight: "190px" }}>
            {members.map((m, idx) => {
              const qx = idx === active ? 0 : idx === prev ? 16 : -16;
              return (
                <div key={idx} className="absolute inset-x-0"
                  style={{ opacity: idx === active ? 1 : 0, transform: `translateX(${qx}px)`, transition: idx === active ? "opacity .5s ease-in-out .2s, transform .5s ease-in-out .2s" : "opacity .3s ease-out, transform .3s ease-out", pointerEvents: idx === active ? "auto" : "none" }}>
                  <p className="display text-3xl md:text-4xl lg:text-5xl text-text-strong leading-[1.25]">“{m.quote}”</p>
                </div>
              );
            })}
          </div>
          {/* name pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {members.map((m, idx) => (
              <button key={idx} onClick={() => { setAuto(false); select(idx); }}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs transition-colors duration-150 focus-ring ${idx === active ? "bg-accent text-text-strong shadow-sm" : "bg-bg-alt text-text hover:bg-surface"}`}>
                <span className="font-semibold">{m.name}</span><span className="opacity-40">—</span><span className="opacity-70">{m.role}</span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function HomePage() {
  return (
    <main id="main">
      <HeroHome />
      <MarqueeProjects />
      <WhoWeAreBlock />
      <ServicesGrid />
      <ReelsMosaic />
      <WhyBlock />
      <ValuesBlock />
      <TestimonialsBlock />
      <FaqHome />
      <TeamSlider />
      <CtaBand sub="Échangeons sur votre projet — réponse sous 24h, devis sous 72h."/>
    </main>
  );
}

export { HomePage, PROJECTS, SERVICES_CARDS, TestimonialsBlock };
