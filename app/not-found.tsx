import 'server-only';
import Container from './components/container';
import ButtonPrimaryCopy from './components/buttons/button-primary-copy';
import { FadeIn } from './components/fade-in';

export default function NotFoundPage() {
  return (
    <>
      <Container className=" mt-18">
        <FadeIn className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-primary1">404</p>
            <h1 className="mt-4 font-inter text-fs-xl tracking-tight text-dark1 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex w-full items-center justify-center ">
              <div className="w-1/2">
                <ButtonPrimaryCopy
                  variant={'simple'}
                  className={''}
                  href="/"
                  aTag={false}
                  target={''}
                >
                  Go back home
                </ButtonPrimaryCopy>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
