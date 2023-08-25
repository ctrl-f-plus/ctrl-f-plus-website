// app/temp/page.tsx
'use client';

import ButtonPhat from '../components/buttons/ButtonPhat';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { Button } from '../components/buttons/button';
import ButtonMobile from '../components/buttons/button-mobile';
import ButtonPhatMobile from '../components/buttons/button-phat-mobile';
import ButtonPrimaryCopy from '../components/buttons/button-primary-copy';
import CtrlButton from '../components/buttons/ctrl-button';
import Container from '../components/container';

export default function page() {
  return (
    <>
      <Container className="mt-18 flex flex-col  tablet:mt-24">
        <h1 className=" text-lg font-bold ">Buttons</h1>

        <div className="bg-pin-200 flex flex-col items-center bg-red-100">
          <div className="flex w-1/3 flex-col items-center gap-6 py-6">
            <CtrlButton>Ctrl Button</CtrlButton>
          </div>
        </div>

        <div className="bg-pin-200 flex flex-col items-center bg-pink-100">
          <div className="flex w-1/3 flex-col items-center gap-6 py-6">
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
          </div>
        </div>
      </Container>
    </>
  );
}
