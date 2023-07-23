// app/components/layout/navbar/Container.tsx

import clsx from 'clsx';

type ContainerProps = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function Container({ id, className, children }: ContainerProps) {
  return (
    <div
      id={id}
      className={clsx(
        'mx-auto max-w-292 px-4 mobile-lg:px-6.5 tablet:px-9 desktop:px-8 wide:px-0',
        className
      )}
    >
      {children}
    </div>
  );
}
