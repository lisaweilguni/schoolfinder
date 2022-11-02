import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  getAllSchools,
  SchoolWithAreaNameAndSpecializations,
} from '../../database/schools';
import {
  beige,
  categoryBox,
  defaultButton,
  grey,
  h1Styles,
  h2Styles,
  inputFieldSmall,
  secondaryButton,
  small,
  white,
} from '../../utils/sharedStyles';

const searchPageLayoutStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 30px;
`;

const filterBoxStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${beige};
  width: 55vw;
  height: 18vh;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 15px 50px;
  align-items: center;
`;

const schoolPreviewBoxStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${white};
  width: 70vw;
  height: 22vh;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 20px 50px;
  font-size: ${small};
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
  gap: 12px;
`;

const categorySectionStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const buttonSectionStyles = css`
  display: flex;
  align-items: end;
`;

type Props = {
  schools: SchoolWithAreaNameAndSpecializations[];
};

export default function Search(props: Props) {
  return (
    <div>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search for schools here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={searchPageLayoutStyles}>
        <h1 css={h1Styles}>Find the right school for you.</h1>
        <div css={filterBoxStyles}>
          <div css={inputFieldSmall}>
            <label htmlFor="location">Your location</label>
            <input id="location" />
          </div>
          <div css={inputFieldSmall}>
            <label htmlFor="interests">Your interests</label>
            <input id="interests" />
          </div>
          <div>
            <button css={defaultButton}>
              <span>Search</span>
            </button>
          </div>
        </div>
        {props.schools.map((school) => {
          return (
            <div css={schoolPreviewBoxStyles} key={`school-${school.schoolId}`}>
              <div css={schoolPreviewLeftStyles}>
                <div>
                  <Image
                    src="/images/search.png"
                    alt="Illustration of a girl standing on a huge book with a graduation hat"
                    width="147.6"
                    height="104.85"
                  />
                </div>
                <div css={schoolInfoStyles}>
                  <h3 css={h2Styles}>{school.schoolName}</h3>
                  <div>
                    {school.street}, {school.postalCode} {school.areaName}
                  </div>
                  <div css={categorySectionStyles}>
                    <div css={categoryBox}>Design</div>
                    <div css={categoryBox}>Tech</div>
                  </div>
                </div>
              </div>
              <div css={buttonSectionStyles}>
                <Link href={`/schools/${school.schoolId}`}>
                  <a css={secondaryButton}>Learn more</a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const schools = await getAllSchools();

  return {
    props: {
      schools: schools,
    },
  };
}
