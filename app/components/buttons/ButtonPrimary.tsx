// app/tab-hoarders/components/Button.tsx
'use client';

import { cx, cva } from '@/cva.config';
// import clsx from 'clsx';
import { motion } from 'framer-motion';
import CtrlLink from '../ctrl-link';
import { PlayIcon, PuzzlePhat } from '../icons/button-icons';
import PuzzleIcon from '../icons/puzzle';

const baseStyles = {
  // overflow-hidden
  base: 'flex justify-center items-center py-2 font-open-sans group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-[#0a2b35] relative shadow-sm overflow-hidden',
};

const variantStyles = {
  simple:
    'bg-highlighter-900 rounded-[37px] w-full h-14 text-white hover:bg-highlighter-900/90 active:bg-[#0a2b35] active:text-white/80 text-fs-md-bold',

  solid:
    'rounded-[37px] bg-highlighter-900 text-white text-fs-md-bold h-14 w-full ',

  outline:
    'border-2 rounded-[37px] border-highlighter-900 text-highlighter-900 focus:outline-none active:text-[#0a2b35]/70 text-fs-md-bold h-14 w-full',

  phat: 'inline-block inline-flex !px-5 w-[231px] text-fs-lg text-white justify-start rounded-full bg-highlighter-900 px-5 py-3',

  IconComponents: {
    puzzle: PuzzleIcon,
    play: PlayIcon,
    puzzlePhat: PuzzlePhat,
  },
};

const button = cva({
  // base: 'relative flex w-full items-center justify-center gap-2 text-center ',
  // overflow-hidden
  base: 'flex justify-center items-center py-2 font-open-sans group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-[#0a2b35] relative shadow-sm  overflow-hidden',
  variants: {
    intent: {
      solid:
        'rounded-[37px] bg-highlighter-900 text-white w-full [--color-from:#ffffff] tablet:[--color-to:#0C3440]',
      outline:
        'border-2 rounded-[37px] border-highlighter-900 text-highlighter-900 focus:outline-none active:text-[#0a2b35]/70 w-full color-[#0C3440]',
      phat: '',
      simple: '',
    },
    size: {
      thin: 'h-14 flex w-full items-center justify-center gap-2 text-center  flex-row text-lg leading-6 font-semibold',

      // phat: 'relative flex w-full items-center gap-4 text-center',
      phat: 'inline-block inline-flex w-[231px] text-lg leading-[1.6875rem] font-normal text-white justify-start rounded-full bg-highlighter-900 px-5 py-4 gap-4',
    },
  },
});

const ColorFill = motion(function ColorFill() {
  return (
    <>
      <motion.span
        className="pointer-events-none absolute  bg-highlighter-focus-400 [--rotate-from:-68.566deg] [--x-to:0%] tablet:-left-18 tablet:-top-48 tablet:h-[700px] tablet:w-[650px] tablet:[--x-from:-110%] tab-pro:-left-12 tab-pro:-top-30 tab-pro:h-[375px] tab-pro:w-96 tab-pro:[--x-from:-100%] laptop:-left-10 laptop:-top-16 laptop:h-72 laptop:w-80"
        variants={{
          initial: {
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
});

interface ButtonProps {
  variant: 'solid' | 'outline' | 'simple' | 'phat';
  size: 'thin' | 'phat';
  icon: 'puzzle' | 'play' | 'puzzlePhat';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  aTag: boolean;
  target: string;
}

function ButtonPrimary({
  variant,
  size,
  icon,
  children,
  className,
  onClick,
  href,
  target = '',
  aTag = false,
  ...props
}: ButtonProps) {
  // className = clsx(baseStyles['base'], variantStyles[variant], className);
  const intent = variant;
  // const size = variant === 'phat' ? 'phat' : 'thin';

  //@ts-ignore
  const IconComponent = variantStyles.IconComponents[icon];

  // if (aTag) {
  return (
    <>
      <CtrlLink
        href={href}
        className="h-full w-full rounded-[37px]"
        onClick={onClick}
        target={target}
        aTag
        {...props}
      >
        <motion.div
          whileHover="hover"
          initial="initial"
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={button({ intent, size, className })}
        >
          <ColorFill aria-hidden="true" />

          <motion.div className="relative flex w-full items-center justify-center gap-2 text-center">
            {IconComponent && (
              <IconComponent className={'group-active:!fill-[#0a2b35]/70'} />
            )}
            <motion.span
              className="group-active:!text-[#0a2b35]/70"
              transition={{ duration: 0.5, ease: 'linear' }}
              variants={{
                initial: { color: 'var(--color-from)' },
                hover: { color: 'var(--color-to)' },
              }}
            >
              {children}
            </motion.span>
          </motion.div>
        </motion.div>
      </CtrlLink>
    </>
  );
}

export default ButtonPrimary;
