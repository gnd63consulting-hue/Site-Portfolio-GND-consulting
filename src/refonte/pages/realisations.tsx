/* /realisations + project detail, REAL portfolio (live src/data/videosData.js + PortfolioPage).
   Media lazy / poster-first / click-to-play (jamais bloquant). */
import * as React from 'react';
import { Section, Container, Kicker, Btn, Tag, ImgPlaceholder, CinematicHero } from '../ui';
import { FloatingCtaBand } from '../components/FloatingCtaBand';
import { PhotoViewer } from '../components/PhotoViewer';
import { Icons } from '../icons';
import ScrollExpandHero from '@/components/blocks/scroll-expansion-hero';
import { MarqueeCTA } from '../components/MarqueeCTA';
import InteractiveImageBentoGallery from '@/components/ui/bento-gallery';

import { photo } from "../portfolio-assets";
const COVER = "/assets/hero1-poster.webp";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const ph = (f: string) => photo(f);


const ALL_PROJECTS: any[] = [
  // ——— 9 real video projects ———
  { id:"esther-seems", title:"Esther Seems", sub:"BOBINE", cat:"Clip", year:"2024", ratio:"4/5", credit:"Réalisation · Jonathan Ransau", img: yt("6oaO6YoWjyQ"), youtube:"6oaO6YoWjyQ", desc:"Clip musical de l'artiste Esther Seems, esthétique hip-hop/R&B sobre et émotive, en hommage à un proche disparu. Réalisé en collaboration avec AMS Visions." },
  { id:"trinity-rebel", title:"Trinity Rebel ft Dafxcx", sub:"L'Univers Officiel", cat:"Clip", year:"2025", ratio:"4/5", credit:"Réalisation · Julien Ancieaux", img: "/assets/posters/trinity.webp", desc:"Clip musical officiel, sonorités chaleureuses et festives, inspirées des rythmes urbains et caribéens." },
  { id:"sabay-2023", title:"Sabay Festival 2023", sub:"Grande Pagode de Vincennes", cat:"Live", year:"2023", ratio:"16/9", featured:true, credit:"Production · GND Consulting", img:"https://img.youtube.com/vi/Vyhz7_D4fFU/hqdefault.jpg", youtube:"Vyhz7_D4fFU", desc:"Captation et aftermovie officiel du Sabay Festival, célébration des traditions cambodgiennes à la Grande Pagode de Vincennes." },
  { id:"concert-ali", title:"Concert Ali 45 Scientific", sub:"Café LaPêche · Montreuil", cat:"Live", year:"2024", ratio:"3/4", credit:"Captation · IAMTV / O2M / GND", img: "/assets/posters/concert-ali.webp", desc:"Captation live du concert d'Ali, figure du rap français et cofondateur du collectif 45 Scientific aux côtés de Booba." },
  { id:"leyel-miel", title:"Leyel, Miel", sub:"Clip officiel", cat:"Clip", year:"2025", ratio:"4/5", credit:"Réalisation · Jonathan Ransau", img: yt("UbXQim7iNLI"), youtube:"UbXQim7iNLI", desc:"Clip officiel de l'artiste Leyel, variété française, mise en scène délicate. En collaboration avec O2M." },
  { id:"cook-soul", title:"Cook & Soul", sub:"Kaoutar · Pékin Express", cat:"Production", year:"2024", ratio:"16/9", featured:true, credit:"Réalisation · Gwen Templier", img: yt("galhl8_dYyk"), youtube:"galhl8_dYyk", desc:"Émission musicale produite pour IAMTV, avec Kaoutar (Pékin Express). En collaboration avec O2M." },
  { id:"yungcally", video: "/portfolio-videos/yungcally.mp4", title:"Yungcally", sub:"Clip officiel", cat:"Clip", year:"2024", ratio:"1/1", credit:"Réalisation · Jonathan Ransau", img: "/assets/posters/yungcally.webp", desc:"Clip officiel de Yungcally, jeune artiste franco-américain, vibe Wiz Khalifa / Post Malone." },
  { id:"sabay-2022", video: "/portfolio-videos/sabay-2022.mp4", title:"Sabay Festival 2022", sub:"Grande Pagode de Vincennes", cat:"Live", year:"2022", ratio:"4/3", credit:"Production · GND Consulting", img: "/assets/posters/sabay-2022.webp", desc:"Aftermovie officiel du Sabay Festival 2022, captation 4K." },
  { id:"lanecdote", title:"L'Anecdote", sub:"Émission · interviews", cat:"Production", year:"2024", ratio:"16/9", credit:"Réalisation · GND Consulting", img: "https://img.youtube.com/vi/AGC_2cFHE_0/hqdefault.jpg", youtube:"AGC_2cFHE_0", desc:"Émission L'Anecdote, format original mêlant interviews et moments de partage." },
  // ——— 10 real photo projects ———
  { id:"masque-identite", title:"Masque & Identité", sub:"Portrait · Corporate", cat:"Photo", year:"", ratio:"4/5", img: ph("6F0A4251.jpg"), desc:"Direction artistique portrait, corporate." },
  { id:"art-en-mouvement", title:"L'Art en Mouvement", sub:"Portrait · Créatif", cat:"Photo", year:"", ratio:"4/5", featured:true, img: ph("6F0A4135.jpg"), desc:"Série créative, portrait artistique." },
  { id:"puissance-creative", title:"Puissance Créative", sub:"Portrait · Studio", cat:"Photo", year:"", ratio:"4/5", img: ph("6F0A4149.jpg"), desc:"Portrait studio, direction artistique." },
  { id:"vision-masquee", title:"Vision Masquée", sub:"Portrait · Artistique", cat:"Photo", year:"", ratio:"4/5", img: ph("6F0A4267.jpg"), desc:"Portrait artistique." },
  { id:"saveurs", title:"Saveurs", sub:"Événementiel · Culinaire", cat:"Photo", year:"", ratio:"16/9", img: ph("6F0A1817.JPG"), desc:"Reportage événementiel culinaire." },
  { id:"instants", title:"Instants", sub:"Événementiel · Ambiance", cat:"Photo", year:"", ratio:"4/5", img: ph("6F0A1873%20-%20copie%202_1.jpg"), desc:"Captation d'ambiance événementielle." },
  { id:"partages", title:"Partages", sub:"Événementiel · Reportage", cat:"Photo", year:"", ratio:"16/9", img: ph("6F0A2054.JPG"), desc:"Reportage événementiel." },
  { id:"energie-collective", title:"Énergie Collective", sub:"Portrait · Groupe", cat:"Photo", year:"", ratio:"4/5", featured:true, img: ph("6F0A4028.jpg"), desc:"Portrait de groupe." },
  { id:"attitude-confiance", title:"Attitude & Confiance", sub:"Portrait · Studio", cat:"Photo", year:"", ratio:"4/5", img: ph("6F0A3992.jpg"), desc:"Portrait studio." },
  { id:"vision-urbaine", title:"Vision Urbaine", sub:"Portrait · Urbain", cat:"Photo", year:"", ratio:"4/5", img: ph("6F0A4002.JPG"), desc:"Portrait en extérieur urbain." },
];

