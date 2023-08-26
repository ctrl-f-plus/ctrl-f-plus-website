'use client';

import { useEffect } from 'react';
import Container from './components/container';
import { FadeIn } from './components/fade-in';
import Button from './components/buttons/Button';

type ErrorPageProps = {
  error: Error;
  reset?: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const handleReset = () => {
    reset ? reset() : window.location.reload();
  };

  useEffect(() => {
    // TODO: Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Container className="mt-18">
        <FadeIn className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 font-inter text-fs-xl tracking-tight text-shark sm:text-5xl">
              Error
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Something went wrong...
            </p>
            <div className="mt-10 flex w-full items-center justify-center ">
              <div className="w-3/4">
                <Button
                  variant="solid"
                  size="thin"
                  className={''}
                  href=""
                  aTag={false}
                  target={''}
                  onClick={handleReset}
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
