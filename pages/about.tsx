import { css } from '@emotion/react';
import Head from 'next/head';
import { h1Styles } from '../utils/sharedStyles';

export default function About() {
  return (
    <div>
      <Head>
        <title>About | Schoolfinder</title>
        <meta name="description" content="Information about schoolfinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 css={h1Styles}>About</h1>
    </div>
  );
}
