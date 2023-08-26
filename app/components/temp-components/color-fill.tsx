// app/components/buttons/color-fill.tsx
'use client';
import { motion } from 'framer-motion';

export default function ColorFill({ ref }: any) {
  console.log('loaded');
  return (
    <>
      <motion.span
        // className={colorFill({})}
        className="pointer-events-none absolute  bg-highlighter-focus-400 [--rotate-from:-68.566deg] [--x-to:0%] tablet:-left-18 tablet:-top-48 tablet:h-[700px] tablet:w-[650px] tablet:[--x-from:-110%] tab-pro:-left-12 tab-pro:-top-30 tab-pro:h-[375px] tab-pro:w-96 tab-pro:[--x-from:-100%] laptop:-left-10 laptop:-top-16 laptop:h-72 laptop:w-80"
        variants={{
          default: {
            rotate: 'var(--rotate-from)',
            x: 'var(--x-from)',
          },
          hover: { x: 'var(--x-to)' },
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    </>
  );
}
