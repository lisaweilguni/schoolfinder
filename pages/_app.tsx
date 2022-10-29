import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { User } from '../database/users';
import { darkText } from '../utils/sharedStyles';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/users');
    const profileResponseBody = await profileResponse.json();

    if ('errors' in profileResponseBody) {
      setUser(undefined);
    } else {
      setUser(profileResponseBody.user);
    }
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);

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
            font-weight: 300;
          }
        `}
      />
      <Layout user={user}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}

export default MyApp;
