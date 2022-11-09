import { css } from '@emotion/react';
import Head from 'next/head';
import { User } from '../database/users';
import Footer from './Footer';
import Header from './Header';

const mainStyles = css`
  padding: 22vh 12vw;

  @media (max-width: 600px) {
    padding: 10vh 5vw;
  }
`;

type Props = {
  user?: User;
};

type ChildrenProps = {
  children: JSX.Element;
};

export default function Layout(props: Props & ChildrenProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header user={props.user} />

      <main css={mainStyles}>{props.children}</main>

      <Footer />
    </>
  );
}
