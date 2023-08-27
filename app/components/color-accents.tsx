// app/components/temp-components/color-accents.tsx

export function ColorAccents() {
  return (
    <>
      <div className="">
        <svg
          viewBox="0 0 1024 1024"
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
              <stop stopColor="#8DBEDA" />
              <stop offset={0} stopColor="#8DBEDA" />
            </radialGradient>
          </defs>
        </svg>

        <svg
          viewBox="0 0 1024 1024"
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
              <stop stopColor="#03AF7D" />
              <stop offset={1} stopColor="#03AF7D" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* <div className=" hidden">
        {' '}
        <div className="absolute -top-24 right-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 translate-x-1/2 rounded-full bg-[#8DBEDA] blur-[43.5px] filter " />
        <div className="absolute -bottom-24 left-10 h-[14.6875rem] w-[17.875rem] flex-shrink-0 -translate-x-1/2 rounded-full bg-[#03AF7D] blur-[43.5px] filter " />
      </div> */}
    </>
  );
}
