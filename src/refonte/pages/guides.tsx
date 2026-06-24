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
import { GuidesShowcase } from '../components/GuidesShowcase';
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
      "Logo, charte, brand book : les fourchettes de marché et ce qui fait varier la facture.",
    readMin: 6,
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

      <GuidesShowcase guides={GUIDES} id="liste" />

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
          Il n'y a pas un prix unique : un site vitrine va de quelques centaines d'euros (solution
          no-code que vous montez vous-même) à plusieurs milliers d'euros (agence sur-mesure). Le bon
          repère n'est pas le tarif le plus bas, mais ce que vous obtenez vraiment, et si le site vous
          appartient.
        </Lead>

        <H2>Combien coûte un site vitrine ? La réponse en fourchettes</H2>
        <P>
          En no-code ou en faisant tout vous-même, le coût est faible mais le temps passé et les limites
          sont réels. Avec un freelance, on est souvent sur quelques centaines à quelques milliers
          d'euros selon l'ampleur. Avec une agence sur-mesure, le budget monte avec le nombre de
          personnes mobilisées. Ce sont des fourchettes de marché, pas une promesse.
        </P>

        <H2>Ce qui fait varier le prix</H2>
        <P>
          Quatre facteurs pèsent le plus : le nombre de pages, le design (template ou sur-mesure), ce
          qui est inclus côté SEO, et les fonctionnalités (réservation, paiement, multilingue). Un
          cinquième facteur, souvent oublié : devenez-vous propriétaire du site, ou payez-vous un
          abonnement à vie ?
        </P>

        <H2>Freelance, agence ou no-code : que payez-vous vraiment ?</H2>
        <P>
          Le no-code est économique mais repose sur vous. Le freelance offre proximité et bon prix, avec
          un risque de continuité. L'agence apporte structure et pluri-compétence, à un coût plus élevé.
          Pour creuser, lisez notre guide{' '}
          <A href="/guides/freelance-ou-agence">freelance ou agence</A>.
        </P>

        <H2>Attention au coût caché : site loué ou acheté ?</H2>
        <P>
          Un site à «&nbsp;50&nbsp;€ par mois&nbsp;» paraît accessible, mais sur plusieurs années il coûte plus cher
          qu'un site acheté une fois, et vous n'en êtes pas propriétaire. Avant de comparer les prix,
          vérifiez ce point. Notre guide détaille{' '}
          <A href="/guides/etre-proprietaire-de-son-site">comment être vraiment propriétaire de son site</A>.
        </P>

        <H2>Combien chez GND ?</H2>
        <P>
          Les prix sont publics et fixes : une vitrine démarre à 800&nbsp;€, et la formule avec module de
          réservation est à 1&nbsp;500&nbsp;€. Paiement unique, sans abonnement, SEO local et configuration de
          la fiche Google inclus, site 100&nbsp;% propriétaire. Détail sur la{' '}
          <A href="/services/sites-vitrines">page sites vitrines</A>.
        </P>

        <H2>Comment budgéter sans se tromper</H2>
        <P>
          Demandez ce qui est inclus (hébergement, domaine la première année, SEO de base, formation),
          si le site vous appartient, et quel est le coût des évolutions futures. Un devis clair vaut
          mieux qu'un prix d'appel. <A href="/contact">Demandez le vôtre</A>, réponse sous 24h.
        </P>
      </>
    ),
    faq: [
      { q: 'Quel est le prix moyen d\'un site vitrine en 2026 ?', a: "Il n'y a pas de prix unique : de quelques centaines d'euros en no-code à plusieurs milliers en agence sur-mesure. Le prix dépend du nombre de pages, du design, du SEO inclus et des fonctionnalités." },
      { q: 'Pourquoi de tels écarts de prix ?', a: "Parce que l'ampleur varie : un template monté soi-même n'a rien à voir avec un site sur-mesure conçu par une équipe. Le design, le SEO, les fonctionnalités et la propriété du site font la différence." },
      { q: 'Un site pas cher est-il un mauvais choix ?', a: "Pas forcément, si vous savez ce que vous achetez. Le piège, c'est le prix d'appel qui cache une location à vie ou un site bridé sur le SEO. Regardez ce qui est inclus et si le site vous appartient." },
      { q: 'L\'hébergement et le domaine sont-ils inclus ?', a: "Cela dépend du prestataire, à vérifier systématiquement. Chez GND, la configuration de l'hébergement est incluse et la première année de domaine est offerte, sans abonnement imposé ensuite." },
      { q: 'Combien coûte un site vitrine chez GND ?', a: "À partir de 800 € pour une vitrine, 1 500 € avec module de réservation. Prix publics, paiement unique, sans abonnement, SEO local et fiche Google inclus, site 100 % propriétaire." },
    ],
  },

  'prix-identite-visuelle': {
    body: (
      <>
        <Lead>
          Le prix d'une identité visuelle dépend de ce que vous achetez. Un logo seul chez un freelance
          peut coûter quelques centaines d'euros. Une identité complète (logo, charte, déclinaisons)
          chez une agence va de quelques centaines à plus de dix mille euros. Le vrai repère, ce n'est
          pas le tarif, c'est la cohérence obtenue et les droits que vous récupérez.
        </Lead>

        <H2>Combien coûte un logo ?</H2>
        <P>
          Sur le marché, un logo varie fortement selon le prestataire. Chez un freelance, on observe en
          général de quelques centaines à quelques milliers d'euros. En agence, le ticket est plus élevé
          car le logo s'inscrit dans une démarche de marque. Méfiez-vous des logos à très bas prix : ils
          arrivent souvent sans fichiers sources ni déclinaisons, ce qui coûte plus cher ensuite.
        </P>

        <H2>Combien coûte une charte graphique ?</H2>
        <P>
          La charte graphique encadre l'usage du logo, des couleurs et des typographies. Son prix dépend
          du nombre de supports couverts et de la profondeur des règles. C'est un investissement qui
          évite des dérives coûteuses plus tard, quand plusieurs personnes ou prestataires produisent vos
          supports. Pour la différence avec le brand book, voir notre guide{' '}
          <A href="/guides/charte-graphique-vs-brand-book">charte graphique ou brand book</A>.
        </P>

        <H2>Combien coûte un brand book ?</H2>
        <P>
          Le brand book va plus loin que la charte : il englobe la plateforme de marque (vision, valeurs,
          ton, récit). Il représente donc un budget supérieur, justifié quand la marque grandit, recrute
          ou s'adresse à plusieurs audiences. Une petite structure n'en a pas toujours besoin au démarrage.
        </P>

        <H2>Ce qui fait varier le prix</H2>
        <P>
          Quatre facteurs pèsent le plus : l'ampleur (logo seul ou identité complète), le niveau de
          recherche créative, le nombre de déclinaisons et de supports, et la remise des fichiers sources.
          Ce dernier point est décisif : sans les fichiers sources, vous n'êtes pas vraiment propriétaire
          de votre identité.
        </P>

        <H2>Combien chez GND ?</H2>
        <P>
          GND travaille votre identité sur-mesure, avec un devis personnalisé selon votre besoin réel,
          et vous restez propriétaire des fichiers sources. Réponse sous 24h, devis sous 48h. Voir la{' '}
          <A href="/services/branding-identite">page branding et identité</A>, ou{' '}
          <A href="/contact">parlons de votre projet</A>.
        </P>
      </>
    ),
    faq: [
      { q: "Quel est le prix d'une identité visuelle complète ?", a: "Selon le marché, de quelques centaines à plus de dix mille euros, en fonction de l'ampleur (logo seul ou identité complète), du niveau de recherche créative et du nombre de déclinaisons. C'est une fourchette de marché, pas une promesse." },
      { q: "Combien coûte un logo professionnel ?", a: "Chez un freelance, souvent de quelques centaines à quelques milliers d'euros. En agence, davantage, car le logo s'inscrit dans une démarche de marque. Les logos très bon marché arrivent souvent sans fichiers sources." },
      { q: "Pourquoi de tels écarts de prix ?", a: "Parce que l'ampleur et la démarche varient : un logo isolé n'a rien à voir avec une identité complète (logo, charte, déclinaisons, fichiers sources) conçue dans une logique de marque." },
      { q: "Vais-je récupérer les fichiers sources ?", a: "C'est le point clé à vérifier. Chez GND, vous restez propriétaire des fichiers sources de votre identité. Sans eux, vous ne pouvez pas faire évoluer librement votre marque." },
      { q: "Combien coûte une identité visuelle chez GND ?", a: "GND travaille sur-mesure : le prix dépend de votre besoin réel, avec un devis personnalisé sous 48h. Vous gardez la propriété des fichiers sources." },
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
          Le prix d'un agent IA sur-mesure varie beaucoup selon sa complexité. Un agent ciblé sur une
          tâche précise coûte nettement moins qu'un système connecté à plusieurs outils et données. Le
          marché est très dispersé : raisonnez moins en prix absolu qu'en retour sur investissement.
        </Lead>

        <H2>Combien coûte un agent IA pour une PME ?</H2>
        <P>
          Les fourchettes observées sur le marché vont de quelques milliers d'euros pour un agent simple
          à plusieurs dizaines de milliers pour un système complexe et intégré. L'écart vient du périmètre :
          un assistant qui répond à des questions n'a rien à voir avec un agent qui qualifie des leads,
          met à jour un CRM et déclenche des actions.
        </P>

        <H2>Ce qui fait varier le coût</H2>
        <P>
          Quatre facteurs : le nombre de tâches automatisées, les connexions à vos outils et données, le
          niveau de fiabilité exigé, et l'hébergement (cloud ou auto-hébergé pour la souveraineté). À cela
          s'ajoute un coût d'usage récurrent (les modèles d'IA se paient à la consommation).
        </P>

        <H2>Faut-il raisonner en prix ou en retour sur investissement ?</H2>
        <P>
          La bonne question n'est pas «&nbsp;combien ça coûte&nbsp;» mais «&nbsp;combien ça rapporte ou fait gagner&nbsp;».
          Un agent qui fait gagner plusieurs heures par semaine à une équipe se rentabilise vite. Estimez
          le temps gagné et les erreurs évitées avant de regarder le devis.
        </P>

        <H2>Par où commencer sans se ruiner ?</H2>
        <P>
          Commencez par un cas d'usage précis et mesurable (relances, qualification, reporting), puis
          étendez. C'est plus sûr et moins cher qu'un grand projet d'un coup. Pour choisir la brique
          technique, voir notre comparatif{' '}
          <A href="/guides/n8n-make-zapier-comparatif">n8n, Make ou Zapier</A>.
        </P>

        <H2>Combien chez GND ?</H2>
        <P>
          GND conçoit des agents IA sur-mesure avec un cadrage RGPD et un devis selon votre périmètre.
          Voir la <A href="/services/automatisation-ia">page automatisation et IA</A>, ou{' '}
          <A href="/contact">parlons de votre besoin</A>.
        </P>
      </>
    ),
    faq: [
      { q: "Combien coûte un agent IA pour une PME ?", a: "Le marché est très dispersé : de quelques milliers d'euros pour un agent simple à plusieurs dizaines de milliers pour un système complexe et intégré, plus un coût d'usage récurrent. Le devis dépend du périmètre." },
      { q: "Qu'est-ce qui fait varier le prix d'un agent IA ?", a: "Le nombre de tâches automatisées, les connexions à vos outils et données, le niveau de fiabilité exigé, l'hébergement (cloud ou auto-hébergé), et le coût d'usage des modèles." },
      { q: "Comment estimer le retour sur investissement d'un agent IA ?", a: "Estimez le temps gagné par votre équipe et les erreurs évitées. Un agent qui libère plusieurs heures par semaine se rentabilise souvent rapidement. Raisonnez en valeur, pas seulement en prix." },
      { q: "Par où commencer pour ne pas se ruiner ?", a: "Par un cas d'usage précis et mesurable (relances, qualification de leads, reporting), puis étendez. C'est plus sûr et moins coûteux qu'un grand projet lancé d'un coup." },
      { q: "Combien coûte un agent IA chez GND ?", a: "GND établit un devis selon votre périmètre, avec un cadrage RGPD. Réponse sous 24h, devis sous 48h." },
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

          {/* Signature auteur + date (signal E-E-A-T, repris par les moteurs IA). */}
          <p className="mt-5 text-sm text-text-muted">
            Par <strong className="text-text-strong font-medium">l'équipe GND Consulting</strong>, studio créatif humain × IA.{' '}
            <span className="text-text-muted/80">Mis à jour le 22 juin 2026.</span>
          </p>

          <article className="mt-10">
            {content.body}
          </article>

          {/* FAQ visible (correspond au balisage FaqJsonLd) — titre en haut,
              questions empilées dessous. Mise en page identique à l'accueil. */}
          <section className="mt-20" aria-label="Questions fréquentes">
            <div className="max-w-2xl">
              <Kicker>Questions fréquentes</Kicker>
              <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">Toutes les <span className="italic text-accent">réponses</span>.</h2>
              <p className="mt-6 text-text">Une question qui ne figure pas ici ? Écrivez-nous, réponse sous 24h.</p>
            </div>
            <div className="mt-12 max-w-3xl">
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

