// app/tab-hoarders/components/FeatureCard.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Balancer } from 'react-wrap-balancer';
import Container from './Container';
import FeatureIcon1 from './icons/feature1';
import FeatureIcon2 from './icons/feature2';
import FeatureIcon3 from './icons/feature3';
import { FadeIn, FadeInStagger } from './fade-in';

const features = [
  {
    title: `All-Tab Search: The Panoramic View`,
    subTitle: `Upgrade from One-Tab Searches`,
    description: `Your CTRL+F only searches one tab? That's cute. We prefer the panoramic view.`,
    icon: FeatureIcon1,
  },
  {
    title: `Familiar Interface: Revolutionary Yet Comfortable`,
    subTitle: `Innovation with Coziness`,
    description: `Just because we've revolutionized search doesn't mean we can't be cozy. Slip into something comfortable.`,
    icon: FeatureIcon2,
  },
  {
    title: `Easy Activation: CTRL+SHIFT+F`,
    subTitle: `Simplicity at Your Fingertips`,
    description: `CTRL+SHIFT+F. So easy a caveman could do it. But don't worry, you'll probably get the hang of it too.`,
    icon: FeatureIcon3,
  },
];

export default function FeatureCard() {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = () => {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 1.3,
        },
      },
    };
  };

  const iconVariants = (index: number) => {
    const initialXOffset = index % 2 === 1 ? '500' : '-500';

    return {
      hidden: { opacity: 0, x: initialXOffset },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 1.9,
        },
      },
    };
  };

  const textVariants = () => {
    return {
      hidden: { opacity: 0, y: 500 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 1.9,
        },
      },
    };
  };

  return (
    <>
      {features.map((feat, index) => {
        return (
          // <FadeIn key={feat.title}>
          <div key={feat.title}>
            <Container className="mt-18 flex w-full flex-col  tablet:mt-24 wide:mt-[7.625rem]">
              <motion.div
                className="min-h-154 bg-red-500 "
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { when: 'beforeChildren' },
                  },
                }}
                // animate="visible"
                // transition={{ when: 'afterChildren' }}
              >
                <div className="flex h-full w-full flex-row">
                  <motion.div
                    className="h-full w-1/3 bg-green-500"
                    variants={{
                      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        // transition: { when: 'beforeChildren' },
                      },
                    }}
                    // transition={{ duration: 2 }}
                  >
                    2
                  </motion.div>
                  <motion.div
                    className="h-full w-1/3 bg-green-500"
                    variants={{
                      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        // transition: { when: 'beforeChildren' },
                        // transition: { duration: 2 },
                      },
                    }}
                    transition={{ duration: 2 }}
                  >
                    2
                  </motion.div>
                </div>
              </motion.div>
            </Container>
          </div>
        );
      })}
    </>
  );
}
