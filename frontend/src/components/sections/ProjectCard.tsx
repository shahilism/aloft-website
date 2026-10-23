import Image from 'next/image';
import type { ProjectSummary } from '@aloft/content';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { DraftBadge } from './DraftBadge';

const SIZES = '(min-width: 768px) 330px, 100vw';

/** Reference project card: comparison slider (or photo) left, details right. */
export function ProjectCard({ project, headingLevel: H = 'h3' }: { project: ProjectSummary; headingLevel?: 'h2' | 'h3' }) {
  const href = `/projects/${project.slug}`;
  const media =
    project.beforeImage && project.afterImage ? (
      <BeforeAfter before={project.beforeImage} after={project.afterImage} sizes={SIZES} className="h-full min-h-[260px]" />
    ) : project.coverImage ? (
      <div className="relative h-full min-h-[260px] overflow-hidden rounded-[var(--radius-media)]">
        <Image src={project.coverImage.url} alt={project.coverImage.alt} fill sizes={SIZES} className="object-cover" />
      </div>
    ) : (
      <div className="grid h-full min-h-[220px] place-items-center rounded-[var(--radius-media)] bg-ice text-supply">
        <Icon name="building" size={48} strokeWidth={1.25} />
        <span className="sr-only">Site photographs to be added</span>
      </div>
    );

  return (
    <Reveal>
      <article className="card grid gap-5 p-3 md:grid-cols-[330px_1fr] md:gap-8">
        <div className="md:min-h-[300px]">{media}</div>
        <div className="flex flex-col px-2 pb-3 md:px-0 md:py-5 md:pr-6">
          {project.isDraft && <DraftBadge className="mb-4 self-start" />}
          <H className="type-title">{project.title}</H>
          <p className="type-body mt-3 max-w-xl">{project.summary}</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.875rem] sm:grid-cols-3">
            <div>
              <dt className="type-label text-[0.6875rem] text-muted">Building</dt>
              <dd className="mt-1.5">{project.buildingType}</dd>
            </div>
            <div>
              <dt className="type-label text-[0.6875rem] text-muted">Location</dt>
              <dd className="mt-1.5">{project.location}</dd>
            </div>
            <div>
              <dt className="type-label text-[0.6875rem] text-muted">System</dt>
              <dd className="mt-1.5">{project.system}</dd>
            </div>
          </dl>
          {project.servicesProvided.length > 0 && (
            <>
              <p className="type-subhead mt-6">Scope delivered:</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem]">
                {project.servicesProvided.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-supply" />
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-7 md:mt-auto md:pt-8">
            <ButtonLink href={href} variant="secondary" aria-label={`View project: ${project.title}`}>
              View project
            </ButtonLink>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
