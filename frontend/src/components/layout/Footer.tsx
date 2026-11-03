'use client';

import Link from 'next/link';
import { footerNav, formattedAddress, legalNav, servicesByOrder, site } from '@aloft/content';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';

/**
 * Realigned architectural footer.
 * Balanced 4-column engineering grid, responsive layout, subtle interaction states,
 * and seamless baseline alignment across brand, solutions, company navigation, and operations.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-ice bg-white text-petrol">
      {/* Subtle top architectural hairline accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-supply/30 to-transparent" />

      <div className="container-page pt-16 pb-12 md:pt-20 lg:pb-16">
        {/* Main 4-Column Architectural Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Identity */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-4">
            <div>
              <Logo width={180} href="/" />
              <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
                {site.promise}
              </p>
            </div>

            <div className="pt-2">
              {/* Direct Consultation Desk Badge */}
              <a
                href={`tel:${site.contact.phoneE164}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-ice bg-paper/60 px-3.5 py-2 text-[0.8125rem] font-medium text-petrol transition-all duration-200 hover:border-supply hover:bg-white hover:text-supply"
              >
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-supply opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-supply" />
                </span>
                <span>
                  Direct desk:{' '}
                  <span className="font-semibold text-petrol transition-colors group-hover:text-supply">
                    {site.contact.phoneDisplay}
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Column 2: Cooling Solutions */}
          <nav aria-label="HVAC Solutions" className="lg:col-span-3">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-supply" />
              <h2 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-petrol">
                Cooling Solutions
              </h2>
            </div>
            <ul className="mt-5 space-y-2.5">
              {servicesByOrder.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between text-[0.875rem] text-muted transition-colors hover:text-supply"
                  >
                    <span>{s.shortName}</span>
                    <Icon
                      name="arrow-right"
                      size={13}
                      className="shrink-0 -translate-x-1 text-supply opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Company Navigation */}
          <nav aria-label="Navigation" className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-supply" />
              <h2 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-petrol">
                Company
              </h2>
            </div>
            <ul className="mt-5 space-y-2.5">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block text-[0.875rem] text-muted transition-colors hover:text-supply"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Office & Operations */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-supply" />
              <h2 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-petrol">
                Operations & Reach
              </h2>
            </div>
            <div className="mt-5 space-y-3.5 text-[0.875rem] text-muted">
              <div className="flex items-start gap-2.5">
                <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-supply" />
                <span className="leading-snug text-petrol/85">{formattedAddress}</span>
              </div>
              <div>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-2.5 text-petrol/85 transition-colors hover:text-supply"
                >
                  <Icon name="mail" size={17} className="shrink-0 text-supply" />
                  <span>{site.contact.email}</span>
                </a>
              </div>
              {site.contact.workingHours && (
                <div className="flex items-center gap-2.5 text-petrol/85">
                  <Icon name="clock" size={17} className="shrink-0 text-supply" />
                  <span>{site.contact.workingHours}</span>
                </div>
              )}
              <div className="border-t border-ice pt-3">
                <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted/75">
                  Statewide Service Area
                </p>
                <p className="mt-1 text-[0.8125rem] text-petrol/80">
                  Malappuram · Palakkad · Kozhikode · Kerala
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Divider & Sub-Footer */}
        <div className="mt-14 border-t border-ice pt-8">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            {/* Left: Copyright */}
            <p className="text-[0.8125rem] text-muted">
              © {year} {site.legalName}. All rights reserved.
            </p>

            {/* Center: Legal Links */}
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-muted">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-supply">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 text-[0.8125rem] font-medium text-petrol/80 transition-colors hover:text-supply"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <span className="flex size-7 items-center justify-center rounded-full border border-ice bg-paper/60 text-petrol transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-supply group-hover:bg-supply group-hover:text-white">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
