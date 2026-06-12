/* WhyGndBlock, "Pourquoi GND", Boutique Hero (Chicken Drive-inspired).
 * bg chocolate, left = kicker + h2 + paragraphes + chips + 2 CTA + stats,
 * right = portrait circulaire avec overlay strié + floating callout offre featured.
 * Texte WhyGnd intégré ici.
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { Icons } from '../icons';

gsap.registerPlugin(ScrollTrigger);

/* Catégories = facettes de l'offre Sites Vitrines GND uniquement.
 * Chaque chip pilote dynamiquement : h2 headline + paragraphes body
 * + callout droite + stats. Aucune référence aux autres branches.
 * Source : module-02 formation interne plateforme GND. */

export type Paragraph = {
  label: string;
  body: string;
  /** Si true, label devient sous-titre block-level (display class, ligne propre)
   *  séparé du body. Défaut false = label inline-bold + body sur même ligne. */
  labelAsBlock?: boolean;
};

export type Palette = {
  /** bg principal section (couleur unie) */
  bg: string;
  /** gradient overlay ambient (radial 2-stops) */
  glow: string;
  /** tint cercle interne portrait */
  ring: string;
  /** image bg pleine section (PNG/JPG dans /public/assets/) optionnel */
  bgImage?: string;
  /** image bubble circulaire (override portrait Roodny par défaut) */
  bubbleImage?: string;
  /** alt text bubble */
  bubbleAlt?: string;
  /** CSS object-position pour la bubble image (défaut "center"). Permet
   *  d'ajuster le cadrage quand le sujet est décentré dans le source. */
  bubblePosition?: string;
  /** Override CSS background du scrim horizontal (défaut chocolat). Permet
   *  un scrim cream/clair sur certaines cats pour préserver la luminosité
   *  du bg-image au lieu de l'assombrir. */
  scrimBackground?: string;
  /** Opacity du bg-image (0–1, défaut 0.55). Bump à 0.85+ pour un rendu
   *  beaucoup plus lumineux où l'image transparaît davantage. */
  bgImageOpacity?: number;
};

export type CategoryData = {
  id: string;
  label: string;
  headline: { plain: string; italic: string; suffix?: string };
  paragraphs: Paragraph[];
  palette: Palette;
  callout: {
    kicker: string;
    title: string;
    price: string;
    description: string;
    tags: string[];
  };
  /** Si true, le callout floating droite n'est pas rendu pour ce chip. */
  hideCallout?: boolean;
  stats: Array<{ value: string; label: string }>;
};

export type WhyGndBlockProps = {
  categories?: CategoryData[];
  kickerLabel?: string;
  kickerSubLabel?: string;
  defaultActiveCat?: string;
  /** Si true, masque les CTA primaires "Demander un devis / Voir les formules". */
  hideCtas?: boolean;
  /** Si true, inverse le thème texte : chocolat-sur-cream (au lieu de cream-sur-chocolat).
   *  À utiliser quand les palettes catégories utilisent un bg clair. */
  lightTheme?: boolean;
};

