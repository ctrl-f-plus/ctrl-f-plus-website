// ctrl-f-plus-website/src/app/tab-hoarders/page.tsx
'use client';

import Hero from './components/Hero';
import CallToAction from './components/call-to-action';
import FeatureCard from './components/feature-card';

import FeaturesHeader from './components/features-header';

export default function page() {
  return (
    <div className="flex flex-col gap-18 bg-slate-100 tablet:gap-24 wide:gap-[7.625rem]">
      <Hero />
      <FeaturesHeader />
      <FeatureCard />
      <CallToAction />
    </div>
  );
}
