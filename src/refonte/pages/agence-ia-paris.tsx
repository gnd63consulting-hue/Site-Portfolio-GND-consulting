/* /agence-automatisation-ia-paris — page service local (SEO transactionnel).
 * 1 page = 1 requête « agence automatisation IA Paris » (anti-cannibalisation).
 * Même gabarit visuel que les pages villes (hero forme orange + personne détourée,
 * corps blog-details) mais contenu vertical IA/automatisation (offre différente).
 * Charte GND, zéro tiret cadratin, honnêteté (pas de prix inventé : diagnostic
 * gratuit puis devis sur-mesure ; coûts d'usage IA transparents).
 * Schemas : LocalBusiness + Service (areaServed Paris) via seo.ts,
 * FAQPage (FaqJsonLd) + BreadcrumbList.
 * Mots-clés via méthode BotSEO (framework Max), rédaction voix GND, 14/07/26. */
import * as React from 'react';
import { Icons } from '../icons';
import { FaqJsonLd } from '../components/FaqJsonLd';

const HERO_IMG = '/assets/ia-paris-hero-fondateur.webp';
const OFFICE_IMG = '/assets/ia-paris-bureau.webp';
const CADRAGE_IMG = '/assets/ia-paris-cadrage.webp';

const FAQ_ITEMS = [
  { q: "Combien coûte un projet d'automatisation IA à Paris ?", a: "Le diagnostic et la feuille de route sont offerts. Ensuite, le devis est établi sur-mesure selon le périmètre : un automatisme simple ne se chiffre pas comme un agent IA complet. Aucun abonnement imposé, et les éventuels coûts d'usage de l'IA vous sont expliqués clairement en amont." },
  { q: "Combien de temps pour mettre en place une automatisation ?", a: "Un premier automatisme utile est souvent livré en 2 à 4 semaines après le cadrage. Un agent IA plus complet ou une chaîne de workflows demande davantage, selon le nombre d'outils à connecter." },
  { q: "Mes données sont-elles en sécurité ?", a: "Oui. Nous travaillons sur vos comptes et vos accès, avec un hébergement et des connexions maîtrisés. Vous gardez la main sur vos données, et chaque automatisation est documentée." },
  { q: "Faut-il changer d'outils pour automatiser ?", a: "Non. Nous nous connectons à vos outils existants (messagerie, CRM, agenda, tableur, facturation). L'objectif est d'orchestrer ce que vous utilisez déjà, pas de tout remplacer." },
  { q: "Qu'est-ce que l'IA peut réellement automatiser dans mon entreprise ?", a: "Les tâches répétitives et chronophages : relances, tri et réponses d'emails, qualification de leads, saisie et recopie de données, génération de devis, reporting, prise de rendez-vous, support client de premier niveau." },
  { q: "Qui maintient l'automatisation une fois livrée ?", a: "Vous recevez une documentation et une prise en main. Vous êtes autonome. Une maintenance ou une évolution reste possible à la demande, jamais imposée par contrat." },
];

