// app/components/call-to-action.tsx

'use client';

import Atropos from 'atropos/react';
import ButtonPhat from './buttons/ButtonPhat';
import ButtonPrimary from './buttons/ButtonPrimary';
import Container from './layout/Container';
import ButtonPhatMobile from './buttons/button-phat-mobile';
import { useReducedMotion } from 'framer-motion';

export default function CallToAction() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {prefersReducedMotion ? (
        <Container className="mx-auto mt-18 flex w-full flex-col tablet:mt-24 laptop:hidden laptop:flex-row laptop:justify-between wide:mt-[7.625rem]">
          <div className="relative isolate flex h-[32.8125rem] w-full flex-col items-center justify-center  gap-9 overflow-hidden rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center shadow-xl">
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

            <div
              className="flex  flex-col  items-center justify-center
             gap-9"
            >
              <h2 className=" font-inter text-fs-x0 text-white tablet:text-fs-xl laptop:max-w-[31.9375rem]">
                Boost your productivity.
              </h2>
              <p className=" max-w-[26.75rem] font-open-sans text-fs-lg  text-white tablet:max-w-[25.8125rem]">
                Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
                ipsum pretium amet.
              </p>
              <ButtonPhatMobile />
              {/* <ButtonPrimary variant={'phat'}>Add to Chrome</ButtonPrimary> */}
            </div>
          </div>
        </Container>
      ) : (
        <Container className="mx-auto mt-18 flex hidden w-full flex-col tablet:mt-24 laptop:block laptop:flex-row laptop:justify-between wide:mt-[7.625rem]">
          <Atropos
            className="hidden h-full w-full rounded-[2.25rem]"
            shadow={false}
          >
            <div className="relative isolate  flex h-[32.8125rem] w-full flex-col items-center  justify-center  gap-9 rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center">
              <div className="absolute -top-24 right-10  h-[14.6875rem] w-[17.875rem] flex-shrink-0 translate-x-1/2 rounded-full bg-[#8DBEDA] blur-[43.5px] filter " />
              <div className="absolute -bottom-24  left-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 -translate-x-1/2 rounded-full bg-[#03AF7D] blur-[43.5px] filter " />

              <div
                data-atropos-offset="10"
                className="flex  flex-col  items-center justify-center
             gap-9"
              >
                <h2 className=" font-inter text-fs-x0 text-white tablet:text-fs-xl laptop:max-w-[31.9375rem]">
                  Boost your productivity.
                </h2>
                <p className=" max-w-[26.75rem] font-open-sans text-fs-lg  text-white tablet:max-w-[25.8125rem]">
                  Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis
                  non ipsum pretium amet.
                </p>
                {/* <ButtonPhat /> */}
                <ButtonPrimary variant={'phat'}>Add to Chrome</ButtonPrimary>
              </div>
            </div>
          </Atropos>
        </Container>
      )}
    </>
  );
}
