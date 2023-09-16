import 'server-only';
import '../../styles/canvas-gradient.css';

function CanvasGradientInner() {
  return (
    <>
      <div className="fixed h-screen w-screen bg-white/[.47] shadow-bg" />
      <canvas id="gradient-canvas" className="fixed h-screen w-screen " />

      {/* <canvas id="gradient-canvas" className="absolute " /> */}
    </>
  );
}

export default CanvasGradientInner;
