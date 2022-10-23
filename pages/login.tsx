import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  formButton,
  inputFieldLarge,
  mainLayout,
  textBelowButtonStyles,
} from '../utils/sharedStyles';

const inputSectionStyles = css`
  max-width: 45%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  h1 {
    margin-bottom: 10px;
  }
`;

export default function Login() {
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div css={mainLayout}>
          <div>
            <Image
              src="/images/login.png"
              alt="Illustration of a person with a huge book"
              width="399.96"
              height="295.68"
            />
          </div>
          <div css={inputSectionStyles}>
            <h1>Sign in</h1>
            <form>
              <div css={inputFieldLarge}>
                <label htmlFor="e-mail">E-mail</label>
                <input id="e-mail" />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="password">Password</label>
                <input id="password" />
              </div>
              <Link href="/schools/search">
                <button css={formButton}>Sign in</button>
              </Link>
              <div css={textBelowButtonStyles}>
                <div>Your school is not signed up yet?</div>
                <Link href="/signup">
                  <a>Sign up here</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
