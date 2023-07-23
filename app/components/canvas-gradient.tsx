// @ts-nocheck
'use client';

import React from 'react';
import { useEffect, useState } from 'react';

function CanvasGradient() {
  const [Gradient, setGradient] = useState(null);

  useEffect(() => {
    import('../lib/gradient').then(({ Gradient }) => {
      const gradient = new Gradient();

      //@ts-ignore
      gradient.initGradient('#gradient-canvas');
      //@ts-ignore
      setGradient(gradient);
    });
  }, []);

  return (
    <div>
      <canvas id="gradient-canvas" className="absolute h-screen w-screen " />
      {/* <canvas
        id="gradient-canvas"
        className="absolute w-screen h-screen bg-gradient-cyan/50"
      /> */}
    </div>
  );
}

export default CanvasGradient;
