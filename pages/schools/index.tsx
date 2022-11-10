import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllAreas } from '../../database/areas';
import { getAllSchools } from '../../database/schools';
import { getAllSpecializations } from '../../database/specializations';
import { transformDataForSelect } from '../../utils/dataStructure';
import {
  beige,
  categoryBox,
  defaultButton,
  grey,
  h1Styles,
  h2Styles,
  inputFieldSmall,
  normal,
  selectStylesSearchLarge,
  selectStylesSearchSmall,
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

  @media (max-width: 800px) {
    padding: 60px 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const filterBoxStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${beige};
  width: 865px;
  height: 18vh;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 15px 50px;
  align-items: center;
  text-align: left;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    background-color: white;
    border: none;
    box-shadow: none;
    margin-bottom: 90px;
    gap: 5px;
  }
`;

const schoolPreviewBoxStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${white};
  width: 750px;
  height: 22vh;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 20px 50px;
  font-size: ${small};
  cursor: pointer;

  @media (max-width: 800px) {
    width: 300px;
    height: 22vh;
    flex-direction: column nowrap;
    padding: 60px 70px;
    gap: 10px;
    background-color: ${beige};
    border: 1px solid ${grey};
    border-radius: 5px;
    box-shadow: 3px 3px 4px ${grey};
    margin-top: 30px;
    height: 35vh;
    font-size: ${normal};
  }
`;

const schoolPreviewLeftStyles = css`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;

  @media (max-width: 800px) {
    align-items: center;
  }
`;

const schoolInfoStyles = css`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 12px;

  @media (max-width: 800px) {
    text-align: center;
    align-items: center;
  }
`;

const categorySectionStyles = css`
  display: flex;
  flex-direction: row;
  gap: 10px;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const imageStyles = css`
  @media (max-width: 800px) {
    display: none;
  }
`;

const countStyles = css`
  font-size: ${small};
`;

const iconStyles = css`
  align-items: center;
  margin-top: 40px;

  @media (max-width: 800px) {
    display: none;
  }
`;

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
  setAreaFilter: Dispatch<SetStateAction<SelectType>>;
  areaFilter: SelectType;
};

export default function Search(props: Props) {
  const [allSchools, setAllSchools] =
    useState<SchoolWithAreaNameAndSpecializationsTransformed[]>();
  const [selectedArea, setSelectedArea] = useState<SelectType>(
    props.areaFilter,
  );
  const [selectedSpecializations, setSelectedSpecializations] = useState<
    SelectType[]
  >([]);
  // const [areaFilter, setAreaFilter] = useState<SelectType>();
  const [interestsFilter, setInterestsFilter] = useState<SelectType[]>([]);

  // Load all schools into state on first render and every time props.schools changes
  useEffect(() => {
    setAllSchools(props.schools);
  }, [props.schools, allSchools]);

  // Declare handler for specialization multi-select
  const maxSelectOptions = 3;
  const handleSpecializationSelect = (selectedOption: SelectType[]) => {
    setSelectedSpecializations(selectedOption);
  };

  // Declare handler for area select
  const handleAreaSelect = (selectedOption: SelectType) => {
    setSelectedArea(selectedOption);
  };

  // School count
  const count = allSchools?.filter((school) => {
    let filter = true;
    // Check if selected area name matches the school area
    if (props.areaFilter && school.areaName !== props.areaFilter.label) {
      filter = false;
    }
    // Check if one of the selected interests matches one of the current schools specializations
    if (
      interestsFilter.length &&
      !interestsFilter.some((interest) =>
        school.specializations.some(
          (specialization) =>
            specialization.specializationName === interest.label,
        ),
      )
    ) {
      filter = false;
    }
    return filter;
  }).length;

  return (
    <div>
      <Head>
        <title>Search | Schoolfinder</title>
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
                selectedSpecializations.length === maxSelectOptions
                  ? []
                  : props.specializations
              }
              noOptionsMessage={() => {
                return selectedSpecializations.length === maxSelectOptions
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
                props.setAreaFilter(selectedArea);
                setInterestsFilter(selectedSpecializations);
              }}
            >
              <span>Search</span>
            </button>
          </div>
        </div>
        <div css={countStyles}>
          {count && count === 1
            ? `${count} school found`
            : `${count} schools found`}
        </div>
        {allSchools
          ?.filter((school) => {
            let filter = true;
            // Check if selected area name matches the school area
            if (
              props.areaFilter &&
              school.areaName !== props.areaFilter.label
            ) {
              filter = false;
            }
            // Check if one of the selected interests matches one of the current schools specializations
            if (
              interestsFilter.length &&
              !interestsFilter.some((interest) =>
                school.specializations.some(
                  (specialization) =>
                    specialization.specializationName === interest.label,
                ),
              )
            ) {
              filter = false;
            }
            return filter;
          })
          .map((school) => {
            return (
              <div
                css={schoolPreviewBoxStyles}
                key={`school-${school.schoolId}`}
              >
                <Link href={`/schools/${school.schoolId}`}>
                  <div css={schoolPreviewLeftStyles}>
                    <div css={imageStyles}>
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
                </Link>
                <div css={iconStyles}>
                  <div>
                    <Link href={`/schools/${school.schoolId}`}>
                      <Image
                        src="/images/next.png"
                        alt="Arrow"
                        width="20"
                        height="20"
                      />
                    </Link>
                  </div>
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
