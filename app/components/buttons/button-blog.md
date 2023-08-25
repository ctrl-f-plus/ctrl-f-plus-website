 app/components/buttons/button-blog.md
```tsx
// app/components/buttons/ctrl-button.tsx
'use client';
import { MotionConfig, motion } from 'framer-motion';
import { useState } from 'react';

interface CtrlButtonProps {
  children: React.ReactNode;
}

export default function CtrlButton({ children }: CtrlButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <MotionConfig transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
      <motion.div
        className="rounded-md bg-orange-500"
        initial="closed"
        animate={open ? 'open' : 'closed'}
        onHoverStart={() => setOpen(true)}
        onHoverEnd={() => setOpen(false)}
      >
        <motion.button
          variants={{ closed: { scale: 1 }, open: { scale: 0.8 } }}
          className="rounded-md bg-green-500/20 px-5 py-2"
        >
          <p>{children}</p>
        </motion.button>
      </motion.div>
    </MotionConfig>
  );
}

```



```diff
- variants={{ closed: { scale: 1 }, open: { scale: 0.8 } }}

+ variants={{
+   closed: { scale: 'var(--scale-from)' },
+   open: { scale: 'var(--scale-to)' },
+ }}
```


```tsx
...
 style={
    {
      '--scale-from': '100%',
      '--scale-to': '80%',
    } as CSSProperties
  }
        ...
```


With All changes up to this point:
```tsx
// app/components/buttons/ctrl-button.tsx
'use client';
import { MotionConfig, motion } from 'framer-motion';
import { CSSProperties, useState } from 'react';

interface CtrlButtonProps {
  children: React.ReactNode;
}

export default function CtrlButton({ children }: CtrlButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <MotionConfig transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
      <motion.div
        className="rounded-md bg-orange-500"
        initial="closed"
        animate={open ? 'open' : 'closed'}
        onHoverStart={() => setOpen(true)}
        onHoverEnd={() => setOpen(false)}
        variants={{
          closed: { scale: 'var(--scale-from)' },
          open: { scale: 'var(--scale-to)' },
        }}
        style={
          {
            '--scale-from': '100%',
            '--scale-to': '80%',
          } as CSSProperties
        }
      >
        <motion.button
          className="rounded-md bg-green-500/20 px-5 py-2"
        >
          <p>{children}</p>
        </motion.button>
      </motion.div>
    </MotionConfig>
  );
}

```



```diff

      <motion.div
        className="
          rounded-md
          bg-orange-500
+          [--scale-from:100%]
+          [--scale-to:80%]
        "
        initial="closed"
        animate={open ? 'open' : 'closed'}
        onHoverStart={() => setOpen(true)}
        onHoverEnd={() => setOpen(false)}
        variants={{
          closed: { scale: 'var(--scale-from)' },
          open: { scale: 'var(--scale-to)' },
        }}
        style={
          {
 -           '--scale-from': '100%',
 -           '--scale-to': '80%',
          } as CSSProperties
        }
      >
        <motion.button className="rounded-md bg-green-500/20 px-5 py-2">
          <p>{children}</p>
        </motion.button>
      </motion.div>
    </MotionConfig>
  );
}
```


Now we have this:
```tsx
// app/components/buttons/ctrl-button.tsx
'use client';
import { MotionConfig, motion } from 'framer-motion';
import { CSSProperties, useState } from 'react';

interface CtrlButtonProps {
  children: React.ReactNode;
}

export default function CtrlButton({ children }: CtrlButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <MotionConfig transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
      <motion.div
        className="rounded-md bg-orange-500 tab-pro:[--scale-from:100%] tab-pro:[--scale-to:80%]"
        initial="closed"
        animate={open ? 'open' : 'closed'}
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
```


```tsx
// app/components/buttons/ctrl-button.tsx
'use client';
import { motion, useReducedMotion } from 'framer-motion';

interface CtrlButtonProps {
  children: React.ReactNode;
}

export default function CtrlButton({ children }: CtrlButtonProps) {
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

```


```tsx
// app/components/buttons/ctrl-button.tsx
'use client';
import { motion, useReducedMotion } from 'framer-motion';

interface CtrlButtonProps {
  children: React.ReactNode;
}

export default function CtrlButton({ children }: CtrlButtonProps) {
  let prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      className="rounded-md bg-[#CD8425] px-5 py-2 tab-pro:[--scale-from:100%] tab-pro:[--scale-to:80%]"
      initial="default"
      whileHover={prefersReducedMotion ? 'default' : 'hover'}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      variants={{
        default: { scale: 'var(--scale-from)' },
        hover: { scale: 'var(--scale-to)' },
      }}
    >
      {children}
    </motion.button>
  );
}
```


