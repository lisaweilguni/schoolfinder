import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { h1Styles } from '../utils/sharedStyles';

const titleSectionStyles = css`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > h1 {
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    margin-top: 50px;
  }
`;

export default function Error() {
  return (
    <div>
      <Head>
        <title>404 Error</title>
        <meta name="description" content="You've logged out" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div css={titleSectionStyles}>
          <h1 css={h1Styles}>Ooops, this page does not exist</h1>
          <div>
            <Image
              src="/images/404.png"
              alt="Illustration of a person next to a huge exclamation mark"
              width="412"
              height="268.8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
