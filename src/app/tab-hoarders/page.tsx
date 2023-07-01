// ctrl-f-plus-website/src/app/tab-hoarders/page.tsx

import ButtonPhat from './components/ButtonPhat';
import ButtonPrimary from './components/ButtonPrimary';

export default function page() {
  return (
    // <div className="desktop:bg-red-500 tablet:bg-blue-700 bg-yellow-300">
    <div className="">
      <h1>Ctrl-F Plus: For the Tab Hoarders</h1>
      <ButtonPrimary variant="solid">Add to Chrome for free</ButtonPrimary>
      <ButtonPrimary variant="outline">See how it works</ButtonPrimary>
      <ButtonPhat />
    </div>
  );
}
