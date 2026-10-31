import { home } from '@aloft/content';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

const { whoWeAre, proofPoints } = home;

/**
 * Sections 3 and 4 — intro left, statement right, then four proof points
 * in place of the template's invented statistics.
 */
export function WhoWeAre() {
  return (
    <section aria-labelledby="who-title" className="pb-16 md:pb-24">
      <div className="container-page">
        <Reveal>
          <Eyebrow className="mb-5">{whoWeAre.eyebrow}</Eyebrow>
          <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-12">
            <div className="md:col-span-5">
              <h2 id="who-title" className="type-headline">
                {whoWeAre.title}
              </h2>
              <p className="type-body mt-5">{whoWeAre.body}</p>
              <div className="mt-7">
                <ButtonLink href={whoWeAre.button.href} variant="secondary">
                  {whoWeAre.button.label}
                </ButtonLink>
              </div>
            </div>
            <div className="md:col-span-7 md:border-l md:border-petrol/15 md:pt-1 md:pl-10 lg:pl-12">
              <p className="text-[1.5rem] leading-[1.3] font-medium tracking-[-0.02em] text-supply md:text-[1.875rem] lg:text-[2rem]">
                {whoWeAre.statement}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 border-t border-dashed border-petrol/20 pt-12 md:mt-20">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.06} className="flex h-full flex-col">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ice/60 text-supply">
                    <Icon name={p.icon} size={24} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-5 text-[1.25rem] leading-snug font-semibold tracking-[-0.02em] text-petrol sm:min-h-[3rem]">
                    {p.title}
                  </h3>
                  <p className="type-body mt-2">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
