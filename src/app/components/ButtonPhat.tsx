// src/app/tab-hoarders/components/ButtonPhat.tsx

import clsx from 'clsx';
import PuzzleIcon2 from './icons/puzzle2';
import { motion } from 'framer-motion';

type ButtonProps = {
  // children: React.ReactNode;
  // onClick?: () => void;
  // url: string;
  className?: string;
};

// TODO: 1. Combine this into `ButtonPrimary`
// TODO: 2. Fix the styling of the button's width
function ButtonPhat({ className, ...props }: ButtonProps) {
  const style = clsx(
    className,
    'flex h-auto w-[299px] items-center justify-center gap-4 rounded-[72px] bg-primary1 py-2 font-open-sans text-fs-lg text-white'
  );

  return (
    <>
      {/* ```tsx */}
      <div>
        {' '}
        <button
          type="button"
          className="flex h-auto w-[299px] items-center justify-center gap-4 rounded-[72px] bg-primary1 py-2 font-open-sans text-fs-lg text-white"
        >
          <div className="flex h-[2.5rem] w-[2.5rem] justify-center rounded-[1.5rem] bg-white p-[0.5625rem]">
            <PuzzleIcon2 />
          </div>
          Add to Chrome
        </button>
      </div>
      {/* ```

```tsx */}
      <a
        href="#_"
        className="group relative inline-block inline-flex items-center justify-start  rounded-full px-5 py-3 font-bold"
      >
        <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-white opacity-[3%]"></span>

        <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-white opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>

        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
          Button Text
        </span>
        <span className="absolute inset-0 rounded-full border-2 border-white"></span>
      </a>
      {/* ``` */}

      <a
        href="#_"
        className="group relative inline-block inline-flex items-center justify-start  rounded-full px-5 py-3 font-bold"
      >
        <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-white opacity-[3%]"></span>

        {/* <span className="absolute left-0 top-0 -mt-1 h-64 w-64 -translate-x-80 -translate-y-32 rotate-45 bg-red-500 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span> */}

        {/* <span className="absolute left-0 top-0 -mt-1 h-64 w-64 -translate-x-80 -translate-y-32 rotate-45 bg-red-500 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8" /> */}

        <motion.span
          className="absolute left-0 top-0 -mt-1 h-64 w-64 rotate-45 bg-red-500 opacity-100"
          initial={{ translateX: '-80%', translateY: '-32%' }}
          animate={{ translateX: '0%', translateY: '0%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          whileHover={{ translateX: '-8%' }}
        />

        <span className="relative flex w-full items-center justify-center gap-4 text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900 ">
          <div className="flex h-[2.5rem] w-[2.5rem] justify-center rounded-[1.5rem] bg-white p-[0.5625rem]">
            <PuzzleIcon2 />
          </div>
          Add to Chrome
        </span>
        <span className="absolute inset-0 rounded-full border-2 border-white"></span>
      </a>
    </>
  );
}

export default ButtonPhat;
