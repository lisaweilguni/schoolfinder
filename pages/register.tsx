import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import {
  errorMessageStyles,
  formButton,
  h1Styles,
  inputFieldLarge,
  inputFieldName,
  inputNameWrapper,
  mainLayout,
  textBelowButtonStyles,
} from '../utils/styles';
import { RegisterResponseBody } from './api/register';

const inputSectionStyles = css`
  max-width: 45%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  h1 {
    margin-bottom: 10px;
  }

  @media (max-width: 800px) {
    align-items: center;
    justify-content: center;
  }
`;

const imageStyles = css`
  align-self: center;

  @media (max-width: 600px) {
    width: 50vw;
    margin-top: 60px;
  }
`;

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Register(props: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        password: password,
      }),
    });

    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;

    // Handle errors
    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return console.log(registerResponseBody.errors);
    }

    // Return user to the page & prevent untrusted user input
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

    // Redirect user to registration successful page
    await router.push(`/register-success`);
  }

  return (
    <div>
      <Head>
        <title>Sign up | Schoolfinder</title>
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
            <h1 css={h1Styles}>Sign your school up</h1>
            {errors.map((error) => {
              return (
                <p css={errorMessageStyles} key={error.message}>
                  {error.message}
                </p>
              );
            })}
            <div css={inputFieldLarge}>
              <label htmlFor="registration-code">Registration code</label>
              <input id="registration-code" />
            </div>
            <div css={inputNameWrapper}>
              <div css={inputFieldName}>
                <label htmlFor="first-name">First name</label>
                <input
                  id="first-name"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.currentTarget.value);
                  }}
                />
              </div>
              <div css={inputFieldName}>
                <label htmlFor="last-name">Last name</label>
                <input
                  id="last-name"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.currentTarget.value);
                  }}
                />
              </div>
            </div>
            <div css={inputFieldLarge}>
              <label htmlFor="e-mail">E-mail</label>
              <input
                id="e-mail"
                type="email"
                maxLength={50}
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
                maxLength={50}
                value={password}
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
              />
            </div>
            <button
              css={formButton}
              onClick={async () => {
                await registerHandler();
              }}
            >
              Sign up
            </button>
            <div css={textBelowButtonStyles}>
              <div>Already registered?</div>
              <Link href="/login">
                <a>Sign in here</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
