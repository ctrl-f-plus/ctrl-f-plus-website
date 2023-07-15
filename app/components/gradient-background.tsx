'use client';

import { useEffect, useState } from 'react';

function GradientBackground() {
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
      {/* rotate-180 */}
      <canvas id="gradient-canvas" data-transition-in className="absolute " />
    </div>
  );
}

export default GradientBackground;
