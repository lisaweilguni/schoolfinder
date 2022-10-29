import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Select from 'react-select';
import { Area, getAllAreas } from '../database/areas';
import {
  getAllSpecializations,
  Specialization,
} from '../database/specializations';
import { getUserBySessionToken } from '../database/users';
import {
  beige,
  darkPurple,
  formButton,
  grey,
  h1Styles,
  inputFieldLarge,
  inputFieldName,
  inputNameWrapper,
  mainLayout,
} from '../utils/sharedStyles';

const inputSectionStyles = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: ${beige};
  width: 30rem;
  height: 35rem;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 40px 40px;
  justify-items: center;

  h1 {
    margin-bottom: 10px;
  }
`;

const imageStyles = css`
  align-self: center;
`;

const selectStyles = {
  option: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    width: '27vw',
    height: '2.8rem',
    border: `1px solid ${darkPurple}`,
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

type Props = {
  areas: Area[];
  specializations: Specialization[];
};

export default function AddSchool(props: Props) {
  const [schoolName, setSchoolName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [street, setStreet] = useState('');
  const [areaId, setAreaId] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] =
    useState<Specialization[]>();
  const [isPublic, setIsPublic] = useState();
  const [website, setWebsite] = useState('');

  console.log('selectedSpecializations', selectedSpecializations);

  // Declare handler for specialization multi-select
  const maxSelectOptions = 3;
  const handleSpecializationSelect = (selectedOption: Specialization[]) => {
    setSelectedSpecializations(selectedOption);
  };

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
                      setAreaId(event.currentTarget.value);
                    }}
                  >
                    <option value="" hidden selected>
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
                      setIsPublic(JSON.parse(event.currentTarget.value));
                    }}
                  >
                    <option hidden selected>
                      Select type
                    </option>
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
                    handleSpecializationSelect(
                      selectedOption as Specialization[],
                    )
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
              <button css={formButton}>Add school</button>
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

  const areas = await getAllAreas();

  const specializationsFromDatabase = await getAllSpecializations();

  // Transform specializations for multi-select element to read it
  const specializations = specializationsFromDatabase.map((specialization) => {
    return {
      value: specialization.id,
      label: specialization.name,
    };
  });

  return {
    props: { areas: areas, specializations: specializations },
  };
}
