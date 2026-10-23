import { home, homeServices } from '@aloft/content';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** Section 5 — the four revenue-line services (brand board 20). */
export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="section bg-white">
      <div className="container-page">
        <SectionHeader id="services-title" {...home.services} />
        <div className="mt-12 space-y-5 md:mt-16">
          {homeServices.map((s) => (
            <ServiceCard key={s.slug} service={s} index={s.homeIndex} summary={s.homeSummary} />
          ))}
        </div>
      </div>
    </section>
  );
}
