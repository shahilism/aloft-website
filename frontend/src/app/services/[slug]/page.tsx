import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getService, processSteps, serviceSlugToEnquiry, services, servicesByOrder } from '@aloft/content';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/structured-data';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: service.image.src,
  });
}

/** Service detail (content draft, page 4): one layout for all five services. */
export default async function ServicePage({ params }: { params: Params }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const related = servicesByOrder.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.h1}
        body={service.summary}
        button={{ label: service.cta, href: '#enquiry' }}
      />

      <div className="container-wide">
        <div className="animate-rise [animation-delay:120ms]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] sm:aspect-[16/9] lg:aspect-[2.2/1]">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              priority
              sizes="(min-width: 1440px) 1360px, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3" aria-labelledby="covers-title">
            <Reveal className="lg:sticky lg:top-28">
              <h2 id="covers-title" className="text-[1.375rem] font-medium tracking-[-0.015em]">
                What we cover
              </h2>
              <ul className="mt-5 space-y-2">
                {service.covers.map((c) => (
                  <li key={c} className="flex gap-3 rounded-lg bg-ice/70 px-3 py-2.5 text-[0.9375rem]">
                    <Icon name="check-circle" size={20} className="mt-px shrink-0 text-supply" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>

          <div className="lg:col-span-7 lg:col-start-5">
            <Reveal>
              <h2 className="type-headline">{service.name}</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted md:text-lg">{service.intro}</p>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="type-title">How we deliver it</h2>
              <ol className="mt-6 divide-y divide-ice border-y border-ice">
                {processSteps.map((step, i) => (
                  <li key={step.title} className="grid gap-2 py-5 sm:grid-cols-[56px_1fr]">
                    <span className="type-label pt-1 text-supply">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="type-body mt-1">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="type-title">Related services</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="card group flex items-center gap-4 p-4 transition-colors hover:border-supply/40"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-ice text-petrol">
                        <Icon name={r.icon} size={22} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium">{r.name}</span>
                        <span className="block text-[0.875rem] text-muted">{r.summary}</span>
                      </span>
                      <Icon name="arrow-up-right" size={18} className="text-supply transition-transform group-hover:rotate-45" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title={`${service.cta}.`}
        defaultService={serviceSlugToEnquiry[service.slug]}
        submitLabel={service.cta}
      />

      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
    </>
  );
}
