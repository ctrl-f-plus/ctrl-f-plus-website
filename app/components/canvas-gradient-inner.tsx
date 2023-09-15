import 'server-only';

function CanvasGradientInner() {
  return (
    <>
      <div className="fixed h-screen w-screen bg-white/[.47] shadow-bg" />
      <canvas id="gradient-canvas" className="fixed !h-[2500px] !w-[2500px]" />
    </>
  );
}

export default CanvasGradientInner;
