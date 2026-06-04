/* FloatingCtaBand, final CTA band réutilisable.
 *
 * Pattern fancy.dev LandingHero adapté :
 *   - TextRotate stagger char spring sur le suffixe italique accent
 *   - 5 FloatingElement Unsplash images parallax mouse-tracked
 *   - 2 boutons primary + secondary
 *
 * Réutilisé sur toutes les pages (HomePage, services, branding, audiovisuel, etc.)
 * pour cohérence visuelle.
 */
import * as React from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import { TextRotate } from '@/components/ui/text-rotate';
import Floating, { FloatingElement } from '@/components/ui/parallax-floating';
import { Section, Container, Btn } from '../ui';

export type FloatingCtaBandProps = {
  kicker?: string;
  /** Static text BEFORE the rotating italic suffix */
  prefix: React.ReactNode;
  /** Array of rotating italic suffixes (accent color) */
  rotatingWords: string[];
  /** Sub-paragraph body */
  sub?: React.ReactNode;
  /** Primary CTA label/href */
  primaryCta?: { label: string; href: string };
  /** Optional secondary CTA */
  secondaryCta?: { label: string; href: string };
  /** TextRotate rotation interval (ms), default 2800 */
  rotationIntervalMs?: number;
};

export function FloatingCtaBand({
  kicker = 'contactez-nous',
  prefix,
  rotatingWords,
  sub,
  primaryCta = { label: 'Démarrer le projet', href: '#/contact' },
  secondaryCta = { label: 'Voir nos réalisations', href: '#/realisations' },
  rotationIntervalMs = 2800,
}: FloatingCtaBandProps) {
  return (
    <Section bg="alt" className="relative pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden">
      <Floating sensitivity={-0.5} className="!absolute left-0 right-0 top-0 bottom-0 z-0 pointer-events-none">
        <FloatingElement
          depth={0.5}
          className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover -rotate-[3deg] shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            draggable={false}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover -rotate-12 shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            draggable={false}
          />
        </FloatingElement>

        <FloatingElement
          depth={4}
          className="top-[70%] left-[6%] md:top-[58%] md:left-[8%]"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            draggable={false}
          />
        </FloatingElement>

        <FloatingElement
          depth={2}
          className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover rotate-[6deg] shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            draggable={false}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[62%] left-[83%] md:top-[52%] md:left-[83%]"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rotate-[19deg] shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            draggable={false}
          />
        </FloatingElement>
      </Floating>

      <Container className="text-center relative z-10">
        {kicker && <div className="kicker mx-auto inline-flex">{kicker}</div>}
        <h2 className="display text-5xl md:text-7xl lg:text-8xl mt-6 text-text-strong leading-[0.95]">
          <span className="block">{prefix}</span>
          <LayoutGroup>
            <motion.span
              layout
              className="inline-flex justify-center items-baseline mt-2 md:mt-4"
            >
              <TextRotate
                texts={rotatingWords}
                mainClassName="overflow-hidden pr-2 text-accent italic justify-center"
                staggerDuration={0.025}
                staggerFrom="last"
                rotationInterval={rotationIntervalMs}
                transition={{ type: 'spring', damping: 28, stiffness: 380 }}
              />
            </motion.span>
          </LayoutGroup>
        </h2>
        {sub && (
          <p className="mt-8 text-lg text-text max-w-2xl mx-auto">
            {sub}
          </p>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {primaryCta && <Btn href={primaryCta.href} variant="primary">{primaryCta.label}</Btn>}
          {secondaryCta && <Btn href={secondaryCta.href} variant="secondary">{secondaryCta.label}</Btn>}
        </div>
      </Container>
    </Section>
  );
}
