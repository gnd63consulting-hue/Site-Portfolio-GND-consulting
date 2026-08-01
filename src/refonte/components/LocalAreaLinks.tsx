/* Maillage interne des pages locales — 31/07/26.
 *
 * Constat de l'audit du 30/07 : les 6 pages locales étaient ORPHELINES.
 * Aucune page du site ne pointait vers elles, et elles ne se liaient pas
 * entre elles ; leur seul point d'entrée était le sitemap. Résultat, zéro
 * autorité interne transmise, malgré ~1 300 mots et un schema local propre
 * sur chacune. Elles plafonnaient donc en positions 20-40.
 *
 * Ce composant règle les deux sens à la fois :
 *   - entrant  : chaque page locale reçoit un lien des 5 autres ;
 *   - sortant  : chaque page locale pointe vers ses pages piliers
 *                (service Sites & SEO + 2 guides thématiques).
 *
 * Le bloc est autonome : il porte ses propres tokens de palette (préfixés
 * `--lal-`), donc il peut être monté sur n'importe quelle page sans dépendre
 * du bloc <style> d'une page locale.
 * Les ancres sont rédigées en clair (« Agence web à Nanterre ») : c'est le
 * texte d'ancre qui porte le signal, pas un « en savoir plus ».
 *
 * La liste des villes vit dans ../local-areas (module de données partagé
 * avec le footer, qui est dans le bundle initial).
 */
import * as React from 'react';
import { Icons } from '../icons';
import { LOCAL_AREAS } from '../local-areas';

/* Pages piliers vers lesquelles chaque page locale doit remonter du jus.
   Choisies pour leur proximité d'intention avec une requête « agence web
   [ville] » : l'offre, la mécanique du SEO local, et le prix. */
const PILLARS = [
  { slug: '/services/sites-vitrines', label: 'Notre offre Sites & SEO' },
  { slug: '/guides/etre-visible-google-local', label: 'Être visible sur Google en local' },
  { slug: '/guides/prix-site-vitrine', label: 'Combien coûte un site vitrine' },
];

/* Tokens redéclarés en local plutôt qu'hérités de `.vsl`.
   Les pages locales définissent leur palette dans leur propre bloc <style>,
   donc un composant qui lit --choco / --serif ne fonctionne QUE monté à
   l'intérieur d'une de ces pages, et casse silencieusement ailleurs (fond
   transparent, police système). On préfixe donc les variables et on les
   pose sur `.lal` : le bloc devient portable sur n'importe quelle page.
   Valeurs identiques au gabarit des pages locales, pour un rendu continu. */
