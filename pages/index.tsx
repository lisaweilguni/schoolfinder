import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import Select from 'react-select';
import { getAllAreas } from '../database/areas';
import { transformDataForSelect } from '../utils/dataStructure';
import {
  darkBlue,
  darkPurple,
  grey,
  higherMarginTopLayout,
  inputFieldSmall,
  lightPurple,
  lightText,
  mainLayout,
  selectStylesHome,
  small,
  titleStyles,
  white,
} from '../utils/sharedStyles';
import { SelectType } from './schools';

const titleSectionStyles = css`
  max-width: 45%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1023px) {
    gap: 10px;
    max-width: 90%;
  }

  @media (max-width: 600px) {
    align-items: center;
  }
`;

const subTitleStyles = css`
  color: ${lightText};
  max-width: 70%;
  line-height: 35px;
  margin-bottom: 20px;

  @media (max-width: 1023px) {
    font-size: ${small};
  }

  @media (max-width: 600px) {
    font-size: ${small};
    line-height: 30px;
    max-width: 90%;
    justify-content: center;
    align-items: center;
  }
`;

const inputSectionStyles = css`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const searchButton = css`
  display: inline-block;
  background-color: ${lightPurple};
  color: ${white};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${darkPurple};
  letter-spacing: 2px;
  cursor: pointer;
  width: 162px;
  padding: 12px 0;
  transition: 0.2s ease-in-out;
  font-size: ${small};
  font-family: 'Inter', sans-serif;

  :hover {
    background-color: ${darkPurple};
  }

  :active {
    background-color: ${darkBlue};
  }

  :disabled {
    background-color: ${grey};
    opacity: 50%;
    border: 1px solid #efefef;
  }
`;

type Props = {
  areas: SelectType[];
  setAreaFilter: Dispatch<SetStateAction<SelectType | undefined>>;
};

export default function Home(props: Props) {
  const [selectedArea, setSelectedArea] = useState<SelectType>();
  const router = useRouter();

  // Declare handler for area select
  const handleAreaSelect = (selectedOption: SelectType) => {
    setSelectedArea(selectedOption);
  };

  return (
    <div>
      <Head>
        <title>Home | Schoolfinder</title>
        <meta name="description" content="Welcome to schoolfinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={higherMarginTopLayout}>
        <div css={mainLayout}>
          <div css={titleSectionStyles}>
            <h1 css={titleStyles}>Supercharge your high school search.</h1>
            <div css={subTitleStyles}>
              Find your path in the jungle of high schools. Major life decisions
              made easier.
            </div>
            <div css={inputSectionStyles}>
              <div css={inputFieldSmall}>
                <Select
                  id="area"
                  styles={selectStylesHome}
                  onChange={(selectedOption) =>
                    handleAreaSelect(selectedOption as SelectType)
                  }
                  options={props.areas}
                  value={selectedArea}
                  placeholder="Select your area"
                />
              </div>
              <div>
                <button
                  css={searchButton}
                  onClick={async () => {
                    props.setAreaFilter(selectedArea);
                    await router.push(`/schools`);
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/images/home.png"
              alt="Illustration of a city with location icon in the middle"
              width="813"
              height="433"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const areasFromDatabase = await getAllAreas();

  return {
    props: {
      areas: transformDataForSelect(areasFromDatabase),
    },
  };
}
