import { css } from '@emotion/react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import LoadingAnimation from '../../components/LoadingAnimation';
import { getSchoolWithSpecializationsById } from '../../database/schools';
import { parseIntFromContextQuery } from '../../utils/contextQuery';
import { getSchoolWithAreaNameAndSpecializations } from '../../utils/dataStructure';
import { beige, categoryBox, grey, h1Styles } from '../../utils/styles';
import { SchoolWithAreaNameAndSpecializationsTransformed } from './';

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

export const singleSchoolPageLayout = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media (max-width: 1023px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 40px;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }
`;

const backButtonSectionStyles = css`
  @media (max-width: 600px) {
    margin-top: 40px;
    margin-left: 20px;
  }
`;

const contentLayout = css`
  margin-top: 3rem;
`;

const schoolInfoSectionStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const categoryStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  @media (max-width: 600px) {
    flex-direction: row wrap;
  }
`;

const schoolInfoBoxStyles = css`
  display: flex;
  flex-direction: column;
  background-color: ${beige};
  width: 410px;
  height: 150px;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 40px 30px;
  align-items: left;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const iconLineStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  object-fit: contain;
  aspect-ratio: 1 / 1;

  @media (max-width: 600px) {
    flex-direction: row wrap;
    text-align: left;
  }
`;

const iconStyles = css`
  object-fit: contain;
  aspect-ratio: 1 / 1;
`;

type Props = {
  school: SchoolWithAreaNameAndSpecializationsTransformed;
};

export default function SingleSchool(props: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const [address, setAddress] = useState(
    `${props.school.street} ${props.school.postalCode} ${props.school.areaName}`,
  );
  const [coordinates, setCoordinates] = useState({
    lat: 48.210033,
    lng: 16.363449,
  });

  // Get latitude & longitude from address.
  const findLatAndLng = useCallback(async () => {
    await Geocode.fromAddress(address).then(
      (response) => {
        setCoordinates(response.results[0].geometry.location);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [address]);

  // Set coordinates on first render and every time address changes
  useEffect(() => {
    findLatAndLng().catch(() =>
      console.log('getting coordinates from address failed'),
    );
  }, [findLatAndLng, address]);

  // Set coordinates for center and marker of map
  const center = { lat: coordinates.lat, lng: coordinates.lng };

  // Show loading if map is not loaded yet
  if (!isLoaded) {
    return (
      <div>
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>School Details | Schoolfinder</title>
        <meta name="description" content="More information about the school" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={backButtonSectionStyles}>
        <Link href="/schools/">
          <a>
            <Image
              src="/images/previous.png"
              alt="Back arrow"
              width="20"
              height="20"
            />{' '}
          </a>
        </Link>
      </div>
      <div css={contentLayout}>
        <div css={singleSchoolPageLayout}>
          <div>
            {/* <Image
                src="/images/profile.png"
                alt="Illustration of a teacher and two students in a classroom"
                width="436.4"
                height="286.8"
              /> */}
            <GoogleMap
              mapContainerClassName="map-container-single-school"
              zoom={12}
              center={center}
            >
              <MarkerF position={center} />
            </GoogleMap>
          </div>
          <div>
            <div css={schoolInfoSectionStyles}>
              <h1 css={h1Styles}>{props.school.schoolName}</h1>
              <div css={categoryStyles}>
                {props.school.specializations.map((specialization) => {
                  return (
                    <div
                      key={specialization.specializationId}
                      css={categoryBox}
                    >
                      {specialization.specializationName}
                    </div>
                  );
                })}
              </div>

              <div css={schoolInfoBoxStyles}>
                <div css={iconLineStyles}>
                  <Image
                    src="/images/pin.png"
                    alt="Location icon"
                    width="20"
                    height="20"
                    css={iconStyles}
                  />
                  {props.school.street}, {props.school.postalCode}{' '}
                  {props.school.areaName}
                </div>
                <div css={iconLineStyles}>
                  <Image
                    src="/images/open.png"
                    alt="Website icon"
                    width="20"
                    height="20"
                  />
                  {props.school.website}
                </div>
                <div css={iconLineStyles}>
                  <Image
                    src="/images/money.png"
                    alt="Money icon"
                    width="20"
                    height="20"
                  />
                  {props.school.isPublic ? 'public' : 'private'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  // Retrieve the school ID from the URL
  const schoolId = parseIntFromContextQuery(context.query.schoolId);

  if (typeof schoolId === 'undefined') {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const foundSchool = await getSchoolWithSpecializationsById(schoolId);

  if (foundSchool.length === 0) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      school: getSchoolWithAreaNameAndSpecializations(foundSchool),
    },
  };
}