const CSS = `
.lal{--lal-txt:#532418;--lal-soft:#6b4a3a;--lal-muted:#7D3E2C;--lal-ink:#B4551C;
  --lal-cremealt:#FFF3E8;--lal-surface:#E8D8C5;--lal-hair:rgba(83,36,24,.16);
  --lal-serif:"Playfair Display",Georgia,serif;
  --lal-mono:ui-monospace,"SF Mono",Menlo,monospace;
  background:#FDF6EE;color:var(--lal-txt);font-family:Inter,sans-serif;
  padding:34px 0 10px;}
.lal-head{max-width:1132px;margin:0 auto 22px;padding:0 24px;}
.lal-eye{font-family:var(--lal-mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--lal-muted);margin-bottom:10px;}
.lal-head h2{font-family:var(--lal-serif);font-weight:700;color:var(--lal-txt);font-size:clamp(22px,3.1vw,31px);line-height:1.18;margin:0;}
.lal-head p{color:var(--lal-soft);font-size:15.5px;line-height:1.6;max-width:64ch;margin:12px 0 0;}
.lal-grid{max-width:1132px;margin:0 auto;padding:0 24px;display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(268px,1fr));}
.lal-card{position:relative;display:block;text-decoration:none;background:var(--lal-cremealt);border:1px solid var(--lal-hair);border-radius:18px;padding:20px 22px 18px;transition:transform .2s,box-shadow .2s,border-color .2s;}
.lal-card:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(83,36,24,.10);border-color:rgba(83,36,24,.3);}
.lal-card .arrow{position:absolute;top:19px;right:19px;color:var(--lal-muted);transition:color .2s,transform .2s;}
.lal-card:hover .arrow{color:var(--lal-ink);transform:translate(2px,-2px);}
.lal-card .dept{padding-right:26px;font-family:var(--lal-mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--lal-muted);}
.lal-card .name{font-family:var(--lal-serif);font-weight:700;color:var(--lal-txt);font-size:18px;line-height:1.25;margin:9px 0 8px;}
.lal-card:hover .name{color:var(--lal-ink);}
.lal-card .blurb{color:var(--lal-soft);font-size:14px;line-height:1.55;margin:0;}
.lal-pillars{max-width:1132px;margin:22px auto 0;padding:0 24px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;}
.lal-pillars .lbl{font-family:var(--lal-mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--lal-muted);margin-right:4px;}
.lal-pill{display:inline-flex;align-items:center;gap:7px;text-decoration:none;font-size:14px;font-weight:600;color:var(--lal-txt);background:transparent;border:1px solid rgba(83,36,24,.28);border-radius:40px;padding:9px 17px;transition:background .2s,color .2s,border-color .2s;}
.lal-pill:hover{background:var(--lal-surface);color:var(--lal-ink);border-color:rgba(83,36,24,.42);}
@media (max-width:640px){
  .lal-grid{grid-template-columns:1fr;}
  .lal-card{padding:17px 18px 16px;}
}
`;

/**
 * Bloc « zones d'intervention » : cartes vers les pages locales + remontée
 * vers les pages piliers.
 *
 * @param current slug de la page courante, exclu de la liste. Omis sur une
 *                page non locale (service, guide) : les 6 villes s'affichent.
 * @param city    ville courante. Quand elle est fournie, le chapô s'adresse
 *                à un visiteur déjà sur une page locale ; sinon il présente
 *                simplement la couverture géographique.
 * @param showPillars à passer à false sur une page qui EST déjà un pilier,
 *                pour ne pas créer d'auto-lien ni de boucle inutile.
 */
export function LocalAreaLinks({
  current,
  city,
  showPillars = true,
}: {
  current?: string;
  city?: string;
  showPillars?: boolean;
}) {
  const others = LOCAL_AREAS.filter((a) => a.slug !== current);
  const pillars = PILLARS.filter((p) => p.slug !== current);
  return (
    <>
      <style>{CSS}</style>
      <section className="lal" aria-labelledby="lal-title">
        <div className="lal-head">
          <div className="lal-eye">Zones d'intervention</div>
          <h2 id="lal-title">
            {city ? 'Nous intervenons aussi ailleurs en Île-de-France' : 'Une agence web près de chez vous'}
          </h2>
          <p>
            {city ? (
              <>
                Le studio est basé à Paris et travaille avec des entreprises de toute la région.
                Si votre activité n'est pas à {city}, votre commune est probablement juste à côté.
              </>
            ) : (
              <>
                Le studio est basé à Paris et intervient dans toute l'Île-de-France. Chaque page
                ci-dessous détaille notre offre, nos tarifs et le référencement local pour la commune
                concernée.
              </>
            )}
          </p>
        </div>

        <div className="lal-grid">
          {others.map((a) => (
            <a className="lal-card" href={a.slug} key={a.slug}>
              <Icons.ArrowUpRight size={15} className="arrow" />
              <div className="dept">{a.dept}</div>
              <div className="name">{a.anchor}</div>
              <p className="blurb">{a.blurb}</p>
            </a>
          ))}
        </div>

        {showPillars && pillars.length > 0 && (
          <div className="lal-pillars">
            <span className="lbl">Pour aller plus loin</span>
            {pillars.map((p) => (
              <a className="lal-pill" href={p.slug} key={p.slug}>
                {p.label}
                <Icons.ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
