import styled from 'styled-components';

interface ICheckbox {
  isChecked: boolean;
}

export const FiltersLabel = styled.label`
  display: flex;

  gap: 1.4rem;
  color: ${({ theme }) => theme.mainText};
  cursor: pointer;

  p {
    margin-top: 2px;
    font-weight: 700;
  }

  &:hover {
    span {
      border: 1px solid var(--color-purple);
    }
  }
`;

export const FiltersInput = styled.input`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const FiltersCheckBox = styled.span<ICheckbox>`
  width: 1.6rem;
  height: 1.6rem;
  background-color: ${({ theme, isChecked }) =>
    isChecked ? 'var(--color-purple)' : theme.checkBoxBg};
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border 0.3s ease;
  border: 1px solid
    ${({ theme, isChecked }) =>
      isChecked ? 'var(--color-purple)' : theme.checkBoxBg};

  svg {
    transition: transform 0.3s ease 0.1s;
    transform: ${({ isChecked }) => (isChecked ? 'scale(1)' : 'scale(0)')};
  }
`;
