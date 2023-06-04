/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import React from 'react';

function MapIcon(props: any) {
  return /*#__PURE__*/ React.createElement(
    'svg',
    Object.assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      },
      props
    ),
    /*#__PURE__*/ React.createElement('path', {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: 2,
      d: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    })
  );
}

export default function FeatureLeft1() {
  return (
    <div className="overflow-hidden pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Right Column */}
          <div className="lg:ml-auto lg:pl-4 lg:pt-4 flex">
            <div className="lg:max-w-lg m-auto ">
              <h3 className="flex items-center text-base font-semibold leading-7 text-glacier-600">
                <MapIcon className="h-6 w-6 mr-2" aria-hidden="true" /> All-Tab
                Search: The Panoramic View
              </h3>
              <p className=" mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
                Upgrade from One-Tab Searches
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Your CTRL+F only searches one tab? That's cute. We prefer the
                panoramic view.
              </p>
            </div>
          </div>

          {/* Left Column */}
          <div className="flex items-start justify-end lg:order-first">
            <img
              src="/Frame 2.png"
              className="w-[48rem] max-w-none sm:w-[57rem]"
              width={2432}
              height={1442}
            />
          </div>
          {/* <div className="flex items-start justify-end lg:order-first">
            <img
              src="/Frame 2.png"
              className="w-[36rem] h-auto sm:w-[42.75rem]"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
