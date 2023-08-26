// app/tab-hoarders/components/Button.tsx
'use client';

import { cx, cva } from '@/cva.config';
import { motion } from 'framer-motion';
import CtrlLink from '../ctrl-link';
import {
  PlayIcon,
  PuzzleIcon2,
  PuzzleIcon,
  PuzzlePhat,
  HeartHandIcon,
  FilledStarIcon,
} from '../icons/button-icons';
// import PuzzleIcon from '../icons/puzzle';

const variantStyles = {
  IconComponents: {
    puzzle: PuzzleIcon,
    puzzle2: PuzzleIcon2,
    play: PlayIcon,
    puzzlePhat: PuzzlePhat,
    heartHandIcon: HeartHandIcon,
    filledStarIcon: FilledStarIcon,
  },
};

const button = cva({
  base: 'flex justify-center items-center py-2  font-open-sans group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-[#0a2b35] relative shadow-sm overflow-hidden',

  variants: {
    intent: {
      solid: 'rounded-[37px] bg-highlighter-900 text-white w-full ',
      outline:
        'border-2 rounded-[37px] border-highlighter-900 text-highlighter-900 focus:outline-none active:text-[#0a2b35]/70 w-full',
      phat: '',
      simple: '',
    },
    size: {
      thin: 'h-14 flex w-full items-center justify-center text-center flex-row text-lg leading-6 font-semibold',
      phat: 'inline-block inline-flex w-[231px] text-lg leading-[1.6875rem] font-normal text-white justify-start rounded-full bg-highlighter-900 px-5 py-4 ',
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
        '[--color-from:#ffffff] tablet:[--color-to:#0C3440] active:[--color-from:#ffffffcc] active:tablet:[--color-to:#0a2b35b3]',
    },
    {
      intent: 'outline',
      animation: 'slice',
      className: '',
    },
    {
      intent: 'solid',
      animation: 'none',
      className:
        'hover:bg-highlighter-900/90 active:bg-[#0a2b35] active:text-white/80',
    },
    {
      intent: 'outline',
      animation: 'none',
      className:
        'focus:outline-none hover:bg-highlighter-900/10 active:text-[#0a2b35]/70',
    },
  ],
});

const colorFill = cva({
  variants: {
    animation: {
      slice:
        'pointer-events-none absolute bg-highlighter-focus-400 [--rotate-from:-68.566deg] [--x-to:0%] tablet:-left-18 tablet:-top-48 tablet:h-[700px] tablet:w-[650px] tablet:[--x-from:-110%] tab-pro:-left-12 tab-pro:-top-30 tab-pro:h-[375px] tab-pro:w-96 tab-pro:[--x-from:-100%] laptop:-left-10 laptop:-top-16 laptop:h-72 laptop:w-80',
    },
  },
});
const ColorFill = motion(function ColorFill({ animation }: any) {
  return (
    <>
      <motion.span
        className={colorFill({ animation })}
        // className={button({ intent, size, className })}
        // className="pointer-events-none absolute bg-highlighter-focus-400 [--rotate-from:-68.566deg] [--x-to:0%] tablet:-left-18 tablet:-top-48 tablet:h-[700px] tablet:w-[650px] tablet:[--x-from:-110%] tab-pro:-left-12 tab-pro:-top-30 tab-pro:h-[375px] tab-pro:w-96 tab-pro:[--x-from:-100%] laptop:-left-10 laptop:-top-16 laptop:h-72 laptop:w-80"
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
  icon?:
    | 'puzzle'
    | 'puzzle2'
    | 'play'
    | 'puzzlePhat'
    | 'heartHandIcon'
    | 'filledStarIcon';
  animation?: 'slice' | 'none';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  aTag: boolean;
  target: string;
}

function Button({
  variant,
  size,
  icon,
  animation = 'none',
  children,
  className,
  onClick,
  href,
  target = '',
  aTag = false,
  ...props
}: ButtonProps) {
  const intent = variant;

  //@ts-ignore
  const IconComponent = variantStyles.IconComponents[icon];

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
          // whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={button({ intent, size, className, animation })}
        >
          <ColorFill aria-hidden="true" animation={animation} intent={intent} />

          <motion.div className="relative flex w-full items-center justify-center gap-2 text-center">
            {IconComponent && (
              <IconComponent
                // className={'group-active:!fill-[#0a2b35]/70'}
                animation={animation}
              />
            )}
            <motion.span
              // className="groupactive:!text-[#0a2b35]/70"
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

export default Button;
