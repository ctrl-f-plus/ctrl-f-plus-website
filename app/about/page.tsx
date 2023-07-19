// app/about/page.tsx

import Container from '../components/layout/Container';

export default function About() {
  return (
    <div>
      <Container>
        <div className="item-center mt-4 flex h-auto w-full justify-center tablet:mt-10 ">
          <h1>About</h1>
        </div>
      </Container>
    </div>
  );
}
