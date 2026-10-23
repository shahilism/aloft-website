import type { Feature } from '@aloft/content';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

/** Reference "difference" card: line icon, title, short copy. */
export function FeatureCard({ feature, delay = 0 }: { feature: Feature; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="card flex h-full flex-col p-6">
        <Icon name={feature.icon} size={30} strokeWidth={1.6} className="text-supply" />
        <h3 className="mt-8 text-[1.3125rem] leading-tight font-medium tracking-[-0.015em]">{feature.title}</h3>
        <p className="type-body mt-3 text-[0.9375rem]">{feature.body}</p>
      </div>
    </Reveal>
  );
}
