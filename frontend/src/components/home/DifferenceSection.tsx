import { home } from '@aloft/content';
import { FeatureCard } from '@/components/sections/FeatureCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** Section 7 — header plus four principle cards. */
export function DifferenceSection() {
  return (
    <section aria-labelledby="difference-title" className="section bg-white">
      <div className="container-page">
        <SectionHeader id="difference-title" {...home.difference} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {home.differenceItems.map((f, i) => (
            <li key={f.title}>
              <FeatureCard feature={f} delay={i * 0.06} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
