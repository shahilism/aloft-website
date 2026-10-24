import { home } from '@aloft/content';
import { DifferenceSection } from '@/components/home/DifferenceSection';
import { FaqSection } from '@/components/home/FaqSection';
import { Hero } from '@/components/home/Hero';
import { MaintenanceSection } from '@/components/home/MaintenanceSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ShowcaseSection } from '@/components/home/ShowcaseSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { WhoWeAre } from '@/components/home/WhoWeAre';
import { WhoWeWorkWith } from '@/components/home/WhoWeWorkWith';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand } from '@/components/sections/CtaBand';
import { pageMetadata } from '@/lib/seo';
import { faqJsonLd } from '@/lib/structured-data';

export const metadata = pageMetadata({ title: home.seoTitle, description: home.metaDescription, path: '/' });

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhoWeAre />
      <ServicesSection />
      <ProcessSection />
      <DifferenceSection />
      <ShowcaseSection />
      <MaintenanceSection />
      <WhoWeWorkWith />
      <FaqSection />
      <CtaBand />
      <JsonLd data={faqJsonLd()} />
    </>
  );
}
