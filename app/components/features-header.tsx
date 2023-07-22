// app/components/features-header.tsx
'use client';

import {
  MotionConfig,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import Container from './layout/Container';

export default function FeaturesHeader() {
  const prefersReducedMotion = useReducedMotion();
  let stiffness = 80;
  let damping = 30;

  let initialRender = true;

  let mouseX = useSpring(0, { stiffness: stiffness, damping: damping });
  let mouseY = useSpring(0, { stiffness: stiffness, damping: damping });

  useEffect(() => {
    // if (initialRender) {
    //   initialRender = false;
    mouseX.set(750);
    mouseY.set(70);
    stiffness = 90;
    damping = 20;
    // }
  });

  let divRef = useRef<HTMLDivElement>(null);

  let centerMouseX = useTransform(mouseX, (x) => {
    if (!divRef.current) return 0;
    return x - divRef.current.offsetWidth / 2;
  });
  let centerMouseY = useTransform(mouseY, (y) => {
    if (!divRef.current) return 0;
    return y - divRef.current.offsetHeight / 2;
  });

  let webkitMaskPosition = useMotionTemplate`${centerMouseX}px ${centerMouseY}px`;

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function CardText() {
    return (
      <div className=" flex flex-col items-center justify-center gap-9 px-5 py-24 text-center tablet:py-22 wide:py-18 ">
        <h2 className="font-inter text-fs-base text-white wide:text-text-dark">
          Tab Junkie? Meet Your New Best Friend.
        </h2>

        <h3 className="gradient-text max-w-[36.125rem] animate-gradient-x bg-gradient-to-r from-gradient-blue via-gradient-cyan to-gradient-lavender bg-clip-text font-inter text-fs-x0 text-transparent tab-pro:text-fs-xl wide:bg-transparent wide:from-gradient-gray-1 wide:via-gradient-gray-2 wide:to-gradient-gray-2">
          Your Guiding Light in the Tab Chaos
        </h3>
        <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white wide:text-text-dark">
          Tab overload? We&apos;ve got your back. Unearth any word or phrase
          hidden in the depths of your browser.
        </p>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <Container
        id="features-header"
        className=" mt-18 flex w-full scroll-mt-12 flex-col justify-center tablet:mt-24 wide:mt-[7.625rem] "
      >
        <div
          onMouseMove={handleMouseMove}
          className=" group relative hidden rounded-[2.25rem] bg-dark1 shadow-xl  backdrop-blur-lg backdrop-opacity-90 wide:block wide:cursor-magnifying-glass "
        >
          <div className=" relative max-h-146 overflow-hidden rounded-[2.25rem]">
            <motion.div
              ref={divRef}
              // pointer-events-none
              // hidden
              className="opacity-1 mask -inset-px h-[20000px] rounded-[2.25rem] bg-[#03af7d1a] p-18 file:group-hover:opacity-100 wide:block"
              // 300x300
              style={{
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskImage:
                  'radial-gradient(250px 250px, rgba(0, 0, 0, .9),  transparent)',
                WebkitMaskPosition: webkitMaskPosition,
              }}
              whileHover={{
                backgroundColor: '#03AF7D',
              }}
              transition={{ duration: 0.9 }}
            >
              <CardText />
            </motion.div>
          </div>
        </div>

        <div
          onMouseMove={handleMouseMove}
          className="group relative rounded-[2.25rem] bg-dark1  shadow-xl backdrop-blur-lg backdrop-opacity-90  wide:hidden wide:cursor-magnifying-glass "
        >
          <div className="relative  max-h-[554px] overflow-hidden rounded-[2.25rem]">
            <CardText />
          </div>
        </div>
      </Container>
    </MotionConfig>
  );
}
