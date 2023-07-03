// src/app/tab-hoarders/components/ButtonPhat.tsx

import PuzzleIcon2 from './icons/puzzle2';

// TODO: 1. Combine this into `ButtonPrimary`
// TODO: 2. Fix the styling of the button's width
function ButtonPhat() {
  return (
    <div>
      {' '}
      <button
        type="button"
        className="flex h-auto w-[299px] items-center justify-center gap-4 rounded-[72px] bg-primary1 py-2 font-open-sans text-fs-lg text-white"
      >
        <div className="flex h-[2.5rem] w-[2.5rem] justify-center rounded-[1.5rem] bg-white p-[0.5625rem]">
          <PuzzleIcon2 />
        </div>
        Add to Chrome
      </button>
    </div>
  );
}

export default ButtonPhat;
