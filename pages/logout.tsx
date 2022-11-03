import { css } from '@emotion/react';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { deleteSessionByToken } from '../database/sessions';
import { h1Styles } from '../utils/sharedStyles';

const titleSectionStyles = css`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > h1 {
    margin-bottom: 20px;
  }
`;

export default function Logout() {
  return (
    <div>
      <Head>
        <title>Logout</title>
        <meta name="description" content="You've logged out" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div css={titleSectionStyles}>
          <h1 css={h1Styles}>You've successfully logged out.</h1>
        </div>
        <div>
          <Image
            src="/images/logout.png"
            alt="Illustration of a woman sitting by window with coffee and a laptop"
            width="348.48"
            height="320.64"
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token) {
    await deleteSessionByToken(token);

    context.res.setHeader(
      'Set-Cookie',
      cookie.serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }

  return {
    props: {},
  };
}
