// app/components/call-to-action.tsx

'use client';

import Atropos from 'atropos/react';
import ButtonPhat from './buttons/ButtonPhat';
import ButtonPrimary from './buttons/ButtonPrimary';
import Container from './Container';
import ButtonPhatMobile from './buttons/button-phat-mobile';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn, FadeInStagger } from './fade-in';

export default function CallToAction() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <FadeIn>
      <section
        id="call-to-action"
        aria-label="Try the Ctrl-F Chrome Extension today!"
        className="mt-18 tablet:mt-24 wide:mt-[7.625rem]"
      >
        <Container className=" hidden w-full flex-col laptop:flex laptop:flex-row laptop:justify-between">
          {/* <motion.div */}
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
              <motion.div className="relative isolate flex h-[32.8125rem] w-full flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-dark1  px-[2.25rem] text-center">
                <div className="absolute -top-24 right-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 translate-x-1/2 rounded-full bg-[#8DBEDA] blur-[43.5px] filter " />
                <div className="absolute -bottom-24 left-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 -translate-x-1/2 rounded-full bg-[#03AF7D] blur-[43.5px] filter " />

                <div
                  data-atropos-offset={prefersReducedMotion ? 0 : 10}
                  className="flex flex-col items-center justify-center gap-9"
                >
                  {/* <h2 className=" font-inter text-fs-x0 text-white tablet:text-fs-xl laptop:max-w-[31.9375rem] "> */}
                  <h2 className=" max-w-3xl font-inter text-fs-x0 text-white [text-wrap:balance] tablet:text-fs-xl">
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
