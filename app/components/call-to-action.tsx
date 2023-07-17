// app/components/call-to-action.tsx

'use client';

import { motion } from 'framer-motion';
import ButtonPhat from './ButtonPhat';
import Container from './layout/Container';
import Atropos from 'atropos/react';

export default function CallToAction() {
  return (
    <>
      <Container className="mx-auto flex hidden w-full flex-col laptop:block laptop:flex-row laptop:justify-between mt-18 tablet:mt-24 wide:mt-[7.625rem]">
        {/* TODO: if you decide to keep shadows on the cards, then add a shadow here with framer motion so that it is only visible when in initial position */}
        {/* <motion.div className="h-full w-full rounded-[2.25rem] shadow-xl"> */}
        <Atropos
          className="hidden h-full w-full rounded-[2.25rem]"
          // highlight={false}
          shadow={false}
          // shadowScale={1}
        >
          <div className="relative isolate  flex h-[32.8125rem] w-full flex-col items-center  justify-center  gap-9 rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center">
            <div className="absolute -top-24 right-10  h-[14.6875rem] w-[17.875rem] flex-shrink-0 translate-x-1/2 rounded-full bg-[#8DBEDA] blur-[43.5px] filter " />
            <div className="absolute -bottom-24  left-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 -translate-x-1/2 rounded-full bg-[#03AF7D] blur-[43.5px] filter " />

            <div
              data-atropos-offset="10"
              className="flex  flex-col  items-center justify-center
             gap-9"
            >
              <h1
                // data-atropos-offset="-10"
                className=" font-inter text-fs-x0 text-white tablet:text-fs-xl laptop:max-w-[31.9375rem]"
              >
                Boost your productivity.
              </h1>
              <p
                // data-atropos-offset="-10"
                className=" max-w-[26.75rem] font-open-sans text-fs-lg  text-white tablet:max-w-[25.8125rem]"
              >
                Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
                ipsum pretium amet.
              </p>
              <ButtonPhat />
            </div>
          </div>
        </Atropos>
      </Container>

      <Container className="mx-auto flex w-full flex-col laptop:hidden laptop:flex-row laptop:justify-between mt-18 tablet:mt-24 wide:mt-[7.625rem]">
        <div className="relative isolate  flex h-[32.8125rem] w-full flex-col items-center  justify-center  gap-9 overflow-hidden rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center shadow-xl">
          {/* <div className="absolute -top-24 right-10  h-[14.6875rem] w-[17.875rem] flex-shrink-0 translate-x-1/2 rounded-full bg-[#8DBEDA] blur-[43.5px] filter " />
            <div className="absolute -bottom-24  left-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 -translate-x-1/2 rounded-full bg-[#03AF7D] blur-[43.5px] filter" /> */}

          <svg
            viewBox="0 0 1024 1024"
            // className="absolute -left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
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

          <div
            className="flex  flex-col  items-center justify-center
             gap-9"
          >
            <h1 className=" font-inter text-fs-x0 text-white tablet:text-fs-xl laptop:max-w-[31.9375rem]">
              Boost your productivity.
            </h1>
            <p className=" max-w-[26.75rem] font-open-sans text-fs-lg  text-white tablet:max-w-[25.8125rem]">
              Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
              ipsum pretium amet.
            </p>
            <ButtonPhat />
          </div>
        </div>
      </Container>
    </>
  );
}
