import { servicesByOrder, servicesPage } from '@aloft/content';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: servicesPage.seoTitle,
  description: servicesPage.metaDescription,
  path: '/services',
});

/** Services overview (content draft, page 3): five cards, design first. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        title={servicesPage.h1}
        body={servicesPage.intro}
        button={{ label: servicesPage.cta.button, href: '#enquiry' }}
      />
      <section aria-label="Services" className="pb-16 md:pb-24">
        <div className="container-page space-y-5">
          {servicesByOrder.map((s) => (
            <ServiceCard key={s.slug} service={s} index={s.order} summary={s.summary} linkLabel={s.linkLabel} headingLevel="h2" />
          ))}
        </div>
      </section>
      <CtaBand
        title={servicesPage.cta.title}
        body={servicesPage.cta.body}
        submitLabel={servicesPage.cta.button}
      />
    </>
  );
}
