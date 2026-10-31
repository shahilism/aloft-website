import type { ReactNode } from 'react';
import { ButtonLink, type ButtonVariant } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

interface PageHeroProps {
  title: ReactNode;
  body?: ReactNode;
  eyebrow?: string;
  button?: { label: string; href: string; variant?: ButtonVariant };
  children?: ReactNode;
}

/** Inner-page opener: large H1 left, short copy and one action right. */
export function PageHero({ title, body, eyebrow, button, children }: PageHeroProps) {
  return (
    <section className="pt-10 pb-12 md:pt-16 md:pb-16">
      <div className="container-page">
        <div className="animate-rise">
          {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
          <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-10">
            <div className="md:col-span-7">
              <h1 className="type-display">{title}</h1>
            </div>
            {(body || button) && (
              <div className="md:col-span-5 md:pt-2">
                {body && <div className="type-body md:max-w-[26rem]">{body}</div>}
                {button && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink href={button.href} variant={button.variant ?? 'primary'}>
                      {button.label}
                    </ButtonLink>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
