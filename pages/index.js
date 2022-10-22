import { css } from '@emotion/react';
import Head from 'next/head';

const style = css`
  color: black;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Schoolfinder</title>
        <meta name="description" content="Welcome to schoolfinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div css={style}>Hello</div>
    </div>
  );
}
