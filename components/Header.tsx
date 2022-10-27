import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '../database/users';
import {
  darkText,
  lightPurple,
  loginButton,
  small,
  white,
} from '../utils/sharedStyles';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  background: ${lightPurple};
  position: fixed;
  z-index: 2;
  width: 100%;
  padding-left: 12vw;
  padding-right: 12vw;
  height: 80px;
  font-size: ${small};
`;

const linkStyles = css`
  text-decoration: none;
  color: ${white};
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;

  :hover {
    color: ${darkText};
    transition: 0.2s ease-in-out;
  }
`;

const logoStyles = css`
  display: flex;
  align-items: center;
  align-self: center;
`;

const navStyles = css`
  display: flex;
  flex-direction: row;
  gap: 70px;
  align-items: center;
  margin: 20px 10px;
  padding: 10px;

  > a + a {
    margin-left: 13px;
  }
`;

type Props = {
  user?: User;
};

function Anchor({ children, ...restProps }: any) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props: Props) {
  return (
    <header>
      <div css={headerStyles}>
        <div css={logoStyles}>
          <Link href="/">
            <a>
              <Image
                src="/images/logo_white.png"
                alt="Schoolfinder logo"
                width="140.75"
                height="39"
              />
            </a>
          </Link>
        </div>
        <nav css={navStyles}>
          {props.user ? (
            <>
              <Link href="/schools/">
                <a css={linkStyles}>Search</a>
              </Link>
              <Link href="/about">
                <a css={linkStyles}>About</a>
              </Link>
              <Link href="/private-profile">
                <a css={linkStyles}>My Account</a>
              </Link>
              <Anchor href="/logout" css={loginButton}>
                Logout
              </Anchor>
            </>
          ) : (
            <>
              <Link href="/schools/">
                <a css={linkStyles}>Search</a>
              </Link>
              <Link href="/about">
                <a css={linkStyles}>About</a>
              </Link>
              <Link href="/login">
                <a css={loginButton}>Login</a>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
