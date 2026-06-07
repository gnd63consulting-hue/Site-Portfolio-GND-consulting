/* /agence, Manifeste Humain × IA + fondateur, ported to ES modules */
import { Section, Container, Kicker, Btn, ImgPlaceholder, CinematicHero } from '../ui';
import { FloatingCtaBand } from '../components/FloatingCtaBand';
import { Icons } from '../icons';
import { TestimonialsBlock } from './home';
import ScrollExpandHero from '@/components/blocks/scroll-expansion-hero';
import { MarqueeCTA } from '../components/MarqueeCTA';
import { WhyGndHomeBlock } from '../components/WhyGndHomeBlock';

function HeroAgence() {
  return (
    <CinematicHero
      kicker="L'agence, manifeste"
      eyebrow="l'agence"
      title={<>Humain<span className="text-accent"> × </span><span className="italic text-accent">IA</span>.</>}
      subtitle={<>GND Consulting est un studio créatif parisien fondé en 2025. Notre signature : <strong className="text-bg">l'humain décide, l'IA accélère</strong>. Une méthode revendiquée, jamais cachée.</>}
      badges={["Paris · FR", "Est. 2025", "AI Act conforme"]}
      ctas={<>
        <Btn href="#/contact" variant="primary">Échanger avec Roodny</Btn>
        <a href="#/realisations" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Voir nos réalisations <Icons.ArrowUpRight size={14}/></a>
      </>}
      bgImage="/assets/agence-hero2-scene.png"
      footerLabel="l'agence · manifeste"
    />
  );
}

