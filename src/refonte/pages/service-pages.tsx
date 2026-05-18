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
      subtitle="Design graphique & identité visuelle sur mesure."
      ctaLabel="Demander un devis personnalisé"
      badges={["3 rounds inclus", "AI / EPS / SVG / PNG", "Studio créatif · Paris"]}
      hero={
        <div className="relative max-w-[460px] mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-black/40 bg-surface" style={{ aspectRatio:"4/5" }}>
          <img src="/assets/svc-design.png" alt="Design & identité visuelle — GND" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
        </div>
      }
      sections={<>
        <Section className="py-20 md:py-28">
          <Container>
            <p className="text-lg md:text-xl text-text leading-relaxed max-w-3xl">Chez GND Consulting, nous croyons que le design graphique n'est pas qu'une question d'esthétique. C'est un pilier stratégique qui raconte votre histoire, transmet vos valeurs et crée une connexion émotionnelle durable avec votre audience. Chaque trait, chaque couleur, chaque forme est pensée pour faire vibrer votre marque et la rendre inoubliable. Studio créatif à Paris, identité visuelle et branding sur mesure pour marques ambitieuses.</p>
          </Container>
        </Section>
        <OfferGrid kicker="Notre offre" title={<>Nos services <span className="italic">Design & Identité Visuelle</span>.</>}
          intro="Des solutions créatives complètes pour donner vie à votre univers visuel."
          items={[
            { n:"01", t:"Création de logo", d:"Conception d'un logo unique qui incarne parfaitement votre identité et vos valeurs." },
            { n:"02", t:"Déclinaisons visuelles", d:"Adaptation de votre identité sur tous vos supports digitaux et réseaux sociaux." },
            { n:"03", t:"Charte graphique complète", d:"Guide complet définissant couleurs, typographies et règles d'usage de votre marque." },
            { n:"04", t:"Refonte d'identité existante", d:"Modernisation et optimisation de votre identité visuelle actuelle." },
            { n:"05", t:"Bannières & miniatures", d:"Création de visuels optimisés pour vos contenus web et vidéos." },
            { n:"06", t:"Supports imprimés", d:"Conception de cartes de visite, flyers et tous supports print professionnels." },
          ]}/>
        <Section className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Kicker>Notre approche</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Une identité qui vous <span className="italic">ressemble vraiment</span>.</h2>
                <div className="mt-6 space-y-4 text-lg text-text leading-relaxed max-w-md">
                  <p>Notre approche commence toujours par l'écoute. Nous prenons le temps de comprendre votre histoire, vos ambitions, votre personnalité unique. Car avant de créer, il faut ressentir.</p>
                  <p>Ensuite vient la co-création. Vous n'êtes pas spectateur, vous êtes acteur de votre identité visuelle. Nous travaillons main dans la main, dans un processus itératif où chaque étape est validée ensemble.</p>
                  <p>Le résultat ? Une identité visuelle authentique et impactante, qui vous ressemble vraiment et qui saura toucher votre audience au cœur.</p>
                </div>
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
        <ProcessRow kicker="Processus" title={<>Du brief à la <span className="italic">livraison</span>.</>}
          intro="Un processus créatif structuré et transparent, où chaque étape est validée ensemble."
          steps={[
            { n:"01", t:"Brief créatif", d:"Échange approfondi pour comprendre votre histoire, vos ambitions et votre personnalité unique." },
            { n:"02", t:"Recherche & inspiration", d:"Exploration des tendances, de votre marché et création d'un moodboard stratégique." },
            { n:"03", t:"Concepts créatifs", d:"Propositions visuelles uniques co-construites avec vous dans un processus itératif." },
            { n:"04", t:"Validation & itération", d:"3 rounds de modifications inclus. Chaque étape est validée ensemble avant la suivante." },
            { n:"05", t:"Livraison finale", d:"Export de tous les formats nécessaires (AI, EPS, SVG, PNG, JPG) avec guide d'utilisation complet." },
          ]}/>
        <ReasonsGrid kicker="Pourquoi choisir GND Consulting ?" title={<>Quatre <span className="text-accent italic">raisons</span>.</>}
          intro="4 raisons qui font la différence dans votre projet créatif."
          reasons={[
            { n:"01", t:"Créativité & personnalisation", d:"Chaque création est unique et pensée spécifiquement pour votre univers." },
            { n:"02", t:"Accompagnement humain + IA", d:"Alliance parfaite entre expertise humaine et outils d'intelligence artificielle." },
            { n:"03", t:"Flexibilité & accessibilité", d:"Solutions adaptées à tous les budgets avec une approche modulaire." },
            { n:"04", t:"Réseau d'experts à la demande", d:"Accès à un écosystème de spécialistes selon vos besoins spécifiques." },
          ]}/>
        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Kicker>Questions fréquentes</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">À <span className="italic">savoir</span>.</h2>
                <p className="mt-5 text-text">Tout ce que vous devez savoir sur nos services design et identité visuelle.</p>
              </div>
              <div className="lg:col-span-8">
                <Faq q="Quels sont les délais de réalisation ?" a="Les délais varient selon la complexité : logo simple (5-7 jours), identité complète (2-3 semaines), refonte globale (3-4 semaines). Nous établissons un planning précis dès le brief validé."/>
                <Faq q="Combien de modifications sont incluses ?" a="Nous incluons 3 rounds de modifications dans nos prestations standard. Chaque étape fait l'objet d'une validation avant passage à la suivante pour optimiser le processus créatif."/>
                <Faq q="Quels formats de fichiers livrez-vous ?" a="Nous livrons tous les formats nécessaires : vectoriels (AI, EPS, SVG), haute résolution (PNG, JPG), et formats web optimisés. Vous recevez également un guide d'utilisation complet."/>
                <Faq q="Et si je n'ai aucune idée du design souhaité ?" a="C'est notre spécialité ! Nous commençons par un brief approfondi pour comprendre votre univers, vos valeurs et vos objectifs. Notre processus créatif vous guide étape par étape vers votre identité idéale."/>
              </div>
            </div>
          </Container>
        </Section>
      </>}
      bottomCta={<CtaBand title="Prêt à donner vie à votre univers visuel ?" sub="Créons ensemble une identité visuelle qui vous ressemble et qui marquera les esprits. Votre projet mérite une approche sur-mesure et créative." cta="Demander un devis personnalisé"/>}
    />
  );
}

