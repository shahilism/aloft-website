import type { Metadata } from 'next';
import { notFoundPage } from '@aloft/content';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | ALOFT' },
  robots: { index: false, follow: true },
};

/** 404 (content draft, page 9). */
export default function NotFound() {
  return (
    <section className="container-page py-20 md:py-32">
      <div className="card mx-auto max-w-2xl px-6 py-14 text-center md:px-12">
        <p className="type-label text-copper">Error 404</p>
        <h1 className="type-headline mt-5">{notFoundPage.title}</h1>
        <p className="type-body mx-auto mt-5 max-w-md">{notFoundPage.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={notFoundPage.primary.href} variant="secondary">
            {notFoundPage.primary.label}
          </ButtonLink>
          <ButtonLink href={notFoundPage.secondary.href} variant="outline">
            {notFoundPage.secondary.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
