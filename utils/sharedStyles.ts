import { css } from '@emotion/react';

// Colour Palette

// Main colours
export const lightPurple = '#6C62FB';
export const darkPurple = '#564EC9';
export const orange = '#F39231';
export const darkBlue = '#3F3D56';
export const grey = '#A9A3A3';

// Text colours
export const darkText = '#161617';
export const lightText = '#545454';
export const white = '#FFFFFF';

// Background colour
export const beige = '#FBF7F7';

// Font sizes
export const small = '0.875rem'; // 14px
export const normal = '1rem'; // 16px
export const middle = '2rem'; // 32px
export const big = '3rem'; // 48px

// Headings
export const titleStyles = css`
  font-family: 'Khula', sans-serif;
  margin: 0;
  font-weight: normal;
  font-size: ${big};

  @media (max-width: 1023px) {
    font-size: ${middle};
  }
`;

export const h1Styles = css`
  font-family: 'Khula', sans-serif;
  margin: 0;
  font-weight: normal;
  font-size: ${middle};
  color: ${darkText};
  margin-bottom: 10px;

  @media (max-width: 600px) {
    margin-bottom: 10px;
    padding: 0px 20px;
  }
`;

export const h2Styles = css`
  font-family: 'Inter', sans-serif;
  margin: 0;
  font-size: ${normal};
  font-weight: normal;
  font-weight: 600;
  color: ${lightText};
  color: ${darkText};
  margin-bottom: 0;
  padding: 0;

  @media (max-width: 1023px) {
    font-size: ${normal};
  }

  @media (max-width: 600px) {
    font-size: ${normal};
  }
`;

// Layout
export const mainLayout = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    gap: 40px;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }
`;

export const higherMarginTopLayout = css`
  margin-top: 60px;
`;

// Buttons
export const defaultButton = css`
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
  padding: 10px 0;
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

export const secondaryButton = css`
  display: inline-block;
  background-color: ${white};
  color: ${darkText};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${grey};
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  padding: 10px 0;
  width: 162px;
  font-size: ${small};
  font-family: 'Inter', sans-serif;

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
`;

export const loginButton = css`
  display: inline-block;
  background-color: ${white};
  color: ${darkText};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${grey};
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  width: 148px;
  padding: 10px 0;
  font-size: ${small};
  font-family: 'Inter', sans-serif;
  text-decoration: none;

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
`;

export const formButton = css`
  display: inline-block;
  background-color: ${lightPurple};
  color: ${white};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${darkPurple};
  letter-spacing: 2px;
  cursor: pointer;
  padding: 10px 0;
  width: 389px;
  transition: 0.2s ease-in-out;
  font-size: ${normal};
  margin-top: 0.9rem;
  margin-bottom: 0.9rem;
  font-weight: light;
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

  @media (max-width: 600px) {
    width: 200px;
  }
`;

export const addSchoolButtonSmall = css`
  display: inline-block;
  background-color: ${lightPurple};
  color: ${white};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${darkPurple};
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px 0;
  width: 190px;
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

export const deleteAccountButton = css`
  display: inline-block;
  background-color: ${white};
  color: ${darkText};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${grey};
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  padding: 10px 0;
  width: 190px;
  font-size: ${small};
  font-family: 'Inter', sans-serif;

  :hover {
    background-color: ${darkBlue};
    color: ${white};
  }

  :active {
    background-color: ${orange};
    color: ${white};
  }

  :disabled {
    background-color: ${grey};
    opacity: 50%;
    border: 1px solid #efefef;
    color: ${white};
  }
`;

// Text boxes
export const categoryBox = css`
  background-color: ${white};
  color: ${darkText};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${lightPurple};
  padding: 8px 0;
  width: 130px;
  display: inline-block;
`;

// Forms & Input Styles
export const inputFieldLarge = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: ${small};
  transition: 0.2s ease-in-out;

  input {
    width: 390px;
    height: 30px;
    border: 1px solid ${lightPurple};
    border-radius: 5px;
    background-color: ${white};

    @media (max-width: 600px) {
      width: 200px;
      height: 40px;
    }
  }

  label {
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 5px;
  }
  input::placeholder {
    padding-left: 5px;
    font-family: 'Inter', sans-serif;
  }
  input:hover {
    border: 2px solid ${darkPurple};
  }

  @media (max-width: 600px) {
    align-items: center;
  }
`;

