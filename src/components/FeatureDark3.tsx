import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid';

const features = [
  {
    name: 'Text Search.',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: Cog6ToothIcon,
  },
  {
    name: 'Simple and Familiar.',
    description:
      'If you know how to use Ctrl-F, you know how to use Ctrl-F Plus. Just press Ctrl-Shift-F instead.',
    icon: LockClosedIcon,
  },
  {
    name: 'Search Across All Tabs.',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commod.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Separate your searches',
    description:
      'Ctrl-F Plus keeps each search confined to the current window.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Keyboard Navigation.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Search Counter.',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. ',
    icon: ServerIcon,
  },
  // {
  //   name: 'Phrase Highlighting.',
  //   description:
  //     'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. ',
  //   icon: ServerIcon,
  // },
];

export default function FeatureDark3() {
  return (
    <div className="my-24">
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">
              All Tabs, No Restrictions
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Love All Your Tabs Equally.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Why show favoritism towards one tab when you've got dozens? Ctrl-F
              Plus doesn't judge, it just searches across all your beloved tabs.
            </p>
          </div>
        </div>
        {/* pt-16 */}
        <div className="relative overflow-hidden pt-5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* <img
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
            width={2432}
            height={1442}
          /> */}
            <div className="relative" aria-hidden="true">
              <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9 ">
                <dt className="inline font-semibold text-white underline decoration-wavy decoration-accent0">
                  <feature.icon
                    className="absolute left-1 top-1 h-5 w-5 text-indigo-500 "
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
    </div>
  );
}
