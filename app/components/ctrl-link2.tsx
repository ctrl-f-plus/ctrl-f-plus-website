// // app/components/layout/customLink.tsx
// // import { ComponentProps } from 'react';
// 'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { forwardRef } from 'react';

export default motion(
  forwardRef(function CtrlLink({ aTag, ...props }: any, ref) {
    return aTag ? (
      <a ref={ref} {...props}>
        {props.children}
      </a>
    ) : (
      <>
        <Link ref={ref} {...props}>
          {props.children}
        </Link>
      </>
    );
  })
);

// const CtrlLink = forwardRef(function CtrlLink({ aTag, ...props }: any, ref) {
//   return aTag ? (
//     <a ref={ref} {...props}>
//       {props.children}
//     </a>
//   ) : (
//     <>
//       <Link ref={ref} {...props}>
//         {props.children}
//       </Link>
//     </>
//   );
// });

// export default motion(CtrlLink);

// type ButtonOrLinkProps = ComponentProps<'button'> & ComponentProps<'a'>;

// export interface Props extends ButtonOrLinkProps {}

// export function ButtonOrLink({ href, ...props }: Props) {
//   const isLink = typeof href !== 'undefined';
//   const ButtonOrLink = isLink ?
// }
