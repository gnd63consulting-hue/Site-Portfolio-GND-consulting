import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

interface FAQProps {
  headingOverride?: string;
  containerClassName?: string;
}

export function FAQ({ headingOverride, containerClassName = '' }: FAQProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      question: "Proposez-vous des services d'automatisation ou d'IA ?",
      answer: "Oui. GND Consulting intègre des solutions sur-mesure pour automatiser certaines tâches de votre workflow : Préparation et publication automatisée de contenus, Déclinaisons multi-formats \"Reels, TikTok, Shorts…\", Génération assistée de visuels, Automatisation CRM, e-mailing ou formulaires. Nous vous accompagnons dans l'intégration de solutions simples, sans complexité technique."
    },
    {
      question: "Comment savoir si votre offre est adaptée à mon budget ?",
      answer: "Nous avons plusieurs formules accessibles \"Starter, Standard, Premium\", et proposons également des devis sur-mesure. Le mieux reste de nous contacter avec un aperçu de votre besoin."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={containerClassName}>
      <section id="faq" className="py-32 px-6 lg:px-12 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <span className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest text-text-muted mb-6">
              FAQ
            </span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-main mb-6 tracking-tight">
              {headingOverride ?? "Questions fréquentes"}
            </h2>

            <p className="text-base text-text-muted font-medium max-w-2xl mx-auto">
              Tarifs, délais, méthode de travail : trouvez rapidement les réponses à vos questions sur nos services créatifs
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-4 relative z-10">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-6 md:p-8 text-left flex items-center justify-between transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black/10 rounded-2xl"
                      aria-expanded={isOpen}
                    >
                      <h3 className="font-display text-base md:text-lg font-semibold text-text-main pr-4">
                        {item.question}
                      </h3>

                      <div className="flex-shrink-0 ml-2">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300">
                          <ChevronDown
                            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-gray-100">
                        <p className="pt-6 text-sm md:text-base text-text-muted leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 relative z-10">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <p className="text-base md:text-lg mb-6 text-text-muted font-medium">
                Une autre question ? N'hésitez pas à nous contacter !
              </p>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 font-display"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Démarrer mon projet</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
