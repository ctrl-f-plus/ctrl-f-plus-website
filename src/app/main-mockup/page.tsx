import CallToActionDark from '@/components/CallToActionDark';
import Feature from '@/components/Feature';
import FeatureHeader from '@/components/FeatureHeader';
import FeatureLeft1 from '@/components/FeatureLeft1';
import FeatureLeft2 from '@/components/FeatureLeft2';
import FeatureRight from '@/components/FeatureRight';
import Footer2 from '@/components/Footer2';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';

export default async function Hello() {
  return (
    <>
      <div className="bg-base00">
        <Navbar />
        <Hero />
        <FeatureHeader />
        <FeatureLeft1 />
        <FeatureRight />
        <FeatureLeft2 />
        <Feature />
        <CallToActionDark />
        <Footer2 />
      </div>
    </>
  );
}
