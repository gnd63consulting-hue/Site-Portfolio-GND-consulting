/* FlippingCard — hover rotateY 180° flip card.
 * Adaptable charte (couleurs front/back via props frontClassName / backClassName).
 */
import React from 'react';
import { cn } from '@/lib/utils';

interface FlippingCardProps {
  className?: string;
  height?: number;
  width?: number;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
  frontClassName?: string;
  backClassName?: string;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  frontClassName,
  backClassName,
  height = 320,
  width = 300,
}: FlippingCardProps) {
  return (
    <div
      className="group/flipping-card [perspective:1200px]"
      style={
        {
          '--height': `${height}px`,
          '--width': `${width}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'relative rounded-[56px] transition-all duration-700 [transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)]',
          'h-[var(--height)] w-[var(--width)]',
          className
        )}
      >
        {/* Front Face */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full rounded-[inherit] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)]',
            frontClassName
          )}
        >
          <div className="[transform:translateZ(60px)_scale(.94)] h-full w-full">
            {frontContent}
          </div>
        </div>
        {/* Back Face */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full rounded-[inherit] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)]',
            backClassName
          )}
        >
          <div className="[transform:translateZ(60px)_scale(.94)] h-full w-full">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}
