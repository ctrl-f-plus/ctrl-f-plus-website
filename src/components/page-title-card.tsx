// src/components/page-title-card.tsx
import 'server-only';

import { cx } from '../../cva.config';
import { FadeIn } from './fade-in';
import React from 'react';

function PageTitleCardDate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <p className="font-open-sans text-caption-gray tab-pro:text-fs-lg">
      {children}
    </p>
  );
}

function PageTitleCardTitle({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <h1 className="font-inter text-fs-xl text-shark">{children}</h1>;
}

function PageTitleCardDescription({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <p className={cx('font-open-sans text-fs-lg text-shark', className)}>
      {children}
    </p>
  );
}

function PageTitleCard({
  children,
  illustration,
  className,
}: Readonly<{
  children: React.ReactNode;
  illustration?: React.ReactNode;
  className?: string;
}>) {
  return (
    <FadeIn
      className={cx(
        'flex min-h-[318px] w-full items-center justify-center rounded-3xl bg-white/[.47] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20',
        className,
      )}
    >
      <div className="flex justify-start">
        <div className="flex flex-col items-start justify-center gap-6">
          {children}
        </div>
        {illustration && (
          <div className="hidden flex-col justify-center desktop:flex">
            {illustration}
          </div>
        )}
      </div>
    </FadeIn>
  );
}

export {
  PageTitleCard,
  PageTitleCardDate,
  PageTitleCardTitle,
  PageTitleCardDescription,
};
