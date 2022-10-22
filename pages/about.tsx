import { css } from '@emotion/react';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="Information about schoolfinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>About</div>
    </div>
  );
}
