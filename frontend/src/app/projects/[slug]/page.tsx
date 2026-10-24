import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProject, projectCover, projectImage, projects, projectsPage } from '@aloft/content';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/structured-data';

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.title} | ALOFT Projects`,
    description: p.summary.slice(0, 160),
    path: `/projects/${p.slug}`,
    image: projectCover(p)?.url,
  });
}

/** Project case study (content draft, page 5 — individual project template). */
export default async function ProjectPage({ params }: { params: Params }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const before = projectImage(project, 'before');
  const after = projectImage(project, 'after');
  const cover = projectCover(project);
  const gallery = project.images.filter((i) => i.kind === 'gallery');
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  const facts: { icon: IconName; label: string; value: string | null }[] = [
    { icon: 'building', label: 'Building type', value: project.buildingType },
    { icon: 'pin', label: 'Location', value: project.location },
    { icon: 'vrf', label: 'System', value: project.system },
    { icon: 'commission', label: 'Capacity', value: project.capacity },
  ];

  return (
    <>
      <PageHero title={project.title} body={project.summary} />

      <div className="container-page">
        <div className="animate-rise [animation-delay:120ms]">
          {before && after ? (
            <BeforeAfter
              before={before}
              after={after}
              priority
              sizes="(min-width: 1200px) 1120px, calc(100vw - 40px)"
              className="aspect-[4/3] md:aspect-[16/9]"
            />
          ) : cover ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] md:aspect-[16/9]">
              <Image src={cover.url} alt={cover.alt} fill priority sizes="(min-width: 1200px) 1120px, 100vw" className="object-cover" />
            </div>
          ) : null}
        </div>

        <Reveal className="card mt-8 grid divide-y divide-ice sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {facts
            .filter((f) => f.value)
            .map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-2 px-6 py-7 text-center">
                <p className="flex items-center gap-2 text-[1.125rem] font-medium text-supply">
                  <Icon name={f.icon} size={20} /> {f.label}
                </p>
                <p className="text-[0.9375rem] text-muted">{f.value}</p>
              </div>
            ))}
        </Reveal>
      </div>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <article className="space-y-12 lg:col-span-8">
            {(
              [
                [projectsPage.detail.challenge, project.challenge],
                [projectsPage.detail.solution, project.solution],
                [projectsPage.detail.execution, project.execution],
              ] as const
            ).map(([heading, text]) => (
              <Reveal key={heading}>
                <h2 className="type-title">{heading}</h2>
                <p className="type-body mt-4 whitespace-pre-line">{text}</p>
              </Reveal>
            ))}
            {gallery.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {gallery.map((img) => (
                  <div key={img.url} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)]">
                    <Image src={img.url} alt={img.alt} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
            <Reveal>
              <h2 className="type-title">{projectsPage.detail.outcome}</h2>
              <p className="type-body mt-4 whitespace-pre-line">{project.outcome}</p>
            </Reveal>
          </article>
          {project.servicesProvided.length > 0 && (
            <aside className="lg:col-span-4" aria-labelledby="scope-title">
              <Reveal className="lg:sticky lg:top-28">
                <h2 id="scope-title" className="text-[1.375rem] font-medium">
                  {projectsPage.detail.scope}
                </h2>
                <ul className="mt-5 space-y-2">
                  {project.servicesProvided.map((s) => (
                    <li key={s} className="flex gap-3 rounded-lg bg-ice/70 px-3 py-2.5 text-[0.9375rem]">
                      <Icon name="check-circle" size={20} className="mt-px shrink-0 text-supply" />
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </aside>
          )}
        </div>
      </section>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="section bg-white">
          <div className="container-page">
            <SectionHeader id="more-title" eyebrow={projectsPage.detail.more.eyebrow} title={projectsPage.detail.more.title} />
            <div className="mt-12 space-y-5">
              {more.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={projectsPage.detail.cta} />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
    </>
  );
}
