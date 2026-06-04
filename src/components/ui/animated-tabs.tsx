/* AnimatedTabs — tabs avec indicator pill animé + crossfade content
 * Adapté charte GND (cream / chocolate / accent orange).
 * Anim originale framer-motion conservée 100% (layoutId + spring + blur+scale entry).
 */
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type AnimatedTab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type AnimatedTabsProps = {
  tabs: AnimatedTab[];
  defaultTab?: string;
  className?: string;
  /** 'dark' = pour sections chocolate ; 'light' = pour sections cream */
  variant?: 'dark' | 'light';
};

export function AnimatedTabs({
  tabs,
  defaultTab,
  className,
  variant = 'dark',
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = React.useState<string>(
    defaultTab || tabs[0]?.id
  );

  if (!tabs?.length) return null;

  const isDark = variant === 'dark';

  return (
    <div className={cn('w-full flex flex-col gap-y-2', className)}>
      {/* Bar tabs */}
      <div
        className={cn(
          'flex gap-2 flex-wrap p-1.5 rounded-2xl backdrop-blur',
          isDark
            ? 'bg-bg/[0.06] border border-bg/10'
            : 'bg-text-strong/[0.04] border border-text-strong/8'
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative px-4 py-2 text-xs md:text-sm font-medium rounded-xl outline-none transition-colors tracking-[0.04em]',
                isDark
                  ? isActive
                    ? 'text-text-strong'
                    : 'text-bg/75 hover:text-bg'
                  : isActive
                    ? 'text-bg'
                    : 'text-text-strong/70 hover:text-text-strong'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-xl bg-accent shadow-lg shadow-accent/30"
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div
        className={cn(
          'p-6 md:p-7 rounded-2xl backdrop-blur border min-h-[280px] shadow-xl',
          isDark
            ? 'bg-bg/[0.06] border-bg/15 shadow-black/30'
            : 'bg-bg-alt/95 border-text-strong/10 shadow-text-strong/10'
        )}
      >
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  x: -10,
                  filter: 'blur(10px)',
                }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  x: -10,
                  filter: 'blur(10px)',
                }}
                transition={{
                  duration: 0.5,
                  ease: 'circInOut',
                  type: 'spring',
                }}
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
}
