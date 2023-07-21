// app/blog/[slug]/page.tsx

import { allBlogs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '@/app/components/mdx';
import Balancer from 'react-wrap-balancer';
import Container from '@/app/components/layout/Container';
import Link from 'next/link';

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
      {/* <section className="flex flex-col justify-center items-center">
        <Container className="flex flex-col gap-9"> */}
      {/* <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify(post.structuredData)}
        </script> */}
      {/* gap-y-10 mt-18 tablet:mt-24 wide:mt-[7.625rem] */}
      <section>
        <Container className=" flex flex-col ">
          <Link
            href="/blog"
            className="group flex flex-row items-center justify-start gap-2 font-open-sans text-button-18 text-mongo-black group-hover:text-primary2 tablet:mt-10"
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
          {/* Header Card */}
          {/* <div className="flex w-full items-center justify-center rounded-3xl bg-white/[.47] shadow-sm backdrop-blur-[23px] tablet:px-32 tablet:py-14"> */}
          <div
            // justify-center
            className="mt-4 flex w-full items-center rounded-3xl bg-red-800 p-14 shadow-sm backdrop-blur-[23px]  tab-pro:px-14 laptop:px-16 desktop:px-20"
            // className="flex h-[307px] w-full items-center rounded-3xl bg-white/[.47] px-10 shadow-sm backdrop-blur-[23px]  "
          >
            {/* bg-primary2 */}
            <div className="flex justify-start gap-[9.375rem]">
              <div className="flex flex-col items-start justify-center gap-6 ">
                {/* <h1 className="w-full font-inter text-fs-xl text-dark1">
                  <Balancer>{post.title}</Balancer>
                </h1> */}
                <h1 className="font-inter text-fs-xl text-dark1">Blog</h1>
                {/* <p className="font-open-sans text-fs-lg text-dark1">
                  {post.publishedAt}
                </p> */}
                <div className="w-1/2 bg-blue-500 font-open-sans text-fs-lg text-dark1">
                  Welcome to development journey of{' '}
                  <span className="text-highlight-focus-1 ">Ctrl-F Plus!</span>{' '}
                  Here, you can find articles about my progress, challenges, and
                  successes. I hope you enjoy reading about my experiences and
                  find them inspiring.
                </div>
              </div>
            </div>
          </div>

          {/* <div className="bg-white p-10 rounded-3xl"> */}
          <div className="mt-10 rounded-3xl bg-white/[.68]  p-10 shadow-sm backdrop-blur-[23px]">
            <Mdx code={post?.body.code} />;
          </div>
        </Container>
      </section>
    </>
  );
}
