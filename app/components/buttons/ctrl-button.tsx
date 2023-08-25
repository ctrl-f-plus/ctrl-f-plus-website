// app/components/buttons/ctrl-button.tsx
'use client';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { CSSProperties, useState } from 'react';

interface CtrlButtonProps {
  children: React.ReactNode;
}

export default function CtrlButton({ children }: CtrlButtonProps) {
  let prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <MotionConfig transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
      <motion.div
        className="rounded-md bg-orange-500 tab-pro:[--scale-from:100%] tab-pro:[--scale-to:80%]"
        initial="closed"
        animate={prefersReducedMotion || open ? 'open' : 'closed'}
        onHoverStart={() => setOpen(true)}
        onHoverEnd={() => setOpen(false)}
        variants={{
          closed: { scale: 'var(--scale-from)' },
          open: { scale: 'var(--scale-to)' },
        }}
      >
        <motion.button className="rounded-md bg-green-500/20 px-5 py-2">
          <p>{children}</p>
        </motion.button>
      </motion.div>
    </MotionConfig>
  );
}
