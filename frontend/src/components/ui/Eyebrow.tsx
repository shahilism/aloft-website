import { cn } from '@/lib/cn';

interface EyebrowProps {
  children: string;
  tone?: 'copper' | 'paper' | 'supply';
  className?: string;
}

/**
 * Section heading hook / kicker:
 * Sleek, minimal architectural badge with a precision indicator dot
 * and tracked monospace typography. Replaces legacy bracketed raw text.
 */
export function Eyebrow({ children, tone = 'copper', className }: EyebrowProps) {
  const isDark = tone === 'paper';
  const isCopper = tone === 'copper';

  return (
    <div className={cn('inline-flex items-center', className)}>
      <span
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-3 py-1 transition-all duration-200',
          isDark
            ? 'border border-white/20 bg-white/10 text-paper'
            : 'border border-petrol/10 bg-white/90 text-petrol shadow-[0_1px_2px_rgba(10,52,66,0.04)] backdrop-blur-xs hover:border-supply/40',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'size-1.5 rounded-full ring-2',
            isDark
              ? 'bg-supply ring-supply/40'
              : isCopper
                ? 'bg-copper ring-copper/25'
                : 'bg-supply ring-supply/25',
          )}
        />
        <span className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase sm:text-[0.75rem]">
          {children}
        </span>
      </span>
    </div>
  );
}
