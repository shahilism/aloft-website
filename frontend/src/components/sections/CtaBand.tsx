import { contactPage, formattedAddress, home, site, type EnquiryService } from '@aloft/content';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

interface CtaBandProps {
  title?: string;
  body?: string;
  defaultService?: EnquiryService;
  submitLabel?: string;
  /** Secondary link under the copy; null hides it. */
  secondary?: { label: string; href: string } | null;
}

/**
 * Closing call to action with the enquiry form and direct contact hub.
 * Realigned and redesigned with high typographic contrast, direct contact cards,
 * ambient lighting, and structured form architecture.
 */
export function CtaBand({
  title = home.finalCta.title,
  body = home.finalCta.body,
  defaultService,
  submitLabel,
}: CtaBandProps) {
  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="relative overflow-hidden bg-petrol text-paper">
      {/* Top subtle hairline accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-supply/40 to-transparent" />

      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(27,124,144,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(176,90,48,0.10),transparent_50%)]"
      />

      <div className="container-page relative z-10 py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column: Eyebrow + Headline + Body + Direct Contact Hub */}
          <div className="flex flex-col lg:col-span-5">
            <Reveal>
              <Eyebrow tone="paper" className="mb-4">
                Get in touch
              </Eyebrow>

              <h2
                id="enquiry-title"
                className="text-[2.25rem] font-semibold leading-[1.08] tracking-tight text-paper sm:text-[2.75rem] lg:text-[3.25rem]"
              >
                {title}
              </h2>

              <p className="mt-5 text-[1rem] leading-relaxed text-paper/85 sm:text-[1.0625rem]">
                {body}
              </p>
            </Reveal>

            {/* Direct Contact Cards Hub */}
            <Reveal delay={0.1} className="mt-8 space-y-3 sm:space-y-3.5">
              <p className="font-mono text-[0.6875rem] font-medium tracking-[0.14em] uppercase text-paper/60">
                {contactPage.detailsTitle}:
              </p>

              <a
                href={`tel:${site.contact.phoneE164}`}
                className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 p-3.5 transition-all duration-200 hover:border-supply/50 hover:bg-white/10"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-supply/20 text-supply transition-colors group-hover:bg-supply group-hover:text-white">
                  <Icon name="phone" size={18} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.6875rem] uppercase tracking-wider text-paper/60">
                    Phone consultation
                  </span>
                  <span className="block text-[0.9375rem] font-semibold text-paper transition-colors group-hover:text-white">
                    {site.contact.phoneDisplay}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${site.contact.email}`}
                className="group flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 p-3.5 transition-all duration-200 hover:border-supply/50 hover:bg-white/10"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-supply/20 text-supply transition-colors group-hover:bg-supply group-hover:text-white">
                  <Icon name="mail" size={18} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.6875rem] uppercase tracking-wider text-paper/60">
                    Email plans & drawings
                  </span>
                  <span className="block truncate text-[0.9375rem] font-semibold text-paper transition-colors group-hover:text-white">
                    {site.contact.email}
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/5 p-3.5">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-supply/20 text-supply">
                  <Icon name="pin" size={18} strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.6875rem] uppercase tracking-wider text-paper/60">
                    Head office & workshop
                  </span>
                  <span className="block text-[0.875rem] leading-snug text-paper/90">
                    {formattedAddress}
                  </span>
                  <span className="mt-1 block text-[0.75rem] text-supply/90">
                    Serving commercial projects across {site.contact.serviceArea}
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Engineering Response Guarantees */}
            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-[0.8125rem] text-paper/75">
              <div className="flex items-center gap-2">
                <Icon name="check-circle" size={16} className="shrink-0 text-supply" />
                <span>1 business day response</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check-circle" size={16} className="shrink-0 text-supply" />
                <span>On-site engineering visit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7">
            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-white/10 bg-white p-6 text-petrol shadow-2xl sm:p-8 lg:p-9">
                <div className="mb-6 border-b border-petrol/10 pb-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[1.375rem] font-semibold tracking-tight text-petrol md:text-[1.5rem]">
                      {contactPage.formTitle}
                    </h3>
                    <span className="rounded-full bg-ice/70 px-2.5 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-supply">
                      Project enquiry
                    </span>
                  </div>
                  <p className="mt-1 text-[0.875rem] text-muted">
                    Share your building details and cooling requirements for a tailored proposal.
                  </p>
                </div>

                <EnquiryForm defaultService={defaultService} submitLabel={submitLabel} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <p className="sr-only">
        {site.legalName}, {site.tagline}
      </p>
    </section>
  );
}
