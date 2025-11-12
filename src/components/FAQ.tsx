import React from 'react';
import { UnifiedFAQ } from './UnifiedFAQ';

interface FAQProps {
  headingOverride?: string;
  containerClassName?: string;
}

export function FAQ({ headingOverride, containerClassName = '' }: FAQProps = {}) {
  const faqItems = [
    {
      question: "Quels types de projets proposez-vous chez GND Consulting ?",
      answer: "GND Consulting accompagne une variété de projets : vidéos corporate, capsules pour réseaux sociaux, reportages, motion design, photos événementielles, créations graphiques, automatisation IA, et plus encore. Nous intervenons auprès d'associations, indépendants, start-ups, PME, et également grandes entreprises et institutions."
    },
    {
      question: "Comment se déroule un projet typique chez GND ?",
      answer: "Tout commence par une compréhension claire de vos objectifs. Une fois les besoins clarifiés et le devis validé, la production se déroule en plusieurs étapes : Préparation (repérages, scénario, moodboard, rétroplanning), Tournage ou conception (selon le type de projet), Postproduction (montage, retouches, ajustements), Livraison finale selon les formats convenus."
    },
    {
      question: "Quels sont les délais de livraison moyens ?",
      answer: "Les délais varient selon le type de prestation : Montage simple \"7 à 10 jours ouvrés\", Montage long (2h) \"jusqu'à 20 jours ouvrés\", Projets complexes (motion, multi-caméras…) : sur devis. Nous nous engageons à respecter un rétroplanning défini ensemble."
    },
    {
      question: "Dois-je verser un acompte pour lancer un projet ?",
      answer: "Oui. Un acompte entre 30 % et 50 % est demandé pour valider la réservation. Le solde est dû à la livraison. Le montant exact est précisé dans le devis."
    },
    {
      question: "Proposez-vous des services d'automatisation ou d'IA ?",
      answer: "Oui. GND Consulting intègre des solutions sur-mesure pour automatiser certaines tâches de votre workflow : Préparation et publication automatisée de contenus, Déclinaisons multi-formats \"Reels, TikTok, Shorts…\", Génération assistée de visuels, Automatisation CRM, e-mailing ou formulaires. Nous vous accompagnons dans l'intégration de solutions simples, sans complexité technique."
    },
    {
      question: "Peut-on faire appel à vous pour un événement ponctuel ?",
      answer: "Absolument. Nous proposons des prestations sur-mesure pour des événements : captation, aftermovie, photos, lives, etc."
    },
    {
      question: "Est-ce que je peux demander plusieurs modifications ?",
      answer: "Oui. Selon le pack choisi : Pack Standard : 2 modifications incluses, Pack Premium : 3 à 5 modifications incluses. Au-delà, les ajustements sont facturés. Ces modalités sont précisées à l'avance dans le devis."
    },
    {
      question: "Travaillez-vous uniquement avec les petites structures ?",
      answer: "Non. GND Consulting accompagne des structures de toutes tailles. Nous sommes capables de structurer des projets ambitieux, adaptés aux standards des grandes entreprises, tout en gardant notre approche humaine et agile."
    },
    {
      question: "Est-ce que vos services sont adaptables à mon secteur ?",
      answer: "Oui. Notre approche s'adapte à chaque secteur d'activité : éducation, culture, sport, tech, immobilier, restauration, mode, santé, etc. Chaque projet est pensé sur-mesure."
    },
    {
      question: "Quels formats livrez-vous ?",
      answer: "Nous livrons dans les formats les plus courants \"MP4, JPEG, PDF, etc.\", optimisés selon les plateformes visées \"YouTube, Instagram, LinkedIn…\". Si vous avez des exigences spécifiques, elles seront intégrées dès le début du projet."
    },
    {
      question: "Puis-je intégrer des services IA à mes contenus sans m'y connaître ?",
      answer: "Oui, nous avons conçu une offre justement pensée pour les non-techniciens. Vous n'avez rien à coder : nous vous aidons à automatiser simplement des actions utiles à votre activité."
    },
    {
      question: "Est-ce que vous faites du conseil stratégique ?",
      answer: "Nous proposons des séances de cadrage stratégique, notamment pour clarifier vos objectifs, structurer votre communication ou planifier votre production de contenus. Ce service peut être réservé indépendamment ou intégré à une mission globale."
    },
    {
      question: "Comment savoir si votre offre est adaptée à mon budget ?",
      answer: "Nous avons plusieurs formules accessibles \"Starter, Standard, Premium\", et proposons également des devis sur-mesure. Le mieux reste de nous contacter avec un aperçu de votre besoin."
    }
  ];

  return (
    <div className={containerClassName}>
      <UnifiedFAQ
        title={headingOverride ?? "QUESTIONS FRÉQUENTES"}
        subtitle="Retrouvez ici toutes les réponses aux interrogations fréquentes de nos clients, de la PME locale à la grande entreprise."
        description="Tarifs, délais, méthode de travail : trouvez rapidement les réponses à vos questions sur nos services créatifs"
        emoji="💡"
        faqItems={faqItems}
        themeColor={{
          primary: '#3b82f6',
          secondary: '#06b6d4',
          gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
        }}
        ctaText="Démarrer mon projet"
        ctaLink="#contact"
      />
    </div>
  );
}
