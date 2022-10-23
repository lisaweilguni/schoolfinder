import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  addSchoolButtonSmall,
  defaultButton,
  deleteAccountButton,
  lightText,
  mainLayout,
  middle,
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

export default function RegistrationSuccess() {
  return (
    <div>
      <Head>
        <title>Registration successful</title>
        <meta name="description" content="Registration successful" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={mainLayout}>
        <div css={titleSectionStyles}>
          <h1>Welcome, Lisa!</h1>
          <div css={subTitleStyles}>
            You've successfully created your account and everthing's set up to
            add your school.
          </div>
          <div css={buttonSectionStyles}>
            <Link href="/schools/addschool">
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
  );
}
