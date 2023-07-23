// app/tab-hoarders/components/ButtonPhat.tsx
'use client';
import { LayoutGroup, motion, useAnimate, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import PuzzleIcon2 from '../icons/puzzle2';
import Link from 'next/link';

type ButtonProps = {
  // children: React.ReactNode;
  // onClick?: () => void;
  // url: string;
  className?: string;
};

// TODO: 1. Combine this into `ButtonPrimary`
// TODO: 2. Fix the styling of the button's width
function ButtonPhat({ className, ...props }: ButtonProps) {
  const puzzleVariants = {
    initial: { rotate: '0deg' },
    hover: { rotate: '-90deg' },
  };

  const textVariants = {
    initial: { color: '#ffffff' },
    hover: { color: '#0C3440' },
  };
  const bgVariants = {
    hover: { translateX: '0%' },
  };

  const puzzleBgVariants = {
    initial: { backgroundColor: '#ffffff' },
    hover: { backgroundColor: '#0C3440' },
  };

  return (
    <>
      <motion.div
        whileHover="hover"
        // whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="group relative  inline-block inline-flex w-[231px] items-center justify-start overflow-hidden rounded-full bg-primary1 px-5 py-3 font-bold"
      >
        <Link href="#">
          <motion.span
            className="pointer-events-none absolute -left-10 -top-16 h-72 w-80 bg-highlight-focus-1"
            initial={{ rotate: -68.566, translateX: '-100%' }}
            variants={bgVariants}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          <motion.div className="relative flex w-full items-center justify-center gap-4 text-center text-white">
            <motion.div
              className="relative flex h-[2.5rem] w-[2.5rem] justify-center rounded-[1.5rem] bg-white p-[0.5625rem]"
              variants={puzzleBgVariants}
              // transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <motion.span
                transition={{ type: 'spring', bounce: 0.6 }}
                variants={puzzleVariants}
              >
                <PuzzleIcon2 />
              </motion.span>
            </motion.div>

            <motion.span
              className=" font-open-sans text-fs-lg"
              transition={{ duration: 0.5, ease: 'linear' }}
              variants={textVariants}
            >
              Add to Chrome
            </motion.span>
          </motion.div>
          {/* </LayoutGroup> */}
        </Link>
      </motion.div>
    </>
  );
}

export default ButtonPhat;
