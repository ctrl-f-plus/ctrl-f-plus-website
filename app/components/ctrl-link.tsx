// app/components/ctrl-link.tsx

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
