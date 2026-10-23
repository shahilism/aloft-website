import { home, processSteps } from '@aloft/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Section 6 — sticky intro left, stacked step cards right (reference
 * layout). Line-icon tiles stand in for the template's stock photos.
 */
export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="section">
      <div className="container-page grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal className="md:sticky md:top-28">
            <Eyebrow className="mb-4">{home.process.eyebrow}</Eyebrow>
            <h2 id="process-title" className="type-headline">
              {home.process.title}
            </h2>
            <p className="type-body mt-5 max-w-sm">{home.process.body}</p>
          </Reveal>
        </div>
        <ol className="space-y-5 md:col-span-7">
          {processSteps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.05}>
                <div className="card flex flex-col gap-5 p-3 sm:flex-row sm:items-center sm:gap-6">
                  <div className="grid aspect-[4/3] w-full shrink-0 place-items-center rounded-[var(--radius-media)] bg-ice text-petrol sm:w-44">
                    <Icon name={step.icon} size={44} strokeWidth={1.4} />
                  </div>
                  <div className="px-2 pb-3 sm:px-0 sm:py-2 sm:pr-4">
                    <h3 className="type-title">
                      <span className="text-supply">{String(i + 1).padStart(2, '0')}</span> — {step.title}
                    </h3>
                    <p className="type-body mt-2">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
