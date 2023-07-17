// app/components/layout/navbar/Container.tsx

import clsx from "clsx";

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
  // max-w-7xl

  // const baseClasses = "max-w-292 wide:px-0 tablet:px-9 px-6.5 desktop:px-8";
  // const baseClasses = 'wide:max-w-292 desktop:max-w-276 tablet:max-w-174 max-w-94 bg-purple-500';

  return (
    <div
      id={id}
      className={clsx(
        "max-w-292 px-3 iphone:px-6.5 tablet:px-9 desktop:px-8 wide:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
