/* Rubrique /guides — pages éditoriales natives (pas un blog externe).
 * Index (/guides) + page article (/guides/<slug>). Conçues SEO + GEO :
 * H1 avec mot-clé, H2 en questions, réponse concise en tête de section
 * (éligible featured snippet / AI Overviews), liens internes, FAQ balisée.
 * Charte GND : crème / chocolat / orange, titres display (Marcellus). */
import * as React from 'react';
import { Section, Container, Kicker, Btn, Faq } from '../ui';
import { Icons } from '../icons';
import { FaqJsonLd, type FaqItem } from '../components/FaqJsonLd';
import { FloatingCtaBand } from '../components/FloatingCtaBand';

export type GuideMeta = {
  slug: string;
  title: string;        // titre de la carte / lien
  h1: string;           // H1 de l'article (mot-clé)
  description: string;  // meta description
  excerpt: string;      // résumé carte index
  readMin: number;
  kicker: string;
};

/* Registre des guides (sert l'index, le SEO et le pré-rendu). */
export const GUIDES: GuideMeta[] = [
  {
    slug: 'freelance-ou-agence',
    title: 'Freelance ou agence : qui choisir pour créer son site ?',
    h1: 'Freelance ou agence : qui choisir pour créer son site ?',
    description:
      "Freelance, agence ou studio hybride : avantages, coûts et risques pour créer le site internet de votre PME en 2026. Le guide GND pour choisir sans se tromper.",
    excerpt:
      "Coûts, risques, continuité : la comparaison honnête — et le troisième modèle qui réconcilie les deux.",
    readMin: 6,
    kicker: 'Guide · Sites web',
  },
];

