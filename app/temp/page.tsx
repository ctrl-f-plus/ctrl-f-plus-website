// app/temp/page.tsx
// 'use client';

import ButtonPhat from '../components/temp-components/ButtonPhat';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { Button } from '../components/temp-components/button';

// import ButtonPhatMobile from '../components/buttons/button-phat-mobile';
import ButtonPrimaryCopy from '../components/buttons/button-primary-copy';
import CtrlButton from '../components/buttons/ctrl-button';
import FramerButton from '../components/buttons/framer-button';
import Container from '../components/container';
import QuickView from '../components/quick-view';

export default function page() {
  return (
    <>
      <Container className="mt-18 flex flex-col  tablet:mt-24">
        <h1 className=" text-lg font-bold ">Buttons</h1>

        <div className="bg-pin-200 flex flex-col items-center ">
          <div className="flex w-1/3 flex-col items-center gap-6 py-6">
            {/* <CtrlLink2
              className="rounded-full bg-red-500 px-4 py-2 font-bold text-white [--scale-from:100%] tab-pro:[--scale-to:80%]"
              href=""
              initial="default"
              whileHover={'hover'}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              variants={{
                default: { scale: 'var(--scale-from)' },
                hover: { scale: 'var(--scale-to)' },
              }}
            >
              test
            </CtrlLink2> */}

            {/* <CtrlButton intent="dark" size="thic" icon={'puzzle2'}>
              &nbsp; Ctrl Button
            </CtrlButton>
            <CtrlButton intent="dark" size="thic" icon={'puzzle'}>
              &nbsp; Add to Chrome
            </CtrlButton>
            <CtrlButton intent="primary" size="sm">
              Ctrl Button
            </CtrlButton>
            <CtrlButton intent="outline" size="default" icon={'play'}>
              Ctrl Button
            </CtrlButton>
            <CtrlButton intent="solid" size="default" icon={'puzzle'}>
              Add to Chrome for free
            </CtrlButton> */}
            {/* <button></button>
            <Link href={''}></Link>
            <CtrlLink></CtrlLink> */}

            {/* <Link href={'/about'} className="h-full w-full bg-red-500"> */}
            {/* <CtrlButton
              intent="solid"
              icon="heartHand"
              className=""
              animation="basic"
              href={'/about'}
              componentType="anchor"
            >
              Become a Sponsor!
            </CtrlButton> */}
            {/*
            <CtrlButton
              intent="outline"
              icon="play"
              className=""
              animation="slice"
              // href={'/about'}
              componentType="button"
            >
              See how it works
            </CtrlButton> */}
            <QuickView />
            {/* </Link> */}

            {/* <CtrlButton
              intent="solid"
              icon="heartHand"
              className="mt-20"
              animation="basic"
              target={'_blank'}
              href={process.env.NEXT_PUBLIC_GITHUB_EXT_URL}
            >
              Become a Sponsor!
            </CtrlButton>

            <CtrlButton
              intent="outline"
              icon="filledStar"
              animation="simple"
              className="fill-yellow-500"
              target={'_blank'}
              href={process.env.NEXT_PUBLIC_GITHUB_EXT_URL}
            >
              Star Us on GitHub!
            </CtrlButton> */}
          </div>
        </div>

        <div className="bg-pin-200 flex flex-col items-center bg-pink-100">
          <div className="flex w-1/3 flex-col items-center gap-6 py-6">
            <ButtonPrimary
              variant="solid"
              href={process.env.NEXT_PUBLIC_CHROME_STORE_URL}
              target={'_blank'}
              aTag
            >
              Add to Chrome for free
            </ButtonPrimary>

            {/* <ButtonPhatMobile /> */}

            <ButtonPrimaryCopy
              variant={'outline'}
              aTag={false}
              href="/temp"
              target={''}
            >
              ButtonPrimaryCopy
            </ButtonPrimaryCopy>

            <Button>Button</Button>

            <ButtonPhat />

            <ButtonPrimary
              variant={'outline'}
              aTag={false}
              href="/temp"
              target={''}
            >
              Button Primary
            </ButtonPrimary>
            <FramerButton>Framer Button</FramerButton>
          </div>
        </div>
      </Container>
    </>
  );
}