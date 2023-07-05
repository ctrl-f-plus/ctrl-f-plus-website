'use client';
// src/app/components/Hero.tsx

import Container from './layout/Container';
import ButtonPrimary from './ButtonPrimary';
import HeroAnimation from './icons/hero-animation';
import SearchIcon from './icons/search';

// TODO: YOu have double the top padding that you need/should have
export default function Hero() {
  return (
    <div>
      <Container className="flex   laptop:flex-row laptop:justify-between">
        {/* gap-[3.44rem] */}
        <div className="flex w-full flex-col gap-14 laptop:max-w-[586px] desktop:gap-28">
          <div className="relative flex flex-col items-start gap-8 ">
            <h1 className="z-10 font-inter text-fs-xl text-dark1">
              Ctrl-F Plus:
              <br />
              For the
              <br className="tablet:hidden" />
              <span className="ml-1 rounded-2xl bg-highlight-focus px-2">
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
          <div className="flex flex-col gap-6 tablet:flex-row">
            <ButtonPrimary variant="solid">
              Add to Chrome for free
            </ButtonPrimary>
            <ButtonPrimary variant="outline">See how it works</ButtonPrimary>
          </div>
        </div>
        {/* <SearchIcon className="flex flex-auto" /> */}
        <div className="-mt-10 hidden  laptop:block">
          <HeroAnimation className="flex flex-auto" />
        </div>
      </Container>
    </div>
  );
}
