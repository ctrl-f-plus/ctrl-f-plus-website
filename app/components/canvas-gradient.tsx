'use client';

// import { useEffect, useState } from 'react';

// function CanvasGradient({ children }: { children: React.ReactNode }) {
//   const [gradient, setGradient] = useState(null);

//   useEffect(() => {
//     const injectGradient = async () => {
//       const { Gradient } = await import('../lib/gradient');

//       const gradientInstance = new Gradient();

//       //@ts-ignore
//       gradientInstance.initGradient('#gradient-canvas');

//       //@ts-ignore
//       setGradient(gradientInstance);
//     };

//     // process.env.NODE_ENV !== 'development' && injectGradient();
//     injectGradient();
//   }, []);

//   return (
//     // <canvas id="gradient-canvas" className="absolute h-screen w-screen " />
//     <>
//       {children}
//       {/* <CanvasGradientInner />; */}
//       {/* <div className="fixed h-screen w-screen bg-white/[.47] shadow-bg" />
//       <canvas id="gradient-canvas" className="fixed h-screen w-screen " /> */}
//     </>
//   );
// }

// export default CanvasGradient;

import React, { useEffect } from 'react';

export default function CanvasGradient({
  children,
}: {
  children?: React.ReactNode;
}) {
  useEffect(() => {
    const worker = new Worker('/path/to/gradientWorker.js');

    worker.postMessage('Some data to process');

    worker.addEventListener('message', (event) => {
      const dataFromWorker = event.data;
      console.log(dataFromWorker); // Processed data
    });

    // Cleanup
    return () => {
      worker.terminate();
    };
  }, []);

  return <>{children}</>;
}
