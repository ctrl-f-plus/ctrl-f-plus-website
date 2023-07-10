// src/app/tab-hoarders/components/Button.tsx

// 'use client';
// import { useCallback } from 'react';
import clsx from 'clsx';
import { PlayIcon } from './icons/play';
import PuzzleIcon from './icons/puzzle';

// TODO: Shadow?
// px-9
// shadow-sm
const baseStyles = {
  base: 'flex h-14 w-full justify-center items-center gap-2 rounded-[37px] py-2 font-open-sans text-fs-md-bold group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a2b35] shadow-sm',
};

const variantStyles = {
  solid:
    'bg-primary1 text-white hover:bg-primary1/90 active:bg-[#0a2b35] active:text-white/80 ',

  outline:
    'border-2 border-primary1 text-primary1  focus:outline-none hover:bg-primary1/10  active:text-[#0a2b35]/70',
  IconComponents: {
    solid: PuzzleIcon,
    outline: PlayIcon,
  },
};

type ButtonProps = {
  variant: 'solid' | 'outline';
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

  const IconComponent = variantStyles.IconComponents[variant];
  className = clsx(baseStyles['base'], variantStyles[variant], className);

  return (
    <button
      type="button"
      className={className}
      // onClick={handleClick}
    >
      {IconComponent && <IconComponent />}
      {children}
    </button>
  );

  // return (
  //   <div className="flex flex-col gap-5 ">
  //     <button
  //       type="button"
  //       className="flex h-14 w-full items-center justify-center gap-2 rounded-[37px] bg-primary1 px-9 py-2 font-open-sans text-fs-md-bold text-white"
  //     >
  //       <PuzzleIcon />
  //       <span>Add to Chrome for free</span>
  //     </button>
  //     <button
  //       type="button"
  //       className="flex h-14 w-full items-center justify-center gap-2 rounded-[37px] border-2 border-primary1 px-9 py-2 font-open-sans text-fs-md-bold  text-primary1"
  //     >
  //       <PlayIcon />
  //       See how it works
  //     </button>
  //   </div>
  // );
}

export default ButtonPrimary;
