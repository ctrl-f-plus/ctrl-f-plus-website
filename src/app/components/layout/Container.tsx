// src/app/components/layout/navbar/Container.tsx

import clsx from 'clsx';

type ContainerProps = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function Container({
  id,
  className,
  children,
}: // ...props
ContainerProps) {
  // const baseClasses = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
  // const baseClasses = 'mx-auto max-w-7xl px-[1.81rem] ';
  const baseClasses = 'max-w-7xl px-[1.81rem] ';
  return (
    <div id={id} className={clsx(baseClasses, className)}>
      {children}
    </div>
  );
}
