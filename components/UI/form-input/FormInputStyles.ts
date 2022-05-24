import styled from 'styled-components';
import { media } from '../../../styles/GlobalStyles';

type InputProps = {
  isError?: boolean;
  invoiceItem?: boolean;
};

export const InputWrapper = styled.div<InputProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme, isError }) =>
    isError ? 'var(--color-error)' : theme.quaternaryText};

  label {
    display: ${({ invoiceItem }) => (invoiceItem ? 'none' : 'block')};

    ${media.phone_s} {
      display: block;
    }
  }
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  border: 1px solid
    ${({ theme, isError }) =>
      isError ? 'var(--color-error)' : theme.inputBorder};
  background-color: ${({ theme }) => theme.inputBg};
  border-radius: 0.4rem;
  font-family: inherit;
  font-weight: 700;
  font-size: var(--font-size-body-m);
  color: ${({ theme }) => theme.mainText};
  padding: 1.6rem 1.8rem;
  outline: none;
  transition: color 0.3s, border 0.3s, background 0.3s;

  cursor: pointer;

  &:focus {
    border: 1px solid var(--color-purple);
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.quaternaryText};
  }

  /* hide arrows for input number */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:disabled {
    background: transparent;
    border: none;
    cursor: initial;
  }
`;

export const LabelWrapper = styled.div<InputProps>`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 1rem;
  }

  span {
    display: ${({ invoiceItem }) => (invoiceItem ? 'none' : 'block')};
  }
`;