const PALETTE = `
.vsl{--o:#FF954F;--oink:#B4551C;--choco:#2A1810;--choco2:#3a2417;--txt:#532418;
  --txtsoft:#6b4a3a;--muted:#7D3E2C;--creme:#FDF6EE;--cremealt:#FFF3E8;--surface:#E8D8C5;
  --beige:#E2D5C3;--hair:rgba(83,36,24,.16);--serif:"Playfair Display",Georgia,serif;
  --sans:Inter,sans-serif;--mono:ui-monospace,"SF Mono",Menlo,monospace;
  background:var(--creme);color:var(--txt);font-family:var(--sans);}
.vsl *{box-sizing:border-box;}
.vsl .read{max-width:820px;margin:0 auto;padding:0 24px;}
.vsl .wrapx{max-width:1180px;margin:0 auto;padding:0 24px;}
.vsl-hero{position:relative;overflow:hidden;background:var(--cremealt);padding:120px 0 78px;min-height:660px;}
.vsl-hero .wrapx{position:relative;z-index:2;}
.vsl-col{max-width:620px;}
.vsl-eye{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:22px;}
.vsl-eye::before{content:"";width:34px;height:1px;background:var(--oink);}
.vsl-h1{position:relative;font-family:var(--serif);font-weight:700;letter-spacing:-.02em;color:var(--choco);font-size:clamp(40px,6.4vw,80px);line-height:.98;}
.vsl-h1 .circ{position:relative;display:inline-block;z-index:1;}
.vsl-h1 .circ::before{content:"";position:absolute;left:-14px;top:-8px;right:-14px;bottom:-6px;background:var(--o);border-radius:50%;z-index:-1;}
.vsl-sub{font-family:var(--serif);font-size:clamp(19px,2.4vw,26px);color:var(--muted);margin:24px 0 10px;max-width:32ch;line-height:1.28;}
.vsl-line{font-size:16.5px;color:var(--txt);max-width:44ch;margin:0 0 28px;line-height:1.55;}
.vsl-cta{display:flex;gap:12px;flex-wrap:wrap;}
.vsl-btn{display:inline-flex;align-items:center;gap:9px;font-weight:600;font-size:15px;padding:14px 24px;border-radius:40px;text-decoration:none;transition:transform .2s,box-shadow .2s;}
.vsl-btn.p{background:var(--o);color:var(--choco);box-shadow:0 10px 30px rgba(255,149,79,.35);}
.vsl-btn.p:hover{transform:translateY(-2px);}
.vsl-btn.s{background:transparent;color:var(--choco);border:1px solid rgba(83,36,24,.32);}
.vsl-btn.s:hover{background:rgba(83,36,24,.06);}
.vsl-fig{position:absolute;top:-25px;right:-120px;width:660px;height:800px;z-index:1;}
.vsl-blob{position:absolute;inset:0;background:var(--o);border-radius:44% 56% 52% 48% / 40% 62% 38% 60%;transform:rotate(-26deg);overflow:hidden;box-shadow:0 30px 80px rgba(83,36,24,.18);}
.vsl-blob .script{position:absolute;left:10%;top:52%;transform:rotate(26deg);font-family:var(--serif);font-style:italic;font-size:104px;color:rgba(255,255,255,.34);white-space:nowrap;pointer-events:none;letter-spacing:-.02em;}
.vsl-blobin{position:absolute;inset:0;transform:rotate(26deg) scale(1.02);transform-origin:58% 64%;display:flex;align-items:flex-end;justify-content:center;}
.vsl-fig .person{position:relative;height:99%;margin-bottom:-3%;transform:translateY(64px);object-fit:contain;filter:drop-shadow(0 12px 26px rgba(83,36,24,.22));}
.vsl-spin{position:absolute;left:70px;bottom:320px;width:118px;height:118px;z-index:4;}
.vsl-spin .ring{transform-origin:center;animation:vslspin 9s linear infinite;}
@keyframes vslspin{to{transform:rotate(360deg);}}
@media(prefers-reduced-motion:reduce){.vsl-spin .ring{animation:none;}}
@media(max-width:900px){.vsl-hero{min-height:0;padding-top:100px;} .vsl-fig{display:none;}}
.vsl-strip{background:var(--choco);color:var(--cremealt);}
.vsl-strip .grid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
.vsl-strip .c{padding:22px 24px;}
.vsl-strip .n{font-family:var(--serif);font-size:26px;color:#fff;}
.vsl-strip .l{font-size:12.5px;color:#dcc7b1;margin-top:4px;}
@media(max-width:720px){.vsl-strip .grid{grid-template-columns:repeat(2,1fr);}}
.vsl-band{background:var(--cremealt);padding-top:56px;}
.vsl-band .arttitle{font-family:var(--serif);font-weight:700;color:var(--choco);font-size:clamp(28px,4vw,42px);line-height:1.16;max-width:24ch;margin:12px 0 0;}
.vsl-band .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--oink);}
.vsl-body{background:var(--creme);padding:56px 0 72px;}
.vsl-body .lede{font-family:var(--serif);font-size:21px;color:var(--choco);border-left:2px solid var(--o);padding-left:20px;max-width:66ch;line-height:1.4;margin:0 0 8px;}
.vsl-body h2{font-family:var(--serif);font-weight:700;color:var(--choco);font-size:24px;margin:44px 0 14px;line-height:1.2;}
.vsl-body h2 .num{color:var(--oink);margin-right:11px;font-family:var(--mono);font-size:16px;}
.vsl-body p{font-size:18px;line-height:1.62;color:var(--txtsoft);margin:0 0 20px;max-width:68ch;}
.vsl-body p strong{color:var(--choco);}
.vsl-body ul.ll{list-style:none;padding:0;margin:6px 0 22px;}
.vsl-body ul.ll li{position:relative;padding-left:26px;margin:10px 0;font-size:17px;color:var(--txt);line-height:1.5;}
.vsl-body ul.ll li::before{content:"";position:absolute;left:0;top:7px;width:14px;height:14px;background:var(--oink);-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z'/%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z'/%3E%3C/svg%3E") center/contain no-repeat;}
.vsl-body table{width:100%;border-collapse:collapse;margin:16px 0 10px;font-size:15px;}
.vsl-body th{text-align:left;padding:12px 14px;background:var(--cremealt);border-bottom:2px solid var(--o);color:var(--choco);font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;}
.vsl-body td{padding:13px 14px;border-bottom:1px solid var(--hair);vertical-align:top;color:var(--txtsoft);}
.vsl-body .price td:last-child{font-weight:700;color:var(--choco);white-space:nowrap;}
.vsl-body .cmp td:nth-child(2){color:var(--oink);font-weight:700;}
.vsl-scroll{overflow-x:auto;}
figure.vsl-shot{margin:28px 0 6px;}
figure.vsl-shot img{width:100%;height:auto;display:block;border-radius:16px;box-shadow:0 18px 50px rgba(83,36,24,.15);}
figure.vsl-shot figcaption{margin-top:9px;font-size:13.5px;color:var(--muted);font-style:italic;line-height:1.5;}
.vsl-qa{border-top:1px solid var(--hair);padding:18px 0;}
.vsl-qa:last-of-type{border-bottom:1px solid var(--hair);}
.vsl-qa .q{font-weight:600;color:var(--choco);font-size:17px;}
.vsl-qa .a{font-size:15.5px;color:var(--txtsoft);margin:9px 0 0;max-width:72ch;line-height:1.55;}
.vsl-pills{display:flex;flex-wrap:wrap;gap:9px;margin-top:34px;}
.vsl-pills span{font-size:12px;font-family:var(--mono);letter-spacing:.04em;text-transform:uppercase;color:var(--choco);border:1px solid rgba(83,36,24,.28);padding:6px 15px;border-radius:40px;}
.vsl-final{background:var(--choco);color:var(--cremealt);border-radius:26px;padding:52px 40px;margin:44px auto 0;max-width:1132px;text-align:center;}
.vsl-final h2{font-family:var(--serif);font-weight:700;color:#fff;font-size:clamp(26px,4vw,40px);line-height:1.1;}
.vsl-final p{color:#dcc7b1;max-width:56ch;margin:14px auto 24px;font-size:16.5px;line-height:1.55;}
.vsl-final .vsl-btn.p{box-shadow:0 12px 34px rgba(255,149,79,.4);}
`;

