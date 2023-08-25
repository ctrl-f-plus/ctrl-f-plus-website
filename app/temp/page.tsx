// app/temp/page.tsx
// 'use client';

import ButtonPhat from '../components/buttons/ButtonPhat';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { Button } from '../components/buttons/button';
import ButtonMobile from '../components/buttons/button-mobile';
import ButtonPhatMobile from '../components/buttons/button-phat-mobile';
import ButtonPrimaryCopy from '../components/buttons/button-primary-copy';
import CtrlButton from '../components/buttons/ctrl-button';
import FramerButton from '../components/buttons/framer-button';
import Container from '../components/container';
import { HeartHandIcon } from '../components/icons/button-icons';
import PuzzleIcon from '../components/icons/puzzle';
import PuzzleIcon2 from '../components/icons/puzzle2';

export default function page() {
  return (
    <>
      <Container className="mt-18 flex flex-col  tablet:mt-24">
        <h1 className=" text-lg font-bold ">Buttons</h1>

        <div className="bg-pin-200 flex flex-col items-center ">
          <div className="flex w-1/3 flex-col items-center gap-6 py-6">
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

            <CtrlButton
              intent="solid"
              icon="heartHand"
              className="mt-20"
              animation="basic"
              href={'/about'}
            >
              Become a Sponsor!
            </CtrlButton>

            <CtrlButton
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
            </CtrlButton>
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
            <ButtonMobile
              variant={'outline'}
              aTag={false}
              target={''}
              href="/temp"
            >
              ButtonMobile
            </ButtonMobile>

            <ButtonPhatMobile />

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
