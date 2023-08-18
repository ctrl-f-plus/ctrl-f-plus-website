// app/components/call-to-action.tsx

'use client';

import Atropos from 'atropos/react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import ButtonPrimary from './buttons/ButtonPrimary';
import ButtonPhatMobile from './buttons/button-phat-mobile';
import Container from './container';
import { FadeIn } from './fade-in';
import '@/styles/ctrl-atropos.css';

function CtaColorAccents() {
  return (
    <>
      <div className="laptop:hidden">
        <svg
          viewBox="0 0 1024 1024"
          className="absolute -right-10 bottom-48 -z-10 h-[40rem] w-[40rem] translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1218)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1218">
              <stop stopColor="#8DBEDA" />
              <stop offset={0} stopColor="#8DBEDA" />
            </radialGradient>
          </defs>
        </svg>

        <svg
          viewBox="0 0 1024 1024"
          className="absolute -left-10 top-48 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#03AF7D" />
              <stop offset={1} stopColor="#03AF7D" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className=" hidden laptop:block">
        {' '}
        <div className="absolute -top-24 right-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 translate-x-1/2 rounded-full bg-[#8DBEDA] blur-[43.5px] filter " />
        <div className="absolute -bottom-24 left-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 -translate-x-1/2 rounded-full bg-[#03AF7D] blur-[43.5px] filter " />
      </div>
    </>
  );
}

function CtaButtons() {
  return (
    <>
      <div className="laptop:hidden">
        <ButtonPhatMobile />
      </div>

      <div className="hidden laptop:block">
        {/* <div> */}{' '}
        <ButtonPrimary
          variant={'phat'}
          href={process.env.CHROME_STORE_URL}
          target={'_blank'}
          aTag
        >
          Add to Chrome
        </ButtonPrimary>
      </div>
    </>
  );
}

function CtaText() {
  return (
    <>
      {/* <p className="font-inter text-fs-base text-white">
        <span className="[text-wrap:balance]">
          Tabs out of control? Nah, they&apos;re just misunderstood.
        </span>
      </p> */}
      {/* <span className="[text-wrap:balance]">
          Tabs feel out of control? They&apos;re just misunderstood.
        </span> */}
      {/* <span className="[text-wrap:balance]">
          The only thing better than a dozen tabs is a couple dozen more
        </span> */}

      <h2
        // [text-wrap:balance]
        className="max-w-[26.75rem] font-inter text-fs-x0 text-white  tablet:max-w-[25.8125rem] tab-pro:text-fs-xl laptop:max-w-3xl "
      >
        Take your tab hoarding to the next level.
      </h2>

      <p className="max-w-[26.75rem] font-open-sans text-fs-lg text-white [text-wrap:balance] tablet:max-w-[25.8125rem] laptop:max-w-3xl ">
        <span className="block">
          Tabs out of control? Nah, they&apos;re just misunderstood.
        </span>
        <span className="block">
          Add Ctrl-F Plus to your browser and let your tabs run wild!
        </span>
      </p>
    </>
  );
}

export default function CallToAction() {
  let prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <FadeIn>
      <section
        id="call-to-action"
        aria-label="Try the Ctrl-F Chrome Extension today!"
        className="mt-18 tablet:mt-24 wide:mt-[7.625rem]"
      >
        <Container className="relative  w-full flex-col laptop:flex laptop:flex-row laptop:justify-between">
          <div className="absolute top-1/3" ref={ref} />

          <div
            className="h-full w-full"
            style={{
              transform:
                isInView || prefersReducedMotion ? 'none' : 'translateY(24px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 1.3s',
            }}
          >
            <div className="laptop:hidden">
              <div className="relative isolate flex h-[32.8125rem] w-full flex-col items-center justify-center gap-9 overflow-hidden rounded-[2.25rem] bg-shark  px-[2.25rem] text-center shadow-xl">
                <CtaColorAccents />
                <CtaText />
                <CtaButtons />
              </div>
            </div>

            <div className="hidden laptop:block ">
              <Atropos
                className="h-full w-full rounded-[2.25rem] "
                shadow={prefersReducedMotion ? false : true}
                activeOffset={prefersReducedMotion ? 0 : 50}
                rotateTouch={prefersReducedMotion ? false : true} // Disables rotation on touch
                rotateXMax={prefersReducedMotion ? 0 : 15} // Maximum rotation on the x-axis
                rotateYMax={prefersReducedMotion ? 0 : 15} // Maximum rotation on the y-axis
                rotate={prefersReducedMotion ? false : true}
              >
                <motion.div className="relative isolate flex h-[32.8125rem] w-full flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-shark px-[2.25rem] text-center">
                  <CtaColorAccents />
                  <div
                    data-atropos-offset={prefersReducedMotion ? 0 : 10}
                    className="flex flex-col items-center justify-center gap-9"
                  >
                    <CtaText />
                    <CtaButtons />
                  </div>
                </motion.div>
              </Atropos>
            </div>
          </div>
        </Container>
      </section>
    </FadeIn>
  );
}
