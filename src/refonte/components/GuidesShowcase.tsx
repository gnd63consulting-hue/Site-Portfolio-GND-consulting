/* GuidesShowcase — présentation éditoriale des guides GND.
 * Adapté du pattern "about-us" (deux colonnes autour d'un visuel central),
 * recoloré à la charte GND (crème / chocolat / orange) et nourri des VRAIS
 * guides (aucune statistique inventée). SEO-safe : chaque carte reste un
 * <a> réel avec un <h3>, le contenu est toujours présent dans le DOM
 * (les animations ne jouent que sur l'opacité, jamais sur le montage).
 */
import * as React from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, MonitorSmartphone, MapPin, RefreshCw, ArrowRight } from 'lucide-react';
import { Section, Container, Kicker } from '../ui';
import type { GuideMeta } from '../pages/guides';

/* Icône par slug (lucide). Slug inconnu → puce neutre. */
const ICONS: Record<string, React.ReactNode> = {
  'freelance-ou-agence': <Users className="w-6 h-6" />,
  'faut-il-un-site-internet-commerce': <MonitorSmartphone className="w-6 h-6" />,
  'etre-visible-google-local': <MapPin className="w-6 h-6" />,
  'quand-refaire-son-site': <RefreshCw className="w-6 h-6" />,
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function GuideCard({ guide, index, direction }: { guide: GuideMeta; index: number; direction: 'left' | 'right' }) {
  return (
    <motion.a
      href={`/guides/${guide.slug}`}
      className="group block rounded-[24px] bg-bg/70 ring-1 ring-text-strong/[0.07] p-6 md:p-7 transition-all hover:ring-accent/50 hover:-translate-y-1"
      style={{ boxShadow: '0 14px 44px rgba(83,36,24,0.07)' }}
      variants={reveal}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.12 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-accent bg-accent/10 p-3 rounded-xl transition-colors duration-300 group-hover:bg-accent/20 shrink-0">
          {ICONS[guide.slug] ?? <ArrowRight className="w-6 h-6" />}
        </span>
        <span className="label-mono text-[10px] tracking-[0.18em] text-accent">
          {guide.kicker} · {guide.readMin} min
        </span>
      </div>
      <h3 className="display text-2xl md:text-[26px] mt-4 text-text-strong leading-tight group-hover:text-accent transition-colors duration-300">
        {guide.title}
      </h3>
      <p className="mt-3 text-sm text-text leading-relaxed">{guide.excerpt}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-text-strong group-hover:text-accent transition-colors">
        Lire le guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
    </motion.a>
  );
}

export function GuidesShowcase({ guides, id = 'liste' }: { guides: GuideMeta[]; id?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  // Répartition : moitié gauche / moitié droite autour du médaillon central.
  const mid = Math.ceil(guides.length / 2);
  const left = guides.slice(0, mid);
  const right = guides.slice(mid);

  return (
    <Section className="py-20 md:py-28 relative overflow-hidden">
      {/* Halos décoratifs charte (chocolat + orange), très discrets. */}
      <div className="absolute top-24 left-6 w-64 h-64 rounded-full bg-text-muted/[0.06] blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute bottom-24 right-6 w-80 h-80 rounded-full bg-accent/[0.07] blur-3xl pointer-events-none" aria-hidden />

      <Container>
        <nav id={id} className="label-mono text-[10px] tracking-[0.18em] text-text-muted mb-6 scroll-mt-28" aria-label="Fil d'Ariane">
          <a href="/" className="hover:text-accent">Accueil</a> <span className="text-text-muted/50">/</span> Guides
        </nav>
        <Kicker>Tous les guides</Kicker>
        <h2 className="display text-4xl md:text-5xl mt-4 text-text-strong leading-[1.04]">
          Choisissez votre <span className="italic text-accent">sujet</span>.
        </h2>

        <motion.div
          ref={ref}
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Colonne gauche */}
          <div className="space-y-6 md:space-y-8">
            {left.map((g, i) => (
              <GuideCard key={g.slug} guide={g} index={i} direction="left" />
            ))}
          </div>

          {/* Médaillon central GND */}
          <div className="order-first md:order-none flex justify-center">
            <motion.div className="relative" variants={reveal} transition={{ duration: 0.7, ease: 'easeOut' }}>
              <div
                className="relative w-44 h-44 md:w-52 md:h-52 rounded-full bg-bg-alt flex items-center justify-center ring-1 ring-text-strong/10"
                style={{ boxShadow: '0 24px 60px -18px rgba(83,36,24,0.35)' }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 40%, rgba(255,149,79,0.18) 0%, transparent 70%)' }}
                  aria-hidden
                />
                <img
                  src="/assets/logos/gnd-logo-full-chocolat.svg"
                  alt="GND Consulting"
                  className="relative w-24 md:w-28 select-none"
                  draggable={false}
                />
              </div>
              {/* Anneau orange décalé */}
              <div className="absolute inset-0 -m-3 rounded-full border border-accent/40 pointer-events-none" aria-hidden />
              {/* Points flottants charte */}
              <motion.span
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent"
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              />
              <motion.span
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-text-muted"
                animate={{ y: [0, 10, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                aria-hidden
              />
            </motion.div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-6 md:space-y-8">
            {right.map((g, i) => (
              <GuideCard key={g.slug} guide={g} index={i} direction="right" />
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
