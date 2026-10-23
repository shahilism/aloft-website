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
        <Reveal className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow className="mb-4">{whoWeAre.eyebrow}</Eyebrow>
            <h2 id="who-title" className="type-headline">
              {whoWeAre.title}
            </h2>
            <p className="type-body mt-5 max-w-md">{whoWeAre.body}</p>
            <div className="mt-7">
              <ButtonLink href={whoWeAre.button.href} variant="secondary">
                {whoWeAre.button.label}
              </ButtonLink>
            </div>
          </div>
          <p className="text-[1.625rem] leading-[1.2] font-medium tracking-[-0.02em] text-supply md:col-span-7 md:pl-8 md:text-[2rem]">
            {whoWeAre.statement}
          </p>
        </Reveal>

        <div className="mt-14 border-t border-dashed border-petrol/20 pt-12 md:mt-20">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.06} className="flex flex-col">
                  <Icon name={p.icon} size={28} strokeWidth={1.6} className="text-supply" />
                  <p className="mt-4 text-[1.75rem] leading-none font-semibold tracking-[-0.03em] text-supply">{p.title}</p>
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