/* lazy, poster-first picture */
function Pic({ p, rounded = "rounded-2xl", className = "" }: any) {
  if (p && p.img) return <img src={p.img} alt={p.title} loading="lazy" decoding="async" draggable={false} className={`absolute inset-0 w-full h-full object-cover ${rounded} ${className}`} />;
  return <div className={`img-placeholder absolute inset-0 ${rounded}`}><span className="px-6 text-center">{p ? p.title : ""}</span></div>;
}

function RealisationsPage() {
  return (
    <main id="main">
      {/* HERO #1, ScrollExpandHero (même hero 1 que toutes les pages). */}
      <div className="pt-20 md:pt-24 bg-bg-alt">
        <ScrollExpandHero
          mediaType="video"
          mediaSrc="/assets/hero1-video.mp4"
          posterSrc="/assets/hero1-poster.webp"
          bgImageSrc="/assets/hero1-bg-v2.webp"
          title="Nos réalisations."
          date="GND · Portfolio"
          scrollToExpand="Scrollez pour révéler"
          textColorClass="text-bg"
        />
      </div>

      {/* Marquee CTA entre Hero #1 et Hero #2 (mirror autres pages). */}
      <MarqueeCTA />

      {/* HERO #2 — mêmes éléments que le Hero #2 de la page Agence (fond scène
          desert + texte pleine largeur), seuls les textes changent. */}
      <CinematicHero
        kicker="Portfolio"
        eyebrow="réalisations"
        title={<>Nos <span className="italic text-accent">réalisations</span>.</>}
        subtitle="Clips musicaux, captations live, motion design, photographie et identité visuelle : les projets qui illustrent notre savoir-faire créatif et technique. Tous menés en interne, du brief à la livraison."
        badges={["Clips", "Live", "Production", "Photo"]}
        ctas={<>
          <Btn href="/contact" variant="primary">Démarrer un projet</Btn>
          <button
            type="button"
            onClick={() => document.getElementById('galerie')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15"
          >Tout voir <Icons.ArrowDown size={14}/></button>
        </>}
        bgImage="/assets/agence-hero2-scene.webp"
        footerLabel="réalisations · 19 projets"
      />

      {/* Galerie Photo — visionneuse "device" dédiée, toujours visible */}
      <Section id="galerie" className="pt-20 md:pt-24 pb-6">
        <Container>
          <div className="max-w-3xl mb-10 md:mb-12">
            <Kicker>Galerie</Kicker>
            <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong leading-tight">
              L'œil <span className="italic text-accent">GND</span>.
            </h2>
            <p className="mt-5 text-text leading-relaxed max-w-xl">
              Clips, captations live, productions. Naviguez la sélection : cliquez une vignette, lancez la lecture, filtrez par univers.
            </p>
          </div>
          <PhotoViewer
            photos={ALL_PROJECTS.filter(p => p.cat !== "Photo" && p.id !== "lanecdote").map(p => ({
              id: p.id, title: p.title, sub: p.sub, img: p.img, ratio: p.ratio,
              video: (p as any).video, youtube: (p as any).youtube, cat: p.cat,
            }))}
          />
        </Container>
      </Section>

      {/* Galerie Photo — bento gallery draggable (composant 21st.dev adapté
          charte). Grille bento horizontale : glisser pour explorer, cliquer
          pour agrandir en modal. (zoom-parallax gardé de côté sur disque.) */}
      <Section id="galerie-photo" className="pt-20 md:pt-24 pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl mb-4 md:mb-6">
            <Kicker>Galerie Photo</Kicker>
            <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong leading-tight">
              Plongez dans <span className="italic text-accent">l'image</span>.
            </h2>
            <p className="mt-5 text-text leading-relaxed max-w-xl">
              Portraits, studio, événementiel. Glissez pour explorer, cliquez pour agrandir.
            </p>
          </div>
        </Container>
        <InteractiveImageBentoGallery
          imageItems={[
            { id: "art-en-mouvement", span: "md:col-span-2 md:row-span-2" },
            { id: "masque-identite", span: "md:row-span-1" },
            { id: "puissance-creative", span: "md:row-span-1" },
            { id: "vision-masquee", span: "md:row-span-2" },
            { id: "energie-collective", span: "md:row-span-1" },
            { id: "saveurs", span: "md:row-span-1" },
            { id: "vision-urbaine", span: "md:col-span-2 md:row-span-2" },
          ].map(({ id, span }) => {
            const p = ALL_PROJECTS.find(x => x.id === id)!;
            return { id, title: p.title, desc: p.sub, url: p.img, span };
          })}
        />
      </Section>

      <FloatingCtaBand
        prefix="Un projet"
        rotatingWords={['en tête ?', 'à concrétiser ?', 'à lancer ?', 'à imaginer ?', 'dans les cartons ?']}
        sub="Discutons de votre vision et donnons vie à vos idées créatives."
        primaryCta={{ label: 'Démarrer un projet', href: '/contact' }}
      />
    </main>
  );
}

/* Project detail, real synopsis + real credit, real media (click-to-play). No invented metrics. */
function ProjectDetail({ id }: any) {
  const p = ALL_PROJECTS.find(x => x.id === id) || ALL_PROJECTS[0];
  const [playing, setPlaying] = React.useState(false);
  React.useEffect(() => { setPlaying(false); }, [id]);
  const hasMedia = !!(p.youtube || p.video);

  return (
    <main id="main">
      <CinematicHero
        kicker={`${p.cat}${p.year ? " · " + p.year : ""}`}
        eyebrow={<><a href="/realisations" className="hover:text-accent">réalisations</a> / {p.id}</>}
        title={<>{p.title}<span className="text-accent">.</span></>}
        subtitle={p.sub}
        badges={[p.cat, p.year, hasMedia ? "Vidéo" : "Photo"].filter(Boolean)}
        ctas={<>
          <a href="/realisations" className="btn btn-primary"><Icons.ArrowRight size={14} className="-scale-x-100"/> Tous les projets</a>
          <a href="/contact" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Un projet similaire ? <Icons.ArrowUpRight size={14}/></a>
        </>}
        media={
          <div className="relative aspect-[4/5] max-w-[480px] mx-auto">
            <div className="absolute -inset-4 rounded-3xl"
              style={{ background:'radial-gradient(circle at 50% 50%, rgba(255,149,79,.4), transparent 70%)', filter:'blur(20px)' }}></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40" style={{ background:"#E8D8C5", aspectRatio:"4/5" }}>
              <Pic p={p} rounded="rounded-3xl"/>
              {hasMedia && (
                <button aria-label="Lire la vidéo" onClick={() => setPlaying(true)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-accent text-text-strong inline-flex items-center justify-center shadow-2xl hover:scale-105 transition focus-ring"><Icons.Play size={22}/></button>
              )}
            </div>
          </div>
        }
        footerLabel={`projet · ${p.id}`}
      />

      {playing && hasMedia && (
        <div className="fixed inset-0 z-[200] bg-text-strong/95 flex items-center justify-center p-4" onClick={() => setPlaying(false)}>
          <button onClick={() => setPlaying(false)} aria-label="Fermer" className="absolute top-6 right-6 w-11 h-11 rounded-full bg-bg text-text-strong inline-flex items-center justify-center"><Icons.X size={20}/></button>
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio:"16/9", background:"#000" }}>
              {p.youtube
                ? <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${p.youtube}?autoplay=1&rel=0`} title={p.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen frameBorder="0"/>
                : <video className="absolute inset-0 w-full h-full object-contain" src={p.video} poster={p.img} controls autoPlay playsInline/>}
            </div>
          </div>
        </div>
      )}

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            <div className="max-w-2xl">
              <Kicker>Le projet</Kicker>
              <p className="display text-2xl md:text-4xl text-text-strong mt-6 leading-[1.2]">{p.desc}</p>
              <p className="mt-8 text-text leading-relaxed">
                Production menée en interne par GND Consulting, direction créative humaine, exécution accélérée par l'IA quand pertinent. Brief, réalisation, post-production et livraison documentés, droits clairs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {hasMedia && <button onClick={() => setPlaying(true)} className="btn btn-primary">Voir la vidéo <Icons.Play size={14}/></button>}
                <a href="/contact" className="btn btn-secondary">Un projet similaire ? <Icons.ArrowUpRight size={14}/></a>
              </div>
            </div>
            <div className="space-y-3 text-sm h-fit">
              {[
                { k:"Projet", v:p.title },
                { k:"Catégorie", v:p.cat },
                p.year ? { k:"Année", v:p.year } : null,
                p.credit ? { k:"Crédit", v:p.credit } : null,
                { k:"Production", v:"GND Consulting · Paris" },
              ].filter(Boolean).map((r: any) => (
                <div key={r.k} className="flex justify-between gap-4 border-b hairline border-b pb-2.5">
                  <span className="label-mono shrink-0">{r.k}</span>
                  <span className="text-text-strong font-medium text-right">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <FloatingCtaBand
        prefix="Un projet dans le même"
        rotatingWords={['esprit ?', 'ton ?', 'univers ?', 'registre ?', 'élan ?']}
        sub="Discutons de votre vision."
        primaryCta={{ label: 'Démarrer un projet', href: '/contact' }}
      />
    </main>
  );
}

export { RealisationsPage, ProjectDetail, ALL_PROJECTS };
