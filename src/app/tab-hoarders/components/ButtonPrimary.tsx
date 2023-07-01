// src/app/tab-hoarders/components/Button.tsx

// 'use client';
// import { useCallback } from 'react';
import clsx from 'clsx';

function PuzzleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.381 10.4762H17.8095V6.28571C17.8095 5.12811 16.8719 4.19046 15.7143 4.19046H11.5238V2.61903C11.5238 1.17332 10.3505 0 8.90475 0C7.45903 0 6.28571 1.17332 6.28571 2.61903V4.19046H2.09525C0.937652 4.19046 0.0105089 5.12806 0.0105089 6.28571L0.00525446 10.2667H1.57143C3.1324 10.2667 4.4 11.5343 4.4 13.0953C4.4 14.6562 3.1324 15.9238 1.57143 15.9238H0.00525446L0 19.9047C0 21.0624 0.937603 22 2.09525 22H6.07622V20.4286C6.07622 18.8676 7.34383 17.6 8.90479 17.6C10.4658 17.6 11.7334 18.8676 11.7334 20.4286V22H15.7143C16.8719 22 17.8095 21.0624 17.8095 19.9047V15.7143H19.381C20.8267 15.7143 22 14.541 22 13.0953C22 11.6495 20.8267 10.4762 19.381 10.4762Z"
        fill="white"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6275 8.2775L3.75 0.8375C3.3819 0.619715 2.96269 0.50327 2.535 0.5C1.86268 0.5 1.21789 0.76708 0.742485 1.24248C0.26708 1.71789 0 2.36268 0 3.035V19.0025C8.55053e-05 19.4487 0.119686 19.8867 0.346367 20.2709C0.573047 20.6552 0.898531 20.9718 1.28898 21.1877C1.67942 21.4035 2.12057 21.5109 2.56656 21.4986C3.01255 21.4862 3.44709 21.3546 3.825 21.1175L16.7175 12.9725C17.1184 12.7216 17.4474 12.3712 17.6726 11.9553C17.8977 11.5394 18.0113 11.0723 18.0022 10.5995C17.9932 10.1267 17.8618 9.66428 17.6208 9.25735C17.3799 8.85042 17.0377 8.51283 16.6275 8.2775Z"
        fill="#0C3440"
      />
    </svg>
  );
}

const baseStyles = {
  base: 'flex h-14 w-full items-center justify-center gap-2 rounded-[37px] px-9 py-2 font-open-sans text-fs-md-bold',
};

const variantStyles = {
  solid: 'bg-primary1 text-white',
  outline: 'border-2 border-primary1 text-primary1',
  IconComponents: {
    solid: PuzzleIcon,
    outline: PlayIcon,
  },
};

{
  /* <button
        type="button"
        className="text-sm gap-5 rounded-full bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button> */
}
// self-stretch

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
