// src/app/blog/page.tsx

import DrawingIcon from '../components/icons/drawing-icon';
import Container from '../components/layout/Container';

const blogPosts = [
  { title: 'Environment variables and GraphQL queries 1', date: '7/14/23' },
  { title: 'Environment variables and GraphQL queries 2', date: '7/14/23' },
  { title: 'Environment variables and GraphQL queries 3', date: '7/14/23' },
  { title: 'Environment variables and GraphQL queries 4', date: '7/14/23' },
  { title: 'Environment variables and GraphQL queries 5', date: '7/14/23' },
  { title: 'Blog Post 2', date: '7/14/23' },
  { title: 'Blog Post 3', date: '7/14/23' },
  { title: 'Blog Post 4', date: '7/14/23' },
  { title: 'Blog Post 5', date: '7/14/23' },
  { title: 'Blog Post 6', date: '7/14/23' },
  { title: 'Blog Post 7', date: '7/14/23' },
];

export default function Blog() {
  return (
    <>
      <Container className="mx-auto flex w-full flex-col items-center gap-y-10  p-5">
        {/* Header Card */}
        <div className="flex w-full items-center justify-center rounded-3xl  bg-white/[.47] px-32 py-14 shadow-sm backdrop-blur-[23px]">
          {/* Content */}
          {/* TODO: adjust gap for smaller screensizes: gap-?? bg-teal-500 */}
          <div className="flex justify-start gap-[9.375rem]">
            <div className="flex flex-col items-start justify-center gap-6 p-2">
              <h1 className="font-inter  text-fs-xl text-dark1">Blog</h1>
              <p className="font-open-sans text-fs-lg text-dark1">
                Welcome to development journey of{' '}
                <span className="text-highlight-focus-1">Ctrl-F Plus!</span>{' '}
                Here, you can find articles about my progress, challenges, and
                successes. I hope you enjoy reading about my experiences and
                find them inspiring.
              </p>
            </div>
            <div className="hidden desktop:block">
              <DrawingIcon />
            </div>
          </div>
        </div>

        <ul className="grid w-full grid-cols-1 gap-y-3 laptop:grid-cols-2">
          {blogPosts.map((post) => {
            return (
              <div key={post.title} className="flex justify-around">
                <li
                  key={post.title}
                  // className="flex max-w-xl items-start rounded-3xl bg-white/[.68] px-[24px] py-[19px] backdrop-blur-[23px]"
                  className="min-w-[36rem] rounded-3xl  bg-white/[.68] px-[24px] py-[19px] shadow-sm backdrop-blur-[23px]"
                >
                  <div className="flex w-full flex-col items-start gap-2 gap-[12px] p-2">
                    <h2 className="w-full font-inter text-subtitle text-dark1">
                      {post.title}
                    </h2>
                    <p className="font-open-sans text-fs-lg text-dark1">
                      {post.date}
                    </p>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </Container>
    </>
  );
}

{
  /* <div className="mb-[4.5rem] w-full bg-blue-500"> */
}
{
  /*  <Container className="px-16"> */
}
{
  /* <Container className="mx-auto flex w-full flex-col items-start gap-y-10  p-5">
  {/* Header Card */
}
//   <div className="flex w-full items-center justify-center rounded-3xl bg-white/[.47] px-32 py-14 backdrop-blur-[23px]">
//     {/* Content */}
//     {/* TODO: adjust gap for smaller screensizes: gap-?? bg-teal-500 */}
//     <div className="flex justify-start gap-[9.375rem]">
//       <div className="flex flex-col items-start justify-center gap-6 p-2">
//         <h1 className="font-inter  text-fs-xl text-dark1">Blog</h1>
//         <p className="font-open-sans text-fs-lg text-dark1">
//           Welcome to development journey of{' '}
//           <span className="text-highlight-focus-1">Ctrl-F Plus!</span> Here, you
//           can find articles about my progress, challenges, and successes. I hope
//           you enjoy reading about my experiences and find them inspiring.
//         </p>
//       </div>
//       <div className="hidden laptop:block">
//         <DrawingIcon />
//       </div>
//     </div>
//   </div>

//   <div
//     // className="grid w-full gap-3  laptop:grid-cols-9"
//     // className="flex flex-grow flex-wrap content-start items-start gap-3"
//     className="flex flex-wrap content-start items-start gap-[12px] self-stretch "
//   >
//     {blogPosts.map((post) => {
//       return (
//         <div
//           key={post.title}
//           className="flex flex-col items-start gap-2 rounded-3xl bg-white/[.68] px-[24px] py-[19px] backdrop-blur-[23px]"
//         >
//           <div className="flex flex-col items-start gap-[12px] p-2">
//             <h2 className="font-inter text-subtitle text-dark1">
//               {post.title}
//             </h2>
//             <p className="body-18  font-open-sans text-dark1">{post.date}</p>
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </Container>; */}

// <Container className=" ">
//   {/*  <Container className="px-16"> */}
//   <div className="grid grid-cols-2 gap-3  px-16">
//     {blogPosts.map((post) => {
//       return (
//         // <div
//         //   key={post.title}
//         //   className="flex flex-col gap-2 rounded-[24px] bg-white px-[24px] py-[19px]"
//         //   // className="flex flex-col gap-2 space-x-2 rounded-3xl "
//         //   // className="m-2 flex h-auto w-auto min-w-[553px] flex-col space-x-2 bg-white px-6 py-[19px] first-letter:rounded-xl"
//         // >
//         //   <h2 className="font-inter text-subtitle text-dark1">
//         //     {post.title}
//         //   </h2>
//         //   <p className="body-18  font-open-sans text-dark1">{post.date}</p>
//         // </div>

//         <div
//           key={post.title}
//           className="inline-flex h-[123px] w-[553px] flex-col items-start justify-start gap-2 rounded-3xl bg-white bg-opacity-70 px-6 py-[19px] backdrop-blur-[46px]"
//         >
//           <div className="flex flex-col items-start justify-start gap-3 p-2">
//             <div className="text-center text-[23px] font-semibold leading-7 text-neutral-800">
//               Environment variables and GraphQL queries
//             </div>
//             <div className="text-center text-[18px] font-normal leading-relaxed text-neutral-800">
//               12/11/2023
//             </div>
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </Container>

// {/* <div>
//   {/* sm:bg-slate-200 sm:py-32 md:bg-slate-500 lg:bg-slate-800 xl:bg-red-500 */}
//   <div className="bg-slate-400 py-24 sm:py-32">
//     <div className="mx-auto max-w-7xl px-6 lg:px-8">
//       {/*  */}
//       {/* <div className="mx-auto max-w-2xl sm:text-center">
//               <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
//                 Meet our leadership
//               </h2>
//               <p className="text-lg mt-6 leading-8 text-gray-600">
//                 We’re a dynamic group of individuals who are passionate about
//                 what we do and dedicated to delivering the best results for our
//                 clients.
//               </p>
//             </div> */}

//       <div className="flex w-full items-center justify-center rounded-3xl  bg-white/[.47] px-32 py-14 backdrop-blur-[23px]">
//         {/* Content */}
//         {/* TODO: adjust gap for smaller screensizes: gap-?? bg-teal-500 */}
//         <div className="flex justify-start gap-[9.375rem]">
//           <div className="flex flex-col items-start justify-center gap-6 p-2">
//             <h1 className="font-inter  text-fs-xl text-dark1">Blog</h1>
//             <p className="font-open-sans text-fs-lg text-dark1">
//               Welcome to development journey of{' '}
//               <span className="text-highlight-focus-1">Ctrl-F Plus!</span> Here,
//               you can find articles about my progress, challenges, and
//               successes. I hope you enjoy reading about my experiences and find
//               them inspiring.
//             </p>
//           </div>
//           <div className="hidden desktop:block">
//             <DrawingIcon />
//           </div>
//         </div>
//       </div>

//       <ul
//         role="list"
//         className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-3   sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
//       >
//         {blogPosts.map((post) => (
//           <li
//             key={post.title}
//             className="flex flex-col gap-6 rounded-3xl border border-gray-300 bg-white/[.68] shadow-sm backdrop-blur-[23px] xl:flex-row"
//           >
//             {/* gap-2 gap-[12px] p-2 */}
//             <div className="flex-auto px-[24px] py-[19px] ">
//               <h3 className="font-inter text-subtitle leading-8 tracking-tight text-dark1 ">
//                 {post.title}
//               </h3>

//               <p className="font-open-sans text-fs-lg leading-7 text-dark1">
//                 {post.date}
//               </p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// </div>; */}
