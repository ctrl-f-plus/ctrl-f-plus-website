// src/app/components/call-to-action.tsx

import ButtonPhat from './ButtonPhat';
import ElipseBlurBlue from './icons/elipse-blur-blue';
import ElipseBlurGreen from './icons/elipse-blur-green';
import Container from './layout/Container';

export default function CallToAction() {
  return (
    <>
      <Container className="w-full min-w-[23.5rem] ">
        <div className="relative isolate flex h-[32.8125rem]  flex-col items-center justify-center gap-9  overflow-hidden rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center shadow-xl">
          <svg
            viewBox="0 0 1024 1024"
            // className="absolute -left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            className="absolute -right-10 bottom-48 -z-10 h-[40rem] w-[40rem] translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1218)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1218">
                {/* <stop stopColor="#7775D6" />
                <stop offset={0} stopColor="#E935C1" /> */}
                <stop stopColor="#8DBEDA" />
                <stop offset={0} stopColor="#8DBEDA" />
              </radialGradient>
            </defs>
          </svg>
          {/* <div className="absolute -bottom-20 -left-20  h-[14.6875rem] w-[17.875rem] flex-shrink-0 rounded-full bg-[#03AF7D] blur-[43.5px] filter" /> */}
          <svg
            viewBox="0 0 1024 1024"
            // className="absolute -left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            className="absolute -left-10 top-48 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                {/* <stop stopColor="#7775D6" />
                <stop offset={0} stopColor="#E935C1" /> */}
                <stop stopColor="#03AF7D" />
                {/* <stop offset={1} stopColor="#6EC021" /> */}
                {/* <stop offset={1} stopColor="#756f68" /> */}
                <stop offset={1} stopColor="#03AF7D" />
              </radialGradient>
            </defs>
          </svg>
          {/* <div className="absolute -bottom-20 -left-20  h-[14.6875rem] w-[17.875rem] flex-shrink-0 rounded-full bg-[#03AF7D] blur-[43.5px] filter" /> */}
          {/* <svg
            viewBox="0 0 1024 1024"
            // className="absolute -left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            className="absolute right-20 top-1/2 -z-10 translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1218)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1218">
                <stop stopColor="#7775D6" />
                <stop offset={0} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg> */}
          {/* <div className="z-20"> */}
          <h1 className="font-inter text-fs-x0 text-white tablet:text-fs-xl laptop:max-w-[31.9375rem]">
            Boost your productivity.
          </h1>
          <p className="max-w-[26.75rem] font-open-sans text-fs-lg  text-white tablet:max-w-[25.8125rem] ">
            Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
            ipsum pretium amet.
          </p>
          <ButtonPhat />
          {/* </div> */}
        </div>
      </Container>

      {/* ALT COLOR */}
      <Container className="w-full min-w-[23.5rem] ">
        <div className="relative isolate flex h-[32.8125rem] flex-col  items-center justify-center gap-9 overflow-hidden rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center shadow-xl">
          <div className="absolute -top-24 right-10 -z-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 translate-x-1/2 rounded-full bg-[#8DBEDA] blur-[43.5px] filter" />
          <div className="absolute -bottom-24 left-10 -z-10   h-[14.6875rem] w-[17.875rem] flex-shrink-0 -translate-x-1/2 rounded-full bg-[#03AF7D] blur-[43.5px] filter " />

          <h1 className="font-inter text-fs-x0 text-white tablet:text-fs-xl laptop:max-w-[31.9375rem]">
            Boost your productivity.
          </h1>
          <p className="max-w-[26.75rem] font-open-sans text-fs-lg  text-white tablet:max-w-[25.8125rem]">
            Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
            ipsum pretium amet.
          </p>
          <ButtonPhat />
        </div>
      </Container>

      {/* TODO: TRY THE FOLLOWING CONTAINER AND COMPARE ITS RESPONSIVENESS */}
      {/* <Container className="flex h-full w-full min-w-[23.5rem] flex-col">
        // TODO: fix padding and maybe remove the min height
        <div className="isolate flex min-h-[32.8125rem] flex-auto flex-col items-center justify-center gap-9 rounded-[2.25rem] bg-dark1 px-[2.25rem] text-center shadow-xl">
          <h1 className="text-fs-x0 text-white">Boost your productivity.</h1>
          <p className="font-open-sans text-white">
            Lorem ipsum dolor sit amet consectetur. Nunc fames venenatis non
            ipsum pretium amet.
          </p>
          <ButtonPhat />
        </div>
      </Container> */}

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
