// app/tab-hoarders/page.tsx

import Hero from './components/Hero';
import CallToAction from './components/call-to-action';
import FeatureCard from './components/feature-card';
import FeaturesHeader from './components/features-header';
import Footer from './components/layout/footer';

export default function page() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturesHeader />
      <FeatureCard />
      <CallToAction />
    </div>
  );
}
