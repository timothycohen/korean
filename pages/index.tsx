import Head from 'next/head';
import Link from 'next/link';
import SignInOutBtn from 'lib/components/auth/SignInOutBtn';

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Cards | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>TCo&apos;s Korean</h1>
        <Link href="/numbers">Numbers</Link>
        <Link href="/colors">Colors</Link>
        <Link href="/time">Time</Link>
        <div>
          <Link href="/test/protected">Protected</Link>
          <Link href="/test/serverProtected">ServerProtected</Link>
          <Link href="/api/test/protected">protectedAPI</Link>
          <SignInOutBtn />
        </div>
      </main>
    </div>
  );
}
