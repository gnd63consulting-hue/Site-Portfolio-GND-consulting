/* /services/sites-vitrines, pricing-driven service page, ported to ES modules */
import { Section, Container, Kicker, Faq } from '../ui';
import { FloatingCtaBand } from '../components/FloatingCtaBand';
import { Icons } from '../icons';
import ScrollExpandHero from '@/components/blocks/scroll-expansion-hero';
import { HeroBuildUpSV } from '../components/HeroBuildUpSV';
import { BenefitsBlock } from '../components/BenefitsBlock';
import { IntegrationsStrip } from '../components/IntegrationsStrip';
import { WithoutWithSite } from '../components/WithoutWithSite';
import { VerticalsPromises } from '../components/VerticalsPromises';
import { MarketComparison } from '../components/MarketComparison';
import { HumanAiBlock } from '../components/HumanAiBlock';
import { GuaranteesBlock } from '../components/GuaranteesBlock';
import { OwnershipBlock } from '../components/OwnershipBlock';
import { WhyGndBlock } from '../components/WhyGndBlock';
import { ProcessCarousel } from '../components/ProcessCarousel';
import { MarqueeCTA } from '../components/MarqueeCTA';
import { PricingCards } from '@/components/ui/pricing-component';

const PLANS = [
  {
    id: "essentiel",
    name: "Vitrine Essentiel",
    from: "800",
    ideal: "Commerces, artisans, restaurants",
    features: [
      "Présentation activité",
      "Page services / menu",
      "Formulaire contact",
      "Design responsive",
      "Optimisation Google (SEO)",
      "Hébergement configuré",
      "Livraison 1–2 semaines",
    ],
    featured: false,
  },
  {
    id: "reservation",
    name: "Vitrine + Réservation",
    from: "1 500",
    ideal: "Restaurants, instituts, auto-écoles",
    features: [
      "Tout Essentiel",
      "Réservation / commande en ligne",
      "Notifications email automatiques",
      "Gestion des demandes",
      "Calendrier intégré",
      "Suivi disponibilités",
    ],
    featured: true,
    badge: "Recommandé",
  },
  {
    id: "complet",
    name: "Pack Complet",
    from: "2 500",
    ideal: "Vente en ligne, services premium",
    features: [
      "Tout Vitrine + Réservation",
      "Paiement en ligne (Stripe)",
      "Documentation utilisateur",
      "Accompagnement personnalisé",
      "Multi-langues optionnel",
      "Catalogue produits",
    ],
    featured: false,
  },
];

function PricingGrid() {
  return (
    <Section bg="alt" id="tarifs" className="py-24 md:py-32">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <Kicker>Formules</Kicker>
            <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">
              Trois formules <span className="italic text-accent">claires</span>.
            </h2>
          </div>
          <p className="lg:col-span-5 text-text leading-relaxed">
            Paiement en deux fois (50% à la commande, 50% à la livraison). Vous restez propriétaire du nom de domaine et des accès. Modifications futures sur devis.
          </p>
        </div>

        <PricingCards plans={PLANS} ctaLabel="Demander un devis" ctaHref="#/contact" />

        {/* option + mention */}
        <div className="mt-8 surface-card p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 rounded-full bg-accent text-text-strong inline-flex items-center justify-center"><Icons.MapPin size={16}/></span>
            <div>
              <div className="text-text-strong font-medium">Option · Intégration Google Maps</div>
              <div className="text-sm text-text-muted">Affichage dynamique de votre adresse, itinéraire intégré.</div>
            </div>
          </div>
          <div className="display text-3xl text-text-strong">+ 50 €</div>
        </div>

        <p className="mt-6 text-sm text-text-muted max-w-3xl">
          Tarifs indicatifs, non contractuels. Devis personnalisé sur demande. TVA non applicable, Art. 293 B du CGI.
        </p>
      </Container>
    </Section>
  );
}