/* ============= Motion Design ============= */
function MotionPage() {
  return (
    <ServiceLayout
      kicker="Motion design"
      title={<>Motion design<br/><span className="italic">sur mesure</span>.</>}
      subtitle="Animez vos idées. Dynamisez votre image. Attirez votre public."
      ctaLabel="Demander un devis personnalisé"
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
        <Section className="py-20 md:py-28">
          <Container>
            <p className="text-lg md:text-xl text-text leading-relaxed max-w-3xl">Chez GND Consulting, nous créons des vidéos en motion design qui informent, séduisent et déclenchent l'action. Simplifier un concept complexe, dynamiser vos réseaux sociaux ou présenter votre marque : chaque animation est pensée pour vous démarquer et engager votre audience. Nos créations sont optimisées pour le digital, prêtes à booster votre branding et vos conversions.</p>
          </Container>
        </Section>
        <Section className="py-24 md:py-32">
          <Container>
            <Kicker>Showreel</Kicker>
            <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Nos créations en <span className="italic">mouvement</span>.</h2>
            <p className="mt-5 text-text max-w-xl">Découvrez quelques exemples de nos productions motion design.</p>
            <div className="mt-14 grid md:grid-cols-3 gap-5">
              {[
                { src:"https://img.youtube.com/vi/6oaO6YoWjyQ/maxresdefault.jpg", t:"Esther Seems — Bobine" },
                { src:"https://img.youtube.com/vi/UbXQim7iNLI/maxresdefault.jpg", t:"Leyel — Miel" },
                { src:"https://img.youtube.com/vi/galhl8_dYyk/maxresdefault.jpg", t:"Cook & Soul" },
                { src:"/assets/svc-motion.png", t:"Motion brand" },
                { src:"https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg", t:"Sabay Festival" },
                { src:"https://img.youtube.com/vi/AGC_2cFHE_0/hqdefault.jpg", t:"L'Anecdote" },
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
        <OfferGrid kicker="Notre offre" title={<>Nos expertises <span className="italic">motion design</span>.</>}
          intro="Des contenus animés qui captent l'attention et transmettent vos messages en un clin d'œil."
          items={[
            { n:"01", t:"Vidéos explicatives / pédagogiques", d:"Simplifiez vos concepts complexes avec des animations claires et engageantes." },
            { n:"02", t:"Animations 2D / 3D sur mesure", d:"Créations originales adaptées à votre univers visuel et à vos objectifs marketing." },
            { n:"03", t:"Habillages graphiques animés", d:"Transitions, génériques, lower thirds pour professionnaliser vos contenus." },
            { n:"04", t:"Formats sociaux optimisés", d:"Stories, reels et formats verticaux taillés pour capter votre audience sur mobile." },
            { n:"05", t:"Motion pour campagnes publicitaires", d:"Créez des publicités animées impactantes pour Instagram, TikTok, LinkedIn ou YouTube." },
          ]}/>
        <ProcessRow kicker="Processus" title={<>Un processus fluide et <span className="italic">collaboratif</span>.</>}
          intro="De la première idée à la livraison finale, nous orchestrons chaque étape pour garantir un résultat à la hauteur de vos attentes."
          steps={[
            { n:"01", t:"Découverte & brief initial", d:"Analyse de vos enjeux, cibles et objectifs pour définir la bonne direction créative." },
            { n:"02", t:"Scénario & storyboard", d:"Écriture du script et storyboard séquence par séquence pour valider le fil narratif." },
            { n:"03", t:"Création graphique", d:"Développement du style visuel, illustrations, typographies et éléments graphiques." },
            { n:"04", t:"Animation & sound design", d:"Mise en mouvement 2D/3D, transitions fluides, habillages sonores et voix-off optionnelle." },
            { n:"05", t:"Feedbacks & ajustements", d:"Allers-retours encadrés (3 cycles inclus) pour affiner chaque détail ensemble." },
            { n:"06", t:"Livraison & déclinaisons", d:"Export HD, formats réseaux, sous-titres et fichiers sources disponibles sur demande." },
          ]}/>
        <ReasonsGrid kicker="Ce qui fait la différence GND" title={<>Pourquoi <span className="text-accent italic">GND</span>.</>}
          reasons={[
            { n:"01", t:"Style adaptatif", d:"Un rendu visuel aligné avec votre identité de marque pour rester cohérent sur tous vos canaux." },
            { n:"02", t:"Délais maîtrisés", d:"Planning clair, jalons réguliers et respect strict des échéances annoncées." },
            { n:"03", t:"Impact mesurable", d:"Optimisation pour la conversion, avec des messages pensés pour déclencher l'action." },
          ]}/>
        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Kicker>Questions fréquentes</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">À <span className="italic">savoir</span>.</h2>
                <p className="mt-5 text-text">Processus, formats livrés, délais… nous répondons aux questions les plus courantes.</p>
              </div>
              <div className="lg:col-span-8">
                <Faq q="Quel est le délai moyen pour produire une animation ?" a="En moyenne 2 à 4 semaines selon la durée et la complexité du projet. Nous établissons un planning précis dès la validation du brief pour respecter vos échéances."/>
                <Faq q="Proposez-vous de la 3D ou uniquement de la 2D ?" a="Les deux ! Nous maîtrisons aussi bien l'animation 2D que 3D. Nous choisissons la technique la plus adaptée à votre projet, à vos objectifs et à votre budget."/>
                <Faq q="Dois-je fournir un script ou des éléments visuels ?" a="Pas forcément. Nous pouvons tout prendre en charge : script, storyboard, design. Si vous avez déjà des éléments, nous les intégrons volontiers à la production."/>
                <Faq q="Comment se déroule la collaboration ?" a="Un chef de projet unique vous accompagne à chaque étape. Vous disposez d'un espace de suivi pour valider les étapes clés et suivre l'avancement en temps réel."/>
                <Faq q="Puis-je fournir mes références graphiques ?" a="Absolument ! Vos inspirations, chartes existantes et moodboards sont les bienvenus pour garantir un rendu parfaitement aligné avec votre univers."/>
                <Faq q="Combien de modifications sont incluses ?" a="Nous prévoyons 3 cycles de retours complets (storyboard, première version animée, version finale). Au-delà, nous ajustons ensemble selon vos besoins."/>
              </div>
            </div>
          </Container>
        </Section>
      </>}
      bottomCta={<CtaBand title="Donnez du mouvement à vos messages." sub="Animation produit, storytelling, lancement de marque ou formation interne : nous composons le motion design qui fera vibrer votre audience." cta="Demander un devis personnalisé"/>}
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
    { id: "ali", t:"Concert Ali", k:"Captation live", y:"2024", img: COVER, video: SB+"portfolio-videos/Concert%20Ali.mp4" },
    { id: "sabay", t:"Thiek — Sabay Festival 2022", k:"Événementiel 4K", y:"2022", img:"https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg", youtube:"Vyhz7_D4fFU" },
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
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <Kicker>Notre approche</Kicker>
              <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">L'image au service<br/>de votre <span className="italic">histoire</span>.</h2>
              <p className="mt-6 text-text max-w-xl">Studio parisien spécialisé en captation live, montage et post-production.</p>
              <p className="mt-4 text-lg text-text leading-relaxed max-w-xl">Chez GND Consulting, nous concevons des contenus audiovisuels qui racontent votre histoire et génèrent le bon impact. Une vidéo réussie est un savant mélange d'émotion, de rythme et d'exigence technique, quel que soit le support de diffusion.</p>
              <div className="mt-7 flex gap-3 flex-wrap">
                {["Captation", "Montage", "Post-prod", "Live"].map((b) => <span key={b} className="chip">{b}</span>)}
              </div>
              <a href="#/contact" className="btn btn-primary mt-8 inline-flex">Démarrer un tournage <Icons.ArrowUpRight size={14}/></a>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="surface-card p-7">
                <div className="num-display text-5xl md:text-6xl text-text-strong">50+</div>
                <div className="mt-2 text-sm text-text-muted">Projets vidéo réalisés</div>
              </div>
              <div className="surface-card p-7">
                <div className="num-display text-5xl md:text-6xl text-text-strong">4K/8K</div>
                <div className="mt-2 text-sm text-text-muted">Qualité de production</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-24 md:py-32">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <Kicker>Nos créations</Kicker>
              <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Des productions qui<br/><span className="italic">parlent d'elles-mêmes</span>.</h2>
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

      <OfferGrid kicker="Notre offre" title={<>Nos expertises vidéo<br/>à votre <span className="italic">service</span>.</>}
        items={[
          { n:"01", t:"Captation live & technique", d:"Multi-caméras 4K/8K, régie vidéo, projection & retours écrans, streaming multiplateforme. Nous couvrons vos événements avec la rigueur d'un studio de broadcast." },
          { n:"02", t:"Montage & post-production", d:"Montage narratif, étalonnage couleur cinématographique, sound design et effets visuels. Du rushes au master final livrable sur tous supports." },
          { n:"03", t:"Clips & contenus artistiques", d:"Clips musicaux, vidéos créatives, univers stylisés et narration immersive. On co-construit l'esthétique avec l'artiste pour servir sa vision." },
          { n:"04", t:"Captation événementielle", d:"Reportage · Interview · Terrain." },
          { n:"05", t:"Vidéos social media", d:"Reels · Stories · Formats verticaux." },
          { n:"06", t:"Corporate & e-learning", d:"Entreprise · Formation · Produit." },
        ]}/>
      <Section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <Kicker>Notre approche</Kicker>
            <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">L'image qui raconte<br/>votre <span className="italic">histoire</span>.</h2>
            <div className="mt-6 space-y-4 text-lg text-text leading-relaxed">
              <p>Notre approche commence toujours par l'écoute. Nous prenons le temps de comprendre vos enjeux, votre audience et l'histoire que vous voulez raconter.</p>
              <p>Ensuite vient la production sur-mesure. Chaque captation, chaque montage est pensé pour transmettre l'émotion juste et générer l'impact attendu.</p>
              <p>Le résultat ? Des contenus vidéo authentiques et percutants, prêts à performer sur tous vos canaux de diffusion.</p>
            </div>
          </div>
        </Container>
      </Section>
      <ProcessRow kicker="Notre processus" title={<>Du brief à la <span className="italic">livraison</span>.</>}
        intro="Un processus structuré pour transformer votre idée en vidéo percutante."
        steps={[
          { n:"01", t:"Préparation & brief", d:"Brief créatif, repérages, scénario, moodboard et rétroplanning détaillé." },
          { n:"02", t:"Captation", d:"Tournage professionnel avec équipe dédiée et matériel adapté à votre projet." },
          { n:"03", t:"Montage & post-production", d:"Montage, étalonnage, sound design, motion graphics, sous-titres et versions sociales." },
          { n:"04", t:"Finalisation & livraison", d:"Validation finale et export de tous les formats nécessaires + archivage des sources." },
        ]}/>
      <ReasonsGrid kicker="Pourquoi GND" title={<>Pourquoi choisir<br/><span className="text-accent italic">GND Consulting</span> ?</>}
        intro="4 raisons qui font la différence dans votre projet vidéo."
        reasons={[
          { n:"01", t:"Créativité sur-mesure", d:"Chaque projet est pensé pour être unique, impactant et aligné sur votre stratégie de marque." },
          { n:"02", t:"Agilité & réactivité", d:"Micro-structure flexible, épaulée par un réseau d'experts activable selon les besoins." },
          { n:"03", t:"Accompagnement personnalisé", d:"Nous co-construisons avec vos équipes pour créer des contenus qui vous ressemblent." },
          { n:"04", t:"Outils modernes intégrés", d:"Workflow optimisé avec IA, automatisations et process fluides pour livrer plus vite." },
        ]}/>
      <Section bg="alt" className="py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Kicker>FAQ</Kicker>
              <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Questions <span className="italic">fréquentes</span>.</h2>
              <p className="mt-5 text-text">Délais, budgets, formats livrés : trouvez rapidement les réponses à vos questions sur nos productions audiovisuelles.</p>
            </div>
            <div className="lg:col-span-8">
              <Faq q="Combien de temps dure une production vidéo ?" a="Cela dépend du format : quelques jours pour une capsule sociale, deux à six semaines pour un film abouti (préparation, tournage, post-production). Un rétroplanning précis est établi dès le brief validé."/>
              <Faq q="Peut-on filmer dans plusieurs lieux ?" a="Oui. Multi-sites, intérieur, extérieur, repérages inclus : nous organisons la logistique de tournage en fonction de votre projet et de vos contraintes."/>
              <Faq q="Pouvez-vous gérer uniquement le montage ?" a="Absolument. Nous prenons en charge vos rushes existants : montage, étalonnage, sound design, motion et versions sociales, sans obligation de captation."/>
              <Faq q="Quel budget prévoir ?" a="Chaque production est chiffrée sur devis selon le format, la durée de tournage et le niveau de post-production. Nous proposons une estimation transparente dès le premier échange."/>
              <Faq q="Comment se déroule le premier brief ?" a="Un échange dédié pour cerner vos objectifs, votre audience et vos références. Nous en ressortons avec une direction créative et un cadrage clair du projet."/>
            </div>
          </div>
        </Container>
      </Section>
      <CtaBand title="Prêt à tourner votre prochaine vidéo ?" sub="Captation, montage, post-production — chaque étape pensée pour sublimer votre image." cta="Demander un devis"/>
    </ScrollExpandMedia>
  );
}

/* ============= Photographie ============= */
function PhotoPage() {
  // circular 3D gallery — vraies photos du shoot GND (public/assets/photo-0X.jpg)
  const photos = [
    { src: "/assets/photo-01.jpg", label: "Portrait professionnel" },
    { src: "/assets/photo-03.jpg", label: "Shooting corporate en entreprise" },
    { src: "/assets/photo-02.jpg", label: "Portrait en lumière naturelle" },
    { src: "/assets/photo-05.jpg", label: "Direction artistique" },
    { src: "/assets/photo-04.jpg", label: "Séance photo corporate" },
    { src: "/assets/photo-06.jpg", label: "Photographie événementielle" },
  ];
  const [rot, setRot] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setRot(r => r + 0.5), 60);
    return () => clearInterval(t);
  }, []);

  return (
    <ServiceLayout
      kicker="Photographie"
      title={<>Photographie pro<br/>& <span className="italic">direction artistique</span>.</>}
      subtitle="Portraits, reportages, packshots, campagnes : composez des images qui laissent une empreinte."
      ctaLabel="Réserver une séance sur mesure"
      badges={["Studio & extérieur", "Retouche pro incluse", "Galerie sécurisée"]}
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
        <Section className="py-20 md:py-28">
          <Container>
            <p className="text-lg md:text-xl text-text leading-relaxed max-w-3xl">Plus qu'un simple shooting, nous créons une expérience. Chaque séance est pensée pour refléter votre identité, votre équipe ou vos produits sous leur meilleur angle, avec une direction artistique sur-mesure et un workflow parfaitement orchestré.</p>
          </Container>
        </Section>
        <Section className="py-24 md:py-32 overflow-hidden">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <Kicker className="justify-center">Portfolio</Kicker>
              <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Nos dernières <span className="italic">réalisations</span>.</h2>
              <p className="mt-5 text-text">Une sélection de nos shootings récents, du portrait corporate à la captation événementielle.</p>
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
            <Kicker>Notre approche</Kicker>
            <h2 className="display text-5xl md:text-6xl mt-5 mb-12 text-text-strong">Une approche créative <span className="italic">& humaine</span>.</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { n:"01", t:"Créativité & storytelling", d:"Chaque image raconte une histoire. Nous mettons en scène votre univers pour créer des visuels qui marquent durablement." },
                { n:"02", t:"Qualité professionnelle", d:"Matériel haut de gamme, lumière maîtrisée, retouches soignées. Vos photos sont prêtes pour tous vos supports." },
                { n:"03", t:"Expérience humaine", d:"Un accompagnement attentif pour des séances fluides, bienveillantes et alignées avec votre vision." },
              ].map(a => (
                <div key={a.t} className="surface-card p-7">
                  <span className="num-display text-4xl text-accent">{a.n}</span>
                  <div className="display text-2xl md:text-3xl text-text-strong mt-4">{a.t}</div>
                  <p className="mt-3 text-text leading-relaxed">{a.d}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <OfferGrid kicker="Notre offre" title={<>Nos prestations <span className="italic">photo</span>.</>}
          intro="Une palette complète pour nourrir vos campagnes, votre communication interne ou vos réseaux sociaux."
          items={[
            { n:"01", t:"Portraits & reportages corporate", d:"Valorisez vos équipes, vos locaux ou votre savoir-faire avec des portraits professionnels et reportages en entreprise." },
            { n:"02", t:"Photographie événementielle", d:"Capturez les moments forts de vos séminaires, conférences, lancements de produit ou soirées professionnelles." },
            { n:"03", t:"Packshots & produits e-commerce", d:"Des visuels nets et stylisés pour mettre vos produits en valeur sur les marketplaces ou vos catalogues." },
            { n:"04", t:"Visuels réseaux sociaux & influence", d:"Des photos impactantes et immersives pour booster votre image sur Instagram, TikTok ou LinkedIn." },
            { n:"05", t:"Publicité & branding", d:"Des visuels premium pour vos campagnes publicitaires, affiches, brochures ou sites web." },
            { n:"06", t:"Créations artistiques & book", d:"Projets artistiques, book modèle, contenu personnel haut de gamme : nous sublimons votre univers." },
          ]}/>

        <ProcessRow kicker="Processus" title={<>Un workflow fluide <span className="italic">et cadré</span>.</>}
          intro="De la préparation à la livraison, chaque étape est maîtrisée pour garantir un résultat impeccable."
          steps={[
            { n:"01", t:"Brief & moodboard", d:"Définition du style, repérage des lieux, préparation des tenues et des accessoires." },
            { n:"02", t:"Séance photo", d:"Session guidée, direction artistique, lumière maîtrisée et ambiance posée." },
            { n:"03", t:"Sélection & retouche", d:"Tri des meilleures images, retouches professionnelles, harmonisation colorimétrique." },
            { n:"04", t:"Livraison rapide", d:"Galerie sécurisée, formats optimisés pour vos canaux web & print, sauvegarde longue durée." },
          ]}/>

        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Kicker>Questions fréquentes</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Avant votre <span className="italic">séance</span>.</h2>
                <p className="mt-5 text-text">Planning, retouches, formats livrés… retrouvez les réponses aux questions les plus posées.</p>
              </div>
              <div className="lg:col-span-8">
                <Faq q="Quels types de séances proposez-vous ?" a="Portraits corporate, reportages, événements, packshots, visuels réseaux sociaux, campagnes publicitaires et shootings artistiques. Chaque prestation est adaptée à vos objectifs."/>
                <Faq q="Quand faut-il réserver ?" a="Idéalement 2 à 3 semaines en amont. Pour les demandes urgentes ou événements, nous trouvons toujours la meilleure option selon nos disponibilités."/>
                <Faq q="Les retouches sont-elles incluses ?" a="Oui. Toutes nos prestations incluent la retouche professionnelle (colorimétrie, exposition, retouche beauté légère). Les retouches avancées sont possibles sur devis."/>
                <Faq q="Quels formats livrez-vous ?" a="Photos haute définition (JPEG et RAW sur demande), optimisées pour le web, les réseaux sociaux et l'impression. Galerie en ligne sécurisée incluse."/>
                <Faq q="Peut-on shooter dans plusieurs lieux ?" a="Absolument. Studio, locaux, extérieurs, multi-sites : nous organisons la séance en fonction de votre planning et de la lumière."/>
              </div>
            </div>
          </Container>
        </Section>
      </>}
      bottomCta={<CtaBand title="Prêt à créer des visuels inoubliables ?" sub="Transformons vos idées en images qui inspirent confiance, désir et engagement. Parlez-nous de votre projet et imaginons ensemble la séance idéale." cta="Réserver une séance"/>}
    />
  );
}

