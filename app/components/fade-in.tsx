// app/components/fade-in.tsx

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { createContext, useContext } from 'react';

const FadeInStaggerContext = createContext(false);

export function FadeIn(props: any) {
  let prefersReducedMotion = useReducedMotion();
  let isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      // initial="hidden"
      // whileInView="visible"
      // viewport={{ once: true }}

      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport: { once: true },
          })}
      {...props}
    />
  );
}

export function FadeInStagger({ ...props }: any) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  );
}
