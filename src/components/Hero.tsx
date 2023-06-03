/* eslint-disable @next/next/no-img-element */
function Hero() {
  return (
    <div>
      {/* Hero section */}
      <div className="relative pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          {/* <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          /> */}
        </div>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              {/* <h1 className="text-4xl font-bold tracking-tight text-secondary00 sm:text-6xl">
                Tab hoarding just got{' '}
                <span className="bg-highlightFocus text-[#010100] shadow-md rounded-lg px-2">
                  better!
                </span>
              </h1> */}
              {/* <h1 className="text-4xl font-bold tracking-tight text-secondary00 sm:text-6xl">
                Ctrl-F Plus:{' '}
                <span className="bg-highlightFocus text-[#010100] shadow-md rounded-lg px-2">
                  For the Tab Hoarders
                </span>
              </h1> */}

              <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl ">
                {/* <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-glacier-950 sm:text-7xl "> */}
                Ctrl-F Plus:{' '}
                <span className="relative whitespace-nowrap ">
                  {/* <svg
                    aria-hidden="true"
                    viewBox="0 0 418 42"
                    className="absolute left-0 top-2/3 h-[0.58em] w-full fill-highlight "
                    preserveAspectRatio="none"
                  >
                    <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                  </svg> */}
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
                  className="rounded-md bg-glacier-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amaranth-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amaranth-400 "
                >
                  Add to Chrome for free
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-glacier-600"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                {/* <div className="-m-2 rounded-xl bg-red-500 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4"> */}
                {/* <div className="absolute w-full h-full bg-blue-500 rounded-md origin-tight -rotate-6"></div> */}
                <img
                  // src="/https://tailwindui.com/img/component-images/project-app-screenshot.png/"
                  // src="/heroscreenshot.png"
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
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          {/* <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}
export default Hero;

// h2: font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl
// font-display text-3xl tracking-tight text-slate-900 sm:text-4xl
// h3: 'font-display text-lg leading-7 text-slate-900';
