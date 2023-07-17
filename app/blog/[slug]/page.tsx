// app/blog/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import DrawingIcon from "../../components/icons/drawing-icon";
import Container from "../../components/layout/Container";
import BlogCard from "../components/blog-card";
import { Balancer } from "react-wrap-balancer";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";

interface BlogProps {
  params: {
    slug: string;
  };
}

export default async function Blog({ params }: BlogProps) {
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section>
        <Container className="mx-auto flex flex-col">
          {/* Header Card */}
          {/* justify-center */}
          <div className="mt-10  ">
            <Link
              href="/blog"
              className=" group flex w-fit flex-row items-center justify-start  gap-2 font-open-sans text-button-18 text-mongo-black group-hover:text-primary2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#889397]  duration-100 ease-in group-hover:-translate-x-1"
              >
                <path
                  d="M12.9999 6.83211L6.05548 6.83211L7.59049 5.2971C7.98101 4.90657 7.98101 4.27341 7.59049 3.88288L7.35157 3.64397C6.96105 3.25344 6.32788 3.25344 5.93736 3.64397L2.55473 7.0266C2.5455 7.03516 2.53639 7.04394 2.52742 7.05291L2.2885 7.29183C1.89797 7.68235 1.89797 8.31552 2.2885 8.70604L5.93965 12.3572C6.33017 12.7477 6.96334 12.7477 7.35386 12.3572L7.59278 12.1183C7.9833 11.7278 7.9833 11.0946 7.59278 10.7041L6.0587 9.16998L12.9999 9.16998C13.5522 9.16998 13.9999 8.72227 13.9999 8.16998V7.83211C13.9999 7.27982 13.5522 6.83211 12.9999 6.83211Z"
                  fill="#889397"
                />
              </svg>
              <span className="duration-100 ease-in group-hover:text-primary2">
                back
              </span>
            </Link>
            {/* mt-4 tablet:mt-10*/}
            <div className=" mt-4 flex  w-full items-center rounded-3xl bg-white/[.47] p-14 shadow-sm backdrop-blur-[23px] tab-pro:px-14 laptop:px-16 desktop:px-20">
              {/*  */}
              {/* Content */}
              {/* TODO: adjust gap for smaller screensizes: gap-?? bg-teal-500 */}
              {/* bg-blue-500 */}
              <div
                // min-h-[206px]
                className="flex  justify-start gap-[9.375rem] "
              >
                <div className="flex flex-col items-start justify-center gap-6  ">
                  <h1 className="font-inter text-fs-xl text-dark1">
                    {/* {post.title} */}
                    Blog
                  </h1>
                  <div className="min-h-[41px]">
                    <Balancer className="font-open-sans text-fs-lg text-[#889397]  ">
                      {post.publishedAt}
                    </Balancer>
                  </div>
                  {/* <div
                  // mt-8
                  className="relative  flex items-center gap-x-4"
                >
                  <img
                    // src={post.author.imageUrl}
                    src={
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                    }
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p
                      // text-gray-600
                      className="font-open-sans text-fs-lg text-dark1 "
                    >
                      {post.author}
                    </p>
                  </div>
                  </div>
                  */}
                </div>

                <div className="hidden desktop:block">
                  {/* <DrawingIcon /> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-10 grid grid-cols-1 gap-3 tablet:grid-cols-2 tablet:px-[24px]">
            {allBlogs
              .sort((a, b) => {
                if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                  return -1;
                }
                return 1;
              })
              .map((post: any) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-3xl bg-white/[.68] px-[24px] py-[19px] shadow-sm backdrop-blur-[23px]"
                >
                  <div className="flex w-full flex-col">
                    <h2 className="font-inter text-subtitle text-dark1">
                      <Balancer>{post.title}</Balancer>
                    </h2>
                    <p className="font-open-sans text-fs-lg text-dark1">
                      {post.publishedAt}
                    </p>
                  </div>
                </Link>
              ))}
          </div> */}
          {/* <div className="mt-10 grid grid-cols-1 gap-3 tablet:grid-cols-2 tablet:px-[24px]"> */}

          <div className="mt-10 laptop:px-[40px]">
            <div
              // mx-[24px] p-10
              className="rounded-3xl bg-white/[.68] px-[40px] py-[19px] shadow-sm backdrop-blur-[23px]"
            >
              <Mdx code={post?.body.code} />;
            </div>
          </div>
        </Container>
      </section>
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

//
//
//
// <div className="">
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
// </div>;
