// app/components/fade-in.tsx

'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import { createContext, useContext } from 'react';

const FadeInStaggerContext = createContext(false);
const viewport = { once: true };

export function FadeIn({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  props?: any;
}) {
  let prefersReducedMotion = useReducedMotion();
  let isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
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
}: {
  children: React.ReactNode;
  className?: string;
  props?: any;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <FadeInStaggerContext.Provider value={true}>
        <m.div
          className={className}
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
