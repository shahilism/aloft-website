import Image from 'next/image';
import { about } from '@aloft/content';
import { CtaBand } from '@/components/sections/CtaBand';
import { FeatureCard } from '@/components/sections/FeatureCard';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: about.seoTitle, description: about.metaDescription, path: '/about' });

/**
 * About (content draft, page 2). The template's awards and team sections
 * are omitted until real, verified people and credentials are supplied.
 */
export default function AboutPage() {
  const { hero, journey, values } = about;
  return (
    <>
      <PageHero
        title={
          <>
            {hero.titleLead}
            <span className="text-supply">{hero.titleAccent}</span>
            {hero.titleEnd}
          </>
        }
        body={hero.body}
      />

      <section aria-labelledby="journey-title" className="pb-16 md:pb-24">
        <div className="container-page">
          <SectionHeader id="journey-title" eyebrow={journey.eyebrow} title={journey.title} body={journey.lead} />
          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-start">
            <Reveal className="md:col-span-6">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
                <Image
                  src={journey.image.src}
                  alt={journey.image.alt}
                  fill
                  sizes="(min-width: 768px) 540px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-6 md:pl-6">
              <h3 className="type-title">{journey.subtitle}</h3>
              <p className="type-body mt-4">{journey.body}</p>
              <dl className="mt-8 divide-y divide-ice border-t border-ice">
                <div className="grid gap-2 py-5 sm:grid-cols-[140px_1fr]">
                  <dt className="type-label pt-1 text-[0.75rem] text-copper">Our mission</dt>
                  <dd className="text-[0.9375rem]">{about.mission}</dd>
                </div>
                <div className="grid gap-2 py-5 sm:grid-cols-[140px_1fr]">
                  <dt className="type-label pt-1 text-[0.75rem] text-copper">Our vision</dt>
                  <dd className="text-[0.9375rem]">{about.vision}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="section bg-white">
        <div className="container-page">
          <SectionHeader id="values-title" eyebrow={values.eyebrow} title={values.title} body={values.body} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {about.valueItems.map((v, i) => (
              <li key={v.title}>
                <FeatureCard feature={v} delay={i * 0.06} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={about.cta.title} body={about.cta.body} />
    </>
  );
}
