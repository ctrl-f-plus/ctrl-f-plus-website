// app/tab-hoarders/page.tsx

import Hero from './components/Hero';
import CallToAction from './components/call-to-action';
import FeatureCard from './components/feature-card';

import FeaturesHeader from './components/features-header';

export default function page() {
  return (
    <div className="flex flex-col gap-18 tablet:gap-24 wide:gap-[7.625rem]">
      <Hero />
      <FeaturesHeader />
      <FeatureCard />
      <CallToAction />
    </div>
  );
}
