// src/app/options1/page.tsx

// ctrl-f-plus-website/src/app/tab-hoarders/page.tsx
'use client';
// import ButtonPhat from './components/ButtonPhat';
import FeatureCard from '../components/feature-card';
import Hero from '../components/Hero';
import CallToAction from '../components/call-to-action';
import Navbar from '../components/layout/navbar';
import FeaturesHeaderVersion2 from '../components/features-header-version2';
import TestComponent from '../components/test-component';
import ButtonPhat from '../components/ButtonPhat';
import CallToActionVersion2 from '../components/call-to-action-version2';

export default function page() {
  return (
    <div className="mb-[4.5rem] flex flex-col gap-[4.5rem] laptop:gap-24 wide:gap-32">
      <Hero />
      <FeaturesHeaderVersion2 />
      <FeatureCard />
      <CallToActionVersion2 />
    </div>
  );
}
