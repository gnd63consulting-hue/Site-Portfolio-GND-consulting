/* MethodCarousel, "Notre méthode" section.
 *
 * Adapted from 21st.dev "AnimatedTestimonials" pattern:
 *   - left column = numbered cards stacked with random tilt, active card on top straight
 *   - right column = active step title + body + prev/next controls
 *   - autoplay 5s (pauses on hover)
 *
 * GND palette: surface-card (cream) + accent orange + chocolat text.
 */
import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Kicker, Section, Container } from '../ui';

export type MethodStep = {
  n: string;
  t: string;
  d: string;
};

export type MethodCarouselProps = {
  kicker: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  steps: MethodStep[];
  autoplay?: boolean;
  intervalMs?: number;
};

export function MethodCarousel({
  kicker,
  title,
  intro,
  steps,
  autoplay = true,
  intervalMs = 5000,
}: MethodCarouselProps) {
  const [active, setActive] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
  }, [steps.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + steps.length) % steps.length);
  };

  React.useEffect(() => {
    if (!autoplay || isPaused || steps.length <= 1) return;
    const id = setInterval(handleNext, intervalMs);
    return () => clearInterval(id);
  }, [autoplay, isPaused, handleNext, intervalMs, steps.length]);

  // Stable random tilt per card (computed once)
  const tilts = React.useMemo(
    () => steps.map(() => `${Math.floor(Math.random() * 16) - 8}deg`),
    [steps]
  );

  if (!steps.length) return null;
  const isActive = (i: number) => i === active;
  const activeStep = steps[active];

  return (
    <Section className="py-20 md:py-28">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left column, Card stack with numbered tiles */}
          <div
            className="lg:col-span-5 flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative h-80 md:h-[420px] w-full max-w-xs md:max-w-sm">
              <AnimatePresence>
                {steps.map((step, i) => (
                  <motion.div
                    key={step.n}
                    initial={{ opacity: 0, scale: 0.9, y: 50, rotate: tilts[i] }}
                    animate={{
                      opacity: isActive(i) ? 1 : 0.5,
                      scale: isActive(i) ? 1 : 0.9,
                      y: isActive(i) ? 0 : 20,
                      zIndex: isActive(i)
                        ? steps.length
                        : steps.length - Math.abs(i - active),
                      rotate: isActive(i) ? '0deg' : tilts[i],
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: -50 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 origin-bottom"
                    style={{ perspective: '1000px' }}
                  >
                    <div
                      className="h-full w-full rounded-[28px] surface-card shadow-2xl shadow-text-strong/20 ring-1 ring-text-strong/10 p-8 md:p-10 flex flex-col justify-between select-none"
                    >
                      <div className="flex flex-col items-start">
                        <span className="label-mono text-[10px] tracking-[0.22em] uppercase text-text-muted">
                          Étape
                        </span>
                        <span className="num-display text-7xl md:text-8xl text-accent leading-none mt-3">
                          {step.n}
                        </span>
                      </div>
                      <div>
                        <div className="display text-2xl md:text-3xl text-text-strong leading-tight">
                          {step.t}
                        </div>
                        <div className="mt-3 h-1 w-12 rounded-full bg-accent" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right column, Active step text + controls */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Kicker>{kicker}</Kicker>
            <h2 className="display text-4xl md:text-5xl lg:text-6xl mt-5 text-text-strong leading-[1.04]">
              {title}
            </h2>
            <p className="mt-6 text-base md:text-lg text-text leading-relaxed max-w-lg">
              {intro}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mt-10 surface-card ring-1 ring-text-strong/10 p-7 md:p-8 rounded-[24px]"
              >
                <div className="flex items-center gap-4">
                  <span className="num-display text-4xl text-accent leading-none">
                    {activeStep.n}
                  </span>
                  <h3 className="display text-2xl md:text-[28px] text-text-strong leading-tight">
                    {activeStep.t}
                  </h3>
                </div>
                <p className="mt-5 text-base md:text-lg text-text leading-relaxed">
                  {activeStep.d}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center gap-4 pt-10">
              <button
                onClick={handlePrev}
                aria-label="Étape précédente"
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-text-strong/5 ring-1 ring-text-strong/10 transition-colors hover:bg-accent hover:ring-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-alt"
              >
                <ArrowLeft className="h-5 w-5 text-text-strong transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Étape suivante"
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-text-strong/5 ring-1 ring-text-strong/10 transition-colors hover:bg-accent hover:ring-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-alt"
              >
                <ArrowRight className="h-5 w-5 text-text-strong transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <span className="ml-3 label-mono text-[10px] tracking-[0.22em] uppercase text-text-muted">
                {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
