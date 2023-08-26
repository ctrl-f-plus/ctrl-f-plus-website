// // app/components/layout/customLink.tsx
// // import { ComponentProps } from 'react';
// 'use client';

import { motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

type ComponentTypes = 'anchor' | 'button' | 'link';

type BaseProps = {
  children: React.ReactNode;
  type: ComponentTypes;
};

type CtrlLinkPropsMap = {
  anchor: BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
  btn: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
  link: BaseProps & LinkProps;
};

type CtrlLinkProps = BaseProps &
  (
    | (CtrlLinkPropsMap['anchor'] & { type: 'anchor' })
    | (CtrlLinkPropsMap['btn'] & { type: 'button' })
    | (CtrlLinkPropsMap['link'] & { type: 'link' })
  );

// type CtrlLinkProps = BaseProps &
//   {
//     [K in ComponentTypes]: { type: K } & CtrlLinkPropsMap[K];
//   }[ComponentTypes];

export default motion(
  forwardRef(function CtrlLink(
    { type, children, ...props }: CtrlLinkProps,
    ref: any
  ) {
    if (type === 'anchor') {
      return (
        <a
          ref={ref}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    if (type === 'button') {
      return (
        <button
          ref={ref}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      );
    }

    if (type === 'link') {
      return (
        <Link ref={ref} {...(props as LinkProps)}>
          {children}
        </Link>
      );
    }
  })
);