Added CVA to component
```tsx
// app/components/buttons/ctrl-button.tsx
'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { cva, type VariantProps } from 'cva';

const button = cva({
  base: 'rounded-md bg-[#CD8425] px-5 py-2 tab-pro:[--scale-from:100%] tab-pro:[--scale-to:80%]',
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white border-transparent hover:bg-blue-600',
    },
    size: {
      sm: 'text-sm py-1 px-2',
      md: 'text-base py-2 px-4',
    },
  },
  // compoundVariants: [{ intent: 'primary', size: 'md', class: 'uppercase' }],
});

export interface CtrlButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children: React.ReactNode;
}

export default function CtrlButton({
  children,
  className,
  intent,
  size,
  ...props
}: CtrlButtonProps) {
  let prefersReducedMotion = useReducedMotion();

  return (
    //
    <>
      <motion.button
        className={button({ intent, size })}
        initial="default"
        whileHover={prefersReducedMotion ? 'default' : 'hover'}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        variants={{
          default: { scale: 'var(--scale-from)' },
          hover: { scale: 'var(--scale-to)' },
        }}
      >
        {children}
      </motion.button>
    </>
  );
}

```

continuation of previous code block
```tsx
// app/components/buttons/ctrl-button.tsx
'use client';
import { cva, type VariantProps } from 'cva';
import { motion, useReducedMotion } from 'framer-motion';

const button = cva({
  base: 'rounded-md bg-[#CD8425] px-5 py-2 tab-pro:[--scale-from:100%] tab-pro:[--scale-to:80%]',
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white border-transparent hover:bg-blue-600',
    },
    size: {
      sm: 'text-sm py-1 px-2',
      md: 'text-base py-2 px-4',
    },
  },
  // compoundVariants: [{ intent: 'primary', size: 'md', class: 'uppercase' }],
});

// export interface CtrlButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof button> {
//   children: React.ReactNode;
// }

interface CtrlButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
    >,
    VariantProps<typeof button> {
  children: React.ReactNode;
}

export default function CtrlButton({
  children,
  className,
  intent,
  size,
  ...props
}: CtrlButtonProps) {
  let prefersReducedMotion = useReducedMotion();
  const motionProps = props;

  return (
    <>
      <motion.button
        className={button({ intent, size })}
        initial="default"
        whileHover={prefersReducedMotion ? 'default' : 'hover'}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        variants={{
          default: { scale: 'var(--scale-from)' },
          hover: { scale: 'var(--scale-to)' },
        }}
        {...motionProps}
      >
        {children}
      </motion.button>
    </>
  );
}


// cva.config.ts

import { defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';

export const { cva, cx, compose } = defineConfig({
  hooks: {
    'cx:done': (className) => twMerge(className),
  },
});


```


Added more variants to cva
```tsx
// app/components/buttons/ctrl-button.tsx
'use client';
import { cva, type VariantProps } from 'cva';
import { motion, useReducedMotion } from 'framer-motion';

const button = cva({
  base: 'rounded-md bg-[#CD8425] px-5 py-2 tab-pro:[--scale-from:100%] tab-pro:[--scale-to:80%]',
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white border-transparent hover:bg-blue-600',
      secondary: 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100',
    },
    size: {
      sm: 'text-sm py-1 px-2',
      md: 'text-base py-2 px-4',
    },
  },
  compoundVariants: [
    {
      intent: 'primary',
      size: 'md',
      className: 'uppercase',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});

interface CtrlButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
    >,
    VariantProps<typeof button> {
  children: React.ReactNode;
}

export default function CtrlButton({
  children,
  className,
  intent,
  size,
  ...props
}: CtrlButtonProps) {
  let prefersReducedMotion = useReducedMotion();
  const motionProps = props;

  return (
    <>
      <motion.button
        className={button({ intent, size })}
        initial="default"
        whileHover={prefersReducedMotion ? 'default' : 'hover'}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        variants={{
          default: { scale: 'var(--scale-from)' },
          hover: { scale: 'var(--scale-to)' },
        }}
        {...motionProps}
      >
        {children}
      </motion.button>
    </>
  );
}

```

Usage:
```tsx
     <div className="bg-pin-200 flex flex-col items-center bg-shark">
          <div className="flex w-1/3 flex-col items-center gap-6 py-6">
            <CtrlButton>Ctrl Button</CtrlButton>
            <CtrlButton intent="primary" size="sm">
              Ctrl Button
            </CtrlButton>
          </div>
        </div>
  ```
