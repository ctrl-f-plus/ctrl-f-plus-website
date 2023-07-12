// src/app/blog/[slug]/page.tsx

import Container from '@/app/components/layout/Container';

export default function Blog({ params }: any) {
  // const post = allBlogs.find((post) => post.slug === params.slug);

  return (
    <>
      <Container className="bg-red-500">
        <h1>Blog Post</h1>
      </Container>
    </>
  );
}
