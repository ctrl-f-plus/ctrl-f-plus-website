// app/components/Hero.tsx

import { Balancer } from 'react-wrap-balancer';
import ButtonPrimary from './buttons/ButtonPrimary';
import ButtonMobile from './buttons/button-mobile';
import HeroAnimation from './icons/hero-animation';
import Container from './layout/Container';
import Image from 'next/image';

// TODO: YOu have double the top padding that you need/should have
export default function Hero() {
  return (
    <>
      <Container className="mx-auto mt-18 flex w-full flex-col tablet:mt-24 laptop:flex-row laptop:justify-between wide:mt-[7.625rem] wide:h-109">
        <div className="flex w-full flex-col gap-14 laptop:max-w-[586px] wide:gap-28">
          <div className="relative flex flex-col items-start gap-8 ">
            {/* <h1 className="z-10 font-inter text-fs-xl text-dark1">
              Ctrl-F Plus:
              <br />
              <span className="whitespace-nowrap">For the</span>
              <br className="tab-pro:hidden" />
              <span
                className="rounded-2xl bg-highlight-focus iphone:-mx-2 iphone:whitespace-nowrap iphone:px-2 tab-pro:ml-1"
                // className="-mx-2 hidden whitespace-nowrap rounded-2xl bg-highlight-focus px-2 iphone:block  tab-pro:ml-1"
              >
                Tab Hoarders
              </span>
            </h1> */}

            <h1 className=" z-10  font-inter text-fs-xxx text-dark1 iphone:text-fs-xl">
              {/* <Balancer> */}
              Ctrl-F Plus:
              <br />
              <span className="">For the</span>
              <br className="tab-pro:hidden" />
              <span className="-ml-2 rounded-2xl bg-highlight-focus  px-2  iphone:-mx-2 iphone:hidden">
                Tab{' '}
              </span>
              <span className="-ml-2 rounded-2xl bg-highlight-focus px-2 text-fs-xx iphone:-mx-2 iphone:hidden">
                Hoarders
              </span>
              <span className="-ml-2 hidden rounded-2xl  bg-highlight-focus  px-2 iphone:-mx-2 iphone:block">
                Tab Hoarders
              </span>
              {/* </Balancer> */}
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

            <ButtonPrimary variant="outline">See how it works</ButtonPrimary>
          </div>

          <div className="flex flex-col gap-6 tablet:hidden tab-pro:flex-row">
            <ButtonMobile variant="solid">Add to Chrome for free</ButtonMobile>

            <ButtonMobile variant="outline">See how it works</ButtonMobile>
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
