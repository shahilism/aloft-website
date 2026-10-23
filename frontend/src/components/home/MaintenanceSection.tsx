import { home } from '@aloft/content';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/cn';

/**
 * Section 9 — the template's two pricing cards, kept as enquiry-led service
 * options. No prices are published (content draft).
 */
export function MaintenanceSection() {
  return (
    <section aria-labelledby="maintenance-title" className="section bg-white">
      <div className="container-page">
        <SectionHeader id="maintenance-title" {...home.maintenance} />
        <div className="mx-auto mt-12 grid max-w-[760px] items-end gap-5 md:mt-16 md:grid-cols-2">
          {home.maintenanceCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <article
                className={cn(
                  'overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)]',
                  c.highlighted ? 'border-2 border-petrol' : 'border border-ice',
                )}
              >
                {c.highlighted && (
                  <p className="type-label flex items-center justify-center gap-2 bg-petrol py-3 text-[0.75rem] text-paper">
                    <Icon name="calendar" size={14} strokeWidth={2} />
                    {c.label}
                  </p>
                )}
                <div className="p-6">
                  {!c.highlighted && <p className="type-label mb-4 text-[0.75rem] text-muted">{c.label}</p>}
                  <h3 className={cn('type-title', c.highlighted && 'text-supply')}>{c.title}</h3>
                  <p className="type-body mt-3 min-h-[4.8em]">{c.body}</p>
                  <ButtonLink href={c.cta.href} variant="secondary" fullWidth className="mt-6">
                    {c.cta.label}
                  </ButtonLink>
                  <ul className="mt-8 space-y-3 text-[0.9375rem]">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <Icon name="check-circle" size={20} className="shrink-0 text-supply" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
