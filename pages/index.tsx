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
        <Link href="https://timothycohen.github.io/korean-colors/">Colors</Link>
      </main>
    </div>
  );
}
