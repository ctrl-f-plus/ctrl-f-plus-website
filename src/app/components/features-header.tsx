'use client';
import { useState } from 'react';
// src/app/components/features-header.tsx

import Container from './layout/Container';

export default function FeaturesHeader() {
  let [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    // console.log({ clientX, clientY });
    // let bounds = currentTarget.getBoundingClientRect();

    // let xPosition = clientX - bounds.left;
    // let yPosition = clientY - bounds.top;

    let { left, top } = currentTarget.getBoundingClientRect();

    let xPosition = clientX - left;
    let yPosition = clientY - top;

    // console.log({ xPosition, yPosition });

    setMousePosition({ x: xPosition, y: yPosition });
  }

  console.log(`render`);

  return (
    <>
      {/* TODO: REMOVE THIS DIV AND FIGURE OUT ANOTHER WAY TO HAVE TOP PADDING */}
      {/* <div id="features-header"></div> */}
      {/* items-center  desktop:max-w-[1168px]*/}
      <Container
        id="feature-header"
        // TODO: check if you need justify-center here
        className="mx-auto flex w-full flex-col justify-center"
      >
        {/* min-h-[26.938rem] p-[4.5rem]*/}
        {/* TODO: Review `px-5` below this padding figure was not in the figma */}
        <div
          onMouseMove={handleMouseMove}
          className="relative overflow-hidden rounded-[2.25rem] bg-dark1 shadow-xl"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                // 'radial-gradient(circle at 200px 5px, #03AF7D 0%, transparent 50%)',
                `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, #03AF7D 0%, transparent 50%)`,
            }}
          ></div>

          <div className="invisible flex flex-col items-center justify-center gap-9 px-5 py-[4.5rem] text-center">
            <h2 className="font-inter text-fs-base text-white sm:text-text-dark">
              Tab Junkie? Meet Your New Best Friend.
            </h2>
            <h3 className="gradient-text  max-w-[36.125rem] animate-gradient-x bg-gradient-to-r from-[#0021CD] via-[#F9F9F9] to-[#8CFFFF] bg-clip-text font-inter text-fs-x0 text-transparent sm:text-text-dark tablet:text-fs-xl">
              Your Guiding Light in the Tab Chaos
            </h3>
            <p className="h-auto max-w-[33.9375rem] font-open-sans text-fs-lg text-white sm:text-text-dark">
              Tab overload? We&apos;ve got your back. Unearth any word or phrase
              hidden in the depths of your browser.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}

{
  /* <span className="text-2xl animate-gradient bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 bg-300% bg-clip-text font-bold text-transparent">
            My gradient text
          </span> */
}
{
  /* <span className="text-2xl animate-gradient bg-gradient-to-r from-[#F9F9F9] via-[#0021CD] to-[#8CFFFF] bg-300% bg-clip-text font-bold text-transparent">
            My gradient text
          </span> */
}
