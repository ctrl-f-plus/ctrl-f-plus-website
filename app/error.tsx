'use client';

// import Button from '@/components/Button';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div>
      <h1>Error</h1>
      <p>Something went wrong...</p>
      {/* <Button onClick={reset}>Try again</Button> */}
    </div>
  );
}
