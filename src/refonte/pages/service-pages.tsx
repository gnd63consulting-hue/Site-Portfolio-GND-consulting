/* The remaining 5 service pages, ported to ES modules */
import * as React from 'react';
import { motion } from 'framer-motion';
import { Section, Container, Kicker, Btn, Tag, Faq, ImgPlaceholder, CtaBand, CinematicHero, BigHeading } from '../ui';
import { Icons } from '../icons';
import { HeroBuildUpBranding } from '../components/HeroBuildUpBranding';
import { WhyGndIaBlock } from '../components/WhyGndIaBlock';
import { HeroBuildUpAudiovisuel } from '../components/HeroBuildUpAudiovisuel';
import { CircularGallery, type GalleryItem } from '../../components/ui/circular-gallery-2';
import { AnimatedTabs, type AnimatedTab } from '@/components/ui/animated-tabs';
import { MaskedImage } from '@/components/ui/image-mask';
import ScrollExpandHero from '@/components/blocks/scroll-expansion-hero';
import { WhyGndBrandingBlock } from '../components/WhyGndBrandingBlock';
import { WhyGndAudiovisuelBlock } from '../components/WhyGndAudiovisuelBlock';
import { MarqueeCTA } from '../components/MarqueeCTA';
import { MethodCarousel } from '../components/MethodCarousel';
import { PhotoViewer } from '../components/PhotoViewer';
import { ServicesAccordion } from '@/components/ui/services-accordion';
import { ProcessGraph } from '../components/ProcessGraph';
import { InfoCard } from '@/components/ui/info-card';
import { Hand, Zap, Unlock, Sparkles as SparklesIcon, Target, ClipboardList, Camera, Film, Send } from 'lucide-react';
import { FloatingCtaBand } from '../components/FloatingCtaBand';

/* Cinematic shared service page hero.
   `theme="light"` aligns hero with cream cluster (Branding / Sites-Vitrines / Home). */
function ServiceLayout({ kicker, title, subtitle, ctaLabel, badges, hero, sections, bottomCta, eyebrow, theme = 'dark', before, after }: any) {
  const light = theme === 'light';
  return (
    <main id="main">
      {before}
      <CinematicHero
        kicker={kicker}
        eyebrow={eyebrow || kicker}
        title={title}
        subtitle={subtitle}
        badges={badges}
        theme={theme}
        ctas={<>
          <Btn href="#/contact" variant="primary">{ctaLabel}</Btn>
          <a href="#/realisations" className={light
            ? "btn !bg-text-strong/8 !text-text-strong !border !border-text-strong/15 hover:!bg-text-strong/12"
            : "btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15"}>Voir nos réalisations <Icons.ArrowUpRight size={14}/></a>
        </>}
        media={hero}
        footerLabel={kicker}
      />
      {sections}
      {after}
      {bottomCta}
    </main>
  );
}

/* Service "Offre" block, bigger, theatrical */
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

/* Service "Process" block, cinematic strip */
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

/* Service "Reasons" block, cream theatrical version */
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

