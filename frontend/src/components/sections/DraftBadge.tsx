import { cn } from '@/lib/cn';

/** Shown only when the API exposes unpublished drafts for local layout preview. */
export function DraftBadge({ className }: { className?: string }) {
  return (
    <span className={cn('type-label rounded-full border border-dashed border-petrol/40 bg-ice px-3 py-1.5 text-[0.6875rem] text-petrol', className)}>
      Draft template — not published
    </span>
  );
}
