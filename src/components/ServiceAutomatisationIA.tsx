import React, { useEffect } from 'react';
import { updateMetaTags, pageSEO } from '../utils/seo';

const prestations = [
  { icon: 'conversion_path', label: 'Workflows N8N' },
  { icon: 'smart_toy', label: 'Chatbots IA' },
  { icon: 'api', label: 'Intégrations API' },
  { icon: 'neurology', label: 'Agents autonomes' },
  { icon: 'campaign', label: 'Automatisation marketing' },
  { icon: 'school', label: 'Formation & adoption IA' },
];

const processSteps = [
  { num: '01', title: 'Audit & stratégie', description: 'Cartographie de vos flux, identification des opportunités IA et feuille de route priorisée avec ROI estimé.' },
  { num: '02', title: 'Prototypage rapide', description: 'POC fonctionnel en quelques semaines pour valider l\'impact sur un cas d\'usage concret.' },
  { num: '03', title: 'Déploiement progressif', description: 'Intégration dans votre stack existante, tests, monitoring et montée en charge maîtrisée.' },
  { num: '04', title: 'Formation & itération', description: 'Ateliers métiers, documentation interne, coaching d\'équipes et amélioration continue.' },
];

const faqItems = [
  {
    question: 'Est-ce adapté à mon entreprise ?',
    answer: 'Oui. Nos solutions sont modulaires et s\'adaptent à votre taille, votre secteur et votre maturité numérique. Nous concevons des automatisations proportionnées à vos besoins.',
  },
  {
    question: 'Dois-je déjà disposer d\'outils spécifiques ?',
    answer: 'Pas nécessairement. Nous partons de votre stack actuelle et la complétons si besoin. L\'objectif : valoriser l\'existant avant d\'introduire de nouveaux outils.',
  },
  {
    question: 'Combien de temps pour un premier résultat ?',
    answer: 'Quelques semaines pour un POC, 1 à 3 mois pour un déploiement progressif selon le périmètre. Nous privilégions des cycles courts avec des gains mesurables à chaque étape.',
  },
  {
    question: 'Quel ROI attendre ?',
    answer: 'Nous estimons le ROI dès l\'audit. Selon les cas, un retour sur investissement est observé entre 3 et 6 mois grâce aux gains de temps, à la réduction des erreurs et à l\'amélioration de la conversion.',
  },
  {
    question: 'Comment garantissez-vous la sécurité des données ?',
    answer: 'Conformité RGPD, chiffrement, contrôle d\'accès, audit trail... et possibilité de travailler en mode on-premise. La sécurité est intégrée à chaque étape.',
  },
  {
    question: 'Proposez-vous de la formation ?',
    answer: 'Absolument. L\'adoption humaine est clé : ateliers, guides d\'usage, coaching d\'équipes et support continu font partie de notre accompagnement.',
  },
];

