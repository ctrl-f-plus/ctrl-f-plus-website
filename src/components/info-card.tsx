// src/components/info-card.tsx

import type { ReactNode } from 'react';
import type { VariantProps } from 'cva';
import { cva } from '../../cva.config';
import { FadeIn } from './fade-in';
import { ColorAccents } from '@/components/color-accents';

const infoCardVariants = cva({
  base: 'relative mt-20 flex min-h-[318px] w-full items-center justify-center overflow-hidden rounded-3xl px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20',
  variants: {
    variant: {
      default: 'bg-white/[.68] text-shark',
      inverted: 'bg-shark text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function InfoCardTitle({ children }: Readonly<{ children: React.ReactNode }>) {
  return <h2 className="text-center font-inter text-fs-middle">{children}</h2>;
}

function InfoCardDescription({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <p className="text-center font-open-sans text-fs-lg [text-wrap:balance]">
      {children}
    </p>
  );
}

function InfoCardAction({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <div className="isolate mt-5 flex w-full flex-col items-center justify-center laptop:w-3/4">
        <div className="flex w-full flex-col justify-self-center tablet:justify-self-start laptop:w-2/5">
          {children}
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  children,
  showAccents = false,
  variant,
  className,
}: Readonly<
  VariantProps<typeof infoCardVariants> & {
    children?: ReactNode;
    showAccents?: boolean;
    className?: string;
  }
>) {
  return (
    <FadeIn className={infoCardVariants({ variant, className })}>
      {showAccents && <ColorAccents />}

      <div className="flex justify-start">
        <div className="flex flex-col items-center justify-center gap-6">
          {children}
        </div>
      </div>
    </FadeIn>
  );
}

export {
  infoCardVariants,
  InfoCard,
  InfoCardTitle,
  InfoCardDescription,
  InfoCardAction,
};
