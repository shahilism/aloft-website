import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Infinite horizontal scroller (CSS only). Content is rendered twice; the
 * copy is hidden from assistive technology. Pauses on hover and stops for
 * reduced motion via the global stylesheet.
 */
export function Marquee({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  return (
    <div className={cn('mask-fade-x overflow-hidden', className)} role="region" aria-label={label}>
      <div className="flex w-max animate-marquee gap-14 pr-14 hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center gap-14">{children}</div>
        <div className="flex shrink-0 items-center gap-14" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
