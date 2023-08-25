// app/components/buttons/ctrl-button.tsx
'use client';
import { cva, type VariantProps } from 'cva';
import { motion, useReducedMotion } from 'framer-motion';
import {
  PlayIcon,
  StarIcon,
  FilledStarIcon,
  HeartHandIcon,
} from '../icons/button-icons';
import PuzzleIcon from '../icons/puzzle';
import PuzzleIcon2 from '../icons/puzzle2';

const button = cva({
  base: 'flex justify-center items-center py-2 font-open-sans group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-[#0a2b35] relative shadow-sm overflow-hidden tab-pro:',
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white border-transparent hover:bg-blue-600',
      secondary: 'bg-white text-gray-800 border-gray-400 hover:bg-gray-100',
      dark: 'bg-highlighter-900',
      solid: 'bg-highlighter-900 text-white text-lg leading-6 font-semibold',

      // active:text-[#0a2b35]/70
      outline:
        'border-2 rounded-[37px] border-highlighter-900 text-highlighter-900 focus:outline-none text-lg leading-6 font-semibold h-14 w-full',
    },
    size: {
      sm: 'text-sm py-1 px-2',
      md: 'text-base py-2 px-4',
      default: 'rounded-[37px] h-14 w-full',
      thic: 'inline-block inline-flex !px-5 w-[231px] text-fs-lg text-white justify-start rounded-full py-3 h-[64px]',
    },
    animation: {
      basic: '[--scale-from:100%] tab-pro:[--scale-to:80%]',
      simple: '',
    },
  },
  compoundVariants: [
    {
      intent: 'solid',
      animation: 'simple',
      className:
        'hover:bg-highlighter-900/90 active:bg-[#0a2b35] active:text-white/80',
    },
    {
      intent: 'outline',
      animation: 'simple',
      // className: 'group bg-white/[.68]',
      className: 'hover:bg-highlighter-900/10 active:text-[#0a2b35]/70',
    },
  ],
  defaultVariants: {
    intent: 'outline',
    size: 'default',
  },
});

function ButtonIcon(icon: string): React.ReactNode {
  if (icon === 'play')
    return (
      <PlayIcon
      // intent="circle"
      />
    );
  if (icon === 'puzzle') return <PuzzleIcon />;
  if (icon === 'puzzle2') return <PuzzleIcon2 />;
  if (icon === 'star') return <StarIcon />;
  if (icon === 'filledStar') return <FilledStarIcon />;
  if (icon === 'heartHand') return <HeartHandIcon />;
}

interface CtrlButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
    >,
    VariantProps<typeof button> {
  children: React.ReactNode;
  icon?: 'play' | 'puzzle' | 'puzzle2' | 'star' | 'filledStar' | 'heartHand';
  href?: string;
  target?: string;
}

export default function CtrlButton({
  children,
  className,
  intent,
  size,
  icon,
  animation,
  href,
  target,
  ...props
}: CtrlButtonProps) {
  let prefersReducedMotion = useReducedMotion();
  const motionProps = props;

  return (
    <>
      <motion.button
        className={button({ intent, size, className, animation })}
        initial="default"
        whileHover={prefersReducedMotion ? 'default' : 'hover'}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        variants={{
          default: { scale: 'var(--scale-from)' },
          hover: { scale: 'var(--scale-to)' },
        }}
        // href={href}
        // target={target}
        {...motionProps}
      >
        {icon && (
          <>
            {ButtonIcon(icon)}
            {'\u00A0'}
          </>
        )}
        {children}
      </motion.button>
    </>
  );
}
