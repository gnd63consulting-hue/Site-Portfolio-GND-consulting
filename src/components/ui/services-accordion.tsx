/* ServicesAccordion — horizontal expandable cards (21st.dev "impact-section" pattern).
 *
 * Adapted for GND palette + Vite:
 *   - Removed `next/image` (uses regular <img>)
 *   - Removed Unsplash placeholder images (services are abstract, not case studies)
 *   - Palette: warm cream + chocolat + accent orange
 *   - Cards expand on hover/focus/click (open one at a time, mutual exclusion)
 */
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export type ServiceItem = {
  n: string;       // ex: "01"
  t: string;       // titre service
  d: string;       // description longue (montrée à l'expand)
  /** Palette de la tuile fermée. 'cream' par défaut. */
  variant?: 'cream' | 'chocolat' | 'accent';
};

export type ServicesAccordionProps = {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  items: ServiceItem[];
  /** Index de la card ouverte par défaut. 0 par défaut. */
  defaultOpenIndex?: number;
  className?: string;
};

const variantStyles: Record<
  NonNullable<ServiceItem['variant']>,
  { bg: string; text: string; textMuted: string; accentText: string; border: string }
> = {
  cream: {
    bg: 'bg-bg-alt',
    text: 'text-text-strong',
    textMuted: 'text-text-muted',
    accentText: 'text-accent',
    border: 'border-text-strong/10',
  },
  chocolat: {
    bg: 'bg-text-strong',
    text: 'text-bg',
    textMuted: 'text-bg/65',
    accentText: 'text-accent',
    border: 'border-bg/15',
  },
  accent: {
    bg: 'bg-accent',
    text: 'text-text-strong',
    textMuted: 'text-text-strong/75',
    accentText: 'text-text-strong',
    border: 'border-text-strong/15',
  },
};

export function ServicesAccordion({
  kicker,
  title,
  intro,
  items,
  defaultOpenIndex = 0,
  className,
}: ServicesAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState(defaultOpenIndex);
  const safeOpenIndex = Math.min(Math.max(openIndex, 0), items.length - 1);

  return (
    <section
      className={
        'w-full bg-bg-alt py-20 md:py-28 ' + (className ?? '')
      }
    >
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10 md:mb-14">
          <div className="max-w-[640px]">
            {kicker && (
              <p className="label-mono text-[11px] tracking-[0.22em] uppercase text-text-muted mb-5">
                — {kicker}
              </p>
            )}
            <h2 className="display text-4xl md:text-5xl lg:text-6xl leading-[1.04] text-text-strong">
              {title}
            </h2>
          </div>

          {intro && (
            <p className="text-base md:text-lg text-text leading-relaxed max-w-xl lg:max-w-2xl md:text-right md:mt-40 lg:mt-48">
              {intro}
            </p>
          )}
        </div>

        {/* Horizontal accordion */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-0">
          {items.map((item, idx) => {
            const isOpen = safeOpenIndex === idx;
            const variant = item.variant ?? 'cream';
            const styles = variantStyles[variant];

            return (
              <motion.div
                key={item.n}
                onMouseEnter={() => setOpenIndex(idx)}
                onFocus={() => setOpenIndex(idx)}
                onClick={() => setOpenIndex(idx)}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                aria-label={`${item.n} ${item.t}`}
                animate={{ flex: isOpen ? 4.8 : 1.5 }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                className={
                  `${styles.bg} ${styles.text} relative overflow-hidden border ${styles.border} ` +
                  'h-[320px] md:h-[460px] cursor-pointer outline-none ' +
                  'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-alt ' +
                  'first:rounded-l-2xl last:rounded-r-2xl md:rounded-none ' +
                  (idx === 0 ? 'md:rounded-l-2xl ' : '') +
                  (idx === items.length - 1 ? 'md:rounded-r-2xl' : '')
                }
              >
                {isOpen ? (
                  /* Expanded state */
                  <div className="h-full p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`num-display text-5xl md:text-6xl ${styles.accentText} leading-none`}
                        >
                          {item.n}
                        </span>
                        <span className={styles.textMuted}>
                          <ArrowUpRight size={18} />
                        </span>
                      </div>
                      <h3
                        className={`display text-2xl md:text-3xl mt-6 leading-tight ${styles.text}`}
                      >
                        {item.t}
                      </h3>
                    </div>
                    <p
                      className={`text-sm md:text-base leading-relaxed mt-6 ${styles.textMuted}`}
                    >
                      {item.d}
                    </p>
                  </div>
                ) : (
                  /* Collapsed state */
                  <div className="h-full p-5 sm:p-6 md:p-7 flex flex-col justify-between">
                    <span className={styles.textMuted}>
                      <ArrowUpRight size={14} />
                    </span>
                    <div>
                      <span
                        className={`num-display text-4xl md:text-5xl ${styles.accentText} leading-none`}
                      >
                        {item.n}
                      </span>
                      <p
                        className={`mt-3 text-[12px] tracking-[0.12em] uppercase font-medium max-w-[160px] leading-tight ${styles.text}`}
                      >
                        {item.t}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
