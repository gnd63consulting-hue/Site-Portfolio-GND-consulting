/* /services, hub, ported to ES modules */
import { Section, Container, Btn, Tag, CinematicHero } from '../ui';
import { FloatingCtaBand } from '../components/FloatingCtaBand';
import { Icons } from '../icons';

function ServicesHub() {
  const services = [
    { num:"01", t:"Sites & SEO", to:"#/services/sites-vitrines", desc:"Sites vitrines clé en main, landing pages, SEO local. Livrés en 1 à 2 semaines. Vous êtes propriétaire, aucun abonnement.", icon: Icons.Globe,
      bullets:["À partir de 800 €","Livraison 1–2 sem.","SEO local inclus","Propriété totale"] },
    { num:"02", t:"Branding & Identité", to:"#/services/branding-identite", desc:"Marque, logo, charte graphique, direction artistique, supports imprimés. Une identité qui vous ressemble, pas un template.", icon: Icons.Palette,
      bullets:["3 rounds inclus","AI / EPS / SVG / PNG","Charte 360°","Réseau d'imprimeurs"] },
    { num:"03", t:"Audiovisuel", to:"#/services/audiovisuel", desc:"Vidéo, motion design, photographie. Captation 4K/8K, clips, événementiel, corporate, contenus sociaux. Studio parisien.", icon: Icons.Film,
      bullets:["4K / 8K · Cinéma","Motion 2D · 3D","Photo studio & extérieur","Captation Paris & +"] },
    { num:"04", t:"Automatisation & IA", to:"#/services/automatisation-ia", desc:"Workflows intelligents, agents IA sur-mesure, audit & accompagnement adoption. On vous fait gagner du temps réel.", icon: Icons.Cpu,
      bullets:["+40% productivité","Audit gratuit","Agents sur-mesure","RGPD & sécurité"] },
  ];

  return (
    <main id="main">
      <CinematicHero
        kicker="Nos services"
        eyebrow="services"
        title={<>Quatre branches,<br/><span className="italic text-accent">une équipe</span>.</>}
        subtitle={<>Tout sous un même toit : <strong className="text-bg">Sites & SEO</strong>, <strong className="text-bg">Branding</strong>, <strong className="text-bg">Audiovisuel</strong>, <strong className="text-bg">Automatisation & IA</strong>. Un seul interlocuteur. Une seule méthode signée <strong className="text-bg">Humain × IA</strong>.</>}
        badges={["4 branches internalisées", "Paris · FR", "Devis 48h"]}
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

      <FloatingCtaBand
        prefix="Une question,"
        rotatingWords={['un brief ?', 'un café ?', 'un échange ?', 'un projet ?', 'une idée ?']}
        sub="On répond sous 24h."
        primaryCta={{ label: 'Démarrer un projet', href: '#/contact' }}
      />
    </main>
  );
}

export { ServicesHub };
