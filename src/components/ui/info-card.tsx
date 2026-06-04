/* InfoCard — premium "wow" card pattern.
 *
 * Layered effects (all preserved on top of the original 21st.dev base) :
 *   1. Rotating conic-gradient border driven by cursor angle (original signature)
 *   2. Title clip-path slide-in highlight on hover (original signature)
 *   3. Giant outline number as background watermark (Linear/Vercel style)
 *   4. Conic mesh gradient warm orange swirl as bg layer (replaces flat cream)
 *   5. 3D mouse-tracked tilt with perspective (Aceternity style)
 *   6. Lift on hover with deep warm orange drop-shadow
 *   7. Icon badge top-right with continuous pulse ring
 *   8. Entrance stagger reveal (scale + y + opacity)
 *   9. Body fade-in slide stagger
 *  10. Cursor-aware spotlight glow (mask-revealed border + fill)
 */
'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export interface InfoCardProps {
  n: string;
  title: string;
  description: string;
  /** Index dans la grille pour stagger entrance */
  index?: number;
  /** Composant icône lucide (taille 22 par défaut) — badge top-right */
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  /** Couleur accent — défaut orange GND */
  accentColor?: string;
  /** Couleur statique du reste du border conic */
  borderBgColor?: string;
  /** Fond carte */
  cardBgColor?: string;
  /** Couleur texte body */
  textColor?: string;
  /** Couleur texte titre au hover */
  hoverTextColor?: string;
  className?: string;
}

export function InfoCard({
  n,
  title,
  description,
  index = 0,
  icon: Icon,
  accentColor = '#FF954F',
  borderBgColor = 'rgba(42,24,16,0.12)',
  cardBgColor = '#FDF6EE',
  textColor = '#2A1810',
  hoverTextColor = '#FDF6EE',
  className,
}: InfoCardProps) {
  const [hovered, setHovered] = React.useState(false);
  const borderRef = React.useRef<HTMLDivElement>(null);

  // 3D tilt mouse-tracked
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = borderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    // Tilt normalized to [-0.5, 0.5]
    mx.set(cx / rect.width - 0.5);
    my.set(cy / rect.height - 0.5);
    // Conic rotation angle for border
    const dx = cx - rect.width / 2;
    const dy = cy - rect.height / 2;
    const angle = Math.atan2(dy, dx);
    el.style.setProperty('--rotation', `${angle}rad`);
    // Spotlight position
    el.style.setProperty('--spot-x', `${cx}px`);
    el.style.setProperty('--spot-y', `${cy}px`);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
    if (borderRef.current) {
      borderRef.current.style.setProperty('--rotation', '0deg');
    }
  };

  const borderGradient = `conic-gradient(from var(--rotation,0deg), ${accentColor} 0deg, ${accentColor} 90deg, ${borderBgColor} 90deg, ${borderBgColor} 360deg)`;

  return (
    <motion.div
      ref={borderRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        transition: { type: 'spring', stiffness: 260, damping: 20 },
      }}
      className={cn(
        'group relative flex items-center justify-center cursor-pointer select-none',
        className,
      )}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1400,
        border: '2px solid transparent',
        borderRadius: '1.25em',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        backgroundImage: `linear-gradient(${cardBgColor}, ${cardBgColor}), ${borderGradient}`,
        padding: 10,
        boxSizing: 'border-box',
        minHeight: 400,
        boxShadow: hovered
          ? '0 30px 60px rgba(255,149,79,0.32), 0 8px 24px rgba(42,24,16,0.18)'
          : '0 6px 20px rgba(42,24,16,0.10)',
        transition: 'box-shadow 0.4s ease',
      } as React.CSSProperties}
    >
      <div
        className="relative flex flex-col w-full h-full overflow-hidden"
        style={{
          background: cardBgColor,
          borderRadius: '1em',
        }}
      >
        {/* Conic mesh gradient warm bg — replaces flat fill */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 20% 15%, rgba(255,149,79,0.10), transparent 60%),
              radial-gradient(ellipse 50% 60% at 85% 85%, rgba(255,149,79,0.07), transparent 60%),
              radial-gradient(ellipse 70% 40% at 50% 100%, rgba(212,165,42,0.06), transparent 70%)
            `,
          }}
        />

        {/* Giant outline number watermark — sits behind content */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-4 -right-2 select-none"
          style={{
            fontSize: 240,
            fontFamily: 'serif',
            fontWeight: 700,
            lineHeight: 0.78,
            color: 'transparent',
            WebkitTextStroke: `1.5px ${accentColor}33`,
            opacity: hovered ? 0.85 : 0.5,
            transition: 'opacity 0.5s ease',
          }}
        >
          {n}
        </div>

        {/* Cursor-aware spotlight border (mask trick) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            borderRadius: '1em',
            background: `radial-gradient(circle 320px at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,149,79,0.55), transparent 50%)`,
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '2px',
          }}
        />

        {/* Inner spotlight glow (fill) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,149,79,0.12), transparent 60%)`,
          }}
        />

        {/* Content layer — z-translate for parallax */}
        <div
          className="relative z-10 flex flex-col w-full h-full p-7 md:p-8"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* Top row : small accent badge with N + icon top-right */}
          <div className="flex items-start justify-between mb-7">
            <motion.span
              className="num-display leading-none tabular-nums"
              style={{
                fontSize: 44,
                color: accentColor,
                textShadow: hovered
                  ? `0 0 22px ${accentColor}80`
                  : `0 0 0 ${accentColor}00`,
                transition: 'text-shadow 0.4s ease',
              }}
            >
              {n}
            </motion.span>

            {Icon && (
              <div className="relative">
                {/* Pulse ring under icon */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{ background: `${accentColor}30` }}
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: index * 0.3,
                  }}
                />
                <motion.span
                  className="relative inline-flex items-center justify-center rounded-full"
                  style={{
                    width: 44,
                    height: 44,
                    background: hovered ? accentColor : `${accentColor}1A`,
                    color: hovered ? cardBgColor : accentColor,
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  whileHover={{ rotate: 12, scale: 1.08 }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 16,
                  }}
                >
                  <Icon size={20} />
                </motion.span>
              </div>
            )}
          </div>

          {/* Title with clip-path slide highlight */}
          <h3
            className="display relative overflow-hidden mb-5 leading-tight"
            style={{
              fontSize: 24,
              color: hovered ? hoverTextColor : textColor,
              transition: 'color 0.3s ease',
            }}
          >
            <span
              className="relative inline-block"
              style={{
                zIndex: 10,
                padding: '2px 4px',
              }}
            >
              {title}
            </span>
            <span
              aria-hidden
              style={{
                clipPath: hovered
                  ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
                  : 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
                transformOrigin: 'center',
                transition: 'all cubic-bezier(.1,.5,.5,1) 0.5s',
                position: 'absolute',
                left: -4,
                right: -4,
                top: -4,
                bottom: -4,
                zIndex: 0,
                backgroundColor: accentColor,
              }}
            />
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mt-auto"
            style={{ color: textColor, opacity: 0.78 }}
          >
            {description}
          </p>

          {/* Animated bottom accent bar */}
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-7 right-7 h-[2px] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: accentColor,
              transformOrigin: 'left',
              boxShadow: `0 0 12px ${accentColor}99`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
