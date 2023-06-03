// export default function Hello() {
//   return (
//     <div>
//       <h1>Hello Next JS</h1>
//     </div>
//   );
// }

import CallToAction from '@/components/CallToAction';
import CallToActionColor from '@/components/CallToActionColor';
import CallToActionDark from '@/components/CallToActionDark';
import Container from '@/components/Container';
import FAQ from '@/components/FAQ';
import FAQ2 from '@/components/FAQ2';
import Feature from '@/components/Feature';
import FeatureDark from '@/components/FeatureDark';
import FeatureDark0 from '@/components/FeatureDark0';
import FeatureDark2 from '@/components/FeatureDark2';
import FeatureDark3 from '@/components/FeatureDark3';
import FeatureHeader from '@/components/FeatureHeader';
import FeatureLeft from '@/components/FeatureLeft';
import FeatureLeftDark from '@/components/FeatureLeftDark';
import FeatureRight from '@/components/FeatureRight';
import FeatureRightDark from '@/components/FeatureRightDark';
import Footer from '@/components/Footer';
import Footer2 from '@/components/Footer2';
import FooterDark from '@/components/FooterDark';
import Hero from '@/components/Hero';
import Hero2 from '@/components/Hero2';
import LogoCloud from '@/components/LogoCloud';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import { SalientFeature } from '@/components/SalientFeature';
import Team from '@/components/Team';
import Testimonial from '@/components/Testimonial';

//////////////////////////////////////////////////////

export default async function Hello() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // throw Error('Bazinga!');

  return (
    // <>
    //   <div className="bg-base00">
    //     <Navbar />
    //     {/* <Hero2 /> */}
    //     <Hero />
    //     {/* <LogoCloud /> */}

    //     {/* <FeatureRight /> */}
    //     <FeatureRightDark />

    //     <FeatureLeft />
    //     <FeatureRightDark />
    //     {/* <FeatureLeftDark /> */}

    //     <FeatureDark3 />

    //     {/* <Feature /> */}
    //     {/* <Feature /> */}
    //     {/* <SalientFeature /> */}
    //     {/* <FeatureDark0 /> */}
    //     {/* <FeatureDark2 /> */}
    //     {/* <FeatureDark /> */}

    //     {/* <Pricing /> */}
    //     {/* <FAQ /> */}
    //     <CallToAction />
    //     {/* <CallToActionDark /> */}
    //     {/* <FAQ2 /> */}
    //     {/* <Team /> */}
    //     <Footer />
    //     {/* <Footer2 /> */}
    //   </div>
    // </>

    // <>
    //   <div className="bg-base00">
    //     <Navbar />
    //     <Hero />
    //     <FeatureHeader />
    //     <FeatureLeftDark />
    //     <FeatureRightDark />
    //     <FeatureLeftDark />
    //     <Feature />
    //     <CallToActionDark />
    //     <Footer2 />
    //   </div>
    // </>

    <>
      <div className="bg-base00">
        <Navbar />
        <Hero />
        <FeatureHeader />
        <FeatureLeft />
        <FeatureRight />
        <FeatureLeft />
        <Feature />
        <CallToActionDark />
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
