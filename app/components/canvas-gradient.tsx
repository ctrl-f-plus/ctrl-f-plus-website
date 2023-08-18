// @ts-nocheck
'use client';

import React from 'react';
import { useEffect, useState } from 'react';

function CanvasGradient() {
  const [Gradient, setGradient] = useState(null);

  useEffect(() => {
    const injectGradient = () => {
      import('../lib/gradient').then(({ Gradient }) => {
        const gradient = new Gradient();

        //@ts-ignore
        gradient.initGradient('#gradient-canvas');
        //@ts-ignore
        setGradient(gradient);
      });
    };

    process.env.NODE_ENV !== 'development' && injectGradient();
  }, []);

  return (
    <div>
      <canvas
        id="gradient-canvas"
        className="absolute h-screen w-screen bg-gradient-cyan/50"
      />
    </div>
  );
}

export default CanvasGradient;
