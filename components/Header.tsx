import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { User } from '../database/users';
import {
  darkText,
  lightPurple,
  loginButton,
  small,
  white,
} from '../utils/sharedStyles';
import BurgerMenu from './BurgerMenu';

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
  align-items: center;
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

  :hover::after {
    content: '';
    width: 30%;
    height: 2px;
    position: absolute;
    bottom: -4px;
    left: 20px;
    background: white;
  }
`;

const logoStyles = css`
  display: flex;
  align-items: center;
  align-self: center;
`;

const navStyles = (open: boolean) => css`
  ul {
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0;
    gap: 40px;

    @media (max-width: 1000px) {
      flex-flow: column nowrap;
      position: fixed;
      top: 0px;
      right: 0;
      height: 100vh;
      width: 30vw;
      margin-top: 0;
      background-color: ${lightPurple};
      padding-top: 5rem;
      transform: ${open ? 'translateX(0)' : 'translateX(100%)'};
      transition: ${open && 'transform 0.2s ease-in-out'};
    }

    @media only screen and (max-width: 600px) {
      flex-flow: column nowrap;
      position: fixed;
      top: 0px;
      right: 0;
      height: 100vh;
      width: 100vw;
      margin-top: 0;
      background-color: ${lightPurple};
      padding-top: 5rem;
      transform: ${open ? 'translateX(0)' : 'translateX(100%)'};
      transition: transform 0.3s ease-in-out;
    }
  }

  li {
    padding: 12px 24px;
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
  const [open, setOpen] = useState(false);

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
        {props.user ? (
          <nav css={navStyles(open)}>
            <ul>
              <li>
                <div>
                  <Link href="/schools/">
                    <a css={linkStyles}>Search</a>
                  </Link>
                </div>
              </li>
              <li>
                <div>
                  <Link href="/about">
                    <a css={linkStyles}>About</a>
                  </Link>
                </div>
              </li>
              <li>
                <div>
                  <Link href="/private-profile">
                    <a css={linkStyles}>
                      <div>
                        <Image
                          src="/images/user.png"
                          alt="Profile icon"
                          width="20"
                          height="20"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <div>
                  <Anchor href="/logout" css={loginButton}>
                    Logout
                  </Anchor>
                </div>
              </li>
            </ul>
            <BurgerMenu open={open} setOpen={setOpen} />
          </nav>
        ) : (
          <nav css={navStyles(open)}>
            <ul>
              <li>
                <div>
                  <Link href="/schools/">
                    <a css={linkStyles}>Search</a>
                  </Link>
                </div>
              </li>
              <li>
                <div>
                  <Link href="/about">
                    <a css={linkStyles}>About</a>
                  </Link>
                </div>
              </li>
              <li>
                <div>
                  <Link href="/private-profile">
                    <a css={linkStyles}>
                      <div>
                        <Image
                          src="/images/user.png"
                          alt="Profile icon"
                          width="20"
                          height="20"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
              </li>
            </ul>
            <BurgerMenu open={open} setOpen={setOpen} />
          </nav>
        )}
      </div>
    </header>
  );
}
