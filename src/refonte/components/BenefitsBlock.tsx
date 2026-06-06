/* BenefitsBlock, Avantages section for /services/sites-vitrines
 *
 * V3, 5 layers PNG transparents + cinematic GSAP timeline.
 * Textes overlay positionnés sur stage parent (positions originales).
 *
 * Animation:
 *   - Stage opacity + scale + blur reveal
 *   - Background radial glow scale-out
 *   - Big disc explosive entrance (scale + rotation + back.out)
 *   - 4 capsules petal-bloom from disc center (translate + scale stagger)
 *   - Disc text + capsules textes fade-up stagger
 *   - Idle: float + glow pulse breathing
 *   - Mouse parallax per-layer depth
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Section, Container } from '../ui';

gsap.registerPlugin(ScrollTrigger);

const LAYERS = {
  disc: {
    src: '/assets/benefits-disc-center.png?v=1',
    bbox: { left: '38.4%', top: '5.0%', width: '23.2%', height: '41.5%' },
  },
  capsule1: {
    src: '/assets/benefits-capsule-1.png?v=1',
    bbox: { left: '23.1%', top: '32.0%', width: '13.7%', height: '50.8%' },
  },
  capsule2: {
    src: '/assets/benefits-capsule-2.png?v=1',
    bbox: { left: '36.5%', top: '43.3%', width: '13.7%', height: '50.8%' },
  },
  capsule3: {
    src: '/assets/benefits-capsule-3.png?v=1',
    bbox: { left: '49.8%', top: '43.3%', width: '13.6%', height: '50.8%' },
  },
  capsule4: {
    src: '/assets/benefits-capsule-4.png?v=1',
    bbox: { left: '63.1%', top: '32.0%', width: '13.7%', height: '50.8%' },
  },
};

const IMG_FILTER =
  'sepia(0.08) saturate(1.05) hue-rotate(-3deg) drop-shadow(0 18px 32px rgba(42,24,16,0.12)) drop-shadow(0 6px 14px rgba(42,24,16,0.08))';

export function BenefitsBlock() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      // INITIAL STATES
      gsap.set(stageRef.current, { opacity: 0, scale: 0.86, filter: 'blur(12px)' });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });
      gsap.set('[data-layer="disc"]', { scale: 0, rotation: -18, opacity: 0, transformOrigin: '50% 50%' });
      gsap.set('[data-anim="bn-circle-kicker"]', { y: 12, opacity: 0 });
      gsap.set('[data-anim="bn-circle-title"]', { y: 16, opacity: 0 });
      gsap.set('[data-anim="bn-cap-text"]', { y: 14, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
        defaults: { ease: 'power3.out' },
      });

      // 1. Stage reveal
      tl.to(stageRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' });

      // 2. Background glow expand
      tl.to(glowRef.current, { opacity: 0.6, scale: 1.15, duration: 1.4, ease: 'power3.out' }, '-=0.7');

      // 3. Big disc explosive entrance
      tl.to(
        '[data-layer="disc"]',
        { scale: 1, rotation: 0, opacity: 1, duration: 1.0, ease: 'back.out(1.2)' },
        '-=0.9',
      );

      // 4. Disc text
      tl.to('[data-anim="bn-circle-kicker"]', { y: 0, opacity: 1, duration: 0.5 }, '-=0.5');
      tl.to('[data-anim="bn-circle-title"]', { y: 0, opacity: 1, duration: 0.6 }, '-=0.35');

      // 5. Capsules petal-bloom from disc center (translate + scale)
      tl.fromTo(
        '[data-layer="capsule-1"]',
        { x: 110, y: -120, rotation: 6, scale: 0.62, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.15, ease: 'power3.out' },
        '-=0.4',
      );
      tl.fromTo(
        '[data-layer="capsule-4"]',
        { x: -110, y: -120, rotation: -6, scale: 0.62, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.15, ease: 'power3.out' },
        '<+0.07',
      );
      tl.fromTo(
        '[data-layer="capsule-2"]',
        { x: 55, y: -150, rotation: 4, scale: 0.62, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.15, ease: 'power3.out' },
        '<+0.08',
      );
      tl.fromTo(
        '[data-layer="capsule-3"]',
        { x: -55, y: -150, rotation: -4, scale: 0.62, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.15, ease: 'power3.out' },
        '<+0.08',
      );

      // 6. Capsule texts fade-up stagger
      tl.to(
        '[data-anim="bn-cap-text"]',
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.09, ease: 'power3.out' },
        '-=0.6',
      );

      // 7. Idle infinite, float + glow pulse
      tl.add(() => {
        gsap.to(stageRef.current, {
          y: -8,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        gsap.to(glowRef.current, {
          opacity: 0.85,
          scale: 1.22,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }, '>');
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax depth
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(stageRef.current, {
        rotationY: x * 3,
        rotationX: -y * 2,
        transformPerspective: 1400,
        duration: 1.0,
        ease: 'power2.out',
      });
      gsap.to('[data-parallax="deep"]', { x: x * 10, y: y * 6, duration: 1.0, ease: 'power2.out' });
      gsap.to('[data-parallax="mid"]', { x: x * 6, y: y * 4, duration: 1.0, ease: 'power2.out' });
      gsap.to('[data-parallax="shallow"]', { x: x * 3, y: y * 2, duration: 1.0, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(stageRef.current, { rotationY: 0, rotationX: 0, duration: 1.2, ease: 'power3.out' });
      gsap.to('[data-parallax]', { x: 0, y: 0, duration: 1.2, ease: 'power3.out' });
    };
    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);
    return () => {
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <Section className="py-20 md:py-24 overflow-x-clip">
      <Container>
        <div
          ref={rootRef}
          className="relative w-[184%] -translate-x-[22.8%] sm:w-[144%] sm:-translate-x-[15.3%] md:w-auto md:translate-x-0 md:mx-auto"
          style={{ maxWidth: '1400px', perspective: '1400px' }}
        >
          <div
            ref={stageRef}
            className="relative will-change-transform"
            style={{ aspectRatio: '2400 / 1340', transformStyle: 'preserve-3d', containerType: 'inline-size' }}
          >
            {/* Background ambient glow */}
            <div
              ref={glowRef}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(45% 55% at 50% 30%, rgba(255,149,79,0.30) 0%, rgba(255,149,79,0.12) 35%, rgba(255,149,79,0.04) 60%, transparent 80%)',
                filter: 'blur(50px)',
                transformOrigin: '50% 35%',
              }}
            />

            {/* LAYER images, 5 separate PNGs, no SVG connection lines */}
            <div data-layer="disc" data-parallax="deep" className="absolute" style={LAYERS.disc.bbox}>
              <img src={LAYERS.disc.src} alt="" className="w-full h-full object-contain pointer-events-none" draggable={false} style={{ filter: IMG_FILTER }} />
            </div>
            <div data-layer="capsule-1" data-parallax="mid" className="absolute" style={LAYERS.capsule1.bbox}>
              <img src={LAYERS.capsule1.src} alt="" className="w-full h-full object-contain pointer-events-none" draggable={false} style={{ filter: IMG_FILTER }} />
            </div>
            <div data-layer="capsule-2" data-parallax="shallow" className="absolute" style={LAYERS.capsule2.bbox}>
              <img src={LAYERS.capsule2.src} alt="" className="w-full h-full object-contain pointer-events-none" draggable={false} style={{ filter: IMG_FILTER }} />
            </div>
            <div data-layer="capsule-3" data-parallax="shallow" className="absolute" style={LAYERS.capsule3.bbox}>
              <img src={LAYERS.capsule3.src} alt="" className="w-full h-full object-contain pointer-events-none" draggable={false} style={{ filter: IMG_FILTER }} />
            </div>
            <div data-layer="capsule-4" data-parallax="mid" className="absolute" style={LAYERS.capsule4.bbox}>
              <img src={LAYERS.capsule4.src} alt="" className="w-full h-full object-contain pointer-events-none" draggable={false} style={{ filter: IMG_FILTER }} />
            </div>

            {/* TEXT OVERLAYS, positioned on stage (V11 original positions) */}
            {/* Disc center */}
            <div
              className="absolute flex flex-col items-center justify-center text-center px-4 pointer-events-none"
              style={{ left: '40%', top: '11%', width: '20%', height: '24%' }}
            >
              <div
                data-anim="bn-circle-kicker"
                className="label-mono tracking-[0.22em] text-text-muted"
                style={{ fontSize: 'clamp(3px, 1.16cqw, 12px)', marginBottom: 'clamp(1px, 0.5cqw, 6px)' }}
              >
               AVANTAGES
              </div>
              <div
                data-anim="bn-circle-title"
                className="display text-text-strong leading-tight"
                style={{ fontSize: 'clamp(7px, 2.33cqw, 24px)' }}
              >
                Le pack <span className="italic text-accent">GND</span>
              </div>
            </div>
            {/* Capsule 1 */}
            <div
              data-anim="bn-cap-text"
              className="absolute flex flex-col items-center justify-center text-center px-2 pointer-events-none"
              style={{ left: '24.3%', top: '48%', width: '12.5%', height: '32%' }}
            >
              <div className="display text-text-strong leading-[1.05] font-semibold" style={{ fontSize: 'clamp(5px, 1.42cqw, 14px)' }}>
                Pas d'abonnement
              </div>
              <p className="text-text-muted leading-snug" style={{ fontSize: 'clamp(3.5px, 0.8cqw, 11px)', marginTop: 'clamp(1px, 0.2cqw, 4px)' }}>
                Vous payez une fois, le site est à vous.
              </p>
            </div>
            {/* Capsule 2 */}
            <div
              data-anim="bn-cap-text"
              className="absolute flex flex-col items-center justify-center text-center px-2 pointer-events-none"
              style={{ left: '37.35%', top: '59%', width: '12.5%', height: '32%' }}
            >
              <div className="display text-text-strong leading-[1.05] font-semibold" style={{ fontSize: 'clamp(5px, 1.42cqw, 14px)' }}>
                Vous êtes propriétaire
              </div>
              <p className="text-text-muted leading-snug" style={{ fontSize: 'clamp(3.5px, 0.8cqw, 11px)', marginTop: 'clamp(1px, 0.2cqw, 4px)' }}>
                Nom de domaine et accès transmis.
              </p>
            </div>
            {/* Capsule 3 */}
            <div
              data-anim="bn-cap-text"
              className="absolute flex flex-col items-center justify-center text-center px-2 pointer-events-none"
              style={{ left: '50.6%', top: '59%', width: '12.5%', height: '32%' }}
            >
              <div className="display text-text-strong leading-[1.05] font-semibold" style={{ fontSize: 'clamp(5px, 1.42cqw, 14px)' }}>
                Paiement en 2 fois
              </div>
              <p className="text-text-muted leading-snug" style={{ fontSize: 'clamp(3.5px, 0.8cqw, 11px)', marginTop: 'clamp(1px, 0.2cqw, 4px)' }}>
                50 % commande / 50 % livraison.
              </p>
            </div>
            {/* Capsule 4 */}
            <div
              data-anim="bn-cap-text"
              className="absolute flex flex-col items-center justify-center text-center px-2 pointer-events-none"
              style={{ left: '63.95%', top: '48%', width: '12.5%', height: '32%' }}
            >
              <div className="display text-text-strong leading-[1.05] font-semibold" style={{ fontSize: 'clamp(5px, 1.42cqw, 14px)' }}>
                Modifications sur devis
              </div>
              <p className="text-text-muted leading-snug" style={{ fontSize: 'clamp(3.5px, 0.8cqw, 11px)', marginTop: 'clamp(1px, 0.2cqw, 4px)' }}>
                Une évolution ? Devis transparent.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
