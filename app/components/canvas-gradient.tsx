'use client';

import { useEffect, useState } from 'react';
import '../../styles/canvas-gradient.css';

function CanvasGradient() {
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const injectGradient = async () => {
      const { Gradient } = await import('../lib/gradient');

      const gradientInstance = new Gradient();

      //@ts-ignore
      gradientInstance.initGradient('#gradient-canvas');

      //@ts-ignore
      setGradient(gradientInstance);
    };

    // process.env.NODE_ENV !== 'development' && injectGradient();
    injectGradient();
  }, []);

  return (
    // <canvas id="gradient-canvas" className="absolute h-screen w-screen " />
    <>
      <div className="fixed h-screen w-screen bg-white/[.47] shadow-bg" />
      <canvas id="gradient-canvas" className="fixed h-screen w-screen " />
    </>
  );
}

export default CanvasGradient;
