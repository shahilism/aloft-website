import { home, servicesByOrder } from '@aloft/content';
import { Icon } from '@/components/ui/Icon';
import { Marquee } from '@/components/ui/Marquee';

/**
 * Section 2 — replaces the template's "Trusted by 20+ companies" logo row
 * with ALOFT's verified service pillars (no unverified client claims).
 */
export function TrustStrip() {
  return (
    <section aria-label={home.trustStrip.title} className="pb-16 md:pb-24">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
        <div className="shrink-0">
          <p className="text-[1.375rem] leading-[1.1] font-medium tracking-[-0.02em]">{home.trustStrip.title}</p>
          <p className="type-label mt-2 text-muted">{home.trustStrip.pillars.join(' · ')}</p>
        </div>
        <Marquee label="ALOFT services" className="min-w-0 flex-1">
          {servicesByOrder.map((s) => (
            <span key={s.slug} className="flex items-center gap-3 whitespace-nowrap text-[1.0625rem] text-muted">
              <Icon name={s.icon} size={26} strokeWidth={1.6} className="text-supply" />
              {s.name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
