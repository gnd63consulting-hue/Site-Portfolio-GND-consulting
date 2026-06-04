/* HeroBuildUpSV, Build-Up Cinematic hero for /services/sites-vitrines
 *
 * Asset: /assets/hero-tablet.png (iPad landscape + hand holding from bottom-right,
 * GND mockup integrated inside the tablet, palette warm GND only, alpha transparent).
 *
 * Background: cream charte GND (bg-bg-alt + radial glow orange), aligned with home hero.
 *
 * Animation séquencée GSAP (3-4s) :
 *   - LEFT: kicker / h1 / lead / badges / CTAs apparaissent stagger
 *   - RIGHT: image tablette scale-in + tilt rotationY 12° → 0° + opacity
 *   - Chip "Livré 14j" pop spring final bas-gauche tablette
 *   - Mouse parallax actif sur la tablette
 *   - Dust particles canvas walnut tone (visible sur cream)
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Icons } from '../icons';

gsap.registerPlugin(ScrollTrigger);

export function HeroBuildUpSV() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const tabletRef = React.useRef<HTMLDivElement>(null);
  const dustCanvasRef = React.useRef<HTMLCanvasElement>(null);

  // ---- GSAP entrance timeline ----
  React.useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from('[data-anim="hs-kicker"]', { y: 16, opacity: 0, duration: 0.55 })
        .from('[data-anim="hs-h1-l1"]', { y: 32, opacity: 0, duration: 0.7 }, '-=0.25')
        .from('[data-anim="hs-h1-l2"]', { y: 32, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('[data-anim="hs-lead"]', { y: 14, opacity: 0, duration: 0.55 }, '-=0.4')
        .from(
          '[data-anim="hs-badge"]',
          { y: 12, opacity: 0, duration: 0.45, stagger: 0.08 },
          '-=0.35',
        )
        .from(
          '[data-anim="hs-cta"]',
          { y: 14, opacity: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3',
        )
        .from(
          '[data-anim="hs-tablet"]',
          {
            scale: 0.86,
            opacity: 0,
            rotationY: 12,
            rotationX: -3,
            transformPerspective: 1400,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=1.4',
        )
        .from(
          '[data-anim="hs-chip"]',
          { scale: 0.55, opacity: 0, duration: 0.55, ease: 'back.out(2.6)' },
          '-=0.2',
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // ---- Mouse parallax on tablet ----
  React.useEffect(() => {
    const root = rootRef.current;
    const tablet = tabletRef.current;
    if (!root || !tablet) return;
    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(tablet, {
        rotationY: x * 6,
        rotationX: -y * 4,
        transformPerspective: 1400,
        duration: 0.8,
        ease: 'power2.out',
      });
    };
    const onLeave = () => {
      gsap.to(tablet, {
        rotationY: 0,
        rotationX: 0,
        duration: 1.0,
        ease: 'power3.out',
      });
    };
    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);
    return () => {
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ---- Dust particles canvas (walnut tone sur cream) ----
  React.useEffect(() => {
    const canvas = dustCanvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;
    let rafId = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx2d.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    const W = () => canvas.getBoundingClientRect().width;
    const H = () => canvas.getBoundingClientRect().height;
    const spawn = () => ({
      x: Math.random() * W(),
      y: H() * (0.6 + Math.random() * 0.45),
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.2 - Math.random() * 0.55,
      r: 0.5 + Math.random() * 1.6,
      alpha: 0,
      life: 0,
    });
    const particles = Array.from({ length: 28 }, spawn);
    const loop = () => {
      ctx2d.clearRect(0, 0, W(), H());
      ctx2d.globalCompositeOperation = 'multiply';
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;
        if (p.life < 70) p.alpha = Math.min(0.22, p.alpha + 0.005);
        else p.alpha = Math.max(0, p.alpha - 0.002);
        if (p.alpha <= 0 || p.y < 0) Object.assign(p, spawn());
        ctx2d.fillStyle = `rgba(125, 62, 44, ${p.alpha})`;
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx2d.fill();
      }
      rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-bg-alt text-text-strong min-h-[680px] md:min-h-[760px] lg:min-h-[860px]"
      style={{ perspective: '1400px' }}
    >
      {/* Radial glow orange centre, pattern home */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 90% at 50% 50%, rgba(255,149,79,0.18) 0%, transparent 75%)',
        }}
      />

      {/* Telemetry top corners */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10 text-text-muted label-mono text-[10px] tracking-[0.22em] flex items-center gap-2 z-20 pointer-events-none">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
          style={{ boxShadow: '0 0 8px #FF954F' }}
        />
        SITES VITRINES, LIVE
      </div>
      <div className="absolute top-6 right-6 md:top-8 md:right-10 text-text-muted/70 label-mono text-[10px] tracking-[0.22em] z-20 pointer-events-none">
        GND CONSULTING · PARIS · FR
      </div>

      {/* Dust canvas */}
      <canvas
        ref={dustCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* TEXT LEFT, grid container */}
      <div className="container mx-auto px-6 md:px-10 lg:px-16 pt-28 md:pt-32 lg:pt-36 pb-20 md:pb-24 lg:pb-28 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div
              data-anim="hs-kicker"
              className="label-mono text-[11px] tracking-[0.22em] text-text-muted flex items-center gap-2 mb-5"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
             SITES VITRINES
            </div>
            <h1 className="display leading-[0.95] text-5xl md:text-6xl lg:text-7xl text-text-strong">
              <span data-anim="hs-h1-l1" className="block">
                Votre site,
              </span>
              <span data-anim="hs-h1-l2" className="block italic text-accent">
                clé en main.
              </span>
            </h1>
            <p
              data-anim="hs-lead"
              className="mt-7 text-text text-base md:text-lg max-w-md leading-relaxed"
            >
              Un site professionnel, rapide, optimisé Google, livré en 1 à 2 semaines.
              Pas d'abonnement, vous êtes propriétaire.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {['À partir de 800 €', 'Livraison 1–2 sem.', 'SEO inclus'].map((b) => (
                <span
                  key={b}
                  data-anim="hs-badge"
                  className="inline-flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full bg-text-strong/5 text-text-strong border border-text-strong/10 backdrop-blur"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                data-anim="hs-cta"
                href="#tarifs"
                className="btn"
                style={{ background: '#FF954F', color: '#2A1810' }}
              >
                Voir les formules
                <Icons.ArrowUpRight size={14} />
              </a>
              <a
                data-anim="hs-cta"
                href="#/contact"
                className="btn !bg-text-strong/5 !text-text-strong !border !border-text-strong/15 hover:!bg-text-strong/10 transition-colors"
              >
                Demander un devis
                <Icons.ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          {/* RIGHT empty placeholder, image positioned absolute below */}
          <div className="lg:col-span-7" />
        </div>
      </div>

      {/* TABLETTE ABSOLUTE, bord poignet colle base du hero */}
      <div
        className="absolute right-0 md:right-4 lg:right-8 w-[72%] md:w-[64%] lg:w-[58%] xl:w-[54%] z-10 pointer-events-none"
        style={{ bottom: '0' }}
      >
        {/* Wide warm ambient glow, réchauffe zone main + tablette */}
        <div
          className="absolute -inset-x-20 -inset-y-16 md:-inset-x-32 md:-inset-y-24 pointer-events-none"
          style={{
            background:
              'radial-gradient(60% 55% at 50% 50%, rgba(255,149,79,0.24) 0%, rgba(255,149,79,0.10) 35%, rgba(255,149,79,0.04) 60%, transparent 80%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          ref={tabletRef}
          data-anim="hs-tablet"
          className="relative will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 100%',
          }}
        >
          <img
            src="/assets/hero-tablet.png?v=2"
            alt="GND Consulting, site vitrine clé en main"
            className="w-full h-auto block select-none pointer-events-none"
            draggable={false}
            style={{
              filter:
                'drop-shadow(0 24px 48px rgba(42,24,16,0.22)) drop-shadow(0 8px 20px rgba(42,24,16,0.18))',
            }}
          />

          {/* Chip "Livré 14j", milieu-gauche tablette */}
          <div
            data-anim="hs-chip"
            className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 bg-accent text-text-strong px-5 py-3 rounded-full text-sm font-medium shadow-2xl whitespace-nowrap pointer-events-auto"
            style={{ boxShadow: '0 12px 32px rgba(255,149,79,0.45)' }}
          >
            Livré en 1–2 semaines
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex items-center justify-between text-text-muted/60 label-mono text-[10px] tracking-[0.22em] pointer-events-none z-10">
        <div className="flex items-center gap-3">
          <Icons.ArrowDown size={14} />
          <span>SCROLLEZ, TARIFS · PROCESS · FAQ</span>
        </div>
        <div>EST. 2024 · PARIS · FR</div>
      </div>
    </section>
  );
}
