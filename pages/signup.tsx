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

const imageStyles = css`
  align-self: center;
`;

export default function SignUp() {
  return (
    <div>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Sign up page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div css={mainLayout}>
          <div css={imageStyles}>
            <Image
              src="/images/signup.png"
              alt="Illustration of a woman opening a huge book"
              width="381.6"
              height="246"
            />
          </div>
          <div css={inputSectionStyles}>
            <h1>Create account</h1>
            <form>
              <div css={inputFieldLarge}>
                <label htmlFor="first-name">First name</label>
                <input id="first-name" />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="last-name">Last name</label>
                <input id="last-name" />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="e-mail">E-mail</label>
                <input id="e-mail" />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="password">Password</label>
                <input id="password" />
              </div>
              <Link href="/schools/search">
                <button css={formButton}>Sign up</button>
              </Link>
              <div css={textBelowButtonStyles}>
                <div>Already registered?</div>
                <Link href="/login">
                  <a>Sign in here</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
