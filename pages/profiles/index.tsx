import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  addSchoolButtonSmall,
  beige,
  deleteAccountButton,
  grey,
  h1Styles,
  lightText,
  mainLayout,
} from '../../utils/sharedStyles';

const profileInformationBox = css`
  display: flex;
  flex-direction: column;
  background-color: ${beige};
  width: 500px;
  height: 300px;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 30px 30px;
  align-items: left;
  gap: 15px;
`;

const imageStyles = css`
  display: flex;
  align-items: end;
`;

const labelStyles = css`
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const dataStyles = css`
  color: ${lightText};
`;

const buttonSectionStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export default function Profile() {
  return (
    <div>
      <Head>
        <title>Your Account</title>
        <meta name="description" content="Your Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div css={mainLayout}>
        <div>
          <h1 css={h1Styles}>Welcome, Lisa!</h1>
          <div css={profileInformationBox}>
            <div>
              <div css={labelStyles}>First name</div>
              <div css={dataStyles}>Lisa</div>
            </div>
            <div>
              <div css={labelStyles}>Last name</div>
              <div css={dataStyles}>Weilguni</div>
            </div>
            <div>
              <div css={labelStyles}>E-Mail</div>
              <div css={dataStyles}>lisaweilguni@gmx.at</div>
            </div>
            <div css={buttonSectionStyles}>
              <div>
                <button css={deleteAccountButton}>Delete account</button>
              </div>
              <div>
                <Link href="/schools/addschool">
                  <a css={addSchoolButtonSmall}>Add school</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div css={imageStyles}>
          <Image
            src="/images/profile.png"
            alt="Illustration of a teacher and two students in a classroom"
            width="436.4"
            height="286.8"
          />
        </div>
      </div>
    </div>
  );
}
