import { css } from '@emotion/react';

const burgerIconStyles = (open: boolean) => css`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  justify-content: space-around;
  z-index: 1300;
  display: none;
  margin-right: 20px;
  cursor: pointer;

  @media (max-width: 1023px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${open ? '#FFFFFF' : '#FFFFFF'};
    border-radius: 12px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-of-type(1) {
      transform: ${open ? 'rotate(45deg)' : 'rotate(0deg)'};
    }
    &:nth-of-type(2) {
      transform: ${open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${open ? 0 : 1};
    }
    &:nth-of-type(3) {
      transform: ${open ? 'rotate(-45deg)' : 'rotate(0deg)'};
    }
  }
`;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BurgerMenu(props: Props) {
  return (
    <div
      css={burgerIconStyles(props.open)}
      onClick={() => props.setOpen(!props.open)}
      onKeyDown={() => props.setOpen(!props.open)}
      role="button"
      tabIndex={0}
    >
      <div />
      <div />
      <div />
    </div>
  );
}
