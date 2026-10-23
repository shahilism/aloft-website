'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
}

/**
 * Fade-and-rise on first scroll into view, matching the reference
 * template's appear effects.
 *
 * Server and client must render identical props: branching on
 * useReducedMotion() would hydrate the server's `opacity: 0` and never clear
 * it. Reduced motion is handled by MotionProvider (`reducedMotion="user"`),
 * which drops the movement and keeps only the fade. Without JavaScript, the
 * noscript rule in the root layout shows every `data-reveal` block.
 */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      data-reveal=""
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
