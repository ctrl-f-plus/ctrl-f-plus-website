// src/app/tab-hoarders/components/ButtonPhat.tsx

import clsx from 'clsx';
import PuzzleIcon2 from './icons/puzzle2';
import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';

type ButtonProps = {
  // children: React.ReactNode;
  // onClick?: () => void;
  // url: string;
  className?: string;
};

// TODO: 1. Combine this into `ButtonPrimary`
// TODO: 2. Fix the styling of the button's width
function ButtonPhat({ className, ...props }: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const style = clsx(
    className,
    'flex h-auto w-[299px] items-center justify-center gap-4 rounded-[72px] bg-primary1 py-2 font-open-sans text-fs-lg text-white'
  );

  return (
    <>
      {/* <div>
        {' '}
        <button
          type="button"
          className="flex h-auto w-[231px] items-center justify-center gap-4 rounded-[72px] bg-primary1 py-2 font-open-sans text-fs-lg text-white"
        >
          <div className="flex h-[2.5rem] w-[2.5rem] justify-center rounded-[1.5rem] bg-white p-[0.5625rem]">
            <PuzzleIcon2 />
          </div>
          Add to Chrome
        </button>
      </div> */}

      <button
        // href=""
        // className="rounded-full bg-slate-500 px-5 py-3"
        // overflow-hidden
        className="group relative inline-block inline-flex w-[231px] items-center justify-start  rounded-full  bg-primary1 px-5 py-3 font-bold"
      >
        <LayoutGroup>
          <motion.span
            layout
            className="absolute -left-10 -top-16 h-72 w-80 bg-highlight-focus-1"
            // style={{
            //   rotate: -68.566,
            //   translateX: '-100%',
            // }}
            initial={{ rotate: -68.566, translateX: '-100%' }}
            // initial={{ rotate: -68.566, translateY: '-25%' }}
            animate={
              isOpen
                ? { translateX: '0%' }
                : {
                    translateX: '-100%',
                    // transitionEnd: {
                    //   translateY: '-25%',
                    // },
                  }
            }
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          <motion.div
            layout
            onClick={toggle}
            className="relative flex w-full items-center justify-center  gap-4 text-center text-white"
          >
            <motion.div
              className="flex h-[2.5rem] w-[2.5rem] justify-center rounded-[1.5rem] bg-white p-[0.5625rem]"
              layout
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
              <motion.div
                animate={
                  isOpen
                    ? {
                        // backgroundColor: '#48D0A8',
                        rotate: '0deg',
                      }
                    : {
                        rotate: '-90deg',
                      }
                }
              >
                <PuzzleIcon2 fillColor={isOpen ? '#0C3440' : '#48D0A8'} />
              </motion.div>
            </motion.div>
            Add to Chrome
          </motion.div>
        </LayoutGroup>
      </button>
    </>
  );
}

export default ButtonPhat;