/* ============= Branding & Identité ============= */
function BrandingPage() {
  return (
    <main id="main">
      {/* HERO #1, ScrollExpandHero (mirror /audiovisuel + home).
          Test 03/06/26 demande Roodny : aligner toutes les pages services
          sur le pattern 3-héros de /audiovisuel. Hero #1 = ScrollExpand
          (NEW), Hero #2 = HeroBuildUpBranding existant déplacé en pos 2,
          Hero #3 = WhyGndBrandingBlock existant déplacé en pos 3. */}
      <div className="pt-20 md:pt-24 bg-bg-alt">
        <ScrollExpandHero
          mediaType="video"
          mediaSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4"
          posterSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png"
          bgImageSrc="/assets/hero1-bg-v2.png"
          title="Une marque, une intention."
          date="GND · Direction de marque"
          scrollToExpand="Scrollez pour révéler"
          textColorClass="text-bg"
        />
      </div>

      {/* Marquee CTA, bandeau entre Hero #1 et Hero #2 (mirror audio). */}
      <MarqueeCTA />

      {/* HERO #2, HeroBuildUpBranding (build-up cinematic warm, descendu pos 2). */}
      <HeroBuildUpBranding />

      {/* Notre signature, section narrative entre Hero #2 et Hero #3
          (mirror audio "Notre signature, Une direction artistique avant tout"). */}
      <Section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Kicker>Notre signature</Kicker>
            <h3 className="display text-3xl md:text-5xl mt-5 text-text-strong leading-tight">
              Une marque <span className="italic text-accent">qui tient dans le temps</span>.
            </h3>
            <p className="mt-6 text-lg md:text-xl text-text-strong italic leading-snug max-w-2xl mx-auto">
              Une belle identité ne suffit pas. Elle doit servir un positionnement.
            </p>
            <div className="mt-7 space-y-5 text-base md:text-lg text-text leading-relaxed">
              <p>
                Avant chaque logo, nous définissons ensemble le positionnement, les valeurs, le ton de voix et la perception recherchée. Couleurs, typographie, principes de cadrage sont ensuite mis au service de cette plateforme.
              </p>
              <p>
                Le résultat : une identité <strong className="text-text-strong">cohérente, distinctive</strong> et pensée pour durer cinq à dix ans, du logo à l'enseigne.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* HERO #3, WhyGndBrandingBlock (boutique hero "Notre vision" 6 chips). */}
      <WhyGndBrandingBlock />

      {/* ServicesAccordion, 6 expertises horizontal expandable (21st.dev impact-section pattern) */}
      <ServicesAccordion
        kicker="Notre offre"
        title={<>Les briques de votre <span className="italic text-accent">écosystème de marque</span>.</>}
        intro="Six expertises complémentaires pour construire un actif qui valorise votre entreprise, bien au-delà de la prochaine tendance esthétique."
        defaultOpenIndex={0}
        items={[
          {
            n: '01',
            t: 'Stratégie & Plateforme de marque',
            d: "Le cadrage. Positionnement, valeurs, promesse et ton de voix. Nous définissons cette fondation invisible qui rendra toutes vos futures communications évidentes et percutantes.",
            variant: 'cream',
          },
          {
            n: '02',
            t: "Logo & Système d'identité",
            d: "Le socle visuel. Logo principal et déclinaisons complètes (monogramme, responsive, monochrome). L'ensemble est pensé comme un système cohérent et livré dans l'intégralité des formats natifs (AI, EPS, SVG, PNG) pour garantir votre liberté.",
            variant: 'chocolat',
          },
          {
            n: '03',
            t: 'Brand Book & Generative Guidelines',
            d: "Le mode d'emploi. Couleurs, typographies, grilles de mise en page, et surtout l'intégration de vos règles d'usage IA documentées. Un document de référence conçu pour être exploité par n'importe quel prestataire, sans dépendance à notre studio.",
            variant: 'cream',
          },
          {
            n: '04',
            t: 'Direction artistique globale',
            d: "L'univers. Moodboard, règles iconographiques, traitement de l'image et de la vidéo. Nous imposons une cohérence esthétique stricte sur tous vos points de contact, parce qu'une marque ne s'arrête pas à son logo.",
            variant: 'cream',
          },
          {
            n: '05',
            t: 'Activation marketing & Supports',
            d: "Le terrain. Templates réseaux sociaux, signatures e-mail, landing pages, packaging ou supports print. L'identité descend directement dans votre quotidien, vos équipes sont prêtes à publier et à vendre immédiatement.",
            variant: 'accent',
          },
          {
            n: '06',
            t: 'Refonte et modernisation (Rebranding)',
            d: "L'évolution. Vous avez déjà une histoire ? Nous conservons l'ADN qui fait votre succès tout en élevant la qualité perçue de votre image et en remettant de l'ordre dans vos supports dispersés.",
            variant: 'cream',
          },
        ]}
      />

      {/* Notre méthode, carousel auto-rotate inspired 21st AnimatedTestimonials */}
      <MethodCarousel
        kicker="Notre méthode"
        title={<>De la compréhension à <span className="italic text-accent">l'autonomie</span>.</>}
        intro="Nous ne croyons ni à l'inspiration divine, ni aux devinettes. Une identité forte est le résultat d'un processus structuré et transparent. Vous savez toujours où nous en sommes et vous validez chaque étape clé sans subir la moindre charge mentale."
        steps={[
          {
            n: "01",
            t: "Comprendre avant de concevoir",
            d: "Nous nous imprégnons de votre marché, de vos contraintes et de vos objectifs. Nous fuyons les tendances éphémères pour chercher ce qui vous distingue fondamentalement, et le traduire en un langage visuel pensé pour durer.",
          },
          {
            n: "02",
            t: "Proposer, argumenter et affiner",
            d: "Nous vous présentons deux à trois directions créatives tranchées et défendues à voix haute. Vous décidez en toute lucidité. La méthode inclut trois rounds d'itération pour affiner la piste choisie jusqu'au moindre détail, étape par étape.",
          },
          {
            n: "03",
            t: "Documenter et rendre autonome",
            d: "La livraison n'est pas une fin, c'est un point de départ. Brand book complet, déclinaisons prêtes à l'emploi, règles d'usage IA et fichiers sources natifs, vous récupérez un système exploitable immédiatement. Votre équipe est autonome dès le premier jour.",
          },
        ]}
        intervalMs={6000}
      />

      {/* Le process, node-graph diagramme (inspiration dialedweb.com) */}
      <ProcessGraph
        kicker="Le process"
        title={<>5 étapes, aucune <span className="italic text-accent">zone d'ombre</span>.</>}
        intro="Notre promesse, la charge cognitive zéro. Vous n'intervenez qu'aux moments de validation stratégique. Entre chaque palier, nous gérons la méthode et l'exécution. Les étapes ne sont jamais sautées. Vous savez toujours où nous en sommes."
        hubLabel="Votre marque"
        ctaLabel="Démarrer le projet"
        ctaHref="#/contact"
      />

      {/* 4 convictions non négociables, InfoCard pattern (rotating conic border + title clip-path slide) */}
      <Section className="py-24 md:py-32">
        <Container>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <Kicker>Pourquoi choisir GND Consulting ?</Kicker>
              <h2 className="display text-5xl md:text-6xl lg:text-7xl mt-5 text-text-strong leading-[1.04]">
                Quatre convictions <span className="text-accent italic">non négociables</span>.
              </h2>
            </div>
            <p className="text-base md:text-lg text-text leading-relaxed max-w-xl lg:max-w-2xl md:text-right md:mt-48 lg:mt-56">
              Nous ne sommes pas une agence traditionnelle. Nous sommes un studio boutique pensé pour résoudre les vrais problèmes des dirigeants. Ces quatre engagements orientent chacune de nos décisions, du premier brief à la livraison finale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <InfoCard
              n="01"
              index={0}
              icon={Hand}
              title="Le refus du prêt-à-porter"
              description="Chaque identité est construite sur-mesure, ancrée dans la réalité de votre métier et de votre marché. Nous ne recyclons pas de templates et ne faisons pas d'abattage. Nous concevons une réponse visuelle unique à votre problématique business."
            />
            <InfoCard
              n="02"
              index={1}
              icon={Zap}
              title="Un système conçu pour l'action"
              description="Une jolie charte graphique qui dort dans un dossier ne génère aucun chiffre d'affaires. Nous livrons des marques opérationnelles. Templates, signatures, supports prêts à publier, votre identité descend directement dans votre quotidien marketing pour vous faire gagner en cadence."
            />
            <InfoCard
              n="03"
              index={2}
              icon={Unlock}
              title="L'indépendance totale du client"
              description="Nous refusons de vous prendre en otage. À la fin du projet, vous récupérez 100 % de vos fichiers sources natifs (AI, EPS, PSD…). Vous êtes le seul propriétaire de votre marque. Vous restez avec nous pour la qualité de notre accompagnement, jamais par contrainte technique."
            />
            <InfoCard
              n="04"
              index={3}
              icon={SparklesIcon}
              title="L'humain aux commandes, l'IA en accélérateur"
              description="La direction artistique, la sensibilité et la stratégie restent profondément humaines. L'intelligence artificielle intervient là où elle a du sens, pour démultiplier les déclinaisons, automatiser les tâches répétitives et accélérer l'exécution. Vous obtenez un rendu premium, sans les lenteurs d'une agence classique."
            />
          </div>
        </Container>
      </Section>

      {/* FAQ 7 questions v2 */}
      <Section bg="alt" className="py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Kicker>Questions fréquentes</Kicker>
              <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">À <span className="italic text-accent">savoir</span>.</h2>
              <p className="mt-5 text-text">Tout ce que vous devez savoir sur nos services branding et identité visuelle. Si une question manque, posez-la directement, réponse écrite sous 48 heures.</p>
            </div>
            <div className="lg:col-span-8">
              <Faq q="Quels sont les délais de réalisation ?" a="Les délais varient selon la complexité. Logo simple, cinq à sept jours. Identité complète, deux à trois semaines. Refonte globale avec brand book et activation marketing, trois à quatre semaines. Un planning précis est établi dès le brief validé."/>
              <Faq q="Combien de rounds de modifications sont inclus ?" a="Trois rounds de modifications inclus dans toutes nos prestations standard. Chaque étape fait l'objet d'une validation avant passage à la suivante, pour garder la cadence et éviter les retours en arrière."/>
              <Faq q="Quels formats de fichiers livrez-vous ?" a="Tous les formats nécessaires. Vectoriels (AI, EPS, SVG), haute résolution (PNG, JPG), formats web optimisés. Vous recevez également un guide d'utilisation complet et un classement clair pour vous y retrouver."/>
              <Faq q="Et si je n'ai aucune idée du design souhaité ?" a="C'est notre spécialité. On commence par un brief approfondi pour comprendre votre univers, vos valeurs, vos objectifs. Notre processus créatif vous guide étape par étape vers une identité qui vous ressemble vraiment, sans rien forcer."/>
              <Faq q="Pourquoi parler de marketing digital sur une page branding ?" a="Parce qu'une marque qui reste enfermée dans un brand book ne sert à rien. On la prolonge en templates, en supports prêts à publier, en règles claires pour vos équipes. Votre identité devient un outil de communication, pas une archive PDF."/>
              <Faq q="Différence entre charte graphique et brand book ?" a="La charte couvre vos visuels : logo, couleurs, typographies, règles d'usage. Le brand book ajoute la plateforme verbale, le ton de voix et l'application sur tous vos supports. Aujourd'hui, une charte sans plateforme verbale vieillit en six mois. C'est pour ça qu'on livre les deux dans un même document."/>
              <Faq q="Comment se passe le paiement ?" a="Cinquante pourcent à la commande pour lancer la production, cinquante pourcent à la livraison. Facture standard, virement bancaire. Pas d'abonnement, pas de frais cachés, pas d'engagement annuel. TVA non applicable (Art. 293 B du CGI)."/>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA, FloatingCtaBand (cohérence cross-pages) */}
      <FloatingCtaBand
        prefix="Prêt à donner vie à votre"
        rotatingWords={[
          'univers visuel ?',
          'identité de marque ?',
          'système de marque ?',
          'récit graphique ?',
          'ADN visuel ?',
          'plateforme de marque ?',
        ]}
        sub="Créons ensemble une identité visuelle qui vous ressemble et qui marquera les esprits. Premier échange sans engagement, devis personnalisé sous quarante-huit heures."
      />
    </main>
  );
}

/* ============= Motion Design ============= */
function MotionPage() {
  return (
    <ServiceLayout
      kicker="Motion design"
      title={<>Motion design<br/><span className="italic text-accent">sur mesure</span>.</>}
      subtitle="Animez vos idées. Dynamisez votre image. Attirez votre public."
      ctaLabel="Demander un devis personnalisé"
      badges={["2D · 3D", "Habillages animés", "Formats sociaux"]}
      hero={
        <div className="relative surface-card p-3 rounded-3xl max-w-[520px] mx-auto">
          <div className="rounded-2xl overflow-hidden relative bg-surface" style={{ aspectRatio:"16/9" }}>
            <img src="/assets/svc-motion.png" alt="Motion design, GND" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
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
            <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Nos créations en <span className="italic text-accent">mouvement</span>.</h2>
            <p className="mt-5 text-text max-w-xl">Découvrez quelques exemples de nos productions motion design.</p>
            <div className="mt-14 grid md:grid-cols-3 gap-5">
              {[
                { src:"https://img.youtube.com/vi/6oaO6YoWjyQ/maxresdefault.jpg", t:"Esther Seems, Bobine" },
                { src:"https://img.youtube.com/vi/UbXQim7iNLI/maxresdefault.jpg", t:"Leyel, Miel" },
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
        <OfferGrid kicker="Notre offre" title={<>Nos expertises <span className="italic text-accent">motion design</span>.</>}
          intro="Des contenus animés qui captent l'attention et transmettent vos messages en un clin d'œil."
          items={[
            { n:"01", t:"Vidéos explicatives / pédagogiques", d:"Simplifiez vos concepts complexes avec des animations claires et engageantes." },
            { n:"02", t:"Animations 2D / 3D sur mesure", d:"Créations originales adaptées à votre univers visuel et à vos objectifs marketing." },
            { n:"03", t:"Habillages graphiques animés", d:"Transitions, génériques, lower thirds pour professionnaliser vos contenus." },
            { n:"04", t:"Formats sociaux optimisés", d:"Stories, reels et formats verticaux taillés pour capter votre audience sur mobile." },
            { n:"05", t:"Motion pour campagnes publicitaires", d:"Créez des publicités animées impactantes pour Instagram, TikTok, LinkedIn ou YouTube." },
          ]}/>
        <ProcessRow kicker="Processus" title={<>Un processus fluide et <span className="italic text-accent">collaboratif</span>.</>}
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
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">À <span className="italic text-accent">savoir</span>.</h2>
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
      bottomCta={
        <FloatingCtaBand
          prefix="Donnez du mouvement à"
          rotatingWords={['vos messages.', 'votre marque.', 'votre récit.', 'votre image.', 'vos contenus.']}
          sub="Animation produit, storytelling, lancement de marque ou formation interne. Nous composons le motion design qui fera vibrer votre audience."
          primaryCta={{ label: 'Demander un devis', href: '#/contact' }}
        />
      }
    />
  );
}

/* ============= Production Audiovisuelle ============= */
/* scroll-expansion-hero (ScrollExpandMedia). Scroll-hijack behaviour (wheel/touch/scroll math,
   title split, content reveal) kept 1:1, pure JS, no library dependency, runs identically.
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
    { id: "trinity", t:"Trinity Rebel, Univers Officiel", k:"Clip musical", y:"2025", img: COVER, video: SB+"portfolio-videos/trinity_rebel_univers_officiel.mp4" },
    { id: "ali", t:"Concert Ali", k:"Captation live", y:"2024", img: COVER, video: SB+"portfolio-videos/Concert%20Ali.mp4" },
    { id: "sabay", t:"Thiek, Sabay Festival 2022", k:"Événementiel 4K", y:"2022", img:"https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg", youtube:"Vyhz7_D4fFU" },
    { id: "esther", t:"Esther Seems, BOBINE", k:"Production", y:"2024", img:"https://img.youtube.com/vi/6oaO6YoWjyQ/maxresdefault.jpg", youtube:"6oaO6YoWjyQ" },
    { id: "yungcally", t:"Yungcally, Clip officiel", k:"Clip musical", y:"2024", img: COVER, video: SB+"portfolio-videos/jyfviku.mp4" },
  ];

  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="/assets/svc-production.png"
      bgImageSrc="/assets/hero1-bg-v2.png"
      title="Production audiovisuelle."
      date="Studio créatif · Paris"
      scrollToExpand="Défilez pour découvrir"
      textBlend
    >
      <Section className="pt-0 pb-16">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <Kicker>Notre approche</Kicker>
              <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">L'image au service<br/>de votre <span className="italic text-accent">histoire</span>.</h2>
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
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-14">
            <div>
              <Kicker>Nos créations</Kicker>
              <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Des productions qui<br/><span className="italic text-accent">parlent d'elles-mêmes</span>.</h2>
            </div>
            <p className="text-text max-w-lg md:mt-48 lg:mt-56">Cliquez sur une vignette pour ouvrir la visionneuse plein écran.</p>
          </div>

          {/* Reels wall, scatter→arc inspiration recolored */}
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

      <OfferGrid kicker="Notre offre" title={<>Nos expertises vidéo<br/>à votre <span className="italic text-accent">service</span>.</>}
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
            <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">L'image qui raconte<br/>votre <span className="italic text-accent">histoire</span>.</h2>
            <div className="mt-6 space-y-4 text-lg text-text leading-relaxed">
              <p>Notre approche commence toujours par l'écoute. Nous prenons le temps de comprendre vos enjeux, votre audience et l'histoire que vous voulez raconter.</p>
              <p>Ensuite vient la production sur-mesure. Chaque captation, chaque montage est pensé pour transmettre l'émotion juste et générer l'impact attendu.</p>
              <p>Le résultat ? Des contenus vidéo authentiques et percutants, prêts à performer sur tous vos canaux de diffusion.</p>
            </div>
          </div>
        </Container>
      </Section>
      <ProcessRow kicker="Notre processus" title={<>Du brief à la <span className="italic text-accent">livraison</span>.</>}
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
              <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Questions <span className="italic text-accent">fréquentes</span>.</h2>
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
      <FloatingCtaBand
        prefix="Prêt à tourner votre prochaine"
        rotatingWords={['vidéo ?', 'captation ?', 'clip ?', 'aftermovie ?', 'campagne ?']}
        sub="Captation, montage, post-production. Chaque étape pensée pour sublimer votre image."
        primaryCta={{ label: 'Demander un devis', href: '#/contact' }}
      />
    </ScrollExpandMedia>
  );
}

/* ============= Photographie ============= */
function PhotoPage() {
  // circular 3D gallery, vraies photos du shoot GND (public/assets/photo-0X.jpg)
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
      title={<>Photographie pro<br/>& <span className="italic text-accent">direction artistique</span>.</>}
      subtitle="Portraits, reportages, packshots, campagnes : composez des images qui laissent une empreinte."
      ctaLabel="Réserver une séance sur mesure"
      badges={["Studio & extérieur", "Retouche pro incluse", "Galerie sécurisée"]}
      hero={
        <div className="grid grid-cols-2 gap-3 max-w-[480px] mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-surface" style={{ aspectRatio:"3/4" }}>
            <img src="/assets/photo-01.jpg" alt="Portrait, direction artistique GND" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
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
              <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Nos dernières <span className="italic text-accent">réalisations</span>.</h2>
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
            <h2 className="display text-5xl md:text-6xl mt-5 mb-12 text-text-strong">Une approche créative <span className="italic text-accent">& humaine</span>.</h2>
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

        <OfferGrid kicker="Notre offre" title={<>Nos prestations <span className="italic text-accent">photo</span>.</>}
          intro="Une palette complète pour nourrir vos campagnes, votre communication interne ou vos réseaux sociaux."
          items={[
            { n:"01", t:"Portraits & reportages corporate", d:"Valorisez vos équipes, vos locaux ou votre savoir-faire avec des portraits professionnels et reportages en entreprise." },
            { n:"02", t:"Photographie événementielle", d:"Capturez les moments forts de vos séminaires, conférences, lancements de produit ou soirées professionnelles." },
            { n:"03", t:"Packshots & produits e-commerce", d:"Des visuels nets et stylisés pour mettre vos produits en valeur sur les marketplaces ou vos catalogues." },
            { n:"04", t:"Visuels réseaux sociaux & influence", d:"Des photos impactantes et immersives pour booster votre image sur Instagram, TikTok ou LinkedIn." },
            { n:"05", t:"Publicité & branding", d:"Des visuels premium pour vos campagnes publicitaires, affiches, brochures ou sites web." },
            { n:"06", t:"Créations artistiques & book", d:"Projets artistiques, book modèle, contenu personnel haut de gamme : nous sublimons votre univers." },
          ]}/>

        <ProcessRow kicker="Processus" title={<>Un workflow fluide <span className="italic text-accent">et cadré</span>.</>}
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
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Avant votre <span className="italic text-accent">séance</span>.</h2>
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
      bottomCta={
        <FloatingCtaBand
          prefix="Prêt à créer des"
          rotatingWords={['visuels inoubliables ?', 'images qui vendent ?', 'portraits qui marquent ?', 'shootings premium ?', 'séances cinéma ?']}
          sub="Transformons vos idées en images qui inspirent confiance, désir et engagement. Parlez-nous de votre projet et imaginons ensemble la séance idéale."
          primaryCta={{ label: 'Réserver une séance', href: '#/contact' }}
        />
      }
    />
  );
}

/* ============= Automatisation & IA ============= */
function IAPage() {
  return (
    <ServiceLayout
      kicker="Automatisation IA · Pour TPE, PME et grandes entreprises"
      title={<>Beaucoup testent l'IA.<br/><span className="italic text-accent">Peu l'intègrent vraiment</span>.</>}
      subtitle={<>
        Créer un compte ChatGPT prend quelques minutes. Intégrer l'intelligence artificielle dans son activité de façon utile, mesurable et durable est une autre histoire.<br/><br/>
        La plupart des projets s'essoufflent rapidement : outils mal adaptés, automatisations abandonnées, équipes qui ne suivent pas ou résultats impossibles à mesurer.<br/><br/>
        Chez GND Consulting, nous concevons des systèmes simples à utiliser, documentés et pensés pour durer. Des automatisations qui s'intègrent à votre quotidien, réduisent les tâches répétitives et libèrent du temps là où il compte vraiment.
      </>}
      ctaLabel="Démarrer un projet pilote"
      badges={["n8n self-hosted FR", "RGPD by design", "LLMs au choix (OpenAI, Anthropic, Mistral, local)", "Maintenance incluse 6 mois"]}
      /* HERO #1, ScrollExpandHero injected via `before` slot (mirror
         /audiovisuel + /branding-identite + home). Refonte content V2
         03/06/26 après audit recherche workflow 4 tracks parallèles
         (Indeed FR + audit 6 agences FR + stats vérifiées sources
         primaires + storytelling intl Deloitte/Accenture/BCG/Thoughtworks).
         Hero #2 = ServiceLayout existant (CinematicHero + sections),
         Hero #3 = WhyGndIaBlock via `after` slot. */
      before={<>
        <div className="pt-20 md:pt-24 bg-bg-alt">
          <ScrollExpandHero
            mediaType="video"
            mediaSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4"
            posterSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png"
            bgImageSrc="/assets/hero1-bg-v2.png"
            title="Vos opérations qui tournent sans vous."
            date="Automatisation IA · Édition 2026"
            scrollToExpand="Faites défiler pour voir comment"
            textColorClass="text-bg"
          />
        </div>
        <MarqueeCTA />
      </>}
      /* `after` slot vidé 03/06/26, sections Notre signature + WhyGndIaBlock
         remontées en tête du slot `sections` (avant l'intro narrative)
         suite demande Roodny pour resserrer le storytelling : héros visuels
         d'abord, déroulé narratif ensuite. */
      after={null}
      hero={
        /* Media slot Hero #2, IMAGE (mirror Motion/Photo/Production).
           03/06/26 : les listes "Ce qui compte / Notre approche" + objectif
           descendues en section dédiée (top de `sections`), le slot droit
           accueille une image, pas du texte (tout le texte tient à gauche). */
        <div className="relative surface-card p-3 rounded-3xl max-w-[520px] mx-auto">
          <div className="rounded-2xl overflow-hidden relative bg-surface" style={{ aspectRatio:"4/5" }}>
            <img src="/assets/svc-ia.png" alt="Automatisation & agents IA, GND" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
          </div>
        </div>
      }
      sections={<>
        {/* Notre signature, restaurée à son emplacement original (entre
           heros et WhyGndIaBlock) après bascule erronée du 03/06/26. */}
        <Section className="py-20 md:py-28">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <Kicker>Notre signature</Kicker>
              <h3 className="display text-3xl md:text-5xl mt-5 text-text-strong leading-tight">
                Charge cognitive zéro, c'est tout le <span className="italic text-accent">projet</span>.
              </h3>
              <p className="mt-6 text-lg md:text-xl text-text-strong italic leading-snug max-w-2xl mx-auto">
                Un workflow utile vaut mieux qu'une démonstration impressionnante.
              </p>
              <div className="mt-7 space-y-5 text-base md:text-lg text-text leading-relaxed">
                <p>
                  L'automatisation n'a pas vocation à remplacer vos équipes. Elle doit leur faire gagner du temps sur ce qui ralentit réellement leur quotidien.
                </p>
                <p>
                  Chez GND Consulting, nous automatisons les tâches répétitives, documentées et prévisibles : relances clients, prise de rendez-vous, qualification de prospects, synchronisation de données, comptes-rendus, suivi administratif ou gestion documentaire.
                </p>
                <p>
                  L'objectif est simple : réduire les tâches à faible valeur ajoutée pour permettre à vos équipes de se concentrer sur ce qui compte vraiment.
                </p>
              </div>

              <div className="mt-10 grid md:grid-cols-2 gap-6 text-left">
                <div className="surface-card rounded-2xl p-6 md:p-7">
                  <h4 className="display text-xl md:text-2xl text-text-strong">Ce que nous automatisons</h4>
                  <p className="mt-3 text-sm md:text-base text-text leading-relaxed">
                    Les processus répétitifs, traçables et mesurables. Là où les gains de temps sont réels, où les erreurs diminuent et où le retour sur investissement peut être observé rapidement.
                  </p>
                </div>
                <div className="surface-card rounded-2xl p-6 md:p-7">
                  <h4 className="display text-xl md:text-2xl text-text-strong">Ce que nous n'automatisons pas</h4>
                  <p className="mt-3 text-sm md:text-base text-text leading-relaxed">
                    Les décisions stratégiques, les relations humaines sensibles, les arbitrages complexes ou tout ce qui repose sur votre expérience métier.
                  </p>
                </div>
              </div>

              <p className="mt-9 display text-2xl md:text-3xl text-text-strong">
                L'IA accélère. L'humain <span className="italic text-accent">décide</span>.
              </p>
              <p className="mt-4 text-base md:text-lg text-text leading-relaxed max-w-2xl mx-auto">
                Et lorsqu'une automatisation n'a pas de sens pour votre activité, nous préférons vous le dire plutôt que de vous vendre un projet inutile.
              </p>
            </div>
          </Container>
        </Section>

        <WhyGndIaBlock />

        {/* Pipeline anatomy V3 — composant ProcessGraph (mirror branding
           "5 étapes, aucune zone d'ombre") avec les 5 étapes IA. Textes
           inchangés, hub = "Votre projet". */}
        <ProcessGraph
          kicker="Comment on travaille"
          title={<>Anatomie d'un <span className="italic text-accent">projet IA</span>.</>}
          intro="De la première écoute jusqu'aux 6 mois de maintenance inclus. Cinq étapes, écrites au contrat."
          hubLabel="Votre projet"
          steps={[
            { n: '01', t: 'Cartographie', d: "7 jours dans vos opérations. On chiffre les tâches répétitives par poste. Vous repartez avec un document utilisable, même si on s'arrête là.", icon: Icons.MapPin },
            { n: '02', t: 'Tri & arbitrage', d: "Liste GO / liste NO-GO. ROI estimé, complexité technique, risque de défaillance. Vous validez le périmètre avant qu'on touche au moindre clavier.", icon: Icons.Check },
            { n: '03', t: 'Conception', d: "Architecture workflows, choix LLMs, intégrations API, points de validation humaine. On vous montre les schémas. Vous comprenez à chaque étape.", icon: Icons.Layers },
            { n: '04', t: 'Déploiement', d: "Mise en production progressive, monitoring, stress-tests avant le go-live. On ne livre pas un truc qui marche le lundi et casse le jeudi.", icon: Icons.Zap },
            { n: '05', t: 'Transmission', d: "Documentation transmise, formation équipe, hotline ouverte. 6 mois de maintenance inclus. Au-delà, vous reprenez la main ou vous prolongez.", icon: Icons.Users },
          ]}
        />

        {/* OfferGrid refondu V2, 6 briques avec gains sourcés sur 3/6 (saisie, relances, CRM) */}
        <ServicesAccordion
          kicker="Notre offre"
          title={<>Moins de tâches répétitives. <span className="italic text-accent">Plus de temps pour l'essentiel</span>.</>}
          intro="Nos briques d'automatisation sont conçues pour prendre en charge ce qui ralentit vos équipes : relances, suivi, organisation, traitement de données ou workflows métier. Vous gardez le contrôle. Les systèmes s'occupent du reste."
          defaultOpenIndex={0}
          items={[
            { n: '01', t: 'Gestion administrative & comptabilité', d: "Factures, notes de frais, saisie et classement documentaire. Les informations sont récupérées, traitées et envoyées automatiquement vers vos outils comptables pour limiter les tâches manuelles et les erreurs de saisie.", variant: 'cream' },
            { n: '02', t: 'Relances clients & suivi des paiements', d: "Les relances sont envoyées au bon moment, sur le bon canal et selon vos règles. Vous améliorez votre suivi sans multiplier les tâches administratives ni détériorer la relation client.", variant: 'chocolat' },
            { n: '03', t: 'Agents conversationnels', d: "Email, SMS, WhatsApp ou téléphone. Vos prospects et clients obtiennent une réponse rapide, sont qualifiés automatiquement et peuvent prendre rendez-vous sans intervention humaine lorsque cela est pertinent.", variant: 'cream' },
            { n: '04', t: 'Comptes-rendus & documentation', d: "Réunions, appels, entretiens ou ateliers. Les échanges sont transcrits, résumés et organisés automatiquement pour éviter les oublis et conserver une trace exploitable de chaque décision.", variant: 'cream' },
            { n: '05', t: 'Prospection & CRM', d: "Vos leads sont enrichis, qualifiés et suivis automatiquement. Les informations remontent dans votre CRM sans ressaisie et vos équipes peuvent se concentrer sur les échanges à forte valeur ajoutée.", variant: 'accent' },
            { n: '06', t: 'Orchestration & systèmes avancés', d: "Pour les organisations plus structurées, nous concevons des architectures capables de coordonner plusieurs automatisations et agents IA au sein d'un même écosystème, avec supervision, traçabilité et conformité intégrées.", variant: 'cream' },
          ]}
        />

        {/* Domaines d'application — composant MethodCarousel (mirror branding
           "De la compréhension à l'autonomie") pour un rendu plus stylé. */}
        <MethodCarousel
          kicker="Domaines d'application"
          title={<>Automatiser ce qui ralentit. <span className="italic text-accent">Préserver ce qui crée de la valeur</span>.</>}
          intro="Toutes les missions ne méritent pas une automatisation. Nous ciblons les processus qui consomment du temps sans améliorer la qualité du travail : saisie, suivi, relances, traitement documentaire ou coordination. L'expertise, le jugement et la relation humaine restent là où ils ont le plus d'impact."
          steps={[
            { n: '01', t: 'Marketing & communication', d: "Produire plus de contenu sans augmenter la charge de travail. Création, adaptation, diffusion et suivi des performances : vos équipes gagnent du temps tout en conservant une communication cohérente sur l'ensemble de leurs canaux." },
            { n: '02', t: 'Ventes & relation client', d: "Chaque prospect mérite une réponse rapide. Qualification, suivi, relances et prise de rendez-vous peuvent être automatisés pour permettre à vos équipes commerciales de se concentrer sur les échanges à forte valeur ajoutée." },
            { n: '03', t: 'Opérations & gestion interne', d: "Les tâches administratives ralentissent souvent la croissance. Reporting, suivi d'activité, traitement documentaire, alertes ou workflows internes : nous automatisons les opérations répétitives pour fluidifier le quotidien de vos équipes." },
            { n: '04', t: 'Ressources humaines & expérience collaborateur', d: "Onboarding, demandes internes, documentation, formation et accompagnement des collaborateurs. Des processus plus simples pour permettre aux équipes RH de consacrer davantage de temps à l'humain." },
          ]}
          intervalMs={6000}
        />

        {/* "Pourquoi maintenant" — forme radiale (mirror sites-vitrines
            "Votre site, votre métier") : médaillon central + 4 satellites
            stats + connecteurs SVG, data-driven (pas d'image figée). */}
        {(() => {
          const STATS = [
            { n: '01', v: '55 %', l: "des TPE-PME FR utilisent déjà l'IA générative fin 2025 (×1,8 en 1 an)", s: 'Bpifrance Le Lab 2025', x: 63, y: 16 },
            { n: '02', v: '24 %', l: "des entreprises FR 10+ salariés l'utilisent pour leurs process admin (×2,2 en 1 an)", s: 'INSEE 2025', x: 71, y: 39 },
            { n: '03', v: '5-6 %', l: "des TPE-PME ont automatisé leurs tâches admin avec l'IA. Fenêtre de tir ouverte.", s: 'France Num 2025 (DGE)', x: 71, y: 61 },
            { n: '04', v: '+14 %', l: 'de productivité moyenne agents support (+34 % juniors)', s: 'NBER #31161', x: 63, y: 84 },
          ];
          const CX = 26, CY = 50;
          return (
            <Section bg="alt" className="py-24 md:py-32">
              <Container>
                <div className="max-w-3xl mb-12 md:mb-16">
                  <Kicker>Pourquoi maintenant</Kicker>
                  <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">La fenêtre de tir est <span className="italic text-accent">maintenant</span>.</h2>
                  <p className="mt-5 text-text max-w-2xl">Trois ans pour qu'une majorité d'entreprises FR rattrape. Six mois pour prendre l'avance.</p>
                </div>

                {/* DESKTOP — diagramme radial */}
                <div className="hidden md:block">
                  <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                    {/* Connecteurs SVG (préserve % linéaire = matche les overlays HTML) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      {STATS.map((st) => (
                        <line key={st.n} x1={CX} y1={CY} x2={st.x} y2={st.y} stroke="#C97B3C" strokeWidth="0.22" strokeDasharray="0.6 0.9" opacity="0.7" />
                      ))}
                    </svg>

                    {/* Médaillon central */}
                    <div
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg flex flex-col items-center justify-center text-center shadow-2xl shadow-accent-deep/20"
                      style={{ left: `${CX}%`, top: `${CY}%`, width: '34%', aspectRatio: '1 / 1', border: '6px solid #C97B3C' }}
                    >
                      <div className="label-mono text-[11px] tracking-[0.3em] text-text-muted mb-2">GND · 2026</div>
                      <div className="display text-2xl lg:text-4xl text-text-strong leading-[1.05] px-6">
                        La fenêtre<br/>est <span className="italic text-accent">ouverte</span>.
                      </div>
                    </div>

                    {/* Satellites + stats */}
                    {STATS.map((st) => (
                      <React.Fragment key={st.n}>
                        <div
                          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg flex items-center justify-center shadow-lg shadow-accent-deep/15"
                          style={{ left: `${st.x}%`, top: `${st.y}%`, width: '7%', aspectRatio: '1 / 1', border: '4px solid #C97B3C' }}
                        >
                          <span className="num-display text-lg lg:text-2xl text-accent">{st.n}</span>
                        </div>
                        <div className="absolute -translate-y-1/2" style={{ left: `${st.x + 5}%`, top: `${st.y}%`, width: '30%' }}>
                          <div className="num-display text-4xl lg:text-5xl text-accent leading-none">{st.v}</div>
                          <div className="mt-2 text-sm lg:text-base text-text leading-snug">{st.l}</div>
                          <div className="mt-1.5 text-[10px] text-text-muted label-mono tracking-wider">{st.s}</div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* MOBILE — grille simple (fallback) */}
                <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {STATS.map((st) => (
                    <div key={st.n} className="border-t border-text-strong/15 pt-5">
                      <div className="num-display text-5xl text-accent">{st.v}</div>
                      <div className="mt-3 text-sm text-text leading-relaxed">{st.l}</div>
                      <div className="mt-2 text-[10px] text-text-muted label-mono tracking-wider">{st.s}</div>
                    </div>
                  ))}
                </div>
              </Container>
            </Section>
          );
        })()}

        {/* Notre conviction — forme "Manifeste" (mirror Audiovisuel) :
            full-bleed image masquée clip-inverted + scrim + texte centré
            overlay blanc + chips. Texte IA verbatim. */}
        <section className="relative w-full bg-bg-alt">
          <div
            className="relative w-full"
            style={{ minHeight: 'clamp(820px, 64vw, 1180px)' }}
          >
            <img
              src="/assets/svc-ia.png"
              alt=""
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              style={{ clipPath: 'url(#clip-inverted)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.30) 100%)',
                clipPath: 'url(#clip-inverted)',
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-20 py-12">
              <div
                className="max-w-3xl text-center"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.45), 0 0 16px rgba(0,0,0,0.25)' }}
              >
                <Kicker className="!text-white/85">Notre conviction</Kicker>
                <h2 className="display text-4xl md:text-5xl lg:text-6xl mt-5 text-white leading-[1.04]">
                  On n'automatise pas pour faire moderne. <span className="italic text-accent">On automatise pour faire mieux</span>.
                </h2>
                <div className="mt-7 space-y-4 text-sm md:text-base lg:text-lg text-white leading-relaxed max-w-2xl mx-auto">
                  <p className="text-white font-medium">
                    ChatGPT, Zapier, Make, quelques automatisations lancées en interne… puis plus rien.
                  </p>
                  <p className="text-white/90">
                    C'est le scénario le plus fréquent. Les outils existent, les intentions sont là, mais les projets s'arrêtent souvent faute de méthode, de suivi ou d'objectifs clairement définis.
                  </p>
                  <p className="text-white/80 italic">
                    L'écart entre une démonstration impressionnante et un résultat concret, c'est précisément là que nous intervenons.
                  </p>
                  <p className="text-white/90">
                    Nous identifions les tâches qui consomment du temps sans créer de valeur : relances, saisie de données, coordination, comptes-rendus, qualification de prospects ou gestion documentaire. Puis nous construisons des workflows qui s'intègrent réellement à votre activité.
                  </p>
                  <p className="text-accent font-medium">
                    Pas un prototype. Pas un effet de mode.<br/>Des systèmes qui fonctionnent le lundi matin comme le dimanche soir.
                  </p>
                  <p className="text-white/90">
                    Que vous soyez un cabinet de quelques personnes, une PME en croissance ou une structure plus importante, la logique reste la même : <span className="text-accent font-medium">moins de tâches répétitives, plus de temps pour les décisions qui comptent.</span>
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-2.5 justify-center">
                  {["Méthode", "Suivi", "Objectifs clairs", "ROI mesurable"].map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center text-xs px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/25 backdrop-blur"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* "Ce que ça change", déplacée ici (juste après "La fenêtre de tir")
           03/06/26 — remplace le doublon "Domaines d'application". */}
        <Section bg="alt" className="py-20 md:py-28">
          <Container>
            <div className="max-w-3xl mb-12">
              <Kicker>Ce que ça change</Kicker>
              <h2 className="display text-4xl md:text-5xl text-text-strong leading-tight mt-5">
                Des déploiements pensés pour le <span className="italic text-accent">concret</span>.
              </h2>
              <p className="mt-5 text-lg md:text-xl text-text leading-relaxed">
                Automatisations, agents IA, workflows métier : chaque déploiement répond à un besoin réel et s'intègre à vos outils existants.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="surface-card rounded-3xl p-7 md:p-9">
                <h3 className="display text-2xl md:text-3xl text-text-strong">
                  Ce qui compte <span className="italic text-accent">vraiment</span>
                </h3>
                <ul className="mt-5 space-y-3 text-base text-text">
                  {[
                    "Moins de tâches répétitives",
                    "Moins de temps perdu entre vos outils",
                    "Plus de réactivité auprès de vos prospects et clients",
                    "Des processus documentés et maîtrisés",
                    "Un retour sur investissement mesurable",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="surface-card rounded-3xl p-7 md:p-9">
                <h3 className="display text-2xl md:text-3xl text-text-strong">
                  Notre <span className="italic text-accent">approche</span>
                </h3>
                <ul className="mt-5 space-y-3 text-base text-text">
                  {[
                    "n8n auto-hébergé en France",
                    "Architecture pensée RGPD",
                    "Modèles IA adaptés à vos besoins (OpenAI, Anthropic, Mistral ou solutions locales)",
                    "Documentation complète",
                    "Accompagnement et maintenance inclus",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-10 text-lg md:text-xl text-text-strong font-medium max-w-2xl">
              L'objectif n'est pas d'ajouter de l'IA partout.
            </p>
            <p className="mt-2 text-base md:text-lg text-text leading-relaxed max-w-2xl">
              L'objectif est de faire gagner du temps à vos équipes et de rendre votre activité plus efficace, sans complexifier votre quotidien.
            </p>
          </Container>
        </Section>

        {/* "Pourquoi accélérer" — forme ValuesBlock (mirror home "Nos Valeurs
            Fondatrices") : panneau orange + cartes zigzag numéro/badge,
            reconstruit en CSS data-driven (pas d'image figée). */}
        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
              <Kicker className="justify-center">Pourquoi maintenant</Kicker>
              <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Pourquoi accélérer <span className="italic text-accent">maintenant</span> ?</h2>
            </div>
            {/* Infographie = MÊME asset que home "Nos Valeurs Fondatrices"
               (values-infographic.png : panneaux + badges + numéros bakés,
               zones texte vides). On overlaye les stats IA aux mêmes positions.
               -translate-y-1/2 = équivalent CSS du yPercent:-50 GSAP de la home
               (centre vertical du texte sur le panneau). */}
            <div className="relative mx-auto" style={{ maxWidth: '920px', aspectRatio: '1448 / 1086' }}>
              <img
                src="/assets/values-infographic.png?v=2"
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
              />
              {[
                { num: '01', title: '+60 %', desc: 'de croissance des revenus\nchez les leaders IA', top: '16%', left: '37%', width: '32%' },
                { num: '02', title: '+30 %', desc: "d'économies potentielles\ngrâce à l'automatisation", top: '37%', left: '46%', width: '42%' },
                { num: '03', title: '+66 %', desc: 'de débit opérationnel sur\ndes processus récurrents', top: '60%', left: '36%', width: '33%' },
                { num: '04', title: '~26 %', desc: 'des organisations capturent\ndéjà une valeur IA tangible', top: '80%', left: '46%', width: '42%' },
              ].map((r) => (
                <div
                  key={r.num}
                  className="absolute -translate-y-1/2"
                  style={{ top: r.top, left: r.left, width: r.width }}
                >
                  <h3 className="display text-2xl md:text-3xl lg:text-[2.1rem] text-bg leading-none">{r.title}</h3>
                  <p className="mt-1.5 md:mt-2 text-[11px] md:text-sm lg:text-[15px] text-bg/70 leading-snug whitespace-pre-line">{r.desc}</p>
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
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Ce qu'on nous demande <span className="italic text-accent">le plus</span>.</h2>
                <p className="mt-5 text-text">Pour TPE qui se demande si c'est rentable. Pour grands comptes qui veulent cocher les cases DSI/RSSI/DPO. Les deux ont leur réponse.</p>
              </div>
              <div className="lg:col-span-8">
                <Faq q="On est une équipe de 4 personnes, c'est rentable pour nous ?" a="Oui, souvent plus que pour les grandes structures. Le pic de ROI pour une TPE se joue sur 2-3 tâches bien ciblées (relances, prise de RDV, saisie). Le baromètre France Num 2025 montre que seules 5 à 6 % des TPE-PME utilisent l'IA pour automatiser leurs tâches, la fenêtre de tir est ouverte, la concurrence pas encore arrivée."/>
                <Faq q="On est une grande entreprise avec DSI, RSSI, DPO. Vous savez gérer ?" a="Oui. On documente, on journalise, on passe par les revues conformité. On a l'habitude des PMR (plans de migration et de réversibilité), des contrats de sous-traitance DPA, des architectures self-hosted. On parle votre langue. La méthode est la même, le formalisme s'adapte."/>
                <Faq q="Combien ça coûte ?" a="Sur devis. Chaque mission part d'une cartographie chiffrée, et le périmètre dicte le budget. Pas de grille standard affichée parce que le contexte change tout, un cabinet à 3 personnes n'a pas le même besoin qu'une direction opérationnelle de 200. On vous donne un chiffre clair après la cartographie, pas avant."/>
                <Faq q="Et si ça ne marche pas ? Si l'IA hallucine ? Si le workflow casse ?" a="Six mois de maintenance inclus, écrits au contrat. Pendant cette période, on corrige, on ajuste, on remet en route. Au-delà, vous choisissez : reprendre la main ou prolonger en forfait (89 / 149 / 249 € par mois selon la criticité). Et oui, on documente les angles morts à l'avance, il y a des cas où l'IA n'est pas la bonne réponse, et on vous le dit AVANT que vous signiez."/>
                <Faq q="Vos workflows tournent où ? Vous utilisez quoi comme IA ?" a="n8n self-hosted en France ou Europe par défaut. Pour les LLMs, on vous présente les options (OpenAI, Anthropic Claude, Mistral, modèles open-source locaux) avec les arbitrages coût/latence/confidentialité. Vous décidez. Aucune dépendance imposée. Aucun lock-in commercial."/>
                <Faq q="Vous remplacez nos équipes ?" a="Non. On enlève ce qui ne mérite pas un cerveau humain, saisie, tri, copier-coller, relances génériques, pour que vos équipes consacrent leur temps à ce qui en mérite un : décisions, relations, créativité. Le NBER l'a mesuré sur 5 172 agents support : +14 % de productivité en moyenne, +34 % pour les juniors. L'IA fait monter les gens, elle ne les sort pas."/>
              </div>
            </div>
          </Container>
        </Section>
      </>}
      bottomCta={
        <FloatingCtaBand
          prefix="Vos opérations"
          rotatingWords={[
            'qui tournent seules.',
            'sans charge mentale.',
            'qui ne dorment jamais.',
            'libérées du répétitif.',
            'pilotées, pas subies.',
          ]}
          sub="Cartographie 7 jours, ROI estimé avant devis. Sur devis. Maintenance 6 mois incluse au contrat."
          primaryCta={{ label: 'Planifier un audit gratuit', href: '#/contact' }}
        />
      }
    />
  );
}

/* ============= Audiovisuel, fusion Vidéo · Motion · Photo ============= */
function AudiovisuelPage() {
  type Reel = {
    id: string;
    t: string;
    k: string;
    y: string;
    img: string;
    video?: string;
    youtube?: string;
  };
  const SB = 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/';
  const SB_VIDS = `${SB}portfolio-videos/`;
  const SB_PHOTOS = `${SB}portfolio-photos/`;

  // Showreel, 11 productions réelles GND (7 YouTube + 4 Supabase MP4).
  // Titres vérifiés via YouTube oEmbed le 31/05/2026.
  const REELS: Reel[] = [
    { id: 'trinity', t: 'Trinity Rebel, Univers Officiel', k: 'Clip musical', y: '2025', img: `${SB_PHOTOS}gnd-cover.png`, video: `${SB_VIDS}trinity_rebel_univers_officiel.mp4` },
    { id: 'esther', t: 'Esther Seems, Bobine', k: 'Clip artiste', y: '2024', img: 'https://img.youtube.com/vi/6oaO6YoWjyQ/maxresdefault.jpg', youtube: '6oaO6YoWjyQ' },
    { id: 'sabay', t: 'Sabay Festival, Pagode de Vincennes', k: 'Événementiel 4K', y: '2023', img: 'https://img.youtube.com/vi/Vyhz7_D4fFU/maxresdefault.jpg', youtube: 'Vyhz7_D4fFU' },
    { id: 'ali', t: 'Concert Ali', k: 'Captation live', y: '2024', img: `${SB_PHOTOS}gnd-cover.png`, video: `${SB_VIDS}Concert%20Ali.mp4` },
    { id: 'cooksoul', t: 'Cook & Soul, Kaoutar (Pékin Express)', k: 'Émission culinaire', y: '2023', img: 'https://img.youtube.com/vi/galhl8_dYyk/maxresdefault.jpg', youtube: 'galhl8_dYyk' },
    { id: 'leyel', t: 'Leyel & Julien Ancieaux, Miel', k: 'Clip musical', y: '2023', img: 'https://img.youtube.com/vi/UbXQim7iNLI/maxresdefault.jpg', youtube: 'UbXQim7iNLI' },
    { id: 'eleonore', t: 'Live On Stage, Eléonore « Surprising »', k: 'Live acoustique', y: '2023', img: 'https://img.youtube.com/vi/-E4Uk-Z5qEc/maxresdefault.jpg', youtube: '-E4Uk-Z5qEc' },
    { id: 'leyelpapa', t: 'Live On Stage, LEYEL « Papa »', k: 'Live acoustique', y: '2023', img: 'https://img.youtube.com/vi/GksYCOSW3qc/maxresdefault.jpg', youtube: 'GksYCOSW3qc' },
    { id: 'yungcally', t: 'Yungcally, Clip officiel', k: 'Clip musical', y: '2024', img: `${SB_PHOTOS}gnd-cover.png`, video: `${SB_VIDS}jyfviku.mp4` },
    // L'Anecdote retirée 01/06/26, vidéo YouTube passée en privé / supprimée
    // (AGC_2cFHE_0 → 404 sur toutes résolutions thumb + oEmbed Forbidden).
    // showreel retiré du carousel 01/06/26, Creative_Studio_Video_Generation2.mp4
    // est utilisé comme media principal du ScrollExpandHero après "Quatre valeurs".
  ];

  // Galerie photo editoriale, 15 références réelles GND (titres + captions + crédits
  // extraits intégralement du bundle.js de gndconsulting.fr le 31/05/2026).
  type Photo = {
    id: string;
    src: string;
    title: string;
    caption: string;
    category: 'CRÉATIONS' | 'PORTRAITS' | 'AMBIANCES' | 'NOCÉUM';
    credit: string;
  };
  const PHOTOS_EDITORIAL: Photo[] = [
    // CRÉATIONS, Criminal Designer series (4 portraits éditoriaux)
    {
      id: 'creations-1',
      src: `${SB_PHOTOS}6F0A4251.jpg`,
      title: 'MASQUE & IDENTITÉ',
      caption: "« Un portrait saisissant qui capture l'univers du Criminal Designer. L'anonymat devient une force, transformant le masque en symbole d'expression et de créativité libre. »",
      category: 'CRÉATIONS',
      credit: 'Jonathan R.',
    },
    {
      id: 'creations-2',
      src: `${SB_PHOTOS}6F0A4135.jpg`,
      title: "L'ART EN MOUVEMENT",
      caption: "« Dans l'atelier, chaque geste devient performance. Le Criminal Designer exprime son identité à travers la matière brute, fusionnant énergie urbaine et vision artistique. »",
      category: 'CRÉATIONS',
      credit: 'Jonathan R.',
    },
    {
      id: 'creations-3',
      src: `${SB_PHOTOS}6F0A4149.jpg`,
      title: 'PUISSANCE CRÉATIVE',
      caption: "« Une mise en scène où se rencontrent charisme et rébellion. Le Criminal Designer impose une esthétique singulière, entre force, style et liberté totale. »",
      category: 'CRÉATIONS',
      credit: 'Jonathan R.',
    },
    {
      id: 'creations-4',
      src: `${SB_PHOTOS}6F0A4267.jpg`,
      title: 'VISION MASQUÉE',
      caption: "« Gros plan iconique sur le masque, emblème du Criminal Designer. L'anonymat n'efface pas l'identité, il révèle une puissance créative tournée vers l'avenir. »",
      category: 'CRÉATIONS',
      credit: 'Jonathan R.',
    },
    // PORTRAITS (3 séries)
    {
      id: 'portraits-1',
      src: `${SB_PHOTOS}6F0A4028.jpg`,
      title: 'ÉNERGIE COLLECTIVE',
      caption: "« Intensité des regards et force du groupe, un cliché qui exprime la puissance d'une énergie humaine et créative. »",
      category: 'PORTRAITS',
      credit: 'Jonathan R.',
    },
    {
      id: 'portraits-2',
      src: `${SB_PHOTOS}6F0A3992.jpg`,
      title: 'ATTITUDE & CONFIANCE',
      caption: "« Une présence naturelle captée en studio, entre assurance et style. Simplicité et charisme au cœur du portrait. »",
      category: 'PORTRAITS',
      credit: 'Jonathan R.',
    },
    {
      id: 'portraits-3',
      src: `${SB_PHOTOS}6F0A4002.JPG`,
      title: 'VISION URBAINE',
      caption: "« Jeu de postures et minimalisme graphique, souligné par des contrastes forts pour une esthétique moderne. »",
      category: 'PORTRAITS',
      credit: 'Jonathan R.',
    },
    // AMBIANCES, Événementiel (3 captations)
    {
      id: 'ambiances-1',
      src: `${SB_PHOTOS}6F0A1817.JPG`,
      title: 'SAVEURS',
      caption: "« Mise en lumière des détails culinaires et décoratifs qui font l'essence d'un événement. Chaque geste, chaque plat raconte une histoire visuelle unique. »",
      category: 'AMBIANCES',
      credit: 'Jonathan R.',
    },
    {
      id: 'ambiances-2',
      src: `${SB_PHOTOS}6F0A1873%20-%20copie%202_1.jpg`,
      title: 'INSTANTS',
      caption: "« Immersion dans l'atmosphère et l'énergie d'un événement. Les détails du décor et des ambiances renforcent l'expérience collective. »",
      category: 'AMBIANCES',
      credit: 'Jonathan R.',
    },
    {
      id: 'ambiances-3',
      src: `${SB_PHOTOS}6F0A2054.JPG`,
      title: 'PARTAGES',
      caption: "« Focus sur les échanges et connexions entre participants. Chaque interaction devient une scène vivante et authentique de l'événement. »",
      category: 'AMBIANCES',
      credit: 'Jonathan R.',
    },
    // NOCÉUM, Photo mariage (partenaire externe, série reportage juillet 2025)
    {
      id: 'noceum-1',
      src: 'https://www.gndconsulting.fr/PHOTO-2025-07-13-18-18-00.jpg',
      title: 'Moments intimes capturés',
      caption: 'Moments intimes capturés avec sincérité.',
      category: 'NOCÉUM',
      credit: 'Photo Nocéum',
    },
    {
      id: 'noceum-2',
      src: 'https://www.gndconsulting.fr/PHOTO-2025-07-13-18-18-01.jpg',
      title: "L'émotion au cœur",
      caption: "L'émotion au cœur de chaque image.",
      category: 'NOCÉUM',
      credit: 'Photo Nocéum',
    },
    {
      id: 'noceum-3',
      src: 'https://www.gndconsulting.fr/PHOTO-2025-07-13-18-18-02.jpg',
      title: 'Souvenirs éternels',
      caption: "Des souvenirs pour l'éternité.",
      category: 'NOCÉUM',
      credit: 'Photo Nocéum',
    },
    {
      id: 'noceum-4',
      src: 'https://www.gndconsulting.fr/PHOTO-2025-07-13-18-18-01%202.jpg',
      title: 'Chaque détail compte',
      caption: 'Chaque détail raconte une histoire.',
      category: 'NOCÉUM',
      credit: 'Photo Nocéum',
    },
    {
      id: 'noceum-5',
      src: 'https://www.gndconsulting.fr/PHOTO-2025-07-13-18-18-00%202.jpg',
      title: "L'art de transmettre",
      caption: "L'art de transmettre l'amour.",
      category: 'NOCÉUM',
      credit: 'Photo Nocéum',
    },
  ];

  // Compat alias (utilisé dans la Discipline 3 split section)
  const PHOTOS = PHOTOS_EDITORIAL;

  const [activeReel, setActiveReel] = React.useState<Reel | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = React.useState<number | null>(null);
  // Lightbox CircularGallery, 10 photos visibles (PHOTOS_EDITORIAL[0..9] = CRÉATIONS+PORTRAITS+AMBIANCES, NOCÉUM exclu)
  const [circLightboxIdx, setCircLightboxIdx] = React.useState<number | null>(null);
  const CIRC_COUNT = 10;

  // Lock body scroll when any lightbox open
  React.useEffect(() => {
    if (activeReel || activePhotoIdx !== null || circLightboxIdx !== null) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [activeReel, activePhotoIdx, circLightboxIdx]);

  // Keyboard nav circular lightbox
  React.useEffect(() => {
    if (circLightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCircLightboxIdx(null);
      else if (e.key === 'ArrowRight') setCircLightboxIdx((i) => (i === null ? 0 : (i + 1) % CIRC_COUNT));
      else if (e.key === 'ArrowLeft') setCircLightboxIdx((i) => (i === null ? 0 : (i - 1 + CIRC_COUNT) % CIRC_COUNT));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [circLightboxIdx]);

  // Keyboard nav for photo lightbox (← → Esc)
  React.useEffect(() => {
    if (activePhotoIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhotoIdx(null);
      else if (e.key === 'ArrowRight') setActivePhotoIdx((i) => (i === null ? 0 : (i + 1) % PHOTOS_EDITORIAL.length));
      else if (e.key === 'ArrowLeft') setActivePhotoIdx((i) => (i === null ? 0 : (i - 1 + PHOTOS_EDITORIAL.length) % PHOTOS_EDITORIAL.length));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activePhotoIdx, PHOTOS_EDITORIAL.length]);

  return (
    <>
    {/* Composition manuelle mirror BrandingPage : on évite ServiceLayout/CinematicHero
        (qui contraignent l'image dans un Container max-w 520px) au profit du hero
        custom full-bleed HeroBuildUpAudiovisuel, jumeau exact de HeroBuildUpBranding. */}
    <main id="main">
      {/* HERO #1, ScrollExpandHero (21st.dev block patché mid-page-safe).
          Remonté au top de la page 01/06/26 pour éviter problèmes de
          scroll-hijack mid-page. Heroes #2 (HeroBuildUpAudiovisuel) et
          #3 (WhyGndAudiovisuelBlock) descendus juste en dessous.
          Wrapper `pt-20 md:pt-24 bg-bg` → laisse une bande crème en haut
          pour que le header (logo + menu) flotte sur cream comme la home,
          au lieu de chevaucher l'image full-bleed du hero. */}
      <div className="pt-20 md:pt-24 bg-bg-alt">
      <ScrollExpandHero
        mediaType="video"
        mediaSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4"
        posterSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png"
        bgImageSrc="/assets/hero1-bg-v2.png"
        title="Une image, une intention."
        date="GND · Direction artistique"
        scrollToExpand="Scrollez pour révéler"
        textColorClass="text-bg"
      />
      </div>

      {/* Marquee CTA bar, déplacée 01/06/26 entre Hero #1 (ScrollExpandHero)
          et Hero #2 (HeroBuildUpAudiovisuel) pour test ergo respiration. */}
      <MarqueeCTA />

      <HeroBuildUpAudiovisuel />

        {/* Notre signature, déplacée 01/06/26 entre Hero #2
            (HeroBuildUpAudiovisuel) et Hero #3 (WhyGndAudiovisuelBlock)
            pour respiration narrative test. */}
        <Section className="py-20 md:py-28">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <Kicker>Notre signature</Kicker>
              <h3 className="display text-3xl md:text-5xl mt-5 text-text-strong leading-tight">
                Une direction, avant tout <span className="italic text-accent">artistique</span>.
              </h3>
              <p className="mt-6 text-lg md:text-xl text-text-strong italic leading-snug max-w-2xl mx-auto">
                Une belle image ne suffit pas. Elle doit servir une intention.
              </p>
              <div className="mt-7 space-y-5 text-base md:text-lg text-text leading-relaxed">
                <p>
                  Avant chaque tournage, nous définissons le message, l'ambiance et la perception recherchée. Cadrage, lumière, couleurs et rythme sont ensuite mis au service de cette vision.
                </p>
                <p>
                  Le résultat : des contenus <strong className="text-text-strong">cohérents, reconnaissables</strong> et pensés pour valoriser durablement votre image.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* HERO #3, WhyGndAudiovisuelBlock (mirror WhyGndBrandingBlock structure)
            avec 6 catégories audiovisuel : Vision · Vidéo · Motion · Photo · DA · Livraison */}
        <WhyGndAudiovisuelBlock />

        {/* Intro narrative supprimée 01/06/26, texte unifié dans le tab
            "GND Consulting" du Hero #3 (WhyGndAudiovisuelBlock cat 01) pour
            éviter répétition titre "histoire"/"actif" et doublon de propos. */}

        {/* Discipline 1, Vidéo : ServicesAccordion (mirror pattern BrandingPage
            "Les briques de votre écosystème de marque" pour cohérence cross-page).
            6 expertises horizontal expandable, alternance variants cream/chocolat/accent.
            Texte verbatim préservé. */}
        <ServicesAccordion
          kicker="01 · Vidéo & Production"
          title={<>Des productions qui<br/><span className="italic text-accent">parlent d'elles-mêmes</span>.</>}
          intro="Captation, montage, post-production cinéma. De la capsule sociale au film abouti."
          defaultOpenIndex={0}
          items={[
            {
              n: '01',
              t: 'Captation live & technique',
              d: "Multi-caméras 4K/8K, régie vidéo, projection & retours écrans, streaming multiplateforme. La rigueur d'un studio de broadcast.",
              variant: 'cream',
            },
            {
              n: '02',
              t: 'Montage & post-production',
              d: 'Montage narratif, étalonnage couleur cinématographique, sound design et effets visuels. Du rushes au master final.',
              variant: 'chocolat',
            },
            {
              n: '03',
              t: 'Clips & contenus artistiques',
              d: "Clips musicaux, vidéos créatives, univers stylisés et narration immersive. On co-construit l'esthétique avec l'artiste.",
              variant: 'cream',
            },
            {
              n: '04',
              t: 'Captation événementielle',
              d: 'Reportage, interview, terrain. Aftermovies, conférences, festivals, lancements produits.',
              variant: 'cream',
            },
            {
              n: '05',
              t: 'Vidéos social media',
              d: 'Reels, Stories, formats verticaux. Pensés pour scroller, retenir, convertir.',
              variant: 'accent',
            },
            {
              n: '06',
              t: 'Corporate & e-learning',
              d: 'Entreprise, formation, produit. Vidéos institutionnelles, capsules pédagogiques, démos.',
              variant: 'cream',
            },
          ]}
        />

        {/* 4 valeurs studio adaptées audiovisuel, déplacé 01/06/26 entre
            Discipline 1 Vidéo et Discipline 2 Motion pour respiration narrative. */}
        <Section className="py-24 md:py-32">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
              <div className="max-w-2xl">
                <Kicker>Nos engagements</Kicker>
                <h2 className="display text-5xl md:text-6xl lg:text-7xl mt-5 text-text-strong leading-[1.04]">
                  Quatre principes<br/><span className="italic text-accent">qui ne changent jamais</span>.
                </h2>
              </div>
              <p className="text-base md:text-lg text-text leading-relaxed max-w-md md:text-right">
                Quelle que soit la mission, le secteur ou le format livré, ces engagements guident chacune de nos productions.
              </p>
            </div>

            {/* Cloverleaf 2x2, inspiration infographie business-steps (Pinterest).
                4 cartes disposées autour d'un hub circulaire central. Alternance
                bg accent / text-strong (adapté palette GND). Texte verbatim
                préservé intégralement. Hub central md+ uniquement, mobile stack. */}
            <div className="relative max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {[
                  { n: "01", t: "Transparence",     d: "Pas de promesses irréalistes. Pas de coûts cachés. Pas de jargon inutile. Nous préférons expliquer clairement ce qui est possible, ce qui ne l'est pas et comment nous allons y parvenir.", style: "accent" },
                  { n: "02", t: "Fiabilité",        d: "Les délais sont annoncés en amont et suivis tout au long du projet. Un planning clair, des étapes définies et une communication régulière pour éviter les mauvaises surprises.", style: "dark" },
                  { n: "03", t: "Humain × IA",      d: "Nous utilisons les meilleurs outils disponibles lorsque cela apporte une réelle valeur. L'intelligence artificielle accélère la production. Les décisions créatives et stratégiques restent humaines.", style: "dark" },
                  { n: "04", t: "Propriété totale", d: "Votre site, votre marque, vos fichiers et vos contenus vous appartiennent. Nous documentons, transmettons et organisons nos livrables pour que vous restiez libre de vos choix aujourd'hui comme demain.", style: "accent" },
                ].map((v) => {
                  const isAccent = v.style === "accent";
                  return (
                    <div
                      key={v.t}
                      className={`relative rounded-3xl p-8 md:p-10 min-h-[300px] md:min-h-[340px] shadow-xl card-hover overflow-hidden ${
                        isAccent
                          ? "bg-accent text-bg shadow-accent/30"
                          : "bg-text-strong text-bg shadow-text-strong/30"
                      }`}
                    >
                      <div className={`num-display text-5xl md:text-6xl leading-none ${
                        isAccent ? "text-bg" : "text-accent"
                      }`}>{v.n}</div>
                      <div className="display text-2xl md:text-3xl mt-5 text-bg">{v.t}</div>
                      <p className={`mt-4 text-sm md:text-base leading-relaxed ${
                        isAccent ? "text-bg/95" : "text-bg/85"
                      }`}>{v.d}</p>
                    </div>
                  );
                })}
              </div>

              {/* Hub central, overlay au croisement des 4 cartes, masque les
                  coins intérieurs et crée l'effet pétale Pinterest. */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex pointer-events-none z-10">
                <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-bg flex flex-col items-center justify-center border-[6px] border-accent shadow-2xl shadow-accent/40">
                  <Target size={30} className="text-accent" strokeWidth={1.8}/>
                  <div className="display text-base md:text-lg tracking-[0.18em] text-text-strong mt-2">GND</div>
                  <div className="label-mono text-[9px] tracking-[0.28em] text-text-muted mt-0.5">PRINCIPES</div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Discipline 2, Motion */}
        <Section className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                {/* Image discipline 02 Motion, masquée par clip-pattern3
                    (arche + encoche bas) pour respiration éditoriale. Catalogue
                    masks dispo dans ImageMaskDefs mounté globalement. */}
                <MaskedImage
                  src="/assets/svc-motion.png"
                  alt="Motion design, GND"
                  pattern="clip-pattern3"
                  className="w-full"
                  imgClassName="transition-all duration-500 ease-out aspect-[4/5] w-full h-full object-cover hover:scale-110"
                />
              </div>
              <div className="lg:col-span-7">
                <Kicker>02 · Motion design</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Animez vos idées.<br/>Renforcez votre <span className="italic text-accent">impact</span>.</h2>
                <p className="mt-6 text-lg text-text leading-relaxed max-w-xl">Le mouvement attire l'attention, facilite la compréhension et rend une marque plus mémorable. Nous concevons des animations pensées pour servir votre message, valoriser votre identité et renforcer l'efficacité de vos contenus.</p>
                <ul className="mt-7 grid grid-cols-2 gap-4">
                  {[
                    { t:"Habillages graphiques", d:"Génériques, transitions, signatures vidéo et éléments visuels conçus pour donner de la cohérence à l'ensemble de vos productions." },
                    { t:"Motion design 2D & 3D", d:"Animations explicatives, contenus immersifs, présentations produit ou campagnes visuelles. Chaque animation est adaptée à votre objectif, votre audience et votre univers de marque." },
                    { t:"Formats sociaux", d:"Reels, TikTok, Shorts et contenus verticaux optimisés pour les usages actuels. Pensés pour capter l'attention rapidement et rester efficaces sur chaque plateforme." },
                    { t:"Logos animés", d:"Identités animées, bumpers et signatures visuelles qui prolongent votre image de marque au-delà du statique." },
                  ].map((m) => (
                    <li key={m.t} className="surface-card p-5">
                      <div className="display text-lg text-text-strong">{m.t}</div>
                      <div className="mt-1 text-sm text-text-muted">{m.d}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Discipline 3, Photographie */}
        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <Kicker>03 · Photographie</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Une photographie pensée<br/><span className="italic text-accent">pour valoriser votre marque</span>.</h2>
                <div className="mt-6 space-y-4 text-lg text-text leading-relaxed max-w-xl">
                  <p>Portraits professionnels, reportages, événements, produits ou campagnes visuelles : chaque séance est préparée en amont pour garantir une cohérence esthétique et un résultat exploitable sur l'ensemble de vos supports.</p>
                  <p>Moodboard, direction artistique et intentions visuelles sont validés avant la première prise de vue.</p>
                </div>
                <ul className="mt-7 grid grid-cols-2 gap-4">
                  {[
                    { t:"Portraits professionnels",         d:"Dirigeants, équipes, indépendants ou talents. Des images naturelles et crédibles qui renforcent la confiance et la qualité perçue de votre activité." },
                    { t:"Corporate & événementiel",         d:"Séminaires, conférences, lancements et événements professionnels. Les moments clés sont capturés avec discrétion pour alimenter durablement votre communication." },
                    { t:"Produits & e-commerce",            d:"Packshots, mises en situation et catalogues. Des visuels conçus pour mettre en valeur vos produits tout en respectant l'univers de votre marque." },
                    { t:"Direction artistique & campagnes", d:"Séries éditoriales, campagnes de communication et univers visuels complets. Une approche cohérente pour créer des images qui marquent les esprits et renforcent votre identité." },
                  ].map((p) => (
                    <li key={p.t} className="surface-card p-5">
                      <div className="display text-lg text-text-strong">{p.t}</div>
                      <div className="mt-1 text-sm text-text-muted">{p.d}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5">
                {/* Image discipline 03 Photographie, masquée par clip-pattern2
                    (tombstone / dôme arrondi haut), réminiscence frame portrait
                    éditorial premium. */}
                <MaskedImage
                  src="/assets/discipline-03-photo.png"
                  alt="Photographie GND, direction artistique éditoriale"
                  pattern="clip-pattern2"
                  className="w-full"
                  imgClassName="transition-all duration-500 ease-out aspect-[4/5] w-full h-full object-cover hover:scale-110"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* CircularGallery, même composant que la home (ReelsMosaic) pour
            cohérence cross-pages. Home a 3 photos masquées seulement ;
            ici les 10 photos GND complètes (CRÉATIONS + PORTRAITS + AMBIANCES).
            Images servies via Supabase render API (resize uniforme 800×1200 q82).
            Wrapper hauteur 720-880px verbatim home.
            CTA "Voir en plein écran" → lightbox modal full-res object-contain. */}
        <section className="relative bg-bg-alt">
          <div className="relative w-full h-[720px] md:h-[880px] pt-8 md:pt-12" style={{ color: '#2A1810' }}>
            <CircularGallery
              items={(() => {
                const RENDER = 'https://gublhtivvydkuooooffg.supabase.co/storage/v1/render/image/public/portfolio-photos/';
                const m = (f: string) => `${RENDER}${f}?width=800&height=1200&resize=cover&quality=82`;
                const items: GalleryItem[] = [
                  { image: m('6F0A4251.jpg'),                   text: 'Masque & Identité' },
                  { image: m('6F0A4135.jpg'),                   text: "L'Art en Mouvement" },
                  { image: m('6F0A4149.jpg'),                   text: 'Puissance Créative' },
                  { image: m('6F0A4267.jpg'),                   text: 'Vision Masquée' },
                  { image: m('6F0A4002.JPG'),                   text: 'Vision Urbaine' },
                  { image: m('6F0A3992.jpg'),                   text: 'Attitude & Confiance' },
                  { image: m('6F0A4028.jpg'),                   text: 'Énergie Collective' },
                  { image: m('6F0A1817.JPG'),                   text: 'Saveurs' },
                  { image: m('6F0A1873%20-%20copie%202_1.jpg'), text: 'Instants' },
                  { image: m('6F0A2054.JPG'),                   text: 'Partages' },
                ];
                return items;
              })()}
              bend={2}
              borderRadius={0.04}
              scrollEase={0.05}
            />
            {/* CTA flottant ouvrir lightbox, top-right au-dessus du canvas WebGL */}
            <div className="absolute top-6 md:top-10 right-6 md:right-10 z-10">
              <button
                type="button"
                onClick={() => setCircLightboxIdx(0)}
                className="btn btn-primary inline-flex items-center gap-2 shadow-xl shadow-text-strong/20"
              >
                <Icons.ArrowUpRight size={14}/>
                Voir les 10 photos en grand
              </button>
            </div>
          </div>
        </section>

        {/* Showreel, réalisations réelles GND audiovisuel.
            Placé immédiatement après CircularGallery (photos) pour continuité
            photo → vidéo dans le storytelling de la page. Même bg-alt que la
            section CircularGallery → enchaînement visuel seamless. */}
        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
              <div className="max-w-2xl">
                <Kicker>Showreel</Kicker>
                <h2 className="display text-5xl md:text-6xl lg:text-7xl mt-5 text-text-strong leading-[1.04]">
                  Sept projets. Sept histoires.<br/><span className="italic text-accent">Une même exigence</span>.
                </h2>
              </div>
              <div className="max-w-md md:text-right space-y-4 text-base md:text-lg text-text leading-relaxed">
                <p>Clips, événements, contenus de marque, captations et productions audiovisuelles.</p>
                <p>Nous adaptons notre approche à chaque projet, mais jamais notre niveau d'exigence. Direction artistique, narration, rythme et qualité d'exécution restent au cœur de chaque réalisation.</p>
                <p>Voici une sélection de travaux récents du studio.</p>
              </div>
            </div>

            {/* Console média verre fumé, MÊME PhotoViewer que home + /realisations
                (harmonisation cross-pages). Lecture intégrée au viewer — le
                lightbox activeReel reste en place mais n'est plus déclenché ici.
                (BasicCarousel carousel-1.tsx gardé de côté sur disque.) */}
            <PhotoViewer
              photos={REELS.map((r) => ({
                id: r.id,
                title: r.t,
                sub: `${r.k} · ${r.y}`,
                img: r.img,
                video: r.video,
                youtube: r.youtube,
                cat: /clip/i.test(r.k) ? 'Clip' : /live|captation|événementiel/i.test(r.k) ? 'Live' : 'Production',
              }))}
            />

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#/realisations" className="btn btn-secondary inline-flex">Voir toutes nos réalisations <Icons.ArrowUpRight size={14}/></a>
              <a href="#/services/production-audiovisuelle" className="btn !bg-text-strong/8 !text-text-strong !border !border-text-strong/15 hover:!bg-text-strong/12 inline-flex">Page production complète <Icons.ArrowUpRight size={14}/></a>
            </div>
          </Container>
        </Section>

        {/* Manifeste, L'émotion au service du business.
            02/06/26 : full-bleed image bandeau masquée par `clip-inverted`
            (10e pattern catalogue ImageMask, comme Home StudioHybride). Texte
            CENTRÉ horizontalement+verticalement sur l'image, scrim radial
            cream tint au centre pour lisibilité par-dessus le personnage. */}
        <section className="relative w-full bg-bg-alt">
          <div
            className="relative w-full"
            style={{ minHeight: 'clamp(720px, 58vw, 1080px)' }}
          >
            <img
              src="/assets/manifeste-audiovisuel-bg.png"
              alt=""
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              style={{ clipPath: 'url(#clip-inverted)' }}
            />

            {/* Scrim noir discret pour lisibilité texte blanc, clipPath
                identique à l'image (clip-inverted) pour rester DANS la forme
                bandeau (sinon scrim débordait sur la zone cream du container
                hors mask → tache grise inesthétique). */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.34) 50%, rgba(0,0,0,0.18) 100%)',
                clipPath: 'url(#clip-inverted)',
              }}
              aria-hidden="true"
            />

            {/* Overlay texte CENTRÉ, flex centre vertical + horizontal.
                Textes en blanc + textShadow noir doux pour pop sur bg image. */}
            <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-20 py-12">
              <div
                className="max-w-4xl text-center"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.45), 0 0 16px rgba(0,0,0,0.25)' }}
              >
                <Kicker className="!text-white/85">Manifeste</Kicker>
                <h2 className="display text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-5 text-white leading-[1.04]">
                  L'émotion au service de <span className="italic text-accent">votre communication</span>.
                </h2>
                <div className="mt-7 space-y-4 text-sm md:text-base lg:text-lg text-white leading-relaxed max-w-2xl mx-auto">
                  <p className="text-white font-medium">La technique attire parfois l'œil.</p>
                  <p className="text-white font-medium">L'émotion, elle, reste en mémoire.</p>
                  <p className="text-white/90">
                    C'est pourquoi nous accordons autant d'importance à l'<strong className="text-white">histoire racontée</strong> qu'à la qualité de production. Une vidéo efficace ne se résume pas à une succession de plans réussis. Elle crée une perception, transmet un message et renforce l'image de la marque qu'elle représente.
                  </p>
                  <p className="text-white/90">
                    Notre signature repose sur trois piliers : <em>narration, esthétique et exigence</em>.
                  </p>
                  <p className="text-white/80 italic">
                    Parce qu'au final, personne ne se souvient d'un fichier.<br/>
                    On se souvient de ce qu'il a fait ressentir.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-2.5 justify-center">
                  {["Narration visuelle", "Signature warm", "Émotion juste", "Impact mesurable"].map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center text-xs px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/25 backdrop-blur"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Processus unifié, Timeline verticale zigzag elegant. Bg crème
            charte GND (suite cohérente avec reste page). 4 étapes alternant
            gauche/droite autour d'un axe central accent, badges circulaires
            gradient accent à chaque jalon, icônes lucide par étape, reveal
            scroll Framer Motion staggered. Texte verbatim. */}
        <Section className="py-28 md:py-40 overflow-hidden relative">
          {/* Background dot grid décoratif subtil, visible sur crème */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, #FF954F 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
            aria-hidden="true"
          />
          {/* Halos accent flous top-left + bottom-right (atmosphère chaude) */}
          <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-accent/15 blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden="true" />

          <Container>
            <BigHeading
              kicker="Notre processus"
              title={<>Du brief à la <span className="italic text-accent">livraison</span>.</>}
              intro={<>Un processus clair, un interlocuteur unique et une direction artistique cohérente du premier échange jusqu'à la livraison finale.<br/><br/><span className="font-medium text-text-strong">Nous gérons la production. Vous gardez la vision.</span></>}
            />

            <div className="relative mt-20 md:mt-28 max-w-5xl mx-auto">
              {/* Axe vertical central gradient accent */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0" aria-hidden="true" />

              <div className="space-y-16 md:space-y-24">
                {[
                  { n: '01', t: 'Comprendre avant de produire', d: "Nous échangeons sur vos objectifs, votre audience et le résultat attendu. Le projet est cadré dès le départ afin d'éviter les allers-retours inutiles par la suite.",                                              Icon: ClipboardList },
                  { n: '02', t: 'Produire avec méthode',        d: 'Tournage, shooting ou motion design : chaque étape est pilotée selon une direction artistique validée en amont pour garantir cohérence et efficacité.',                                              Icon: Camera },
                  { n: '03', t: 'Affiner dans les détails',     d: "Montage, étalonnage, retouche et finitions. C'est ici que le projet prend sa forme définitive et gagne en impact.",                                                                                  Icon: Film },
                  { n: '04', t: 'Livrer et transmettre',        d: 'Vous recevez des contenus prêts à être utilisés, organisés et documentés. Vous gardez la propriété de vos fichiers, nous conservons une archive pour assurer le suivi si nécessaire.',                Icon: Send },
                ].map((s, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={s.n}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
                      className="relative grid md:grid-cols-2 gap-y-4 md:gap-x-16 items-center"
                    >
                      {/* Bloc texte, gauche/droite alternance md+ */}
                      <div className={`pl-20 md:pl-0 ${
                        isLeft
                          ? 'md:order-1 md:pr-12 md:text-right'
                          : 'md:order-2 md:pl-12 md:text-left'
                      }`}>
                        <div className={`inline-flex items-center gap-2.5 mb-3 ${
                          isLeft ? 'md:flex-row-reverse' : ''
                        }`}>
                          <s.Icon className="w-5 h-5 text-accent" strokeWidth={1.6} aria-hidden="true" />
                          <span className="label-mono text-[10px] tracking-[0.28em] text-accent">ÉTAPE {s.n}</span>
                        </div>
                        <h3 className="display text-3xl md:text-4xl lg:text-5xl text-text-strong leading-tight">{s.t}</h3>
                        <p className="mt-4 text-base md:text-lg text-text leading-relaxed max-w-md md:inline-block">{s.d}</p>
                        {/* Connecteur ligne vers axe (desktop only) */}
                        <div
                          className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-12 bg-gradient-to-r from-accent/0 to-accent/50 ${
                            isLeft ? 'right-1/2 mr-10' : 'left-1/2 ml-10 from-accent/50 to-accent/0'
                          }`}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Slot vide côté opposé (desktop), préserve grid colonne */}
                      <div
                        className={`hidden md:block ${isLeft ? 'md:order-2' : 'md:order-1'}`}
                        aria-hidden="true"
                      />

                      {/* Badge circulaire central, gradient accent + ring chocolat */}
                      <div className="absolute left-8 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
                        <div className="relative w-16 h-16 md:w-[88px] md:h-[88px] rounded-full bg-gradient-to-br from-accent via-accent to-accent-deep flex items-center justify-center shadow-2xl shadow-accent/40 ring-[6px] md:ring-8 ring-bg">
                          <span className="num-display text-2xl md:text-3xl text-bg leading-none">{s.n}</span>
                          {/* Anneau décoratif extérieur */}
                          <div className="absolute -inset-3 rounded-full border border-accent/30" aria-hidden="true" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Container>
        </Section>

        {/* Pourquoi GND, AnimatedTabs (remplace ReasonsGrid 4 cartes 01-04).
            4 onglets switcher avec image SVC + description par raison.
            variant="light" → palette cream/accent cohérente avec section parente. */}
        <Section className="py-24 md:py-32">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
              <div className="max-w-2xl">
                <Kicker>Pourquoi GND</Kicker>
                <h2 className="display text-5xl md:text-6xl lg:text-7xl mt-5 text-text-strong leading-[1.04]">
                  Pourquoi confier<br/>votre audiovisuel à <span className="text-accent italic">GND</span> ?
                </h2>
              </div>
              <p className="text-base md:text-lg text-text leading-relaxed max-w-md md:text-right">
                Quatre raisons qui font la différence sur vos productions.
              </p>
            </div>

            <div className="flex justify-center">
              <AnimatedTabs
                variant="light"
                className="max-w-5xl"
                tabs={(() => {
                  const items: { n: string; label: string; t: string; d: string; img: string }[] = [
                    { n: '01', label: 'Équipe', t: 'Un seul interlocuteur, du début à la fin.', d: "Vidéo, motion design et photographie sont pilotés sous une même direction créative afin d'éviter les intermédiaires, les pertes d'information et les allers-retours inutiles. Vous échangez avec une seule équipe. Nous coordonnons le reste.", img: '/assets/svc-production.png' },
                    { n: '02', label: 'Direction artistique', t: 'Une identité cohérente sur tous vos contenus.', d: "Chaque projet suit la même direction artistique du premier brief jusqu'à la livraison finale. Images, vidéos, animations et supports de communication partagent le même langage visuel. Résultat : une marque plus reconnaissable, plus professionnelle et plus cohérente sur l'ensemble de ses supports.", img: '/assets/svc-photo.png' },
                    { n: '03', label: 'Agilité', t: "L'agilité d'un studio, la capacité d'une équipe.", d: "Nous travaillons avec une structure légère et réactive, capable de s'entourer des bons profils lorsque le projet l'exige. Cela nous permet de rester flexibles, rapides à exécuter et adaptés aussi bien à une production ciblée qu'à un dispositif plus ambitieux.", img: '/assets/svc-motion.png' },
                    { n: '04', label: 'Outils IA', t: 'Des outils modernes au service du projet.', d: "Automatisation, intelligence artificielle et workflows optimisés nous permettent de gagner du temps sur les tâches répétitives et de concentrer davantage d'énergie sur ce qui compte réellement : l'idée, le message et la qualité d'exécution. La technologie accélère. La direction créative reste humaine.", img: '/assets/svc-ia.png' },
                  ];
                  const tabs: AnimatedTab[] = items.map((it) => ({
                    id: it.n,
                    label: it.label,
                    content: (
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
                        <div className="md:col-span-2">
                          <div className="relative rounded-xl overflow-hidden bg-surface shadow-lg shadow-text-strong/15" style={{ aspectRatio: '4/5' }}>
                            <img src={it.img} alt={it.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                          </div>
                        </div>
                        <div className="md:col-span-3 flex flex-col gap-y-3">
                          <span className="num-display text-4xl md:text-5xl text-accent leading-none">{it.n}</span>
                          <h3 className="display text-2xl md:text-3xl text-text-strong leading-tight">{it.t}</h3>
                          <p className="text-base md:text-lg text-text leading-relaxed">{it.d}</p>
                        </div>
                      </div>
                    ),
                  }));
                  return tabs;
                })()}
              />
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section bg="alt" className="py-24 md:py-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Kicker>FAQ</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Questions <span className="italic text-accent">fréquentes</span>.</h2>
                <p className="mt-5 text-text">Délais, budgets, formats livrés : trouvez rapidement les réponses sur nos productions audiovisuelles.</p>
              </div>
              <div className="lg:col-span-8">
                <Faq q="Combien de temps dure une production vidéo ?" a="Cela dépend du format : quelques jours pour une capsule sociale, deux à six semaines pour un film abouti (préparation, tournage, post-production). Un rétroplanning précis est établi dès le brief validé."/>
                <Faq q="Combien de temps pour une animation motion design ?" a="En moyenne deux à quatre semaines selon la durée et la complexité. Vidéo explicative courte, habillage social, générique, chaque format a son rythme. Planning précis dès la validation du brief pour respecter vos échéances."/>
                <Faq q="Vous gérez aussi le motion design seul ?" a="Oui. Habillages, génériques, formats sociaux verticaux, logos animés. Nous travaillons aussi bien sur des projets autonomes que sur la post-production de vos vidéos existantes."/>
                <Faq q="Pour la photo, vous gérez les droits ?" a="Cession de droits claire en fin de prestation, périmètre d'usage défini dès le devis (web, print, durée, territoire). Les fichiers sources sont archivés."/>
                <Faq q="Peut-on filmer dans plusieurs lieux ?" a="Oui. Multi-sites, intérieur, extérieur, repérages inclus : nous organisons la logistique de tournage en fonction de votre projet et de vos contraintes."/>
                <Faq q="Pouvez-vous gérer uniquement le montage ?" a="Absolument. Nous prenons en charge vos rushes existants : montage, étalonnage, sound design, motion et versions sociales, sans obligation de captation."/>
                <Faq q="Vous travaillez en 2D et 3D pour le motion ?" a="Les deux. Animation 2D After Effects pour explicatifs et habillages, 3D Cinema 4D ou Blender pour vidéos produits, idents animés, scènes immersives. Nous choisissons la technique la plus adaptée à votre projet, vos objectifs et votre budget."/>
                <Faq q="Quel budget prévoir ?" a="Chaque production est chiffrée sur devis selon le format, la durée et le niveau de post-production. Estimation transparente dès le premier échange, sans engagement, sans frais cachés."/>
                <Faq q="Comment se déroule le premier brief ?" a="Un échange dédié pour cerner vos objectifs, votre audience et vos références. Direction créative et cadrage clair en sortie, la base de tout ce qui suit."/>
                <Faq q="Quels formats et livrables en sortie ?" a="Tous les formats nécessaires à votre diffusion. Vidéo : ProRes master, H.264 web, formats verticaux sociaux, sous-titres. Photo : JPEG haute déf, RAW sur demande, galerie en ligne sécurisée. Motion : exports HD, GIF social, versions silencieuses sous-titrées. Fichiers sources archivés."/>
                <Faq q="Et l'IA dans tout ça ?" a="Outil au service du récit, jamais à sa place. Nous utilisons l'IA pour accélérer la post-production (étalonnage assisté, transcription automatique, déclinaisons sociales), la décision créative, la direction artistique et le rythme restent humains. Crédits IA transparents quand pertinent."/>
              </div>
            </div>
          </Container>
        </Section>
      <FloatingCtaBand
        prefix="Une histoire à raconter."
        rotatingWords={['Une image à construire.', 'Une marque à révéler.', 'Un message à incarner.', 'Une identité à affirmer.']}
        sub={
          <>
            <p>Chaque marque, chaque entreprise et chaque projet mérite des contenus à la hauteur de ce qu'il représente.</p>
            <p className="mt-3">Nous vous accompagnons de l'idée à la livraison avec une méthode claire, une direction artistique cohérente et un interlocuteur unique tout au long du projet.</p>
            <p className="mt-3 font-medium">Premier échange sans engagement. Devis détaillé sous 48 heures.</p>
          </>
        }
        primaryCta={{ label: 'Démarrer un projet audiovisuel', href: '#/contact' }}
      />
    </main>

    {/* Photo lightbox, visualiseur plein écran avec navigation prev/next + caption */}
    {activePhotoIdx !== null && PHOTOS_EDITORIAL[activePhotoIdx] && (() => {
      const p = PHOTOS_EDITORIAL[activePhotoIdx];
      const total = PHOTOS_EDITORIAL.length;
      const prev = () => setActivePhotoIdx((i) => (i === null ? 0 : (i - 1 + total) % total));
      const next = () => setActivePhotoIdx((i) => (i === null ? 0 : (i + 1) % total));
      return (
        <div
          className="fixed inset-0 z-[60] bg-text-strong/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8"
          onClick={() => setActivePhotoIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo : ${p.title}`}
        >
          {/* Compteur top-right (mirror prod /realisations UX) */}
          <div className="absolute top-5 left-5 md:top-7 md:left-7 chip !bg-bg/15 !text-bg !backdrop-blur z-10">
            <span className="label-mono text-[10px] tracking-[0.22em]">{activePhotoIdx + 1} / {total}</span>
          </div>
          {/* Close */}
          <button
            onClick={() => setActivePhotoIdx(null)}
            aria-label="Fermer le visualiseur"
            className="absolute top-5 right-5 md:top-7 md:right-7 w-11 h-11 rounded-full bg-bg text-text-strong inline-flex items-center justify-center shadow-xl hover:bg-accent transition z-10"
          >
            <Icons.X size={20}/>
          </button>
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Photo précédente"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bg/20 hover:bg-bg/40 text-bg inline-flex items-center justify-center backdrop-blur transition z-10"
          >
            <Icons.ArrowRight size={18} className="-scale-x-100"/>
          </button>
          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Photo suivante"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bg/20 hover:bg-bg/40 text-bg inline-flex items-center justify-center backdrop-blur transition z-10"
          >
            <Icons.ArrowRight size={18}/>
          </button>

          <div className="max-w-5xl w-full flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
            {/* Image */}
            <div className="w-full max-h-[70vh] flex items-center justify-center">
              <img
                src={p.src}
                alt={p.title}
                className="max-h-[70vh] w-auto max-w-full rounded-2xl shadow-2xl shadow-black/60 object-contain"
              />
            </div>
            {/* Caption block */}
            <div className="w-full max-w-3xl bg-bg/95 rounded-2xl p-5 md:p-7 text-center">
              <div className="label-mono text-[10px] tracking-[0.28em] text-accent mb-3">{p.category}</div>
              <div className="display text-2xl md:text-3xl text-text-strong">{p.title}</div>
              <p className="mt-4 text-text leading-relaxed text-sm md:text-base">{p.caption}</p>
              <div className="mt-4 label-mono text-[10px] tracking-[0.22em] text-text-muted">📸 Crédit photo · {p.credit}</div>
            </div>
          </div>
        </div>
      );
    })()}

    {/* CircularGallery lightbox, visualiseur plein écran object-contain + prev/next.
        Photos chargées en pleine résolution (endpoint /object/public/) pour view fidèle. */}
    {circLightboxIdx !== null && (() => {
      const CIRC_PHOTOS_DETAIL = [
        { file: '6F0A4251.jpg',                   title: 'Masque & Identité',     cat: 'CRÉATIONS' },
        { file: '6F0A4135.jpg',                   title: "L'Art en Mouvement",    cat: 'CRÉATIONS' },
        { file: '6F0A4149.jpg',                   title: 'Puissance Créative',    cat: 'CRÉATIONS' },
        { file: '6F0A4267.jpg',                   title: 'Vision Masquée',        cat: 'CRÉATIONS' },
        { file: '6F0A4002.JPG',                   title: 'Vision Urbaine',        cat: 'PORTRAITS' },
        { file: '6F0A3992.jpg',                   title: 'Attitude & Confiance',  cat: 'PORTRAITS' },
        { file: '6F0A4028.jpg',                   title: 'Énergie Collective',    cat: 'PORTRAITS' },
        { file: '6F0A1817.JPG',                   title: 'Saveurs',               cat: 'AMBIANCES' },
        { file: '6F0A1873%20-%20copie%202_1.jpg', title: 'Instants',              cat: 'AMBIANCES' },
        { file: '6F0A2054.JPG',                   title: 'Partages',              cat: 'AMBIANCES' },
      ];
      const p = CIRC_PHOTOS_DETAIL[circLightboxIdx];
      const total = CIRC_COUNT;
      const prev = () => setCircLightboxIdx((i) => (i === null ? 0 : (i - 1 + total) % total));
      const next = () => setCircLightboxIdx((i) => (i === null ? 0 : (i + 1) % total));
      return (
        <div
          className="fixed inset-0 z-[60] bg-text-strong/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8"
          onClick={() => setCircLightboxIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo : ${p.title}`}
        >
          {/* Compteur top-left */}
          <div className="absolute top-5 left-5 md:top-7 md:left-7 chip !bg-bg/15 !text-bg !backdrop-blur z-10">
            <span className="label-mono text-[10px] tracking-[0.22em]">{circLightboxIdx + 1} / {total}</span>
          </div>
          {/* Close */}
          <button
            onClick={() => setCircLightboxIdx(null)}
            aria-label="Fermer le visualiseur"
            className="absolute top-5 right-5 md:top-7 md:right-7 w-11 h-11 rounded-full bg-bg text-text-strong inline-flex items-center justify-center shadow-xl hover:bg-accent transition z-10"
          >
            <Icons.X size={20}/>
          </button>
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Photo précédente"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bg/20 hover:bg-bg/40 text-bg inline-flex items-center justify-center backdrop-blur transition z-10"
          >
            <Icons.ArrowRight size={18} className="-scale-x-100"/>
          </button>
          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Photo suivante"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-bg/20 hover:bg-bg/40 text-bg inline-flex items-center justify-center backdrop-blur transition z-10"
          >
            <Icons.ArrowRight size={18}/>
          </button>

          <div className="max-w-6xl w-full flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
            {/* Image full res, object-contain pour voir ENTIÈREMENT sans crop */}
            <img
              src={`https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/${p.file}`}
              alt={p.title}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl shadow-black/60"
            />
            {/* Caption */}
            <div className="w-full max-w-2xl bg-bg/95 rounded-2xl p-5 md:p-6 text-center">
              <div className="label-mono text-[10px] tracking-[0.28em] text-accent mb-2">{p.cat}</div>
              <div className="display text-2xl md:text-3xl text-text-strong">{p.title}</div>
            </div>
          </div>
        </div>
      );
    })()}

    {/* Lightbox, lecteur vidéo plein écran (Supabase MP4 OR YouTube iframe) */}
    {activeReel && (
      <div
        className="fixed inset-0 z-[60] bg-text-strong/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        onClick={() => setActiveReel(null)}
        role="dialog"
        aria-modal="true"
        aria-label={`Lecteur vidéo : ${activeReel.t}`}
      >
        <button
          onClick={() => setActiveReel(null)}
          aria-label="Fermer le lecteur"
          className="absolute top-5 right-5 md:top-7 md:right-7 w-11 h-11 rounded-full bg-bg text-text-strong inline-flex items-center justify-center shadow-xl hover:bg-accent transition"
        >
          <Icons.X size={20}/>
        </button>
        <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
          <div className="rounded-3xl overflow-hidden bg-bg shadow-2xl shadow-black/60">
            <div className="relative w-full" style={{ aspectRatio: '16/9', background: '#000' }}>
              {activeReel.youtube ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeReel.youtube}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeReel.t}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                />
              ) : (
                <video
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                  src={activeReel.video}
                  poster={activeReel.img}
                  controls
                  autoPlay
                  playsInline
                />
              )}
            </div>
            <div className="p-5 md:p-6 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Tag>{activeReel.k}</Tag>
                <div className="display text-xl md:text-2xl text-text-strong mt-2 truncate">{activeReel.t}</div>
                <div className="label-mono text-[10px] tracking-[0.22em] text-text-muted mt-1">{activeReel.y}</div>
              </div>
              <a href="#/contact" className="btn btn-primary shrink-0 inline-flex">Brief similaire <Icons.ArrowUpRight size={14}/></a>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export { BrandingPage, MotionPage, ProductionPage, PhotoPage, IAPage, AudiovisuelPage };
