import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import {
  formButton,
  h1Styles,
  inputFieldLarge,
  mainLayout,
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

export default function AddSchool() {
  return (
    <div>
      <Head>
        <title>Add your school</title>
        <meta name="description" content="Add your school" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div css={mainLayout}>
          <div css={imageStyles}>
            <Image
              src="/images/addschool.png"
              alt="Illustration of a woman next to a bookshelf"
              width="391.2"
              height="301.6"
            />
          </div>
          <div css={inputSectionStyles}>
            <h1 css={h1Styles}>Add your school</h1>
            <form>
              <div css={inputFieldLarge}>
                <label htmlFor="school-name">Name</label>
                <input id="school-name" />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="area">Area</label>
                <input id="area" />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="postal-code">Postal code</label>
                <input id="postal-code" />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="street">Street</label>
                <input id="street" />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="public-private">Public / private</label>
                <input id="public-private" />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="focus">Choose up to 3 categories</label>
                <input id="focus" />
              </div>
              <Link href="/schools/search">
                <button css={formButton}>Add school</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
