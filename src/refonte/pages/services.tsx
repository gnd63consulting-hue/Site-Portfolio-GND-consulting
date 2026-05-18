/* /services — hub — ported to ES modules */
import { Section, Container, Btn, Tag, CtaBand, CinematicHero } from '../ui';
import { Icons } from '../icons';

function ServicesHub() {
  const services = [
    { num:"01", t:"Sites Vitrines", to:"#/services/sites-vitrines", desc:"Sites professionnels clé en main, livrés en 1 à 2 semaines. Vous êtes propriétaire. Pas d'abonnement.", icon: Icons.Globe,
      bullets:["À partir de 800 €","Livraison 1–2 sem.","SEO inclus"] },
    { num:"02", t:"Design & Identité Visuelle", to:"#/services/design-identite-visuelle", desc:"Logos, chartes graphiques, supports imprimés. Une identité qui vous ressemble vraiment.", icon: Icons.Palette,
      bullets:["3 rounds inclus","AI / EPS / SVG / PNG","Réseau d'imprimeurs"] },
    { num:"03", t:"Motion Design", to:"#/services/motion-design", desc:"Animez vos idées. Dynamisez votre image. Attirez votre public.", icon: Icons.Zap,
      bullets:["2D · 3D","Habillages","Formats sociaux"] },
    { num:"04", t:"Production Audiovisuelle", to:"#/services/production-audiovisuelle", desc:"Studio parisien — captation live, montage, post-production. Nous sublimons vos histoires.", icon: Icons.Film,
      bullets:["4K / 8K","Captation Paris & + ","Clips · events · corporate"] },
    { num:"05", t:"Photographie", to:"#/services/photographie", desc:"Direction artistique sur-mesure : business, événement, e-commerce, branding.", icon: Icons.Camera,
      bullets:["Studio & extérieur","Retouche pro","Cession de droits claire"] },
    { num:"06", t:"Automatisation & IA", to:"#/services/automatisation-ia", desc:"Workflows intelligents pour booster productivité, qualité et engagement.", icon: Icons.Cpu,
      bullets:["+40% productivité","Audit gratuit","RGPD & sécurité"] },
  ];

  return (
    <main id="main">
      <CinematicHero
        kicker="Nos services"
        eyebrow="services"
        title={<>Six métiers,<br/><span className="italic">une équipe</span>.</>}
        subtitle={<>Tout sous un même toit : audiovisuel, design, motion, photo, sites, IA. Un seul interlocuteur. Une seule méthode signée <strong className="text-bg">Humain × IA</strong>.</>}
        badges={["6 métiers internalisés", "Paris · FR", "Devis 48h"]}
        ctas={<>
          <Btn href="#/contact" variant="primary">Démarrer un projet</Btn>
          <a href="#/realisations" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Voir nos réalisations <Icons.ArrowUpRight size={14}/></a>
        </>}
        footerLabel="services"
      />

      <Section bg="alt" className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {services.map((s) => {
              const Ico = s.icon;
              return (
                <a key={s.num} href={s.to} className="group surface-card p-8 md:p-10 card-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <span className="w-12 h-12 rounded-full bg-text-strong text-bg flex items-center justify-center">
                        <Ico size={20}/>
                      </span>
                      <span className="label-mono">{s.num}</span>
                    </div>
                    <span className="w-10 h-10 rounded-full border hairline border inline-flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition">
                      <Icons.ArrowUpRight size={16}/>
                    </span>
                  </div>
                  <h3 className="display text-3xl md:text-4xl text-text-strong mt-8">{s.t}</h3>
                  <p className="mt-3 text-text leading-relaxed">{s.desc}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.bullets.map(b => <li key={b}><Tag>{b}</Tag></li>)}
                  </ul>
                </a>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBand title="Une question, un brief ?" cta="Démarrer un projet"/>
    </main>
  );
}

export { ServicesHub };
