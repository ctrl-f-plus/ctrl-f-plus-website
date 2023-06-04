/* eslint-disable @next/next/no-img-element */

function Hero() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Hero section */}
      <div className="relative pt-14 ">
        <div className="py-24 sm:py-32 ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
            <div className="relative w-full h-full flex items-center justify-center ">
              <span className="w-1/2 h-auto flex items-center justify-center ">
                {/* <img
                  src="/Asset 1.svg"
                  className="absolute left -top-24 w-3/5 h-auto rounded-md opacity-60 -rotate-12 "
                /> */}
              </span>
            </div>

            <div className="relative mx-auto max-w-2xl text-center">
              {/* <h1 className="text-4xl font-bold tracking-tight text-secondary00 sm:text-6xl">
                Ctrl-F Plus:{' '}
                <span className="bg-highlightFocus text-[#010100] shadow-md rounded-lg px-2">
                  For the Tab Hoarders
                </span>
              </h1> */}

              <h1 className="relative mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl ">
                {/* <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-glacier-950 sm:text-7xl "> */}
                Ctrl-F Plus:{' '}
                <span className="relative whitespace-nowrap ">
                  <span className="relative">For the </span>
                  <span className="relative bg-highlightFocus text-[#010100] shadow-md rounded-lg px-2">
                    Tab Hoarders
                  </span>
                </span>
              </h1>

              <p className="relative mt-6 text-lg leading-8 text-gray-600">
                Tab hoarders, your time has come. Ctrl-F Plus searches across
                all your precious tabs, not just the one you're currently
                obsessing over
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="relative rounded-md bg-glacier-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amaranth-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amaranth-400 "
                >
                  Add to Chrome for free
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-amaranth-600"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                {/* <div className="absolute w-full h-full bg-blue-500 rounded-md origin-tight -rotate-6"></div> */}
                <img
                  src="/DarkScreenShot.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="relative rounded-md shadow-2xl ring-1 ring-gray-900/10  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
