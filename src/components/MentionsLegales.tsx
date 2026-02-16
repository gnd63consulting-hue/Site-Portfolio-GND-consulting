import React, { useState, useEffect } from 'react';

export function MentionsLegales() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setIsUserScrolling(true);
    setActiveSection(id);

    const headerOffset = 160;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

    setTimeout(() => {
      setIsUserScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-160px 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isUserScrolling) return;
      const visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visibleSections.length > 0 && visibleSections[0].intersectionRatio > 0) {
        setActiveSection(visibleSections[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('[id^="section-"]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isUserScrolling]);

  const sections = [
    { id: 'section-1', title: 'Éditeur du site' },
    { id: 'section-2', title: 'Responsabilité éditoriale' },
    { id: 'section-3', title: 'Contact' },
    { id: 'section-4', title: 'Hébergement' },
    { id: 'section-5', title: 'Propriété intellectuelle' },
    { id: 'section-6', title: 'RGPD' },
    { id: 'section-7', title: 'Cookies' },
    { id: 'section-8', title: 'Intelligence Artificielle' },
    { id: 'section-9', title: 'Responsabilité' },
    { id: 'section-10', title: 'Droit applicable' },
    { id: 'section-11', title: 'Évolution' },
    { id: 'section-12', title: 'Crédits' },
  ];

  /* Prose wrapper — réutilisé pour chaque article */
  const proseClasses = 'prose-section space-y-3 text-text-muted text-[15px] sm:text-base leading-relaxed';

  return (
    <main className="pt-32 pb-24 bg-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 max-w-[1400px] mx-auto text-center mb-16 reveal">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted">
            Juridique
          </span>
        </div>
        <h1 className="font-display font-semibold text-[clamp(2rem,5vw,3.5rem)] text-text-main leading-[0.95]">
          Mentions Légales
        </h1>
        <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto mt-4">
          Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance
          dans l'économie numérique (LCEN)
        </p>
      </section>

      {/* ── TABLE DES MATIÈRES — Desktop fixe ────────────────────────────── */}
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-20 w-[220px]">
        <div className="rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="p-4 pb-3 border-b border-gray-100">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">Sommaire</p>
          </div>
          <nav className="p-3 space-y-0.5 max-h-[calc(100vh-12rem)] overflow-y-auto">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-black text-white font-semibold'
                      : 'text-text-muted hover:bg-gray-50 hover:text-text-main'
                  }`}
                >
                  {index + 1}. {section.title}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── CONTENU ──────────────────────────────────────────────────────── */}
      <div className="px-6 lg:px-12 max-w-[800px] mx-auto space-y-16 reveal delay-100">

        {/* 1. Éditeur du site */}
        <article id="section-1" className="scroll-mt-40">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 1</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Éditeur du site</h2>
          <div className={proseClasses}>
            <p><strong className="text-text-main">Nom commercial :</strong> GND Consulting</p>
            <p><strong className="text-text-main">Forme juridique :</strong> Entrepreneur Individuel (EI) – Auto-entrepreneur</p>
            <p><strong className="text-text-main">SIREN :</strong> 939 676 136</p>
            <p><strong className="text-text-main">SIRET :</strong> 939 676 136 00012</p>
            <p><strong className="text-text-main">Code APE / NAF :</strong> 5911A – Production de films et de programmes pour la télévision</p>
            <p><strong className="text-text-main">Immatriculation :</strong> Répertoire des Métiers (RM)</p>
            <p><strong className="text-text-main">Date d'immatriculation :</strong> 15 janvier 2025</p>
            <p><strong className="text-text-main">Capital social :</strong> Non applicable (entreprise individuelle)</p>
            <p><strong className="text-text-main">TVA :</strong> Franchise en base de TVA – article 293 B du CGI (TVA non applicable)</p>
            <p><strong className="text-text-main">Siège social :</strong> Paris, France</p>
          </div>
        </article>

        {/* 2. Responsabilité éditoriale */}
        <article id="section-2" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 2</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Responsabilité éditoriale</h2>
          <div className={proseClasses}>
            <p><strong className="text-text-main">Directeur de la publication :</strong> Pierre Roodny</p>
            <p><strong className="text-text-main">Responsable éditorial :</strong> Pierre Roodny</p>
            <p><strong className="text-text-main">Délégué à la protection des données (DPO) :</strong> Pierre Roodny</p>
          </div>
        </article>

        {/* 3. Contact */}
        <article id="section-3" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 3</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Contact</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-text-muted mb-1">Email</p>
              <a href="mailto:contact@gndconsulting.fr" className="text-sm font-semibold text-text-main hover:underline">
                contact@gndconsulting.fr
              </a>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-text-muted mb-1">Téléphone</p>
              <a href="tel:+33759506322" className="text-sm font-semibold text-text-main hover:underline">
                07 59 50 63 22
              </a>
            </div>
          </div>
        </article>

        {/* 4. Hébergement */}
        <article id="section-4" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 4</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Hébergement du site</h2>
          <div className={proseClasses}>
            <p><strong className="text-text-main">Hébergeur :</strong> Hostinger International Ltd.</p>
            <p><strong className="text-text-main">Adresse :</strong> Jonavos g. 60C, 44192 Kaunas, Lituanie</p>
            <p>
              <strong className="text-text-main">Site web officiel : </strong>
              <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                https://www.hostinger.fr
              </a>
            </p>
          </div>
        </article>

        {/* 5. Propriété intellectuelle */}
        <article id="section-5" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 5</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Propriété intellectuelle</h2>
          <div className={proseClasses}>
            <p>
              L'ensemble du contenu présent sur ce site web (textes, visuels, photographies, vidéos, logos, graphismes, éléments sonores, bases de données, etc.)
              est la propriété exclusive de <strong className="text-text-main">GND Consulting</strong>, sauf mention contraire explicite.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site,
              quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l'autorisation écrite préalable de GND Consulting.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon
              et poursuivie conformément aux dispositions des articles <strong className="text-text-main">L.335-2 et suivants du Code de la propriété intellectuelle</strong>.
            </p>
            <p>
              Les marques et logos présents sur le site sont déposés par GND Consulting ou éventuellement par ses partenaires.
              Toute reproduction totale ou partielle de ces marques ou logos effectuée à partir des éléments du site sans l'autorisation expresse de GND Consulting est prohibée.
            </p>
          </div>
        </article>

        {/* 6. Protection des données personnelles - RGPD */}
        <article id="section-6" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 6</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Protection des données personnelles (RGPD)</h2>
          <div className={proseClasses}>
            <p>
              Conformément au <strong className="text-text-main">Règlement Général sur la Protection des Données (RGPD – UE 2016/679)</strong> et à la
              <strong className="text-text-main"> loi Informatique et Libertés du 6 janvier 1978 modifiée</strong>, vous disposez de droits sur vos données personnelles.
            </p>

            <div className="rounded-xl bg-background-alt p-6 mt-4">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">6.1 Responsable du traitement</h3>
              <p><strong className="text-text-main">GND Consulting</strong> – Pierre Roodny</p>
              <p>Email DPO : <a href="mailto:contact@gndconsulting.fr" className="text-accent hover:underline">contact@gndconsulting.fr</a></p>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">6.2 Données collectées</h3>
              <p>Nous sommes susceptibles de collecter les données personnelles suivantes :</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-text-main">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Nom de l'entreprise (le cas échéant)</li>
                <li>Données de navigation (cookies, adresse IP, pages visitées)</li>
                <li>Toute autre information fournie via le formulaire de contact</li>
              </ul>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">6.3 Finalités du traitement</h3>
              <p>Les données personnelles sont collectées et traitées pour les finalités suivantes :</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-text-main">
                <li>Gestion de la relation client</li>
                <li>Réponse aux demandes de contact et de devis</li>
                <li>Amélioration de nos services et de l'expérience utilisateur</li>
                <li>Envoi d'informations relatives à nos prestations (avec consentement préalable)</li>
                <li>Respect des obligations légales et comptables</li>
              </ul>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">6.4 Base légale des traitements</h3>
              <p>Les traitements de données personnelles reposent sur les bases légales suivantes (RGPD Art. 6) :</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-text-main">
                <li><strong className="text-text-main">Article 6.1.a :</strong> Consentement de la personne concernée</li>
                <li><strong className="text-text-main">Article 6.1.b :</strong> Exécution d'un contrat ou de mesures précontractuelles</li>
                <li><strong className="text-text-main">Article 6.1.c :</strong> Respect d'une obligation légale</li>
                <li><strong className="text-text-main">Article 6.1.f :</strong> Intérêt légitime poursuivi par le responsable du traitement</li>
              </ul>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">6.5 Destinataires des données</h3>
              <p>
                Vos données personnelles sont destinées exclusivement à <strong className="text-text-main">GND Consulting</strong>.
                Elles ne sont en aucun cas revendues, louées ou cédées à des tiers sans votre consentement explicite.
              </p>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">6.6 Durée de conservation</h3>
              <p>Les données personnelles sont conservées pendant les durées suivantes :</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-text-main">
                <li>Prospects non-clients : <strong>3 ans</strong> maximum à compter du dernier contact</li>
                <li>Clients : pendant la durée contractuelle + <strong>5 ans</strong> (prescription commerciale)</li>
                <li>Données comptables : <strong>10 ans</strong> (obligation légale)</li>
                <li>Données de navigation : <strong>13 mois</strong> maximum</li>
              </ul>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">6.7 Vos droits</h3>
              <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-text-main">
                <li><strong>Droit d'accès</strong> : obtenir la confirmation que vos données sont traitées et y accéder</li>
                <li><strong>Droit de rectification</strong> : corriger vos données inexactes ou incomplètes</li>
                <li><strong>Droit à l'effacement</strong> ("droit à l'oubli") : supprimer vos données personnelles</li>
                <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
              </ul>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">6.8 Exercer vos droits</h3>
              <p>
                Pour exercer l'un de ces droits, contactez-nous par email à :
                <a href="mailto:contact@gndconsulting.fr" className="text-accent hover:underline ml-1">contact@gndconsulting.fr</a>
              </p>
              <p className="mt-2">
                Vous disposez également du droit d'introduire une réclamation auprès de la <strong className="text-text-main">CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) :
              </p>
              <div className="mt-3 rounded-lg border border-gray-200 bg-white p-4 text-sm">
                <p className="font-medium text-text-main">CNIL – 3 Place de Fontenoy, TSA 80715 – 75334 Paris Cedex 07</p>
                <p>Téléphone : 01 53 73 22 22</p>
                <p>Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cnil.fr</a></p>
              </div>
            </div>
          </div>
        </article>

        {/* 7. Cookies */}
        <article id="section-7" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 7</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Politique de cookies</h2>
          <div className={proseClasses}>
            <p>
              Conformément à la <strong className="text-text-main">délibération CNIL n° 2020-091 du 17 septembre 2020</strong>, ce site est susceptible d'utiliser des cookies
              pour améliorer l'expérience utilisateur et analyser le trafic.
            </p>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">7.1 Qu'est-ce qu'un cookie ?</h3>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors de la visite d'un site web.
                Il permet de collecter des informations relatives à votre navigation.
              </p>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">7.2 Types de cookies utilisés</h3>
              <ul className="space-y-2 text-text-main">
                <li><strong>Cookies essentiels :</strong> <span className="text-text-muted">nécessaires au fonctionnement du site (navigation, sécurité). Ils ne nécessitent pas de consentement préalable.</span></li>
                <li><strong>Cookies de préférences :</strong> <span className="text-text-muted">mémorisent vos choix (langue, région, paramètres d'affichage).</span></li>
                <li><strong>Cookies de mesure d'audience :</strong> <span className="text-text-muted">collectent des statistiques anonymisées sur la fréquentation du site (ex : outil d'analyse type Matomo, Google Analytics configuré en mode anonyme).</span></li>
                <li><strong>Cookies de fonctionnalités tierces :</strong> <span className="text-text-muted">provenant de services externes (vidéos, cartes interactives, etc.).</span></li>
              </ul>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">7.3 Gestion des cookies</h3>
              <p>Vous pouvez à tout moment gérer vos préférences en matière de cookies via :</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-text-main">
                <li>La bannière de consentement qui s'affiche lors de votre première visite</li>
                <li>Les paramètres de votre navigateur (Chrome, Firefox, Safari, Edge, etc.)</li>
              </ul>
              <p className="mt-2">Le refus de cookies peut entraîner une limitation de certaines fonctionnalités du site.</p>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">7.4 Durée de validité du consentement</h3>
              <p>
                Conformément aux recommandations de la CNIL, votre choix concernant les cookies est conservé pour une durée maximale de <strong className="text-text-main">6 mois</strong>.
                Au-delà, un nouveau consentement vous sera demandé.
              </p>
            </div>
          </div>
        </article>

        {/* 8. Intelligence Artificielle */}
        <article id="section-8" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 8</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Utilisation de l'Intelligence Artificielle</h2>
          <div className={proseClasses}>
            <p>
              GND Consulting intègre dans ses processus créatifs et opérationnels des outils d'<strong className="text-text-main">intelligence artificielle (IA)</strong>
              {' '}pour optimiser certaines prestations (automatisation, génération de visuels, traitement de données, analyse, amélioration de contenus, etc.).
            </p>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">8.1 Engagement éthique et responsable</h3>
              <p>Nous nous engageons à :</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-text-main">
                <li>Utiliser l'IA de manière éthique, transparente et sécurisée</li>
                <li>Respecter la confidentialité et la vie privée de nos clients</li>
                <li>Garantir un usage conforme au <strong>RGPD</strong> et à l'<strong>AI Act européen</strong> (Règlement UE 2024/1689 entré en vigueur en août 2024)</li>
                <li>Informer clairement nos clients lorsque l'IA est utilisée dans le cadre de nos prestations</li>
              </ul>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">8.2 Protection des données</h3>
              <p>
                Aucune donnée personnelle ou confidentielle de nos clients n'est utilisée pour entraîner des modèles d'IA tiers sans consentement explicite.
                Les données traitées via des systèmes d'IA le sont dans le respect strict des normes de sécurité et de confidentialité.
              </p>
            </div>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">8.3 Transparence</h3>
              <p>
                Lorsqu'un contenu, un visuel ou un processus a été généré ou assisté par une intelligence artificielle,
                GND Consulting s'efforce de le mentionner de manière transparente auprès de ses clients.
              </p>
            </div>
          </div>
        </article>

        {/* 9. Limitation de responsabilité */}
        <article id="section-9" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 9</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Limitation de responsabilité</h2>
          <div className={proseClasses}>
            <p>
              GND Consulting s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site.
              Toutefois, <strong className="text-text-main">GND Consulting ne saurait être tenu responsable</strong> :
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-text-main">
              <li>Des erreurs, inexactitudes ou omissions présentes sur le site</li>
              <li>Des interruptions temporaires du site pour maintenance ou mises à jour techniques</li>
              <li>Des dommages directs ou indirects résultant de l'utilisation du site</li>
              <li>Des contenus présents sur les sites tiers accessibles via des liens hypertextes depuis notre site</li>
              <li>De tout préjudice causé par un usage malveillant du site par un tiers</li>
            </ul>
            <p className="mt-2">
              Le contenu du site est fourni à titre informatif et ne constitue en aucun cas une offre contractuelle.
              GND Consulting se réserve le droit de modifier ou corriger le contenu du site à tout moment sans préavis.
            </p>
          </div>
        </article>

        {/* 10. Droit applicable et litiges */}
        <article id="section-10" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 10</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Droit applicable et règlement des litiges</h2>
          <div className={proseClasses}>
            <p>
              Les présentes mentions légales sont régies par le <strong className="text-text-main">droit français</strong>.
              En cas de litige, les <strong className="text-text-main">tribunaux français</strong> seront seuls compétents.
            </p>

            <div className="rounded-xl bg-background-alt p-6">
              <h3 className="font-display font-semibold text-text-main text-lg mb-3">10.1 Médiation à la consommation</h3>
              <p>
                Conformément à l'article L.612-1 du Code de la consommation, GND Consulting informe ses clients qu'en cas de litige,
                ils peuvent recourir à une procédure de médiation conventionnelle ou à tout autre mode alternatif de règlement des différends.
              </p>
              <p className="mt-2">
                <strong className="text-text-main">Aucun médiateur spécifique n'est actuellement désigné.</strong> Toutefois, vous pouvez soumettre votre litige à la plateforme de règlement en ligne des litiges de l'Union Européenne :
              </p>
              <div className="mt-3 rounded-lg border border-gray-200 bg-white p-4">
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium text-sm break-all">
                  https://ec.europa.eu/consumers/odr
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* 11. Évolution des mentions légales */}
        <article id="section-11" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 11</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Évolution des mentions légales</h2>
          <div className={proseClasses}>
            <p>
              GND Consulting se réserve le droit de modifier les présentes mentions légales à tout moment, notamment pour les adapter
              aux évolutions législatives, réglementaires, jurisprudentielles et techniques.
            </p>
            <p>
              Il est recommandé de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
            </p>
          </div>
        </article>

        {/* 12. Crédits */}
        <article id="section-12" className="scroll-mt-40 border-t border-gray-100 pt-12">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-2">Article 12</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-main mb-6">Crédits</h2>
          <div className={proseClasses}>
            <p><strong className="text-text-main">Conception et design :</strong> GND Consulting</p>
            <p><strong className="text-text-main">Développement web :</strong> GND Consulting</p>
            <p><strong className="text-text-main">Réalisation :</strong> Pierre Roodny</p>
            <p><strong className="text-text-main">Hébergement :</strong> Hostinger International Ltd.</p>
          </div>
        </article>

        {/* Note de mise à jour */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-text-muted italic">
            Dernière mise à jour : octobre 2025
          </p>
        </div>
      </div>
    </main>
  );
}
