import { faqs, home } from '@aloft/content';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

/** Section 11 — heading and help card left, accordion right. */
export function FaqSection() {
  const { faq } = home;
  return (
    <section aria-labelledby="faq-title" className="section bg-white">
      <div className="container-page grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Eyebrow className="mb-4">{faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="type-headline">
            {faq.title}
          </h2>
          <div className="card mt-8 max-w-sm p-6">
            <h3 className="text-[1.25rem] leading-tight font-medium">{faq.asideTitle}</h3>
            <p className="type-body mt-2">{faq.asideBody}</p>
            <ButtonLink href={faq.button.href} variant="secondary" fullWidth className="mt-6">
              {faq.button.label}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-7">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
