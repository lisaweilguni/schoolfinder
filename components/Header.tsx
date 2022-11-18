import 'intro.js/introjs.css';
import { css } from '@emotion/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { User } from '../database/users';
import {
  darkBlue,
  darkText,
  grey,
  lightPurple,
  loginButton,
  small,
  white,
} from '../utils/styles';
import BurgerMenu from './BurgerMenu';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Steps = dynamic(
  () => {
    return import('intro.js-react').then((mod) => mod.Steps);
  },
  { ssr: false },
);

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

const headerLeftStyles = css`
  display: flex;
  flex-direction: row;
  gap: 25px;
`;

const logoStyles = css`
  display: flex;
  align-items: center;
  align-self: center;
`;

const getStartedButton = css`
  display: inline-block;
  background-color: transparent;
  color: ${white};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${white};
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  padding: 1.5px 0;
  width: 120px;
  font-size: 0.7rem;
  font-family: 'Inter', sans-serif;
  display: none;

  :hover {
    background-color: ${darkBlue};
    color: ${white};
  }

  :active {
    background-color: ${darkBlue};
    color: ${white};
  }

  :disabled {
    background-color: ${grey};
    opacity: 50%;
    border: 1px solid #efefef;
    color: ${white};
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const navStyles = (open: boolean) => css`
  ul {
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0;
    gap: 40px;

    @media (max-width: 1023px) {
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
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [initialStep] = useState(0);
  const [steps] = useState([
    {
      element: '#step-one',
      intro:
        "Welcome to schoolfinder! You're looking for the right high school for you? Select your area here and get started.",
      position: 'bottom',
    },
    {
      element: '#step-two',
      intro:
        'Click here to view all schools and search based on your area and interests.',
      position: 'bottom',
    },
    {
      element: '#step-three',
      intro: 'Learn more about schoolfinder and how we can support you.',
      position: 'bottom',
    },
    {
      element: '#step-four',
      intro:
        "You're here to add a school to our platform? Sign up for free and get started.",
      position: 'bottom',
    },
  ]);
  const onExit = () => {
    setStepsEnabled(false);
  };
  const startIntro = () => {
    setStepsEnabled(true);
  };

  return (
    <header>
      <div css={headerStyles}>
        <div css={headerLeftStyles}>
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
          <Steps
            steps={steps}
            enabled={stepsEnabled}
            initialStep={initialStep}
            onExit={onExit}
          />
          <button css={getStartedButton} onClick={() => startIntro()}>
            Get started
          </button>
        </div>
        {props.user ? (
          <nav css={navStyles(burgerMenuOpen)}>
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
            <BurgerMenu open={burgerMenuOpen} setOpen={setBurgerMenuOpen} />
          </nav>
        ) : (
          <nav css={navStyles(burgerMenuOpen)}>
            <ul>
              <li>
                <div id="step-two">
                  <Link href="/schools/">
                    <a css={linkStyles}>Search</a>
                  </Link>
                </div>
              </li>
              <li>
                <div id="step-three">
                  <Link href="/about">
                    <a css={linkStyles}>About</a>
                  </Link>
                </div>
              </li>
              <li>
                <div>
                  <Link href="/private-profile">
                    <a css={linkStyles}>
                      <div id="step-four">
                        <Image
                          src="/images/add_profile.png"
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
            <BurgerMenu open={burgerMenuOpen} setOpen={setBurgerMenuOpen} />
          </nav>
        )}
      </div>
    </header>
  );
}
