// ctrl-f-plus-website/src/app/tab-hoarders/page.tsx

// import ButtonPhat from './components/ButtonPhat';
import FeatureCard from './components/feature-card';
import Hero from './components/Hero';
import CallToAction from './components/call-to-action';
import Navbar from './components/layout/navbar';
import FeatureHeader from './components/feature-header';

export default function page() {
  return (
    // TODO: Fix margin bottom. `mb-[4.5rem]` is arbitrary
    // <div className="desktop:bg-red-500 tablet:bg-blue-700 bg-yellow-300">
    <div className="mb-[4.5rem] flex flex-col gap-[4.5rem]">
      <Navbar />
      <Hero />
      {/* <ButtonPhat /> */}
      {/* <div></div> */}
      <FeatureHeader />
      <FeatureCard />
      <CallToAction />
    </div>
  );
}
