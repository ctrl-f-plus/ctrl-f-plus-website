// app/blog/[slug]/page.tsx

import { allBlogs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Mdx } from '@/app/components/mdx';
import Balancer from 'react-wrap-balancer';
import Container from '@/app/components/layout/Container';

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
        {/* <Container className="mx-auto flex w-full flex-col items-center gap-y-10  p-5"> */}
        <Container className="mx-auto flex flex-col gap-y-10 p-2">
          {/* Header Card */}
          <div className="flex w-full items-center justify-center rounded-3xl bg-white/[.47] shadow-sm backdrop-blur-[23px] tablet:px-32 tablet:py-14">
            {/*  */}

            {/* Content */}
            {/* TODO: adjust gap for smaller screensizes: gap-?? bg-teal-500 */}
            <div className="flex justify-start gap-[9.375rem]">
              <div className="flex flex-col items-start justify-center gap-6 ">
                <h1 className="font-inter  text-fs-xl text-dark1">
                  {/* <div className="bg-white p-10 rounded-[2.5rem]">
            <h1 className="z-10 font-inter text-fs-x0 text-dark1"> */}
                  <Balancer>{post.title}</Balancer>
                </h1>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem]">
            <Mdx code={post?.body.code} />;
          </div>
        </Container>
      </section>
    </>
  );
}
