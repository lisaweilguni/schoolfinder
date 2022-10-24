import { css, Global } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import {
  big,
  darkText,
  lightText,
  middle,
} from '../utils/sharedStyles';

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

          h1 {
            font-family: 'Khula', sans-serif;
            font-size: ${big};
            color: ${darkText};
            margin: 0;
          }

          h2 {
            font-family: 'Inter', sans-serif;
            font-size: ${middle};
            color: ${lightText};
          }

          h3 {
            font-family: 'Inter', sans-serif;
            font-size: '1.125rem';
            color: ${darkText};
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
