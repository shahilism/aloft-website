import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: string;
  tone?: 'copper' | 'paper' | 'supply';
  className?: string;
}

/**
 * Section heading hook / kicker:
 * Ultra-compact architectural badge with a subtle indicator dot
 * and precision-tracked monospace typography.
 */
export function Eyebrow({ children, tone = 'copper', className }: EyebrowProps) {
  const isDark = tone === 'paper';
  const isCopper = tone === 'copper';

  return (
    <div className={cn('inline-flex items-center', className)}>
      <span
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 transition-all duration-200 sm:px-4',
          isDark
            ? 'border border-white/20 bg-white/10 text-paper'
            : 'border border-petrol/10 bg-white/90 text-petrol shadow-[0_1px_2px_rgba(10,52,66,0.03)] backdrop-blur-xs hover:border-supply/40',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'size-1 rounded-full ring-2',
            isDark
              ? 'bg-supply ring-supply/40'
              : isCopper
                ? 'bg-copper ring-copper/25'
                : 'bg-supply ring-supply/25',
          )}
        />
        <span className="font-mono text-[0.5rem] font-semibold leading-none tracking-[0.18em] uppercase sm:text-[0.5625rem]">
          {children}
        </span>
      </span>
    </div>
  );
}
