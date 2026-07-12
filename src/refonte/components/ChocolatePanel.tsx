/* ChocolatePanel, Tricon3D-inspired chocolate brown break panel
 * Cream organic S-curve + arch-framed photos floating + circular badge + sparkles.
 * Used between sections on /services/sites-vitrines to dynamize page rhythm.
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ArchPhoto = {
  src: string;
  alt: string;
};

type ChocolatePanelProps = {
  /** 'left' = badge gauche / photos droite, 'right' = mirrored */
  side?: 'left' | 'right';
  kicker: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Texte handwritten dans le badge circulaire cream */
  badgeText: React.ReactNode;
  /** 3 photos en arches (1 grande + 2 petites) */
  photos: [ArchPhoto, ArchPhoto, ArchPhoto];
  id?: string;
};

const Sparkle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden {...props}>
    <path
      d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z"
      fill="currentColor"
    />
  </svg>
);

const ChocolatePanel: React.FC<ChocolatePanelProps> = ({
  side = 'left',
  kicker,
  title,
  body,
  badgeText,
  photos,
  id,
}) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reactId = React.useId();
  const gradId = `cream-grad-${reactId.replace(/[^a-zA-Z0-9-]/g, '')}`;

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let played = false;
    let ctx: gsap.Context | null = null;
    let idleCtx: gsap.Context | null = null;

    const play = () => {
      if (played) return;
      played = true;

      ctx = gsap.context(() => {
        const blob = root.querySelector('[data-blob]');
        const badge = root.querySelector('[data-badge]');
        const archPrimary = root.querySelector('[data-arch-primary]');
        const archMini = gsap.utils.toArray<HTMLElement>('[data-arch-mini]', root);
        const sparkles = gsap.utils.toArray<HTMLElement>('[data-sparkle]', root);
        const text = gsap.utils.toArray<HTMLElement>('[data-text]', root);

        const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });

        tl.fromTo(
          blob,
          { autoAlpha: 0, scale: 0.85, x: side === 'left' ? -60 : 60 },
          { autoAlpha: 1, scale: 1, x: 0, duration: 1.1, ease: 'power3.out' }
        )
          .fromTo(
            badge,
            { autoAlpha: 0, scale: 0.6, rotate: -25 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.85, ease: 'back.out(1.6)' },
            '-=0.65'
          )
          .fromTo(
            archPrimary,
            { autoAlpha: 0, y: 40, scale: 0.92 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
            '-=0.7'
          )
          .fromTo(
            archMini,
            { autoAlpha: 0, y: 30, scale: 0.9 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12 },
            '-=0.55'
          )
          .fromTo(
            text,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1 },
            '-=0.55'
          )
          .fromTo(
            sparkles,
            { autoAlpha: 0, scale: 0, rotate: -180 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.08 },
            '-=0.5'
          );

        // Idle: badge gentle rotate + sparkles twinkle, start after intro
        tl.add(() => {
          idleCtx = gsap.context(() => {
            gsap.to(badge, { rotate: 6, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
            sparkles.forEach((sp, i) => {
              gsap.to(sp, {
                scale: 1.3,
                duration: 1.6 + (i % 3) * 0.4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.2,
              });
            });
          }, root);
        });
      }, root);
    };

    // Fire when section enters viewport, IntersectionObserver = StrictMode-safe.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            play();
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(root);

    return () => {
      io.disconnect();
      idleCtx?.revert();
      ctx?.revert();
    };
  }, [side]);

  const [photoPrimary, photoMini1, photoMini2] = photos;

  return (
    <section
      ref={rootRef}
      id={id}
      className="chocolate-panel relative overflow-hidden py-24 md:py-32"
      style={{ background: '#2A1810', color: '#FFF3E8' }}
    >
      {/* Cream organic S-curve blob, décor de fond */}
      <svg
        data-blob
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3E8" />
            <stop offset="100%" stopColor="#FDF6EE" />
          </linearGradient>
        </defs>
        {side === 'left' ? (
          <path
            d="M 0,820
               C 240,760 480,760 720,820
               C 960,880 1200,760 1440,820
               L 1440,900 L 0,900 Z"
            fill={`url(#${gradId})`}
            opacity="0.96"
          />
        ) : (
          <path
            d="M 1440,820
               C 1200,760 960,760 720,820
               C 480,880 240,760 0,820
               L 0,900 L 1440,900 Z"
            fill={`url(#${gradId})`}
            opacity="0.96"
          />
        )}
        {/* Petit blob décoratif derrière les photos (zone arches) */}
        {side === 'left' ? (
          <ellipse cx="1080" cy="320" rx="380" ry="280" fill={`url(#${gradId})`} opacity="0.12" />
        ) : (
          <ellipse cx="360" cy="320" rx="380" ry="280" fill={`url(#${gradId})`} opacity="0.12" />
        )}
      </svg>

      {/* Sparkles décoratifs orange + cream */}
      <Sparkle
        data-sparkle
        className="absolute w-5 h-5 text-accent"
        style={{ top: '12%', left: side === 'left' ? '48%' : '52%' }}
      />
      <Sparkle
        data-sparkle
        className="absolute w-3 h-3 text-bg/80"
        style={{ top: '22%', right: side === 'left' ? '8%' : 'auto', left: side === 'left' ? 'auto' : '8%' }}
      />
      <Sparkle
        data-sparkle
        className="absolute w-4 h-4 text-accent"
        style={{ bottom: '18%', left: side === 'left' ? '6%' : 'auto', right: side === 'left' ? 'auto' : '6%' }}
      />
      <Sparkle
        data-sparkle
        className="absolute w-2.5 h-2.5 text-bg/70"
        style={{ bottom: '32%', right: '24%' }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 z-10">
        <div className={`grid lg:grid-cols-12 gap-8 lg:gap-10 items-center ${side === 'right' ? 'lg:[direction:rtl]' : ''}`}>
          {/* Colonne 1 : Badge circulaire + texte */}
          <div className={`lg:col-span-5 [direction:ltr] ${side === 'right' ? 'lg:order-2' : ''}`}>
            <div className="relative">
              {/* Badge circulaire cream "Design It. See It. Love It." style */}
              <div
                data-badge
                className="relative w-44 h-44 md:w-56 md:h-56 mx-auto lg:mx-0 mb-8 rounded-full flex items-center justify-center shadow-2xl"
                style={{ background: '#FDF6EE', color: '#2A1810' }}
              >
                <div className="text-center px-6 leading-snug">
                  <div className="text-base md:text-lg" style={{ fontFamily: 'Georgia, "Playfair Display", serif', fontStyle: 'italic' }}>
                    {badgeText}
                  </div>
                </div>
                {/* Ring accent */}
                <div
                  className="absolute inset-[-6px] rounded-full pointer-events-none"
                  style={{ border: '1px dashed rgba(255,149,79,0.5)' }}
                />
              </div>

              <div className="text-bg/70 text-xs tracking-[0.18em] uppercase mb-4" data-text>
                {kicker}
              </div>
              <h2
                className="display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5"
                style={{ color: '#FFF3E8' }}
                data-text
              >
                {title}
              </h2>
              {body && (
                <p className="text-bg/80 text-base md:text-lg leading-relaxed max-w-md" data-text>
                  {body}
                </p>
              )}
            </div>
          </div>

          {/* Colonne 2 : Photos arches */}
          <div className={`lg:col-span-7 [direction:ltr] ${side === 'right' ? 'lg:order-1' : ''}`}>
            <div className="grid grid-cols-12 gap-4 md:gap-5">
              {/* Arche principale, top-rounded type "arch" */}
              <div
                data-arch-primary
                className="col-span-12 md:col-span-8 relative overflow-hidden shadow-2xl"
                style={{
                  borderRadius: '180px 180px 32px 32px',
                  aspectRatio: '4 / 5',
                }}
              >
                <img src={photoPrimary.src} alt={photoPrimary.alt} className="w-full h-full object-cover" loading="lazy" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(42,24,16,0.35) 100%)',
                  }}
                />
              </div>

              {/* 2 arches mini empilées */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-4 md:gap-5">
                <div
                  data-arch-mini
                  className="relative overflow-hidden shadow-xl"
                  style={{
                    borderRadius: '999px 999px 24px 24px',
                    aspectRatio: '3 / 4',
                  }}
                >
                  <img src={photoMini1.src} alt={photoMini1.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div
                  data-arch-mini
                  className="relative overflow-hidden shadow-xl"
                  style={{
                    borderRadius: '24px 24px 999px 999px',
                    aspectRatio: '3 / 4',
                  }}
                >
                  <img src={photoMini2.src} alt={photoMini2.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ChocolatePanel };
