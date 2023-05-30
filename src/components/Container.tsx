import clsx from 'clsx';

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

function Container({ className, children }: ContainerProps) {
  return (
    <div className={clsx('mx-auto max-w-7xl sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
export default Container;
