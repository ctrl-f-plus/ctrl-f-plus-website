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
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import LogoCloud from '@/components/LogoCloud';
import Pricing from '@/components/Pricing';
import Testimonial from '@/components/Testimonial';

//////////////////////////////////////////////////////

export default async function Hello() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // throw Error('Bazinga!');

  return (
    <>
      <Hero />
      <LogoCloud />
      <Feature />
      <Testimonial />
      <Pricing />
      <FAQ />
      <CallToAction />
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