export function ServiceAutomatisationIA() {
  useEffect(() => {
    updateMetaTags({
      ...pageSEO.aiService,
      url: `${window.location.origin}/services/automatisation-ia`
    });
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const footer = document.querySelector('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative min-h-[60vh] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://gublhtivvydkuooooffg.supabase.co/storage/v1/object/public/portfolio-photos/20251006_2055_Espace%20Travail%20Futuriste_simple_compose_01k6xdztmrewrv8rq637vqqpnp.png"
            alt="Espace collaboratif futuriste - Automatisation et intelligence artificielle"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-end min-h-[60vh]">
          <div className="reveal">
            <span className="inline-block border border-blue-400/40 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-blue-300 mb-6">
              Automatisation & IA
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-4">
              Automatisation & IA<br />sur mesure
            </h1>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
              Des workflows intelligents pour booster la productivité, la qualité et l'engagement.
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="py-16 reveal">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-200">
            <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-400" />
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Text left */}
            <div className="reveal">
              <p className="text-lg text-gray-500 leading-relaxed">
                De l'automatisation de processus aux agents IA spécialisés, nous concevons des solutions pragmatiques qui
                s'intègrent à votre stack, délivrent des gains rapides et s'échelonnent en toute sécurité. Chez GND Consulting,
                chaque workflow est pensé pour éliminer les tâches répétitives, accélérer la prise de décision et libérer
                vos équipes sur les missions à forte valeur ajoutée.
              </p>
            </div>

            {/* Prestations list right */}
            <div className="reveal delay-100">
              <h3 className="font-display font-semibold text-xl text-black mb-6">Nos prestations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prestations.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-xl text-blue-400 mt-0.5">{item.icon}</span>
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="py-32 bg-blue-950">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16">
            <span className="inline-block border border-blue-400/30 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-blue-300 mb-4">
              Impact
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-white">
              Des résultats mesurables
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '+40%', label: 'Gains de productivité', description: 'Automatisation des tâches répétitives et optimisation des processus end-to-end.' },
              { value: '20 min/j', label: 'Temps économisé par collaborateur', description: 'Comptes-rendus automatiques, recherche accélérée, routage intelligent.' },
              { value: '+66%', label: 'Débit opérationnel', description: 'Workflows orchestrés qui accélèrent la prise en charge des demandes.' },
              { value: '25%', label: 'Économies constatées', description: 'Effets combinés sur les coûts opérationnels et la qualité de service.' },
            ].map((metric, index) => (
              <div key={metric.label} className={`reveal delay-${index === 0 ? '75' : index === 1 ? '100' : index === 2 ? '150' : '200'}`}>
                <div className="border-t border-blue-400/30 pt-6">
                  <p className="font-display font-bold text-4xl text-blue-400 mb-2">{metric.value}</p>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">{metric.label}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{metric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOS BRIQUES IA */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16">
            <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Expertises
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black">
              Nos briques IA & automatisation
            </h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto mt-4 leading-relaxed">
              Des modules combinables pour bâtir votre feuille de route IA, du POC au déploiement à l'échelle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'neurology',
                title: 'Agents IA personnalisés',
                description: 'Assistants digitaux entraînés sur vos données pour répondre, qualifier, exécuter.',
                features: ['Support client 24/7', 'Qualification & nurturing de leads', 'Assistance interne (RH, IT, finance)', 'Supervision & audit trail'],
              },
              {
                icon: 'settings',
                title: 'Automatisation de processus',
                description: 'Orchestration des tâches répétitives et validations multi-applications.',
                features: ['Onboarding client/fournisseur', 'Génération & routage de documents', 'Synchronisation CRM / ERP', 'Notifications & relances intelligentes'],
              },
              {
                icon: 'api',
                title: 'Intégrations sur-mesure',
                description: 'Connecter votre écosystème pour éviter les silos de données.',
                features: ['CRM, suites bureautiques, Notion, Slack...', 'APIs, webhooks, connecteurs iPaaS', 'Normalisation & monitoring', 'Sécurité & gouvernance'],
              },
              {
                icon: 'auto_awesome',
                title: 'Création assistée par IA',
                description: 'Accélérer sans renoncer à la qualité et à la cohérence éditoriale.',
                features: ['Rédaction guidée (articles, scripts, emails)', 'Aide à la conception visuelle', 'Génération de présentations & résumés', 'Contrôles : ton, marque, validation humaine'],
              },
              {
                icon: 'groups',
                title: 'Formation & adoption',
                description: 'Ateliers métiers et conduite du changement pour ancrer l\'usage.',
                features: ['Workshops marketing, vente, ops, RH', 'Guides & politiques IA', 'Coaching d\'équipes, gouvernance', 'Support continu'],
              },
              {
                icon: 'query_stats',
                title: 'Audit & stratégie IA',
                description: 'Cartographier vos opportunités, prioriser et chiffrer le ROI.',
                features: ['Diagnostic des flux', 'Feuille de route 90 jours', 'POC rapide', 'Déploiement progressif'],
              },
            ].map((service, index) => (
              <div key={service.title} className={`reveal delay-${index < 2 ? '75' : index < 4 ? '100' : '150'}`}>
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-blue-200 hover:shadow-lg">
                  <span className="material-symbols-outlined text-3xl text-blue-500">{service.icon}</span>
                  <h3 className="font-display font-semibold text-lg text-black mt-4 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="material-symbols-outlined text-sm text-blue-400 mt-0.5">check</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOMAINES D'APPLICATION */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16">
            <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Cas d'usage
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black">
              Domaines d'application prioritaires
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                icon: 'ads_click',
                title: 'Marketing & communication',
                points: ['Génération & déclinaison de contenus multicanaux', 'Analyse de tendances et social listening', 'Personnalisation en temps réel', 'Orchestration automatisée des campagnes'],
              },
              {
                icon: 'handshake',
                title: 'Ventes & relation client',
                points: ['Agents conversationnels & self-service', 'Qualification intelligente des prospects', 'Follow-up automatisés', 'Coaching commercial assisté'],
              },
              {
                icon: 'monitoring',
                title: 'Opérations & finance',
                points: ['Automatisation back-office', 'Pilotage dashboards & alertes', 'Prévisions & reporting assistés', 'Gestion des risques et conformité'],
              },
              {
                icon: 'badge',
                title: 'RH & expérience collaborateur',
                points: ['Onboarding & demandes internes', 'FAQ RH intelligentes', 'Formation personnalisée', 'Suivi bien-être & feedback'],
              },
            ].map((domain, index) => (
              <div key={domain.title} className={`reveal delay-${index < 2 ? '75' : '150'}`}>
                <div className="h-full rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-blue-200 hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-2xl text-blue-500">{domain.icon}</span>
                    <h3 className="font-display font-semibold text-lg text-black">{domain.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {domain.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="material-symbols-outlined text-sm text-blue-400 mt-0.5">arrow_right_alt</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="py-32 bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16">
            <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Processus
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black">
              Notre processus
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.num} className={`reveal delay-${index === 0 ? '75' : index === 1 ? '100' : index === 2 ? '150' : '200'}`}>
                <div className="border-t-2 border-blue-500 pt-6">
                  <span className="font-display font-bold text-4xl text-blue-200 block mb-4">{step.num}</span>
                  <h3 className="font-display font-semibold text-lg text-black mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI MAINTENANT */}
      <section className="py-32 bg-blue-600">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16">
            <span className="inline-block border border-white/30 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/70 mb-4">
              Contexte
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-white">
              Pourquoi accélérer maintenant ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { value: '+60%', label: 'de croissance des revenus chez les leaders IA' },
              { value: '+30%', label: 'd\'économies potentielles grâce à l\'automatisation' },
              { value: '+66%', label: 'de débit opérationnel sur des processus récurrents' },
              { value: '~26%', label: 'des organisations capturent déjà une valeur IA tangible' },
            ].map((stat, index) => (
              <div key={stat.label} className={`reveal delay-${index < 2 ? '75' : '150'}`}>
                <div className="border-t border-white/20 pt-6">
                  <p className="font-display font-bold text-4xl sm:text-5xl text-white mb-2">{stat.value}</p>
                  <p className="text-white/70 leading-relaxed">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETS LIES */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16">
            <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Portfolio
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black">
              Projets d'automatisation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { title: 'WORKFLOW N8N - GESTION DE LEADS', tag: 'Automatisation' },
              { title: 'CHATBOT IA - SERVICE CLIENT', tag: 'Agent IA' },
            ].map((project, index) => (
              <div key={project.title} className={`reveal ${index % 2 === 1 ? 'delay-150 md:mt-24' : 'delay-75'}`}>
                <div className={`relative overflow-hidden rounded-2xl ${index % 2 === 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'} bg-gray-200 group`}>
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-300 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="mt-4">
                  <h3 className="font-display font-semibold text-lg text-black">{project.title}</h3>
                  <span className="border border-gray-300 rounded-full text-xs uppercase tracking-[0.15em] px-3 py-1 text-gray-500 mt-2 inline-block">
                    {project.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="reveal text-center mb-16">
            <span className="inline-block border border-gray-300 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              FAQ
            </span>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black">
              Questions fréquentes
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-4 leading-relaxed">
              Clarifiez vos interrogations avant d'automatiser.
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqItems.map((item) => (
              <details key={item.question} className="group reveal">
                <summary className="flex items-center justify-between cursor-pointer py-6 text-left">
                  <h3 className="font-display font-semibold text-lg text-black pr-4">{item.question}</h3>
                  <span className="material-symbols-outlined text-xl text-gray-400 transition-transform duration-300 group-open:rotate-45 flex-shrink-0">add</span>
                </summary>
                <p className="pb-6 text-gray-500 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 reveal">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[0.9] tracking-tight text-black mb-4">
            Prêt à industrialiser vos workflows ?
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            Audit offert, feuille de route priorisée, accompagnement humain et sécurisation totale.
            Lançons ensemble vos premières automatisations IA.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 bg-black text-white rounded-full px-8 py-4 font-medium text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300"
          >
            Planifier un audit gratuit
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </button>
        </div>
      </section>
    </main>
  );
}
