import { motion } from 'framer-motion';
import styled from 'styled-components';

type DatePiker = {
  isEdit: boolean;
};

export const DataPickerWrapper = styled.div<DatePiker>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme, isEdit }) =>
    isEdit ? theme.datePickerDissabled : theme.quaternaryText};
`;

export const DateInputWrapper = styled.div`
  position: relative;
  .calendarIcon {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;

    path {
      fill: var(--color-ship-cove);
    }
  }
`;

export const DateInput = styled.input`
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

  &:focus {
    border: 1px solid var(--color-purple);
    outline: none;
  }

  &:disabled {
    background-color: inherit;
    color: ${({ theme }) => theme.datePickerDissabledText};
    cursor: not-allowed;
    & + svg path {
      opacity: 0.5;
    }
  }
`;

export const Calendar = styled(motion.div)`
  position: absolute;
  top: 105%;
  left: 0;
  max-width: 24rem;
  width: 100%;
  background: ${({ theme }) => theme.inputBg};

  text-align: center;
  padding: 2.4rem;
  border-radius: 0.8rem;
  z-index: 4;
  box-shadow: 0 10px 20px ${({ theme }) => theme.boxShadow};
`;

export const CalendarNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  p {
    color: ${({ theme }) => theme.mainText};
    font-family: 'Spartan';
    font-weight: 700;
  }
  button {
    padding: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
  }
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 1rem;
  font-weight: bold;

  p {
    color: ${({ theme }) => theme.mainText};
    cursor: pointer;

    &.selected {
      color: var(--color-purple);
    }
    &:hover {
      color: var(--color-purple);
    }
  }
`;
