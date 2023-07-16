// src/app/components/features-header.tsx

'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Container from './layout/Container';

// TODO: Add aria-hidden to the radial-gradient?
export default function FeaturesHeaderVersion2() {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  // function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <>
      <Container
        // TODO: check if you need justify-center here
        className="mx-auto flex w-full flex-col justify-center"
      >
        <div
          onMouseMove={handleMouseMove}
          className="group relative rounded-[2.25rem] border border-gray-700 bg-dark1 shadow-xl"
        >
          <motion.div
            className="pointer-events-none absolute -inset-px hidden rounded-[2.25rem] opacity-0
            transition  duration-100 group-hover:opacity-100 wide:block"
            style={{
              background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(3, 175, 125, .90) 0%, transparent 50%)`,
            }}
          />

          {/* invisible */}
          <div className=" flex flex-col items-center justify-center gap-9 px-5 py-[4.5rem] text-center  ">
            <h2 className="font-inter text-fs-base text-white wide:text-text-dark">
              Tab Junkie? Meet Your New Best Friend.
            </h2>
            <motion.h3 className="gradient-text max-w-[36.125rem] animate-gradient-x bg-gradient-to-r from-[#0021CD] via-[#F9F9F9] to-[#8CFFFF] bg-clip-text font-inter text-fs-x0 text-transparent tablet:text-fs-xl wide:text-text-dark">
              {'Your Guiding Light in the Tab Chaos'
                .split('')
                .map((char, index) => (
                  <motion.span key={char + '-' + index}>{char}</motion.span>
                ))}
            </motion.h3>
            <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white wide:text-text-dark">
              Tab overload? We&apos;ve got your back. Unearth any word or phrase
              hidden in the depths of your browser.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
