import Image from 'next/image';
import { about, site } from '@aloft/content';
import { CtaBand } from '@/components/sections/CtaBand';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: about.seoTitle,
  description: about.metaDescription,
  path: '/about',
});

const principles = [
  {
    num: '01',
    title: 'Load calculation first',
    desc: 'Every scheme begins with precise heat-load modeling, solar gain calculation, and occupancy profiling before equipment is selected.',
  },
  {
    num: '02',
    title: 'Architectural coordination',
    desc: '3D duct routing, acoustic isolation, and diffuser placement coordinated strictly with interior design and ceiling heights.',
  },
  {
    num: '03',
    title: 'Documented commissioning',
    desc: 'Formal airflow CFM balancing, static pressure logging, and thermal validation prior to commercial handover.',
  },
];

/**
 * Redesigned About page.
 * Elevated architectural layout with operational metrics, engineering journey,
 * dual mission/vision manifestos, and rigorous core value standards.
 */
export default function AboutPage() {
  const { hero, journey, values } = about;

  return (
    <>
      {/* 1. Architectural Hero Section */}
      <section className="pt-10 pb-12 md:pt-16 md:pb-16">
        <div className="container-page">
          <div className="animate-rise">
            <Eyebrow className="mb-5">About {site.name}</Eyebrow>
            <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-10">
              <div className="md:col-span-7">
                <h1 className="type-display">
                  {hero.titleLead}
                  <span className="text-supply">{hero.titleAccent}</span>
                  {hero.titleEnd}
                </h1>
              </div>
              <div className="md:col-span-5 md:pt-2">
                <p className="text-[1.125rem] font-medium leading-snug text-petrol md:max-w-[28rem]">
                  Engineering-led commercial cooling solutions across Kerala.
                </p>
                <p className="type-body mt-3 md:max-w-[28rem]">
                  {hero.body}
                </p>
              </div>
            </div>

            {/* Key Operational Metrics Ribbon */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-ice pt-8 sm:grid-cols-4 md:mt-16">
              <div className="rounded-xl border border-ice/80 bg-white p-5 shadow-[var(--shadow-card)] transition-all hover:border-supply/40">
                <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted">Founded</span>
                <p className="mt-1 text-2xl font-bold tracking-tight text-petrol sm:text-3xl">2017</p>
                <p className="mt-1 text-[0.8125rem] text-muted">Perinthalmanna, Kerala</p>
              </div>
              <div className="rounded-xl border border-ice/80 bg-white p-5 shadow-[var(--shadow-card)] transition-all hover:border-supply/40">
                <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted">Core Focus</span>
                <p className="mt-1 text-2xl font-bold tracking-tight text-petrol sm:text-3xl">Commercial</p>
                <p className="mt-1 text-[0.8125rem] text-muted">Theatres, Plazas & Retail</p>
              </div>
              <div className="rounded-xl border border-ice/80 bg-white p-5 shadow-[var(--shadow-card)] transition-all hover:border-supply/40">
                <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted">Lifecycle</span>
                <p className="mt-1 text-2xl font-bold tracking-tight text-petrol sm:text-3xl">End-to-End</p>
                <p className="mt-1 text-[0.8125rem] text-muted">Design · Install · Maintain</p>
              </div>
              <div className="rounded-xl border border-ice/80 bg-white p-5 shadow-[var(--shadow-card)] transition-all hover:border-supply/40">
                <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted">Service Area</span>
                <p className="mt-1 text-2xl font-bold tracking-tight text-petrol sm:text-3xl">Statewide</p>
                <p className="mt-1 text-[0.8125rem] text-muted">Malappuram, Palakkad, Kozhikode</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Engineering Journey & Heritage */}
      <section aria-labelledby="journey-title" className="py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow className="mb-4">{journey.eyebrow}</Eyebrow>
              <h2 id="journey-title" className="type-headline">
                {journey.title}
              </h2>
              <p className="type-body mt-4 text-[1.0625rem] leading-relaxed text-muted">
                {journey.lead}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-14">
            {/* Left: Narrative & Technical Principles */}
            <Reveal className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-ice bg-white px-3.5 py-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-supply">
                <span className="size-1.5 rounded-full bg-supply" />
                {journey.subtitle}
              </div>

              <p className="type-body mt-5 text-[1rem] leading-relaxed text-petrol/90">
                {journey.body}
              </p>

              <div className="mt-8 space-y-4 border-t border-ice pt-6">
                <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-widest text-muted">
                  Engineering standard on every site:
                </p>
                {principles.map((p) => (
                  <div
                    key={p.num}
                    className="group rounded-xl border border-ice/80 bg-white p-4 transition-all duration-200 hover:border-supply/50 hover:shadow-sm"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[0.75rem] font-bold text-supply">
                        {p.num}
                      </span>
                      <h3 className="text-[0.9375rem] font-semibold text-petrol">
                        {p.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 pl-6 text-[0.875rem] leading-relaxed text-muted">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: Architectural Framed Image with Badges */}
            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-ice bg-white p-2.5 shadow-[var(--shadow-card)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={journey.image.src}
                    alt={journey.image.alt}
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-petrol/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-5 bottom-5">
                    <span className="inline-block rounded-md bg-white/20 px-2.5 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-white backdrop-blur-md">
                      Commercial HVAC Execution
                    </span>
                    <p className="mt-2 text-[0.9375rem] font-semibold text-white">
                      Rigorous lifting, structural coordination, and plant room positioning.
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between px-3 py-2 text-[0.8125rem] text-muted">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider">
                    Location: Kerala Operations
                  </span>
                  <span className="font-mono text-[0.6875rem] font-semibold text-petrol">
                    Est. 2017
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Dual Mission & Vision Manifestos */}
      <section aria-labelledby="manifesto-title" className="pb-16 md:pb-24">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Mission Pillar */}
            <Reveal>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ice bg-white p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-supply/50 md:p-10">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-supply via-supply/60 to-transparent" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-ice bg-paper px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-supply">
                      <Icon name="brief" size={14} className="text-supply" />
                      Our Mission
                    </span>
                    <span className="font-mono text-[0.75rem] font-semibold text-muted/50">01</span>
                  </div>
                  <h3 className="mt-6 text-[1.5rem] font-semibold leading-snug tracking-tight text-petrol sm:text-[1.75rem]">
                    Purpose-built cooling for functional architecture.
                  </h3>
                  <p className="mt-4 text-[1rem] leading-relaxed text-muted">
                    {about.mission}
                  </p>
                </div>
                <div className="mt-8 border-t border-ice pt-4">
                  <p className="text-[0.8125rem] text-muted">
                    Focusing on calculated thermal loads, equipment longevity, and comfortable indoor air quality.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Vision Pillar */}
            <Reveal delay={0.08}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ice bg-white p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-supply/50 md:p-10">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-copper via-copper/60 to-transparent" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-ice bg-paper px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-copper">
                      <Icon name="lifecycle" size={14} className="text-copper" />
                      Our Vision
                    </span>
                    <span className="font-mono text-[0.75rem] font-semibold text-muted/50">02</span>
                  </div>
                  <h3 className="mt-6 text-[1.5rem] font-semibold leading-snug tracking-tight text-petrol sm:text-[1.75rem]">
                    Statewide engineering & lifecycle partnership.
                  </h3>
                  <p className="mt-4 text-[1rem] leading-relaxed text-muted">
                    {about.vision}
                  </p>
                </div>
                <div className="mt-8 border-t border-ice pt-4">
                  <p className="text-[0.8125rem] text-muted">
                    Partnering with building owners, contractors, and MEP teams from initial concept to ongoing maintenance.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Core Values & Technical Standards */}
      <section aria-labelledby="values-title" className="section border-y border-ice bg-white">
        <div className="container-page">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow className="mb-4">{values.eyebrow}</Eyebrow>
              <h2 id="values-title" className="type-headline">
                {values.title}
              </h2>
              <p className="type-body mt-4 text-[1.0625rem] leading-relaxed text-muted">
                {values.body}
              </p>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {about.valueItems.map((v, i) => (
              <li key={v.title} className="h-full">
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="group relative flex h-full flex-col justify-between rounded-xl border border-ice bg-paper/40 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-supply/40 hover:bg-white hover:shadow-[var(--shadow-card)]">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-transparent transition-colors group-hover:bg-supply" />
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex size-11 items-center justify-center rounded-lg bg-ice/70 text-supply transition-colors group-hover:bg-supply group-hover:text-white">
                          <Icon name={v.icon} size={22} strokeWidth={1.75} />
                        </div>
                        <span className="font-mono text-[0.6875rem] font-semibold text-muted/60">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-5 text-[1.1875rem] font-semibold leading-snug tracking-tight text-petrol">
                        {v.title}
                      </h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                        {v.body}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-ice/60 pt-3">
                      <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted/70 group-hover:text-supply transition-colors">
                        Engineering standard
                      </span>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Closing CTA Band */}
      <CtaBand title={about.cta.title} body={about.cta.body} />
    </>
  );
}
