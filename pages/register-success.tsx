import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken, User } from '../database/users';
import {
  addSchoolButtonSmall,
  capitalizeText,
  deleteAccountButton,
  h1Styles,
  higherMarginTopLayout,
  lightText,
  mainLayout,
} from '../utils/sharedStyles';

const titleSectionStyles = css`
  max-width: 45%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const subTitleStyles = css`
  color: ${lightText};
  max-width: 80%;
  line-height: 35px;
  margin-bottom: 20px;
`;

const buttonSectionStyles = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

type Props = {
  user?: User;
};

export default function RegistrationSuccess(props: Props) {
  return (
    <div>
      <Head>
        <title>Registration successful</title>
        <meta name="description" content="Registration successful" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={higherMarginTopLayout}>
        <div css={mainLayout}>
          <div css={titleSectionStyles}>
            <h1 css={h1Styles}>
              Welcome, <span css={capitalizeText}>{props.user?.firstName}</span>
              !
            </h1>
            <div css={subTitleStyles}>
              You've successfully created your account and everything's set up
              to add your school.
            </div>
            <div css={buttonSectionStyles}>
              <Link href="/addschool">
                <a css={addSchoolButtonSmall}>Add your school</a>
              </Link>
              <Link href="/schools/">
                <a css={deleteAccountButton}>View all schools</a>
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/images/success.png"
              alt="Illustration of a city with location icon in the middle"
              width="535.8"
              height="327.6"
            />
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
        destination: '/login?returnTo=/private-profile',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}
