import { contactPage, home, site, type EnquiryService } from '@aloft/content';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { ButtonLink } from '@/components/ui/Button';
import { ContactList } from './ContactList';

interface CtaBandProps {
  title?: string;
  body?: string;
  defaultService?: EnquiryService;
  submitLabel?: string;
  /** Secondary link under the copy; null hides it. */
  secondary?: { label: string; href: string } | null;
}

/**
 * Closing call to action with the enquiry form, as on every reference
 * page. Petrol ground, Paper type, one Copper action (brand board 10).
 * The top edge carries the "airflow" pattern (board 12), clear of text.
 */
export function CtaBand({
  title = home.finalCta.title,
  body = home.finalCta.body,
  defaultService,
  submitLabel,
  secondary = home.finalCta.secondary,
}: CtaBandProps) {
  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="relative bg-petrol text-paper">
      <AirflowEdge />
      <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-5">
          <h2 id="enquiry-title" className="type-headline text-paper lg:text-[3.5rem]">
            {title}
          </h2>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-paper/85">{body}</p>
          {secondary && (
            <div className="mt-8">
              <ButtonLink href={secondary.href} variant="inverse">
                {secondary.label}
              </ButtonLink>
            </div>
          )}

          <div className="mt-12 lg:mt-auto lg:pt-16">
            <h3 className="type-subhead">{contactPage.detailsTitle}</h3>
            <ContactList tone="dark" className="mt-5" />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <div className="rounded-[var(--radius-card)] bg-white p-5 text-petrol shadow-[var(--shadow-card)] sm:p-7">
            <h3 className="type-title mb-6">{contactPage.formTitle}</h3>
            <EnquiryForm defaultService={defaultService} submitLabel={submitLabel} />
          </div>
        </div>
      </div>
      <p className="sr-only">
        {site.legalName}, {site.tagline}
      </p>
    </section>
  );
}

function AirflowEdge() {
  return (
    <svg aria-hidden="true" className="absolute inset-x-0 top-0 h-3 w-full text-supply" preserveAspectRatio="none">
      <defs>
        <pattern id="airflow" width="48" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 6 Q12 0 24 6 T48 6" fill="none" stroke="currentColor" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill="url(#airflow)" />
    </svg>
  );
}
