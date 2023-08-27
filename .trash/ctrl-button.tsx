// @ts-nocheck
// app/components/buttons/ctrl-button.tsx
'use client';
import { cva, type VariantProps } from 'cva';
import { motion, useReducedMotion } from 'framer-motion';
import { LinkProps } from 'next/link';
import CtrlLink2, { CtrlLinkProps } from './ctrl-link2';
import {
  FilledStarIcon,
  HeartHandIcon,
  PlayIcon,
} from '../app/components/icons/button-icons';
import PuzzleIcon from '../app/components/icons/puzzle';
import PuzzleIcon2 from '../icons/puzzle2';
import { ColorFill } from '../app/components/buttons/Button';

const button = cva({
  base: 'flex justify-center items-center py-2 font-open-sans group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-[#0a2b35] relative shadow-sm overflow-hidden',
  variants: {
    intent: {
      solid: 'bg-highlighter-900 text-white text-lg leading-6 font-semibold',
      // active:text-[#0a2b35]/70
      outline:
        'border-2 rounded-[37px] border-highlighter-900 text-highlighter-900 focus:outline-none text-lg leading-6 font-semibold h-14 w-full',
    },
    size: {
      default: 'rounded-[37px] h-14 w-full',
      thic: 'inline-block inline-flex !px-5 w-[231px] text-fs-lg text-white justify-start rounded-full py-3 h-[64px]',
    },
    animation: {
      none: '',
      basic: '[--scale-from:100%] tab-pro:[--scale-to:80%]',
      slice: '',
    },
  },
  compoundVariants: [
    {
      intent: 'solid',
      animation: 'none',
      className:
        'hover:bg-highlighter-900/90 active:bg-[#0a2b35] active:text-white/80',
    },
    {
      intent: 'outline',
      animation: 'none',
      // className: 'group bg-white/[.68]',
      className: 'hover:bg-highlighter-900/10 active:text-[#0a2b35]/70',
    },
    {
      intent: 'outline',
      animation: 'slice',
      // className: 'group bg-white/[.68]',
      className: '',
    },
  ],
  defaultVariants: {
    intent: 'outline',
    size: 'default',
  },
});

function ButtonIcon(icon: string, intent: any): React.ReactNode {
  if (icon === 'play') return <PlayIcon intent={intent} />;
  if (icon === 'puzzle') return <PuzzleIcon />;
  if (icon === 'puzzle2') return <PuzzleIcon2 />;
  if (icon === 'filledStar') return <FilledStarIcon />;
  if (icon === 'heartHand') return <HeartHandIcon />;
}

type CtrlButtonProps = CtrlLinkProps &
  VariantProps<typeof button> & {
    children: React.ReactNode;
    icon?: 'play' | 'puzzle' | 'puzzle2' | 'star' | 'filledStar' | 'heartHand';
    href?: string;
    target?: string;
    className?: string;
  };

export default function CtrlButton({
  children,
  intent,
  size,
  icon,
  animation,
  href,
  target,
  className,
  componentType,
  ...props
}: CtrlButtonProps) {
  let prefersReducedMotion = useReducedMotion();
  const motionProps = props;
  console.log(intent);
  return (
    <>
      <CtrlLink2
        className={button({ intent, size, className, animation })}
        initial="default"
        whileHover={prefersReducedMotion ? 'default' : 'hover'}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        variants={{
          default: { scale: 'var(--scale-from)' },
          hover: { scale: 'var(--scale-to)' },
        }}
        href={href}
        target={target}
        componentType={'anchor'}
        {...motionProps}
      >
        {' '}
        <motion.div
          whileHover="hover"
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={className}
        >
          <ColorFill aria-hidden="true" />

          {icon && (
            <>
              {ButtonIcon(icon, intent)}
              {'\u00A0'}
            </>
          )}
          {children}
        </motion.div>
      </CtrlLink2>
    </>
  );
}
