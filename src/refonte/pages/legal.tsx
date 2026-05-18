/* /mentions-legales + 404 — ported to ES modules */
import { Section, Container, Kicker, Btn, CinematicHero } from '../ui';
import { Icons } from '../icons';

const LEGAL_TOC = [
  { id:"editeur", t:"1. Éditeur du site" },
  { id:"directeur", t:"2. Directeur de publication" },
  { id:"hebergeur", t:"3. Hébergeur" },
  { id:"pi", t:"4. Propriété intellectuelle" },
  { id:"rgpd", t:"5. Données personnelles (RGPD)" },
  { id:"cookies", t:"6. Cookies" },
  { id:"ia", t:"7. Engagement éthique IA · AI Act" },
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
        kicker="Cadre LCEN — informations légales"
        eyebrow="mentions légales"
        title={<>Mentions<br/><span className="italic">légales</span>.</>}
        subtitle={<>Toutes les informations légales, RGPD, cookies et engagement éthique IA — clairement présentées. Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year:"numeric", month:"long", day:"2-digit" })}.</>}
        badges={["AI Act 2024/1689", "RGPD complet", "LCEN"]}
        ctas={<>
          <a href="#sommaire" className="btn btn-primary">Aller au sommaire <Icons.ArrowDown size={14}/></a>
          <a href="#/contact" className="btn !bg-bg/10 !text-bg !border !border-bg/20 hover:!bg-bg/15">Nous contacter <Icons.ArrowUpRight size={14}/></a>
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
                    <a href={`#/mentions-legales#${s.id}`} className="text-text hover:text-accent-deep transition">{s.t}</a>
                  </li>
                ))}
              </ol>
            </aside>

            {/* Body */}
            <div className="space-y-12 max-w-3xl">
              <Article id="editeur" t="1. Éditeur du site">
                <p><strong>GND Consulting</strong> — Entreprise individuelle / Auto-entrepreneur.</p>
                <ul className="space-y-1 mt-3">
                  <li>SIREN : <strong>939 676 136</strong></li>
                  <li>SIRET : <strong>939 676 136 00012</strong></li>
                  <li>Code APE : <strong>5911A</strong> (Production de films et de programmes pour la télévision)</li>
                  <li>RM : enregistrement du 15/01/2025</li>
                  <li>TVA : franchise en base — Art. 293 B du CGI</li>
                  <li>Adresse : Paris, France</li>
                </ul>
              </Article>

              <Article id="directeur" t="2. Directeur de publication & DPO">
                <p>Directeur de la publication et Délégué à la Protection des Données : <strong>Pierre Roodny</strong>.</p>
                <p>Contact : <a href="mailto:contact@gndconsulting.fr" className="underline decoration-accent underline-offset-4">contact@gndconsulting.fr</a> · 07 59 50 63 22.</p>
              </Article>

              <Article id="hebergeur" t="3. Hébergeur">
                <p><strong>Hostinger International Ltd.</strong> — 61 Lordou Vironos Street, 6023 Larnaca, Cyprus / Kaunas, Lituanie.</p>
              </Article>

              <Article id="pi" t="4. Propriété intellectuelle">
                <p>L'ensemble des contenus du site (textes, images, vidéos, identité visuelle, code) est protégé par le droit d'auteur. Toute reproduction non autorisée est interdite.</p>
                <p>Les œuvres présentées dans la section Réalisations restent la propriété de leurs ayants-droits respectifs.</p>
              </Article>

              <Article id="rgpd" t="5. Données personnelles (RGPD)">
                <p>Conformément au Règlement Général sur la Protection des Données (UE 2016/679), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition.</p>
                <p>Pour exercer ces droits, contactez le DPO. En cas de désaccord, vous pouvez saisir la <strong>CNIL</strong> (cnil.fr).</p>
                <p>Les données collectées via le formulaire de contact sont utilisées uniquement pour répondre à votre demande et conservées 3 ans après le dernier contact.</p>
              </Article>

              <Article id="cookies" t="6. Cookies">
                <p>Le site utilise des cookies de mesure d'audience anonymisés conformément à la délibération CNIL 2020-091. Vous pouvez les refuser via le bandeau de cookies sans altérer la navigation.</p>
              </Article>

              <Article id="ia" t="7. Engagement éthique IA · AI Act">
                <p>GND Consulting s'engage à utiliser l'intelligence artificielle de manière transparente et responsable, conformément au <strong>règlement européen IA (UE 2024/1689 — AI Act)</strong>.</p>
                <ul className="space-y-1 mt-3">
                  <li>— Usages IA classifiés acceptables uniquement, jamais à haut risque.</li>
                  <li>— Données clients non utilisées pour entraîner des modèles publics.</li>
                  <li>— Décision finale toujours humaine sur livrables créatifs.</li>
                  <li>— Crédits IA mentionnés sur les livrables le cas échéant.</li>
                </ul>
              </Article>

              <Article id="responsabilite" t="8. Limitation de responsabilité">
                <p>Les informations diffusées sur le site sont fournies à titre indicatif. GND Consulting met tout en œuvre pour en garantir l'exactitude mais ne saurait être tenu responsable d'éventuelles erreurs ou omissions.</p>
              </Article>

              <Article id="droit" t="9. Droit applicable & médiation">
                <p>Les présentes mentions sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute procédure. Plateforme européenne de règlement en ligne : ec.europa.eu/consumers/odr.</p>
              </Article>

              <Article id="evolution" t="10. Évolution des mentions">
                <p>GND Consulting se réserve le droit de modifier ces mentions à tout moment. La version applicable est celle en ligne à la date de votre visite.</p>
              </Article>

              <Article id="credits" t="11. Crédits">
                <p>Design & développement : GND Consulting. Typographies : Playfair Display & Inter (Google Fonts).</p>
              </Article>

              <Article id="contact" t="12. Contact">
                <p>Pour toute question concernant ces mentions : <a href="mailto:contact@gndconsulting.fr" className="underline decoration-accent underline-offset-4">contact@gndconsulting.fr</a>.</p>
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
            <h1 className="display text-5xl md:text-6xl mt-5 text-text-strong">Le contenu que vous cherchez s'est <span className="italic">échappé</span>.</h1>
            <p className="mt-6 text-text text-lg leading-relaxed max-w-md">Soit l'URL est erronée, soit nous avons réorganisé le site. Retournez à l'accueil ou explorez par section.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="#/" variant="primary">Retour à l'accueil</Btn>
              <Btn href="#/services" variant="secondary">Voir les services</Btn>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export { LegalPage, NotFoundPage };
