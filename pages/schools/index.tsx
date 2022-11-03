import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllAreas } from '../../database/areas';
import { getAllSchools } from '../../database/schools';
import { getAllSpecializations } from '../../database/specializations';
import { transformDataForSelect } from '../../utils/dataStructure';
import {
  beige,
  categoryBox,
  darkPurple,
  defaultButton,
  grey,
  h1Styles,
  h2Styles,
  inputFieldSmall,
  secondaryButton,
  small,
  white,
} from '../../utils/sharedStyles';

const searchPageLayoutStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 30px;
`;

const filterBoxStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${beige};
  width: 60vw;
  height: 18vh;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 15px 50px;
  align-items: center;
  text-align: left;
`;

const schoolPreviewBoxStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${white};
  width: 70vw;
  height: 22vh;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 20px 50px;
  font-size: ${small};
`;

const schoolPreviewLeftStyles = css`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
`;

const schoolInfoStyles = css`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 12px;
`;

const categorySectionStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const buttonSectionStyles = css`
  display: flex;
  align-items: end;
`;

const selectStylesSearchLarge = {
  option: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    width: '25vw',
    height: '45px',
    border: `1px solid ${darkPurple}`,
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'Inter',
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

const selectStylesSearchSmall = {
  option: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    width: '12vw',
    height: '45px',
    border: `1px solid ${darkPurple}`,
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'Inter',
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export type SelectType = {
  label: string;
  value: number;
};

export type SpecializationTransformed = {
  specializationId: number;
  specializationName: string;
};

export type SchoolWithAreaNameAndSpecializationsTransformed = {
  schoolId: number;
  schoolName: string;
  areaId: number;
  areaName: string;
  postalCode: string;
  street: string;
  website: string;
  isPublic: boolean;
  specializations: SpecializationTransformed[];
};

type Props = {
  schools: SchoolWithAreaNameAndSpecializationsTransformed[];
  areas: SelectType[];
  specializations: SelectType[];
};

export default function Search(props: Props) {
  const [allSchools, setAllSchools] =
    useState<SchoolWithAreaNameAndSpecializationsTransformed[]>();
  const [matchingSchools, setMatchingSchools] =
    useState<SchoolWithAreaNameAndSpecializationsTransformed[]>();
  const [selectedArea, setSelectedArea] = useState<SelectType>();
  const [selectedSpecializations, setSelectedSpecializations] =
    useState<SelectType[]>();

  console.log('selectedSpecializations', selectedSpecializations);
  console.log('matchingSchools', matchingSchools);

  // Load all schools into state on first render and every time props.schools changes
  useEffect(() => {
    setAllSchools(props.schools);
  }, [props.schools]);

  // Declare handler for specialization multi-select
  const maxSelectOptions = 3;
  const handleSpecializationSelect = (selectedOption: SelectType[]) => {
    setSelectedSpecializations(selectedOption);
  };

  // Declare handler for area select
  const handleAreaSelect = (selectedOption: SelectType) => {
    setSelectedArea(selectedOption);
  };

  // Declare handler for search button
  function searchHandler() {
    const filteredSchools = allSchools?.filter(
      (school) => school.areaName === selectedArea?.label,
    );
    setMatchingSchools(filteredSchools);
  }

  return (
    <div>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search for schools here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={searchPageLayoutStyles}>
        <h1 css={h1Styles}>Find the right school for you.</h1>
        <div css={filterBoxStyles}>
          <div css={inputFieldSmall}>
            <label htmlFor="area">Your location</label>
            <Select
              id="area"
              styles={selectStylesSearchSmall}
              onChange={(selectedOption) =>
                handleAreaSelect(selectedOption as SelectType)
              }
              options={props.areas}
              value={selectedArea}
              placeholder="Select area"
            />
          </div>
          <div css={inputFieldSmall}>
            <label htmlFor="specialization">Your interests</label>
            <Select
              id="specialization"
              styles={selectStylesSearchLarge}
              onChange={(selectedOption) =>
                handleSpecializationSelect(selectedOption as SelectType[])
              }
              isMulti
              options={
                selectedSpecializations?.length === maxSelectOptions
                  ? []
                  : props.specializations
              }
              noOptionsMessage={() => {
                return selectedSpecializations?.length === maxSelectOptions
                  ? 'You cannot choose more than 3 interests'
                  : 'No options available';
              }}
              value={selectedSpecializations}
              placeholder="Select interests"
            />
          </div>
          <div>
            <button
              css={defaultButton}
              onClick={() => {
                searchHandler();
              }}
            >
              <span>Search</span>
            </button>
          </div>
        </div>
        {matchingSchools?.map((school) => {
          return (
            <div css={schoolPreviewBoxStyles} key={`school-${school.schoolId}`}>
              <div css={schoolPreviewLeftStyles}>
                <div>
                  <Image
                    src="/images/search.png"
                    alt="Illustration of a girl standing on a gigantic book with a graduation hat"
                    width="147.6"
                    height="104.85"
                  />
                </div>
                <div css={schoolInfoStyles}>
                  <h3 css={h2Styles}>{school.schoolName}</h3>
                  <div>
                    {school.street}, {school.postalCode} {school.areaName}
                  </div>
                  <div css={categorySectionStyles}>
                    {school.specializations.map((specialization) => {
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
                </div>
              </div>
              <div css={buttonSectionStyles}>
                <Link href={`/schools/${school.schoolId}`}>
                  <a css={secondaryButton}>Learn more</a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const areasFromDatabase = await getAllAreas();
  const specializationsFromDatabase = await getAllSpecializations();
  const schoolsFromDatabase = await getAllSchools();

  // Transform data
  const schoolsTransformed = schoolsFromDatabase.map((school) => {
    return {
      schoolId: school.schoolId,
      schoolName: school.schoolName,
      areaId: school.areaId,
      areaName: school.areaName,
      postalCode: school.postalCode,
      street: school.street,
      website: school.website,
      isPublic: school.isPublic,
      specializations: [
        {
          specializationId: school.specializationId,
          specializationName: school.specializationName,
        },
      ],
    };
  });

  // Merge duplicates
  const schools = [
    ...schoolsTransformed
      .reduce((r, school) => {
        const record = r.get(school.schoolId) || {};
        r.set(school.schoolId, {
          schoolId: school.schoolId,
          schoolName: school.schoolName,
          areaId: school.areaId,
          areaName: school.areaName,
          postalCode: school.postalCode,
          street: school.street,
          website: school.website,
          isPublic: school.isPublic,
          specializations: [
            ...(record.specializations || []),
            ...school.specializations.filter(
              (object) => Object.keys(object).length !== 0,
            ),
          ],
        });
        return r;
      }, new Map())
      .values(),
  ];

  return {
    props: {
      schools: schools,
      areas: transformDataForSelect(areasFromDatabase),
      specializations: transformDataForSelect(specializationsFromDatabase),
    },
  };
}
