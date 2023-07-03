// src/app/components/call-to-action.tsx

import ButtonPhat from './ButtonPhat';
import Container from './layout/Container';

export default function CallToAction() {
  return (
    <>
      <Container className="w-full">
        <div className="flex h-[32.8125rem]  flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center">
          <h1 className="text-fs-x0 text-white">Boost your productivity.</h1>
          <p className="font-open-sans text-white">
            Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
            ipsum pretium amet.
          </p>
          <ButtonPhat />
        </div>
      </Container>

      <Container className="flex h-full w-full flex-col">
        {/* TODO: fix padding and maybe remove the min height */}
        <div className="flex min-h-[32.8125rem] flex-auto flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center">
          <h1 className="text-fs-x0 text-white">Boost your productivity.</h1>
          <p className="font-open-sans text-white">
            Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
            ipsum pretium amet.
          </p>
          <ButtonPhat />
        </div>
      </Container>

      {/* <Container className="flex h-full flex-col">
        <div className="flex flex-auto flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center">
          <h1 className="text-fs-x0 text-white">Boost your productivity.</h1>
          <p className="font-open-sans text-white">
            Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
            ipsum pretium amet.
          </p>
          <ButtonPhat />
        </div>
      </Container> */}
    </>
  );
}
