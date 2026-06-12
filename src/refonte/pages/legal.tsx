/* /mentions-legales + 404, ported to ES modules.
   Faits juridiques AUTORITATIFS reproduits depuis le live src/components/MentionsLegales.tsx. */
import { Section, Container, Kicker, Btn, CinematicHero } from '../ui';
import { Icons } from '../icons';

const LEGAL_UPDATED = "octobre 2025"; // date réelle du texte légal autoritatif (pas new Date())

const LEGAL_TOC = [
  { id:"editeur", t:"1. Éditeur du site" },
  { id:"directeur", t:"2. Responsabilité éditoriale & DPO" },
  { id:"hebergeur", t:"3. Hébergement" },
  { id:"pi", t:"4. Propriété intellectuelle" },
  { id:"rgpd", t:"5. Données personnelles (RGPD)" },
  { id:"cookies", t:"6. Cookies" },
  { id:"ia", t:"7. Intelligence artificielle · AI Act" },
  { id:"responsabilite", t:"8. Limitation de responsabilité" },
  { id:"droit", t:"9. Droit applicable & médiation" },
  { id:"evolution", t:"10. Évolution des mentions" },
  { id:"credits", t:"11. Crédits" },
  { id:"contact", t:"12. Contact" },
];

function LegalPage() {
  return (
    <main id="main">
      <CinematicHero
        kicker="Cadre LCEN, informations légales"
        eyebrow="mentions légales"
        title={<>Mentions<br/><span className="italic text-accent">légales</span>.</>}
        subtitle={<>Informations légales, RGPD, cookies et engagement éthique IA, clairement présentées. Dernière mise à jour : {LEGAL_UPDATED}.</>}
        badges={["AI Act 2024/1689", "RGPD complet", "LCEN"]}
        ctas={<>
          <a href="#sommaire" className="btn btn-primary">Aller au sommaire <Icons.ArrowDown size={14}/></a>
          <a href="/contact" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Nous contacter <Icons.ArrowUpRight size={14}/></a>
        </>}
        footerLabel="mentions légales"
      />

      <Section id="sommaire" className="pb-24 md:pb-32 pt-20">
        <Container>
          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* TOC */}
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="label-mono mb-4">Sommaire</div>
              <ol className="space-y-2 text-sm">
                {LEGAL_TOC.map(s => (
                  <li key={s.id}>
                    <a href={`/mentions-legales#${s.id}`} className="text-text hover:text-accent-deep transition">{s.t}</a>
                  </li>
                ))}
              </ol>
            </aside>

            {/* Body */}
            <div className="space-y-12 max-w-3xl">
              <Article id="editeur" t="1. Éditeur du site">
                <p>Le présent site est édité par <strong>GND Consulting</strong>.</p>
                <ul className="space-y-1 mt-3">
                  <li>Forme juridique : <strong>Entrepreneur Individuel (EI), Auto-entrepreneur</strong></li>
                  <li>SIREN : <strong>939 676 136</strong></li>
                  <li>SIRET : <strong>939 676 136 00012</strong></li>
                  <li>Code APE / NAF : <strong>5911A</strong>, Production de films et de programmes pour la télévision</li>
                  <li>Immatriculation : Répertoire des Métiers (RM), date d'immatriculation : <strong>15 janvier 2025</strong></li>
                  <li>Capital social : non applicable (entreprise individuelle)</li>
                  <li>TVA : franchise en base de TVA, <strong>article 293 B du CGI</strong> (TVA non applicable)</li>
                  <li>Siège social : <strong>Paris, France</strong></li>
                </ul>
              </Article>

              <Article id="directeur" t="2. Responsabilité éditoriale & DPO">
                <p>Directeur de la publication, responsable éditorial et Délégué à la Protection des Données (DPO) : <strong>Pierre Roodny</strong>.</p>
                <p>Contact : <a href="mailto:contact@gndconsulting.fr" className="underline decoration-accent underline-offset-4">contact@gndconsulting.fr</a> · 07 59 50 63 22.</p>
              </Article>

              <Article id="hebergeur" t="3. Hébergement">
                <p>Le site est hébergé par :</p>
                <p><strong>Hostinger International Ltd.</strong><br/>Jonavos g. 60C, 44192 Kaunas, Lituanie<br/><a href="https://www.hostinger.fr" className="underline decoration-accent underline-offset-4">www.hostinger.fr</a></p>
              </Article>

              <Article id="pi" t="4. Propriété intellectuelle">
                <p>L'ensemble des contenus du site (textes, images, vidéos, identité visuelle, code, structure) est la propriété exclusive de GND Consulting, sauf mention contraire, et protégé par le droit d'auteur, <strong>articles L.335-2 et suivants du Code de la propriété intellectuelle</strong>.</p>
                <p>Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite et constitue une contrefaçon.</p>
                <p>Les œuvres présentées dans la section Réalisations restent la propriété de leurs ayants-droits respectifs (artistes, clients, partenaires) et sont diffusées avec leur accord.</p>
              </Article>

              <Article id="rgpd" t="5. Données personnelles (RGPD)">
                <p>Conformément au <strong>Règlement Général sur la Protection des Données (UE 2016/679)</strong> et à la loi Informatique et Libertés du 6 janvier 1978 modifiée :</p>
                <ul className="space-y-1 mt-3">
                  <li><strong>Responsable du traitement :</strong> GND Consulting, Pierre Roodny (DPO), <a href="mailto:contact@gndconsulting.fr" className="underline decoration-accent underline-offset-4">contact@gndconsulting.fr</a>.</li>
                  <li><strong>Données collectées :</strong> nom, prénom, email, téléphone, entreprise, contenu du message, données de navigation.</li>
                  <li><strong>Finalités :</strong> réponse aux demandes, gestion de la relation client, obligations légales et comptables, amélioration du site.</li>
                  <li><strong>Bases légales :</strong> consentement, exécution contractuelle, obligation légale et intérêt légitime (art. 6.1 a, b, c et f du RGPD).</li>
                  <li><strong>Destinataires :</strong> exclusivement GND Consulting. Les données ne sont jamais revendues ni cédées à des tiers à des fins commerciales.</li>
                  <li><strong>Durées de conservation :</strong> prospects 3 ans après le dernier contact ; clients durée contractuelle + 5 ans ; données comptables 10 ans ; données de navigation 13 mois.</li>
                  <li><strong>Vos droits :</strong> accès, rectification, effacement, limitation, portabilité, opposition et retrait du consentement, en écrivant au DPO.</li>
                </ul>
                <p className="mt-3">En cas de désaccord, vous pouvez saisir la <strong>CNIL</strong>, 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, tél. 01 53 73 22 22, <a href="https://www.cnil.fr" className="underline decoration-accent underline-offset-4">www.cnil.fr</a>.</p>
              </Article>

              <Article id="cookies" t="6. Cookies">
                <p>Conformément à la délibération <strong>CNIL n° 2020-091 du 17 septembre 2020</strong>, le site peut utiliser : des cookies essentiels, des cookies de préférences, des cookies de mesure d'audience anonymisée et des fonctionnalités tierces.</p>
                <p>Vous pouvez accepter ou refuser les cookies non essentiels via le bandeau dédié ou les réglages de votre navigateur, sans altérer la navigation. La <strong>durée de validité du consentement est de 6 mois maximum</strong>.</p>
              </Article>

              <Article id="ia" t="7. Intelligence artificielle · AI Act">
                <p>GND Consulting intègre des outils d'intelligence artificielle dans sa chaîne créative, dans le respect du <strong>RGPD et du règlement européen sur l'IA (Règlement UE 2024/1689, AI Act, entré en vigueur en août 2024)</strong>.</p>
                <ul className="space-y-1 mt-3">
                  <li>Usage éthique, transparent et sécurisé ; usages classifiés acceptables uniquement, jamais à haut risque.</li>
                  <li>Aucune donnée client n'est utilisée pour entraîner des modèles tiers sans consentement explicite.</li>
                  <li>Mention transparente lorsqu'un contenu est généré ou assisté par IA, le cas échéant.</li>
                  <li>Décision créative finale toujours humaine, aucun arbitrage final laissé à un système automatisé seul.</li>
                </ul>
              </Article>

              <Article id="responsabilite" t="8. Limitation de responsabilité">
                <p>Les informations diffusées sur le site sont fournies à titre indicatif. GND Consulting met tout en œuvre pour en garantir l'exactitude mais ne saurait être tenu responsable des erreurs, omissions, indisponibilités du service, ou dommages directs ou indirects résultant de l'usage du site ou des liens externes qu'il contient.</p>
              </Article>

              <Article id="droit" t="9. Droit applicable & médiation">
                <p>Les présentes mentions sont soumises au droit français ; les tribunaux français sont compétents. Une solution amiable sera recherchée avant toute procédure.</p>
                <p>Aucun médiateur de la consommation spécifique n'est actuellement désigné. Plateforme européenne de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" className="underline decoration-accent underline-offset-4">ec.europa.eu/consumers/odr</a>.</p>
              </Article>

              <Article id="evolution" t="10. Évolution des mentions">
                <p>GND Consulting se réserve le droit de modifier les présentes mentions à tout moment. La version applicable est celle en ligne à la date de votre visite ; il vous appartient de la consulter régulièrement. Dernière mise à jour : {LEGAL_UPDATED}.</p>
              </Article>

              <Article id="credits" t="11. Crédits">
                <p>Conception & design : GND Consulting. Développement web : GND Consulting. Réalisation : <strong>Pierre Roodny</strong>. Hébergement : Hostinger International Ltd. Typographies : Playfair Display & Inter (Google Fonts).</p>
              </Article>

              <Article id="contact" t="12. Contact">
                <p>Pour toute question relative aux présentes mentions ou à vos données : <a href="mailto:contact@gndconsulting.fr" className="underline decoration-accent underline-offset-4">contact@gndconsulting.fr</a> · 07 59 50 63 22 · Paris, France.</p>
              </Article>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function Article({ id, t, children }: any) {
  return (
    <article id={id} className="scroll-mt-24">
      <h2 className="display text-3xl md:text-4xl text-text-strong">{t}</h2>
      <div className="mt-5 space-y-3 text-text leading-relaxed">{children}</div>
    </article>
  );
}

function NotFoundPage() {
  return (
    <main id="main" className="min-h-screen flex items-center pt-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="display text-[18vw] lg:text-[14rem] leading-none text-text-strong tracking-huge">404</div>
          </div>
          <div>
            <Kicker>Page introuvable</Kicker>
            <h1 className="display text-5xl md:text-6xl mt-5 text-text-strong">Le contenu que vous cherchez s'est <span className="italic text-accent">échappé</span>.</h1>
            <p className="mt-6 text-text text-lg leading-relaxed max-w-md">Soit l'URL est erronée, soit nous avons réorganisé le site. Retournez à l'accueil ou explorez par section.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="/" variant="primary">Retour à l'accueil</Btn>
              <Btn href="/services" variant="secondary">Voir les services</Btn>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export { LegalPage, NotFoundPage };
