import CtrlLink from '../ctrl-link';
import PuzzleIcon2 from '../icons/puzzle2';
import Link from 'next/link';

type ButtonProps = {
  // children: React.ReactNode;
  // onClick?: () => void;
  // url: string;
  className?: string;
};

// TODO: 1. Combine this into `ButtonPrimary`
// TODO: 2. Fix the styling of the button's width
function ButtonPhatMobile({ className, ...props }: ButtonProps) {
  return (
    <>
      <div className="group relative inline-block inline-flex w-[231px] items-center justify-start overflow-hidden rounded-full bg-highlighter-900 px-5 py-3 font-bold">
        <CtrlLink
          href={process.env.NEXT_PUBLIC_CHROME_STORE_URL}
          target={'_blank'}
          aTag
        >
          <div className="relative flex w-full items-center justify-center gap-4 text-center text-white">
            <div className="relative flex h-[2.5rem] w-[2.5rem] justify-center rounded-[1.5rem] bg-white p-[0.5625rem]">
              <span>
                <PuzzleIcon2 />
              </span>
            </div>

            <span className=" font-open-sans text-fs-lg">Add to Chrome</span>
          </div>
        </CtrlLink>
      </div>
    </>
  );
}

export default ButtonPhatMobile;
