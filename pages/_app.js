import { css, Global } from '@emotion/react';
import Head from 'next/head';

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
            /* font-family: 'Khula', sans-serif; */
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            background-color: white;
            color: #333333;
            margin: 0;
            line-height: 20px;
            font-size: 16px;
            min-height: 100vh;
          }
        `}
      />
      {/* <CookieBanner /> */}
      {/* <Layout>
        {/*
          The "Component" component refers to
          the current page that is being rendered
        */}
      {/* <Component {...pageProps} /> */}
      {/* </Layout> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
