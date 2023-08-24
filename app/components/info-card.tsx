// app/components/info-card.tsx

import { ReactNode } from 'react';
import ButtonPrimaryCopy from './buttons/button-primary-copy';
import { FadeIn } from './fade-in';
import { FilledStarIcon } from './icons/button-icons';
import { ColorAccents } from './temp-components/color-accents';

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
      {/* <FadeIn
        // min-h-[318px]
        className="// relative mt-20 flex min-h-[318px]
          w-full items-center justify-center overflow-hidden rounded-3xl  bg-white/[.68] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20"
      >
        <ColorAccents />

        <div className=" flex justify-start">
          <div className=" flex flex-col items-center justify-center gap-6 ">
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
                  <ButtonPrimaryCopy
                    variant={'outline'}
                    className="group bg-white/[.68]"
                    href={process.env.NEXT_PUBLIC_GITHUB_EXT_URL}
                    aTag
                    target={'_blank'}
                  >
                    <FilledStarIcon className="  fill-yellow-500 " /> Star us on
                    GitHub!
                  </ButtonPrimaryCopy>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn> */}

      <FadeIn
        className="relative mt-20 flex min-h-[318px]
          w-full items-center justify-center overflow-hidden rounded-3xl  bg-white/[.68] px-4 py-14 shadow-sm backdrop-blur-[23px] mobile-md:px-8 tablet:p-14 tab-pro:px-14 laptop:px-16 desktop:px-20"
      >
        {showAccents && <ColorAccents />}

        <div className=" flex justify-start">
          <div className=" flex flex-col items-center justify-center gap-6 ">
            <div className=" flex justify-start">
              <div className=" flex flex-col items-center justify-center gap-6 ">
                {children}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  );
}