function SitesVitrinesPage() {
  const benefits = [
    { t:"Pas d'abonnement", d:"Vous payez une fois, le site est à vous." , i: Icons.Check},
    { t:"Vous êtes propriétaire", d:"Nom de domaine et accès transmis.", i: Icons.Shield },
    { t:"Paiement en 2 fois", d:"50 % commande / 50 % livraison.", i: Icons.Sparkles },
    { t:"Modifications sur devis", d:"Une évolution ? Devis transparent.", i: Icons.Layers },
  ];
  return (
    <main id="main">
      {/* HERO #1, ScrollExpandHero (alignement pattern 3-héros : home, audiovisuel,
          branding). Hero #2 = HeroBuildUpSV (descendu), Hero #3 = WhyGndBlock.
          Wrapper pt-20 cream pour que le header flotte sur crème. */}
      <div className="pt-20 md:pt-24 bg-bg-alt">
        <ScrollExpandHero
          mediaType="video"
          mediaSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-videos/Creative_Studio_Video_Generation2.mp4"
          posterSrc="https://gublhtivvydkuooooffg.supabase.co/storage/v1/render/image/public/portfolio-photos/20250919_0006_Vibrant%20Digital%20Collaboration_remix_01k5fdpkfdemjrbt49q10rx0hx.png?width=1600&quality=82"
          bgImageSrc="/assets/hero1-bg-v2.webp"
          title="Un site, une intention."
          date="GND · Sites & SEO"
          scrollToExpand="Scrollez pour révéler"
          textColorClass="text-bg"
        />
      </div>

      {/* Marquee CTA, bandeau entre Hero #1 et Hero #2 (mirror audio/branding). */}
      <MarqueeCTA />

      {/* HERO #2, HeroBuildUpSV (build-up cinematic, descendu pos 2). */}
      <HeroBuildUpSV />

      {/* HERO #3, Pourquoi GND / WhyGndBlock. */}
      <WhyGndBlock />

      {/* 1. Benefits, capsules néomorphiques anim */}
      <BenefitsBlock />

      {/* 3. Sans site / Avec site, PAS framework punch */}
      <WithoutWithSite />

      {/* 4. Promesses par verticale (5 lignes resto/coiffeur/auto-éc/artisan/commerces) */}
      <VerticalsPromises />

      {/* 5. Pricing, 3 formules */}
      <PricingGrid/>

      {/* 6. Process, carousel animé 21st.dev adapté charte GND */}
      <ProcessCarousel />

      {/* 7. Comparatif marché honnête */}
      <MarketComparison />

      {/* 8. Humain × IA en pratique */}
      <HumanAiBlock />

      {/* 9. Garanties GND */}
      <GuaranteesBlock />

      {/* 10. Ownership, "Le site reste à vous" */}
      <OwnershipBlock />

      {/* 12. Vos outils connectés, slider cinematic sparkles */}
      <IntegrationsStrip />

      {/* 13. FAQ étendue 11 questions */}
      <Section bg="alt" className="py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Kicker>Questions sites vitrines</Kicker>
              <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong leading-tight">À <span className="italic text-accent">savoir</span>.</h2>
              <p className="mt-5 text-text leading-relaxed">
                Si une question manque, posez-la directement. Réponse écrite sous 24 h.
              </p>
            </div>
            <div className="lg:col-span-8">
              <Faq q="Suis-je vraiment propriétaire du site ?" a="Oui. Le nom de domaine est enregistré à votre nom (WHOIS vérifiable), vous recevez tous les accès, hébergement, back-office, code source. Aucune dépendance à GND. Vous pouvez quitter, transférer, revendre."/>
              <Faq q="Quel est le délai de livraison réel ?" a="14 jours ouvrés en moyenne (Brief → Maquette → Dev → Mise en ligne). Si on dépasse, on vous le dit dès le départ avec la raison."/>
              <Faq q="Comment se passe le paiement ?" a="50 % à la commande (déclenche la production), 50 % à la livraison. Facture standard, virement bancaire. TVA non applicable (Art. 293 B du CGI)."/>
              <Faq q="Et si je veux des modifications plus tard ?" a="Toutes les évolutions font l'objet d'un devis transparent (à partir de 50 €/intervention). Pas de forfait annuel imposé. Vous restez libre de confier la maintenance à qui vous voulez."/>
              <Faq q="Pourquoi pas Wix, Squarespace ou Shopify ?" a={<>Les builders DIY sont bridés sur le SEO local, verrouillent vos données et imposent un abonnement à vie. Notre site est <strong>en propriété</strong>, optimisé Google, sans abonnement. Wix est OK pour tester, GND est fait pour exister sur Google.</>}/>
              <Faq q="Le SEO local est-il vraiment inclus ?" a="Oui. Optimisations techniques (vitesse, balises, structure), Schema.org Restaurant complet (Menu + FAQ + AggregateRating), soumission Google Search Console, configuration Google Business Profile. Garantie : si vous n'apparaissez pas page 1 sur « votre métier + votre ville » sous 90 jours, on retravaille la SEO sans surcoût."/>
              <Faq q="Vous gérez les réservations / commandes en ligne ?" a="Sur la formule Vitrine + Réservation (1 500 €), on intègre le widget Zenchef, TheFork ou un équivalent (sans commission). Sur le Pack Complet (2 500 €), on intègre Stripe + Collectly pour le click & collect."/>
              <Faq q="Et la conformité légale (NF525, RGPD, mentions) ?" a={<>Mentions légales + CGV + bandeau RGPD inclus. <strong>Important pour les restaurants</strong> : la norme caisse NF525 est obligatoire depuis le 1er mars 2026 (amende jusqu'à 7 500 €). Notre rôle est de connecter votre caisse NF525 existante, pas de la remplacer. On vous oriente si vous n'en avez pas.</>}/>
              <Faq q="Vous êtes seul ou une équipe ?" a="GND est une agence boutique. Roodny pilote tous les projets (briefing, design, relation client). L'IA accélère certaines productions (génération de maquettes, copy, photo si besoin). Vous avez un seul interlocuteur de bout en bout."/>
              <Faq q="Et si je n'ai pas de contenu (textes, photos) ?" a="On vous accompagne sur la rédaction (vocabulaire de votre métier, ton de la maison). Pour les photos, on peut faire le shooting en option (voir notre service Photographie) ou utiliser des visuels existants."/>
              <Faq q="Vous travaillez avec quels secteurs ?" a="Restaurants, cafés, coiffeurs, instituts de beauté, auto-écoles, artisans BTP, commerces de proximité, indépendants. Si votre métier n'apparaît pas, demandez, on s'adapte."/>
            </div>
          </div>
        </Container>
      </Section>

      <FloatingCtaBand
        prefix="Prêt à lancer votre"
        rotatingWords={['site ?', 'vitrine ?', 'projet ?', 'présence ?', 'histoire ?']}
        sub="Réponse sous 24 h. Devis détaillé sous 48 h. Sans engagement."
        primaryCta={{ label: 'Demander un devis', href: '#/contact' }}
      />
    </main>
  );
}

export { SitesVitrinesPage };
