import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

type SelectDropdown = {
  isDroped: boolean;
};

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.quaternaryText};
`;

export const SelectInputWrapper = styled.div<SelectDropdown>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.inputBorder};
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
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    transition: transform 0.3s ease;
  }

  ${({ isDroped }) =>
    isDroped &&
    css`
      border: 1px solid var(--color-purple);
      outline: none;

      svg {
        transform: rotate(180deg);
      }
    `}
`;

export const Dropdown = styled(motion.ol)`
  list-style: none;
  position: absolute;
  top: 105%;
  left: 0;
  max-width: 24rem;
  width: 100%;
  background: ${({ theme }) => theme.inputBg};

  text-align: center;
  border-radius: 0.8rem;
  z-index: 4;
  box-shadow: 0 10px 20px ${({ theme }) => theme.boxShadow};
`;

export const Option = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.inputBorder};
  color: ${({ theme }) => theme.mainText};
  padding: 1.6rem 2.4rem;
  text-align: left;
  font-family: inherit;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: var(--color-purple);
  }
`;
