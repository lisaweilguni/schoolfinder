import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  defaultButton,
  higherMarginTopLayout,
  lightText,
  mainLayout,
  titleStyles,
} from '../utils/sharedStyles';

const titleSectionStyles = css`
  max-width: 45%;
  display: flex;
  flex-direction: column;
`;

const subTitleStyles = css`
  color: ${lightText};
  max-width: 70%;
  line-height: 35px;
  margin-bottom: 20px;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home | Schoolfinder</title>
        <meta name="description" content="Welcome to schoolfinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={higherMarginTopLayout}>
        <div css={mainLayout}>
          <div css={titleSectionStyles}>
            <h1 css={titleStyles}>Supercharge your high school search.</h1>
            <div css={subTitleStyles}>
              Find your path in the jungle of high schools. Major life decisions
              made easier.
            </div>
            <Link href="/schools/">
              <a css={defaultButton}>Search</a>
            </Link>
          </div>
          <div>
            <Image
              src="/images/home.png"
              alt="Illustration of a city with location icon in the middle"
              width="813"
              height="433"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
