import type { LegalPage as LegalPageContent } from '@aloft/content';

export function LegalPage({ page }: { page: LegalPageContent }) {
  const updated = new Date(page.lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <article className="container-page pt-10 pb-20 md:pt-16 md:pb-28">
      <header className="max-w-3xl">
        <h1 className="type-display">{page.h1}</h1>
        <p className="type-label mt-6 text-muted">Last updated {updated}</p>
        <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">{page.intro}</p>
      </header>
      <div className="prose-legal mt-4 max-w-3xl">
        {page.sections.map((s, i) => (
          <section key={s.heading} aria-labelledby={`legal-${i}`}>
            <h2 id={`legal-${i}`}>
              {i + 1}. {s.heading}
            </h2>
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
