import { css, Global } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { darkText } from '../utils/sharedStyles';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-apple-touch.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', sans-serif;
            background-color: #ffffff;
            color: ${darkText};
            margin: 0;
            font-size: 16px;
            min-height: 100vh;
          }
        `}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
