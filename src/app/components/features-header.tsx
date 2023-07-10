// 'use client';
// src/app/components/features-header.tsx

import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Container from './layout/Container';

export default function FeaturesHeader() {
  // const MagnifyIconSVG = encodeURIComponent(
  //   ReactDOMServer.renderToStaticMarkup(<MagnifyIcon />)
  // );
  // let mouseX = useMotionValue(0);
  // let mouseY = useMotionValue(0);

  // let mouseX = useSpring(0, { stiffness: 80, damping: 50 });
  // let mouseY = useSpring(0, { stiffness: 80, damping: 50 });

  let mouseX = useSpring(0, { stiffness: 80, damping: 30 });
  let mouseY = useSpring(0, { stiffness: 80, damping: 30 });
  let initialRender = true;

  useEffect(() => {
    if (initialRender) {
      initialRender = false;
      // mouseX.set(800);
      // mouseY.set(90);

      // mouseX.set(650);
      // mouseY.set(70);

      mouseX.set(750);
      mouseY.set(70);
    }
  }, []);

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
    console.log('change');
    console.log(webkitMaskPosition);
  }

  function CardText() {
    return (
      <div className=" flex flex-col items-center justify-center gap-9 px-5 py-24 text-center tablet:py-22 wide:py-18">
        <h2 className="font-inter text-fs-base text-white ">
          Tab Junkie? Meet Your New Best Friend.
        </h2>
        <h3 className="gradient-text max-w-[36.125rem] animate-gradient-x bg-gradient-to-r from-[#0021CD] via-[#F9F9F9] to-[#8CFFFF] bg-clip-text font-inter text-fs-x0 text-transparent  tab-pro:text-fs-xl">
          Your Guiding Light in the Tab Chaos
        </h3>
        <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white ">
          Tab overload? We&apos;ve got your back. Unearth any word or phrase
          hidden in the depths of your browser.
        </p>
      </div>
    );
  }

  return (
    <>
      <Container
        id="features-header"
        className="mx-auto flex w-full scroll-mt-12 flex-col justify-center"
      >
        <div
          onMouseMove={handleMouseMove}
          className=" group relative hidden rounded-[2.25rem] bg-dark1 shadow-xl  backdrop-blur-lg backdrop-opacity-90 wide:block wide:cursor-magnifying-glass"
        >
          <div className=" relative max-h-146 overflow-hidden rounded-[2.25rem]">
            <motion.div
              ref={divRef}
              // pointer-events-none
              // hidden
              className="opacity-1 mask -inset-px h-[20000px] rounded-[2.25rem] p-18 file:group-hover:opacity-100 wide:block"
              style={{
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskImage:
                  'radial-gradient(300px 300px, rgba(0, 0, 0, 1),  transparent)',
                WebkitMaskPosition: webkitMaskPosition,
                // backgroundColor: 'rgba(0, 0, 0, .3)',
              }}
              whileHover={{ backgroundColor: '#03AF7D' }}
              transition={{ duration: 0.9 }}
              // transition={{ type: 'spring', stiffness: 50, damping: 100 }}
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
    </>
  );
}
