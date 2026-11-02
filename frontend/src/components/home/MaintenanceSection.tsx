import { home } from '@aloft/content';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/cn';

/**
 * Section 9 — Maintenance & AMC.
 * Redesigned with balanced, equal-height aligned architecture.
 */
export function MaintenanceSection() {
  return (
    <section aria-labelledby="maintenance-title" className="section bg-white">
      <div className="container-page">
        <SectionHeader id="maintenance-title" {...home.maintenance} />

        <div className="mx-auto mt-12 grid max-w-[960px] items-stretch gap-6 md:mt-16 md:grid-cols-2 lg:gap-8">
          {home.maintenanceCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="h-full">
              <article
                className={cn(
                  'flex h-full flex-col justify-between rounded-[var(--radius-card)] p-7 transition-all duration-300 md:p-9',
                  c.highlighted
                    ? 'border-2 border-petrol bg-white shadow-[var(--shadow-card)] hover:shadow-lg'
                    : 'border border-ice bg-paper/60 hover:border-supply/40 hover:bg-paper',
                )}
              >
                <div>
                  {/* Aligned top row badge */}
                  <div className="flex h-7 items-center justify-between">
                    <span
                      className={cn(
                        'flex items-center gap-2 font-mono text-[0.75rem] font-medium tracking-[0.14em] uppercase',
                        c.highlighted ? 'text-supply' : 'text-muted',
                      )}
                    >
                      <Icon
                        name={c.highlighted ? 'amc' : 'inspection'}
                        size={16}
                        strokeWidth={1.75}
                        className={c.highlighted ? 'text-supply' : 'text-muted'}
                      />
                      {c.label}
                    </span>
                    {c.highlighted ? (
                      <span className="rounded-full bg-supply/10 px-2.5 py-0.5 font-mono text-[0.6875rem] font-medium tracking-wide text-supply">
                        Recommended
                      </span>
                    ) : (
                      <span className="font-mono text-[0.6875rem] tracking-wide text-muted/70 uppercase">
                        Single audit
                      </span>
                    )}
                  </div>

                  {/* Title & summary */}
                  <h3 className="mt-6 text-[1.375rem] font-semibold leading-snug tracking-[-0.015em] text-petrol md:text-[1.5rem]">
                    {c.title}
                  </h3>
                  <p className="type-body mt-2.5 leading-relaxed">{c.body}</p>

                  {/* Deliverables Checklist */}
                  <div className="mt-7 border-t border-petrol/10 pt-6">
                    <p className="font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-muted">
                      Scope covered:
                    </p>
                    <ul className="mt-3.5 space-y-3">
                      {c.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[0.875rem] text-petrol/90">
                          <Icon name="check-circle" size={18} className="mt-0.5 shrink-0 text-supply" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="mt-8 border-t border-petrol/10 pt-6">
                  <ButtonLink
                    href={c.cta.href}
                    variant={c.highlighted ? 'primary' : 'secondary'}
                    fullWidth
                  >
                    {c.cta.label}
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
