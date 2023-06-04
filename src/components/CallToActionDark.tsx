import Button from './Button';

/* eslint-disable @next/next/no-img-element */
export default function CallToAction() {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-glacier-950 mt-24">
        {/* <img
          className="absolute inset-0 w-full h-full object-cover "
          src="/Colored Shapes (1).svg"
          alt="absolute overflow-hidden "
        /> */}
        <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl ">
              Boost your productivity.
              <br />
              Add to Chrome for free.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Incididunt sint fugiat pariatur cupidatat consectetur sit cillum
              anim id veniam aliqua proident excepteur commodo do ea.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                url="#"
                className="rounded-md bg-amaranth-500 px-3.5 py-2.5 text-sm font-semibold
                text-white shadow-sm hover:bg-amaranth-400 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-amaranth-400"
              >
                Add to Chrome for free
              </Button>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        {/* <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg> */}
      </div>
    </>
  );
}
