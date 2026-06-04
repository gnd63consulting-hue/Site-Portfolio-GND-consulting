/* GradientCardShowcase — SkewCards 21st.dev EXACT animation + GND warm gradients only
 *   Structure originale préservée : bg-dark parent, glass content white-subtle, button "Read More",
 *   margins m-[40px_30px], rounded-lg, animation blob 2s exact, hover slide/skew identique.
 *   Seul changement : 3 gradients warm GND (orange→cream / orange→walnut / cream→chocolate).
 */
import * as React from 'react';
import { Icons } from '../../refonte/icons';

export interface GradientCard {
  id: string;
  kicker?: string;
  title: string;
  sub?: string;
  body: string;
  icon: string;
  cta?: string;
  ctaHref?: string;
  gradientFrom: string;
  gradientTo: string;
}

interface GradientCardShowcaseProps {
  cards: readonly GradientCard[];
}

export function GradientCardShowcase({ cards }: GradientCardShowcaseProps) {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap py-10">
        {cards.map((c) => {
          const Ico = (Icons as any)[c.icon] || Icons.Check;
          return (
            <div
              key={c.id}
              className="group relative w-[320px] h-[400px] m-[40px_30px] transition-all duration-500"
            >
              {/* Skewed gradient panel — solid */}
              <span
                className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                style={{
                  background: `linear-gradient(315deg, ${c.gradientFrom}, ${c.gradientTo})`,
                }}
              />
              {/* Skewed gradient panel — blurred glow */}
              <span
                className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                style={{
                  background: `linear-gradient(315deg, ${c.gradientFrom}, ${c.gradientTo})`,
                }}
              />

              {/* Animated walnut blobs on hover — match original 2s anim, charte adapted */}
              <span className="pointer-events-none absolute inset-0 z-10">
                <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(42,24,16,0.10)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(42,24,16,0.10)] transition-all duration-500 gnd-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(42,24,16,0.10)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(42,24,16,0.10)] transition-all duration-500 gnd-blob gnd-blob-delay group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
              </span>

              {/* Glass content card — cream subtle on cream bg, walnut text (charte propre) */}
              <div className="relative z-20 left-0 p-[20px_40px] bg-[rgba(253,246,238,0.85)] backdrop-blur-[10px] shadow-[0_15px_35px_rgba(42,24,16,0.10)] rounded-lg text-text-strong transition-all duration-500 group-hover:left-[-25px] group-hover:p-[60px_40px] border border-text-strong/8">
                <span className="w-11 h-11 rounded-full bg-accent/15 text-accent-deep inline-flex items-center justify-center mb-4 shadow-sm">
                  <Ico size={20} />
                </span>
                {c.kicker && (
                  <div className="label-mono text-[10px] tracking-[0.22em] text-text-muted mb-2">
                    {c.kicker}
                  </div>
                )}
                <h2 className="display text-2xl text-accent mb-1 leading-tight">{c.title}</h2>
                {c.sub && (
                  <div className="label-mono text-[10px] tracking-[0.2em] text-accent-deep mb-3">
                    {c.sub}
                  </div>
                )}
                <p className="text-sm leading-relaxed mb-3 text-text">{c.body}</p>
                {c.cta && (
                  <a
                    href={c.ctaHref || '#'}
                    className="inline-block text-sm font-semibold text-bg bg-text-strong px-3 py-2 rounded hover:bg-text-muted transition-colors"
                  >
                    {c.cta}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes gnd-blob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .gnd-blob { animation: gnd-blob 2s ease-in-out infinite; }
        .gnd-blob-delay { animation-delay: -1s; }
      `}</style>
    </>
  );
}

export default GradientCardShowcase;
