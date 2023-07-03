'use client';
// src/app/components/feature-header.tsx

import Container from './layout/Container';
import { useEffect } from 'react';

export default function FeatureHeader() {
  return (
    <>
      <Container className="flex w-full flex-col">
        {/* <canvas id="gradient-canvas" data-transition-in />
        <style jsx>{`
          #gradient-canvas {
            width: 100%;
            height: 100%;
            --gradient-color-1: #f5fbff;
            --gradient-color-2: #dde3ee;
            --gradient-color-3: #f2effb;
            --gradient-color-4: #d4ece5;
          }
        `}</style> */}

        {/* min-h-[26.938rem] p-[4.5rem]*/}
        {/* TODO: Review `px-5` below this padding figure was not in the figma */}
        <div className="flex flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-dark1 px-5 py-[4.5rem] text-center shadow-xl">
          <h2 className=" font-inter text-fs-base text-white">
            Tab Junkie? Meet Your New Best Friend.
          </h2>
          {/* <span className="text-2xl animate-gradient bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 bg-300% bg-clip-text font-bold text-transparent">
            My gradient text
          </span> */}
          {/* <span className="text-2xl animate-gradient bg-gradient-to-r from-[#F9F9F9] via-[#0021CD] to-[#8CFFFF] bg-300% bg-clip-text font-bold text-transparent">
            My gradient text
          </span> */}

          <h3 className="gradient-text animate-gradient-x bg-gradient-to-r from-[#0021CD] via-[#F9F9F9] to-[#8CFFFF] bg-clip-text font-inter text-fs-x0 text-transparent">
            Your Guiding Light in the Tab Chaos
          </h3>
          {/* <h3 className="animate-gradient bg-gradient-to-r from-gradient-color-3 via-gradient-color-2 to-gradient-color-4 bg-300% bg-clip-text font-inter text-fs-x0 text-transparent">
            Your Guiding Light in the Tab Chaos
          </h3> */}
          <p className="font-inter text-fs-lg text-white">
            Tab overload? We've got your back. Unearth any word or phrase hidden
            in the depths of your browser.
          </p>
        </div>
      </Container>
    </>
  );
}
