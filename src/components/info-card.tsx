// src/components/info-card.tsx

import type { ReactNode } from 'react';
import type { VariantProps } from 'cva';
import { cva } from '../../cva.config';
import { FadeIn } from './fade-in';
import { ColorAccents } from './color-accents';

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

interface InfoCardProps extends VariantProps<typeof infoCardVariants> {
  title?: string;
  description?: string;
  children?: ReactNode;
  showAccents?: boolean;
  className?: string;
}

export default function InfoCard({
  title,
  description,
  children,
  showAccents = false,
  variant,
  className,
}: Readonly<InfoCardProps>) {
  return (
    <FadeIn className={infoCardVariants({ variant, className })}>
      {showAccents && <ColorAccents />}

      <div className="flex justify-start">
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="text-center font-inter text-fs-middle">{title}</h2>

          <p className="text-center font-open-sans text-fs-lg [text-wrap:balance]">
            {description}
          </p>

          <div className="flex w-full items-center justify-center overflow-hidden">
            <div className="isolate mt-5 flex w-full flex-col items-center justify-center laptop:w-3/4">
              <div className="flex w-full flex-col justify-self-center tablet:justify-self-start laptop:w-2/5">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export { infoCardVariants };
