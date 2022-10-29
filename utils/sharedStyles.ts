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
`;

export const h1Styles = css`
  font-family: 'Khula', sans-serif;
  margin: 0;
  font-weight: normal;
  font-size: ${middle};
  color: ${darkText};
  margin-bottom: 10px;
`;

export const h2Styles = css`
  /* font-family: 'Inter', sans-serif; */
  margin: 0;
  font-size: ${normal};
  font-weight: normal;
  color: ${lightText};
  color: ${darkText};
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
  width: 27vw;
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
    width: 27vw;
    height: 30px;
    border: 1px solid ${lightPurple};
    border-radius: 5px;
    background-color: ${white};
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
`;

export const inputNameWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

export const inputFieldName = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: ${small};
  transition: 0.2s ease-in-out;

  input {
    width: 13vw;
    height: 30px;
    border: 1px solid ${lightPurple};
    border-radius: 5px;
    background-color: ${white};
    transition: all 100ms ease;
  }
  label {
    margin-bottom: 5px;
    letter-spacing: 1px;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 2px;
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
    height: 30px;
    border: 1px solid ${lightPurple};
    border-radius: 5px;
    background-color: ${white};
    color: ${lightText};
    padding-left: 5px;
    font-family: 'Inter', sans-serif;
    color: #818181;
    transition: 0.2s ease-in-out;
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
`;

// Layout
export const mainLayout = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const higherMarginTopLayout = css`
  margin-top: 60px;
`;

// Errors

export const errorMessageStyles = css`
  color: #ed6183;
`;

// Capitalize

export const capitalizeText = css`
  text-transform: capitalize;
`;
