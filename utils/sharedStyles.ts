import { css } from '@emotion/react';

// Color Palette
export const lightPurple = '#6C62FB';
export const darkPurple = '#564EC9';
export const orange = '#F39231';
export const darkBlue = '#3F3D56';
export const grey = '#A9A3A3';

export const darkText = '#161617';
export const lightText = '#545454';
export const white = '#FFFFFF';

export const beige = '#FBF7F7';

// Font sizes
export const small = '1em';
export const middle = '2rem';
export const big = '3rem';

// Buttons
export const defaultButton = css`
  display: table-cell;
  background-color: ${lightPurple};
  color: ${white};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${darkPurple};
  letter-spacing: 2px;
  cursor: pointer;
  height: 40px;
  width: 162px;
  vertical-align: middle;
  transition: 0.2s ease-in-out;
  vertical-align: middle;

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
  display: table-cell;
  background-color: ${white};
  color: ${darkText};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${grey};
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  height: 40px;
  width: 162px;
  vertical-align: middle;

  :hover {
    background-color: ${orange};
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
  display: table-cell;
  background-color: ${white};
  color: ${darkText};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${grey};
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  height: 40px;
  width: 148px;
  vertical-align: middle;

  :hover {
    background-color: ${orange};
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
  display: table-cell;
  background-color: ${lightPurple};
  color: ${white};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${darkPurple};
  letter-spacing: 2px;
  cursor: pointer;
  height: 40px;
  width: 400px;
  vertical-align: middle;
  transition: 0.2s ease-in-out;
  vertical-align: middle;

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
  display: table-cell;
  background-color: ${lightPurple};
  color: ${white};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${darkPurple};
  letter-spacing: 2px;
  cursor: pointer;
  height: 40px;
  width: 230px;
  vertical-align: middle;
  transition: 0.2s ease-in-out;
  vertical-align: middle;

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
  display: table-cell;
  background-color: ${white};
  color: ${darkText};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${grey};
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  height: 40px;
  width: 230px;
  vertical-align: middle;

  :hover {
    background-color: ${orange};
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

// Text fields

export const categoryBox = css`
  background-color: ${white};
  color: ${darkText};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${lightPurple};
  height: 40px;
  width: 142px;
  display: table-cell;
  vertical-align: middle;
`;

// Input fields

export const inputFieldLarge = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  input {
    width: 400px;
    height: 35px;
    border: 1px solid ${lightPurple};
    border-radius: 5px;
    background-color: transparent;
  }
  label {
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 4px;
  }
  input::placeholder {
    letter-spacing: 2px;
  }
  input:hover {
    transition: all 300ms ease;
    border: 2px solid ${darkPurple};
  }
`;

export const inputFieldSmall = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  input {
    width: 200px;
    height: 40px;
    border: 1px solid ${lightPurple};
    border-radius: 5px;
    background-color: transparent;
  }
  label {
    margin-bottom: 4px;
    letter-spacing: 1px;
  }
  input::placeholder {
    letter-spacing: 2px;
  }
  input:hover {
    transition: all 300ms ease;
    border: 2px solid ${darkPurple};
  }
`;