const SITES_CATEGORIES: CategoryData[] = [
  {
    id: '01',
    label: "Vue d'ensemble",
    hideCallout: true,
    headline: {
      plain: 'Une agence boutique,',
      italic: 'pas une plateforme',
      suffix: '.',
    },
    paragraphs: [
      {
        label: "L'agence.",
        body: "GND Consulting est une agence de communication digitale basée en région parisienne. Quatre branches complémentaires, une culture du projet sur-mesure, et une nouvelle offre dédiée aux sites vitrines pour commerces locaux.",
      },
      {
        label: 'Le constat.',
        body: "Trop de commerces de proximité paient des frais récurrents à des plateformes propriétaires pour un site qui ne leur appartient jamais, et qui les enferme dans un écosystème fermé.",
      },
      {
        label: 'Notre approche.',
        body: "Un site qui vous appartient, livré en 7 à 14 jours, conçu par un studio créatif qui pilote chaque étape. Le studio tient la cadence, l'humain garde le contrôle créatif, vous validez à chaque palier.",
      },
    ],
    palette: {
      bg: '#2A1810',
      glow:
        'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(255,149,79,0.18) 0%, transparent 70%), radial-gradient(ellipse 45% 65% at 10% 80%, rgba(255,149,79,0.10) 0%, transparent 65%)',
      ring: '#3A2418',
      bgImage: '/assets/why-bg-vue-ensemble.webp',
      bubbleImage: '/assets/why-bubble-vue-ensemble.webp',
      bubbleAlt: 'Laptop flagship 2026 avec sites vitrines GND flottants',
    },
    callout: {
      kicker: 'Recommandé',
      title: 'Vitrine + Réservation',
      price: '1 500 €',
      description:
        "Restaurants, instituts, auto-écoles. Site complet et widget de réservation intégré sans commission.",
      tags: ['Propriété', '7–14 jours', '0 € abonnement'],
    },
    stats: [
      { value: '7–14', label: 'jours livraison' },
      { value: '0 €', label: "d'abonnement" },
      { value: '100 %', label: 'propriétaire' },
    ],
  },
  {
    id: '02',
    label: 'Vitrine Essentiel',
    headline: {
      plain: "L'essentiel,",
      italic: 'bien fait',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'La formule de base.',
        body: "Une vitrine claire pour exister sur Google : présentation de l'activité, coordonnées, horaires, galerie photo, formulaire de contact. Tout ce qu'il faut pour transformer une recherche en visite.",
      },
      {
        label: 'Pour qui ?',
        body: "Commerces de proximité, artisans, restaurateurs, indépendants qui veulent un site propre, rapide, prêt en deux semaines, sans abonnement et sans engagement.",
      },
      {
        label: 'Inclus.',
        body: "Design responsive, optimisation Google de base, hébergement configuré, première année de nom de domaine offerte, livraison sous 1 à 2 semaines.",
      },
    ],
    palette: {
      bg: '#3F2418',
      glow:
        'radial-gradient(ellipse 70% 60% at 25% 30%, rgba(253,246,238,0.14) 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 90% 80%, rgba(255,149,79,0.18) 0%, transparent 60%)',
      ring: '#553420',
      bgImage: '/assets/why-bg-vitrine-essentiel.webp',
      bubbleImage: '/assets/why-bubble-vitrine-essentiel.webp',
      bubbleAlt: 'Laptop flagship 2026 avec site boutique français en scroll-out',
    },
    callout: {
      kicker: 'Formule de base',
      title: 'Vitrine Essentiel',
      price: '800 €',
      description:
        "Présentation activité, coordonnées, formulaire, design responsive. Site clé en main pour exister sur Google.",
      tags: ['1–2 semaines', '0 € abonnement', 'Domaine offert 1ʳᵉ année'],
    },
    stats: [
      { value: '1–2', label: 'semaines' },
      { value: '800 €', label: 'paiement unique' },
      { value: '100 %', label: 'propriétaire' },
    ],
  },
  {
    id: '03',
    label: '+ Réservation',
    headline: {
      plain: 'Vos clients réservent,',
      italic: 'vous gérez',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Au-delà de la vitrine.',
        body: "Un site qui prend les réservations à votre place : restaurants, instituts, auto-écoles. Widget de booking intégré, calendrier disponible, notifications par email à chaque demande.",
      },
      {
        label: 'Sans commission.',
        body: "Aucun pourcentage prélevé sur vos réservations, contrairement aux plateformes propriétaires. Vous fixez vos règles, vous gardez la marge.",
      },
      {
        label: "L'intégration.",
        body: "Connexion possible à Zenchef, TheFork, Planity ou équivalent si vous y êtes déjà, ou widget natif GND sans abonnement supplémentaire.",
      },
    ],
    palette: {
      bg: '#4A1E0A',
      glow:
        'radial-gradient(ellipse 75% 65% at 70% 30%, rgba(255,149,79,0.50) 0%, transparent 65%), radial-gradient(ellipse 55% 70% at 15% 85%, rgba(255,149,79,0.22) 0%, transparent 60%)',
      ring: '#5C2A14',
      bgImage: '/assets/why-bg-reservation.webp',
      bubbleImage: '/assets/why-bubble-reservation.webp',
      bubbleAlt: 'Entrepreneur travaillant sur réservation site restaurant, chip + Réservation',
    },
    callout: {
      kicker: 'Recommandé',
      title: 'Vitrine + Réservation',
      price: '1 500 €',
      description:
        "Restaurants, instituts, auto-écoles. Widget réservation intégré, calendrier, notifications email, sans commission.",
      tags: ['0 % commission', 'Calendrier', 'Notifications'],
    },
    stats: [
      { value: '0 %', label: 'commission' },
      { value: '24/7', label: 'réservations' },
      { value: 'Email', label: 'notifications' },
    ],
  },
  {
    id: '04',
    label: 'Pack Complet',
    headline: {
      plain: 'Vendez en ligne,',
      italic: 'gardez la main',
      suffix: '.',
    },
    paragraphs: [
      {
        label: "L'offre la plus complète.",
        body: "Tout ce qu'on propose dans la formule Réservation, plus le paiement en ligne intégré via Stripe, un catalogue produits léger, le multilingue en option et un accompagnement personnalisé à la mise en route.",
      },
      {
        label: 'Pour qui ?',
        body: "Commerces qui vendent (click & collect, services premium), professions libérales qui facturent en ligne, prestataires qui veulent encaisser sans plateforme tierce.",
      },
      {
        label: 'Inclus.',
        body: "Stripe configuré, documentation utilisateur, formation client, support à la prise en main, fichiers sources transmis.",
      },
    ],
    palette: {
      bg: '#160A04',
      glow:
        'radial-gradient(ellipse 65% 55% at 75% 25%, rgba(255,149,79,0.28) 0%, transparent 60%), radial-gradient(ellipse 55% 65% at 20% 80%, rgba(212,165,42,0.20) 0%, transparent 60%)',
      ring: '#241408',
      bgImage: '/assets/why-bg-pack-complet.webp',
      bubbleImage: '/assets/why-bubble-pack-complet.webp',
      bubbleAlt: 'Entrepreneur travaillant sur site complet e-commerce, chip Pack Complet',
    },
    callout: {
      kicker: 'Sur-mesure',
      title: 'Pack Complet',
      price: '2 500 €',
      description:
        "Paiement Stripe, catalogue produits, multilingue optionnel, formation et documentation client. Pour vendre en propre.",
      tags: ['Stripe', 'Multilingue', 'Formation incluse'],
    },
    stats: [
      { value: '2 500 €', label: 'paiement unique' },
      { value: 'Stripe', label: 'intégré' },
      { value: 'Multi', label: 'langues' },
    ],
  },
  {
    id: '05',
    label: 'SEO Local',
    headline: {
      plain: 'Trouvable sur Google,',
      italic: 'sur votre métier',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Inclus dans toutes les formules.',
        body: "Référencement local optimisé dès la livraison : Schema.org adapté à votre activité, balises propres, structure pensée pour Google, soumission à Search Console.",
      },
      {
        label: 'Google Business relié.',
        body: "Connexion à votre fiche Google Business Profile pour qu'elle pointe vers votre site et reçoive les avis. Itinéraire intégré, position cartographique, horaires synchronisés.",
      },
      {
        label: "L'engagement.",
        body: "Objectif page 1 sur la requête « votre métier + votre ville » sous 90 jours. Si on n'y est pas, on retravaille le référencement sans surcoût jusqu'à y arriver.",
      },
    ],
    palette: {
      bg: '#352014',
      glow:
        'radial-gradient(ellipse 65% 55% at 35% 30%, rgba(212,165,42,0.24) 0%, transparent 60%), radial-gradient(ellipse 55% 60% at 85% 75%, rgba(255,149,79,0.18) 0%, transparent 60%)',
      ring: '#4A2E1E',
      bgImage: '/assets/why-bg-seo-local.webp',
      bubbleImage: '/assets/why-bubble-seo-local.webp',
      bubbleAlt: 'Laptop dashboard SEO 3D, chip SEO Local',
    },
    callout: {
      kicker: 'Inclus dans nos sites',
      title: 'SEO Local clé en main',
      price: 'Inclus',
      description:
        "Schema.org, Google Business relié, soumission Search Console, optimisation des pages. Objectif page 1 sous 90 jours.",
      tags: ['90 jours', 'Top 3 visé', 'Garantie écrite'],
    },
    stats: [
      { value: '90', label: 'jours pour ranker' },
      { value: 'Top 3', label: 'objectif Google' },
      { value: 'Inclus', label: 'sans surcoût' },
    ],
  },
  {
    id: '06',
    label: 'Garanties',
    headline: {
      plain: 'Aucun engagement,',
      italic: 'aucune surprise',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Le paiement.',
        body: "50 % à la commande pour lancer la production, 50 % à la livraison. Pas d'abonnement, pas de frais cachés, pas d'engagement annuel.",
      },
      {
        label: 'La propriété.',
        body: "Nom de domaine enregistré à votre nom (WHOIS vérifiable), code source transmis, accès hébergement et back-office remis. Vous pouvez quitter, transférer ou revendre.",
      },
      {
        label: 'Les délais.',
        body: "Livraison annoncée au devis et tenue. Si on dépasse, vous êtes prévenu en amont avec la raison. Modifications futures sur devis transparent, jamais imposées.",
      },
    ],
    palette: {
      bg: '#0F0604',
      glow:
        'radial-gradient(ellipse 50% 45% at 50% 25%, rgba(255,149,79,0.18) 0%, transparent 55%), radial-gradient(ellipse 65% 55% at 15% 75%, rgba(212,165,42,0.14) 0%, transparent 60%)',
      ring: '#1F1208',
      bgImage: '/assets/why-bg-garanties.webp',
      bubbleImage: '/assets/why-bubble-garanties.webp',
      bubbleAlt: 'Laptop site restaurant scroll-out, chip Garanties',
    },
    callout: {
      kicker: 'Engagements GND',
      title: 'Promesses écrites au devis',
      price: '0 € caché',
      description:
        "Paiement en deux fois, propriété totale, code source transmis, délais tenus, modifications transparentes.",
      tags: ['50/50 paiement', 'Code source', 'Devis honnête'],
    },
    stats: [
      { value: '50/50', label: 'paiement' },
      { value: '0 €', label: 'frais caché' },
      { value: '100 %', label: 'propriétaire' },
    ],
  },
];

