// src/app/options1/page.tsx

// ctrl-f-plus-website/src/app/tab-hoarders/page.tsx
'use client';
// import ButtonPhat from './components/ButtonPhat';
import Hero from '../components/Hero';
import CallToActionVersion2 from '../components/call-to-action-version2';
import FeatureCardVersion2 from '../components/feature-card-version2';
import FeaturesHeaderVersion2 from '../components/features-header-version2';

export default function page() {
  return (
    <div className="mb-[4.5rem] flex flex-col gap-[4.5rem] laptop:gap-24 wide:gap-32">
      <Hero />
      <FeaturesHeaderVersion2 />
      <FeatureCardVersion2 />
      <CallToActionVersion2 />
    </div>
  );
}
