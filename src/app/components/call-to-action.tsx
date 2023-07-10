// src/app/components/call-to-action.tsx

'use client';

import { motion } from 'framer-motion';
import ButtonPhat from './ButtonPhat';
import Container from './layout/Container';
import Atropos from 'atropos/react';

export default function CallToAction() {
  return (
    <>
      <Container
        // className="w-full min-w-[23.5rem]"
        className="mx-auto flex w-full flex-col laptop:flex-row laptop:justify-between "
      >
        {/* TODO: if you decide to keep shadows on the cards, then add a shadow here with framer motion so that it is only visible when in initial position */}
        {/* <motion.div className="h-full w-full rounded-[2.25rem] shadow-xl"> */}
        <Atropos
          className="h-full w-full rounded-[2.25rem]"
          // highlight={false}
          // shadow={false}
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
        {/* </motion.div> */}
      </Container>

      {/* TODO: TRY THE FOLLOWING CONTAINER AND COMPARE ITS RESPONSIVENESS */}
      {/* <Container className="flex h-full w-full min-w-[23.5rem] flex-col">
        // TODO: fix padding and maybe remove the min height
        <div className="isolate flex min-h-[32.8125rem] flex-auto flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center shadow-xl">
          <h1 className="text-fs-x0 text-white">Boost your productivity.</h1>
          <p className="font-open-sans text-white">
            Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
            ipsum pretium amet.
          </p>
          <ButtonPhat />
        </div>
      </Container> */}

      {/* <Container className="flex h-full flex-col">
        <div className="flex flex-auto flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center">
          <h1 className="text-fs-x0 text-white">Boost your productivity.</h1>
          <p className="font-open-sans text-white">
            Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
            ipsum pretium amet.
          </p>
          <ButtonPhat />
        </div>
      </Container> */}
    </>
  );
}
