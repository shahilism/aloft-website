import { projectsPage } from '@aloft/content';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { ProjectList } from '@/components/sections/ProjectList';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: projectsPage.seoTitle,
  description: projectsPage.metaDescription,
  path: '/projects',
});

/** Projects (content draft, page 5): case studies from @aloft/content. */
export default function ProjectsPage() {
  return (
    <>
      <PageHero title={projectsPage.h1} body={projectsPage.intro} button={projectsPage.button} />
      <section aria-label="Project case studies" className="pb-16 md:pb-24">
        <div className="container-page">
          <ProjectList />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
