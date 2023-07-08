// src/app/tab-hoarders/components/ButtonPhat.tsx

import clsx from 'clsx';
import PuzzleIcon2 from './icons/puzzle2';

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
    <div>
      {' '}
      <button type="button" className={style}>
        <div className="flex h-[2.5rem] w-[2.5rem] justify-center rounded-[1.5rem] bg-white p-[0.5625rem]">
          <PuzzleIcon2 />
        </div>
        Add to Chrome
      </button>
    </div>
  );
}

export default ButtonPhat;