export function guideBySlug(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/* ============================ INDEX /guides ============================ */
export function GuidesIndex() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <Section className="py-16 md:py-24">
        <Container>
          <nav className="label-mono text-[10px] tracking-[0.18em] text-text-muted mb-6" aria-label="Fil d'Ariane">
            <a href="/" className="hover:text-accent">Accueil</a> <span className="text-text-muted/50">/</span> Guides
          </nav>
          <Kicker>Ressources</Kicker>
          <h1 className="display text-5xl md:text-7xl mt-5 text-text-strong leading-[1.02]">
            Guides <span className="italic text-accent">GND</span>.
          </h1>
          <p className="mt-6 text-text text-base md:text-lg leading-relaxed max-w-2xl">
            Des réponses claires aux vraies questions que vous vous posez avant un projet :
            sites web, identité, vidéo, automatisation. Sans jargon, sans bla-bla.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {GUIDES.map((g) => (
              <a
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group block rounded-[24px] bg-bg/70 ring-1 ring-text-strong/[0.07] p-6 md:p-7 transition-all hover:ring-accent/50 hover:-translate-y-0.5"
                style={{ boxShadow: '0 14px 44px rgba(83,36,24,0.07)' }}
              >
                <div className="label-mono text-[10px] tracking-[0.18em] text-accent">{g.kicker} · {g.readMin} min</div>
                <h2 className="display text-2xl md:text-[28px] mt-3 text-text-strong leading-tight">{g.title}</h2>
                <p className="mt-3 text-sm text-text leading-relaxed">{g.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-text-strong group-hover:text-accent transition-colors">
                  Lire le guide <Icons.ArrowRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}

/* ===================== Briques de mise en page article ===================== */
const H2 = ({ children }: any) => (
  <h2 className="display text-3xl md:text-4xl text-text-strong leading-tight mt-12 mb-4">{children}</h2>
);
const P = ({ children }: any) => (
  <p className="text-base md:text-[17px] text-text leading-relaxed mb-4 max-w-3xl">{children}</p>
);
const Lead = ({ children }: any) => (
  <p className="text-lg md:text-xl text-text-strong leading-relaxed mb-6 max-w-3xl border-l-2 border-accent/60 pl-5">{children}</p>
);
const A = ({ href, children }: any) => (
  <a href={href} className="underline decoration-accent underline-offset-4 hover:text-accent transition-colors">{children}</a>
);

/* ===================== Contenu des guides (par slug) ===================== */
const GUIDE_BODY: Record<string, { body: React.ReactNode; faq: FaqItem[] }> = {
  'freelance-ou-agence': {
    body: (
      <>
        <Lead>
          Pour un site vitrine simple, un freelance peut suffire. Pour un projet qui doit durer
          et mobiliser plusieurs expertises, une agence rassure. Mais en 2026, un troisième modèle
          réconcilie les deux : le <strong>studio créatif hybride</strong>, qui combine la proximité
          du freelance et la continuité d'une équipe — c'est le modèle de GND Consulting.
        </Lead>

        <H2>Quelle différence entre un freelance et une agence web ?</H2>
        <P>
          Un freelance est un indépendant : un seul interlocuteur, des tarifs souvent plus bas,
          des décisions rapides. Une agence réunit plusieurs profils (chef de projet, designer,
          développeur, SEO) et garantit une continuité de service. Le freelance mise sur la proximité,
          l'agence sur la structure.
        </P>

        <H2>Combien coûte un site : freelance ou agence ?</H2>
        <P>
          Côté tarif journalier, un freelance se situe en général entre 350 et 600 €, une agence
          entre 500 et 800 €. L'écart vient du nombre de personnes mobilisées. Mais le bon repère
          n'est pas le prix du jour : c'est ce que vous obtenez au final — un site qui vous appartient,
          rapide, bien référencé. Chez GND, les <A href="/services/sites-vitrines">formules sites vitrines</A>{' '}
          sont affichées clairement, sans abonnement.
        </P>

        <H2>Quels sont les risques d'un freelance ?</H2>
        <P>
          Le principal risque est la continuité. Un freelance peut tomber malade, partir en congés,
          changer d'activité — et sans équipe pour prendre le relais, votre projet se retrouve bloqué.
          Second point : il est rarement à la fois développeur, designer, expert SEO et directeur
          artistique. Sur un projet qui touche à plusieurs métiers, cette mono-compétence se ressent.
        </P>

        <H2>Pourquoi une agence classique coûte-t-elle plus cher ?</H2>
        <P>
          Parce qu'elle mobilise plusieurs spécialistes et une couche de gestion (commercial, chef de
          projet, réunions). C'est rassurant sur un gros projet, mais pour une PME ou un commerce, on
          paie souvent une structure dont on n'a pas besoin — et on perd la relation directe avec ceux
          qui créent réellement.
        </P>

        <H2>Existe-t-il une solution entre les deux ?</H2>
        <P>
          Oui, et c'est la tendance de fond pour les TPE-PME : le studio hybride, ou agence boutique.
          Une petite structure qui garde la proximité du freelance (vous parlez directement aux créatifs)
          tout en offrant la continuité et la pluri-compétence d'une équipe. GND Consulting fonctionne
          ainsi : <strong>quatre branches — sites & SEO, branding, audiovisuel, automatisation IA — un
          seul interlocuteur</strong>. L'œil humain pour signer, l'IA pour accélérer. Résultat : la charge
          cognitive reste de notre côté, pas du vôtre.
        </P>

        <H2>Comment choisir selon votre projet ?</H2>
        <P>
          <strong>Site vitrine simple, budget serré, besoin ponctuel</strong> : un freelance fait le travail.{' '}
          <strong>Projet stratégique, e-commerce, continuité dans le temps</strong> : une agence se justifie.{' '}
          <strong>Vous voulez la proximité, plusieurs métiers et un site qui vous appartient sans
          abonnement</strong> : le studio hybride est le meilleur compromis. Dans le doute, commencez par
          en <A href="/contact">parler</A> — devis sous 48h, sans engagement.
        </P>
      </>
    ),
    faq: [
      {
        q: 'Freelance ou agence : lequel est le moins cher ?',
        a: "Le freelance affiche un tarif journalier plus bas (350 à 600 € contre 500 à 800 € pour une agence), car il mobilise moins de personnes. Mais le vrai coût se juge sur le résultat livré et la continuité, pas sur le prix du jour.",
      },
      {
        q: 'Quel est le risque principal d\'un freelance pour un site web ?',
        a: "La continuité. En cas de maladie, congés ou changement d'activité, le projet peut se retrouver bloqué faute d'équipe pour prendre le relais. Un studio ou une agence garantit ce relais.",
      },
      {
        q: 'Qu\'est-ce qu\'un studio créatif hybride ?',
        a: "C'est une petite structure (agence boutique) qui combine la proximité du freelance et la continuité d'une équipe pluri-compétente. Chez GND, quatre métiers et un seul interlocuteur, avec un site qui vous appartient, sans abonnement.",
      },
      {
        q: 'Mon site m\'appartiendra-t-il avec GND ?',
        a: "Oui. Le nom de domaine est enregistré à votre nom, vous recevez tous les accès (hébergement, back-office, code), aucune dépendance ni abonnement imposé. Vous pouvez transférer ou revendre librement.",
      },
      {
        q: 'En combien de temps un site vitrine est-il livré ?',
        a: "Comptez 1 à 2 semaines pour une vitrine GND (en moyenne 14 jours ouvrés, du brief à la mise en ligne). Tout retard éventuel est annoncé dès le départ, avec sa raison.",
      },
    ],
  },
};

/* ============================ PAGE /guides/<slug> ============================ */
export function GuidePage({ slug }: { slug: string }) {
  const meta = guideBySlug(slug);
  const content = GUIDE_BODY[slug];
  if (!meta || !content) {
    return (
      <main id="main" className="pt-24 md:pt-28">
        <Section className="py-24">
          <Container>
            <h1 className="display text-4xl text-text-strong">Guide introuvable.</h1>
            <p className="mt-4 text-text">Retournez à la <A href="/guides">liste des guides</A>.</p>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main id="main" className="pt-24 md:pt-28">
      <FaqJsonLd id={`guide-${slug}`} items={content.faq} />
      <Section className="py-14 md:py-20">
        <Container>
          <nav className="label-mono text-[10px] tracking-[0.18em] text-text-muted mb-6" aria-label="Fil d'Ariane">
            <a href="/" className="hover:text-accent">Accueil</a> <span className="text-text-muted/50">/</span>{' '}
            <a href="/guides" className="hover:text-accent">Guides</a> <span className="text-text-muted/50">/</span>{' '}
            <span className="text-text-strong">{meta.title}</span>
          </nav>

          <div className="label-mono text-[10px] tracking-[0.18em] text-accent mb-4">{meta.kicker} · {meta.readMin} min de lecture</div>
          <h1 className="display text-4xl md:text-6xl text-text-strong leading-[1.04] max-w-4xl">{meta.h1}</h1>

          <article className="mt-10">
            {content.body}
          </article>

          {/* FAQ visible (correspond au balisage FaqJsonLd) — même mise en
              page 2 colonnes que l'accueil, pour une FAQ identique partout. */}
          <section className="mt-20" aria-label="Questions fréquentes">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 lg:pt-10">
                <Kicker>Questions fréquentes</Kicker>
                <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Toutes les <span className="italic text-accent">réponses</span>.</h2>
                <p className="mt-6 text-text">Une question qui ne figure pas ici ? Écrivez-nous, réponse sous 24h.</p>
              </div>
              <div className="lg:col-span-8">
                {content.faq.map((f) => (
                  <Faq key={f.q} q={f.q} a={f.a} />
                ))}
              </div>
            </div>
          </section>

          {/* Liens connexes */}
          <div className="mt-14 flex flex-wrap gap-3">
            <Btn href="/services/sites-vitrines" variant="primary">Voir les formules sites vitrines</Btn>
            <Btn href="/contact" variant="secondary">Parler de votre projet</Btn>
          </div>
        </Container>
      </Section>

      <FloatingCtaBand
        prefix="Votre site"
        rotatingWords={['en tête ?', 'à refaire ?', 'à lancer ?', 'qui vous appartient ?']}
        sub="Studio créatif hybride. Réponse sous 24h, devis sous 48h, sans engagement."
        primaryCta={{ label: 'Démarrer un projet', href: '/contact' }}
      />
    </main>
  );
}
