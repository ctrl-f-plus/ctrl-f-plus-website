'use client';

import clsx from 'clsx';
import { PlayIcon } from '../icons/button-icons';
import PuzzleIcon from '../icons/puzzle';
import CtrlLink from '../ctrl-link';

// focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-[#0a2b35]
const baseStyles = {
  base: 'flex h-14 w-full justify-center items-center gap-2 rounded-[37px] py-2 font-open-sans text-fs-md-bold group shadow-sm',
};

const variantStyles = {
  // hover:bg-highlighter-900/90 active:bg-[#0a2b35] active:text-white/80
  simple: 'bg-highlighter-900 text-white',

  // hover:bg-highlighter-900/90 active:bg-[#0a2b35] active:text-white/80
  solid: 'bg-highlighter-900 text-white',

  // focus:outline-none hover:bg-highlighter-900/10  active:text-[#0a2b35]/70
  outline: 'border-2 border-highlighter-900 text-highlighter-900',

  IconComponents: {
    solid: PuzzleIcon,
    outline: PlayIcon,
  },
};

type ButtonProps = {
  variant: 'solid' | 'outline' | 'simple';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  aTag: boolean;
  target: string;
};

function ButtonMobile({
  variant,
  children,
  className,
  onClick,
  href,
  target = '',
  aTag = false,
  ...props
}: ButtonProps) {
  //@ts-ignore
  const IconComponent = variantStyles.IconComponents[variant];
  className = clsx(baseStyles['base'], variantStyles[variant], className);

  return (
    <CtrlLink
      type="button"
      href={href}
      className={className}
      onClick={onClick}
      target={target}
      aTag
      {...props}
    >
      {IconComponent && (
        <IconComponent className="fill-white tablet:group-active:!fill-white/80" />
      )}
      {children}
    </CtrlLink>
  );
}

export default ButtonMobile;
