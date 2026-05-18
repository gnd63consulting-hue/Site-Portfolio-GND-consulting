/* /realisations + project detail — ported to ES modules */
import * as React from 'react';
import { Section, Container, Kicker, Btn, Tag, ImgPlaceholder, CtaBand, CinematicHero } from '../ui';
import { Icons } from '../icons';

const FILTERS = ["Tout", "Vidéo", "Photo", "Identité", "Live"];

const ALL_PROJECTS = [
  { id:"trinity-rebel", title:"Trinity Rebel ft Dafxcx", sub:"L'Univers Officiel", cat:"Vidéo", year:"2025", ratio:"4/5", featured:true },
  { id:"esther-seems", title:"Esther Seems", sub:"BOBINE", cat:"Vidéo", year:"2024", ratio:"1/1" },
  { id:"sabay-2023", title:"Sabay Festival 2023", sub:"Thiek", cat:"Live", year:"2023", ratio:"16/9", featured:true },
  { id:"sabay-2022", title:"Sabay Festival 2022", sub:"Thiek", cat:"Live", year:"2022", ratio:"4/3" },
  { id:"ali-scientific", title:"Concert Ali 45 Scientific", sub:"Captation live", cat:"Live", year:"2024", ratio:"3/4" },
  { id:"leyel-miel", title:"Leyel — Miel", sub:"Identité visuelle", cat:"Identité", year:"2025", ratio:"4/5" },
  { id:"yungcally", title:"Yungcally", sub:"Clip officiel", cat:"Vidéo", year:"2024", ratio:"1/1" },
  { id:"cook-soul", title:"Cook & Soul", sub:"Kaoutar · Pékin Express", cat:"Photo", year:"2024", ratio:"16/9", featured:true },
];

