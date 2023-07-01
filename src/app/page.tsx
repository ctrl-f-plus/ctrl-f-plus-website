// ctrl-f-plus-website/src/app/tab-hoarders/page.tsx

// import ButtonPhat from './components/ButtonPhat';
import Hero from './components/Hero';
import CallToAction from './components/call-to-action';
import Navbar from './components/layout/navbar';

export default function page() {
  return (
    // <div className="desktop:bg-red-500 tablet:bg-blue-700 bg-yellow-300">
    <div className="">
      <Hero />
      {/* <ButtonPhat /> */}
      <CallToAction />
    </div>
  );
}
