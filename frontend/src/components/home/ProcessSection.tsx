import Image from 'next/image';
import { home, processSteps } from '@aloft/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

const PROCESS_SIZES = '(min-width: 640px) 176px, 100vw';

/**
 * Section 6 — sticky intro left, stacked step cards right (reference
 * layout). Minimal photographic/render tiles replace line-icon tiles.
 */
export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="section">
      <div className="container-page">
        <Reveal>
          <Eyebrow className="mb-5">{home.process.eyebrow}</Eyebrow>
          <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-12">
            <div className="md:col-span-5 md:sticky md:top-28">
              <h2 id="process-title" className="type-headline">
                {home.process.title}
              </h2>
              <p className="type-body mt-5 max-w-sm">{home.process.body}</p>
            </div>
            <ol className="space-y-5 md:col-span-7">
              {processSteps.map((step, i) => (
                <li key={step.title}>
                  <Reveal delay={i * 0.05}>
                    <div className="card flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5 md:p-6">
                      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-[var(--radius-media)] border border-ice bg-ice/70 sm:w-44">
                        {step.image ? (
                          <Image
                            src={step.image.src}
                            alt={step.image.alt}
                            fill
                            sizes={PROCESS_SIZES}
                            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="grid size-full place-items-center text-supply">
                            <Icon name={step.icon} size={40} strokeWidth={1.5} />
                          </div>
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-center px-1">
                        <p className="type-label text-supply">{String(i + 1).padStart(2, '0')}</p>
                        <h3 className="mt-1.5 text-[1.25rem] font-semibold leading-snug tracking-[-0.015em] text-petrol md:text-[1.375rem]">
                          {step.title}
                        </h3>
                        <p className="type-body mt-2">{step.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
