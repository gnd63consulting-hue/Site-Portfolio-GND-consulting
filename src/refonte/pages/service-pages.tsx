/* The remaining 5 service pages — ported to ES modules */
import * as React from 'react';
import { Section, Container, Kicker, Btn, Tag, Faq, ImgPlaceholder, CtaBand, CinematicHero, BigHeading } from '../ui';
import { Icons } from '../icons';

/* Cinematic shared service page hero */
function ServiceLayout({ kicker, title, subtitle, ctaLabel, badges, hero, sections, bottomCta, eyebrow }: any) {
  return (
    <main id="main">
      <CinematicHero
        kicker={kicker}
        eyebrow={eyebrow || kicker}
        title={title}
        subtitle={subtitle}
        badges={badges}
        ctas={<>
          <Btn href="#/contact" variant="primary">{ctaLabel}</Btn>
          <a href="#/realisations" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Voir nos réalisations <Icons.ArrowUpRight size={14}/></a>
        </>}
        media={hero}
        footerLabel={kicker}
      />
      {sections}
      {bottomCta}
    </main>
  );
}

/* Service "Offre" block — bigger, theatrical */
function OfferGrid({ kicker, title, items, intro }: any) {
  return (
    <Section bg="alt" className="py-28 md:py-40">
      <Container>
        <BigHeading kicker={kicker} title={title} intro={intro}/>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-surface/70 border hairline border rounded-3xl overflow-hidden">
          {items.map((o: any, i: number) => (
            <div key={o.t} className={`p-7 md:p-10 ${i === 1 ? "bg-text-strong text-bg" : i === 4 ? "bg-accent text-text-strong" : "bg-bg-alt"}`}>
              <div className="flex items-start justify-between">
                <span className={`num-display text-5xl ${i === 1 ? "text-accent" : i === 4 ? "text-text-strong" : "text-text-strong"}`}>{o.n}</span>
                <Icons.ArrowUpRight size={18} className="opacity-40"/>
              </div>
              <h3 className={`display text-2xl md:text-3xl mt-6 ${i === 1 ? "text-bg" : "text-text-strong"}`}>{o.t}</h3>
              <p className={`mt-3 leading-relaxed text-sm ${i === 1 ? "text-bg/75" : i === 4 ? "text-text-strong/85" : "text-text"}`}>{o.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* Service "Process" block — cinematic strip */
function ProcessRow({ kicker, title, steps, intro }: any) {
  return (
    <Section bg="dark" className="py-28 md:py-40 overflow-hidden">
      <Container>
        <BigHeading kicker={kicker} title={title} intro={intro} dark/>
        <div className="relative">
          <div className="hidden md:block absolute top-12 left-[8%] right-[8%] h-px bg-gradient-to-r from-bg/0 via-accent/60 to-bg/0"></div>
          <div className={`grid md:grid-cols-${Math.min(steps.length, 6)} gap-5`}>
            {steps.map((s: any) => (
              <div key={s.n} className="relative pt-3">
                <div className="hidden md:flex absolute top-9 left-0 -mt-1 w-3 h-3 rounded-full bg-accent ring-4 ring-text-strong"></div>
                <span className="num-display text-7xl text-accent block">{s.n}</span>
                <h3 className="display text-xl md:text-2xl text-bg mt-4">{s.t}</h3>
                <p className="mt-2 text-sm text-bg/65 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Service "Reasons" block — cream theatrical version */
function ReasonsGrid({ kicker, title, intro, reasons }: any) {
  return (
    <Section className="py-28 md:py-40">
      <Container>
        <BigHeading kicker={kicker} title={title} intro={intro}/>
        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r: any, i: number) => (
            <li key={r.t}
              className={`aspect-square rounded-[28px] p-6 md:p-8 flex flex-col justify-between card-hover
                ${i === 1 ? "bg-accent text-text-strong" : i === 2 ? "bg-text-strong text-bg" : "surface-card"}`}>
              <div className="flex items-center justify-between">
                <span className={`num-display text-5xl ${i === 1 ? "text-text-strong" : i === 2 ? "text-accent" : "text-accent-deep"}`}>{r.n}</span>
                <Icons.Sparkles size={18} className={i === 1 ? "text-text-strong/70" : "text-accent"}/>
              </div>
              <div>
                <div className="display text-2xl md:text-3xl leading-tight">{r.t}</div>
                <div className={`mt-2 text-sm ${i === 1 ? "text-text-strong/85" : i === 2 ? "text-bg/70" : "text-text-muted"}`}>{r.d}</div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ============= Design & Identité Visuelle ============= */
function DesignPage() {
  return (
    <ServiceLayout
      kicker="Design & identité visuelle"
      title={<>Faites parler<br/>votre <span className="italic">image</span>.</>}
      subtitle="Design graphique & identité visuelle sur mesure — pour une marque qui vous ressemble vraiment."
      ctaLabel="Demander un devis personnalisé"
      badges={["3 rounds inclus", "AI / EPS / SVG / PNG", "Imprimeurs partenaires"]}
      hero={
        <div className="relative max-w-[460px] mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-black/40 bg-surface" style={{ aspectRatio:"4/5" }}>
          <img src="/assets/svc-design.png" alt="Design & identité visuelle — GND" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      }
      sections={<>
        <OfferGrid kicker="Notre offre" title={<>Tout ce qu'il faut pour <span className="italic">incarner</span> votre marque.</>}
          items={[
            { n:"01", t:"Création de logo", d:"Conception originale, modulable, déclinable sur tous supports." },
            { n:"02", t:"Déclinaisons", d:"Versions monochromes, négatives, formats sociaux et impression." },
            { n:"03", t:"Charte graphique", d:"Logo, couleurs, typographies, iconographie, règles d'usage." },
            { n:"04", t:"Refonte de marque", d:"Audit existant, repositionnement visuel, migration progressive." },
            { n:"05", t:"Bannières & miniatures", d:"YouTube, LinkedIn, Instagram, sites — formats optimisés." },
            { n:"06", t:"Supports imprimés", d:"Cartes, flyers, plaquettes, signalétique. Réseau d'imprimeurs." },
          ]}/>
        <Section className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Kicker>Approche</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Une identité qui vous <span className="italic">ressemble vraiment</span>.</h2>
                <p className="mt-6 text-lg text-text leading-relaxed max-w-md">Pas de tendances copiées-collées. On part de votre histoire, votre métier, vos clients — et on construit une marque qui tient dix ans.</p>
              </div>
              <ul className="space-y-4">
                {["Écoute","Co-création","Résultat"].map((t, i) => (
                  <li key={t} className="surface-card p-6 flex items-center gap-5">
                    <span className="num-display text-4xl text-accent">0{i+1}</span>
                    <div className="display text-3xl text-text-strong">{t}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
        <ProcessRow kicker="Process" title={<>Du brief à la <span className="italic">livraison</span>.</>}
          steps={[
            { n:"01", t:"Brief créatif", d:"Atelier, références, contraintes, public." },
            { n:"02", t:"Recherche", d:"Exploration visuelle, inspirations, moodboard." },
            { n:"03", t:"Concepts", d:"Pistes créatives chiffrées, recommandation argumentée." },
            { n:"04", t:"Itération", d:"3 rounds de modifications inclus." },
            { n:"05", t:"Livraison", d:"Fichiers AI/EPS/SVG/PNG/JPG, charte usage." },
          ]}/>
        <ReasonsGrid kicker="Pourquoi GND" title={<>Quatre <span className="text-accent italic">raisons</span>.</>}
          reasons={[
            { n:"01", t:"Créativité & personnalisation", d:"Chaque marque est unique. Notre travail aussi." },
            { n:"02", t:"Humain + IA", d:"IA pour explorer, humain pour signer." },
            { n:"03", t:"Flexibilité", d:"Adapté aux TPE comme aux groupes." },
            { n:"04", t:"Réseau d'experts", d:"Imprimeurs, typographes, illustrateurs." },
          ]}/>
        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Kicker>FAQ</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">À <span className="italic">savoir</span>.</h2>
              </div>
              <div className="lg:col-span-8">
                <Faq q="Quels sont les délais ?" a="2 à 4 semaines selon l'ampleur. Devis détaillé sous 48h."/>
                <Faq q="Combien de modifications sont incluses ?" a="3 rounds de modifications sur les concepts retenus. Au-delà, sur devis."/>
                <Faq q="Quels formats sont livrés ?" a="AI, EPS, SVG, PNG, JPG. Charte d'usage PDF incluse."/>
                <Faq q="Je n'ai aucune idée du design — vous m'aidez ?" a="Oui. Notre rôle est de transformer votre métier et vos contraintes en système visuel cohérent."/>
              </div>
            </div>
          </Container>
        </Section>
      </>}
      bottomCta={<CtaBand title="Prêt à donner vie à votre univers visuel ?" cta="Demander un devis personnalisé"/>}
    />
  );
}

/* ============= Motion Design ============= */
function MotionPage() {
  return (
    <ServiceLayout
      kicker="Motion design"
      title={<>Motion design,<br/><span className="italic">sur mesure</span>.</>}
      subtitle="Animez vos idées. Dynamisez votre image. Attirez votre public."
      ctaLabel="Démarrer un projet motion"
      badges={["2D · 3D", "Habillages animés", "Formats sociaux"]}
      hero={
        <div className="relative surface-card p-3 rounded-3xl max-w-[520px] mx-auto">
          <div className="rounded-2xl overflow-hidden relative bg-surface" style={{ aspectRatio:"16/9" }}>
            <img src="/assets/svc-motion.png" alt="Motion design — GND" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
          </div>
          <button className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-bg text-text-strong inline-flex items-center justify-center shadow-2xl shadow-text/30 hover:bg-accent transition">
            <Icons.Play size={22}/>
          </button>
        </div>
      }
      sections={<>
        <Section className="py-24 md:py-32">
          <Container>
            <Kicker>Showreel</Kicker>
            <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Nos créations en <span className="italic">mouvement</span>.</h2>
            <div className="mt-14 grid md:grid-cols-3 gap-5">
              {[
                { src:"https://img.youtube.com/vi/6oaO6YoWjyQ/maxresdefault.jpg", t:"Esther Seems — Bobine" },
                { src:"https://img.youtube.com/vi/UbXQim7iNLI/maxresdefault.jpg", t:"Leyel — Miel" },
                { src:"https://img.youtube.com/vi/galhl8_dYyk/maxresdefault.jpg", t:"Cook & Soul" },
                { src:"/assets/svc-motion.png", t:"Motion brand" },
                { src:"https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg", t:"Sabay Festival" },
                { src:"https://img.youtube.com/vi/AGC_2cFHE_0/maxresdefault.jpg", t:"L'Anecdote" },
              ].map((m) => (
                <div key={m.t} className="relative group overflow-hidden rounded-2xl card-hover bg-surface" style={{ aspectRatio:"4/5" }}>
                  <img src={m.src} alt={m.t} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover"/>
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-text-strong/85 to-transparent">
                    <div className="text-bg display text-lg">{m.t}</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-text-strong/30">
                    <span className="w-14 h-14 rounded-full bg-bg text-text-strong inline-flex items-center justify-center"><Icons.Play size={18}/></span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
        <OfferGrid kicker="Notre offre" title={<>Cinq <span className="italic">formats</span> phares.</>}
          items={[
            { n:"01", t:"Vidéos explicatives", d:"Storytelling 30s–3min, scripts, voix-off, sous-titrage." },
            { n:"02", t:"Animations 2D / 3D", d:"Logo animé, mascotte, transitions, motion brand." },
            { n:"03", t:"Habillages animés", d:"Bumpers, jingles, identités sonores synchronisées." },
            { n:"04", t:"Formats sociaux", d:"Reels, TikTok, LinkedIn — formats verticaux + carrés." },
            { n:"05", t:"Motion publicitaire", d:"Spots courts, A/B testing créatif." },
            { n:"06", t:"Templates motion", d:"Kits motion pour vos équipes internes." },
          ]}/>
        <ProcessRow kicker="Process" title={<>Six étapes, un <span className="italic">tempo</span>.</>}
          steps={[
            { n:"01", t:"Brief", d:"Objectif, cible, ton, format." },
            { n:"02", t:"Script", d:"Scénario, voix-off, rythme." },
            { n:"03", t:"Storyboard", d:"Vignettes-clés validées." },
            { n:"04", t:"Design", d:"Style frames, palette." },
            { n:"05", t:"Animation", d:"Réalisation et son." },
            { n:"06", t:"Livraison", d:"Tous formats, déclinaisons." },
          ]}/>
        <ReasonsGrid kicker="Différenciateurs" title={<>Pourquoi <span className="text-accent italic">GND</span>.</>}
          reasons={[
            { n:"01", t:"Style adaptatif", d:"On s'aligne sur votre identité, pas l'inverse." },
            { n:"02", t:"Délais maîtrisés", d:"Plannings réalistes, jamais glissants." },
            { n:"03", t:"Impact mesurable", d:"KPIs définis avant production." },
            { n:"04", t:"IA en accélérateur", d:"Tests rapides, itération éclair." },
          ]}/>
      </>}
      bottomCta={<CtaBand title="Donnez du mouvement à vos messages." cta="Démarrer un projet motion"/>}
    />
  );
}

/* ============= Production Audiovisuelle ============= */
/* scroll-expansion-hero (ScrollExpandMedia). Scroll-hijack behaviour (wheel/touch/scroll math,
   title split, content reveal) kept 1:1 — pure JS, no library dependency, runs identically.
   Only changes: charte cream, warm chocolate overlays, /assets path. */
function ScrollExpandMedia({ mediaType = "image", mediaSrc, posterSrc, bgImageSrc, title, date, scrollToExpand, textBlend, children }: any) {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [showContent, setShowContent] = React.useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = React.useState(false);
  const [touchStartY, setTouchStartY] = React.useState(0);
  const [isMobileState, setIsMobileState] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setScrollProgress(0); setShowContent(false); setMediaFullyExpanded(false);
  }, [mediaType]);

  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false); e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) { setShowContent(false); }
      }
    };
    const handleTouchStart = (e: TouchEvent) => { setTouchStartY(e.touches[0].clientY); };
    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false); e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) { setShowContent(false); }
        setTouchStartY(touchY);
      }
    };
    const handleTouchEnd = () => { setTouchStartY(0); };
    const handleScroll = () => { if (!mediaFullyExpanded) { window.scrollTo(0, 0); } };
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  React.useEffect(() => {
    const checkIfMobile = () => { setIsMobileState(window.innerWidth < 768); };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div ref={sectionRef} className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <div className="absolute inset-0 z-0 h-full" style={{ opacity: 1 - scrollProgress, transition: "opacity .1s" }}>
            {bgImageSrc
              ? <img src={bgImageSrc} alt="" className="w-screen h-screen" style={{ objectFit: "cover", objectPosition: "center" }} />
              : <div className="img-placeholder w-screen h-screen"/>}
            <div className="absolute inset-0" style={{ background: "rgba(42,24,16,.10)" }} />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
                style={{ width: `${mediaWidth}px`, height: `${mediaHeight}px`, maxWidth: "95vw", maxHeight: "85vh", boxShadow: "0px 0px 50px rgba(42,24,16,.35)" }}>
                {mediaType === "video" && mediaSrc ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline preload="auto"
                      className="w-full h-full object-cover rounded-xl" controls={false} disablePictureInPicture disableRemotePlayback />
                    <div className="absolute inset-0 z-10" style={{ pointerEvents: "none" }}></div>
                    <div className="absolute inset-0 rounded-xl" style={{ background: "rgba(42,24,16,.30)", opacity: 0.5 - scrollProgress * 0.3, transition: "opacity .2s" }} />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    {mediaSrc
                      ? <img src={mediaSrc} alt={title || "Media"} className="w-full h-full object-cover rounded-xl" />
                      : <div className="img-placeholder w-full h-full rounded-xl"><span>{title}</span></div>}
                    <div className="absolute inset-0 rounded-xl" style={{ background: "rgba(42,24,16,.50)", opacity: 0.7 - scrollProgress * 0.3, transition: "opacity .2s" }} />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  {date && <p className="text-2xl" style={{ color: "#FDF6EE", transform: `translateX(-${textTranslateX}vw)` }}>{date}</p>}
                  {scrollToExpand && <p className="font-medium text-center" style={{ color: "#FDF6EE", transform: `translateX(${textTranslateX}vw)` }}>{scrollToExpand}</p>}
                </div>
              </div>

              <div className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${textBlend ? "mix-blend-difference" : "mix-blend-normal"}`}>
                <h2 className="display text-4xl md:text-5xl lg:text-6xl font-bold transition-none" style={{ color: "#FDF6EE", transform: `translateX(-${textTranslateX}vw)` }}>{firstWord}</h2>
                <h2 className="display text-4xl md:text-5xl lg:text-6xl font-bold text-center transition-none" style={{ color: "#FDF6EE", transform: `translateX(${textTranslateX}vw)` }}>{restOfTitle}</h2>
              </div>
            </div>

            <section className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20" style={{ opacity: showContent ? 1 : 0, transition: "opacity .7s" }}>
              {children}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductionPage() {
  const [active, setActive] = React.useState<any>(null);
  const SB = "https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/";
  const COVER = SB + "portfolio-photos/gnd-cover.png";
  const reels = [
    { id: "trinity", t:"Trinity Rebel — Univers Officiel", k:"Clip musical", y:"2025", img: COVER, video: SB+"portfolio-videos/trinity_rebel_univers_officiel.mp4" },
    { id: "ali", t:"Concert Ali 45 Scientific", k:"Captation live", y:"2024", img: COVER, video: SB+"portfolio-videos/Concert%20Ali.mp4" },
    { id: "sabay", t:"Thiek — Sabay Festival", k:"Événementiel 4K", y:"2023", img:"https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg", youtube:"Vyhz7_D4fFU" },
    { id: "esther", t:"Esther Seems — BOBINE", k:"Production", y:"2024", img:"https://img.youtube.com/vi/6oaO6YoWjyQ/maxresdefault.jpg", youtube:"6oaO6YoWjyQ" },
    { id: "yungcally", t:"Yungcally — Clip officiel", k:"Clip musical", y:"2024", img: COVER, video: SB+"portfolio-videos/jyfviku.mp4" },
  ];

  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="/assets/svc-production.png"
      bgImageSrc="/assets/svc-production.png"
      title="Production audiovisuelle"
      date="Studio créatif · Paris"
      scrollToExpand="Défilez pour découvrir"
      textBlend
    >
      <Section className="pt-0 pb-16">
        <Container>
          <Kicker>Production audiovisuelle · 4K</Kicker>
          <p className="text-text max-w-2xl text-lg md:text-xl mt-5">Studio parisien spécialisé en captation live, montage et post-production — nous sublimons vos histoires en images.</p>
          <div className="mt-6 flex gap-3 flex-wrap">
            {["Paris · FR", "4K / 8K", "Captation multi-cam"].map((b) => <span key={b} className="chip">{b}</span>)}
          </div>
          <a href="#/contact" className="btn btn-primary mt-8 inline-flex">Démarrer un tournage <Icons.ArrowUpRight size={14}/></a>
        </Container>
      </Section>

      <Section className="py-24 md:py-32">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <Kicker>Showreel</Kicker>
              <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Le <span className="italic">mur</span> des productions.</h2>
            </div>
            <p className="text-text max-w-sm">Cliquez sur une vignette pour ouvrir la visionneuse plein écran.</p>
          </div>

          {/* Reels wall — scatter→arc inspiration recolored */}
          <div className="relative h-[520px] md:h-[600px]">
            {reels.map((r, i) => {
              const positions = [
                { l:"5%", t:"10%", w:"22%", rot:"-6deg" },
                { l:"30%", t:"3%", w:"24%", rot:"3deg" },
                { l:"57%", t:"12%", w:"22%", rot:"-2deg" },
                { l:"78%", t:"4%", w:"20%", rot:"5deg" },
                { l:"15%", t:"55%", w:"26%", rot:"-3deg" },
              ];
              const p = positions[i];
              return (
                <button key={r.id} onClick={() => setActive(r)}
                  className="absolute group overflow-hidden rounded-2xl shadow-xl shadow-text/15 card-hover bg-bg"
                  style={{ left:p.l, top:p.t, width:p.w, transform:`rotate(${p.rot})` }}>
                  <div className="relative w-full bg-surface" style={{ aspectRatio:"4/5" }}>
                    <img src={r.img} alt={r.t} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover rounded-2xl"/>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-text-strong/55 flex flex-col justify-between p-4">
                    <Tag>{r.k}</Tag>
                    <div>
                      <div className="text-bg label-mono">{r.y}</div>
                      <div className="text-bg display text-lg mt-1">{r.t}</div>
                    </div>
                    <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-bg/90 text-text-strong inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><Icons.Play size={14}/></span>
                  </div>
                </button>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Lightbox */}
      {active && (
        <div className="fixed inset-0 z-50 bg-text-strong/95 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <button onClick={() => setActive(null)} aria-label="Fermer" className="absolute top-6 right-6 w-11 h-11 rounded-full bg-bg text-text-strong inline-flex items-center justify-center">
            <Icons.X size={20}/>
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="rounded-3xl overflow-hidden bg-bg">
              <div className="relative w-full" style={{ aspectRatio:"16/9", background:"#000" }}>
                {active.youtube
                  ? <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${active.youtube}?autoplay=1&rel=0`} title={active.t} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen frameBorder="0"/>
                  : <video className="absolute inset-0 w-full h-full object-contain" src={active.video} poster={active.img} controls autoPlay playsInline/>}
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <Tag>{active.k}</Tag>
                  <div className="display text-2xl text-text-strong mt-2">{active.t}</div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-11 h-11 rounded-full border hairline border inline-flex items-center justify-center"><Icons.ArrowRight size={16} className="-scale-x-100"/></button>
                  <button className="w-11 h-11 rounded-full border hairline border inline-flex items-center justify-center"><Icons.ArrowRight size={16}/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <OfferGrid kicker="Notre offre" title={<>Six <span className="italic">terrains</span> d'expression.</>}
        items={[
          { n:"01", t:"Captation live & technique", d:"Multi-caméras, son live, régie temps réel." },
          { n:"02", t:"Montage & post-production", d:"Cut, étalonnage, mix son, motion intégré." },
          { n:"03", t:"Clips & artistiques", d:"Direction artistique, casting, repérages." },
          { n:"04", t:"Événementiel", d:"Festivals, conférences, lancements." },
          { n:"05", t:"Social media", d:"Verticaux, formats courts, déclinaisons." },
          { n:"06", t:"Corporate & e-learning", d:"Tutoriels, formations, communication interne." },
        ]}/>
      <ProcessRow kicker="Process" title={<>Quatre <span className="italic">étapes</span> claires.</>}
        steps={[
          { n:"01", t:"Pré-production", d:"Brief, repérages, casting, planning." },
          { n:"02", t:"Tournage", d:"Captation, son, direction." },
          { n:"03", t:"Post-production", d:"Montage, étalonnage, mix." },
          { n:"04", t:"Livraison", d:"Tous formats, droits clairs." },
        ]}/>
      <ReasonsGrid kicker="Pourquoi GND" title={<>Quatre <span className="text-accent italic">atouts</span>.</>}
        reasons={[
          { n:"01", t:"Studio internalisé", d:"Pas de courtage, pas de sous-traitance opaque." },
          { n:"02", t:"4K natif", d:"Matériel pro, archivage longue durée." },
          { n:"03", t:"Réactivité", d:"Devis 48h, planning en 5 jours." },
          { n:"04", t:"Droits transparents", d:"Cession écrite, scope clair." },
        ]}/>
      <CtaBand title="Prêt à tourner votre prochaine vidéo ?" cta="Démarrer un tournage"/>
    </ScrollExpandMedia>
  );
}

/* ============= Photographie ============= */
function PhotoPage() {
  // circular 3D gallery — vraies photos du shoot GND (public/assets/photo-0X.jpg)
  const photos = [
    { src: "/assets/photo-01.jpg", label: "Portrait" },
    { src: "/assets/photo-03.jpg", label: "Corporate" },
    { src: "/assets/photo-02.jpg", label: "Lumière naturelle" },
    { src: "/assets/photo-05.jpg", label: "Direction artistique" },
    { src: "/assets/photo-04.jpg", label: "Studio" },
    { src: "/assets/photo-06.jpg", label: "Création" },
  ];
  const [rot, setRot] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setRot(r => r + 0.5), 60);
    return () => clearInterval(t);
  }, []);

  return (
    <ServiceLayout
      kicker="Photographie professionnelle"
      title={<>Photographie<br/>& <span className="italic">direction artistique</span>.</>}
      subtitle="Studio, extérieur, événementiel. Une image qui raconte vraiment quelque chose."
      ctaLabel="Réserver une séance sur mesure"
      badges={["Studio & extérieur", "Retouche pro", "Droits clairs"]}
      hero={
        <div className="grid grid-cols-2 gap-3 max-w-[480px] mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-surface" style={{ aspectRatio:"3/4" }}>
            <img src="/assets/photo-01.jpg" alt="Portrait — direction artistique GND" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
          </div>
          <div className="grid grid-rows-2 gap-3">
            <div className="relative rounded-2xl overflow-hidden bg-surface" style={{ aspectRatio:"3/2" }}>
              <img src="/assets/photo-03.jpg" alt="Séance corporate GND" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-surface" style={{ aspectRatio:"3/2" }}>
              <img src="/assets/photo-05.jpg" alt="Direction artistique GND" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      }
      sections={<>
        <Section className="py-24 md:py-32 overflow-hidden">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <Kicker className="justify-center">Portfolio</Kicker>
              <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Galerie <span className="italic">circulaire</span>.</h2>
            </div>
            <div className="relative mt-20 h-[420px] flex items-center justify-center" style={{ perspective:"1200px" }}>
              <div className="relative w-72 h-96" style={{ transformStyle:"preserve-3d", transform:`rotateY(${rot}deg)` }}>
                {photos.map((photo, i) => {
                  const angle = (360 / photos.length) * i;
                  return (
                    <div key={photo.src}
                      className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-text/20 bg-surface"
                      style={{ transform:`rotateY(${angle}deg) translateZ(280px)` }}>
                      <img src={photo.src} alt={photo.label} loading="lazy" decoding="async" draggable={false}
                        className="absolute inset-0 w-full h-full object-cover"/>
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-text-strong/80 to-transparent text-bg label-mono">{photo.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </Section>

        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { t:"Créativité & storytelling", d:"Chaque image porte une intention narrative." },
                { t:"Qualité pro", d:"Boîtiers full-frame, optiques fixes, post-prod studio." },
                { t:"Expérience humaine", d:"Direction de modèles, ambiance détendue, résultat naturel." },
              ].map(a => (
                <div key={a.t} className="surface-card p-7">
                  <div className="display text-3xl text-text-strong">{a.t}</div>
                  <p className="mt-3 text-text">{a.d}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <OfferGrid kicker="Notre offre" title={<>Six <span className="italic">univers</span>.</>}
          items={[
            { n:"01", t:"Business", d:"Portrait corporate, équipe, locaux." },
            { n:"02", t:"Événement", d:"Conférences, soirées, lancements." },
            { n:"03", t:"E-commerce", d:"Produit packshot, lifestyle, déclinaisons." },
            { n:"04", t:"Social", d:"Contenus formatés réseaux." },
            { n:"05", t:"Branding", d:"Identité visuelle, ambiance de marque." },
            { n:"06", t:"Créatif", d:"Direction artistique sur projet libre." },
          ]}/>

        <ProcessRow kicker="Process" title={<>Quatre <span className="italic">temps</span>.</>}
          steps={[
            { n:"01", t:"Brief", d:"Cadrage besoin, refs visuelles." },
            { n:"02", t:"Production", d:"Repérage, casting, planning." },
            { n:"03", t:"Shooting", d:"Direction artistique sur place." },
            { n:"04", t:"Retouche", d:"Selects, post-prod, livraison." },
          ]}/>
      </>}
      bottomCta={<CtaBand title="Prêt à créer des visuels inoubliables ?" cta="Réserver une séance"/>}
    />
  );
}

/* ============= Automatisation & IA ============= */
function IAPage() {
  return (
    <ServiceLayout
      kicker="Automatisation & IA"
      title={<>Automatisation & IA,<br/><span className="italic">sur mesure</span>.</>}
      subtitle="Des workflows intelligents pour booster la productivité, la qualité et l'engagement."
      ctaLabel="Planifier un audit gratuit"
      badges={["RGPD & sécurité", "AI Act conforme", "Audit gratuit"]}
      hero={
        <div className="surface-card p-7">
          <Kicker>Résultats observés</Kicker>
          <div className="mt-6 grid grid-cols-2 gap-5">
            {[
              { v:"+40%", l:"Productivité" },
              { v:"20 min", l:"Économisées / jour" },
              { v:"+66%", l:"Débit traitement" },
              { v:"25%", l:"Économies réalisées" },
            ].map(s => (
              <div key={s.l} className="border-t hairline border-t pt-4">
                <div className="num-display text-4xl md:text-5xl text-text-strong">{s.v}</div>
                <div className="text-sm text-text-muted mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      }
      sections={<>
        {/* Pipeline anatomy */}
        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="max-w-3xl">
              <Kicker>Anatomie d'un workflow</Kicker>
              <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Cinq <span className="italic">briques</span>, un flux.</h2>
            </div>
            <div className="mt-14 grid md:grid-cols-5 gap-3">
              {[
                { t:"Déclencheur", d:"Email, formulaire, capteur, calendrier." },
                { t:"Collecte", d:"Données structurées et non-structurées." },
                { t:"Traitement IA", d:"Analyse, extraction, génération." },
                { t:"Validation", d:"Humain dans la boucle si critique." },
                { t:"Action", d:"CRM, email, doc, notification, paiement." },
              ].map((b, i) => (
                <div key={b.t} className="relative surface-card p-5">
                  <span className="num-display text-3xl text-accent">0{i+1}</span>
                  <div className="display text-xl text-text-strong mt-3">{b.t}</div>
                  <p className="mt-2 text-xs text-text leading-relaxed">{b.d}</p>
                  {i < 4 && <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-accent z-10"><Icons.ArrowRight size={16}/></div>}
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <OfferGrid kicker="Nos briques" title={<>Six <span className="italic">capacités</span>.</>}
          items={[
            { n:"01", t:"Agents IA", d:"Assistants spécialisés, accès outils, garde-fous." },
            { n:"02", t:"Automatisation de processus", d:"RPA, scripts, intégrations métier." },
            { n:"03", t:"Intégrations", d:"CRM, ERP, Notion, Slack, Stripe, etc." },
            { n:"04", t:"Création assistée", d:"Rédaction, image, vidéo, son — encadrée." },
            { n:"05", t:"Formation & adoption", d:"Onboarding équipes, documentation vivante." },
            { n:"06", t:"Audit & stratégie", d:"Cartographie usages, priorisation ROI." },
          ]}/>

        <Section className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <Kicker>Domaines</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Quatre <span className="italic">terrains</span> prioritaires.</h2>
              </div>
              <ul className="lg:col-span-7 grid md:grid-cols-2 gap-4">
                {[
                  { t:"Marketing", d:"Génération créative, ciblage, copywriting." },
                  { t:"Ventes", d:"Qualification leads, suivi pipe, scripts." },
                  { t:"Ops & finance", d:"Factures, rapprochement, reporting." },
                  { t:"RH", d:"Tri CV, onboarding, knowledge base." },
                ].map(d => (
                  <li key={d.t} className="surface-card p-6">
                    <div className="display text-2xl text-text-strong">{d.t}</div>
                    <p className="mt-2 text-sm text-text leading-relaxed">{d.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        <ReasonsGrid kicker="Pourquoi maintenant" title={<>Le bon <span className="text-accent italic">moment</span>.</>}
          reasons={[
            { n:"01", t:"Maturité", d:"L'IA est passée du prototype à l'outil de production. Le coût d'attendre dépasse le coût d'adopter." },
            { n:"02", t:"AI Act", d:"Cadre européen (Règlement UE 2024/1689) entré en vigueur — un usage encadré devient un avantage." },
            { n:"03", t:"Sur-mesure", d:"Les gains viennent de workflows adaptés à votre métier, pas d'outils génériques." },
            { n:"04", t:"Humain", d:"Validation humaine sur les décisions critiques. L'IA exécute, vous gardez la main." },
          ]}/>

        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Kicker>FAQ</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">L'humain et la sécurité au <span className="italic">cœur</span>.</h2>
              </div>
              <div className="lg:col-span-8">
                <Faq q="Mes données sont-elles partagées avec un modèle public ?" a="Non. Nous privilégions les déploiements privés, le RAG local et les modèles auto-hébergés quand pertinent. Chaque cas est documenté."/>
                <Faq q="Comment commence un projet ?" a="Par un audit gratuit de 60 min : cartographie de vos workflows, identification des cas à fort ROI, recommandation chiffrée."/>
                <Faq q="Êtes-vous conformes à l'AI Act ?" a="Oui. Catégorisation des usages, documentation, traçabilité — selon le règlement UE 2024/1689."/>
                <Faq q="Et si l'IA se trompe ?" a="Validation humaine en boucle sur les décisions critiques. Garde-fous, logs, escalade définis dès le brief."/>
              </div>
            </div>
          </Container>
        </Section>
      </>}
      bottomCta={<CtaBand title="Prêt à industrialiser vos workflows ?" cta="Planifier un audit gratuit"/>}
    />
  );
}

export { DesignPage, MotionPage, ProductionPage, PhotoPage, IAPage };
