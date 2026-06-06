/* ShuffleCards — Pile draggable 3 cartes pour HumanAiBlock.
 * Charte GND (cream + chocolate + accent orange).
 * Anim originale conservée : rotate/translate/zIndex par position + drag horizontal pour shuffle.
 */
'use client';

import * as React from 'react';
import { motion, type PanInfo } from 'framer-motion';

type Position = 'front' | 'middle' | 'back';

export type ShuffleCardData = {
  id: number;
  kicker: string;
  title: string;
  body: string;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
};

type ShuffleCardProps = ShuffleCardData & {
  position: Position;
  handleShuffle: () => void;
};

export function ShuffleCard({
  handleShuffle,
  kicker,
  title,
  body,
  Icon,
  position,
  id,
}: ShuffleCardProps) {
  const dragStartX = React.useRef(0);
  const isFront = position === 'front';

  return (
    <motion.div
      style={{
        zIndex: position === 'front' ? 3 : position === 'middle' ? 2 : 1,
      }}
      animate={{
        rotate:
          position === 'front'
            ? '-5deg'
            : position === 'middle'
              ? '0deg'
              : '5deg',
        x:
          position === 'front'
            ? '0%'
            : position === 'middle'
              ? '8%'
              : '16%',
        y:
          position === 'front'
            ? '0%'
            : position === 'middle'
              ? '4%'
              : '8%',
      }}
      drag={isFront}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(_e, info) => {
        dragStartX.current = info.point.x;
      }}
      onDragEnd={(_e, info: PanInfo) => {
        if (dragStartX.current - info.point.x > 120) {
          handleShuffle();
        }
        dragStartX.current = 0;
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'absolute left-0 top-0 flex h-[470px] w-[min(80vw,360px)] flex-col select-none gap-5 rounded-[28px] p-6 sm:p-8 shadow-2xl shadow-[#2A1810]/15',
        'bg-[#FDF6EE] text-[#2A1810] border border-[#E8D8C5]',
        'ring-1 ring-[#FF954F]/35',
        isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none',
      ].join(' ')}
    >
      {Icon && (
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FF954F]/15 text-[#532418]">
          <Icon size={22} />
        </span>
      )}
      <span className="label-mono text-[10px] tracking-[0.22em] uppercase text-[#7D3E2C]">
        {kicker}
      </span>
      <h3 className="display text-2xl md:text-[28px] text-[#2A1810] leading-tight">
        {title}
      </h3>
      <p className="text-sm md:text-base leading-relaxed text-[#532418]">
        {body}
      </p>
      <div className="mt-auto flex items-center justify-between pt-2 text-[10px] tracking-[0.18em] uppercase">
        <span className="text-[#7D3E2C]/70">— Carte {id}/3</span>
        {isFront && (
          <span className="text-[#FF954F] inline-flex items-center gap-1">
            <span aria-hidden>←</span> Glissez
          </span>
        )}
      </div>
    </motion.div>
  );
}

type ShuffleCardsProps = {
  cards: ShuffleCardData[];
  className?: string;
};

export function ShuffleCards({ cards, className = '' }: ShuffleCardsProps) {
  const [positions, setPositions] = React.useState<Position[]>([
    'front',
    'middle',
    'back',
  ]);

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
  };

  return (
    <div className={`relative h-[490px] w-[min(92vw,420px)] max-w-full mx-auto ${className}`}>
      {cards.map((card, index) => (
        <ShuffleCard
          key={card.id}
          {...card}
          position={positions[index]}
          handleShuffle={handleShuffle}
        />
      ))}
    </div>
  );
}
