import styled from 'styled-components';

import { motion } from 'framer-motion';
import { media } from '../../../styles/GlobalStyles';

type FormProps = {
  edit?: boolean;
};

export const FormWrapper = styled(motion.form)`
  z-index: 3;
  max-width: 62.5rem;
  max-height: 100vh;
  width: 100%;
  border-radius: 0 2rem 2rem 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 8.5rem;
  background-color: ${({ theme }) => theme.formBg};
  gap: 4.8rem;

  padding: 5.6rem 2rem 0 6.9rem;
  display: flex;
  flex-direction: column;

  transition: background-color 0.3s ease;

  h2 {
    font-size: var(--font-size-heading-xm);
    color: ${({ theme }) => theme.mainText};
  }

  button.back_btn {
    display: none;
  }

  ${media.tablet} {
    top: 8rem;
    left: 0;
    max-width: 62rem;
    padding-left: 5.6rem;
  }

  ${media.phone} {
    top: 7.2rem;
    padding: 2.4rem 0.4rem 0 2.4rem;
    border-radius: 0;
    gap: 2.4rem;

    button.back_btn {
      display: block;
    }
  }
`;

export const Wrapper = styled.div`
  padding-right: 2.4rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  flex-grow: 1;

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.mainBg};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scroll};
    border-radius: 20px;
    height: 20px;
  }

  &::-webkit-scrollbar {
    width: 12px;
  }

  ${media.phone} {
    gap: 4rem;
    padding-right: 0.8rem;
    margin-bottom: 2.4rem;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  color: var(--color-purple);

  h3 {
    color: var(--color-waterlo);
    font-size: var(--font-size-heading-xm);
  }
`;

export const InputsGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
`;

export const BillFromSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
  grid-template-areas:
    'address address address'
    'city code country';

  > *:nth-child(1) {
    grid-area: address;
  }
  > *:nth-child(2) {
    grid-area: city;
  }
  > *:nth-child(3) {
    grid-area: code;
  }
  > *:nth-child(4) {
    grid-area: country;
  }

  ${media.phone} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'address address '
      'city code '
      'country country';
  }
`;

export const BillToSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
  grid-template-areas:
    'name name name'
    'email email email'
    'address address address'
    'city code country';

  > *:nth-child(1) {
    grid-area: name;
  }
  > *:nth-child(2) {
    grid-area: email;
  }
  > *:nth-child(3) {
    grid-area: address;
  }
  > *:nth-child(4) {
    grid-area: city;
  }
  > *:nth-child(5) {
    grid-area: code;
  }
  > *:nth-child(6) {
    grid-area: country;
  }

  ${media.phone} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'name name'
      'email email'
      'address address'
      'city code'
      'country country';
  }
`;

export const BottomSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;
  grid-template-areas:
    'date terms'
    'descrition descrition';

  > *:nth-child(1) {
    grid-area: date;
  }
  > *:nth-child(2) {
    grid-area: terms;
  }
  > *:nth-child(3) {
    grid-area: descrition;
  }

  ${media.phone} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'date'
      'terms'
      'descrition';
  }
`;

export const ButtonWrapper = styled.div`
  width: calc(100% + 8.9rem);
  max-height: 11rem;
  margin-left: -6.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3.2rem 5.6rem 3.2rem 6.9rem;
  background-color: ${({ theme }) => theme.secondbg};
  border-radius: 0 2rem 0 0;
  transition: background-color 0.3s ease;

  ${media.phone} {
    justify-content: initial;
    gap: 0.8rem;
    padding: 2.2rem 2.4rem 2.2rem 2.4rem;
    padding-right: 2.4rem;
    width: calc(100% + 2.8rem);
    max-height: 9rem;
    margin-left: -2.4rem;
  }
`;

export const ButtonsRight = styled.div<FormProps>`
  display: flex;
  gap: 0.8rem;

  ${media.phone} {
    margin-left: auto;
    button {
      padding: ${({ edit }) => (edit ? '0 2.4rem' : '0 1.4rem')};
    }
  }
`;

export const Shadow = styled.div`
  display: none;
  ${media.phone} {
    min-height: 6.4rem;
    display: block;
    width: calc(100% + 2.8rem);
    margin-left: -2.4rem;

    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.01),
      rgba(0, 0, 0, 0.1)
    );
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  color: var(--color-error);
  font-size: var(--font-size-body-xs);
`;
