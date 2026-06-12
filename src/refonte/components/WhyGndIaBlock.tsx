/* WhyGndIaBlock, variante de WhyGndBlock pour /services/automatisation-ia.
 *
 * 5 chips IA refondus 03/06/26 après audit recherche complet :
 *   01 Diagnostic AVANT déploiement (cartographie 7j)
 *   02 Stack souveraine et flexible (n8n self-hosted FR + LLMs au choix)
 *   03 Maintenance incluse, pas en option (6 mois écrits au contrat)
 *   04 Industrialisation pour grandes structures (DSI/RSSI/DPO)
 *   05 Honnêteté sur le ROI (stats sourcées, angles morts annoncés)
 *
 * Stats utilisées sourcées primaires uniquement :
 *   - INSEE 2025 (24 % entreprises FR process admin auto)
 *   - Bpifrance Le Lab 2025 (55 % TPE-PME IA gen)
 *   - NBER WP #31161 (+14 %, +34 % juniors)
 *   - Stanford HAI 2025 + McKinsey State of AI 2025 (5,5 % ROI réel)
 *   - AP Automation Trends 2024 / Ardent Partners (-85 à -90 % saisie)
 *   - Banque de France 2025 (-85 % relances)
 *   - McKinsey via France Num (-80 % recherche docs)
 *
 * Ton : "pote expert" anti-hype, mini-rupture corporate acceptée sur cat 04
 * pour cocher cases acheteur grand compte (DSI / RSSI / DPO / AI Act).
 *
 * Mirror exact structurel de WhyGndAudiovisuelBlock / WhyGndBrandingBlock /
 * WhyGndHomeBlock.
 */
import { WhyGndBlock, type CategoryData } from './WhyGndBlock';

