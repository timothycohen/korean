import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
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
      </main>
    </div>
  );
}
