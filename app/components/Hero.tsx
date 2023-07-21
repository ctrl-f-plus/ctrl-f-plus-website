// app/components/Hero.tsx

import ButtonPrimary from './buttons/ButtonPrimary';
import ButtonMobile from './buttons/button-mobile';
import HeroAnimation from './icons/hero-animation';
import Container from './layout/Container';
import QuickView from './quick-view';
import Image from 'next/image';

// TODO: YOu have double the top padding that you need/should have
export default function Hero() {
  return (
    <>
      <Container className="mt-18 flex w-full flex-col tablet:mt-24 laptop:flex-row laptop:justify-between wide:mt-[7.625rem] wide:h-109">
        <div className="flex w-full flex-col gap-14 laptop:max-w-[586px] wide:gap-28">
          <div className="relative flex flex-col items-start gap-8 ">
            <h1 className="z-10 font-inter text-fs-xxx text-dark1 mobile-md:text-fs-xl">
              Ctrl-F Plus:
              <br />
              <span className="">For the</span>
              <br className="tab-pro:hidden" />
              <span className="-ml-2 rounded-2xl bg-highlight-focus  px-2  mobile-md:-mx-2 mobile-md:hidden">
                Tab{' '}
              </span>
              <span className="-ml-2 rounded-2xl bg-highlight-focus px-2 text-fs-xx mobile-md:-mx-2 mobile-md:hidden">
                Hoarders
              </span>
              <span className="-ml-2 hidden whitespace-nowrap  rounded-2xl  bg-highlight-focus px-2 mobile-md:-mx-2 mobile-md:block">
                Tab Hoarders
              </span>
            </h1>

            <p className="max-w-full font-open-sans text-fs-lg text-dark1 tablet:max-w-[48rem]">
              Tab hoarders, your time has come. Ctrl-F Plus searches across all
              your precious tabs, not just the one you&apos;re currently
              obsessing over.
            </p>
            {/* <span className="absolute -left-[0.5625rem] top-[6.6875rem]  h-[3.8125rem] w-[24.5rem] rounded-2xl bg-highlight-focus" /> */}
          </div>
          <div className="hidden flex-col gap-6 tablet:flex tab-pro:flex-row">
            <ButtonPrimary variant="solid">
              Add to Chrome for free
            </ButtonPrimary>

            <QuickView />
          </div>

          <div className="flex flex-col gap-6 tablet:hidden tab-pro:flex-row">
            <ButtonMobile variant="solid">Add to Chrome for free</ButtonMobile>

            <ButtonMobile variant="outline">See how it works</ButtonMobile>
          </div>
        </div>
        {/* <SearchIcon className="flex flex-auto" /> */}
        <div className="-mt-10 hidden laptop:block  desktop:-mt-20">
          {/* <HeroAnimation className="flex flex-auto" /> */}
          <Image
            className="flex flex-auto"
            // width={500}
            // height={500}
            width={480}
            height={423}
            src={'/images/hero.gif'}
            alt={''}
          />
        </div>
      </Container>
    </>
  );
}
