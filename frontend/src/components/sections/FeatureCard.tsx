import type { Feature } from '@aloft/content';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

/** Reference "difference" card: line icon, title, short copy. */
export function FeatureCard({ feature, delay = 0 }: { feature: Feature; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="card flex h-full flex-col p-6 md:p-7">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice/70 text-supply">
          <Icon name={feature.icon} size={26} strokeWidth={1.8} />
        </div>
        <h3 className="mt-6 text-[1.25rem] font-semibold leading-snug tracking-[-0.015em] text-petrol sm:min-h-[3.25rem]">
          {feature.title}
        </h3>
        <p className="type-body mt-2.5 text-[0.9375rem] leading-relaxed">{feature.body}</p>
      </div>
    </Reveal>
  );
}
