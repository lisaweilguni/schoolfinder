import { css } from '@emotion/react';
import Link from 'next/link';
import { darkBlue, small, white } from '../utils/sharedStyles';

const footerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  padding: 15px 20px;
  border-top: 2px solid #ddd;
  background-color: ${darkBlue};
  justify-content: center;
  gap: 5rem;
  position: fixed;
  bottom: 0;
  width: 100%;

  a {
    text-decoration: none;
    color: ${white};
    letter-spacing: 2px;
    font-size: ${small};
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/schools">
        <a>Search</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </footer>
  );
}
