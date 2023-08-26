// @ts-nocheck
// app/components/ctrl-link2.tsx

import { MotionProps, motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

type ComponentTypes = 'anchor' | 'button' | 'link';

type BaseProps = {
  className: string;
  children: React.ReactNode;
  componentType: ComponentTypes;
};

export type CtrlLinkProps = BaseProps &
  MotionProps & {
    componentType: ComponentTypes;
  } & (
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | LinkProps
  );

export default motion(
  forwardRef(function CtrlLink(
    { componentType, children, className, ...props }: CtrlLinkProps,
    ref: any
  ) {
    if (componentType === 'anchor') {
      return (
        <a
          ref={ref}
          className={className}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    if (componentType === 'button') {
      return (
        <button
          ref={ref}
          className={className}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      );
    }

    if (componentType === 'link') {
      return (
        <Link ref={ref} className={className} {...(props as LinkProps)}>
          {children}
        </Link>
      );
    }
  })
);
