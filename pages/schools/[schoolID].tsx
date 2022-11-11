import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getSchoolWithSpecializationsById } from '../../database/schools';
import { parseIntFromContextQuery } from '../../utils/contextQuery';
import { getSchoolWithAreaNameAndSpecializations } from '../../utils/dataStructure';
import {
  beige,
  categoryBox,
  grey,
  h1Styles,
  mainLayout,
} from '../../utils/sharedStyles';
import { SchoolWithAreaNameAndSpecializationsTransformed } from './';

const backButtonSectionStyles = css`
  @media (max-width: 600px) {
    margin-top: 40px;
    margin-left: 20px;
  }
`;

const contentLayout = css`
  margin-top: 3rem;
`;

const schoolInfoSectionStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const categoryStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  @media (max-width: 600px) {
    flex-direction: row wrap;
  }
`;

const schoolInfoBoxStyles = css`
  display: flex;
  flex-direction: column;
  background-color: ${beige};
  width: 410px;
  height: 150px;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 40px 30px;
  align-items: left;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const iconLineStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  object-fit: contain;
  aspect-ratio: 1 / 1;

  @media (max-width: 600px) {
    flex-direction: row wrap;
    text-align: left;
  }
`;

const iconStyles = css`
  object-fit: contain;
  aspect-ratio: 1 / 1;
`;

type Props =
  | {
      school: SchoolWithAreaNameAndSpecializationsTransformed;
    }
  | {
      error: string;
    };

export default function SingleSchool(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>School not found</title>
          <meta name="description" content="School not found" />
        </Head>
        <h1 css={h1Styles}>{props.error}</h1>
        Sorry, try the <Link href="/schools">search page</Link> instead.
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>School Details | Schoolfinder</title>
        <meta name="description" content="More information about the school" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={backButtonSectionStyles}>
        <Link href="/schools/">
          <a>
            <Image
              src="/images/previous.png"
              alt="Back arrow"
              width="20"
              height="20"
            />{' '}
          </a>
        </Link>
      </div>
      <div css={contentLayout}>
        <div css={mainLayout}>
          <div>
            <div>
              <Image
                src="/images/profile.png"
                alt="Illustration of a teacher and two students in a classroom"
                width="436.4"
                height="286.8"
              />
            </div>
          </div>
          <div>
            <div css={schoolInfoSectionStyles}>
              <h1 css={h1Styles}>{props.school.schoolName}</h1>
              <div css={categoryStyles}>
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

              <div css={schoolInfoBoxStyles}>
                <div css={iconLineStyles}>
                  <Image
                    src="/images/pin.png"
                    alt="Location icon"
                    width="20"
                    height="20"
                    css={iconStyles}
                  />
                  {props.school.street}, {props.school.postalCode}{' '}
                  {props.school.areaName}
                </div>
                <div css={iconLineStyles}>
                  <Image
                    src="/images/open.png"
                    alt="Website icon"
                    width="20"
                    height="20"
                  />
                  {props.school.website}
                </div>
                <div css={iconLineStyles}>
                  <Image
                    src="/images/money.png"
                    alt="Money icon"
                    width="20"
                    height="20"
                  />
                  {props.school.isPublic ? 'public' : 'private'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  // Retrieve the school ID from the URL
  const schoolId = parseIntFromContextQuery(context.query.schoolId);

  if (typeof schoolId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'School not found',
      },
    };
  }

  const foundSchool = await getSchoolWithSpecializationsById(schoolId);

  if (foundSchool.length === 0) {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'School not found',
      },
    };
  }

  return {
    props: {
      school: getSchoolWithAreaNameAndSpecializations(foundSchool),
    },
  };
}
