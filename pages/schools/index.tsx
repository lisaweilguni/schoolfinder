import { css } from '@emotion/react';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search for schools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>Search</div>
    </div>
  );
}
