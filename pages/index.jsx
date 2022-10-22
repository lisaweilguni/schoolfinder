import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import {
  categoryBox,
  defaultButton,
  formButton,
  inputFieldLarge,
  inputFieldSmall,
  loginButton,
  secondaryButton,
} from '../utils/sharedStyles';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Schoolfinder</title>
        <meta name="description" content="Welcome to schoolfinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello</h1>
      <Link href="/search">
        <a css={defaultButton}>Search</a>
      </Link>
      <br />
      <br />
      <Link href="/search">
        <a css={secondaryButton}>Learn more</a>
      </Link>
      <br />
      <br />
      <Link href="/search">
        <a css={loginButton}>Login</a>
      </Link>
      <br />
      <br />
      <Link href="/search">
        <a css={formButton}>Sign up</a>
      </Link>
      <br />
      <br />
      <div css={categoryBox}>Design</div>
      <br />
      <br />
      <div css={inputFieldLarge}>
        <label htmlFor="first-name">First name</label>
        <input id="first-name" />
      </div>
      <div css={inputFieldSmall}>
        <label htmlFor="first-name">Your location</label>
        <input id="first-name" />
      </div>
    </div>
  );
}
