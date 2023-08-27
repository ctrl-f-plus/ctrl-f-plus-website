// @ts-nocheck
// app/variation-links/page.tsx

import Link from 'next/link';
import Container from '../components/container';

export default function page() {
  return (
    <Container>
      <div className="mt-20">
        <h2 className="font-semibold ">Blog Page Variations:</h2>
        <ol className="list-inside list-decimal indent-4">
          <li>
            <Link className="text-blue-500 underline" href="/blog-variation2">
              /blog-variation2
            </Link>
          </li>
        </ol>
      </div>
      {/* <div className="mt-5">
        <h2 className="font-semibold ">About Page Variations</h2>
        <ol className="list-inside list-decimal indent-4">
          <li>
            <Link className="text-blue-500 underline" href="/about-variation2">
              /about-variation2
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 underline" href="/about-variation3">
              /about-variation3
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 underline" href="/about-variation4">
              /about-variation4
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 underline" href="/about-variation5">
              /about-variation5
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 underline" href="/about-variation6">
              /about-variation6
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 underline" href="/about-variation7">
              /about-variation7
            </Link>
          </li>
        </ol>
      </div> */}
    </Container>
  );
}
