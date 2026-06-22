/* /creation-site-internet-restaurant — landing commerciale verticale.
 * Intention d'achat (restaurateurs). Angle GND : site qui vous appartient,
 * zéro commission, trouvable sur Google et par les IA (Schema Restaurant).
 * SEO + GEO : H1 mot-clé, réponse answer-first, tableau comparatif, FAQ balisée.
 * Charte GND, aucun tiret cadratin, prix publics uniquement. */
import * as React from 'react';
import { Section, Container, Kicker, CinematicHero } from '../ui';
import { Icons } from '../icons';
import { Faq } from '../ui';
import { FaqJsonLd } from '../components/FaqJsonLd';
import { FloatingCtaBand } from '../components/FloatingCtaBand';

/* CTA réutilisé : "Réserver un appel" pointe vers le planificateur de la page contact. */
const CallCta = ({ light = false }: { light?: boolean }) => (
  <a
    href="/contact#rdv"
    className={light ? 'btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15' : 'btn btn-primary'}
  >
    Réserver un appel <Icons.ArrowUpRight size={14} />
  </a>
);

/* Tableau comparatif : plateformes vs solution louée vs site GND. */
function RestaurantComparison() {
  const rows = [
    { label: 'Commission sur vos commandes', platform: '15 à 30 %', rented: 'Abonnement + options', gnd: 'Zéro commission' },
    { label: 'Propriété du site et des données', platform: 'Non, vous dépendez d’eux', rented: 'Non, location à vie', gnd: 'Oui, tout vous appartient' },
    { label: 'Design à l’image de votre maison', platform: 'Fiche standardisée', rented: 'Template imposé', gnd: 'Sur-mesure, fait main' },
    { label: 'Visibilité Google (SEO local)', platform: 'Limitée', rented: 'Basique', gnd: 'Optimisée + Schema Restaurant' },
    { label: 'Réservation / commande en direct', platform: 'Via la plateforme', rented: 'Selon l’offre', gnd: 'Intégrée, sans intermédiaire' },
    { label: 'Lisible par les IA (ChatGPT, etc.)', platform: 'Non', rented: 'Non', gnd: 'Oui, balisage structuré' },
  ];
  return (
    <Section bg="alt" className="py-24 md:py-32">
      <Container>
        <Kicker>Le comparatif honnête</Kicker>
        <h2 className="display text-4xl md:text-5xl mt-4 text-text-strong leading-[1.04] max-w-3xl">
          Plateforme, solution louée ou <span className="italic text-accent">votre propre site</span> ?
        </h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-text-strong/15">
                <th className="py-4 pr-4 text-sm font-medium text-text-muted"> </th>
                <th className="py-4 px-4 text-sm font-medium text-text-muted">Uber Eats, Deliveroo</th>
                <th className="py-4 px-4 text-sm font-medium text-text-muted">Solution louée (Zenchef, TheFork)</th>
                <th className="py-4 px-4 text-sm font-semibold text-text-strong bg-accent/10 rounded-t-xl">Votre site GND</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-text-strong/10">
                  <td className="py-4 pr-4 text-sm font-medium text-text-strong">{r.label}</td>
                  <td className="py-4 px-4 text-sm text-text-muted">{r.platform}</td>
                  <td className="py-4 px-4 text-sm text-text-muted">{r.rented}</td>
                  <td className="py-4 px-4 text-sm font-medium text-text-strong bg-accent/10">{r.gnd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-text-muted max-w-2xl">
          Les plateformes vous rendent visibles mais prennent une commission et gardent vos clients.
          Votre propre site vous rend indépendant : vous possédez l’actif, les données et la relation.
        </p>
      </Container>
    </Section>
  );
}

function RestaurantBenefits() {
  const items = [
    { icon: Icons.Sparkles, t: 'Un design qui donne faim', d: 'Photos, ambiance, carte mise en valeur. Un site mobile et rapide qui retranscrit votre maison et donne envie de réserver.' },
    { icon: Icons.MapPin, t: 'Trouvable sur Google', d: 'SEO local, fiche Google Business configurée et balisage Schema Restaurant : vous apparaissez quand on cherche un resto près de chez vous.' },
    { icon: Icons.Cpu, t: 'Lisible par les IA', d: 'Menu, horaires et avis balisés pour être repris par Google, Maps et les réponses des IA comme ChatGPT.' },
    { icon: Icons.Check, t: 'Commande et réservation sans commission', d: 'Intégration de la réservation et de la commande en direct (widgets au choix), sans intermédiaire qui prend sa part.' },
    { icon: Icons.Shield, t: 'Un site qui vous appartient', d: 'Domaine à votre nom, code et accès remis, paiement unique sans abonnement imposé. Pas de location à vie.' },
    { icon: Icons.Zap, t: 'Livré en 1 à 2 semaines', d: 'Du brief à la mise en ligne, le studio tient la cadence. Vous validez à chaque étape.' },
  ];
  return (
    <Section className="py-24 md:py-32">
      <Container>
        <Kicker>Ce que vous obtenez</Kicker>
        <h2 className="display text-4xl md:text-5xl mt-4 text-text-strong leading-[1.04] max-w-3xl">
          Plus qu’un site : un <span className="italic text-accent">levier</span> pour remplir la salle.
        </h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.t} className="rounded-[24px] bg-bg/70 ring-1 ring-text-strong/[0.07] p-6 md:p-7" style={{ boxShadow: '0 14px 44px rgba(83,36,24,0.06)' }}>
              <span className="inline-flex text-accent bg-accent/10 p-3 rounded-xl"><it.icon size={22} /></span>
              <h3 className="display text-xl md:text-2xl mt-4 text-text-strong leading-tight">{it.t}</h3>
              <p className="mt-3 text-sm text-text leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const FAQ_ITEMS = [
  { q: 'Combien coûte un site internet pour un restaurant ?', a: "Sur le marché, de quelques centaines d'euros (template loué) à plusieurs milliers (agence sur-mesure). Chez GND, une vitrine démarre à 800 € et la formule avec réservation à 1 500 €, en paiement unique sans abonnement, SEO local et fiche Google inclus." },
  { q: "Ai-je vraiment besoin d'un site si j'ai déjà Uber Eats et une fiche Google ?", a: "Oui. La plateforme vous rend visible mais prend une commission et garde vos clients ; la fiche Google ne convertit pas comme un vrai site. Votre site vous rend indépendant, valorise votre maison et vous appartient." },
  { q: 'Comment éviter les commissions Uber Eats et Deliveroo ?', a: "En proposant la commande et la réservation en direct sur votre propre site. GND intègre le widget de votre choix, sans commission par commande : vous gardez la marge et la relation client." },
  { q: 'Comment faire apparaître mon restaurant en premier sur Google ?', a: "Trois leviers : une fiche Google Business Profile complète et optimisée, des avis réguliers, et un site rapide balisé Schema Restaurant. GND configure les trois à la livraison." },
  { q: 'Suis-je propriétaire de mon site si je passe par une plateforme à abonnement ?', a: "Non : tant que vous payez, le site existe ; à l'arrêt, il disparaît et vos données restent verrouillées. Chez GND, le domaine, le code et les accès vous appartiennent." },
  { q: 'Peut-on ajouter la réservation et le menu en ligne ?', a: "Oui. Réservation, menu en ligne (avec QR code possible), click and collect : on intègre ce qui sert votre service, sans intermédiaire qui prend une commission." },
  { q: 'Quel délai pour créer le site de mon restaurant ?', a: "1 à 2 semaines pour une vitrine, du brief à la mise en ligne, fiche Google configurée incluse. Vous validez à chaque étape." },
];

export function RestaurantPage() {
  return (
    <main id="main">
      <FaqJsonLd id="restaurant" items={FAQ_ITEMS} />

      <CinematicHero
        theme="light"
        kicker="Création de site · Restaurants"
        eyebrow="restaurants"
        title={<>Le site de restaurant qui vous rend <span className="italic text-accent">indépendant</span>.</>}
        subtitle={<>Un design qui donne faim, <strong className="text-text-strong">zéro commission</strong>, trouvable sur Google et par les IA. Un site qui vous appartient, livré en 1 à 2 semaines.</>}
        badges={['Sans commission', '100 % propriétaire', 'SEO local inclus', 'Livré en 1 à 2 semaines']}
        ctas={<>
          <CallCta />
          <a href="/services/sites-vitrines#tarifs" className="btn btn-secondary">Voir les formules <Icons.ArrowRight size={14} /></a>
        </>}
        footerLabel="restaurants"
      />

      <Section className="py-20 md:py-28">
        <Container>
          <div className="max-w-3xl">
            <Kicker>La vraie question</Kicker>
            <h2 className="display text-4xl md:text-5xl mt-4 text-text-strong leading-[1.04]">
              Uber Eats vous loue des clients. Un site vous en <span className="italic text-accent">construit</span>.
            </h2>
            <p className="mt-6 text-lg text-text leading-relaxed">
              Les plateformes prennent 15 à 30 % sur chaque commande et gardent la relation. Votre propre
              site fait l’inverse : vous possédez l’actif, les données et le lien avec vos clients. C’est
              la différence entre payer un loyer et bâtir un patrimoine.
            </p>
          </div>
        </Container>
      </Section>

      <RestaurantComparison />
      <RestaurantBenefits />

      {/* Prix : renvoi vers les formules publiques existantes. */}
      <Section bg="alt" className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <Kicker>Combien ça coûte</Kicker>
            <h2 className="display text-4xl md:text-5xl mt-4 text-text-strong leading-[1.04]">
              Des prix clairs, <span className="italic text-accent">sans abonnement</span>.
            </h2>
            <p className="mt-6 text-lg text-text leading-relaxed">
              Une vitrine restaurant démarre à <strong className="text-text-strong">800 €</strong>, et la
              formule avec module de réservation à <strong className="text-text-strong">1 500 €</strong>.
              Paiement unique, SEO local et configuration de la fiche Google inclus, site 100 % propriétaire.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/services/sites-vitrines#tarifs" className="btn btn-primary">Voir le détail des formules <Icons.ArrowRight size={14} /></a>
              <CallCta />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20 md:py-28">
        <Container>
          <div className="max-w-2xl">
            <Kicker>Questions fréquentes</Kicker>
            <h2 className="display text-4xl md:text-5xl mt-4 text-text-strong leading-[1.04]">
              Tout ce qu’un restaurateur se <span className="italic text-accent">demande</span>.
            </h2>
            <p className="mt-6 text-text">Une question qui ne figure pas ici ? Écrivez-nous, réponse sous 24h.</p>
          </div>
          <div className="mt-12 max-w-3xl">
            {FAQ_ITEMS.map((f) => (
              <Faq key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </Container>
      </Section>

      <FloatingCtaBand
        prefix="Votre restaurant"
        rotatingWords={['en ligne.', 'sans commission.', 'en tête sur Google.', 'qui vous appartient.']}
        sub="Parlons de votre maison. Réponse sous 24h, devis sous 48h, sans engagement."
      />
    </main>
  );
}
