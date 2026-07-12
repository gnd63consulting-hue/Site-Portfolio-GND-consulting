/* Rubrique /guides — pages éditoriales natives (pas un blog externe).
 * Index (/guides) + page article (/guides/<slug>). Conçues SEO + GEO :
 * H1 avec mot-clé, H2 en questions, réponse concise en tête de section
 * (éligible featured snippet / AI Overviews), liens internes, FAQ balisée.
 * Charte GND : crème / chocolat / orange, titres display (Marcellus). */
import * as React from 'react';
import { Section, Container, Kicker, Btn, Faq, CinematicHero } from '../ui';
import { Icons } from '../icons';
import { FaqJsonLd, type FaqItem } from '../components/FaqJsonLd';
import { FloatingCtaBand } from '../components/FloatingCtaBand';
import { MarqueeCTA } from '../components/MarqueeCTA';
import ScrollExpandHero from '@/components/blocks/scroll-expansion-hero';

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
      "Coûts, risques, continuité : la comparaison honnête, et le troisième modèle qui réconcilie les deux.",
    readMin: 6,
    kicker: 'Guide · Sites web',
  },
  {
    slug: 'faut-il-un-site-internet-commerce',
    title: 'Faut-il un site internet pour son commerce en 2026 ?',
    h1: 'Faut-il un site internet pour son commerce en 2026 ?',
    description:
      "Faut-il encore un site quand on a une fiche Google ? La réponse claire pour commerces et indépendants : visibilité, crédibilité, propriété. Le guide GND.",
    excerpt:
      "Avec une fiche Google, est-ce encore utile ? Oui, et voici pourquoi, sans langue de bois.",
    readMin: 5,
    kicker: 'Guide · Sites web',
  },
  {
    slug: 'etre-visible-google-local',
    title: 'Comment être visible sur Google quand on est un commerce local ?',
    h1: 'Comment être visible sur Google quand on est un commerce local ?',
    description:
      "SEO local 2026 : fiche Google Business Profile, avis, site rapide. Les leviers concrets pour apparaître dans Google Maps et le Local Pack. Le guide GND.",
    excerpt:
      "La fiche Google, les avis, le site : les vrais leviers pour apparaître dans votre ville.",
    readMin: 6,
    kicker: 'Guide · SEO local',
  },
  {
    slug: 'quand-refaire-son-site',
    title: 'Quand refaire son site internet ? Les signaux qui ne trompent pas',
    h1: 'Quand refaire son site internet ? Les signaux qui ne trompent pas',
    description:
      "Site daté, lent, pas mobile, invisible sur Google : les signaux qui montrent qu'il faut refondre votre site, et comment s'y prendre. Le guide GND.",
    excerpt:
      "Durée de vie d'un site, signaux d'alerte, refonte ou nouveau site : tout pour décider.",
    readMin: 5,
    kicker: 'Guide · Refonte',
  },
  {
    slug: 'charte-graphique-vs-brand-book',
    title: 'Charte graphique ou brand book : quelle différence, et lequel vous faut-il ?',
    h1: 'Charte graphique ou brand book : quelle différence, et lequel vous faut-il ?',
    description:
      "Charte graphique ou brand book : la différence claire, ce que contient chacun, et lequel choisir selon votre marque. Le guide GND, sans jargon.",
    excerpt:
      "Deux documents souvent confondus. Ce que contient chacun, et lequel choisir selon votre stade.",
    readMin: 5,
    kicker: 'Guide · Branding',
  },
  {
    slug: 'etre-proprietaire-de-son-site',
    title: 'Êtes-vous vraiment propriétaire de votre site internet ?',
    h1: 'Êtes-vous vraiment propriétaire de votre site internet ?',
    description:
      "Site loué ou site qui vous appartient ? Ce que « propriétaire » veut dire, les pièges de l'abonnement à vie, et comment reprendre la main. Le guide GND.",
    excerpt:
      "Domaine, code, accès : louez-vous ou possédez-vous votre site ? La question à poser avant de signer.",
    readMin: 6,
    kicker: 'Guide · Sites web',
  },
  {
    slug: 'n8n-make-zapier-comparatif',
    title: 'n8n, Make ou Zapier : quel outil d\'automatisation choisir en 2026 ?',
    h1: 'n8n, Make ou Zapier : quel outil d\'automatisation choisir en 2026 ?',
    description:
      "n8n, Make ou Zapier : forces, limites, prix et souveraineté des données. Le comparatif clair pour choisir votre outil d'automatisation. Le guide GND.",
    excerpt:
      "Forces, limites, prix et souveraineté des données. Le comparatif pour choisir sans se tromper.",
    readMin: 7,
    kicker: 'Guide · Automatisation & IA',
  },
  {
    slug: 'prix-site-vitrine',
    title: 'Combien coûte un site vitrine en 2026 ? Prix, fourchettes et ce qui les fait varier',
    h1: 'Combien coûte un site vitrine en 2026 ? Prix, fourchettes et ce qui les fait varier',
    description:
      "Combien coûte un site vitrine en 2026 ? Fourchettes freelance, agence et no-code, ce qui fait varier le prix, et comment budgéter. Le guide GND.",
    excerpt:
      "Fourchettes de marché, ce qui fait varier le prix, et comment budgéter sans se tromper.",
    readMin: 6,
    kicker: 'Guide · Sites web',
  },
  {
    slug: 'prix-identite-visuelle',
    title: "Combien coûte une identité visuelle en 2026 ? (logo, charte, brand book)",
    h1: "Combien coûte une identité visuelle en 2026 ? (logo, charte, brand book)",
    description:
      "Prix d'un logo, d'une charte graphique, d'un brand book : les fourchettes de marché, ce qui les fait varier, et comment budgéter votre identité. Le guide GND.",
    excerpt:
      "Logo, charte, brand book : les fourchettes de marché 2026 et ce qui fait varier la facture.",
    readMin: 12,
    kicker: 'Guide · Branding',
  },
  {
    slug: 'logo-freelance-ou-agence',
    title: "Logo : faut-il passer par un freelance ou une agence ?",
    h1: "Logo : faut-il passer par un freelance ou une agence ?",
    description:
      "Logo freelance ou agence : prix, qualité, droits et fichiers sources. Comment choisir selon votre projet, sans mauvaise surprise. Le guide GND.",
    excerpt:
      "Prix, qualité, droits, fichiers sources : comment choisir entre freelance et agence pour son logo.",
    readMin: 5,
    kicker: 'Guide · Branding',
  },
  {
    slug: 'prix-clip-musical',
    title: "Combien coûte un clip musical en 2026 ?",
    h1: "Combien coûte un clip musical en 2026 ?",
    description:
      "Prix d'un clip musical en France : fourchettes selon l'ambition, ce qui fait varier le budget, et comment dépenser utile. Le guide GND.",
    excerpt:
      "De l'artiste indépendant au label : les fourchettes de marché et ce qui fait le prix d'un clip.",
    readMin: 6,
    kicker: 'Guide · Audiovisuel',
  },
  {
    slug: 'tarif-video-entreprise',
    title: "Combien coûte une vidéo d'entreprise en 2026 ?",
    h1: "Combien coûte une vidéo d'entreprise en 2026 ?",
    description:
      "Prix d'une vidéo d'entreprise : film institutionnel, interview, motion. Fourchettes de marché et ce qui fait varier le devis. Le guide GND.",
    excerpt:
      "Film institutionnel, interview, brand content : les fourchettes et ce qui fait varier le devis.",
    readMin: 6,
    kicker: 'Guide · Audiovisuel',
  },
  {
    slug: 'prix-agent-ia-pme',
    title: "Combien coûte un agent IA pour une PME en 2026 ?",
    h1: "Combien coûte un agent IA pour une PME en 2026 ?",
    description:
      "Prix d'un agent IA sur-mesure pour une PME : fourchettes de marché, ce qui fait varier le coût, et comment estimer le retour sur investissement. Le guide GND.",
    excerpt:
      "Fourchettes de marché, ce qui fait varier le coût, et comment raisonner le retour sur investissement.",
    readMin: 7,
    kicker: 'Guide · Automatisation & IA',
  },
  {
    slug: 'agent-ia-vs-chatbot',
    title: "Agent IA ou chatbot : quelle différence, et lequel vous faut-il ?",
    h1: "Agent IA ou chatbot : quelle différence, et lequel vous faut-il ?",
    description:
      "Agent IA ou chatbot : la différence claire, ce que chacun sait faire, et lequel choisir selon votre besoin. Le guide GND, sans jargon.",
    excerpt:
      "Deux choses souvent confondues. Ce que fait chacun, et lequel choisir selon votre besoin réel.",
    readMin: 5,
    kicker: 'Guide · Automatisation & IA',
  },
];

/* ============ Listing façon blog (disposition Mindycoach, charte GND) ============
   Structure reprise du template : post vedette pleine largeur au-dessus,
   puis rangée 3/9 (sidebar à GAUCHE, pile 1 colonne à droite), texte en
   surimpression sur l'image (badge catégorie + titre + extrait), ligne méta
   SOUS l'image. Couleurs/typo : 100 % charte GND. */

const GUIDE_IMG: Record<string, string> = {
  'freelance-ou-agence': '/assets/hero-portrait.webp',
  'faut-il-un-site-internet-commerce': '/assets/hero-home-bg.webp',
  'etre-visible-google-local': '/assets/ownership-tab-google.webp',
  'quand-refaire-son-site': '/assets/hero-tablet.webp',
  'charte-graphique-vs-brand-book': '/assets/branding-hero.webp',
  'etre-proprietaire-de-son-site': '/assets/ownership-tab-code.webp',
  'n8n-make-zapier-comparatif': '/assets/svc-ia.webp',
  'prix-site-vitrine': '/assets/svc-design.webp',
  'prix-identite-visuelle': '/assets/branding-hero2-bg-v2.webp',
  'logo-freelance-ou-agence': '/assets/branding-hero3-bg01.webp',
  'prix-clip-musical': '/assets/svc-production.webp',
  'tarif-video-entreprise': '/assets/svc-motion.webp',
  'prix-agent-ia-pme': '/assets/hologram-scene.webp',
  'agent-ia-vs-chatbot': '/assets/intersection-hero.webp',
};
const guideImg = (slug: string) => GUIDE_IMG[slug] ?? '/assets/hero1-bg-v2.webp';
const GUIDE_DATE = '22 juin 2026';
const FEATURED_SLUG = 'prix-site-vitrine';
const catOf = (g: GuideMeta) => g.kicker.split('·')[1]?.trim() ?? 'Guides';

function GuideCardMeta({ g }: { g: GuideMeta }) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-sm text-text-muted">
      <div className="flex items-center gap-3">
        <span>Mis à jour le {GUIDE_DATE}</span>
        <span className="hidden sm:inline-block w-px h-4 bg-text-strong/20" aria-hidden="true" />
        <span className="hidden sm:inline">Par <span className="font-semibold text-text-strong">l'équipe GND</span></span>
      </div>
      <span className="inline-flex items-center gap-1.5">
        <Icons.ArrowRight size={13} className="text-accent" /> {g.readMin} min de lecture
      </span>
    </div>
  );
}

