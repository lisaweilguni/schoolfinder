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
export const small = '0.9rem';
export const normal = '1rem';
export const middle = '2rem';
export const big = '3rem';

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
  width: 148px;
  padding: 10px 0;

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
  width: 400px;
  transition: 0.2s ease-in-out;

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
  letter-spacing: 2px;
  cursor: pointer;
  padding: 10px 0;
  width: 230px;
  transition: 0.2s ease-in-out;

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
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  padding: 10px 0;
  width: 230px;

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

// Text boxes
export const categoryBox = css`
  background-color: ${white};
  color: ${darkText};
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  border: 1px solid ${lightPurple};
  padding: 8px 0;
  width: 142px;
  display: inline-block;
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

// Layout
export const mainLayout = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
