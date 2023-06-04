/* eslint-disable @next/next/no-img-element */

import React from 'react';

function LightningBoltIcon(props: any) {
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
      d: 'M13 10V3L4 14h7v7l9-11h-7z',
    })
  );
}

export default function FeatureRight() {
  return (
    <div className="overflow-hidden pt-24 sm:pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4 flex">
            <div className="lg:max-w-lg m-auto">
              <h3 className="flex items-center text-base font-semibold leading-7 text-glacier-600">
                <LightningBoltIcon
                  className="h-6 w-6 mr-2"
                  aria-hidden="true"
                />{' '}
                Familiar Interface: Revolutionary Yet Comfortable
              </h3>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Innovation with Coziness
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Just because we've revolutionized search doesn't mean we can't
                be cozy. Slip into something comfortable.
              </p>
            </div>
          </div>

          <img
            src="/Frame 1.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
