/* /agence-web-versailles — page locale (SEO transactionnel).
 * 1 page = 1 requête « agence web Versailles » (anti-cannibalisation).
 * Hero repris du gabarit validé (forme orange diagonale façon Perez +
 * restaurateur détouré) ; corps façon blog-details. Charte GND, zéro tiret
 * cadratin, prix publics uniquement, honnêteté (pas de bureau à Versailles).
 * Schemas : LocalBusiness + Service (areaServed Versailles/78) via seo.ts,
 * FAQPage (FaqJsonLd) + BreadcrumbList. Duplicable par ville.
 * Contenu rédigé via le parcours BotSEO (Max + Léa), 12-13/07/26. */
import * as React from 'react';
import { Icons } from '../icons';
import { FaqJsonLd } from '../components/FaqJsonLd';

const HERO_IMG = '/assets/versailles-hero-restaurateur.webp';
const TERRASSE_IMG = '/assets/versailles-terrasse.webp';
const MOBILE_IMG = '/assets/versailles-mobile-seo.webp';

/* FAQ visible = FAQ balisée (règle Google : correspondance contenu/markup). */
const FAQ_ITEMS = [
  { q: 'Combien coûte un site internet à Versailles ?', a: "Deux formules à prix fixe et public : 800 € HT pour un site vitrine complet, 1 500 € HT avec réservation en ligne. Fermes, sans surprise en cours de projet, quand le marché se situe souvent entre 2 000 et 6 000 €." },
  { q: 'Intervenez-vous vraiment à Versailles ?', a: "Oui. Studio basé à Paris, nous intervenons régulièrement à Versailles et dans le 78. Nous n'avons pas de bureau sur place et préférons vous le dire clairement. Échanges à distance, déplacement possible si le projet le nécessite." },
  { q: 'Quels délais de livraison pour un site à Versailles ?', a: "3 semaines en moyenne à compter de la validation du brief : maquette, développement, intégration, référencement local et mise en ligne. À anticiper : la fourniture de vos textes et photos." },
  { q: 'Serai-je propriétaire de mon site ?', a: "Oui, à 100 % et contractuellement. Accès à l'hébergement, au code et à l'administration. Aucun contrat de maintenance obligatoire, transfert libre quand vous voulez." },
  { q: 'Proposez-vous la refonte d’un site internet existant à Versailles ?', a: "Oui. Audit de l'existant, nouvelle structure, migration des contenus, optimisation du référencement et des performances. La refonte démarre à 800 € HT selon l'ampleur." },
  { q: 'Le référencement local (SEO) est-il inclus ?', a: "Oui, dans chaque création. Contenu localisé, technique propre, configuration de la fiche Google Business : votre site est conçu pour apparaître sur les recherches de vos clients à Versailles et dans les Yvelines." },
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

/* HERO */
.vsl-hero{position:relative;overflow:hidden;background:var(--cremealt);padding:120px 0 78px;min-height:660px;}
.vsl-hero .wrapx{position:relative;z-index:2;}
.vsl-col{max-width:600px;}
.vsl-eye{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:22px;}
.vsl-eye::before{content:"";width:34px;height:1px;background:var(--oink);}
.vsl-h1{position:relative;font-family:var(--serif);font-weight:700;letter-spacing:-.02em;color:var(--choco);font-size:clamp(44px,7.4vw,92px);line-height:.96;}
.vsl-h1 .circ{position:relative;display:inline-block;z-index:1;}
.vsl-h1 .circ::before{content:"";position:absolute;left:-12px;top:-6px;width:78px;height:78px;background:var(--o);border-radius:50%;z-index:-1;}
.vsl-sub{font-family:var(--serif);font-size:clamp(19px,2.4vw,26px);color:var(--muted);margin:24px 0 10px;max-width:30ch;line-height:1.28;}
.vsl-line{font-size:16.5px;color:var(--txt);max-width:42ch;margin:0 0 28px;line-height:1.55;}
.vsl-cta{display:flex;gap:12px;flex-wrap:wrap;}
.vsl-btn{display:inline-flex;align-items:center;gap:9px;font-weight:600;font-size:15px;padding:14px 24px;border-radius:40px;text-decoration:none;transition:transform .2s,box-shadow .2s;}
.vsl-btn.p{background:var(--o);color:var(--choco);box-shadow:0 10px 30px rgba(255,149,79,.35);}
.vsl-btn.p:hover{transform:translateY(-2px);}
.vsl-btn.s{background:transparent;color:var(--choco);border:1px solid rgba(83,36,24,.32);}
.vsl-btn.s:hover{background:rgba(83,36,24,.06);}

.vsl-fig{position:absolute;top:-90px;right:-120px;width:660px;height:800px;z-index:1;}
.vsl-blob{position:absolute;inset:0;background:var(--o);border-radius:44% 56% 52% 48% / 40% 62% 38% 60%;transform:rotate(-26deg);overflow:hidden;box-shadow:0 30px 80px rgba(83,36,24,.18);}
.vsl-blob .script{position:absolute;left:8%;top:52%;transform:rotate(26deg);font-family:var(--serif);font-style:italic;font-size:96px;color:rgba(255,255,255,.34);white-space:nowrap;pointer-events:none;letter-spacing:-.02em;}
.vsl-blobin{position:absolute;inset:0;transform:rotate(26deg) scale(1.02);transform-origin:58% 64%;display:flex;align-items:flex-end;justify-content:center;}
.vsl-fig .person{position:relative;height:99%;margin-bottom:-3%;object-fit:contain;filter:drop-shadow(0 12px 26px rgba(83,36,24,.22));}
.vsl-spin{position:absolute;left:120px;bottom:180px;width:120px;height:120px;z-index:4;}
.vsl-spin .ring{transform-origin:center;animation:vslspin 9s linear infinite;}
@keyframes vslspin{to{transform:rotate(360deg);}}
@media(prefers-reduced-motion:reduce){.vsl-spin .ring{animation:none;}}
@media(max-width:900px){.vsl-hero{min-height:0;padding-top:100px;} .vsl-fig{display:none;}}

/* TRUST STRIP */
.vsl-strip{background:var(--choco);color:var(--cremealt);}
.vsl-strip .grid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);}
.vsl-strip .c{padding:22px 24px;}
.vsl-strip .n{font-family:var(--serif);font-size:26px;color:#fff;}
.vsl-strip .l{font-size:12.5px;color:#dcc7b1;margin-top:4px;}
@media(max-width:720px){.vsl-strip .grid{grid-template-columns:repeat(2,1fr);}}

/* BAND + BODY */
.vsl-band{background:var(--cremealt);padding-top:56px;}
.vsl-band .arttitle{font-family:var(--serif);font-weight:700;color:var(--choco);font-size:clamp(28px,4vw,42px);line-height:1.16;max-width:22ch;margin:12px 0 0;}
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

/* FAQ */
.vsl-qa{border-top:1px solid var(--hair);padding:18px 0;}
.vsl-qa:last-of-type{border-bottom:1px solid var(--hair);}
.vsl-qa .q{font-weight:600;color:var(--choco);font-size:17px;}
.vsl-qa .a{font-size:15.5px;color:var(--txtsoft);margin:9px 0 0;max-width:72ch;line-height:1.55;}
.vsl-pills{display:flex;flex-wrap:wrap;gap:9px;margin-top:34px;}
.vsl-pills span{font-size:12px;font-family:var(--mono);letter-spacing:.04em;text-transform:uppercase;color:var(--choco);border:1px solid rgba(83,36,24,.28);padding:6px 15px;border-radius:40px;}

/* FINAL CTA */
.vsl-final{background:var(--choco);color:var(--cremealt);border-radius:26px;padding:52px 40px;margin:44px auto 0;max-width:1132px;text-align:center;}
.vsl-final h2{font-family:var(--serif);font-weight:700;color:#fff;font-size:clamp(26px,4vw,40px);line-height:1.1;}
.vsl-final p{color:#dcc7b1;max-width:54ch;margin:14px auto 24px;font-size:16.5px;line-height:1.55;}
.vsl-final .vsl-btn.p{box-shadow:0 12px 34px rgba(255,149,79,.4);}
`;

export function VersaillesPage() {
  return (
    <main id="main" className="vsl">
      <style>{PALETTE}</style>
      <FaqJsonLd id="versailles" items={FAQ_ITEMS} />

      {/* HERO façon Perez : forme orange diagonale ancrée coin haut-droit */}
      <header className="vsl-hero">
        <div className="wrapx">
          <div className="vsl-col">
            <span className="vsl-eye">Sites web &amp; SEO · Versailles (78)</span>
            <h1 className="vsl-h1">Agence web à <span className="circ">Versailles</span>.</h1>
            <p className="vsl-sub">Création de site internet dans les Yvelines, par un studio créatif hybride humain × IA.</p>
            <p className="vsl-line">Votre site vitrine clé en main, référencement local inclus, dès 800 €. Paiement unique, aucun abonnement.</p>
            <div className="vsl-cta">
              <a className="vsl-btn p" href="/contact#rdv">Demander un devis gratuit <Icons.ArrowUpRight size={15} /></a>
              <a className="vsl-btn s" href="/realisations">Voir nos réalisations <Icons.ArrowRight size={15} /></a>
            </div>
          </div>
        </div>

        <div className="vsl-fig" aria-hidden="true">
          <div className="vsl-blob">
            <span className="script">Versailles</span>
            <div className="vsl-blobin">
              <img className="person" src={HERO_IMG} alt="Restaurateur accueillant dans son restaurant à Versailles" loading="eager" width={900} height={1200} />
            </div>
          </div>
          <svg className="vsl-spin" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="58" fill="#2A1810" /><circle cx="60" cy="60" r="57" fill="none" stroke="#FF954F" strokeWidth="1.5" />
            <g className="ring"><path id="vslcp" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" fill="none" />
              <text fill="#FDF6EE" fontFamily="ui-monospace,monospace" fontSize="11.5" letterSpacing="3.2"><textPath href="#vslcp">· DEVIS GRATUIT · SANS ENGAGEMENT </textPath></text></g>
            <path d="M52 52l16 8-16 8z" fill="#FF954F" />
          </svg>
        </div>
      </header>

      {/* TRUST STRIP */}
      <div className="vsl-strip">
        <div className="grid">
          <div className="c"><div className="n">800&nbsp;€</div><div className="l">Vitrine dès, paiement unique</div></div>
          <div className="c"><div className="n">0&nbsp;€</div><div className="l">D'abonnement, jamais</div></div>
          <div className="c"><div className="n">SEO</div><div className="l">Local + fiche Google inclus</div></div>
          <div className="c"><div className="n">78</div><div className="l">Versailles &amp; Yvelines</div></div>
        </div>
      </div>

      {/* BAND */}
      <section className="vsl-band">
        <div className="read">
          <div className="eyebrow">Guide local</div>
          <h2 className="arttitle">Créer votre site internet à Versailles, sans devis surprise ni abonnement</h2>
        </div>
      </section>

      {/* BODY */}
      <section className="vsl-body">
        <div className="read">
          <p className="lede">Vous cherchez une agence web à Versailles pour la création de votre site internet ? Commerçant, artisan, profession libérale ou restaurateur, GND est un studio créatif hybride basé à Paris qui intervient dans tout le 78. Prix publics, méthode transparente, et un site qui vous appartient dès la livraison.</p>

          <h2><span className="num">01</span>Pourquoi votre visibilité locale est un vrai enjeu à Versailles</h2>
          <p>Aujourd'hui, une large part des recherches Google ont une intention locale. Quand un Versaillais tape « plombier Versailles » ou « restaurant Versailles » sur son téléphone, il attend un résultat proche, crédible, dans les secondes qui suivent. Les entreprises visibles dans le haut des résultats locaux captent l'essentiel des appels et des visites.</p>
          <p>Si votre site est absent, lent ou mal référencé, c'est un client qui choisit le concurrent à deux rues. Un site internet à Versailles n'est plus un luxe : c'est le socle minimum pour exister au-delà du bouche-à-oreille.</p>

          <figure className="vsl-shot">
            <img src={TERRASSE_IMG} alt="Terrasse d'un restaurant à Versailles au coucher du soleil" loading="lazy" width={1600} height={900} />
            <figcaption>Versailles et les Yvelines : un tissu local dense de commerces, restaurants et artisans qui se cherchent d'abord sur Google.</figcaption>
          </figure>

          <h2><span className="num">02</span>Une offre claire, des tarifs publics</h2>
          <p>Chez la plupart des agences web des Yvelines, la réponse à « combien ça coûte » est « contactez-nous pour un devis ». Nous faisons l'inverse : <strong>les tarifs sont publics, ici, maintenant.</strong></p>
          <div className="vsl-scroll">
            <table className="price">
              <thead><tr><th>Formule</th><th>Ce qui est inclus</th><th>Tarif</th></tr></thead>
              <tbody>
                <tr><td>Site vitrine essentiel</td><td>Design sur-mesure jusqu'à 5 pages, responsive, référencement local, fiche Google, livraison 3 semaines</td><td>800 € HT · unique</td></tr>
                <tr><td>Vitrine + réservation</td><td>Tout l'essentiel + prise de rendez-vous ou réservation en ligne intégrée</td><td>1 500 € HT · unique</td></tr>
                <tr><td>Refonte de site</td><td>Audit, nouvelle structure, migration, optimisation SEO et performance</td><td>Dès 800 € HT</td></tr>
              </tbody>
            </table>
          </div>
          <p>Aucun abonnement, aucune facture cachée. Vous payez une fois, vous récupérez votre site. Un site web vitrine d'agence coûte souvent 2 000 à 6 000 € en France : notre méthode hybride humain × IA nous permet de nous positionner sous ce seuil, sans rogner sur la qualité.</p>

          <h2><span className="num">03</span>Votre site vous appartient, à 100 %</h2>
          <p>Question que beaucoup oublient avant de signer : à qui appartient le site une fois livré ? Chez nous, la réponse est contractuelle : <strong>le site est à vous dès la livraison.</strong> Accès à l'hébergement, au code, à l'administration. Vous pouvez confier la maintenance à qui vous voulez dans six mois. Aucune clause de rétention.</p>

          <h2><span className="num">04</span>Une agence web parisienne qui intervient à Versailles</h2>
          <p><strong>Soyons honnêtes : nous n'avons pas de bureau à Versailles.</strong> Vous ne verrez pas notre nom avenue de Paris. En revanche, nous intervenons régulièrement comme agence digitale et développeur web pour des clients à Versailles, Saint-Germain-en-Laye, Rambouillet et dans tout le 78. Les échanges se font en visio, email et messagerie ; un déplacement sur place s'organise si le projet le demande. Ce qui compte, c'est la qualité de la communication, la clarté du process et la solidité du résultat, et c'est là-dessus qu'on s'engage.</p>

          <h2><span className="num">05</span>Votre site créé en 4 étapes</h2>
          <ul className="ll">
            <li><strong>Brief (semaine 1) :</strong> échange de 45 min, puis un brief écrit validé avant tout démarrage.</li>
            <li><strong>Maquette (semaine 1-2) :</strong> vous voyez le design avant la moindre ligne de code, deux allers-retours inclus.</li>
            <li><strong>Développement (semaine 2-3) :</strong> site responsive, rapide, conforme aux Core Web Vitals.</li>
            <li><strong>Livraison + SEO (semaine 3) :</strong> optimisation on-page, fiche Google configurée, guide de prise en main.</li>
          </ul>
          <p>Délai moyen : 3 semaines à partir de la validation du brief.</p>

          <h2><span className="num">06</span>Référencement local à Versailles : votre site trouvé par vos clients</h2>
          <p>Le référencement (SEO) à Versailles repose sur trois piliers synchronisés : le <strong>site</strong> (contenu localisé, technique propre), la <strong>fiche Google Business</strong> (catégories, photos, avis) et la <strong>réputation</strong> (avis, cohérence des informations). Nous travaillons les trois dans chaque création. Votre site n'est pas livré « beau mais invisible », il est conçu pour apparaître sur les recherches de vos clients versaillais.</p>

          <figure className="vsl-shot">
            <img src={MOBILE_IMG} alt="Personne consultant un restaurant de Versailles sur son smartphone" loading="lazy" width={1600} height={900} />
            <figcaption>La majorité des recherches locales se font sur mobile : votre fiche et votre site doivent être impeccables sur un petit écran.</figcaption>
          </figure>

          <h2><span className="num">07</span>Nos interventions par secteur</h2>
          <ul className="ll">
            <li><strong>Commerces de proximité :</strong> sites simples et rapides, horaires et promotions mis en avant.</li>
            <li><strong>Artisans du 78 :</strong> formulaire, zone d'intervention, galerie de réalisations, pour capter les recherches d'urgence.</li>
            <li><strong>Professions libérales :</strong> sites épurés qui inspirent confiance, prise de rendez-vous incluse (formule 1 500 €).</li>
            <li><strong>Restaurants &amp; hôtels :</strong> menu en ligne, photos, réservation, optimisés pour « restaurant Versailles ».</li>
          </ul>

          <h2><span className="num">08</span>Pourquoi GND plutôt qu'une autre agence des Yvelines</h2>
          <div className="vsl-scroll">
            <table className="price cmp">
              <thead><tr><th>Critère</th><th>GND</th><th>Agence locale classique</th></tr></thead>
              <tbody>
                <tr><td>Tarifs affichés</td><td>Oui, dès 800 €</td><td>Rarement, devis obligatoire</td></tr>
                <tr><td>Paiement unique</td><td>Oui</td><td>Souvent abonnement mensuel</td></tr>
                <tr><td>Propriété du site</td><td>Oui, dès la livraison</td><td>Variable selon contrat</td></tr>
                <tr><td>SEO local + fiche Google</td><td>Inclus</td><td>Souvent en option payante</td></tr>
                <tr><td>Délai</td><td>3 semaines</td><td>6 à 12 semaines</td></tr>
              </tbody>
            </table>
          </div>

          <h2><span className="num">09</span>Vos questions sur la création de site à Versailles</h2>
          {FAQ_ITEMS.map((f) => (
            <div className="vsl-qa" key={f.q}>
              <div className="q">{f.q}</div>
              <div className="a">{f.a}</div>
            </div>
          ))}

          <div className="vsl-pills">
            <span>Agence web Versailles</span><span>Création site internet</span><span>SEO local</span><span>Yvelines 78</span>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <div className="vsl">
        <div className="vsl-final">
          <h2>Un projet de site à Versailles ?</h2>
          <p>Aucun devis surprise. Aucun abonnement. Votre site, vos règles. Un premier échange de 30 minutes suffit.</p>
          <a className="vsl-btn p" href="/contact#rdv">Demander mon devis gratuit <Icons.ArrowUpRight size={15} /></a>
        </div>
      </div>

      <div style={{ height: '64px' }} />
    </main>
  );
}
