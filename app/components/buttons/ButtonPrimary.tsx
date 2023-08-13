// app/tab-hoarders/components/Button.tsx
'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PlayIcon } from '../icons/play';
import PuzzleIcon from '../icons/puzzle';
import PuzzleIcon2 from '../icons/puzzle2';
import { ButtonHTMLAttributes } from 'react';
import CtrlLink from '../ctrl-link';

const baseStyles = {
  base: 'flex justify-center items-center py-2 font-open-sans  group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-[#0a2b35] relative  shadow-sm overflow-hidden',
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
    solid: PuzzleIcon,
    outline: PlayIcon,
    phat: PuzzleIcon2,
  },
};

function ButtonThin({ children, variant }: any) {
  //@ts-ignore
  const IconComponent = variantStyles.IconComponents[variant];
  const textVariants = {
    initial: { color: '#ffffff' },
    hover: { color: '#0C3440' },
  };

  return (
    <>
      <motion.div className="relative flex w-full items-center justify-center gap-2 text-center">
        {IconComponent && (
          <IconComponent className={'group-active:!fill-[#0a2b35]/70'} />
        )}
        <motion.span
          className="group-active:!text-[#0a2b35]/70"
          transition={{ duration: 0.5, ease: 'linear' }}
          variants={textVariants}
        >
          {children}
        </motion.span>
      </motion.div>
    </>
  );
}

function ButtonPhat({ children, variant }: any) {
  //@ts-ignore
  const IconComponent = variantStyles.IconComponents[variant];
  const textVariants = {
    initial: { color: '#ffffff' },
    hover: { color: '#0C3440' },
  };

  const puzzleVariants = {
    initial: { rotate: '0deg' },
    hover: { rotate: '-90deg' },
  };

  const puzzleBgVariants = {
    initial: { backgroundColor: '#ffffff' },
    hover: { backgroundColor: '#0C3440' },
  };
  return (
    <>
      <motion.div
        variants={textVariants}
        className="relative flex w-full items-center  gap-4  text-center"
      >
        <motion.div
          className="relative flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[1.5rem] bg-white p-[0.5625rem]"
          variants={puzzleBgVariants}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.span
            transition={{ type: 'spring', bounce: 0.6 }}
            variants={puzzleVariants}
          >
            {IconComponent && <IconComponent />}
          </motion.span>
        </motion.div>

        <motion.span
          className="group-active:!text-[#0a2b35]/70"
          transition={{ duration: 0.5, ease: 'linear' }}
        >
          {children}
        </motion.span>
      </motion.div>
    </>
  );
}

function ColorFill() {
  const backgroundVariants = {
    hover: { translateX: '0%' },
  };

  return (
    <>
      <motion.span
        className="pointer-events-none absolute -left-18 -top-48 hidden h-[700px] w-[650px] bg-highlighter-focus-400 tablet:block tab-pro:hidden"
        initial={{ rotate: -68.566, translateX: '-110%' }}
        variants={backgroundVariants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <motion.span
        className="pointer-events-none absolute -left-12 -top-30 hidden h-[375px] w-96 bg-highlighter-focus-400 tab-pro:block laptop:hidden"
        initial={{ rotate: -68.566, translateX: '-100%' }}
        variants={backgroundVariants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <motion.span
        className="pointer-events-none absolute -left-10 -top-16 hidden h-72 w-80 bg-highlighter-focus-400 laptop:block"
        initial={{ rotate: -68.566, translateX: '-100%' }}
        variants={backgroundVariants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    </>
  );
}

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
interface ButtonProps {
  variant: 'solid' | 'outline' | 'simple' | 'phat';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  aTag: boolean;
  target: string;
}

function ButtonPrimary({
  variant,
  children,
  className,
  onClick,
  href,
  target = '',
  aTag = false,
  ...props
}: ButtonProps) {
  className = clsx(baseStyles['base'], variantStyles[variant], className);

  // if (aTag) {
  return (
    <>
      <CtrlLink
        href={href}
        className=" h-full w-full rounded-[37px]"
        onClick={onClick}
        target={target}
        aTag
        {...props}
      >
        <motion.div
          whileHover="hover"
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={className}
        >
          <ColorFill aria-hidden="true" />

          {variant !== 'phat' ? (
            <ButtonThin variant={variant}>{children}</ButtonThin>
          ) : (
            <ButtonPhat variant={variant}>{children}</ButtonPhat>
          )}
        </motion.div>
      </CtrlLink>
    </>
  );
}

export default ButtonPrimary;
