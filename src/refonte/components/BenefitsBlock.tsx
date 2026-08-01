/* BenefitsBlock — section « Avantages » de /services/sites-vitrines.
 *
 * V4 (31/07/26). Portage fidèle de la section « Notre méthode / Comment nous
 * agissons » de la maquette proteger-lenfance.vercel.app (gabarit Donatix),
 * relevé au pixel sur le rendu live puis retranscrit dans la charte GND.
 *
 * Ce qui est repris à l'identique, mécanique comprise :
 *   - le suréclat filet + losange + intitulé + losange + filet ;
 *   - le badge numéro : 56x56, bordure haute de 5 px, coins bas arrondis à
 *     28 px, ombre portée 0 4px 20px rgba(0,0,0,.05), fond transparent ;
 *   - l'hexagone à coins arrondis, dont le contour est en dégradé : appuyé
 *     en haut sur les colonnes impaires, appuyé en bas sur les paires, pour
 *     que le trait soit toujours le plus dense du côté du texte ;
 *   - la quinconce, obtenue par inversion de l'ordre icône/numéro et non par
 *     une marge arbitraire, plus l'ajustement de -18 px de l'original ;
 *   - les diagonales pointillées : un élément de 300 px de haut, sans
 *     largeur, avec une bordure 1 px dashed, tourné à +53° ou -53° et ancré
 *     à right:-5px, exactement comme les .shape4/5/6 du gabarit ;
 *   - la rotation rotateY(180deg) de l'icône au survol.
 *
 * Ce qui n'est PAS repris : les trois illustrations flottantes du gabarit
 * (shape3/4/5) sont des dessins au trait d'une main tenant un cœur, propres
 * au propos de l'association. Elles n'ont pas d'équivalent de sens pour une
 * agence web et sont volontairement laissées de côté.
 *
 * Correspondance des couleurs, du gabarit vers la charte GND :
 *   --donatix-base      #99BD05  ->  #F39253 en décor, #B4551C pour le texte
 *                                    (l'orange n'a pas le contraste requis
 *                                     sur crème, cf. correctif WCAG du 12/07)
 *   --donatix-secondary #DE3891  ->  #F39253 pour le fil pointillé
 *   --donatix-black     #2B2728  ->  #532418
 *   --donatix-gray      #797E88  ->  #6b4a3a
 *
 * Remplace la V3, qui composait cinq PNG transparents pilotés par une
 * timeline GSAP : le texte était cuit dans les images, donc incorrigible
 * sans repasser par la production des calques, et illisible pour un lecteur
 * d'écran comme pour les moteurs. Tout est désormais en SVG et en texte.
 *
 * ⚠️ /assets/benefits-disc-center.png et benefits-capsule-{1..4}.png ne sont
 * plus référencés nulle part depuis ce remplacement.
 */
import * as React from 'react';
import { Section, Container } from '../ui';

/* Icônes dessinées ici plutôt que puisées dans icons.tsx : aucune des
   existantes ne dit « pas d'abonnement » ou « paiement en deux fois » sans
   forcer le sens. Même grammaire que le reste du site (grille 24, trait
   unique, currentColor). Le gabarit d'origine utilise une police d'icônes,
   qu'on ne réimporte pas pour quatre glyphes. */
const Ico = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const BENEFITS = [
  {
    num: '01',
    title: "Pas d'abonnement",
    text: "Paiement unique. Aucun forfait annuel imposé : vous ne payez pas tous les mois pour que votre site continue d'exister.",
    icon: (
      <Ico>
        <path d="M17 2.5l3.5 3.5L17 9.5" />
        <path d="M3.5 11.5V10a4 4 0 0 1 4-4h13" />
        <path d="M7 21.5L3.5 18 7 14.5" />
        <path d="M20.5 12.5V14a4 4 0 0 1-4 4h-13" />
        <path d="M2.5 2.5l19 19" />
      </Ico>
    ),
  },
  {
    num: '02',
    title: 'Vous êtes propriétaire',
    text: "Nom de domaine à votre nom, accès à l'hébergement, au back-office et au code. Vous pouvez partir quand vous voulez.",
    icon: (
      <Ico>
        <circle cx="7.5" cy="15.5" r="4.5" />
        <path d="M10.9 12.1L21 2" />
        <path d="M17.5 5.5L20 8" />
        <path d="M14.8 8.2l2.5 2.5" />
      </Ico>
    ),
  },
  {
    num: '03',
    title: 'Paiement en 2 fois',
    text: "50 % à la commande, qui lance la production, 50 % à la livraison. Facture standard, TVA non applicable, article 293 B du CGI.",
    icon: (
      <Ico>
        <rect x="2.5" y="5" width="19" height="14" rx="2.2" />
        <path d="M2.5 10h19" />
        <path d="M12 10v9" />
      </Ico>
    ),
  },
  {
    num: '04',
    title: 'Modifications sur devis',
    text: "Une évolution plus tard ? Devis transparent, à partir de 50 € l'intervention. Vous restez libre de confier la suite à qui vous voulez.",
    icon: (
      <Ico>
        <path d="M14 3H6.5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2H13" />
        <path d="M14 3l5 5v3.5" />
        <path d="M14 3v5h5" />
        <path d="M21.3 14.4L16 19.7l-2.9.8.8-2.9 5.3-5.3a1.5 1.5 0 0 1 2.1 2.1z" />
      </Ico>
    ),
  },
];

