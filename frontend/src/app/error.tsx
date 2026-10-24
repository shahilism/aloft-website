'use client';

import { site } from '@aloft/content';
import { Button, ButtonLink } from '@/components/ui/Button';

/** Shown when a page fails to render. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-page py-20 md:py-32">
      <div className="card mx-auto max-w-2xl px-6 py-14 text-center md:px-12">
        <h1 className="type-headline">This page could not be loaded.</h1>
        <p className="type-body mx-auto mt-5 max-w-md">
          Please try again in a moment. If the problem continues, call {site.contact.phoneDisplay} or email{' '}
          {site.contact.email}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="secondary" icon="lifecycle" onClick={() => reset()}>
            Try again
          </Button>
          <ButtonLink href="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
