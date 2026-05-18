/* /services/sites-vitrines — pricing-driven service page — ported to ES modules */
import { Section, Container, Kicker, Btn, Faq, ImgPlaceholder, CtaBand, CinematicHero } from '../ui';
import { Icons } from '../icons';

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
              Trois formules <span className="italic">claires</span>.
            </h2>
          </div>
          <p className="lg:col-span-5 text-text leading-relaxed">
            Paiement en deux fois (50% à la commande, 50% à la livraison). Vous restez propriétaire du nom de domaine et des accès. Modifications futures sur devis.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
          {PLANS.map(p => (
            <article key={p.id}
              className={`relative rounded-[28px] p-7 md:p-9 flex flex-col card-hover
                ${p.featured ? "bg-text-strong text-bg ring-1 ring-accent shadow-2xl shadow-text/30" : "surface-card"}`}>
              {p.featured && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 bg-accent text-text-strong text-xs font-medium px-3 py-1 rounded-full">
                  <Icons.Sparkles size={12}/> {p.badge}
                </span>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <div className={`label-mono ${p.featured ? "text-bg/60" : ""}`}>{p.ideal}</div>
                  <h3 className={`display text-3xl md:text-4xl mt-3 ${p.featured ? "text-bg" : "text-text-strong"}`}>{p.name}</h3>
                </div>
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className={`label-mono ${p.featured ? "text-bg/60" : ""}`}>à partir de</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={`num-display text-6xl md:text-7xl ${p.featured ? "text-bg" : "text-text-strong"}`}>{p.from}</span>
                <span className={`display text-3xl ${p.featured ? "text-accent" : "text-accent-deep"}`}>€</span>
              </div>

              <ul className={`mt-7 space-y-3 ${p.featured ? "text-bg/85" : "text-text"} text-sm`}>
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Icons.Check size={16} className={`mt-0.5 shrink-0 ${p.featured ? "text-accent" : "text-accent-deep"}`}/>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a href="#/contact" className={`btn mt-8 justify-center ${p.featured ? "btn-primary" : "btn-secondary"}`}>
                Demander un devis <Icons.ArrowUpRight size={14}/>
              </a>
            </article>
          ))}
        </div>

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
          Tarifs indicatifs, non contractuels. Devis personnalisé sur demande. TVA non applicable — Art. 293 B du CGI.
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
  const process = [
    { n:"01", t:"Brief", d:"Vos besoins, votre métier, vos références. 30 min en visio." },
    { n:"02", t:"Maquette", d:"Mockup desktop + mobile sous 5 jours, 2 rounds inclus." },
    { n:"03", t:"Intégration", d:"Développement, SEO, optimisations, hébergement." },
    { n:"04", t:"Livraison", d:"Mise en ligne, formation, transfert des accès." },
  ];

  return (
    <main id="main">
      <CinematicHero
        kicker="Sites vitrines"
        eyebrow="services / sites vitrines"
        title={<>Votre site,<br/><span className="italic">clé en main</span>.</>}
        subtitle="Un site professionnel, rapide, optimisé Google — livré en 1 à 2 semaines. Pas d'abonnement, vous êtes propriétaire."
        badges={["À partir de 800 €", "Livraison 1–2 sem.", "SEO inclus"]}
        ctas={<>
          <Btn href="#tarifs" variant="primary">Voir les formules</Btn>
          <a href="#/contact" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Demander un devis <Icons.ArrowUpRight size={14}/></a>
        </>}
        media={
          <div className="relative max-w-[480px] mx-auto">
            <div className="absolute -inset-4 rounded-3xl"
              style={{ background:'radial-gradient(circle at 50% 50%, rgba(255,149,79,.35), transparent 70%)', filter:'blur(16px)' }}></div>
            <div className="relative rounded-3xl bg-bg/95 p-3 shadow-2xl shadow-black/40">
              <div className="rounded-2xl overflow-hidden bg-text-strong">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-bg/10 bg-text-strong">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-bg/30"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-bg/30"></span>
                  <span className="ml-3 label-mono !text-bg/60">votresite.fr</span>
                </div>
                <ImgPlaceholder label="[ maquette site vitrine ]" ratio="4/3" rounded="rounded-none"/>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-accent text-text-strong px-5 py-3 rounded-full text-sm font-medium shadow-2xl">
              Livré en 1–2 semaines
            </div>
          </div>
        }
        footerLabel="services · sites vitrines"
      />

      {/* benefits */}
      <Section className="py-20">
        <Container>
          <div className="grid md:grid-cols-4 gap-5">
            {benefits.map(b => {
              const Ico = b.i;
              return (
                <div key={b.t} className="surface-card p-6 md:p-7">
                  <span className="w-10 h-10 rounded-full bg-accent/15 text-accent-deep inline-flex items-center justify-center"><Ico size={18}/></span>
                  <div className="display text-2xl text-text-strong mt-5">{b.t}</div>
                  <p className="mt-2 text-sm text-text leading-relaxed">{b.d}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <PricingGrid/>

      {/* process */}
      <Section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <Kicker>Process</Kicker>
            <h2 className="display text-5xl md:text-7xl mt-5 text-text-strong">Du brief à la <span className="italic">mise en ligne</span>.</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-4 gap-px bg-surface/70 border hairline border rounded-3xl overflow-hidden">
            {process.map(p => (
              <div key={p.n} className="bg-bg p-7 md:p-8 hover:bg-bg-alt transition">
                <span className="num-display text-6xl text-accent">{p.n}</span>
                <h3 className="display text-2xl text-text-strong mt-5">{p.t}</h3>
                <p className="mt-2 text-sm text-text leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* faq */}
      <Section bg="alt" className="py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Kicker>Questions sites vitrines</Kicker>
              <h2 className="display text-5xl md:text-6xl mt-5 text-text-strong">À <span className="italic">savoir</span>.</h2>
            </div>
            <div className="lg:col-span-8">
              <Faq q="Suis-je vraiment propriétaire du site ?" a="Oui. Le nom de domaine est enregistré à votre nom, vous recevez tous les accès (hébergement, back-office, code source). Aucune dépendance à GND."/>
              <Faq q="Comment se passe le paiement ?" a="50 % à la commande, 50 % à la livraison. Facture standard, virement bancaire. TVA non applicable (Art. 293 B du CGI)."/>
              <Faq q="Et si je veux des modifications plus tard ?" a="Toutes les évolutions font l'objet d'un devis transparent. Vous restez libre de confier la maintenance à qui vous voulez."/>
              <Faq q="Le SEO est-il vraiment inclus ?" a="Oui : optimisations techniques (vitesse, balises, structure), soumission Google Search Console, déclaration Google Business si pertinent."/>
              <Faq q="Et si je n'ai pas de contenu ?" a="Nous vous accompagnons sur la rédaction des textes et la photographie (en option). Pour les visuels, voir notre service Photographie."/>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand title="Prêt à lancer votre site ?" cta="Demander un devis personnalisé" sub="Réponse sous 24h, devis détaillé sous 48h."/>
    </main>
  );
}

export { SitesVitrinesPage };
