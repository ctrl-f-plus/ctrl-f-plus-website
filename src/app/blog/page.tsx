// src/app/blog/page.tsx

import Container from '../components/layout/Container';

const blogPosts = [
  { title: 'Blog Post 1', date: '7/14/23' },
  { title: 'Blog Post 2', date: '7/14/23' },
  { title: 'Blog Post 3', date: '7/14/23' },
  { title: 'Blog Post 4', date: '7/14/23' },
  { title: 'Blog Post 5', date: '7/14/23' },
  { title: 'Blog Post 6', date: '7/14/23' },
];

export default function Blog() {
  return (
    <Container className="grid grid-cols-2">
      {blogPosts.map((post) => {
        return (
          // px-1 py-2
          <div
            key={post.title}
            // className="flex flex-col gap-2 space-x-2 rounded-3xl bg-red-500"
            className="m-2 flex h-auto w-auto min-w-[553px] flex-col space-x-2 first-letter:rounded-xl bg-white px-6 py-[19px]"
          >
            <h2>{post.title}</h2>
            <p>{post.date}</p>
          </div>
        );
      })}
    </Container>
  );
}
