// app/components/info-card.tsx

import { ReactNode } from 'react';
import { FadeIn } from './fade-in';
import { ColorAccents } from './color-accents';

interface InfoCardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  showAccents?: boolean;
}

export default function InfoCard({
  title,
  description,
  children,
  showAccents = false,
}: InfoCardProps) {
  return (
    <>
      <FadeIn
        className="relative mt-20 flex min-h-[318px]
          w-full items-center justify-center overflow-hidden rounded-3xl  bg-white/[.68] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20"
      >
        {showAccents && <ColorAccents />}

        <div className="flex justify-start">
          <div className="flex flex-col items-center justify-center gap-6 ">
            <h2 className="text-center font-inter text-fs-middle text-shark">
              {title}
            </h2>

            <p className="text-center font-open-sans text-fs-lg text-shark [text-wrap:balance]">
              {description}
            </p>

            <div className=" flex w-full items-center justify-center overflow-hidden ">
              <div className="isolate mt-5 flex  w-full flex-col items-center justify-center laptop:w-3/4">
                <div className="flex w-full flex-col justify-self-center tablet:justify-self-start laptop:w-2/5 ">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
}

export function InfoCardDark({
  title,
  description,
  children,
  showAccents = false,
}: InfoCardProps) {
  return (
    <>
      <FadeIn
        className="relative mt-20 flex min-h-[318px]
          w-full items-center justify-center overflow-hidden rounded-3xl bg-shark px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20"
      >
        {showAccents && <ColorAccents />}

        <div className="flex justify-start">
          <div className="flex flex-col items-center justify-center gap-6 ">
            <h2 className="text-center font-inter text-fs-middle text-white">
              {title}
            </h2>

            <p className="text-center font-open-sans text-fs-lg text-white [text-wrap:balance]">
              {description}
            </p>

            <div className=" flex w-full items-center justify-center overflow-hidden ">
              <div className="isolate mt-5 flex  w-full flex-col items-center justify-center laptop:w-3/4">
                <div className="flex w-full flex-col justify-self-center tablet:justify-self-start laptop:w-2/5 ">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
}
