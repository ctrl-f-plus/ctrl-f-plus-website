'use client';

import { useEffect } from 'react';
import Container from './components/ui/container';
import { FadeIn, FadeInStagger } from './components/fade-in';
import Button from './components/ui/Button';

type ErrorPageProps = {
  error: Error;
  reset?: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const handleReset = () => {
    reset ? reset() : window.location.reload();
  };

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <FadeInStagger>
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
                  intent="solid"
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
    </FadeInStagger>
  );
}
