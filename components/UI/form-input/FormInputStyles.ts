import styled from 'styled-components';

type InputProps = {
  isError: boolean;
};

export const InputWrapper = styled.div<InputProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme, isError }) =>
    isError ? 'var(--color-error)' : theme.quaternaryText};
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  border: 1px solid
    ${({ theme, isError }) =>
      isError ? 'var(--color-error)' : theme.inputBorder};
  background-color: ${({ theme }) => theme.inputBg};
  border-radius: 0.4rem;
  font-family: 'Spartan-bold';
  font-size: var(--font-size-body-m);
  color: ${({ theme }) => theme.mainText};
  padding: 1.6rem 1.8rem;
  outline: none;
  transition: color 0.3s, border 0.3s, background 0.3s;

  cursor: pointer;

  &:focus {
    outline: 1px solid var(--color-purple);
  }

  &::placeholder {
    color: ${({ theme }) => theme.quaternaryText};
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 1rem;
  }
`;
