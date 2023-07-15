// app/tab-hoarders/components/FeatureCard.tsx

import { motion } from 'framer-motion';
import FeatureIcon1 from './icons/feature1';
import FeatureIcon2 from './icons/feature2';
import FeatureIcon3 from './icons/feature3';
import Container from './layout/Container';

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
  const iconVariants = (index: number) => {
    const initialXOffset = index % 2 === 1 ? '500' : '-500';

    return {
      hidden: { opacity: 0, x: initialXOffset },
      show: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 1.5,
        },
      },
    };
  };

  const textVariants = (index: number) => {
    return {
      hidden: { opacity: 0, y: 500 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 1.5,
        },
      },
    };
  };

  return (
    <>
      {features.map((feat, index) => {
        return (
          <Container key={feat.title} className="mx-auto flex w-full flex-col">
            <div className="laptop:text-left">
              {/* shadow-xl */}
              <motion.div
                className="flex min-h-154 items-center justify-center overflow-hidden rounded-[2.25rem] bg-white tablet:p-9 tab-pro:p-14 laptop:min-h-146  laptop:p-16 desktop:p-20 wide:p-24"
                whileInView="show"
                initial="hidden"
                // viewport={{ once: true }}
                // variants={cardVariants(index)}
              >
                <div className="flex flex-col gap-9 laptop:flex-row">
                  <motion.div
                    variants={iconVariants(index)}
                    // shrink-0
                    className={`flex items-center justify-center   ${
                      index % 2 === 1 ? 'laptop:order-last' : ''
                    }`}
                  >
                    {
                      <feat.icon className="h-[221.358px] w-[263.2px] laptop:h-[317px] laptop:w-[376px]" />
                    }
                  </motion.div>

                  <div
                    className={`flex w-full  ${
                      index % 2 === 1 ? '' : 'laptop:justify-end'
                    } `}
                  >
                    <motion.div
                      className="flex w-fit flex-col items-center justify-center gap-9  laptop:items-start"
                      variants={textVariants(index)}
                    >
                      <h2 className="text-center font-inter text-fs-base text-primary1 laptop:text-left">
                        {feat.title}
                      </h2>

                      <h3 className=" max-w-[305px] text-center font-inter text-fs-x0 text-dark1 tablet:max-w-[525px] tablet:text-fs-xl laptop:max-w-[521px] laptop:text-left">
                        {feat.subTitle}
                      </h3>

                      <p className="max-w-[19rem] text-center font-open-sans text-fs-lg text-dark1 tablet:max-w-[23.6875rem] laptop:max-w-[491px] laptop:text-left">
                        {feat.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        );
      })}
    </>
  );
}
