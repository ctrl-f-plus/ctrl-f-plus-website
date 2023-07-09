// ctrl-f-plus-website/src/app/tab-hoarders/page.tsx
'use client';
// import ButtonPhat from './components/ButtonPhat';
import FeatureCard from './components/feature-card';
import Hero from './components/Hero';
import CallToAction from './components/call-to-action';
import Navbar from './components/layout/navbar';
import FeaturesHeader from './components/features-header';
import TestComponent from './components/test-component';
import FeaturesHeader2 from './components/features-header2';
import ButtonPhat from './components/ButtonPhat';
import FramerButton from './components/FramerButton';

export default function page() {
  return (
    // TODO: Fix margin bottom. `mb-[4.5rem]` is arbitrary
    // tablet:bg-blue-700 laptop:bg-green-300
    // bg-yellow-300 tablet:bg-gray-100 desktop:bg-red-500 wide:bg-slate-700
    <div className="mb-[4.5rem] flex flex-col gap-[4.5rem] laptop:gap-24 wide:gap-32">
      {/* <Navbar /> */}
      <Hero />
      <FeaturesHeader2 />
      <FeaturesHeader />
      <FeatureCard />

      <CallToAction />

      {/* <ButtonPhat /> */}
    </div>
  );
}
