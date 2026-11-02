import { home } from '@aloft/content';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

const sectorIcons: IconName[] = ['office', 'coworking', 'education', 'hospitality', 'retail', 'building'];
const audienceIcons: IconName[] = ['coordination', 'building', 'calendar'];

/**
 * Section 10 — "Who we work with".
 * Aligned architectural layout with sector ribbon and stakeholder pillars.
 */
export function WhoWeWorkWith() {
  return (
    <section aria-labelledby="clients-title" className="section">
      <div className="container-page">
        <SectionHeader id="clients-title" {...home.whoWeWorkWith} />

        {/* Minimal sector ribbon / target applications */}
        <Reveal delay={0.08} className="mt-10 md:mt-14">
          <div className="rounded-2xl border border-petrol/10 bg-ice/30 p-2 sm:p-2.5">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between px-3 py-2">
              <span className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-muted">
                Target applications:
              </span>
              <ul className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {home.sectors.map((s, i) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full border border-petrol/10 bg-white/80 px-3 py-1 text-[0.8125rem] text-petrol transition-colors hover:border-supply/40 hover:bg-white"
                  >
                    <Icon
                      name={sectorIcons[i] ?? 'building'}
                      size={14}
                      strokeWidth={1.75}
                      className="text-supply"
                    />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* 3 Stakeholder Columns (Aligned Equal-Height Cards) */}
        <div className="mt-6 md:mt-8 grid gap-6 md:grid-cols-3 items-stretch">
          {home.audiences.map((a, i) => (
            <Reveal key={a.audience} delay={i * 0.08} className="h-full">
              <article className="card group flex h-full flex-col justify-between p-7 md:p-8 transition-all duration-300 hover:border-supply/40 hover:shadow-lg">
                <div>
                  {/* Top metadata row with index and bare floating icon */}
                  <div className="flex items-center justify-between border-b border-petrol/10 pb-5">
                    <span className="flex items-center gap-2.5 font-mono text-[0.75rem] font-medium tracking-[0.12em] uppercase text-muted">
                      <span className="text-supply">[{String(i + 1).padStart(2, '0')}]</span>
                      {a.audience}
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-xl bg-ice/60 text-supply group-hover:bg-supply group-hover:text-white transition-colors duration-300">
                      <Icon name={audienceIcons[i] ?? 'building'} size={18} strokeWidth={1.75} />
                    </span>
                  </div>

                  {/* Core Axiom / Quote */}
                  <p className="mt-6 text-[1.25rem] font-semibold leading-[1.25] tracking-[-0.015em] text-petrol md:text-[1.375rem]">
                    &ldquo;{a.message}&rdquo;
                  </p>

                  {/* Focus narrative */}
                  <p className="type-body mt-3 text-[0.875rem] leading-relaxed">
                    {a.focus}
                  </p>
                </div>

                {/* Bottom micro-tags */}
                <div className="mt-8 border-t border-petrol/10 pt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {a.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-paper px-2 py-0.5 font-mono text-[0.6875rem] text-muted transition-colors group-hover:text-petrol"
                      >
                        {tag}
                      </span>
                    )) ?? null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