function RealisationsPage() {
  const [filter, setFilter] = React.useState("Tout");
  const items = filter === "Tout" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === filter);

  return (
    <main id="main">
      <CinematicHero
        kicker="Réalisations"
        eyebrow="réalisations"
        title={<>La preuve,<br/>en <span className="italic">images</span>.</>}
        subtitle="Une sélection de projets — clips, captations live, identités, photographie. Tous menés en interne, du brief à la livraison."
        badges={["Clips", "Live", "Identité", "Photo"]}
        ctas={<>
          <Btn href="#/contact" variant="primary">Démarrer un projet</Btn>
          <a href="#all" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Tout voir <Icons.ArrowDown size={14}/></a>
        </>}
        media={
          <div className="grid grid-cols-2 gap-3 max-w-[480px] mx-auto">
            <ImgPlaceholder label="[ trinity rebel ]" ratio="4/5" rounded="rounded-2xl"/>
            <ImgPlaceholder label="[ sabay 2023 ]" ratio="4/5" rounded="rounded-2xl"/>
            <ImgPlaceholder label="[ esther seems ]" ratio="4/5" rounded="rounded-2xl"/>
            <ImgPlaceholder label="[ cook & soul ]" ratio="4/5" rounded="rounded-2xl"/>
          </div>
        }
        footerLabel="réalisations"
      />

      <section id="all" className="pt-20 pb-12">
        <Container>
          {/* filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`btn ${filter === f ? "btn-primary" : "btn-secondary"} !py-2.5 !px-4 text-xs`}>
                <span>{f}</span>
                <span className="opacity-50">{f === "Tout" ? ALL_PROJECTS.length : ALL_PROJECTS.filter(p => p.cat === f).length}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <Section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {items.map((p, i) => {
              const span = p.featured ? "col-span-12 md:col-span-8" : i % 5 === 1 ? "col-span-12 md:col-span-4" : "col-span-6 md:col-span-4";
              return (
                <a key={p.id} href={`#/realisations/${p.id}`}
                  className={`group relative overflow-hidden rounded-2xl card-hover ${span}`}>
                  <ImgPlaceholder label={`[ ${p.title.toLowerCase()} ]`} ratio={p.ratio} rounded="rounded-2xl"/>
                  <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-between bg-gradient-to-b from-transparent via-transparent to-text-strong/65">
                    <div className="flex items-center gap-2">
                      <Tag>{p.cat}</Tag>
                      <Tag>{p.year}</Tag>
                    </div>
                    <div>
                      <div className="text-bg display text-2xl md:text-3xl">{p.title}</div>
                      <div className="text-bg/80 text-sm">{p.sub}</div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBand title="Votre projet, en haut de la pile." cta="Démarrer un projet"/>
    </main>
  );
}

/* Project detail (case study template) */
function ProjectDetail({ id }: any) {
  const p = ALL_PROJECTS.find(x => x.id === id) || ALL_PROJECTS[0];
  return (
    <main id="main">
      <CinematicHero
        kicker={`${p.cat} · ${p.year}`}
        eyebrow={<><a href="#/realisations" className="hover:text-accent">réalisations</a> / {p.id}</>}
        title={<>{p.title}<span className="text-accent">.</span></>}
        subtitle={p.sub}
        badges={[p.cat, p.year, "Production interne"]}
        ctas={<>
          <a href="#/realisations" className="btn btn-primary"><Icons.ArrowRight size={14} className="-scale-x-100"/> Tous les projets</a>
          <a href="#/contact" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Un projet similaire ? <Icons.ArrowUpRight size={14}/></a>
        </>}
        media={
          <div className="relative aspect-[4/5] max-w-[480px] mx-auto">
            <div className="absolute -inset-4 rounded-3xl"
              style={{ background:'radial-gradient(circle at 50% 50%, rgba(255,149,79,.4), transparent 70%)', filter:'blur(20px)' }}></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
              <ImgPlaceholder label={`[ ${p.title.toLowerCase()} ]`} ratio="4/5" rounded="rounded-3xl"/>
              <button className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-accent text-text-strong inline-flex items-center justify-center"><Icons.Play size={22}/></button>
            </div>
          </div>
        }
        footerLabel={`projet · ${p.id}`}
      />

      <Section className="py-12">
        <Container>
          <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-end">
            <div></div>
            <div className="space-y-3 text-sm">
              {[
                { k:"Client", v:p.title },
                { k:"Métiers", v:p.cat + " · post-prod" },
                { k:"Année", v:p.year },
                { k:"Équipe", v:"Roodny Pierre + 2 collab." },
              ].map(r => (
                <div key={r.k} className="flex justify-between border-b hairline border-b pb-2.5">
                  <span className="label-mono">{r.k}</span>
                  <span className="text-text-strong font-medium">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pb-12">
        <Container>
          <ImgPlaceholder label={`[ hero · ${p.title.toLowerCase()} ]`} ratio="21/9" rounded="rounded-3xl"/>
        </Container>
      </Section>

      <Section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Kicker>Contexte</Kicker>
              <h2 className="display text-3xl text-text-strong mt-4">L'enjeu</h2>
              <p className="mt-3 text-text leading-relaxed">Capturer une signature visuelle forte, en peu de jours, avec une équipe restreinte et un budget maîtrisé.</p>
            </div>
            <div className="lg:col-span-4">
              <Kicker>Approche</Kicker>
              <h2 className="display text-3xl text-text-strong mt-4">Humain × IA</h2>
              <p className="mt-3 text-text leading-relaxed">Pré-prod accélérée par génération de moodboards, sélection humaine. Tournage 100% humain. Post-prod assistée pour le tri rushes.</p>
            </div>
            <div className="lg:col-span-4">
              <Kicker>Résultat</Kicker>
              <h2 className="display text-3xl text-text-strong mt-4">Mesurable</h2>
              <p className="mt-3 text-text leading-relaxed">Livrable validé en un round. Audience cible touchée. Plus de 8× ROI sur média payant déclenché par le contenu.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <ImgPlaceholder label="[ still 01 ]" ratio="4/5" className="col-span-6 md:col-span-4 rounded-2xl"/>
            <ImgPlaceholder label="[ still 02 ]" ratio="4/5" className="col-span-6 md:col-span-4 rounded-2xl"/>
            <ImgPlaceholder label="[ still 03 ]" ratio="4/5" className="col-span-6 md:col-span-4 rounded-2xl"/>
            <ImgPlaceholder label="[ behind the scenes ]" ratio="21/9" className="col-span-12 rounded-2xl"/>
          </div>
        </Container>
      </Section>

      <CtaBand title="Un projet dans le même esprit ?" cta="Démarrer un projet"/>
    </main>
  );
}

export { RealisationsPage, ProjectDetail };
