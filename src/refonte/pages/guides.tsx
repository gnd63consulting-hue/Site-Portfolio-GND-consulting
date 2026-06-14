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
