// @ts-nocheck
'use client';

import React from 'react';
import { useEffect, useState } from 'react';

console.log('render1');
function GradientBackground() {
  const [Gradient, setGradient] = useState(null);
  const [networkSpeed, setNetworkSpeed] = useState('4g');

  useEffect(() => {
    import('../../public/gradient').then(({ Gradient }) => {
      const gradient = new Gradient();

      //@ts-ignore
      gradient.initGradient('#gradient-canvas');
      //@ts-ignore
      setGradient(gradient);
    });
  }, []);

  return (
    <div>
      <canvas
        id="gradient-canvas"
        data-transition-in
        className="absolute w-screen h-screen"
      />
      {/* <canvas id="gradient-canvas" data-transition-in className="absolute   " /> */}
    </div>
  );
}

export default GradientBackground;
// export default React.memo(GradientBackground);
