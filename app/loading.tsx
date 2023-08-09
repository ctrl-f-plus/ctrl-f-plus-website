import Container from './components/Container';

function Loading() {
  return (
    <Container className="flex h-full w-full items-center justify-center ">
      <div
        className="flex h-full w-full items-center justify-center"
        aria-live="polite"
      >
        <div className="relative h-24 w-24 animate-spin rounded-full bg-gradient-to-r from-gradient-cyan via-highlight-focus-1 to-gradient-lavender">
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-gray-200"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </Container>
  );
}

export default Loading;
