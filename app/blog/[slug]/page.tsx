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

      <section>
        <Container className="mx-auto flex flex-col gap-y-10 ">
          <Link
            href="/blog"
            className="font-open-sans flex flex-row items-center justify-start text-mongo-black text-button-18 gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9999 6.83211L6.05548 6.83211L7.59049 5.2971C7.98101 4.90657 7.98101 4.27341 7.59049 3.88288L7.35157 3.64397C6.96105 3.25344 6.32788 3.25344 5.93736 3.64397L2.55473 7.0266C2.5455 7.03516 2.53639 7.04394 2.52742 7.05291L2.2885 7.29183C1.89797 7.68235 1.89797 8.31552 2.2885 8.70604L5.93965 12.3572C6.33017 12.7477 6.96334 12.7477 7.35386 12.3572L7.59278 12.1183C7.9833 11.7278 7.9833 11.0946 7.59278 10.7041L6.0587 9.16998L12.9999 9.16998C13.5522 9.16998 13.9999 8.72227 13.9999 8.16998V7.83211C13.9999 7.27982 13.5522 6.83211 12.9999 6.83211Z"
                fill="#889397"
              />
            </svg>
            back
          </Link>
          {/* Header Card */}
          {/* <div className="flex w-full items-center justify-center rounded-3xl bg-white/[.47] shadow-sm backdrop-blur-[23px] tablet:px-32 tablet:py-14"> */}
          <div className="flex w-full h-[307px] items-center justify-center rounded-3xl bg-white/[.47] shadow-sm backdrop-blur-[23px] ">
            <div className="flex justify-start bg-red-500 gap-[9.375rem]">
              <div className="flex flex-col gap-6 ">
                <h1 className="font-inter text-fs-xl text-dark1">
                  {/* <Balancer>{post.title}</Balancer> */}
                  {post.title}
                </h1>
              </div>
            </div>
          </div>

          {/* <div className="bg-white p-10 rounded-3xl"> */}
          <div className="rounded-3xl bg-white/[.68] px-[24px] py-[19px] shadow-sm backdrop-blur-[23px]">
            <Mdx code={post?.body.code} />;
          </div>
        </Container>
      </section>
    </>
  );
}