export const inputFieldSmall = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: ${small};
  transition: 0.2s ease-in-out;

  input {
    width: 15vw;
    height: 35px;
    border: 1px solid ${lightPurple};
    border-radius: 5px;
    background-color: ${white};
  }
  label {
    margin-bottom: 5px;
    letter-spacing: 1px;
    text-align: left;
  }
  input::placeholder {
    padding-left: 5px;
    font-family: 'Inter', sans-serif;
  }
  input:hover {
    border: 2px solid ${darkPurple};
  }
  select {
    width: 13vw;
    height: 35px;
    border: 1px solid ${lightPurple};
    border-radius: 5px;
    background-color: ${white};
    padding-left: 5px;
    font-family: 'Inter', sans-serif;
    color: #818181;
    color: ${darkText};
    transition: 0.2s ease-in-out;
  }

  select:hover {
    border: 2px solid ${darkPurple};
  }

  option::selection {
    color: ${darkText};
  }
`;

export const inputNameWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 15px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
  }
`;

export const inputFieldName = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: ${small};
  transition: 0.2s ease-in-out;

  input {
    width: 187px;
    height: 30px;
    border: 1px solid ${lightPurple};
    border-radius: 5px;
    background-color: ${white};
    transition: all 100ms ease;

    @media (max-width: 600px) {
      width: 200px;
      height: 40px;
    }
  }
  label {
    margin-bottom: 5px;
    letter-spacing: 1px;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 2px;
    @media (max-width: 600px) {
      text-align: center;
    }
  }
  input::placeholder {
    padding-left: 5px;
    font-family: 'Inter', sans-serif;
  }
  input:hover {
    border: 2px solid ${darkPurple};
  }

  select {
    width: 187px;
    height: 30px;
    border: 1px solid ${lightPurple};
    border-radius: 5px;
    background-color: ${white};
    padding-left: 5px;
    font-family: 'Inter', sans-serif;
    color: #818181;
    color: ${darkText};
    transition: 0.2s ease-in-out;

    @media (max-width: 600px) {
      width: 200px;
      height: 40px;
    }
  }

  select:hover {
    border: 2px solid ${darkPurple};
  }

  option::selection {
    color: ${darkText};
  }
`;

export const textBelowButtonStyles = css`
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-size: ${small};
  text-align: center;
  justify-content: center;

  a {
    text-decoration: none;
    color: ${darkPurple};
  }

  a:hover {
    color: ${orange};
  }

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    width: 80vw;
  }
`;

export const addEditBoxStyles = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: ${beige};
  width: 31rem;
  height: 40rem;
  border: 1px solid ${grey};
  border-radius: 5px;
  box-shadow: 3px 3px 4px ${grey};
  padding: 50px 50px 50px 50px;
  justify-items: center;

  h1 {
    margin-bottom: 10px;
  }

  @media (max-width: 1023px) {
    max-width: 90vw;
    align-items: center;
    justify-content: center;
    padding: 20px 20px 20px 20px;
  }

  @media (max-width: 600px) {
    max-width: 90vw;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 40px 20px 20px 20px;
    margin-top: 20px;
  }
`;

// Errors

export const errorMessageStyles = css`
  color: #ed6183;
`;

// Capitalize

export const capitalizeText = css`
  text-transform: capitalize;
`;

// Select styles

export const selectStyles = {
  option: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    width: '389px',
    height: '2.8rem',
    border: `1px solid ${darkPurple}`,
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    '@media only screen and (max-width: 1023px)': {
      ...provided['@media only screen and (max-width: 1023px)'],
      width: '389px',
    },
    '@media only screen and (max-width: 600px)': {
      ...provided['@media only screen and (max-width: 600px)'],
      width: '200px',
      height: '100px',
    },
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export const selectStylesSearchLarge = {
  option: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    width: '360px',
    height: '45px',
    border: `1px solid ${darkPurple}`,
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'Inter',
    '@media only screen and (max-width: 800px)': {
      ...provided['@media only screen and (max-width: 800px)'],
      width: '300px',
    },
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export const selectStylesSearchSmall = {
  option: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    width: '170px',
    height: '45px',
    border: `1px solid ${darkPurple}`,
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'Inter',
    '@media only screen and (max-width: 800px)': {
      ...provided['@media only screen and (max-width: 800px)'],
      width: '300px',
    },
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export const selectStylesHome = {
  option: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    width: '170px',
    height: '40px',
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
