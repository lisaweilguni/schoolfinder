import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Area, getAreas } from '../database/areas';
import { getUserBySessionToken } from '../database/users';
import {
  formButton,
  h1Styles,
  inputFieldLarge,
  inputFieldName,
  inputNameWrapper,
  mainLayout,
} from '../utils/sharedStyles';

const inputSectionStyles = css`
  max-width: 45%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  h1 {
    margin-bottom: 10px;
  }
`;

const imageStyles = css`
  align-self: center;
`;

type Props = {
  areas: Area[];
};

export default function AddSchool(props: Props) {
  return (
    <div>
      <Head>
        <title>Add your school</title>
        <meta name="description" content="Add your school" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div css={mainLayout}>
          <div css={imageStyles}>
            <Image
              src="/images/addschool.png"
              alt="Illustration of a woman next to a bookshelf"
              width="391.2"
              height="301.6"
            />
          </div>
          <div css={inputSectionStyles}>
            <h1 css={h1Styles}>Add your school</h1>
            <form>
              <div css={inputFieldLarge}>
                <label htmlFor="school-name">Name of the school</label>
                <input id="school-name" placeholder="HTL Spengergasse" />
              </div>
              <div css={inputNameWrapper}>
                <div css={inputFieldName}>
                  <label htmlFor="area">Area</label>
                  <select
                    id="area"
                    // value={areaId}
                    // onChange={(event) => {
                    //   setAreaId(event.currentTarget.value);
                    // }}
                  >
                    <option value="">Select area</option>
                    {props.areas.map((area) => {
                      return (
                        <option key={area.id} value={area.id}>
                          {area.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div css={inputFieldName}>
                  <label htmlFor="postal-code">Postal code</label>
                  <input id="postal-code" placeholder="1050" />
                </div>
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="street">Street</label>
                <input id="street" placeholder="Spengergasse 20" />
              </div>
              <div css={inputFieldLarge}>
                <label htmlFor="specialisation">
                  Choose up to 3 specialisations
                </label>
                <input id="specialisation" />
              </div>
              <div css={inputNameWrapper}>
                <div css={inputFieldName}>
                  <label htmlFor="public-private">Type of school</label>
                  <input id="public-private" />
                </div>
                <div css={inputFieldName}>
                  <label htmlFor="website">Website</label>
                  <input id="website" placeholder="www.spengergasse.at" />
                </div>
              </div>
              <Link href="/schools/search">
                <button css={formButton}>Add school</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/login',
        permanent: false,
      },
    };
  }
  const areas = await getAreas();

  return {
    props: { areas },
  };
}
