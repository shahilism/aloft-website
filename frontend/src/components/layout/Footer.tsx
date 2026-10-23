import Link from 'next/link';
import { footerNav, formattedAddress, legalNav, servicesByOrder, site } from '@aloft/content';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';

/**
 * Reference footer: contact details and link columns, a rule, then the
 * oversized brand row. The template's giant wordmark is replaced by the
 * official full-colour lockup on white.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white">
      <div className="container-page pt-16 pb-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="type-title">Contact info</h2>
            <ul className="mt-6 space-y-4 text-[0.9375rem]">
              <li className="flex gap-3">
                <Icon name="pin" size={20} className="mt-0.5 shrink-0 text-supply" />
                <span>{formattedAddress}</span>
              </li>
              <li>
                <a href={`tel:${site.contact.phoneE164}`} className="flex gap-3 hover:text-supply">
                  <Icon name="phone" size={20} className="shrink-0 text-supply" />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex gap-3 hover:text-supply">
                  <Icon name="mail" size={20} className="shrink-0 text-supply" />
                  {site.contact.email}
                </a>
              </li>
              {site.contact.workingHours && (
                <li className="flex gap-3">
                  <Icon name="clock" size={20} className="shrink-0 text-supply" />
                  {site.contact.workingHours}
                </li>
              )}
            </ul>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <h2 className="type-title">Page links</h2>
            <ul className="mt-6 space-y-3 text-[0.9375rem]">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-supply">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="md:col-span-3">
            <h2 className="type-title">Services</h2>
            <ul className="mt-6 space-y-3 text-[0.9375rem]">
              {servicesByOrder.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-supply">
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-ice pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo width={420} href={null} className="-ml-5 max-w-full md:-ml-8" />
            <p className="type-label mt-2 text-muted">
              {site.name} — {site.tagline}
            </p>
          </div>
          <div className="text-[0.875rem] text-muted md:text-right">
            <ul className="flex flex-wrap gap-x-3 md:justify-end">
              {legalNav.map((l, i) => (
                <li key={l.href} className="flex gap-3">
                  {i > 0 && <span aria-hidden="true">|</span>}
                  <Link href={l.href} className="hover:text-petrol">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              © {year} {site.legalName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
