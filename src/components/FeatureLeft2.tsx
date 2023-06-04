// import {
//   CloudArrowUpIcon,
//   LockClosedIcon,
//   ServerIcon,
// } from '@heroicons/react/20/solid';

import React from 'react';

// // const features = [
// //   {
// //     name: 'Push to deploy.',
// //     description:
// //       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
// //     icon: CloudArrowUpIcon,
// //   },
// //   {
// //     name: 'SSL certificates.',
// //     description:
// //       'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
// //     icon: LockClosedIcon,
// //   },
// //   {
// //     name: 'Database backups.',
// //     description:
// //       'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
// //     icon: ServerIcon,
// //   },
// // ];

// const features = [
//   {
//     name: 'Tab-Wide Search',
//     description:
//       'No more clicking through tabs to find that elusive piece of information. Perform a Ctrl-Shift-F, and Ctrl-F Plus sweeps through all open tabs in your current window.',
//     icon: CloudArrowUpIcon,
//   },
//   {
//     name: 'Precise Hits',
//     description:
//       'Every search result comes with context. Know exactly where your search term shows up in every tab.',
//     icon: LockClosedIcon,
//   },
//   {
//     name: 'Keep Your Tabs Open',
//     description:
//       "No need to close tabs out of fear of losing control. Hoard away, we've got your back.",
//     icon: ServerIcon,
//   },
// ];

// export default function FeatureLeft2() {
//   return (
//     <div className="overflow-hidden pt-12 sm:pt-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
//           {''}

//           {/* Right Column */}
//           <div className="lg:ml-auto lg:pl-4 lg:pt-4 flex">
//             <div className="lg:max-w-lg m-auto">
//               <h3 className="text-base font-semibold leading-7 text-glacier-600">
//                 {/* <h3 className="font-display text-lg leading-7 text-amaranth-600"> */}
//                 Break Free from Single-Tab Search
//               </h3>
//               <p className=" mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
//                 Search Across All Your Tabs, All At Once
//               </p>
//               <p className="mt-6 text-lg leading-8 text-gray-600">
//                 With Ctrl-F Plus, perform a Ctrl-Shift-F and watch as your
//                 search term is found across all open tabs in your current
//                 window. No more tab-hopping to find that elusive piece of
//                 information.
//               </p>
//             </div>
//           </div>

//           {/* Left Column */}
//           <div className="flex items-start justify-end lg:order-first">
//             <img
//               // src="/DarkScreenShot.png"
//               src="/Frame 2.png"
//               // className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
//               className="w-[48rem] max-w-none sm:w-[57rem]"
//               width={2432}
//               height={1442}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { SearchIcon } from '@heroicons/react/24/outline';
// import { MagnifyingGlass } from '@heroicons/react/24/outline';

function SearchIcon(props) {
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
      d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    })
  );
}

export default function FeatureLeft2() {
  return (
    <div className="overflow-hidden pt-12 sm:pt-16 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Right Column */}
          <div className="lg:ml-auto lg:pl-4 lg:pt-4 flex">
            <div className="lg:max-w-lg m-auto">
              {/* <h3 className="flex items-center text-base font-semibold leading-7 text-glacier-600">
                <SearchIcon className="h-6 w-6 mr-2" aria-hidden="true" /> Break
                Free from Single-Tab Search
              </h3>
              <p className=" mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">
                Search Across All Your Tabs, All At Once
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                With Ctrl-F Plus, perform a Ctrl-Shift-F and watch as your
                search term is found across all open tabs in your current
                window. No more tab-hopping to find that elusive piece of
                information.
              </p> */}
              <h3 className="flex items-center text-base font-semibold leading-7 text-glacier-600">
                <SearchIcon className="h-6 w-6 mr-2" aria-hidden="true" />
                Easy Activation: CTRL+SHIFT+F
              </h3>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Simplicity at Your Fingertips
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                CTRL+SHIFT+F. So easy a caveman could do it. But don't worry,
                you'll probably get the hang of it too.
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
        </div>
      </div>
    </div>
  );
}
