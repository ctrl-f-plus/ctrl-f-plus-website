// app/components/call-to-action.tsx

'use client';

import Atropos from 'atropos/react';
import ButtonPhat from './buttons/ButtonPhat';
import ButtonPrimary from './buttons/ButtonPrimary';
import Container from './container';
import ButtonPhatMobile from './buttons/button-phat-mobile';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn } from './fade-in';

export default function CallToAction() {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = () => {
    return {
      hidden: { opacity: 0, y: 500 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          opacity: { duration: 1.9 },
          y: { duration: 1.3 },
        },
      },
    };
  };

  return (
    <FadeIn>
      <section
        id="call-to-action"
        aria-label="Try the Ctrl-F Chrome Extension today!"
        className="mt-18 tablet:mt-24 wide:mt-[7.625rem]"
      >
        <Container className="flex w-full flex-col  laptop:hidden laptop:flex-row laptop:justify-between ">
          <FadeIn
            className="relative isolate flex h-[32.8125rem] w-full flex-col items-center justify-center gap-9 overflow-hidden rounded-[2.25rem] bg-shark  px-[2.25rem] text-center shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
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

            <div className="flex flex-col items-center justify-center gap-9">
              <h2 className="font-inter text-fs-x0 text-white [text-wrap:balance] tab-pro:text-fs-xl laptop:max-w-[31.9375rem]">
                Take your tab hoarding to the next level.
              </h2>
              {/* <p className=" max-w-[26.75rem] font-open-sans text-fs-lg text-white tablet:max-w-[25.8125rem]">
              Think your tabs are out of control? Nah, they&apos;re just
              misunderstood. Get Ctrl-F Plus for Chrome and let your tabs run
              wild! After all, the only thing better than a dozen tabs is a
              couple dozen more.
            </p> */}
              {/* <p className="max-w-3xl font-open-sans text-fs-lg text-white "> */}
              <p className="max-w-[26.75rem] font-open-sans text-fs-lg text-white tablet:max-w-[25.8125rem]">
                <span className="[text-wrap:balance]">
                  Think your tabs are out of control?{' '}
                </span>
                {/* <br /> */}
                <span className="[text-wrap:balance]">
                  Nah, they&apos;re just misunderstood.
                </span>

                <br />
                <span className="[text-wrap:balance]">
                  Add Ctrl-F Plus to your browser and let your tabs run wild!
                </span>
                {/* After all, the only thing better than a dozen tabs is a couple
                  dozen more. */}
              </p>
              <ButtonPhatMobile />
              {/* <ButtonPrimary variant={'phat'}>Add to Chrome</ButtonPrimary> */}
            </div>
          </FadeIn>
        </Container>

        <Container className=" hidden w-full flex-col laptop:flex laptop:flex-row laptop:justify-between">
          <FadeIn
            className="h-full w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Atropos
              className="hidden h-full w-full rounded-[2.25rem]"
              shadow={prefersReducedMotion ? false : true}
              activeOffset={prefersReducedMotion ? 0 : 50}
              rotateTouch={prefersReducedMotion ? false : true} // Disables rotation on touch
              rotateXMax={prefersReducedMotion ? 0 : 15} // Maximum rotation on the x-axis
              rotateYMax={prefersReducedMotion ? 0 : 15} // Maximum rotation on the y-axis
              rotate={prefersReducedMotion ? false : true}
            >
              <motion.div className="relative isolate flex h-[32.8125rem] w-full flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-shark  px-[2.25rem] text-center">
                <div className="absolute -top-24 right-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 translate-x-1/2 rounded-full bg-[#8DBEDA] blur-[43.5px] filter " />
                <div className="absolute -bottom-24 left-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 -translate-x-1/2 rounded-full bg-[#03AF7D] blur-[43.5px] filter " />

                <div
                  data-atropos-offset={prefersReducedMotion ? 0 : 10}
                  className="flex flex-col items-center justify-center gap-9"
                >
                  {/* <h2 className=" font-inter text-fs-x0 text-white tablet:text-fs-xl laptop:max-w-[31.9375rem] "> */}
                  <h2 className=" max-w-3xl font-inter text-fs-x0 text-white [text-wrap:balance] tab-pro:text-fs-xl">
                    Take your tab hoarding to the next level.
                  </h2>
                  {/* <p className="max-w-[26.75rem] font-open-sans text-fs-lg text-white tablet:max-w-[25.8125rem]"> */}
                  <p className="max-w-3xl font-open-sans text-fs-lg text-white ">
                    <span className="[text-wrap:balance]">
                      Think your tabs are out of control?{' '}
                    </span>
                    {/* <br /> */}
                    <span className="[text-wrap:balance]">
                      Nah, they&apos;re just misunderstood.
                    </span>

                    <br />
                    <span className="[text-wrap:balance]">
                      Add Ctrl-F Plus to your browser and let your tabs run
                      wild!
                    </span>
                    {/* After all, the only thing better than a dozen tabs is a couple
                  dozen more. */}
                  </p>
                  {/* <ButtonPhat /> */}
                  <ButtonPrimary
                    variant={'phat'}
                    href={process.env.CHROME_STORE_URL}
                    target={'_blank'}
                    aTag
                  >
                    Add to Chrome
                  </ButtonPrimary>
                </div>
              </motion.div>
            </Atropos>
          </FadeIn>
        </Container>
      </section>
    </FadeIn>
  );
}
