import Head from 'next/head';
import Clothing from '../lib/components/colors/Clothing';

export default function ColorsPage() {
  return (
    <div>
      <Head>
        <title>Cards | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Clothing />
      </main>
    </div>
  );
}
