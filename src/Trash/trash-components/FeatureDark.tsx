/* eslint-disable @next/next/no-img-element */
import {
  ArrowPathIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid';

// const features = [
//   {
//     name: 'Push to deploy.',
//     description:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
//     icon: CloudArrowUpIcon,
//   },
//   {
//     name: 'SSL certificates.',
//     description:
//       'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
//     icon: LockClosedIcon,
//   },
//   {
//     name: 'Simple queues.',
//     description:
//       'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus voluptas blanditiis et.',
//     icon: ArrowPathIcon,
//   },
//   {
//     name: 'Advanced security.',
//     description:
//       'Iure sed ab. Aperiam optio placeat dolor facere. Officiis pariatur eveniet atque et dolor.',
//     icon: FingerPrintIcon,
//   },
//   {
//     name: 'Powerful API.',
//     description:
//       'Laudantium tempora sint ut consectetur ratione. Ut illum ut rem numquam fuga delectus.',
//     icon: Cog6ToothIcon,
//   },
//   {
//     name: 'Database backups.',
//     description:
//       'Culpa dolorem voluptatem velit autem rerum qui et corrupti. Quibusdam quo placeat.',
//     icon: ServerIcon,
//   },
// ];

const features = [
  {
    name: 'Push to deploy.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.',
    icon: ServerIcon,
  },
];

// export default function FeatureDark() {
//   return (
//     <div className="bg-gray-900 py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl lg:mx-0">
//           <h2 className="text-base font-semibold leading-7 text-indigo-400">
//             Everything you need
//           </h2>
//           <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
//             No server? No problem.
//           </p>
//           <p className="mt-6 text-lg leading-8 text-gray-300">
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
//             impedit perferendis suscipit eaque, iste dolor cupiditate
//             blanditiis.
//           </p>
//         </div>
//         <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
//           {features.map((feature) => (
//             <div key={feature.name} className="relative pl-9">
//               <dt className="inline font-semibold text-white">
//                 <feature.icon
//                   className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
//                   aria-hidden="true"
//                 />
//                 {feature.name}
//               </dt>{' '}
//               <dd className="inline">{feature.description}</dd>
//             </div>
//           ))}
//         </dl>
//       </div>
//     </div>
//   );
// }

export default function FeatureDark() {
  return (
    <div className=" my-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
            <div className="lg:row-start-2 lg:max-w-md">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Boost your productivity.
                <br />
                Start using our app today.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
                Malesuada adipiscing sagittis vel nulla. Ac euismod vel sit
                maecenas.
              </p>
            </div>
            <img
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt="Product screenshot"
              className="relative -z-20 min-w-full max-w-xl rounded-xl shadow-xl ring-1 ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none"
              width={2432}
              height={1442}
            />
            <div className="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-white/10 lg:pt-10">
              <dl className="max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt className="ml-9 inline-block font-semibold text-white">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div
            className="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu"
            aria-hidden="true"
          >
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
