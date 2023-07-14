// import { useEffect } from 'react';
// import { Gradient } from '../../public/gradient';

// function GradientBackground() {
//   useEffect(() => {
//     // Create your instance
//     const gradient = new Gradient();

//     // Call `initGradient` with the selector to your canvas
//     gradient.initGradient('#gradient-canvas');
//   }, []);

//   return (
//     <div>
//       <style jsx>{`
//         #gradient-canvas {
//           width: 100%;
//           height: 100%;
//           --gradient-color-1: #c3e4ff;
//           --gradient-color-2: #6ec3f4;
//           --gradient-color-3: #eae2ff;
//           --gradient-color-4: #b9beff;
//         }
//       `}</style>
//       <canvas id="gradient-canvas" data-transition-in />
//     </div>
//   );
// }
// @ts-nocheck
// export default GradientBackground;
'use client';
import { useEffect, useState } from 'react';

function GradientBackground() {
  const [Gradient, setGradient] = useState(null);

  useEffect(() => {
    import('../../public/gradient').then(({ Gradient }) => {
      // Create your instance
      const gradient = new Gradient();

      // Call `initGradient` with the selector to your canvas
      gradient.initGradient('#gradient-canvas');

      setGradient(gradient);
    });
  }, []);

  return (
    <div>
      {/* <style jsx>{`
        #gradient-canvas {
          width: 100%;
          height: 100%;
          --gradient-color-1: #c3e4ff;
          --gradient-color-2: #6ec3f4;
          --gradient-color-3: #eae2ff;
          --gradient-color-4: #b9beff;
        }
      `}</style> */}
      <style jsx>{`
        #gradient-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          transform: rotate(180deg);
          --gradient-color-1: #c3e4ff;
          --gradient-color-2: #6ec3f4;
          --gradient-color-3: #eae2ff;
          --gradient-color-4: #b9beff;
        }
      `}</style>
      <canvas id="gradient-canvas" data-transition-in />
    </div>
  );
}

export default GradientBackground;
