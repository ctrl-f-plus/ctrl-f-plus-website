// @ts-nocheck
// app/components/features-header.tsx
'use client';

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import Container from './Container';
import { FadeIn } from './fade-in';

function CardText() {
  return (
    <div className=" flex flex-col items-center justify-center gap-9 px-5 py-24 text-center tablet:py-22 wide:py-18 ">
      <h2 className="font-inter text-fs-base text-white ">
        Tab Junkie? Meet Your New Best Friend.
      </h2>

      <h3 className="gradient-text animate-gradient-x max-w-[36.125rem] bg-gradient-to-r from-gradient-blue via-gradient-cyan to-gradient-lavender bg-clip-text font-inter text-fs-x0 text-transparent tab-pro:text-fs-xl wide:bg-transparent wide:from-gradient-gray-1 wide:via-gradient-gray-2 wide:to-gradient-gray-2 wide:text-white">
        Your Guiding Light in the Tab Chaos
      </h3>
      <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white ">
        Tab overload? We&apos;ve got your back. Unearth any word or phrase
        hidden in the depths of your browser.
      </p>
    </div>
  );
}

function CardText2() {
  return (
    <div className="flex flex-col items-center justify-center gap-9 px-5 py-24 text-center tablet:py-22 wide:py-18 ">
      <h2 className="font-inter text-fs-base text-text-dark ">
        Tab Junkie? Meet Your New Best Friend.
      </h2>

      <h3 className="gradient-text animate-gradient-x max-w-[36.125rem] bg-gradient-to-r from-gradient-blue via-gradient-cyan to-gradient-lavender bg-clip-text font-inter text-fs-x0 text-transparent tab-pro:text-fs-xl wide:bg-transparent wide:from-gradient-gray-1 wide:via-gradient-gray-2 wide:to-gradient-gray-2 wide:text-text-dark">
        Your Guiding Light in the Tab Chaos
      </h3>
      <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-text-dark ">
        Tab overload? We&apos;ve got your back. Unearth any word or phrase
        hidden in the depths of your browser.
      </p>
    </div>
  );
}

export default function FeaturesHeader() {
  const prefersReducedMotion = useReducedMotion();
  let stiffness = 80;
  let damping = 30;

  let mouseX = useSpring(0, { stiffness: stiffness, damping: damping });
  let mouseY = useSpring(0, { stiffness: stiffness, damping: damping });

  useEffect(() => {
    mouseX.set(750);
    mouseY.set(70);
    stiffness = 90;
    damping = 20;
  });

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // 'radial-gradient(250px 250px, rgba(0, 0, 0, .9),  transparent)',
  // let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;

  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <section
      id="features-header"
      aria-label="Features for multi-tab keyword and phrase search"
      className="mt-18 scroll-mt-12 tablet:mt-24 wide:mt-[7.625rem]"
    >
      <FadeIn>
        <Container className="flex w-full flex-col justify-center">
          <div
            onMouseMove={handleMouseMove}
            className=" group relative hidden min-h-[584px]  rounded-[2.25rem] bg-dark1 shadow-xl backdrop-blur-lg backdrop-opacity-90 wide:block  wide:cursor-magnifying-glass"
          >
            <div className=" min-h-146 items-center justify-center overflow-hidden rounded-[2.25rem] ">
              <div className="pointer-events-none">
                <div
                  // [mask-image:linear-gradient(white,transparent)]
                  className="absolute inset-0 flex items-center justify-center rounded-[2.25rem] transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50"
                >
                  <CardText2 />
                </div>

                {/*  */}
                <motion.div
                  className="absolute inset-0 rounded-[2.25rem] bg-[#03af7d]  opacity-0 transition duration-300 group-hover:opacity-100"
                  style={style}
                />
                {/*  */}
                <motion.div
                  className="opacity-1 absolute inset-0 flex items-center justify-center rounded-[2.25rem] mix-blend-overlay transition duration-300 group-hover:opacity-100"
                  style={style}
                >
                  <CardText />
                </motion.div>
              </div>
            </div>
          </div>

          {/* <div
            onMouseMove={handleMouseMove}
            className="group relative rounded-[2.25rem] bg-dark1  shadow-xl backdrop-blur-lg backdrop-opacity-90  wide:hidden wide:cursor-magnifying-glass "
          >
            <div className="relative  max-h-[554px] overflow-hidden rounded-[2.25rem]">
              <CardText />
            </div>
          </div> */}
        </Container>
      </FadeIn>
    </section>
  );
}