/* ============= Automatisation & IA ============= */
function IAPage() {
  return (
    <ServiceLayout
      kicker="Automatisation & IA"
      title={<>Automatisation & IA<br/><span className="italic">sur mesure</span>.</>}
      subtitle="Des workflows intelligents pour booster la productivité, la qualité et l'engagement."
      ctaLabel="Démarrer un projet pilote"
      badges={["RGPD & sécurité intégrées", "AI Act conforme", "Audit gratuit"]}
      hero={
        <div className="surface-card p-7">
          <Kicker>Des résultats mesurables</Kicker>
          <div className="mt-6 grid grid-cols-2 gap-5">
            {[
              { v:"+40%", l:"Gains de productivité" },
              { v:"20 min/jour", l:"Temps économisé / collaborateur" },
              { v:"+66%", l:"Débit opérationnel" },
              { v:"25%", l:"Économies constatées" },
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
        <Section className="py-20 md:py-28">
          <Container>
            <p className="text-lg md:text-xl text-text leading-relaxed max-w-3xl">De l'automatisation de processus aux agents IA spécialisés, nous concevons des solutions pragmatiques qui s'intègrent à votre stack, délivrent des gains rapides et s'échelonnent en toute sécurité.</p>
          </Container>
        </Section>
        {/* Pipeline anatomy */}
        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="max-w-3xl">
              <Kicker>Comment ça marche</Kicker>
              <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Anatomie d'un <span className="italic">workflow IA</span>.</h2>
              <p className="mt-5 text-text">Chaque automatisation suit un pipeline structuré, du déclencheur jusqu'à l'action finale.</p>
            </div>
            <div className="mt-14 grid md:grid-cols-5 gap-3">
              {[
                { t:"Déclencheur", d:"Événement, webhook, planification." },
                { t:"Collecte", d:"APIs, CRM, bases de données." },
                { t:"Traitement IA", d:"Analyse, classification, génération." },
                { t:"Validation", d:"Contrôle humain, règles métier." },
                { t:"Action", d:"Envoi, mise à jour, notification." },
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

        <OfferGrid kicker="Notre offre" title={<>Nos briques <span className="italic">IA & automatisation</span>.</>}
          intro="Des modules combinables pour bâtir votre feuille de route IA, du POC au déploiement à l'échelle."
          items={[
            { n:"01", t:"Agents IA personnalisés", d:"Assistants digitaux entraînés sur vos données pour répondre, qualifier, exécuter. Support 24/7, qualification de leads, assistance interne, audit trail." },
            { n:"02", t:"Automatisation de processus", d:"Orchestration des tâches répétitives et validations multi-applications. Onboarding, routage de documents, synchronisation CRM/ERP, relances." },
            { n:"03", t:"Intégrations sur-mesure", d:"Connecter votre écosystème pour éviter les silos de données. CRM, suites bureautiques, Notion, Slack, APIs, webhooks, iPaaS." },
            { n:"04", t:"Création assistée par IA", d:"Accélérer sans renoncer à la qualité et à la cohérence éditoriale. Rédaction guidée, conception visuelle, contrôles ton & marque." },
            { n:"05", t:"Formation & adoption", d:"Ateliers métiers et conduite du changement pour ancrer l'usage. Workshops, guides & politiques IA, coaching d'équipes." },
            { n:"06", t:"Audit & stratégie IA", d:"Cartographier vos opportunités, prioriser et chiffrer le ROI. Diagnostic des flux, feuille de route 90 jours, POC rapide." },
          ]}/>

        <Section className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <Kicker>Domaines d'application</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Domaines d'application <span className="italic">prioritaires</span>.</h2>
              </div>
              <ul className="lg:col-span-7 grid md:grid-cols-2 gap-4">
                {[
                  { n:"01", t:"Marketing & communication", d:"Génération & déclinaison de contenus multicanaux, social listening, personnalisation temps réel, orchestration des campagnes." },
                  { n:"02", t:"Ventes & relation client", d:"Agents conversationnels & self-service, qualification intelligente des prospects, follow-up automatisés, coaching commercial assisté." },
                  { n:"03", t:"Opérations & finance", d:"Automatisation back-office, pilotage dashboards & alertes, prévisions & reporting assistés, gestion des risques et conformité." },
                  { n:"04", t:"RH & expérience collaborateur", d:"Onboarding & demandes internes, FAQ RH intelligentes, formation personnalisée, suivi bien-être & feedback." },
                ].map(d => (
                  <li key={d.t} className="surface-card p-6">
                    <span className="num-display text-3xl text-accent">{d.n}</span>
                    <div className="display text-xl md:text-2xl text-text-strong mt-3">{d.t}</div>
                    <p className="mt-2 text-sm text-text leading-relaxed">{d.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        <Section bg="dark" className="py-24 md:py-32">
          <Container>
            <div className="max-w-3xl">
              <Kicker className="!text-bg/55">Pourquoi maintenant</Kicker>
              <h2 className="display text-5xl md:text-7xl mt-5 text-bg">Pourquoi accélérer <span className="text-accent italic">maintenant</span> ?</h2>
            </div>
            <div className="mt-14 grid md:grid-cols-4 gap-6">
              {[
                { v:"+60%", l:"de croissance des revenus chez les leaders IA" },
                { v:"+30%", l:"d'économies potentielles grâce à l'automatisation" },
                { v:"+66%", l:"de débit opérationnel sur des processus récurrents" },
                { v:"~26%", l:"des organisations capturent déjà une valeur IA tangible" },
              ].map(s => (
                <div key={s.l} className="border-t border-bg/15 pt-5">
                  <div className="num-display text-5xl md:text-6xl text-accent">{s.v}</div>
                  <div className="mt-3 text-sm text-bg/70 leading-relaxed">{s.l}</div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Kicker>Questions fréquentes</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">L'humain et la sécurité au <span className="italic">cœur</span>.</h2>
                <p className="mt-5 text-text">Notre approche met l'humain et la sécurité au cœur de chaque projet.</p>
              </div>
              <div className="lg:col-span-8">
                <Faq q="Est-ce adapté à mon entreprise ?" a="Oui. Nos solutions sont modulaires et s'adaptent à votre taille, votre secteur et votre maturité numérique. Nous concevons des automatisations proportionnées à vos besoins."/>
                <Faq q="Dois-je déjà disposer d'outils spécifiques ?" a="Pas nécessairement. Nous partons de votre stack actuelle et la complétons si besoin. L'objectif : valoriser l'existant avant d'introduire de nouveaux outils."/>
                <Faq q="Combien de temps pour un premier résultat ?" a="Quelques semaines pour un POC, 1 à 3 mois pour un déploiement progressif selon le périmètre. Nous privilégions des cycles courts avec des gains mesurables à chaque étape."/>
                <Faq q="Quel ROI attendre ?" a="Nous estimons le ROI dès l'audit. Selon les cas, un retour sur investissement est observé entre 3 et 6 mois grâce aux gains de temps, à la réduction des erreurs et à l'amélioration de la conversion."/>
                <Faq q="Comment garantissez-vous la sécurité des données ?" a="Conformité RGPD, chiffrement, contrôle d'accès, audit trail… et possibilité de travailler en mode on-premise. La sécurité est intégrée à chaque étape."/>
                <Faq q="Proposez-vous de la formation ?" a="Absolument. L'adoption humaine est clé : ateliers, guides d'usage, coaching d'équipes et support continu font partie de notre accompagnement."/>
              </div>
            </div>
          </Container>
        </Section>
      </>}
      bottomCta={<CtaBand title="Prêt à industrialiser vos workflows ?" sub="Audit offert, feuille de route priorisée, accompagnement humain et sécurisation totale. Lançons ensemble vos premières automatisations IA." cta="Planifier un audit gratuit"/>}
    />
  );
}

export { DesignPage, MotionPage, ProductionPage, PhotoPage, IAPage };
