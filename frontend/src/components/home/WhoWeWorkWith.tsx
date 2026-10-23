import { home } from '@aloft/content';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

const sectorIcons: IconName[] = ['office', 'coworking', 'education', 'hospitality', 'retail', 'building'];
const audienceIcons: IconName[] = ['coordination', 'building', 'calendar'];

/**
 * Section 10 — "Who we work with" stands in for client testimonials until
 * real, approved stories exist (content draft). Audience messages come from
 * the brand guideline and are presented as ALOFT's own words, not quotes.
 */
export function WhoWeWorkWith() {
  return (
    <section aria-labelledby="clients-title" className="section">
      <div className="container-page">
        <SectionHeader id="clients-title" {...home.whoWeWorkWith} />

        <Reveal className="mt-12 md:mt-16">
          <h3 className="sr-only">Target applications</h3>
          <ul className="flex flex-wrap gap-3">
            {home.sectors.map((s, i) => (
              <li key={s} className="flex items-center gap-2.5 rounded-full border border-ice bg-white py-2.5 pr-5 pl-3 text-[0.9375rem] shadow-[var(--shadow-card)]">
                <span className="grid size-8 place-items-center rounded-full bg-ice text-petrol">
                  <Icon name={sectorIcons[i] ?? 'building'} size={17} strokeWidth={1.8} />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {home.audiences.map((a, i) => (
            <li key={a.audience}>
              <Reveal delay={i * 0.06} className="card flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-petrol text-paper">
                    <Icon name={audienceIcons[i]} size={20} />
                  </span>
                  <p className="type-label text-[0.75rem] text-muted">For {a.audience.toLowerCase()}</p>
                </div>
                <p className="mt-6 text-[1.375rem] leading-[1.2] font-medium tracking-[-0.015em]">{a.message}</p>
                <p className="type-body mt-auto pt-6 text-[0.875rem]">{a.focus}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
