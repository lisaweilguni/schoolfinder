import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  FullSchool,
  getSchoolBasicById,
  getSchoolById,
  getSchoolWithSpecializationsById,
  SchoolWithSpecializations,
} from '../../database/schools';
import { parseIntFromContextQuery } from '../../utils/contextQuery';
import {
  beige,
  categoryBox,
  grey,
  h1Styles,
  loginButton,
  mainLayout,
} from '../../utils/sharedStyles';

const contentLayout = css`
  margin-top: 3rem;
`;

const schoolInfoSectionStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const categoryStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
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
`;

const iconLineStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

type Props =
  | {
      school: SchoolWithSpecializations;
    }
  | {
      error: string;
    };

export default function SingleSchool(props: Props) {
  return (
    <div>
      <Head>
        <title>School Details</title>
        <meta name="description" content="More information about the school" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Link href="/schools/">
          <a css={loginButton}>
            {' '}
            <Image
              src="/images/back.png"
              alt="Illustration of a teacher and two students in a classroom"
              width="10"
              height="10"
            />{' '}
            <span>Back to all</span>
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
              <h1 css={h1Styles}>HTL Spengergasse</h1>
              <div css={categoryStyles}>
                <div css={categoryBox}>Design</div>
                <div css={categoryBox}>Tech</div>
                <div css={categoryBox}>Media</div>
              </div>
              <div css={schoolInfoBoxStyles}>
                <div css={iconLineStyles}>
                  <Image
                    src="/images/pin.png"
                    alt="Location icon"
                    width="20"
                    height="20"
                  />
                  Spengergasse 20, 1050 Wien
                </div>
                <div css={iconLineStyles}>
                  <Image
                    src="/images/open.png"
                    alt="Website icon"
                    width="20"
                    height="20"
                  />
                  www.spengergasse.at
                </div>
                <div css={iconLineStyles}>
                  <Image
                    src="/images/money.png"
                    alt="Money icon"
                    width="20"
                    height="20"
                  />
                  public
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
  console.log('foundSchool', foundSchool);

  if (typeof foundSchool === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'School not found',
      },
    };
  }

  return {
    props: {
      school: foundSchool,
    },
  };
}
