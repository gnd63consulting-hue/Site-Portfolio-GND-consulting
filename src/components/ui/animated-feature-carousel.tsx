/* animated-feature-carousel — 21st.dev pattern ORIGINAL (6 images stacked, AnimatedStepImage with presets)
 * Adapted to GND charte (cream/walnut/orange) — but core animation logic + image layout preserved.
 */
import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  type CSSProperties,
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Types ---
type StaticImageData = string;

type WrapperStyle = MotionStyle & {
  '--x': MotionValue<string>;
  '--y': MotionValue<string>;
};

interface ImageSet {
  step1img1: StaticImageData;
  step1img2: StaticImageData;
  step2img1: StaticImageData;
  step2img2: StaticImageData;
  step3img: StaticImageData;
  step4img: StaticImageData;
  alt: string;
}

export interface Step {
  id: string;
  name: string; // e.g. "J1-J2"
  title: string;
  description: string;
  bgImage?: string; // optional ambient background image URL per step
}

interface FeatureCarouselProps {
  image: ImageSet;
  steps?: readonly Step[];
  interval?: number;
  step1img1Class?: string;
  step1img2Class?: string;
  step2img1Class?: string;
  step2img2Class?: string;
  step3imgClass?: string;
  step4imgClass?: string;
}

interface StepImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
}

const placeholderImage = (text = 'Image') =>
  `https://placehold.co/600x400/1a1a1a/ffffff?text=${encodeURIComponent(text)}`;

// --- Animation presets (original) ---
const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: 'spring' as const, stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: 'spring' as const, stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: 'spring' as const, stiffness: 300, damping: 25, mass: 0.5 },
  },
} as const;

type AnimationPreset = keyof typeof ANIMATION_PRESETS;

interface AnimatedStepImageProps extends StepImageProps {
  preset?: AnimationPreset;
  delay?: number;
}

// --- Hooks ---
const DEFAULT_TOTAL_STEPS = 4;

function useNumberCycler(totalSteps = DEFAULT_TOTAL_STEPS, interval = 5000) {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps);
    }, interval);
    return () => clearTimeout(timerId);
  }, [currentNumber, totalSteps, interval]);

  const setStep = useCallback(
    (stepIndex: number) => setCurrentNumber(stepIndex % totalSteps),
    [totalSteps],
  );

  return { currentNumber, setStep };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// --- Icons ---
function IconCheck({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
}

const stepVariants: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
};

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={className}
        src={src}
        style={{ position: 'absolute', userSelect: 'none', maxWidth: 'unset', ...style }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = placeholderImage(alt);
        }}
        {...props}
      />
    );
  },
);
StepImage.displayName = 'StepImage';

const MotionStepImage = motion(StepImage);

const AnimatedStepImage = ({ preset = 'fadeInScale', delay = 0, ...props }: AnimatedStepImageProps) => {
  const presetConfig = ANIMATION_PRESETS[preset];
  return (
    <MotionStepImage
      {...props}
      {...presetConfig}
      transition={{ ...presetConfig.transition, delay }}
    />
  );
};

