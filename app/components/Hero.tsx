'use client';
// app/components/Hero.tsx

import ButtonPrimary from './ButtonPrimary';
import HeroAnimation from './icons/hero-animation';
import Container from './layout/Container';
import Image from 'next/image';

// TODO: YOu have double the top padding that you need/should have
export default function Hero() {
  return (
    <>
      {/* className="mx-auto flex w-full flex-col bg-red-500" */}
      <Container
        // className="flex laptop:flex-row laptop:justify-between"
        className="mx-auto flex w-full flex-col laptop:flex-row laptop:justify-between wide:h-109"
      >
        {/* gap-[3.44rem] */}
        <div className="flex w-full flex-col gap-14 laptop:max-w-[586px] wide:gap-28">
          <div className="relative flex flex-col items-start gap-8 ">
            <h1 className="z-10 font-inter text-fs-xl text-dark1">
              Ctrl-F Plus:
              <br />
              <span className="whitespace-nowrap">For the</span>
              <br className="tab-pro:hidden" />
              <span className="-mx-2 whitespace-nowrap rounded-2xl bg-highlight-focus px-2 tab-pro:ml-1 ">
                Tab Hoarders
              </span>
            </h1>
            {/* max-w-[23.4375rem] */}
            <p className="max-w-full font-open-sans text-fs-lg text-dark1 tablet:max-w-[48rem]">
              Tab hoarders, your time has come. Ctrl-F Plus searches across all
              your precious tabs, not just the one you&apos;re currently
              obsessing over.
            </p>
            {/* <span className="absolute -left-[0.5625rem] top-[6.6875rem]  h-[3.8125rem] w-[24.5rem] rounded-2xl bg-highlight-focus" /> */}
          </div>
          <div className="flex flex-col gap-6 tab-pro:flex-row">
            <ButtonPrimary variant="solid">
              Add to Chrome for free
            </ButtonPrimary>
            <ButtonPrimary variant="outline">See how it works</ButtonPrimary>
          </div>
        </div>
        {/* <SearchIcon className="flex flex-auto" /> */}
        <div className="-mt-10 hidden laptop:block  desktop:-mt-6">
          <HeroAnimation className="flex flex-auto" />
          {/* <Image
            className="flex flex-auto"
            width={500}
            height={500}
            src={'/images/HeroGIF.gif'}
            alt={''}
          /> */}
        </div>
      </Container>
    </>
  );
}
