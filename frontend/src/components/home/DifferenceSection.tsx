import { home } from '@aloft/content';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

const SPEC_TAGS = [
  'System selection',
  'Site coordination',
  'Service access',
  'Lifecycle value',
];

/**
 * Section 7 — The ALOFT difference.
 * Redesigned as an architectural ruled ledger: zero generic card boxes,
 * crisp hairline rules, floating line icons, and refined typography.
 */
export function DifferenceSection() {
  return (
    <section aria-labelledby="difference-title" className="section bg-white">
      <div className="container-page">
        <SectionHeader id="difference-title" {...home.difference} />

        <Reveal delay={0.12} className="mt-12 md:mt-16">
          <div className="border-y border-petrol/15">
            <ul className="grid grid-cols-1 divide-y divide-petrol/15 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
              {home.differenceItems.map((f, i) => (
                <li
                  key={f.title}
                  className="group relative flex flex-col justify-between p-6 transition-colors duration-300 hover:bg-ice/30 sm:p-7 lg:p-8"
                >
                  {/* Subtle top hairline accent that expands on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-0.5 w-8 bg-petrol/20 transition-all duration-500 ease-out group-hover:w-full group-hover:bg-supply"
                  />

                  <div>
                    {/* Header: technical step numeral + bare floating icon */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.8125rem] font-medium tracking-[0.16em] text-muted transition-colors duration-300 group-hover:text-supply">
                        [{String(i + 1).padStart(2, '0')}]
                      </span>
                      <Icon
                        name={f.icon}
                        size={24}
                        strokeWidth={1.5}
                        className="text-petrol/60 transition-colors duration-300 group-hover:text-supply"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mt-7 text-[1.2rem] font-semibold leading-snug tracking-[-0.015em] text-petrol transition-transform duration-300 group-hover:translate-x-0.5">
                      {f.title}
                    </h3>

                    {/* Body */}
                    <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted">
                      {f.body}
                    </p>
                  </div>

                  {/* Bottom micro-spec metadata */}
                  <div className="mt-8 border-t border-dashed border-petrol/10 pt-4">
                    <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-supply/90">
                      {SPEC_TAGS[i] ?? 'Standard'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