const IA_CATEGORIES: CategoryData[] = [
  {
    id: '01',
    label: 'Diagnostic',
    hideCallout: true,
    headline: {
      plain: 'On commence par regarder.',
      italic: 'Pas par vendre',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Cartographie 7 jours.',
        body: "Avant la moindre ligne de workflow, on passe 7 jours dans vos opérations. On liste les tâches répétitives par poste, on chiffre le temps réel passé, on identifie les fuites de cash (DSO, factures en retard, leads perdus). Vous repartez avec une cartographie chiffrée, utilisable même si vous décidez de ne pas continuer avec GND.",
        labelAsBlock: true,
      },
      {
        label: 'Tri impitoyable.',
        body: "Pas tout automatiser. Règle GND : une tâche entre dans le périmètre si elle coche trois cases, volume hebdo significatif, règles claires, faible enjeu décisionnel. Le reste reste humain. On vous donne une liste GO et une liste NO-GO, écrite, signée.",
        labelAsBlock: true,
      },
      {
        label: 'ROI estimé avant devis.',
        body: "Vous voyez le gain attendu (heures par semaine, euros récupérés, délais raccourcis) AVANT de signer quoi que ce soit. Si le ROI ne tient pas la route, on vous le dit. C'est rare dans le secteur. C'est notre standard.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#2A1810',
      bgImage: '/assets/svc-ia.webp',
      glow:
        'radial-gradient(ellipse 70% 60% at 80% 30%, rgba(255,149,79,0.18) 0%, transparent 70%), radial-gradient(ellipse 45% 65% at 10% 80%, rgba(255,149,79,0.10) 0%, transparent 65%)',
      ring: '#3A2418',
      bubbleAlt: 'Diagnostic GND, cartographie process avant déploiement IA',
    },
    stats: [
      { value: '7 j', label: 'cartographie immersion' },
      { value: 'GO / NO-GO', label: 'liste signée avant contrat' },
      { value: 'ROI', label: 'estimé avant devis' },
    ],
  },
  {
    id: '02',
    label: 'Stack souveraine',
    headline: {
      plain: 'Du self-hosted quand vous voulez.',
      italic: 'Pas de Zapier par défaut',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'n8n self-hosted FR.',
        body: "Vos workflows tournent sur des serveurs en France ou en Europe, sous votre contrôle. Pas de fuite vers les US, pas d'abonnement Zapier qui explose à 2 000 € par mois quand le volume monte. Souveraineté technique, RGPD by design.",
        labelAsBlock: true,
      },
      {
        label: 'LLMs au choix.',
        body: "OpenAI, Anthropic Claude, Mistral, modèles open-source locaux. On vous explique les arbitrages (coût, latence, confidentialité, qualité), vous décidez. Aucune dépendance imposée. Aucun lock-in commercial.",
        labelAsBlock: true,
      },
      {
        label: 'Intégrations sur mesure.',
        body: "Votre CRM, votre ERP, votre GED, votre compta, vos canaux clients (mail, SMS, WhatsApp, voix). On connecte ce qui existe déjà. Pas de migration forcée. Pas de « il faudrait changer votre outil ».",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#3F2418',
      bgImage: '/assets/svc-ia.webp',
      glow:
        'radial-gradient(ellipse 70% 60% at 25% 30%, rgba(253,246,238,0.14) 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 90% 80%, rgba(255,149,79,0.18) 0%, transparent 60%)',
      ring: '#553420',
      bubbleAlt: 'Stack souveraine n8n self-hosted FR + LLMs au choix',
    },
    callout: {
      kicker: 'Stack',
      title: 'n8n self-hosted FR',
      price: 'Sur devis',
      description:
        "Hébergement France ou Europe sous votre contrôle. LLMs au choix (OpenAI, Claude, Mistral, local). Intégrations sur mesure CRM/ERP/GED.",
      tags: ['n8n self-hosted', 'Multi-LLM', 'RGPD by design'],
    },
    stats: [
      { value: 'FR / EU', label: 'hébergement souverain' },
      { value: '0', label: 'lock-in commercial' },
      { value: 'API native', label: 'CRM, ERP, GED' },
    ],
  },
  {
    id: '03',
    label: 'Maintenance incluse',
    headline: {
      plain: 'Six mois de garantie opérationnelle,',
      italic: 'écrits au contrat',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Pas de POC orphelin.',
        body: "Le plus grand échec des projets IA en France : on déploie, l'agence disparaît, le workflow tombe en panne après une mise à jour API, personne ne sait quoi faire. Chez GND, 6 mois de maintenance sont inclus d'office sur toute mission, corrections, ajustements, montée en charge.",
        labelAsBlock: true,
      },
      {
        label: 'Documentation transmissible.',
        body: "Chaque workflow livré arrive avec sa doc claire, schéma, dépendances, points de vigilance. Si demain vous internalisez ou changez de partenaire, vous n'êtes pas otage. C'est notre standard de respect du client.",
        labelAsBlock: true,
      },
      {
        label: 'MRR optionnel après 6 mois.',
        body: "Au-delà des 6 mois inclus, vous choisissez : reprendre la main, ou prolonger en forfait maintenance proactive. Trois paliers selon la criticité (89 € / 149 € / 249 € par mois). Sans engagement. Sans piège.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#4A1E0A',
      bgImage: '/assets/svc-ia.webp',
      glow:
        'radial-gradient(ellipse 75% 65% at 70% 30%, rgba(255,149,79,0.50) 0%, transparent 65%), radial-gradient(ellipse 55% 70% at 15% 85%, rgba(255,149,79,0.22) 0%, transparent 60%)',
      ring: '#5C2A14',
      bubbleAlt: 'Maintenance 6 mois incluse écrite au contrat, pas de POC orphelin',
    },
    callout: {
      kicker: 'Engagement',
      title: 'Maintenance 6 mois',
      price: 'Inclus',
      description:
        "Six mois inclus d'office sur toute mission. Corrections, ajustements, montée en charge. MRR optionnel après (89/149/249 € par mois).",
      tags: ['6 mois inclus', 'Doc transmissible', 'MRR optionnel'],
    },
    stats: [
      { value: '6 mois', label: 'inclus au contrat' },
      { value: '100 %', label: 'documenté' },
      { value: '0', label: 'POC orphelin' },
    ],
  },
  {
    id: '04',
    label: 'Industrialisation',
    headline: {
      plain: 'Une équipe de 3 personnes ou une direction de 3 000.',
      italic: 'Même méthode',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Architecture multi-agents.',
        body: "Pour les grandes structures : orchestration d'agents IA spécialisés (compta, RH, achats, service client), gouvernance des accès, journalisation, auditabilité. On parle DSI, RSSI, DPO, on sait. On a la documentation qui va avec.",
        labelAsBlock: true,
      },
      {
        label: 'Conformité et traçabilité.',
        body: "RGPD, AI Act, traçabilité des décisions automatisées, logs versionnés, kill-switch. Chaque workflow critique passe par une revue conformité avant mise en production. Aucun raccourci.",
        labelAsBlock: true,
      },
      {
        label: 'Conduite du changement.',
        body: "Pour les déploiements à 50+ utilisateurs : ateliers de prise en main, doc utilisateur, hotline interne dédiée 30 jours après go-live. L'IA qui n'est pas adoptée par les équipes ne sert à rien, on l'a appris en regardant les autres.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#160A04',
      bgImage: '/assets/svc-ia.webp',
      glow:
        'radial-gradient(ellipse 65% 55% at 75% 25%, rgba(255,149,79,0.28) 0%, transparent 60%), radial-gradient(ellipse 55% 65% at 20% 80%, rgba(212,165,42,0.20) 0%, transparent 60%)',
      ring: '#241408',
      bubbleAlt: 'Industrialisation IA grandes structures, DSI RSSI DPO AI Act',
    },
    callout: {
      kicker: 'Grands comptes',
      title: 'Architecture multi-agents',
      price: 'Sur devis',
      description:
        "Orchestration agents spécialisés, gouvernance accès, journalisation, auditabilité RGPD + AI Act. Revue conformité avant production.",
      tags: ['Multi-agents', 'AI Act ready', 'DPA / PMR'],
    },
    stats: [
      { value: '50+', label: 'utilisateurs supportés' },
      { value: '30 j', label: 'hotline post go-live' },
      { value: 'AI Act', label: 'revue avant prod' },
    ],
  },
  {
    id: '05',
    label: 'Honnêteté ROI',
    headline: {
      plain: 'On vous dit ce qui marche.',
      italic: 'Et ce qui ne marche pas encore',
      suffix: '.',
    },
    paragraphs: [
      {
        label: 'Gains documentés.',
        body: "Saisie facture : -85 à -90 % du temps (AP Automation Trends 2024, Ardent Partners). Relances impayées : -85 % (Banque de France 2025). Recherche documentaire interne : -80 % (McKinsey, cité France Num.gouv.fr). Sur ces opérations, on s'engage sur des KPIs mesurables, et on les mesure.",
        labelAsBlock: true,
      },
      {
        label: 'Sources vérifiables.',
        body: "Chaque chiffre qu'on cite est lié à une source primaire, INSEE, Bpifrance, NBER, Stanford HAI, McKinsey, Salesforce. Vous pouvez tout vérifier. Le marché regorge de stats fabriquées (« +300 % », « 10x »). On ne joue pas à ce jeu-là.",
        labelAsBlock: true,
      },
      {
        label: 'Les angles morts annoncés.',
        body: "L'IA hallucine encore sur certains cas. Les agents vocaux ne savent pas tout faire. Les LLMs coûtent cher à grande échelle. On vous dit où sont les pièges avant de signer, pas après. Le cas Klarna 2024-2025 (700 ETP économisés puis recul partiel) est dans nos cartons, on apprend de ce que les autres cachent.",
        labelAsBlock: true,
      },
    ],
    palette: {
      bg: '#352014',
      bgImage: '/assets/svc-ia.webp',
      glow:
        'radial-gradient(ellipse 65% 55% at 35% 30%, rgba(212,165,42,0.24) 0%, transparent 60%), radial-gradient(ellipse 55% 60% at 85% 75%, rgba(255,149,79,0.18) 0%, transparent 60%)',
      ring: '#4A2E1E',
      bubbleAlt: 'Honnêteté ROI, gains documentés sources primaires INSEE NBER McKinsey',
    },
    callout: {
      kicker: 'Transparence',
      title: 'Gains documentés',
      price: 'Mesurés',
      description:
        "Sources primaires INSEE, Bpifrance, NBER, Stanford HAI, McKinsey. KPIs mesurables, angles morts annoncés avant signature.",
      tags: ['Sources primaires', 'KPIs mesurés', 'Angles morts'],
    },
    stats: [
      { value: '-90 %', label: 'saisie facture (Ardent 2024)' },
      { value: '-85 %', label: 'relances (BdF 2025)' },
      { value: '-80 %', label: 'recherche docs (McKinsey)' },
    ],
  },
];

export function WhyGndIaBlock() {
  return (
    <WhyGndBlock
      categories={IA_CATEGORIES}
      kickerLabel="Notre vision"
      kickerSubLabel="Automatisation & IA"
      defaultActiveCat="01"
      hideCtas
    />
  );
}