function GuideBlogCard({ g, featured = false }: { g: GuideMeta; featured?: boolean }) {
  const Title = featured ? 'h2' : 'h3';
  return (
    <article>
      <a
        href={`/guides/${g.slug}`}
        className="group block relative overflow-hidden rounded-[20px] focus-ring"
        aria-label={g.title}
      >
        <img
          src={guideImg(g.slug)}
          alt={g.title}
          loading={featured ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.07] ${featured ? 'aspect-[16/9] md:aspect-[12/5]' : 'aspect-[4/3] sm:aspect-[21/9]'}`}
        />
        {/* Voile sombre bas (lisibilité du texte en surimpression, cf. template) */}
        <div className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-[#1F1208]/90 via-[#1F1208]/45 to-transparent" aria-hidden="true" />
        <div className={`absolute bottom-0 left-0 right-0 z-[2] ${featured ? 'p-6 md:p-12' : 'p-5 md:p-10'}`}>
          <span className="inline-block bg-bg text-text-strong label-mono text-[10px] tracking-[0.16em] rounded-full px-4 py-1.5 mb-4">
            {catOf(g)}
          </span>
          <Title className={`display text-bg leading-[1.08] ${featured ? 'text-3xl md:text-5xl max-w-4xl' : 'text-2xl md:text-3xl max-w-2xl'}`}>
            {g.title}
          </Title>
          <p className={`mt-3 text-bg/85 ${featured ? 'text-base md:text-lg max-w-3xl' : 'text-sm md:text-[15px] max-w-2xl hidden sm:block'}`}>
            {g.excerpt}
          </p>
        </div>
      </a>
      <GuideCardMeta g={g} />
    </article>
  );
}

/* Sidebar (ordre des widgets = template : recherche, thèmes, catégories, récents). */
function GuidesSidebar({
  query,
  onQuery,
  currentSlug,
}: {
  query?: string;
  onQuery?: (q: string) => void;
  currentSlug?: string;
}) {
  const cats = React.useMemo(() => {
    const m = new Map<string, number>();
    GUIDES.forEach((g) => m.set(catOf(g), (m.get(catOf(g)) ?? 0) + 1));
    return Array.from(m.entries());
  }, []);
  const recent = GUIDES.slice(-2).reverse().filter((g) => g.slug !== currentSlug);
  const widgetTitle = 'display text-2xl md:text-3xl text-text-strong mb-5';
  return (
    <div className="space-y-10">
      <div>
        <h2 className={widgetTitle}>Recherche.</h2>
        <div className="relative">
          <Icons.ArrowRight size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-accent" aria-hidden="true" />
          <input
            type="search"
            value={query ?? ''}
            onChange={(e) => {
              if (onQuery) onQuery(e.target.value);
              else if (e.target.value) window.location.href = '/guides#liste';
            }}
            placeholder="Chercher un guide…"
            aria-label="Rechercher un guide"
            className="w-full bg-transparent border-0 border-b border-text-strong/25 focus:border-accent outline-none h-12 pl-6 text-[15px] text-text-strong placeholder:text-text-muted/70"
          />
        </div>
      </div>
      <div>
        <h2 className={widgetTitle}>Catégories.</h2>
        <ul className="space-y-2.5">
          {cats.map(([c, n]) => (
            <li key={c}>
              <a
                href="/guides#liste"
                className="flex items-center justify-between rounded-full bg-accent/10 hover:bg-accent/20 transition-colors px-4 py-2 text-[15px] text-text-strong"
              >
                <span>{c}</span>
                <span className="text-text-muted text-sm">{n}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className={widgetTitle}>Guides récents.</h2>
        <ul className="space-y-7">
          {recent.map((g) => (
            <li key={g.slug}>
              <a href={`/guides/${g.slug}`} className="group block max-w-[260px]">
                <span className="block overflow-hidden rounded-[16px] mb-3">
                  <img
                    src={guideImg(g.slug)}
                    alt={g.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </span>
                <span className="display text-lg leading-snug text-text-strong group-hover:text-accent transition-colors">{g.title}</span>
                <span className="block mt-1.5 text-sm text-text-muted">Mis à jour le {GUIDE_DATE}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GuidesBlogListing({ id }: { id?: string }) {
  const [q, setQ] = React.useState('');
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const match = (g: GuideMeta) => !q || norm(`${g.title} ${g.excerpt} ${g.kicker}`).includes(norm(q));
  const featured = GUIDES.find((g) => g.slug === FEATURED_SLUG)!;
  const rest = GUIDES.filter((g) => (q ? match(g) : g.slug !== FEATURED_SLUG));
  return (
    <Section id={id} bg="alt" className="py-16 md:py-24">
      <Container className="!max-w-[1400px]">
        {!q && (
          <div className="pb-10 border-b-2 border-text-strong/10">
            <GuideBlogCard g={featured} featured />
          </div>
        )}
        <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-12">
          <aside className="lg:col-span-3 order-last lg:order-first" aria-label="Filtres et guides récents">
            <GuidesSidebar query={q} onQuery={setQ} />
          </aside>
          <div className="lg:col-span-9 space-y-12">
            {rest.map((g) => (
              <GuideBlogCard key={g.slug} g={g} />
            ))}
            {rest.length === 0 && (
              <p className="text-text-muted">Aucun guide ne correspond à « {q} ». <button className="underline decoration-accent underline-offset-4" onClick={() => setQ('')}>Tout afficher</button></p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function guideBySlug(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/* ============================ INDEX /guides ============================ */
export function GuidesIndex() {
  return (
    <main id="main">
      {/* HERO #1, ScrollExpandHero (même hero 1 que toutes les pages). */}
      <div className="pt-20 md:pt-24 bg-bg-alt">
        <ScrollExpandHero
          mediaType="video"
          mediaSrc="/assets/hero1-video.mp4"
          posterSrc="/assets/hero1-poster.webp"
          bgImageSrc="/assets/hero1-bg-v2.webp"
          title="Guides GND."
          date="GND · Ressources"
          scrollToExpand="Scrollez pour révéler"
          textColorClass="text-bg"
        />
      </div>

      {/* Marquee CTA entre Hero #1 et Hero #2 (mirror autres pages). */}
      <MarqueeCTA />

      {/* HERO #2, ressources (CinematicHero, même scène cinématique que /agence). */}
      <CinematicHero
        kicker="Ressources"
        eyebrow="guides"
        title={<>Guides <span className="italic text-accent">GND</span>.</>}
        subtitle={<>Des réponses claires aux vraies questions que vous vous posez avant un projet : sites web, identité, vidéo, automatisation. <strong className="text-bg">Sans jargon, sans bla-bla.</strong></>}
        badges={["Sites web", "Identité", "SEO local", "Refonte"]}
        ctas={<>
          <a href="#liste" className="btn btn-primary">Voir les guides <Icons.ArrowDown size={14}/></a>
          <a href="/contact" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Parler de votre projet <Icons.ArrowRight size={14}/></a>
        </>}
        bgImage="/assets/agence-hero2-scene.webp"
        footerLabel="guides"
      />

      {/* Listing façon blog (disposition Mindycoach) : vedette + sidebar gauche + pile. */}
      <GuidesBlogListing id="liste" />

      <FloatingCtaBand
        prefix="Votre projet"
        rotatingWords={['mérite mieux.', 'commence ici.', 'sans bla-bla.', 'clé en main.']}
        sub="Studio créatif hybride. Réponse sous 24h, devis sous 48h, sans engagement."
      />
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
const H3 = ({ children }: any) => (
  <h3 className="display text-xl md:text-2xl text-text-strong leading-tight mt-8 mb-3">{children}</h3>
);
const UL = ({ children }: any) => (
  <ul className="mb-5 max-w-3xl space-y-2 text-base md:text-[17px] text-text leading-relaxed">{children}</ul>
);
const LI = ({ children }: any) => (
  <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">{children}</li>
);
/* Tableau de prix charté GND (crème / chocolat / orange). */
const PriceTable = ({ head, rows, caption }: { head: string[]; rows: string[][]; caption?: string }) => (
  <figure className="my-7 max-w-3xl overflow-x-auto rounded-2xl border border-text-strong/10">
    <table className="w-full border-collapse text-left text-sm md:text-[15px]">
      <thead>
        <tr className="bg-text-strong text-bg">
          {head.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={i % 2 ? 'bg-bg-alt' : 'bg-bg'}>
            {r.map((c, j) => (
              <td key={j} className={`px-4 py-3 align-top border-t border-text-strong/8 ${j === 0 ? 'font-medium text-text-strong' : 'text-text'}`}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {caption && <figcaption className="px-4 py-2.5 text-xs text-text-muted bg-bg-alt border-t border-text-strong/8">{caption}</figcaption>}
  </figure>
);
/* Encart accent (angle différenciant, réassurance). */
const Callout = ({ title, children }: any) => (
  <aside className="my-7 max-w-3xl rounded-2xl bg-accent/10 border border-accent/25 p-5 md:p-6">
    {title && <div className="display text-lg text-text-strong mb-2">{title}</div>}
    <div className="text-base md:text-[17px] text-text leading-relaxed">{children}</div>
  </aside>
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
          du freelance et la continuité d'une équipe. C'est le modèle de GND Consulting.
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
          n'est pas le prix du jour : c'est ce que vous obtenez au final, un site qui vous appartient,
          rapide, bien référencé. Chez GND, les <A href="/services/sites-vitrines">formules sites vitrines</A>{' '}
          sont affichées clairement, sans abonnement.
        </P>

        <H2>Quels sont les risques d'un freelance ?</H2>
        <P>
          Le principal risque est la continuité. Un freelance peut tomber malade, partir en congés,
          changer d'activité, et sans équipe pour prendre le relais, votre projet se retrouve bloqué.
          Second point : il est rarement à la fois développeur, designer, expert SEO et directeur
          artistique. Sur un projet qui touche à plusieurs métiers, cette mono-compétence se ressent.
        </P>

        <H2>Pourquoi une agence classique coûte-t-elle plus cher ?</H2>
        <P>
          Parce qu'elle mobilise plusieurs spécialistes et une couche de gestion (commercial, chef de
          projet, réunions). C'est rassurant sur un gros projet, mais pour une PME ou un commerce, on
          paie souvent une structure dont on n'a pas besoin, et on perd la relation directe avec ceux
          qui créent réellement.
        </P>

        <H2>Existe-t-il une solution entre les deux ?</H2>
        <P>
          Oui, et c'est la tendance de fond pour les TPE-PME : le studio hybride, ou agence boutique.
          Une petite structure qui garde la proximité du freelance (vous parlez directement aux créatifs)
          tout en offrant la continuité et la pluri-compétence d'une équipe. GND Consulting fonctionne
          ainsi : <strong>quatre branches (sites & SEO, branding, audiovisuel, automatisation IA), un
          seul interlocuteur</strong>. L'œil humain pour signer, l'IA pour accélérer. Résultat : la charge
          cognitive reste de notre côté, pas du vôtre.
        </P>

        <H2>Comment choisir selon votre projet ?</H2>
        <P>
          <strong>Site vitrine simple, budget serré, besoin ponctuel</strong> : un freelance fait le travail.{' '}
          <strong>Projet stratégique, e-commerce, continuité dans le temps</strong> : une agence se justifie.{' '}
          <strong>Vous voulez la proximité, plusieurs métiers et un site qui vous appartient sans
          abonnement</strong> : le studio hybride est le meilleur compromis. Dans le doute, commencez par
          en <A href="/contact">parler</A>. Devis sous 48h, sans engagement.
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

  'faut-il-un-site-internet-commerce': {
    body: (
      <>
        <Lead>
          Oui, même si vous avez déjà une fiche Google. La fiche vous rend visible ;
          le site vous rend crédible, convertit et vous appartient. En 2026, les deux
          ensemble forment la base d'une présence sérieuse pour un commerce.
        </Lead>

        <H2>Une fiche Google suffit-elle ?</H2>
        <P>
          La fiche Google Business Profile est devenue le premier point de contact : horaires,
          avis, itinéraire. Elle est indispensable. Mais elle ne vous appartient pas, ne raconte
          pas votre histoire et ne convertit pas comme une vraie page. Pire : Google a besoin
          d'un site pour <strong>valider et renforcer</strong> votre pertinence locale.
        </P>

        <H2>Pourquoi un site reste indispensable en 2026 ?</H2>
        <P>
          Parce que la crédibilité se joue là : une large majorité de consommateurs juge le
          sérieux d'une entreprise sur son site. Un site rapide, clair et mobile transforme une
          recherche en visite ou en réservation. C'est aussi le seul espace que vous maîtrisez
          totalement : pas de règles imposées, pas de commission.
        </P>

        <H2>Combien coûte un site pour un commerce ?</H2>
        <P>
          Chez GND, les formules sites vitrines sont à prix fixe et public : à partir de 800 €
          pour une vitrine essentielle, 1 500 € avec module de réservation, paiement unique et
          <strong> sans abonnement</strong>. Voir le détail sur la{' '}
          <A href="/services/sites-vitrines">page sites vitrines</A>.
        </P>

        <H2>Site loué ou site qui m'appartient ?</H2>
        <P>
          Beaucoup de commerces paient un abonnement à vie à une plateforme pour un site qu'ils
          ne possèdent jamais. À l'arrêt du paiement, tout disparaît. Un site en propriété, c'est
          le domaine à votre nom, tous les accès, le code : vous pouvez partir, transférer,
          revendre. C'est le choix que défend GND.
        </P>

        <H2>Par où commencer ?</H2>
        <P>
          Par les deux fondations : une fiche Google optimisée (voir notre guide{' '}
          <A href="/guides/etre-visible-google-local">être visible sur Google en local</A>) et un
          site vitrine propre qui vous appartient. <A href="/contact">Parlons-en</A>. Réponse
          sous 24h, devis sous 48h.
        </P>
      </>
    ),
    faq: [
      { q: 'Faut-il un site si on a déjà une fiche Google ?', a: "Oui. La fiche rend visible, le site rend crédible et convertit. Google s'appuie aussi sur votre site pour valider votre pertinence locale : les deux se renforcent." },
      { q: 'Combien coûte un site pour un commerce de proximité ?', a: "À partir de 800 € chez GND pour une vitrine essentielle, 1 500 € avec module de réservation. Paiement unique, sans abonnement, première année de domaine offerte." },
      { q: 'Un site loué sur une plateforme m\'appartient-il ?', a: "Non. Tant que vous payez l'abonnement, le site existe ; à l'arrêt, il disparaît. Un site en propriété (domaine à votre nom, accès et code) reste le vôtre, transférable et revendable." },
      { q: 'Un site sans abonnement, est-ce possible ?', a: "Oui. Les formules GND sont en paiement unique, sans forfait annuel imposé. Les évolutions futures se font sur devis transparent, et vous restez libre de la maintenance." },
      { q: 'Combien de temps pour mettre un commerce en ligne ?', a: "1 à 2 semaines pour une vitrine GND, du brief à la mise en ligne, fiche Google Business Profile configurée incluse." },
    ],
  },

  'etre-visible-google-local': {
    body: (
      <>
        <Lead>
          Pour apparaître dans Google Maps et le « pack local », trois leviers comptent avant
          tout : une fiche Google Business Profile complète et optimisée, des avis clients
          réguliers, et un site rapide et bien structuré. La fiche pèse à elle seule la majorité
          du classement local.
        </Lead>

        <H2>Qu'est-ce qui fait monter dans Google local ?</H2>
        <P>
          Selon les analyses 2026, la grande majorité des facteurs du « Local Pack » (les trois
          résultats sous la carte) proviennent de votre fiche Google Business Profile : catégorie,
          complétude, avis, cohérence des informations. Un profil rempli à 100 % performe
          nettement mieux qu'un profil partiel.
        </P>

        <H2>Comment optimiser sa fiche Google Business Profile ?</H2>
        <P>
          Choisissez la bonne catégorie principale, complétez tout (horaires, services, zone,
          photos), gardez vos coordonnées identiques partout (site, annuaires, réseaux), et
          publiez régulièrement. Une fiche vivante et cohérente envoie un signal fort à Google.
        </P>

        <H2>Les avis comptent-ils vraiment ?</H2>
        <P>
          Énormément. Une large part des consommateurs lit les avis avant de contacter une
          entreprise, et beaucoup écartent celles notées sous 4 étoiles. Demandez systématiquement
          un avis à vos clients satisfaits, et répondez à tous, positifs comme négatifs.
        </P>

        <H2>Faut-il un site pour le SEO local ?</H2>
        <P>
          Oui. Google s'appuie sur votre site pour confirmer votre ancrage géographique et votre
          pertinence. Un site lent ou mal structuré freine la visibilité <em>et</em> les
          conversions. Nos <A href="/services/sites-vitrines">sites vitrines</A> incluent le SEO
          local de base et la configuration de votre fiche.
        </P>

        <H2>Combien de temps avant des résultats ?</H2>
        <P>
          La fiche Google peut produire des effets en quelques semaines ; le référencement du site
          se construit sur quelques mois. C'est un travail régulier, pas un interrupteur. Pour
          poser des bases solides, <A href="/contact">parlons de votre visibilité</A>.
        </P>
      </>
    ),
    faq: [
      { q: 'Quel est le levier n°1 pour le SEO local ?', a: "La fiche Google Business Profile : la majorité des facteurs du Local Pack en proviennent. Une fiche complète à 100 %, avec avis et informations cohérentes, est la priorité absolue." },
      { q: 'Comment optimiser sa fiche Google Business Profile ?', a: "Bonne catégorie principale, fiche complète (horaires, services, zone, photos), coordonnées identiques partout, et publications régulières. La cohérence et la complétude pèsent le plus." },
      { q: 'Les avis Google sont-ils importants ?', a: "Oui, déterminants. Beaucoup de clients lisent les avis avant de contacter et évitent les notes sous 4 étoiles. Demandez-en systématiquement et répondez à tous." },
      { q: 'Faut-il un site web pour être visible localement ?', a: "Oui. Google s'appuie sur le site pour confirmer votre ancrage local. Un site rapide et bien structuré soutient la fiche et améliore les conversions." },
      { q: 'En combien de temps voit-on des résultats en SEO local ?', a: "Quelques semaines pour les effets de la fiche Google, quelques mois pour le référencement du site. C'est un travail régulier qui s'installe dans la durée." },
    ],
  },

  'quand-refaire-son-site': {
    body: (
      <>
        <Lead>
          Un site internet vit en moyenne 2 à 4 ans. Au-delà, il vieillit : design daté, lenteur,
          mauvais affichage mobile, invisibilité sur Google, décalage avec votre image. Comme la
          majorité des visiteurs juge votre sérieux sur votre site, une refonte au bon moment
          protège votre crédibilité.
        </Lead>

        <H2>Quelle est la durée de vie d'un site ?</H2>
        <P>
          Entre 2 et 4 ans selon le secteur. Les standards de design, les usages mobiles et les
          critères de Google évoluent vite. Un site qui avait fière allure en 2021 peut aujourd'hui
          renvoyer une image d'entreprise « à la traîne ».
        </P>

        <H2>Les signaux qui montrent qu'il faut refondre</H2>
        <P>
          Votre site est lent, s'affiche mal sur smartphone, n'apparaît pas sur Google, son design
          ne vous ressemble plus, vous ne pouvez pas le modifier vous-même, ou vous avez « honte »
          de l'envoyer à un prospect. Un seul de ces signaux suffit à se poser la question ;
          plusieurs, et la refonte est urgente.
        </P>

        <H2>Refonte ou nouveau site ?</H2>
        <P>
          Si la structure est saine mais l'habillage daté, une refonte suffit. Si le site est lent,
          bridé par une vieille technologie ou une plateforme fermée, repartir sur une base propre
          et <strong>en propriété</strong> est souvent plus rentable à terme.
        </P>

        <H2>Combien coûte une refonte ?</H2>
        <P>
          Cela dépend de l'ampleur. Chez GND, une nouvelle vitrine démarre à 800 € (prix public,
          paiement unique, sans abonnement), avec le SEO local et la configuration de votre fiche
          Google inclus. Détail sur la <A href="/services/sites-vitrines">page sites vitrines</A>.
        </P>

        <H2>Comment se passe une refonte chez GND ?</H2>
        <P>
          Brief, maquette, développement, mise en ligne, en 1 à 2 semaines, avec validation à
          chaque étape. Le studio tient la cadence, vous gardez le contrôle, et le site final vous
          appartient. <A href="/contact">Faisons le point sur votre site actuel</A>.
        </P>
      </>
    ),
    faq: [
      { q: 'Tous les combien faut-il refaire son site ?', a: "En moyenne tous les 2 à 4 ans. Les standards de design, les usages mobiles et les critères de Google évoluent vite : au-delà, un site renvoie une image datée." },
      { q: 'Quels signaux montrent qu\'il faut refondre son site ?', a: "Site lent, mauvais affichage mobile, invisible sur Google, design qui ne vous ressemble plus, impossible à modifier vous-même, ou gênant à envoyer à un prospect. Un seul signal suffit à se poser la question." },
      { q: 'Refonte ou nouveau site : que choisir ?', a: "Si la structure est saine mais l'habillage daté, une refonte suffit. Si le site est lent ou bridé par une plateforme fermée, repartir sur une base propre et en propriété est souvent plus rentable." },
      { q: 'Combien coûte une refonte de site ?', a: "Selon l'ampleur. Chez GND, une nouvelle vitrine démarre à 800 € (prix public, paiement unique, sans abonnement), SEO local et fiche Google inclus." },
      { q: 'Combien de temps dure une refonte ?', a: "1 à 2 semaines pour une vitrine, du brief à la mise en ligne, avec validation à chaque étape. Le site final vous appartient." },
    ],
  },

  'charte-graphique-vs-brand-book': {
    body: (
      <>
        <Lead>
          La charte graphique encadre le visuel de votre marque (logo, couleurs, typographies, règles
          d'usage). Le brand book va plus loin : il décrit toute la marque (vision, valeurs, ton, récit)
          et inclut la charte. En résumé, la charte dit «&nbsp;à quoi ça ressemble&nbsp;», le brand book dit
          «&nbsp;qui vous êtes&nbsp;».
        </Lead>

        <H2>Qu'est-ce qu'une charte graphique ?</H2>
        <P>
          C'est le document de référence du visuel. Il fixe le logo et ses déclinaisons, la palette de
          couleurs, les typographies, l'iconographie et les règles d'usage (ce qu'on fait, ce qu'on ne
          fait pas). Son rôle : garantir que tous vos supports restent cohérents, du site aux cartes de
          visite, qui que soit la personne qui les réalise.
        </P>

        <H2>Qu'est-ce qu'un brand book ?</H2>
        <P>
          C'est la plateforme complète de la marque. Il pose la mission, les valeurs, la personnalité,
          le ton de voix et le récit, puis intègre la charte graphique comme volet visuel. Le brand book
          sert à aligner une équipe, des prestataires et des partenaires sur une même vision, pas
          seulement sur un même logo.
        </P>

        <H2>Charte graphique vs brand book : le comparatif</H2>
        <P>
          La charte graphique couvre l'identité visuelle et tient souvent en quelques pages. Le brand
          book couvre l'identité de marque dans son ensemble (stratégie, verbal, visuel) et constitue un
          document plus épais. La charte se suffit pour rester cohérent au quotidien. Le brand book
          devient utile quand la marque grandit, recrute ou multiplie les canaux.
        </P>

        <H2>De quoi avez-vous besoin selon votre stade ?</H2>
        <P>
          Un commerce ou un indépendant qui démarre a besoin d'une charte graphique solide : c'est
          l'essentiel pour exister proprement partout. Une marque qui se structure, lève des fonds,
          recrute ou s'adresse à plusieurs audiences gagne à formaliser un brand book. Bonne nouvelle :
          on peut commencer par la charte, puis l'enrichir en brand book plus tard.
        </P>

        <H2>Comment GND construit votre identité</H2>
        <P>
          Chez GND, l'identité se construit par étapes : positionnement, exploration visuelle, puis
          charte ou brand book selon votre besoin réel. Vous restez propriétaire des fichiers sources.
          Voir le détail sur la <A href="/services/branding-identite">page branding et identité</A>, ou{' '}
          <A href="/contact">parlons de votre projet</A>.
        </P>
      </>
    ),
    faq: [
      { q: 'Quelle est la différence entre une charte graphique et un brand book ?', a: "La charte graphique encadre le visuel (logo, couleurs, typographies, règles). Le brand book décrit toute la marque (vision, valeurs, ton, récit) et inclut la charte. La charte dit à quoi ça ressemble, le brand book dit qui vous êtes." },
      { q: 'Que contient une charte graphique ?', a: "Le logo et ses déclinaisons, la palette de couleurs, les typographies, l'iconographie et les règles d'usage (à faire et à éviter), pour une cohérence sur tous vos supports." },
      { q: 'Un brand book est-il utile pour une petite marque ?', a: "Pas toujours au démarrage : une charte graphique suffit souvent. Le brand book devient utile quand la marque grandit, recrute ou s'adresse à plusieurs audiences et doit aligner tout le monde sur une même vision." },
      { q: 'Peut-on commencer par la charte puis évoluer vers un brand book ?', a: "Oui. C'est même l'approche la plus rentable : une charte solide d'abord, enrichie en brand book quand le besoin se fait sentir." },
      { q: 'Combien de temps pour créer une charte ou un brand book ?', a: "Comptez en général 2 à 4 semaines pour une identité visuelle chez GND. Un brand book complet demande davantage, selon l'ampleur. Devis détaillé sous 48h." },
    ],
  },

  'etre-proprietaire-de-son-site': {
    body: (
      <>
        <Lead>
          Si vous payez un abonnement mensuel sans posséder le nom de domaine, le code et les accès,
          vous ne possédez pas votre site : vous le louez. À l'arrêt du paiement, tout peut disparaître.
          Être propriétaire, c'est détenir le domaine, le code et les accès, et pouvoir partir quand vous
          voulez.
        </Lead>

        <H2>Que veut dire «&nbsp;être propriétaire&nbsp;» de son site ?</H2>
        <P>
          Cela signifie quatre choses concrètes : le nom de domaine est enregistré à votre nom, le code
          du site vous appartient, vous avez tous les accès (hébergement, back-office, analytics), et
          vous pouvez transférer ou revendre l'ensemble. Vous ne dépendez de personne pour exister en
          ligne.
        </P>

        <H2>Les pièges de la location et de l'abonnement à vie</H2>
        <P>
          Beaucoup d'offres «&nbsp;site à partir de 50&nbsp;€ par mois&nbsp;» cachent une location. Tant que vous
          payez, le site fonctionne. Le jour où vous arrêtez, il s'éteint, et vos contenus restent
          souvent verrouillés chez le prestataire. Sur plusieurs années, le coût cumulé dépasse largement
          celui d'un site acheté une fois, et vous n'avez toujours rien à vous.
        </P>

        <H2>Comment vérifier qui possède réellement votre site ?</H2>
        <P>
          Trois vérifications simples : regardez à quel nom le domaine est enregistré (un service WHOIS
          suffit), demandez si vous avez les accès complets à l'hébergement et au back-office, et relisez
          votre contrat (mention de propriété, de transfert, de réversibilité). Si l'une des trois
          réponses est «&nbsp;non&nbsp;», vous louez.
        </P>

        <H2>Comment récupérer son site et son domaine ?</H2>
        <P>
          Commencez par récupérer le nom de domaine (demande de transfert vers un registrar à votre nom).
          Récupérez ensuite l'export du site ou son code, et les accès. Selon le prestataire, c'est plus
          ou moins simple, d'où l'importance de poser la question de la propriété avant de signer, pas
          après.
        </P>

        <H2>L'approche GND : 100&nbsp;% propriété, sans abonnement</H2>
        <P>
          Chez GND, le site vous appartient : domaine à votre nom, code et accès remis, paiement unique
          sans abonnement imposé. Vous restez libre de la maintenance et du transfert. Voir les{' '}
          <A href="/services/sites-vitrines">formules sites vitrines</A>, ou lisez aussi{' '}
          <A href="/guides/prix-site-vitrine">combien coûte un site vitrine</A>.
        </P>
      </>
    ),
    faq: [
      { q: 'Un site loué sur une plateforme m\'appartient-il ?', a: "Non. Tant que vous payez l'abonnement, le site existe ; à l'arrêt, il disparaît et vos contenus restent souvent verrouillés. Un site en propriété (domaine, code, accès) reste le vôtre." },
      { q: 'Un site sans abonnement, est-ce possible ?', a: "Oui. Un site peut s'acheter en paiement unique, sans forfait mensuel imposé. Les évolutions futures se font alors sur devis transparent, et vous gardez la main sur la maintenance." },
      { q: 'Comment savoir si je suis propriétaire de mon site ?', a: "Vérifiez trois choses : le domaine est-il à votre nom (via WHOIS), avez-vous tous les accès (hébergement, back-office), et que dit votre contrat sur la propriété. Si l'une des réponses est non, vous louez." },
      { q: 'Comment récupérer mon nom de domaine et mon site ?', a: "Demandez le transfert du domaine vers un registrar à votre nom, récupérez l'export ou le code du site et les accès. La facilité dépend du prestataire, d'où l'intérêt de clarifier la propriété avant de signer." },
      { q: 'Que se passe-t-il si j\'arrête de payer un site loué ?', a: "Le site est généralement coupé et mis hors ligne, et vos contenus peuvent rester inaccessibles. C'est le principal risque de la location par rapport à un site en propriété." },
    ],
  },

  'n8n-make-zapier-comparatif': {
    body: (
      <>
        <Lead>
          En bref : Zapier pour le simple et le rapide, Make pour les workflows visuels complexes à bon
          rapport prix-puissance, et n8n pour le sur-mesure, la maîtrise des coûts et la souveraineté des
          données (il peut s'héberger chez vous, en France). Le bon choix dépend de votre besoin et de
          votre sensibilité aux données.
        </Lead>

        <H2>Zapier : pour qui, forces et limites</H2>
        <P>
          Zapier est le plus simple à prendre en main. Idéal pour connecter rapidement deux ou trois
          applications grand public (formulaire vers email, paiement vers tableur). Ses limites
          apparaissent sur les scénarios complexes et sur le coût, qui grimpe vite avec le volume de
          tâches.
        </P>

        <H2>Make : pour qui, forces et limites</H2>
        <P>
          Make (ex-Integromat) offre un éditeur visuel puissant pour des scénarios élaborés, avec un
          rapport prix-fonctionnalités souvent meilleur que Zapier. La contrepartie : une prise en main
          un peu plus exigeante, et un modèle d'opérations à surveiller sur les gros volumes.
        </P>

        <H2>n8n : pour qui, forces et limites</H2>
        <P>
          n8n est open source et peut s'auto-héberger, ce qui change deux choses : le coût reste maîtrisé
          à l'échelle, et vos données peuvent rester chez vous, en France (un vrai atout pour le RGPD et
          la souveraineté). Très flexible, il demande un peu plus de compétence technique, ou un
          partenaire qui le met en place pour vous.
        </P>

        <H2>Le comparatif en clair</H2>
        <P>
          Sur le prix, n8n auto-hébergé est le plus économique à grande échelle, Make est compétitif, et
          Zapier devient cher avec le volume. Sur la facilité, Zapier gagne, Make suit, n8n demande plus
          d'expertise. Sur les données et le RGPD, n8n auto-hébergé prend l'avantage, car rien ne sort de
          votre infrastructure.
        </P>

        <H2>Lequel pour une PME française ?</H2>
        <P>
          Pour un besoin simple et ponctuel, Zapier dépanne. Pour automatiser sérieusement sans exploser
          le budget, Make est un bon point d'équilibre. Pour les entreprises sensibles à la confidentialité
          des données ou qui veulent maîtriser leurs coûts dans la durée, n8n est souvent le plus
          pertinent.
        </P>

        <H2>Comment GND déploie vos automatisations</H2>
        <P>
          GND conçoit des automatisations sur-mesure, avec une préférence pour n8n quand la souveraineté
          des données compte, et un cadrage RGPD systématique. Voir la{' '}
          <A href="/services/automatisation-ia">page automatisation et IA</A>, ou{' '}
          <A href="/contact">parlons de votre besoin</A>.
        </P>
      </>
    ),
    faq: [
      { q: 'Quelle différence entre n8n, Make et Zapier ?', a: "Zapier est le plus simple pour des connexions rapides. Make offre un éditeur visuel puissant à bon prix pour des scénarios complexes. n8n est open source, auto-hébergeable, idéal pour le sur-mesure, la maîtrise des coûts et la souveraineté des données." },
      { q: 'n8n est-il vraiment gratuit ?', a: "n8n est open source et gratuit en auto-hébergement (vous payez seulement votre serveur). Il existe aussi une offre cloud payante. L'auto-hébergement est ce qui rend n8n économique à grande échelle." },
      { q: 'Lequel est le plus respectueux du RGPD ?', a: "n8n auto-hébergé prend l'avantage : vos données peuvent rester sur votre infrastructure, en France, sans transiter par un service tiers. C'est un atout fort pour le RGPD et la souveraineté." },
      { q: 'Faut-il savoir coder pour utiliser ces outils ?', a: "Zapier et Make se pilotent sans coder. n8n est no-code dans la majorité des cas, mais sa mise en place et ses scénarios avancés gagnent à être confiés à quelqu'un d'expérimenté." },
      { q: 'Peut-on migrer de Zapier vers n8n ?', a: "Oui. Les scénarios Zapier ou Make peuvent être reconstruits dans n8n, souvent pour réduire les coûts et reprendre le contrôle des données. C'est un chantier courant que GND prend en charge." },
    ],
  },

  'prix-site-vitrine': {
    body: (
      <>
        <Lead>
          Le prix d'un site vitrine en 2026 va de quelques centaines d'euros pour une solution no-code que
          vous montez vous-même à plus de 15 000 € pour un site d'agence sur-mesure. Cette dispersion
          s'explique par des différences de méthode, de propriété, et surtout par des coûts que la plupart des
          devis n'affichent jamais. Le bon repère n'est pas le tarif le plus bas, mais ce que vous obtenez
          vraiment, et si le site vous appartient.
        </Lead>
        <P>
          Ce guide vous donne les tarifs réels du marché français, un comparatif honnête entre no-code,
          freelance et agence, le prix par type de site (one-page, multi-pages, avec réservation), et surtout
          une analyse de ce que vous payez réellement sur trois à cinq ans, abonnement compris. Chez GND, les
          sites vitrines ont un prix public : à partir de 800 €, ou 1 500 € avec module de réservation, en
          paiement unique et sans abonnement.
        </P>

        <H2>Combien coûte un site vitrine ? Les fourchettes du marché</H2>
        <P>
          Avant d'entrer dans le détail, voici les repères de prix d'un site vitrine constatés sur le marché
          français en 2026, selon le type de prestataire. Ces fourchettes sont des ordres de grandeur : le prix
          d'un site vitrine, comme son tarif de maintenance, dépend du nombre de pages, du design, du SEO
          inclus et des fonctionnalités.
        </P>
        <PriceTable
          head={['Critère', 'No-code (vous-même)', 'Freelance', 'Agence']}
          rows={[
            ['Coût de création', '0 à 360 € / an', '800 à 5 000 €', '3 000 à 15 000 €'],
            ['Propriété du site', 'Non (plateforme)', 'Oui', 'Oui'],
            ['Qualité SEO', 'Basique', 'Bonne à très bonne', 'Variable'],
            ['Personnalisation', 'Limitée', 'Élevée', 'Très élevée'],
            ['Délais', '1 à 7 jours', '2 à 6 semaines', '4 à 16 semaines'],
            ['Risque de dépendance', 'Élevé', 'Faible', 'Faible à moyen'],
            ['Adapté à', 'Tests, très petits budgets', 'TPE, PME, indépendants', 'Marques, gros budgets'],
          ]}
          caption="Comparatif des trois grandes options pour créer un site vitrine en 2026. Le prix le plus bas cache souvent une location et un SEO limité."
        />

        <H2>Le vrai coût d'un site vitrine : loué ou acheté ?</H2>
        <P>
          C'est la question que beaucoup oublient de poser, et pourtant elle change tout : achetez-vous un
          site, ou le louez-vous ? La majorité des offres « à partir de X € par mois » sont un modèle locatif.
          Vous payez un abonnement, et si vous arrêtez de payer, le site disparaît. Vous n'êtes propriétaire ni
          du code, parfois ni du domaine, et vous dépendez entièrement de la plateforme.
        </P>
        <P>
          À l'inverse, un site développé sur une technologie ouverte comme WordPress, ou livré en fichiers que
          vous hébergez, vous appartient : vous pouvez le transférer, le modifier, le confier à un autre
          prestataire. C'est un actif, pas une charge. Voici ce que cette différence représente sur cinq ans.
        </P>
        <PriceTable
          head={['Solution', 'Coût initial', 'Coût annuel', 'Total 5 ans', 'Propriétaire ?']}
          rows={[
            ['Plateforme no-code (Wix, Squarespace)', '0 €', '200 à 240 €', '1 000 à 1 200 €', 'Non'],
            ['Offre agence « en location »', '500 €', '720 €', '4 100 €', 'Non'],
            ['Freelance WordPress', '1 500 €', '200 €', '2 500 €', 'Oui'],
            ['Agence classique', '5 000 €', '300 €', '6 500 €', 'Oui'],
            ['GND, offre de base', '800 €', '0 € d\'abonnement', '800 €', 'Oui'],
            ['GND, avec réservation', '1 500 €', '0 € d\'abonnement', '1 500 €', 'Oui'],
          ]}
          caption="Coût total d'un site vitrine sur 5 ans. Un site « pas cher » en mensualités revient souvent 3 à 5 fois plus cher qu'un achat unique, sans jamais vous appartenir."
        />
        <Callout title="Le piège du « 50 € par mois »">
          Une offre à 59 € par mois avec site inclus revient à 708 € par an, soit 3 540 € sur cinq ans. Si vous
          résiliez, votre site disparaît et vous n'avez rien. Un site acheté une fois, sur un hébergement que
          vous contrôlez, reste à vous indéfiniment. C'est notre définition de la{' '}
          <A href="/guides/etre-proprietaire-de-son-site">vraie propriété</A>.
        </Callout>

        <H2>Ce que les devis oublient de chiffrer</H2>
        <P>
          Un devis de création de site internet mentionne rarement tous les postes de dépense. Voici ce que
          vous devez systématiquement demander avant de comparer deux prix.
        </P>
        <UL>
          <LI><strong>Le nom de domaine :</strong> 10 à 20 € par an. Parfois offert la première année, puis
          facturé au renouvellement.</LI>
          <LI><strong>L'hébergement :</strong> 5 à 30 € par mois selon la performance. Un hébergement
          sous-dimensionné ralentit le site et pénalise le référencement.</LI>
          <LI><strong>Le certificat SSL :</strong> souvent inclus aujourd'hui, mais à vérifier. Sans lui, le
          site s'affiche « non sécurisé » dans les navigateurs.</LI>
          <LI><strong>La maintenance et les mises à jour :</strong> WordPress, ses thèmes et ses extensions
          évoluent régulièrement. Qui s'en charge, et à quel tarif ?</LI>
          <LI><strong>Les sauvegardes automatiques :</strong> indispensables en cas de piratage ou de bug.</LI>
          <LI><strong>Le SEO de base :</strong> beaucoup de sites sont livrés sans balises méta, sans
          optimisation de vitesse, sans structure sémantique. Un beau site que personne ne trouve.</LI>
          <LI><strong>La fiche Google Business :</strong> essentielle pour la visibilité locale, presque jamais
          incluse dans un devis standard.</LI>
          <LI><strong>La formation :</strong> qui vous apprend à modifier vos textes, photos et tarifs ?</LI>
          <LI><strong>Les évolutions futures :</strong> ajouter une page, un formulaire, une section. Souvent
          facturées en régie, de 50 à 120 € de l'heure.</LI>
        </UL>
        <P>
          Chez GND, l'ensemble de ces éléments est inclus dans le prix annoncé : hébergement configuré,
          première année de domaine, SEO local, fiche Google et formation. Vous ne découvrez pas de surprise en
          fin de projet.
        </P>

        <H2>Prix par type de site vitrine</H2>
        <H3>Le site one-page</H3>
        <P>
          Une seule page longue qui présente votre activité, vos services, quelques réalisations et un
          formulaire de contact. La solution la plus simple et la plus rapide.
        </P>
        <PriceTable
          head={['Prestataire', 'Fourchette de prix']}
          rows={[
            ['No-code (Carrd, Wix, Framer)', '0 à 200 € / an'],
            ['Freelance', '800 à 1 500 €'],
            ['Agence', '1 500 à 4 000 €'],
            ['GND (paiement unique, propriétaire)', 'à partir de 800 €'],
          ]}
          caption="Prix d'un site vitrine one-page en 2026."
        />
        <H3>Le site vitrine multi-pages (3 à 7 pages)</H3>
        <P>
          La configuration la plus courante pour une TPE ou une profession libérale : accueil, services, à
          propos, contact, et parfois réalisations ou blog. L'écart de prix entre freelance et agence tient
          surtout au nombre d'interlocuteurs impliqués et aux frais de structure.
        </P>
        <PriceTable
          head={['Prestataire', 'Fourchette de prix']}
          rows={[
            ['No-code (Wix, Squarespace, Webflow)', '200 à 500 € / an'],
            ['Freelance', '1 500 à 4 000 €'],
            ['Agence', '3 000 à 8 000 €'],
          ]}
          caption="Prix d'un site vitrine multi-pages en 2026."
        />
        <H3>Le site vitrine avec module de réservation</H3>
        <P>
          Ajouter la prise de rendez-vous en ligne (calendrier, synchronisation des disponibilités,
          notifications, parfois paiement) représente une complexité supplémentaire. Chez GND, ce type de site
          est à 1 500 € en paiement unique, module intégré au site propriétaire, sans abonnement lié à une
          plateforme tierce.
        </P>
        <PriceTable
          head={['Prestataire', 'Fourchette de prix']}
          rows={[
            ['No-code avec extension réservation', '300 à 800 € / an'],
            ['Freelance', '1 500 à 3 000 €'],
            ['Agence', '4 000 à 10 000 €'],
            ['GND (paiement unique, propriétaire)', '1 500 €'],
          ]}
          caption="Prix d'un site vitrine avec réservation en ligne en 2026."
        />

        <H2>Prix création site internet : ce qui justifie l'écart</H2>
        <P>
          Pourquoi le prix de création d'un site internet peut-il aller de 0 € à plus de 15 000 € pour ce qui
          ressemble, de loin, au même résultat : quelques pages et un formulaire ? Parce que le prix ne paie
          pas les pages, il paie ce qu'il y a derrière. Un tarif de site vitrine bas correspond presque
          toujours à un gabarit réutilisé, monté vite, sans stratégie ni optimisation. Un tarif plus élevé
          finance une vraie démarche : compréhension de votre activité, architecture pensée pour la conversion,
          rédaction et structure au service du SEO, et un site qui vous appartient.
        </P>
        <P>
          Concrètement, cinq éléments expliquent l'essentiel de l'écart de prix : le nombre de pages, le design
          (gabarit ou sur-mesure), le niveau de SEO inclus, les fonctionnalités (réservation, paiement,
          multilingue), et le modèle de propriété (site loué ou acheté). Un prix de création de site internet
          se lit toujours à la lumière de ces cinq critères, jamais sur le seul chiffre affiché en bas du
          devis.
        </P>

        <H2>Prix d'un site vitrine selon votre métier</H2>
        <P>
          À nombre de pages égal, deux activités n'ont pas les mêmes besoins. Le prix d'un site vitrine
          s'ajuste au rôle que joue le site dans votre acquisition de clients. Voici des repères concrets par
          profil.
        </P>
        <UL>
          <LI><strong>Artisan, commerce de proximité :</strong> 800 à 2 500 €. Un site clair, rapide, optimisé
          en SEO local et couplé à la fiche Google suffit souvent à capter la demande de votre zone.</LI>
          <LI><strong>Restaurant, café :</strong> 1 200 à 3 500 €. Le site doit donner envie, afficher la carte,
          les horaires, l'accès, et souvent intégrer la réservation. La cohérence avec les réseaux compte.</LI>
          <LI><strong>Profession libérale, consultant :</strong> 1 200 à 4 000 €. Le site porte votre
          crédibilité. Une page services claire, des preuves, et un module de prise de rendez-vous font la
          différence.</LI>
          <LI><strong>PME, activité B2B :</strong> 2 500 à 8 000 €. Plusieurs pages, du contenu qui répond aux
          questions de vos prospects, une vraie stratégie SEO pour être trouvé sur vos requêtes métier.</LI>
        </UL>
        <P>
          Ces fourchettes ne sont pas des tarifs figés, mais des repères pour situer votre projet avant de
          demander un devis. Un bon prestataire part toujours de votre réalité et de vos objectifs, pas d'un
          prix standard.
        </P>

        <H2>Comment budgéter votre site vitrine sans vous tromper</H2>
        <P>
          Un prix de site vitrine se compare mal sur le seul montant affiché, et un tarif de site vitrine bas
          cache souvent des coûts qui arrivent ensuite. Pour budgéter juste et éviter les mauvaises surprises,
          appliquez ces quelques réflexes avant de signer.
        </P>
        <UL>
          <LI><strong>Raisonnez sur cinq ans, pas sur le prix d'entrée.</strong> Un abonnement mensuel faible
          peut dépasser largement le coût d'un site acheté une fois. Calculez toujours le coût total.</LI>
          <LI><strong>Vérifiez la propriété.</strong> Le site, le domaine et l'hébergement sont-ils à votre
          nom ? Pouvez-vous partir avec, sans tout perdre ?</LI>
          <LI><strong>Exigez le détail de ce qui est inclus.</strong> Hébergement, domaine, SSL, SEO de base,
          fiche Google, formation, sauvegardes. Ce qui n'est pas écrit n'est pas inclus.</LI>
          <LI><strong>Chiffrez les évolutions futures.</strong> Ajouter une page ou un formulaire dans un an,
          combien ça coûte ? Un tarif horaire clair vaut mieux qu'une bonne surprise qui n'en est pas une.</LI>
          <LI><strong>Comparez à périmètre égal.</strong> Un site one-page monté en no-code et un site
          multi-pages sur-mesure optimisé SEO ne sont pas le même produit, même si les deux s'appellent « site
          vitrine ».</LI>
        </UL>
        <P>
          Bien piloté, un budget de site vitrine même modeste produit un actif rentable et durable. Mal piloté,
          un gros budget se dilue dans des fonctionnalités inutiles ou un abonnement sans fin. La différence se
          joue sur la clarté de votre demande et sur la propriété de ce que vous obtenez.
        </P>

        <H2>Site vitrine WordPress ou no-code : que choisir et à quel prix ?</H2>
        <P>
          Les solutions no-code (Wix, Squarespace, Webflow, Framer, Carrd) permettent de créer un site
          soi-même sans coder, mais reposent sur l'abonnement : le site cesse d'exister si vous arrêtez de
          payer. Elles conviennent à un test, une carte de visite digitale ou un très petit budget, pas à un
          site vitrine professionnel destiné à générer des clients sur la durée.
        </P>
        <P>
          Un site vitrine WordPress (ou livré en fichiers propriétaires) coûte plus cher à la création, mais
          vous appartient, se référence mieux et ne dépend d'aucun abonnement de plateforme. Sur cinq ans, il
          revient presque toujours moins cher qu'une location no-code, tout en restant un actif transférable.
          Pour trancher entre les deux modèles de prestataire, lisez notre guide{' '}
          <A href="/guides/freelance-ou-agence">freelance ou agence</A>.
        </P>

        <H2>Comment lire un devis de site vitrine</H2>
        <P>
          Un devis contient souvent des lignes libellées vaguement. Voici ce qui est habituellement inclus, et
          ce qui manque le plus souvent.
        </P>
        <UL>
          <LI><strong>Généralement inclus :</strong> conception graphique et maquettage, intégration et
          développement, responsive (mobile et tablette), optimisation SEO on-page, et parfois la rédaction du
          contenu (qui augmente le prix mais la valeur SEO).</LI>
          <LI><strong>Souvent absent :</strong> hébergement et domaine au renouvellement, certificat SSL,
          sauvegardes automatiques, référencement local et fiche Google, évolutions après livraison, et
          maintenance de sécurité.</LI>
        </UL>
        <P>
          Demandez systématiquement une ligne détaillée sur ces éléments. Un devis qui ne les mentionne pas ne
          les inclut probablement pas, et le prix d'appel se transforme vite en facture finale plus salée.
        </P>

        <H2>Quels délais prévoir ?</H2>
        <PriceTable
          head={['Prestataire', 'Délai moyen']}
          rows={[
            ['No-code (vous-même)', '1 à 7 jours'],
            ['Freelance (one-page)', '1 à 3 semaines'],
            ['Freelance (multi-pages)', '3 à 6 semaines'],
            ['Studio hybride (GND)', '2 à 4 semaines'],
            ['Agence (projet standard)', '6 à 16 semaines'],
          ]}
          caption="Délais de création d'un site vitrine selon le prestataire."
        />
        <P>
          Un délai long n'est pas un gage de qualité : il reflète souvent l'organisation interne et le carnet
          de commandes. Si vous avez un lancement ou une date butoir, précisez-le dès le premier contact. Notre
          méthode hybride, où l'humain signe et l'IA accélère, permet de livrer vite sans sacrifier le
          sur-mesure.
        </P>

        <H2>Quel retour sur investissement attendre ?</H2>
        <P>
          Le prix d'un site vitrine ne se juge pas seul, mais au regard de ce qu'il rapporte. Un site à 800 €
          qui vous amène un client par mois est rentabilisé en quelques semaines. Un site à 5 000 € que
          personne ne trouve sur Google est une dépense pure. Quatre facteurs déterminent ce retour.
        </P>
        <UL>
          <LI><strong>Le SEO :</strong> un site bien structuré, rapide et pensé pour les moteurs génère du
          trafic organique sans coût publicitaire.</LI>
          <LI><strong>La conversion :</strong> un site beau mais sans appel à l'action clair, sans téléphone
          visible ni formulaire simple, ne transforme pas.</LI>
          <LI><strong>La visibilité locale :</strong> pour un commerce, un artisan ou un indépendant, la fiche
          Google couplée à un site optimisé en SEO local est souvent la première source de contacts.</LI>
          <LI><strong>La crédibilité :</strong> un site professionnel rassure et augmente le taux de
          transformation de vos contacts entrants.</LI>
        </UL>
        <P>
          Exemple concret : un consultant indépendant qui investit 1 500 € dans un site avec réservation, et
          génère 80 à 200 visiteurs par mois en SEO local avec un taux de prise de rendez-vous de 2 à 5 %,
          rentabilise son site en une à deux missions. Au-delà, tout est bénéfice.
        </P>

        <H2>Prix d'un site vitrine : le récapitulatif</H2>
        <P>
          Pour retenir l'essentiel, voici la synthèse des fourchettes vues dans ce guide. Ces repères servent à
          situer votre projet, jamais à remplacer un devis qui, seul, tient compte de votre besoin réel et de
          la propriété du site.
        </P>
        <PriceTable
          head={['Type de site vitrine', 'Fourchette de prix 2026', 'Pour qui']}
          rows={[
            ['One-page', '800 à 4 000 € (dès 800 € chez GND)', 'Indépendants, lancement rapide'],
            ['Multi-pages (3 à 7 pages)', '1 500 à 8 000 €', 'TPE, PME, professions libérales'],
            ['Avec réservation en ligne', '1 500 à 10 000 € (1 500 € chez GND)', 'Services, prise de RDV'],
            ['Avec boutique légère', '2 500 à 15 000 €', 'Quelques produits, vente en ligne'],
            ['No-code (location)', '0 à 500 € / an', 'Test, très petit budget'],
          ]}
          caption="Synthèse du prix d'un site vitrine par type de projet, marché français 2026."
        />

        <H2>Combien coûte un site vitrine chez GND ?</H2>
        <P>
          Contrairement à la plupart des prestataires, GND affiche des prix publics et fixes pour ses sites
          vitrines : une vitrine démarre à 800 €, et la formule avec module de réservation est à 1 500 €.
          Paiement unique, sans abonnement, avec hébergement configuré, première année de domaine, SEO local et
          configuration de la fiche Google inclus, et un site 100 % propriétaire. Vous repartez avec un actif,
          pas une location. Découvrez le détail sur notre{' '}
          <A href="/services/sites-vitrines">page sites vitrines</A>, ou{' '}
          <A href="/contact">demandez votre devis</A>, réponse sous 24h.
        </P>
      </>
    ),
    faq: [
      { q: 'Quel est le prix d\'un site vitrine en 2026 ?', a: "De quelques centaines d'euros en no-code (avec abonnement) à plus de 15 000 € en agence sur-mesure. Pour une TPE ou un indépendant, comptez 1 500 à 4 000 € chez un freelance propriétaire, et 3 000 à 8 000 € en agence. Chez GND, une vitrine démarre à 800 € en paiement unique." },
      { q: 'Combien coûte un site vitrine chez GND ?', a: "À partir de 800 € pour une vitrine, 1 500 € avec module de réservation. Prix publics et fixes, paiement unique, sans abonnement, avec hébergement, première année de domaine, SEO local et fiche Google inclus, site 100 % propriétaire." },
      { q: 'Vaut-il mieux un site loué ou acheté ?', a: "Un site loué (abonnement mensuel) semble accessible mais coûte souvent 3 à 5 fois plus cher sur cinq ans, et disparaît si vous arrêtez de payer. Un site acheté une fois, sur un hébergement que vous contrôlez, vous appartient et reste un actif transférable. Sur la durée, l'achat est presque toujours plus rentable." },
      { q: 'Quels coûts un devis de site vitrine oublie souvent ?', a: "Le domaine au renouvellement, l'hébergement, le certificat SSL, les sauvegardes, la maintenance de sécurité, le SEO de base, la fiche Google Business, la formation et les évolutions futures (souvent 50 à 120 € de l'heure). Demandez une ligne détaillée sur chacun." },
      { q: 'Combien coûte un site vitrine WordPress ?', a: "Entre 1 500 et 4 000 € chez un freelance et 3 000 à 8 000 € en agence pour un site multi-pages. Plus cher à la création qu'un no-code, mais vous en êtes propriétaire, il se référence mieux et ne dépend d'aucun abonnement de plateforme." },
      { q: 'Quel est le prix d\'un site vitrine avec réservation en ligne ?', a: "De 1 500 à 3 000 € chez un freelance et 4 000 à 10 000 € en agence. Chez GND, ce type de site est à 1 500 € en paiement unique, avec le module de réservation intégré au site propriétaire, sans abonnement lié à une plateforme tierce." },
      { q: 'Combien coûte un site one-page ?', a: "De 0 à 200 € par an en no-code, 800 à 1 500 € chez un freelance, 1 500 à 4 000 € en agence. Chez GND, un site vitrine professionnel démarre à 800 €, en paiement unique et 100 % propriétaire, SEO local et fiche Google inclus." },
      { q: 'L\'hébergement et le domaine sont-ils inclus dans le prix ?', a: "Cela dépend du prestataire, à vérifier systématiquement. Chez GND, l'hébergement est configuré et la première année de domaine est offerte, sans abonnement imposé ensuite." },
      { q: 'Quels délais pour créer un site vitrine ?', a: "1 à 7 jours en no-code, 1 à 6 semaines chez un freelance selon le nombre de pages, 2 à 4 semaines dans un studio hybride comme GND, et 6 à 16 semaines en agence. Un délai long n'est pas un gage de qualité." },
      { q: 'Un site vitrine pas cher est-il un mauvais choix ?', a: "Pas forcément, si vous savez ce que vous achetez. Le piège, c'est le prix d'appel qui cache une location à vie, un site bridé sur le SEO ou des évolutions facturées cher. Regardez ce qui est inclus, si le site vous appartient, et le coût réel sur cinq ans." },
    ],
  },

  'prix-identite-visuelle': {
    body: (
      <>
        <Lead>
          En 2026, le prix d'une identité visuelle va de quelques centaines d'euros pour un logo seul chez
          un freelance junior à plus de 15 000 € pour une identité complète en agence. Pour la majorité des
          TPE et PME, une identité professionnelle et durable (logo, charte graphique, déclinaisons) se situe
          entre 1 500 € et 4 000 €. Le vrai repère n'est pas le tarif le plus bas, c'est ce que vous obtenez
          vraiment et les droits que vous récupérez. Ce guide détaille le prix d'un logo, le prix d'une charte
          graphique, le prix d'une identité visuelle complète, et surtout ce qui justifie chaque écart.
        </Lead>
        <P>
          Vous cherchez un repère rapide avant de demander un devis ? Voici l'essentiel : comptez 300 à
          1 500 € pour un logo professionnel chez un freelance, 1 500 à 8 000 € en studio ou en agence, et
          1 500 à 4 000 € pour une identité complète adaptée à une PME. Le reste de cet article vous explique
          comment lire un devis, éviter les pièges de prix, et choisir entre freelance, studio et agence sans
          vous tromper.
        </P>

        <H2>Prix d'une identité visuelle en 2026 : les fourchettes du marché</H2>
        <P>
          Avant d'entrer dans le détail, voici les repères de prix d'une identité visuelle constatés sur le
          marché français en 2026, selon le type de prestation et de prestataire. Ces fourchettes sont des
          ordres de grandeur : le prix réel dépend de votre projet, comme nous le détaillons plus bas.
        </P>
        <PriceTable
          head={['Prestation', 'Freelance', 'Studio / Agence']}
          rows={[
            ['Logo simple (junior)', '300 à 800 €', 'non applicable'],
            ['Logo professionnel (confirmé)', '800 à 1 500 €', '1 500 à 3 000 €'],
            ['Charte graphique', '500 à 3 000 €', '3 000 à 15 000 €'],
            ['Pack logo + charte', '1 500 à 4 000 €', '3 500 à 8 000 €'],
            ['Identité visuelle complète', '1 500 à 4 000 €', '4 000 à 15 000 € et plus'],
            ['Rebranding complet', '3 000 à 6 000 €', '5 000 à 15 000 €+'],
            ['Génération par IA seule (Canva, Looka…)', '0 à 300 €', 'non applicable'],
          ]}
          caption="Fourchettes indicatives du marché français, 2026. Le prix final dépend de l'ampleur du projet, du niveau de recherche créative et des livrables. Sources : Codeur, Malt, BDM et retours d'agences."
        />
        <P>
          Retenez une chose : sur ce marché, un écart de 1 à 10 sur le prix ne veut pas dire un écart de 1 à
          10 sur la qualité du dessin. Il traduit surtout la profondeur de la réflexion en amont, le nombre
          de pistes explorées, l'étendue des livrables et, surtout, ce que vous possédez réellement à la fin.
        </P>

        <H2>Tarif création logo : pourquoi ça va de 50 € à 5 000 €</H2>
        <P>
          C'est la question qui revient le plus souvent : pourquoi un tarif de création de logo peut-il aller
          de 50 € sur une plateforme à 5 000 € en studio, pour ce qui ressemble, de loin, au même livrable ?
          La réponse tient en un mot : ce que vous ne voyez pas. Un logo à 50 € est un fichier isolé, souvent
          issu d'un gabarit réutilisé, sans stratégie ni exclusivité. Un logo à 5 000 € est le résultat
          visible d'un travail invisible : analyse du positionnement, étude des concurrents, exploration de
          plusieurs territoires créatifs, tests de lisibilité en petit et en grand, déclinaisons et cession
          de droits.
        </P>
        <P>
          Pour situer votre projet, voici comment se répartit un tarif de création de logo selon la démarche
          réellement engagée derrière le dessin.
        </P>
        <PriceTable
          head={['Niveau de prestation', 'Tarif création logo', 'Ce qui est inclus']}
          rows={[
            ['Générateur en ligne / IA seule', '0 à 100 €', 'Un visuel instantané, non exclusif, sans fichiers sources garantis.'],
            ['Plateforme de freelances (entrée)', '50 à 300 €', 'Un logo simple, souvent sans recherche ni déclinaisons.'],
            ['Freelance junior', '300 à 800 €', 'Un logo correct pour un brief clair, fichiers sources à vérifier.'],
            ['Freelance confirmé', '800 à 1 500 €', 'Recherche, variantes, fichiers sources et cession de droits.'],
            ['Studio créatif', '1 500 à 5 000 €', 'Stratégie, direction créative, système complet et exclusivité.'],
          ]}
          caption="Tarif de création de logo selon la profondeur de la démarche. Le prix ne paie pas le dessin, il paie la réflexion et les droits qui vont avec."
        />
        <P>
          Autrement dit, un tarif de création de logo bas n'est pas une bonne affaire s'il vous oblige à tout
          refaire six mois plus tard. Le bon réflexe n'est pas de chercher le prix le plus bas, mais le prix
          juste pour ce que votre marque exige vraiment.
        </P>

        <H2>Prix logo agence ou freelance : le vrai calcul</H2>
        <P>
          Beaucoup d'entreprises hésitent entre un logo chez un freelance et un logo en agence, uniquement sur
          la base du prix affiché. C'est une erreur de lecture. Le prix d'un logo en agence (souvent 2 000 à
          8 000 €) intègre une équipe, un processus et une garantie de suivi que le tarif d'un freelance (300 à
          1 500 €) ne couvre pas toujours. Mais l'inverse est vrai aussi : payer un prix d'agence pour un
          besoin simple, c'est financer une structure dont vous n'avez pas l'usage.
        </P>
        <P>
          Le bon calcul se fait sur la durée. Un logo bien conçu vous accompagne cinq à dix ans. Ramené à
          l'année, l'écart entre un freelance à 1 000 € et un studio à 3 000 € devient marginal au regard de
          ce que ce logo porte : votre crédibilité, votre reconnaissance, la confiance de vos clients. La
          vraie question n'est donc pas le prix du logo aujourd'hui, mais son coût réel sur toute sa durée de
          vie, refontes comprises. Pour approfondir ce choix, lisez notre guide{' '}
          <A href="/guides/logo-freelance-ou-agence">logo freelance ou agence</A>.
        </P>

        <H2>Combien coûte un logo ?</H2>
        <P>
          Le logo est la brique la plus demandée, et celle dont le prix varie le plus. Sur le marché
          français, un logo se situe le plus souvent entre 300 € et 2 500 €, selon l'expérience du
          prestataire et la démarche qui l'accompagne.
        </P>
        <UL>
          <LI><strong>Freelance junior (moins de 3 ans) :</strong> 300 à 800 €. Correct pour une activité
          simple avec un brief clair, à condition de vérifier le portfolio et les fichiers livrés.</LI>
          <LI><strong>Freelance confirmé (3 à 8 ans) :</strong> 800 à 1 500 €. Le meilleur rapport
          qualité-prix pour la plupart des TPE et PME.</LI>
          <LI><strong>Studio ou agence :</strong> 1 500 à 8 000 € et plus. Ici le logo s'inscrit dans une
          véritable stratégie de marque, avec analyse du positionnement et des concurrents.</LI>
        </UL>
        <P>
          Méfiez-vous des logos à très bas prix (moins de 50 € sur une plateforme, ou générés
          automatiquement). Ils arrivent presque toujours sans fichiers sources, sans déclinaisons et avec
          des droits flous. Résultat : vous payez une deuxième fois pour le refaire proprement. Pour aller
          plus loin sur ce choix, voir notre guide{' '}
          <A href="/guides/logo-freelance-ou-agence">logo freelance ou agence</A>.
        </P>

        <H2>Prix d'une charte graphique : combien et pour quoi ?</H2>
        <P>
          La charte graphique est le document qui encadre l'usage de votre logo, de vos couleurs et de vos
          typographies. C'est elle qui garantit que votre site, vos réseaux sociaux, vos devis et vos
          supports imprimés racontent la même histoire visuelle. Le prix d'une charte graphique dépend
          directement du nombre de supports couverts et de la profondeur des règles : une charte de deux
          pages n'a pas la même valeur qu'un système complet qui anticipe tous vos points de contact.
        </P>
        <UL>
          <LI><strong>Charte basique (freelance) :</strong> 500 à 1 500 €. Couleurs, typographies, règles
          d'usage du logo. Suffisant pour démarrer.</LI>
          <LI><strong>Charte complète (freelance confirmé) :</strong> 1 500 à 3 000 €. Ajoute les
          déclinaisons, les gabarits réseaux sociaux et les principes d'iconographie.</LI>
          <LI><strong>Charte stratégique (studio ou agence) :</strong> 3 000 à 15 000 €. Intègre la
          stratégie de marque en amont et une déclinaison large sur tous les points de contact.</LI>
        </UL>
        <P>
          Sans charte, chaque prestataire qui intervient après vous (développeur, imprimeur, community
          manager) réinterprète votre identité à sa façon. Le résultat est une marque floue et peu
          mémorable. Pour comprendre la différence avec un brand book, lisez notre guide{' '}
          <A href="/guides/charte-graphique-vs-brand-book">charte graphique ou brand book</A>.
        </P>

        <H2>Combien coûte un brand book ?</H2>
        <P>
          Le brand book va plus loin que la charte : il englobe la plateforme de marque, c'est-à-dire la
          vision, les valeurs, le ton de voix et le récit. Comptez généralement 2 000 à 8 000 € chez un
          freelance confirmé ou un studio, et davantage en agence quand il s'accompagne d'un vrai travail
          de stratégie. Ce budget se justifie quand la marque grandit, recrute ou s'adresse à plusieurs
          audiences. Une petite structure n'en a pas toujours besoin dès le démarrage.
        </P>

        <H2>Combien coûte une identité visuelle complète ?</H2>
        <P>
          Une identité visuelle complète regroupe le logo, ses variantes, la palette de couleurs, la
          typographie, les éléments graphiques et la charte qui encadre le tout. C'est le socle sur lequel
          reposeront ensuite votre site, vos supports et votre communication.
        </P>
        <UL>
          <LI><strong>Freelance :</strong> 1 500 à 4 000 € pour une identité cohérente et bien documentée.</LI>
          <LI><strong>Studio :</strong> 4 000 à 6 000 €, avec une direction créative affirmée et une
          exécution soignée.</LI>
          <LI><strong>Agence :</strong> 6 000 à 15 000 € et plus, pertinent pour les projets complexes
          (plusieurs marques, marchés internationaux, enjeux de levée de fonds).</LI>
        </UL>

        <H2>Freelance, studio ou agence : quel écart de prix, et pour quoi ?</H2>
        <P>
          On oppose souvent le freelance à l'agence, en oubliant le palier intermédiaire qui convient le
          mieux à la plupart des projets ambitieux : le studio. Voici comment trancher.
        </P>
        <H3>Le freelance</H3>
        <P>
          Le plus accessible (300 à 4 000 € selon la prestation). Interlocuteur unique, souplesse, coût
          maîtrisé. Idéal si votre projet est clair et votre budget serré. La limite : une seule paire de
          mains, donc une seule sensibilité créative, et une disponibilité qui dépend de son carnet de
          commandes.
        </P>
        <H3>Le studio</H3>
        <P>
          Le juste milieu (3 000 à 8 000 €). Une petite équipe soudée, une direction créative qui signe,
          plusieurs compétences réunies (stratégie, design, parfois rédaction et motion). Vous gagnez la
          cohérence et le recul d'une structure, sans les frais de structure d'une grande agence. C'est le
          modèle de GND.
        </P>
        <H3>L'agence</H3>
        <P>
          Le plus complet et le plus cher (6 000 à 15 000 € et au-delà). Équipe pluridisciplinaire, process
          rodés, capacité à gérer des projets complexes. Pertinent quand le branding est un enjeu business
          majeur. En contrepartie, un coût de structure élevé et parfois une relation plus distante.
        </P>

        <H2>Prix d'une identité par IA, par un humain, ou les deux ?</H2>
        <P>
          C'est la question qui change tout en 2026, et que presque aucun guide n'aborde honnêtement. Les
          outils d'intelligence artificielle (générateurs de logo, Canva, Midjourney) permettent de produire
          un visuel en quelques minutes pour presque rien. Faut-il s'en méfier ou s'en servir ? La bonne
          réponse n'est ni l'un ni l'autre : c'est de savoir ce que chaque approche vous apporte réellement.
        </P>
        <PriceTable
          head={['Approche', 'Budget', 'Ce que vous obtenez']}
          rows={[
            ['IA seule (générateur, Canva)', '0 à 300 €', 'Un visuel rapide, souvent générique, sans stratégie, avec des droits et une exclusivité flous.'],
            ['IA + direction humaine', 'selon projet', "La vitesse de l'IA pour explorer, et l'œil humain pour trancher, affiner et garantir une marque unique et cohérente."],
            ['100 % humain sur-mesure', 'le plus élevé', 'Une identité entièrement pensée main, idéale pour les marques à fort enjeu de différenciation.'],
          ]}
          caption="La question n'est pas humain contre IA, mais quelle combinaison sert votre marque."
        />
        <Callout title="La position de GND : l'humain pour guider, l'IA pour accélérer">
          Une identité générée par une IA seule ressemble à des milliers d'autres et ne raconte rien. Chez
          GND, l'IA sert à explorer vite et large, mais c'est une direction créative humaine qui signe
          chaque choix. Vous gagnez le meilleur des deux : la richesse d'exploration de l'IA et la
          singularité d'un regard humain. C'est ce qui fait qu'une marque reste reconnaissable et vous
          appartient vraiment.
        </Callout>

        <H2>Droits d'auteur et fichiers sources : ce que vous possédez vraiment</H2>
        <P>
          C'est le point le plus important de cet article, et le plus souvent négligé. Payer pour une
          identité visuelle ne veut pas automatiquement dire la posséder. Deux notions déterminent ce que
          vous récupérez : les fichiers sources et la cession de droits.
        </P>
        <H3>Les fichiers sources : la différence entre louer et posséder</H3>
        <P>
          Il faut distinguer deux familles de fichiers. Les fichiers d'export (PNG, JPG, PDF, SVG) sont prêts
          à l'usage mais non modifiables. Les fichiers sources (AI d'Illustrator, EPS, fichiers Figma ou INDD
          d'InDesign) sont les fichiers de travail originaux, entièrement modifiables : ce sont eux qui vous
          permettent de faire évoluer votre logo, de le décliner, ou de le confier à un autre prestataire sans
          repartir de zéro. Sans fichiers sources, vous ne louez qu'une image figée. Avec, vous possédez
          vraiment votre identité.
        </P>
        <P>
          Beaucoup de prestataires, notamment les freelances débutants et certaines plateformes, ne livrent
          pas les fichiers sources par défaut, ou les facturent en supplément. Voici les livrables à exiger
          systématiquement avant de signer.
        </P>
        <PriceTable
          head={['Livrable', 'Statut', 'À quoi il sert']}
          rows={[
            ['Fichier vectoriel AI ou EPS (modifiable)', 'Indispensable', 'La source éditable de votre logo.'],
            ['Fichier vectoriel SVG', 'Indispensable', "L'usage web, net à toutes les tailles."],
            ['PDF vectoriel', 'Indispensable', "L'impression sans perte de qualité."],
            ['PNG transparents (plusieurs tailles)', 'Indispensable', 'Les usages numériques courants.'],
            ['JPG sur fond blanc', 'Indispensable', 'Les documents bureautiques.'],
            ['Fichier source Illustrator ou Figma', 'À négocier', 'La modification future en autonomie.'],
            ['Codes Pantone', 'Recommandé', "L'impression professionnelle fidèle."],
          ]}
          caption="Les livrables à demander à la livraison d'une identité visuelle. Sans les formats vectoriels et sources, votre logo n'est pas réellement exploitable."
        />
        <H3>La cession de droits : les quatre points à vérifier</H3>
        <P>
          En droit français, une création graphique est protégée par le droit d'auteur dès sa création, et
          les droits appartiennent par défaut à son auteur, c'est-à-dire au designer, pas à vous. Pour utiliser
          librement votre logo, le contrat doit prévoir une cession de droits patrimoniaux, précise sur quatre
          points.
        </P>
        <UL>
          <LI><strong>L'étendue :</strong> quels usages sont autorisés (imprimé, web, télévision,
          merchandising).</LI>
          <LI><strong>Le territoire :</strong> France, Europe ou monde entier.</LI>
          <LI><strong>La durée :</strong> temporaire, ou pour toute la durée légale de protection (70 ans
          après la mort de l'auteur).</LI>
          <LI><strong>L'exclusivité :</strong> le designer peut-il réutiliser ou revendre des éléments
          similaires à d'autres clients ?</LI>
        </UL>
        <P>
          Un contrat vague sur ces points peut vous exposer à un litige, ou à un logo qui, juridiquement, ne
          vous appartient pas totalement. C'est le piège classique des offres à très bas prix, et un point
          particulièrement sensible avec les logos générés par IA : la propriété intellectuelle de ces
          créations reste un sujet juridique en débat, et certaines plateformes conservent des droits ou
          réutilisent vos visuels. Lisez toujours les conditions avant d'utiliser un logo automatisé pour une
          marque commerciale.
        </P>
        <Callout>
          Chez GND, vous repartez toujours avec vos fichiers sources et une cession de droits claire. Votre
          identité vous appartient à 100 %, sans dépendance ni surprise. C'est notre définition de la{' '}
          <A href="/guides/etre-proprietaire-de-son-site">vraie propriété</A>.
        </Callout>

        <H2>Ce qui fait varier le prix</H2>
        <P>
          À prestation égale, quatre facteurs expliquent l'essentiel des écarts de prix. Les comprendre vous
          aide à lire un devis et à savoir où mettre votre budget.
        </P>
        <UL>
          <LI><strong>L'ampleur du projet :</strong> un logo seul n'a rien à voir avec une identité complète
          déclinée sur tous vos supports.</LI>
          <LI><strong>La phase de stratégie :</strong> un prestataire expérimenté commence par analyser votre
          positionnement, vos concurrents et votre cible. C'est cette étape, invisible mais décisive, qui
          garantit une identité cohérente et différenciante.</LI>
          <LI><strong>Le nombre de pistes et d'allers-retours :</strong> une seule proposition coûte moins
          cher que trois concepts travaillés avec plusieurs cycles de modifications.</LI>
          <LI><strong>Les livrables :</strong> déclinaisons, formats sources, guide d'usage, gabarits réseaux
          sociaux. Plus le kit est complet, plus il a de valeur opérationnelle.</LI>
        </UL>

        <H2>Prix d'une identité visuelle selon votre secteur d'activité</H2>
        <P>
          À taille égale, deux entreprises n'ont pas les mêmes attentes selon leur secteur. Le prix d'une
          identité visuelle s'ajuste au niveau d'exigence visuelle de votre marché et à la place que l'image
          occupe dans la décision d'achat de vos clients. Voici des repères concrets par secteur.
        </P>
        <UL>
          <LI><strong>Restaurant, café, commerce de bouche :</strong> 1 200 à 4 000 €. L'identité doit donner
          envie et fonctionner en enseigne, sur un menu, un packaging et les réseaux. La cohérence entre la
          devanture et Instagram est un vrai levier de fréquentation.</LI>
          <LI><strong>Artisan, bâtiment, services de proximité :</strong> 800 à 2 500 €. Un logo lisible et
          une charte simple suffisent à inspirer confiance localement, sur un véhicule, un devis ou une
          vitrine.</LI>
          <LI><strong>Startup, SaaS, tech :</strong> 4 000 à 15 000 €. L'identité doit tenir face aux
          investisseurs, aux recrutements et à un produit qui évolue vite. Une plateforme de marque et un
          système de design sont souvent justifiés.</LI>
          <LI><strong>Cabinet, profession libérale, santé :</strong> 1 500 à 5 000 €. L'image porte votre
          sérieux et votre crédibilité. Sobriété, lisibilité et cohérence documentaire priment.</LI>
          <LI><strong>Marque premium, luxe, cosmétique :</strong> 6 000 à 20 000 € et plus. Ici l'identité
          est le produit : chaque détail compte, du logo au packaging, en passant par la typographie et les
          matières.</LI>
        </UL>
        <P>
          Ces fourchettes ne sont pas des tarifs figés, mais des repères pour situer votre projet avant de
          demander un devis. Un bon prestataire adapte toujours le prix de l'identité visuelle à votre besoin
          réel, pas l'inverse.
        </P>

        <H2>Comment demander un devis de logo professionnel</H2>
        <P>
          Obtenir un devis logo professionnel clair est la meilleure façon de comparer sereinement. Un devis
          de logo professionnel bien construit détaille les livrables, les droits et les délais, et vous évite
          les mauvaises surprises. Pour recevoir une proposition juste et éviter les allers-retours inutiles,
          préparez ces quelques éléments avant de contacter un prestataire.
        </P>
        <UL>
          <LI><strong>Votre besoin réel :</strong> logo seul, logo + charte, ou identité complète ? Plus
          c'est précis, plus le devis est fiable.</LI>
          <LI><strong>Vos supports prioritaires :</strong> site, enseigne, réseaux sociaux, packaging,
          documents commerciaux. Ils déterminent les déclinaisons à prévoir.</LI>
          <LI><strong>Vos références visuelles :</strong> deux ou trois marques que vous aimez, et pourquoi.
          Cela cadre la direction créative dès le départ.</LI>
          <LI><strong>Votre échéance et votre budget indicatif :</strong> même approximatif, un budget aide
          le prestataire à calibrer la bonne prestation plutôt que de vous sur-vendre ou sous-livrer.</LI>
        </UL>
        <P>
          Un devis de logo professionnel sérieux vous revient sous quelques jours, détaillé, avec les
          livrables, les droits et les délais. Chez GND, vous recevez votre devis personnalisé sous 48h,
          sans engagement. Il vous suffit de{' '}
          <A href="/contact">nous décrire votre projet</A>.
        </P>

        <H2>Quel budget prévoir selon votre type d'entreprise ?</H2>
        <P>
          Le bon budget dépend moins de votre taille que de l'importance de l'image dans votre activité.
          Voici des repères concrets selon votre profil.
        </P>
        <UL>
          <LI><strong>Artisan, commerce de proximité :</strong> 800 à 2 000 €. Un logo solide et une charte
          simple suffisent souvent à inspirer confiance localement. La priorité est la lisibilité sur une
          enseigne, un véhicule ou une carte de visite.</LI>
          <LI><strong>Indépendant, profession libérale :</strong> 1 000 à 2 500 €. L'identité porte votre
          crédibilité personnelle. Un logo, une charte et des gabarits pour vos documents professionnels
          font la différence.</LI>
          <LI><strong>E-commerce, boutique en ligne :</strong> 2 000 à 5 000 €. L'identité se décline sur de
          nombreux points de contact (site, fiches produit, réseaux, packaging). La cohérence devient un
          enjeu de conversion.</LI>
          <LI><strong>Startup, SaaS, entreprise en croissance :</strong> 4 000 à 15 000 €. L'identité doit
          tenir la route face aux investisseurs, aux recrutements et à une communication qui monte en
          puissance. Une plateforme de marque complète est souvent justifiée.</LI>
        </UL>

        <H2>Quels délais prévoir ?</H2>
        <UL>
          <LI><strong>Logo simple :</strong> 1 à 2 semaines.</LI>
          <LI><strong>Identité visuelle complète :</strong> 3 à 6 semaines.</LI>
          <LI><strong>Identité + stratégie de marque :</strong> 6 à 12 semaines.</LI>
        </UL>
        <P>
          Comptez toujours une marge pour les allers-retours. Même avec un brief précis, deux ou trois cycles
          de retours sont la norme et sont le signe d'un travail sérieux, pas d'un retard.
        </P>

        <H2>Que doit contenir un bon devis d'identité visuelle ?</H2>
        <P>
          Un devis clair n'est pas une simple liste de prix : c'est un document qui protège les deux parties
          et définit ce qui est inclus, et surtout ce qui ne l'est pas. Voici les points à vérifier avant de
          signer, et le risque concret quand ils manquent.
        </P>
        <PriceTable
          head={['Point du devis', 'Statut', 'Risque si absent']}
          rows={[
            ['Cession des droits d\'auteur explicite', 'Indispensable', 'Vous n\'êtes pas propriétaire du logo.'],
            ['Étendue, territoire et durée de la cession', 'Indispensable', 'Un usage limité dans le temps ou l\'espace.'],
            ['Liste précise des livrables', 'Indispensable', 'Des fichiers manquants, refacturés ensuite.'],
            ['Remise des fichiers sources', 'À négocier', 'Une dépendance totale au prestataire.'],
            ['Nombre de concepts et d\'allers-retours', 'Indispensable', 'Des surcoûts non anticipés.'],
            ['Clause d\'exclusivité', 'Recommandé', 'Un logo similaire revendu à un concurrent.'],
            ['Délais de livraison réalistes', 'Indispensable', 'Un projet qui glisse sans recours.'],
            ['Conditions financières (HT, TTC, acompte)', 'Indispensable', 'Des malentendus sur le paiement.'],
          ]}
          caption="La checklist d'un devis d'identité visuelle sérieux. Un devis vague, sans droits ni livrables détaillés, est le premier signal d'alerte."
        />
        <P>
          Un devis anormalement bas ou qui reste flou sur ces points mérite d'être questionné avant toute
          signature. Un bon prestataire documente précisément ce qu'il livre, et n'a aucune raison de rester
          évasif.
        </P>

        <H2>Les 3 erreurs de budget à éviter</H2>
        <P>
          Sur ce marché, les mauvaises surprises viennent rarement du prix affiché, mais de ce qu'on n'avait
          pas anticipé. Trois pièges reviennent le plus souvent.
        </P>
        <UL>
          <LI><strong>Choisir uniquement au prix le plus bas.</strong> Un logo à 30 € ou généré
          automatiquement finit presque toujours par être refait. Vous payez alors deux fois, et vous perdez
          du temps et de la crédibilité entre les deux.</LI>
          <LI><strong>Oublier les coûts cachés.</strong> Les déclinaisons, les fichiers sources, la cession
          de droits ou un support de dernière minute peuvent être facturés en supplément s'ils ne sont pas
          dans le devis initial. Faites tout chiffrer dès le départ.</LI>
          <LI><strong>Tout vouloir d'un coup sans priorités.</strong> Si votre budget est serré, mieux vaut
          un logo et une charte de base solides maintenant, puis une extension plus tard, qu'une grosse
          prestation à moitié aboutie. Un bon prestataire vous aide à séquencer.</LI>
        </UL>

        <H2>Les questions à poser avant de choisir votre prestataire</H2>
        <P>
          Le prix ne dit pas tout. Deux devis au même montant peuvent cacher des prestations très
          différentes. Avant de signer, posez systématiquement ces questions : elles révèlent le sérieux du
          prestataire et vous évitent les mauvaises surprises.
        </P>
        <UL>
          <LI><strong>Les fichiers sources sont-ils inclus ?</strong> Sans les formats éditables (AI, EPS,
          SVG), vous ne possédez qu'une image plate.</LI>
          <LI><strong>La cession des droits d'auteur est-elle totale et écrite ?</strong> C'est ce qui fait
          que le logo vous appartient vraiment.</LI>
          <LI><strong>Combien de pistes et d'allers-retours sont compris ?</strong> Une seule proposition sans
          révision est un signal d'alerte.</LI>
          <LI><strong>Y a-t-il une phase de stratégie en amont ?</strong> C'est elle qui différencie une
          identité durable d'un joli dessin interchangeable.</LI>
          <LI><strong>Le portfolio montre-t-il des projets comparables au vôtre ?</strong> Vérifiez la
          diversité et la cohérence des réalisations, pas seulement leur esthétique.</LI>
        </UL>
        <P>
          Un prestataire qui répond clairement à ces cinq questions vous fera gagner un temps précieux, quel
          que soit son prix. Un prestataire qui les élude, même bon marché, vous coûtera cher au final.
        </P>

        <H2>Comment optimiser votre budget d'identité visuelle sans sacrifier la qualité</H2>
        <P>
          Optimiser un budget d'identité visuelle ne veut pas dire chercher le prix le plus bas, mais mettre
          chaque euro là où il crée le plus de valeur pour votre marque. Voici les leviers qui font la
          différence, quel que soit votre budget de départ.
        </P>
        <UL>
          <LI><strong>Priorisez le socle.</strong> Un logo solide, une palette et une typographie cohérentes
          valent mieux qu'une longue liste de supports mal pensés. Le socle d'abord, les extensions ensuite.</LI>
          <LI><strong>Fournissez un brief clair.</strong> Plus votre brief est précis (références, valeurs,
          cible), moins il y a d'allers-retours facturés. Un bon brief peut réduire sensiblement le coût
          final.</LI>
          <LI><strong>Groupez ce qui va ensemble.</strong> Commander un logo, puis une charte, puis des
          gabarits séparément coûte souvent plus cher qu'un pack cohérent commandé d'un bloc.</LI>
          <LI><strong>Exigez les fichiers sources et la cession de droits.</strong> Ce ne sont pas des
          options : sans eux, chaque évolution future vous sera refacturée. C'est le meilleur investissement
          de protection à long terme.</LI>
          <LI><strong>Choisissez la bonne échelle de prestataire.</strong> Payer un prix d'agence pour un
          besoin simple, ou confier une marque à fort enjeu à un tarif de logo d'entrée de gamme : deux
          erreurs symétriques. L'adéquation prestataire-besoin est le premier levier d'optimisation.</LI>
        </UL>
        <P>
          Bien piloté, un budget d'identité visuelle même modeste peut produire un résultat professionnel et
          durable. Mal piloté, un gros budget peut se diluer dans des livrables inutiles. La différence se
          joue moins sur le montant que sur les priorités et la clarté de votre demande.
        </P>

        <H2>Quel retour sur investissement attendre ?</H2>
        <P>
          Une identité visuelle n'est pas une dépense, c'est un actif. Une marque cohérente inspire confiance,
          se retient plus facilement et justifie des prix plus élevés. Une étude de l'université Loyola indique
          que la couleur seule augmente la reconnaissance d'une marque de près de 80 %. Au-delà du chiffre,
          l'effet est concret sur trois plans.
        </P>
        <UL>
          <LI><strong>La reconnaissance :</strong> une identité mémorable réduit votre coût d'acquisition sur
          la durée. Une marque immédiatement reconnaissable dépense moins en publicité pour rester en tête.</LI>
          <LI><strong>Le positionnement perçu :</strong> une identité soignée permet souvent de facturer plus
          cher, car elle élève la perception de qualité de votre offre.</LI>
          <LI><strong>La cohérence :</strong> une charte bien construite fait gagner du temps et de l'argent à
          vos équipes et prestataires, qui n'ont plus à réinventer chaque support.</LI>
        </UL>
        <P>
          Un cadre simple pour estimer votre retour : additionnez le gain de conversion (une image plus
          professionnelle qui améliore votre taux de transformation), le gain tarifaire (un positionnement qui
          justifie des prix plus élevés) et l'économie publicitaire (une marque mieux mémorisée). Si la somme
          sur trois ans dépasse le coût de l'identité, l'investissement est justifié, ce qui est le cas pour
          la grande majorité des entreprises. À l'inverse, une identité bâclée devra souvent être refaite, ce
          qui coûte toujours plus cher qu'un projet bien mené dès le départ.
        </P>

        <H2>Refonte ou création : quel budget d'identité visuelle prévoir ?</H2>
        <P>
          Toutes les demandes ne partent pas de zéro. Beaucoup d'entreprises ont déjà un logo mais veulent le
          moderniser, ou faire évoluer leur identité pour accompagner une nouvelle étape. Le prix d'une
          identité visuelle n'est pas le même selon que vous créez ou que vous rafraîchissez.
        </P>
        <UL>
          <LI><strong>Rafraîchissement léger (lifting) :</strong> 800 à 2 500 €. On garde l'essentiel et on
          modernise les détails (typographie, couleurs, proportions). Idéal quand votre marque est encore
          reconnue mais paraît datée.</LI>
          <LI><strong>Refonte complète (rebranding) :</strong> 3 000 à 15 000 € et plus. On repense le logo,
          la charte et souvent le positionnement. Pertinent lors d'un changement de cap, d'une fusion ou d'une
          montée en gamme.</LI>
          <LI><strong>Création from scratch :</strong> 1 500 à 15 000 € selon l'ampleur. Vous partez d'une
          page blanche, ce qui laisse toute liberté créative mais demande une phase de cadrage plus longue.</LI>
        </UL>
        <P>
          Un conseil : ne refondez pas une identité qui fonctionne juste par lassitude interne. Vos clients
          voient votre marque bien moins souvent que vous. En revanche, si votre image vous dessert
          commercialement, la refonte se rentabilise vite. Notre guide{' '}
          <A href="/guides/quand-refaire-son-site">quand refaire son site</A> applique la même logique de
          décision à votre présence en ligne.
        </P>

        <H2>Prix identité visuelle : les erreurs de comparaison à éviter</H2>
        <P>
          Comparer deux devis d'identité visuelle uniquement sur le prix total, c'est comme comparer deux
          voitures sur leur seul prix d'achat, sans regarder la consommation, la fiabilité ni la revente.
          Voici les biais de comparaison qui coûtent le plus cher.
        </P>
        <UL>
          <LI><strong>Comparer un logo seul avec une identité complète.</strong> Ce ne sont pas les mêmes
          livrables. Un prix identité visuelle bas cache souvent un périmètre réduit.</LI>
          <LI><strong>Oublier la valeur des droits.</strong> Un logo sans cession de droits ni fichiers
          sources n'est pas moins cher, il est incomplet. Le vrai coût apparaît le jour où vous voulez le
          décliner ou le faire imprimer.</LI>
          <LI><strong>Ignorer la phase de stratégie.</strong> Deux devis identiques en prix peuvent recouvrir
          l'un une simple exécution, l'autre une vraie réflexion de marque. La différence se voit sur le
          résultat, pas sur la facture.</LI>
          <LI><strong>Sous-estimer le suivi.</strong> Un bon prestataire reste joignable pour les déclinaisons
          futures. Un logo livré puis abandonné vous laisse seul face à vos besoins suivants.</LI>
        </UL>
        <Callout title="Le bon réflexe : comparer la valeur, pas seulement le prix">
          Demandez toujours à ce que chaque devis détaille les livrables, les droits et le nombre de pistes.
          Vous comparerez alors des prestations comparables, et le prix retrouvera son vrai sens : celui de ce
          que vous obtenez réellement.
        </Callout>

        <H2>Prix charte graphique, logo, identité : le récapitulatif</H2>
        <P>
          Pour vous aider à mémoriser l'essentiel, voici la synthèse des fourchettes de prix abordées dans ce
          guide. Gardez en tête que ces repères servent à situer votre projet, jamais à remplacer un devis
          personnalisé qui, seul, tient compte de votre besoin réel.
        </P>
        <PriceTable
          head={['Prestation', 'Fourchette de prix 2026', 'Pour qui']}
          rows={[
            ['Prix logo (freelance)', '300 à 1 500 €', 'TPE, indépendants, projets clairs'],
            ['Prix logo agence / studio', '1 500 à 8 000 €', 'Marques à fort enjeu de différenciation'],
            ['Prix charte graphique', '500 à 15 000 €', 'Toute marque qui veut de la cohérence'],
            ['Pack logo + charte', '1 500 à 8 000 €', 'La demande la plus fréquente en PME'],
            ['Identité visuelle complète', '1 500 à 15 000 €+', 'Marques structurées, e-commerce, startups'],
            ['Rebranding', '3 000 à 15 000 €+', 'Repositionnement, fusion, montée en gamme'],
          ]}
          caption="Synthèse des prix : logo, charte graphique et identité visuelle complète, marché français 2026."
        />

        <H2>Faut-il investir dans une identité visuelle quand on démarre ?</H2>
        <P>
          C'est l'hésitation classique de l'entrepreneur qui lance son activité : mieux vaut-il consacrer son
          budget à une identité visuelle soignée, ou le garder pour le produit et l'acquisition de clients ?
          La réponse honnête : tout dépend de la place de l'image dans votre marché, mais négliger totalement
          son identité coûte presque toujours plus cher à terme.
        </P>
        <P>
          Une identité bâclée envoie un signal, même inconscient, à vos prospects : si le logo semble amateur,
          le service est-il sérieux ? À l'inverse, une identité même simple mais cohérente crée immédiatement
          un capital confiance. Vous n'avez pas besoin d'un budget d'agence dès le premier jour, mais d'un
          socle propre : un logo lisible, deux ou trois couleurs, une typographie, et la cohérence de bout en
          bout. C'est précisément ce qu'un pack logo + charte à 1 500 à 4 000 € vous apporte.
        </P>
        <P>
          La bonne stratégie quand le budget est serré : investir dans un socle de qualité maintenant, puis
          étendre progressivement (gabarits, supports, brand book) à mesure que l'activité grandit. Mieux vaut
          un socle solide et évolutif qu'une grosse prestation à moitié aboutie, ou pire, un logo gratuit que
          vous devrez refaire dans un an. Rappelez-vous : le prix d'une identité visuelle refaite deux fois
          dépasse toujours celui d'une identité bien pensée dès le départ.
        </P>
        <Callout>
          Chez GND, nous aidons aussi les jeunes structures à séquencer leur investissement : un socle d'abord,
          des extensions ensuite, sans jamais vous faire repartir de zéro. Votre identité grandit avec vous.
        </Callout>

        <H2>Prix d'un pack logo + charte graphique : la formule la plus demandée</H2>
        <P>
          Dans la pratique, la demande la plus fréquente en PME n'est ni le logo seul ni l'identité complète,
          mais le pack logo + charte graphique. C'est le meilleur compromis : vous obtenez un logo
          professionnel et les règles qui garantissent sa bonne utilisation partout, sans payer pour des
          livrables dont vous n'avez pas encore l'usage. Comptez 1 500 à 4 000 € chez un freelance confirmé,
          et 3 500 à 8 000 € en studio.
        </P>
        <P>
          Ce format couvre l'essentiel des besoins d'une entreprise qui démarre ou se structure : un logo et
          ses variantes, une palette de couleurs, une ou deux typographies, et une charte qui explique comment
          tout assembler. Vous pouvez ensuite étendre progressivement (gabarits réseaux sociaux, papeterie,
          signalétique) au fil de vos besoins, sans repartir de zéro. C'est souvent le point de départ idéal
          avant d'investir, plus tard, dans un brand book complet.
        </P>
        <P>
          Si vous hésitez sur le périmètre, le plus simple reste de demander un devis de logo professionnel
          détaillé : un bon prestataire vous proposera le pack adapté à votre stade, sans vous sur-vendre.
        </P>

        <H2>Exemples concrets de budget d'identité visuelle</H2>
        <P>
          Rien ne vaut des cas réels pour situer un prix d'identité visuelle. Voici trois profils types et le
          budget cohérent pour chacun, avec ce que ce budget finance concrètement.
        </P>
        <H3>Un restaurant de quartier</H3>
        <P>
          Budget cohérent : 1 500 à 3 000 €. Il finance un logo qui fonctionne en enseigne comme sur un menu,
          une palette et une typographie appétissantes, des gabarits pour les réseaux sociaux et un format
          prêt pour l'imprimeur (carte, flyer). L'objectif est la cohérence entre la devanture, le menu et
          Instagram, un vrai levier de fréquentation locale.
        </P>
        <H3>Un artisan du bâtiment</H3>
        <P>
          Budget cohérent : 800 à 2 000 €. Il finance un logo lisible et robuste, décliné sur un véhicule, un
          devis, une carte de visite et une enseigne. Ici, la priorité n'est pas la sophistication mais la
          clarté et la confiance immédiate qu'inspire une image soignée face à un concurrent au logo bricolé.
        </P>
        <H3>Une startup SaaS</H3>
        <P>
          Budget cohérent : 5 000 à 12 000 €. Il finance une identité qui tient face aux investisseurs et aux
          recrutements : logo, système de couleurs et de composants, plateforme de marque, et déclinaisons
          pour le produit, le site et les supports de levée. À ce niveau, l'identité est un actif stratégique
          autant qu'esthétique.
        </P>
        <P>
          Dans les trois cas, le prix suit le rôle que joue l'image dans la décision d'achat. Un prestataire
          sérieux part toujours de votre réalité, pas d'un tarif standard.
        </P>

        <H2>Combien coûte une identité visuelle chez GND ?</H2>
        <P>
          GND travaille votre identité sur-mesure, avec un devis personnalisé selon votre besoin réel plutôt
          qu'une grille figée. Notre modèle de studio réunit stratégie, direction créative et exécution, avec
          une méthode hybride où l'humain signe et l'IA accélère. Vous repartez toujours propriétaire de vos
          fichiers sources, avec une cession de droits claire. Réponse sous 24h, devis sous 48h, sans
          engagement. Découvrez notre{' '}
          <A href="/services/branding-identite">approche branding et identité visuelle</A>, ou{' '}
          <A href="/contact">parlons de votre projet</A>.
        </P>
      </>
    ),
    faq: [
      { q: "Quel est le prix d'une identité visuelle complète en 2026 ?", a: "De 1 500 à 4 000 € chez un freelance, de 4 000 à 6 000 € en studio, et de 6 000 à plus de 15 000 € en agence. Pour la majorité des TPE et PME, une identité professionnelle et durable se situe entre 1 500 et 4 000 €. Le prix dépend de l'ampleur, du niveau de recherche créative et des livrables." },
      { q: "Combien coûte un logo professionnel ?", a: "Entre 300 et 800 € chez un freelance junior, 800 à 1 500 € chez un freelance confirmé (le meilleur rapport qualité-prix pour une PME), et 1 500 à 8 000 € et plus en studio ou agence. Méfiez-vous des logos à moins de 50 € : ils arrivent souvent sans fichiers sources ni cession de droits." },
      { q: "Combien coûte une charte graphique ?", a: "De 500 à 1 500 € pour une charte basique chez un freelance, 1 500 à 3 000 € pour une charte complète, et 3 000 à 15 000 € pour une charte stratégique en studio ou agence. Le prix dépend du nombre de supports couverts et de la profondeur des règles." },
      { q: "Quelle différence entre un logo et une identité visuelle ?", a: "Le logo est un seul élément. L'identité visuelle complète regroupe le logo, ses variantes, les couleurs, la typographie, les éléments graphiques et la charte qui encadre le tout. C'est le socle de toute votre communication." },
      { q: "Freelance, studio ou agence : que choisir ?", a: "Le freelance (300 à 4 000 €) pour un projet clair et un budget serré. Le studio (3 000 à 8 000 €) pour la cohérence d'une équipe sans les frais d'une grande agence : c'est le modèle de GND. L'agence (6 000 à 15 000 €+) pour les projets complexes à fort enjeu." },
      { q: "Le prix inclut-il la cession des droits d'auteur ?", a: "Pas automatiquement, et c'est un piège fréquent. En droit français, l'auteur garde ses droits tant qu'il ne les a pas cédés par écrit. Exigez une clause de cession complète et définitive dans le devis. Chez GND, elle est toujours incluse." },
      { q: "Vais-je récupérer les fichiers sources ?", a: "C'est le point clé à vérifier. Les fichiers sources (AI, EPS, SVG) permettent d'agrandir, décliner et faire imprimer votre logo. Sans eux, vous n'avez qu'une image plate inexploitable. Chez GND, vous repartez toujours avec vos fichiers sources." },
      { q: "Combien de temps prend la création d'une identité visuelle ?", a: "Comptez 1 à 2 semaines pour un logo simple, 3 à 6 semaines pour une identité complète, et 6 à 12 semaines avec une stratégie de marque. Prévoyez une marge pour les allers-retours, qui sont normaux." },
      { q: "Une identité générée par IA, ça vaut le coup ?", a: "Une IA seule produit un visuel rapide mais générique, sans stratégie et avec des droits flous. La vraie valeur vient de l'IA combinée à une direction créative humaine : la vitesse d'exploration de l'IA et la singularité d'un regard humain. C'est l'approche de GND." },
      { q: "Que doit contenir un bon devis d'identité visuelle ?", a: "Le détail des livrables (fichiers sources inclus), le nombre de concepts et d'allers-retours, la cession complète des droits d'auteur, les délais réalistes, et les conditions financières (HT, TTC, acompte). Un devis vague ou anormalement bas est un signal d'alerte." },
      { q: "Combien coûte une identité visuelle chez GND ?", a: "GND travaille sur-mesure : le prix dépend de votre besoin réel, avec un devis personnalisé sous 48h. Notre modèle de studio réunit stratégie, direction créative et exécution, avec une méthode où l'humain signe et l'IA accélère. Vous gardez la propriété de vos fichiers sources." },
      { q: "Quel est le tarif de création d'un logo ?", a: "Le tarif de création d'un logo va de 0 à 100 € par une IA ou un générateur, 50 à 300 € sur une plateforme d'entrée de gamme, 300 à 800 € chez un freelance junior, 800 à 1 500 € chez un freelance confirmé, et 1 500 à 5 000 € en studio. L'écart s'explique par la stratégie, l'exclusivité et les droits, pas seulement par le dessin." },
      { q: "Quelle différence de prix entre un logo freelance et un logo agence ?", a: "Un logo freelance coûte généralement 300 à 1 500 €, un logo en agence 2 000 à 8 000 €. Le prix agence intègre une équipe, un processus et un suivi. Le bon calcul se fait sur la durée de vie du logo (5 à 10 ans) : l'écart annuel est souvent marginal au regard de ce que le logo porte pour votre marque." },
      { q: "Comment obtenir un devis de logo professionnel ?", a: "Préparez votre besoin (logo seul, logo + charte ou identité complète), vos supports prioritaires, deux ou trois références visuelles et un budget indicatif. Un prestataire sérieux vous renvoie un devis détaillé sous quelques jours. Chez GND, le devis personnalisé arrive sous 48h, sans engagement." },
      { q: "Le prix d'une identité visuelle change-t-il selon le secteur ?", a: "Oui. Comptez 1 200 à 4 000 € pour un restaurant, 800 à 2 500 € pour un artisan, 4 000 à 15 000 € pour une startup ou un SaaS, 1 500 à 5 000 € pour un cabinet, et 6 000 à 20 000 € et plus pour une marque premium. Le prix suit le niveau d'exigence visuelle de votre marché." },
    ],
  },

  'logo-freelance-ou-agence': {
    body: (
      <>
        <Lead>
          Pour un logo simple et un budget serré, un freelance fait très bien le travail. Pour une marque
          qui veut une vraie démarche (recherche, déclinaisons, cohérence dans le temps), une agence ou un
          studio rassure. Dans les deux cas, exigez les fichiers sources : c'est ce qui garantit que le
          logo est vraiment le vôtre.
        </Lead>

        <H2>Logo par un freelance : forces et limites</H2>
        <P>
          Le freelance offre proximité, réactivité et un tarif souvent plus accessible. C'est un bon choix
          pour un logo ponctuel. Les limites : la continuité (s'il n'est plus disponible) et le périmètre
          (il est rarement à la fois logo, charte, et stratégie de marque).
        </P>

        <H2>Logo par une agence ou un studio : forces et limites</H2>
        <P>
          Une agence ou un studio inscrit le logo dans une identité complète, avec plusieurs compétences
          et une cohérence sur l'ensemble de vos supports. C'est plus structurant, à un coût plus élevé.
          Le bon intermédiaire pour une PME est souvent le studio hybride, qui garde la proximité tout en
          offrant la pluri-compétence.
        </P>

        <H2>La vraie question : les droits et les fichiers sources</H2>
        <P>
          Au-delà du prix, vérifiez ce que vous récupérez : les fichiers sources vectoriels, les droits
          d'usage complets, et les déclinaisons. Un logo livré uniquement en image, sans source, vous
          enferme. C'est le même principe que pour un site : mieux vaut être propriétaire.
        </P>

        <H2>Comment choisir selon votre projet ?</H2>
        <P>
          Logo seul, besoin rapide, budget limité : un freelance suffit. Marque à construire, plusieurs
          supports, cohérence dans la durée : une agence ou un studio se justifie. Pour comprendre les
          budgets, lisez notre guide{' '}
          <A href="/guides/prix-identite-visuelle">combien coûte une identité visuelle</A>.
        </P>

        <H2>L'approche GND</H2>
        <P>
          GND est un studio hybride : proximité du freelance, pluri-compétence d'une équipe, et fichiers
          sources remis. Voir la <A href="/services/branding-identite">page branding</A>, ou{' '}
          <A href="/contact">parlons de votre logo</A>.
        </P>
      </>
    ),
    faq: [
      { q: "Logo freelance ou agence : lequel choisir ?", a: "Freelance pour un logo simple, rapide et à budget serré. Agence ou studio pour une marque à construire, avec déclinaisons et cohérence dans le temps. Dans les deux cas, exigez les fichiers sources." },
      { q: "Pourquoi un logo d'agence coûte-t-il plus cher ?", a: "Parce qu'il s'inscrit dans une démarche de marque : recherche, plusieurs compétences, déclinaisons, cohérence sur tous les supports. Un freelance facture surtout le logo lui-même." },
      { q: "Vais-je récupérer les fichiers sources de mon logo ?", a: "C'est le point à verrouiller avant de signer. Sans fichiers sources vectoriels, vous ne pouvez pas faire évoluer votre logo librement. Chez GND, les sources vous sont remises." },
      { q: "Un logo pas cher est-il un mauvais choix ?", a: "Pas toujours, mais attention aux logos très bon marché livrés sans source ni déclinaison : ils coûtent plus cher à corriger ensuite. Regardez ce qui est inclus." },
      { q: "Le studio hybride, c'est quoi par rapport au freelance et à l'agence ?", a: "C'est une petite structure qui garde la proximité du freelance tout en offrant la pluri-compétence d'une équipe. C'est le modèle de GND." },
    ],
  },

  'prix-clip-musical': {
    body: (
      <>
        <Lead>
          Le prix d'un clip musical varie énormément selon l'ambition. Pour un artiste indépendant, on
          démarre à quelques centaines d'euros. Pour une production léchée, proche du cinéma, le budget
          peut dépasser dix mille euros. Ce qui fait le prix : l'équipe, le matériel, les décors, et le
          temps de préparation et de montage.
        </Lead>

        <H2>Combien coûte un clip musical ?</H2>
        <P>
          Sur le marché, les fourchettes observées vont de quelques centaines d'euros (format simple,
          petite équipe) à plus de dix mille euros (réalisation ambitieuse, plusieurs jours de tournage,
          post-production poussée). Un artiste indépendant et un label n'ont ni les mêmes besoins ni les
          mêmes budgets.
        </P>

        <H2>Ce qui fait varier le budget</H2>
        <P>
          Cinq facteurs principaux : la taille de l'équipe, le matériel (caméras, lumière, machinerie),
          les décors et lieux de tournage, le nombre de jours, et l'ampleur de la post-production
          (montage, étalonnage, effets). Un clip tourné en une demi-journée n'a rien à voir avec une
          production sur plusieurs jours.
        </P>

        <H2>Clip d'artiste indépendant ou de label : quelles différences ?</H2>
        <P>
          L'artiste indépendant cherche souvent le meilleur impact avec un budget maîtrisé : on
          privilégie une idée forte et une exécution propre. Un label peut viser une production plus
          ambitieuse, avec une équipe élargie. Dans les deux cas, c'est l'idée et la direction artistique
          qui font la différence, pas seulement le budget.
        </P>

        <H2>Comment dépenser utile ?</H2>
        <P>
          Mettez le budget là où il se voit : un concept clair, une belle image, un montage rythmé.
          Évitez de disperser l'argent sur des effets gadgets. Un bon clip raconte quelque chose et sert
          l'artiste, avant d'aligner les moyens techniques.
        </P>

        <H2>Combien chez GND ?</H2>
        <P>
          L'audiovisuel est l'activité historique de GND. Chaque clip fait l'objet d'un devis selon votre
          ambition et votre budget, avec une direction artistique soignée. Voir nos{' '}
          <A href="/realisations">réalisations</A> et la{' '}
          <A href="/services/audiovisuel">page audiovisuel</A>, ou{' '}
          <A href="/contact">parlons de votre projet</A>.
        </P>
      </>
    ),
    faq: [
      { q: "Combien coûte un clip musical en France ?", a: "Selon l'ambition, de quelques centaines d'euros pour un format simple à plus de dix mille euros pour une production proche du cinéma. C'est une fourchette de marché, le devis dépend de votre projet." },
      { q: "Qu'est-ce qui fait varier le prix d'un clip ?", a: "La taille de l'équipe, le matériel, les décors et lieux, le nombre de jours de tournage, et l'ampleur de la post-production (montage, étalonnage, effets)." },
      { q: "Quel budget pour un clip d'artiste indépendant ?", a: "On peut démarrer avec un budget maîtrisé en misant sur une idée forte et une exécution propre plutôt que sur de gros moyens. L'important est la direction artistique." },
      { q: "Combien de temps pour réaliser un clip ?", a: "Cela dépend de l'ampleur : de quelques jours pour un format simple à plusieurs semaines avec préparation, tournage et post-production. Devis et planning détaillés sous 48h." },
      { q: "Combien coûte un clip chez GND ?", a: "GND établit un devis selon votre ambition et votre budget, avec une direction artistique soignée. Réponse sous 24h, devis sous 48h." },
    ],
  },

  'tarif-video-entreprise': {
    body: (
      <>
        <Lead>
          Une vidéo d'entreprise va, selon le format, de l'ordre du millier d'euros (interview courte,
          captation simple) à plusieurs milliers d'euros (film institutionnel soigné, plusieurs jours de
          tournage). Le prix dépend du format, de l'équipe, du tournage et de la post-production.
        </Lead>

        <H2>Combien coûte une vidéo d'entreprise ?</H2>
        <P>
          Les fourchettes de marché varient selon l'ampleur. Une interview ou un format court mobilisent
          peu de moyens. Un film institutionnel avec scénario, plusieurs lieux et une post-production
          soignée représente un budget plus élevé. Le motion design et l'animation suivent leur propre
          logique de prix.
        </P>

        <H2>Les formats et leurs budgets</H2>
        <P>
          Interview ou témoignage client : format efficace et accessible. Film institutionnel : présente
          l'entreprise, demande plus de préparation. Brand content et vidéo de marque : production plus
          créative. Capsules pour les réseaux sociaux : format court, souvent par lot. Chaque format a son
          niveau d'investissement.
        </P>

        <H2>Ce qui fait varier le devis</H2>
        <P>
          Le nombre de jours de tournage, la taille de l'équipe, le matériel, le nombre de lieux, et
          l'ampleur de la post-production (montage, étalonnage, motion, sous-titres). Les droits musicaux
          et la déclinaison en plusieurs formats jouent aussi.
        </P>

        <H2>Comment investir intelligemment ?</H2>
        <P>
          Partez de l'objectif : convaincre un prospect, recruter, expliquer un produit. Le bon format
          découle de l'usage, pas l'inverse. Une vidéo bien ciblée et réutilisable sur plusieurs canaux
          rentabilise mieux qu'une grosse production unique mal diffusée.
        </P>

        <H2>Combien chez GND ?</H2>
        <P>
          GND gère la vidéo d'entreprise de l'écriture à la livraison, en interne, avec un devis selon
          votre besoin. Voir la <A href="/services/audiovisuel">page audiovisuel</A> et nos{' '}
          <A href="/realisations">réalisations</A>, ou <A href="/contact">demandez un devis</A>.
        </P>
      </>
    ),
    faq: [
      { q: "Combien coûte une vidéo d'entreprise ?", a: "Selon le format, de l'ordre du millier d'euros pour une interview courte à plusieurs milliers pour un film institutionnel soigné. Le prix dépend du tournage, de l'équipe et de la post-production." },
      { q: "Quel format de vidéo pour mon entreprise ?", a: "Cela dépend de l'objectif : interview ou témoignage pour la preuve, film institutionnel pour présenter l'entreprise, brand content pour l'image, capsules courtes pour les réseaux sociaux." },
      { q: "Qu'est-ce qui fait varier le prix ?", a: "Le nombre de jours de tournage, la taille de l'équipe, le matériel, le nombre de lieux, et l'ampleur de la post-production (montage, étalonnage, motion, sous-titres)." },
      { q: "Combien de temps pour produire une vidéo d'entreprise ?", a: "Variable selon l'ampleur, de quelques jours à plusieurs semaines avec préparation, tournage et montage. GND donne un planning détaillé avec le devis." },
      { q: "Combien coûte une vidéo d'entreprise chez GND ?", a: "GND établit un devis selon votre besoin, de l'écriture à la livraison, tout en interne. Réponse sous 24h, devis sous 48h." },
    ],
  },

  'prix-agent-ia-pme': {
    body: (
      <>
        <Lead>
          Le prix d'un agent IA pour une PME va de quelques centaines d'euros pour un chatbot simple à
          plusieurs dizaines de milliers d'euros pour un système d'automatisation intégré à votre SI. Mais
          le vrai sujet n'est pas le prix affiché : c'est le coût total, car derrière un devis d'agent IA se
          cachent presque toujours trois postes que la plupart des prestataires n'affichent pas d'emblée, le
          setup, les coûts d'API et la maintenance. Les ignorer, c'est découvrir une facture deux à trois fois
          supérieure à ce que vous aviez prévu.
        </Lead>
        <P>
          Ce guide vous donne les vrais tarifs du marché français en 2026, le comparatif entre une solution
          SaaS et un agent sur-mesure, les coûts récurrents souvent oubliés, et de quoi estimer votre retour
          sur investissement avant de vous lancer.
        </P>

        <H2>Qu'est-ce qu'un agent IA, et pourquoi ça change le prix ?</H2>
        <P>
          Le terme « agent IA » recouvre des réalités très différentes, et le prix suit directement le niveau
          d'autonomie. Un chatbot simple répond à des questions à partir d'une base de connaissances. Un agent
          IA métier enchaîne plusieurs étapes seul (lire un email, extraire des informations, les comparer à
          une base, rédiger et envoyer une réponse), en s'appuyant sur un modèle de langage et sur vos outils.
          Un agent multi-tâches ou un système d'automatisation orchestre plusieurs workflows en parallèle, avec
          des logiques conditionnelles et des intégrations profondes dans votre système d'information. Plus
          l'agent est autonome, capable et connecté, plus la conception, l'hébergement et la maintenance
          coûtent cher.
        </P>

        <H2>Combien coûte un agent IA pour une PME ? Les fourchettes du marché</H2>
        <P>
          Voici les repères de prix constatés sur le marché français en 2026, selon le type de projet. Ces
          fourchettes couvrent la conception, le développement, les tests et le déploiement, mais pas toujours
          la formation ni les évolutions futures.
        </P>
        <PriceTable
          head={['Type d\'agent IA', 'Setup (conception + déploiement)', 'Coût récurrent / mois', 'Complexité']}
          rows={[
            ['Chatbot simple (FAQ, support)', '500 à 2 000 €', '30 à 100 €', 'Faible'],
            ['Agent IA métier (1 workflow)', '3 000 à 8 000 €', '80 à 300 €', 'Moyenne'],
            ['Agent multi-tâches (workflows connectés)', '8 000 à 20 000 €', '200 à 600 €', 'Élevée'],
            ['Automatisation IA (intégration SI)', '10 000 à 50 000 €', '300 à 1 200 €', 'Très élevée'],
            ['Abonnement SaaS no-code', '0 à 500 €', 'à partir de ~90 €', 'Variable'],
          ]}
          caption="Prix d'un agent IA pour PME en 2026, setup et coût récurrent. Le coût mensuel (API, hébergement, maintenance) est souvent absent des devis."
        />

        <H2>SaaS ou sur-mesure : les deux modèles, deux prix très différents</H2>
        <P>
          La première décision structurante, c'est le choix entre deux modèles économiques opposés.
        </P>
        <H3>Les plateformes SaaS no-code</H3>
        <P>
          Des outils comme Botpress, Copilot Studio ou les briques d'automatisation permettent de construire
          un agent via une interface, sans coder. Avantages : mise en place rapide, coût d'entrée faible, mises
          à jour automatiques. Limites : vous ne possédez pas l'agent, vous dépendez des tarifs et des
          conditions de l'éditeur (souvent facturés en dollars, avec les vraies fonctionnalités réservées aux
          plans à 200 ou 500 $ par mois), et migrer ailleurs coûte cher. La plupart des PME qui démarrent sur
          un petit plan finissent vite sur un plan supérieur.
        </P>
        <H3>L'agent IA sur-mesure</H3>
        <P>
          Un agent sur-mesure est conçu et déployé pour votre contexte, sur des technologies ouvertes (n8n,
          Make, API OpenAI, Anthropic ou Mistral), connecté à vos outils existants (CRM, ERP, email, base
          documentaire). Vous en êtes propriétaire, vous maîtrisez vos données, et il évolue sans dépendre d'un
          éditeur tiers. Le coût de conception est plus élevé au départ, mais le coût total sur trois ans est
          souvent inférieur à un abonnement SaaS équivalent, avec une autonomie complète en prime. C'est le
          modèle de GND : sur-mesure, technologies ouvertes, hébergement maîtrisé et conformité RGPD native.
          Pour choisir la brique technique, voir notre comparatif{' '}
          <A href="/guides/n8n-make-zapier-comparatif">n8n, Make ou Zapier</A>.
        </P>

        <H2>Le vrai coût total : ce que les devis oublient</H2>
        <P>
          C'est le point que la quasi-totalité des présentations commerciales esquivent. Un devis affiche un
          prix de setup attractif sans détailler les coûts qui s'accumulent ensuite. Trois postes sont à
          chiffrer impérativement avant de valider un projet.
        </P>
        <UL>
          <LI><strong>Le coût des tokens et des API :</strong> chaque interaction avec un modèle (GPT-4o,
          Claude, Mistral) consomme des tokens facturés à l'usage. Pour un agent traitant quelques centaines
          d'interactions par jour, comptez de 80 à 250 € par mois selon le modèle et la complexité des prompts.
          Ce poste est presque toujours absent des devis.</LI>
          <LI><strong>L'hébergement et l'infrastructure :</strong> un agent sur-mesure a besoin d'un
          environnement d'exécution (serveur, base de données, parfois un vecteur pour la mémoire). Comptez 20
          à 100 € par mois selon la charge et le niveau de disponibilité.</LI>
          <LI><strong>La maintenance et l'évolution :</strong> les modèles changent, vos processus aussi. Une
          maintenance corrective et évolutive représente en général 10 à 20 % du setup par an. Pour un agent à
          6 000 €, comptez 600 à 1 200 € par an au minimum.</LI>
        </UL>
        <P>
          À cela s'ajoutent deux postes selon votre contexte : la conformité RGPD (hébergement européen,
          pseudonymisation, journalisation, rétention des données) pour les données sensibles, et la formation
          de vos équipes (500 à 1 500 € pour une journée ou deux), sans laquelle l'outil reste sous-exploité.
        </P>

        <H2>Coût total d'un agent IA sur trois ans</H2>
        <P>
          Le prix d'un agent IA se juge sur la durée, pas au ticket d'entrée. Voici ce que représentent les
          principaux scénarios sur trois ans, coûts récurrents compris.
        </P>
        <PriceTable
          head={['Scénario', 'Setup', 'Récurrent sur 3 ans', 'Total 3 ans', 'Propriétaire ?']}
          rows={[
            ['Chatbot SaaS (plan standard)', '~300 €', '~3 200 €', '~3 500 €', 'Non'],
            ['Agent métier sur-mesure (1 workflow)', '5 000 €', '~5 400 €', '~10 400 €', 'Oui'],
            ['Agent multi-tâches sur-mesure', '12 000 €', '~12 600 €', '~24 600 €', 'Oui'],
            ['SaaS avancé (plan pro)', '~500 €', '~7 200 €', '~7 700 €', 'Non'],
          ]}
          caption="Coût total d'un agent IA sur 3 ans selon le modèle. Le SaaS semble moins cher, mais ne vous appartient pas et suit la politique tarifaire de l'éditeur."
        />

        <H2>Pourquoi le « moins cher » peut coûter le plus cher</H2>
        <P>
          Choisir la solution la moins chère à l'instant T sans calculer le coût sur trois à cinq ans est le
          piège classique des projets IA. Une plateforme SaaS ne vous appartient pas : si l'éditeur augmente
          ses tarifs (fréquent dans le secteur), change ses conditions ou disparaît, vous repartez de zéro. Un
          agent sur-mesure est un actif que vous possédez et faites évoluer selon vos besoins. Sur la durée,
          l'écart de prix initial se comble souvent, et la propriété fait la différence.
        </P>

        <H2>Quel retour sur investissement attendre ?</H2>
        <P>
          La vraie question n'est pas « combien ça coûte » mais « combien ça fait gagner ». Un agent IA se juge
          au temps qu'il libère et aux erreurs qu'il évite. Trois leviers de valeur reviennent le plus souvent.
        </P>
        <UL>
          <LI><strong>Le temps gagné :</strong> un agent qui traite les relances, la qualification de leads ou
          le reporting libère plusieurs heures par semaine, soit une fraction d'équivalent temps plein.</LI>
          <LI><strong>Les erreurs évitées :</strong> une saisie ou une réponse automatisée et cadrée réduit les
          oublis et les incohérences, souvent coûteux.</LI>
          <LI><strong>La réactivité :</strong> répondre en secondes, 24h/24, améliore l'expérience client et le
          taux de transformation.</LI>
        </UL>
        <P>
          Exemple simple : un agent à 5 000 € qui fait gagner cinq heures par semaine à une équipe, valorisées
          à 30 € de l'heure, représente environ 7 800 € d'économie par an. Le projet est rentabilisé en moins
          d'un an, maintenance comprise. C'est ce calcul, et non le prix seul, qui doit guider votre décision.
        </P>

        <H2>Comment obtenir un devis fiable pour votre agent IA</H2>
        <P>
          Pour éviter les mauvaises surprises, exigez que le devis chiffre : le setup, le coût récurrent estimé
          (API, hébergement, maintenance), le périmètre exact (cas d'usage, outils connectés), la propriété du
          code et des données, le niveau de conformité RGPD, et la formation. Un prestataire qui reste évasif
          sur les coûts récurrents vous prépare une facture surprise.
        </P>

        <H2>Combien coûte un agent IA chez GND ?</H2>
        <P>
          GND conçoit des agents IA et des automatisations sur-mesure pour PME, sur technologies ouvertes (n8n,
          Make, API des principaux modèles), avec un cadrage RGPD natif et un devis selon votre périmètre réel.
          Vous restez propriétaire du système et de vos données, sans abonnement imposé par un éditeur tiers.
          Nous recommandons de démarrer par un cas d'usage précis et mesurable, puis d'étendre. Découvrez notre{' '}
          <A href="/services/automatisation-ia">approche automatisation et IA</A>, ou{' '}
          <A href="/contact">parlons de votre besoin</A>, réponse sous 24h.
        </P>
      </>
    ),
    faq: [
      { q: "Combien coûte un agent IA pour une PME en 2026 ?", a: "De 500 à 2 000 € pour un chatbot simple, 3 000 à 8 000 € pour un agent métier sur un cas d'usage, 8 000 à 20 000 € pour un agent multi-tâches, et 10 000 à 50 000 € pour une automatisation intégrée au SI. À cela s'ajoute un coût récurrent mensuel (API, hébergement, maintenance) souvent oublié." },
      { q: "Quel est le vrai coût total d'un agent IA ?", a: "Le setup n'est que la partie visible. Ajoutez les tokens et API des modèles (80 à 250 €/mois pour quelques centaines d'interactions/jour), l'hébergement (20 à 100 €/mois) et la maintenance (10 à 20 % du setup par an). Un devis sérieux chiffre ces trois postes." },
      { q: "Vaut-il mieux un agent IA SaaS ou sur-mesure ?", a: "Le SaaS est rapide et peu cher à l'entrée, mais vous ne le possédez pas et suivez les tarifs de l'éditeur. Le sur-mesure coûte plus au départ mais vous appartient, maîtrise vos données et revient souvent moins cher sur 3 ans. GND travaille en sur-mesure, sur technologies ouvertes et conforme RGPD." },
      { q: "Combien coûtent les tokens et l'API d'un agent IA ?", a: "Chaque interaction consomme des tokens facturés à l'usage par le fournisseur du modèle (GPT-4o, Claude, Mistral). Pour un agent traitant quelques centaines d'interactions par jour, comptez 80 à 250 € par mois selon le modèle et la longueur des échanges." },
      { q: "Quel est le tarif d'un chatbot IA pour une entreprise ?", a: "Un chatbot IA simple (FAQ, support de premier niveau) coûte 500 à 2 000 € en conception, plus 30 à 100 € par mois de coût récurrent. En SaaS, comptez un abonnement à partir d'environ 90 € par mois, sans en être propriétaire." },
      { q: "Comment estimer le retour sur investissement d'un agent IA ?", a: "Estimez le temps gagné et les erreurs évitées. Exemple : un agent à 5 000 € qui libère 5 heures par semaine valorisées à 30 €/h représente environ 7 800 € par an, soit une rentabilité en moins d'un an, maintenance comprise." },
      { q: "Combien coûte une automatisation IA pour une PME ?", a: "Une automatisation IA connectée à votre système d'information va de 10 000 à 50 000 € en setup, plus 300 à 1 200 € par mois de coût récurrent, selon le nombre de workflows et la profondeur des intégrations. Le ROI se mesure en temps de travail économisé." },
      { q: "Par où commencer pour ne pas se ruiner ?", a: "Par un cas d'usage précis et mesurable (relances, qualification de leads, reporting), puis étendez. C'est plus sûr et moins coûteux qu'un grand projet lancé d'un coup, et cela permet de mesurer le ROI avant d'investir davantage." },
      { q: "Un agent IA est-il conforme au RGPD ?", a: "Il peut l'être s'il est conçu pour : hébergement sur infrastructure européenne, pseudonymisation des données, journalisation des accès et politique de rétention. Chez GND, la conformité RGPD est native, avec la possibilité d'un hébergement européen et de modèles comme Mistral." },
      { q: "Combien coûte un agent IA chez GND ?", a: "GND établit un devis selon votre périmètre réel, sur technologies ouvertes et avec un cadrage RGPD. Vous restez propriétaire du système et de vos données. Réponse sous 24h, devis sous 48h." },
    ],
  },

  'agent-ia-vs-chatbot': {
    body: (
      <>
        <Lead>
          Un chatbot répond à des questions selon un scénario ou une base de connaissances. Un agent IA
          va plus loin : il raisonne, utilise des outils et accomplit des tâches (mettre à jour un fichier,
          envoyer un email, qualifier un lead). En clair, le chatbot parle, l'agent agit.
        </Lead>

        <H2>Qu'est-ce qu'un chatbot ?</H2>
        <P>
          Un chatbot est une interface de conversation. Il répond à des questions, oriente, donne des
          informations à partir d'un scénario ou d'une base de connaissances. C'est idéal pour le support
          de premier niveau et la réponse aux questions fréquentes.
        </P>

        <H2>Qu'est-ce qu'un agent IA ?</H2>
        <P>
          Un agent IA comprend une demande, décide des étapes, et utilise des outils pour réaliser une
          tâche de bout en bout. Il peut consulter vos données, remplir un CRM, déclencher une relance,
          préparer un document. Il ne se contente pas de répondre, il exécute.
        </P>

        <H2>La différence en pratique</H2>
        <P>
          Posez-vous une question simple : avez-vous besoin de répondre, ou d'agir ? Pour informer vos
          visiteurs, un chatbot suffit. Pour automatiser un processus (qualification, suivi, traitement),
          il faut un agent. Les deux peuvent d'ailleurs se combiner : un chatbot en façade, un agent
          derrière.
        </P>

        <H2>Lequel vous faut-il ?</H2>
        <P>
          Beaucoup de questions répétitives sur votre site : commencez par un chatbot. Des tâches internes
          chronophages à automatiser : visez un agent. Le bon choix dépend de votre objectif réel, pas de
          la mode. Pour le coût, voir notre guide{' '}
          <A href="/guides/prix-agent-ia-pme">combien coûte un agent IA</A>.
        </P>

        <H2>L'approche GND</H2>
        <P>
          GND conçoit aussi bien des chatbots que des agents IA, selon le besoin, avec un cadrage RGPD.
          Voir la <A href="/services/automatisation-ia">page automatisation et IA</A>, ou{' '}
          <A href="/contact">parlons de votre projet</A>.
        </P>
      </>
    ),
    faq: [
      { q: "Quelle différence entre un agent IA et un chatbot ?", a: "Le chatbot répond à des questions selon un scénario ou une base de connaissances. L'agent IA raisonne, utilise des outils et accomplit des tâches de bout en bout. Le chatbot parle, l'agent agit." },
      { q: "Quand un chatbot suffit-il ?", a: "Quand le besoin est de répondre : support de premier niveau, questions fréquentes, orientation des visiteurs. C'est efficace, simple et rapide à mettre en place." },
      { q: "Quand faut-il un agent IA ?", a: "Quand il faut agir, pas seulement répondre : qualifier des leads, mettre à jour un CRM, déclencher des relances, traiter des documents. L'agent automatise un processus complet." },
      { q: "Peut-on combiner les deux ?", a: "Oui. Un chatbot en façade peut s'appuyer sur un agent qui exécute les actions derrière. C'est une configuration courante et efficace." },
      { q: "GND fait-il des chatbots ou des agents IA ?", a: "Les deux, selon votre besoin réel, avec un cadrage RGPD systématique. Réponse sous 24h, devis sous 48h." },
    ],
  },
};

/* ===================== Maillage interne (guides liés + service) =====================
 * Liens contextuels en fin d'article. De vraies balises <a href> crawlables
 * (le routeur SPA intercepte les clics), pas de navigate() impératif. */
type ServiceLink = { href: string; label: string };

/* Slug du guide -> page de service associée. */
const GUIDE_SERVICE: Record<string, ServiceLink> = {
  'freelance-ou-agence': { href: '/services/sites-vitrines', label: 'Sites vitrines' },
  'faut-il-un-site-internet-commerce': { href: '/services/sites-vitrines', label: 'Sites vitrines' },
  'etre-visible-google-local': { href: '/services/sites-vitrines', label: 'Sites vitrines' },
  'quand-refaire-son-site': { href: '/services/sites-vitrines', label: 'Sites vitrines' },
  'etre-proprietaire-de-son-site': { href: '/services/sites-vitrines', label: 'Sites vitrines' },
  'prix-site-vitrine': { href: '/services/sites-vitrines', label: 'Sites vitrines' },
  'charte-graphique-vs-brand-book': { href: '/services/branding-identite', label: 'Branding & identité' },
  'prix-identite-visuelle': { href: '/services/branding-identite', label: 'Branding & identité' },
  'logo-freelance-ou-agence': { href: '/services/branding-identite', label: 'Branding & identité' },
  'prix-clip-musical': { href: '/services/audiovisuel', label: 'Audiovisuel' },
  'tarif-video-entreprise': { href: '/services/audiovisuel', label: 'Audiovisuel' },
  'n8n-make-zapier-comparatif': { href: '/services/automatisation-ia', label: 'Automatisation & IA' },
  'prix-agent-ia-pme': { href: '/services/automatisation-ia', label: 'Automatisation & IA' },
  'agent-ia-vs-chatbot': { href: '/services/automatisation-ia', label: 'Automatisation & IA' },
};

/* Slug du guide -> 2-3 autres guides du même thème (ou proche). */
const RELATED_GUIDES: Record<string, string[]> = {
  // Web / SEO
  'freelance-ou-agence': ['prix-site-vitrine', 'etre-proprietaire-de-son-site', 'quand-refaire-son-site'],
  'faut-il-un-site-internet-commerce': ['etre-visible-google-local', 'prix-site-vitrine', 'etre-proprietaire-de-son-site'],
  'etre-visible-google-local': ['faut-il-un-site-internet-commerce', 'prix-site-vitrine', 'quand-refaire-son-site'],
  'quand-refaire-son-site': ['etre-proprietaire-de-son-site', 'prix-site-vitrine', 'freelance-ou-agence'],
  'etre-proprietaire-de-son-site': ['quand-refaire-son-site', 'freelance-ou-agence', 'prix-site-vitrine'],
  'prix-site-vitrine': ['freelance-ou-agence', 'etre-proprietaire-de-son-site', 'faut-il-un-site-internet-commerce'],
  // Branding
  'charte-graphique-vs-brand-book': ['prix-identite-visuelle', 'logo-freelance-ou-agence'],
  'prix-identite-visuelle': ['charte-graphique-vs-brand-book', 'logo-freelance-ou-agence'],
  'logo-freelance-ou-agence': ['prix-identite-visuelle', 'charte-graphique-vs-brand-book'],
  // Audiovisuel
  'prix-clip-musical': ['tarif-video-entreprise'],
  'tarif-video-entreprise': ['prix-clip-musical'],
  // Automatisation & IA
  'n8n-make-zapier-comparatif': ['prix-agent-ia-pme', 'agent-ia-vs-chatbot'],
  'prix-agent-ia-pme': ['agent-ia-vs-chatbot', 'n8n-make-zapier-comparatif'],
  'agent-ia-vs-chatbot': ['prix-agent-ia-pme', 'n8n-make-zapier-comparatif'],
};

/* Bloc fin d'article : guides liés + service associé. Tout en <a href> natifs. */
function GuideInternalLinks({ slug }: { slug: string }) {
  const service = GUIDE_SERVICE[slug];
  const related = (RELATED_GUIDES[slug] ?? [])
    .map((s) => guideBySlug(s))
    .filter((g): g is GuideMeta => Boolean(g));

  if (related.length === 0 && !service) return null;

  return (
    <section className="mt-20 pt-12 border-t border-text-muted/15" aria-label="Pour aller plus loin">
      <div className="grid gap-10 md:grid-cols-3">
        {related.length > 0 && (
          <div className="md:col-span-2">
            <div className="label-mono text-[10px] tracking-[0.18em] text-accent mb-5">Continuer la lecture</div>
            <ul className="space-y-4">
              {related.map((g) => (
                <li key={g.slug}>
                  <a
                    href={`/guides/${g.slug}`}
                    className="group block rounded-xl border border-text-muted/15 p-5 transition-colors hover:border-accent/50"
                  >
                    <div className="label-mono text-[10px] tracking-[0.18em] text-text-muted mb-1">{g.kicker}</div>
                    <div className="display text-lg md:text-xl text-text-strong leading-snug group-hover:text-accent transition-colors">{g.title}</div>
                    <p className="mt-2 text-sm text-text leading-relaxed">{g.excerpt}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {service && (
          <div>
            <div className="label-mono text-[10px] tracking-[0.18em] text-accent mb-5">Service associé</div>
            <a
              href={service.href}
              className="group block rounded-xl border border-text-muted/15 p-5 transition-colors hover:border-accent/50"
            >
              <div className="display text-lg md:text-xl text-text-strong leading-snug group-hover:text-accent transition-colors">{service.label}</div>
              <p className="mt-2 text-sm text-text leading-relaxed">Découvrir nos formules, ce qui est inclus et les tarifs, sans engagement.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent">Voir le service <Icons.ArrowRight size={13}/></span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ===================== Bloc "Guides utiles" pour les pages de service =====================
 * Réutilisable : <ServiceGuidesBlock service="sites-vitrines" />. Liste 2-4 guides
 * liés au service via de vraies balises <a href> crawlables. */
const SERVICE_GUIDES: Record<string, string[]> = {
  'sites-vitrines': [
    'prix-site-vitrine',
    'faut-il-un-site-internet-commerce',
    'etre-visible-google-local',
    'etre-proprietaire-de-son-site',
  ],
  'branding-identite': [
    'prix-identite-visuelle',
    'charte-graphique-vs-brand-book',
    'logo-freelance-ou-agence',
  ],
  'audiovisuel': [
    'tarif-video-entreprise',
    'prix-clip-musical',
  ],
  'automatisation-ia': [
    'prix-agent-ia-pme',
    'agent-ia-vs-chatbot',
    'n8n-make-zapier-comparatif',
  ],
};

export function ServiceGuidesBlock({ service }: { service: string }) {
  const guides = (SERVICE_GUIDES[service] ?? [])
    .map((s) => guideBySlug(s))
    .filter((g): g is GuideMeta => Boolean(g));
  if (guides.length === 0) return null;

  return (
    <Section className="py-20 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <Kicker>Ressources</Kicker>
          <h2 className="display text-4xl md:text-5xl mt-5 text-text-strong leading-tight">
            Guides <span className="italic text-accent">utiles</span>.
          </h2>
          <p className="mt-5 text-text leading-relaxed">
            Pour préparer votre projet : nos réponses claires, sans jargon.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <a
                href={`/guides/${g.slug}`}
                className="group block h-full rounded-xl border border-text-muted/15 p-5 transition-colors hover:border-accent/50"
              >
                <div className="label-mono text-[10px] tracking-[0.18em] text-text-muted mb-1">{g.kicker}</div>
                <div className="display text-lg md:text-xl text-text-strong leading-snug group-hover:text-accent transition-colors">{g.title}</div>
                <p className="mt-2 text-sm text-text leading-relaxed">{g.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent">Lire le guide <Icons.ArrowRight size={13}/></span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

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

  const pageUrl = `https://www.gndconsulting.fr/guides/${slug}`;
  const shareLinks = [
    { label: 'in', title: 'Partager sur LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
    { label: 'X', title: 'Partager sur X', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(meta.title)}` },
    { label: 'f', title: 'Partager sur Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` },
  ];
  const tags = [catOf(meta), 'Guide GND', GUIDE_SERVICE[slug]?.label ?? 'Studio créatif'];

  return (
    <main id="main" className="pt-24 md:pt-28">
      <FaqJsonLd id={`guide-${slug}`} items={content.faq} />
      {/* Boîte arrondie à fond dégradé englobant tout l'article (disposition
          blog-details Mindycoach), dégradé crème → beige charte. */}
      <div className="mx-3 md:mx-6 rounded-[20px] bg-gradient-to-b from-bg-alt to-[#F2E3D2] py-12 md:py-20 px-4 md:px-10">
        <Container className="!max-w-[1400px]">
          <nav className="label-mono text-[10px] tracking-[0.18em] text-text-muted mb-8" aria-label="Fil d'Ariane">
            <a href="/" className="hover:text-accent">Accueil</a> <span className="text-text-muted/50">/</span>{' '}
            <a href="/guides" className="hover:text-accent">Guides</a> <span className="text-text-muted/50">/</span>{' '}
            <span className="text-text-strong">{meta.title}</span>
          </nav>

          {/* En-tête pleine largeur : image AVANT le titre, méta ENTRE les deux (template). */}
          <div className="pb-12 border-b-2 border-text-strong/10">
            <img
              src={guideImg(slug)}
              alt={meta.title}
              fetchPriority="high"
              decoding="async"
              className="w-full aspect-[16/9] md:aspect-[12/5] object-cover rounded-[20px]"
            />
            {/* Ligne méta : date + auteur (signal E-E-A-T) à gauche, lecture + catégorie à droite. */}
            <div className="mt-5 mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm md:text-base text-text-muted">
              <div className="flex items-center gap-3">
                <span>Mis à jour le {GUIDE_DATE}</span>
                <span className="inline-block w-px h-4 bg-text-strong/20" aria-hidden="true" />
                <span>Par <strong className="text-text-strong font-semibold">l'équipe GND Consulting</strong>, studio créatif humain × IA</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-block bg-bg text-text-strong label-mono text-[10px] tracking-[0.16em] rounded-full px-4 py-1.5">{catOf(meta)}</span>
                <span>{meta.readMin} min de lecture</span>
              </div>
            </div>
            <h1 className="display text-4xl md:text-6xl text-text-strong leading-[1.04] max-w-5xl">{meta.h1}</h1>
          </div>

          {/* Rangée 3/9 : sidebar à gauche, article à droite (template). */}
          <div className="mt-12 grid lg:grid-cols-12 gap-10 lg:gap-12">
            <aside className="lg:col-span-3 order-last lg:order-first" aria-label="Autres guides">
              <GuidesSidebar currentSlug={slug} />
            </aside>
            <div className="lg:col-span-9">
              <article>
                {content.body}
              </article>

              {/* Pied d'article : tags à gauche, partage à droite (template). */}
              <div className="mt-16 pt-5 border-t-2 border-text-strong/10 flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="display text-xl text-text-strong">Tags :</h2>
                  <ul className="flex flex-wrap gap-2.5">
                    {tags.map((t) => (
                      <li key={t}>
                        <a href="/guides#liste" className="inline-block rounded-full bg-accent/10 hover:bg-accent/20 transition-colors px-4 py-1 text-[15px] text-text-strong">{t}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="display text-xl text-text-strong">Partager :</h2>
                  <ul className="flex gap-2.5">
                    {shareLinks.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={s.title}
                          aria-label={s.title}
                          className="flex items-center justify-center w-11 h-11 rounded-full border border-text-strong/15 text-text-strong hover:bg-accent/15 hover:border-accent/40 transition-colors text-sm font-semibold"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQ visible (correspond au balisage FaqJsonLd). */}
              <section className="mt-16" aria-label="Questions fréquentes">
                <div className="max-w-2xl">
                  <Kicker>Questions fréquentes</Kicker>
                  <h2 className="display text-4xl md:text-5xl mt-5 text-text-strong">Toutes les <span className="italic text-accent">réponses</span>.</h2>
                  <p className="mt-6 text-text">Une question qui ne figure pas ici ? Écrivez-nous, réponse sous 24h.</p>
                </div>
                <div className="mt-10 max-w-3xl">
                  {content.faq.map((f) => (
                    <Faq key={f.q} q={f.q} a={f.a} />
                  ))}
                </div>
              </section>

              {/* Maillage interne : guides liés + service associé (liens <a href> crawlables). */}
              <GuideInternalLinks slug={slug} />

              {/* Liens connexes (CTA) */}
              <div className="mt-14 flex flex-wrap gap-3">
                <Btn href={(GUIDE_SERVICE[slug]?.href) ?? '/services/sites-vitrines'} variant="primary">Voir le service associé</Btn>
                <Btn href="/contact" variant="secondary">Parler de votre projet</Btn>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <FloatingCtaBand
        prefix="Votre site"
        rotatingWords={['en tête ?', 'à refaire ?', 'à lancer ?', 'qui vous appartient ?']}
        sub="Studio créatif hybride. Réponse sous 24h, devis sous 48h, sans engagement."
        primaryCta={{ label: 'Démarrer un projet', href: '/contact' }}
      />
    </main>
  );
}

