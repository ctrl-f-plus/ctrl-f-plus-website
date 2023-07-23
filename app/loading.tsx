import Container from './components/Container';

function Loading() {
  return (
    <Container className="flex h-auto w-full items-center justify-center">
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

{
  /* <div>
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-primary1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="sr-only">Loading...</span>
      </div> */
}
