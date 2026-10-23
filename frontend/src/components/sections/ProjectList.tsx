import { projectsPage, type ProjectSummary } from '@aloft/content';
import type { Result } from '@/lib/api';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard } from './ProjectCard';

/** Project cards with honest empty and unavailable states. */
export function ProjectList({ result, limit }: { result: Result<ProjectSummary[]>; limit?: number }) {
  if (!result.ok) {
    return <Notice icon="alert" title={projectsPage.unavailable.title} body={projectsPage.unavailable.body} />;
  }
  const projects = limit ? result.data.slice(0, limit) : result.data;
  if (projects.length === 0) {
    return <Notice icon="building" title={projectsPage.empty.title} body={projectsPage.empty.body} />;
  }
  return (
    <div className="space-y-5">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}

function Notice({ icon, title, body }: { icon: 'alert' | 'building'; title: string; body: string }) {
  return (
    <Reveal>
      <div role="status" className="card flex flex-col items-start gap-5 p-7 md:flex-row md:items-center md:gap-8 md:p-10">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-ice text-supply">
          <Icon name={icon} size={30} strokeWidth={1.5} />
        </span>
        <div className="flex-1">
          <h3 className="type-title">{title}</h3>
          <p className="type-body mt-2 max-w-2xl">{body}</p>
        </div>
        <ButtonLink href="/contact" variant="secondary">
          Discuss your project
        </ButtonLink>
      </div>
    </Reveal>
  );
}
