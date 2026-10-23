'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState } from 'react';
import type { Faq } from '@aloft/content';
import { cn } from '@/lib/cn';
import { Icon } from './Icon';

/** FAQ list styled as the reference template's stacked white rows. */
export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <ul className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.question} className="card overflow-hidden">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left text-[0.9375rem] font-medium md:px-6 md:py-5 md:text-base"
              >
                {item.question}
                <Icon
                  name="plus"
                  size={20}
                  className={cn('shrink-0 text-supply transition-transform duration-300', isOpen && 'rotate-45')}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="type-body px-5 pb-5 md:px-6">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
