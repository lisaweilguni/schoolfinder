import { css } from '@emotion/react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const mainStyles = css`
  padding: 170px 170px;
`;

type ChildrenProps = {
  children: JSX.Element;
};

export default function Layout(props: ChildrenProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main css={mainStyles}>{props.children}</main>

      <Footer />
    </>
  );
}
