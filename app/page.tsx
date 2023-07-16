// app/tab-hoarders/page.tsx

import Hero from './components/Hero';
import CallToAction from './components/call-to-action';
import FeatureCard from './components/feature-card';
import FeaturesHeader from './components/features-header';
import FeaturesHeaderVersion2 from './components/features-header-version2';

export default function page() {
  return (
    <div className="flex flex-col gap-18 tablet:gap-24 wide:gap-[7.625rem]">
      <Hero />
      {/* <FeaturesHeaderVersion2 /> */}
      <FeaturesHeader />
      <FeatureCard />
      <CallToAction />
    </div>
  );
}
