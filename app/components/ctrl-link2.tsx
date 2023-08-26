// // app/components/ctrl-link2.tsx

// import { motion } from 'framer-motion';
// import Link, { LinkProps } from 'next/link';
// import React, { Ref, forwardRef } from 'react';

// type ComponentTypes = 'anchor' | 'btn' | 'link';

// type BaseProps = {
//   children: React.ReactNode;
//   type: ComponentTypes;
// };

// type CtrlLinkPropsMap = BaseProps & {
//   anchor: BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
//   btn: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
//   link: BaseProps & LinkProps;
// };

// // type CtrlLinkProps = {
// //   [K in ComponentTypes]: { type: K } & CtrlLinkPropsMap[K];
// // }[ComponentTypes];

// type CtrlLinkProps = BaseProps &
//   (
//     | (CtrlLinkPropsMap['anchor'] & { type: 'anchor' })
//     | (CtrlLinkPropsMap['btn'] & { type: 'button' })
//     | (CtrlLinkPropsMap['link'] & { type: 'link' })
//   );

// type RefType<T extends ComponentTypes> = T extends 'anchor'
//   ? HTMLAnchorElement
//   : T extends 'btn'
//   ? HTMLButtonElement
//   : HTMLAnchorElement;

// export default motion(
//   forwardRef<RefType<ComponentTypes>, CtrlLinkProps>(function CtrlLink(
//     { children, type, ...props }: CtrlLinkProps,
//     // ref: any
//     ref
//   ) {
//     const components = {
//       anchor: 'a',
//       btn: 'button',
//       link: Link,
//     };

//     const Component = components[type];

//     return React.createElement(
//       Component,
//       {
//         ref,
//         ...props,
//       },
//       children
//     );
//   })
// );

// // const CtrlLink = motion(
// //   forwardRef(function CtrlLink({ children, aTag, type, ...props }: any, ref) {
// //     const components = {
// //       anchor: 'a',
// //       btn: 'button',
// //       link: Link,
// //     };

// //     const Component = components[type] || 'a';

// //     return (
// //       <Component ref={ref} {...props}>
// //         {children}
// //       </Component>
// //     );
// //   })
// // );

// // export default CtrlLink;

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
