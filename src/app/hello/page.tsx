// export default function Hello() {
//   return (
//     <div>
//       <h1>Hello Next JS</h1>
//     </div>
//   );
// }

import CallToAction from '@/components/CallToAction';
import Container from '@/components/Container';
import FAQ from '@/components/FAQ';
import Feature from '@/components/Feature';
import FeatureDark from '@/components/FeatureDark';
import FeatureDark0 from '@/components/FeatureDark0';
import FeatureDark2 from '@/components/FeatureDark2';
import FeatureDark3 from '@/components/FeatureDark3';
import Footer from '@/components/Footer';
import Footer2 from '@/components/Footer2';
import Hero from '@/components/Hero';
import Hero2 from '@/components/Hero2';
import LogoCloud from '@/components/LogoCloud';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Team from '@/components/Team';
import Testimonial from '@/components/Testimonial';

//////////////////////////////////////////////////////

export default async function Hello() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // throw Error('Bazinga!');

  return (
    <>
      <div className="bg-base00">
        <Navbar />
        {/* <Hero2 /> */}
        <Hero />
        <LogoCloud />
        {/* <Feature /> */}
        <FeatureDark3 />
        {/* <FeatureDark0 /> */}
        {/* <FeatureDark2 /> */}
        {/* <FeatureDark /> */}
        {/* <Testimonial /> */}
        {/* <Pricing /> */}
        <FAQ />
        <CallToAction />
        {/* <Team /> */}
        {/* <Footer /> */}
        <Footer2 />
      </div>
    </>
  );
}

// //////////////////////////////////////////////////////

// 'use client';

// import { useEffect } from 'react';

// export default function Hello() {
//   useEffect(() => {}, []);

//   return (
//     <div>
//       <h1>Hello Next JS</h1>
//     </div>
//   );
// }