export function WhyGndBlock({
  categories = SITES_CATEGORIES,
  kickerLabel = 'Pourquoi GND',
  kickerSubLabel = 'Agence de communication digitale',
  defaultActiveCat = '01',
  hideCtas = false,
  lightTheme = false,
}: WhyGndBlockProps = {}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [activeCat, setActiveCat] = React.useState<string>(defaultActiveCat);
  const [paused, setPaused] = React.useState(false);
  const active =
    categories.find((c) => c.id === activeCat) ?? categories[0];

  // Préchargement des visuels de TOUTES les slides au montage : évite le
  // flash de fond chocolat quand l'auto-play ou un clic change de slide
  // avant que l'image ne soit en cache.
  React.useEffect(() => {
    categories.forEach((c) => {
      [c.palette?.bgImage, c.palette?.bubbleImage].forEach((src) => {
        if (src) { const im = new Image(); im.src = src; }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  // Auto-play : fait défiler les slides pour que les visiteurs passifs les voient
  // toutes (sinon seule la slide 01 est vue). Reset à chaque changement (clic
  // manuel inclus), en pause au survol pour ne pas gêner la lecture.
  React.useEffect(() => {
    if (paused || categories.length < 2) return;
    const ids = categories.map((c) => c.id);
    const t = setTimeout(() => {
      setActiveCat((prev) => ids[(ids.indexOf(prev) + 1) % ids.length]);
    }, 5500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCat, paused, categories.length]);
  /* Theme switch :
   * - dark (défaut) : texte cream sur palette chocolat (Branding/Sites-Vitrines).
   * - light : texte chocolat sur palette cream (Audiovisuel pour cohérence
   *   avec le reste de la page qui est full cream + chocolat). */
  const T = lightTheme
    ? {
        title: 'text-text-strong',
        body: 'text-text',
        bodyStrong: 'text-text-strong',
        muted: 'text-text-muted',
        subtle: 'text-text',
        chipActive: 'border-accent bg-accent/15 text-text-strong',
        chipIdle:
          'border-text-strong/15 text-text-muted hover:border-accent/60 hover:text-text-strong',
        chipNum: 'text-text-muted',
        ctaSecondary:
          'border-text-strong/20 text-text-strong hover:bg-text-strong/8 hover:border-text-strong/40',
      }
    : {
        title: 'text-bg',
        body: 'text-bg/85',
        bodyStrong: 'text-bg',
        muted: 'text-bg/55',
        subtle: 'text-bg/75',
        chipActive: 'border-accent bg-accent/12 text-bg',
        chipIdle: 'border-bg/15 text-bg/75 hover:border-accent/60 hover:text-bg',
        chipNum: 'text-bg/50',
        ctaSecondary: 'border-bg/25 text-bg hover:bg-bg/10 hover:border-bg/45',
      };

  React.useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        defaults: { ease: 'power3.out' },
      });
      tl.from('[data-anim="bh-kicker"]', { y: 14, opacity: 0, duration: 0.5 })
        .from('[data-anim="bh-title"]', { y: 28, opacity: 0, duration: 0.8 }, '-=0.25')
        .from('[data-anim="bh-body"]', { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
        .from('[data-anim="bh-chip"]', { y: 14, opacity: 0, duration: 0.45, stagger: 0.06 }, '-=0.3')
        .from('[data-anim="bh-cta"]', { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
        .from('[data-anim="bh-stat"]', { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
        .from(
          '[data-anim="bh-visual"]',
          { x: 60, opacity: 0, scale: 0.94, duration: 1, ease: 'power4.out' },
          '-=1.2'
        )
        .from(
          '[data-anim="bh-callout"]',
          { y: 30, opacity: 0, duration: 0.7 },
          '-=0.5'
        );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden text-bg"
      style={{
        background: active.palette.bg,
        transition: 'background 700ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Image bg pleine section, swap entre chips si bgImage présent */}
      <AnimatePresence mode="sync">
        {active.palette.bgImage && (
          <motion.div
            key={`bg-img-${active.id}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: active.palette.bgImageOpacity ?? 0.55, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${active.palette.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
        {/* Scrim chocolate global, séparé pour rester à opacité pleine au-dessus image atténuée */}
        {active.palette.bgImage && (
          <motion.div
            key={`bg-scrim-${active.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Scrim horizontal chocolat discret lisibilité texte gauche.
                Override par palette.scrimBackground si fourni. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  active.palette.scrimBackground ??
                  'linear-gradient(90deg, rgba(42,24,16,0.62) 0%, rgba(42,24,16,0.48) 30%, rgba(42,24,16,0.28) 55%, rgba(42,24,16,0.08) 80%, rgba(42,24,16,0.0) 100%)',
              }}
            />
            {/* Scrim vertical chocolat discret top/bottom anti-coupure */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(42,24,16,0.30) 0%, transparent 22%, transparent 78%, rgba(42,24,16,0.35) 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient glow background, fade entre paletté via AnimatePresence */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: active.palette.glow }}
        />
      </AnimatePresence>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* ─── LEFT, Texte + chips + CTA + stats ─── */}
          <div className="lg:col-span-7">
            <div
              data-anim="bh-kicker"
              className="text-[11px] tracking-[0.28em] uppercase text-accent mb-6"
            >
              {kickerLabel} · {kickerSubLabel}
            </div>

            {/* H2 dynamique, swap selon chip active */}
            <div data-anim="bh-title" className="min-h-[200px] md:min-h-[260px] lg:min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={active.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`display text-5xl md:text-6xl lg:text-7xl xl:text-[88px] leading-[0.95] ${T.title}`}
                >
                  {active.headline.plain}
                  <br />
                  <span className="italic text-accent">
                    {active.headline.italic}
                  </span>
                  {active.headline.suffix ?? ''}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Paragraphes dynamiques, swap selon chip active */}
            <div className="mt-8 min-h-[280px] md:min-h-[260px] max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`space-y-5 ${T.body} leading-relaxed text-base md:text-[17px]`}
                >
                  {active.paragraphs.map((p, i) =>
                    p.labelAsBlock ? (
                      // Mode block : label = sous-titre sur sa propre ligne
                      // en accent orange, body en paragraphe en dessous.
                      // Différenciation visuelle forte entre micro-titre et corps.
                      <div key={i} data-anim="bh-body">
                        <h4 className="display text-accent text-lg md:text-xl font-bold leading-snug mb-2">
                          {p.label}
                        </h4>
                        <p>{p.body}</p>
                      </div>
                    ) : (
                      <p key={i} data-anim="bh-body">
                        <span className={`${T.bodyStrong} font-medium`}>{p.label}</span>{' '}
                        {p.body}
                      </p>
                    ),
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Catégories chips */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              {categories.map((c) => {
                const isActive = c.id === activeCat;
                return (
                  <button
                    key={c.id}
                    data-anim="bh-chip"
                    onClick={() => setActiveCat(c.id)}
                    className={
                      'inline-flex items-center gap-3 rounded-full border px-4 py-2.5 text-xs md:text-sm transition-colors ' +
                      (isActive ? T.chipActive : T.chipIdle)
                    }
                  >
                    <span
                      className={
                        'font-mono text-[10px] tracking-[0.18em] ' +
                        (isActive ? 'text-accent' : T.chipNum)
                      }
                    >
                      {c.id}
                    </span>
                    <span className="tracking-[0.06em] uppercase">{c.label}</span>
                  </button>
                );
              })}
            </div>

            {/* CTA pills */}
            {!hideCtas && (
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  data-anim="bh-cta"
                  href="#/contact"
                  className="inline-flex items-center gap-2.5 rounded-full bg-accent text-text-strong px-6 py-3.5 text-sm font-medium hover:brightness-95 transition-all"
                  style={{ boxShadow: '0 14px 32px rgba(255,149,79,0.32)' }}
                >
                  <span>Demander un devis</span>
                  <Icons.ArrowUpRight size={14} />
                </a>
                <a
                  data-anim="bh-cta"
                  href="#tarifs"
                  className={`inline-flex items-center gap-2.5 rounded-full border bg-transparent px-6 py-3.5 text-sm font-medium transition-all ${T.ctaSecondary}`}
                >
                  <span>Voir les formules</span>
                  <Icons.ArrowRight size={14} />
                </a>
              </div>
            )}

            {/* Stats row, dynamiques selon chip active */}
            <div className="mt-12 grid grid-cols-3 gap-6 md:gap-10 max-w-xl min-h-[80px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="contents"
                >
                  {active.stats.map((s, i) => (
                    <div key={`${active.id}-${i}`} data-anim="bh-stat">
                      <div className="display text-3xl md:text-4xl text-accent leading-none">
                        {s.value}
                      </div>
                      <div className={`mt-2 text-[10px] md:text-[11px] tracking-[0.18em] uppercase ${T.muted}`}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ─── RIGHT, Visual circulaire + callout featured ─── */}
          <div className="lg:col-span-5 relative">
            <div
              data-anim="bh-visual"
              className="relative aspect-square w-full max-w-[560px] mx-auto"
            >
              {/* Cercle gradient accent ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 220deg, rgba(255,149,79,0.65) 0deg, rgba(255,149,79,0.15) 90deg, rgba(255,149,79,0.05) 180deg, rgba(255,149,79,0.25) 270deg, rgba(255,149,79,0.65) 360deg)',
                  padding: '2px',
                  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMask:
                    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                }}
              />

              {/* Cercle background interne, couleur palette */}
              <div
                className="absolute inset-[3%] rounded-full overflow-hidden"
                style={{
                  background: active.palette.ring,
                  transition: 'background 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Stripes overlay diagonale */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
                  style={{
                    background:
                      'repeating-linear-gradient(115deg, #FDF6EE 0 3px, transparent 3px 18px)',
                  }}
                />
                {/* Bubble image dynamique, swap selon chip active */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`bubble-${active.id}`}
                    src={
                      active.palette.bubbleImage ?? '/assets/portrait-cream.webp'
                    }
                    alt={
                      active.palette.bubbleAlt ??
                      'Roodny Pierre, Fondateur GND Consulting'
                    }
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      objectPosition: active.palette.bubblePosition ?? 'center',
                    }}
                    draggable={false}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </AnimatePresence>
                {/* Vignette overlay bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 50%, rgba(42,24,16,0.55) 100%)',
                  }}
                />
              </div>

              {/* Floating tag badge top-left */}
              <div className="absolute top-[8%] left-[2%] inline-flex items-center gap-2 rounded-full bg-bg-alt/95 backdrop-blur px-3.5 py-2 text-[10px] tracking-[0.18em] uppercase text-text-strong shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Studio Paris · Actif
              </div>
            </div>

            {/* Callout featured, sous le bubble, en flow naturel (plus de chevauchement) */}
            <div
              data-anim="bh-callout"
              className="relative mt-8 lg:mt-12 max-w-[320px] mx-auto lg:ml-auto lg:mr-4 min-h-[300px]"
            >
              <AnimatePresence mode="wait">
                {!active.hideCallout && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[28px] bg-bg-alt text-text-strong p-6 shadow-2xl shadow-black/40 ring-1 ring-accent/30"
                  >
                    <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-accent">
                      <Icons.Sparkles size={12} />
                      {active.callout.kicker}
                    </div>
                    <h3 className="display text-2xl md:text-[26px] text-text-strong mt-3 leading-tight">
                      {active.callout.title}
                    </h3>
                    <div className="display text-3xl text-text-strong mt-2">
                      {active.callout.price}
                    </div>
                    <p className="mt-3 text-sm text-text/80 leading-relaxed">
                      {active.callout.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {active.callout.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-text-strong/[0.06] border border-text-strong/10 px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase text-text-strong/85"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
