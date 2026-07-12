/* Home / Accueil, Cinematic edition, ported to ES modules + REAL gsap/ScrollTrigger */
import * as React from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveImageBentoGallery from '@/components/ui/bento-gallery';
import { ALL_PROJECTS } from './realisations';
import { HeroScroll } from '../components/HeroScroll';
import { FaqJsonLd } from '../components/FaqJsonLd';
import { PhotoViewer } from '../components/PhotoViewer';
import { Section, Container, Kicker, Btn, PortraitHero, Tag, Faq } from '../ui';
import { FloatingCtaBand } from '../components/FloatingCtaBand';
import { MarqueeCTA } from '../components/MarqueeCTA';
import { WhyGndHomeBlock } from '../components/WhyGndHomeBlock';
import ScrollExpandHero from '@/components/blocks/scroll-expansion-hero';
import { Icons } from '../icons';

gsap.registerPlugin(ScrollTrigger);

/* Real portfolio, source: live src/data/videosData.js (9 real video projects).
   Media is lazy / poster-first / click-to-play (jamais bloquant, cf. bug Supabase 24 s du live). */
/* COVER : gnd-cover.png perdue avec le projet Supabase (cf. portfolio-assets.ts),
   poster hero en remplacement provisoire. */
const COVER = "/assets/hero1-poster.webp";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

const PROJECTS = [
  { id: "esther-seems", title: "Esther Seems", subtitle: "BOBINE", tag: "Clip musical", year: "2024", ratio: "4/5", credit: "Réalisation · Jonathan Ransau", img: yt("6oaO6YoWjyQ"), youtube: "6oaO6YoWjyQ", desc: "Clip musical de l'artiste Esther Seems, esthétique hip-hop/R&B sobre et émotive, en hommage à un proche disparu. En collaboration avec AMS Visions." },
  { id: "trinity-rebel", youtube: "gekXlJ65GK4", title: "Trinity Rebel ft Dafxcx", subtitle: "L'Univers Officiel", tag: "Clip musical", year: "2025", ratio: "4/5", credit: "Réalisation · Julien Ancieaux", img: COVER, desc: "Clip musical officiel, sonorités chaleureuses et festives, inspirées des rythmes urbains et caribéens." },
  { id: "sabay-2023", title: "Sabay Festival 2023", subtitle: "Grande Pagode de Vincennes", tag: "Événementiel", year: "2023", ratio: "16/9", credit: "Production · GND Consulting", img: "https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg", youtube: "Vyhz7_D4fFU", desc: "Captation et aftermovie officiel du Sabay Festival, traditions cambodgiennes, Grande Pagode de Vincennes." },
  { id: "concert-ali", title: "Concert Ali 45 Scientific", subtitle: "Café LaPêche · Montreuil", tag: "Captation live", year: "2024", ratio: "3/4", credit: "Captation · IAMTV / O2M / GND", img: COVER, desc: "Captation live du concert d'Ali, cofondateur du collectif 45 Scientific aux côtés de Booba." },
  { id: "leyel-miel", title: "Leyel, Miel", subtitle: "Clip officiel", tag: "Clip musical", year: "2025", ratio: "4/5", credit: "Réalisation · Jonathan Ransau", img: yt("UbXQim7iNLI"), youtube: "UbXQim7iNLI", desc: "Clip officiel de l'artiste Leyel, variété française, mise en scène délicate. Collaboration O2M." },
  { id: "cook-soul", title: "Cook & Soul", subtitle: "Kaoutar · Pékin Express", tag: "Production", year: "2024", ratio: "16/9", credit: "Réalisation · Gwen Templier", img: yt("galhl8_dYyk"), youtube: "galhl8_dYyk", desc: "Émission musicale produite pour IAMTV, avec Kaoutar (Pékin Express). Collaboration O2M." },
  { id: "yungcally", video: "/portfolio-videos/yungcally.mp4", title: "Yungcally", subtitle: "Clip officiel", tag: "Clip musical", year: "2024", ratio: "1/1", credit: "Réalisation · Jonathan Ransau", img: COVER, desc: "Clip officiel de Yungcally, jeune artiste franco-américain, vibe Wiz Khalifa / Post Malone." },
  { id: "sabay-2022", video: "/portfolio-videos/sabay-2022.mp4", title: "Sabay Festival 2022", subtitle: "Grande Pagode de Vincennes", tag: "Événementiel", year: "2022", ratio: "4/3", credit: "Production · GND Consulting", img: COVER, desc: "Aftermovie officiel du Sabay Festival 2022, captation 4K." },
  { id: "lanecdote", title: "L'Anecdote", subtitle: "Émission · interviews", tag: "Production", year: "2024", ratio: "16/9", credit: "Réalisation · GND Consulting", img: "https://img.youtube.com/vi/AGC_2cFHE_0/hqdefault.jpg", youtube: "AGC_2cFHE_0", desc: "Émission L'Anecdote, format original mêlant interviews et moments de partage." },
];

const SERVICES_CARDS = [
  { num: "01", title: "Sites & SEO", desc: "Sites vitrines clé en main, landing pages, SEO local. Livraison en 1 à 2 semaines.", to: "/services/sites-vitrines" },
  { num: "02", title: "Branding & Identité", desc: "Marque, logo, charte graphique, direction créative. Supports imprimés sur-mesure.", to: "/services/branding-identite" },
  { num: "03", title: "Audiovisuel", desc: "Vidéo, motion design, photographie. Captation 4K/8K, montage cinéma, contenus sociaux.", to: "/services/audiovisuel" },
  { num: "04", title: "Automatisation & IA", desc: "Workflows intelligents, agents IA sur-mesure, audit & accompagnement adoption.", to: "/services/automatisation-ia" },
];

const VALUES = [
  { num: "01", title: "Passion", desc: "Un métier, pas une prestation. Chaque projet porte une intention." },
  { num: "02", title: "Fiabilité", desc: "Délais tenus, points d'étape clairs, livrables documentés." },
  { num: "03", title: "Innovation", desc: "IA & automatisation intégrées à la chaîne créative, jamais subies." },
  { num: "04", title: "Collaboration", desc: "Co-création réelle : votre métier guide la création." },
];

