// src/components/fade-in.tsx
'use client';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { createContext, useContext } from 'react';

const FadeInStaggerContext = createContext(false);
const viewport = { once: true };

export function FadeIn({
  children,
  className,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  props?: any;
}>) {
  let isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    // Framer still tweens opacity under reduced motion and the exported HTML starts
    // hidden, so the stylesheet overrides its inline styles as ctrl-atropos.css does.
    <m.div
      className={clsx(
        'motion-reduce:!transform-none motion-reduce:!opacity-100',
        className,
      )}
      suppressHydrationWarning
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport,
          })}
      {...props}
    >
      {children}
    </m.div>
  );
}

export function FadeInStagger({
  children,
  className,
  ...props
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  props?: any;
}>) {
  return (
    <LazyMotion features={domAnimation}>
      <FadeInStaggerContext.Provider value={true}>
        <m.div
          className={className}
          suppressHydrationWarning
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ staggerChildren: 0.2, when: 'beforeChildren' }}
          {...props}
        >
          {children}
        </m.div>
      </FadeInStaggerContext.Provider>
    </LazyMotion>
  );
}
