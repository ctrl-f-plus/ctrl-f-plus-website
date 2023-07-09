// src/app/tab-hoarders/components/ButtonPhat.tsx

import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="isolate">
      {/* overflow-hidden */}
      <motion.button
        href="#"
        className="group relative  inline-block inline-flex w-[231px] items-center justify-start overflow-hidden  rounded-full bg-primary1 px-5 py-3 font-bold"
        // onHoverStart={toggle}
        // onHoverEnd={toggle}
      >
        <LayoutGroup>
          <motion.span
            layout
            className="absolute -left-10 -top-16 h-72 w-80 bg-highlight-focus-1 "
            initial={{ rotate: -68.566, translateX: '-100%' }}
            animate={
              isOpen
                ? { translateX: '-100%' }
                : {
                    translateX: '0%',
                    transitionEnd: {},
                  }
            }
            // whileHover={{
            //   translateX: '0%',
            // }}\
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          <motion.div
            layout
            onClick={toggle}
            className="relative flex w-full items-center justify-center  gap-4 text-center text-white"
          >
            <motion.div
              className="relative flex h-[2.5rem] w-[2.5rem] justify-center rounded-[1.5rem] bg-white p-[0.5625rem]"
              layout
              initial={{ backgroundColor: '#ffffff' }}
              animate={
                isOpen
                  ? {
                      backgroundColor: '#ffffff',
                    }
                  : {
                      backgroundColor: '#0C3440',
                    }
              }
            >
              <motion.span
                layout
                className="isolate"
                initial={{ rotate: '-90deg' }}
                transition={{ type: 'spring', bounce: 0.6 }}
                animate={
                  isOpen
                    ? {
                        rotate: '0deg',
                      }
                    : {
                        rotate: '-90deg',
                      }
                }
              >
                <PuzzleIcon2 fillColor={isOpen ? '#0C3440' : '#48D0A8'} />
              </motion.span>
            </motion.div>

            <motion.span
              layout
              className="font-open-sans text-fs-lg"
              initial={{ color: '#ffffff' }}
              transition={{ duration: 0.5, ease: 'linear' }}
              animate={
                isOpen
                  ? {
                      color: '#ffffff',
                    }
                  : {
                      color: '#0C3440',
                    }
              }
            >
              Add to Chrome
            </motion.span>
          </motion.div>
        </LayoutGroup>
      </motion.button>
    </div>
  );
}

export default ButtonPhat;
