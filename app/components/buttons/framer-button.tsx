// app/components/buttons/framer-button.tsx
// import 'server-only';
'use client';
import { motion, useReducedMotion } from 'framer-motion';

interface FramerButtonProps {
  children: React.ReactNode;
}

export default function FramerButton({ children }: FramerButtonProps) {
  let prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="rounded-md bg-orange-500 tab-pro:[--scale-from:100%] tab-pro:[--scale-to:80%]"
      initial="default"
      whileHover={prefersReducedMotion ? 'default' : 'hover'}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      variants={{
        default: { scale: 'var(--scale-from)' },
        hover: { scale: 'var(--scale-to)' },
      }}
    >
      <motion.button className="rounded-md bg-green-500/20 px-5 py-2">
        <p>{children}</p>
      </motion.button>
    </motion.div>
  );
}
