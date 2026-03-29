// app/components/ctrl-link.tsx

import Link from 'next/link';

export default function CtrlLink({ aTag, button, ...props }: any) {
  if (aTag == true) {
    return <a {...props}>{props.children}</a>;
  }

  if (button) {
    return <button {...props}>{props.children}</button>;
  }

  return <Link {...props}>{props.children}</Link>;
}