function ManifestoBlock() {
  const steps = [
    { n:"01", t:"Écoute", d:"On part de votre métier, de votre public, de votre contrainte. Pas du dernier outil à la mode." },
    { n:"02", t:"Co-création", d:"Itérations rapides : l'IA produit du volume, l'œil humain trie, recadre, signe." },
    { n:"03", t:"Résultat", d:"Livrables documentés, droits clairs, mesurables. Vous gardez la main." },
  ];
  return (
    <Section bg="alt" className="py-28 md:py-40">
      <Container>
        <div className="max-w-3xl">
          <Kicker>Méthode signée</Kicker>
          <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">
            Trois temps, une <span className="italic text-accent">conviction</span>.
          </h2>
          <p className="mt-6 text-lg text-text leading-relaxed">
            Ce que nous appelons <strong>Humain × IA</strong> n'est pas un argument marketing. C'est l'organisation concrète de notre studio.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-surface/70 border hairline border rounded-3xl overflow-hidden">
          {steps.map(s => (
            <div key={s.n} className="bg-bg-alt p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="display text-6xl text-accent">{s.n}</span>
                <Icons.Sparkles size={20} className="text-text-muted"/>
              </div>
              <h3 className="display text-3xl text-text-strong mt-6">{s.t}</h3>
              <p className="mt-3 text-text leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FounderBlock() {
  return (
    <Section className="py-28 md:py-40">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="relative">
              <ImgPlaceholder label="[ portrait · roodny pierre · studio paris ]" ratio="4/5" rounded="rounded-3xl"/>
              <div className="absolute -bottom-5 -right-5 surface-card px-5 py-4">
                <div className="label-mono">fondateur</div>
                <div className="display text-xl text-text-strong mt-1">Roodny Pierre</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Kicker>Le fondateur</Kicker>
            <h2 className="display text-5xl md:text-6xl lg:text-7xl mt-5 text-text-strong">
              Un studio <span className="italic text-accent">incarné</span>.
            </h2>
            <div className="mt-7 space-y-5 text-lg text-text leading-relaxed max-w-xl">
              <p>Roodny Pierre fonde GND Consulting à Paris en 2025, après plusieurs années en production audiovisuelle, motion design et direction artistique pour des artistes, des marques et des institutions.</p>
              <p>La conviction : <strong className="text-text-strong">une création modulable, exigeante, augmentée par l'IA</strong>, sans renoncer à la signature humaine. Un seul interlocuteur, six métiers internalisés, des engagements tenus.</p>
              <p className="text-text-muted italic">« Nous ne vendons pas l'IA. Nous l'utilisons. La nuance fait toute la différence. »</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="#/contact" variant="primary">Échanger avec Roodny</Btn>
              <Btn href="https://linkedin.com/in/roodny-pierre" variant="secondary">LinkedIn</Btn>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function EthicsBlock() {
  const points = [
    { t:"Conformité AI Act", d:"Système d'IA de catégorie acceptable, déclaré, tracé. Pas d'usage à haut risque." },
    { t:"Données préservées", d:"Vos contenus ne nourrissent aucun modèle public. Conservation limitée et chiffrée." },
    { t:"Crédits IA transparents", d:"Chaque livrable signale les apports IA quand pertinent (édition, génération, post-prod)." },
    { t:"Humain décisionnel", d:"Aucune décision créative finale n'est prise par un système automatisé seul." },
  ];
  return (
    <Section bg="dark" className="py-28 md:py-40">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Kicker className="text-bg/60">Engagement éthique</Kicker>
            <h2 className="display text-5xl md:text-6xl mt-5 text-bg">L'IA, avec <span className="text-accent italic">garde-fous</span>.</h2>
            <p className="mt-6 text-bg/70 text-lg leading-relaxed max-w-md">
              Ce que la concurrence noie dans des pages légales, nous l'affichons. Quatre engagements concrets, vérifiables.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-px bg-bg/10 rounded-2xl overflow-hidden">
              {points.map(p => (
                <li key={p.t} className="bg-text-strong px-6 md:px-8 py-7 flex items-start gap-5">
                  <Icons.Check size={20} className="text-accent shrink-0 mt-1"/>
                  <div>
                    <div className="display text-2xl md:text-3xl text-bg">{p.t}</div>
                    <div className="mt-2 text-bg/70 max-w-md">{p.d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function AgencePage() {
  return (
    <main id="main">
      {/* HERO #1, ScrollExpandHero (même hero 1 que toutes les pages : home,
          sites-vitrines, branding, audiovisuel, IA). Hero #2 = HeroAgence. */}
      <div className="pt-20 md:pt-24 bg-bg-alt">
        <ScrollExpandHero
          mediaType="video"
          mediaSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4"
          posterSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png"
          bgImageSrc="/assets/hero1-bg.png"
          title="Humain × IA."
          date="GND · L'agence"
          scrollToExpand="Scrollez pour révéler"
          textColorClass="text-bg"
        />
      </div>

      {/* Marquee CTA, bandeau entre Hero #1 et Hero #2 (mirror autres pages). */}
      <MarqueeCTA />

      {/* HERO #2, manifeste agence (CinematicHero, texte). */}
      <HeroAgence/>

      {/* Section texte qui sépare Hero #2 et Hero #3 (mirror pages service). */}
      <ManifestoBlock/>

      {/* HERO #3, "Pourquoi GND / Notre vision" (même bloc boutique que la home
          et les pages service → cohérence des 3 héros). */}
      <WhyGndHomeBlock
        bubbleImages={{
          '01': '/assets/agence-hero2-full.png',
          '02': '/assets/agence-hero3-bubble02.png',
          '03': '/assets/agence-hero3-bubble03.png',
        }}
        bgImages={{
          '01': '/assets/agence-hero3-bg01.png',
          '02': '/assets/agence-hero3-bg02.png',
          '03': '/assets/agence-hero3-bg03-bright.png',
        }}
        paletteOverrides={{
          // Slide 03 : moins de chocolat, plus lumineux/crème (image éclaircie +
          // opacité plus haute + scrim plus léger qui garde la lisibilité à gauche).
          '03': {
            bgImageOpacity: 0.9,
            scrimBackground:
              'linear-gradient(90deg, rgba(42,24,16,0.5) 0%, rgba(42,24,16,0.3) 35%, rgba(42,24,16,0.1) 65%, rgba(42,24,16,0) 100%)',
          },
        }}
      />

      <FounderBlock/>
      <EthicsBlock/>
      <TestimonialsBlock/>
      <FloatingCtaBand
        prefix="On vous"
        rotatingWords={['écoute.', 'rencontre.', 'comprend.', 'accompagne.', 'imagine avec vous.']}
        sub="Présentez-nous votre métier, votre contrainte, votre cible. Le reste, on le construit ensemble."
        primaryCta={{ label: 'Démarrer un projet', href: '#/contact' }}
      />
    </main>
  );
}

export { AgencePage };