// --- FeatureCard (mouse-track halo + animated text content) ---
function FeatureCard({
  children,
  step,
  steps,
}: {
  children: React.ReactNode;
  step: number;
  steps: readonly Step[];
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useIsMobile();

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const current = steps[step];

  return (
    <motion.div
      className="animated-cards group relative w-full rounded-3xl"
      onMouseMove={handleMouseMove}
      style={
        {
          '--x': useMotionTemplate`${mouseX}px`,
          '--y': useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(280px circle at var(--x) var(--y), rgba(255,149,79,0.14), transparent 70%)',
        }}
      />
      <div className="relative w-full overflow-hidden rounded-3xl border border-text-strong/10 bg-bg-alt transition-colors duration-300 shadow-xl shadow-text/10">
        {/* Ambient background image per step — sepia warm + low opacity */}
        <AnimatePresence mode="wait">
          {current.bgImage && (
            <motion.div
              key={`bg-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 pointer-events-none"
            >
              <img
                src={current.bgImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.78 }}
                draggable={false}
              />
              {/* Walnut overlay — covers FULL image, progressive fade left→right for global text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(42,24,16,0.82) 0%, rgba(42,24,16,0.58) 30%, rgba(42,24,16,0.38) 60%, rgba(42,24,16,0.25) 85%, rgba(42,24,16,0.18) 100%)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative m-8 md:m-10 min-h-[450px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full flex-col gap-4 md:w-3/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="label-mono text-[11px] tracking-[0.22em] text-accent-deep"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.name}
              </motion.div>
              <motion.h3
                className="display text-3xl md:text-4xl lg:text-5xl text-accent leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.title}
              </motion.h3>
              <motion.p
                className="text-bg text-base md:text-lg leading-relaxed mt-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// --- Steps nav ---
function StepsNav({
  steps: stepItems,
  current,
  onChange,
}: {
  steps: readonly Step[];
  current: number;
  onChange: (index: number) => void;
}) {
  return (
    <nav aria-label="Process steps" className="flex justify-center px-4">
      <ol className="flex w-full flex-wrap items-center justify-center gap-2" role="list">
        {stepItems.map((step, stepIdx) => {
          const isCompleted = current > stepIdx;
          const isCurrent = current === stepIdx;
          return (
            <motion.li
              key={step.id}
              initial="inactive"
              animate={isCurrent ? 'active' : 'inactive'}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <button
                type="button"
                className={cn(
                  'group flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  isCurrent
                    ? 'bg-text-strong text-bg'
                    : 'bg-bg-alt text-text-strong hover:bg-surface border border-text-strong/10',
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 text-xs font-semibold',
                    isCompleted
                      ? 'bg-accent text-text-strong'
                      : isCurrent
                        ? 'bg-accent text-text-strong'
                        : 'bg-text-strong/8 text-text-muted group-hover:bg-text-strong/15',
                  )}
                >
                  {isCompleted ? <IconCheck className="h-3.5 w-3.5" /> : <span>{stepIdx + 1}</span>}
                </span>
                <span className="hidden sm:inline-block label-mono text-[10px] tracking-[0.18em]">
                  {step.name}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

// --- Default image positioning — STRICT right 35% zone (text occupies left 60%) ---
const defaultClasses = {
  img: 'rounded-xl border border-text-strong/10 shadow-2xl shadow-text/15',
  step1img1: 'w-[26%] left-[64%] top-[8%]',
  step1img2: 'w-[30%] left-[62%] top-[42%]',
  step2img1: 'w-[26%] left-[64%] top-[10%]',
  step2img2: 'w-[24%] left-[68%] top-[48%]',
  step3img: 'w-[36%] left-[60%] top-[32%]',
  step4img: 'w-[36%] left-[60%] top-[32%]',
} as const;

// --- Main carousel ---
export function FeatureCarousel({
  image,
  steps,
  interval = 5000,
  step1img1Class = defaultClasses.step1img1,
  step1img2Class = defaultClasses.step1img2,
  step2img1Class = defaultClasses.step2img1,
  step2img2Class = defaultClasses.step2img2,
  step3imgClass = defaultClasses.step3img,
  step4imgClass = defaultClasses.step4img,
}: FeatureCarouselProps) {
  const effectiveSteps = steps ?? [];
  const { currentNumber: step, setStep } = useNumberCycler(effectiveSteps.length || 4, interval);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="relative w-full h-full">
            <AnimatedStepImage
              alt={image.alt}
              className={cn(defaultClasses.img, step1img1Class)}
              src={image.step1img1}
              preset="slideInLeft"
            />
            <AnimatedStepImage
              alt={image.alt}
              className={cn(defaultClasses.img, step1img2Class)}
              src={image.step1img2}
              preset="slideInRight"
              delay={0.1}
            />
          </div>
        );
      case 1:
        return (
          <div className="relative w-full h-full">
            <AnimatedStepImage
              alt={image.alt}
              className={cn(defaultClasses.img, step2img1Class)}
              src={image.step2img1}
              preset="fadeInScale"
            />
            <AnimatedStepImage
              alt={image.alt}
              className={cn(defaultClasses.img, step2img2Class)}
              src={image.step2img2}
              preset="fadeInScale"
              delay={0.1}
            />
          </div>
        );
      case 2:
        return (
          <AnimatedStepImage
            alt={image.alt}
            className={cn(defaultClasses.img, step3imgClass)}
            src={image.step3img}
            preset="fadeInScale"
          />
        );
      case 3:
        return (
          <AnimatedStepImage
            alt={image.alt}
            className={cn(defaultClasses.img, step4imgClass)}
            src={image.step4img}
            preset="fadeInScale"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto p-4">
      <FeatureCard steps={effectiveSteps} step={step}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            {...ANIMATION_PRESETS.fadeInScale}
            className="w-full h-full absolute inset-0 pointer-events-none"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </FeatureCard>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StepsNav current={step} onChange={setStep} steps={effectiveSteps} />
      </motion.div>
    </div>
  );
}

export { ANIMATION_PRESETS };
