'use client';

import { useEffect, useState } from 'react';

function CanvasGradient() {
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const injectGradient = () => {
      console.log('gradient useEffect');
      import('../lib/gradient').then(({ Gradient }) => {
        const gradientInstance = new Gradient();
        //@ts-ignore
        gradientInstance.initGradient('#gradient-canvas');
        //@ts-ignore
        setGradient(gradientInstance);
      });
    };

    process.env.NODE_ENV === 'development' && injectGradient();
  }, []);

  return (
    <div>
      <canvas
        id="gradient-canvas"
        // bg-gradient-cyan/50
        className="absolute h-screen w-screen bg-pink-500"
      />
    </div>
  );
}

export default CanvasGradient;
