// app/components/fade-in.tsx

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { createContext, useContext } from 'react';

const FadeInStaggerContext = createContext(false);

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
    <motion.div
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
            viewport: { once: true },
          })}
      {...props}
    >
      {children}
    </motion.div>
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
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2, when: 'beforeChildren' }}
        {...props}
      >
        {children}
      </motion.div>
    </FadeInStaggerContext.Provider>
  );
}
