import styled from '@mui/system/styled';
import Link from 'next/link';

const Container = styled('div')({
  display: 'grid',
  placeContent: 'flex-start',
  padding: '1rem',
  gap: '.5rem',
});

export default function TestHome(): JSX.Element {
  return (
    <>
      <Container>
        <h2>Sandbox</h2>
        <Link href="/test/cards">Cards</Link>
        <Link href="/test/counters">Counters</Link>
      </Container>
      <Container>
        <h2>Protected Routes</h2>
        <Link href="/test/protected">Client Rendered</Link>
      </Container>
      <Container>
        <h2>Testing</h2>
        <Link href="/test/notes">Markdown notes</Link>
      </Container>
    </>
  );
}
