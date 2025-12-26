import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface UnifiedFAQProps {
  title?: string;
  subtitle?: string;
  description?: string;
  emoji?: string;
  faqItems: FAQItem[];
  themeColor?: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  ctaText?: string;
  ctaLink?: string;
}

export function UnifiedFAQ({
  title = 'QUESTIONS FRÉQUENTES',
  subtitle,
  description,
  emoji = '❓',
  faqItems,
  themeColor,
  ctaText = 'Démarrer mon projet',
  ctaLink = '#contact-form'
}: UnifiedFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const defaultTheme = {
    primary: '#ec4899',
    secondary: '#f472b6',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
  };

  const theme = themeColor || defaultTheme;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector(ctaLink);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="py-24 px-6 bg-white relative overflow-hidden faq-section-unified" style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 30%, #f0f9ff 70%, #fef7f7 100%)'
    }}>
      <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-blue-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20 relative z-10 faq-header-unified">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 faq-icon-wrapper"
              style={{ background: theme.gradient }}
            >
              <span className="text-3xl">{emoji}</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight faq-title-unified">
            {title}
          </h2>

          {subtitle && (
            <p className="text-lg text-slate-600 font-light italic mb-4 max-w-3xl mx-auto leading-relaxed faq-subtitle-unified">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="text-base text-slate-700 font-medium max-w-2xl mx-auto faq-description-unified">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-6 relative z-10 faq-items-container">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="group relative faq-item"
              >
                <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" style={{ background: `${theme.gradient}20` }}></div>

                <div className="relative glass rounded-2xl border border-slate-200/60 hover:border-primary/40 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                  <div className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: theme.gradient }}></div>

                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 md:p-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 transition-all duration-500 group/button focus:outline-none focus:ring-2"
                    style={{ '--focus-ring-color': theme.primary } as React.CSSProperties}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 md:gap-6 flex-1 pr-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border group-hover/button:scale-110 group-hover/button:rotate-6 transition-all duration-300 shadow-md flex-shrink-0"
                        style={{
                          background: `${theme.primary}20`,
                          borderColor: `${theme.primary}30`
                        }}
                      >
                        <span className="text-xl">{emoji}</span>
                      </div>

                      <h3 className="text-base md:text-lg font-bold text-slate-900 group-hover/button:transition-colors duration-300" style={{ '--hover-color': theme.primary } as React.CSSProperties}>
                        {item.question}
                      </h3>
                    </div>

                    <div className="flex-shrink-0 ml-2">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{ background: `${theme.primary}10` }}
                      >
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 group-hover/button:scale-110 transition-transform duration-300" style={{ color: theme.primary }} />
                        ) : (
                          <ChevronDown className="w-5 h-5 group-hover/button:scale-110 transition-transform duration-300" style={{ color: theme.primary }} />
                        )}
                      </div>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-slate-200/50">
                      <div className="pt-6 relative">
                        <div className="absolute top-0 left-0 w-16 h-0.5 rounded-full" style={{ background: theme.gradient }}></div>
                        <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 relative z-10 faq-cta-container">
          <div className="relative group">
            <div className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" style={{ background: `${theme.gradient}30` }}></div>

            <div className="relative glass rounded-3xl p-8 border shadow-xl hover:shadow-2xl transition-all duration-500" style={{ borderColor: `${theme.primary}30` }}>
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: theme.gradient }}></div>

              <p className="text-base md:text-lg mb-6 text-slate-700 font-medium">
                Une autre question ? N'hésitez pas à nous contacter !
              </p>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-3 px-8 py-4 text-white font-bold rounded-full transition-all duration-500 hover:scale-105 uppercase tracking-wider shadow-lg group/cta focus:outline-none focus:ring-4"
                style={{
                  background: theme.gradient,
                  boxShadow: `0 10px 30px ${theme.primary}40`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 15px 40px ${theme.primary}66`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 10px 30px ${theme.primary}40`;
                }}
              >
                <MessageCircle className="w-5 h-5 group-hover/cta:rotate-12 transition-transform duration-300" />
                <span className="text-sm md:text-base">{ctaText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .faq-section-unified {
            padding: 2rem 1rem !important;
          }

          .faq-header-unified {
            margin-bottom: 2rem !important;
          }

          .faq-title-unified {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }

          .faq-subtitle-unified {
            font-size: 0.875rem !important;
            margin-bottom: 0.75rem !important;
          }

          .faq-description-unified {
            font-size: 0.875rem !important;
          }

          .faq-icon-wrapper {
            width: 3rem !important;
            height: 3rem !important;
          }

          .faq-icon-wrapper span {
            font-size: 1.5rem !important;
          }

          .faq-items-container {
            gap: 1rem !important;
          }

          .faq-item button {
            padding: 1rem !important;
          }

          .faq-item h3 {
            font-size: 0.875rem !important;
          }

          .faq-item p {
            font-size: 0.8125rem !important;
          }

          .faq-cta-container {
            margin-top: 2rem !important;
          }

          .faq-cta-container > div > div {
            padding: 1.5rem !important;
          }

          .faq-cta-container button {
            padding: 0.875rem 1.5rem !important;
            font-size: 0.8125rem !important;
          }
        }

        @media (max-width: 640px) {
          .faq-section-unified {
            padding: 1.5rem 0.75rem !important;
          }

          .faq-title-unified {
            font-size: 1.25rem !important;
          }

          .faq-item button {
            padding: 0.875rem !important;
          }

          .faq-item .w-12 {
            width: 2.5rem !important;
            height: 2.5rem !important;
          }

          .faq-item .text-xl {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
