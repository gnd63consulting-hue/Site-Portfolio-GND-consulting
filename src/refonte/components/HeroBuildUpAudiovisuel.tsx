/* HeroBuildUpAudiovisuel, Build-Up Cinematic hero for /services/audiovisuel
 *
 * Jumeau exact de HeroBuildUpBranding (full-bleed cream, GSAP stagger entrance,
 * mouse parallax 3D, dust canvas walnut, telemetry corners). Seul change le
 * contenu copywriting + asset cutout + chip floating.
 *
 * Asset: /assets/audiovisuel-hero-cutout.png (cutout rembg de l'image source
 * "Img hero page audiovisuel.png" fournie par Roodny).
 *
 * Background: cream charte GND (bg-bg-alt + radial glow orange), aligned avec
 * hero home + sites-vitrines + branding-identite.
 *
 * Animation séquencée GSAP (3–4s) :
 *   - LEFT: kicker / h1 / lead / badges / CTAs apparaissent stagger
 *   - RIGHT: image cutout scale-in + tilt rotationY 12° → 0° + opacity
 *   - Chip "4K · 8K cinéma" pop spring final
 *   - Mouse parallax actif
 *   - Dust particles canvas walnut tone
 */
import * as React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Icons } from '../icons';

gsap.registerPlugin(ScrollTrigger);