/* Hexagone à coins arrondis, contour en dégradé.
   `dir="top"` densifie le trait sur les arêtes hautes (colonnes impaires,
   texte au-dessus), `dir="bottom"` sur les arêtes basses (colonnes paires,
   texte en dessous) : c'est exactement ce que font les deux variantes
   work-process-v1-shape1.png et shape2.png du gabarit. */
function Hex({ dir, id }: { dir: 'top' | 'bottom'; id: string }) {
  const gid = `hexg-${id}`;
  return (
    <svg className="bn-hex-shape" viewBox="0 0 217 221" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1={dir === 'top' ? '0' : '1'} x2="0" y2={dir === 'top' ? '1' : '0'}>
          <stop offset="0%" stopColor="#532418" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#532418" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#532418" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <path
        d="M93.5 4.6a30 30 0 0 1 30 0l63.5 36.7a30 30 0 0 1 15 26v73.4a30 30 0 0 1-15 26l-63.5 36.7a30 30 0 0 1-30 0L30 166.7a30 30 0 0 1-15-26V67.3a30 30 0 0 1 15-26z"
        fill="#FFFFFF"
        stroke={`url(#${gid})`}
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function BenefitsBlock() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section className="bn-sec">
      <style>{CSS}</style>
      <Container>
        <div ref={rootRef} className={`bn ${shown ? 'is-in' : ''}`}>
          <div className="bn-tag">
            <span className="bn-tag-line" aria-hidden="true" />
            <span className="bn-tag-text">Le pack GND</span>
            <span className="bn-tag-line is-right" aria-hidden="true" />
          </div>
          <h2 className="bn-title">Ce que vous obtenez</h2>

          <div className="bn-row">
            {BENEFITS.map((b, i) => {
              const flipped = i % 2 === 1;
              return (
                <div className="bn-cell" key={b.num} style={{ ['--i' as string]: i }}>
                  <div className={`bn-single ${flipped ? 'is-flipped' : ''}`}>
                    {/* Diagonale pointillée vers la colonne suivante. La
                        dernière colonne n'en porte pas. */}
                    {i < BENEFITS.length - 1 && (
                      <span className={`bn-dash ${flipped ? 'up' : 'down'}`} aria-hidden="true" />
                    )}

                    <div className="bn-hex">
                      <Hex dir={flipped ? 'bottom' : 'top'} id={b.num} />
                      <span className="bn-hex-ico">{b.icon}</span>
                    </div>

                    <div className="bn-body">
                      <div className="bn-num">{b.num}</div>
                      <h3 className="bn-h3">{b.title}</h3>
                      <p className="bn-p">{b.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

const CSS = `
.bn-sec{padding-top:clamp(72px,9vw,120px);padding-bottom:clamp(28px,3.4vw,41px);}
.bn{--bn-base:#F39253;--bn-ink:#B4551C;--bn-thread:#F39253;--bn-txt:#532418;--bn-gray:#6b4a3a;}

/* Suréclat : filet 65x2, losange, intitulé, losange, filet. */
.bn-tag{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:12px;}
.bn-tag-line{position:relative;width:clamp(34px,6vw,65px);height:2px;background:var(--bn-base);}
.bn-tag-line::after{content:"";position:absolute;top:50%;right:-9px;width:6px;height:6px;
  background:var(--bn-base);transform:translateY(-50%) rotate(45deg);border-radius:1px;}
.bn-tag-line.is-right::after{right:auto;left:-9px;}
.bn-tag-text{font-family:"Playfair Display",Georgia,serif;font-style:italic;
  font-size:clamp(19px,2.2vw,28px);line-height:1.2;color:var(--bn-ink);}
.bn-title{font-family:"Playfair Display",Georgia,serif;font-weight:700;text-align:center;
  color:var(--bn-txt);font-size:clamp(28px,4.6vw,48px);line-height:1.08;
  margin:0 0 clamp(36px,4.6vw,60px);}

.bn-row{display:grid;grid-template-columns:repeat(4,1fr);gap:0 clamp(10px,1.6vw,24px);align-items:start;}
.bn-cell{min-width:0;}
.bn-single{position:relative;display:flex;flex-direction:column;align-items:center;
  text-align:center;margin-bottom:30px;z-index:1;
  opacity:0;transform:translateY(22px);
  transition:opacity .7s ease,transform .7s cubic-bezier(.22,.9,.3,1);
  transition-delay:calc(var(--i) * 110ms);}
.bn.is-in .bn-single{opacity:1;transform:none;}
/* Quinconce : l'icône passe au-dessus sur les colonnes paires, plus le
   rattrapage de -18px du gabarit d'origine. */
.bn-single.is-flipped{margin-top:-18px;}
.bn-single:not(.is-flipped) .bn-hex{order:2;margin-top:26px;}
.bn-single:not(.is-flipped) .bn-body{order:1;}
.bn-single.is-flipped .bn-hex{order:1;}
.bn-single.is-flipped .bn-body{order:2;margin-top:-19px;}

/* Diagonales pointillées : élément sans largeur, 300px de haut, bordure
   1px dashed, tourné à ±53°, ancré au bord droit. Reprise exacte des
   .shape4/5/6 du gabarit. */
.bn-dash{position:absolute;right:-5px;height:300px;width:0;
  border-left:1px dashed var(--bn-thread);opacity:.6;pointer-events:none;z-index:-1;}
.bn-dash.down{bottom:95px;transform:rotate(53deg);}
.bn-dash.up{top:50px;transform:rotate(-53deg);}

.bn-hex{position:relative;width:clamp(112px,15vw,217px);aspect-ratio:217/221;
  display:grid;place-items:center;transition:transform .3s ease;}
.bn-hex-shape{position:absolute;inset:0;width:100%;height:100%;
  filter:drop-shadow(0 12px 24px rgba(83,36,24,.10));}
.bn-hex-ico{position:relative;width:32%;color:var(--bn-txt);display:block;
  transition:transform .5s ease,color .3s ease;transform-style:preserve-3d;}
.bn-hex-ico svg{width:100%;height:100%;display:block;}
.bn-single:hover .bn-hex-ico{transform:rotateY(180deg);color:var(--bn-ink);}

/* Badge numéro : 56x56, bordure haute 5px, coins bas arrondis 28px. */
.bn-num{position:relative;display:flex;align-items:center;justify-content:center;
  width:56px;height:56px;margin:0 auto 14px;border-top:5px solid var(--bn-base);
  border-bottom-left-radius:28px;border-bottom-right-radius:28px;
  box-shadow:0 4px 20px 0 rgba(0,0,0,.05);
  font-family:"Playfair Display",Georgia,serif;font-weight:700;font-size:24px;
  line-height:34px;color:var(--bn-txt);}
.bn-single.is-flipped .bn-num{margin:-19px auto 22px;}
.bn-h3{font-family:"Playfair Display",Georgia,serif;font-weight:700;color:var(--bn-txt);
  font-size:clamp(18px,2vw,24px);line-height:1.32;margin:0 0 14px;}
.bn-p{color:var(--bn-gray);font-size:clamp(13.5px,1.05vw,15px);line-height:1.62;
  margin:0 auto;max-width:31ch;}

@media (max-width:1199px){
  .bn-row{grid-template-columns:repeat(2,1fr);gap:24px clamp(14px,3vw,30px);}
  .bn-dash{display:none;}
}
@media (max-width:639px){
  .bn-row{grid-template-columns:1fr;gap:12px;}
  /* En pile, la quinconce n'a plus de sens et l'icône avant le titre ferait
     perdre le fil de lecture : tout le monde reprend le même ordre. */
  .bn-single.is-flipped{margin-top:0;}
  .bn-single.is-flipped .bn-hex{order:2;margin-top:26px;}
  .bn-single.is-flipped .bn-body{order:1;margin-top:0;}
  .bn-single.is-flipped .bn-num{margin:0 auto 14px;}
}
@media (prefers-reduced-motion:reduce){
  .bn-single{opacity:1;transform:none;transition:none;}
  .bn-single:hover .bn-hex-ico{transform:none;}
}
`;
