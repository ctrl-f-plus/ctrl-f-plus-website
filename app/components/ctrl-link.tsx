// app/components/layout/customLink.tsx
// import { ComponentProps } from 'react';
import Link from 'next/link';

export default function CtrlLink({ aTag, ...props }: any) {
  return aTag ? (
    <a {...props}>{props.children}</a>
  ) : (
    <>
      <Link {...props}>{props.children}</Link>
    </>
  );
}

// type ButtonOrLinkProps = ComponentProps<'button'> & ComponentProps<'a'>;

// export interface Props extends ButtonOrLinkProps {}

// export function ButtonOrLink({ href, ...props }: Props) {
//   const isLink = typeof href !== 'undefined';
//   const ButtonOrLink = isLink ?
// }
