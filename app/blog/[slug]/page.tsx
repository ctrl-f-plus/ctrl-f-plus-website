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
      <section>
        <Container>
          {/* <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify(post.structuredData)}
        </script> */}
          <h1 className="">
            <Balancer>{post.title}</Balancer>
          </h1>
          <Mdx code={post?.body.code} />;
        </Container>
      </section>
    </>
  );
}
