'use client';
// src/app/components/feature-header.tsx

import Container from './layout/Container';
import { useEffect } from 'react';
import { Gradient } from 'whatamesh';

export default function FeatureHeader() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas');
  }, []);

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
        <div className="flex flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-dark1 px-5 py-[4.5rem] text-center">
          <h2 className=" font-inter text-fs-base text-white">
            Tab Junkie? Meet Your New Best Friend.
          </h2>
          {/* <span className="text-2xl animate-gradient bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 bg-300% bg-clip-text font-bold text-transparent">
            My gradient text
          </span> */}
          {/* <span className="animate-gradient bg-gradient-to-r bg-gradient-to-r from-color1 from-color3 to-color2 to-color4 bg-300% bg-clip-text text-fs-x0 text-transparent">
            My gradient text2
          </span> */}
          {/* <h3 className="gradient-text animate-gradient-x bg-gradient-to-r from-gradient-color-1 via-gradient-color-2 to-gradient-color-4 bg-clip-text font-inter text-fs-x0 text-transparent"> */}
          <h3 className="animate-gradient bg-gradient-to-r from-gradient-color-3 via-gradient-color-2 to-gradient-color-4 bg-300% bg-clip-text font-inter text-fs-x0 text-transparent">
            Your Guiding Light in the Tab Chaos
          </h3>
          <p className="font-inter text-fs-lg text-white">
            Tab overload? We've got your back. Unearth any word or phrase hidden
            in the depths of your browser.
          </p>
        </div>
      </Container>
    </>
  );
}
