import { projectsPage } from '@aloft/content';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { ProjectList } from '@/components/sections/ProjectList';
import { getProjects } from '@/lib/api';
import { pageMetadata } from '@/lib/seo';

export const revalidate = 300;

export const metadata = pageMetadata({
  title: projectsPage.seoTitle,
  description: projectsPage.metaDescription,
  path: '/projects',
});

/** Projects (content draft, page 5): case studies served by the NestJS API. */
export default async function ProjectsPage() {
  const result = await getProjects();
  return (
    <>
      <PageHero title={projectsPage.h1} body={projectsPage.intro} button={projectsPage.button} />
      <section aria-label="Project case studies" className="pb-16 md:pb-24">
        <div className="container-page">
          <ProjectList result={result} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
