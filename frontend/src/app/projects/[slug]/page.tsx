import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projectsPage, type ProjectDetail } from '@aloft/content';
import { JsonLd } from '@/components/JsonLd';
import { CtaBand } from '@/components/sections/CtaBand';
import { DraftBadge } from '@/components/sections/DraftBadge';
import { PageHero } from '@/components/sections/PageHero';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getProject, getProjects } from '@/lib/api';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/structured-data';

type Params = Promise<{ slug: string }>;

export const revalidate = 300;

export async function generateStaticParams() {
  const res = await getProjects();
  return res.ok ? res.data.filter((p) => !p.isDraft).map((p) => ({ slug: p.slug })) : [];
}

async function load(slug: string): Promise<ProjectDetail> {
  const res = await getProject(slug);
  if (res.ok) return res.data;
  if (res.status === 404) notFound();
  // API unreachable: let the error boundary show a retry state instead of a false 404.
  throw new Error('Project could not be loaded');
}

export async function generateMetadata({ params }: { params: Params }) {
  const res = await getProject((await params).slug);
  if (!res.ok) return {};
  const p = res.data;
  return pageMetadata({
    title: `${p.title} | ALOFT Projects`,
    description: p.summary.slice(0, 160),
    path: `/projects/${p.slug}`,
    image: p.coverImage?.url,
    noindex: p.isDraft,
  });
}

/** Project case study (content draft, page 5 — individual project template). */
export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await load(slug);
  const others = await getProjects();
  const more = others.ok ? others.data.filter((p) => p.slug !== project.slug).slice(0, 2) : [];
  const gallery = project.images.filter((i) => i.kind === 'gallery');

  const facts: { icon: IconName; label: string; value: string | null }[] = [
    { icon: 'building', label: 'Building type', value: project.buildingType },
    { icon: 'pin', label: 'Location', value: project.location },
    { icon: 'vrf', label: 'System', value: project.system },
    { icon: 'commission', label: 'Capacity', value: project.capacity },
  ];

  return (
    <>
      <PageHero title={project.title} body={project.summary}>
        {project.isDraft && <DraftBadge className="mt-6 inline-block" />}
      </PageHero>

      <div className="container-page">
        <div className="animate-rise [animation-delay:120ms]">
          {project.beforeImage && project.afterImage ? (
            <BeforeAfter
              before={project.beforeImage}
              after={project.afterImage}
              priority
              sizes="(min-width: 1200px) 1120px, calc(100vw - 40px)"
              className="aspect-[4/3] md:aspect-[16/9]"
            />
          ) : project.coverImage ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] md:aspect-[16/9]">
              <Image src={project.coverImage.url} alt={project.coverImage.alt} fill priority sizes="(min-width: 1200px) 1120px, 100vw" className="object-cover" />
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
