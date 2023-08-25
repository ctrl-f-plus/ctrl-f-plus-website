 app/components/buttons/button-blog.md
```tsx
// app/components/buttons/ctrl-button.tsx
'use client';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
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
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
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
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
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
