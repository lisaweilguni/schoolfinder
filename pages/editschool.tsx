import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Select from 'react-select';
import { Area, getAllAreas } from '../database/areas';
import { getSchoolByUserId } from '../database/schools';
import {
  getAllSpecializations,
  Specialization,
} from '../database/specializations';
import { getUserBySessionToken, User } from '../database/users';
import {
  getSchoolWithAreaNameAndSpecializations,
  transformDataForSelect,
} from '../utils/dataStructure';
import {
  addEditBoxStyles,
  errorMessageStyles,
  formButton,
  h1Styles,
  inputFieldLarge,
  inputFieldName,
  inputNameWrapper,
  mainLayout,
  selectStyles,
} from '../utils/sharedStyles';
import { SchoolResponseBody } from './api/users/schools';
import { SchoolWithAreaNameAndSpecializationsTransformed } from './schools';

const imageStyles = css`
  align-self: center;

  @media (max-width: 1023px) {
    display: none;
  }
`;

type Props = {
  areas: Area[];
  user: User;
  specializations: Specialization[];
  school?: SchoolWithAreaNameAndSpecializationsTransformed;
};

export default function EditSchool(props: Props) {
  const [schoolName, setSchoolName] = useState(props.school?.schoolName);
  const [postalCode, setPostalCode] = useState(props.school?.postalCode);
  const [street, setStreet] = useState(props.school?.street);
  const [areaId, setAreaId] = useState(Number(props.school?.areaId));
  const [selectedSpecializations, setSelectedSpecializations] =
    useState<Specialization[]>();
  const [isPublic, setIsPublic] = useState(
    JSON.stringify(props.school?.isPublic),
  );
  const [website, setWebsite] = useState(props.school?.website);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  // Declare handler for specialization multi-select
  const maxSelectOptions = 3;
  const handleSpecializationSelect = (selectedOption: Specialization[]) => {
    setSelectedSpecializations(selectedOption);
  };

  // Declare handler to edit school
  async function updateSchoolHandler() {
    // Transform selected specializations back to database structure
    const specializationsDatabaseStructure = selectedSpecializations?.map(
      (specialization: any) => {
        return {
          id: specialization.value,
          name: specialization.label,
        };
      },
    );

    const schoolResponse = await fetch('/api/users/schools', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        schoolName: schoolName,
        postalCode: postalCode,
        street: street,
        areaId: Number(areaId),
        isPublic: isPublic,
        website: website,
        userId: props.user.id,
        specializationIds: specializationsDatabaseStructure?.map(
          (specialization) => specialization.id,
        ),
      }),
    });

    const schoolResponseBody =
      (await schoolResponse.json()) as SchoolResponseBody;

    // Handle errors
    if ('errors' in schoolResponseBody) {
      setErrors(schoolResponseBody.errors);
      return console.log(schoolResponseBody.errors);
    }

    // Redirect user to private page
    await router.push(`/private-profile`);
  }

  return (
    <div>
      <Head>
        <title>Edit your school | Schoolfinder</title>
        <meta name="description" content="Edit your school" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div css={mainLayout}>
          <div css={addEditBoxStyles}>
            <h1 css={h1Styles}>Edit your school</h1>
            {errors.map((error) => {
              return (
                <p css={errorMessageStyles} key={error.message}>
                  {error.message}
                </p>
              );
            })}
            <div css={inputFieldLarge}>
              <label htmlFor="school-name">School name</label>
              <input
                id="school-name"
                placeholder="HTL Spengergasse"
                value={schoolName}
                onChange={(event) => {
                  setSchoolName(event.currentTarget.value);
                }}
              />
            </div>
            <div css={inputNameWrapper}>
              <div css={inputFieldName}>
                <label htmlFor="area">Area</label>
                <select
                  id="area"
                  value={areaId}
                  onChange={(event) => {
                    setAreaId(Number(event.currentTarget.value));
                  }}
                >
                  <option value="" hidden>
                    Select area
                  </option>
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
                <input
                  id="postal-code"
                  placeholder="1050"
                  value={postalCode}
                  onChange={(event) => {
                    setPostalCode(event.currentTarget.value);
                  }}
                />
              </div>
            </div>
            <div css={inputFieldLarge}>
              <label htmlFor="street">Street</label>
              <input
                id="street"
                placeholder="Spengergasse 20"
                value={street}
                onChange={(event) => {
                  setStreet(event.currentTarget.value);
                }}
              />
            </div>
            <div css={inputNameWrapper}>
              <div css={inputFieldName}>
                <label htmlFor="public-private">Type of school</label>
                <select
                  id="public-private"
                  value={isPublic}
                  onChange={(event) => {
                    setIsPublic(event.currentTarget.value);
                  }}
                >
                  <option hidden>Select type</option>
                  <option value="true">Public</option>
                  <option value="false">Private</option>
                </select>
              </div>
              <div css={inputFieldName}>
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  placeholder="www.spengergasse.at"
                  value={website}
                  onChange={(event) => {
                    setWebsite(event.currentTarget.value);
                  }}
                />
              </div>
            </div>
            <div css={inputFieldLarge}>
              <label htmlFor="specialization">
                Choose up to 3 specializations
              </label>
              <Select
                id="specialization"
                styles={selectStyles}
                onChange={(selectedOption) =>
                  handleSpecializationSelect(selectedOption as Specialization[])
                }
                isMulti
                options={
                  selectedSpecializations?.length === maxSelectOptions
                    ? []
                    : props.specializations
                }
                noOptionsMessage={() => {
                  return selectedSpecializations?.length === maxSelectOptions
                    ? 'You cannot choose more than 3 specializations'
                    : 'No options available';
                }}
                value={selectedSpecializations}
                placeholder="Select specializations"
              />
            </div>
            <button
              css={formButton}
              onClick={async () => {
                await updateSchoolHandler();
              }}
            >
              Save changes
            </button>
          </div>
          <div css={imageStyles}>
            <Image
              src="/images/addschool.png"
              alt="Illustration of a woman next to a bookshelf"
              width="391.2"
              height="301.6"
            />
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

  const areas = await getAllAreas();
  const specializationsFromDatabase = await getAllSpecializations();

  const foundSchool = await getSchoolByUserId(user.id, token);
  if (!foundSchool?.length) {
    return {
      props: {
        user: user,
      },
    };
  }

  return {
    props: {
      areas: areas,
      specializations: transformDataForSelect(specializationsFromDatabase),
      user: user,
      school: getSchoolWithAreaNameAndSpecializations(foundSchool),
    },
  };
}
