import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  darkText,
  defaultButton,
  grey,
  h1Styles,
  lightPurple,
  lightText,
  mainLayout,
  small,
} from '../utils/sharedStyles';

const titleStyle = css`
  @media (max-width: 600px) {
    display: none;
  }
`;
const contentBoxStyles = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 510px;
  height: 440px;
  border: 1px solid;
  border: 1px solid ${grey};
  border-radius: 5px;
  align-items: center;
  text-align: center;
  padding: 0 4vw;
  margin-top: 20px;

  @media (max-width: 1023px) {
    padding: 0 60px;
    gap: 10px;
  }

  @media (max-width: 600px) {
    padding: 0 20px;
    margin-top: 0px;
    width: 90vw;
    height: 70vh;
  }
`;

const tagBox = css`
  color: ${lightPurple};
  font-family: 'Inter', sans-serif;
  margin-bottom: 1rem;
  font-weight: 400;
  line-height: 2rem;
  font-size: ${small};
  letter-spacing: 2px;
  border-left: 1px solid ${grey};
  border-right: 1px solid ${grey};
  border-bottom: 1px solid ${grey};
  padding: 0 15px;
`;

const headingStyles = css`
  font-size: 1.5rem;
  color: ${darkText};
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-weight: 400;
  line-height: 2.5rem;

  @media (max-width: 1023px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
    padding: 0px 20px;
  }
`;

const textStyles = css`
  font-size: ${small};
  color: ${lightText};
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-weight: 400;
  line-height: 2rem;
`;

export default function About() {
  return (
    <div>
      <Head>
        <title>About | Schoolfinder</title>
        <meta name="description" content="Information about schoolfinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={titleStyle}>
        <h1 css={h1Styles}>About</h1>
      </div>
      <div css={mainLayout}>
        <div css={contentBoxStyles}>
          <div css={tagBox}>for students</div>
          <h3 css={headingStyles}>Are you looking for the right school?</h3>
          <div>
            <Image
              src="/images/search.png"
              alt="Illustration of a girl standing on a gigantic book with a graduation hat"
              width="147.6"
              height="104.85"
            />
          </div>
          <div css={textStyles}>
            schoolfinder helps you search high schools all over Austria to find
            the right fit for you.
          </div>
          <Link href="/schools">
            <a css={defaultButton}>Search</a>
          </Link>
        </div>
        <div css={contentBoxStyles}>
          <div css={tagBox}>for schools</div>
          <h3 css={headingStyles}>
            Do you want to become part of the school network?
          </h3>
          <div>
            <Image
              src="/images/profile.png"
              alt="Illustration of a teacher and two students in a classroom"
              width="163.65"
              height="107.55"
            />
          </div>
          <div css={textStyles}>
            Sign up and add your school to our platform to attract the right
            students.
          </div>
          <Link href="/register">
            <a css={defaultButton}>Sign up</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
