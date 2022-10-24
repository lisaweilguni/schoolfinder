import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  beige,
  categoryBox,
  defaultButton,
  grey,
  h1Styles,
  h3Styles,
  inputFieldSmall,
  secondaryButton,
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
  gap: 13px;
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

export default function Search() {
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
        <div css={schoolPreviewBoxStyles}>
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
              <h3 css={h3Styles}>HTL Spengergasse</h3>
              <div>Teststraße 36, 1050 Vienna</div>
              <div css={categorySectionStyles}>
                <div css={categoryBox}>Design</div>
                <div css={categoryBox}>Tech</div>
              </div>
            </div>
          </div>
          <div css={buttonSectionStyles}>
            <Link href="/schools/search">
              <a css={secondaryButton}>Learn more</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
