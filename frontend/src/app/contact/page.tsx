import { contactPage, site } from '@aloft/content';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { ContactList } from '@/components/sections/ContactList';
import { PageHero } from '@/components/sections/PageHero';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: contactPage.seoTitle,
  description: contactPage.metaDescription,
  path: '/contact',
});

/** Contact (content draft, page 6): qualifying enquiry form plus direct details. */
export default function ContactPage() {
  return (
    <>
      <PageHero title={contactPage.h1} body={contactPage.intro} />
      <section aria-label="Enquiry" className="pb-16 md:pb-24">
        <div className="container-page grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="rounded-[var(--radius-card)] bg-petrol p-6 text-paper md:p-8">
              <h2 className="type-title">{contactPage.detailsTitle}</h2>
              <ContactList tone="dark" className="mt-6" />
            </div>
            <div className="card mt-4 p-6 md:p-8">
              <h2 className="text-[1.25rem] font-medium">What helps us respond</h2>
              <p className="type-body mt-3">
                Share the project location, building type, approximate area, project stage and any available HVAC
                drawings. Our team can review the requirements and advise on the next steps.
              </p>
              <a
                href={`mailto:${site.contact.email}?subject=${encodeURIComponent('HVAC drawings for my enquiry')}`}
                className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-supply hover:underline"
              >
                <Icon name="mail" size={18} /> Email drawings to {site.contact.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <div className="card p-5 sm:p-8">
              <h2 className="type-title mb-6">{contactPage.formTitle}</h2>
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
