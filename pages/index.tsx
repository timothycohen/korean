import Head from 'next/head';
import Link from 'next/link';
import styled from '@mui/system/styled';
import Image from 'next/image';

const Page = styled('div')(({ theme }) => ({}));

const Container = styled('div')({
  display: 'grid',
  placeContent: 'flex-start',
  padding: '1rem',
  gap: '.5rem',
});

const FinishedContainer = styled(Container)(({ theme }) => ({
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(3, auto)',
  },
}));

// image screenshot: Chrome dev tools --> ⌘ ⇧ P --> Capture screenshot
const LinkPreview = styled('a')(({ theme }) => ({
  backgroundColor: theme.palette.gray['5'],
  color: theme.palette.primary.main,
  borderRadius: '.3rem',
  display: 'grid',
  padding: '0 .5rem .5rem .5rem',
  textDecoration: 'none',
  fontSize: '2.5rem',
  textAlign: 'center',
  '&:hover': {
    opacity: '.75',
    '& *': {
      transform: 'scale(1)',
    },
  },
  '& *': {
    transition: 'transform 300ms ease-in-out',
    transform: 'scale(.98)',
    borderRadius: '.3rem',
  },
}));

export default function Home(): JSX.Element {
  return (
    <Page>
      <Head>
        <title>Korean Apps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>TCo&apos;s Korean Apps</h1>
        <FinishedContainer>
          <Link href="/colors" passHref>
            <LinkPreview>
              <span>Colors</span>
              <Image src="/images/colors.png" width={500} height={379} alt="" />
            </LinkPreview>
          </Link>
          <Link href="/numbers" passHref>
            <LinkPreview>
              <span>Numbers</span>
              <Image src="/images/numbers.png" width={500} height={379} alt="" />
            </LinkPreview>
          </Link>
          <Link href="/time" passHref>
            <LinkPreview>
              <span>Time</span>
              <Image src="/images/time.png" width={500} height={379} alt="" />
            </LinkPreview>
          </Link>
        </FinishedContainer>
        <Container>
          <h2>Sandbox</h2>
          <Link href="/cards">Cards</Link>
          <Link href="/counters">Counters</Link>
        </Container>
        <Container>
          <h2>Protected Routes</h2>
          <Link href="/test/protected">Client Rendered</Link>
        </Container>
        <Container>
          <h2>Testing</h2>
          <Link href="/test/notes">Markdown notes</Link>
        </Container>
      </main>
    </Page>
  );
}
