// app/tab-hoarders/components/Button.tsx
'use client';

import { cva, cx } from '@/cva.config';
import { VariantProps } from 'cva';
import { m, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ButtonHTMLAttributes } from 'react';
const CtrlLink = dynamic(() => import('./ctrl-link'));

const FilledStarIcon = dynamic(() =>
  import('./icons/button-icons').then((mod) => mod.FilledStarIcon)
);
const HeartHandIcon = dynamic(() =>
  import('./icons/button-icons').then((mod) => mod.HeartHandIcon)
);
const PlayIcon = dynamic(() =>
  import('./icons/button-icons').then((mod) => mod.PlayIcon)
);
const PuzzleIcon = dynamic(() =>
  import('./icons/button-icons').then((mod) => mod.PuzzleIcon)
);
const PuzzleIcon2 = dynamic(() =>
  import('./icons/button-icons').then((mod) => mod.PuzzleIcon2)
);
const PuzzleIconWithBg = dynamic(() =>
  import('./icons/button-icons').then((mod) => mod.PuzzleIconWithBg)
);

const btn = cva({
  base: 'flex justify-center items-center py-2  font-open-sans group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-[#0a2b35] relative shadow-sm overflow-hidden',
  variants: {
    intent: {
      solid: 'rounded-[37px] bg-highlighter-900 text-white w-full',
      outline:
        'border-2 rounded-[37px] border-highlighter-900 text-highlighter-900 focus:outline-none active:text-[#0a2b35]/70 w-full',
    },
    size: {
      thin: 'h-14 flex w-full items-center justify-center text-center flex-row text-lg leading-6 font-semibold',
      phat: 'inline-block w-[231px] text-lg leading-[1.6875rem] font-normal text-white justify-start rounded-full px-5 py-4 ',
    },
    animation: {
      none: '',
      slice: '',
    },
  },
  compoundVariants: [
    {
      intent: 'solid',
      animation: 'slice',
      className:
        '[--color-from:#ffffff] tablet:[--color-to:#0C3440] active:[--color-from:#ffffffcc] active:tablet:[--color-to:#0a2b35b3] ',
    },
    {
      intent: 'solid',
      animation: 'slice',
      size: 'phat',
      className: '[--scale-from:100%] [--scale-to:93%]',
    },
    {
      intent: 'solid',
      animation: 'none',
      className:
        'hover:bg-highlighter-900/90 active:bg-[#0a2b35] active:text-white/80 ',
    },
    {
      intent: 'outline',
      animation: 'none',
      className:
        'focus:outline-none hover:bg-highlighter-900/10 active:text-[#0a2b35]/70',
    },
  ],
});

const ColorFill = m(function ColorFill({
  animation,
}: VariantProps<typeof btn>) {
  return (
    <>
      <m.span
        className={cx(
          animation === 'slice'
            ? 'pointer-events-none absolute bg-highlighter-focus-400 [--rotate-from:-68.566deg] [--x-to:0%] tablet:-left-18 tablet:-top-48 tablet:h-[700px] tablet:w-[650px] tablet:[--x-from:-110%] tab-pro:-left-12 tab-pro:-top-30 tab-pro:h-[375px] tab-pro:w-96 tab-pro:[--x-from:-100%] laptop:-left-10 laptop:-top-16 laptop:h-72 laptop:w-80'
            : ''
        )}
        variants={{
          initial: {
            rotate: 'var(--rotate-from)',
            x: 'var(--x-from)',
            // background: 'var(--background-to)',
          },
          hover: {
            x: 'var(--x-to)',
            // background: 'var(--background-to)'
          },
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    </>
  );
});

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof btn> {
  children: React.ReactNode;
  icon?:
    | 'puzzle'
    | 'puzzle2'
    | 'play'
    | 'puzzleIconWithBg'
    | 'heartHandIcon'
    | 'filledStarIcon';
  href?: string;
  aTag?: boolean;
  target: string;
  button?: boolean;
}

function Button({
  intent,
  size,
  icon,
  animation = 'none',
  children,
  className,
  onClick,
  href,
  target = '',
  aTag = false,
  button = false,
  ...props
}: ButtonProps) {
  let prefersReducedMotion = useReducedMotion();
  animation = prefersReducedMotion ? 'none' : animation;

  const iconVariants = {
    IconComponents: {
      puzzle: PuzzleIcon,
      puzzle2: PuzzleIcon2,
      play: PlayIcon,
      puzzleIconWithBg: PuzzleIconWithBg,
      heartHandIcon: HeartHandIcon,
      filledStarIcon: FilledStarIcon,
    },
  };

  const IconComponent = icon ? iconVariants.IconComponents[icon] : undefined;

  return (
    <CtrlLink
      href={href}
      className="h-full w-full rounded-[37px]"
      onClick={onClick}
      target={target}
      aTag={aTag}
      button
      {...props}
    >
      <m.div
        whileHover="hover"
        initial="initial"
        whileTap="tap"
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={btn({ intent, size, className, animation })}
        variants={{
          initial: { scale: 'var(--scale-from)' },
          tap: { scale: 'var(--scale-to)' },
        }}
      >
        <ColorFill aria-hidden="true" animation={animation} />

        <m.div className="relative flex w-full items-center justify-center gap-2 text-center">
          {IconComponent && (
            <IconComponent animation={animation} intent={intent} size={size} />
          )}

          <m.span
            transition={{ duration: 0.5, ease: 'linear' }}
            variants={{
              initial: { color: 'var(--color-from)' },
              hover: { color: 'var(--color-to)' },
            }}
          >
            {children}
          </m.span>
        </m.div>
      </m.div>
    </CtrlLink>
  );
}

export default Button;