export function AgenceIaParisPage() {
  return (
    <main id="main" className="vsl">
      <style>{PALETTE}</style>
      <FaqJsonLd id="ia-paris" items={FAQ_ITEMS} />

      <header className="vsl-hero">
        <div className="wrapx">
          <div className="vsl-col">
            <span className="vsl-eye">Automatisation &amp; IA · Paris</span>
            <h1 className="vsl-h1">Agence automatisation <span className="circ">IA</span> à Paris.</h1>
            <p className="vsl-sub">Agents IA, automatisation de vos process et intégrations sur-mesure, par un studio hybride humain × IA.</p>
            <p className="vsl-line">Des workflows qui tournent tout seuls, connectés à vos outils. Cadrage clair, résultat mesurable, diagnostic offert.</p>
            <div className="vsl-cta">
              <a className="vsl-btn p" href="/contact#rdv">Diagnostic gratuit <Icons.ArrowUpRight size={15} /></a>
              <a className="vsl-btn s" href="/realisations">Voir nos réalisations <Icons.ArrowRight size={15} /></a>
            </div>
          </div>
        </div>

        <div className="vsl-fig" aria-hidden="true">
          <div className="vsl-blob">
            <span className="script">Paris</span>
            <div className="vsl-blobin">
              <img className="person" src={HERO_IMG} alt="Fondateur d'entreprise dans un bureau moderne à Paris" loading="eager" width={900} height={1200} />
            </div>
          </div>
          <svg className="vsl-spin" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="58" fill="#2A1810" /><circle cx="60" cy="60" r="57" fill="none" stroke="#FF954F" strokeWidth="1.5" />
            <g className="ring"><path id="iapcp" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" fill="none" />
              <text fill="#FDF6EE" fontFamily="ui-monospace,monospace" fontSize="11.5" letterSpacing="3.4"><textPath href="#iapcp">· DIAGNOSTIC GRATUIT · SANS ENGAGEMENT </textPath></text></g>
            <path d="M52 52l16 8-16 8z" fill="#FF954F" />
          </svg>
        </div>
      </header>

      <div className="vsl-strip">
        <div className="grid">
          <div className="c"><div className="n">24 h/24</div><div className="l">Vos process automatisés</div></div>
          <div className="c"><div className="n">Vos outils</div><div className="l">Connectés, pas remplacés</div></div>
          <div className="c"><div className="n">IA</div><div className="l">Agents, chatbots, workflows</div></div>
          <div className="c"><div className="n">Paris</div><div className="l">&amp; Île-de-France</div></div>
        </div>
      </div>

      <section className="vsl-band">
        <div className="read">
          <div className="eyebrow">Guide</div>
          <h2 className="arttitle">Automatiser votre entreprise avec l'IA à Paris, sans usine à gaz</h2>
        </div>
      </section>

      <section className="vsl-body">
        <div className="read">
          <p className="lede">Vous cherchez une agence d'automatisation IA à Paris pour libérer du temps sur les tâches répétitives ? GND est un studio hybride humain × IA qui conçoit des agents IA, des chatbots et des workflows connectés à vos outils. On part de vos vrais irritants, on cadre, on livre un automatisme qui tourne, et vous restez maître de vos données.</p>

          <h2><span className="num">01</span>Pourquoi l'automatisation IA est un levier concret pour les entreprises à Paris</h2>
          <p>Dans une PME, une part énorme du temps part dans des tâches sans valeur ajoutée : recopier des données d'un outil à l'autre, relancer des clients, trier des emails, produire des devis, remplir un reporting. Ces tâches sont répétitives, prévisibles, et donc automatisables.</p>
          <p>À Paris et en Île-de-France, la concurrence pour recruter et retenir les talents est rude, et le temps des équipes coûte cher. Automatiser avec l'IA, ce n'est pas remplacer vos collaborateurs : c'est leur rendre les heures perdues sur des manipulations sans intérêt, pour les concentrer sur le client et la production. C'est un levier de marge et de sérénité, pas un gadget.</p>

          <figure className="vsl-shot">
            <img src={OFFICE_IMG} alt="Bureau moderne et premium à Paris" loading="lazy" width={1600} height={893} />
            <figcaption>Des process qui tournent en arrière-plan pendant que vos équipes se concentrent sur ce qui compte vraiment.</figcaption>
          </figure>

          <h2><span className="num">02</span>Ce que nous automatisons</h2>
          <p>On ne vend pas de « l'IA » en général. On s'attaque à des tâches précises, celles qui vous coûtent des heures chaque semaine :</p>
          <ul className="ll">
            <li><strong>Emails :</strong> tri, réponses de premier niveau, résumés, relances automatiques.</li>
            <li><strong>Commercial :</strong> qualification de leads, mise à jour du CRM, génération de devis.</li>
            <li><strong>Administratif :</strong> saisie et recopie de données, rapprochement, extraction de documents.</li>
            <li><strong>Relation client :</strong> chatbot sur votre site, prise de rendez-vous, FAQ intelligente.</li>
            <li><strong>Pilotage :</strong> reporting automatique, tableaux de bord tenus à jour tout seuls.</li>
          </ul>

          <h2><span className="num">03</span>Nos briques : agents IA, chatbots et workflows</h2>
          <p>Concrètement, nous assemblons trois types de briques selon votre besoin. Les <strong>agents IA</strong> raisonnent et agissent sur une tâche (lire, décider, rédiger, déclencher). Les <strong>chatbots</strong> répondent à vos clients ou à vos équipes. Les <strong>workflows d'automatisation</strong> (type n8n ou Make) orchestrent le tout et connectent vos outils entre eux. On choisit la solution la plus simple qui fait le travail, jamais la plus impressionnante à montrer.</p>

          <h2><span className="num">04</span>Un studio parisien, hybride humain × IA</h2>
          <p>GND est un studio créatif et technique basé à Paris. Nous intervenons pour des entreprises à Paris et dans toute l'Île-de-France, en visio et sur place quand c'est utile. Notre méthode hybride humain × IA nous rend rapides et accessibles : on prototype vite, on itère avec vous, et on garde un humain dans la boucle sur les décisions sensibles. Vous n'avez pas affaire à une boîte noire, mais à une équipe qui vous explique ce qu'elle fait.</p>

          <h2><span className="num">05</span>Notre méthode en 4 étapes</h2>
          <ul className="ll">
            <li><strong>Diagnostic (offert) :</strong> on identifie ensemble les tâches les plus chronophages et automatisables.</li>
            <li><strong>Cadrage :</strong> feuille de route claire, périmètre, outils à connecter, devis sur-mesure.</li>
            <li><strong>Build :</strong> on développe et on teste l'automatisation sur vos cas réels.</li>
            <li><strong>Mise en production + suivi :</strong> déploiement, documentation, prise en main de vos équipes.</li>
          </ul>
          <p>Un premier automatisme utile est souvent livré en 2 à 4 semaines après le cadrage.</p>

          <figure className="vsl-shot">
            <img src={CADRAGE_IMG} alt="Séance de cadrage d'un projet d'automatisation IA" loading="lazy" width={1600} height={900} />
            <figcaption>Tout commence par un cadrage honnête : quels process, quel gain attendu, quels outils. Le diagnostic est offert.</figcaption>
          </figure>

          <h2><span className="num">06</span>Vos données, vos accès, votre autonomie</h2>
          <p>Une automatisation touche à vos outils et à vos données : la confiance est non négociable. <strong>Nous travaillons sur vos comptes et vos accès</strong>, avec des connexions maîtrisées et un hébergement clair. Chaque automatisation est documentée pour que vous puissiez la comprendre, la reprendre ou la faire évoluer. Aucun enfermement : vous restez propriétaire de vos flux et de vos données.</p>

          <h2><span className="num">07</span>Pour qui</h2>
          <ul className="ll">
            <li><strong>TPE &amp; PME :</strong> automatiser sans DSI, en gardant un budget maîtrisé.</li>
            <li><strong>Professions libérales &amp; cabinets :</strong> prise de rendez-vous, relances, préparation de dossiers.</li>
            <li><strong>E-commerce :</strong> support client, suivi de commandes, gestion des avis et des stocks.</li>
            <li><strong>Agences &amp; indépendants :</strong> production de contenu assistée, reporting client, qualification.</li>
          </ul>

          <h2><span className="num">08</span>Pourquoi GND plutôt qu'un prestataire classique</h2>
          <div className="vsl-scroll">
            <table className="price cmp">
              <thead><tr><th>Critère</th><th>GND</th><th>Prestataire classique</th></tr></thead>
              <tbody>
                <tr><td>Diagnostic de départ</td><td>Offert</td><td>Souvent facturé</td></tr>
                <tr><td>Approche</td><td>Vos vrais irritants d'abord</td><td>Solution imposée</td></tr>
                <tr><td>Vos outils</td><td>Connectés, pas remplacés</td><td>Migration forcée fréquente</td></tr>
                <tr><td>Propriété des flux &amp; données</td><td>À vous, documentée</td><td>Variable, parfois verrouillée</td></tr>
                <tr><td>Maintenance</td><td>À la demande, jamais imposée</td><td>Abonnement souvent obligatoire</td></tr>
              </tbody>
            </table>
          </div>

          <h2><span className="num">09</span>Vos questions sur l'automatisation IA à Paris</h2>
          {FAQ_ITEMS.map((f) => (
            <div className="vsl-qa" key={f.q}>
              <div className="q">{f.q}</div>
              <div className="a">{f.a}</div>
            </div>
          ))}

          <div className="vsl-pills">
            <span>Automatisation IA Paris</span><span>Agent IA</span><span>Chatbot</span><span>Workflows n8n</span><span>Île-de-France</span>
          </div>
        </div>
      </section>

      <div className="vsl">
        <div className="vsl-final">
          <h2>Un process qui vous fait perdre du temps ?</h2>
          <p>Dites-nous lequel. Le diagnostic est gratuit et sans engagement : on vous dit franchement si l'IA peut l'automatiser, et ce que ça change pour vous.</p>
          <a className="vsl-btn p" href="/contact#rdv">Demander mon diagnostic gratuit <Icons.ArrowUpRight size={15} /></a>
        </div>
      </div>

      <div style={{ height: '64px' }} />
    </main>
  );
}
