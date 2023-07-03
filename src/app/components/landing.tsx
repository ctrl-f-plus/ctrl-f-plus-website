// src/app/components/landing.tsx

/* eslint-disable @next/next/no-img-element */
// 'use client';

import { useState } from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Landing() {
  return (
    <div className="relative overflow-hidden bg-gray-900  py-20 ">
      {/* <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workcation-logo-white.svg"
                alt=""
              /> */}
      <p className="text-white">
        “Amet amet eget scelerisque tellus sit neque faucibus non eleifend.
        Integer eu praesent at a. Ornare arcu gravida natoque erat et cursus
        tortor consequat at. Vulputate gravida sociis enim nullam ultricies
        habitant malesuada lorem ac.”
      </p>
    </div>
  );
}
