import React from 'react';
import { cx } from 'cva';

export function DoubleCheckIcon({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cx('h-6 w-6', className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 7 17l-5-5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m22 10-7.5 7.5L13 16"
      />
    </svg>
  );
}
