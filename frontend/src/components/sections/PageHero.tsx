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
        <div className="grid animate-rise gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <h1 className="type-display">{title}</h1>
          </div>
          {(body || button) && (
            <div className="md:col-span-5 md:pb-1 md:text-right">
              {body && <div className="type-body md:ml-auto md:max-w-[24rem]">{body}</div>}
              {button && (
                <div className="mt-6">
                  <ButtonLink href={button.href} variant={button.variant ?? 'primary'}>
                    {button.label}
                  </ButtonLink>
                </div>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
