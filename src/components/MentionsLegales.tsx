import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { Building2, Mail, Phone, Scale, Shield, Cookie, Brain, Gavel, FileText, Globe, ChevronRight } from 'lucide-react';

export function MentionsLegales() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setIsUserScrolling(true);
    setActiveSection(id);

    const headerOffset = 160;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

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

      if (visibleSections.length > 0) {
        const topSection = visibleSections[0];
        if (topSection.intersectionRatio > 0) {
          setActiveSection(topSection.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('[id^="section-"]');

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, [isUserScrolling]);

  const sections = [
    { id: 'section-1', title: 'Éditeur du site', icon: Building2 },
    { id: 'section-2', title: 'Responsabilité éditoriale', icon: FileText },
    { id: 'section-3', title: 'Contact', icon: Mail },
    { id: 'section-4', title: 'Hébergement', icon: Globe },
    { id: 'section-5', title: 'Propriété intellectuelle', icon: FileText },
    { id: 'section-6', title: 'RGPD', icon: Shield },
    { id: 'section-7', title: 'Cookies', icon: Cookie },
    { id: 'section-8', title: 'Intelligence Artificielle', icon: Brain },
    { id: 'section-9', title: 'Responsabilité', icon: Scale },
    { id: 'section-10', title: 'Droit applicable', icon: Gavel },
    { id: 'section-11', title: 'Évolution', icon: FileText },
    { id: 'section-12', title: 'Crédits', icon: Building2 }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] relative overflow-hidden mentions-legales-page">
      {/* Effet de fond subtil */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(0,0,0,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.03)_0%,transparent_50%)]"></div>

      {/* Header avec fond dégradé pour visibilité du logo */}
      <div
        className="absolute top-0 left-0 right-0 z-[140] h-40 backdrop-blur-sm bg-[linear-gradient(to_bottom,#f9fafb_0%,#ffffff_100%)]"
      ></div>

      <Header />

      {/* Hero Section */}
      <section className="reveal pt-40 md:pt-48 pb-4 md:pb-16 px-6 lg:px-12 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-black rounded-2xl mb-2 sm:mb-4 md:mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300 mx-auto">
            <Scale className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-[#1A1A1A] mb-2 sm:mb-3 md:mb-4 tracking-wide leading-tight px-2">
            MENTIONS LÉGALES
          </h1>
          <p className="text-[#64748B] text-[13px] sm:text-sm md:text-base lg:text-lg max-w-[300px] sm:max-w-md md:max-w-2xl mx-auto leading-[1.6] sm:leading-relaxed px-4 text-justify">
            Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN)
          </p>
        </div>
      </section>

      {/* Table des matières - Desktop uniquement */}
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-20 bg-gray-50 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-h-[calc(100vh-8rem)]">
        <div className="p-4 pb-2 border-b border-gray-200">
          <h3 className="font-display text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">Sommaire</h3>
        </div>
        <nav className="space-y-1 p-4 pt-3 overflow-y-auto max-h-[calc(100vh-12rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                aria-current={isActive ? 'true' : 'false'}
                aria-label={`Aller à la section ${index + 1}: ${section.title}`}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2.5 text-left text-xs rounded-xl
                  transition-all duration-300 ease-in-out group relative overflow-hidden
                  ${isActive
                    ? 'bg-black text-white shadow-lg scale-[1.02] font-semibold'
                    : 'text-[#64748B] hover:bg-gray-100 hover:text-[#1A1A1A] hover:shadow-sm'
                  }
                `}
                style={{ willChange: isActive ? 'transform' : 'auto' }}
              >
                <Icon className={`
                  w-3.5 h-3.5 flex-shrink-0 transition-all duration-300
                  ${isActive ? 'text-white scale-110' : 'text-[#1A1A1A] group-hover:scale-105'}
                `} />
                <span className="truncate flex-1">{index + 1}. {section.title}</span>
                <ChevronRight className={`
                  w-3.5 h-3.5 flex-shrink-0 transition-all duration-300
                  ${isActive
                    ? 'opacity-100 translate-x-0 text-white'
                    : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#1A1A1A]'
                  }
                `} />
                {isActive && (
                  <div
                    className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-10 bg-black rounded-r-full shadow-sm"
                    style={{ animation: 'fadeIn 0.3s ease-in-out' }}
                  ></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <main className="reveal pb-20 px-6 lg:px-12 relative z-10">
        <div className="max-w-[1400px] mx-auto space-y-8 md:space-y-16">

          {/* 1. Éditeur du site */}
          <section id="section-1" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 1</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">ÉDITEUR DU SITE</h2>
              </div>
            </div>
            <div className="space-y-2 text-[#64748B] text-[14px] sm:text-base leading-relaxed px-0 sm:px-4 md:pl-16 text-left max-w-[95%] sm:max-w-full mx-auto">
              <p><strong className="text-[#1A1A1A]">Nom commercial :</strong> GND Consulting</p>
              <p><strong className="text-[#1A1A1A]">Forme juridique :</strong> Entrepreneur Individuel (EI) – Auto-entrepreneur</p>
              <p><strong className="text-[#1A1A1A]">SIREN :</strong> 939 676 136</p>
              <p><strong className="text-[#1A1A1A]">SIRET :</strong> 939 676 136 00012</p>
              <p><strong className="text-[#1A1A1A]">Code APE / NAF :</strong> 5911A – Production de films et de programmes pour la télévision</p>
              <p><strong className="text-[#1A1A1A]">Immatriculation :</strong> Répertoire des Métiers (RM)</p>
              <p><strong className="text-[#1A1A1A]">Date d'immatriculation :</strong> 15 janvier 2025</p>
              <p><strong className="text-[#1A1A1A]">Capital social :</strong> Non applicable (entreprise individuelle)</p>
              <p><strong className="text-[#1A1A1A]">TVA :</strong> Franchise en base de TVA – article 293 B du CGI (TVA non applicable)</p>
              <p><strong className="text-[#1A1A1A]">Siège social :</strong> Paris, France</p>
            </div>
            <div className="mt-6 sm:mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 2. Responsabilité éditoriale */}
          <section id="section-2" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 2</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">RESPONSABILITÉ ÉDITORIALE</h2>
              </div>
            </div>
            <div className="space-y-1.5 sm:space-y-2 text-[#64748B] text-[13.5px] sm:text-base leading-snug sm:leading-relaxed px-0 sm:px-4 md:pl-16 text-left max-w-[95%] sm:max-w-full mx-auto">
              <p><strong className="text-[#1A1A1A]">Directeur de la publication :</strong> Pierre Roodny</p>
              <p><strong className="text-[#1A1A1A]">Responsable éditorial :</strong> Pierre Roodny</p>
              <p><strong className="text-[#1A1A1A]">Délégué à la protection des données (DPO) :</strong> Pierre Roodny</p>
            </div>
            <div className="mt-6 sm:mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 3. Contact */}
          <section id="section-3" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 3</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">CONTACT</h2>
              </div>
            </div>
            <div className="flex flex-col space-y-4 text-[#64748B] px-0 sm:px-4 md:pl-16 max-w-[95%] sm:max-w-full mx-auto">
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <span className="text-[13px] text-[#64748B] block">Email</span>
                  <a href="mailto:contact@gndconsulting.fr" className="block text-[14px] text-primary hover:underline font-medium transition-colors">
                    contact@gndconsulting.fr
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border-t border-gray-200 mt-3 pt-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <span className="text-[13px] text-[#64748B] block">Téléphone</span>
                  <a href="tel:+33759506322" className="block text-[14px] text-primary hover:underline font-medium transition-colors">
                    07 59 50 63 22
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 4. Hébergement */}
          <section id="section-4" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 4</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">HÉBERGEMENT DU SITE</h2>
              </div>
            </div>
            <div className="space-y-2 text-[#64748B] text-[14px] sm:text-base leading-relaxed px-0 sm:px-4 md:pl-16 text-left max-w-[95%] sm:max-w-full mx-auto py-4">
              <p><strong className="text-[#1A1A1A]">Hébergeur :</strong> Hostinger International Ltd.</p>
              <p><strong className="text-[#1A1A1A]">Adresse :</strong> Jonavos g. 60C, 44192 Kaunas, Lituanie</p>
              <p>
                <strong className="text-[#1A1A1A]">Site web officiel : </strong>
                <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" className="text-[13px] sm:text-base text-[#3B82F6] hover:underline transition-colors">
                  https://www.hostinger.fr
                </a>
              </p>
            </div>
            <div className="mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 5. Propriété intellectuelle */}
          <section id="section-5" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 5</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">PROPRIÉTÉ INTELLECTUELLE</h2>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-5 text-[#1A1A1A] text-[14px] sm:text-base leading-snug sm:leading-relaxed px-4 text-justify tracking-tight max-w-[95%] sm:max-w-full mx-auto md:pl-12 md:max-w-none">
              <p>
                L'ensemble du contenu présent sur ce site web (textes, visuels, photographies, vidéos, logos, graphismes, éléments sonores, bases de données, etc.)
                est la propriété exclusive de <strong className="text-[#1A1A1A]">GND Consulting</strong>, sauf mention contraire explicite.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site,
                quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l'autorisation écrite préalable de GND Consulting.
              </p>
              <p>
                Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon
                et poursuivie conformément aux dispositions des articles <strong className="text-[#1A1A1A]">L.335-2 et suivants du Code de la propriété intellectuelle</strong>.
              </p>
              <p>
                Les marques et logos présents sur le site sont déposés par GND Consulting ou éventuellement par ses partenaires.
                Toute reproduction totale ou partielle de ces marques ou logos effectuée à partir des éléments du site sans l'autorisation expresse de GND Consulting est prohibée.
              </p>
            </div>
            <div className="mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 6. Protection des données personnelles - RGPD */}
          <section id="section-6" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 6</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">PROTECTION DES DONNÉES PERSONNELLES (RGPD)</h2>
              </div>
            </div>
            <div className="space-y-6 text-[#64748B] px-4 sm:px-4 md:pl-16 max-w-[95%] sm:max-w-full mx-auto md:max-w-none">
              <p className="text-[13.5px] sm:text-base leading-relaxed">
                Conformément au <strong className="text-[#1A1A1A]">Règlement Général sur la Protection des Données (RGPD – UE 2016/679)</strong> et à la
                <strong className="text-[#1A1A1A]"> loi Informatique et Libertés du 6 janvier 1978 modifiée</strong>, vous disposez de droits sur vos données personnelles.
              </p>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-xl mt-6 mb-2">6.1 Responsable du traitement</h3>
                <p className="text-[14px] sm:text-base"><strong className="text-[#1A1A1A]">GND Consulting</strong> – Pierre Roodny</p>
                <p className="text-[13px] sm:text-base">Email DPO : <a href="mailto:contact@gndconsulting.fr" className="text-[#3B82F6] hover:underline">contact@gndconsulting.fr</a></p>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-xl mt-6 mb-2">6.2 Données collectées</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">Nous sommes susceptibles de collecter les données personnelles suivantes :</p>
                <ul className="list-disc pl-5 space-y-1 text-[13.5px] sm:text-base leading-snug text-[#1A1A1A]">
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Nom de l'entreprise (le cas échéant)</li>
                  <li>Données de navigation (cookies, adresse IP, pages visitées)</li>
                  <li>Toute autre information fournie via le formulaire de contact</li>
                </ul>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-xl mt-6 mb-2">6.3 Finalités du traitement</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">Les données personnelles sont collectées et traitées pour les finalités suivantes :</p>
                <ul className="list-disc pl-5 space-y-1 text-[13.5px] sm:text-base leading-snug text-[#1A1A1A]">
                  <li>Gestion de la relation client</li>
                  <li>Réponse aux demandes de contact et de devis</li>
                  <li>Amélioration de nos services et de l'expérience utilisateur</li>
                  <li>Envoi d'informations relatives à nos prestations (avec consentement préalable)</li>
                  <li>Respect des obligations légales et comptables</li>
                </ul>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-xl mt-6 mb-2">6.4 Base légale des traitements</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">Les traitements de données personnelles reposent sur les bases légales suivantes (RGPD Art. 6) :</p>
                <ul className="list-disc pl-5 space-y-1 text-[13.5px] sm:text-base leading-snug text-[#1A1A1A]">
                  <li><strong className="text-[#1A1A1A]">Article 6.1.a :</strong> Consentement de la personne concernée</li>
                  <li><strong className="text-[#1A1A1A]">Article 6.1.b :</strong> Exécution d'un contrat ou de mesures précontractuelles</li>
                  <li><strong className="text-[#1A1A1A]">Article 6.1.c :</strong> Respect d'une obligation légale</li>
                  <li><strong className="text-[#1A1A1A]">Article 6.1.f :</strong> Intérêt légitime poursuivi par le responsable du traitement</li>
                </ul>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-xl mt-6 mb-2">6.5 Destinataires des données</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">
                  Vos données personnelles sont destinées exclusivement à <strong className="text-[#1A1A1A]">GND Consulting</strong>.
                  Elles ne sont en aucun cas revendues, louées ou cédées à des tiers sans votre consentement explicite.
                </p>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-xl mt-6 mb-2">6.6 Durée de conservation</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">Les données personnelles sont conservées pendant les durées suivantes :</p>
                <ul className="list-disc pl-5 space-y-1 text-[13.5px] sm:text-base leading-snug text-[#1A1A1A]">
                  <li>Prospects non-clients : <strong className="text-[#1A1A1A]">3 ans</strong> maximum à compter du dernier contact</li>
                  <li>Clients : pendant la durée contractuelle + <strong className="text-[#1A1A1A]">5 ans</strong> (prescription commerciale)</li>
                  <li>Données comptables : <strong className="text-[#1A1A1A]">10 ans</strong> (obligation légale)</li>
                  <li>Données de navigation : <strong className="text-[#1A1A1A]">13 mois</strong> maximum</li>
                </ul>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-xl mt-6 mb-2">6.7 Vos droits</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-5 space-y-1 text-[13.5px] sm:text-base leading-snug text-[#1A1A1A]">
                  <li><strong className="text-[#1A1A1A]">Droit d'accès</strong> : obtenir la confirmation que vos données sont traitées et y accéder</li>
                  <li><strong className="text-[#1A1A1A]">Droit de rectification</strong> : corriger vos données inexactes ou incomplètes</li>
                  <li><strong className="text-[#1A1A1A]">Droit à l'effacement</strong> ("droit à l'oubli") : supprimer vos données personnelles</li>
                  <li><strong className="text-[#1A1A1A]">Droit à la limitation</strong> : limiter le traitement de vos données</li>
                  <li><strong className="text-[#1A1A1A]">Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                  <li><strong className="text-[#1A1A1A]">Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                  <li><strong className="text-[#1A1A1A]">Droit de retirer votre consentement</strong> à tout moment</li>
                </ul>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-xl mt-6 mb-2">6.8 Exercer vos droits</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">
                  Pour exercer l'un de ces droits, contactez-nous par email à :
                  <a href="mailto:contact@gndconsulting.fr" className="text-[#3B82F6] hover:underline ml-1">contact@gndconsulting.fr</a>
                </p>
                <p className="text-[13.5px] sm:text-base leading-relaxed">
                  Vous disposez également du droit d'introduire une réclamation auprès de la <strong className="text-[#1A1A1A]">CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) :
                </p>
                <div className="space-y-1 mt-3 p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <p className="font-medium text-[#1A1A1A] text-[13px] sm:text-base">CNIL – 3 Place de Fontenoy, TSA 80715 – 75334 Paris Cedex 07</p>
                  <p className="text-[13px] sm:text-base">Téléphone : 01 53 73 22 22</p>
                  <p className="text-[13px] sm:text-base">Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:underline">www.cnil.fr</a></p>
                </div>
              </div>
            </div>
            <div className="mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 7. Cookies */}
          <section id="section-7" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 7</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">POLITIQUE DE COOKIES</h2>
              </div>
            </div>
            <div className="space-y-6 text-[#64748B] px-4 sm:px-4 md:pl-16 max-w-[95%] sm:max-w-full mx-auto md:max-w-none">
              <p className="text-[13.5px] sm:text-base leading-relaxed">
                Conformément à la <strong className="text-[#1A1A1A]">délibération CNIL n° 2020-091 du 17 septembre 2020</strong>, ce site est susceptible d'utiliser des cookies
                pour améliorer l'expérience utilisateur et analyser le trafic.
              </p>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-lg mt-4">7.1 Qu'est-ce qu'un cookie ?</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">
                  Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors de la visite d'un site web.
                  Il permet de collecter des informations relatives à votre navigation.
                </p>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-lg mt-4">7.2 Types de cookies utilisés</h3>
                <ul className="space-y-3 text-[13.5px] sm:text-base">
                  <li className="flex gap-3">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <strong className="text-[#1A1A1A]">Cookies essentiels :</strong> nécessaires au fonctionnement du site (navigation, sécurité).
                      Ils ne nécessitent pas de consentement préalable.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <strong className="text-[#1A1A1A]">Cookies de préférences :</strong> mémorisent vos choix (langue, région, paramètres d'affichage).
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <strong className="text-[#1A1A1A]">Cookies de mesure d'audience :</strong> collectent des statistiques anonymisées sur la fréquentation du site
                      (ex : outil d'analyse type Matomo, Google Analytics configuré en mode anonyme).
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <strong className="text-[#1A1A1A]">Cookies de fonctionnalités tierces :</strong> provenant de services externes (vidéos, cartes interactives, etc.).
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-lg mt-4">7.3 Gestion des cookies</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">
                  Vous pouvez à tout moment gérer vos préférences en matière de cookies via :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[13.5px] sm:text-base leading-snug text-[#1A1A1A]">
                  <li>La bannière de consentement qui s'affiche lors de votre première visite</li>
                  <li>Les paramètres de votre navigateur (Chrome, Firefox, Safari, Edge, etc.)</li>
                </ul>
                <p className="text-[13.5px] sm:text-base leading-relaxed">
                  Le refus de cookies peut entraîner une limitation de certaines fonctionnalités du site.
                </p>
              </div>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-lg mt-4">7.4 Durée de validité du consentement</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">
                  Conformément aux recommandations de la CNIL, votre choix concernant les cookies est conservé pour une durée maximale de <strong className="text-[#1A1A1A]">6 mois</strong>.
                  Au-delà, un nouveau consentement vous sera demandé.
                </p>
              </div>
            </div>
            <div className="mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 8. Intelligence Artificielle - AI Act */}
          <section id="section-8" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <Brain className="w-5 h-5 text-[#1A1A1A]" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 8</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">UTILISATION DE L'INTELLIGENCE ARTIFICIELLE</h2>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 mx-auto max-w-[95%] sm:max-w-full">
              <div className="space-y-6 text-[#64748B]">
                <p className="text-[13.5px] sm:text-base leading-relaxed">
                  GND Consulting intègre dans ses processus créatifs et opérationnels des outils d'<strong className="text-[#1A1A1A]">intelligence artificielle (IA)</strong>
                  pour optimiser certaines prestations (automatisation, génération de visuels, traitement de données, analyse, amélioration de contenus, etc.).
                </p>

                <div className="space-y-3 bg-white rounded-2xl p-4 sm:p-6">
                  <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-lg mt-4">8.1 Engagement éthique et responsable</h3>
                  <p className="text-[13.5px] sm:text-base leading-relaxed">Nous nous engageons à :</p>
                  <ul className="list-disc pl-5 space-y-1 text-[13.5px] sm:text-base leading-snug text-[#1A1A1A]">
                    <li>Utiliser l'IA de manière éthique, transparente et sécurisée</li>
                    <li>Respecter la confidentialité et la vie privée de nos clients</li>
                    <li>Garantir un usage conforme au <strong className="text-[#1A1A1A]">RGPD</strong> et à l'<strong className="text-[#1A1A1A]">AI Act européen</strong> (Règlement UE 2024/1689 entré en vigueur en août 2024)</li>
                    <li>Informer clairement nos clients lorsque l'IA est utilisée dans le cadre de nos prestations</li>
                  </ul>
                </div>

                <div className="space-y-3 bg-white rounded-2xl p-4 sm:p-6">
                  <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-lg mt-4">8.2 Protection des données</h3>
                  <p className="text-[13.5px] sm:text-base leading-relaxed">
                    Aucune donnée personnelle ou confidentielle de nos clients n'est utilisée pour entraîner des modèles d'IA tiers sans consentement explicite.
                    Les données traitées via des systèmes d'IA le sont dans le respect strict des normes de sécurité et de confidentialité.
                  </p>
                </div>

                <div className="space-y-3 bg-white rounded-2xl p-4 sm:p-6">
                  <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-lg mt-4">8.3 Transparence</h3>
                  <p className="text-[13.5px] sm:text-base leading-relaxed">
                    Lorsqu'un contenu, un visuel ou un processus a été généré ou assisté par une intelligence artificielle,
                    GND Consulting s'efforce de le mentionner de manière transparente auprès de ses clients.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 9. Limitation de responsabilité */}
          <section id="section-9" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 9</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">LIMITATION DE RESPONSABILITÉ</h2>
              </div>
            </div>
            <div className="space-y-4 text-[#64748B] px-4 sm:px-4 md:pl-16 max-w-[95%] sm:max-w-full mx-auto md:max-w-none">
              <p className="text-[13.5px] sm:text-base leading-relaxed">
                GND Consulting s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site.
                Toutefois, <strong className="text-[#1A1A1A]">GND Consulting ne saurait être tenu responsable</strong> :
              </p>
              <ul className="space-y-3 text-[13.5px] sm:text-base">
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Des erreurs, inexactitudes ou omissions présentes sur le site</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Des interruptions temporaires du site pour maintenance ou mises à jour techniques</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Des dommages directs ou indirects résultant de l'utilisation du site</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Des contenus présents sur les sites tiers accessibles via des liens hypertextes depuis notre site</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>De tout préjudice causé par un usage malveillant du site par un tiers</span>
                </li>
              </ul>
              <p className="text-[13.5px] sm:text-base leading-relaxed">
                Le contenu du site est fourni à titre informatif et ne constitue en aucun cas une offre contractuelle.
                GND Consulting se réserve le droit de modifier ou corriger le contenu du site à tout moment sans préavis.
              </p>
            </div>
            <div className="mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 10. Droit applicable et litiges */}
          <section id="section-10" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <Gavel className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 10</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">DROIT APPLICABLE ET RÈGLEMENT DES LITIGES</h2>
              </div>
            </div>
            <div className="space-y-6 text-[#64748B] px-4 sm:px-4 md:pl-16 max-w-[95%] sm:max-w-full mx-auto md:max-w-none">
              <p className="text-[13.5px] sm:text-base leading-relaxed">
                Les présentes mentions légales sont régies par le <strong className="text-[#1A1A1A]">droit français</strong>.
                En cas de litige, les <strong className="text-[#1A1A1A]">tribunaux français</strong> seront seuls compétents.
              </p>

              <div className="space-y-3 bg-gray-50 rounded-2xl p-4 sm:p-6">
                <h3 className="font-display font-semibold text-[#1A1A1A] text-[15px] sm:text-lg mt-4">10.1 Médiation à la consommation</h3>
                <p className="text-[13.5px] sm:text-base leading-relaxed">
                  Conformément à l'article L.612-1 du Code de la consommation, GND Consulting informe ses clients qu'en cas de litige,
                  ils peuvent recourir à une procédure de médiation conventionnelle ou à tout autre mode alternatif de règlement des différends.
                </p>
                <p className="text-[13.5px] sm:text-base leading-relaxed">
                  <strong className="text-[#1A1A1A]">Aucun médiateur spécifique n'est actuellement désigné.</strong> Toutefois, vous pouvez soumettre votre litige à la plateforme de règlement en ligne des litiges de l'Union Européenne :
                </p>
                <p className="mt-3 p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[13px] sm:text-base text-[#3B82F6] hover:underline font-medium break-all">
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 11. Évolution des mentions légales */}
          <section id="section-11" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 11</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">ÉVOLUTION DES MENTIONS LÉGALES</h2>
              </div>
            </div>
            <div className="space-y-3 text-[#64748B] px-4 sm:px-4 md:pl-16 max-w-[95%] sm:max-w-full mx-auto md:max-w-none">
              <p className="text-[14px] sm:text-base leading-snug sm:leading-relaxed">
                GND Consulting se réserve le droit de modifier les présentes mentions légales à tout moment, notamment pour les adapter
                aux évolutions législatives, réglementaires, jurisprudentielles et techniques.
              </p>
              <p className="text-[14px] sm:text-base leading-snug sm:leading-relaxed">
                Il est recommandé de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
              </p>
            </div>
            <div className="mt-8 h-px bg-gray-200"></div>
          </section>

          {/* 12. Crédits */}
          <section id="section-12" className="scroll-mt-40 animate-fade-in border-t border-gray-200 pt-6 mt-8">
            <div className="flex flex-col items-start gap-2 mb-4 sm:mb-6 px-0 sm:px-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-xl flex-shrink-0 mb-2 mx-auto sm:mx-0">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="text-center sm:text-left w-full">
                <span className="text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider block">Article 12</span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mt-1">CRÉDITS</h2>
              </div>
            </div>
            <div className="space-y-2 text-[#64748B] text-[14px] sm:text-base leading-relaxed px-4 sm:px-4 md:pl-16 max-w-[95%] sm:max-w-full mx-auto md:max-w-none">
              <p><strong className="text-[#1A1A1A]">Conception et design :</strong> GND Consulting</p>
              <p><strong className="text-[#1A1A1A]">Développement web :</strong> GND Consulting</p>
              <p><strong className="text-[#1A1A1A]">Réalisation :</strong> Pierre Roodny</p>
              <p><strong className="text-[#1A1A1A]">Hébergement :</strong> Hostinger International Ltd.</p>
            </div>
          </section>

          {/* Note de mise à jour */}
          <section className="pt-12 pb-6 border-t border-gray-200">
            <p className="text-[13px] sm:text-sm text-[#64748B] italic text-center px-4">
              Dernière mise à jour : octobre 2025
            </p>
          </section>

        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
