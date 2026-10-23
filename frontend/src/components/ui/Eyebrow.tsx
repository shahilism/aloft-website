import { cn } from '@/lib/cn';

/**
 * Section label: JetBrains Mono, uppercase, tracked (brand board 07),
 * bracketed as in the reference template — "[ OUR SERVICES ]".
 */
export function Eyebrow({ children, tone = 'copper', className }: { children: string; tone?: 'copper' | 'paper'; className?: string }) {
  return (
    <p className={cn('type-label', tone === 'copper' ? 'text-copper' : 'text-ice', className)}>
      <span aria-hidden="true">[ </span>
      {children}
      <span aria-hidden="true"> ]</span>
    </p>
  );
}