/* ===================== HERO, cinematic, dramatic ===================== */
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
    <section className="hero-scroll-root relative min-h-[760px] min-h-dscreen overflow-hidden bg-bg-alt text-text-strong flex flex-col">
      {/* Image d'arrière-plan du hero wordmark (Hero #2) — derrière le wordmark
          GND, le personnage et le halo (z-0). Scrim léger pour lisibilité. */}
      <img
        src="/assets/hero-home-bg.webp?v=2"
        alt=""
        aria-hidden="true"
        draggable={false}
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
      />
      <div className="absolute inset-0 z-0 pointer-events-none bg-bg-alt/45" aria-hidden="true"></div>
      {/* Dégradé cream en bas (comme les autres heros) : l'image fond vers le
          crème → délimitation + ancre le personnage (plus flottant) + lisibilité
          des éléments du bas. */}
      <div className="absolute inset-x-0 bottom-0 z-0 pointer-events-none h-2/5 bg-gradient-to-t from-bg-alt via-bg-alt/85 to-transparent" aria-hidden="true"></div>

      {/* Fond homogène, cream uniforme + très très léger glow central pour respiration,
          assez doux pour ne JAMAIS créer un cercle / rectangle visible. */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0"
          style={{ background:'radial-gradient(ellipse 80% 90% at 50% 50%, rgba(255,149,79,.18) 0%, transparent 75%)' }}></div>
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
              <span className="hidden sm:inline">est. 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="chip !bg-text-strong/8 !text-text-strong backdrop-blur"><span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span> En production</span>
            </div>
          </div>
        </Container>
      </div>

      {/* MAIN STAGE */}
      <div className="relative flex-1 z-10 min-h-0">
        {/* Wordmark, sized to viewport height, fills the screen horizontally */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div
            className="display whitespace-nowrap leading-[.78] tracking-huge"
            style={{
              color: '#FFFFFF',
              fontSize:'clamp(120px, min(55vh, 32vw), 600px)',
              transform:`translate(${mx * -10}px, ${my * -8}px)`,
              textShadow:'0 8px 50px rgba(83,36,24,.18), 0 2px 12px rgba(83,36,24,.10)'
            }}
            aria-hidden="true">
            <span>G</span>
            <span>N</span>
            <span>D</span>
          </div>
        </div>

        {/* Central portrait, sized to viewport height */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative aspect-[4/5] anim-up"
            style={{ height:'min(86vh, 760px)', transform:`translate(${mx * 18}px, ${my * 12}px)` }}>
            {/* halo behind */}
            <div className="absolute -inset-8 rounded-full"
              style={{ background:'radial-gradient(circle, rgba(255,149,79,.35) 0%, transparent 65%)', filter:'blur(12px)' }}></div>
            <div className="relative w-full h-full overflow-hidden">
              {/* HeroScroll, Chicken Drive-style pipeline complet : 150 frames Three.js
                  pré-rendues + scroll-scrub pinné + idle visor pulse + mouse parallax.
                  Fallback automatique sur /assets/hero-portrait.webp si frames absentes. */}
              <HeroScroll />
            </div>
            {/* glow rim */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow:'0 0 100px 10px rgba(255,149,79,.35)', mixBlendMode:'screen' }}></div>
          </div>
        </div>

        {/* Floating method card, left */}
        <div className="hidden lg:block absolute left-6 xl:left-12 bottom-12 z-20 anim-up d2">
          <div className="rounded-3xl bg-text-strong/85 backdrop-blur-md border border-bg/10 p-5 w-[240px] shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <span className="kicker !text-bg/55">méthode</span>
              <Icons.Sparkles size={16} className="text-accent"/>
            </div>
            <div className="display text-4xl mt-2 text-bg leading-[.9]">
              Humain<br/><span className="text-accent">× IA</span>
            </div>
            <p className="text-bg/65 text-xs mt-3 leading-relaxed">L'humain décide. L'IA accélère.</p>
            <a href="/agence" className="mt-3 inline-flex items-center gap-1.5 text-bg/85 hover:text-accent text-xs">
              Le manifeste <Icons.ArrowRight size={12}/>
            </a>
          </div>
        </div>

        {/* Floating contact card, right */}
        <div className="hidden lg:block absolute right-6 xl:right-12 bottom-12 z-20 anim-up d3">
          <div className="rounded-3xl bg-bg backdrop-blur-md border border-text-strong/8 p-5 w-[260px] shadow-2xl shadow-text-strong/15">
            <div className="flex items-center justify-between">
              <span className="kicker">contact</span>
              <span className="w-7 h-7 rounded-full bg-accent text-text-strong inline-flex items-center justify-center">
                <Icons.Mail size={12}/>
              </span>
            </div>
            <div className="display text-2xl mt-2 text-text-strong leading-tight">
              Un projet ?<br/>Échangeons.
            </div>
            <p className="text-text-muted text-xs mt-2">Devis sous 48h. Sans engagement.</p>
            <a href="/contact" className="btn btn-primary !py-2.5 !px-4 mt-3 text-xs w-full justify-center">
              Démarrer <Icons.ArrowUpRight size={12}/>
            </a>
          </div>
        </div>

        {/* Mobile compact text block, sits over the hero */}
        <div className="lg:hidden absolute inset-x-0 bottom-0 z-30 px-6 pb-safe bg-gradient-to-t from-bg-alt via-bg-alt/85 to-transparent pt-20" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
          <h2 className="display text-4xl md:text-5xl text-text-strong leading-[.95]">
            L'Art de la <span className="italic text-accent">Clarté Digitale</span>.
          </h2>
          <p className="mt-4 text-text text-sm leading-relaxed max-w-md">
            Studio créatif parisien. Production audiovisuelle, design, automatisation IA. <strong className="text-text-strong">Humain × IA.</strong>
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="/realisations" className="btn btn-primary !py-3 !px-5 text-sm">Voir nos réalisations <Icons.ArrowUpRight size={14}/></a>
            <a href="/contact" className="btn !bg-text-strong/8 !text-text-strong !border !border-text-strong/15 !py-3 !px-5 text-sm">Démarrer <Icons.ArrowUpRight size={14}/></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hidden lg:block relative z-20 shrink-0">
        <Container>
          <div className="border-t border-text-strong/15 py-5 grid grid-cols-3 items-center text-text text-xs">
            <div className="flex items-center gap-2 label-mono">
              <Icons.ArrowDown size={14} className="scroll-pulse"/> scroll · découvrir
            </div>
            <div className="display text-center text-text-strong text-2xl md:text-3xl font-medium tracking-tight">
              L'Art de la <span className="italic text-accent">Clarté Digitale</span>
            </div>
            <div className="flex items-center justify-end gap-2 label-mono">
              <span>est. 2025</span>
              <span className="opacity-40">·</span>
              <span>paris · fr</span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ===================== Marquee, projects ribbon ===================== */
function MarqueeProjects() {
  // Bandeau commercial, PUR call-to-action (chaque item pousse à l'action,
  // jamais descriptif). Verbe d'action ou bénéfice client clair.
  const items = [
    "Démarrer un projet",
    "Devis sous 48h",
    "Audit offert",
    "Échangeons sur votre projet",
    "Boostez votre présence digitale",
    "Faisons décoller votre marque",
    "Activez votre transformation IA",
    "Concrétisons vos ambitions",
  ];
  const row = [...items, ...items];
  return (
    <div className="bg-bg-alt text-text-strong overflow-hidden py-7 border-y border-text-strong/10">
      <div className="flex gap-12 marquee-track whitespace-nowrap">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="display text-3xl md:text-5xl text-text-strong/95">{t}</span>
            <span className="text-accent text-3xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== Who we are, Echelon segmented (refined) ===================== */
function WhoWeAreBlock() {
  // Forme pétale : 1 grand coin arrondi (coin EXTÉRIEUR de la carte) + 3 petits.
  // Rayon responsive : ~92px mobile (proportionné aux cartes ~161px) → 180px desktop.
  const pillars = [
    { t:"innovation first", d:"Veille brute → outils intégrés.", style:"bg-bg-alt text-text-strong rounded-tl-[92px] md:rounded-tl-[180px] rounded-tr-[20px] md:rounded-tr-[24px] rounded-br-[20px] md:rounded-br-[24px] rounded-bl-[20px] md:rounded-bl-[24px]", align:"items-start text-left", vpos:"justify-end", textPad:"pr-1 md:pr-2", num:"text-text-muted", sub:"text-text-muted", descCls:"mr-auto" },
    { t:"global vision", d:"Six métiers internalisés.", style:"bg-text-strong text-bg rounded-tr-[92px] md:rounded-tr-[180px] rounded-tl-[20px] md:rounded-tl-[24px] rounded-bl-[20px] md:rounded-bl-[24px] rounded-br-[20px] md:rounded-br-[24px]", align:"items-end text-right", vpos:"justify-end", textPad:"pl-1 md:pl-2", num:"!text-bg/55", sub:"text-bg/70", descCls:"ml-auto" },
    { t:"impact mesurable", d:"Chaque livrable a un KPI.", style:"bg-accent text-text-strong rounded-bl-[92px] md:rounded-bl-[180px] rounded-tl-[20px] md:rounded-tl-[24px] rounded-tr-[20px] md:rounded-tr-[24px] rounded-br-[20px] md:rounded-br-[24px]", align:"items-start text-left", vpos:"justify-start", textPad:"pr-1 md:pr-2", num:"!text-text-strong/65", sub:"text-text-strong/80", descCls:"mr-auto" },
    { t:"true partnership", d:"Collaborations qui durent.", style:"bg-surface text-text-strong rounded-br-[92px] md:rounded-br-[180px] rounded-tl-[20px] md:rounded-tl-[24px] rounded-tr-[20px] md:rounded-tr-[24px] rounded-bl-[20px] md:rounded-bl-[24px]", align:"items-end text-right", vpos:"justify-start", textPad:"pl-1 md:pl-2", num:"text-text-muted", sub:"text-text-muted", descCls:"ml-auto" },
  ];
  return (
    <Section className="py-28 md:py-40 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
          <div>
            <Kicker>À propos</Kicker>
            <h2 className="display text-6xl md:text-8xl mt-5 text-text-strong leading-[.9]">
              who <span className="italic text-accent">we are</span>.
            </h2>
          </div>
          <p className="text-text max-w-xl lg:max-w-2xl md:text-right md:mt-52 lg:mt-60">
            GND est un studio créatif hybride basé à Paris. L'œil humain pour signer, l'IA pour accélérer. Une seule équipe, quatre branches, des engagements tenus.
          </p>
        </div>

        {/* 2x2 segmented grid with floating center, text pinned to OUTER corners.
            Forme pétale conservée mobile + desktop ; seules les valeurs (rayon,
            gap, padding, taille médaillon, texte) s'adaptent au breakpoint. */}
        <div className="relative mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-7">
            {pillars.map((p, i) => (
              <div key={p.t} className={`${p.style} aspect-square p-4 sm:p-6 md:p-10 flex flex-col ${p.align} ${p.vpos} shadow-xl shadow-text/10`}>
                <div className={`max-w-full md:max-w-[58%] ${p.textPad}`}>
                  <span className={`label-mono block ${p.num}`}>0{i+1}</span>
                  <div className="display text-[15px] sm:text-lg md:text-2xl lg:text-[2.1rem] leading-[1.08] mt-1.5 md:mt-2 [hyphens:none] [text-wrap:balance]">{p.t}</div>
                  <p className={`mt-2 md:mt-3 text-[11px] sm:text-xs md:text-sm leading-snug max-w-[82%] md:max-w-none min-h-[2.4em] md:min-h-0 ${p.descCls} ${p.sub}`}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Floating center medallion — taille responsive, ne chevauche pas le
              texte (épinglé aux coins extérieurs). */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[26%] sm:w-[24%] md:w-[20%] aspect-square rounded-full bg-bg shadow-2xl shadow-text/30 flex flex-col items-center justify-center text-center p-2 md:p-3 border-4 border-bg">
              <div className="kicker text-[7px] sm:text-[8px] md:text-[9px]">méthode</div>
              <div className="display text-sm sm:text-base md:text-2xl mt-0.5 md:mt-1 text-text-strong leading-[.9]">
                Humain<br/><span className="text-accent italic">× IA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-14">
          <Btn href="/agence" variant="primary">Découvrir notre histoire</Btn>
        </div>
      </Container>
    </Section>
  );
}

/* ===================== Intersection humain & tech, papillon manifeste =====================
   Section adaptée à la home live (gndconsulting.fr) avec ton et charte GND :
   - INTRO MINDSET (image gauche + tagline « Studio créatif » + stats + CTA), reprise du live
   - PAPILLON MANIFESTE : carte unique en forme de sablier couché (chocolat + 2 échancrures
     crème) avec toggle vertical 01-04 à gauche, disque central GND, et panneau de texte
     qui switche à droite. Inspiration Pinterest S'WATCH / Designed for Impact, sans la
     montre, la forme papillonnaire est conservée, le watch est remplacé par le wordmark GND.
   Comportement : clic sur 01/02/03/04 = switch titre + description du panneau. */
function IntersectionBlock() {
  const [activePanel, setActivePanel] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-advance, switch panel toutes les 6 secondes pour que les prospects qui n'ont
  // pas le réflexe de cliquer voient quand même le contenu défiler naturellement.
  // Pause au hover (souris dans la carte) ET au focus (clavier) → respect UX.
  // Le useEffect dépend de activePanel ET isPaused : chaque switch (manuel ou auto)
  // redémarre le timer 6s depuis la nouvelle slide.
  const PANEL_INTERVAL_MS = 6000;
  // PANELS est défini après, ref vers le count via une closure :
  const panelsCountRef = React.useRef(0);

  // 5 panels : 01-03 = textes EXACTS du live gndconsulting.fr (avec tags chips), 04-05 = mes
  // additions (Méthode + Partenariat) qui complètent le manifeste sans redondance.
  // Chaque panel a son set de tags affichés sous la description (chips orange/chocolat).
  const PANELS = [
    {
      num: "01",
      kicker: "Studio Créatif",
      title: "Studio Créatif.",
      desc: "Chez GND Consulting, nous croyons que chaque projet est une opportunité de créer quelque chose d'unique et de mémorable. Notre équipe de créatifs passionnés travaille main dans la main avec nos techniciens experts pour donner vie à vos idées les plus audacieuses.",
      tags: ["Production audiovisuelle", "Design créatif", "Collaboration"],
    },
    {
      num: "02",
      kicker: "Expertise Globale",
      title: "Expertise Globale.",
      desc: "Notre approche holistique couvre tous les aspects de votre projet, de la conception initiale à la livraison finale. Nous combinons expertise technique et vision stratégique pour garantir des résultats qui dépassent vos attentes et marquent durablement votre audience.",
      tags: ["Stratégie", "Technique", "Excellence"],
    },
    {
      num: "03",
      kicker: "Innovation IA",
      title: "Innovation IA.",
      desc: "Animé par une vision prospective, GND Consulting reste en veille permanente des nouvelles tendances et technologies émergentes, notamment l'intelligence artificielle, pour propulser les projets de ses clients vers de nouveaux horizons.",
      tags: ["Intelligence Artificielle", "Automatisation", "Innovation"],
    },
    {
      num: "04",
      kicker: "Méthode",
      title: "Délais tenus, points d'étape clairs.",
      desc: "Brief structuré, jalons hebdo, livrables documentés. Chaque projet a un KPI, chaque KPI a un responsable. Zéro flou opérationnel.",
      tags: ["Process", "Transparence", "KPIs"],
    },
    {
      num: "05",
      kicker: "Partenariat",
      title: "Co-création réelle, pas une prestation de plus.",
      desc: "On apprend votre métier, vos contraintes, votre audience. La création sert votre stratégie, et les collaborations qu'on signe durent dans le temps.",
      tags: ["Co-création", "Relation", "Engagement"],
    },
  ];
  const panel = PANELS[activePanel];
  panelsCountRef.current = PANELS.length;

  // Auto-advance avec setTimeout (vs setInterval) : à chaque changement de activePanel
  // (manuel ou auto), on relance un nouveau timer 6s. Cleanup auto au démontage / changement.
  // Pause si isPaused (hover / focus / écran inactif via prefers-reduced-motion).
  React.useEffect(() => {
    if (isPaused) return;
    const id = window.setTimeout(() => {
      setActivePanel(p => (p + 1) % panelsCountRef.current);
    }, PANEL_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [activePanel, isPaused]);

  return (
    <Section className="py-28 md:py-40 overflow-hidden">
      <Container>
        {/* INTRO MINDSET, image gauche + contenu droit, reproduit du live (À propos / titre
            / tagline « Studio créatif » / para / stats 15+ et 100% / tags / CTA). Reprend
            l'esprit éditorial qui pose l'état d'esprit du studio AVANT les 3 cards en-dessous. */}
        <div className="grid md:grid-cols-[1.05fr_1fr] gap-10 md:gap-16 items-stretch mb-24 md:mb-32">
          {/* Image card éditoriale, asset Nano Banana « femme noire + robot AI ».
              Composition humain × tech avec écrans créatifs (Motion Design, Mood Board) +
              caméra + light panel. Cadrage centré sur le sujet humain pour respecter le
              storytelling de la section. Forme asymétrique majeure (corner top-left 200px). */}
          <div className="relative bg-bg-alt rounded-tl-[200px] rounded-tr-3xl rounded-br-3xl rounded-bl-3xl overflow-hidden shadow-2xl shadow-text/20 min-h-[480px] md:min-h-[560px]">
            <img
              src="/assets/intersection-hero.webp"
              alt="GND, femme créative noire et assistant IA collaborant dans un studio créatif"
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              style={{ objectPosition: '40% center' }}
            />
            {/* Halo orange discret en bas, renforce le warmth + tie-in charte */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 100%, rgba(255,149,79,.18), transparent 70%)' }}
            />
            <div className="absolute top-6 right-6 label-mono text-bg/95 mix-blend-difference">
             À propos
            </div>
          </div>

          {/* Contenu intro, tagline mindset + para + stats + tags + CTA */}
          <div className="flex flex-col justify-center">
            <Kicker>À propos</Kicker>
            <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong leading-[.95]">
              L'intersection de l'<span className="italic text-accent">humain</span><br/>
              & de la <span className="italic text-accent">tech</span>.
            </h2>

            {/* Tagline subtitle, état d'esprit (reprise du live) */}
            <p className="mt-7 text-lg md:text-xl text-text-strong leading-snug font-medium max-w-xl">
              Studio créatif alliant créativité humaine et intelligence artificielle pour des projets audiovisuels et digitaux d'exception.
            </p>

            {/* Para descriptif, mindset Studio Créatif */}
            <p className="mt-5 text-text leading-relaxed max-w-xl">
              Chez GND Consulting, nous croyons que chaque projet est une opportunité de créer quelque chose d'unique et de mémorable. Notre équipe de créatifs passionnés travaille main dans la main avec nos experts techniques pour donner vie à vos idées les plus audacieuses.
            </p>

            {/* Stats, chiffres-clés du live */}
            <div className="mt-8 grid grid-cols-2 gap-6 max-w-md">
              <div>
                <div className="display text-5xl md:text-6xl text-text-strong leading-none">15<span className="text-accent">+</span></div>
                <div className="text-xs text-text-muted mt-2 label-mono">Projets réalisés</div>
              </div>
              <div>
                <div className="display text-5xl md:text-6xl text-text-strong leading-none">100<span className="text-accent">%</span></div>
                <div className="text-xs text-text-muted mt-2 label-mono">Satisfaction client</div>
              </div>
            </div>

            {/* Tags chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Stratégie", "Création", "Tech", "IA"].map(t => (
                <span key={t} className="inline-flex items-center text-xs label-mono px-3 py-1.5 rounded-full border hairline border bg-bg/60 text-text-strong">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Btn href="/agence" variant="primary">
                Découvrir notre histoire <Icons.ArrowUpRight size={14}/>
              </Btn>
            </div>
          </div>
        </div>

        {/* MANIFESTE PAPILLON, carte « sablier couché » avec toggle 01-04
            Approche : SVG-rendered shape pour précision géométrique exacte (rectangle
            arrondi + 2 cercles soustraits via SVG mask au centre des longs côtés).
            Centre : médaillon GND (remplace la montre des refs Pinterest S'WATCH/Designed
            for Impact). Toggle 01-04 à gauche, panneau de texte à droite, switch au clic. */}
        <div className="relative mx-auto w-full max-w-[1180px]">
          {/* Carte papillon, asset Nano Banana V2 (chocolat texturé satin).
              L'image apporte la forme + le ring crème + la texture chocolat charte. Les
              overlays HTML ajoutent : médaillon GND centré, toggle interactif 01-06, panneau
              de texte droit. La zone des labels baked est masquée par un patch chocolat opaque
              derrière le toggle (même teinte que la forme, donc invisible). */}
          <div
            className="relative group hidden md:block"
            style={{ aspectRatio: '1703 / 926' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(e) => {
              // Reprend l'autoplay quand le focus quitte VRAIMENT la carte
              if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false);
            }}
          >
            <img
              src="/assets/papillon-shape-v2.webp?v=2"
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
              style={{ filter: 'drop-shadow(0 22px 32px rgba(20,12,8,.28))' }}
            />

            {/* Médaillon GND, logé comme une bille dans le creux GAUCHE de la forme V2.
                Détection pixel-précise du creux : centre cream visible à (628, 452) sur
                1703×926 = (37%, 49%). Position absolue à ces coords + translate -50% pour
                centrer le médaillon dessus, pas le coin haut-gauche. */}
            <div
              className="absolute z-10 pointer-events-none"
              style={{ left: '36.9%', top: '48.8%', transform: 'translate(-50%, -50%)' }}
            >
              <div
                className="relative rounded-full bg-bg flex items-center justify-center shadow-2xl shadow-text/50 border-2 border-accent/30"
                style={{ width: 'clamp(140px, 20vw, 260px)', aspectRatio: '1 / 1' }}
              >
                <div className="text-center">
                  <div className="display text-2xl md:text-[34px] lg:text-[40px] text-text-strong leading-none tracking-wide">
                    G<span className="text-accent">·</span>N<span className="text-accent">·</span>D
                  </div>
                  <div className="label-mono text-[8px] md:text-[10px] mt-2 text-text-muted tracking-widest">EST. 2023</div>
                </div>
                {/* Double anneau orange pour effet "bille sertie" */}
                <div className="absolute -inset-2 rounded-full border border-accent/30 pointer-events-none"/>
                <div className="absolute -inset-4 rounded-full border border-accent/15 pointer-events-none"/>
              </div>
            </div>

            {/* PATCH CRÈME, accent visuel qui marque la zone toggle.
                Avant : chocolat invisible. Maintenant : crème charte (#FFF3E8 bg-alt) pour
                créer un contraste éditorial avec la forme chocolat → ça interpelle l'œil et
                rend le toggle plus identifiable. Léger arrondi + ombre douce pour la finition. */}
            <div
              className="absolute left-[3.5%] top-[34%] w-[11%] h-[38%] z-15 pointer-events-none"
              style={{
                background: '#FFF3E8',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(20,12,8,.18), inset 0 0 0 1px rgba(83,36,24,.08)',
              }}
            />

            {/* Toggle interactif 01-05, HTML cliquable par-dessus le patch crème.
                Couleurs adaptées à un fond crème : chocolat pour inactif, orange pour actif. */}
            <div className="absolute left-[5%] top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3.5">
              {PANELS.map((p, i) => {
                const active = i === activePanel;
                return (
                  <button
                    key={p.num}
                    onClick={() => setActivePanel(i)}
                    className="group flex items-center gap-3 focus-ring cursor-pointer"
                    aria-label={`Voir le panneau ${p.num}, ${p.kicker}`}
                    aria-pressed={active}
                  >
                    {/* Numéro, couleurs adaptées au patch crème en arrière-plan :
                        inactif = chocolat 45%, hover = chocolat 75%, actif = orange */}
                    <span
                      className={`label-mono text-[13px] tabular-nums transition-colors duration-200 ${
                        active
                          ? "!text-accent font-semibold"
                          : "!text-text-strong/45 group-hover:!text-text-strong/80"
                      }`}
                    >
                      {p.num}
                    </span>
                    {/* Trait, chocolat foncé/discret inactif, orange épais actif */}
                    <span
                      className={`block transition-all duration-300 ${
                        active
                          ? "w-9 border-t-2 border-accent opacity-100"
                          : "w-3 border-t border-text-strong/25 opacity-100 group-hover:w-5 group-hover:border-text-strong/55"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Panneau de contenu droit, texte du panel actif. Hiérarchie typo renforcée
                pour interpeller : kicker avec trait orange éditorial + titre large display +
                description plus lisible + indicateur sous séparateur orange. */}
            <div className="absolute right-[7%] top-1/2 -translate-y-1/2 z-20 w-[36%] text-bg">
              {/* Kicker éditorial : trait orange + label en orange chaleureux */}
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-8 h-px bg-accent"/>
                <span className="label-mono text-[11px] !text-accent tracking-[0.18em] font-semibold">
                  {panel.kicker}
                </span>
              </div>

              {/* Titre, display large, italic accent sur dernier mot pour ponctuer */}
              <h3
                key={panel.num}
                className="display text-2xl md:text-[32px] lg:text-[36px] leading-[1.1] text-bg anim-up tracking-tight"
              >
                {panel.title}
              </h3>

              {/* Description, taille bumpée, contraste renforcé */}
              <p className="mt-5 text-bg/90 leading-[1.55] text-sm md:text-[15px] max-w-md">
                {panel.desc}
              </p>

              {/* Tags chips, reprises du live gndconsulting.fr. Style charte : pill
                  arrondie, bordure orange semi-transparente, texte cream avec hover subtil. */}
              {panel.tags && panel.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2 max-w-md">
                  {panel.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-[11px] label-mono px-3.5 py-2 rounded-full bg-accent !text-text-strong tracking-wide whitespace-nowrap font-semibold shadow-md shadow-accent/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Indicateur, séparateur orange + chiffres en label-mono tabular */}
              <div className="mt-6 flex items-center gap-3">
                <span className="block w-6 h-px bg-accent/50"/>
                <span className="label-mono text-[11px] !text-bg/70 tabular-nums tracking-widest">
                  <span className="text-accent">{panel.num}</span>
                  <span className="mx-1.5 text-bg/40">/</span>
                  {String(PANELS.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Fallback mobile, stack vertical : image papillon réduite + médaillon + panel actif (kicker + titre + desc + tags) + toggle 01-05 sous */}
          <div className="md:hidden">
            {/* Image papillon réduite (aspect-ratio 4:3 pour rester lisible) avec médaillon GND centré */}
            <div
              className="relative w-full mx-auto"
              style={{ aspectRatio: '4 / 3', maxHeight: '380px' }}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <img
                src="/assets/papillon-shape-v2.webp?v=2"
                alt=""
                draggable={false}
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                style={{ filter: 'drop-shadow(0 14px 22px rgba(20,12,8,.22))' }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="relative rounded-full bg-bg flex items-center justify-center shadow-2xl shadow-text/40 border-2 border-accent/30"
                  style={{ width: 'clamp(110px, 28vw, 160px)', aspectRatio: '1 / 1' }}
                >
                  <div className="text-center">
                    <div className="display text-2xl text-text-strong leading-none tracking-wide">
                      G<span className="text-accent">·</span>N<span className="text-accent">·</span>D
                    </div>
                    <div className="label-mono text-[8px] mt-1.5 text-text-muted tracking-widest">EST. 2023</div>
                  </div>
                  <div className="absolute -inset-2 rounded-full border border-accent/30 pointer-events-none"/>
                </div>
              </div>
            </div>

            {/* Panel actif mobile, contenu du panel sélectionné */}
            <div className="mt-8 px-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-accent"/>
                <span className="label-mono text-[11px] !text-accent tracking-[0.18em] font-semibold">
                  {panel.kicker}
                </span>
              </div>
              <h3
                key={`mobile-${panel.num}`}
                className="display text-2xl leading-[1.15] text-text-strong anim-up tracking-tight"
              >
                {panel.title}
              </h3>
              <p className="mt-4 text-text leading-[1.55] text-sm">
                {panel.desc}
              </p>
              {panel.tags && panel.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {panel.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-[11px] label-mono px-3 py-1.5 rounded-full bg-accent !text-text-strong tracking-wide font-semibold shadow-md shadow-accent/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-5 flex items-center gap-3">
                <span className="block w-6 h-px bg-accent/50"/>
                <span className="label-mono text-[11px] !text-text-muted tabular-nums tracking-widest">
                  <span className="text-accent">{panel.num}</span>
                  <span className="mx-1.5 text-text-muted/40">/</span>
                  {String(PANELS.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Toggle 01-05 sous le panel, switch par tap */}
            <div className="mt-6 flex justify-center gap-2 flex-wrap">
              {PANELS.map((p, i) => (
                <button
                  key={p.num}
                  onClick={() => setActivePanel(i)}
                  className={`label-mono px-4 py-2 rounded-full transition-colors focus-ring ${
                    i === activePanel ? "bg-text-strong text-bg" : "bg-bg-alt text-text-strong hover:bg-surface"
                  }`}
                  aria-pressed={i === activePanel}
                >
                  {p.num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ===================== Services, feature row Echelon-style ===================== */
function ServicesGrid() {
  return (
    <Section bg="alt" className="py-28 md:py-40">
      <Container>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <Kicker>Expertise</Kicker>
            <h2 className="display text-6xl md:text-8xl mt-5 text-text-strong leading-[.9]">our<br/><span className="italic text-accent">services</span>.</h2>
          </div>
          <p className="text-text max-w-xl lg:max-w-2xl md:text-right md:mt-52 lg:mt-60">
            Quatre branches, sous un même toit. Du concept à la livraison, sans courtage ni intermédiaire.
          </p>
        </div>

        {/* Service stages, 4 branches GND, portrait card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {SERVICES_CARDS.map((s, i) => {
            const image = i === 0 ? "svc-sites" : i === 1 ? "svc-design" : i === 2 ? "svc-production" : "svc-ia";
            const isAccent = i === 1;
            const isDark = i === 3;
            return (
              <a key={s.num} href={s.to}
                className={`group relative overflow-hidden rounded-t-[140px] md:rounded-t-[180px] rounded-b-2xl card-hover aspect-[1/1.5] md:aspect-[1/1.8]
                  ${isAccent ? "bg-accent" : isDark ? "bg-text-strong text-bg" : "bg-bg"}`}>
                {/* background portrait silhouette */}
                <div className="absolute inset-0 overflow-hidden rounded-inherit">
                  <div className="absolute inset-x-0 top-0 h-1/2 md:h-3/5">
                    <img
                      src={`/assets/${image}.webp`}
                      alt={`GND Consulting, ${s.title}`}
                      draggable={false}
                      className="w-full h-full object-cover object-top select-none pointer-events-none"
                      style={{ filter:'drop-shadow(0 22px 44px rgba(42,24,16,.26))' }}
                    />
                  </div>
                  <div className="absolute inset-x-0 top-[46%] h-[54%] md:top-[55%] md:h-[45%]"
                    style={{ background: isAccent ? '#FF954F' : isDark ? '#2A1810' : '#FDF6EE' }}></div>
                </div>
                <div className={`relative h-full flex flex-col justify-center md:justify-end px-6 pt-[50%] pb-6 md:pt-6 md:pb-6 ${isDark ? 'md:pb-safe' : ''}`}>
                  <div className={`label-mono ${isAccent ? "text-text-strong" : isDark ? "text-accent" : "text-text-muted"}`}>{s.num}</div>
                  <div className={`display text-2xl md:text-3xl mt-3 leading-tight ${isAccent ? "text-text-strong" : isDark ? "text-bg" : "text-text-strong"}`}>{s.title}</div>
                  <div className={`mt-3 text-xs leading-relaxed ${isAccent ? "text-text-strong/80" : isDark ? "text-bg/70" : "text-text-muted"}`}>{s.desc}</div>
                  <div className={`mt-4 inline-flex items-center gap-1 text-xs ${isAccent ? "text-text-strong" : isDark ? "text-accent" : "text-text-strong"}`}>
                    <span>En savoir plus</span> <Icons.ArrowUpRight size={12}/>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ===================== Reels mosaic, Cinematic + ported viewer (comp 7 spirit) ===================== */
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
    <div role="dialog" aria-modal="true" aria-label={`${p.title}, ${p.subtitle}`} onClick={onClose}
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
          <a href={`/realisations/${p.id}`} onClick={onClose} className="btn btn-primary !py-3">Étude de cas <Icons.ArrowUpRight size={14}/></a>
        </div>
      </div>
    </div>
  );
  return createPortal(overlay, document.body);
}

/* OUR WORK = executive-impact-carousel installé VERBATIM dans src/components/ui/.
   GSAP/ScrollTrigger, CSS structurel et structure = 1:1. Seules adaptations : données
   (vrais projets GND) + couleurs charte crème. Importé en haut de ce fichier. */

/* OUR WORK photos — bento gallery draggable, MÊME composant que la page
   Réalisations (cohérence inter-pages) avec les mêmes 7 photos et spans.
   (CircularGallery OGL gardée de côté sur disque, plus utilisée ici.) */
const BENTO_HOME_IDS: { id: string; span: string }[] = [
  { id: "art-en-mouvement", span: "md:col-span-2 md:row-span-2" },
  { id: "masque-identite", span: "md:row-span-1" },
  { id: "puissance-creative", span: "md:row-span-1" },
  { id: "vision-masquee", span: "md:row-span-2" },
  { id: "energie-collective", span: "md:row-span-1" },
  { id: "saveurs", span: "md:row-span-1" },
  { id: "vision-urbaine", span: "md:col-span-2 md:row-span-2" },
];

function ReelsMosaic() {
  return (
    <section className="relative bg-bg-alt">
      {/* Header partagé, éditorial : titre gauche giant / description + arrow link droite décalée
          Couvre TOUTE la section unifiée portfolio (photos ReelsMosaic + vidéos HologramShowcase qui suit). */}
      <div className="relative pt-24 md:pt-32 pb-10 md:pb-12">
        <Container className="relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <Kicker className="!text-text-muted">réalisations · sélection</Kicker>
              <h2 className="display text-6xl md:text-8xl lg:text-9xl mt-5 text-text-strong leading-[.88]">
                Notre portfolio <span className="italic text-accent">en mouvement</span>.
              </h2>
            </div>
            <div className="md:text-right md:max-w-md md:translate-y-24">
              <p className="text-text text-sm md:text-base leading-relaxed mb-3">
                Photographies, clips, captations, événementiel, émissions, chaque projet porte une intention, chaque image une signature.
              </p>
              <a href="/realisations" className="arrow-link !text-text-strong inline-flex items-center gap-2 hover:text-accent transition text-sm md:text-base">
                Voir tout le portfolio <Icons.ArrowRight size={18}/>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Bento gallery draggable (même composant que /realisations) */}
      <InteractiveImageBentoGallery
        imageItems={BENTO_HOME_IDS.map(({ id, span }) => {
          const p = ALL_PROJECTS.find((x: any) => x.id === id)!;
          return { id, title: p.title, desc: p.sub, url: p.img, span };
        })}
      />

      {/* Footer band */}
      <div className="relative pt-10 pb-28 md:pb-40">
        <Container className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-text-strong/10 pt-6">
            <span className="text-text-muted label-mono">7 photos ici · portraits, studio, événementiel · portfolio complet sur Réalisations</span>
            <a href="/realisations" className="inline-flex items-center gap-2 text-text-strong hover:text-accent transition">
              Découvrir tout le portfolio <Icons.ArrowRight size={18}/>
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ===================== Why we need [signature] , Stoicism inspired ===================== */
function WhyBlock() {
  // 12/06/26 v2 — INTÉGRATION SUR MAQUETTE VIERGE fournie par Roodny
  // (why-mockup-blank.webp : même scène, carte vide, pills boutons déjà
  // dessinées dans l'image). Desktop : l'image vierge est le fond complet de
  // la section (aspect 1672/941) et les textes/icônes HTML sont posés en
  // overlay aux positions mesurées au pixel sur la maquette remplie
  // (why-mockup-source.png, conservée pour référence). Les CTA sont des <a>
  // posés exactement sur les pills de l'image (orange : x 6.8→21%,
  // y 81→88% ; contour : x 23→37.5%). Tailles texte fluides en vw (section
  // full-bleed). Mobile : empilement carte texte + scène (crop existant).
  const steps = [
    {
      num: "01", label: "Bénéfices Garantis",
      desc: "Résultats concrets et mesurables pour votre entreprise.",
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[55%] h-[55%]"><circle cx="12" cy="8" r="4"/><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>),
      active: false,
    },
    {
      num: "02", label: "Excellence Créative",
      desc: "Des créations uniques qui marquent les esprits.",
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[55%] h-[55%]"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
      active: true,
    },
    {
      num: "03", label: "Respect des Délais",
      desc: "Livraison dans les temps, qualité préservée.",
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[55%] h-[55%]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
      active: false,
    },
  ];

  return (
    <Section className="relative py-0 overflow-hidden" style={{ background: '#F8E1CB' }}>
      {/* ============ DESKTOP : maquette vierge + overlay positionné ============ */}
      <div className="relative hidden lg:block w-full" style={{ aspectRatio: '1672 / 941' }}>
        <img
          src="/assets/why-mockup-blank.webp"
          alt="Aperçu d'un site vitrine réalisé par GND Consulting"
          draggable={false}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full select-none pointer-events-none"
        />

        {/* Label · NOTRE CONVICTION | STUDIO HYBRIDE */}
        <div className="absolute flex items-center gap-[0.8vw]" style={{ left: '6.9%', top: '15.6%' }}>
          <span className="rounded-full bg-accent" style={{ width: '0.45vw', height: '0.45vw' }} />
          <span className="label-mono !text-accent" style={{ fontSize: '0.62vw', letterSpacing: '0.22em' }}>NOTRE CONVICTION</span>
          <span className="bg-text-strong/20" style={{ width: '1px', height: '0.8vw' }} />
          <span className="label-mono !text-text-muted" style={{ fontSize: '0.62vw', letterSpacing: '0.22em' }}>STUDIO HYBRIDE</span>
        </div>

        {/* Titre serif 3 lignes */}
        <h2 className="absolute display text-text-strong" style={{ left: '6.9%', top: '21.5%', fontSize: '3.1vw', lineHeight: 1.12 }}>
          <span className="block">Pourquoi le studio</span>
          <span className="block">hybride bat le</span>
          <span className="block"><span className="italic text-accent">studio classique</span>.</span>
        </h2>

        {/* Paragraphe */}
        <p className="absolute text-text" style={{ left: '6.9%', top: '44.6%', fontSize: '0.97vw', lineHeight: 1.55, width: '32%' }}>
          Un studio classique vend du temps humain : cher, lent, rare.<br/>
          Une IA brute vend du volume : vide, sans direction.<br/>
          <strong className="text-text-strong">GND fait les deux : direction humaine, exécution augmentée.</strong>
        </p>

        {/* Bénéfices 01/02/03 — nodes + ligne + séparateurs */}
        <div aria-hidden className="absolute" style={{ left: '8.65%', top: '58%', bottom: '26%', width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(255,149,79,0.45) 20%, rgba(83,36,24,0.12) 50%, rgba(255,149,79,0.45) 80%, transparent)' }} />
        {steps.map((step, si) => {
          const tops = ['55.4%', '63.6%', '71.8%'];
          return (
            <div key={step.num} className="absolute flex items-start" style={{ left: '6.9%', top: tops[si], width: '33%', gap: '1vw' }}>
              <div
                className={`relative z-10 flex items-center justify-center flex-shrink-0 ${
                  step.active
                    ? 'rounded-[0.8vw] bg-accent/15 text-accent ring-1 ring-accent/50 shadow-[0_0_22px_rgba(242,138,75,0.35)]'
                    : 'rounded-full border border-text-strong/15 text-text-strong'
                }`}
                style={{ width: '2.3vw', height: '2.3vw', background: step.active ? undefined : 'rgba(250,238,224,0.9)' }}
              >
                {step.icon}
              </div>
              <div className="flex-1" style={{ paddingTop: '0.1vw' }}>
                <div className="flex items-baseline" style={{ gap: '0.6vw', marginBottom: '0.25vw' }}>
                  <span className="label-mono !text-accent" style={{ fontSize: '0.6vw', letterSpacing: '0.18em' }}>{step.num}</span>
                  <span className="display text-text-strong leading-none" style={{ fontSize: '1.25vw' }}>{step.label}</span>
                </div>
                <p className="text-text" style={{ fontSize: '0.82vw', lineHeight: 1.5 }}>{step.desc}</p>
                {si < 2 && <div className="border-b border-text-strong/[0.07]" style={{ marginTop: '1.05vw', width: '92%' }} />}
              </div>
            </div>
          );
        })}

        {/* CTA posés SUR les pills de l'image (zones mesurées) */}
        <a
          href="/agence"
          className="group absolute flex items-center justify-center font-semibold text-text-strong rounded-full transition-transform hover:scale-[1.02]"
          style={{ left: '6.8%', top: '81%', width: '14.3%', height: '7%', fontSize: '0.92vw', gap: '0.5vw' }}
        >
          Lire le manifeste
          <Icons.ArrowUpRight size={14} stroke={2.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ width: '0.9vw', height: '0.9vw' }} />
        </a>
        <a
          href="/realisations"
          className="group absolute flex items-center justify-center font-medium text-text-strong rounded-full transition-all hover:text-accent"
          style={{ left: '23%', top: '81%', width: '14.5%', height: '7%', fontSize: '0.92vw', gap: '0.5vw' }}
        >
          Voir la preuve
          <Icons.ArrowUpRight size={13} stroke={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ width: '0.85vw', height: '0.85vw' }} />
        </a>
      </div>

      {/* ============ MOBILE/TABLET : empilement propre ============ */}
      <div className="lg:hidden px-5 py-12">
        <div className="rounded-[32px] px-6 py-9" style={{ background: 'rgba(250,238,224,0.94)', boxShadow: '0 14px 44px rgba(83,36,24,0.10)' }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="label-mono text-[10px] !text-accent tracking-[0.22em]">NOTRE CONVICTION</span>
            <span className="w-px h-3 bg-text-strong/20" />
            <span className="label-mono text-[10px] !text-text-muted tracking-[0.22em]">STUDIO HYBRIDE</span>
          </div>
          <h2 className="display text-4xl text-text-strong leading-[1.08]">
            Pourquoi le studio hybride bat le <span className="italic text-accent">studio classique</span>.
          </h2>
          <p className="mt-5 text-sm text-text leading-relaxed">
            Un studio classique vend du temps humain : cher, lent, rare. Une IA brute vend du volume : vide, sans direction. <strong className="text-text-strong">GND fait les deux : direction humaine, exécution augmentée.</strong>
          </p>
          <div className="mt-7 space-y-5">
            {steps.map((step) => (
              <div key={step.num} className="flex items-start gap-3.5">
                <div className={`flex items-center justify-center w-9 h-9 flex-shrink-0 ${step.active ? 'rounded-[11px] bg-accent/15 text-accent ring-1 ring-accent/50' : 'rounded-full border border-text-strong/15 text-text-strong'}`}>
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="label-mono text-[10px] !text-accent tracking-widest">{step.num}</span>
                    <span className="display text-lg text-text-strong leading-none">{step.label}</span>
                  </div>
                  <p className="text-[12px] text-text leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/agence" className="inline-flex items-center gap-2 bg-accent text-text-strong rounded-full px-6 py-3 font-semibold text-sm shadow-lg shadow-accent/30">
              Lire le manifeste <Icons.ArrowUpRight size={14} stroke={2.2}/>
            </a>
            <a href="/realisations" className="inline-flex items-center gap-2 rounded-full border border-text-strong/20 px-5 py-3 text-sm font-medium text-text-strong">
              Voir la preuve <Icons.ArrowUpRight size={13} stroke={2}/>
            </a>
          </div>
        </div>
        <img
          src="/assets/why-mockup-scene.webp"
          alt="Studio GND : station de montage, direction créative humaine augmentée par l'IA"
          draggable={false}
          loading="lazy"
          decoding="async"
          className="mt-8 w-full h-auto rounded-[28px] select-none"
        />
      </div>
    </Section>
  );
}

/* ===================== Legacy WhyBlock, non utilisé, conservé pour ref ===================== */
function _LegacyWhyBlock() {
  // DA refait à plat depuis la ref Pinterest « Coffee Shop », direction artistique reproduite
  // composante par composante :
  //  1. Vagues SVG organiques dominantes qui TRAVERSENT l'image (pas juste en bas)
  //  2. Foliage stylisé en haut-droite (feuilles chocolat-clair, rappel des feuilles bleues de la ref)
  //  3. Mini header carte : logo cercle GND + label éditorial en haut-gauche
  //  4. 3 cards features avec ICÔNE en haut, titre, sous-titre (style Bonus/Cookies/Sweet)
  //  5. CTA pill orange large dominant (rappel Save Now)
  //  6. Image qui se "pose" sur une vague-shelf à droite, corners arrondis + ombre projetée
  //  7. Particules en cluster dense autour de l'image
  //  8. Charte GND respectée : chocolat dominant + crème + orange accent franc
  // INVERSION COMPLÈTE, fond CRÈME (cohérence avec le reste du site, plus de chocolat island)
  // Sur ce fond crème, on joue avec :
  //   • Vagues SVG en chocolat (#532418/#3D2418), petites + organiques, accents orange #FF954F
  //   • Foliage chocolat semi-transparent
  //   • Particules chocolat/orange (visibles sur cream, pas cream-on-cream)
  //   • Cards features cream avec bordure chocolat (card centrale orange)
  //   • L'image cinéma chocolat = ANCRE visuelle sombre qui contraste avec le cream
  //   • Texte chocolat (text-text-strong) au lieu de cream
  return (
    <Section className="relative py-28 md:py-40 overflow-hidden">
      {/* COUCHE 1, VAGUES ORGANIQUES chocolat sur fond crème (inversion des couleurs) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="why-wave-a-cream" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#532418" stopOpacity="0.10"/>
            <stop offset="100%" stopColor="#2A1810" stopOpacity="0.05"/>
          </linearGradient>
          <linearGradient id="why-wave-b-cream" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3D2418" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#2A1810" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="why-wave-c-cream" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF954F" stopOpacity="0"/>
            <stop offset="50%" stopColor="#FF954F" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#FF954F" stopOpacity="0"/>
          </linearGradient>
          <radialGradient id="why-spotlight-cream" cx="78%" cy="50%" r="45%">
            <stop offset="0%" stopColor="#FF954F" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#FF954F" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Vague A, grande courbe chocolat subtile sur cream */}
        <path
          d="M0,80 C280,40 520,260 760,180 C1000,100 1240,320 1600,220 L1600,1000 L0,1000 Z"
          fill="url(#why-wave-a-cream)"
        />
        {/* Vague B, inversée plus serrée */}
        <path
          d="M0,640 C240,520 500,780 800,640 C1100,500 1340,720 1600,580 L1600,1000 L0,1000 Z"
          fill="url(#why-wave-b-cream)"
        />
        {/* Vague C, stroke orange dynamique à mi-hauteur (accent série 1) */}
        <path
          d="M0,440 C300,360 600,520 900,440 C1200,360 1400,500 1600,420"
          stroke="url(#why-wave-c-cream)" strokeWidth="120" fill="none" opacity="0.6"
        />
        {/* Spotlight orange diffus autour de l'image */}
        <ellipse cx="1240" cy="500" rx="460" ry="360" fill="url(#why-spotlight-cream)"/>

        {/* Vague d'accent orange série 1, petite courbe orange qui flotte */}
        <path
          d="M100,320 C260,290 420,360 580,330"
          stroke="#FF954F" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45"
        />
        <path
          d="M120,360 C280,330 440,400 600,370"
          stroke="#532418" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.25"
        />
      </svg>

      {/* COUCHE 2, FOLIAGE chocolat semi-transparent sur cream */}
      <svg
        className="absolute top-0 right-0 w-[35%] h-[55%] pointer-events-none"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <g fill="#532418" opacity="0.18">
          <path d="M 320 50 Q 380 80 360 160 Q 340 180 300 160 Q 280 130 310 90 Q 320 70 320 50 Z"/>
          <path d="M 220 100 Q 280 130 250 200 Q 220 220 200 180 Q 195 150 220 100 Z" opacity="0.7"/>
          <path d="M 160 40 Q 200 60 180 110 Q 165 120 145 100 Q 145 70 160 40 Z" opacity="0.5"/>
        </g>
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-[28%] h-[42%] pointer-events-none"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <g fill="#532418" opacity="0.15">
          <path d="M 60 350 Q 20 320 50 240 Q 80 220 110 250 Q 130 290 100 330 Q 80 350 60 350 Z"/>
          <path d="M 150 280 Q 110 250 130 200 Q 160 180 180 220 Q 185 250 150 280 Z" opacity="0.7"/>
        </g>
      </svg>

      {/* COUCHE 3, PARTICULES chocolat/orange visibles sur le cream */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { l: '62%', t: '18%', s: 4, o: 0.4,  c: '#532418' },
          { l: '68%', t: '12%', s: 3, o: 0.35, c: '#532418' },
          { l: '74%', t: '24%', s: 5, o: 0.55, c: '#FF954F' },
          { l: '82%', t: '16%', s: 3, o: 0.4,  c: '#532418' },
          { l: '88%', t: '22%', s: 4, o: 0.55, c: '#FF954F' },
          { l: '92%', t: '32%', s: 3, o: 0.35, c: '#532418' },
          { l: '94%', t: '46%', s: 4, o: 0.45, c: '#532418' },
          { l: '88%', t: '60%', s: 5, o: 0.55, c: '#FF954F' },
          { l: '78%', t: '74%', s: 3, o: 0.4,  c: '#532418' },
          { l: '70%', t: '82%', s: 4, o: 0.5,  c: '#FF954F' },
          { l: '60%', t: '78%', s: 3, o: 0.35, c: '#532418' },
          { l: '8%',  t: '24%', s: 3, o: 0.3,  c: '#532418' },
          { l: '16%', t: '60%', s: 4, o: 0.45, c: '#FF954F' },
          { l: '32%', t: '82%', s: 3, o: 0.3,  c: '#532418' },
          { l: '40%', t: '14%', s: 3, o: 0.3,  c: '#532418' },
          { l: '5%',  t: '80%', s: 4, o: 0.4,  c: '#FF954F' },
        ].map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: d.l, top: d.t, width: `${d.s}px`, height: `${d.s}px`,
              background: d.c, opacity: d.o,
              boxShadow: d.c === '#FF954F' ? `0 0 ${d.s * 3}px ${d.c}` : 'none',
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        {/* Mini header carte (logo cercle chocolat + label éditorial sur cream) */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-text-strong flex items-center justify-center shadow-lg shadow-text/30 border border-accent/40">
            <span className="display text-base text-bg leading-none">G<span className="text-accent">·</span>N<span className="text-accent">·</span>D</span>
          </div>
          <div className="flex flex-col">
            <div className="label-mono text-[10px] !text-accent tracking-widest">NOTRE CONVICTION</div>
            <div className="text-text-muted text-xs">Studio hybride · Humain × IA</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* COL GAUCHE, titre + intro + 3 features icônes + CTA pill, tout en chocolat sur cream */}
          <div className="lg:col-span-6">
            <h2 className="display text-5xl md:text-6xl lg:text-[80px] text-text-strong leading-[.92]">
              Pourquoi le studio hybride<br/>
              bat le <span className="italic text-accent">studio classique</span>.
            </h2>
            <p className="mt-7 text-base md:text-lg text-text leading-relaxed max-w-xl">
              Un studio classique vend du temps humain, cher, lent, rare. Une IA brute vend du volume, vide, sans direction. <strong className="text-text-strong">GND fait les deux : direction humaine, exécution augmentée.</strong> Le ratio idée/livré explose. Les délais fondent. Les budgets tiennent.
            </p>

            {/* 3 cards features, sur cream, alternance cream/orange/cream avec bordures fines chocolat */}
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
              {[
                {
                  num: "01", label: "Humain", desc: "Œil + sens créatif.",
                  icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><circle cx="12" cy="12" r="3"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/></svg>),
                  bg: "bg-bg-alt", iconBox: "bg-accent/15", iconColor: "text-accent",
                  border: "border border-text-strong/10",
                },
                {
                  num: "02", label: "IA", desc: "Vitesse, échelle.",
                  icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>),
                  bg: "bg-accent", iconBox: "bg-text-strong/15", iconColor: "text-text-strong",
                  border: "",
                },
                {
                  num: "03", label: "Résultat", desc: "Livré, mesuré.",
                  icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><polyline points="20 6 9 17 4 12"/></svg>),
                  bg: "bg-bg-alt", iconBox: "bg-accent/15", iconColor: "text-accent",
                  border: "border border-text-strong/10",
                },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className={`${m.bg} ${m.border} rounded-2xl p-4 md:p-5 shadow-xl ${i === 1 ? 'shadow-accent/30' : 'shadow-text/15'} transform ${i === 1 ? 'lg:-translate-y-2' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-xl ${m.iconBox} ${m.iconColor} flex items-center justify-center mb-3`}>
                    {m.icon}
                  </div>
                  <div className={`label-mono text-[9px] mb-1 ${i === 1 ? '!text-text-strong/65' : '!text-accent'}`}>{m.num}</div>
                  <div className="display text-xl text-text-strong leading-tight">{m.label}</div>
                  <div className={`text-[11px] mt-1 leading-snug ${i === 1 ? 'text-text-strong/70' : 'text-text-muted'}`}>{m.desc}</div>
                </div>
              ))}
            </div>

            {/* CTA dominant pill orange + lien secondaire chocolat */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href="/agence" className="inline-flex items-center gap-2 bg-accent text-text-strong rounded-full px-7 py-3.5 font-semibold text-base shadow-2xl shadow-accent/40 hover:shadow-accent/60 transition-shadow">
                Lire le manifeste <Icons.ArrowUpRight size={16} stroke={2}/>
              </a>
              <a href="/realisations" className="inline-flex items-center gap-2 text-text-strong hover:text-accent text-sm font-medium underline decoration-accent decoration-2 underline-offset-8 transition-colors">
                Voir la preuve
              </a>
            </div>
          </div>

          {/* COL DROITE, composition SANDWICH (sujet émerge des vagues) */}
          <div className="lg:col-span-6 relative">
            {/* PARTICULES VAPEUR au-dessus de l'image (équivalent étoiles/buée chaude de la ref) */}
            <div className="absolute -top-8 left-[20%] right-[10%] h-24 pointer-events-none z-30">
              {[
                { x: '10%', y: '20%', s: 2, o: 0.6 },
                { x: '25%', y: '40%', s: 3, o: 0.7 },
                { x: '15%', y: '70%', s: 2, o: 0.5 },
                { x: '38%', y: '30%', s: 4, o: 0.8 },
                { x: '50%', y: '15%', s: 2, o: 0.55 },
                { x: '55%', y: '60%', s: 3, o: 0.65 },
                { x: '70%', y: '35%', s: 2, o: 0.6 },
                { x: '85%', y: '50%', s: 3, o: 0.7 },
                { x: '92%', y: '20%', s: 2, o: 0.5 },
              ].map((p, i) => (
                <span
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: p.x, top: p.y,
                    width: `${p.s}px`, height: `${p.s}px`,
                    background: '#FF954F',
                    opacity: p.o,
                    boxShadow: `0 0 ${p.s * 4}px #FF954F`,
                  }}
                />
              ))}
            </div>

            <div className="relative" style={{ transform: 'rotate(-2deg)' }}>
              {/* Glow orange diffus derrière, séparation lumineuse du fond */}
              <div
                className="absolute -inset-10 rounded-[50px] pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle, rgba(255,149,79,.35) 0%, transparent 65%)', filter: 'blur(35px)' }}
              />

              {/* IMAGE CARD, z-10 (au milieu du sandwich) */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-text/50" style={{ aspectRatio: '1707 / 926' }}>
                <img
                  src="/assets/why-block-hero.webp"
                  alt="GND, créatif au montage couleur dans un cocon studio chocolat avec LED orange"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />
                {/* Reflet vertical lumineux sur face avant (rappel highlight 3D du gobelet) */}
                <div
                  className="absolute inset-y-0 left-[10%] w-[2px] pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 70%, transparent 100%)', filter: 'blur(2px)' }}
                />
                {/* Glow doré subtil au sommet (lumière chaude qui frôle) */}
                <div
                  className="absolute inset-x-0 top-0 h-[40%] pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, rgba(255,149,79,.15) 0%, transparent 100%)' }}
                />
                {/* Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 55%, rgba(20,12,8,.30) 100%)' }}
                />
                {/* Tag éditorial flottant haut-gauche */}
                <div className="absolute top-5 left-5 surface-card px-3 py-1.5 bg-bg/95 z-20">
                  <div className="label-mono text-[9px] !text-text-muted">LIVE</div>
                  <div className="text-text-strong text-xs font-medium">Color grading session</div>
                </div>
                {/* Badge orange flottant bas-droit (rappel "Save Now" pastille) */}
                <div className="absolute -bottom-3 -right-3 bg-accent rounded-2xl px-4 py-2.5 shadow-2xl shadow-accent/50 z-30" style={{ transform: 'rotate(4deg)' }}>
                  <div className="label-mono text-[9px] !text-text-strong/70">Workflow</div>
                  <div className="text-text-strong text-xs font-bold">Humain × IA</div>
                </div>
              </div>

              {/* ★ VAGUE QUI PASSE DEVANT LA BASE DE L'IMAGE, z-20 (top du sandwich)
                  Effet : l'image "émerge" de la vague crème, comme le gobelet dans le ref.
                  Vague NETTEMENT OPAQUE pour bien marquer l'effet 3D d'émergence. */}
              <svg
                className="absolute left-[-5%] right-[-5%] bottom-[-8%] w-[110%] h-[28%] z-20 pointer-events-none"
                viewBox="0 0 800 240"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="front-wave-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FDF6EE" stopOpacity="0.95"/>
                    <stop offset="50%" stopColor="#FDF6EE" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#FFF3E8" stopOpacity="1"/>
                  </linearGradient>
                  <linearGradient id="front-wave-crest" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF954F" stopOpacity="0"/>
                    <stop offset="50%" stopColor="#FF954F" stopOpacity="0.7"/>
                    <stop offset="100%" stopColor="#FF954F" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Vague cream OPAQUE qui ondule sur la base de l'image */}
                <path
                  d="M0,100 C150,40 280,140 420,80 C560,20 680,110 800,60 L800,240 L0,240 Z"
                  fill="url(#front-wave-fill)"
                />
                {/* Crête de la vague, fine ligne orange GLOWING qui suit la courbe */}
                <path
                  d="M0,100 C150,40 280,140 420,80 C560,20 680,110 800,60"
                  stroke="url(#front-wave-crest)"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Deuxième vague cream plus douce, légèrement décalée */}
                <path
                  d="M0,180 C200,140 380,220 540,170 C700,130 750,200 800,170 L800,240 L0,240 Z"
                  fill="#FFF3E8"
                  opacity="0.6"
                />
              </svg>

              {/* ICÔNES SCATTERED, équivalent grains de café posés sur la vague crème.
                  Positionnés SUR la vague (donc sous l'image mais sur le sol cream). */}
              <div className="absolute -bottom-16 left-[-3%] right-[-3%] h-24 z-30 pointer-events-none">
                {[
                  { x: '8%',  y: '40%', rotate: -15, scale: 1,
                    svg: <svg viewBox="0 0 24 24" fill="#532418" className="w-5 h-5"><path d="M9 2v2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-4V2H9zm3 5a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"/></svg> },
                  { x: '20%', y: '70%', rotate: 8, scale: 0.85,
                    svg: <svg viewBox="0 0 24 24" fill="#FF954F" className="w-4 h-4"><circle cx="12" cy="12" r="10"/></svg> },
                  { x: '32%', y: '50%', rotate: -20, scale: 0.9,
                    svg: <svg viewBox="0 0 24 24" fill="#532418" className="w-4 h-4"><rect x="3" y="4" width="18" height="16" rx="2"/></svg> },
                  { x: '45%', y: '75%', rotate: 12, scale: 0.7,
                    svg: <svg viewBox="0 0 24 24" fill="#FF954F" className="w-3 h-3"><circle cx="12" cy="12" r="10"/></svg> },
                  { x: '58%', y: '45%', rotate: -8, scale: 1.05,
                    svg: <svg viewBox="0 0 24 24" fill="#532418" className="w-5 h-5"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg> },
                  { x: '72%', y: '65%', rotate: 18, scale: 0.85,
                    svg: <svg viewBox="0 0 24 24" fill="#3D2418" className="w-4 h-4"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg> },
                  { x: '85%', y: '50%', rotate: -12, scale: 0.95,
                    svg: <svg viewBox="0 0 24 24" fill="#FF954F" className="w-4 h-4"><circle cx="12" cy="12" r="10"/></svg> },
                  { x: '92%', y: '78%', rotate: 5, scale: 0.7,
                    svg: <svg viewBox="0 0 24 24" fill="#532418" className="w-3 h-3"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg> },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: item.x, top: item.y,
                      transform: `rotate(${item.rotate}deg) scale(${item.scale})`,
                      filter: 'drop-shadow(0 2px 4px rgba(42,24,16,.3))',
                    }}
                  >
                    {item.svg}
                  </div>
                ))}
              </div>

              {/* Petite carte secondaire en bas-gauche, z-40 (au-dessus de tout) */}
              <div className="absolute -bottom-8 -left-5 surface-card bg-bg p-3 shadow-xl shadow-text/40 max-w-[180px] border border-text-strong/10 z-40" style={{ transform: 'rotate(-5deg)' }}>
                <div className="label-mono text-[9px] !text-accent mb-1">RATIO</div>
                <div className="display text-2xl text-text-strong leading-none">3<span className="text-accent">×</span></div>
                <div className="text-[10px] text-text-muted mt-1 label-mono">plus de livrables / mois</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ===================== Values ===================== */
function ValuesBlock() {
  // Infographie = asset Nano Banana (values-infographic.webp, 1448×1086, fond transparent) :
  // 4 panneaux chocolat zigzag + badges orange en relief + numéros baked. Les zones texte
  // sont vides dans l'image → on overlaye titre + description en HTML par-dessus.
  // Zones texte calées sur les 4 badges détectés (cream rings, composantes connexes).
  // top = centre Y du badge = centre vertical du panneau. Texte complet (VALUES.desc).
  const ROWS = [
    { ...VALUES[0], desc: "Un métier, pas une prestation.\nChaque projet porte une intention.", top: '16%', left: '37%', width: '32%' }, // 01 nudge bas + droite pour centrer panneau
    { ...VALUES[1], desc: "Délais tenus, points d'étape clairs,\nlivrables documentés.", top: '37%', left: '46%', width: '42%' }, // 02 "livrables documentés" gardés ensemble sur ligne 2
    { ...VALUES[2], desc: "IA & automatisation intégrée à la chaîne créative, jamais subies.", top: '60%', left: '35%', width: '33%' }, // 03 recentré (left 35%) entre chiffre et ampoule, wrap naturel
    { ...VALUES[3], desc: "Co-création réelle : votre métier guide\nla création.", top: '80%', left: '46%', width: '42%' }, // 04 micro-décalage droite (44→46%) + "la création" sur ligne 2
  ];

  // Anim, GSAP ScrollTrigger : reveal séquentiel header → image → rows (alternés L/R) → CTA.
  // yPercent -50 baseline sur rows pour préserver le centrage vertical sur les panneaux.
  const rootRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set('[data-anim="values-row"]', { yPercent: -50 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      });
      tl.from('[data-anim="values-kicker"]', { y: 18, opacity: 0, duration: 0.55 })
        .from('[data-anim="values-h2"]', { y: 32, opacity: 0, duration: 0.8 }, '-=0.3')
        .from('[data-anim="values-lead"]', { y: 16, opacity: 0, duration: 0.55 }, '-=0.5')
        .from('[data-anim="values-image"]', {
          scale: 0.92, opacity: 0, duration: 1.05, ease: 'power3.out',
        }, '-=0.15')
        .from('[data-anim="values-row"]', {
          x: (i: number) => (i % 2 === 0 ? -34 : 34),
          opacity: 0,
          duration: 0.6,
          stagger: 0.13,
          ease: 'power2.out',
        }, '-=0.65')
        .from('[data-anim="values-cta"]', { y: 18, opacity: 0, duration: 0.5 }, '-=0.2');
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section className="py-24 md:py-32 relative overflow-hidden">
      <Container>
        <div ref={rootRef}>
          {/* Header centré */}
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <div data-anim="values-kicker"><Kicker>ADN GND</Kicker></div>
            <h2 data-anim="values-h2" className="display text-5xl md:text-7xl mt-5 text-text-strong leading-[.95]">
              Nos Valeurs <span className="italic text-accent">Fondatrices</span>.
            </h2>
            <p data-anim="values-lead" className="mt-6 text-text text-base md:text-lg leading-relaxed">
              Les principes qui guident notre approche et nous engagent à offrir des expériences mémorables.
            </p>
          </div>

          {/* INFOGRAPHIE, image asset + texte HTML overlay dans les zones vides.
              Le texte overlay est dimensionné en cqw (container-query width) → il
              scale proportionnellement avec l'image à TOUTES les tailles, donc rentre
              toujours dans les panneaux cuits (desktop ET mobile), sans débordement.
              containerType: inline-size active le contexte cqw. */}
          <div className="hidden sm:block relative sm:-mx-8 md:mx-auto" style={{ maxWidth: '920px', aspectRatio: '1448 / 1086', containerType: 'inline-size' }}>
            <img
              data-anim="values-image"
              src="/assets/values-infographic.webp?v=2"
              alt="Les valeurs fondatrices de GND Consulting : artisanat, rigueur, IA maîtrisée, collaboration"
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
            />

            {/* Overlay texte, 1 bloc par panneau, centré verticalement sur le panneau */}
            {ROWS.map((r) => (
              <div
                key={r.num}
                data-anim="values-row"
                className="absolute"
                style={{ top: r.top, left: r.left, width: r.width }}
              >
                <h3 className="display text-bg leading-none" style={{ fontSize: 'clamp(11px, 2.55cqw, 24px)' }}>{r.title}</h3>
                <p className="text-bg/65 leading-snug whitespace-pre-line" style={{ fontSize: 'clamp(7px, 1.25cqw, 11px)', marginTop: 'clamp(2px, 0.4cqw, 6px)' }}>{r.desc}</p>
              </div>
            ))}
          </div>

          {/* MOBILE (<sm) : liste lisible des valeurs (l'infographie baked est
              illisible à 390px sans clipper les panneaux → liste à la place,
              même contenu, esprit conservé). Desktop garde l'infographie. */}
          <div className="sm:hidden divide-y divide-text-strong/10 border-y border-text-strong/10">
            {VALUES.map((v) => (
              <div key={v.num} className="flex items-start gap-4 py-5">
                <span className="display text-3xl text-accent leading-none shrink-0 tabular-nums">{v.num}</span>
                <div>
                  <h3 className="display text-xl text-text-strong leading-tight">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-text leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA centré sous l'infographie */}
          <div data-anim="values-cta" className="text-center mt-12 md:mt-14">
            <Btn href="/agence" variant="primary">Lire le manifeste</Btn>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function TestimonialsBlock() {
  // Pas de témoignages clients fabriqués : on affiche la signature réelle du studio
  // (engagements vérifiables) tant que de vrais verbatims clients ne sont pas collectés.
  const items = [
    { q:"L'humain décide, l'IA accélère. Chaque livrable est signé à la main, la direction créative ne se délègue pas.", a:"Méthode GND", role:"Humain × IA" },
    { q:"Un studio, six métiers internalisés, un seul interlocuteur. La preuve avant la promesse.", a:"Promesse GND", role:"Studio créatif · Paris" },
    { q:"Délais tenus, droits clairs, livrables documentés. Des engagements vérifiables, pas des slogans.", a:"Engagement GND", role:"Production interne" },
  ];
  const [i, setI] = React.useState(0);
  return (
    <Section bg="alt" className="py-28 md:py-40">
      <Container>
        <div className="max-w-4xl">
          <Kicker>Notre signature, Humain × IA</Kicker>
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
        <div className="max-w-2xl">
          <Kicker>Questions fréquentes</Kicker>
          <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Toutes les <span className="italic text-accent">réponses</span>.</h2>
          <p className="mt-6 text-text">Une question qui ne figure pas ici ? Écrivez-nous, réponse sous 24h.</p>
        </div>
        <div className="mt-12 max-w-3xl">
            <FaqJsonLd id="home" items={[
              { q: 'Comment travaillez-vous concrètement ?', a: "Brief, co-création, validation, livraison, toujours documenté. L'IA accélère certaines étapes (recherche, prototypage, post-production), mais la direction créative reste humaine." },
              { q: 'Quel budget pour un projet ?', a: "Nous travaillons en approche sur-mesure : chaque projet fait l'objet d'un devis personnalisé. Pour les sites vitrines, des formules à prix fixe sont affichées sur la page dédiée (à partir de 800 €)." },
              { q: 'Travaillez-vous à distance ?', a: "Oui, équipe basée en région parisienne, captations partout en France et à l'international. Visios pour les phases de brief et de validation." },
              { q: "Comment utilisez-vous l'IA ?", a: "Comme un outil de productivité encadré : génération de variantes, automatisations, post-production. Les usages sont documentés et conformes à l'AI Act (UE 2024/1689)." },
              { q: 'Quels sont les délais habituels ?', a: "Site vitrine : 1 à 2 semaines. Identité visuelle : 2 à 4 semaines. Production vidéo : variable selon l'ampleur, devis détaillé sous 48h." },
            ]} />
            <Faq q="Comment travaillez-vous concrètement ?" a={<>Brief, co-création, validation, livraison, toujours documenté. L'IA accélère certaines étapes (recherche, prototypage, post-production), mais la direction créative reste humaine.</>}/>
            <Faq q="Quel budget pour un projet ?" a={<>Nous travaillons en approche sur-mesure : chaque projet fait l'objet d'un <strong>devis personnalisé</strong>. Pour les sites vitrines, découvrez nos formules sur la <a href="/services/sites-vitrines" className="underline decoration-accent underline-offset-4">page dédiée</a>.</>}/>
            <Faq q="Travaillez-vous à distance ?" a={<>Oui, équipe basée à Paris, captations partout en France et à l'international. Visios pour la phase brief et validation.</>}/>
            <Faq q="Comment utilisez-vous l'IA ?" a={<>Comme un outil de productivité encadré : génération de variantes, automatisations, post-production. Les usages sont documentés et conformes à l'AI Act (UE 2024/1689).</>}/>
            <Faq q="Quels sont les délais habituels ?" a={<>Site vitrine : 1–2 semaines. Identité visuelle : 2–4 semaines. Production vidéo : variable selon ampleur, devis détaillé en 48h.</>}/>
        </div>
      </Container>
    </Section>
  );
}

/* Team slider, ported from the 21st.dev testimonial-slider, recolored to the cream charte.
   Incarnates the team. Animation timings/rotations kept verbatim. */
function TeamSlider() {
  const members = [
    { initials: "RP", quote: "L'humain décide, l'IA accélère. Chaque projet est signé à la main, la direction créative ne se délègue pas.", name: "Roodny Pierre", role: "Fondateur & CEO" },
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
        <div className="text-center mb-12"><Kicker>L'équipe, Humain × IA incarné</Kicker></div>
        <div className="mx-auto w-full max-w-4xl text-center">
          {/* rotating avatar + warm glow dome, faithful to the 21st.dev slider */}
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
          {/* quote, slide + fade, faithful timings */}
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
                <span className="font-semibold">{m.name}</span><span className="opacity-40">·</span><span className="opacity-70">{m.role}</span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ===================== ContactBlock, Formulaire de contact premium 2026 ===================== */
/* Composition inspirée du live + patterns modernes (Linear/Stripe/Apple) :
   - Titre éditorial centré + sous-titre rassurant
   - Grid 2 colonnes : formulaire à gauche (col-span-7), cards contact à droite (col-span-5)
   - FORM : floating labels animés au focus, sélecteur service en PILLS (pas dropdown),
     textarea autosize, submit pill orange avec shimmer
   - CARDS : 4 blocs verticaux, email · téléphone · adresse · Calendly
   - Toutes les interactions sont smooth (focus rings orange, scale 1.005 sur hover) */
function ContactBlock() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [service, setService] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success'>('idle');

  const SERVICES = [
    "Site Vitrine", "Identité Visuelle", "Motion Design",
    "Audiovisuel", "Photographie", "IA & Automatisation",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('sending');
    // Simulation envoi, à câbler sur backend / Formspree / Resend plus tard
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setName(''); setEmail(''); setService(''); setMessage('');
      }, 3500);
    }, 1200);
  };

  // Floating label : input "filled" si valeur OU focus (gestion via state OU CSS :placeholder-shown)
  const FloatInput = ({
    id, label, type = 'text', value, onChange, required = false,
  }: { id: string; label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean }) => (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder=" "
        className="peer w-full px-4 pt-6 pb-2 bg-bg border border-text-strong/15 rounded-2xl text-text-strong text-sm transition-all focus:border-accent focus:bg-bg-alt focus-ring outline-none"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-3.5 text-text-muted text-sm transition-all pointer-events-none peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:!text-accent peer-focus:tracking-widest peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase"
      >
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
    </div>
  );

  return (
    <Section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <Container>
        {/* SPLIT CARD, panneau chocolat (visuel + texte) à gauche | formulaire cream à droite.
            Inspiré des refs Pinterest sign-up : panneau coloré qui porte le texte + image
            arrondie inset, formulaire dans la moitié claire. Le tout dans une carte unique. */}
        <div className="relative grid md:grid-cols-12 rounded-[36px] overflow-hidden shadow-2xl shadow-text/25 border border-text-strong/8 max-w-6xl mx-auto">

          {/* ===== GAUCHE, panneau chocolat visuel ===== */}
          <div className="md:col-span-5 relative bg-text-strong text-bg p-6 md:p-8 lg:p-11 flex flex-col">
            {/* Image de fond + overlay chocolat pour la profondeur */}
            <img
              src="/assets/intersection-hero.webp"
              alt="L'humain et l'IA au cœur de la méthode GND Consulting"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover opacity-[0.16] select-none pointer-events-none"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(150deg, #2A1810 0%, rgba(42,24,16,0.94) 55%, rgba(61,36,24,0.86) 100%)' }}
            />
            {/* Glow orange déco coin haut-gauche */}
            <span className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-accent/15 blur-3xl pointer-events-none"/>

            <div className="relative z-10 flex flex-col h-full">
              {/* Kicker */}
              <div className="flex items-center gap-2 mb-6">
                <span className="block w-2 h-2 rounded-full bg-accent animate-pulse"/>
                <span className="label-mono !text-accent text-[11px] tracking-[0.22em]">CONTACT</span>
              </div>

              {/* Headline */}
              <h2 className="display text-4xl lg:text-5xl text-bg leading-[.95]">
                Parlons de votre <span className="italic text-accent">projet</span>.
              </h2>
              <p className="mt-4 text-bg/70 text-sm leading-relaxed max-w-xs">
                Partagez votre vision : réponse sous 24h, devis sous 48h.
              </p>

              {/* Image arrondie inset, COVER GND (anciennement vignette vidéos hologramme, réutilisé ici) */}
              <div className="mt-5 md:mt-7 rounded-3xl overflow-hidden border border-bg/10 shadow-xl shadow-text/50">
                <img
                  src="/assets/hero1-poster.webp"
                  alt="Studio créatif GND"
                  draggable={false}
                  loading="lazy"
                  className="w-full object-cover select-none pointer-events-none"
                  style={{ aspectRatio: '16 / 9' }}
                />
              </div>

              {/* Citation engagement éditorial, pousse à l'action en restant sobre */}
              <div className="mt-5 pt-5 md:mt-7 md:pt-7 border-t border-bg/10">
                <p className="text-bg/80 text-sm italic leading-relaxed">
                  « Chaque projet commence par une écoute. La suite, on la construit ensemble, sur-mesure, jamais sur étagère. »
                </p>
                <p className="mt-2 label-mono text-[9px] !text-bg/40 tracking-[0.2em]">
                 STUDIO GND, PARIS
                </p>
              </div>

              {/* Cards Contact DÉPLACÉES vers le panneau cream droite (grid 2x2), section plus compacte */}
            </div>
          </div>

          {/* ===== DROITE, panneau formulaire cream ===== */}
          <div className="md:col-span-7 bg-bg p-6 md:p-8 lg:p-11">
            <div className="label-mono text-[10px] !text-text-muted tracking-[0.2em] mb-1.5">DÉMARRER ICI</div>
            <h3 className="display text-2xl md:text-3xl text-text-strong leading-tight mb-7">
              Décrivez votre projet.
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nom + Email en 2 col */}
              <div className="grid sm:grid-cols-2 gap-4">
                <FloatInput id="name" label="Nom complet" value={name} onChange={setName} required />
                <FloatInput id="email" label="Email" type="email" value={email} onChange={setEmail} required />
              </div>

              {/* Service souhaité, pills */}
              <div>
                <div className="label-mono text-[10px] !text-text-muted tracking-widest mb-3">SERVICE SOUHAITÉ <span className="text-accent">*</span></div>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setService(s)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all focus-ring ${
                        service === s
                          ? 'bg-text-strong text-bg shadow-lg shadow-text/30'
                          : 'bg-bg-alt border border-text-strong/15 text-text-strong hover:border-accent hover:text-accent'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message, textarea floating label */}
              <div className="relative">
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-3 bg-bg-alt border border-text-strong/15 rounded-2xl text-text-strong text-sm transition-all focus:border-accent focus:bg-bg focus-ring outline-none resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-3.5 text-text-muted text-sm transition-all pointer-events-none peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:!text-accent peer-focus:tracking-widest peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:uppercase"
                >
                  Votre message<span className="text-accent ml-0.5">*</span>
                </label>
              </div>

              {/* Submit pill orange shimmer */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm shadow-2xl transition-all overflow-hidden ${
                    status === 'success'
                      ? 'bg-text-strong text-bg shadow-text/40'
                      : status === 'sending'
                      ? 'bg-accent/70 text-text-strong cursor-wait'
                      : 'bg-accent text-text-strong shadow-accent/40 hover:shadow-accent/70'
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"/>
                  <span className="relative z-10">
                    {status === 'success' ? '✓ Message envoyé' : status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
                  </span>
                  {status === 'idle' && <Icons.ArrowRight size={15} stroke={2.2} className="relative z-10 transition-transform group-hover:translate-x-1"/>}
                </button>

                <p className="text-[11px] text-text-muted flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Données sécurisées.
                </p>
              </div>
            </form>

            {/* Cards Contact 2x2 (déplacées depuis panneau chocolat), palette cream/chocolat pour matcher panneau droite */}
            <div className="mt-7 pt-6 md:mt-8 md:pt-7 border-t border-text-strong/10">
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { icon: <Icons.Mail size={15}/>,  label: "EMAIL",     value: "contact@gndconsulting.fr", href: "mailto:contact@gndconsulting.fr", full: true },
                  { icon: <Icons.Phone size={15}/>, label: "TÉLÉPHONE", value: "07 59 50 63 22",            href: "tel:+33759506322", full: false },
                  { icon: <Icons.MapPin size={15}/>,label: "ADRESSE",   value: "Paris, France",             href: null as string | null, full: false },
                ].map(c => {
                  const inner = (
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-bg-alt border border-text-strong/10 hover:border-accent/50 hover:bg-accent/[0.04] transition-all group h-full">
                      <div className="w-8 h-8 rounded-lg bg-text-strong/[0.06] text-accent flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-bg transition-colors">
                        {c.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="label-mono text-[8px] !text-text-muted tracking-[0.2em]">{c.label}</div>
                        <div className={`text-text-strong text-xs font-medium ${c.full ? 'break-all' : 'break-words'}`}>{c.value}</div>
                      </div>
                    </div>
                  );
                  const cls = c.full ? 'col-span-2 block' : 'block';
                  return c.href
                    ? <a key={c.label} href={c.href} className={cls}>{inner}</a>
                    : <div key={c.label} className={c.full ? 'col-span-2' : ''}>{inner}</div>;
                })}

                {/* Card Calendly, pleine largeur, accent */}
                <a
                  href="https://calendly.com/gnd63consulting/30min"
                  target="_blank"
                  rel="noreferrer"
                  className="col-span-2 flex items-center gap-2.5 p-3 rounded-xl bg-accent/12 border border-accent/40 hover:bg-accent/22 hover:border-accent transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent text-text-strong flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-text-strong text-xs font-semibold leading-tight">Planifier un appel</div>
                    <div className="text-text-muted text-[10px] mt-0.5">30 min · sans engagement</div>
                  </div>
                  <Icons.ArrowUpRight size={14} stroke={2} className="text-accent group-hover:translate-x-0.5 transition-transform flex-shrink-0"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Monte ses enfants à l'approche du viewport (marge 1200px) : allège le
   chargement initial mobile (LCP) sans perte SEO — scripts/prerender.mjs
   scrolle toute la page avant capture, donc les snapshots bots restent
   complets. Fallback : montage immédiat si IntersectionObserver absent. */
function DeferMount({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    // Prerender (scripts/prerender.mjs) : le hero ScrollExpand épingle le
    // scroll, l'IO ne se déclencherait jamais → montage immédiat via drapeau.
    if ((window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) { setShow(true); return; }
    if (typeof IntersectionObserver === 'undefined') { setShow(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setShow(true); io.disconnect(); } },
      { rootMargin: '1200px 0px' }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return show ? <>{children}</> : <div ref={ref} style={{ minHeight: '50vh' }} aria-hidden="true" />;
}

function HomePage() {
  return (
    <main id="main">
      {/* H1 unique de la page d'accueil (le hero #1 est un visuel animé, pas un
          titre sémantique). sr-only = invisible à l'écran, lu par Google/IA. */}
      <h1 className="sr-only">GND Consulting — Studio créatif humain × IA à Paris : sites web &amp; SEO, branding, audiovisuel, automatisation IA</h1>
      {/* HERO #1, ScrollExpandHero (mirror /audiovisuel).
          Test 03/06/26 demande Roodny : répliquer pattern 3-héros de la page
          audiovisuel sur la home. Hero #1 = ScrollExpand (NEW), Hero #2 =
          HeroHome existant déplacé en position 2, Hero #3 = WhyGndHomeBlock
          (NEW, mirror WhyGndAudiovisuelBlock avec content home : 5 chips
          GND · Sites · Branding · Audiovisuel · IA).
          Wrapper bg-bg-alt + pt pour respiration sous header. */}
      <div className="pt-20 md:pt-24 bg-bg-alt">
        <ScrollExpandHero
          mediaType="video"
          mediaSrc="/assets/hero1-video.mp4"
          posterSrc="/assets/hero1-poster.webp"
          bgImageSrc="/assets/hero1-bg-v2.webp"
          title="Un studio, une vision."
          date="GND · Studio créatif Paris"
          scrollToExpand="Scrollez pour révéler"
          textColorClass="text-bg"
        />
      </div>

      {/* Marquee CTA, bandeau infini entre Hero #1 et Hero #2 (mirror audio). */}
      <MarqueeCTA />

      {/* HERO #2, HeroHome (composant existant, descendu en position 2). */}
      <HeroHome />

      {/* Notre signature, section narrative entre Hero #2 et Hero #3
          (mirror audio "Notre signature, Une direction artistique avant tout"). */}
      <Section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Kicker>Notre signature</Kicker>
            <h3 className="display text-3xl md:text-5xl mt-5 text-text-strong leading-tight">
              Un studio, quatre disciplines, <span className="italic text-accent">une vision</span>.
            </h3>
            <p className="mt-6 text-lg md:text-xl text-text-strong italic leading-snug max-w-2xl mx-auto">
              Une belle exécution ne suffit pas. Elle doit servir une intention business.
            </p>
            <div className="mt-7 space-y-5 text-base md:text-lg text-text leading-relaxed">
              <p>
                Avant chaque projet, nous définissons ensemble le message, l'usage et la perception recherchée. Sites web, branding, audiovisuel, automatisation IA : chaque livrable est pensé pour servir cette vision.
              </p>
              <p>
                Le résultat : des présences digitales <strong className="text-text-strong">cohérentes, mesurables</strong> et pensées pour valoriser durablement votre marque.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* HERO #3, WhyGndHomeBlock (mirror WhyGndAudiovisuelBlock structure)
          avec 5 catégories home : GND · Sites · Branding · Audiovisuel · IA. */}
      <DeferMount><WhyGndHomeBlock /></DeferMount>

      <DeferMount><MarqueeProjects /></DeferMount>
      <DeferMount><WhoWeAreBlock /></DeferMount>
      <DeferMount><IntersectionBlock /></DeferMount>
      <DeferMount><ServicesGrid /></DeferMount>
      <DeferMount><ReelsMosaic /></DeferMount>
      {/* Partie vidéo de la section portfolio unifiée — console média verre
          fumé (même PhotoViewer V3 que la page Réalisations), 4 vidéos GND.
          (HologramShowcase gardé de côté sur disque, plus importé.) */}
      <DeferMount>
      <Section className="pt-8 md:pt-12 pb-24 md:pb-32">
        <Container>
          <div className="text-center mb-10 md:mb-12 text-text-muted label-mono text-xs">
            la suite, en vidéo ↓
          </div>
          <PhotoViewer
            photos={[
              { id: 'esther-seems', title: 'Esther Seems', sub: 'BOBINE · Clip musical', youtube: '6oaO6YoWjyQ', cat: 'Clip' },
              { id: 'leyel-miel', title: 'Leyel, Miel', sub: 'Clip officiel · 2025', youtube: 'UbXQim7iNLI', cat: 'Clip' },
              { id: 'sabay-2023', title: 'Sabay Festival 2023', sub: 'Grande Pagode de Vincennes', youtube: 'Vyhz7_D4fFU', cat: 'Live' },
              { id: 'cook-soul', title: 'Cook & Soul', sub: 'Kaoutar · Émission', youtube: 'GksYCOSW3qc', cat: 'Production' },
            ].map((v) => ({ ...v, img: `https://img.youtube.com/vi/${v.youtube}/hqdefault.jpg` }))}
          />
        </Container>
      </Section>
      </DeferMount>
      <DeferMount><WhyBlock /></DeferMount>
      <DeferMount><ValuesBlock /></DeferMount>
      <DeferMount><TestimonialsBlock /></DeferMount>
      <DeferMount><TeamSlider /></DeferMount>
      <DeferMount><ContactBlock /></DeferMount>
      {/* FAQ placée après la section Contact, juste au-dessus du footer.
          Hors DeferMount : porte le FAQPage JSON-LD (SEO). */}
      <FaqHome />
      <FloatingCtaBand
        prefix="Créons l'impact"
        rotatingWords={['ensemble.', 'à deux.', 'côte à côte.', 'main dans la main.', 'avec vous.']}
        sub="Échangeons sur votre projet. Réponse sous 24h, devis sous 48h."
      />
    </main>
  );
}

export { HomePage, PROJECTS, SERVICES_CARDS, TestimonialsBlock, ContactBlock };
