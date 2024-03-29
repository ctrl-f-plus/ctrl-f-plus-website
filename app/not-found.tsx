import 'server-only';
import Container from './components/ui/container';

import { FadeIn, FadeInStagger } from './components/fade-in';
import Button from './components/ui/Button';

export default function NotFoundPage() {
  return (
    <FadeInStagger>
      <Container className=" mt-18">
        <FadeIn className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-highlighter-900">404</p>
            <h1 className="mt-4 font-inter text-fs-xl tracking-tight text-shark sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            <div className="mt-10 flex w-full items-center justify-center ">
              <div className="w-1/2">
                <Button
                  intent="solid"
                  size="thin"
                  className={''}
                  href="/"
                  aTag={false}
                  target={''}
                >
                  Go back home
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </FadeInStagger>
  );
}
