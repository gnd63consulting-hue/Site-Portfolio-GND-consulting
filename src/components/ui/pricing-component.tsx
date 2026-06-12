/* PricingCards — 21st.dev pricing layout adapté charte GND (cream + walnut + orange) */
import { Calendar, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PricingPlan {
  id: string;
  name: string;
  from: string; // "800", "1 500", "2 500"
  ideal: string;
  features: readonly string[];
  featured?: boolean;
  badge?: string;
}

interface PricingCardsProps {
  plans: readonly PricingPlan[];
  ctaLabel?: string;
  ctaHref?: string;
}

// Check icon orange on cream cards
const LightCheckIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="8" fill="#FF954F" />
    <path
      d="M5.5 8.5L7 10L11 6"
      stroke="#2A1810"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Check icon cream-outlined on walnut featured card
const DarkCheckIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="7.5" stroke="#FF954F" strokeWidth="1.2" />
    <path
      d="M5.5 8.5L7 10L11 6"
      stroke="#FF954F"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function PricingCards({
  plans,
  ctaLabel = 'Demander un devis',
  ctaHref = '/contact',
}: PricingCardsProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1280px] mx-auto">
        {plans.map((p) => {
          const isFeatured = !!p.featured;
          return (
            <div
              key={p.id}
              className={cn(
                'rounded-3xl p-2 flex flex-col',
                isFeatured
                  ? 'bg-text-strong/95 backdrop-blur-md border border-text-strong shadow-[0_12px_50px_-15px_rgba(42,24,16,0.5)] ring-1 ring-inset ring-accent/30'
                  : 'bg-bg/85 backdrop-blur-md border border-text-strong/10 shadow-[0_12px_40px_-15px_rgba(42,24,16,0.15)] ring-1 ring-inset ring-bg/40',
              )}
            >
              {/* Inner card — header + price + CTA */}
              <div
                className={cn(
                  'rounded-2xl p-7 md:p-8 mb-2',
                  isFeatured
                    ? 'bg-text-strong/80 backdrop-blur-sm border border-text-strong/40 ring-1 ring-inset ring-accent/20'
                    : 'bg-bg-alt/90 backdrop-blur-sm border border-text-strong/8 ring-1 ring-inset ring-text-strong/5',
                )}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div
                      className={cn(
                        'label-mono text-[10px] tracking-[0.22em] mb-2',
                        isFeatured ? 'text-bg/60' : 'text-text-muted',
                      )}
                    >
                      {p.ideal}
                    </div>
                    <h3
                      className={cn(
                        'display text-2xl md:text-3xl leading-tight',
                        isFeatured ? 'text-bg' : 'text-text-strong',
                      )}
                    >
                      {p.name}
                    </h3>
                  </div>
                  {p.badge && (
                    <span
                      className={cn(
                        'shrink-0 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur',
                        isFeatured
                          ? 'bg-accent text-text-strong border border-accent'
                          : 'border border-text-strong/15 bg-bg/70 text-text-strong',
                      )}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>

                <div
                  className={cn(
                    'label-mono text-[10px] tracking-[0.22em] mb-1',
                    isFeatured ? 'text-bg/55' : 'text-text-muted',
                  )}
                >
                  À PARTIR DE
                </div>
                <div className="flex items-baseline mb-7">
                  <span
                    className={cn(
                      'num-display text-5xl md:text-6xl font-bold tracking-tighter',
                      isFeatured ? 'text-bg' : 'text-text-strong',
                    )}
                  >
                    {p.from}
                  </span>
                  <span
                    className={cn(
                      'display text-2xl md:text-3xl ml-1',
                      isFeatured ? 'text-accent' : 'text-accent-deep',
                    )}
                  >
                    €
                  </span>
                </div>

                <a
                  href={ctaHref}
                  className={cn(
                    'w-full rounded-xl font-semibold text-sm md:text-base py-3.5',
                    'flex items-center justify-center gap-2.5',
                    'transition-opacity duration-200 hover:opacity-90',
                    isFeatured
                      ? 'bg-accent text-text-strong shadow-[0_4px_18px_-6px_rgba(255,149,79,0.6)] ring-1 ring-inset ring-accent/30'
                      : 'bg-text-strong text-bg shadow-[0_4px_18px_-6px_rgba(42,24,16,0.4)] ring-1 ring-inset ring-text-strong/10',
                  )}
                >
                  {ctaLabel}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Features list */}
              <div
                className={cn(
                  'px-5 md:px-6 pb-6 pt-5 rounded-2xl flex-1',
                  isFeatured
                    ? 'bg-text-strong/55 backdrop-blur-sm border border-text-strong/40 ring-1 ring-inset ring-accent/15'
                    : 'bg-bg/55 backdrop-blur-sm border border-text-strong/8 ring-1 ring-inset ring-bg/30',
                )}
              >
                <ul className="grid grid-cols-1 gap-y-3">
                  {p.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      {isFeatured ? (
                        <DarkCheckIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      ) : (
                        <LightCheckIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={cn(
                          'text-sm leading-snug',
                          isFeatured ? 'text-bg/85' : 'text-text font-medium',
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PricingCards;
