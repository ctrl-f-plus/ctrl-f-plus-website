'use client';

import { useEffect, useState } from 'react';

function GradientBackground() {
  const [Gradient, setGradient] = useState(null);

  useEffect(() => {
    import('../lib/gradient').then(({ Gradient }) => {
      const gradient = new Gradient();

      gradient.initGradient('#gradient-canvas');

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
