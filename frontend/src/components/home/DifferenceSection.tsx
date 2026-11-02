import Link from 'next/link';
import { home, projects } from '@aloft/content';
import { FeatureCard } from '@/components/sections/FeatureCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

/** Section 7 — header plus four principle cards and featured project installations. */
export function DifferenceSection() {
  return (
    <section aria-labelledby="difference-title" className="section bg-white">
      <div className="container-page">
        <SectionHeader id="difference-title" {...home.difference} />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {home.differenceItems.map((f, i) => (
            <li key={f.title} className="h-full">
              <FeatureCard feature={f} delay={i * 0.06} />
            </li>
          ))}
        </ul>

        {/* Featured project installations */}
        {projects.length > 0 && (
          <Reveal delay={0.16} className="mt-12 rounded-[var(--radius-card)] border border-ice bg-paper p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="type-label text-supply">Proven in the field</p>
                <h3 className="type-title mt-1">Delivered commercial installations</h3>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-supply hover:underline"
              >
                View all projects <Icon name="arrow-right" size={16} />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-ice bg-white p-5 transition-all duration-200 hover:border-supply hover:shadow-[var(--shadow-card)]"
                >
                  <div>
                    <span className="type-label text-[0.6875rem] text-supply">{p.buildingType}</span>
                    <h4 className="mt-2 text-[1.125rem] font-semibold text-petrol transition-colors group-hover:text-supply">
                      {p.title}
                    </h4>
                    <p className="mt-1 text-[0.875rem] text-muted">{p.location}</p>
                  </div>
                  <div className="mt-4 border-t border-ice pt-3">
                    <p className="text-[0.8125rem] font-medium text-petrol/80">{p.system}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
