'use client';

import { useEffect, useState } from 'react';

function CanvasGradient() {
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const injectGradient = () => {
      import('../lib/gradient').then(({ Gradient }) => {
        const gradientInstance = new Gradient();

        //@ts-ignore
        gradientInstance.initGradient('#gradient-canvas');

        //@ts-ignore
        setGradient(gradientInstance);
      });
    };

    process.env.NODE_ENV !== 'development' && injectGradient();
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      className="absolute h-screen w-screen bg-gradient-cyan/50"
    />
  );
}

export default CanvasGradient;
