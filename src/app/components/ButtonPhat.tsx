// src/app/tab-hoarders/components/ButtonPhat.tsx

import { LayoutGroup, motion, useAnimate, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import PuzzleIcon2 from './icons/puzzle2';
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

  const puzzleFillVariants = {
    hover: { fill: '#48D0A8' },
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
            className="absolute -left-10 -top-16 h-72 w-80 bg-highlight-focus-1 "
            initial={{ rotate: -68.566, translateX: '-100%' }}
            variants={bgVariants}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          <motion.div className="relative flex w-full items-center justify-center  gap-4 text-center text-white">
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
                {/* <motion.svg
                  width="23"
                  height="22"
                  viewBox="0 0 23 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  variants={puzzleFillVariants}
                  initial={{ fill: '#0C3440' }}
                >
                  <g id="extension 1" clipPath="url(#clip0_238_1292)">
                    <g id="Group">
                      <g id="Group_2">
                        <path
                          id="Vector"
                          d="M19.881 10.4762H18.3095V6.28571C18.3095 5.12811 17.3719 4.19046 16.2143 4.19046H12.0238V2.61903C12.0238 1.17332 10.8505 0 9.40474 0C7.95903 0 6.78571 1.17332 6.78571 2.61903V4.19046H2.59525C1.43765 4.19046 0.510509 5.12806 0.510509 6.28571L0.505254 10.2667H2.07143C3.6324 10.2667 4.9 11.5343 4.9 13.0953C4.9 14.6562 3.6324 15.9238 2.07143 15.9238H0.505254L0.5 19.9047C0.5 21.0624 1.4376 22 2.59525 22H6.57622V20.4286C6.57622 18.8676 7.84383 17.6 9.40479 17.6C10.9658 17.6 12.2334 18.8676 12.2334 20.4286V22H16.2143C17.3719 22 18.3095 21.0624 18.3095 19.9047V15.7143H19.881C21.3267 15.7143 22.5 14.541 22.5 13.0953C22.5 11.6495 21.3267 10.4762 19.881 10.4762Z"
                        />
                      </g>
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_238_1292">
                      <rect
                        width="22"
                        height="22"
                        // fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </motion.svg> */}
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
