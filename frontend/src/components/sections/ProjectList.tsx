import { projects, projectsPage } from '@aloft/content';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from './ProjectCard';

/** Published case studies, or an honest empty state until real ones exist. */
export function ProjectList({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  if (list.length === 0) {
    return (
      <Reveal>
        <div role="status" className="card flex flex-col items-start gap-5 p-7 md:flex-row md:items-center md:gap-8 md:p-10">
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-ice text-supply">
            <Icon name="building" size={30} strokeWidth={1.5} />
          </span>
          <div className="flex-1">
            <h3 className="type-title">{projectsPage.empty.title}</h3>
            <p className="type-body mt-2 max-w-2xl">{projectsPage.empty.body}</p>
          </div>
          <ButtonLink href="/contact" variant="secondary">
            Discuss your project
          </ButtonLink>
        </div>
      </Reveal>
    );
  }
  return (
    <div className="space-y-5">
      {list.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}
