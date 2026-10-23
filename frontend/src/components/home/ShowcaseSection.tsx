import { home } from '@aloft/content';
import { ProjectList } from '@/components/sections/ProjectList';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getProjects } from '@/lib/api';

/** Section 8 — up to three published case studies from the API. */
export async function ShowcaseSection() {
  const result = await getProjects();
  return (
    <section aria-labelledby="showcase-title" className="section">
      <div className="container-page">
        <SectionHeader id="showcase-title" {...home.showcase} />
        <div className="mt-12 md:mt-16">
          <ProjectList result={result} limit={3} />
        </div>
      </div>
    </section>
  );
}
