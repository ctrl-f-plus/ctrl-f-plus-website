// app/components/buttons/button-mobile.tsx

// app/tab-hoarders/components/Button.tsx

import clsx from 'clsx';
import { PlayIcon } from '../icons/play';
import PuzzleIcon from '../icons/puzzle';

// focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-[#0a2b35]
const baseStyles = {
  base: 'flex h-14 w-full justify-center items-center gap-2 rounded-[37px] py-2 font-open-sans text-fs-md-bold group shadow-sm',
};

const variantStyles = {
  // hover:bg-primary1/90 active:bg-[#0a2b35] active:text-white/80
  simple: 'bg-primary1 text-white',

  // hover:bg-primary1/90 active:bg-[#0a2b35] active:text-white/80
  solid: 'bg-primary1 text-white',

  // focus:outline-none hover:bg-primary1/10  active:text-[#0a2b35]/70
  outline: 'border-2 border-primary1 text-primary1',

  IconComponents: {
    solid: PuzzleIcon,
    outline: PlayIcon,
  },
};

type ButtonProps = {
  variant: 'solid' | 'outline' | 'simple';
  children: React.ReactNode;
  // onClick?: () => void;
  // url: string;

  className?: string;
};

function ButtonMobile({
  variant,
  children,
  className,

  ...props
}: ButtonProps) {
  //@ts-ignore
  const IconComponent = variantStyles.IconComponents[variant];
  className = clsx(baseStyles['base'], variantStyles[variant], className);

  return (
    <button type="button" className={className}>
      {IconComponent && (
        <IconComponent className="fill-white group-active:!fill-white/80" />
      )}
      {children}
    </button>
  );
}

export default ButtonMobile;
