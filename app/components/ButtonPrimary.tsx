// app/tab-hoarders/components/Button.tsx

'use client';
// import { useCallback } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PlayIcon } from './icons/play';
import PuzzleIcon from './icons/puzzle';
import PuzzleIcon2 from './icons/puzzle2';

// TODO: Shadow?
// px-9
// shadow-sm
const baseStyles = {
  base: 'flex justify-center items-center py-2 font-open-sans  group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-[#0a2b35] relative overflow-hidden',
};

const variantStyles = {
  simple:
    'bg-primary1 rounded-[37px] w-full h-14 text-white hover:bg-primary1/90 active:bg-[#0a2b35] active:text-white/80 text-fs-md-bold',

  solid: 'rounded-[37px] bg-primary1 text-white text-fs-md-bold h-14 w-full',

  outline:
    'border-2 rounded-[37px] border-primary1 text-primary1 focus:outline-none active:text-[#0a2b35]/70 text-fs-md-bold h-14 w-full',

  phat: 'inline-block inline-flex !px-5 w-[231px] text-fs-lg text-white justify-start rounded-full bg-primary1 px-5 py-3',

  IconComponents: {
    solid: PuzzleIcon,
    outline: PlayIcon,
    phat: PuzzleIcon2,
  },

  iconClasses: {
    solid: 'group-active:!fill-[#0a2b35]/70',
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
      <motion.div className="relative flex w-full items-center  gap-4  text-center">
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
          variants={textVariants}
        >
          {children}
        </motion.span>
      </motion.div>
    </>
  );
}

type ButtonProps = {
  variant: 'solid' | 'outline' | 'simple' | 'phat';
  children: React.ReactNode;
  // onClick?: () => void;
  // url: string;

  className?: string;
};

function ButtonPrimary({
  variant,
  children,
  className,

  ...props
}: ButtonProps) {
  // const handleClick = useCallback(
  //   (e: React.MouseEvent) => {
  //     e.preventDefault();
  //     window.open(url, '_blank');
  //   },
  //   [url]
  // );

  // //@ts-ignore
  // const IconComponent = variantStyles.IconComponents[variant];
  //@ts-ignore
  className = clsx(baseStyles['base'], variantStyles[variant], className);

  const bgVariants = {
    hover: { translateX: '0%' },
  };

  return (
    <>
      <Link href="#" className="h-full w-full rounded-[37px] ">
        <motion.div
          whileHover="hover"
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className={className}
        >
          <motion.span
            className="absolute -left-10 -top-16 h-72 w-80 bg-highlight-focus-1 "
            initial={{ rotate: -68.566, translateX: '-100%' }}
            variants={bgVariants}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          {variant !== 'phat' ? (
            <ButtonThin variant={variant}>{children}</ButtonThin>
          ) : (
            <ButtonPhat variant={variant}>{children}</ButtonPhat>
          )}
        </motion.div>
      </Link>
    </>
  );
}

export default ButtonPrimary;
