import { home } from '@aloft/content';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

const { whoWeAre, proofPoints } = home;

/**
 * Sections 3 and 4 — intro left, statement right, and compact feature belt.
 * Scaled so the entire section and feature belt fit comfortably in the screen.
 */
export function WhoWeAre() {
  return (
    <section aria-labelledby="who-title" className="py-8 md:py-12 lg:py-14">
      <div className="container-page">
        <Reveal>
          <Eyebrow className="mb-3 md:mb-4">{whoWeAre.eyebrow}</Eyebrow>
          <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-8 lg:gap-10">
            <div className="md:col-span-5">
              <h2 id="who-title" className="text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.03em] text-petrol md:text-[2.25rem] lg:text-[2.5rem]">
                {whoWeAre.title}
              </h2>
              <p className="type-body mt-3 max-w-md">{whoWeAre.body}</p>
              <div className="mt-4 md:mt-5">
                <ButtonLink href={whoWeAre.button.href} variant="secondary">
                  {whoWeAre.button.label}
                </ButtonLink>
              </div>
            </div>
            <div className="md:col-span-7 md:border-l md:border-petrol/15 md:pl-8 lg:pl-10">
              <p className="text-[1.375rem] font-medium leading-[1.3] tracking-[-0.02em] text-supply md:text-[1.625rem] lg:text-[1.75rem]">
                {whoWeAre.statement}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-8 md:mt-10">
          <div className="rounded-2xl border border-petrol/10 bg-ice/40 p-2 sm:p-2.5">
            <ul className="grid grid-cols-1 divide-y divide-petrol/10 sm:grid-cols-2 sm:divide-y-0 sm:gap-2 lg:grid-cols-4 lg:divide-x lg:divide-petrol/10 lg:gap-0">
              {proofPoints.map((p) => (
                <li
                  key={p.title}
                  className="flex items-center gap-3 p-2.5 transition-colors duration-200 hover:bg-white/60 sm:rounded-xl lg:px-3.5 lg:py-2.5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-supply shadow-xs ring-1 ring-petrol/5">
                    <Icon name={p.icon} size={16} strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[0.875rem] font-semibold tracking-[-0.01em] text-petrol leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-0.5 text-[0.75rem] leading-tight text-muted">
                      {p.body}
                    </p>
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
