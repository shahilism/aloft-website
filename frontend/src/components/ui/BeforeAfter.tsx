'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProjectImage } from '@aloft/content';
import { cn } from '@/lib/cn';
import { Icon } from './Icon';

interface BeforeAfterProps {
  before: ProjectImage;
  after: ProjectImage;
  sizes: string;
  className?: string;
  priority?: boolean;
}

/**
 * Before/after comparison slider from the reference template. A native
 * range input drives it, so it works with keyboard, touch and screen readers.
 */
export function BeforeAfter({ before, after, sizes, className, priority }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  return (
    <div className={cn('relative overflow-hidden rounded-[var(--radius-media)] bg-ice select-none', className)}>
      <Image src={after.url} alt={after.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.url} alt={before.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      <span className="type-label absolute top-3 left-3 rounded-full bg-petrol/80 px-2.5 py-1.5 text-[0.6875rem] text-paper">Before</span>
      <span className="type-label absolute top-3 right-3 rounded-full bg-petrol/80 px-2.5 py-1.5 text-[0.6875rem] text-paper">After</span>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-white text-petrol shadow">
          <Icon name="drag" size={18} strokeWidth={2} />
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        aria-valuetext={`${pos}% before`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
