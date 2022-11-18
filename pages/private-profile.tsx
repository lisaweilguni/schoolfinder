import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSchoolByUserId } from '../database/schools';
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
} from '../utils/styles';
import { SchoolWithAreaNameAndSpecializationsTransformed } from './schools';

const profileInformationSectionStyles = css`
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

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

  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
  }
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

  @media (max-width: 1023px) {
    margin-left: 20px;
    padding: 20px 40px;
  }

  @media (max-width: 600px) {
    padding: 20px 20px;
    flex-direction: column;
    width: 300px;
    justify-content: center;
    margin-top: 10px;
    margin-left: 0;
  }
`;

const addSchoolStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${white};
  width: 45vw;
  height: 340px;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 20px 30px;
  font-size: ${small};
  margin-top: 60px;
  position: relative;
  gap: 20px;
  cursor: pointer;

  @media (max-width: 1023px) {
    height: 340px;
    margin-left: 20px;
    padding: 20px 40px;
  }

  @media (max-width: 600px) {
    padding: 20px 20px;
    flex-direction: column;
    width: 300px;
    height: 200px;
    justify-content: center;
    margin-top: 10px;
    margin-left: 0;
  }
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

  @media (max-width: 600px) {
    flex-direction: row wrap;
    width: 260px;
  }
`;

const editStyles = css`
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  right: 20px;

  @media (max-width: 600px) {
    right: 10px;
    top: 10px;
  }
`;

const viewStyles = css`
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 55px;

  @media (max-width: 600px) {
    right: 10px;
    top: 50px;
  }
`;

const deleteStyles = css`
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 90px;

  @media (max-width: 600px) {
    right: 10px;
    top: 90px;
  }
`;

const imageStyles = css`
  @media (max-width: 1023px) {
    display: none;
  }
`;

type Props = {
  school?: SchoolWithAreaNameAndSpecializationsTransformed;
  user: User;
  refreshUserProfile: () => Promise<void>;
};

export default function Profile(props: Props) {
  const [school, setSchool] = useState<
    SchoolWithAreaNameAndSpecializationsTransformed | ''
  >();
  const router = useRouter();

  // Load schools on first render and every time props.schools changes
  useEffect(() => {
    setSchool(props.school);
  }, [props.school]);

  // Delete school handler
  async function deleteSchool(userId: number) {
    if (!window.confirm(`Do you really want to delete this school?`)) {
      return;
    }

    await fetch(`/api/users/schools`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    setSchool('');
  }

  // Delete account handler
  async function deleteAccount(userId: number) {
    if (!window.confirm(`Do you really want to delete your account?`)) {
      return;
    }

    await fetch(`/api/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    // refresh the user on state
    await props.refreshUserProfile();

    // Redirect user to private page
    await router.push(`/`);
  }

  return (
    <div>
      <Head>
        <title>My Account | Schoolfinder</title>
        <meta name="description" content="My Account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div css={mainLayout}>
        <div css={profileInformationSectionStyles}>
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
              {school ? (
                ''
              ) : (
                <div>
                  <Link href="/addschool">
                    <a css={addSchoolButtonSmall}>Add school</a>
                  </Link>
                </div>
              )}
              <div>
                <button
                  css={deleteAccountButton}
                  onClick={async () => {
                    await deleteAccount(props.user.id);
                  }}
                >
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
        {school ? (
          <div css={schoolPreviewBoxStyles}>
            <button css={editStyles}>
              <Link href="/editschool">
                <div>
                  <Image
                    src="/images/edit.png"
                    alt="Edit icon"
                    width="20"
                    height="20"
                  />
                </div>
              </Link>
            </button>
            <button css={viewStyles}>
              <Link href={`/schools/${props.school?.schoolId}`}>
                <div>
                  <Image
                    src="/images/open_dark.png"
                    alt="Edit icon"
                    width="20"
                    height="20"
                  />
                </div>
              </Link>
            </button>
            <button
              css={deleteStyles}
              onClick={async () => {
                await deleteSchool(props.user.id);
              }}
            >
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
              <div css={imageStyles}>
                <Image
                  src="/images/search.png"
                  alt="Illustration of a girl standing on a gigantic book with a graduation hat"
                  width="147.6"
                  height="104.85"
                />
              </div>
              <div css={schoolInfoStyles}>
                <h3 css={h2Styles}>{school.schoolName}</h3>
                <div>
                  {school.street}, {school.postalCode} {school.areaName}
                </div>
                <div>{school.website}</div>
                <div css={categorySectionStyles}>
                  {school.specializations.map((specialization) => {
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
        ) : (
          <Link href="/addschool">
            <div css={addSchoolStyles}>
              <div>Add your school</div>
              <div>
                <Image
                  src="/images/addschoolicon.png"
                  alt="Edit icon"
                  width="60"
                  height="60"
                />
              </div>
            </div>
          </Link>
        )}
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

  const foundSchool = await getSchoolByUserId(user.id, token);
  if (!foundSchool?.length) {
    return {
      props: {
        user: user,
      },
    };
  }

  return {
    props: {
      user: user,
      school: getSchoolWithAreaNameAndSpecializations(foundSchool),
    },
  };
}
