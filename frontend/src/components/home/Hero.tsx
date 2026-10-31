import Image from 'next/image';
import { home } from '@aloft/content';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

const { hero } = home;

/** Section 1 — headline left, supporting copy and actions right, wide photo below. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-10 pb-16 md:pt-16 md:pb-20">
      <div className="container-page">
        <div className="animate-rise">
          <Eyebrow className="mb-5">{hero.eyebrow}</Eyebrow>
          <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-10">
            <div className="md:col-span-7">
              <h1 id="hero-title" className="type-display">
                {hero.titleLead}
                <span className="text-supply">{hero.titleAccent}</span>
                {hero.titleEnd}
              </h1>
            </div>
            <div className="md:col-span-5 md:pt-2">
              <p className="text-[1.0625rem] leading-snug font-medium md:max-w-[26rem]">{hero.subtitle}</p>
              <p className="type-body mt-3 md:max-w-[26rem]">{hero.body}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={hero.primary.href} variant="primary">
                  {hero.primary.label}
                </ButtonLink>
                <ButtonLink href={hero.secondary.href} variant="outline" icon="arrow-right">
                  {hero.secondary.label}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page mt-10 md:mt-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] sm:aspect-[16/9] lg:aspect-[2.5/1]">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="(min-width: 1200px) 1120px, calc(100vw - 40px)"
            className="object-cover object-[50%_45%]"
          />
        </div>
      </div>
    </section>
  );
}
