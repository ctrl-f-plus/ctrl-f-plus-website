// app/components/mdx.tsx

import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import * as React from 'react';
import clsx from 'clsx';
import Title from './title';
import CopyButton from './copy-button';

const components = {
  h1: ({ className, ...props }: any) => (
    <h1
      className={clsx(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: any) => (
    <h2
      className={clsx(
        'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: any) => (
    <h3
      className={clsx(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: any) => (
    <h4
      className={clsx(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: any) => (
    <h5
      className={clsx(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: any) => (
    <h6
      className={clsx(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: any) => (
    <a
      className={clsx('font-medium underline underline-offset-4', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: any) => (
    <p
      className={clsx('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: any) => (
    <ul className={clsx('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: any) => (
    <ol className={clsx('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: any) => (
    <li className={clsx('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: any) => (
    <blockquote
      className={clsx(
        '[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic',
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={clsx('rounded-md border', className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={clsx('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={clsx('even:bg-muted m-0 border-t p-0', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: any) => (
    <th
      className={clsx(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: any) => (
    <td
      className={clsx(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: any) => (
    <pre
      className={clsx(
        'group relative m-0 overflow-x-auto rounded-md !bg-transparent py-4',
        className
      )}
      {...props}
    >
      <CopyButton text={props.__rawstring__} />
      {props.children}
    </pre>
  ),
  code: ({ className, ...props }: any) => (
    <code
      className={clsx(
        'relative rounded  px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  ),
  Image,
  Title,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose max-w-none">
      <Component components={{ ...components }} />
    </article>
  );
}
