// app/tab-hoarders/components/Button.tsx

'use client';
// import { useCallback } from 'react';
import clsx from 'clsx';
import { PlayIcon } from '../icons/button-icons';
import PuzzleIcon from '../icons/puzzle';
import CtrlLink from '../ctrl-link';

const baseStyles = {
  base: 'flex h-14 w-full justify-center items-center gap-2 rounded-[37px] py-2 font-open-sans text-fs-md-bold group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a2b35] shadow-sm',
};

const variantStyles = {
  simple:
    'bg-highlighter-900 text-white hover:bg-highlighter-900/90 active:bg-[#0a2b35] active:text-white/80 ',
  solid:
    'bg-highlighter-900 text-white hover:bg-highlighter-900/90 active:bg-[#0a2b35] active:text-white/80 ',

  simplephat:
    'flex justify-center items-center py-2 font-open-sans  group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-[#0a2b35] relative  shadow-sm overflow-hidden inline-block inline-flex !px-5 w-[231px] text-fs-lg text-white justify-start rounded-full bg-highlighter-900 px-5 py-3',

  outline:
    'border-2 border-highlighter-900 text-highlighter-900  focus:outline-none hover:bg-highlighter-900/10  active:text-[#0a2b35]/70',
  IconComponents: {
    solid: PuzzleIcon,
    // outline: PlayIcon,
  },
};

type ButtonProps = {
  variant: 'solid' | 'outline' | 'simple' | 'simplephat';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  aTag: boolean;
  target: string;
};

export default function ButtonPrimaryCopy({
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
      href={href}
      type="button"
      className={className}
      onClick={onClick}
      target={target}
      aTag
      {...props}
    >
      {IconComponent && (
        <IconComponent className="fill-white group-active:!fill-white/80" />
      )}
      {children}
    </CtrlLink>
  );
}
