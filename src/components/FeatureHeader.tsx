export default function FeatureHeader() {
  return (
    // <div className="px-6 pt-24 sm:pt-32 lg:px-8">
    <div className="px-6 pt-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base font-semibold leading-7 text-amaranth-500 ">
          Tab Junkie? Meet Your New Best Friend.
        </p>
        {/* <h2 className="font-display text-3xl tracking-tight text-gray-900 sm:text-4xl md:text-5xl"> */}
        <h2 className="font-display mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your Guiding Light in the Tab Chaos
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {`Tab overload? We've got your back. Unearth any word or phrase hidden
          in the depths of your browser.`}
        </p>
      </div>
    </div>
    // </div>
  );
}
