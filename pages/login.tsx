import { css } from '@emotion/react';
// import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
// import { getValidSessionByToken } from '../database/sessions';
import {
  errorMessageStyles,
  formButton,
  h1Styles,
  higherMarginTopLayout,
  inputFieldLarge,
  mainLayout,
  textBelowButtonStyles,
} from '../utils/sharedStyles';
import { LoginResponseBody } from './api/login';

const inputSectionStyles = css`
  max-width: 45%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  h1 {
    margin-bottom: 10px;
  }
`;

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Login(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function loginHandler() {
    const loginResponse = await fetch('/api/login', {
      method: 'POST', // POST because we are creating a new session
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password: password,
      }),
    });

    const loginResponseBody = (await loginResponse.json()) as LoginResponseBody;

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return;
    }

    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      // refresh the user on state
      await props.refreshUserProfile();
      return await router.push(returnTo);
    }
    // refresh the user on state
    await props.refreshUserProfile();

    await router.push(`/private-profile`);
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div css={higherMarginTopLayout}>
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
              <h1 css={h1Styles}>Sign in</h1>
              {errors.map((error) => {
                return (
                  <p css={errorMessageStyles} key={error.message}>
                    {error.message}
                  </p>
                );
              })}
              <div css={inputFieldLarge}>
                <label htmlFor="e-mail">E-mail</label>
                <input
                  id="e-mail"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                  }}
                />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </div>
              <button
                css={formButton}
                onClick={async () => {
                  await loginHandler();
                }}
              >
                Sign in
              </button>
              <div css={textBelowButtonStyles}>
                <div>Your school is not signed up yet?</div>
                <Link href="/register">
                  <a>Sign up here</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const token = context.req.cookies.sessionToken;

//   if (token && (await getValidSessionByToken(token))) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: true,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
