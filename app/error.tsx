'use client';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <>
      <div className="mt-2 grid place-items-center gap-2 text-center ">
        <h1 className=" font-inter text-fs-xl tracking-tight text-dark1 sm:text-5xl">
          Error
        </h1>
        <p className=" text-base leading-7 text-gray-600">
          Something went wrong...
        </p>
        <div className="flex w-full items-center justify-center">
          <div className="w-3/4">
            <button>Try Again</button>
          </div>
        </div>
      </div>
    </>
  );
}

// 'use client';

// import ButtonPrimaryCopy from './components/buttons/button-primary-copy';
// import Container from './components/layout/Container';

// // import Button from '@/components/Button';

// type ErrorPageProps = {
//   error: Error;
//   reset: () => void;
// };

// export default function ErrorPage({ error, reset }: ErrorPageProps) {
//   return (
//     <>
//       <Container className=" mt-18">
//         <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
//           <div className="text-center">
//             {/* <p className="text-base font-semibold text-primary1"></p> */}
//             <h1 className="mt-4 font-inter text-fs-xl tracking-tight text-dark1 sm:text-5xl">
//               Error
//             </h1>
//             <p className="mt-6 text-base leading-7 text-gray-600">
//               Something went wrong...
//             </p>
//             <div className="mt-10 flex w-full items-center justify-center ">
//               <div className="w-3/4">
//                 <button>
//                   Try Again
//                 </button>
// <ButtonPrimaryCopy variant={'simple'} className={''}>
//   Try Again
// </ButtonPrimaryCopy>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }
