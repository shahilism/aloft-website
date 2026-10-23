import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@aloft/content';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

interface ServiceCardProps {
  service: Service;
  index: number;
  summary: string;
  linkLabel?: string;
  headingLevel?: 'h2' | 'h3';
}

/** Reference service card: photo left, title, copy, three bullets, button. */
export function ServiceCard({ service, index, summary, linkLabel = 'View service', headingLevel: H = 'h3' }: ServiceCardProps) {
  const href = `/services/${service.slug}`;
  return (
    <Reveal>
      <article className="card group grid gap-5 p-3 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-8 md:grid-cols-[minmax(0,380px)_1fr]">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-media)] sm:aspect-auto sm:min-h-[260px] md:min-h-[300px]">
          <Image
            src={service.image.src}
            alt=""
            fill
            sizes="(min-width: 768px) 380px, (min-width: 640px) 240px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="flex flex-col px-2 pb-3 sm:px-0 sm:py-5 sm:pr-6">
          <p className="type-label text-supply">{String(index).padStart(2, '0')}</p>
          <H className="type-title mt-3">
            <Link href={href} className="hover:text-supply">
              {service.name}
            </Link>
          </H>
          <p className="type-body mt-3 max-w-xl">{summary}</p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem]">
            {service.covers.slice(0, 3).map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-supply" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-7 sm:mt-auto sm:pt-8">
            <ButtonLink href={href} variant="secondary" aria-label={`${linkLabel}: ${service.name}`}>
              {linkLabel}
            </ButtonLink>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
