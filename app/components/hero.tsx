// app/components/Hero.tsx

import ButtonPrimary from './buttons/ButtonPrimary';
import ButtonMobile from './buttons/button-mobile';
import Container from './container';
import { FadeIn } from './fade-in';
import HeroAnimation from './icons/hero-animation';
import QuickView from './quick-view';
import QuickView2 from './quick-view2';

export default function Hero() {
  return (
    <>
      <FadeIn>
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
                Tab hoarders, your time has come. Ctrl-F Plus searches across
                all your precious tabs, not just the one you&apos;re currently
                obsessing over.
              </p>
            </div>
            <div className="hidden flex-col gap-6 tablet:flex tab-pro:flex-row">
              <ButtonPrimary
                variant="solid"
                href={process.env.CHROME_STORE_URL}
                target={'_blank'}
                aTag
              >
                Add to Chrome for free
              </ButtonPrimary>

              <QuickView />
            </div>

            <div className="flex flex-col gap-6 tablet:hidden tab-pro:flex-row">
              <ButtonMobile
                variant="solid"
                href={process.env.CHROME_STORE_URL}
                target={'_blank'}
                aTag
              >
                Add to Chrome for free
              </ButtonMobile>

              {/* <ButtonMobile variant="outline">See how it works</ButtonMobile> */}

              <QuickView2 />
            </div>
          </div>

          <HeroAnimation className={'hidden laptop:block'} />
        </Container>
      </FadeIn>
    </>
  );
}
