import { css } from '@emotion/react';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>School Details</title>
        <meta name="description" content="More information about the school" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>School Details</div>
    </div>
  );
}