export function HeroBuildUpAudiovisuel() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const visualRef = React.useRef<HTMLDivElement>(null);
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

      tl.from('[data-anim="ha-kicker"]', { y: 16, opacity: 0, duration: 0.55 })
        .from('[data-anim="ha-h1-l1"]', { y: 32, opacity: 0, duration: 0.7 }, '-=0.25')
        .from('[data-anim="ha-h1-l2"]', { y: 32, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('[data-anim="ha-lead"]', { y: 14, opacity: 0, duration: 0.55 }, '-=0.4')
        .from(
          '[data-anim="ha-badge"]',
          { y: 12, opacity: 0, duration: 0.45, stagger: 0.08 },
          '-=0.35',
        )
        .from(
          '[data-anim="ha-cta"]',
          { y: 14, opacity: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3',
        )
        .from(
          '[data-anim="ha-visual"]',
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
          '[data-anim="ha-chip"]',
          { scale: 0.55, opacity: 0, duration: 0.55, ease: 'back.out(2.6)' },
          '-=0.2',
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // ---- Mouse parallax ----
  React.useEffect(() => {
    const root = rootRef.current;
    const visual = visualRef.current;
    if (!root || !visual) return;
    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(visual, {
        rotationY: x * 6,
        rotationX: -y * 4,
        transformPerspective: 1400,
        duration: 0.8,
        ease: 'power2.out',
      });
    };
    const onLeave = () => {
      gsap.to(visual, {
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
      className="relative overflow-hidden bg-bg-alt text-white min-h-[680px] md:min-h-[760px] lg:min-h-[860px]"
      style={{ perspective: '1400px' }}
    >
      {/* Bg image full-bleed, Nikon caméra + désert dans objectif (composite
          surréaliste 16:9, mood warm). Path mappé sur le nom utilisé par
          l'utilisateur : "Background hero 1 audiovisuel page". */}
      <img
        src="/assets/hero-1-audiovisuel-bg.png"
        alt=""
        draggable={false}
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
      />

      {/* Scrim gradient gauche → transparent droite. Switched to chocolat
          (#2A1810) pour permettre texte CREAM lisible côté gauche (au lieu
          de chocolat-sur-cream qui mixait mal sur l'image warm). */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(42,24,16,0.72) 0%, rgba(42,24,16,0.55) 28%, rgba(42,24,16,0.28) 50%, rgba(42,24,16,0.08) 75%, rgba(42,24,16,0) 100%)',
        }}
      />

      {/* Radial glow orange centre, pattern home (par-dessus image pour halo warm) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 85% 50%, rgba(255,149,79,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Telemetry top corners, cream 100% + text-shadow noir doux pour
          lisibilité forte sur bg image warm (opacités basses lisaient sombre). */}
      <div
        className="absolute top-6 left-6 md:top-8 md:left-10 !text-white label-mono text-[10px] tracking-[0.22em] flex items-center gap-2 z-20 pointer-events-none"
        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.45), 0 0 12px rgba(0,0,0,0.25)' }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
          style={{ boxShadow: '0 0 8px #FF954F' }}
        />
        AUDIOVISUEL, STUDIO ACTIF
      </div>
      <div
        className="absolute top-6 right-6 md:top-8 md:right-10 !text-white label-mono text-[10px] tracking-[0.22em] z-20 pointer-events-none"
        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.45), 0 0 12px rgba(0,0,0,0.25)' }}
      >
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
              data-anim="ha-kicker"
              className="label-mono text-[11px] tracking-[0.22em] !text-white flex items-center gap-2 mb-5"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
             AUDIOVISUEL
            </div>
            <h1 className="display leading-[0.95] text-5xl md:text-6xl lg:text-7xl xl:text-[84px] text-white">
              <span data-anim="ha-h1-l1" className="block">
                Des images qui racontent
              </span>
              <span data-anim="ha-h1-l2" className="block italic text-accent">
                plus qu'elles ne montrent.
              </span>
            </h1>
            <div
              data-anim="ha-lead"
              className="mt-7 max-w-lg space-y-4 text-white/85 text-base md:text-lg leading-relaxed"
            >
              <p>
                Vidéo, motion design et photographie réunis au sein d'une même direction artistique pour garantir une communication cohérente, quel que soit le support.
              </p>
              <p>
                L'audiovisuel est l'activité historique de GND. Nous accordons autant d'importance à l'esthétique qu'au message, afin de produire des contenus capables de marquer les esprits, créer de l'émotion et renforcer la crédibilité de votre marque.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {['Captation 4K/8K', 'Motion design 2D/3D', 'Photographie professionnelle', 'Contenus digitaux', 'Campagnes visuelles'].map((b) => (
                <span
                  key={b}
                  data-anim="ha-badge"
                  className="inline-flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full bg-bg/10 text-white border border-bg/20 backdrop-blur"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                data-anim="ha-cta"
                href="#/contact"
                className="btn"
                style={{ background: '#FF954F', color: '#2A1810' }}
              >
                Démarrer un projet audiovisuel
                <Icons.ArrowUpRight size={14} />
              </a>
              <a
                data-anim="ha-cta"
                href="#/realisations"
                className="btn !bg-bg/8 !text-white !border !border-bg/25 hover:!bg-bg/15 transition-colors"
              >
                Voir nos réalisations
                <Icons.ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          {/* RIGHT empty placeholder, image positioned absolute below */}
          <div className="lg:col-span-7" />
        </div>
      </div>

      {/* VISUAL ABSOLUTE, audiovisuel cutout, collé bord droit page
          (avant-bras sortent naturellement de la viewport au lieu d'être visiblement
          coupés à mi-cadre). right-0 sur tous les breakpoints, slight negative
          bleed sur xl pour effet "sortant du site". */}
      <div
        className="absolute z-10 pointer-events-none
          right-0 xl:-right-2
          w-[78%] md:w-[58%] lg:w-[52%] xl:w-[48%]
          max-w-[460px] md:max-w-[560px] lg:max-w-[680px] xl:max-w-[780px]"
        style={{ bottom: '0' }}
      >
        {/* Wide warm ambient glow */}
        <div
          className="absolute -inset-x-16 -inset-y-12 md:-inset-x-24 md:-inset-y-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(60% 55% at 50% 50%, rgba(255,149,79,0.24) 0%, rgba(255,149,79,0.10) 35%, rgba(255,149,79,0.04) 60%, transparent 80%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          ref={visualRef}
          data-anim="ha-visual"
          className="relative will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: '50% 100%',
          }}
        >
          {/* Image détourée, fond alpha, intégration directe sur hero cream */}
          <img
            src="/assets/audiovisuel-hero-cutout.png"
            alt="GND Consulting, audiovisuel · vidéo, motion, photographie"
            className="w-full h-auto block select-none pointer-events-none"
            draggable={false}
            style={{
              filter:
                'drop-shadow(0 28px 56px rgba(42,24,16,0.28)) drop-shadow(0 12px 24px rgba(42,24,16,0.18)) drop-shadow(0 4px 12px rgba(255,149,79,0.18))',
            }}
          />

          {/* Chip "4K · 8K cinéma", milieu-gauche visuel. Texte cream pour
              cohérence theme white + orange du hero. */}
          <div
            data-anim="ha-chip"
            className="absolute top-1/2 -left-3 md:-left-5 -translate-y-1/2 bg-accent text-white px-4 py-2.5 rounded-full text-xs md:text-sm font-medium shadow-2xl whitespace-nowrap pointer-events-auto"
            style={{ boxShadow: '0 12px 32px rgba(255,149,79,0.45)' }}
          >
            4K · 8K cinéma
          </div>
        </div>
      </div>

      {/* Bottom strip, cream 100% + text-shadow noir doux pour pop fort sur
          bg image warm (text-white/60 lisait sombre/illisible sur les dunes). */}
      <div
        className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex items-center justify-between !text-white label-mono text-[10px] tracking-[0.22em] pointer-events-none z-10"
        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.45), 0 0 12px rgba(0,0,0,0.25)' }}
      >
        <div className="flex items-center gap-3">
          <Icons.ArrowDown size={14} />
          <span>SCROLLEZ, VIDÉO · MOTION · PHOTO</span>
        </div>
        <div>EST. 2024 · PARIS · FR</div>
      </div>
    </section>
  );
}
