'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mainNav, site } from '@aloft/content';
import { cn } from '@/lib/cn';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';

/**
 * Reference layout: logo left, links centred, one action right. The single
 * Copper button repeats the primary action (brand board 20).
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      {/* Background on its own layer: backdrop-filter on <header> would trap the fixed mobile panel. */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10 transition-[background-color,box-shadow] duration-300',
          scrolled || open ? 'bg-paper/90 shadow-[0_1px_0_var(--color-ice)] backdrop-blur-md' : 'bg-transparent',
        )}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-petrol focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="container-wide flex h-[76px] items-center justify-between gap-6">
        <Logo priority width={180} className="-ml-3" />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'relative text-[0.9375rem] font-medium transition-colors hover:text-supply',
                    "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:content-['']",
                    isActive(item.href) ? 'after:scale-x-100' : 'hover:after:scale-x-100',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <ButtonLink href={site.primaryCta.href} variant="primary">
            {site.primaryCta.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-petrol/15 bg-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[76px] bottom-0 overflow-y-auto bg-paper md:hidden"
          >
            <nav aria-label="Mobile" className="container-wide flex min-h-full flex-col pt-6 pb-10">
              <ul className="divide-y divide-ice border-y border-ice">
                {[{ label: 'Home', href: '/' }, ...mainNav].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className="flex items-center justify-between py-5 text-2xl font-medium tracking-tight"
                    >
                      {item.label}
                      <Icon name="arrow-right" size={20} className="text-supply" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <ButtonLink href={site.primaryCta.href} variant="primary" fullWidth>
                  {site.primaryCta.label}
                </ButtonLink>
                <a href={`tel:${site.contact.phoneE164}`} className="mt-5 flex items-center gap-2 text-muted">
                  <Icon name="phone" size={18} /> {site.contact.phoneDisplay}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
