import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getSchoolWithSpecializationsById } from '../database/schools';
import { getUserBySessionToken, User } from '../database/users';
import { getSchoolWithAreaNameAndSpecializations } from '../utils/dataStructure';
import {
  addSchoolButtonSmall,
  beige,
  capitalizeText,
  categoryBox,
  deleteAccountButton,
  grey,
  h1Styles,
  h2Styles,
  lightText,
  mainLayout,
  small,
  white,
} from '../utils/sharedStyles';
import { SchoolWithAreaNameAndSpecializationsTransformed } from './schools';

const profileInformationBox = css`
  display: flex;
  flex-direction: column;
  background-color: ${beige};
  width: 300px;
  height: 340px;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 30px 30px;
  align-items: left;
  gap: 15px;
`;

const labelStyles = css`
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const dataStyles = css`
  color: ${lightText};
  text-transform: capitalize;
`;

const emailStyles = css`
  color: ${lightText};
`;

const buttonSectionStyles = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
`;

const schoolPreviewBoxStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${white};
  width: 45vw;
  height: 30vh;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 20px 30px;
  font-size: ${small};
  margin-top: 60px;
  position: relative;
`;

const schoolPreviewLeftStyles = css`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
`;

const schoolInfoStyles = css`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 15px;
`;

const categorySectionStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const editStyles = css`
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  right: 20px;
`;

const deleteStyles = css`
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 60px;
`;

type Props = {
  school: SchoolWithAreaNameAndSpecializationsTransformed;
  user?: User;
};

export default function Profile(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1 css={h1Styles}>404 - User not found</h1>
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>My Account</title>
        <meta name="description" content="My Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div css={mainLayout}>
        <div>
          <h1 css={h1Styles}>
            Welcome, <span css={capitalizeText}>{props.user.firstName}!</span>
          </h1>
          <div css={profileInformationBox}>
            <div>
              <div css={labelStyles}>First name</div>
              <div css={dataStyles}>{props.user.firstName}</div>
            </div>
            <div>
              <div css={labelStyles}>Last name</div>
              <div css={dataStyles}>{props.user.lastName}</div>
            </div>
            <div>
              <div css={labelStyles}>E-Mail</div>
              <div css={emailStyles}>{props.user.email}</div>
            </div>
            <div css={buttonSectionStyles}>
              <div>
                <Link href="/addschool">
                  <a css={addSchoolButtonSmall}>Add school</a>
                </Link>
              </div>
              <div>
                <button css={deleteAccountButton}>Delete account</button>
              </div>
            </div>
          </div>
        </div>
        <div css={schoolPreviewBoxStyles}>
          <button css={editStyles}>
            <div>
              <Image
                src="/images/edit.png"
                alt="Edit icon"
                width="20"
                height="20"
              />
            </div>
          </button>
          <button css={deleteStyles}>
            <div>
              <Image
                src="/images/delete.png"
                alt="Delete icon"
                width="20"
                height="20"
              />
            </div>
          </button>
          <div css={schoolPreviewLeftStyles}>
            <div>
              <Image
                src="/images/search.png"
                alt="Illustration of a girl standing on a gigantic book with a graduation hat"
                width="147.6"
                height="104.85"
              />
            </div>
            <div css={schoolInfoStyles}>
              <h3 css={h2Styles}>{props.school.schoolName}</h3>
              <div>
                {props.school.street}, {props.school.postalCode}{' '}
                {props.school.areaName}
              </div>
              <div>{props.school.website}</div>
              <div css={categorySectionStyles}>
                {props.school.specializations.map((specialization) => {
                  return (
                    <div
                      key={specialization.specializationId}
                      css={categoryBox}
                    >
                      {specialization.specializationName}
                    </div>
                  );
                })}
              </div>
            </div>
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

  const foundSchool = await getSchoolWithSpecializationsById(1);

  return {
    props: {
      user: user,
      school: getSchoolWithAreaNameAndSpecializations(foundSchool),
    },
  };
}
